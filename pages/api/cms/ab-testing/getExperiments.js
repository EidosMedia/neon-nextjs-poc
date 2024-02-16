import Cors from 'cors';
import { experiments } from '../../../../abtesting.config';
// Initializing the cors middleware
const cors = Cors({
    methods: ['GET', 'HEAD']
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
/**
 *
 * @param req
 * @param res
 * @param fn
 */
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, result => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
}

export default async (req, res) => {
    await runMiddleware(req, res, cors);
    const response = experiments;
    res.json(response);
};
