import Layout from "../src/components/Layout/Layout";
import LandingPage from "../src/components/Page/LandingPage";
import { getCobaltPageByUrl, getCobaltSite } from "../src/lib/cobalt-cms/cobalt-api";

export default function Page({ cobaltData }) {

    let render = null;
    const pageTitle = cobaltData.pageContext.url.charAt(0).toUpperCase() + cobaltData.pageContext.url.slice(1)

    switch (cobaltData.object.data.sys.baseType) {
        case 'webpage':   
            render = <LandingPage cobaltData={cobaltData} pageTitle={pageTitle} />
            break;
        default:
            render = null;
    }

    return (
        <Layout siteStructure={cobaltData.siteContext.siteStructure}>
            {render}
        </Layout>
    )
}



export async function getStaticPaths({ }) {

    const response = await getCobaltSite();
    let paths = [];
    try {
        paths = response.root.items.map((item) => {
            return item.uri
        })
    } catch (e) {
        // nothing
    }
    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params }) {
    console.log('RENDERING: ' + params.url.join('/'));
    const url = params.url.join('/');

    const cobaltData = await getCobaltPageByUrl(url);
    
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