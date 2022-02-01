import { useRouter } from "next/dist/client/router";
import { COBALT_BASE, COBALT_PREVIEW_BASE } from "../../cobalt.settings";

export default function ResourceResolver(resourceUrl, emauth, previewToken){
    const router = useRouter();
    let url = null;
    if (emauth){
        url = encodeURIComponent(COBALT_PREVIEW_BASE + resourceUrl + "?emauth="+emauth+"&token="+previewToken)
        url = '/api/imageProxy?url='+ url
    } else {
        url = COBALT_BASE + resourceUrl
    }
    return url 
}