import ControllersController from '@routes/controllers.route';
import BranchRoute from '@routes/branches.route';
import UsersRoute from '@routes/users.route';
import AuthRoute from '@routes/auth.route';

import App from '@/app';

const app = new App([new AuthRoute(), new UsersRoute(), new BranchRoute(), new ControllersController()]);

app.listen();
