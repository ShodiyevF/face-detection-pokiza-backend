import { ForgetPasswordDto, LoginDto, RecoverPasswordDto } from '@dtos/auth.dto';
import validationMiddleware from '@middlewares/validation.middleware';
import AuthController from '@controllers/auth.controller';
import { Router } from 'express';
import authorizationMiddleware from '@/middlewares/authorization.middleware';

class AuthRoute {
    public router = Router();
    public controller = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/api/login', validationMiddleware(LoginDto, 'body'), this.controller.login);
        this.router.get('/api/checktoken', this.controller.checktoken);
        this.router.get('/api/logout', this.controller.logout);
        this.router.get('/api/tokencheck', authorizationMiddleware);
        this.router.post('/api/forget-password', validationMiddleware(ForgetPasswordDto, 'body'), this.controller.forgetPassword);
        this.router.post('/api/recover-password', validationMiddleware(RecoverPasswordDto, 'body'), this.controller.recoverPassword);
    }
}

export default AuthRoute;
