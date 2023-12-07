import { DataObjectTwoTone, SixteenMp } from "@mui/icons-material";
import { xml2json } from "xml-js";
import { searchNeon } from "./cobalt-api";

export function getNeonDataHelper(data) {
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

export function buildNeonDataFromPage(
  pageData,
  siteStructure,
  site,
  url,
  previewData,
  variant
) {
  const helper = getNeonDataHelper(pageData.model.data);

  let linkContext = null;
  if (previewData && pageData.model.data.sys.baseType === "webpagefragment") {
    linkContext = {
      linkTemplate: helper.pageTemplate,
    };
  }

  const neonData = {
    object: {
      data: pageData.model.data,
      helper: helper,
    },
    linkContext: linkContext,
    pageContext: {
      url: url ? url : pageData.model.data.url,
      nodes: pageData.model.nodes,
      resourcesUrls: pageData.resourcesUrls ? pageData.resourcesUrls : null,
      nodesUrls: pageData.nodesUrls ? pageData.nodesUrls : null,
      children: pageData.model.data.children
        ? pageData.model.data.children
        : pageData.model.children, // Fallback children location in case of model building or not
    },
    siteContext: {
      site: site,
      siteStructure: siteStructure,
    },
    abTesting: {
      variant: variant,
    },
    previewData,
  };
  return neonData;
}

// Fallback children location in case of model building or not
let childrens = null;
try {
  childrens = neonData.object.data.children; // this is where it is WITH model building
  if (!childrens) {
    childrens = neonData.pageContext.children; // this is where it is WITHOUT model building
  }
} catch (e) {}

export function buildneonDataForNestedObject(
  object,
  parentneonData,
  linkContext
) {
  const neonData = {
    object: {
      data: object,
      helper: getNeonDataHelper(object),
    },
    linkContext,
    siteContext: parentneonData.siteContext,
    pageContext: parentneonData.pageContext,
    abTesting: parentneonData.abTesting,
    previewData: parentneonData.previewData,
  };
  return neonData;
}

export function getQueryResultObjects(neonData) {
  let resultObjects = [];
  try {
    resultObjects = neonData.object.data.children
      .filter((child) => {
        const objNodeData = neonData.pageContext.nodes[child];
        return isContentOnSite(objNodeData, getCurrentLiveSite(neonData));
      })
      .map((child) => {
        const objNodeData = neonData.pageContext.nodes[child];
        const linkContext = {
          linkData: null,
          linkTemplate: "list",
        };
        const objneonData = buildneonDataForNestedObject(
          objNodeData,
          neonData,
          linkContext
        );
        return objneonData;
      });
  } catch (e) {
    console.log(e);
  }

  return resultObjects;
}

export function getSearchResultObjects(neonData) {
  let resultObjects = [];
  try {
    resultObjects = neonData.searchResults.result.map((child) => {
      const objNodeData = child.nodeData;
      const linkContext = {
        linkData: null,
        linkTemplate: "list",
      };
      const objneonData = buildneonDataForNestedObject(
        objNodeData,
        neonData,
        linkContext
      );
      return objneonData;
    });
  } catch (e) {
    console.log(e);
  }

  return resultObjects;
}

export function getSectionChildrenObjects(neonData) {
  let resultObjects = [];
  try {
    resultObjects = neonData.pageContext.children.map((child) => {
      const objNodeData = neonData.pageContext.nodes[child];
      const linkContext = {
        linkData: null,
        linkTemplate: "list",
      };
      const objneonData = buildneonDataForNestedObject(
        objNodeData,
        neonData,
        linkContext
      );
      return objneonData;
    });
  } catch (e) {
    console.log(e);
  }

  return resultObjects;
}

export function getDwxLinkedObjects(neonData, zoneName) {
  if (!zoneName) {
    // When not specifying a zone, return all objects from all zones
    const zones = Object.keys(neonData.object.data.files.content.data.zones);
    return zones.reduce(
      (acc, zone) => [...acc, ...getDwxLinkedObjects(neonData, zone)],
      []
    );
  }

  let linkedObjects = [];
  try {
    linkedObjects = neonData.object.helper.zones
      .find((zone) => zone.zone === zoneName)
      .objects.map((link) => {
        // Here we need to build the neonData for each object

        const objNodeData = neonData.pageContext.nodes[link.objectId];

        let linkTemplate = null;
        if (link.linkData && link.linkData.template) {
          linkTemplate = link.linkData.template;
        } else {
          try {
            linkTemplate =
              neonData.object.data.files.templates.data[
                neonData.linkContext.linkTemplate
              ].zones[zoneName].sequences[0].styleSheet;
          } catch (e) {}
        }
        if (!linkTemplate) {
          //No default template found -> setting defaults
          switch (objNodeData.sys.type) {
            case "featured":
              linkTemplate = "featured_standard";
              break;
            case "segment":
              linkTemplate = "section_teaser";
              break;
            case "article":
              linkTemplate = "head-pic";
              break;
            case "liveblog":
              linkTemplate = "head-pic";
              break;
          }
        }

        const linkContext = {
          linkData: link.linkData,
          linkTemplate: linkTemplate,
        };

        const objneonData = buildneonDataForNestedObject(
          objNodeData,
          neonData,
          linkContext
        );

        return objneonData;
      });
  } catch (e) {}
  return linkedObjects;
}

function getCobaltWebPageHelper(data) {
  const zones = Object.keys(data.files.content.data.zones);

  let zonesWithObjects = null;
  try {
    zonesWithObjects = zones
      .filter((zone) => data.links.pagelink[zone])
      .map((zone) => {
        return {
          zone: zone,
          objects: data.links.pagelink[zone].map((link) => {
            return {
              linkData: link.metadata,
              objectId: link.targetId,
            };
          }),
        };
      });
  } catch (e) {}

  return {
    pageTemplate: data.files.content.data.pageTemplate,
    zones: zonesWithObjects,
  };
}

function getCobaltArticleHelper(data) {
  let content = null;
  try {
    content = JSON.parse(xml2json(data.files.content.data));
  } catch (e) {
    console.log("error parsing object xml: " + e);
  }

  return {
    content,
  };
}

function getCobaltLiveblogHelper(data) {
  let content = null;
  try {
    content = JSON.parse(xml2json(data.files.content.data));
  } catch (e) {
    console.log("error parsing object xml: " + e);
  }

  return {
    content,
  };
}

export function getCobaltLiveblogPostHelper(data) {
  let content = null;
  try {
    content = JSON.parse(xml2json(data.files.content.data));
  } catch (e) {
    console.log("error parsing object xml: " + e);
  }

  return {
    content,
  };
}

export function getSiteNameByHostName(hostName, sites) {
  let site = null;
  if (process.env.DEV_MODE === "true" && process.env.DEV_FORCE_SITE) {
    return process.env.DEV_FORCE_SITE;
  }
  if (sites != null && sites.length) {
    site = sites.find((site) => hostName === getLiveHostname(site));
    if (!site && process.env.DEV_MODE === "true") {
      site = sites.find(
        (site) => site.customAttributes.siteCategory === "main"
      );
    }
  }
  if (site) {
    return site.name;
  } else {
    return null; // will show a not found
  }
}

export function getLiveHostname(site, withScheme) {
  let liveHostname = null;
  try {
    if (site.customAttributes.liveHostname) {
      //TODO - workaround for badly converted headless site (cannot modify liveHostname - now fixed: https://jira.eidosmedia.com/browse/COBALT-2810)
      liveHostname = site.customAttributes.liveHostname;
    } else {
      liveHostname = site.liveHostname;
    }
    if (!withScheme)
      liveHostname = liveHostname
        .replace(/^https?\:\/\//i, "")
        .split(":")[0]
        .replace(/\/$/, "");
  } catch (e) {}
  return liveHostname;
}

export function isContentOnSite(obj, site) {
  let result = false;

  const pubAttributes = obj.attributes.secondary_sections;
  if (Array.isArray(pubAttributes)) {
    result = pubAttributes.some((attr) => attr.siteName === site);
  } else {
    result = pubAttributes.siteName === site;
  }
  return result;
}

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
export function getCurrentLiveSite(neonData) {
  let currentSite = neonData.siteContext.site;
  if (currentSite.includes("[PREVIEW]")) {
    currentSite = currentSite.split("[")[0];
  }
  if (currentSite.includes(":")) {
    // TEMPORARY FIX for Neon tenant
    currentSite = currentSite.split(":")[1];
  }
  return currentSite;
}

export function getCurrentSite(neonData) {
  return neonData.siteContext.siteStructure.find(
    (site) => site.name === getCurrentLiveSite(neonData)
  );
}

export function getImageFormatUrl(url, format) {
  const strIndex = url.lastIndexOf("/");
  const formatImageUrl =
    url.slice(0, strIndex) + "/format/" + format + url.slice(strIndex);
  return formatImageUrl;
}
