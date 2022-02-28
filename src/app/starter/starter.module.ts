import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { StarterComponent } from './starter.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { NgxPermissionsModule } from 'ngx-permissions';

const routes: Routes = [
  // {
  //   path: '',
  //   data: {
  //     title: 'Starter Page',
  //     urls: [
  //       { title: 'Dashboard', url: '/dashboard' },
  //       { title: 'Starter Page' }
  //     ]
  //   },
  //   component: StarterComponent
  // }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes),AppMaterialModule,NgxPermissionsModule],
  declarations: [StarterComponent]
})
export class StarterModule {}
