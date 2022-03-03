import * as React from 'react';
import { getCobaltPageByUrl, getCobaltPreview } from '../src/lib/cobalt-cms/cobalt-api';
import Layout from '../src/components/Layout/Layout';
import LandingPage from '../src/components/Page/LandingPage';
import Segment from '../src/components/Segment/Segment';
import Cookies from 'cookies'
import ArticlePage from '../src/components/Page/ArticlePage';
import SectionPage from '../src/components/Page/SectionPage';

export default function Preview({ cobaltData }) {
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
        cobaltData = await getCobaltPreview(context.previewData.site, context.previewData.previewUrl)
        console.log("Got cobalt preview data")
    }
    // console.log("PREVIEW DATA")
    // console.log(JSON.stringify(cobaltData,null,2))
    const cookies = new Cookies(context.req, context.res)
    cookies.set('emauth', cobaltData.previewData.emauth);
    cookies.set('emk.previewToken', cobaltData.previewData.previewToken);

    return {
        props: {
            cobaltData
        }
    }
}
