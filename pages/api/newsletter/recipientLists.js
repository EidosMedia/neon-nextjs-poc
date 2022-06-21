import { sendGridGetRecipientLists } from "../../../src/lib/sendgrid/sendgrid-client"
import Cors from 'cors'

const cors = Cors({
    methods: ['GET', 'HEAD'],
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
    console.log("--- SENDGRID RECIPIENT LISTS ---")
    console.log(req.query)
    const result = await sendGridGetRecipientLists()
    console.log(result)
    res.status(200).json(result)
  }