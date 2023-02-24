import { IsString, MaxLength, MinLength, NotEquals } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class LoginDto {
    @IsString()
    email: string;

    @IsString()
    password: string;
}

export class ForgetPasswordDto {
    @IsString()
    email: string;
}

export class RecoverPasswordTokenDto {
    @IsString()
    token: string;
}

export class RecoverPasswordDto {
    @IsString()
    @MinLength(4)
    @MaxLength(16)
    @NotEquals('')
    @Transform(({ value }: TransformFnParams) => value?.trim())
    password: string;
}
