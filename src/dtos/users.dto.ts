import { IsString, IsEmail, MaxLength, MinLength, NotEquals, IsUUID, IsAlphanumeric, IsBoolean, ValidateIf } from 'class-validator';
import { Expose, Type, Transform, TransformFnParams } from 'class-transformer';
import { BranchDto } from './branches.dto';
import { BranchEntity } from '@/entities/branches.entity';

export class CreateUserDto {
    @ValidateIf(dto => dto.isAdmin)
    @IsEmail()
    @MaxLength(100)
    @NotEquals('')
    @Transform(({ value }: TransformFnParams) => value?.trim())
    email: string;

    @ValidateIf(dto => dto.isAdmin)
    @IsString()
    @MinLength(4)
    @MaxLength(16)
    @NotEquals('')
    @Transform(({ value }: TransformFnParams) => value?.trim())
    password: string;

    @MaxLength(50)
    @NotEquals('')
    @Transform(({ value }: TransformFnParams) => value?.trim())
    firstName: string;

    @NotEquals('')
    @MaxLength(50)
    @Transform(({ value }: TransformFnParams) => value?.trim())
    lastName: string;

    @IsUUID(undefined, { each: true })
    @Transform(({ value }: TransformFnParams) => value.split(':'))
    allowedBranches: string[];

    @IsUUID()
    branch: BranchEntity;

    @IsBoolean()
    @Transform(({ value }: TransformFnParams) => (value === 'true' ? true : value === 'false' ? false : null))
    isAdmin: boolean;
}

export class UpdateUserDto {
    @ValidateIf(dto => dto.isAdmin)
    @IsEmail()
    @MaxLength(100)
    @NotEquals('')
    @Transform(({ value }: TransformFnParams) => value?.trim())
    email: string;

    @ValidateIf(dto => dto.isAdmin)
    @IsString()
    @MinLength(4)
    @MaxLength(16)
    @NotEquals('')
    @Transform(({ value }: TransformFnParams) => value?.trim())
    password: string;

    @MaxLength(50)
    @NotEquals('')
    @IsAlphanumeric()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    firstName: string;

    @NotEquals('')
    @MaxLength(50)
    @IsAlphanumeric()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    lastName: string;

    @IsUUID(undefined, { each: true })
    @Transform(({ value }: TransformFnParams) => value.split(':'))
    allowedBranches: string[];

    @IsUUID()
    branch: BranchEntity;

    @IsBoolean()
    @Transform(({ value }: TransformFnParams) => (value === 'true' ? true : value === 'false' ? false : null))
    isAdmin: boolean;
}

export class UserDto {
    @Expose()
    id: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    userImg: string;

    @Expose()
    email: string;

    @Expose()
    allowedBranches: string[];

    @Expose()
    @Type(() => BranchDto)
    branch: BranchDto;

    @Expose()
    createdAt: string;
}
