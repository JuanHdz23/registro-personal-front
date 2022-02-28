import { Component, OnInit, Input, EventEmitter, Output, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppLoaderService } from '../../../services/common/app-loader/app-loader.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AfisService } from '../../../services/afis/afis.service';
import { AuthService } from '../../../services/auth/auth.service';
import Swal from 'sweetalert2';
import { ViewImageComponent } from '../view-image/view-image.component';
import { AppDialogService } from '../../../services/common/app-dialog/app-dialog.service';
import { RecepcionDocumentosService } from '../../../services/recepcion-documentos/recepcion-documentos.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-afis',
  templateUrl: './afis.component.html',
  styleUrls: ['./afis.component.scss']
})
export class AfisComponent implements OnInit {

  @Output() actualizarAfis = new EventEmitter<string>();
  message: string = "Actualizar AFIS";
  @Input() dataAfisInfo: any;

  afisForm: FormGroup;

  existeData: boolean = false;
  usuario: any;

  docs31: any[] = [];
  flag31: boolean = false;
  info31: boolean = false;
  data31: boolean = false;
  docs32: any[] = [];
  flag32: boolean = false;
  info32: boolean = false;
  data32: boolean = false;

  constructor( private formBuilder: FormBuilder,
               private dialog: AppDialogService,
               private _afisService: AfisService,
               private _authService: AuthService,
               private _documentosService: RecepcionDocumentosService,
               private loader: AppLoaderService,
               @Optional() public dialogRef: MatDialogRef<AfisComponent> ) { }

  ngOnInit(): void {
    this.initForm();
    this.cargarData();
  }

  initForm() {
    this.afisForm = this.formBuilder.group({
      CLAVE_LUGAR: [''],
      ANIO: [''],
      CONTROL: [''],
      FECHA_ENTRADA: [''],
      FECHA_SALIDA: [''],
      OBSERVACIONES: [''],
      USUARIO: [''],
      FCH_REG: [''],
      FCH_UAC: ['']
    });
  }

  cargarData(){
    this._afisService.obtenerInfoAfis(this.dataAfisInfo.clave, this.dataAfisInfo.anio, this.dataAfisInfo.control).subscribe(res => {
      if ( res['afis'].length > 0 ) {
        const dataAfisFormat = this.formatDataAfis(res['afis'][0]);
        this.afisForm.setValue( dataAfisFormat );
        this.existeData = true;
      }
    });

    this._documentosService.obtenerDocumentosExisten(this.dataAfisInfo.clave, this.dataAfisInfo.anio, this.dataAfisInfo.control).subscribe((res: any) => {
      if ( res.tipos.length > 0 ) {
        res.tipos.map(x => {
          if ( x.number == 31 ) {
            this.info31 = true;
            this.data31 = true;
          } else if ( x.number == 32 ) {
            this.info32 = true;
            this.data32 = true;
          } 
        });
      }
    });
  
    this.usuario = this._authService.getUserClave();
  }

  cargar31( tipoDocumento ) {
    this._documentosService.obtenerInfoDocumentos(this.dataAfisInfo.clave, this.dataAfisInfo.anio, this.dataAfisInfo.control, tipoDocumento).subscribe((res: any) => {
      if (  res.documentos.length > 0 && !this.flag31 ) {
        for (let i = 0; i < res.documentos.length; i++) {
          this.docs31.push(res.documentos[i].DOCUMENTO);
        }
        this.flag31 = true;
      }
    });
  }

  cargar32( tipoDocumento ) {
    this._documentosService.obtenerInfoDocumentos(this.dataAfisInfo.clave, this.dataAfisInfo.anio, this.dataAfisInfo.control, tipoDocumento).subscribe((res: any) => {
      if (  res.documentos.length > 0 && !this.flag32 ) {
        for (let i = 0; i < res.documentos.length; i++) {
          this.docs32.push(res.documentos[i].DOCUMENTO);
        }
        this.flag32 = true;
      }
    });
  }

  removeImage31(index): void {
    this.docs31.splice(index, 1);
  }

  removeImage32(index): void {
    this.docs32.splice(index, 1);
  }

  fileChange(input, tipoDocumento) {
    if ( tipoDocumento == 31 ) {
      this.readFiles31(input.files);
    } else if ( tipoDocumento == 32 ) {
      this.readFiles32(input.files);
    }
  }
  
  readFile(file, reader, callback) {
    reader.onload = () => {
      callback(reader.result);
    }
    reader.readAsDataURL(file);
  }

