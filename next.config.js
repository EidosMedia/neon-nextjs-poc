module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "express-website.em.corp",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "express-host.em.corp",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cobalt-poc.demomedia.eidosmedia.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cobaltdocker",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.guim.co.uk",
        pathname: "**",
      },
    ],
    minimumCacheTTL: 3600,
  },
};
