import { neonRequest } from '../../../../../src/services/neon-cms/neon-api';

export default async (req, res) => {
    const { id, from } = req.query;

    console.log('from param', from);

    const limit = 50;

    const settings: Record<string, string> = {
        limit: limit.toString()
    };

    if (from) {
        settings.from = from;
    }

    console.log(`/api/liveblogs/${id}/posts?${new URLSearchParams(settings)}`);

    const result = await neonRequest(`/api/liveblogs/${id}/posts?${new URLSearchParams(settings)}`);

    res.status(200).json(result);
};
