import { getApiHostname } from '@/services/neon-cms/neon-helpers';
import axios from 'axios';
import logger from 'logger';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export default async (req: NextApiRequest, res: NextResponse) => {
    let urlToAppend = encodeURI(decodeURIComponent(req.query.url as string));
    const baseUrl = new URL(req.headers.referer);

    if (baseUrl.hostname === 'localhost') {
        baseUrl.host = req.headers.host;
        baseUrl.hostname = baseUrl.host;
    }

    const apiHostname = await getApiHostname(baseUrl);

    if (urlToAppend.startsWith('/preview/')) {
        urlToAppend = urlToAppend.replace('/preview/', '/');
    }
    urlToAppend = urlToAppend.substring(1);

    const url = `${baseUrl.protocol}//${apiHostname}/${urlToAppend}`;

    logger.info('Image fetched from url: ' + url);

    const options = {
        method: 'GET',
        url,
        mode: 'no-cors',
        headers: {
            emauth: req.cookies.empreviewauth,
            'neon-fo-access-key': process.env.NEON_API_KEY
        },
        responseType: 'stream' as const
    };

    const response = await axios.request(options);

    return response.data.pipe(res);
};
