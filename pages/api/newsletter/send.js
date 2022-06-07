import { sendgridSendSingleSend } from "../../../src/lib/sendgrid/sendgrid-client"
import Cors from 'cors'
import { getcobaltPageById } from "../../../src/lib/cobalt-cms/cobalt-api"

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
    console.log("--- SENDGRID SEND ---")
    console.log(req.body)
    const result = await sendgridSendSingleSend(req.body.newsletterId)
    console.log(result)
    res.status(200).json(result)
  }