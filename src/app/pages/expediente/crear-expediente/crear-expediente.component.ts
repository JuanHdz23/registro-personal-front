import { Component, OnInit, Optional, Inject, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import 'moment-precise-range-plugin'
import Swal from 'sweetalert2'
import { ExpedienteModel } from '../models/expedientes.model';
import { ExpedientesService } from '../../../services/expedientes/expedientes.service';
import { AppLoaderService } from 'src/app/services/common/app-loader/app-loader.service';
import { AppDialogService } from 'src/app/services/common/app-dialog/app-dialog.service';
import { AuthService } from '../../../services/auth/auth.service';
import { ThemePalette } from '@angular/material/core';
import { CatalogosService } from '../../../services/catalogos/catalogos.service';

@Component({
  selector: 'app-crear-expediente',
  templateUrl: './crear-expediente.component.html',
  styleUrls: ['./crear-expediente.component.css']
})

export class CrearExpedienteComponent implements OnInit {
  @Output() actualizarData = new EventEmitter<string>();
  message: string = "Actualizar expediente"
  @Input() dataExpedienteInfo: any;
  dataExpediente: any;
  dialogHeader = "Crear Expediente"
  expedienteForm: FormGroup;

  citasForm: FormGroup;
  adscripciones: any;
  puestos: any;
  tramite: any;

  constructor(private formBuilder: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<CrearExpedienteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _expedientesService: ExpedientesService,
    private _catalogoService: CatalogosService,
    private loader: AppLoaderService,
    private dialog: AppDialogService,
    private AuthService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
    this.cargarCatalogos();
    this.onChanges();
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

  initForm() {
    this.citasForm = this.formBuilder.group({
      CLAVE_LUGAR: [''],
      ANIO: [''],
      CONTROL: [''],
      PATERNO: [''],
      MATERNO: [''],
      NOMBRE: ['', Validators.required],
      SEXO: [''],
      NO_EMPLEADO: [''],
      PUESTO: [''],
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

  private formatDataExpediente(expediente) {

    return {
      TIPO_REGISTRO: expediente.TIPO_REGISTRO,
      CLAVE_LUGAR: expediente.CLAVE_LUGAR,
      ANIO: expediente.ANIO,
      CONTROL: expediente.CONTROL,
      FECHA_INGRESO: expediente.FECHA_INGRESO,
      FECHA_IDENTIFICACION: expediente.FECHA_IDENTIFICACION,
      CRI: expediente.CRI,
      DESCONOCIDO: expediente.DESCONOCIDO,
      RESTOS_OSEOS: expediente.RESTOS_OSEOS,
      NOMBRE: expediente.NOMBRE,
      PATERNO: expediente.PATERNO,
      MATERNO: expediente.MATERNO,
      ALIAS: expediente.ALIAS,
      SEXO: expediente.SEXO,
      NACIONALIDAD: expediente.NACIONALIDAD,
      FECHA_NAC: expediente.FECHA_NAC,
      IDENTIFICACION_POR: expediente.IDENTIFICACION_POR,
      // FECHA_NAC: {
      //   year: new Date(new Date(expediente.FECHA_NAC).toISOString()).getFullYear(),
      //   month: new Date(new Date(expediente.FECHA_NAC).toISOString()).getMonth() + 1,
      //   day: new Date(new Date(expediente.FECHA_NAC).toISOString()).getDay()
      // },
      EDAD_APROX_ANIOS: expediente.EDAD_APROX_ANIOS,
      EDAD_APROX_MESES: expediente.EDAD_APROX_MESES,
      EDAD_APROX_DIAS: expediente.EDAD_APROX_DIAS,
      EDAD_APROX_ANIOS_INI: expediente.EDAD_APROX_ANIOS_INI,
      EDAD_APROX_ANIOS_FIN: expediente.EDAD_APROX_ANIOS_FIN,
      OBSERVACIONES: expediente.OBSERVACIONES,
      PUBLICAR: expediente.PUBLICAR
    };
  }

  crearRegistro(expedienteForm: any) {

    const expediente = expedienteForm.value;

    const expedienteData: ExpedienteModel = {
      CLAVE_LUGAR: '01',
      ANIO: expediente.ANIO,
      CONTROL: expediente.CONTROL,
      PATERNO: expediente.PATERNO.toUpperCase(),
      MATERNO: expediente.MATERNO.toUpperCase(),
      NOMBRE: expediente.NOMBRE.toUpperCase(),
      SEXO: expediente.SEXO,
      NO_EMPLEADO: expediente.NO_EMPLEADO.toUpperCase(),
      PUESTO: expediente.PUESTO,
      TRAMITE: expediente.TRAMITE,
      AREA_ADSCRIPCION: expediente.AREA_ADSCRIPCION,
      CELULAR: expediente.CELULAR,
      CORREO: expediente.CORREO.toUpperCase(),
      VIGENCIA_C3: expediente.VIGENCIA_C3,
      OFICIO_C3: expediente.OFICIO_C3.toUpperCase(),
      FECHA_APERTURA: expediente.FECHA_APERTURA,
      FECHA_CITA: expediente.FECHA_CITA,
      OBSERVACIONES: expediente.OBSERVACIONES,
      USUARIO: expediente.USUARIO,
      FCH_REG: expediente.FCH_REG,
      FCH_UAC: expediente.FCH_UAC
    }
    
    this.loader.open('Guardando...');
    console.log('estoy guardando');
    this._expedientesService.guardarCita(expedienteData).subscribe(res => {
      this.loader.close();
      Swal.fire({
        icon: 'success',
        // html: "Expediente:  "
        // + 'res ',
        title: 'Expediente Número: <br>' + res['cita'].CONTROL,
        text: 'Expediente creado correctamente.',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar'
      });
      this.closeDialog();
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

  clearValidators(input: string) {
    this.expedienteForm.controls[input].clearValidators();
    this.expedienteForm.controls[input].updateValueAndValidity();
    this.expedienteForm.controls[input].reset();
  }

  addValidators(input: string) {
    this.expedienteForm.controls[input].reset();
    this.expedienteForm.controls[input].setValidators([Validators.required]);
    this.expedienteForm.controls[input].updateValueAndValidity();
  }
}

export function rangoEdadValidator(edadMinima: string, edadMaxima: string) {
  return (group: FormGroup) => {
    let minima = group.controls[edadMinima];
    let maxima = group.controls[edadMaxima];
    if (minima.value > maxima.value) {
      return maxima.setErrors({ rangoCorrecto: true });
    }
  }
}

export function dateValidator(c: FormControl) {
  const inputDate = new Date(c.value);
  const today = new Date();

  if (inputDate > today) {
    return { invalidDate: true };
  } else {
    return null;
  }
}
