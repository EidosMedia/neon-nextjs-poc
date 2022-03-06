import { urlObjectKeys } from 'next/dist/shared/lib/utils'
import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req) {
  console.log((new Date()).getSeconds() + " - middleware start")
  const { pathname } = req.nextUrl
  // Get hostname (e.g. vercel.com, test.vercel.app, etc.)
  const hostname = req.headers.get('host')
  console.log("hostname + pathname = " + hostname + "/" + pathname)

  // If localhost, assign the host value manually
  // If prod, get the custom domain/subdomain value by removing the root URL
  // (in the case of "test.vercel.app", "vercel.app" is the root URL)
  const currentHost =
    process.env.NODE_ENV == 'production'
      ? hostname.split(':')[0]
      : 'localhost'

  //const currentHost = hostname

  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents. This can also be done
  // via rewrites to a custom 404 page
  if (pathname.startsWith(`/_sites`)) {
    return new Response(null, { status: 404 })
  }

  if (
    !pathname.startsWith('/static') &&
    !pathname.startsWith('/api') && // exclude all API routes
    !pathname.startsWith('/preview') // exclude preview landing page (for now?)
  ) {
    // rewrite to the current hostname under the pages/sites folder
    // the main logic component will happen in pages/sites/[site]/index.js
    // clone is due to https://nextjs.org/docs/messages/middleware-relative-urls 
    const rewriteUrl = req.nextUrl.clone()
    rewriteUrl.pathname = `/_sites/${currentHost}${pathname}`
    console.log("rewritten url = " + rewriteUrl.pathname)
    console.log((new Date()).getSeconds() + " - middleware end")
    return NextResponse.rewrite(rewriteUrl)
  }
}