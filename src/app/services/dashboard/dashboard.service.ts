import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExpedienteTableModel } from 'src/app/pages/expediente/models/expedientes.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private headers;
  private apiUrl = environment.base_url;
  private dashaboard = environment.base_url + '/Dashboard';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
   }


  public obtenerMarkersAdmin( anio : any ) {
    return this.http.get(this.dashaboard + "/GetExpedienteMarkersAdmin?anio="+anio );
  }


  public obtenerEstDashUnidad( anio : any , clave: any) {
    return this.http.get(this.dashaboard + "/GetExpedientesDashUnidad?anio="+anio+"&clave="+clave );
  }
  public obtenerEstDashAdmin( anio : any) {
    return this.http.get(this.dashaboard + "/GetExpedientesDashAdmin?anio="+anio);
  }

  public obtenerMarkersUnidad( anio : any , clave: any) {
    return this.http.get(this.dashaboard + "/GetExpedienteMarkersUnidad?anio="+anio +"&clave="+clave);
  }


  public obtenerExpedientesAdmin( anio : any): Observable<ExpedienteTableModel[]> {
    return this.http.get<ExpedienteTableModel[]>(this.dashaboard +"/GetExpedienteTotalAñoAdminData?anio="+anio);
  }

  public obtenerExpedientesDesconocidosAdmin( anio : any): Observable<ExpedienteTableModel[]> {
    return this.http.get<ExpedienteTableModel[]>(this.dashaboard +"/GetExpedienteDesconocidosAdminData?anio="+anio);
  }





  public obtenerExpedientesUnidad( anio : any , clave: any): Observable<ExpedienteTableModel[]> {
    return this.http.get<ExpedienteTableModel[]>(this.dashaboard +"/GetExpedienteTotalAñoUnidadData?anio="+anio+"&clave="+clave);
  }

  public obtenerExpedientesDesconocidosUnidad( anio : any, clave: any): Observable<ExpedienteTableModel[]> {
    return this.http.get<ExpedienteTableModel[]>(this.dashaboard +"/GetExpedienteDesconocidosUnidadData?anio="+anio+"&clave="+clave);
  }

//identificados
  public obtenerExpedientesIdentificadosAdmin( anio : any): Observable<ExpedienteTableModel[]> {
    return this.http.get<ExpedienteTableModel[]>(this.dashaboard +"/GetExpedienteIdentificadosAdminData?anio="+anio);
  }

  public obtenerExpedientesIdentificadosUnidad( anio : any, clave: any): Observable<ExpedienteTableModel[]> {
    return this.http.get<ExpedienteTableModel[]>(this.dashaboard +"/GetExpedienteIdentificadosUnidadData?anio="+anio+"&clave="+clave);
  }
//desconocidos identificados
  public obtenerExpedientesDesIdensAdmin( anio : any ): Observable<ExpedienteTableModel[]> {
    return this.http.get<ExpedienteTableModel[]>(this.dashaboard +"/GetExpedienteDesIdenAdminData?anio="+anio);
  }

  public obtenerExpedientesDesIdenUnidad( anio : any, clave: any): Observable<ExpedienteTableModel[]> {
    return this.http.get<ExpedienteTableModel[]>(this.dashaboard +"/GetExpedienteDesIdenUnidadData?anio="+anio+"&clave="+clave);
  }


  public obtenerReporteAniooMes( anio : any){
    return this.http.get(this.dashaboard +"/GetExpedientesMesAnioActual?anio="+anio);
  }
}
