import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatalogosService } from 'src/app/services/common/catalogos/catalogos.service';
@Component({
  selector: 'app-rango-anios',
  templateUrl: './rango-anios.component.html',
  styleUrls: ['./rango-anios.component.css']
})
export class RangoAniosComponent implements OnInit {

  constructor(@Optional() public dialogRef: MatDialogRef<RangoAniosComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private _fb: FormBuilder, private catalogoService: CatalogosService) { }
  clavesCat: any;
  rangoAniosForm: FormGroup;
  arrayYears: number[] = []
  agenciaTodos = {CLAVE_LUGAR: "00",
  LUGAR: "TODOS"}
  ngOnInit(): void {
    this.initForm();
    this.catalogoService.getClaveLugar().subscribe(x => {
      console.log('x :>> ', x);
      this.clavesCat = x;
    });
    const yearActually = new Date().getFullYear();

    for (let i = yearActually; i >= 2015; i--) {
      this.arrayYears.push(i);
    }
  }
  initForm() {
    this.rangoAniosForm = this._fb.group({
      anio: [2021,],
      clave: [{CLAVE_LUGAR: "00",
      LUGAR: "TODOS"}],
    
    });
  }
  seleccionarRango(rangoFechasForm: any) {
    console.log('rango :>> ', rangoFechasForm);
    this.returnAddObjeto(rangoFechasForm.value)
  }
  returnAddObjeto(addObjeto) {
    setTimeout(() => {
      this.dialogRef.close(addObjeto);
    }, 500);
  }
}
