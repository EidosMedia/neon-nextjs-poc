import Cors from 'cors'
import axios from 'axios'
import { randomUUID } from 'crypto';
import { ConstructionOutlined, RunningWithErrorsSharp } from '@mui/icons-material';



const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async (req, res) => {
  await runMiddleware(req, res, cors)
  console.log("--- MASS PUBLISH ---")
  console.log(req.body)

  const RUNS = 10;

  try {

    // AUTH

    let authToken = null;
    let body = { "name": process.env.COBALT_SANDBOX_USERNAME, "password": process.env.COBALT_SANDBOX_PASSWORD }
    let options = {
      method: 'POST',
      url: process.env.COBALT_BASE_HOST + '/directory/sessions/login',
      mode: 'no-cors',
      data: body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-APIKey': process.env.COBALT_API_KEY,
      }
    };

    let response = await axios.request(options)
    authToken = response.data.session.id

    for (let run = 0; run < RUNS; run++) {

      let objs = []

      for (let i = 0; i < 100; i++) {
        objs.push(
          {
            "reference": randomUUID(),
          }
        )
      }

      // PREPARE

      body = {
        "sites": ["my-site"],
        "refs": objs.map((o) => {
          return {
            "reference": o.reference,
            "source": "massPublishScript"
          }
        }),
        "prepareInfo": {
          "publishSource": "massPublishScript",
          "publishDate": randomDate(new Date(2022, 5, 1), new Date()).toISOString()
        }
      }
      options = {
        method: 'POST',
        url: process.env.COBALT_BASE_HOST + '/core/publication/prepare?emauth=' + authToken,
        mode: 'no-cors',
        data: body,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-APIKey': process.env.COBALT_API_KEY,
        }
      };

      console.log(body)

      response = await axios.request(options)
      const pubId = response.data.publishId

      // UPDATE

      for (const o of objs){

        const data = {
          "dataType": "node",
          "foreignId": o.reference,
          "title": "my title art0",
          "summary": "my summary",
          "authors": ["francois"],
          "sys": {
            "baseType": "article",
            "type": "article"
          },
          "attributes": {
            "custom": {
              "myattr": "myval"
            },
            "tags": ["t1"]
          },
          "files": {
            "content": {
              "fileName": "art0.xml",
              "partName": "content",
              "mimeType": "text/xml",
              "data": null
            }
          },
          "pubInfoEx": {
            "test-site": {
              "siteName": "my-site",
              "sectionPath": ""
            }
          }
        }

        console.log("data update")

        const content = '<?xml version="1.0" encoding="UTF-8"?><document><headgroup><headline><p>My title</p></headline></headgroup><summary><p>My summary</p></summary><byline><p>ale.ber</p></byline><content><p>Lorem ipsum</p></content></document>'

        const FormData = require('form-data');

        const formData = new FormData()
        formData.append("data", JSON.stringify(data),{filename:'art.json',contentType:'application/json'})
        formData.append("content",content,{filename:'art.xml',contentType:'text/xml'})

        response = await axios.post(process.env.COBALT_BASE_HOST + '/core/publication/update?emauth=' + authToken + '&pubId='+pubId,formData,{
          headers: formData.getHeaders()
        })
        console.log(response.data)
      }

      // COMMIT

    
      options = {
        method: 'POST',
        url: process.env.COBALT_BASE_HOST + '/core/publication/publish?emauth=' + authToken + '&pubId='+pubId,
        mode: 'no-cors',
        data: body,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-APIKey': process.env.COBALT_API_KEY,
        }
      };

      console.log("commit")
      response = await axios.request(options)
      console.log(response.data)
    }


  }
  catch (e) {
    console.log(e)
  }

  res.status(200).json({ "result": "ok" })
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}