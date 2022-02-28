import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpedienteComponent } from './expediente.component';
import { RouterModule } from '@angular/router';
import { expedienteRoutes } from './expediente.routing';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { CrearExpedienteComponent } from './crear-expediente/crear-expediente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
 import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ExpedienteViewComponent } from './expediente-view/expediente-view.component';

import { AgmCoreModule } from '@agm/core';
import { SelecImageComponent } from './selec-image/selec-image.component';
import { ViewImageComponent } from './view-image/view-image.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPermissionsModule } from 'ngx-permissions';
import { VisorPdfComponent } from './visor-pdf/visor-pdf.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PaginatorEspanol } from 'src/app/app-material/paginator-espanol';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CitasTramiteComponent } from './citas-tramite/citas-tramite.component';
import { RecepcionDocumentosComponent } from './recepcion-documentos/recepcion-documentos.component';
import { AfisComponent } from './afis/afis.component';
import { BiometricosComponent } from './biometricos/biometricos.component';
import { RnpspRealizadosComponent } from './rnpsp-realizados/rnpsp-realizados.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { VigenciasC3Component } from './vigencias-c3/vigencias-c3.component';
import { ArchivoExpedientesComponent } from './archivo-expedientes/archivo-expedientes.component';

@NgModule({
  declarations: [
    ExpedienteComponent,
    CrearExpedienteComponent,
    ExpedienteViewComponent,
    SelecImageComponent,
    ViewImageComponent,
    ActividadesComponent,
    VisorPdfComponent,
    CitasTramiteComponent,
    RecepcionDocumentosComponent,
    AfisComponent,
    BiometricosComponent,
    RnpspRealizadosComponent,
    VigenciasC3Component,
    ArchivoExpedientesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(expedienteRoutes),
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    PipesModule,
    Ng2SmartTableModule,
    AgmCoreModule,
    PdfViewerModule,
    NgxImageZoomModule,
    NgxSpinnerModule,
    NgxPermissionsModule,
    NgSelectModule,
    NgxChartsModule,
    MatExpansionModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: PaginatorEspanol }, {
        provide: STEPPER_GLOBAL_OPTIONS,
        useValue: { showError: true }
    },
    // RegistroUsuarioService
]
})
export class ExpedienteModule { }
