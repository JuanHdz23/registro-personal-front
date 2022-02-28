import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ServicesModule } from './services/services.module';
import { RequestInterceptor } from './services/auth/request-interceptor.service';
 import { CustomFormsModule } from 'ngx-custom-validators';
 import { NgxPermissionsModule } from 'ngx-permissions';
import { NgxPaginationModule, PaginationService } from 'ngx-pagination';
//  import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { environment } from 'src/environments/environment';
 import { AgmCoreModule } from '@agm/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
// import { ReportesComponent } from './pages/reportes/reportes.component';
// import { GraficasComponent } from './pages/graficas/graficas.component';
// import { ActividadesComponent } from './pages/expedientes/actividades/actividades.component';
import { PipesModule } from './shared/pipes/pipes.module';
// import { FosasComponent } from './pages/fosas/fosas.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    BlankComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent,
    // FosasComponent,
    // ReportesComponent,
    // GraficasComponent,
    // ActividadesComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes),
    PerfectScrollbarModule,
    ServicesModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    // AgmCoreModule.forRoot({ apiKey: environment.MAPSKEY + '&libraries=visualization' }),
    AgmCoreModule.forRoot({
      apiKey: environment.MAPSKEY,
      libraries: ['places', 'visualization']
    }),
    PdfViewerModule,
    PipesModule
    // NgxPaginationModule
    // NgxPaginationModule
    //  CustomFormsModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    PaginationService
    // ServicesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
