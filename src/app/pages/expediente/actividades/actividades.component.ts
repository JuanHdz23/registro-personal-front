import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExpedientesService } from '../../../services/expedientes/expedientes.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { arrayLength } from 'ngx-custom-validators/src/app/array-length/validator';
@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  @Input() dataExpediente: any;

  actividadesData: any;
  constructor(
    private _expedienteService: ExpedientesService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.obtenerDataActividad();
  }

  obtenerDataActividad() {
    this.spinner.show();
    this._expedienteService.obtenerActividades(this.dataExpediente.clave, this.dataExpediente.anio, this.dataExpediente.control).subscribe((res: any) => {
      // console.log('res :>> ', res);
      // res.forEach(element => {
      //   element.Foto = environment.API_URL_FOTO + element.Foto
      // });
      this.actividadesData = res['actividades'];
      // console.log('actividadesData :>> ', this.actividadesData);
      this.spinner.hide();
    });
  }

}
