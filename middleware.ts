import { NextResponse } from 'next/server';

/**
 *
 */
export default function middleware(req) {
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
        const rewriteUrl = req.nextUrl.clone();
        rewriteUrl.pathname = `/_sites/preview/${hostname}/${pathname.replace('/preview', '').substring(1)}`;

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
