import { Component, OnInit } from '@angular/core';
import { AppDialogService } from '../../services/common/app-dialog/app-dialog.service';
import { CrearExpedienteComponent } from './crear-expediente/crear-expediente.component';
import { ExpedientesService } from '../../services/expedientes/expedientes.service';
import { ExpedienteTableModel } from './models/expedientes.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewCell, LocalDataSource } from 'ng2-smart-table';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css']
})
export class ExpedienteComponent implements OnInit {
  // expedientes: ExpedienteTableModel[];
  expedientes: any;
  constructor(private dialog: AppDialogService,
    private ExpedientesService: ExpedientesService,
    private domSanitizer: DomSanitizer,
    private Router: Router,
    private AuthService: AuthService,
    private spinner:NgxSpinnerService) { }
  
  p: number = 1;
  activas: any;
  no_cumple: any;
  sin_resultado: any;
  // public expedientes: LocalDataSource;
  // tabla setttings
  public settings = {
    selectMode: "single", // single|multi
    hideHeader: false,
    hideSubHeader: false,
    noDataMessage: "No se encontraron registros.",
    actions: {
       width: 50,
      columnTitle: "Acciones",
      add: false,
      edit: false,
      delete: false,
      custom: [
        // {
        //   name: "option",
        //   title: '<i *ngIf="this.solicitudSelecionada.IDTipoEstatusSolicitud==6" class="fa fa-bars">Acción</i>'
        // },
        {
          name: "mostrar",
          title: this.domSanitizer.bypassSecurityTrustHtml('<i class="fa fa-search fa-2x ml-3 mr-3 aria-hidden="true" title="Mostrar"></i>')

        },
        {
          //<i class="fas fa-arrow-circle-right"></i>
          name: "seguimiento",
          title: this.domSanitizer.bypassSecurityTrustHtml('<i class="fa fa-arrow-circle-right fa-2x  aria-hidden="true" title="Sesión"></i>')
        },
        {
          name: "print",
          //title: '&nbsp&nbsp<h7><i class="fa fa-print style="font-size:24px">Imprimir</i></h7>'
          title: this.domSanitizer.bypassSecurityTrustHtml('<i class="fa fa-print fa-2x ml-3 aria-hidden="true" title="Imprimir"></i>')
        }
      ],
      position: "right" // left|right
    },
    // rowClassFunction: (row) => {
    //   const difftime = Math.abs(new Date(moment(Date.now()).format('L')).getTime() -
    //     (new Date(moment(row.data.FechaEstatusSolicitud).format('L')).getTime()));

    //   const diff = Math.ceil(difftime / (1000 * 3600 * 24));

    //   if (diff <= 1) {
    //     return 'alert-info text-dark';
    //   } else if (diff > 1 && diff <= 7) {
    //     return 'alert-warning text-dark';
    //   } else if (diff > 7 && diff <= 30) {
    //     return 'alert-danger text-dark';
    //   } else if (diff > 30) {
    //     return 'table-danger text-dark';
    //   } else { return 'table-light text-dark'; }
    // },
    columns: {
      Expediente:{
        title:"# Expediente",
        type: "string",
        filter:true,
        // width: "200px"

      },
      FCH_REG: {
        title: "Fecha Registro",
        type: "Date",
        filter: true,
        // width: "200px"
        // valuePrepareFunction: (cell: any, row: any) => {
        //   const parsedDate = new Date(cell);
        //   return parsedDate.toLocaleString();
        // }
      },
      // CRI: {
      //   title: "CRI",
      //   type: "string",
      //   filter: true,
      //   // width: '100px'
      // },
      // NOMBRE: {
      //   title: "NOMBRE",
      //   type: "string",
      //   filter: true,
      //   // width: "200px"
      // },
      PATERNO: {
        title: "PATERNO",
        type: "string",
        filter: true,
        // width: "200px"
      },
      MATERNO: {
        title: "MATERNO",
        type: "string",
        filter: true,
        // width: '60px',
      },
      EDAD: {
        title: "EDAD",
        type: "string",
        filter: true,
        // width: '100px',
      },
      SEXO: {
        title: "SEXO",
        type: "string",
        filter: true,
        // width: '60px',
      }
    },
    pager: {
      display: true,
      perPage: 5
    }
    ,
    attr:{
      class: 'table-striped table-bordered'
    }
  };

  onCustom(event) {
  // console.log('event :>> ', event);

  }
  public onUserRowSelect(event) {
    // console.log(event.data);
  }

  do_some_action(e: any){
    // console.log('e :>> ', e);
     this.Router.navigate(['/expediente/'+e.CLAVE_LUGAR+"/"+e.ANIO+"/"+e.CONTROL]);
  }

  view(e: any){
    this.Router.navigate(['/expediente/'+e.CLAVE_LUGAR+"/"+e.ANIO+"/"+e.CONTROL]);
  }

  // ============variables de filtrado============
  public searchNumeroEx: string = "";
  public searchNombre: string = "";
  public searchPaterno: string = "";
  public searchMaterno: string = "";
  public searchFechaCita: string = "";
  public searchVigencia: string = "";

  ngOnInit(): void {
    this.renderDataTable();
  }

  renderDataTable() {
    this.spinner.show();
    // if (this.AuthService.getUserRol() == 1 || this.AuthService.getUserRol() == 9) {
      this.ExpedientesService.obtenerCitas().subscribe(res => {
          this.expedientes = res['citas'];
          this.spinner.hide();
          this.conteoAlertas(res['citas']);
        },
        err => {
          this.spinner.hide();
          // console.log("Hubo un error: ", err.message);
        }
      );
    // }else{
    //   this.ExpedientesService.obtenerExpedientesUnidad(this.AuthService.getUserClave()).subscribe(
    //     res => {

    //       this.expedientes = res;
    //       // console.log(this.expedientes);
    //       this.spinner.hide();
    //     },
    //     err => {
    //       this.spinner.hide();
    //       // console.log("Hubo un error: ", err.message);
    //     }
    //   );
    // }

  }

  conteoAlertas( res ) {
    let a = 0, nc = 0, sr = 0;
    for ( let i = 0; i < res.length; i++ ) {
      if ( res[i].VIGENCIA_C3 == '1' ) {
        a++;
      } else if ( res[i].VIGENCIA_C3 == '2' ) {
        nc++;
      } else if ( res[i].VIGENCIA_C3 == '3' || res[i].VIGENCIA_C3 == '' ) {
        sr++;
      }
    }

    this.activas = a;
    this.no_cumple = nc;
    this.sin_resultado = sr;
  }

  pageChanged(event){
    this.p = event;
  }

  crearExpediente(){
    this.dialog.showComponent(CrearExpedienteComponent, {
      width: '90%',
      height: 'auto',
      disableClose: true,
      data: {
        prueba: "prueba"
      }
    }).subscribe(res => {
      // console.log('res :>> ', res);
      
    this.renderDataTable();
    });
  }
}
