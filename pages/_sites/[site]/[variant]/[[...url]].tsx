import React from 'react';
import { SWRConfig } from 'swr';
import Layout from '@/components/Layout/Layout';
import BasicNewsletter from '@/components/Newsletter/BasicNewsletter';
import ArticlePage from '@/components/Page/ArticlePage';
import ErrorPage from '@/components/Page/ErrorPage';
import LandingPage from '@/components/Page/LandingPage';
import LiveblogPage from '@/components/Page/LiveblogPage';
import SectionPage from '@/components/Page/SectionPage';
import SemiAutomaticSectionPage from '@/components/Page/SemiAutomaticSectionPage';
import SimpleHomepage from '@/components/Page/SimpleHomepage';
import Segment from '@/components/Segment/Segment';
import { neonRequest, getNeonPageByUrl, getNeonPreview, getNeonSites } from '@/lib/neon-cms/neon-api';
import { getMetaHeader } from '@/lib/helpers';
import { pineconeRequest } from '@/lib/pinecone/pinecone-client';
import { GenericPageProps } from 'src/types/commonTypes';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.semanticSearchData
 * @param root0.fallback
 */
export default function Page({ neonData, semanticSearchData, fallback }) {
    let render = null;
    if (neonData.error) {
        return <ErrorPage errorType={neonData.error} />;
    }

    let pageTitle = null;
    if (neonData?.pageContext?.url !== '/' && !neonData.previewData) {
        pageTitle = neonData.pageContext?.url?.charAt(0).toUpperCase() + neonData.pageContext?.url?.slice(1);
    }

    switch (neonData?.object?.data?.sys?.baseType) {
        case 'webpage':
            let isSimpleHp = false;
            try {
                isSimpleHp = neonData.object.data.attributes.classification.genres.includes('simplehp');
            } catch (e) {}
            if (isSimpleHp) {
                // For demo purpose
                render = <SimpleHomepage neonData={neonData} pageTitle={pageTitle} />;
            } else if (neonData.object.data.pubInfo.sectionPath !== '/') {
                // This is a section page with a DWP ("semi-automatic" page)
                render = (
                    <SemiAutomaticSectionPage
                        neonData={neonData}
                        pageTitle={pageTitle}
                        semanticSearchData={semanticSearchData}
                    />
                );
            } else {
                render = <LandingPage neonData={neonData} semanticSearchData={semanticSearchData} />;
            }
            break;
        case 'webpagefragment':
            // For live preview
            render = <Segment neonData={neonData} />;
            break;
        case 'section':
            render = <SectionPage neonData={neonData} pageTitle={pageTitle} />;
            break;
        case 'site':
            render = <LandingPage neonData={neonData} semanticSearchData={semanticSearchData} />;
            break;
        case 'liveblog':
            render = (
                <SWRConfig value={{ fallback }}>
                    <LiveblogPage neonData={neonData} />
                </SWRConfig>
            );
            break;
        default:
            render = <ArticlePage neonData={neonData} />;
    }

    if (neonData.previewData) {
        if (neonData.object.data.sys.type === 'newsletter') {
            render = <BasicNewsletter neonData={neonData} />;
        } else if (neonData.object.data.sys.baseType !== 'webpagefragment') {
            render = <Layout neonData={neonData}>{render}</Layout>;
        }
    } else {
        render = (
            <React.Fragment>
                {getMetaHeader(neonData)}
                <Layout neonData={neonData}>{render}</Layout>
            </React.Fragment>
        );
    }
    return render;
}

/**
 *
 */
export async function getStaticPaths({}) {
    let paths = [];
    if (process.env.DEV_MODE !== 'true') {
        try {
            const sites = await getNeonSites();

            paths = sites.reduce((acc1, site, i) => {
                const hostName = site.root.hostname;
                if (hostName) {
                    const sections = site.sitemap.children.reduce((acc2, section, j) => {
                        const sectionPath = section.path.replace(/^\/|\/$/g, '');
                        return [
                            ...acc2,
                            {
                                params: {
                                    site: hostName,
                                    url: [sectionPath]
                                }
                            }
                        ];
                    }, []);
                    sections.push({
                        params: {
                            site: hostName,
                            url: ['']
                        }
                    });
                    return [...acc1, ...sections];
                }
                // ignore sites that don't have the custom attribute
                return [...acc1];
            }, []);
        } catch (e) {
            console.log(e);
        }
    }
    return {
        paths,
        fallback: 'blocking'
    };
}

/**
 *
 * @param context
 */
export async function getStaticProps(context) {
    let neonData = null;

    if (context.previewData) {
        neonData = await getNeonPreview(context.previewData);
    } else {
        let url = '/';
        let site = 'default';
        console.log('context', JSON.stringify(context));
        if (context.params) {
            if (context.params.url) {
                url = context.params.url.join('/');
            }

            if (context.params.site) {
                site = context.params.site;
            }
        }
        const variant = context.params.variant ? context.params.variant : null;

        console.log(
            `RENDERING - site: ${site} - variant: ${variant} - path: ${url} - DEV MODE: ${process.env.DEV_MODE}`
        );
        neonData = await getNeonPageByUrl(site, url, variant);
    }

    const props: GenericPageProps = {
        neonData
    };

    let revalidate = 5;
    const fallback = {}; // To be used for SWR rehydration of liveblogs

    if (!neonData.error) {
        switch (neonData?.object?.data?.sys?.baseType) {
            case 'webpage':
                revalidate = 5;
                // Quick and ugly way to manage semantic search demo
                const semanticSearchData = await getSemanticSearchData(neonData);
                if (semanticSearchData) {
                    props.semanticSearchData = semanticSearchData;
                }
                break;
            case 'liveblog':
                revalidate = 5;
                const latestBlogPosts = await neonRequest(
                    `/api/liveblogs/${neonData.object.data.id}/posts?emk.site=${neonData.siteContext.site}&limit=50`
                );
                fallback[`/api/${neonData.siteContext.site}/liveblogs/${neonData.object.data.id}`] = latestBlogPosts;
                props.fallback = fallback;
                break;
            default:
                revalidate = 5;
        }
    }

    return {
        props,
        revalidate
    };
}

/**
 *
 * @param neonData
 */
async function getSemanticSearchData(neonData) {
    let semanticSearchData = null;
    try {
        const semanticWidget = neonData.object.data.links.pagelink.main.find(link => {
            if (link.metadata.type === 'widget') {
                if (neonData.pageContext.nodes[link.targetId].title === 'smart-query') {
                    return true;
                }
            }
            return false;
        });
        const semanticWidgetParams = semanticWidget.metadata.parameters;
        if (semanticWidgetParams) {
            semanticSearchData = await pineconeRequest(semanticWidgetParams.topic);
        }
    } catch (e) {}
    return semanticSearchData;
}
