import { Injectable } from '@angular/core';
import { JwtHelperService as JwtHelper } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
 import { NgxPermissionsService } from 'ngx-permissions';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor( public jwtHelper: JwtHelper, 
               private router: Router, 
               private http: HttpClient,
               private permissionsService: NgxPermissionsService ) { }


  public isAuthenticated(): boolean {
    const token = this.getLocalStorageToken();
    try {
      return !this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      return false;
    }
  }

  public validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/ValidarToken?token=${token}`)
    .pipe(
      map(resp => true),
      catchError(err => of(false))
    );
  }

  private getLocalStorageToken() {
    return localStorage.getItem('token');
  }

  private decodeToken() {
    return this.jwtHelper.decodeToken(this.getLocalStorageToken());
  }

  getUserIdentifier() {
    const user = this.decodeToken();
    return user.UserData;
  }

  getUserRol() {
    const user = this.decodeToken();
    return user.Rol;
  }

  getUserNombre() {
    const user = this.decodeToken();
    return user.Nombre;
  }

  getUserNombreRol() {
    const user = this.decodeToken();
    return user.RolName;
  }

  getUserId() {
    const user = this.decodeToken();
    return user.ID;
  }

  getUserName() {
    const user = this.decodeToken();
    return user.Usuario;
  }

  getUserClave() {
    const user = this.decodeToken();
    return user.CLAVE_EMPLEADO;
  }

  setPermissions(){
    const user = this.decodeToken();
    this.permissionsService.loadPermissions([user.ROL]);
  }

  public logout() {
      this.permissionsService.flushPermissions();
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }

}
