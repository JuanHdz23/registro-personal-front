import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DactiloscopiaService {

  private headers;
  private apiUrl = environment.base_url;
  private dactiloscopia = environment.base_url + '/DACTILOSCOPIA';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  guardarRegistroDactiloscopia(dataDactiloscopia: any) {
    return this.http.post(this.dactiloscopia, dataDactiloscopia);
  }

  actualizarRegistroDactiloscopia(tipo:any, anio: any, control: any, clave: any, data: any) {
    return this.http.put(this.dactiloscopia + '/PutDACTILOSCOPIA?tipo='+ tipo +'&anio='+ anio +'&control='+ control +'&clave=' + clave, data);
  }

  public GetRegistroDactiloscopiaId( tipo: any ,anio: String, clave: String, control: String) {
    return this.http.get(this.dactiloscopia + "/GetDactiloscopiaId?tipo="+tipo+"&anio="+anio+"&control="+control+"&clave="+clave);
  }

}
