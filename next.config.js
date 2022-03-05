const sites = [
  {
    siteKey: 'globe-main',
    //domain: 'globe-main.vercel.app'
    domain: 'www.globe.com'
  },
  {
    siteKey: 'globe-italy',
    //domain: 'globe-italy.vercel.app'
    domain: 'italy.globe.com'
  }
]

const siteKeys = sites.map((site) => site.siteKey)

module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    sites
  },
  i18n: {
    locales: siteKeys,
    defaultLocale: siteKeys[0],
    domains: sites.map((site) => (
      {
        domain: site.domain,
        defaultLocale:site.siteKey
      }
    ))
  },
  images: {
    domains: ['demo.eidosmedia.io', 'express-website.em.corp', 'express-host.em.corp', 'cobalt-poc.demomedia.eidosmedia.io'],
    minimumCacheTTL: 3600
  }
};
