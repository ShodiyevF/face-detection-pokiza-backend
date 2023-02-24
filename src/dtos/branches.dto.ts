import { Expose, Transform, TransformFnParams } from 'class-transformer';
import { IsString, MaxLength, NotEquals, IsUUID } from 'class-validator';

export class IDParamDto {
    @IsUUID()
    id: string;
}

export class BranchDto {
    @Expose()
    id: number;

    @Expose()
    branchName: string;

    @Expose()
    createdAt: string;
}

export class CreateBranchDto {
    @IsString()
    @MaxLength(64)
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @NotEquals('', { message: '$property must not be empty string' })
    branchName: string;
}

export class UpdateBranchDto {
    @IsString()
    @MaxLength(64)
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @NotEquals('', { message: '$property must not be empty string' })
    branchName: string;
}
