import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecepcionDocumentosService {

  private headers;
  private apiUrl = environment.base_url + '/DOCUMENTOS';
  
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public obtenerDocumentosExisten( clave: String, anio: String, control: String) {
    return this.http.get(this.apiUrl + '/GetDOCUMENTOSExisten/'+clave+'&'+anio+'&'+control);
  }

  public obtenerInfoDocumentos( clave: String, anio: String, control: String, tipo: Number) {
    return this.http.get(this.apiUrl + '/GetDOCUMENTOSId/'+clave+'&'+anio+'&'+control+'&'+tipo);
  }

  public guardarDocumentos( registro: any ) {
    return this.http.post(this.apiUrl + '/PostDOCUMENTOS', registro);
  }

  public actualizarDocumentos(clave: any, anio: any, control: any, tipo:any, data: any) {
    return this.http.put(this.apiUrl + '/PutDOCUMENTOS/'+clave+'&'+anio+'&'+control+'&'+tipo, data);
  }
}
