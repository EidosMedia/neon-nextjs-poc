import { NextResponse } from 'next/server';

/**
 *
 */
export async function middleware(req) {
    // let ab_cookie = req.cookies[AB_COOKIE_NAME];

    const { pathname } = req.nextUrl;
    // Get hostname (e.g. vercel.com, test.vercel.app, etc.)
    const hostname = req.headers.get('host');

    const regexSitemap = /^(.*)sitemap-(\d)+\.xml$/gm;
    if (regexSitemap.exec(pathname) || pathname.endsWith('/sitemapindex.xml')) {
        const rewriteUrl = req.nextUrl.clone();
        rewriteUrl.pathname = `/api/${hostname}/sitemap${pathname}`;
        return NextResponse.rewrite(rewriteUrl);
    }

    if (pathname.startsWith('/preview')) {

         const urlObject = req.nextUrl;

         const urlParams = new URLSearchParams(urlObject.search);
         const previewToken = urlParams.get('PreviewToken');
         const id = urlParams.get('id');
         const siteName = urlParams.get('siteName');
         const viewStatus = 'PREVIEW';

         const hostName = urlObject.hostname;
         const protocol = urlObject.protocol;

         const apiUrl = `${process.env.NEON_BASE_HOST}/api`;

         const response = await fetch(`${apiUrl}/pages/${id}/authorization/${siteName}/${viewStatus}`, { headers: { Authorization: "Bearer " + previewToken } });
         
         if (response.status !== 204) {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: response.status })
         }

         const redirectResponse =  NextResponse.redirect(new URL('/_preview?id='+id, urlObject));
         const cookie = response.headers.getSetCookie()[0];
         redirectResponse.headers.set('Set-Cookie', cookie);
         
         return redirectResponse;
    }

    if (pathname.startsWith('/_preview')) {

        const rewriteUrl = req.nextUrl.clone();
        rewriteUrl.pathname = `/_sites/preview/${hostname}/${pathname.replace('/_preview', '').substring(1)}`;

        return NextResponse.rewrite(rewriteUrl);
    }

    if (
        !pathname.startsWith('/_next') &&
        !pathname.startsWith('/static') &&
        !pathname.startsWith('/api') && // exclude all API routes
        !pathname.startsWith('/analytics') &&
        !pathname.includes('sw.js')
    ) {
        // rewrite to the current hostname under the pages/sites folder
        // the main logic component will happen in pages/sites/[site]/index.js
        // clone is due to https://nextjs.org/docs/messages/middleware-relative-urls
        const rewriteUrl = req.nextUrl.clone();
        rewriteUrl.pathname = `/_sites/${hostname}${pathname}`;

        return NextResponse.rewrite(rewriteUrl);
    }
    return NextResponse.next();
}

export const config = { matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)'] };
