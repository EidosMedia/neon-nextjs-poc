import axios from 'axios';
import cacheData from 'memory-cache';
import { COMMON_DATA_CACHE_TTL_SECONDS } from '../../../apps.settings';
import { buildNeonDataFromPage, getApiHostname, getSiteByHostname, getSiteNameByHostName } from './neon-helpers';
import { HttpClient, http as httpClient } from './http-client';
import http from 'http';
import logger from 'logger';

const agent = new http.Agent({ family: 4 });

/**
 *
 */
export async function getNeonSites() {
    try {
        const apiUrl = `${process.env.NEON_BASE_HOST}/api/sites/live?siteMap=true`;

        const options = {
            method: 'GET',
            httpAgent: agent,
            url: apiUrl,
            mode: 'no-cors',
            headers: {
                'neon-fo-access-key': process.env.NEON_API_KEY
            }
        };

        const response = await axios.request(options);
        const sites = response.data;

        if (sites) {
            const sitesWithSitemap = await Promise.all(
                sites.map(async site => {
                    const logoUrl = await getNeonLogoUrl(site.root.id, site.apiHostnames.liveHostname);

                    return {
                        ...site,
                        logoUrl
                    };
                })
            );
            // cacheData.put(cacheKey, sitesWithSitemap, COMMON_DATA_CACHE_TTL_SECONDS * 1000);
            return sitesWithSitemap;
        }
    } catch (e) {
        logger.error('Unable to fetch the sites');
        logger.error(e);
    }

    return null;
}

/**
 *
 * @param hostName
 * @param url
 * @param variant
 */
export async function getNeonPageByUrl(url, options) {
    let siteStructure = null;
    try {
        siteStructure = await getNeonSites();
    } catch (e) {}

    const urlObject = new URL(url);

    const hostName = urlObject.hostname;
    const envProtocol = new URL(process.env.NEON_BASE_HOST).protocol;

    let hostnameWithProtocol = `${envProtocol}//${hostName}`;
    if (urlObject.port && urlObject.port != '' && urlObject.port != '80' && urlObject.port != '443') {
        hostnameWithProtocol = `${hostnameWithProtocol}:${urlObject.port}`;
    }
    const siteName = getSiteNameByHostName(hostnameWithProtocol, siteStructure);
    let neonData = null;

    if (siteName) {
        let requestUrl = '';
        if (urlObject.searchParams.get('id')) {
            requestUrl = `/api/pages/${urlObject.searchParams.get('id')}?emk.site=${siteName}`;
        } else {
            requestUrl = `/api/pages?url=${url.replace(`${hostnameWithProtocol}`, '')}&emk.site=${siteName}`;
        }

        const pageData = await neonRequest(requestUrl, options, siteName);

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
    pageData = await neonRequest(requestUrl, {}, siteName);

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

    const previewToken = previewData['empreviewauth'];
    logger.debug('============================= previewToken: ' + previewToken);

    const urlObject = new URL(previewData.url);

    const baseUrl = await getApiHostname(urlObject);

    const urlParams = new URLSearchParams(urlObject.search);
    const id = urlParams.get('id');
    const baseHost = urlObject.hostname;

    const envProtocol = new URL(process.env.NEON_BASE_HOST).protocol;

    let pageData = null;

    let requestUrl = `${envProtocol}//${baseUrl}${urlObject.pathname.replace('/_sites/preview/' + baseHost, '')}`;

    if (id !== null) {
        requestUrl = `${envProtocol}//${baseUrl}${urlObject.pathname.replace(
            '/_sites/preview/' + baseHost,
            '/api/pages/'
        )}${id}`;
    }

    logger.debug('============================= requestUrl: ' + requestUrl);

    try {
        const options = {
            method: 'GET',
            httpAgent: agent,
            url: requestUrl,
            mode: 'no-cors',
            headers: {
                Authorization: 'Bearer ' + previewToken,
                'neon-fo-access-key': process.env.NEON_API_KEY
            }
        };

        const response = await axios.request(options);
        console.log('response from getModel', response);
        pageData = response.data;
    } catch (e) {
        logger.info('============================= error', e);

        logger.info(e);
    }

    const sites = await getNeonSites();
    const sitename = getSiteByHostname(`${envProtocol}//${urlObject.host}`, sites).root.name;
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

    const searchData = await neonRequest(requestUrl, {}, siteName);

    return searchData;
}

/**
 *
 * @param url
 */
export async function neonRequest(url, extOptions, siteName?) {
    const apiHostname = await getApiHostname(url, siteName);
    let newUrl;

    const envProtocol = new URL(process.env.NEON_BASE_HOST).protocol;

    if (url.startsWith('http')) {
        newUrl = url;
    } else {
        newUrl = `${envProtocol}//${apiHostname}${url}`;
    }

    const options = {
        url: newUrl,
        headers: {
            'neon-fo-access-key': process.env.NEON_API_KEY,
            Authorization: 'Bearer ' + extOptions.cookies?.empreviewauth
        }
    };

    logger.debug('calling: ' + options.url);
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
                'Content-Type': 'application/json',
                'neon-fo-access-key': process.env.NEON_API_KEY
            }
        };

        response = await axios.request(options);
    } catch (e) {
        logger.error(e);
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
                'neon-fo-access-key': process.env.NEON_API_KEY
            }
        };

        const response = await axios.request(options);
        result = response.data;

        console.log('result', result);
    } catch (e) {
        logger.error(e);
    }
    return result;
}

/**
 *
 * @param hostName
 * @param url
 */
export async function getNeonSeoSitemap(baseUrl) {
    let siteStructure = null;
    try {
        siteStructure = await getNeonSites();
    } catch (e) {}

    let sitemapData = null;

    let newUrl;

    const envProtocol = new URL(process.env.NEON_BASE_HOST).protocol;

    const urlObject = new URL(baseUrl);

    let hostnameWithProtocol = `${envProtocol}//${urlObject.hostname}`;
    if (urlObject.port && urlObject.port != '' && urlObject.port != '80' && urlObject.port != '443') {
        hostnameWithProtocol = `${hostnameWithProtocol}:${urlObject.port}`;
    }
    const siteName = getSiteNameByHostName(hostnameWithProtocol, siteStructure);

    sitemapData = await neonRequest(urlObject.pathname, {}, siteName);

    return sitemapData;
}
async function getNeonLogoUrl(id: any, liveHostName) {
    const requestUrl = `${liveHostName}/api/nodes/${id}`;
    const envProtocol = new URL(process.env.NEON_BASE_HOST).protocol;

    const logoUrl = `${envProtocol}://${requestUrl}`;
    let result;

    try {
        const options = {
            method: 'GET',
            //url: requestUrl,
            url: logoUrl,
            mode: 'no-cors',
            httpAgent: agent,
            headers: {
                'neon-fo-access-key': process.env.NEON_API_KEY
            }
        };

        const response = await axios.request(options);

        result = response.data.files?.logo.resourceUrl || '';
    } catch (e) {
        logger.error('Unable to get logo for this liveHostname', liveHostName);
        result = '';
    }

    // logger.info('result: ' + result);

    return result;
}
