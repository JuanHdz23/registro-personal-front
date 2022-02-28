import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-visor-pdf',
  templateUrl: './visor-pdf.component.html',
  styleUrls: ['./visor-pdf.component.css']
})
export class VisorPdfComponent implements OnInit {

  constructor(
    @Optional() public dialogRef: MatDialogRef<VisorPdfComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log('this.data :>> ', this.data.documento);
  }

  // lo mandamos llamar en un evento click de un boton o donde o ocupe
  showPdfAutopsia() {
    //aqui le pasamos el archivo a descargar
    const linkSource = this.data.documento;

    //esto crea el elemento
      const downloadLink = document.createElement("a");

      // le asignamos el titulo al archivo pdf
      const fileName = this.data.titulo

      //esto hace la descarga
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
  }
}
