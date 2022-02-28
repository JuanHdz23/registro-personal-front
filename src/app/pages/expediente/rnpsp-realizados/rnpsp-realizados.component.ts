import { Component, OnInit, Input, EventEmitter, Output, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VisorPdfComponent } from '../visor-pdf/visor-pdf.component';
import { AppDialogService } from '../../../services/common/app-dialog/app-dialog.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth/auth.service';
import { AppLoaderService } from '../../../services/common/app-loader/app-loader.service';
import { MatDialogRef } from '@angular/material/dialog';
import { RnpspService } from '../../../services/rnpsp/rnpsp.service';
import { formatDate } from '@angular/common';
import { RecepcionDocumentosService } from '../../../services/recepcion-documentos/recepcion-documentos.service';
import { ViewImageComponent } from '../view-image/view-image.component';

@Component({
  selector: 'app-rnpsp-realizados',
  templateUrl: './rnpsp-realizados.component.html',
  styleUrls: ['./rnpsp-realizados.component.scss']
})
export class RnpspRealizadosComponent implements OnInit {

  @Output() actualizarRnpsp = new EventEmitter<string>();
  message: string = "Actualizar Rnpsp";
  @Input() dataRnpspInfo: any;

  rnpspForm: FormGroup;

  existeData: boolean = false;
  usuario: any;

  docs41: any[] = [];
  flag41: boolean = false;
  info41: boolean = false;
  data41: boolean = false;

  constructor( private formBuilder: FormBuilder,
               private dialog: AppDialogService,
               private _authService: AuthService,
               private _documentosService: RecepcionDocumentosService,
               private _rnpspService: RnpspService,
               private loader: AppLoaderService,
               @Optional() public dialogRef: MatDialogRef<RnpspRealizadosComponent> ) { }

  ngOnInit(): void {
    this.initForm();
    this.cargarData();
  }

  initForm() {
    this.rnpspForm = this.formBuilder.group({
      CLAVE_LUGAR: [''],
      ANIO: [''],
      CONTROL: [''],
      CUIP: [''],
      FECHA_CREACION_CUIP: [''],
      FECHA_ENTREGA_CUIP: [''],
      OBSERVACIONES: [''],
      USUARIO: [''],
      FCH_REG: [''],
      FCH_UAC: ['']
    });
  }

  cargarData(){
    this._rnpspService.obtenerInfoRnpsp(this.dataRnpspInfo.clave, this.dataRnpspInfo.anio, this.dataRnpspInfo.control).subscribe(res => {
      if ( res['rnpsp'].length > 0 ) {
        const dataRnpspFormat = this.formatDataRnpsp(res['rnpsp'][0]);
        this.rnpspForm.setValue( dataRnpspFormat );
        this.existeData = true;
      }
    });

    this._documentosService.obtenerDocumentosExisten(this.dataRnpspInfo.clave, this.dataRnpspInfo.anio, this.dataRnpspInfo.control).subscribe((res: any) => {
      if ( res.tipos.length > 0 ) {
        res.tipos.map(x => {
          if ( x.number == 41 ) {
            this.info41 = true;
            this.data41 = true;
          } 
        });
      }
    });

    this.usuario = this._authService.getUserClave();
  }

  cargar41( tipoDocumento ) {
    this._documentosService.obtenerInfoDocumentos(this.dataRnpspInfo.clave, this.dataRnpspInfo.anio, this.dataRnpspInfo.control, tipoDocumento).subscribe((res: any) => {
      if (  res.documentos.length > 0 && !this.flag41 ) {
        for (let i = 0; i < res.documentos.length; i++) {
          this.docs41.push(res.documentos[i].DOCUMENTO);
        }
        this.flag41 = true;
      }
    });
  }

  removeImage41(index): void {
    this.docs41.splice(index, 1);
  }

  fileChange(input, tipoDocumento) {
    if ( tipoDocumento == 41 ) {
      this.readFiles41(input.files);
    }
  }

  readFiles41(files, index = 0) {
    let reader = new FileReader();
    const tipo = files[0].type;

    if ( tipo === 'image/jpeg' ) {

      if (index in files) {
        // const type = files[index].name.split('.').pop();
        // const type2 = files[index].type.split('/')[0];
        this.readFile(files[index], reader, (result) => {
          this.docs41.push(result);
          // result = result.replace("data:image/png;base64,", "");
          // result = result.replace("data:image/jpeg;base64,", "");
          // result = result.replace("data:video/mp4;base64,", "");

          this.readFiles41(files, index + 1);
        });
        this.info41 = true;
      }
    } else {
      Swal.fire('Error', 'El archivo seleccionado no es pdf', 'error');
    }
  }

  readFile(file, reader, callback) {
    reader.onload = () => {
      callback(reader.result);
    }
    reader.readAsDataURL(file);
  }

  cleanFecha( fecha ) {
    return formatDate( fecha, 'yyyy-MM-dd', 'en-US' );
  }

