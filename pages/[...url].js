import Layout from "../src/components/Layout/Layout";
import LandingPage from "../src/components/Page/LandingPage";
import { getCobaltPageByUrl, getCobaltSite } from "../src/lib/cobalt-cms/cobalt-api";

export default function Page({ cobaltData }) {

    let render = null;
    let pageType = null;
    switch (cobaltData.object.data.sys.baseType) {
        case 'webpage':   
            render = <LandingPage cobaltData={cobaltData} />
            break;
        default:
            render = null;
    }

    return (
        <Layout>
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