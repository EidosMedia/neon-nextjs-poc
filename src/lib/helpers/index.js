import Head from "next/head";

export function getMetaHeader(neonData) {
  let metaHeader = null;

  const metaTitle = getSeoTitle(neonData);

  if (metaTitle) {
    metaHeader = (
      <Head>
        <title>{metaTitle}</title>
      </Head>
    );
  }

  return metaHeader;
}

export function getSeoTitle(neonData) {
  let seoTitle = "";
  let websiteName = "The Globe";
  try {
    websiteName = neonData.siteContext.siteStructure.find(
      (site) => site.name === getCurrentLiveSite(neonData)
    ).title;
  } catch (e) {}

  switch (neonData.object.data.sys.baseType) {
    case "section":
    case "webpage":
      seoTitle = websiteName;
      if (neonData.pageContext.url !== "/") {
        //TODO get the section name from site structure
        const sectionName =
          neonData.pageContext.url.charAt(0).toUpperCase() +
          neonData.pageContext.url.slice(1);
        seoTitle = seoTitle + " - " + sectionName;
      }
      break;
    case "liveblog":
    case "article":
      seoTitle = websiteName + " - " + neonData.object.data.title;
      break;
  }
  return seoTitle;
}
