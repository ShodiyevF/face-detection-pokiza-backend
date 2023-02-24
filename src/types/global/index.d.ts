import { UserEntity } from '@entities/users.entity';

declare global {
    namespace Express {
        export interface Request {
            reqUser?: UserEntity;
        }
    }
    type KeyValueObjectType = { [key: string]: any };
    type ClassType = new () => any;
}
