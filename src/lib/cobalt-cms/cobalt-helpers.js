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

export function getQueryResultObjects(cobaltData) {
    let resultObjects = [];
    try {
        resultObjects = cobaltData.object.data.children.map((child) => {
            const objNodeData = cobaltData.pageContext.nodes[child]
            const objCobaltData = {
                object: {
                    data: objNodeData,
                    helper: getCobaltDataHelper(objNodeData)
                },
                linkContext: {
                    linkData: null,
                    linkTemplate: 'list'
                },
                pageContext: cobaltData.pageContext,
                previewData: cobaltData.previewData
            }
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
                        case 'segment': linkTemplate = 'section_standard'; break;
                        case 'article': linkTemplate = 'head-pic'; break;
                    }
                }

                const objCobaltData = {
                    object: {
                        data: objNodeData,
                        helper: getCobaltDataHelper(objNodeData)
                    },
                    linkContext: {
                        linkData: link.linkData,
                        linkTemplate: linkTemplate
                    },
                    pageContext: cobaltData.pageContext,
                    previewData: cobaltData.previewData
                }
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