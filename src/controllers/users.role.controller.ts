import { UsersRoleService } from '@services/users.role.service';
import { NextFunction, Request, Response } from 'express';
import { serializer } from '@shared/serializer';
import { CreateUsersRoleDto, UpdateUsersRoleDto, UsersRoleDto } from '@dtos/users.role.dto';
import { stringValuesToPrimitives } from '@shared/utils';
import { BranchDto } from '@dtos/branches.dto';

class UsersRoleController {
  usersRoleService = new UsersRoleService();

  createUsersRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body = req.body as CreateUsersRoleDto;
      const usersRole = await this.usersRoleService.createUsersRole(body);

      res.status(201).json({
        status: 201,
        message: 'userRole successfully created!',
        data: serializer(UsersRoleDto, usersRole),
      });
    } catch (error) {
      next(error);
    }
  };

  getUsersRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const usersRoles = await this.usersRoleService.getUsersRoles();

      res.status(200).json(serializer(UsersRoleDto, usersRoles));
    } catch (error) {
      next(error);
    }
  };

  updateUsersRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const params = stringValuesToPrimitives(req.params) as { id: string };
      const body = req.body as UpdateUsersRoleDto;
      const usersRole = await this.usersRoleService.updateUsersRole(params, body);

      res.status(200).json({
        status: 201,
        message: 'UsersRole successfully updated!',
        data: serializer(UsersRoleDto, usersRole),
      });
    } catch (error) {
      next(error);
    }
  };

  deleteUsersRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const params = stringValuesToPrimitives(req.params) as { id: string };

      await this.usersRoleService.deleteUsersRole(params);

      res.status(200).json({
        status: 201,
        message: 'UsersRole successfully deleted!',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersRoleController;
