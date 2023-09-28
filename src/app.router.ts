import { Routes } from 'nest-router';
import { UsersModule } from './modules/users/users.module';

const routes: Routes = [
  {
    path: '/api',
    children: [
      {
        path: 'users',
        module: UsersModule,
      },
    ],
  },
];

export default routes;
