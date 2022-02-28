import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2pdf from "html2pdf.js";
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelserviceService } from 'src/app/services/excel/excelservice.service';
@Component({
  selector: 'app-visor-reportes',
  templateUrl: './visor-reportes.component.html',
  styleUrls: ['./visor-reportes.component.css']
})
export class VisorReportesComponent implements OnInit {

  constructor(@Optional() public dialogRef: MatDialogRef<VisorReportesComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private spinner: NgxSpinnerService,
    private excel: ExcelserviceService) { }
  DataReporteFormat: any[] = [];
  DataReporteFormat2: any[] = [];
  ngOnInit(): void {
    console.log('this.data :>> ', this.data);
  }


  descargarReporte() {
    console.log('this.data.reporteid :>> ', this.data.reporteid);
    switch (this.data.reporteid) {
      case "reporteExpedientesMesAnio":
        this.generarReportePortrait("reporteExpedientesMesAnio2", "ExpedientesMesAño.pdf");
        break;
      case "reporteIDRango":
        this.generarReportePortrait("reporteIDRango2", "Numero Identificados y Desconocido.pdf");
        break;
      case "NumeroDeExpedientesGeneradosXmes":
        this.generarReportelandscape("NumeroDeExpedientesGeneradosXmes3", "Número de expedientes generados.pdf");
        break;
      case "NumeroDesconocidosHMD":
        this.generarReportelandscape("NumeroDesconocidosHM2", "Desconocidos por tipo de sexo (Masculino,Femenino, Desconocido).pdf");
        break;
      case "reporteFosasPorMunicipioRango":
        this.generarReportelandscape("reporteFosasPorMunicipioRango5", "FosasEncontradasPorMunicipio.pdf");
        break;
      case "NumeroDeFosasXmes":
        this.generarReportelandscape("NumeroDeFosasXmes2", "FosasEncontradasPorMes.pdf");
        break;
      case "reporteNumeroFosasPorMunicipioRango":
        this.generarReportelandscape("reporteNumeroFosasPorMunicipioRango2", "NumeroDeFosasPorMunicipio.pdf");
        break;
      case "FosasEncontradasPor":
        this.generarReportelandscape("FosasEncontradasPor2", "NumeroEncontradoPor.pdf");
        break;


      default:
        break;
    }
  }
  generarReportelandscape(reporteid: any, nombre: any) {
    this.spinner.show();
    setTimeout(() => {

      const element = document.getElementById(reporteid)
        .innerHTML;
      const opt = {
        margin: 0.3,
        filename: nombre,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 5, backgroundColor: '#ffffff' },
        jsPDF: { unit: "in", format: "letter", orientation: "landscape" }
      };
      html2pdf()
        .set(opt)
        .from(element)
        .save();
      this.spinner.hide();
    }, 500);
  }

  generarReportePortrait(reporteid: any, nombre: any) {
    this.spinner.show();
    setTimeout(() => {

      const element = document.getElementById(reporteid)
        .innerHTML;
      const opt = {
        margin: 0.3,
        filename: nombre,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 5, backgroundColor: '#ffffff' },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
      };
      html2pdf()
        .set(opt)
        .from(element)
        .save();
      this.spinner.hide();
    }, 500);

  }

  formatDataReporte1(dataExcel: any) {
    // console.log('dataExcel :', dataExcel);
    //var Recibidopor = dataExcel.RecibidoPorNombre + " "+ dataExcel.RecibidoPorPaterno + " "+ dataExcel.RecibidoPorMaterno;
    return {
      MES: dataExcel.Mes,
      NÚMERO_DE_EXPEDIENTES: dataExcel.count,
      // Observaciones: dataExcel.Observaciones,
      // Telefono: dataExcel.Telefono,
      //  Recibidopor: Recibidopor
    };
  }
  formatDataReporte2(dataExcel: any) {
    // console.log('dataExcel :', dataExcel);
    //var Recibidopor = dataExcel.RecibidoPorNombre + " "+ dataExcel.RecibidoPorPaterno + " "+ dataExcel.RecibidoPorMaterno;
    return {
      MES: dataExcel.name,
      Identificados: dataExcel.series[0].value,
      Desconocidos: dataExcel.series[1].value,
      Total: dataExcel.series[0].value + dataExcel.series[1].value
    };
  }
  formatDataReporte3(dataExcel: any) {
    // console.log('dataExcel :', dataExcel);
    //var Recibidopor = dataExcel.RecibidoPorNombre + " "+ dataExcel.RecibidoPorPaterno + " "+ dataExcel.RecibidoPorMaterno;
    return {
      LUGAR: dataExcel.LUGAR,
      ENERO: dataExcel.ENERO,
      FEBRERO: dataExcel.FEBRERO,
      MARZO: dataExcel.MARZO,
      ABRIL: dataExcel.ABRIL,
      MAYO: dataExcel.MAYO,
      JUNIO: dataExcel.JUNIO,
      JULIO: dataExcel.JULIO,
      AGOSTO: dataExcel.AGOSTO,
      SEPTIEMRE: dataExcel.SEPTIEMRE,
      OCUTUBRE: dataExcel.OCUTUBRE,
      NOMVIEMBRE: dataExcel.NOMVIEMBRE,
      DICIEMBRE: dataExcel.DICIEMBRE,
      TOTAL: dataExcel.TOTAL,
    };
  }

  formatDataReporte4(dataExcel: any) {
    // console.log('dataExcel :', dataExcel);
    //var Recibidopor = dataExcel.RecibidoPorNombre + " "+ dataExcel.RecibidoPorPaterno + " "+ dataExcel.RecibidoPorMaterno;
    return {
      Mes: dataExcel.serie,
      Hombres: dataExcel.hombres,
      Mujeres: dataExcel.mujeres,
      Desconocidos: dataExcel.desconocidos,
      Total: dataExcel.total,
    };
  }

  formatDataReporte5(dataExcel: any) {
    // console.log('dataExcel :', dataExcel);
    //var Recibidopor = dataExcel.RecibidoPorNombre + " "+ dataExcel.RecibidoPorPaterno + " "+ dataExcel.RecibidoPorMaterno;
    return {
      Fosa: dataExcel.fosa,
      Fecha_loc: dataExcel.FCH_LOCALIZACION,
      Num_Cuerpos: dataExcel.num_cuerpos,
      Num_restos: dataExcel.num_restos,
    };
  }

  formatDataReporte6(dataExcel: any) {
    // console.log('dataExcel :', dataExcel);
    //var Recibidopor = dataExcel.RecibidoPorNombre + " "+ dataExcel.RecibidoPorPaterno + " "+ dataExcel.RecibidoPorMaterno;
    return {
      Municipio: dataExcel.Municipio,
      numFosas: dataExcel.num_fosas,
      Num_Cuerpos: dataExcel.num_cuerpos,
      Num_restos: dataExcel.num_restos,
    };
  }

  formatDataReporteMadres(dataExcel: any) {
    // console.log('dataExcel :', dataExcel);
    //var Recibidopor = dataExcel.RecibidoPorNombre + " "+ dataExcel.RecibidoPorPaterno + " "+ dataExcel.RecibidoPorMaterno;
    return {
      LUGAR: dataExcel.LUGAR,
      ENERO: dataExcel.ENERO_loc_Madres,
      FEBRERO: dataExcel.FEBRERO_loc_Madres,
      MARZO: dataExcel.MARZO_loc_Madres,
      ABRIL: dataExcel.ABRIL_loc_Madres,
      MAYO: dataExcel.MAYO_loc_Madres,
      JUNIO: dataExcel.JUNIO_loc_Madres,
      JULIO: dataExcel.JULIO_loc_Madres,
      AGOSTO: dataExcel.AGOSTO_loc_Madres,
      SEPTIEMRE: dataExcel.SEPTIEMBRE_loc_Madres,
      OCUTUBRE: dataExcel.OCTUBRE_loc_Madres,
      NOMVIEMBRE: dataExcel.NOVIEMBRE_loc_Madres,
      DICIEMBRE: dataExcel.DICIEMBRE_loc_Madres,
      TOTAL: dataExcel.TOTAL_loc_Madres,
    };
  }

  formatDataReporte8Semefo(dataExcel: any) {
    // console.log('dataExcel :', dataExcel);
    //var Recibidopor = dataExcel.RecibidoPorNombre + " "+ dataExcel.RecibidoPorPaterno + " "+ dataExcel.RecibidoPorMaterno;
    return {
      LUGAR: dataExcel.LUGAR,
      ENERO: dataExcel.ENERO_loc_Semefo,
      FEBRERO: dataExcel.FEBRERO_loc_Semefo,
      MARZO: dataExcel.MARZO_loc_Semefo,
      ABRIL: dataExcel.ABRIL_loc_Semefo,
      MAYO: dataExcel.MAYO_loc_Semefo,
      JUNIO: dataExcel.JUNIO_loc_Semefo,
      JULIO: dataExcel.JULIO_loc_Semefo,
      AGOSTO: dataExcel.AGOSTO_loc_Semefo,
      SEPTIEMRE: dataExcel.SEPTIEMBRE_loc_Semefo,
      OCTUBRE: dataExcel.OCTUBRE_loc_Madres,
      NOMVIEMBRE: dataExcel.NOVIEMBRE_loc_Semefo,
      DICIEMBRE: dataExcel.DICIEMBRE_loc_Semefo,
      TOTAL: dataExcel.TOTAL_loc_Semefo,
    };
  }

  generarExcel() {
    switch (this.data.reporteid) {
      case 'reporteExpedientesMesAnio':
        this.DataReporteFormat = []
        this.data.info.forEach(element => {
          this.DataReporteFormat.push(
            this.formatDataReporte1(Object(element))
          );
        });
        this.excel.generateExcelFull(
          this.DataReporteFormat,
          "Reporte Número Expedientes Generados por Mes, Año " + this.data.anio,
          [
            "Mes",
            "# de Expedientes",
            // "CRI",
            // "Nombre",
            // "Apellido Paterno",
            // "Apellido Materno",
            // "Edad",
            // "Sexo",
            // "Observaciones",
            // "Telefono"
          ],
          [15, 20],
          "",
          "A1",
          "E6",
          "A1",
          "J8"
        );
        break;
      case 'reporteIDRango':
        this.DataReporteFormat = []
        this.data.info.forEach(element => {
          this.DataReporteFormat.push(
            this.formatDataReporte2(Object(element))
          );
        });
        this.excel.generateExcelFull(
          this.DataReporteFormat,
          "Reporte Número de Cuerpos Con estatus Identificado y Desconocido Del " +
          moment(this.data.fechaInicial).format('DD-MM-YYYY') + " al " + moment(this.data.fechaFinal).format('DD-MM-YYYY'),
          [
            "Mes",
            "# de Identificados",
            "# de Desconocidos",
            "Total"
            // "CRI",
            // "Nombre",
            // "Apellido Paterno",
            // "Apellido Materno",
            // "Edad",
            // "Sexo",
            // "Observaciones",
            // "Telefono"
          ],
          [15, 20, 20, 15],
          "",
          "A1",
          "C6",
          "A1",
          "M8"
        );
        break;
      case 'NumeroDeExpedientesGeneradosXmes':
        this.DataReporteFormat = [];
        this.data.info.forEach(element => {
          this.DataReporteFormat.push(
            this.formatDataReporte3(Object(element))
          );
        });
        this.excel.generateExcelFull(
          this.DataReporteFormat,
          "Reporte Número Expedientes Generados en el año " + this.data.anio,
          [
            "MUNICIPIO",
            "ENERO",
            "FEBRERO",
            "MARZO",
            "ABRIL",
            "MAYO",
            "JUNIO",
            "JULIO",
            "AGOSTO",
            "SEPTIEMBRE",
            "OCTUBRE",
            "NOVIEMBRE",
            "DICIEMBRE",
            "TOTAL",
          ],
          [25, 15, 15, 15, 15, 15, 15, 15, 15, 20, 20, 20, 20, 20],
          "",
          "A1",
          "E6",
          "A1",
          "J8"
        );
        break;
      case 'NumeroDesconocidosHMD':
        this.DataReporteFormat = [];
        this.data.info.forEach(element => {
          this.DataReporteFormat.push(
            this.formatDataReporte4(Object(element))
          );
        });
        this.excel.generateExcelFull(
          this.DataReporteFormat,
          "Reporte Número de desconocidos por tipo de sexo",
          [
            "Mes",
            "Hombres",
            "Mujeres",
            "Desconocidos",
            "Total",
          ],
          [25, 15, 20, 15],
          "Municipio: " + this.data.titulo + "         Año: " + this.data.anio,
          "A1",
          "E6",
          "A1",
          "J8"
        );
        break;
      case 'reporteFosasPorMunicipioRango':
        this.DataReporteFormat = [];
        var municipio;
        var numFosas;
        var numCuerpos;
        var numRestos;
        this.data.info.forEach(element => {
          municipio = element.Municipio;
          numFosas = element.num_fosas
         numCuerpos = element.num_cuerpos
         numRestos = element.num_restos
          console.log(element)
          element.fosas.forEach(fosa => {
             this.DataReporteFormat.push(
            this.formatDataReporte5(Object(fosa))
          );
          });
         
        });
        this.DataReporteFormat.push({
          Fosa: "Total: "+numFosas,
          Fecha_loc: "",
          Num_Cuerpos: numCuerpos,
          Num_restos: numRestos,
        })
        console.log('this.DataReporteFormat :>> ', this.DataReporteFormat);
        this.excel.generateExcelFull(
          this.DataReporteFormat,
          "Reporte De Fosas Por Municipio Del " +
          moment(this.data.fechaInicial).format('DD-MM-YYYY') + " al " + moment(this.data.fechaFinal).format('DD-MM-YYYY'),
          [
            "Fosa",
            "Fecha Localización",
            "# Cuerpos",
            "# Restos",
          ],
          [25, 25, 15, 15],
          "Municipio: " + municipio,
          "A1",
          "C6",
          "A1",
          "J8"
        );
        break;
      case 'reporteNumeroFosasPorMunicipioRango':
          this.DataReporteFormat = [];

          console.log('this.data.info :>> ', this.data.info);
          this.data.info.municipios.forEach(element => {
            console.log('element :>> ', element);
            // municipio = element.Municipio;
          //   numFosas = element.num_fosas
          //  numCuerpos = element.num_cuerpos
          //  numRestos = element.num_restos
          //   console.log(element)
          //   element.municipios.forEach(fosa => {
               this.DataReporteFormat.push(
              this.formatDataReporte6(Object(element))
            );
          //   });
           
          });
          this.DataReporteFormat.push({
            Municipio: "Total",
            numFosas: this.data.info.num_fosas,
            Num_Cuerpos: this.data.info.num_cuerpos,
            Num_restos: this.data.info.num_restos,
          })
          console.log('this.DataReporteFormat :>> ', this.DataReporteFormat);
          this.excel.generateExcelFull(
            this.DataReporteFormat,
            "Reporte Número de Fosas Encontradas Por Municipio Del " +
            moment(this.data.fechaInicial).format('DD-MM-YYYY') + " al " + moment(this.data.fechaFinal).format('DD-MM-YYYY'),
            [
              "Municipio",
              "# Fosas",
              "# Cuerpos",
              "# Restos",
            ],
            [25, 25, 15, 15],
            "",
            "A1",
            "C6",
            "A1",
            "J8"
          );
          break;
      case 'NumeroDeFosasXmes':
            this.DataReporteFormat = [];
            this.data.info.forEach(element => {
              this.DataReporteFormat.push(
                this.formatDataReporte3(Object(element))
              );
            });
            this.excel.generateExcelFull(
              this.DataReporteFormat,
              "Reporte Número De Fosas Localizadas Por Mes " + this.data.anio,
              [
                "MUNICIPIO",
                "ENERO",
                "FEBRERO",
                "MARZO",
                "ABRIL",
                "MAYO",
                "JUNIO",
                "JULIO",
                "AGOSTO",
                "SEPTIEMBRE",
                "OCTUBRE",
                "NOVIEMBRE",
                "DICIEMBRE",
                "TOTAL",
              ],
              [25, 15, 15, 15, 15, 15, 15, 15, 15, 20, 20, 20, 20, 20],
              "",
              "A1",
              "E6",
              "A1",
              "J8"
            );
            break;
      case 'FosasEncontradasPor':
        this.DataReporteFormat = [];
        this.DataReporteFormat2 = [];
        this.data.info.forEach(element => {
          this.DataReporteFormat.push(
            this.formatDataReporteMadres(Object(element))
          );
        });
        this.data.info.forEach(element => {
          this.DataReporteFormat2.push(
            this.formatDataReporte8Semefo(Object(element))
          );
        });
        this.excel.generateExcelFullDoble(
          this.DataReporteFormat,
          this.DataReporteFormat2,
          "Reporte Fosas encontras Por (Madres Buscadoras, Semefo) " + this.data.anio,
          [
            "MUNICIPIO",
            "ENERO",
            "FEBRERO",
            "MARZO",
            "ABRIL",
            "MAYO",
            "JUNIO",
            "JULIO",
            "AGOSTO",
            "SEPTIEMBRE",
            "OCTUBRE",
            "NOVIEMBRE",
            "DICIEMBRE",
            "TOTAL",
          ],
          [25, 15, 15, 15, 15, 15, 15, 15, 15, 20, 20, 20, 20, 20],
          "Número De Fosas Encontradas Por Madres Buscadoras.",
          "Número De Fosas Encontradas Por Semefo.",
          "A1",
          "E6",
          "A1",
          "J8"
        );
      break;
            default:
        break;
    }
    // this.data.info.forEach(element => {
    //   this.DataReporteFormat.push(
    //     this.formatDataReporte1(Object(element))
    //   );
    // });
    // this.excel.generateExcelFull(
    //   this.DataReporteFormat,
    //   "Reporte Número Expedientes Generados por Mes, Año "+this.data.anio,
    //   [
    //     "Mes",
    //     "# de Expedientes",
    //     // "CRI",
    //     // "Nombre",
    //     // "Apellido Paterno",
    //     // "Apellido Materno",
    //     // "Edad",
    //     // "Sexo",
    //     // "Observaciones",
    //     // "Telefono"
    //   ],
    //   [15,20],
    //   "",
    //   "A1",
    //   "E6",
    //   "A1",
    //   "J8"
    // );
  }

}
