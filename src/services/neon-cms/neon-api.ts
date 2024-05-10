import axios from 'axios';
import cacheData from 'memory-cache';
import { COMMON_DATA_CACHE_TTL_SECONDS } from '../../../apps.settings';
import { buildNeonDataFromPage, getApiHostname, getSiteByHostname, getSiteNameByHostName } from './neon-helpers';
import { HttpClient, http as httpClient } from './http-client';
import http from 'http';

const agent = new http.Agent({ family: 4 });

/**
 *
 */
export async function getNeonSites() {
    const cacheKey = 'sites';
    const sitesFromCache = cacheData.get(cacheKey);

    if (sitesFromCache) {
        return sitesFromCache;
    }

    try {
        const apiUrl = `${process.env.NEON_BASE_HOST}/api/sites/live`;

        const options = {
            method: 'GET',
            httpAgent: agent,
            url: apiUrl,
            mode: 'no-cors'
        };

        const response = await axios.request(options);
        const sites = response.data;
        if (sites) {
            const sitesWithSitemap = await Promise.all(
                sites.map(async site => {
                    const sitemap = await getNeonSitemap(site.root.name);
                    return {
                        ...site,
                        sitemap
                    };
                })
            );
            cacheData.put(cacheKey, sitesWithSitemap, COMMON_DATA_CACHE_TTL_SECONDS * 1000);
            return sitesWithSitemap;
        }
    } catch (e) {
        console.error('Unable to fetch the sites');
        console.error(e);
    }

    return null;
}

/**
 *
 * @param hostName
 * @param url
 * @param variant
 */
export async function getNeonPageByUrl(url) {
    let siteStructure = null;
    try {
        siteStructure = await getNeonSites();
    } catch (e) {}

    const urlObject = new URL(url);

    const hostName = urlObject.hostname;
    const protocol = urlObject.protocol;

    let hostnameWithProtocol = `${protocol}//${hostName}`;
    console.log('hostnameWithProtocol',hostnameWithProtocol);
    const siteName = getSiteNameByHostName(hostnameWithProtocol, siteStructure);
    let neonData = null;
    if(urlObject.port && urlObject.port != '' && urlObject.port != '80' && urlObject.port != '443'){
        hostnameWithProtocol = `${hostnameWithProtocol}:${urlObject.port}`;
    }
    console.log('url',url);
    console.log('hostnameWithProtocol',hostnameWithProtocol);
    if (siteName) {
        // let pageData = null;

        const requestUrl = `/api/pages?url=${url.replace(
            `${hostnameWithProtocol}`,
            ''
        )}&emk.site=${siteName}`;
        console.log('requestUrl', requestUrl);

        // const pageData = await getPageFromSite(url, siteName);
        const pageData = await neonRequest(requestUrl, siteName);
        // pageData = await neonRequest(requestUrl);

        neonData = await buildNeonDataFromPage(pageData, siteStructure, siteName, url);
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
export async function getNeonPageById(id, siteName) {
    let siteStructure = null;
    try {
        siteStructure = await getNeonSites();
    } catch (e) {}

    let pageData = null;

    const requestUrl = `/api/pages/${id}?emk.site=${siteName}`;
    pageData = await neonRequest(requestUrl, siteName);

    const neonData = await buildNeonDataFromPage(pageData, siteStructure, siteName, null);

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

    const previewToken = previewData['emauth'];
    console.log('============================= previewToken', previewToken);

    const urlObject = new URL(previewData.url);

    const baseUrl = await getApiHostname(urlObject);

    const urlParams = new URLSearchParams(urlObject.search);
    const id = urlParams.get('id');
    const baseHost = urlObject.host;

    let pageData = null;

    let requestUrl = `${urlObject.protocol}//${baseUrl}${urlObject.pathname.replace('/_sites/preview/'+baseHost, '')}`;

    if (id !== null) {
        requestUrl = `${urlObject.protocol}//${baseUrl}${urlObject.pathname.replace('/_sites/preview/'+baseHost, '/api/pages/')}${id}`
    }
    
    console.log('============================= requestUrl', requestUrl);

    try {
        const options = {
            method: 'GET',
            httpAgent: agent,
            url: requestUrl,
            mode: 'no-cors',
            headers: {
                emauth: previewToken
            }
        };

        const response = await axios.request(options);
        pageData = response.data;
    } catch (e) {
        console.log('============================= error', e);

        console.log(e);
    }
    const sites = await getNeonSites();
    const sitename = getSiteByHostname(`${urlObject.protocol}//${urlObject.hostname}`, sites).root.name;
    const neonData = await buildNeonDataFromPage(pageData, siteStructure, sitename, '/preview');

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

    const searchData = await neonRequest(requestUrl, siteName);

    return searchData;
}

/**
 *
 * @param url
 */
export async function neonRequest(url, siteName?) {
    const apiHostname = await getApiHostname(url, siteName);

    const options = {
        url: (process.env.DEV_MODE === 'true' ? 'http://' : 'https://') + apiHostname + url
    };
    console.log('calling: ', options.url);
    const response = await httpClient.get(options.url, options);

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
                Accept: 'application/json',
                'Content-Type': 'application/json'
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
            httpAgent: agent
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
        sitemapData = await neonRequest(requestUrl);
    }

    return sitemapData;
}
