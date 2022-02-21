import { DataObjectTwoTone, SixteenMp } from '@mui/icons-material';
import { xml2json } from 'xml-js'

export function getCobaltDataHelper(data) {
    let helper = null;
    switch (data.sys.baseType) {
        case "webpage":
            return getCobaltWebPageHelper(data);
            break;
        case "webpagefragment":
            return getCobaltWebPageHelper(data);
            break;
        case "article":
            return getCobaltArticleHelper(data);
            break;
        case "liveblog":
            return getCobaltLiveblogHelper(data);
            break;
        default:
            return null;
    }
}

export function buildCobaltDataFromPage(pageData, siteStructure, site, url, previewData) {

    const helper = getCobaltDataHelper(pageData.model.data);

    let linkContext = null;
    if (previewData && pageData.model.data.sys.baseType === 'webpagefragment') {
        linkContext = {
            linkTemplate: helper.pageTemplate
        }
    }

    const cobaltData = {
        object: {
            data: pageData.model.data,
            helper: helper,
        },
        linkContext: linkContext,
        pageContext: {
            url: url,
            nodes: pageData.model.nodes,
            resourcesUrls: pageData.resourcesUrls,
            nodesUrls: pageData.nodesUrls
        },
        siteContext: {
            site: site,
            siteStructure: siteStructure
        },
        previewData
    }
    return cobaltData
}

export function buildCobaltDataForNestedObject(object, parentCobaltData, linkContext) {
    const cobaltData = {
        object: {
            data: object,
            helper: getCobaltDataHelper(object)
        },
        linkContext,
        siteContext: parentCobaltData.siteContext,
        pageContext: parentCobaltData.pageContext,
        previewData: parentCobaltData.previewData
    }
    return cobaltData
}

export function getQueryResultObjects(cobaltData) {
    let resultObjects = [];
    try {
        resultObjects = cobaltData
            .object.data.children
            .filter((child) => {
                const objNodeData = cobaltData.pageContext.nodes[child]
                return isCurrentSiteContent(objNodeData,cobaltData.siteContext)
            })
            .map((child) => {
                const objNodeData = cobaltData.pageContext.nodes[child]
                const linkContext = {
                    linkData: null,
                    linkTemplate: 'list'
                }
                const objCobaltData = buildCobaltDataForNestedObject(objNodeData, cobaltData, linkContext)
                return objCobaltData
            })
    } catch (e) { console.log(e) }

    return resultObjects
}

export function getDwxLinkedObjects(cobaltData, zoneName) {
    let linkedObjects = [];
    try {
        linkedObjects = cobaltData.object.helper.zones
            .find((zone) => zone.zone === zoneName)
            .objects
            .map((link) => {
                // Here we need to build the cobaltData for each object

                const objNodeData = cobaltData.pageContext.nodes[link.objectId]

                let linkTemplate = null
                if (link.linkData && link.linkData.template) {
                    linkTemplate = link.linkData.template
                } else {
                    try {
                        linkTemplate = cobaltData.object.data.files.templates.data[cobaltData.linkContext.linkTemplate].zones[zoneName].sequences[0].styleSheet
                    } catch (e) {
                    }
                }
                if (!linkTemplate) {
                    //No default template found -> setting defaults
                    switch (objNodeData.sys.type) {
                        case 'featured': linkTemplate = 'featured_standard'; break;
                        case 'segment': linkTemplate = 'section_teaser'; break;
                        case 'article': linkTemplate = 'head-pic'; break;
                    }
                }
                
                const linkContext = {
                    linkData: link.linkData,
                    linkTemplate: linkTemplate
                }

                const objCobaltData = buildCobaltDataForNestedObject(objNodeData, cobaltData, linkContext)

                return objCobaltData
            })
    }
    catch (e) {
    }
    return linkedObjects
}

function getCobaltWebPageHelper(data) {

    const zones = Object.keys(data.files.content.data.zones)

    let zonesWithObjects;
    try {
        zonesWithObjects = zones.filter((zone) => data.links.pagelink[zone])
            .map((zone) => {
                return {
                    zone: zone,
                    objects: data.links.pagelink[zone].map((link) => {
                        return {
                            linkData: link.metadata,
                            objectId: link.targetId
                        }
                    })
                }
            })
    } catch (e) { }

    return {
        pageTemplate: data.files.content.data.pageTemplate,
        zones: zonesWithObjects
    }
}

function getCobaltArticleHelper(data) {
    let content = null;
    try {
        content = JSON.parse(xml2json(data.files.content.data))
    } catch (e) {
        console.log("error parsing object xml: " + e)
    }

    return {
        content
    };
}

function getCobaltLiveblogHelper(data) {
    let content = null;
    try {
        content = JSON.parse(xml2json(data.files.content.data))
    } catch (e) {
        console.log("error parsing object xml: " + e)
    }

    return {
        content
    };
}

export function getCobaltLiveblogPostHelper(data) {
    let content = null;
    try {
        content = JSON.parse(xml2json(data.files.content.data))
    } catch (e) {
        console.log("error parsing object xml: " + e)
    }

    return {
        content
    };
}

export function getSiteNameByHostName(hostName, sites) {
    let site = null
    if (sites.length) {
        site = sites.find((site) => site.customAttributes.frontendHostname === hostName)
        if (!site) {
            site = sites[0]
        }
    }
    if (site) {
        return site.name
    }
}

export function isCurrentSiteContent(obj, siteContext){
    let result = false;

    const pubAttributes = obj.attributes.secondary_sections
    if (Array.isArray(pubAttributes)){
        result = pubAttributes.some((attr) => attr.siteName === siteContext.site)
    } else {
        result = pubAttributes.siteName === siteContext.site
    }
    return result;
}

export function getObjectMainSite(obj){
    const pubAttributes = obj.attributes.secondary_sections
    let siteName = null
    if (Array.isArray(pubAttributes)){
        siteName = pubAttributes[0].siteName
    } else {
        siteName = pubAttributes.siteName
    }
    return siteName;
}

export function getObjectMainSection(obj){
    const pubAttributes = obj.attributes.secondary_sections
    let section = null
    if (Array.isArray(pubAttributes)){
        section = pubAttributes[0].mainSection
    } else {
        section = pubAttributes.mainSection
    }
    return section;
}