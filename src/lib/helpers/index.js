import Head from "next/head";

export function getMetaHeader(cobaltData){
    let metaHeader = null;

    const metaTitle = getSeoTitle(cobaltData)

    if(metaTitle){
        metaHeader = (
            <Head>
                <title>{metaTitle}</title>
            </Head>
        )
    }
    
    return metaHeader;
}

export function getSeoTitle(cobaltData){
    let seoTitle = ''
    let websiteName = "The Globe"
    try{
        websiteName = cobaltData.siteContext.siteStructure.find((site) => site.name === cobaltData.siteContext.site).title
    }catch(e){}
     
    switch (cobaltData.object.data.sys.baseType) {
        case 'section':
        case 'webpage':
            seoTitle = websiteName
            if(cobaltData.pageContext.url !== '/'){
                //TODO get the section name from site structure
                const sectionName = cobaltData.pageContext.url.charAt(0).toUpperCase() + cobaltData.pageContext.url.slice(1)
                seoTitle = seoTitle + " - " + sectionName
            }
            break;
        case 'liveblog':
        case 'article':
            seoTitle = websiteName + " - " + cobaltData.object.data.title
            break;
    }
    return seoTitle;
}