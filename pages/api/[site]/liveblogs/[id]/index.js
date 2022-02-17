import { cobaltRequest } from "../../../../../src/lib/cobalt-cms/cobalt-api"

export default async (req, res) => {
  console.log("--- LIVEBLOG API ---")

  let { id, site } = req.query;
  console.log(id)
  let result = null

  if (id.includes('eom')) {
    id = id.substring(0, id.indexOf('@'))
    console.log("LIVEBLOG preview mode - getting cobaltId from Methode ID: " + id);
    result = await cobaltRequest('/api/pages/foreignid/' + id + '?emk.site=' + site)
    id = result.model.data.id
  }

  result = await cobaltRequest('/api/liveblogs/' + id + '/posts?emk.site=' + site)

  res.status(200).json(result)
}