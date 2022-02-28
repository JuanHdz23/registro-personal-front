import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportesService } from 'src/app/services/reportes/reportes.service';
import { DashboardService } from '../../services/dashboard/dashboard.service';
// import { GraficasService } from '../../services/graficas/graficas.service';
import { AppDialogComponent } from '../../services/common/app-dialog/app-dialog.component';
import { AppDialogService } from '../../services/common/app-dialog/app-dialog.service';
import { ViewFosaMuncipioComponent } from './view-fosa-muncipio/view-fosa-muncipio.component';
export interface SingleInterface {
  name: string,
  value: number,
}
export interface MultiSeriesInterface {
  name: string,
  series: SingleInterface[],
}
@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss']
})

export class GraficasComponent implements OnInit {

estadisticasForm: FormGroup;
 prueba = false;
  single: any;
  single2: SingleInterface[] = [];
  singleMunicipioFosas: any;
  singleMunicipioCuerposRestos: any;
  auxMultiMadresBuscadoras: any;
  view: any[] = [];
  colores: any[] =[];
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  panelOpenState = true;
  colorScheme = {
    domain:
    ["#b02e8b", "#cb4823", "#5e5373", "#7808a2", "#47e6b7", "#3ee3ce", "#59521b", "#606333", "#48d43c", "#f7dbe2", "#2b539b", "#6fd2cf", "#5e3d2b", "#5411c3", "#a9fb3e", "#58bc78", "#24237f", "#fc9682", "#9883b5", "#b808cc", "#b135f7", "#4d7926", "#12dfd6", "#340271", "#282c41", "#2121e0", "#353c34", "#6f11ee", "#bd07be", "#79eccb", "#bccee5", "#7f22c9", "#7372e2", "#147aef", "#e9332d", "#e5f195", "#61ed0e", "#d1ab2a", "#3457d2", "#bffb64", "#032b2d", "#ec48ef", "#1eee77", "#f5016d", "#5d8b16", "#383320", "#d60602", "#8ad17b", "#88e516", "#221d62", "#d57572", "#42b6ef", "#d81805", "#327f05", "#f63ba0", "#34e585", "#ce8c64", "#fd10d4", "#65b384", "#f7dd24", "#3b043d", "#04f477", "#c8276f", "#777cbf", "#887f4c", "#ed0c99", "#c66dd0", "#4837e8", "#a22ce7", "#7f2f24", "#193181", "#b08a8d"]
  };
  schemeType = 'ordinal';

  // options Fosas
  Fosas_showXAxis = true;
  Fosas_showYAxis = true;
  Fosas_gradient = false;
  Fosas_showLegend = false;
  Fosas_showXAxisLabel = true;
  Fosas_xAxisLabel = 'Municipios';
  Fosas_showYAxisLabel = true;
  Fosas_yAxisLabel = 'Número de fosas';

  // options Fosas Restos Cuerpos
    // options
    Fosas_R_C_showXAxis: boolean = true;
    Fosas_R_C_showYAxis: boolean = true;
    Fosas_R_C_gradient: boolean = false;
    Fosas_R_C_showLegend: boolean = false;
    Fosas_R_C_showXAxisLabel: boolean = true;
    Fosas_R_C_xAxisLabel: string = 'Municipios';
    Fosas_R_C_showYAxisLabel: boolean = true;
    Fosas_R_C_yAxisLabel: string = 'Restos | Cuerpos';
    Fosas_R_C_legendTitle: string = 'Municipios';



  data: any;

