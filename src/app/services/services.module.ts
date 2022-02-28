import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDialogComponent } from './common/app-dialog/app-dialog.component';
import { AppComfirmComponent } from './common/app-comfirm/app-comfirm.component';
import { AppLoaderComponent } from './common/app-loader/app-loader.component';
import { AppLoaderService } from './common/app-loader/app-loader.service';
import { AppDialogService } from './common/app-dialog/app-dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { AppMaterialModule } from '../app-material/app-material.module';
import { I18n, CustomDatepickerI18nService } from './common/CustomDatepickerI18n/custom-datepicker-i18n.service';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { LoginService } from './auth/login.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppDialogComponent,
    AppComfirmComponent,
    AppLoaderComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
    AppMaterialModule,

  ],
  providers: [
    AppLoaderService,
    AppDialogService,
    I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService },
    AuthService,
    AuthGuard,
    LoginService,

  ],
})
export class ServicesModule { }
