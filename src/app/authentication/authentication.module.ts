import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { LoginComponent } from './login/login.component';
import { AuthenticationRoutes } from './authentication.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LockComponent } from './lock/lock.component';
import { NoPagesFoundComponent } from './no-pages-found/no-pages-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    LoginComponent,
    LockComponent,
    NoPagesFoundComponent,
  ]
})
export class AuthenticationModule {}
