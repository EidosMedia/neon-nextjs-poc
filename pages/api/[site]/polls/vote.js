import {
  neonPollVote,
  neonRequest,
} from "../../../../src/lib/cobalt-cms/cobalt-api";

export default async (req, res) => {
  let result = null;

  if (req.method === "POST") {
    result = await neonPollVote(
      req.query.site,
      req.body.nodeId,
      req.body.pollId,
      req.body.answerId
    );
    res.status(200).json({ status: "ok" });
  } else {
    res.status(400);
  }
};
