import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BiometricosService {

  private headers;
  private apiUrl = environment.base_url + '/BIOMETRICOS';
  
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public obtenerInfoBiometricos( clave: String, anio: String, control: String) {
    return this.http.get(this.apiUrl + '/GetBIOMETRICOSId/'+clave+'&'+anio+'&'+control);
  }

  public guardarBiometricos( registro: any ) {
    return this.http.post(this.apiUrl + '/PostBIOMETRICOS', registro);
  }

  public actualizarBiometricos(clave: any, anio: any, control: any, usuario:any, data: any) {
    return this.http.put(this.apiUrl + '/PutBIOMETRICOS/'+clave+'&'+anio+'&'+control+'&'+usuario, data);
  }
}
