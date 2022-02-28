import { Component, OnInit, Input, EventEmitter, Output, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpedientesService } from '../../../services/expedientes/expedientes.service';
import { ExpedienteModel } from '../models/expedientes.model';
import { AppLoaderService } from '../../../services/common/app-loader/app-loader.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CatalogosService } from '../../../services/catalogos/catalogos.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-citas-tramite',
  templateUrl: './citas-tramite.component.html',
  styleUrls: ['./citas-tramite.component.css']
})
export class CitasTramiteComponent implements OnInit {

  @Output() actualizarCitas = new EventEmitter<string>();
  message: string = "Actualizar Citas";
  @Input() dataCitasInfo: any;

  citasForm: FormGroup;

  adscripciones: any;
  puestos: any;
  tramite: any;

  usuario: any;

  constructor( private formBuilder: FormBuilder,
               private _expedientesService: ExpedientesService,
               private _catalogoService: CatalogosService,
               private _authService: AuthService,
               private loader: AppLoaderService,
               @Optional() public dialogRef: MatDialogRef<CitasTramiteComponent> ) { 
  }
  
  ngOnInit(): void {
    this.initForm();
    this.cargarData();
    this.cargarCatalogos();
    this.onChanges();
  }

  initForm() {
    this.citasForm = this.formBuilder.group({
      CLAVE_LUGAR: [''],
      ANIO: [''],
      CONTROL: [''],
      PATERNO: [''],
      MATERNO: [''],
      NOMBRE: ['', Validators.required],
      SEXO: [''],
      PUESTO: [''],
      NO_EMPLEADO: [''],
      TRAMITE: [''],
      AREA_ADSCRIPCION: [''],
      CELULAR: [''],
      CORREO: [''],
      VIGENCIA_C3: [''],
      OFICIO_C3: [''],
      FECHA_APERTURA: [''],
      FECHA_CITA: [''],
      OBSERVACIONES: [''],
      USUARIO: [''],
      FCH_REG: [''],
      FCH_UAC: ['']
    });
  }

  cargarData(){
    this._expedientesService.obtenerInfoCita(this.dataCitasInfo.clave, this.dataCitasInfo.anio, this.dataCitasInfo.control).subscribe(res => {
      const dataCitasFormat = this.formatDataCita(res['expediente']);
      this.citasForm.setValue( dataCitasFormat );
    });

    this.usuario = this._authService.getUserClave();
  }

  cargarCatalogos(){
    this._catalogoService.getAdscripciones().subscribe( res => {
      this.adscripciones = res['adscripciones'];
    });

    this._catalogoService.getTramite().subscribe( res => {
      this.tramite = res['tramite'];
    });
  }

  onChanges() {
    this.citasForm.controls['AREA_ADSCRIPCION'].valueChanges.subscribe(adscripcion => {
      this._catalogoService.getPuestos(adscripcion).subscribe( res => {
        if( res ) {
          this.puestos = res['puestos'];
        }
      });
    });
  }

  private formatDataCita( cita ) {

    if ( cita.FECHA_CITA ) {
      const fecha_cita = cita.FECHA_CITA.slice(0,19);
      cita.FECHA_CITA = fecha_cita;
    }

    if ( cita.FECHA_APERTURA ) {
      const fecha_apertura = cita.FECHA_APERTURA.slice(0,19);
      cita.FECHA_APERTURA = fecha_apertura;
    }

    return {
      CLAVE_LUGAR: cita.CLAVE_LUGAR,
      ANIO: cita.ANIO,
      CONTROL: cita.CONTROL,
      PATERNO: cita.PATERNO,
      MATERNO: cita.MATERNO,
      NOMBRE: cita.NOMBRE,
      SEXO: cita.SEXO,
      NO_EMPLEADO: cita.NO_EMPLEADO,
      PUESTO: cita.PUESTO,
      TRAMITE: cita.TRAMITE,
      AREA_ADSCRIPCION: cita.AREA_ADSCRIPCION,
      CELULAR: cita.CELULAR,
      CORREO: cita.CORREO,
      VIGENCIA_C3: cita.VIGENCIA_C3,
      OFICIO_C3: cita.OFICIO_C3,
      FECHA_APERTURA: cita.FECHA_APERTURA,
      FECHA_CITA: cita.FECHA_CITA,
      OBSERVACIONES: cita.OBSERVACIONES,
      USUARIO: this.usuario,
      FCH_REG: cita.FCH_REG,
      FCH_UAC: cita.FCH_UAC
    }
  }

  actualizarRegistro(citasForm: any) {
    
    const cita = citasForm.value;

    const expedienteData: any = {
      PATERNO: cita.PATERNO,
      MATERNO: cita.MATERNO,
      NOMBRE: cita.NOMBRE,
      PUESTO: cita.PUESTO,
      SEXO: cita.SEXO,
      NO_EMPLEADO: cita.NO_EMPLEADO,
      TRAMITE: cita.TRAMITE,
      AREA_ADSCRIPCION: cita.AREA_ADSCRIPCION,
      CELULAR: cita.CELULAR,
      CORREO: cita.CORREO,
      VIGENCIA_C3: cita.VIGENCIA_C3,
      OFICIO_C3: cita.OFICIO_C3,
      FECHA_APERTURA: cita.FECHA_APERTURA,
      FECHA_CITA: cita.FECHA_CITA,
      OBSERVACIONES: cita.OBSERVACIONES
    }
    
    this.loader.open('Guardando...');
    console.log('estoy guardando');
    this._expedientesService.actualizarCita(this.dataCitasInfo.clave, this.dataCitasInfo.anio, this.dataCitasInfo.control, this.usuario, expedienteData).subscribe(res => {
      this.loader.close();
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Información actualizada correctamente.',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar'
      });
      // this.closeDialog();
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
