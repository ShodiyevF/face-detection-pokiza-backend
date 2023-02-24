export const CORS_OPTIONS = {
    origin: function (origin: any, callback: (err: Error | null, origin?: any) => void) {
        console.info('CORS origin:', origin);
        if (callback) {
            console.info(`CORS origin: ${origin} -> ${process.env.ORIGIN}`);
            callback(null, process.env.ORIGIN);
        } else {
            console.info('CORS callback: undefined');
        }
    },
    methods: ['GET', 'HEAD', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: process.env.CREDENTIALS === 'true',
    preflightContinue: true,
    optionsSuccessStatus: 200,
};
