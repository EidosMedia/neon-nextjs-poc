import * as React from 'react';
import { SWRConfig } from "swr";
import { cobaltRequest, getCobaltPageByUrl, getCobaltPreview } from '../src/lib/cobalt-cms/cobalt-api';
import Layout from '../src/components/Layout/Layout';
import LandingPage from '../src/components/Page/LandingPage';
import LiveblogPage from "../src/components/Page/LiveblogPage";
import Segment from '../src/components/Segment/Segment';
import Cookies from 'cookies'
import ArticlePage from '../src/components/Page/ArticlePage';
import SectionPage from '../src/components/Page/SectionPage';

export default function Preview({ cobaltData, fallback }) {
    //console.log(cobaltData)
    let render = null;
    if (cobaltData) {
        switch (cobaltData.object.data.sys.baseType) {
            case 'webpagefragment':
                render = <Segment cobaltData={cobaltData} />;
                break;
            case 'webpage':
                render = (
                    <Layout cobaltData={cobaltData}>
                        <LandingPage cobaltData={cobaltData} />
                    </Layout>
                );
                break;
            case 'section':
                render = (
                    <Layout cobaltData={cobaltData}>
                        <SectionPage cobaltData={cobaltData} />
                    </Layout>
                );
                break;
            case 'liveblog':
                render = (
                    <Layout cobaltData={cobaltData}>
                        <SWRConfig value={{ fallback }}>
                            <LiveblogPage cobaltData={cobaltData} />
                        </SWRConfig>
                    </Layout>
                )
                break;
            default:
                render = (
                    <Layout cobaltData={cobaltData}>
                        <ArticlePage cobaltData={cobaltData} />
                    </Layout>
                );
                break;
        }
    }
    return render;
}

export async function getServerSideProps(context) {
    console.log('RENDERING: /preview');

    let cobaltData = null;
    if (context.previewData) {
        console.log("Preview mode - site: " + context.previewData.site + " - url: " + context.previewData.previewUrl)
        const reworkedPreviewUrl = process.env.COBALT_BASE_HOST + '/' +  context.previewData.previewUrl.replace(/^(?:\/\/|[^/]+)*\//, '') + '&emk.site='+context.previewData.site + encodeURIComponent('[PREVIEW]') + '&emk.disableCache=true'
        console.log("reworked previewUrl: "+ reworkedPreviewUrl)
        cobaltData = await getCobaltPreview(context.previewData.site, reworkedPreviewUrl)
        console.log("Got cobalt preview data")
    }
    // console.log("PREVIEW DATA")
    // console.log(JSON.stringify(cobaltData,null,2))
    const cookies = new Cookies(context.req, context.res)
    cookies.set('emauth', cobaltData.previewData.emauth);
    cookies.set('emk.previewToken', cobaltData.previewData.previewToken);

    let props = {
        cobaltData
    };

    let fallback = {}; // To be used for SWR rehydration of liveblogs

    if(cobaltData.object.data.sys.baseType === 'liveblog'){
        let blogId = cobaltData.object.data.id;
        if (blogId.includes('eom')) {
            blogId = blogId.substring(0, blogId.indexOf('@'))
            const result = await cobaltRequest('/api/pages/foreignid/' + blogId + '?emk.site=' + cobaltData.siteContext.site)
            blogId = result.model.data.id
          }
        const latestBlogPosts = await cobaltRequest('/api/liveblogs/' + blogId + '/posts?emk.site=' + cobaltData.siteContext.site)
        fallback['/api/' + cobaltData.siteContext.site + '/liveblogs/' + blogId] = latestBlogPosts
        props['fallback'] = fallback
    }

    return {
        props: props
    }
}
