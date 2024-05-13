import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

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

         const hostName = process.env.DEV_COOKIE_DOMAIN || urlObject.hostname;
         const protocol = urlObject.protocol;
         const port = urlObject.port;

         const apiUrl = `${process.env.NEON_BASE_HOST}/api`;
         
         const response = await fetch(`${apiUrl}/pages/${id}/authorization/${siteName}/${viewStatus}`, { headers: { Authorization: "Bearer " + previewToken } });
         
         if (response.status !== 204) {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: response.status })
         }

         const redirectResponse =  NextResponse.redirect(new URL(`/_sites/preview/${hostname}?id=${id}`, urlObject));
         let cookie = response.headers.getSetCookie()[0];
         cookie += `;Domain=${hostName}`;

         if(process.env.NODE_ENV === "production"){
            cookie += ';Secure';
         }

         const cookieObject = parseCookie(cookie);
         //redirectResponse.headers.set('Set-Cookie', cookie);
         //redirectResponse.headers.set('test', 'prova');
         //const value = cookieObject.emauth;
         //delete cookieObject.emauth;
         //redirectResponse.cookies.set('emauth', value, cookieObject);
        
         const cookieValue = cookieObject.emauth;
         const cookieOptions:ResponseCookie = {
            path: '/',
            maxAge: 1200,
            httpOnly: true,
            name: 'emauth',
            value: cookieValue,
            sameSite: 'none',
            secure: process.env.NODE_ENV === "production",
            domain: hostName
        };

        //redirectResponse.headers.append('Set-Cookie', cookie);

        redirectResponse.cookies.set('emauth', '', cookieOptions);       
        //redirectResponse.headers.append('Access-Control-Allow-Origin', '*');
        //redirectResponse.headers.append('Access-Control-Allow-Credentials', 'true');

        

        //redirectResponse.cookies.set('emauth', cookieValue);

        return redirectResponse;
    }

    /*
    if (pathname.startsWith('/_preview')) {

        const rewriteUrl = req.nextUrl.clone();
        rewriteUrl.pathname = `/_sites/preview/${hostname}/${pathname.replace('/preview', '').substring(1)}`;

        return NextResponse.rewrite(rewriteUrl);
    }
*/
    if (
        !pathname.startsWith('/_next') &&
        !pathname.startsWith('/static') &&
        !pathname.startsWith('/api') && // exclude all API routes
        !pathname.startsWith('/analytics') &&
        !pathname.includes('sw.js') &&
        !pathname.includes('preview')
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

function parseCookie(cookieString) {
    let cookieArray = cookieString.split(';');
    let cookieObject = {};

    cookieArray.forEach(cookie => {
        let cookiePair = cookie.split('=');
        cookieObject[cookiePair[0]] = cookiePair[1];
    });

    return cookieObject;
}

export const config = { matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)'] };
