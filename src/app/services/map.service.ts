import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { LugarHallazgoService } from './lugar-hallazgo/lugar-hallazgo.service';
import { Injectable } from "@angular/core";
import { filter, catchError, tap, map, switchMap } from "rxjs/operators";
import { from, Observable, of } from "rxjs";


declare var google: any;
@Injectable({
  providedIn: 'root'
})
export class MapService {
  private geocoder: any;
  // private data: dataMap;
  data: any;
  constructor(
    private mapLoader: MapsAPILoader,
    private http: HttpClient,
    private _lugar: LugarHallazgoService) { }



  private initGeocoder() {
    // console.log("Inicializando GeoLocalizador .... ojo!!");

    this.geocoder = new google.maps.Geocoder();
  }

  private waitForMapsToLoad(): Observable<boolean> {
    if (!this.geocoder) {
      return from(this.mapLoader.load()).pipe(
        tap(() => this.initGeocoder()),
        map(() => true)
      );
    }
    return of(true);
  }
  getAddrComponent(place, componentTemplate) {
    let result;

    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return;
  }
  getCity(place) {
    const COMPONENT_TEMPLATE = { locality: 'long_name' },
      city = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return city;
  }
  getColonia(place) {
    const COMPONENT_TEMPLATE = { political: "short_name" },
      colonia = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return colonia;
  }

  getPostCode(place) {
    const COMPONENT_TEMPLATE = { postal_code: "long_name" },
      postCode = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return postCode;
  }

  getStreet(place) {
    const COMPONENT_TEMPLATE = { route: "long_name" },
      street = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return street;
  }
  getState(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_1: 'long_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }


  getStreetNumber(place) {
    const COMPONENT_TEMPLATE = { street_number: "long_name" },
      streetNumber = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return streetNumber;
  }
   getEstadoClave(estado){
    this._lugar.obtenerCatEstado().subscribe((res:any) =>{
      console.log('res :>> ', res);
      const value = res.find(x=> x.ESTADO === estado)
      console.log('value :>> ', value);
    return value;
    });
  }

  // async ejecucionServicio() {
  //   let respuesta;
  //   await this._lugar.obtenerCatEstado2().toPromise().then((response) => {
  //     respuesta = response;
  //     this.data = response;
  //   }).catch(e => console.error(e));
  //   return respuesta;
  // }
  geocodificaDomicilio(lat: number, lng: number): Observable<any> {
    //console.log("empezando a geocodificar!", location);

    return this.waitForMapsToLoad().pipe(
      // filter(loaded => loaded),

      switchMap(() => {
        return new Observable(observer => {
          this.geocoder.geocode({ 'location': { lat: lat, lng: lng } }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
            //  console.log("Geocoding complete!");

             // console.log(results);
             let prueba;
            //  this.ejecucionServicio().then(response => {
            //   this.data = response;
            //   console.log(response);
            // });
console.log('data :>> ', this.data);
              observer.next({
                calle: this.getStreet(results[0]),
                Estado: prueba,
                address: results[0]
              });
            } else {
            //  console.log("Error - ", results, " & Status - ", status);

              observer.next({ lat: 0, lng: 0, titulo: "", desc: "" });
            }

            observer.complete();
          });
        });
      })
    );
  }
  public obtenerPlaces(lat: number, lng: number) {
    this.geocoder.geocode({ 'location': { lat: lat, lng: lng } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {

          console.log('results[0] :>> ', results[0]);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });

    // this._lugar.obtenerCatEstado
    return "hola"
  }
}

class dataMap {
  COLONIA: string;
  ENTIDAD: string;
  NUM_EXTERIOR: string;
  CALLE: string;
  MUNICIPIO: string;

}

