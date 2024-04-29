import { NeonData, SiteNode, SiteStructure } from 'src/types/commonTypes';
import { URL } from 'url';
import { xml2json } from 'xml-js';
import { getNeonSites } from './neon-api';
import _ from 'lodash';
import ResourceResolver from 'src/utils/ResourceResolver';

function getNeonWebPageHelper(data) {
    const zones = Object.keys(data.files.content.data.zones);

    let zonesWithObjects = null;
    try {
        zonesWithObjects = zones
            .filter(zone => data.links.pagelink[zone])
            .map(zone => {
                return {
                    zone: zone,
                    objects: data.links.pagelink[zone].map(link => {
                        return {
                            linkData: link.metadata,
                            objectId: link.targetId
                        };
                    })
                };
            });
    } catch (e) {}

    return {
        pageTemplate: data.files.content.data.pageTemplate,
        zones: zonesWithObjects
    };
}

function getNeonArticleHelper(data) {
    let content = null;

    // console.log('neon article helper data', data);

    console.log('data.files.content', data.files.content);

    try {
        content = JSON.parse(xml2json(data.files.content.data));
        // console.log('content', content);
    } catch (e) {
        console.log('error parsing object xml: ' + e);
    }

    const mainPicture = data.links.system.mainPicture;

    return {
        content,
        mainPicture
    };
}

function getNeonLiveblogHelper(data) {
    let content = null;

    try {
        content = JSON.parse(xml2json(data.files.content.data));
    } catch (e) {
        console.log('error parsing object xml: ' + e);
    }

    return {
        content
    };
}

export function getNeonLiveblogPostHelper(data) {
    let content = null;
    try {
        content = JSON.parse(xml2json(data.files.content.data));
    } catch (e) {
        console.log('error parsing object xml: ' + e);
    }

    return {
        content
    };
}

/**
 *
 * @param data
 */
export function getNeonDataHelper(data) {
    console.log('data?.sys?.baseType', data?.sys?.baseType);

    switch (data?.sys?.baseType) {
        case 'webpage':
            return getNeonWebPageHelper(data);
        case 'webpagefragment':
            return getNeonWebPageHelper(data);
        case 'article':
            return getNeonArticleHelper(data);
        case 'liveblog':
            return getNeonLiveblogHelper(data);
        default:
            return null;
    }
}

/**
 *
 * @param pageData
 * @param siteStructure
 * @param site
 * @param url
 * @param previewData
 * @param variant
 */
export const buildNeonDataFromPage = async (
    pageData: any,
    siteStructure: SiteStructure,
    siteName: string,
    url: string
): Promise<NeonData> => {
    const helper: any = getNeonDataHelper(pageData?.model?.data);

    let linkContext = null;

    const sites = await getNeonSites();
    const site = sites.find(site => site.root.name === siteName);

    const neonData = {
        object: {
            data: pageData?.model.data,
            helper
        },
        linkContext,
        pageContext: {
            url: url || pageData?.model.data.url,
            nodes: pageData?.model.nodes,
            resourcesUrls: pageData?.resourcesUrls ? pageData?.resourcesUrls : null,
            nodesUrls: pageData?.nodesUrls ? pageData?.nodesUrls : null,
            children: pageData?.model.data.children ? pageData?.model.data.children : pageData?.model.children // Fallback children location in case of model building or not
        },
        siteContext: {
            site,
            siteStructure
        }
    };
    return neonData;
};

/**
 *
 * @param object
 * @param parentneonData
 * @param linkContext
 */
export function buildneonDataForNestedObject(object, parentneonData, linkContext) {
    const neonData = {
        object: {
            data: object,
            helper: getNeonDataHelper(object)
        },
        linkContext,
        siteContext: parentneonData.siteContext,
        pageContext: parentneonData.pageContext
    };
    return neonData;
}

/**
 *
 * @param neonData
 */
export function getQueryResultObjects(neonData) {
    let resultObjects = [];
    try {
        resultObjects = neonData.object.data.children
            .filter(child => {
                const objNodeData = neonData.pageContext.nodes[child];
                return isContentOnSite(objNodeData, getCurrentLiveSite(neonData));
            })
            .map(child => {
                const objNodeData = neonData.pageContext.nodes[child];
                const linkContext = {
                    linkData: null,
                    linkTemplate: 'list'
                };
                const objneonData = buildneonDataForNestedObject(objNodeData, neonData, linkContext);
                return objneonData;
            });
    } catch (e) {
        console.log(e);
    }

    return resultObjects;
}

/**
 *
 * @param neonData
 */
export function getSearchResultObjects(neonData) {
    let resultObjects = [];
    try {
        resultObjects = neonData.searchResults.result.map(child => {
            const objNodeData = child.nodeData;
            const linkContext = {
                linkData: null,
                linkTemplate: 'list'
            };
            const objneonData = buildneonDataForNestedObject(objNodeData, neonData, linkContext);
            return objneonData;
        });
    } catch (e) {
        console.log(e);
    }

    return resultObjects;
}

/**
 *
 * @param neonData
 */
export function getSectionChildrenObjects(neonData) {
    let resultObjects = [];
    try {
        resultObjects = neonData.pageContext.children.map(child => {
            const objNodeData = neonData.pageContext.nodes[child];
            const linkContext = {
                linkData: null,
                linkTemplate: 'list'
            };
            const objneonData = buildneonDataForNestedObject(objNodeData, neonData, linkContext);
            return objneonData;
        });
    } catch (e) {
        console.log(e);
    }

    return resultObjects;
}

/**
 *
 * @param neonData
 * @param zoneName
 */