  private formatDataRnpsp( rnpsp ) {

    if ( rnpsp.FECHA_CREACION_CUIP ) {
      rnpsp.FECHA_CREACION_CUIP = this.cleanFecha( rnpsp.FECHA_CREACION_CUIP );
    }

    if ( rnpsp.FECHA_ENTREGA_CUIP ) {
      rnpsp.FECHA_ENTREGA_CUIP = this.cleanFecha( rnpsp.FECHA_ENTREGA_CUIP );
    }

    return {
      CLAVE_LUGAR: rnpsp.CLAVE_LUGAR,
      ANIO: rnpsp.ANIO,
      CONTROL: rnpsp.CONTROL,
      CUIP: rnpsp.CUIP,
      FECHA_CREACION_CUIP: rnpsp.FECHA_CREACION_CUIP,
      FECHA_ENTREGA_CUIP: rnpsp.FECHA_ENTREGA_CUIP,
      OBSERVACIONES: rnpsp.OBSERVACIONES,
      USUARIO: this.usuario,
      FCH_REG: rnpsp.FCH_REG,
      FCH_UAC: rnpsp.FCH_UAC
    }
  }

  crearRegistro(rnpspForm: any) {
    const rnpsp = rnpspForm.value;

    const rnpspData: any = {
      CLAVE_LUGAR: this.dataRnpspInfo.clave,
      ANIO: this.dataRnpspInfo.anio,
      CONTROL: this.dataRnpspInfo.control,
      CUIP: rnpsp.CUIP,
      FECHA_CREACION_CUIP: rnpsp.FECHA_CREACION_CUIP,
      FECHA_ENTREGA_CUIP: rnpsp.FECHA_ENTREGA_CUIP,
      OBSERVACIONES: rnpsp.OBSERVACIONES,
      USUARIO: this.usuario,
      FCH_REG: rnpsp.FCH_REG,
      FCH_UAC: rnpsp.FCH_UAC
    }

    this.loader.open('Guardando...');
    console.log('estoy guardando');
    this._rnpspService.guardarRnpsp(rnpspData).subscribe(res => {
      this.loader.close();
      Swal.fire({
        icon: 'success',
        // html: "Expediente:  "
        // + 'res ',
        title: 'Información Guardada Correctamente',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar'
      });
      // this.closeDialog();
      this.cargarData();
    }, err => {
      console.log(err);
      this.loader.close();
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: 'Hubo un error en su registro, por favor intentelo nuevamente.'
      });
    });
  }

  actualizarRegistro(rnpspForm: any) {
    const rnpsp = rnpspForm.value;

    const rnpspData: any = {
      CUIP: rnpsp.CUIP,
      FECHA_CREACION_CUIP: rnpsp.FECHA_CREACION_CUIP,
      FECHA_ENTREGA_CUIP: rnpsp.FECHA_ENTREGA_CUIP,
      OBSERVACIONES: rnpsp.OBSERVACIONES
    }

    this.loader.open('Guardando...');
    console.log('estoy guardando');
    this._rnpspService.actualizarRnpsp(this.dataRnpspInfo.clave, this.dataRnpspInfo.anio, this.dataRnpspInfo.control, this.usuario, rnpspData).subscribe(res => {
      this.loader.close();
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Información actualizada correctamente.',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar'
      });
      // this.closeDialog();
      this.cargarData();
    }, err => {
      console.log(err);
      this.loader.close();
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: 'Hubo un error en su registro, por favor intentelo nuevamente.'
      });
    });
  }

  crearRegistroImagenes( recepcionDocsForm: any, tipoDocumento: any, docs: any[] ) {
    const documentos = recepcionDocsForm.value;

    const documentosData: any = {
      CLAVE_LUGAR: this.dataRnpspInfo.clave,
      ANIO: this.dataRnpspInfo.anio,
      CONTROL: this.dataRnpspInfo.control,
      TIPO: tipoDocumento,
      DOCUMENTO: docs,
      OBSERVACIONES: documentos.OBSERVACIONES,
      USUARIO: this.usuario
    }

    this.loader.open('Guardando...');
    console.log('estoy guardando');
    this._documentosService.guardarDocumentos(documentosData).subscribe(res => {
      this.loader.close();
      Swal.fire({
        icon: 'success',
        title: 'Información Guardada Correctamente',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar'
      });
      // this.closeDialog();
      this.cargarData();
    }, err => {
      console.log(err);
      this.loader.close();
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: 'Hubo un error en su registro, por favor intentelo nuevamente.'
      });
    });

  }

  actualizarRegistroImagenes( recepcionDocsForm: any, tipoDocumento: any, docs: any[] ) {
    const documentos = recepcionDocsForm.value;

    const documentosData: any = {
      CLAVE_LUGAR: this.dataRnpspInfo.clave,
      ANIO: this.dataRnpspInfo.anio,
      CONTROL: this.dataRnpspInfo.control,
      TIPO: tipoDocumento,
      DOCUMENTO: docs,
      OBSERVACIONES: documentos.OBSERVACIONES,
      USUARIO: this.usuario
    }

    this.loader.open('Guardando...');
    console.log('estoy guardando');
    this._documentosService.actualizarDocumentos(this.dataRnpspInfo.clave, this.dataRnpspInfo.anio, this.dataRnpspInfo.control, tipoDocumento, documentosData).subscribe(res => {
      this.loader.close();
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Información actualizada correctamente.',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar'
      });
      // this.closeDialog();
      this.cargarData();
    }, err => {
      console.log(err);
      this.loader.close();
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: 'Hubo un error en su registro, por favor intentelo nuevamente.'
      });
    });
  }

  viewImage(images: any) {
    this.dialog.showComponent(ViewImageComponent, {
      width: '90%',
      height: '90%',
      disableClose: true,
      data: {
        imagen: images
      }
    }).subscribe(res => {
      // console.log('res :>> ', res);

    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
