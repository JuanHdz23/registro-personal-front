import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AfisService {

  private headers;
  private apiUrl = environment.base_url + '/AFIS';
  // private apiUrl2 = environment.base_url + '/ACTIVIDADES';
  
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public obtenerInfoAfis( clave: String, anio: String, control: String) {
    return this.http.get(this.apiUrl + '/GetAFISId/'+clave+'&'+anio+'&'+control);
  }

  public guardarAfis( registro: any ) {
    return this.http.post(this.apiUrl + '/PostAFIS', registro);
  }

  public actualizarAfis(clave: any, anio: any, control: any, usuario:any, data: any) {
    return this.http.put(this.apiUrl + '/PutAFIS/'+clave+'&'+anio+'&'+control+'&'+usuario, data);
  }
}
