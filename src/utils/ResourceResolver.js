import { RESOURCES_PUBLIC_BASE } from "../../cobalt.settings";

export default function ResourceResolver(resourceUrl, previewData){
    let url = null;
    if (previewData){
        url = encodeURIComponent(previewData.basePreviewUrl + resourceUrl + "?emauth="+previewData.emauth+"&token="+previewData.previewToken)
        url = '/api/imageProxy?url='+ url
    } else {
        url = RESOURCES_PUBLIC_BASE + resourceUrl + '?emk.site=express-website'
    }
    return url 
}