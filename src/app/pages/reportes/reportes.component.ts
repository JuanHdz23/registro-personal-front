import { Component, OnInit } from '@angular/core';
import html2pdf from "html2pdf.js";
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { RangoFechasComponent } from './rango-fechas/rango-fechas.component';
import { AppDialogService } from '../../services/common/app-dialog/app-dialog.service';
import { ReportesService } from '../../services/reportes/reportes.service';
import Swal from 'sweetalert2';
// import { GraficasService } from 'src/app/services/graficas/graficas.service';
import { RangoAniosComponent } from './rango-anios/rango-anios.component';
import { VisorReportesComponent } from './visor-reportes/visor-reportes.component';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  fechaInicial: any;
  fechaFinal: any;
  reporteFosasXMunicipio: any;
  reporteNumroFosasXMunicipio: any
  reporteNumeroIDXMes: any[] = [];
  reporteNumeroXMesGenerados: any[] = [];
  reporteFosasEncontradasPor: any[] = [];
  reporteDesconocidosHMD: any[] = [];
  reporte1: any[]=[];
  reporteNumeroFosasMesGenerados: any[]=[];
  titulo: any
  //grafica 1 
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Identifcados y Desconocidos';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Número de Identifcados y Desconocidos';
  legendTitle: string = '';
  legendPosition: string= "below"

  anio: any;
  // totales
  ENERO: any;
  FEBRERO: any;
  MARZO: any;
  ABRIL: any;
  MAYO: any;
  JUNIO: any;
  JULIO: any;
  AGOSTO: any;
  SEPTIEMBRE: any;
  OCUTUBRE: any;
  NOVIEMBRE: any;
  DICIEMBRE: any;
  TOTAL: any;

  constructor(private spinner: NgxSpinnerService, private serviceDash: DashboardService, private dialog: AppDialogService, private reporteService:ReportesService,
    /*private graficasService: GraficasService*/) { }
 
  ngOnInit(): void {
  }

 





