/**
 *
 * @param resourceUrl
 * @param previewData
 * @param site
 */
export default resourceUrl => {
    console.log('resourceUrl', resourceUrl);
    return `/api/imageProxy?url=${resourceUrl?.substring(1)}`;
};
