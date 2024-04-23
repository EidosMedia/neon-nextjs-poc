/**
 *
 * @param resourceUrl
 * @param previewData
 * @param site
 */
export default function ResourceResolver(resourceUrl, previewData, site) {
    let url = null;
    console.log('resourceUrl', resourceUrl);
    if (site.includes('[PREVIEW]')) {
        // Manage the case in which a preview call returns live resources (e.g. queries in DWP)
        site = site.split('[PREVIEW]')[0];
    }
    url = `${process.env.NEXT_PUBLIC_RESOURCES_PUBLIC_BASE + resourceUrl}?emk.site=${site}`;
    console.log('imageURl', url);
    return url;
}
