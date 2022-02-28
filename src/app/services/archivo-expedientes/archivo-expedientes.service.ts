import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArchivoExpedientesService {

  private headers;
  private apiUrl = environment.base_url + '/ARCHIVO';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public obtenerInfoArchivo( clave: String, anio: String, control: String) {
    return this.http.get(this.apiUrl + '/GetARCHIVOId/'+clave+'&'+anio+'&'+control);
  }

  public guardarArchivo( registro: any ) {
    return this.http.post(this.apiUrl + '/PostARCHIVO', registro);
  }

  public actualizarArchivo(clave: any, anio: any, control: any, usuario:any, data: any) {
    return this.http.put(this.apiUrl + '/PutARCHIVO/'+clave+'&'+anio+'&'+control+'&'+usuario, data);
  }
}
