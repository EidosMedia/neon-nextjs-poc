import { SWRConfig } from "swr";
import Layout from "../../../src/components/Layout/Layout";
import ArticlePage from "../../../src/components/Page/ArticlePage";
import LandingPage from "../../../src/components/Page/LandingPage";
import LiveblogPage from "../../../src/components/Page/LiveblogPage";
import SectionPage from "../../../src/components/Page/SectionPage";
import { cobaltRequest, getCobaltPageByUrl, getCobaltSectionPage, getCobaltSites, searchCobalt } from "../../../src/lib/cobalt-cms/cobalt-api";
import { decorateSectionPageCobaltData } from "../../../src/lib/cobalt-cms/cobalt-helpers";

export default function Page({ cobaltData, fallback }) {

    let render = null;
    let pageTitle = null;
    if (cobaltData.pageContext.url !== '/') {
        pageTitle = cobaltData.pageContext.url.charAt(0).toUpperCase() + cobaltData.pageContext.url.slice(1)
    }
    switch (cobaltData.object.data.sys.baseType) {
        case 'webpage':
            render = <LandingPage cobaltData={cobaltData} pageTitle={pageTitle} />;
            break;
        case 'section':
            render = <SectionPage cobaltData={cobaltData} pageTitle={pageTitle} />;
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

    return (
        <Layout cobaltData={cobaltData}>
            {render}
        </Layout>
    )
}



export async function getStaticPaths({ }) {

    let paths = [];
    try {
        const sites = await getCobaltSites()

        paths = sites.reduce((acc1, site, i) => {
            const hostName = site.customAttributes.frontendHostname;
            const sections = site.sitemap.children.reduce((acc2, section, j) => {
                return [...acc2, {
                    params: {
                        site: hostName,
                        url: [section.path]
                    }
                }]
            }, [])
            return [...acc1, ...sections]
        }, [])
    } catch (e) { console.log(e) }
    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params }) {
    let url = "/"
    if (params.url) {
        url = params.url.join('/');
    }
    let site = "default"
    if (params.site) {
        site = params.site
    }
    console.log('RENDERING - site: ' + site + ' - path: ' + url);

    let cobaltData = await getCobaltPageByUrl(site, url);
    if (cobaltData.object.data.sys.baseType === 'section') {
        console.log("Section page: performing a search instead")
        cobaltData = await decorateSectionPageCobaltData(cobaltData)
    }

    let props = {
        cobaltData
    };

    let revalidate = 60;
    let fallback = {}; // To be used for SWR rehydration of liveblogs

    switch (cobaltData.object.data.sys.baseType) {
        case 'webpage':
            revalidate = 60;
            break;
        case 'liveblog':
            revalidate = 60;
            const latestBlogPosts = await cobaltRequest('/api/liveblogs/' + cobaltData.object.data.id + '/posts?emk.site=' + cobaltData.siteContext.site)
            fallback['/api/' + cobaltData.siteContext.site + '/liveblogs/' + cobaltData.object.data.id] = latestBlogPosts
            props['fallback'] = fallback
        default:
            revalidate = 60;
    }

    return {
        props: props,
        revalidate: revalidate
    }

}