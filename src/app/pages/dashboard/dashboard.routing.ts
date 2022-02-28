import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';





export const dashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        data: {
          title: 'Dashboard',
          urls: [
            // { title: 'Dashboard', url: '/dashboard' },
            { title: 'Dashboard' }
          ]
        },
        component: DashboardComponent,
        // canDeactivate: [CanDeactivateGuard],
      },
    ]
  }
];
