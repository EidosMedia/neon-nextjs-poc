import * as React from 'react';
import { getCobaltPageByUrl, getCobaltPreview } from '../src/lib/cobalt-cms/cobalt-api';
import Layout from '../src/components/Layout/Layout';
import LandingPage from '../src/components/Page/LandingPage';
import Segment from '../src/components/Segment/Segment';
import Cookies from 'cookies'

export default function Preview({ cobaltData }) {
    //console.log(cobaltData)
    let render = null;
    if (cobaltData) {
        if (cobaltData.object.data.sys.baseType === 'webpagefragment') {
            render = <Segment cobaltData={cobaltData} />
        } else {
            render = (
                <Layout currentSite={cobaltData.siteContext.site} siteStructure={cobaltData.siteContext.siteStructure}>
                    <LandingPage cobaltData={cobaltData} />
                </Layout>
            )
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
