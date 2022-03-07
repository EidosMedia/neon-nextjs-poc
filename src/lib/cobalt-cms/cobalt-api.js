import axios from 'axios'
import cacheData from "memory-cache";
import { COMMON_DATA_CACHE_TTL_SECONDS } from '../../../apps.settings';
import { COBALT_BASE_HOST, COBALT_PASSWORD, COBALT_USERNAME } from '../../../cobalt.settings';
import { buildCobaltDataFromPage, getCobaltDataHelper, getSiteNameByHostName } from './cobalt-helpers';

export async function getCobaltPageByUrl(hostName, url, previewUrl) {

    let siteStructure = null;
    try {
        siteStructure = await getCobaltSites()
    } catch (e) { }

    const siteName = getSiteNameByHostName(hostName, siteStructure)
    let pageData = null;

    const requestUrl = '/api/pages/?url=' + url + '&emk.site=' + siteName
    console.log("Getting cobalt data from " + requestUrl)
    pageData = await cobaltRequest(requestUrl)

    const cobaltData = buildCobaltDataFromPage(pageData, siteStructure, siteName, url, null);

    return cobaltData;
}

export async function getCobaltPreview(siteName, previewUrl) {

    let siteStructure = null;
    try {
        siteStructure = await getCobaltSites()
    } catch (e) { }

    const result = await cobaltPreviewRequest(previewUrl)
    const pageData = result.data;
    const previewData = {
        emauth: result.emauth,
        previewToken: result.previewToken,
        basePreviewUrl: result.basePreviewUrl
    }

    const cobaltData = buildCobaltDataFromPage(pageData, siteStructure, siteName, "/preview", previewData);

    return cobaltData;

}

export async function searchCobalt(siteName, sorting, filters) {
    let requestUrl = '/api/search?emk.site=' + siteName
    if (sorting) {
        requestUrl += '&sorting=' + (sorting.order === 'DESC' ? '-' : '+') + sorting.param
    }
    if (filters) {
        filters.forEach((filter) => {
            requestUrl += '&' + filter.param + '=' + filter.value
        })
    }

    const searchData = await cobaltRequest(requestUrl);

    return searchData;
}

async function cobaltPreviewRequest(previewUrl) {
    let result = null
    try {
        previewUrl = decodeURIComponent(previewUrl)
        const options1 = {
            method: 'GET',
            url: previewUrl,
            mode: 'no-cors',
            maxRedirects: 0,
            validateStatus: function (status) {
                return status >= 200 && status < 303; // default
            }
        };

        const response1 = await axios.request(options1)

        const emauthHeader = response1.headers['set-cookie'].find((header) => header.startsWith('emauth'))
        const emauthValue = emauthHeader.substring(emauthHeader.indexOf('=') + 1, emauthHeader.indexOf(';'))
        console.log("emauth: " + emauthValue)
        const previewTokenPosition = previewUrl.indexOf('emk.previewToken=') + 17;
        const previewToken = previewUrl.substring(previewTokenPosition, previewUrl.indexOf('&', previewTokenPosition))
        console.log("token: " + previewToken)
        const basePreviewUrl = previewUrl.substring(0, previewUrl.indexOf('/', previewUrl.indexOf('//') + 2))

        const options2 = {
            method: 'GET',
            url: basePreviewUrl + response1.headers.location,
            mode: 'no-cors',
            headers: {
                Cookie: "emk.previewDefaultContent=false; emk.previewToken=" + previewToken + "; emauth=" + emauthValue
            }
        };

        const response2 = await axios.request(options2)

        result = {
            data: response2.data,
            emauth: emauthValue,
            previewToken: previewToken,
            basePreviewUrl: basePreviewUrl
        }
    }
    catch (e) {
        console.log(e)
    }
    return result
}

export async function cobaltRequest(url) {

    let result = null;

    try {
        const options = {
            method: 'GET',
            url: COBALT_BASE_HOST + url,
            mode: 'no-cors',
        };

        const response = await axios.request(options)
        result = response.data
    }
    catch (e) {
        console.log(e)
    }
    return result
}

export async function getCobaltAuthToken() {
    let token = null;
    try {
        const authData = { "name": COBALT_USERNAME, "password": COBALT_PASSWORD }
        const options = {
            method: 'POST',
            url: COBALT_BASE_HOST + '/directory/sessions/login',
            mode: 'no-cors',
            data: authData,
            config: {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        };

        const response = await axios.request(options)
        token = response.data.session.id
    }
    catch (e) {
        console.log(e)
    }
    return token

}

export async function getCobaltSitemap(siteName, token) {
    let result = null;
    try {
        const options = {
            method: 'GET',
            url: COBALT_BASE_HOST + '/core/sites/sitemap?emauth=' + token + '&siteName=' + siteName + '&viewStatus=LIVE',
            mode: 'no-cors'
        };

        const response = await axios.request(options)
        result = response.data
    }
    catch (e) {
        console.log(e)
    }
    return result;

}

export async function getCobaltSites() {
    const cacheKey = 'sites'
    let sites = null;
    sites = cacheData.get(cacheKey);
    if (sites) {
        console.log("getting cached sites structure")
        return sites;
    } else {
        console.log("fetching sitemap from Cobalt")
        let token = await getCobaltAuthToken();
        if (token) {
            try {
                const options = {
                    method: 'GET',
                    url: COBALT_BASE_HOST + '/core/sites?emauth=' + token,
                    mode: 'no-cors'
                };

                const response = await axios.request(options)
                sites = response.data
            }
            catch (e) {
                console.log(e)
            }
        }
        if (sites) {
            sites = await Promise.all(sites.result.map(async (site) => {
                const sitemap = await getCobaltSitemap(site.name, token);
                return {
                    ...site,
                    sitemap
                }
            }))
        }
        cacheData.put(cacheKey, sites, COMMON_DATA_CACHE_TTL_SECONDS * 1000);
        return sites;
    }

}