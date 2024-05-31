import React, { useEffect } from 'react';
import { SWRConfig } from 'swr';
import ArticlePage from '@/components/Page/ArticlePage';
import ErrorPage from '@/components/Page/ErrorPage';
import LandingPage from '@/components/Page/LandingPage';
import LiveblogPage from '@/components/Page/LiveblogPage';
import SectionPage from '@/components/Page/SectionPage';
import DefaultSectionPage from '@/components/Page/DefaultSectionPage';
import Segment from '@/components/Segment/Segment';
import { neonRequest, getNeonPreview } from '@/services/neon-cms/neon-api';
import { GenericPageProps } from 'src/types/commonTypes';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import DefaultHomePage from '@/components/Page/DefaultHomePage';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.fallback
 */
export default function Page({ neonData, fallback }) {
    let render = null;

    if (neonData.error) {
        return <ErrorPage errorType={neonData.error} />;
    }

    let pageTitle = null;
    if (neonData?.pageContext?.url !== '/' && !neonData.previewData) {
        pageTitle = neonData.object.data.title;
    }

    switch (neonData?.object?.data?.sys?.baseType) {
        case 'webpage':
            if (neonData?.object?.data?.sys?.type === 'sectionpage') {
                return <SectionPage neonData={neonData} pageTitle={pageTitle} />;
            } else if (neonData?.object?.data?.sys?.type === 'home') {
                return <LandingPage neonData={neonData} />;
            } else {
                return <DefaultSectionPage neonData={neonData} pageTitle={pageTitle} />;
            }
            break;
        case 'webpagefragment':
            return <Segment neonData={neonData} />;
            break;
        case 'section':
            return <SectionPage neonData={neonData} pageTitle={pageTitle} />;
            break;
        case 'site':
            return <DefaultHomePage neonData={neonData} />;
            break;
        case 'liveblog':
            return (
                <SWRConfig value={{ fallback }}>
                    <LiveblogPage neonData={neonData} />
                </SWRConfig>
            );
            break;
        default:
            return <ArticlePage neonData={neonData} />;
    }

    // if (neonData.previewData) {
    //     if (neonData.object.data.sys.type === 'newsletter') {
    //         return <BasicNewsletter neonData={neonData} />;
    //     } else if (neonData.object.data.sys.baseType !== 'webpagefragment') {
    //         //render = <Layout neonData={neonData}>{render}</Layout>;
    //     }
    // } else {
    //     render = (
    //         <React.Fragment>
    //             {/* <Layout neonData={neonData}>{render}</Layout> */}
    //             {render}
    //         </React.Fragment>
    //     );
    // }
    // return render;
}

/**
 *
 * @param context
 */
export const getServerSideProps = (async context => {
    const req = context.req;

    console.log('============================= req', req.cookies.empreviewauth);
    const protocol = req.headers['x-forwarded-proto'] || 'http';

    const fullHostname = `${protocol}://${req.headers.host}`;

    try {
        const neonData = await getNeonPreview({ url: fullHostname + req.url, emauth: req.cookies.empreviewauth });

        const props: GenericPageProps = {
            neonData
        };

        let revalidate = 5;
        const fallback = {}; // To be used for SWR rehydration of liveblogs

        // if (!neonData.error) {
        switch (neonData?.object?.data?.sys?.baseType) {
            case 'webpage':
                revalidate = 5;
                // Quick and ugly way to manage semantic search demo
                // const semanticSearchData = await getSemanticSearchData(neonData);
                // if (semanticSearchData) {
                //     props.semanticSearchData = semanticSearchData;
                // }
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
        // }

        return {
            props
        };
    } catch (e) {
        console.log('============================= error', e);

        const router = useRouter();
        router.replace(router.asPath);
    }
}) satisfies GetServerSideProps;
