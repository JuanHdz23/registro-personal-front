import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-selec-image',
  templateUrl: './selec-image.component.html',
  styleUrls: ['./selec-image.component.scss']
})
export class SelecImageComponent implements OnInit {
  public image: any;
  UsuarioFoto: any;
  constructor(
  @Optional() public dialogRef: MatDialogRef<SelecImageComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  // console.log('this.data :>> ', this.data);
  }


  returnAddObjeto() {
    setTimeout(() => {
      // this.loader.close();
      this.dialogRef.close({
        foto: this.image,
        b64: this.UsuarioFoto
      });
    }, 500);
  }

  seleccionar(){
    this.returnAddObjeto();
  }

  fileChange(input) {
    const reader = new FileReader();
    if (input.files.length) {
      const file = input.files[0];
      const type = file.name.split('.').pop();
      reader.onload = () => {
        this.image = reader.result;
        var result = String(reader.result);
        result = result.replace("data:image/png;base64,", "");
        result = result.replace("data:image/jpeg;base64,", "");
        this.UsuarioFoto = result;
      }
      reader.readAsDataURL(file);
    }
  }
  removeImage(): void {
    this.image = '';
    this.UsuarioFoto= '';
  }
}
