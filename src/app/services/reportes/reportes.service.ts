import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private headers;
  private apiUrl = environment.base_url;
  private FOSA = environment.base_url + '/FOSA';
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
   }
   public getFOSAExtadisticaXMunicipioSonora(fechaInicial: any , fechaFinal: any, clave:any) {
    return this.http.get(this.FOSA + "/getFOSAExtadisticaXMunicipioSonora?fechaInicio="+fechaInicial+"&FechaFinal="+fechaFinal+"&clave="+clave);
  }

  public getMunicipioesNumeroFosas(fechaInicial: any , fechaFinal: any) {
    return this.http.get(this.FOSA + "/getMunicipioesNumeroFosas?fechaInicio="+fechaInicial+"&FechaFinal="+fechaFinal);
  }

  public getMunicipioesMadresBuscadoras(fechaInicial: any , fechaFinal: any) {
    return this.http.get(this.FOSA + "/getMunicipioesMadresBuscadoras?fechaInicio="+fechaInicial+"&FechaFinal="+fechaFinal);
  }

}
