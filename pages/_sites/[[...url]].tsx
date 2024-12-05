import React from 'react';
import { SWRConfig } from 'swr';
import ArticlePage from '@/components/Page/ArticlePage';
import ErrorPage from '@/components/Page/ErrorPage';
import LandingPage from '@/components/Page/LandingPage';
import LiveblogPage from '@/components/Page/LiveblogPage';
import SectionPage from '@/components/Page/SectionPage';
import DefaultSectionPage from '@/components/Page/DefaultSectionPage';
import Segment from '@/components/Segment/Segment';
import { neonRequest, getNeonPageByUrl } from '@/services/neon-cms/neon-api';
import { GenericPageProps } from 'src/types/commonTypes';
import { GetServerSideProps } from 'next';
import DefaultHomePage from '@/components/Page/DefaultHomePage';
import logger from 'logger';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.semanticSearchData
 * @param root0.fallback
 */
export default function Page({ neonData, semanticSearchData, fallback }) {
    if (neonData.error) {
        return <ErrorPage errorType={neonData.error} />;
    }

    let pageTitle = null;
    if (neonData?.pageContext?.url !== '/' && !neonData.previewData) {
        pageTitle = neonData.object.data.title;
    }

    logger.info('Site title: ' + neonData.siteContext.root.name + ' - Loading page: ' + neonData.object.data.url);

    switch (neonData?.object?.data?.sys?.baseType) {
        case 'webpage':
            return <LandingPage neonData={neonData} pageTitle={pageTitle} />;

        case 'sectionwebpage':
            return <SectionPage neonData={neonData} pageTitle={pageTitle} />;

        case 'homewebpage':
            return <LandingPage neonData={neonData} />;

        case 'webpagefragment':
            return <Segment neonData={neonData} />;

        case 'section':
            return <DefaultSectionPage neonData={neonData} pageTitle={pageTitle} />;

        case 'site':
            return <DefaultHomePage neonData={neonData} />;

        case 'liveblog':
            return (
                <SWRConfig value={{ fallback }}>
                    <LiveblogPage neonData={neonData} />
                </SWRConfig>
            );

        default:
            return <ArticlePage neonData={neonData} />;
    }
}

/**
 *
 * @param context
 */
export const getServerSideProps = (async context => {
    const req = context.req;

    const protocol = req.headers['x-forwarded-proto'] || 'http';

    const fullHostname = `${protocol}://${req.headers.host}`;

    let neonData = null;

    neonData = await getNeonPageByUrl(fullHostname + req.url, { cookies: req.cookies });
    const props: GenericPageProps = {
        neonData
    };

    const fallback = {}; // To be used for SWR rehydration of liveblogs

    if (!neonData.error) {
        switch (neonData?.object?.data?.sys?.baseType) {
            case 'webpage':
                break;
            /*        case 'liveblog':
                const latestBlogPosts = await neonRequest(`${fullHostname}/api/liveblogs/${neonData.object.data.id}/posts?limit=50`);
                fallback[`${fullHostname}/api/${neonData.siteContext.site}/liveblogs/${neonData.object.data.id}`] = latestBlogPosts;
                props.fallback = fallback;
                break;*/
            default:
        }
    }

    return {
        props
    };
}) satisfies GetServerSideProps;
