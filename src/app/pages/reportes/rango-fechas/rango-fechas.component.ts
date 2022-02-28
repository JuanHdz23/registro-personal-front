import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatalogosService } from 'src/app/services/common/catalogos/catalogos.service';

@Component({
  selector: 'app-rango-fechas',
  templateUrl: './rango-fechas.component.html',
  styleUrls: ['./rango-fechas.component.css']
})
export class RangoFechasComponent implements OnInit {
  clavesCat: any;
   clavescatAux= true;
  constructor(@Optional() public dialogRef: MatDialogRef<RangoFechasComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: any,private _fb: FormBuilder, private catalogoService:CatalogosService) { }
  rangoFechasForm: FormGroup;

  ngOnInit(): void {
    console.log('data :>> ', this.data);
    this.initForm();
    this.catalogoService.getClaveLugar().subscribe(x => {
      console.log('x :>> ', x);
      this.clavesCat = x;
    });
    if (this.data.prueba == '12') {
      this.rangoFechasForm.controls.clave.disable();
      this.clavescatAux= false;
    }
  }

    initForm() {
    this.rangoFechasForm = this._fb.group({
      fechaInicial: ['',Validators.required],
      fechaFinal: ['',Validators.required],
      clave: ['00'],
    });
  }
  seleccionarRango(rangoFechasForm: any){
 console.log('rango :>> ', rangoFechasForm);
 this.returnAddObjeto(rangoFechasForm.value)
  }
  returnAddObjeto(addObjeto) {
    setTimeout(() => {
       this.dialogRef.close(addObjeto);
    }, 500);
  }
}
