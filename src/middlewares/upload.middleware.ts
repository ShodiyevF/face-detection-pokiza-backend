import { HttpException, Errors } from '@/shared/HttpException';
import { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';

type DestinationCallback = (error: HttpException | null, destination: string) => void;
type FileNameCallback = (error: HttpException | null, filename: string) => void;

const uploadMiddleware = (uploadFolder: string, allowedFileTypes: string[], allowedFileSize: number, reqFileKeyName: string, required = true) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // check folder for file upload
        if (!fs.existsSync(uploadFolder)) {
            return next(new HttpException(500, Errors.INTERNAL_ERROR, `File upload error: ${uploadFolder} does not exist in disk!`));
        }

        // multer disk storage config
        const storage = multer.diskStorage({
            destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
                cb(null, uploadFolder);
            },
            filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
                const ext = path.extname(file.originalname);

                cb(null, `${Date.now()}-${String(Math.round(Math.random() * 1e9)).padEnd(15, '0') + ext}`);
            },
        });

        // multer file filter config
        const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
            try {
                const isFileExtensionMatched = allowedFileTypes.find(mimeType => {
                    const [, extension] = mimeType.split('/');
                    if (!extension) {
                        throw new HttpException(500, Errors.INTERNAL_ERROR, 'File upload error: wrong file mime type is provided to middleware!');
                    }

                    const extName = path.extname(file.originalname).toLocaleLowerCase().replace('.', '');
                    return extension === extName;
                });

                const isMimeTypeMatched = allowedFileTypes.find(mimeType => mimeType === file.mimetype);

                if (isFileExtensionMatched && isMimeTypeMatched) {
                    cb(null, true);
                } else {
                    throw new HttpException(400, Errors.BAD_INPUT_ERROR, `Validation error: only supported ${allowedFileTypes.join(', ')} format!`);
                }
            } catch (error: any) {
                cb(error);
            }
        };

        // first get file stream, write it to temp folder, upload it to aws and delete from temp folder
        return multer({ storage, fileFilter, limits: { fileSize: allowedFileSize } }).single(reqFileKeyName)(req, res, async error => {
            try {
                if (error && error instanceof HttpException) {
                    throw error;
                }

                if (error && error.message?.toLocaleLowerCase().includes('large')) {
                    throw new HttpException(
                        400,
                        Errors.BAD_INPUT_ERROR,
                        `File size exceeded: file must not be larger than ${Math.round(allowedFileSize / 1024 / 1024)} MB!`,
                    );
                }

                if (error) {
                    throw new HttpException(
                        400,
                        Errors.BAD_INPUT_ERROR,
                        `File upload error: ${error.message || 'something went wrong with file upload'}!`,
                    );
                }

                if (required && !req[reqFileKeyName as keyof typeof req]) {
                    throw new HttpException(400, Errors.BAD_INPUT_ERROR, `File upload error: ${reqFileKeyName} body is required!`);
                }

                return next();
            } catch (error) {
                next(error);
            }
        });
    };
};

export default uploadMiddleware;
