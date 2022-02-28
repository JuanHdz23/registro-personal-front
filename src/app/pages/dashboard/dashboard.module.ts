import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routing';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgxSpinnerModule } from "ngx-spinner";



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    AgmCoreModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPermissionsModule,
    NgxSpinnerModule
  ]
})
export class DashboardModule { }
