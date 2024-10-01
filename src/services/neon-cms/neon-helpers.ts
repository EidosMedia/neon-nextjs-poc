import { NeonData, SiteNode, SiteStructure } from 'src/types/commonTypes';
import { URL } from 'url';
import { getNeonSites, neonRequest } from './neon-api';
import _ from 'lodash';
import ResourceResolver from 'src/utils/ResourceResolver';
import logger from 'logger';

function getNeonWebPageHelper(data) {
    if (typeof data.links != 'undefined') {
        const zones = Object.keys(data.links.pagelink);

        let zonesWithObjects = null;
        try {
            zonesWithObjects = zones
                .filter(zone => data.links.pagelink[zone])
                .map(zone => {
                    return {
                        zone: zone,
                        objects: data.links.pagelink[zone].map(link => {
                            return {
                                linkData: link.metadata || null,
                                objectId: link.targetId
                            };
                        })
                    };
                });
        } catch (e) {}

        return {
            //pageTemplate: data.files.content.data.pageTemplate,
            pageTemplate: null,
            zones: zonesWithObjects
        };
    } else {
        return {
            pageTemplate: null,
            zones: null
        };
    }
}

function getNeonArticleHelper(data) {
    let content = null;

    content = data.files.content.data;

    const mainPicture = data?.links?.system?.mainPicture || null;

    return {
        content: data.files.content.data,
        mainPicture
    };
}

export function getNeonLiveblogPostHelper(data) {
    let content = null;

    if (data && data.files && data.files.content && data.files.content.data) {
        if (typeof data.files.content.data === 'object') {
            content = data.files.content.data;
        } else if (typeof data.files.content.data == 'string') {
            try {
                content = JSON.parse(data.files.content.data);
            } catch (error) {
                console.error('error during parse ' + data.files.content.data);
            }
        } else {
            console.error('error unexpected value for data.files.content.data');
        }
    }
    return { content };
}

/**
 *
 * @param data
 */
export function getNeonDataHelper(data) {
    switch (data?.sys?.baseType) {
        case 'webpage':
            return getNeonWebPageHelper(data);
        case 'webpagefragment':
            return getNeonWebPageHelper(data);
        case 'article':
        case 'liveblog':
            return getNeonArticleHelper(data);
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
            children: pageData?.model.data.children ? pageData?.model.data.children : pageData?.model.children, // Fallback children location in case of model building or not
            mainPicture: pageData?.model?.data?.links?.system?.mainPicture[0]
                ? pageData?.model?.data?.links?.system?.mainPicture[0]
                : null
        },
        siteContext: site
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
        logger.error(e);
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
        logger.error(e);
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
        logger.error(e);
    }

    return resultObjects;
}

/**
 *
 * @param neonData
 * @param zoneName
 */
export function getDwxLinkedObjects(neonData, zoneName?) {
    const zones = Object.keys(neonData.object.data.links?.pagelink || []);

    if (!zoneName || !zones.length) {
        // When not specifying a zone, return all objects from all zones
        return zones.reduce((acc, zone) => [...acc, ...getDwxLinkedObjects(neonData, zone)], []);
    }

    let linkedObjects = [];

    try {
        linkedObjects = neonData.object.data.links?.pagelink[zoneName].map(link => {
            // Here we need to build the neonData for each object

            const objNodeData = neonData.pageContext.nodes[link.targetId];

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

    if (sites != null && sites.length) {
        site = sites.find(site => hostname === site.root.hostname);
    }

    if (site) {
        logger.debug('getSiteByHostname - site ' + hostname + ' found!', site.root.name);
        return site;
    } else {
        if (process.env.DEV_MODE === 'true' && process.env.DEV_FORCE_SITE) {
            return sites.find(site => site.root.name === process.env.DEV_FORCE_SITE);
        }
        logger.debug('getSiteNameByHostName - site ' + hostname + ' not found!');
        return null; // will show a not found
    }
};

/**
 *
 * @param hostName
 * @param sites
 */
export const getSiteNameByHostName = (hostname: string, sites: SiteNode[]) => {
    const siteFound: SiteNode = getSiteByHostname(hostname, sites);
    if (siteFound) {
        return siteFound.name || siteFound.root.name;
    } else {
        logger.debug('no site found for ' + hostname);
        return null;
    }
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
    const currentSite = neonData.siteContext?.site || neonData.siteContext;
    if (!currentSite) return null;

    return currentSite;
}

/**
 *
 * @param neonData
 */
export function getCurrentSite(neonData) {
    return neonData?.siteContext?.siteStructure?.find(site => site.name === getCurrentLiveSite(neonData));
}

/**
 *
 * @param url
 * @param format
 */
export function getImageFormatUrl(url, format) {
    const strIndex = url.lastIndexOf('/');
    //const formatImageUrl = `${url.slice(0, strIndex)}/format/${format}${url.slice(strIndex)}`;
    const formatImageUrl = `${url.slice(0, strIndex)}`;
    return formatImageUrl;
}

export const getLiveHostname = (url: string): string => url;

export const getApiHostname = async (url: URL, siteName?: string): Promise<string> => {
    const urlObject = url instanceof URL ? url : (url as string).startsWith('http') && new URL(url);

    const sites = await getNeonSites();

    const hostName = urlObject.hostname;
    const protocol = urlObject.protocol;
    const port = urlObject.port;

    const hostnameWithProtocol =
        `${protocol}//${hostName}` + (port != null && port != '' && port != '80' && port != '443' ? `:${port}` : '');

    const site = siteName
        ? sites.find(site => site.root.name === siteName)
        : getSiteByHostname(hostnameWithProtocol, sites);

    logger.debug('site in ' + site);

    if (url?.pathname?.includes('/preview')) {
        return site.apiHostnames.previewHostname;
    }

    return site.apiHostnames.liveHostname;
};

export const getMainImageUrl = (neonData: NeonData, format?: string): string => {
    const mainPicture = _.get(neonData, 'object.helper.mainPicture[0]');
    if (mainPicture && !mainPicture?.dynamicCropsResourceUrls) {
        return ResourceResolver(
            neonData.pageContext.resourcesUrls[mainPicture?.targetId],
            neonData.pageContext.url?.startsWith('/preview')
        );
    }

    return ResourceResolver(
        _.get(neonData, `object.helper.mainPicture[0].dynamicCropsResourceUrls.${format || 'Wide_large'}`)
    );
};

export const getImageUrl = (url: string) => {
    return ResourceResolver(url);
};
