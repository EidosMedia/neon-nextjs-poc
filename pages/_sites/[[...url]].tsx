import React from 'react';
import { SWRConfig } from 'swr';
import ArticlePage from '@/components/Page/ArticlePage';
import ErrorPage from '@/components/Page/ErrorPage';
import LandingPage from '@/components/Page/LandingPage';
import LiveblogPage from '@/components/Page/LiveblogPage';
import SectionPage from '@/components/Page/SectionPage';
import SemiAutomaticSectionPage from '@/components/Page/SemiAutomaticSectionPage';
import SimpleHomepage from '@/components/Page/SimpleHomepage';
import Segment from '@/components/Segment/Segment';
import { neonRequest, getNeonPageByUrl } from '@/services/neon-cms/neon-api';
import { GenericPageProps } from 'src/types/commonTypes';
import { GetServerSideProps } from 'next';

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

    switch (neonData?.object?.data?.sys?.baseType) {
        case 'webpage':
            let isSimpleHp = false;
            try {
                isSimpleHp = neonData.object.data.attributes.classification.genres.includes('simplehp');
            } catch (e) {}
            if (isSimpleHp) {
                // For demo purpose
                return <SimpleHomepage neonData={neonData} pageTitle={pageTitle} />;
            } else if (neonData.object.data.pubInfo.sectionPath !== '/') {
                // This is a section page with a DWP ("semi-automatic" page)
                return <SemiAutomaticSectionPage neonData={neonData} pageTitle={pageTitle} />;
            } else {
                return <LandingPage neonData={neonData} />;
            }

        case 'webpagefragment':
            return <Segment neonData={neonData} />;

        case 'section':
            return <SectionPage neonData={neonData} pageTitle={pageTitle} />;

        case 'site':
            return <LandingPage neonData={neonData} />;

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

    neonData = await getNeonPageByUrl(fullHostname + req.url);
    const props: GenericPageProps = {
        neonData
    };

    const fallback = {}; // To be used for SWR rehydration of liveblogs

    if (!neonData.error) {
        switch (neonData?.object?.data?.sys?.baseType) {
            case 'webpage':
                break;
            case 'liveblog':
                const latestBlogPosts = await neonRequest(
                    `/api/liveblogs/${neonData.object.data.id}/posts?limit=50`
                );
                fallback[`/api/${neonData.siteContext.site}/liveblogs/${neonData.object.data.id}`] = latestBlogPosts;
                props.fallback = fallback;
                break;
            default:
        }
    }

    return {
        props
    };
}) satisfies GetServerSideProps;
