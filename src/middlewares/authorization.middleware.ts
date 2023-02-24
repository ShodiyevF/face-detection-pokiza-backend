import { Request, Response, NextFunction } from 'express';
import { UserEntity } from '@entities/users.entity';
import { JWT } from '@lib/Jwt';

const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers || !req.headers.authorization) {
            return res.json({
                status: 400,
                message: 'Token required !',
            });
        }

        const { authorization } = req.headers;

        const payload = JWT.verifyAccessToken(authorization);

        const [user] = await UserEntity.findBy({ id: payload.userId });

        if (!user) {
            return res.json({
                status: 404,
                message: 'Tokened user has deleted',
            });
        }

        req.reqUser = user;

        res.json({
            status: 200,
            message: 'token successfully'
        })
    } catch (error) {
        next(error);
    }
};

export default authorizationMiddleware;
