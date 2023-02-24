import { BranchEntity } from '@/entities/branches.entity';
import { ControllersEntity } from '@/entities/controllers.entity';
import { Expose, Transform, TransformFnParams } from 'class-transformer';
import { IsAlphanumeric, IsBoolean, IsEmail, IsString, IsUUID, MaxLength, MinLength, NotEquals, ValidateIf } from 'class-validator';

export class ControllerDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    api: string;

    @Expose()
    username: string;

    @Expose()
    branch: string;

    @Expose()
    createdAt: string;
}

export class CreateControllerDto {
    @IsString()
    @MinLength(4)
    @MaxLength(32)
    @NotEquals('')
    @Transform(({ value }: TransformFnParams) => value?.trim())
    name: string;

    @IsString()
    @MaxLength(128)
    @NotEquals('')
    @Transform(({ value }: TransformFnParams) => value?.trim())
    api: string;

    @MaxLength(50)
    @NotEquals('')
    @IsAlphanumeric()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    username: string;

    @MaxLength(50)
    @NotEquals('')
    @IsAlphanumeric()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    password: string;

    @IsUUID()
    branch: BranchEntity;
}

export class UpdateControllerDto {
    @IsString()
    @MinLength(4)
    @MaxLength(32)
    @NotEquals('')
    @Transform(({ value }: TransformFnParams) => value?.trim())
    name: string;

    @IsString()
    @MaxLength(128)
    @NotEquals('')
    @Transform(({ value }: TransformFnParams) => value?.trim())
    api: string;

    @MaxLength(50)
    @NotEquals('')
    @IsAlphanumeric()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    username: string;

    @IsUUID()
    branch: BranchEntity;
}
