import { getApiHostname } from '@/services/neon-cms/neon-helpers';
import axios from 'axios';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export default async (req: NextApiRequest, res: NextResponse) => {
    const urlToAppend = encodeURI(decodeURIComponent(req.query.url as string));

    const baseUrl = new URL(req.headers.referer);

    const apiHostname = await getApiHostname(baseUrl);

    const options = {
        method: 'GET',
        url: `${baseUrl.protocol}//${apiHostname}/${urlToAppend}`,
        mode: 'no-cors',
        headers: {
            emauth: req.cookies.emauth
        },
        responseType: 'stream' as const
    };

    const response = await axios.request(options);

    return response.data.pipe(res);
};
