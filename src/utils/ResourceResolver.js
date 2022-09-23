export default function ResourceResolver(resourceUrl, previewData, site){
    let url = null;
    if (previewData && resourceUrl.includes("@eom")){
        url = previewData.basePreviewUrl + resourceUrl + "?emk.site=" + site + "&emauth="+previewData.emauth+"&token="+previewData.previewToken
        url = encodeURIComponent(url)
        url = '/api/imageProxy?url='+ url
    } else {
        if (site.includes("[PREVIEW]")){ // Manage the case in which a preview call returns live resources (e.g. queries in DWP)
            site = site.split('[PREVIEW]')[0]
        }
        url = process.env.NEXT_PUBLIC_RESOURCES_PUBLIC_BASE + resourceUrl + '?emk.site=' + site
    }
    return url 
}