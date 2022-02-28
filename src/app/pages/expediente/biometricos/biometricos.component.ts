import { Component, OnInit, Input, EventEmitter, Output, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BiometricosService } from '../../../services/biometricos/biometricos.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AppLoaderService } from '../../../services/common/app-loader/app-loader.service';
import { AuthService } from '../../../services/auth/auth.service';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-biometricos',
  templateUrl: './biometricos.component.html',
  styleUrls: ['./biometricos.component.css']
})
export class BiometricosComponent implements OnInit {

  @Output() actualizarBiometricos = new EventEmitter<string>();
  message: string = "Actualizar Biométricos";
  @Input() dataBiometricosInfo: any;

  biometricosForm: FormGroup;

  existeData: boolean = false;
  usuario: any;

  constructor( private formBuilder: FormBuilder,
               private _biometricoService: BiometricosService,
               private _authService: AuthService,
               private loader: AppLoaderService,
               @Optional() public dialogRef: MatDialogRef<BiometricosComponent> ) { }

  ngOnInit(): void {
    this.initForm();
    this.cargarData();
  }

  initForm() {
    this.biometricosForm = this.formBuilder.group({
      CLAVE_LUGAR: [''],
      ANIO: [''],
      CONTROL: [''],
      RECIP: [''],
      DOCS_RECIP: [''],
      HUELLAS: [''],
      CUIP: [''],
      CIB_RECIP: [''],
      RNPSP: [''],
      DOCS_RNPSP: [''],
      CIB_RNPSP: [''],
      NO_CIB: [''],
      FOTOS: [''],
      CARGO_FOTOS: [''],
      FICHA_HUELLAS: [''],
      VOZ: [''],
      LIGA_FACIAL: [''],
      OBSERVACIONES: [''],
      USUARIO: [''],
      FCH_REG: [''],
      FCH_UAC: ['']
    });
  }

  cargarData(){
    this._biometricoService.obtenerInfoBiometricos(this.dataBiometricosInfo.clave, this.dataBiometricosInfo.anio, this.dataBiometricosInfo.control).subscribe(res => {
      if ( res['biometricos'].length > 0 ) {
        const dataBiometricosFormat = this.formatDataBiometricos(res['biometricos'][0]);
        this.biometricosForm.setValue( dataBiometricosFormat );
        this.existeData = true;
      }
    });

    this.usuario = this._authService.getUserClave();
  }

  cleanFecha( fecha ) {
    return formatDate( fecha, 'yyyy-MM-dd', 'en-US' );
  }

  private formatDataBiometricos( biometrico ) {

    if ( biometrico.RECIP ) {
      biometrico.RECIP = this.cleanFecha( biometrico.RECIP );
    }
    
    if ( biometrico.DOCS_RECIP ) {
      biometrico.DOCS_RECIP = this.cleanFecha( biometrico.DOCS_RECIP );
    }

    if ( biometrico.HUELLAS ) {
      biometrico.HUELLAS = this.cleanFecha( biometrico.HUELLAS );
    }

    if ( biometrico.CUIP ) {
      biometrico.CUIP = this.cleanFecha( biometrico.CUIP );
    }

    if ( biometrico.CIB_RECIP ) {
      biometrico.CIB_RECIP = this.cleanFecha( biometrico.CIB_RECIP );
    }

    if ( biometrico.RNPSP ) {
      biometrico.RNPSP = this.cleanFecha( biometrico.RNPSP );
    }

    if ( biometrico.DOCS_RNPSP ) {
      biometrico.DOCS_RNPSP = this.cleanFecha( biometrico.DOCS_RNPSP );
    }

    if ( biometrico.CIB_RNPSP ) {
      biometrico.CIB_RNPSP = this.cleanFecha( biometrico.CIB_RNPSP );
    }

    if ( biometrico.CARGO_FOTOS ) {
      biometrico.CARGO_FOTOS = this.cleanFecha( biometrico.CARGO_FOTOS );
    }

    if ( biometrico.FICHA_HUELLAS ) {
      biometrico.FICHA_HUELLAS = this.cleanFecha( biometrico.FICHA_HUELLAS );
    }

    if ( biometrico.VOZ ) {
      biometrico.VOZ = this.cleanFecha( biometrico.VOZ );
    }

    if ( biometrico.LIGA_FACIAL ) {
      biometrico.LIGA_FACIAL = this.cleanFecha( biometrico.LIGA_FACIAL );
    }

    return {
      CLAVE_LUGAR: biometrico.CLAVE_LUGAR,
      ANIO: biometrico.ANIO,
      CONTROL: biometrico.CONTROL,
      RECIP: biometrico.RECIP,
      DOCS_RECIP: biometrico.DOCS_RECIP,
      HUELLAS: biometrico.HUELLAS,
      CUIP: biometrico.CUIP,
      CIB_RECIP: biometrico.CIB_RECIP,
      RNPSP: biometrico.RNPSP,
      DOCS_RNPSP: biometrico.DOCS_RNPSP,
      CIB_RNPSP: biometrico.CIB_RNPSP,
      NO_CIB: biometrico.NO_CIB,
      FOTOS: biometrico.FOTOS,
      CARGO_FOTOS: biometrico.CARGO_FOTOS,
      FICHA_HUELLAS: biometrico.FICHA_HUELLAS,
      VOZ: biometrico.VOZ,
      LIGA_FACIAL: biometrico.LIGA_FACIAL,
      OBSERVACIONES: biometrico.OBSERVACIONES,
      USUARIO: this.usuario,
      FCH_REG: biometrico.FCH_REG,
      FCH_UAC: biometrico.FCH_UAC
    }
  }

