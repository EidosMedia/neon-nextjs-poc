/**
 *
 * @param resourceUrl
 * @param previewData
 * @param site
 */
export default resourceUrl => {
    return resourceUrl &&`/api/imageProxy?url=${resourceUrl.substring(1)}`;
};
