import Cors from "cors";
import axios from "axios";

const cors = Cors({
  methods: ["GET", "HEAD", "POST"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async (req, res) => {
  await runMiddleware(req, res, cors);
  console.log("--- CREATE SECTIONS ---");
  console.log(req.body);

  const RUNS = 10;

  try {
    // AUTH

    let authToken = null;
    let body = {
      name: process.env.COBALT_SANDBOX_USERNAME,
      password: process.env.COBALT_SANDBOX_PASSWORD,
    };
    let options = {
      method: "POST",
      url: process.env.NEON_BASE_HOST + "/directory/sessions/login",
      mode: "no-cors",
      data: body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-APIKey": process.env.NEON_API_KEY,
      },
    };

    let response = await axios.request(options);
    authToken = response.data.session.id;

    let l0id = "4002-175dbde37ac9-aaac3d1e29ab-2000";

    for (let i = 0; i < 5; i++) {
      let l1id = await createSection("/first" + i, l0id, authToken);

      for (let j = 0; j < 2; j++) {
        let l2id = await createSection(
          "/first" + i + "/second" + j,
          l1id,
          authToken
        );

        for (let k = 0; k < 100; k++) {
          let l3id = await createSection(
            "/first" + i + "/second" + j + "/third" + k,
            l2id,
            authToken
          );
        }
      }
    }
  } catch (e) {
    console.log(e);
  }

  res.status(200).json({ result: "ok" });
};

async function createSection(section, parentId, authToken) {
  const sectionName = section.slice(section.lastIndexOf("/") + 1);
  let body = {
    siteName: "test-sections",
    parentId: parentId,
    name: sectionName,
    type: "section",
    title: sectionName,
    description: null,
    path: section + "/",
    style: { theme: null, variant: null, type: null, template: null },
    status: null,
  };

  let options = {
    method: "POST",
    url:
      process.env.NEON_BASE_HOST +
      "/core/sites/nodes/create?realm=default&emauth=" +
      authToken,
    mode: "no-cors",
    data: body,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-APIKey": process.env.NEON_API_KEY,
    },
  };

  let response = await axios.request(options);
  const id = response.data.id;
  const tsVersion = response.data.tsVersion;
  console.log(id);

  body = {
    siteName: "test-sections",
    id: id,
    tsVersion: tsVersion,
  };

  options = {
    method: "POST",
    url:
      process.env.NEON_BASE_HOST +
      "/core/sites/nodes/publish?realm=default&viewStatus=LIVE&emauth=" +
      authToken,
    mode: "no-cors",
    data: body,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-APIKey": process.env.NEON_API_KEY,
    },
  };

  response = await axios.request(options);

  return id;
}
