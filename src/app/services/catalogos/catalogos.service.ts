import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  private headers;
  private apiUrl = environment.base_url + '/CATALOGO_ADSCRIPCION';
  private apiUrl2 = environment.base_url + '/CATALOGO_PUESTOS';
  private apiUrl3 = environment.base_url + '/CATALOGO_TRAMITE';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public getAdscripciones() {
    return this.http.get(this.apiUrl + '/GetCATALOGO_ADSCRIPCION');
  }

  public getPuestos( adscripcion ) {
    return this.http.get(this.apiUrl2 + '/GetCATALOGO_PUESTOS/' + adscripcion);
  }

  public getTramite() {
    return this.http.get(this.apiUrl3 + '/GetCATALOGO_TRAMITE');
  }
}
