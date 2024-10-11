import { NextRequest } from 'next/server';
import { getNeonSeoSitemap } from '../../../../src/services/neon-cms/neon-api';

export default async (req: NextRequest, res) => {
    const protocol = req.headers['x-forwarded-proto'];
    const host = req.headers['x-forwarded-host'];

    const hostWithoutPort = `${protocol}://${host}`;
    const { hostname } = new URL(hostWithoutPort);
    const pathname = req.headers['x-invoke-path'].replace(`/api/${hostname}/robots`, '');

    const url = `${protocol}://${host}${pathname}`;

    const robotsResponse = await getNeonSeoSitemap(url);

    if (robotsResponse) {
        res.setHeader('Content-Type', 'text');
        res.write(robotsResponse);
        res.end();
    } else {
        res.status(404);
        res.end();
    }
};
