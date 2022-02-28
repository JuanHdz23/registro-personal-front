import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisposicionService {

  private headers;
  private apiUrl = environment.base_url;
  private disposicon_final = environment.base_url + '/DISPOSICION_FINAL';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
   }

   public obtenerCatParentesco(  ) {
    return this.http.get(this.apiUrl + "/Catalogos/getParentesco" );
  }

  guardarRegistro(registro: any) {
    return this.http.post(this.disposicon_final, registro);
  }

  actualizarExpediente(tipo:any, anio: any, control: any, clave: any, data: any) {
    return this.http.put(this.disposicon_final + '/PutDISPOSICION_FINAL?tipo='+ tipo +'&anio='+ anio +'&control='+ control +'&clave=' + clave, data);
  }

  public GetDisposicionFinalId( tipo: any ,anio: String, clave: String, control: String) {
    return this.http.get(this.disposicon_final + "/GetDisposicionFinalId?tipo="+tipo+"&anio="+anio+"&control="+control+"&clave="+clave);
  }
}
