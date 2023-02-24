import authorizationMiddleware from '@/middlewares/authorization.middleware';
import ControllersController from '@controllers/controllers.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateControllerDto, UpdateControllerDto } from '@/dtos/controllers.dto';
import { Router } from 'express';

class ControllersRoute {
    public router = Router();
    public controller = new ControllersController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/api/controllers', authorizationMiddleware, this.controller.getControllers);
        this.router.post(
            '/api/controllers',
            authorizationMiddleware,
            validationMiddleware(CreateControllerDto, 'body'),
            this.controller.createControllers,
        );
        this.router.patch(
            '/api/controllers/:id',
            authorizationMiddleware,
            validationMiddleware(UpdateControllerDto, 'body', true),
            this.controller.updateControllers,
        );
        this.router.delete('/api/controllers/:id', authorizationMiddleware, this.controller.deleteControllers);
    }
}

export default ControllersRoute;
