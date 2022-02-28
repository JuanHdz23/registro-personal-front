import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConsultaAvanzadaService {
  private headers;
  private apiUrl = environment.base_url;
  private CONSULTA_AVANZADA = environment.base_url + '/CONSULTA_AVANZADA';
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
   }

   public getConsutaAvanzada(data: any ) {
    return this.http.post(this.CONSULTA_AVANZADA + "/PostConsultaAvanzadaEXPEDIENTE", data);
  }


}
