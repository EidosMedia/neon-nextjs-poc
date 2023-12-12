import { getNeonSeoSitemap } from "../../../../src/lib/neon-cms/neon-api";

export default async (req, res) => {
  let url = "/sitemapindex.xml";
  let site = "default";
  if (req.query.url) {
    url = req.query.url.join("/");
  }
  if (req.query.site) {
    site = req.query.site;
  }

  const sitemapData = await getNeonSeoSitemap(site, url);
  if (sitemapData) {
    let sitemap = "";

    if (sitemapData.model.data.baseType === "sitemapindex") {
      const sitemapBody = sitemapData.model.data.sitemapinfos
        .map((info) => {
          let buffer = "";
          for (let page = 1; page <= info.pages; page++) {
            let url = `/${info.year ? info.year + "/" : ""}${
              info.month ? info.month + "/" : ""
            }${info.day ? info.day + "/" : ""}`;
            if (sitemapData.model.data.produceSubIndex) {
              url += "sitemapindex.xml";
            } else {
              url += "sitemap-" + page + ".xml";
            }
            buffer += `<sitemap>
                        <loc>${url}</loc>
                        <lastmod>${info.lastModifiedDate}</lastmod>
                    </sitemap>`;
          }
          return buffer;
        })
        .join(" ");

      sitemap = `<?xml version="1.0" encoding="UTF-8"?>
                <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                    ${sitemapBody}
                </sitemapindex>`;
    } else if (sitemapData.model.data.baseType === "sitemap") {
      const sitemapBody = sitemapData.model.children
        .map((child) => {
          const url = sitemapData.nodesUrls[child];
          const lastMod = sitemapData.model.data.lastmod[child];
          const pubName = sitemapData.siteData.title;
          const title = sitemapData.model.nodes[child].title;
          const pubDate = sitemapData.model.nodes[child].timestamp;
          let mainImageUrl = null;
          try {
            const mainPictureId =
              sitemapData.model.nodes[child].links.system.mainPicture[0]
                .targetId;
            if (mainPictureId) {
              mainImageUrl = sitemapData.resourcesUrls[mainPictureId];
            }
          } catch (e) {}

          return `<url>
                        <loc>${url}</loc>
                        <lastmod>${lastMod}</lastmod>
                        <news:news>
                            <news:publications>
                                <news:name><![CDATA[ ${pubName} ]]></news:name>
                                <news:language>en</news:language>
                            </news:publications>
                            <news:publication_date>${pubDate}}</news:publication_date>
                            <news:title><![CDATA[ ${title} ]]></news:title>
                        </news:news>
                        ${
                          mainImageUrl
                            ? "<image:image><image:loc>" +
                              mainImageUrl +
                              "</image:loc></image:image>"
                            : ""
                        }
                    </url>`;
        })
        .join(" ");

      sitemap = `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap-news.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
                    ${sitemapBody}
                </urlset>`;
    } else {
      res.status(400);
      res.end();
    }

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  } else {
    res.status(404);
    res.end();
  }
};
