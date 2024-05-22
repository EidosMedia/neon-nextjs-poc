import React, { useEffect } from 'react';
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
import { neonRequest, getNeonPreview } from '@/services/neon-cms/neon-api';
import { getMetaHeader } from '@/services/helpers';
import { GenericPageProps } from 'src/types/commonTypes';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

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
            let isSimpleHp = false;
            try {
                isSimpleHp = neonData.object.data.attributes.classification.genres.includes('simplehp');
            } catch (e) {}
            if (isSimpleHp) {
                // For demo purpose
                render = <SimpleHomepage neonData={neonData} pageTitle={pageTitle} />;
            } else if (neonData.object.data?.pubInfo?.sectionPath !== '/') {
                // This is a section page with a DWP ("semi-automatic" page)
                render = <SemiAutomaticSectionPage neonData={neonData} pageTitle={pageTitle} />;
            } else {
                render = <LandingPage neonData={neonData} />;
            }
            break;
        case 'webpagefragment':
            render = <Segment neonData={neonData} />;
            break;
        case 'section':
            render = <SectionPage neonData={neonData} pageTitle={pageTitle} />;
            break;
        case 'site':
            render = <LandingPage neonData={neonData} />;
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
            //render = <Layout neonData={neonData}>{render}</Layout>;
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
 * @param context
 */
export const getServerSideProps = (async context => {
    const req = context.req;

    console.log('============================= req', req.cookies.empreviewauth);
    const protocol = req.headers['x-forwarded-proto'] || 'http';

    const fullHostname = `${protocol}://${req.headers.host}`;

    try{
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
                `/api/liveblogs/${neonData.object.data.id}/posts?limit=50`
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
}catch(e){
    console.log('============================= error', e);

    const router = useRouter();
    router.replace(router.asPath);


}
}) satisfies GetServerSideProps;
