import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesComponent } from './reportes.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { ReportesRoutes } from './reportes.routing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RangoFechasComponent } from './rango-fechas/rango-fechas.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RangoAniosComponent } from './rango-anios/rango-anios.component';
import { VisorReportesComponent } from './visor-reportes/visor-reportes.component';


@NgModule({
  declarations: [ReportesComponent, RangoFechasComponent, RangoAniosComponent, VisorReportesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ReportesRoutes),
    FormsModule,
    AppMaterialModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgxChartsModule
  ]
})
export class ReportesModule { }
