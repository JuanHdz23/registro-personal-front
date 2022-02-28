import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FotosService {

  private headers;
  private apiUrl = environment.base_url;
  private fotos = environment.base_url + '/IDENTIFICACION_HUMANA_FOTOGRAFIA';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  guardarRegistro(registro: any) {
    return this.http.post(this.fotos, registro);
  }

  actualizarRegistro(tipo:any, anio: any, control: any, clave: any, data: any) {
    return this.http.put(this.fotos + '/PutIDENTIFICACION_HUMANA_FOTOGRAFIA?tipo='+ tipo +'&anio='+ anio +'&control='+ control +'&clave=' + clave, data);
  }

  public GetMediaFotosIdsId( tipo: any ,anio: String, clave: String, control: String) {
    return this.http.get(this.fotos + "/GetMediaFotosId?tipo="+tipo+"&anio="+anio+"&control="+control+"&clave="+clave);
  }
}
