import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VincularNucService {

  private headers;
  private apiUrl = environment.base_url;
  private vinculacion = environment.base_url + '/VINCULACIONs';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public obtenerNuc(nuc: String, anio: String) {
    return this.http.get(this.vinculacion + "/GetInfoNuc?nuc=" + nuc+"&anio="+anio);
  }

  guardarRegistro(registro: any) {
    return this.http.post(this.vinculacion, registro);
  }

  actualizarExpediente(tipo:any, anio: any, control: any, clave: any, data: any) {
    return this.http.put(this.vinculacion + '/PutVINCULACION?tipo='+ tipo +'&anio='+ anio +'&control='+ control +'&clave=' + clave, data);
  }

  public GetVinculacionId( tipo: any ,anio: String, clave: String, control: String) {
    return this.http.get(this.vinculacion + "/GetVinculacionId?tipo="+tipo+"&anio="+anio+"&control="+control+"&clave="+clave);
  }
}
