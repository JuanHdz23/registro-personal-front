import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};
// import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PaginatorEspanol } from '../../app-material/paginator-espanol';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

// import { RegistroUsuarioService } from './registro-usuario.service';
import { UsuariosComponent } from './usuarios.component';
import { RouterModule } from '@angular/router';
import { usuarioRoutes } from './usuarios.routing';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { BrowserModule } from '@angular/platform-browser';
import { PerfilComponent } from './perfil/perfil.component';
// import { CustomFormsModule } from 'ngx-custom-validators';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
    imports: [
        CommonModule,
        PerfectScrollbarModule,
        /* routing,*/
        RouterModule.forChild(usuarioRoutes),
        NgbModule,
        // ServicesModule
        //BrowserModule,
         FormsModule,
         ReactiveFormsModule,
        // Ng2SmartTableModule,
        // BrowserAnimationsModule,
        AppMaterialModule,
        MatStepperModule,
        CdkStepperModule,
        // CustomFormsModule
        NgxPermissionsModule

    ],
    declarations: [
       RegistroUsuarioComponent,
        UsuariosComponent,
        PerfilComponent
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        { provide: MatPaginatorIntl, useClass: PaginatorEspanol }, {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { showError: true }
        },
        // RegistroUsuarioService
    ],
})
export class UsuariosModule { }
