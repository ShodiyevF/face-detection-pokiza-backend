import { Router } from 'express';
import UsersRoleController from '@controllers/users.role.controller';
import authorizationMiddleware from '@middlewares/authorization.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateBranchDto } from '@dtos/branches.dto';
import { UpdateUsersRoleDto } from '@dtos/users.role.dto';

class UsersRoleRoute {
  public route = Router();
  public controller = new UsersRoleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.route.get('/api/usersRole', authorizationMiddleware, this.controller.getUsersRole);

    this.route.post('api/usersRole',
      authorizationMiddleware,
      validationMiddleware(CreateBranchDto, 'body'),
      this.controller.createUsersRole);

    this.route.put('api/usersRole/:id',
      authorizationMiddleware,
      validationMiddleware(UpdateUsersRoleDto, 'body', true),
      this.controller.updateUsersRole);

    this.route.delete('api/usersRole/:id',authorizationMiddleware, this.controller.deleteUsersRole);
  }
}

export default UsersRoleRoute;
