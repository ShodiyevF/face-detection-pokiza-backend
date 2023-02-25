import { Expose, Transform, TransformFnParams } from 'class-transformer';
import { IsString, MaxLength, MIN, MinLength, NotEquals } from 'class-validator';
import exp from 'constants';

export class UsersRoleDto{

  @Expose()
  id: number;

  @Expose()
  roleName: string;

  @Expose()
  createdAt: string;
}

export class CreateUsersRoleDto{
  @IsString()
  @MinLength(2)
  @MaxLength(64)
  @NotEquals('', {message: '$property must not be empty string'})
  @Transform(({value}: TransformFnParams) => value.trim())
  roleName: string;
}

export class UpdateUsersRoleDto{
  @IsString()
  @MinLength(2)
  @MaxLength(64)
  @NotEquals('', {message: '$property must not be empty string'})
  @Transform(({value}: TransformFnParams) => value.trim())
  roleName: string;
}
