import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthGuard } from './guards/auth.guard';
import { CanDeactivateGuard } from './services/common/unsaved-changes/can-deactivate-guard.service';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ReportesModule } from './pages/reportes/reportes.module';
export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: '',
        loadChildren: () => import('./pages/expediente/expediente.module').then(m => m.ExpedienteModule)
      },
      {
        path: '',
        loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosModule),
      },
      {
        path: '',
        loadChildren: () => import('./pages/graficas/graficas.module').then(m => m.GraficasModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['1'],
            redirectTo: '/404'
          }}
      },
      {
        path: '',
        loadChildren: () => import('./pages/reportes/reportes.module').then(m => m.ReportesModule),
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['1'],
            redirectTo: '/404'
          }}
      }
    ]
  },
  {
		path: '',
		component: BlankComponent,
		children: [
			{
				path: '',
				loadChildren:
					() => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
			}
		]
	},
  {
    path: '**',
    redirectTo: '/404'
  }
];
