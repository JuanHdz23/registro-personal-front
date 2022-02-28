import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpedientesService } from '../../../services/expedientes/expedientes.service';
import { AppLoaderService } from '../../../services/common/app-loader/app-loader.service';

@Component({
  selector: 'app-expediente-view',
  templateUrl: './expediente-view.component.html',
  styleUrls: ['./expediente-view.component.css']
})
export class ExpedienteViewComponent implements OnInit {

  message: string;

  anio: string;
  claveLugar: string;
  control: string;
  tipo: string;
  DataExpediente: any;
  infoExpediente: any;
  DataExpedienteIndoPes: any;
  //DataActividad: any;

  constructor(private activatedRoute: ActivatedRoute, private _expedientesService: ExpedientesService) { }

  ngOnInit(): void {
    this.anio = this.activatedRoute.snapshot.params["anio"];
    this.claveLugar = this.activatedRoute.snapshot.params["clave"];
    this.control = this.activatedRoute.snapshot.params["control"];
    // this.tipo = this.activatedRoute.snapshot.params["tipo"];
    this.obtenerData();
    // this.obtenerDataInfo();
    this.DataExpediente = {
      clave: this.claveLugar,
      anio: this.anio,
      control: this.control
    }

    //this.obtenerDataActividad();
  }

  receiveMessage($event) {
    this.message = $event
    //  console.log('this.message :>> ', this.message);
    this.obtenerData();
    // this.obtenerDataInfo();
    //this.obtenerDataActividad();
  }

  obtenerData() {
    this._expedientesService.obtenerInfoCita(this.claveLugar, this.anio, this.control).subscribe((res: any) => {
      this.infoExpediente = res.expediente;
      this.infoExpediente = res.expediente;
    });
  }

  obtenerDataInfo() {
    this._expedientesService.GetExpedienteInfoPesId("ML", this.anio, this.claveLugar, this.control).subscribe(res => {
      this.DataExpedienteIndoPes = res;
    });
  }

  // obtenerData() {
  //   this.loader.open();
  //   this._expedientesService.obtenerExpediente(this.anio, this.claveLugar, this.control).subscribe(res => {
  //     this.DataExpediente = res;
  //      console.log('DataExpediente :>> ', this.DataExpediente);
  //     this.loader.close();
  //   });
  // }


  // obtenerDataActividad() {
  //   this.loader.open();
  //   this._expedientesService.obtenerActividades("ML", this.anio, this.claveLugar, this.control).subscribe(res => {
  //     this.DataActividad = res;
  //     console.log('DataActividad :>> ', this.DataActividad);
  //     this.loader.closeAll();
  //   });
  // }
}