  constructor(
    private DashboardService: DashboardService,
    private reportService: ReportesService,
    // private graficasService: GraficasService,
    private fb: FormBuilder,
    private dialog:AppDialogService
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.DashboardService.obtenerEstDashAdmin(2021).subscribe((x: any) => {
      this.single2.push({ name: "desconocidos", value: x.desconocidos })
      this.single2.push({ name: "Identificados", value: x.identificados })
      console.log('this.single :>> ', this.single);
      this.single = this.single2
    });
    //estadistica planes
    // this.suspensionService.getcondicionesPlan(this.busquedaFrecuencia).subscribe(result=>{
    //   console.log(result);
    //   const x = result.map((val) =>{
    //     let y = Object.keys(val)[0];
    //     let z = Object.keys(val)[1];
    //     return{
    //       name:val[y],
    //       value:val[z]
    //     }
    //   });

    //   this.estadisticaPlanes = x;
    //   this.calculoRegistradas = x.reduce((sum, c) => sum + c.value, 0);

    //   // this.totalRegistradas = [{ name: 'Plan Condicion', value: this.calculoRegistradas }];
    //   this.xAxisLabel_frecuencia = 'Total: ' + this.calculoRegistradas + ' planes';

    // },
    // error => {
    //   console.log(<any>error);
    // });

   this.obtenerMunicipiosFosas(this.estadisticasForm.controls['FECHA_INICIAL'].value, this.estadisticasForm.controls['FECHA_FINAL'].value);
   this.obtenerMunicipiosRestosCuerpos(this.estadisticasForm.controls['FECHA_INICIAL'].value, this.estadisticasForm.controls['FECHA_FINAL'].value);
   this.obtenerMunicipiosMadresBuscadoras(this.estadisticasForm.controls['FECHA_INICIAL'].value, this.estadisticasForm.controls['FECHA_FINAL'].value);
  }

  initForm() {
    this.estadisticasForm = this.fb.group({
      FECHA_INICIAL: ['2021-01-01', Validators.required],
      FECHA_FINAL: ['2021-06-01', Validators.required],
    });
  }

  buscar(estadisticasForm: FormGroup) {
    const rangoFechas = estadisticasForm.value;
    console.log(rangoFechas);

    this.obtenerMunicipiosFosas(this.estadisticasForm.controls['FECHA_INICIAL'].value, this.estadisticasForm.controls['FECHA_FINAL'].value);
    this.obtenerMunicipiosRestosCuerpos(this.estadisticasForm.controls['FECHA_INICIAL'].value, this.estadisticasForm.controls['FECHA_FINAL'].value);
    this.obtenerMunicipiosMadresBuscadoras(this.estadisticasForm.controls['FECHA_INICIAL'].value, this.estadisticasForm.controls['FECHA_FINAL'].value);
  }

  obtenerMunicipiosFosas(fecha_inicial, fecha_final) {
    this.singleMunicipioFosas = [];
    // this.graficasService.getMunicipiosFosas(fecha_inicial, fecha_final).subscribe((result: any) => {
    //   console.log(result);
    //   //setTimeout ( ( )  =>  {  this . singleMunicipioFosas  =  [ ... result ] ;  } ) ;
    //   this.singleMunicipioFosas = result;
    // }, error => {
    //   console.log(<any>error)
    // });
  }

  obtenerMunicipiosRestosCuerpos(fecha_inicial, fecha_final) {
    this.singleMunicipioCuerposRestos = [];
    // this.graficasService.getMunicipiosRestosCuerpos(fecha_inicial, fecha_final).subscribe((result: any) => {
    //   console.log(result);
    //   this.singleMunicipioCuerposRestos = result;
    //   this.prueba = true;
    // }, error => {
    //   console.log(<any>error)
    // });
  }

  obtenerMunicipiosMadresBuscadoras(fecha_inicial, fecha_final) {
    this.auxMultiMadresBuscadoras = [];
    // this.graficasService.getMunicipiosMadresBuscadoras(fecha_inicial,fecha_final).subscribe((result: any) => {
    //    this.auxMultiMadresBuscadoras = result;
    //   console.log('result :>> ', result);
    // }, error => {
    //   console.log(<any>error.name)
    // });
  }

  Fosas_R_C_onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  Fosas_select(data) {
    console.log(data);
    this.dialog.showComponent(ViewFosaMuncipioComponent, {
      width: '90%',
      height: '80%',
      disableClose: true,
      data: {
        municipio: data.name,
        fechaInicial: this.estadisticasForm.controls['FECHA_INICIAL'].value,
        fechaFinal: this.estadisticasForm.controls['FECHA_FINAL'].value,
      }
    }).subscribe(res => {
      console.log('res :>> ', res);

    });
  }

}
