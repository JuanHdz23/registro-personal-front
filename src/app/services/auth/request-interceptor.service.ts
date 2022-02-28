import { Injectable ,Injector} from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppDialogService } from '../common/app-dialog/app-dialog.service';
import { AppLoaderService } from '../common/app-loader/app-loader.service';
@Injectable({ providedIn: 'root' })
export class RequestInterceptor implements HttpInterceptor {

    constructor( public auth: AuthService,
      private _injector: Injector,
      private router: Router,
      private dialog: AppDialogService,
      private loader: AppLoaderService) { }


      intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('token');

        if (token && this.auth.isAuthenticated()) {
            const tokenHeader = 'Bearer ' + token;
            request = request.clone({
                setHeaders: {
                    Authorization: tokenHeader
                }
            });
        }

        return next.handle(request).pipe(
          tap(response =>{
            if (response instanceof HttpResponse) {
              // checar token actualizado
              // console.log('hola');
          }
          }),
          catchError(error =>{
            if (error.status ===401) {
              this.showRedirectDialog();
            }
            return throwError(error);
          })
        );


  }

  private showRedirectDialog() {
      this.loader.closeAll();
      this.dialog.show('Sesion Expirada',
          'Su sesion ha expirado. Por razones de seguridad será redirigido a la Pagina de Inicio de Sesión.')
          .subscribe(res => {
            //  this.auth.logout();
              //this.router.navigate(['/login']);
              this.router.navigateByUrl('lock');
              return false;
          });
  }
}