// listo
  NumeroExpedientesXMesAnioActual(){
    this.spinner.show();
    this.anio=new Date().getFullYear();
        this.serviceDash.obtenerReporteAniooMes(this.anio).subscribe((z: any) => {
    
        console.log('object :>> ',  z);
          z.forEach(element => {
            switch (element.Mes) {
              case "1":
                element.Mes = "Enero"
                break;
              case "2":
                element.Mes = "Febrero"
                break;
              case "3":
                element.Mes = "Marzo"
                break;
              case "4":
                element.Mes = "Abril"
                break;
              case "5":
                element.Mes = "Mayo"
                break;
              case "6":
                element.Mes = "Junio"
                break;
              case "7":
                element.Mes = "Julio"
                break;
              case "8":
                element.Mes = "Agosto"
                break;
              case "9":
                element.Mes = "Septiembre"
                break;
              case "10":
                element.Mes = "Octubre"
                break;
              case "11":
                element.Mes = "Noviembre"
                break;
              case "12":
                element.Mes = "Diciembre"
                break;
    
    
    
    
              default:
                break;
            }
          });
          this.reporte1 = z
          this.reporte1.push({Mes: "Total", Anio: 2021, count: this.reporte1.reduce((sum, c) => sum + c.count, 0)})
          console.log('this.reporte1 :>> ', this.reporte1);
          this.spinner.hide();
          this.dialog.showComponent(VisorReportesComponent, {
            width: '99%',
            height: 'auto',
            disableClose: true,
            data: {
              reporteid: "reporteExpedientesMesAnio",
              info: this.reporte1,
              anio: this.anio
            }
          }).subscribe(res => {
            // console.log('res :>> ', res);
          });
        }, err => {
          console.log(err);
          this.spinner.hide();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error en generar el reporte, por favor intentelo nuevamente.'
          });
        });
  }
   

  NumeroDeIDRangoFechas(){
    this.dialog.showComponent(RangoFechasComponent, {
      width: '25%',
      height: 'auto',
      disableClose: true,
      data: {
        prueba: "12"
      }
    }).subscribe(res => {
      console.log('res :>> ', res);
      this.fechaInicial = res.fechaInicial;
      this.fechaFinal = res.fechaFinal;
      if (res) {
        this.spinner.show();
        // this.graficasService.GetExpedienteRangoFechaDI(res.fechaInicial, res.fechaFinal).subscribe((reporte:any)=>{
        //    console.log(reporte);
        //    this.reporteNumeroIDXMes = reporte;
        //    this.reporteNumeroIDXMes.push({
        //     name: "Total",
        //     series: [
        //       {name: "Identificados", value:  this.reporteNumeroIDXMes[0].sumaidentificados},
        //       {name: "Desconocidos", value:  this.reporteNumeroIDXMes[0].sumaDesconocidos}
        //     ]
        //    });
        //   //  for (let index = 0; index < this.reporteNumeroIDXMes.length; index++) {
        //   //    const element = this.reporteNumeroIDXMes[index];
        //   //    if (element.series[0].value == 0  &&  element.series[1].value == 0) {
        //   //      console.log('element :>> ', element);
        //   //     this.reporteNumeroIDXMes.splice((index-1), 1);
        //   //    }
            
        //   //  }
        //   //  reporteIDRango
        //   //  Numero Identificados y Desconocidos.pdf
        //   this.spinner.hide();
        //   this.dialog.showComponent(VisorReportesComponent, {
        //     width: '99%',
        //     height: 'auto',
        //     disableClose: true,
        //     data: {
        //       reporteid: "reporteIDRango",
        //       info: this.reporteNumeroIDXMes,
        //       anio: this.anio,
        //       fechaInicial: this.fechaInicial,
        //       fechaFinal: this.fechaFinal
        //     }
        //   }).subscribe(res => {
        //     // console.log('res :>> ', res);
        //   });

        // }, err => {
        //   console.log(err);
        //   this.spinner.hide();
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Error',
        //     text: 'Hubo un error en generar el reporte, por favor intentelo nuevamente.'
        //   });
        // });
      }
    });
  }
  

  NumeroDeExpedientesGeneradosXmes(){
    this.dialog.showComponent(RangoAniosComponent, {
      width: '25%',
      height: 'auto',
      disableClose: true,
      data: {
        prueba: "prueba"
      }
    }).subscribe(res => {
      console.log('res :>> ', res);
  this.anio = res.anio
      if (res) {
        this.spinner.show();
        // this.graficasService.GetExpedientesAnual(res.anio, res.clave.CLAVE_LUGAR).subscribe((reporte:any)=>{
        //    console.log(reporte);
        //    this.reporteNumeroXMesGenerados = reporte;
        //    this.reporteNumeroXMesGenerados.push({
        //     ABRIL: reporte.reduce((sum, c) => sum + c.ABRIL, 0),
        //     AGOSTO: reporte.reduce((sum, c) => sum + c.AGOSTO, 0),
        //     DICIEMBRE: reporte.reduce((sum, c) => sum + c.DICIEMBRE, 0),
        //     ENERO: reporte.reduce((sum, c) => sum + c.ENERO, 0),
        //     FEBRERO: reporte.reduce((sum, c) => sum + c.FEBRERO, 0),
        //     JULIO: reporte.reduce((sum, c) => sum + c.JULIO, 0),
        //     JUNIO: reporte.reduce((sum, c) => sum + c.JUNIO, 0),
        //     LUGAR: "TOTAL",
        //     MARZO: reporte.reduce((sum, c) => sum + c.MARZO, 0),
        //     MAYO: reporte.reduce((sum, c) => sum + c.MAYO, 0),
        //     NOMVIEMBRE: reporte.reduce((sum, c) => sum + c.NOMVIEMBRE, 0),
        //     OCUTUBRE: reporte.reduce((sum, c) => sum + c.OCUTUBRE, 0),
        //     SEPTIEMRE: reporte.reduce((sum, c) => sum + c.SEPTIEMRE, 0),
        //     TOTAL: reporte.reduce((sum, c) => sum + c.TOTAL, 0),
        //    });

        //    this.spinner.hide();
        //   this.dialog.showComponent(VisorReportesComponent, {
        //     width: '99%',
        //     height: 'auto',
        //     disableClose: true,
        //     data: {
        //       reporteid: "NumeroDeExpedientesGeneradosXmes",
        //       info: this.reporteNumeroXMesGenerados,
        //       anio: this.anio,
        //       fechaInicial: this.fechaInicial,
        //       fechaFinal: this.fechaFinal
        //     }
        //   }).subscribe(res => {
        //     // console.log('res :>> ', res);
        //   });
        //   // setTimeout(() => {
            
        //   //   const element = document.getElementById("NumeroDeExpedientesGeneradosXmes")
        //   //     .innerHTML;
        //   //   const opt = {
        //   //     margin: 0.1,
        //   //     filename: "Número de expedientes generados.pdf",
        //   //     image: { type: "jpeg", quality: 1 },
        //   //     html2canvas: { scale: 5, backgroundColor: '#ffffff' },
        //   //     jsPDF: { unit: "in", format: "letter", orientation: "landscape" }
        //   //   };
        //   //   html2pdf()
        //   //     .set(opt)
        //   //     .from(element)
        //   //     .save();
        //   //   this.spinner.hide();
        //   // }, 500);

        // }, err => {
        //   console.log(err);
        //   this.spinner.hide();
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Error',
        //     text: 'Hubo un error en generar el reporte, por favor intentelo nuevamente.'
        //   });
        // });
      }
    });
  }

  NumeroDesconocidosHMD(){
    this.dialog.showComponent(RangoAniosComponent, {
      width: '25%',
      height: 'auto',
      disableClose: true,
      data: {
        prueba: "prueba"
      }
    }).subscribe(res => {
      console.log('res :>> ', res);

      if (res) {
        this.titulo = res.clave.LUGAR
        this.anio = res.anio
        this.spinner.show();
        // this.graficasService.GetDesconocidos_HMDAnual(res.anio, res.clave.CLAVE_LUGAR).subscribe((reporte:any)=>{
        //    console.log(reporte);
        //    this.reporteDesconocidosHMD = reporte;
        //    this.reporteDesconocidosHMD.push({
        //     serie: "TOTAL", hombres: reporte.reduce((sum, c) => sum + c.hombres, 0), mujeres: reporte.reduce((sum, c) => sum + c.mujeres, 0), desconocidos: reporte.reduce((sum, c) => sum + c.desconocidos, 0), total: reporte.reduce((sum, c) => sum + c.total, 0)
        //   });
        //   this.spinner.hide();
        //   this.dialog.showComponent(VisorReportesComponent, {
        //     width: '99%',
        //     height: 'auto',
        //     disableClose: true,
        //     data: {
        //       reporteid: "NumeroDesconocidosHMD",
        //       info: this.reporteDesconocidosHMD,
        //       anio: this.anio,
        //       fechaInicial: this.fechaInicial,
        //       fechaFinal: this.fechaFinal,
        //       titulo: this.titulo
        //     }
        //   }).subscribe(res => {
        //     // console.log('res :>> ', res);
        //   });
        //   // setTimeout(() => {
            
        //   //   const element = document.getElementById("NumeroDesconocidosHMD")
        //   //     .innerHTML;
        //   //   const opt = {
        //   //     margin: 0.1,
        //   //     filename: "Número de expedientes generados.pdf",
        //   //     image: { type: "jpeg", quality: 1 },
        //   //     html2canvas: { scale: 5, backgroundColor: '#ffffff' },
        //   //     jsPDF: { unit: "in", format: "letter", orientation: "landscape" }
        //   //   };
        //   //   html2pdf()
        //   //     .set(opt)
        //   //     .from(element)
        //   //     .save();
        //   //   this.spinner.hide();
        //   // }, 500);

        // }, err => {
        //   console.log(err);
        //   this.spinner.hide();
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Error',
        //     text: 'Hubo un error en generar el reporte, por favor intentelo nuevamente.'
        //   });
        // });
      }
    });
  }

  FosasXMunicipioRangoFechas(){
    this.dialog.showComponent(RangoFechasComponent, {
      width: '25%',
      height: 'auto',
      disableClose: true,
      data: {
        prueba: "prueba"
      }
    }).subscribe(res => {
      console.log('res :>> ', res);
      this.fechaInicial = res.fechaInicial;
      this.fechaFinal = res.fechaFinal;
      if (res) {
        this.spinner.show();
        this.reporteService.getFOSAExtadisticaXMunicipioSonora(res.fechaInicial, res.fechaFinal, res.clave.CLAVE_LUGAR).subscribe((reporte:any)=>{
          console.log(reporte);
          this.reporteFosasXMunicipio = reporte;

          this.spinner.hide();
          this.dialog.showComponent(VisorReportesComponent, {
            width: '99%',
            height: 'auto',
            disableClose: true,
            data: {
              reporteid: "reporteFosasPorMunicipioRango",
              info: this.reporteFosasXMunicipio,
              anio: this.anio,
              fechaInicial: this.fechaInicial,
              fechaFinal: this.fechaFinal
            }
          }).subscribe(res => {
            // console.log('res :>> ', res);
          });
          // setTimeout(() => {
          //   const element = document.getElementById("reporteFosasPorMunicipioRango")
          //     .innerHTML;
          //   // element.style.display = 'block'
          //   const opt = {
          //     margin: 0.1,
          //     filename: "ExpedientesMesAño.pdf",
          //     image: { type: "jpeg", quality: 1 },
          //     html2canvas: { scale: 5, backgroundColor: '#ffffff' },
          //     jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
          //   };

          //   // New Promise-based usage:
          //   html2pdf()
          //     .set(opt)
          //     .from(element)
          //     .save();
          //   this.spinner.hide();
          //   //element.style.display = 'none'
          // }, 500);
        }, err => {
          console.log(err);
          this.spinner.hide();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error en generar el reporte, por favor intentelo nuevamente.'
          });
        });
      }
    });
  }


  NumeroDeFosasXmes(){
    this.dialog.showComponent(RangoAniosComponent, {
      width: '25%',
      height: 'auto',
      disableClose: true,
      data: {
        prueba: "prueba"
      }
    }).subscribe(res => {
      console.log('res :>> ', res);
      if (res) {
        this.anio = res.anio
        this.spinner.show();
        // this.graficasService.GetFosasAnual(res.anio, res.clave.CLAVE_LUGAR).subscribe((reporte:any)=>{
        //    console.log(reporte);
        //    this.reporteNumeroFosasMesGenerados = reporte;
        //    this.reporteNumeroFosasMesGenerados.push({
        //     ABRIL: reporte.reduce((sum, c) => sum + c.ABRIL, 0),
        //     AGOSTO: reporte.reduce((sum, c) => sum + c.AGOSTO, 0),
        //     DICIEMBRE: reporte.reduce((sum, c) => sum + c.DICIEMBRE, 0),
        //     ENERO: reporte.reduce((sum, c) => sum + c.ENERO, 0),
        //     FEBRERO: reporte.reduce((sum, c) => sum + c.FEBRERO, 0),
        //     JULIO: reporte.reduce((sum, c) => sum + c.JULIO, 0),
        //     JUNIO: reporte.reduce((sum, c) => sum + c.JUNIO, 0),
        //     LUGAR: "TOTAL",
        //     MARZO: reporte.reduce((sum, c) => sum + c.MARZO, 0),
        //     MAYO: reporte.reduce((sum, c) => sum + c.MAYO, 0),
        //     NOMVIEMBRE: reporte.reduce((sum, c) => sum + c.NOMVIEMBRE, 0),
        //     OCUTUBRE: reporte.reduce((sum, c) => sum + c.OCUTUBRE, 0),
        //     SEPTIEMRE: reporte.reduce((sum, c) => sum + c.SEPTIEMRE, 0),
        //     TOTAL: reporte.reduce((sum, c) => sum + c.TOTAL, 0),
        //    });

        //    this.spinner.hide();
        //    this.dialog.showComponent(VisorReportesComponent, {
        //      width: '99%',
        //      height: 'auto',
        //      disableClose: true,
        //      data: {
        //        reporteid: "NumeroDeFosasXmes",
        //        info: this.reporteNumeroFosasMesGenerados,
        //        anio: this.anio,
        //        fechaInicial: this.fechaInicial,
        //        fechaFinal: this.fechaFinal
        //      }
        //    }).subscribe(res => {
        //      // console.log('res :>> ', res);
        //    });
        //   //  this.ENERO = reporte.reduce((sum, c) => sum + c.ENERO, 0);
        //   //  this.FEBRERO = reporte.reduce((sum, c) => sum + c.FEBRERO, 0);
        //   //  this.ABRIL = reporte.reduce((sum, c) => sum + c.ABRIL, 0);
        //   //  this.MARZO = reporte.reduce((sum, c) => sum + c.MARZO, 0);
        //   //  this.MAYO = reporte.reduce((sum, c) => sum + c.MAYO, 0);
        //   //  this.JUNIO = reporte.reduce((sum, c) => sum + c.JUNIO, 0);
        //   //  this.JULIO = reporte.reduce((sum, c) => sum + c.JULIO, 0);
        //   //  this.AGOSTO = reporte.reduce((sum, c) => sum + c.AGOSTO, 0);
        //   //  this.SEPTIEMBRE = reporte.reduce((sum, c) => sum + c.SEPTIEMRE, 0);
        //   //  this.OCUTUBRE = reporte.reduce((sum, c) => sum + c.OCUTUBRE, 0);
        //   //  this.NOVIEMBRE = reporte.reduce((sum, c) => sum + c.NOMVIEMBRE, 0);
        //   //  this.DICIEMBRE = reporte.reduce((sum, c) => sum + c.DICIEMBRE, 0);
        //   //  this.TOTAL = reporte.reduce((sum, c) => sum + c.TOTAL, 0);
        //   // setTimeout(() => {
            
        //   //   const element = document.getElementById("NumeroDeFosasXmes")
        //   //     .innerHTML;
        //   //   const opt = {
        //   //     margin: 0.1,
        //   //     filename: "Número de fosas localizadas.pdf",
        //   //     image: { type: "jpeg", quality: 1 },
        //   //     html2canvas: { scale: 5, backgroundColor: '#ffffff' },
        //   //     jsPDF: { unit: "in", format: "letter", orientation: "landscape" }
        //   //   };
        //   //   html2pdf()
        //   //     .set(opt)
        //   //     .from(element)
        //   //     .save();
        //   //   this.spinner.hide();
        //   // }, 500);

        // }, err => {
        //   console.log(err);
        //   this.spinner.hide();
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Error',
        //     text: 'Hubo un error en generar el reporte, por favor intentelo nuevamente.'
        //   });
        // });
      }
    });
  }

  FosasNumeroMunicipioRangoFechas(){
    this.dialog.showComponent(RangoFechasComponent, {
      width: '25%',
      height: 'auto',
      disableClose: true,
      data: {
        prueba: '12'
      }
    }).subscribe(res => {
      console.log('res :>> ', res);
      this.fechaInicial = res.fechaInicial;
      this.fechaFinal = res.fechaFinal;
      if (res) {
        this.spinner.show();
        this.reporteService.getMunicipioesNumeroFosas(res.fechaInicial, res.fechaFinal).subscribe((reporte:any)=>{
           console.log(reporte);
           this.reporteNumroFosasXMunicipio = reporte;

           this.reporteNumroFosasXMunicipio.municipios.sort((a, b) => a.num_cuerpos - b.num_cuerpos).reverse();  // [ 1, 5, 40, 200 ]
           this.spinner.hide();
           this.dialog.showComponent(VisorReportesComponent, {
             width: '99%',
             height: 'auto',
             disableClose: true,
             data: {
               reporteid: "reporteNumeroFosasPorMunicipioRango",
               info: this.reporteNumroFosasXMunicipio,
               anio: this.anio,
               fechaInicial: this.fechaInicial,
               fechaFinal: this.fechaFinal
             }
           }).subscribe(res => {
             // console.log('res :>> ', res);
           });
          // setTimeout(() => {
          //   const element = document.getElementById("reporteNumeroFosasPorMunicipioRango")
          //     .innerHTML;
          //   // element.style.display = 'block'
          //   const opt = {
          //     margin: 0.3,
          //     filename: "NumeroDeFosasPorMunicipio.pdf",
          //     image: { type: "jpeg", quality: 1 },
          //     html2canvas: { scale: 5, backgroundColor: '#ffffff' },
          //     jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
          //   };

          //   // New Promise-based usage:
          //   html2pdf()
          //     .set(opt)
          //     .from(element)
          //     .save();
          //   this.spinner.hide();
          //   //element.style.display = 'none'
          // }, 500);
        }, err => {
          console.log(err);
          this.spinner.hide();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error en generar el reporte, por favor intentelo nuevamente.'
          });
        });
      }
    });
  }
  
  FosasEncontradasPor(){
    this.dialog.showComponent(RangoAniosComponent, {
      width: '25%',
      height: 'auto',
      disableClose: true,
      data: {
        prueba: "prueba"
      }
    }).subscribe(res => {
      console.log('res :>> ', res);
  this.anio = res.anio
      if (res) {
        this.spinner.show();
        // this.graficasService.GetMadresAnual(res.anio, res.clave.CLAVE_LUGAR).subscribe((reporte:any)=>{
        //    console.log(reporte);
        //    this.reporteFosasEncontradasPor = reporte;
        //    this.reporteFosasEncontradasPor.push({
        //     ABRIL_loc_Madres: reporte.reduce((sum, c) => sum + c.ABRIL_loc_Madres, 0),
        //     ABRIL_loc_Semefo: reporte.reduce((sum, c) => sum + c.ABRIL_loc_Semefo, 0),
        //     AGOSTO_loc_Madres: reporte.reduce((sum, c) => sum + c.AGOSTO_loc_Madres, 0),
        //     AGOSTO_loc_Semefo: reporte.reduce((sum, c) => sum + c.AGOSTO_loc_Semefo, 0),
        //     DICIEMBRE_loc_Madres: reporte.reduce((sum, c) => sum + c.DICIEMBRE_loc_Madres, 0),
        //     DICIEMBRE_loc_Semefo: reporte.reduce((sum, c) => sum + c.DICIEMBRE_loc_Semefo, 0),
        //     ENERO_loc_Madres: reporte.reduce((sum, c) => sum + c.ENERO_loc_Madres, 0),
        //     ENERO_loc_Semefo: reporte.reduce((sum, c) => sum + c.ENERO_loc_Semefo, 0),
        //     FEBRERO_loc_Madres: reporte.reduce((sum, c) => sum + c.FEBRERO_loc_Madres, 0),
        //     FEBRERO_loc_Semefo: reporte.reduce((sum, c) => sum + c.FEBRERO_loc_Semefo, 0),
        //     JULIO_loc_Madres: reporte.reduce((sum, c) => sum + c.JULIO_loc_Madres, 0),
        //     JULIO_loc_Semefo: reporte.reduce((sum, c) => sum + c.JULIO_loc_Semefo, 0),
        //     JUNIO_loc_Madres: reporte.reduce((sum, c) => sum + c.JUNIO_loc_Madres, 0),
        //     JUNIO_loc_Semefo: reporte.reduce((sum, c) => sum + c.JUNIO_loc_Semefo, 0),
        //     LUGAR: "Total",
        //     MARZO_loc_Madres: reporte.reduce((sum, c) => sum + c.MARZO_loc_Madres, 0),
        //     MARZO_loc_Semefo: reporte.reduce((sum, c) => sum + c.MARZO_loc_Semefo, 0),
        //     MAYO_loc_Madres: reporte.reduce((sum, c) => sum + c.MAYO_loc_Madres, 0),
        //     MAYO_loc_Semefo: reporte.reduce((sum, c) => sum + c.MAYO_loc_Semefo, 0),
        //     NOVIEMBRE_loc_Madres: reporte.reduce((sum, c) => sum + c.NOVIEMBRE_loc_Madres, 0),
        //     NOVIEMBRE_loc_Semefo: reporte.reduce((sum, c) => sum + c.NOVIEMBRE_loc_Semefo, 0),
        //     OCTUBRE_loc_Madres: reporte.reduce((sum, c) => sum + c.OCTUBRE_loc_Madres, 0),
        //     OCTUBRE_loc_Semefo: reporte.reduce((sum, c) => sum + c.OCTUBRE_loc_Semefo, 0),
        //     SEPTIEMBRE_loc_Madres: reporte.reduce((sum, c) => sum + c.SEPTIEMBRE_loc_Madres, 0),
        //     SEPTIEMBRE_loc_Semefo: reporte.reduce((sum, c) => sum + c.SEPTIEMBRE_loc_Semefo, 0),
        //     TOTAL_loc_Madres: reporte.reduce((sum, c) => sum + c.TOTAL_loc_Madres, 0),
        //     TOTAL_loc_Semefo: reporte.reduce((sum, c) => sum + c.TOTAL_loc_Semefo, 0) ,
        //    });

        //    this.spinner.hide();
        //   this.dialog.showComponent(VisorReportesComponent, {
        //     width: '99%',
        //     height: 'auto',
        //     disableClose: true,
        //     data: {
        //       reporteid: "FosasEncontradasPor",
        //       info: this.reporteFosasEncontradasPor,
        //       anio: this.anio,
        //       fechaInicial: this.fechaInicial,
        //       fechaFinal: this.fechaFinal
        //     }
        //   }).subscribe(res => {
        //     // console.log('res :>> ', res);
        //   });
        //   // setTimeout(() => {
            
        //   //   const element = document.getElementById("NumeroDeExpedientesGeneradosXmes")
        //   //     .innerHTML;
        //   //   const opt = {
        //   //     margin: 0.1,
        //   //     filename: "Número de expedientes generados.pdf",
        //   //     image: { type: "jpeg", quality: 1 },
        //   //     html2canvas: { scale: 5, backgroundColor: '#ffffff' },
        //   //     jsPDF: { unit: "in", format: "letter", orientation: "landscape" }
        //   //   };
        //   //   html2pdf()
        //   //     .set(opt)
        //   //     .from(element)
        //   //     .save();
        //   //   this.spinner.hide();
        //   // }, 500);

        // }, err => {
        //   console.log(err);
        //   this.spinner.hide();
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Error',
        //     text: 'Hubo un error en generar el reporte, por favor intentelo nuevamente.'
        //   });
        // });
      }
    });
  }
}
