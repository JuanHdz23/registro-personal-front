import { Routes } from '@angular/router';
import { ReportesComponent } from './reportes.component';


export const ReportesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'reportes',
        data: {
          title: 'Reportes',
          urls: [
            // { title: 'Dashboard', url: '/dashboard' },
            { title: 'Reportes' }
          ]
        },
        component: ReportesComponent,
        // canDeactivate: [CanDeactivateGuard],
      },
    ]
  }
]
