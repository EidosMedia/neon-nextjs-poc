import axios from 'axios';
import cacheData from 'memory-cache';
import { COMMON_DATA_CACHE_TTL_SECONDS } from '../../../apps.settings';
import { buildNeonDataFromPage, getNeonDataHelper, getSiteNameByHostName } from './neon-helpers';
import http from 'http';

const agent = new http.Agent({ family: 4 });

/**
 *
 */
export async function getNeonSites() {
    const cacheKey = 'sites';
    let sites = null;
    sites = cacheData.get(cacheKey);
    if (sites) {
        console.log('getting cached sites structure');
        return sites;
    }

    try {
        const apiUrl = `${process.env.NEON_BASE_HOST}/api/sites/live`;

        const options = {
            method: 'GET',
            httpAgent: agent,
            url: apiUrl,
            mode: 'no-cors',
            headers: {
                'X-APIKey': process.env.NEON_API_KEY,
                'X-Cobalt-Tenant': 'globe'
            }
        };

        const response = await axios.request(options);
        sites = response.data;
    } catch (e) {
        console.log(e);
    }

    if (sites) {
        sites = await Promise.all(
            sites.map(async site => {
                const sitemap = await getNeonSitemap(site.root.name);
                return {
                    ...site,
                    sitemap
                };
            })
        );
    }
    cacheData.put(cacheKey, sites, COMMON_DATA_CACHE_TTL_SECONDS * 1000);
    return sites;
}

/**
 *
 * @param hostName
 * @param url
 * @param variant
 */
export async function getNeonPageByUrl(hostName, url, variant) {
    let siteStructure = null;
    try {
        siteStructure = await getNeonSites();
    } catch (e) {}

    const siteName = getSiteNameByHostName(hostName, siteStructure);
    let neonData = null;

    if (siteName) {
        let pageData = null;

        const requestUrl = `/api/pages?url=${url}&emk.site=${siteName}`;
        console.log(`Getting cobalt data from ${requestUrl}`);
        pageData = await neonRequest(requestUrl);

        neonData = buildNeonDataFromPage(pageData, siteStructure, siteName, url, null, variant);
    } else {
        neonData = {
            error: 'not-found'
        };
    }
    return neonData;
}

/**
 *
 * @param id
 * @param siteName
 * @param foreignId
 */
export async function getNeonPageById(id, siteName, foreignId = false) {
    let siteStructure = null;
    try {
        siteStructure = await getNeonSites();
    } catch (e) {}

    let pageData = null;

    const requestUrl = `/api/pages/${foreignId ? 'foreignid/' : ''}${id}?emk.site=${siteName}`;
    pageData = await neonRequest(requestUrl);

    const neonData = buildNeonDataFromPage(pageData, siteStructure, siteName, null, null, null);

    return neonData;
}

/**
 *
 * @param previewData
 */
export async function getNeonPreview(previewData) {
    let siteStructure = null;
    try {
        siteStructure = await getNeonSites();
    } catch (e) {}

    const jwe = previewData['emk.jwe'];
    const previewToken = previewData['emk.previewToken'];
    const siteName = previewData['emk.site'];

    const url = `/api/pages/${previewData['emk.foreignId']}@eom?emk.site=${encodeURIComponent(
        siteName
    )}&emk.previewSection=${previewData['emk.previewSection']}&emk.disableCache=true`;

    let pageData = null;

    try {
        const options = {
            method: 'GET',
            httpAgent: agent,
            url: process.env.NEON_BASE_HOST + url,
            mode: 'no-cors',
            headers: {
                'X-APIKey': process.env.NEON_API_KEY,
                'X-Cobalt-Tenant': 'globe',
                Authorization: `Bearer ${jwe}`,
                Cookie: `emk.previewToken=${previewToken};`
            }
        };

        const response = await axios.request(options);
        pageData = response.data;
    } catch (e) {
        console.log(e);
    }

    const previewInfo = {
        previewToken,
        jwe,
        basePreviewUrl: process.env.NEON_BASE_HOST // TODO not needed?
    };

    const neonData = buildNeonDataFromPage(pageData, siteStructure, siteName, '/preview', previewInfo, null);

    return neonData;
}

/**
 *
 * @param siteName
 * @param sorting
 * @param filters
 */
export async function searchNeon(siteName, sorting, filters) {
    let requestUrl = `/api/search?emk.site=${siteName}`;
    if (sorting) {
        requestUrl += `&sorting=${sorting.order === 'DESC' ? '-' : '+'}${sorting.param}`;
    }
    if (filters) {
        filters.forEach(filter => {
            requestUrl += `&${filter.param}=${filter.value}`;
        });
    }

    const searchData = await neonRequest(requestUrl);

    return searchData;
}

/**
 *
 * @param url
 */
export async function neonRequest(url) {
    if (process.env.COBALT_DISABLE_CACHE === 'true') {
        url += '&emk.disableCache=true';
    }

    const options = {
        method: 'GET',
        httpAgent: agent,
        url: process.env.NEON_BASE_HOST + url,
        mode: 'no-cors',
        headers: {
            'X-APIKey': process.env.NEON_API_KEY
        }
    };

    const response = await axios.request(options);

    console.log('response', response.data);
    const result = response.data;
    return result;
}

/**
 *
 * @param site
 * @param nodeId
 * @param pollId
 * @param answerId
 */
export async function neonPollVote(site, nodeId, pollId, answerId) {
    let response = null;
    try {
        const pollData = {
            siteName: site,
            nodeId,
            pollId,
            answerId
        };
        const options = {
            method: 'POST',
            url: `${process.env.NEON_BASE_HOST}/directory/polls/vote`,
            mode: 'no-cors',
            data: pollData,
            httpAgent: agent,
            headers: {
                'X-APIKey': process.env.NEON_API_KEY,
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Cobalt-Tenant': 'globe'
            }
        };

        response = await axios.request(options);
    } catch (e) {
        console.log(e);
    }
    return response;
}

/**
 *
 * @param siteName
 */
export async function getNeonSitemap(siteName) {
    let result = null;

    const apiUrl = `${process.env.NEON_BASE_HOST}/api/sites/live?sitemap=true?name="${siteName}"`;

    try {
        const options = {
            method: 'GET',
            url: apiUrl,
            mode: 'no-cors',
            httpAgent: agent,
            headers: {
                'X-APIKey': process.env.NEON_API_KEY,
                'X-Cobalt-Tenant': 'globe'
            }
        };

        const response = await axios.request(options);
        result = response.data;
    } catch (e) {
        console.log(e);
    }
    return result;
}

/**
 *
 * @param hostName
 * @param url
 */
export async function getNeonSeoSitemap(hostName, url) {
    let siteStructure = null;
    try {
        siteStructure = await getNeonSites();
    } catch (e) {}

    const siteName = getSiteNameByHostName(hostName, siteStructure);
    let sitemapData = null;

    if (siteName) {
        const requestUrl = `/${url}?emk.site=${siteName}`;
        console.log(`Getting cobalt data from ${requestUrl}`);
        sitemapData = await neonRequest(requestUrl);
    }

    return sitemapData;
}
