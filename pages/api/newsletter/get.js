import { sendgridGetSingleSend } from '../../../src/lib/sendgrid/sendgrid-client';
import Cors from 'cors';

const cors = Cors({
    methods: ['GET', 'HEAD', 'POST']
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
    console.log('--- SENDGRID GET NEWSLETTER ---');
    const result = await sendgridGetSingleSend(req.query.id);
    res.status(200).json(result);
};
