import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { AppDialogComponent } from './app-dialog.component';
import { ComponentType } from '@angular/cdk/portal';
import { Observable } from 'rxjs';
import { AppComfirmComponent } from '../app-comfirm/app-comfirm.component';

interface DialogOptions {
  height?: string;
  width?: string;
  disableClose?: boolean;
  data?: any;
}

@Injectable()
export class AppDialogService {

  constructor(private dialog: MatDialog) { }

  public show(title: string, message: string) {
    let dialogRef: MatDialogRef<AppDialogComponent>;
    dialogRef = this.dialog.open(AppDialogComponent, {
      width: '380px',
      disableClose: true,
      data: { title, message }
    });

    return dialogRef.afterClosed();
  }

  public showComponent<T>(component: ComponentType<T>, options?: DialogOptions) {
    return this.dialog.open(component, options).afterClosed();
  }

  public confirm(title: string, message: string): Observable<boolean> {
    let dialogRef: MatDialogRef<AppComfirmComponent>;
    dialogRef = this.dialog.open(AppComfirmComponent, {
      width: '380px',
      disableClose: true,
      data: { title, message }
    });
    return dialogRef.afterClosed();
  }

  public confirmUnsavedChanges() {
    return this.confirm('Advertencia',
      'Usted tiene cambios que no han sido guardados aun. ' +
      '¿Está seguro de que quiere abandonar este formulario y perder los cambios realizados?');
  }

  public confirmRemove() {
    return this.confirm('Advertencia',
      'Usted está intentando eliminar este registro ¿desea continuar?');
  }

  public confirmUpdate() {
    return this.confirm('Advertencia',
      'Usted está intentando actualizar este registro ¿desea continuar?');
  }
}
