import { NextRequest } from 'next/server';
import { getNeonSeoSitemap } from '../../../../src/services/neon-cms/neon-api';

export default async (req: NextRequest, res) => {
    const protocol = req.headers['x-forwarded-proto'];
    const host = req.headers['x-forwarded-host'];

    const hostWithoutPort = `${protocol}://${host}`;
    const { hostname } = new URL(hostWithoutPort);
    const pathname = req.headers['x-invoke-path'].replace(`/api/${hostname}/sitemap`, '');

    const url = `${protocol}://${host}${pathname}`;

    const sitemapData = await getNeonSeoSitemap(url);
    if (sitemapData) {
        let sitemap = '';

        if (sitemapData.model.data.baseType === 'sitemapindex') {
            const sitemapBody = sitemapData.model.data.sitemapindex
                .map(info => {
                    const buffer = `<sitemap>
                        <loc>${info.url}</loc>
                        <lastmod>${info.lastModifiedDate}</lastmod>
                    </sitemap>`;

                    return buffer;
                })
                .join(' ');

            sitemap = `<?xml version="1.0" encoding="UTF-8"?>
                <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                    ${sitemapBody}
                </sitemapindex>`;
        } else if (sitemapData.model.data.baseType === 'sitemap') {
            const sitemapBody = sitemapData.model.data.urlset
                .map(
                    child => `<url>
                        <loc>${child.loc}</loc>
                        <lastmod>${child.lastmod}</lastmod>
                        <changefreq>${child.changefreq}</changefreq>
                        <priority>${child.priority}</priority>
                        <news:news>
                            <news:publications>
                                <news:name><![CDATA[ ${child.news.publication.name} ]]></news:name>
                                <news:language>${child.news.publication.language}</news:language>
                            </news:publications>
                            <news:publication_date>${child.news.publicationDate}</news:publication_date>
                            <news:title><![CDATA[ ${child.news.title} ]]></news:title>
                        </news:news>
                        ${child.imageUrl ? `<image:image><image:loc>${child.imageUrl}</image:loc></image:image>` : ''}
                    </url>`
                )
                .join(' ');

            sitemap = `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap-news.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
                    ${sitemapBody}
                </urlset>`;
        } else {
            res.status(400);
            res.end();
        }

        res.setHeader('Content-Type', 'text/xml');
        res.write(sitemap);
        res.end();
    } else {
        res.status(404);
        res.end();
    }
};
