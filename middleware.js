import { urlObjectKeys } from 'next/dist/shared/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import { experiments } from './abtesting.config';
import { AB_COOKIE_NAME } from './apps.settings';

export default function middleware(req) {
  let res = NextResponse.next();
  let ab_cookie = req.cookies[AB_COOKIE_NAME];

  const { pathname } = req.nextUrl;
  // Get hostname (e.g. vercel.com, test.vercel.app, etc.)
  const hostname = req.headers.get('host');

  // AB TESTING

  if (!ab_cookie) {
    let n = Math.random() * 100;

    const currentExperiment = experiments[0];
    const variant = currentExperiment.variants.find((v, i) => {
      if (v.weight >= n) return true;
      n -= v.weight;
    });

    ab_cookie = `${currentExperiment.id}.${variant.id}`;
  }

  console.log(ab_cookie);

  // If localhost, assign the host value manually
  // If prod, get the custom domain/subdomain value by removing the root URL
  // (in the case of "test.vercel.app", "vercel.app" is the root URL)
  const currentHost =
    process.env.NODE_ENV == 'production' ? hostname.split(':')[0] : 'localhost';

  //const currentHost = hostname

  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents. This can also be done
  // via rewrites to a custom 404 page
  // if (pathname.startsWith(`/_`)) {
  //   return new Response(null, { status: 404 });
  // }

  const regexSitemap = new RegExp('^(.*)sitemap-(\\d)+\\.xml$', 'gm');
  if (regexSitemap.exec(pathname) || pathname.endsWith('/sitemapindex.xml')) {
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = `/api/${currentHost}/sitemap${pathname}`;
    res = NextResponse.rewrite(rewriteUrl);
    return res;
  }

  if (
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/static') &&
    !pathname.startsWith('/api') && // exclude all API routes
    !pathname.startsWith('/preview') && // exclude preview landing page (for now?)
    !pathname.startsWith('/analytics') &&
    !pathname.includes('sw.js')
  ) {
    // rewrite to the current hostname under the pages/sites folder
    // the main logic component will happen in pages/sites/[site]/index.js
    // clone is due to https://nextjs.org/docs/messages/middleware-relative-urls
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = `/_sites/${currentHost}/${ab_cookie}${pathname}`;

    res = NextResponse.rewrite(rewriteUrl);

    return res;
  }
}
