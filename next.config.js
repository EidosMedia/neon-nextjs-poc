const sites = [
  {
    siteKey: 'globe-main',
    //domain: 'globe-main.vercel.app'
    domain: 'globe-main.vercel.app'
  },
  {
    siteKey: 'globe-italy',
    //domain: 'globe-italy.vercel.app'
    domain: 'globe-italy.vercel.app'
  }
]

module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    sites
  },
  images: {
    domains: ['demo.eidosmedia.io', 'express-website.em.corp', 'express-host.em.corp', 'cobalt-poc.demomedia.eidosmedia.io'],
    minimumCacheTTL: 3600
  }
};
