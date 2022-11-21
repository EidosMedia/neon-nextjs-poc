import axios from 'axios'
import cacheData from "memory-cache";
import { COMMON_DATA_CACHE_TTL_SECONDS } from '../../../apps.settings';
import { buildCobaltDataFromPage, getCobaltDataHelper, getSiteNameByHostName } from './cobalt-helpers';

var http = require('http');
var agent = new http.Agent({ family: 4 });

export async function getCobaltPageByUrl(hostName, url, variant) {

    let siteStructure = null;
    try {
        siteStructure = await getCobaltSites()
    } catch (e) { }

    const siteName = getSiteNameByHostName(hostName, siteStructure)
    let cobaltData = null

    if (siteName) {
        let pageData = null;

        const requestUrl = '/api/pages/?url=' + url + '&emk.site=' + siteName
        console.log("Getting cobalt data from " + requestUrl)
        pageData = await cobaltRequest(requestUrl)

        cobaltData = buildCobaltDataFromPage(pageData, siteStructure, siteName, url, null, variant);
    } else {
        cobaltData = {
            error: 'not-found'
        }
    }
    return cobaltData;
}

export async function getcobaltPageById(id, siteName, foreignId = false) {
    let siteStructure = null;
    try {
        siteStructure = await getCobaltSites()
    } catch (e) { }

    let pageData = null;

    let requestUrl = '/api/pages/' + (foreignId ? 'foreignid/' : '') + id + '?emk.site=' + siteName
    console.log("Getting cobalt data from " + requestUrl)
    pageData = await cobaltRequest(requestUrl)

    const cobaltData = buildCobaltDataFromPage(pageData, siteStructure, siteName, null, null, null);

    return cobaltData;
}

export async function getCobaltPreview(previewData) {

    let siteStructure = null;
    try {
        siteStructure = await getCobaltSites()
    } catch (e) { }

    const jwe = previewData['emk.jwe']
    const previewToken = previewData['emk.previewToken']
    const siteName = previewData['emk.site']

    let url = '/api/pages/' + previewData['emk.foreignId']
        + '@eom?emk.site=' +  encodeURIComponent(siteName)
        + '&emk.previewSection=' + previewData['emk.previewSection']
        + '&emk.disableCache=true'

    let pageData = null;

    try {
        const options = {
            method: 'GET',
            httpAgent: agent,
            url: process.env.COBALT_BASE_HOST + url,
            mode: 'no-cors',
            headers: {
                Authorization: `Bearer ${jwe}`,
                Cookie: "emk.previewToken=" + previewToken + ";"
            }
        };

        const response = await axios.request(options)
        pageData = response.data
    }
    catch (e) {
        console.log(e)
    }

    console.log(pageData)

    const previewInfo = {
        previewToken: previewToken,
        jwe: jwe,
        basePreviewUrl: process.env.COBALT_BASE_HOST //TODO not needed?
    }

    const cobaltData = buildCobaltDataFromPage(pageData, siteStructure, siteName, "/preview", previewInfo, null);

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

export async function cobaltRequest(url) {

    let result = null;

    if(process.env.COBALT_DISABLE_CACHE === 'true'){
        url += '&emk.disableCache=true'
    }

    try {
        const options = {
            method: 'GET',
            httpAgent: agent,
            url: process.env.COBALT_BASE_HOST + url,
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
        const authData = { "name": process.env.COBALT_USERNAME, "password": process.env.COBALT_PASSWORD }
        const options = {
            method: 'POST',
            url: process.env.COBALT_BASE_HOST + '/directory/sessions/login',
            mode: 'no-cors',
            data: authData,
            httpAgent: agent,
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

export async function cobaltPollVote(site, nodeId, pollId, answerId){
    let response = null
    try {
        const pollData = { 
            "siteName": site,
            "nodeId": nodeId,
            "pollId": pollId,
            "answerId":answerId
        }
        const options = {
            method: 'POST',
            url: process.env.COBALT_BASE_HOST + '/directory/polls/vote',
            mode: 'no-cors',
            data: pollData,
            httpAgent: agent,
            config: {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        };

        response = await axios.request(options)
    }
    catch (e) {
        console.log(e)
    }
    return response
}

export async function getCobaltSitemap(siteName, token) {
    let result = null;
    try {
        const options = {
            method: 'GET',
            url: process.env.COBALT_BASE_HOST + '/core/sites/sitemap?emauth=' + token + '&siteName=' + siteName + '&viewStatus=LIVE',
            mode: 'no-cors',
            httpAgent: agent
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
                    httpAgent: agent,
                    url: process.env.COBALT_BASE_HOST + '/core/sites?emauth=' + token,
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

export async function getCobaltSeoSitemap(hostName, url) {

    let siteStructure = null;
    try {
        siteStructure = await getCobaltSites()
    } catch (e) { }

    const siteName = getSiteNameByHostName(hostName, siteStructure)
    let sitemapData = null

    if (siteName) {
        const requestUrl = "/" + url + '?emk.site=' + siteName
        console.log("Getting cobalt data from " + requestUrl)
        sitemapData = await cobaltRequest(requestUrl)
    } 

    return sitemapData;
}