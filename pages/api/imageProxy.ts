import { getApiHostname } from '@/services/neon-cms/neon-helpers';
import axios from 'axios';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export default async (req: NextApiRequest, res: NextResponse) => {
    let urlToAppend = encodeURI(decodeURIComponent(req.query.url as string));
    console.log('========================', req.cookies.empreviewauth);
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

    const options = {
        method: 'GET',
        url: `${baseUrl.protocol}//${apiHostname}/${urlToAppend}`,
        mode: 'no-cors',
        headers: {
            emauth: req.cookies.empreviewauth
        },
        responseType: 'stream' as const
    };

    const response = await axios.request(options);

    return response.data.pipe(res);
};
