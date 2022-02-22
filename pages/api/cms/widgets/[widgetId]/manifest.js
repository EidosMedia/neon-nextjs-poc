import Cors from 'cors'
import { widgetsConfig } from '../../../../../widgets.config'
// Initializing the cors middleware
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
    console.log(req.query);
    const widgetId = req.query.widgetId;
    let response = {};
    switch(widgetId){
        case 'weather-widget':
            response = widgetsConfig.weather
            
    }
    res.json(response)

}