import { Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { CanDeactivateGuard } from '../../services/common/unsaved-changes/can-deactivate-guard.service';
import { PerfilComponent } from './perfil/perfil.component';
import { NgxPermissionsGuard } from 'ngx-permissions';




export const usuarioRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'usuarios',
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['1'],
            redirectTo: '/404'
          },
          title: 'Usuarios',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Usuarios' }
          ]
        },
        component: UsuariosComponent,
        // canDeactivate: [CanDeactivateGuard],
      },

      {
        path: 'perfil',
        data: {
          title: 'Perfil',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Perfil' }
          ]
        },
        component: PerfilComponent,
        // canDeactivate: [CanDeactivateGuard],
      }
    ]
  }
];
