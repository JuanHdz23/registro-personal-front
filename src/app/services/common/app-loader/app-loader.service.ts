import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AppLoaderComponent } from './app-loader.component';
import { timeout } from 'rxjs/operators';

@Injectable()
export class AppLoaderService {
  dialogRef: MatDialogRef<AppLoaderComponent>;
  constructor(private dialog: MatDialog) { }

  public open(title: string = 'Cargando...') {

    Promise.resolve().then(() => {
      this.dialogRef = this.dialog.open(AppLoaderComponent, { width: '200px', disableClose: true });
      this.dialogRef.componentInstance.title = title;
      this.dialogRef.updateSize('200px');
    });

    // this.dialogRef = this.dialog.open(AppLoaderComponent, { disableClose: true });
    // this.dialogRef.updateSize('200px');
    // this.dialogRef.componentInstance.title = title;
    // return this.dialogRef.afterClosed();

  }

  public close() {
    // this.dialogRef.close();
    if (this.dialogRef.componentInstance) {

      this.dialogRef.componentInstance.close();
    } else {
      this.dialogRef.close();
    }
  }

  public closeAll() {
    this.dialog.closeAll();
  }
}
