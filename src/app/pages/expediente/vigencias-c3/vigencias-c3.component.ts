import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-vigencias-c3',
  templateUrl: './vigencias-c3.component.html',
  styleUrls: ['./vigencias-c3.component.css']
})
export class VigenciasC3Component implements OnInit {

  @Output() actualizarVigencia = new EventEmitter<string>();
  message: string = "Actualizar Vigencia";
  @Input() dataVigenciaInfo: any;

  vigenciasForm: FormGroup;

  constructor( private formBuilder: FormBuilder, ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.vigenciasForm = this.formBuilder.group({
      CLAVE_LUGAR: [''],
      ANIO: [''],
      CONTROL: [''],
      PATERNO: [''],
      MATERNO: [''],
      NOMBRE: ['', Validators.required],
      PUESTO: [''],
      TRAMITE: [''],
      AREA_ADSCRIPCION: [''],
      CELULAR: [''],
      CORREO: [''],
      VIGENCIA_C3: [''],
      OFICIO_C3: [''],
      FECHA_CITA: [''],
      OBSERVACIONES: [''],
      USUARIO: [''],
      FCH_REG: [''],
      FCH_UAC: ['']
    });
  }

  crearRegistro(vigenciasForm: any) {

  }

}
