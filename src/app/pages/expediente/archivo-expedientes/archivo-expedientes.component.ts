import { Component, OnInit, Input, EventEmitter, Output, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArchivoExpedientesService } from '../../../services/archivo-expedientes/archivo-expedientes.service';
import { AuthService } from '../../../services/auth/auth.service';
import { AppLoaderService } from '../../../services/common/app-loader/app-loader.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-archivo-expedientes',
  templateUrl: './archivo-expedientes.component.html',
  styleUrls: ['./archivo-expedientes.component.css']
})
export class ArchivoExpedientesComponent implements OnInit {

  @Output() actualizarArchivo = new EventEmitter<string>();
  message: string = "Actualizar Archivo Archivo";
  @Input() dataArchivoInfo: any;

  archivoForm: FormGroup;

  existeData: boolean = false;
  usuario: any;

  constructor( private formBuilder: FormBuilder,
               private _archivoService: ArchivoExpedientesService,
               private _authService: AuthService,
               private loader: AppLoaderService,
               @Optional() public dialogRef: MatDialogRef<ArchivoExpedientesComponent> ) { }

  ngOnInit(): void {
    this.initForm();
    this.cargarData();
  }

  initForm() {
    this.archivoForm = this.formBuilder.group({
      CLAVE_LUGAR: [''],
      ANIO: [''],
      CONTROL: [''],
      DESCRIPCION: [''],
      FECHA_CIERRE: [''],
      UBICACION: [''],
      OBSERVACIONES: [''],
      USUARIO: [''],
      FCH_REG: [''],
      FCH_UAC: ['']
    });
  }

  cargarData(){
    this._archivoService.obtenerInfoArchivo(this.dataArchivoInfo.clave, this.dataArchivoInfo.anio, this.dataArchivoInfo.control).subscribe(res => {
      if ( res['archivo'].length > 0 ) {
        const dataArchivoFormat = this.formatDataArchivo(res['archivo'][0]);
        this.archivoForm.setValue( dataArchivoFormat );
        this.existeData = true;
      }
    });
  
    this.usuario = this._authService.getUserClave();
  }

  cleanFecha( fecha ) {
    return formatDate( fecha, 'yyyy-MM-dd', 'en-US' );
  }

  private formatDataArchivo( archivo ) {

    if ( archivo.FECHA_CIERRE ) {
      archivo.FECHA_CIERRE = this.cleanFecha( archivo.FECHA_CIERRE );
    }

    return {
      CLAVE_LUGAR: archivo.CLAVE_LUGAR,
      ANIO: archivo.ANIO,
      CONTROL: archivo.CONTROL,
      DESCRIPCION: archivo.DESCRIPCION,
      FECHA_CIERRE: archivo.FECHA_CIERRE,
      UBICACION: archivo.UBICACION,
      OBSERVACIONES: archivo.OBSERVACIONES,
      USUARIO: this.usuario,
      FCH_REG: archivo.FCH_REG,
      FCH_UAC: archivo.FCH_UAC
    }
  }

  crearRegistro(archivoForm: any) {
    const archivo = archivoForm.value;

    const archivoData: any = {
      CLAVE_LUGAR: this.dataArchivoInfo.clave,
      ANIO: this.dataArchivoInfo.anio,
      CONTROL: this.dataArchivoInfo.control,
      DESCRIPCION: archivo.DESCRIPCION,
      FECHA_CIERRE: archivo.FECHA_CIERRE,
      UBICACION: archivo.UBICACION,
      OBSERVACIONES: archivo.OBSERVACIONES,
      USUARIO: this.usuario,
      FCH_REG: archivo.FCH_REG,
      FCH_UAC: archivo.FCH_UAC
    }

    this.loader.open('Guardando...');
    console.log('estoy guardando');
    this._archivoService.guardarArchivo(archivoData).subscribe(res => {
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

  actualizarRegistro(archivoForm: any) {
    const archivo = archivoForm.value;

    const archivoData: any = {
      DESCRIPCION: archivo.DESCRIPCION,
      FECHA_CIERRE: archivo.FECHA_CIERRE,
      UBICACION: archivo.UBICACION,
      OBSERVACIONES: archivo.OBSERVACIONES
    }

    this.loader.open('Guardando...');
    console.log('estoy guardando');
    this._archivoService.actualizarArchivo(this.dataArchivoInfo.clave, this.dataArchivoInfo.anio, this.dataArchivoInfo.control, this.usuario, archivoData).subscribe(res => {
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

}
