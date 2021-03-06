import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../../interfaces/login-form.interface';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(formData: LoginForm){
    return this.http.post(`${base_url}/AUTH/LOGIN`, formData)
    .pipe(
      tap((resp : any) =>{
       localStorage.setItem('token', resp.token.toString())
      }))
  }
}
