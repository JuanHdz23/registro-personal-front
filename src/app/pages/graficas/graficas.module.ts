import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficasComponent } from './graficas.component';
import { RouterModule } from '@angular/router';
import { graficasRoutes } from './graficas.routing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { ViewFosaMuncipioComponent } from './view-fosa-muncipio/view-fosa-muncipio.component';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

@NgModule({
  declarations: [GraficasComponent, ViewFosaMuncipioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(graficasRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    AppMaterialModule,
    AgmCoreModule,
    AgmJsMarkerClustererModule
  ]
})
export class GraficasModule { }
