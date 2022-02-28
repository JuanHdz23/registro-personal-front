import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExpedienteTableModel } from '../../pages/expediente/models/expedientes.model';
import { CitasTableModel } from '../../pages/expediente/models/citas.model';

@Injectable({
  providedIn: 'root'
})
export class ExpedientesService {

  private headers;
  private apiUrl = environment.base_url + '/DATOS_CITA';
  private apiUrl2 = environment.base_url + '/ACTIVIDADES';
  // private apiUrl2 = environment.base_url + '/Publicar';
  // private apiUrl3 = environment.base_url + 'CONSULTA_WEB_FALLECIDOS_NO_IDENTIFICADOS';
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  // public obtenerCitas(): Observable<CitasTableModel[]> {
  //   return this.http.get<CitasTableModel[]>(this.apiUrl + "/GetExpedientesTableAdmin");
  // }

  public obtenerCitas() {
    return this.http.get(this.apiUrl + '/GetDATOS_CITAS');
  }

  public obtenerInfoCita( clave: String, anio: String, control: String) {
    return this.http.get(this.apiUrl + '/GetDATOS_CITAId/'+clave+'&'+anio+'&'+control);
  }

  public obtenerActividades( clave: any ,anio: String, control: String) {
    return this.http.get(this.apiUrl2 + '/GetACTIVIDADESId/'+clave+'&'+anio+'&'+control);
  }

  public guardarCita( registro: any ) {
    return this.http.post(this.apiUrl + '/PostDATOS_EXPEDIENTE', registro);
  }

  public actualizarCita(clave: any, anio: any, control: any, usuario:any, data: any) {
    return this.http.put(this.apiUrl + '/PutDATOS_EXPEDIENTE/'+clave+'&'+anio+'&'+control+'&'+usuario, data);
  }





  

  public eliminarCartelId(anio: String, clave: String, control: String) {
    return this.http.delete(this.apiUrl2+"/DeleteCONSULTA_WEB_FALLECIDOS_NO_IDENTIFICADOS?anio=" + anio + "&control=" + control + "&clave=" + clave);
  }

  public obtenerExpedientes(): Observable<ExpedienteTableModel[]> {
    return this.http.get<ExpedienteTableModel[]>(this.apiUrl + "/GetExpedientesTableAdmin");
  }

  public obtenerExpedientesUnidad(clave: any): Observable<ExpedienteTableModel[]> {
    return this.http.get<ExpedienteTableModel[]>(this.apiUrl + "/GetExpedientesTableUnidad?unidad="+clave);
  }

  public obtenerExpediente(anio: String, clave: String, control: String) {
    return this.http.get(this.apiUrl + "/GetSEMEFO_EXPEDIENTE_PERSONAL?anio=" + anio + "&control=" + control + "&clave=" + clave);
  }

  public obtenerExpedienteFotos(anio: String, clave: String, control: String) {
    return this.http.get(this.apiUrl2 + "/GetFotosPublicar?anio=" + anio + "&control=" + control + "&clave=" + clave);
  }

  public activarPrendas(anio: String, clave: String, control: String, id: any,change: any) {
    return this.http.put(this.apiUrl2 + "/PutActivarPrenda/"+id+"?anio=" + anio + "&control=" + control + "&clave=" + clave, {actual: change});
  }

  public activarSenias(anio: String, clave: String, control: String,id: any,change: any) {
    return this.http.put(this.apiUrl2 + "/PutActivarSenia/"+id+"?anio=" + anio + "&control=" + control + "&clave=" + clave, {actual: change});
  }

  public activarPublicar(anio: String, clave: String, control: String,change: any) {
    return this.http.put(this.apiUrl2 + "/PutActivarPublicar/?anio=" + anio + "&control=" + control + "&clave=" + clave, {actual: change});
  }

  // public obtenerActividades( tipo: any ,anio: String, clave: String, control: String) {
  //   return this.http.get(this.apiUrl + "/GetActividades?tipo="+tipo+"&anio="+anio+"&control="+control+"&clave="+clave);
  // }

  guardarRegistro(registro: any) {
    //console.log(registro);
    return this.http.post(this.apiUrl, registro);
  }

  actualizarExpediente(anio: any, control: any, clave: any, data: any) {
    return this.http.put(this.apiUrl + '/PutSEMEFO_EXPEDIENTE_PERSONAL?anio='+ anio +'&control='+ control +'&clave=' + clave, data);
  }

  public obtenerInfoExp( tipo: any ,anio: String, clave: String, control: String) {
    return this.http.get(this.apiUrl + "/GetInfoExp?tipo="+tipo+"&anio="+anio+"&control="+control+"&clave="+clave);
  }

  public GetExpedienteId( tipo: any ,anio: String, clave: String, control: String) {
    return this.http.get(this.apiUrl + "/GetExpedienteId?tipo="+tipo+"&anio="+anio+"&control="+control+"&clave="+clave);
  }

  public GetExpedienteInfoPesId( tipo: any ,anio: String, clave: String, control: String) {
    return this.http.get(this.apiUrl + "/GetExpedienteInfoPesId?tipo="+tipo+"&anio="+anio+"&control="+control+"&clave="+clave);
  }
}
