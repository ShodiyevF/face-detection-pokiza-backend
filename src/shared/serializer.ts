import { HttpException, Errors } from '@/shared/HttpException';
import { plainToInstance } from 'class-transformer';

export const serializer = <T>(dto: T, data: KeyValueObjectType | KeyValueObjectType[] | null): T | T[] => {
    try {
        return plainToInstance(dto as any, data, {
            excludeExtraneousValues: true,
        });
    } catch (error: any) {
        throw new HttpException(500, Errors.INTERNAL_ERROR, `Serializer error: ${error.message || 'something went wrong with serializing data'}!`);
    }
};
