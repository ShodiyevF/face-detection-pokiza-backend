import { DataSourceOptions } from 'typeorm';
import path from 'path';

export const DB_CONFIG: DataSourceOptions = {
    type: 'sqlite',
    database: process.env.DB_NAME as string,
    synchronize: true,
    logging: false,
    entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
};
