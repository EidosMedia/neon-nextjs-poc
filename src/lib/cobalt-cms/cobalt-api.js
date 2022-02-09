import axios from 'axios'
import cacheData from "memory-cache";
import { COBALT_BASE, COBALT_PREVIEW_BASE } from '../../../cobalt.settings';
import { COMMON_DATA_CACHE_TTL_MINUTES } from '../../../apps.settings';
import { buildCobaltDataFromPage, getCobaltDataHelper } from './cobalt-helpers';

export async function getCobaltPageByUrl(url,previewUrl){

    let pageData = null;

    let previewData = null

    if(previewUrl){
        //pageData = await cobaltRequest('/',previewUrl)
        let result = await cobaltPreviewRequest(previewUrl)
        pageData = result.data;
        previewData = {
            emauth: result.emauth,
            previewToken: result.previewToken
        }
    } else {
        pageData = await cobaltRequest('/api/pages/?url=' + url)
    }
    const siteStructure = await getCobaltSite(false)

    const cobaltData = buildCobaltDataFromPage(pageData, siteStructure, url, previewData);

    return cobaltData;
}

async function cobaltPreviewRequest(previewUrl){
    let result = null
    try {
        previewUrl = decodeURIComponent(previewUrl)
        const options1 = {
            method: 'GET',
            url:  previewUrl,
            mode: 'no-cors',
            maxRedirects:0,
            validateStatus: function (status) {
                return status >= 200 && status < 303; // default
            }
        };

        const response1 = await axios.request(options1)

        const emauthHeader = response1.headers['set-cookie'].find((header) => header.startsWith('emauth'))
        const emauthValue = emauthHeader.substring(emauthHeader.indexOf('=')+1,emauthHeader.indexOf(';'))  
        console.log("emauth: " + emauthValue)
        const previewTokenPosition = previewUrl.indexOf('emk.previewToken=')+17;
        const previewToken = previewUrl.substring(previewTokenPosition,previewUrl.indexOf('&',previewTokenPosition))
        console.log("token: " + previewToken)
        const basePreviewUrl = previewUrl.substring(0,previewUrl.indexOf('/',previewUrl.indexOf('//')+2))
        
        const options2 = {
            method: 'GET',
            url:  basePreviewUrl + response1.headers.location,
            mode: 'no-cors',
            headers:{
                Cookie:"emk.previewDefaultContent=false; emk.previewToken="+previewToken+"; emauth="+emauthValue
            }
        };

        const response2 = await axios.request(options2)

        result = {
            data: response2.data,
            emauth: emauthValue,
            previewToken: previewToken 
        } 
    }
    catch (e){
        //console.log(e)
    }
    return result
}

export async function cobaltRequest(url){

    let result = null;
    
    try {
        const options = {
            method: 'GET',
            url: COBALT_BASE+ url,
            mode: 'no-cors',
        };

        const response = await axios.request(options)
        result = response.data
    }
    catch (e){
        console.log(e)
    }
    return result
}

export async function getCobaltPageById(id,preview){

    let result = null;

    try {
        const options = {
            method: 'GET',
            url: (preview?COBALT_PREVIEW_BASE:COBALT_BASE) + '/api/pages/' + id,
            mode: 'no-cors'
        };

        const response = await axios.request(options)
        result = response.data;
    }
    catch (e){
        console.log(e)
    } 

    return result;

}

export async function searchCobalt(params,preview){
    let result = null;

    const qstring = params.reduce((acc,p,i) => {
        return acc + (i > 0?'&':'') + p.key + "=" + p.value
    },"?")
    
    try {
        const options = {
            method: 'GET',
            url: (preview?COBALT_PREVIEW_BASE:COBALT_BASE) + '/api/search' + qstring,
            mode: 'no-cors'
        };

        const response = await axios.request(options);
        result = response.data;
    }
    catch (e){
        console.log(e)
    }

    return result;

}

export async function getCobaltSite(preview){
    let result = null;
    const url = '/api/site';

    result = cacheData.get(url);
    if (result){
        console.log("getting cached site structure")
        return result;
    } else {
        console.log("fetching site structure")
        try {
            const options = {
                method: 'GET',
                url: (preview?COBALT_PREVIEW_BASE:COBALT_BASE) + '/api/site',
                mode: 'no-cors'
            };

            const response = await axios.request(options)
            result = response.data
            cacheData.put(url, result, COMMON_DATA_CACHE_TTL_MINUTES * 1000 * 60 );
        }
        catch (e){
            console.log(e)
        }
        return result;
    }
}