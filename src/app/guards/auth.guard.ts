import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private _authService: AuthService, 
               private Router: Router){}
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot){


  //   // return  this.AuthService.validarToken().pipe(
  //   //   tap(estaAutenticado => {
  //   //     if (!estaAutenticado) {
  //   //       this.Router.navigateByUrl('/login');
  //   //     }
  //   //   })
  //   // );
  //   return true;
  // }
  canActivate(): boolean {
    if (!this._authService.isAuthenticated()) {
      this.Router.navigate(['login']);
      return false;
    }
    return true;
  }

}
