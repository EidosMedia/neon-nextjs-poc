import Layout from "../../../src/components/Layout/Layout";
import LandingPage from "../../../src/components/Page/LandingPage";
import { getCobaltPageByUrl, getCobaltSite } from "../../../src/lib/cobalt-cms/cobalt-api";

export default function Page({ cobaltData }) {

    let render = null;
    let pageTitle = null;
    if (cobaltData.pageContext.url !== '/') {
        pageTitle = cobaltData.pageContext.url.charAt(0).toUpperCase() + cobaltData.pageContext.url.slice(1)
    }
    switch (cobaltData.object.data.sys.baseType) {
        case 'webpage':
            render = <LandingPage cobaltData={cobaltData} pageTitle={pageTitle} />
            break;
        default:
            render = null;
    }

    return (
        <Layout currentSite={cobaltData.siteContext.site} siteStructure={cobaltData.siteContext.siteStructure}>
            {render}
        </Layout>
    )
}



export async function getStaticPaths({ }) {

    let paths = [];
    // try {
    //     paths = response.root.items.map((item) => {
    //         return item.uri
    //     })
    // } catch (e) {
    //     // nothing
    // }
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
    if (params.site){
        site = params.site
    }
    console.log('RENDERING - site: ' + site + ' - path: ' + url);

    const cobaltData = await getCobaltPageByUrl(site, url);

    const props = {
        cobaltData
    };

    let revalidate = 60;

    switch (cobaltData.object.data.sys.baseType) {
        case 'webpage':
            revalidate = 5;
            break;
        default:
            revalidate = 60;
    }

    return {
        props: props,
        revalidate: revalidate
    }

}