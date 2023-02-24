import { CORS_OPTIONS, DB_CONFIG } from '@config';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@/shared/logger';
import swaggerUi from 'swagger-ui-express';
import express, { Router } from 'express';
import cookieParser from 'cookie-parser';
import { loadSeed } from '@shared/seed';
import { DataSource } from 'typeorm';
import helmet from 'helmet';
import morgan from 'morgan';
import yaml from 'yamljs';
import cors from 'cors';
import path from 'path';
import hpp from 'hpp';

class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    constructor(
        routes: {
            path?: string;
            router: Router;
        }[],
    ) {
        this.app = express();
        this.env = process.env.NODE_ENV || 'development';
        this.port = process.env.PORT || 3000;

        this.initializeClient();
        this.initializeDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeSwagger();
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info('=================================');
            logger.info(`======= ENV: ${this.env} =======`);
            logger.info(`🚀 App listening on the port ${this.port}`);
            logger.info('=================================');
        });
    }

    public getServer() {
        return this.app;
    }

    private async initializeDatabase() {
        const AppDataSource = new DataSource(DB_CONFIG);

        await AppDataSource.initialize();
        await loadSeed();
    }

    private initializeMiddlewares() {
        this.app.use(morgan(process.env.LOG_FORMAT as string, { stream }));
        this.app.use(cors(CORS_OPTIONS));
        this.app.use(cookieParser());
        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes(
        routes: {
            path?: string;
            router: Router;
        }[],
    ) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }

    private initializeSwagger() {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(yaml.load('swagger.yaml')));
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeClient() {
        this.app.use(express.static(path.join(process.cwd(), 'src/client')));
    }
}

export default App;
