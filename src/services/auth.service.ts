import { HttpException, Errors } from '@shared/HttpException';
import { LoginDto, ForgetPasswordDto, RecoverPasswordDto, RecoverPasswordTokenDto } from '@dtos/auth.dto';
import { UserEntity } from '@entities/users.entity';
import { mailer } from '@/lib/mailer';
import { JWT } from '@lib/Jwt';

export class AuthService {
    async login(body: LoginDto): Promise<string> {
        const [user] = await UserEntity.findBy({ email: body.email });
        
        if (!user) {
            throw new HttpException(404, Errors.USER_NOT_EXISTS, 'Bunday foydalanuvchi mavjud emas!');
        }
        
        if (user.isAdmin !== true) {
            throw new HttpException(403, Errors.FORBIDDEN_ERROR, 'Siz uchun ruxsat yoq!');
        }
        
        const isPasswordTrue = await UserEntity.checkPassword(body.password, user.password);
        
        if (!isPasswordTrue) {
            throw new HttpException(400, Errors.WRONG_PASSWORD, 'Parol xato!');
        }
        
        const accessToken = JWT.createAccessToken({ userId: user.id });
        
        return accessToken;
    }
    
    async checktoken(headers: any): Promise<void> {
        if ( !headers || !headers.authorization) {
            throw new HttpException(404, Errors.TOKEN_REVOKED, `Token topilmadi !`);
        }
        
        const payload = JWT.verifyAccessToken(headers.authorization);
        
        const [user] = await UserEntity.findBy({ id: payload.userId });
        
        if (!user) {
            throw new HttpException(404, Errors.INVALID_TOKEN, `Notog'ri token !`);
        }
    }
    
    async forgetPassword(body: ForgetPasswordDto): Promise<string> {
        const [user] = await UserEntity.findBy({ email: body.email });
        
        if (!user) {
            throw new HttpException(404, Errors.USER_NOT_EXISTS, 'Bunday foydalanuvchi mavjud emas!');
        }
        
        if (user.isAdmin !== true) {
            throw new HttpException(403, Errors.FORBIDDEN_ERROR, 'Siz uchun ruxsat yoq!');
        }
        
        const link = JWT.createAccessToken({ userId: user.email });
        
        mailer(body.email, link);
        
        return user.email;
    }
    
    async recoverPassword(data: RecoverPasswordDto, query: RecoverPasswordTokenDto): Promise<UserEntity> {
        const email = JWT.verifyAccessToken(query.token);
        const [user] = await UserEntity.findBy({ email: email.userId });
        console.log(user);
        
        const a = await UserEntity.save({ id: user.id, ...data });
        console.log(a);
        
        return user;
    }
}