  readFiles31(files, index = 0) {
    let reader = new FileReader();
    const tipo = files[0].type;

    if ( tipo === 'image/jpeg' ) {

      if (index in files) {
        // const type = files[index].name.split('.').pop();
        // const type2 = files[index].type.split('/')[0];
        this.readFile(files[index], reader, (result) => {
          this.docs31.push(result);
          // result = result.replace("data:image/png;base64,", "");
          // result = result.replace("data:image/jpeg;base64,", "");
          // result = result.replace("data:video/mp4;base64,", "");

          this.readFiles31(files, index + 1);
        });
        this.info31 = true;
      }
    } else {
      Swal.fire('Error', 'El archivo seleccionado no es pdf', 'error');
    }
  }

  readFiles32(files, index = 0) {
    let reader = new FileReader();
    const tipo = files[0].type;

    if ( tipo === 'image/jpeg' ) {

      if (index in files) {
        // const type = files[index].name.split('.').pop();
        // const type2 = files[index].type.split('/')[0];
        this.readFile(files[index], reader, (result) => {
          this.docs32.push(result);
          // result = result.replace("data:image/png;base64,", "");
          // result = result.replace("data:image/jpeg;base64,", "");
          // result = result.replace("data:video/mp4;base64,", "");

          this.readFiles32(files, index + 1);
        });
        this.info32 = true;
      }
    } else {
      Swal.fire('Error', 'El archivo seleccionado no es pdf', 'error');
    }
  }

  cleanFecha( fecha ) {
    return formatDate( fecha, 'yyyy-MM-dd', 'en-US' );
  }

  private formatDataAfis( afis ) {

    if ( afis.FECHA_ENTRADA ) {
      afis.FECHA_ENTRADA = this.cleanFecha( afis.FECHA_ENTRADA );;
    }

    if ( afis.FECHA_SALIDA ) {
      afis.FECHA_SALIDA = this.cleanFecha( afis.FECHA_SALIDA );;
    }

    return {
      CLAVE_LUGAR: afis.CLAVE_LUGAR,
      ANIO: afis.ANIO,
      CONTROL: afis.CONTROL,
      FECHA_ENTRADA: afis.FECHA_ENTRADA,
      FECHA_SALIDA: afis.FECHA_SALIDA,
      OBSERVACIONES: afis.OBSERVACIONES,
      USUARIO: this.usuario,
      FCH_REG: afis.FCH_REG,
      FCH_UAC: afis.FCH_UAC
    }
  }

  crearRegistro(afisForm: any) {
    const afis = afisForm.value;

    const afisData: any = {
      CLAVE_LUGAR: this.dataAfisInfo.clave,
      ANIO: this.dataAfisInfo.anio,
      CONTROL: this.dataAfisInfo.control,
      FECHA_ENTRADA: afis.FECHA_ENTRADA,
      FECHA_SALIDA: afis.FECHA_SALIDA,
      OBSERVACIONES: afis.OBSERVACIONES,
      USUARIO: this.usuario,
      FCH_REG: afis.FCH_REG,
      FCH_UAC: afis.FCH_UAC
    }

    this.loader.open('Guardando...');
    // console.log('estoy guardando');
    this._afisService.guardarAfis(afisData).subscribe(res => {
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

  actualizarRegistro(afisForm: any) {
    const afis = afisForm.value;

    const afisData: any = {
      FECHA_ENTRADA: afis.FECHA_ENTRADA,
      FECHA_SALIDA: afis.FECHA_SALIDA,
      OBSERVACIONES: afis.OBSERVACIONES
    }

    this.loader.open('Guardando...');
    // console.log('estoy guardando');
    this._afisService.actualizarAfis(this.dataAfisInfo.clave, this.dataAfisInfo.anio, this.dataAfisInfo.control, this.usuario, afisData).subscribe(res => {
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
      CLAVE_LUGAR: this.dataAfisInfo.clave,
      ANIO: this.dataAfisInfo.anio,
      CONTROL: this.dataAfisInfo.control,
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
      CLAVE_LUGAR: this.dataAfisInfo.clave,
      ANIO: this.dataAfisInfo.anio,
      CONTROL: this.dataAfisInfo.control,
      TIPO: tipoDocumento,
      DOCUMENTO: docs,
      OBSERVACIONES: documentos.OBSERVACIONES,
      USUARIO: this.usuario
    }

    this.loader.open('Guardando...');
    console.log('estoy guardando');
    this._documentosService.actualizarDocumentos(this.dataAfisInfo.clave, this.dataAfisInfo.anio, this.dataAfisInfo.control, tipoDocumento, documentosData).subscribe(res => {
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

  closeDialog() {
    this.dialogRef.close();
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

}
