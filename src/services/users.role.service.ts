import { CreateUsersRoleDto, UpdateUsersRoleDto, UsersRoleDto } from '@dtos/users.role.dto';
import { UsersRoleEntity } from '@entities/users.role.entity';
import { Errors, HttpException } from '@shared/HttpException';
import { compareSync } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { create } from 'domain';
import { UpdateBranchDto } from '@dtos/branches.dto';

export class UsersRoleService{

  async createUsersRole(body: CreateUsersRoleDto): Promise<UsersRoleEntity> {
    const [usersRole] = await UsersRoleEntity.findBy({roleName: body.roleName});

    if(usersRole){
      throw new HttpException(400, Errors.USERS_ROLE_ALREADY_EXIST, 'roleName is already exist');
    }

    const newUsersRole = await UsersRoleEntity.create({roleName: body.roleName}).save();

    return newUsersRole;
  }

   async getUsersRoles(): Promise<UsersRoleEntity[]>{
    const usersRoles = await UsersRoleEntity.find();

    return usersRoles;
  }

  async updateUsersRole(params: { id: string }, body: Partial<UpdateUsersRoleDto>): Promise<UsersRoleEntity> {
    const [usersRole] = await UsersRoleEntity.findBy({id: params.id });

    if(!usersRole) {
      throw new HttpException(404, Errors.USERS_ROLE_NOT_FOUND, 'Bunday usersRole topilmadi');
    }

    const checkUsersRole = await UsersRoleEntity.findBy({roleName: body.roleName});

    if(checkUsersRole) {
      throw new HttpException(403, Errors.USERS_ROLE_ALREADY_EXIST, 'Bunday usersRole allaqachon mavjud');
    }

    const editedUsersRole = await UsersRoleEntity.save({id: params.id, ... body});

    return editedUsersRole;
  }

  async deleteUsersRole(params: {id: string}): Promise<void> {
    const [usersRole] = await UsersRoleEntity.find({where: {id: params.id}});

    if(!usersRole){
      throw  new HttpException(404, Errors.USERS_ROLE_NOT_FOUND, 'Bunday usersRole topilmadi');
    }

    await UsersRoleEntity.delete({id: params.id});
  }
}
