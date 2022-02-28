import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RnpspService {

  private headers;
  private apiUrl = environment.base_url + '/RNPSP';
  // private apiUrl2 = environment.base_url + '/ACTIVIDADES';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public obtenerInfoRnpsp( clave: String, anio: String, control: String) {
    return this.http.get(this.apiUrl + '/GetRNPSPId/'+clave+'&'+anio+'&'+control);
  }

  public guardarRnpsp( registro: any ) {
    return this.http.post(this.apiUrl + '/PostRNPSP', registro);
  }

  public actualizarRnpsp(clave: any, anio: any, control: any, usuario:any, data: any) {
    return this.http.put(this.apiUrl + '/PutRNPSP/'+clave+'&'+anio+'&'+control+'&'+usuario, data);
  }
}
