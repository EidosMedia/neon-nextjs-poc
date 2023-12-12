import { neonRequest } from "../../../../../../src/lib/neon-cms/neon-api";

export default async (req, res) => {
  const { foreignid, site } = req.query;
  let result = null;
  const url = "/api/pages/foreignid/" + foreignid + "&emk.site=" + site;
  result = await neonRequest(url);
  res.status(200).json(result);
};
