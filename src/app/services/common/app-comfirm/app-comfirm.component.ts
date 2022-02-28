import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-app-comfirm',
  templateUrl: './app-comfirm.component.html',
  styleUrls: ['./app-comfirm.component.scss']
})
export class AppComfirmComponent {

  constructor(
    public dialogRef: MatDialogRef<AppComfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}
