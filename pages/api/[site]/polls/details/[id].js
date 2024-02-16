import { neonRequest } from '../../../../../src/lib/neon-cms/neon-api';

export default async (req, res) => {
    let { id, site } = req.query;
    let result = null;

    if (id.includes('eom')) {
        id = id.substring(0, id.indexOf('@'));
        result = await neonRequest(`/api/pages/foreignid/${id}?emk.site=${site}`);
        id = result.model.data.id;
    }

    result = await neonRequest(`/directory/polls/details?nodeId=${id}&siteName=${site}`);

    res.status(200).json(result);
};
