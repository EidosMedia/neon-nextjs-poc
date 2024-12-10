import { getApiHostname } from '@/services/neon-cms/neon-helpers';
import axios from 'axios';
import logger from 'logger';

export default async (req, res) => {
    const { id, from } = req.query;

    const limit = 50;

    const settings: Record<string, string> = {
        limit: limit.toString()
    };

    if (from) {
        settings.from = from;
    }

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

    const envProtocol = new URL(process.env.NEON_BASE_HOST).protocol;

    logger.debug(`${envProtocol}//${apiHostname}/api/v2/liveblogs/${id}/posts?${new URLSearchParams(settings)}`);
    logger.debug(req.cookies.empreviewauth);

    const result = await axios
        .get(`${envProtocol}//${apiHostname}/api/v2/liveblogs/${id}/posts?${new URLSearchParams(settings)}`, {
            headers: {
                emauth: req.cookies.empreviewauth
            }
        })
        .then(res => res.data);

    res.status(200).json(result);
};
