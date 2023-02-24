import { HttpException, Errors } from '@shared/HttpException';
import { NextFunction, Request, Response } from 'express';
import { logger } from '@shared/logger';

const errorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    try {
        const status: number = err.status || 500;
        const error: Errors = err.error || 'INTERNAL_ERROR';
        const message: string = err.message || 'Something went wrong';

        logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Error:: ${error}, Message:: ${message}`);

        if (process.env.NODE_ENV === 'development') {
            console.log(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Error:: ${error}, Message:: ${message}`);
        }

        res.status(status).json({ status, error, message });
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;
