import { cobaltRequest } from "../../../../../src/lib/cobalt-cms/cobalt-api";

export default async (req, res) => {
    console.log("--- PAGES/FOREIGNID API ---")

    const { foreignid } = req.query;
    console.log(foreignid)
    let result = null
    const url = '/api/pages/foreignid/' + foreignid
    result = await cobaltRequest(url)
    res.status(200).json(result)
}