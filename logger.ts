import pino from 'pino';
import path from 'path';

const logger = pino({
    browser: {},
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            messageFormat: '{filename} - {msg}',
            ignore: 'pid,hostname,filename'
        }
    }
}).child({ filename: path.basename(__filename) });

export default logger;
