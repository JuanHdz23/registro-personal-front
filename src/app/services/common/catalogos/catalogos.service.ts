import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  private API_URL = environment.base_url + '/Catalogos';

  constructor(public http: HttpClient) { }

  getNacionalidad() {
    return this.http.get(this.API_URL + '/getNacionalidad');
  }

  public getTipoMuerte() {
    return this.http.get(this.API_URL + '/getTipoMuerte' );
  }

  getTipoCausaMuerte(idMuerte: any) {
    return this.http.get(this.API_URL + '/getCausaMuerteBydata/' + idMuerte);
  }

  getComplexion() {
    return this.http.get(this.API_URL + '/getComlexion' );
  }

  getColorPiel() {
    return this.http.get(this.API_URL + '/getColorPiel' );
  }

  getCara() {
    return this.http.get(this.API_URL + '/getCara' );
  }

  getSangre() {
    return this.http.get(this.API_URL + '/getSangre' );
  }

  getEstadoCuerpo() {
    return this.http.get(this.API_URL + '/getEstadoCuerpo' );
  }

  getCabelloCantidad() {
    return this.http.get(this.API_URL + '/getCabelloCantidad' );
  }

  getCabelloColor() {
    return this.http.get(this.API_URL + '/getCabelloColor' );
  }

  getCabelloForma() {
    return this.http.get(this.API_URL + '/getCabelloForma' );
  }

  getCabelloCalvicie() {
    return this.http.get(this.API_URL + '/getCabelloCalvicie' );
  }

  getCabelloImplantacion() {
    return this.http.get(this.API_URL + '/getCabelloImplantacion' );
  }

  getFrenteAltura() {
    return this.http.get(this.API_URL + '/getFrenteAltura' );
  }

  getFrenteInclinacion() {
    return this.http.get(this.API_URL + '/getFrenteInclinacion' );
  }

  getFrenteAncho() {
    return this.http.get(this.API_URL + '/getFrenteAncho' );
  }

  getCejaDireccion() {
    return this.http.get(this.API_URL + '/getCejaDireccion' );
  }

  getCejaImplantacion() {
    return this.http.get(this.API_URL + '/getCejaImplantacion' );
  }

  getCejaForma() {
    return this.http.get(this.API_URL + '/getCejaForma' );
  }

  getCejaTamano() {
    return this.http.get(this.API_URL + '/getCejaTamano' );
  }

  getOjosColor() {
    return this.http.get(this.API_URL + '/getOjosColor' );
  }

  getOjosForma() {
    return this.http.get(this.API_URL + '/getOjosForma' );
  }

  getOjosTamanio() {
    return this.http.get(this.API_URL + '/getOjosTamanio' );
  }

  getNarizRaiz() {
    return this.http.get(this.API_URL + '/getNarizRaiz' );
  }

  getNarizDorso() {
    return this.http.get(this.API_URL + '/getNarizDorso' );
  }

  getNarizAncho() {
    return this.http.get(this.API_URL + '/getNarizAncho' );
  }

  getNarizBase() {
    return this.http.get(this.API_URL + '/getNarizBase' );
  }

  getNarizAltura() {
    return this.http.get(this.API_URL + '/getNarizAltura' );
  }

  getBocaTamano() {
    return this.http.get(this.API_URL + '/getBocaTamano' );
  }

  getBocaComisuras() {
    return this.http.get(this.API_URL + '/getBocaComisuras' );
  }

  getLabiosEspesor() {
    return this.http.get(this.API_URL + '/getLabiosEspesor' );
  }

  getLabiosAltura() {
    return this.http.get(this.API_URL + '/getLabiosAltura' );
  }

  getLabiosProminencia() {
    return this.http.get(this.API_URL + '/getLabiosProminenia' );
  }

  getMentonTipo() {
    return this.http.get(this.API_URL + '/getMentonTipo' );
  }

  getMentonForma() {
    return this.http.get(this.API_URL + '/getMentonForma' );
  }

  getMentonInclinacion() {
    return this.http.get(this.API_URL + '/getMentonInclinacion' );
  }

  getOrejaForma() {
    return this.http.get(this.API_URL + '/getOrejaForma' );
  }

  getOrejaOriginal() {
    return this.http.get(this.API_URL + '/getOrejaOriginal' );
  }

  getOrejaSuperior() {
    return this.http.get(this.API_URL + '/getOrejaSuperior' );
  }

  getOrejaPosterior() {
    return this.http.get(this.API_URL + '/getOrejaPosterior' );
  }

  getOrejaAdherencia() {
    return this.http.get(this.API_URL + '/getOrejaAdherencia' );
  }

  getOrejaContorno() {
    return this.http.get(this.API_URL + '/getOrejaContorno' );
  }

  getOrejaLobuloAdherencia() {
    return this.http.get(this.API_URL + '/getOrejaLobuloAdherencia' );
  }

  getOrejalobuloParticularidad() {
    return this.http.get(this.API_URL + '/getOrejalobuloParticularidad' );
  }

  getOrejaLobuloDimension() {
    return this.http.get(this.API_URL + '/getOrejaLobuloDimencion' );
  }
  getClaveLugar() {
    return this.http.get(this.API_URL + '/getClaveLugar' );
  }


}