  crearRegistro(biometricosForm: any) {
    const biometrico = biometricosForm.value;

    const biometricoData: any = {
      CLAVE_LUGAR: this.dataBiometricosInfo.clave,
      ANIO: this.dataBiometricosInfo.anio,
      CONTROL: this.dataBiometricosInfo.control,
      RECIP: biometrico.RECIP,
      DOCS_RECIP: biometrico.DOCS_RECIP,
      HUELLAS: biometrico.HUELLAS,
      CUIP: biometrico.CUIP,
      CIB_RECIP: biometrico.CIB_RECIP,
      RNPSP: biometrico.RNPSP,
      DOCS_RNPSP: biometrico.DOCS_RNPSP,
      CIB_RNPSP: biometrico.CIB_RNPSP,
      NO_CIB: biometrico.NO_CIB,
      FOTOS: biometrico.FOTOS,
      CARGO_FOTOS: biometrico.CARGO_FOTOS,
      FICHA_HUELLAS: biometrico.FICHA_HUELLAS,
      VOZ: biometrico.VOZ,
      LIGA_FACIAL: biometrico.LIGA_FACIAL,
      OBSERVACIONES: biometrico.OBSERVACIONES,
      USUARIO: this.usuario,
      FCH_REG: biometrico.FCH_REG,
      FCH_UAC: biometrico.FCH_UAC
    }

    this.loader.open('Guardando...');
    console.log('estoy guardando');
    this._biometricoService.guardarBiometricos(biometricoData).subscribe(res => {
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

  actualizarRegistro(biometricosForm: any) {
    const biometrico = biometricosForm.value;

    const biometricoData: any = {
      RECIP: biometrico.RECIP,
      DOCS_RECIP: biometrico.DOCS_RECIP,
      HUELLAS: biometrico.HUELLAS,
      CUIP: biometrico.CUIP,
      CIB_RECIP: biometrico.CIB_RECIP,
      RNPSP: biometrico.RNPSP,
      DOCS_RNPSP: biometrico.DOCS_RNPSP,
      CIB_RNPSP: biometrico.CIB_RNPSP,
      NO_CIB: biometrico.NO_CIB,
      FOTOS: biometrico.FOTOS,
      CARGO_FOTOS: biometrico.CARGO_FOTOS,
      FICHA_HUELLAS: biometrico.FICHA_HUELLAS,
      VOZ: biometrico.VOZ,
      LIGA_FACIAL: biometrico.LIGA_FACIAL,
      OBSERVACIONES: biometrico.OBSERVACIONES
    }

    this.loader.open('Guardando...');
    console.log('estoy guardando');
    this._biometricoService.actualizarBiometricos(this.dataBiometricosInfo.clave, this.dataBiometricosInfo.anio, this.dataBiometricosInfo.control, this.usuario, biometricoData).subscribe(res => {
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
