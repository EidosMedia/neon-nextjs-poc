import { getNeonSites } from '@/services/neon-cms/neon-api';
import { getApiHostname, getSiteByHostname, getSiteNameByHostName } from '@/services/neon-cms/neon-helpers';
import axios from 'axios';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export default async (req: NextApiRequest, res: NextResponse) => {
    const url = encodeURI(decodeURIComponent(req.query.url as string));

    const baseUrl = new URL(req.headers.referer);
    const { hostname, protocol } = baseUrl;

    const hostnameWithProtocol = `${protocol}//${hostname}`;

    console.log('hostnameWithProtocol', hostnameWithProtocol);

    const apiHostname = await getApiHostname(baseUrl);
    const sites = await getNeonSites();

    const siteName = getSiteNameByHostName(hostnameWithProtocol, sites);

    const options = {
        method: 'GET',
        url: `${baseUrl.protocol}//${apiHostname}/${url}`,
        mode: 'no-cors',
        headers: {
            Cookie: `emk.site=${siteName};`,
            emauth: req.cookies.emauth
        },
        responseType: 'stream' as const
    };

    const response = await axios.request(options);

    return response.data.pipe(res);
};
