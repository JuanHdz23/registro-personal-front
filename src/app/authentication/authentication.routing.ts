import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NoPagesFoundComponent } from './no-pages-found/no-pages-found.component';
import { LockComponent } from './lock/lock.component';


export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      // {
      //   path: '404',
      //   component: NoPagesFoundComponent
      // },
      // {
      //   path: 'lock',
      //   component: LockComponent
      // }
    ]
  }
];
