import validationMiddleware from '@middlewares/validation.middleware';
import AuthController from '@controllers/auth.controller';
import { ForgetPasswordDto, LoginDto, RecoverPasswordDto } from '@dtos/auth.dto';
import { Router } from 'express';

class AuthRoute {
    public router = Router();
    public controller = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/api/login', validationMiddleware(LoginDto, 'body'), this.controller.login);
        this.router.get('/api/logout', this.controller.logout);
        this.router.post('/api/forget-password', validationMiddleware(ForgetPasswordDto, 'body'), this.controller.forgetPassword);
        this.router.post('/api/recover-password', validationMiddleware(RecoverPasswordDto, 'body'), this.controller.recoverPassword);
    }
}

export default AuthRoute;
