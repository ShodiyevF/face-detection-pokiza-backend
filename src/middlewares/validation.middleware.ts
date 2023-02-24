import { RequestHandler, NextFunction, Request, Response } from 'express';
import { HttpException, Errors } from '@/shared/HttpException';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

const validationMiddleware = (
    type: ClassType,
    value: 'body' | 'query' | 'params' | 'headers' = 'body',
    skipMissingProperties = false,
    whitelist = true,
    forbidNonWhitelisted = true,
): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        const transformedObject = plainToInstance(type, req[value as keyof typeof req]);

        validate(transformedObject, { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const message = errors
                    .map((error: ValidationError) => {
                        if (error.constraints) {
                            return Object.values(error.constraints || {});
                        }

                        return error.children?.map((error: ValidationError) => Object.values(error.constraints || {}));
                    })
                    .join(', ');
                next(new HttpException(400, Errors.VALIDATION_ERROR, message));
            } else {
                req[value] = transformedObject;
                next();
            }
        });
    };
};

export default validationMiddleware;
