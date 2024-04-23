module.exports = {
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'express-website.em.corp',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'express-host.em.corp',
                pathname: '**'
            },
            {
                protocol: new URL(process.env.NEXT_PUBLIC_RESOURCES_PUBLIC_BASE).protocol.replace(':', ''),
                hostname: new URL(process.env.NEXT_PUBLIC_RESOURCES_PUBLIC_BASE).hostname,
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'cobaltdocker',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'i.guim.co.uk',
                pathname: '**'
            }
        ],
        minimumCacheTTL: 3600
    }
};
