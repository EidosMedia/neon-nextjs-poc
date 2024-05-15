/**
 *
 * @param resourceUrl
 * @param previewData
 * @param site
 */
export default function resourceUrl (resourceUrl: string, preview?: boolean) {
    if(preview){
        resourceUrl = '/preview'+resourceUrl;
    }
    console.log('resourceUrl', resourceUrl);
    return `/api/imageProxy?url=${resourceUrl}`;
};
