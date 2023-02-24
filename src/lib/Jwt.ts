import { HttpException, Errors } from '@shared/HttpException';
import { sign, verify } from 'jsonwebtoken';

export interface IAccessTokenPayload {
    userId: string;
}

export class JWT {
    static createAccessToken(payload: IAccessTokenPayload): string {
        try {
            return sign(payload, process.env.JWT_ACCESS_SECRET as string, {
                expiresIn: process.env.JWT_ACCESS_EXPIRATION,
            });
        } catch (error: any) {
            throw new HttpException(500, Errors.INTERNAL_ERROR, `JWT error: ${error.message || 'something went wrong in creating access-token'}!`);
        }
    }

    static verifyAccessToken(token: string) {
        try {
            return verify(token, process.env.JWT_ACCESS_SECRET as string) as IAccessTokenPayload;
        } catch (error: any) {
            if (error.message?.toLowerCase().includes('expired')) {
                throw new HttpException(401, Errors.TOKEN_EXPIRED, `JWT error: ${error.message}!`);
            }
            throw new HttpException(401, Errors.INVALID_TOKEN, `JWT error: ${error.message || 'something went wrong in verifying access-token'}!`);
        }
    }
}
