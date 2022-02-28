import { Routes } from '@angular/router';
import { ExpedienteComponent } from './expediente.component';
import { ExpedienteViewComponent } from './expediente-view/expediente-view.component';
import { CrearExpedienteComponent } from './crear-expediente/crear-expediente.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

export const expedienteRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'expediente',
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['1','2','3','4','5','6','7','8',"9"],
            redirectTo: '/404'
          },
          title: 'Expediente',
          urls: [
            { title: 'Expediente', url: '/expediente' },
            { title: 'Expediente' }
          ]
        },
        component: ExpedienteComponent,
        // canDeactivate: [CanDeactivateGuard],
      },  {
        path: 'expediente/:clave/:anio/:control',
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['1','2','3','4','5','6','7','8',"9"],
            redirectTo: '/404'
          },
          title: 'Expediente',
          urls: [
            { title: 'Expediente', url: '/expediente' },
            { title: 'Expediente' }
          ]
        },
        component: ExpedienteViewComponent,
        // canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'nuevo-expediente',
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['1','2','3','4','5','6','7','8'],
            redirectTo: '/404'
          },
          title: 'nuevo-expediente',
          urls: [
            { title: 'Expediente', url: '/expediente' },
            { title: 'Expediente' }
          ]
        },
        component: CrearExpedienteComponent,
        // canDeactivate: [CanDeactivateGuard],
      }

    ]
  }
];
