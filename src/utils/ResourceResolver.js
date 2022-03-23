export default function ResourceResolver(resourceUrl, previewData, site){
    let url = null;
    if (previewData){
        url = previewData.basePreviewUrl + resourceUrl + "?emk.site=" + site + "&emauth="+previewData.emauth+"&token="+previewData.previewToken
        url = encodeURIComponent(url)
        url = '/api/imageProxy?url='+ url
    } else {
        url = process.env.NEXT_PUBLIC_RESOURCES_PUBLIC_BASE + resourceUrl + '?emk.site=' + site
    }
    return url 
}