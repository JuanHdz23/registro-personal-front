import { Routes } from '@angular/router';
import { GraficasComponent } from './graficas.component';

export const graficasRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'graficas',
        data: {
          title: 'Graficas',
          urls: [
            // { title: 'Dashboard', url: '/dashboard' },
            { title: 'Graficas' }
          ]
        },
        component: GraficasComponent,
        // canDeactivate: [CanDeactivateGuard],
      },
    ]
  }
]
