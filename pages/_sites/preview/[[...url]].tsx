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
import logger from 'logger';

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
        pageTitle = neonData.object.data?.title;
    }

    logger.info(
        '[PREVIEW] Site title: ' + neonData.siteContext.root.name + ' - Loading page: ' + neonData.object.data.url
    );

    switch (neonData?.object?.data?.sys?.baseType) {
        case 'webpage':
            if (neonData?.object?.data?.sys?.type === 'sectionpage') {
                return <SectionPage neonData={neonData} pageTitle={pageTitle} isPreview />;
            } else if (neonData?.object?.data?.sys?.type === 'home') {
                return <LandingPage neonData={neonData} isPreview />;
            } else {
                return <DefaultSectionPage neonData={neonData} pageTitle={pageTitle} isPreview />;
            }
        case 'sectionwebpage':
            return <SectionPage neonData={neonData} pageTitle={pageTitle} isPreview />;
        case 'homewebpage':
            return <LandingPage neonData={neonData} isPreview />;
        case 'webpagefragment':
            return <Segment neonData={neonData} isPreview />;
        case 'section':
            return <SectionPage neonData={neonData} pageTitle={pageTitle} isPreview />;
        case 'site':
            return <DefaultHomePage neonData={neonData} isPreview />;
        case 'liveblog':
            return (
                <SWRConfig value={{ fallback }}>
                    <LiveblogPage neonData={neonData} isPreview />
                </SWRConfig>
            );
        default:
            return <ArticlePage neonData={neonData} isPreview />;
    }
}

/**
 *
 * @param context
 */
export const getServerSideProps = (async context => {
    const req = context.req;

    logger.debug('============================= req', req.cookies.empreviewauth);
    const protocol = req.headers['x-forwarded-proto'] || 'http';

    const fullHostname = `${protocol}://${req.headers.host}`;

    const neonData = await getNeonPreview({ url: fullHostname + req.url, empreviewauth: req.cookies.empreviewauth });

    const props: GenericPageProps = {
        neonData
    };

    let revalidate = 5;
    const fallback = {}; // To be used for SWR rehydration of liveblogs

    console.log('neonData?.object?.data?.sys?.baseType', neonData?.object?.data?.sys?.baseType);

    // if (!neonData.error) {
    switch (neonData?.object?.data?.sys?.baseType) {
        case 'webpage':
            revalidate = 5;
        // Quick and ugly way to manage semantic search demo
        // const semanticSearchData = await getSemanticSearchData(neonData);
        // if (semanticSearchData) {
        //     props.semanticSearchData = semanticSearchData;
        // }
        case 'liveblog':
            revalidate = 5;
            const latestBlogPosts = await neonRequest(
                fullHostname +
                    `/api/liveblogs/${neonData.object.data.id}/posts?emk.site=${neonData.siteContext.root.name}&limit=50`,
                {}
            );
            fallback[fullHostname + `/api/${neonData.siteContext.root.name}/liveblogs/${neonData.object.data.id}`] =
                latestBlogPosts;
            props.fallback = fallback;
        default:
            revalidate = 5;
    }
    // }

    return {
        props
    };
}) satisfies GetServerSideProps;
