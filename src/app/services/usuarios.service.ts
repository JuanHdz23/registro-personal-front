import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { changePass } from '../interfaces/changepass.interface';
import { LoginForm } from '../interfaces/login-form.interface';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = environment.base_url + '/Usuarios';
  constructor(private http: HttpClient) { }


  public agregarUsuario(_usuario: any) {
    return this.http.post(this.apiUrl + '/PostUsuario', _usuario);
  }

  public obtenerUsuarios() {
    return this.http.get(this.apiUrl);
  }

  public editarUsuario(_usuario: any) {
    return this.http.put(this.apiUrl + '/PutUsuario/', _usuario);
  }

  public eliminarUsuario(id: any) {
    return this.http.delete(this.apiUrl + '/DeleteUsuario/' + id);
  }

  public getUsuarioId(id: any) {
    return this.http.get(this.apiUrl + '/GetUsuario/' + id);
  }

  public changePassword(id: any,change: changePass) {
    return this.http.put(this.apiUrl + '/PutPassword/'+id, change);
  }

  public activarUsuarios(id: any,change: any) {
    return this.http.put(this.apiUrl + '/PutActivar/'+id, {actual: change});
  }

  public getFoto(id: any) {
    return this.http.get(this.apiUrl + '/GetFoto/'+id);
  }


}