export function getDwxLinkedObjects(neonData, zoneName?) {
    if (!zoneName) {
        // When not specifying a zone, return all objects from all zones
        const zones = Object.keys(neonData.object.data.files.content.data.zones);
        return zones.reduce((acc, zone) => [...acc, ...getDwxLinkedObjects(neonData, zone)], []);
    }

    let linkedObjects = [];
    try {
        linkedObjects = neonData.object.helper.zones
            .find(zone => zone.zone === zoneName)
            .objects.map(link => {
                // Here we need to build the neonData for each object

                const objNodeData = neonData.pageContext.nodes[link.objectId];

                let linkTemplate = null;
                if (link.linkData && link.linkData.template) {
                    linkTemplate = link.linkData.template;
                } else {
                    try {
                        linkTemplate =
                            neonData.object.data.files.templates.data[neonData.linkContext.linkTemplate].zones[zoneName]
                                .sequences[0].styleSheet;
                    } catch (e) {}
                }
                if (!linkTemplate) {
                    // No default template found -> setting defaults
                    switch (objNodeData.sys.type) {
                        case 'featured':
                            linkTemplate = 'featured_standard';
                            break;
                        case 'segment':
                            linkTemplate = 'section_teaser';
                            break;
                        case 'article':
                            linkTemplate = 'head-pic';
                            break;
                        case 'liveblog':
                            linkTemplate = 'head-pic';
                            break;
                    }
                }

                const linkContext = {
                    linkData: link.linkData,
                    linkTemplate
                };

                const objneonData = buildneonDataForNestedObject(objNodeData, neonData, linkContext);

                return objneonData;
            });
    } catch (e) {}
    return linkedObjects;
}

export const getSiteByHostname = (hostname: string, sites: SiteNode[]): SiteNode => {
    let site = null;
    if (process.env.DEV_MODE === 'true' && process.env.DEV_FORCE_SITE) {
        return sites.find(site => site.name === process.env.DEV_FORCE_SITE);
    }

    if (sites != null && sites.length) {
        site = sites.find(site => hostname === site.root.hostname);
    }

    if (site) {
        console.log('getSiteNameByHostName - site found!', site.root.name);
        return site;
    } else {
        console.log('getSiteNameByHostName - site not found!');
        return null; // will show a not found
    }
};

/**
 *
 * @param hostName
 * @param sites
 */
export const getSiteNameByHostName = (hostname: string, sites: SiteNode[]) => {
    const siteFound = getSiteByHostname(hostname, sites);
    return siteFound.name || siteFound.root.name;
};

/**
 *
 * @param obj
 * @param site
 */
export function isContentOnSite(obj, site) {
    let result = false;

    const pubAttributes = obj.attributes.secondary_sections;
    if (Array.isArray(pubAttributes)) {
        result = pubAttributes.some(attr => attr.siteName === site);
    } else {
        result = pubAttributes.siteName === site;
    }
    return result;
}

/**
 *
 * @param obj
 */
export function getObjectMainSite(obj) {
    const pubAttributes = obj.attributes.secondary_sections;
    let siteName = null;
    if (Array.isArray(pubAttributes)) {
        siteName = pubAttributes[0].siteName;
    } else {
        siteName = pubAttributes.siteName;
    }
    return siteName;
}

/**
 *
 * @param obj
 */
export function getObjectMainSection(obj) {
    const pubAttributes = obj.attributes.secondary_sections;
    let section = null;
    if (Array.isArray(pubAttributes)) {
        section = pubAttributes[0].mainSection;
    } else {
        section = pubAttributes?.mainSection;
    }
    return section;
}

// Return the live site (without [PREVIEW] if there is)
/**
 *
 * @param neonData
 */
export function getCurrentLiveSite(neonData) {
    const currentSite = neonData.siteContext?.site;
    if (!currentSite) return null;

    return currentSite;
}

/**
 *
 * @param neonData
 */
export function getCurrentSite(neonData) {
    // console.log(neonData);
    return neonData?.siteContext?.siteStructure?.find(site => site.name === getCurrentLiveSite(neonData));
}

/**
 *
 * @param url
 * @param format
 */
export function getImageFormatUrl(url, format) {
    const strIndex = url.lastIndexOf('/');
    const formatImageUrl = `${url.slice(0, strIndex)}/format/${format}${url.slice(strIndex)}`;
    return formatImageUrl;
}

export const getLiveHostname = (url: string): string => url;

export const getApiHostname = async (url: URL, siteName?: string): Promise<string> => {
    // const urlObject = url instanceof URL ? url : new URL(url);

    console.log('sitename in getAPIHostname', siteName);

    const sites = await getNeonSites();

    const hostName = url.hostname;
    const protocol = url.protocol;

    const hostnameWithProtocol = `${protocol}//${hostName}`;

    const site = siteName
        ? sites.find(site => site.root.name === siteName)
        : getSiteByHostname(hostnameWithProtocol, sites);

    console.log('site in ' + site);

    if (url?.pathname?.startsWith('/preview')) {
        return site.apiHostnames.previewHostname;
    }

    return site.apiHostnames.liveHostname;
};

export const getMainImageUrl = (neonData: NeonData): string => {
    const mainPicture = _.get(neonData, 'object.helper.mainPicture[0]');
    if (!mainPicture.dynamicCropsResourceUrls) {
        return ResourceResolver(neonData.pageContext.resourcesUrls[mainPicture.targetId]);
    }

    return ResourceResolver(_.get(neonData, 'object.helper.mainPicture[0].dynamicCropsResourceUrls.small'));
};
