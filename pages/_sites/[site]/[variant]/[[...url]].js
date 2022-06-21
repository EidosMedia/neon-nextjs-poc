import { Container } from "@mui/material";
import React from "react";
import { SWRConfig } from "swr";
import Layout from "../../../../src/components/Layout/Layout";
import BasicNewsletter from "../../../../src/components/Newsletter/BasicNewsletter";
import ArticlePage from "../../../../src/components/Page/ArticlePage";
import ErrorPage from "../../../../src/components/Page/ErrorPage";
import LandingPage from "../../../../src/components/Page/LandingPage";
import LiveblogPage from "../../../../src/components/Page/LiveblogPage";
import SectionPage from "../../../../src/components/Page/SectionPage";
import Segment from "../../../../src/components/Segment/Segment";
import { cobaltRequest, getCobaltPageByUrl, getCobaltPreview, getCobaltSectionPage, getCobaltSites, searchCobalt } from "../../../../src/lib/cobalt-cms/cobalt-api";
import { getLiveHostname, isNewsletterSite } from "../../../../src/lib/cobalt-cms/cobalt-helpers";
import { getMetaHeader } from "../../../../src/lib/helpers";

export default function Page({ cobaltData, fallback }) {

    let render = null;
    if (cobaltData.error) {
        return <ErrorPage errorType={cobaltData.error} />
    } else {
        let pageTitle = null;
        if (cobaltData.pageContext.url !== '/' && !cobaltData.previewData) {
            pageTitle = cobaltData.pageContext.url.charAt(0).toUpperCase() + cobaltData.pageContext.url.slice(1)
        }
        switch (cobaltData.object.data.sys.baseType) {
            case 'webpage':
                render = <LandingPage cobaltData={cobaltData} pageTitle={pageTitle} />;
                break;
            case 'webpagefragment':
                // For live preview
                render = <Container maxWidth="lg"><Segment cobaltData={cobaltData} /></Container>;
                break;
            case 'section':
                render = <SectionPage cobaltData={cobaltData} pageTitle={pageTitle} />;
                break;
            case 'site':
                render = null;
                break;
            case 'liveblog':
                render = (
                    <SWRConfig value={{ fallback }}>
                        <LiveblogPage cobaltData={cobaltData} />
                    </SWRConfig>
                )
                break;
            default:
                render = <ArticlePage cobaltData={cobaltData} />;
        }
    }
    if (cobaltData.previewData) {
        if (cobaltData.object.data.sys.type === 'newsletter') {
            render = (
                <BasicNewsletter cobaltData={cobaltData} />
            )
        } else if (cobaltData.object.data.sys.baseType !== 'webpagefragment') {
            render = (
                <Layout cobaltData={cobaltData}>
                    {render}
                </Layout>
            )
        }
    } else {
        render = (
            <React.Fragment>
                {getMetaHeader(cobaltData)}
                <Layout cobaltData={cobaltData}>
                    {render}
                </Layout>
            </React.Fragment>
        )
    }
    return render;
}



export async function getStaticPaths({ }) {

    let paths = [];
    if (process.env.DEV_MODE !== 'true') {
        try {
            const sites = await getCobaltSites()

            paths = sites.reduce((acc1, site, i) => {
                const hostName = getLiveHostname(site);
                if (hostName) {
                    let sections = site.sitemap.children.reduce((acc2, section, j) => {
                        const sectionPath = section.path.replace(/^\/|\/$/g, '')
                        return [...acc2, {
                            params: {
                                site: hostName,
                                url: [sectionPath]
                            }
                        }]
                    }, [])
                    sections.push({
                        params: {
                            site: hostName,
                            url: ['']
                        }
                    })
                    return [...acc1, ...sections]
                } else {
                    // ignore sites that don't have the custom attribute
                    return [...acc1]
                }
            }, [])
        } catch (e) { console.log(e) }
    }
    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps(context) {

    console.log(context.params.variant)

    let cobaltData = null;

    if (context.previewData) {
        console.log("Preview mode: " + context.previewData)
        cobaltData = await getCobaltPreview(context.previewData)
    } else {
        let url = "/"
        let site = "default"
        if (context.params) {
            if (context.params.url) {
                url = context.params.url.join('/');
            }

            if (context.params.site) {
                site = context.params.site
            }
        }
        const variant = (context.params.variant?context.params.variant:null);

        console.log('RENDERING - site: ' + site + ' - variant: ' + variant + ' - path: ' + url + ' - DEV MODE: ' + process.env.DEV_MODE);
        cobaltData = await getCobaltPageByUrl(site, url, variant);
    }

    let props = {
        cobaltData
    };

    let revalidate = 60;
    let fallback = {}; // To be used for SWR rehydration of liveblogs

    if (!cobaltData.error) {
        switch (cobaltData.object.data.sys.baseType) {
            case 'webpage':
                revalidate = 5;
                break;
            case 'liveblog':
                revalidate = 5;
                const latestBlogPosts = await cobaltRequest('/api/liveblogs/' + cobaltData.object.data.id + '/posts?emk.site=' + cobaltData.siteContext.site)
                fallback['/api/' + cobaltData.siteContext.site + '/liveblogs/' + cobaltData.object.data.id] = latestBlogPosts
                props['fallback'] = fallback
            default:
                revalidate = 5;
        }
    }
    return {
        props: props,
        revalidate: revalidate
    }

}