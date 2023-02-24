import { LoginDto, ForgetPasswordDto, RecoverPasswordDto, RecoverPasswordTokenDto } from '@dtos/auth.dto';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '@services/auth.service';
import { UserEntity } from '@/entities/users.entity';
import { serializer } from '@/shared/serializer';
import { UserDto } from '@/dtos/users.dto';
import { JWT } from '@/lib/Jwt';

class AuthController {
    authService = new AuthService();

    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const body: LoginDto = req.body;
            const accessToken = await this.authService.login(body);

            res.json({
                status: 200,
                message: 'User succesfully logined !',
                access_token: accessToken,
            });
        } catch (error) {
            next(error);
        }
    };

    checktoken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const headers = req.headers;
    
            await this.authService.checktoken(headers)
            
            res.json({
                status: 200,
                message: 'next'
            })
        } catch (error) {
            next(error);
        }
    };

    logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            res.clearCookie('accessToken').redirect('/login');
        } catch (error) {
            next(error);
        }
    };

    forgetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const body: ForgetPasswordDto = req.body;
            const forgetPassword = await this.authService.forgetPassword(body);
            res.status(200).json({
                status: 201,
                message: 'Password recover link successfully sended!',
                data: forgetPassword,
            });
        } catch (error) {
            next(error);
        }
    };

    recoverPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const body: RecoverPasswordDto = req.body;
            const query: any = req.query;
            const recoverPassword = await this.authService.recoverPassword(body, query);

            res.status(200).json({
                status: 201,
                message: 'password successfully changed!',
                data: serializer(UserDto, recoverPassword),
            });
        } catch (error) {
            next(error);
        }
    };
}

export default AuthController;
