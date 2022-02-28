import { Component, OnInit, Input, EventEmitter, Output, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppDialogService } from 'src/app/services/common/app-dialog/app-dialog.service';
import { VisorPdfComponent } from '../visor-pdf/visor-pdf.component';
import Swal from 'sweetalert2';
import Dropzone from 'dropzone';
import { ViewImageComponent } from '../view-image/view-image.component';
import { AuthService } from '../../../services/auth/auth.service';
import { AppLoaderService } from '../../../services/common/app-loader/app-loader.service';
import { MatDialogRef } from '@angular/material/dialog';
import { RecepcionDocumentosService } from '../../../services/recepcion-documentos/recepcion-documentos.service';

@Component({
  selector: 'app-recepcion-documentos',
  templateUrl: './recepcion-documentos.component.html',
  styleUrls: ['./recepcion-documentos.component.scss']
})
export class RecepcionDocumentosComponent implements OnInit {

  @Output() actualizarRecepcionDocumentos = new EventEmitter<string>();
  message: string = "Actualizar Recepción Documentos";
  @Input() dataRecepcionDocumentosInfo: any;

  recepcionDocsForm: FormGroup;

  usuario: any;

  page = 1;
  zoom = 1;
  
  step = 0;

  images: any[] = [];
  docs01: any[] = [];
  flag01: boolean = false;
  info01: boolean = false;
  data01: boolean = false;
  docs02: any[] = [];
  flag02: boolean = false;
  info02: boolean = false;
  data02: boolean = false;
  docs03: any[] = [];
  flag03: boolean = false;
  info03: boolean = false;
  data03: boolean = false;
  docs04: any[] = [];
  flag04: boolean = false;
  info04: boolean = false;
  data04: boolean = false;
  docs05: any[] = [];
  flag05: boolean = false;
  info05: boolean = false;
  data05: boolean = false;
  docs06: any[] = [];
  flag06: boolean = false;
  info06: boolean = false;
  data06: boolean = false;
  docs07: any[] = [];
  flag07: boolean = false;
  info07: boolean = false;
  data07: boolean = false;
  docs08: any[] = [];
  flag08: boolean = false;
  info08: boolean = false;
  data08: boolean = false;
  docs09: any[] = [];
  flag09: boolean = false;
  info09: boolean = false;
  data09: boolean = false;
  docs10: any[] = [];
  flag10: boolean = false;
  info10: boolean = false;
  data10: boolean = false;
  docs11: any[] = [];
  flag11: boolean = false;
  info11: boolean = false;
  data11: boolean = false;
  docs12: any[] = [];
  flag12: boolean = false;
  info12: boolean = false;
  data12: boolean = false;
  docs13: any[] = [];
  flag13: boolean = false;
  info13: boolean = false;
  data13: boolean = false;
  docs14: any[] = [];
  flag14: boolean = false;
  info14: boolean = false;
  data14: boolean = false;
  docs15: any[] = [];
  flag15: boolean = false;
  info15: boolean = false;
  data15: boolean = false;
  docs16: any[] = [];
  flag16: boolean = false;
  info16: boolean = false;
  data16: boolean = false;
  docs17: any[] = [];
  flag17: boolean = false;
  info17: boolean = false;
  data17: boolean = false;
  
  setStep(index: number) {
    this.step = index;
  }

  constructor( private formBuilder: FormBuilder,
               private dialog: AppDialogService,
               private _documentosService: RecepcionDocumentosService,
               private _authService: AuthService,
               private loader: AppLoaderService,
               @Optional() public dialogRef: MatDialogRef<RecepcionDocumentosComponent>  ) { }

  ngOnInit(): void {
    this.initForm();
    this.cargarData();
  }

  initForm() {
    this.recepcionDocsForm = this.formBuilder.group({
      CLAVE_LUGAR: [''],
      ANIO: [''],
      CONTROL: [''],
      TIPO: [''],
      ID: [''],
      DOCUMENTO: [''],
      OBSERVACIONES: [''],
      USUARIO: [''],
      FCH_REG: [''],
      FCH_UAC: ['']
    });
  }

  cargarData() {
    this._documentosService.obtenerDocumentosExisten(this.dataRecepcionDocumentosInfo.clave, this.dataRecepcionDocumentosInfo.anio, this.dataRecepcionDocumentosInfo.control).subscribe((res: any) => {
      
      if ( res.tipos.length > 0 ) {
        res.tipos.map(x => {
          if ( x.number == 1 ) {
            this.info01 = true;
            this.data01 = true;
          } else if ( x.number == 2 ) {
            this.info02 = true;
            this.data02 = true;
          } else if ( x.number == 3 ) {
            this.info03 = true;
            this.data03 = true;
          } else if ( x.number == 4 ) {
            this.info04 = true;
            this.data04 = true;
          } else if ( x.number == 5 ) {
            this.info05 = true;
            this.data05 = true;
          } else if ( x.number == 6 ) {
            this.info06 = true;
            this.data06 = true;
          } else if ( x.number == 7 ) {
            this.info07 = true;
            this.data07 = true;
          } else if ( x.number == 8 ) {
            this.info08 = true;
            this.data08 = true;
          } else if ( x.number == 9 ) {
            this.info09 = true;
            this.data09 = true;
          } else if ( x.number == 10 ) {
            this.info10 = true;
            this.data10 = true;
          } else if ( x.number == 11 ) {
            this.info11 = true;
            this.data11 = true;
          } else if ( x.number == 12 ) {
            this.info12 = true;
            this.data12 = true;
          } else if ( x.number == 13 ) {
            this.info13 = true;
            this.data13 = true;
          } else if ( x.number == 14 ) {
            this.info14 = true;
            this.data14 = true;
          } else if ( x.number == 15 ) {
            this.info15 = true;
            this.data15 = true;
          } else if ( x.number == 16 ) {
            this.info16 = true;
            this.data16 = true;
          } else if ( x.number == 17 ) {
            this.info17 = true;
            this.data17 = true;
          }
        });
      }

    });

    this.usuario = this._authService.getUserClave();
  }

  cargar01( tipoDocumento ) {
    this._documentosService.obtenerInfoDocumentos(this.dataRecepcionDocumentosInfo.clave, this.dataRecepcionDocumentosInfo.anio, this.dataRecepcionDocumentosInfo.control, tipoDocumento).subscribe((res: any) => {
      if (  res.documentos.length > 0 && !this.flag01 ) {
        for (let i = 0; i < res.documentos.length; i++) {
          this.docs01.push(res.documentos[i].DOCUMENTO);
        }
        this.flag01 = true;
      }
    });
  }

  cargar02( tipoDocumento ) {
    this._documentosService.obtenerInfoDocumentos(this.dataRecepcionDocumentosInfo.clave, this.dataRecepcionDocumentosInfo.anio, this.dataRecepcionDocumentosInfo.control, tipoDocumento).subscribe((res: any) => {
      if (  res.documentos.length > 0 && !this.flag02 ) {
        for (let i = 0; i < res.documentos.length; i++) {
          this.docs02.push(res.documentos[i].DOCUMENTO);
        }
        this.flag02 = true;
      }
    });
  }

  cargar03( tipoDocumento ) {
    this._documentosService.obtenerInfoDocumentos(this.dataRecepcionDocumentosInfo.clave, this.dataRecepcionDocumentosInfo.anio, this.dataRecepcionDocumentosInfo.control, tipoDocumento).subscribe((res: any) => {
      if (  res.documentos.length > 0 && !this.flag03 ) {
        for (let i = 0; i < res.documentos.length; i++) {
          this.docs03.push(res.documentos[i].DOCUMENTO);
        }
        this.flag03 = true;
      }
    });
  }

  cargar04( tipoDocumento ) {
    this._documentosService.obtenerInfoDocumentos(this.dataRecepcionDocumentosInfo.clave, this.dataRecepcionDocumentosInfo.anio, this.dataRecepcionDocumentosInfo.control, tipoDocumento).subscribe((res: any) => {
      if (  res.documentos.length > 0 && !this.flag04 ) {
        for (let i = 0; i < res.documentos.length; i++) {
          this.docs04.push(res.documentos[i].DOCUMENTO);
        }
        this.flag04 = true;
      }
    });
  }

  cargar05( tipoDocumento ) {
    this._documentosService.obtenerInfoDocumentos(this.dataRecepcionDocumentosInfo.clave, this.dataRecepcionDocumentosInfo.anio, this.dataRecepcionDocumentosInfo.control, tipoDocumento).subscribe((res: any) => {
      if (  res.documentos.length > 0 && !this.flag05 ) {
        for (let i = 0; i < res.documentos.length; i++) {
          this.docs05.push(res.documentos[i].DOCUMENTO);
        }
        this.flag05 = true;
      }
    });
  }

  cargar06( tipoDocumento ) {
    this._documentosService.obtenerInfoDocumentos(this.dataRecepcionDocumentosInfo.clave, this.dataRecepcionDocumentosInfo.anio, this.dataRecepcionDocumentosInfo.control, tipoDocumento).subscribe((res: any) => {
      if (  res.documentos.length > 0 && !this.flag06 ) {
        for (let i = 0; i < res.documentos.length; i++) {
          this.docs06.push(res.documentos[i].DOCUMENTO);
        }
        this.flag06 = true;
      }
    });
  }

  cargar07( tipoDocumento ) {
    this._documentosService.obtenerInfoDocumentos(this.dataRecepcionDocumentosInfo.clave, this.dataRecepcionDocumentosInfo.anio, this.dataRecepcionDocumentosInfo.control, tipoDocumento).subscribe((res: any) => {
      if (  res.documentos.length > 0 && !this.flag07 ) {
        for (let i = 0; i < res.documentos.length; i++) {
          this.docs07.push(res.documentos[i].DOCUMENTO);
        }
        this.flag07 = true;
      }
    });
  }

  cargar08( tipoDocumento ) {
    this._documentosService.obtenerInfoDocumentos(this.dataRecepcionDocumentosInfo.clave, this.dataRecepcionDocumentosInfo.anio, this.dataRecepcionDocumentosInfo.control, tipoDocumento).subscribe((res: any) => {
      if (  res.documentos.length > 0 && !this.flag08 ) {
        for (let i = 0; i < res.documentos.length; i++) {
          this.docs08.push(res.documentos[i].DOCUMENTO);
        }
        this.flag08 = true;
      }
    });
  }

  cargar09( tipoDocumento ) {
    this._documentosService.obtenerInfoDocumentos(this.dataRecepcionDocumentosInfo.clave, this.dataRecepcionDocumentosInfo.anio, this.dataRecepcionDocumentosInfo.control, tipoDocumento).subscribe((res: any) => {
      if (  res.documentos.length > 0 && !this.flag09 ) {
        for (let i = 0; i < res.documentos.length; i++) {
          this.docs09.push(res.documentos[i].DOCUMENTO);
        }
        this.flag09 = true;
      }
    });
  }

  cargar10( tipoDocumento ) {
    this._documentosService.obtenerInfoDocumentos(this.dataRecepcionDocumentosInfo.clave, this.dataRecepcionDocumentosInfo.anio, this.dataRecepcionDocumentosInfo.control, tipoDocumento).subscribe((res: any) => {
      if (  res.documentos.length > 0 && !this.flag10 ) {
        for (let i = 0; i < res.documentos.length; i++) {
          this.docs10.push(res.documentos[i].DOCUMENTO);
        }
        this.flag10 = true;
      }
    });
  }

  cargar11( tipoDocumento ) {
    this._documentosService.obtenerInfoDocumentos(this.dataRecepcionDocumentosInfo.clave, this.dataRecepcionDocumentosInfo.anio, this.dataRecepcionDocumentosInfo.control, tipoDocumento).subscribe((res: any) => {
      if (  res.documentos.length > 0 && !this.flag11 ) {
        for (let i = 0; i < res.documentos.length; i++) {
          this.docs11.push(res.documentos[i].DOCUMENTO);
        }
        this.flag11 = true;
      }
    });
  }

  cargar12( tipoDocumento ) {
    this._documentosService.obtenerInfoDocumentos(this.dataRecepcionDocumentosInfo.clave, this.dataRecepcionDocumentosInfo.anio, this.dataRecepcionDocumentosInfo.control, tipoDocumento).subscribe((res: any) => {
      if (  res.documentos.length > 0 && !this.flag12 ) {
        for (let i = 0; i < res.documentos.length; i++) {
          this.docs12.push(res.documentos[i].DOCUMENTO);
        }
        this.flag12 = true;
      }
    });
  }

  cargar13( tipoDocumento ) {
    this._documentosService.obtenerInfoDocumentos(this.dataRecepcionDocumentosInfo.clave, this.dataRecepcionDocumentosInfo.anio, this.dataRecepcionDocumentosInfo.control, tipoDocumento).subscribe((res: any) => {
      if (  res.documentos.length > 0 && !this.flag13 ) {
        for (let i = 0; i < res.documentos.length; i++) {
          this.docs13.push(res.documentos[i].DOCUMENTO);
        }
        this.flag13 = true;
      }
    });
  }

  cargar14( tipoDocumento ) {
    this._documentosService.obtenerInfoDocumentos(this.dataRecepcionDocumentosInfo.clave, this.dataRecepcionDocumentosInfo.anio, this.dataRecepcionDocumentosInfo.control, tipoDocumento).subscribe((res: any) => {
      if (  res.documentos.length > 0 && !this.flag14 ) {
        for (let i = 0; i < res.documentos.length; i++) {
          this.docs14.push(res.documentos[i].DOCUMENTO);
        }
        this.flag14 = true;
      }
    });
  }

  cargar15( tipoDocumento ) {
    this._documentosService.obtenerInfoDocumentos(this.dataRecepcionDocumentosInfo.clave, this.dataRecepcionDocumentosInfo.anio, this.dataRecepcionDocumentosInfo.control, tipoDocumento).subscribe((res: any) => {
      if (  res.documentos.length > 0 && !this.flag15 ) {
        for (let i = 0; i < res.documentos.length; i++) {
          this.docs15.push(res.documentos[i].DOCUMENTO);
        }
        this.flag15 = true;
      }
    });
  }

  cargar16( tipoDocumento ) {
    this._documentosService.obtenerInfoDocumentos(this.dataRecepcionDocumentosInfo.clave, this.dataRecepcionDocumentosInfo.anio, this.dataRecepcionDocumentosInfo.control, tipoDocumento).subscribe((res: any) => {
      if (  res.documentos.length > 0 && !this.flag16 ) {
        for (let i = 0; i < res.documentos.length; i++) {
          this.docs16.push(res.documentos[i].DOCUMENTO);
        }
        this.flag16 = true;
      }
    });
  }

  cargar17( tipoDocumento ) {
    this._documentosService.obtenerInfoDocumentos(this.dataRecepcionDocumentosInfo.clave, this.dataRecepcionDocumentosInfo.anio, this.dataRecepcionDocumentosInfo.control, tipoDocumento).subscribe((res: any) => {
      if (  res.documentos.length > 0 && !this.flag17 ) {
        for (let i = 0; i < res.documentos.length; i++) {
          this.docs17.push(res.documentos[i].DOCUMENTO);
        }
        this.flag17 = true;
      }
    });
  }
  
  crearRegistro( recepcionDocsForm: any, tipoDocumento: any, docs: any[] ) {
    const documentos = recepcionDocsForm.value;

    const documentosData: any = {
      CLAVE_LUGAR: this.dataRecepcionDocumentosInfo.clave,
      ANIO: this.dataRecepcionDocumentosInfo.anio,
      CONTROL: this.dataRecepcionDocumentosInfo.control,
      TIPO: tipoDocumento,
      DOCUMENTO: docs,
      OBSERVACIONES: documentos.OBSERVACIONES,
      USUARIO: this.usuario
    }

    this.loader.open('Guardando...');
    console.log('estoy guardando');
    this._documentosService.guardarDocumentos(documentosData).subscribe(res => {
      this.loader.close();
      Swal.fire({
        icon: 'success',
        title: 'Información Guardada Correctamente',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar'
      });
      // this.closeDialog();
      this.cargarData();
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

  actualizarRegistro( recepcionDocsForm: any, tipoDocumento: any, docs: any[] ) {
    const documentos = recepcionDocsForm.value;

    const documentosData: any = {
      CLAVE_LUGAR: this.dataRecepcionDocumentosInfo.clave,
      ANIO: this.dataRecepcionDocumentosInfo.anio,
      CONTROL: this.dataRecepcionDocumentosInfo.control,
      TIPO: tipoDocumento,
      DOCUMENTO: docs,
      OBSERVACIONES: documentos.OBSERVACIONES,
      USUARIO: this.usuario
    }

    this.loader.open('Guardando...');
    console.log('estoy guardando');
    this._documentosService.actualizarDocumentos(this.dataRecepcionDocumentosInfo.clave, this.dataRecepcionDocumentosInfo.anio, this.dataRecepcionDocumentosInfo.control, tipoDocumento, documentosData).subscribe(res => {
      this.loader.close();
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Información actualizada correctamente.',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar'
      });
      // this.closeDialog();
      this.cargarData();
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

  removeImage(index, tipoDocumento): void {
    if ( tipoDocumento == 1 ) {
      this.docs01.splice(index, 1);
    } else if ( tipoDocumento == 2 ) {
      this.docs02.splice(index, 1);
    } else if ( tipoDocumento == 3 ) {
      this.docs03.splice(index, 1);
    } else if ( tipoDocumento == 4 ) {
      this.docs04.splice(index, 1);
    } else if ( tipoDocumento == 5 ) {
      this.docs05.splice(index, 1);
    } else if ( tipoDocumento == 6 ) {
      this.docs06.splice(index, 1);
    } else if ( tipoDocumento == 7 ) {
      this.docs07.splice(index, 1);
    } else if ( tipoDocumento == 8 ) {
      this.docs08.splice(index, 1);
    } else if ( tipoDocumento == 9 ) {
      this.docs09.splice(index, 1);
    } else if ( tipoDocumento == 10 ) {
      this.docs10.splice(index, 1);
    } else if ( tipoDocumento == 11 ) {
      this.docs11.splice(index, 1);
    } else if ( tipoDocumento == 12 ) {
      this.docs12.splice(index, 1);
    } else if ( tipoDocumento == 13 ) {
      this.docs13.splice(index, 1);
    } else if ( tipoDocumento == 14 ) {
      this.docs14.splice(index, 1);
    } else if ( tipoDocumento == 15 ) {
      this.docs15.splice(index, 1);
    } else if ( tipoDocumento == 16 ) {
      this.docs16.splice(index, 1);
    } else if ( tipoDocumento == 17 ) {
      this.docs17.splice(index, 1);
    }
  }

  fileChange(input, tipoDocumento) {
    if ( tipoDocumento == 1 ) {
      this.readFiles01(input.files);
    } else if ( tipoDocumento == 2 ) {
      this.readFiles02(input.files);
    } else if ( tipoDocumento == 3 ) {
      this.readFiles03(input.files);
    } else if ( tipoDocumento == 4 ) {
      this.readFiles04(input.files);
    } else if ( tipoDocumento == 5 ) {
      this.readFiles05(input.files);
    } else if ( tipoDocumento == 6 ) {
      this.readFiles06(input.files);
    } else if ( tipoDocumento == 7 ) {
      this.readFiles07(input.files);
    } else if ( tipoDocumento == 8 ) {
      this.readFiles08(input.files);
    } else if ( tipoDocumento == 9 ) {
      this.readFiles09(input.files);
    } else if ( tipoDocumento == 10 ) {
      this.readFiles10(input.files);
    } else if ( tipoDocumento == 11 ) {
      this.readFiles11(input.files);
    } else if ( tipoDocumento == 12 ) {
      this.readFiles12(input.files);
    } else if ( tipoDocumento == 13 ) {
      this.readFiles13(input.files);
    } else if ( tipoDocumento == 14 ) {
      this.readFiles14(input.files);
    } else if ( tipoDocumento == 15 ) {
      this.readFiles15(input.files);
    } else if ( tipoDocumento == 16 ) {
      this.readFiles16(input.files);
    } else if ( tipoDocumento == 17 ) {
      this.readFiles17(input.files);
    } 
  }
  
  readFile(file, reader, callback) {
    reader.onload = () => {
      callback(reader.result);
    }
    reader.readAsDataURL(file);
  }

  readFiles01(files, index = 0) {
    let reader = new FileReader();
    const tipo = files[0].type;

    if ( tipo === 'image/jpeg' ) {

      if (index in files) {
        // const type = files[index].name.split('.').pop();
        // const type2 = files[index].type.split('/')[0];
        this.readFile(files[index], reader, (result) => {
          this.docs01.push(result);
          // result = result.replace("data:image/png;base64,", "");
          // result = result.replace("data:image/jpeg;base64,", "");
          // result = result.replace("data:video/mp4;base64,", "");

          this.readFiles01(files, index + 1);
        });
        this.info01 = true;
      }
    } else {
      Swal.fire('Error', 'El archivo seleccionado no es pdf', 'error');
    }
  }

  readFiles02(files, index = 0) {
    let reader = new FileReader();
    const tipo = files[0].type;

    if ( tipo === 'image/jpeg' ) {

      if (index in files) {
        // const type = files[index].name.split('.').pop();
        // const type2 = files[index].type.split('/')[0];
        this.readFile(files[index], reader, (result) => {
          this.docs02.push(result);
          // result = result.replace("data:image/png;base64,", "");
          // result = result.replace("data:image/jpeg;base64,", "");
          // result = result.replace("data:video/mp4;base64,", "");

          this.readFiles02(files, index + 1);
        });
        this.info02 = true;
      }
    } else {
      Swal.fire('Error', 'El archivo seleccionado no es pdf', 'error');
    }
  }

  readFiles03(files, index = 0) {
    let reader = new FileReader();
    const tipo = files[0].type;

    if ( tipo === 'image/jpeg' ) {

      if (index in files) {
        // const type = files[index].name.split('.').pop();
        // const type2 = files[index].type.split('/')[0];
        this.readFile(files[index], reader, (result) => {
          this.docs03.push(result);
          // result = result.replace("data:image/png;base64,", "");
          // result = result.replace("data:image/jpeg;base64,", "");
          // result = result.replace("data:video/mp4;base64,", "");

          this.readFiles03(files, index + 1);
        });
        this.info03 = true;
      }
    } else {
      Swal.fire('Error', 'El archivo seleccionado no es pdf', 'error');
    }
  }

  readFiles04(files, index = 0) {
    let reader = new FileReader();
    const tipo = files[0].type;

    if ( tipo === 'image/jpeg' ) {

      if (index in files) {
        // const type = files[index].name.split('.').pop();
        // const type2 = files[index].type.split('/')[0];
        this.readFile(files[index], reader, (result) => {
          this.docs04.push(result);
          // result = result.replace("data:image/png;base64,", "");
          // result = result.replace("data:image/jpeg;base64,", "");
          // result = result.replace("data:video/mp4;base64,", "");

          this.readFiles04(files, index + 1);
        });
        this.info04 = true;
      }
    } else {
      Swal.fire('Error', 'El archivo seleccionado no es pdf', 'error');
    }
  }

  readFiles05(files, index = 0) {
    let reader = new FileReader();
    const tipo = files[0].type;

    if ( tipo === 'image/jpeg' ) {

      if (index in files) {
        // const type = files[index].name.split('.').pop();
        // const type2 = files[index].type.split('/')[0];
        this.readFile(files[index], reader, (result) => {
          this.docs05.push(result);
          // result = result.replace("data:image/png;base64,", "");
          // result = result.replace("data:image/jpeg;base64,", "");
          // result = result.replace("data:video/mp4;base64,", "");

          this.readFiles05(files, index + 1);
        });
        this.info05 = true;
      }
    } else {
      Swal.fire('Error', 'El archivo seleccionado no es pdf', 'error');
    }
  }

  readFiles06(files, index = 0) {
    let reader = new FileReader();
    const tipo = files[0].type;

    if ( tipo === 'image/jpeg' ) {

      if (index in files) {
        // const type = files[index].name.split('.').pop();
        // const type2 = files[index].type.split('/')[0];
        this.readFile(files[index], reader, (result) => {
          this.docs06.push(result);
          // result = result.replace("data:image/png;base64,", "");
          // result = result.replace("data:image/jpeg;base64,", "");
          // result = result.replace("data:video/mp4;base64,", "");

          this.readFiles06(files, index + 1);
        });
        this.info06 = true;
      }
    } else {
      Swal.fire('Error', 'El archivo seleccionado no es pdf', 'error');
    }
  }

  readFiles07(files, index = 0) {
    let reader = new FileReader();
    const tipo = files[0].type;

    if ( tipo === 'image/jpeg' ) {

      if (index in files) {
        // const type = files[index].name.split('.').pop();
        // const type2 = files[index].type.split('/')[0];
        this.readFile(files[index], reader, (result) => {
          this.docs07.push(result);
          // result = result.replace("data:image/png;base64,", "");
          // result = result.replace("data:image/jpeg;base64,", "");
          // result = result.replace("data:video/mp4;base64,", "");

          this.readFiles07(files, index + 1);
        });
        this.info07 = true;
      }
    } else {
      Swal.fire('Error', 'El archivo seleccionado no es pdf', 'error');
    }
  }

  readFiles08(files, index = 0) {
    let reader = new FileReader();
    const tipo = files[0].type;

    if ( tipo === 'image/jpeg' ) {

      if (index in files) {
        // const type = files[index].name.split('.').pop();
        // const type2 = files[index].type.split('/')[0];
        this.readFile(files[index], reader, (result) => {
          this.docs08.push(result);
          // result = result.replace("data:image/png;base64,", "");
          // result = result.replace("data:image/jpeg;base64,", "");
          // result = result.replace("data:video/mp4;base64,", "");

          this.readFiles08(files, index + 1);
        });
        this.info08 = true;
      }
    } else {
      Swal.fire('Error', 'El archivo seleccionado no es pdf', 'error');
    }
  }

  readFiles09(files, index = 0) {
    let reader = new FileReader();
    const tipo = files[0].type;

    if ( tipo === 'image/jpeg' ) {

      if (index in files) {
        // const type = files[index].name.split('.').pop();
        // const type2 = files[index].type.split('/')[0];
        this.readFile(files[index], reader, (result) => {
          this.docs09.push(result);
          // result = result.replace("data:image/png;base64,", "");
          // result = result.replace("data:image/jpeg;base64,", "");
          // result = result.replace("data:video/mp4;base64,", "");

          this.readFiles09(files, index + 1);
        });
        this.info09 = true;
      }
    } else {
      Swal.fire('Error', 'El archivo seleccionado no es pdf', 'error');
    }
  }

  readFiles10(files, index = 0) {
    let reader = new FileReader();
    const tipo = files[0].type;

    if ( tipo === 'image/jpeg' ) {

      if (index in files) {
        // const type = files[index].name.split('.').pop();
        // const type2 = files[index].type.split('/')[0];
        this.readFile(files[index], reader, (result) => {
          this.docs10.push(result);
          // result = result.replace("data:image/png;base64,", "");
          // result = result.replace("data:image/jpeg;base64,", "");
          // result = result.replace("data:video/mp4;base64,", "");

          this.readFiles10(files, index + 1);
        });
        this.info10 = true;
      }
    } else {
      Swal.fire('Error', 'El archivo seleccionado no es pdf', 'error');
    }
  }

  readFiles11(files, index = 0) {
    let reader = new FileReader();
    const tipo = files[0].type;

    if ( tipo === 'image/jpeg' ) {

      if (index in files) {
        // const type = files[index].name.split('.').pop();
        // const type2 = files[index].type.split('/')[0];
        this.readFile(files[index], reader, (result) => {
          this.docs11.push(result);
          // result = result.replace("data:image/png;base64,", "");
          // result = result.replace("data:image/jpeg;base64,", "");
          // result = result.replace("data:video/mp4;base64,", "");

          this.readFiles11(files, index + 1);
        });
        this.info11 = true;
      }
    } else {
      Swal.fire('Error', 'El archivo seleccionado no es pdf', 'error');
    }
  }

  readFiles12(files, index = 0) {
    let reader = new FileReader();
    const tipo = files[0].type;

    if ( tipo === 'image/jpeg' ) {

      if (index in files) {
        // const type = files[index].name.split('.').pop();
        // const type2 = files[index].type.split('/')[0];
        this.readFile(files[index], reader, (result) => {
          this.docs12.push(result);
          // result = result.replace("data:image/png;base64,", "");
          // result = result.replace("data:image/jpeg;base64,", "");
          // result = result.replace("data:video/mp4;base64,", "");

          this.readFiles12(files, index + 1);
        });
        this.info12 = true;
      }
    } else {
      Swal.fire('Error', 'El archivo seleccionado no es pdf', 'error');
    }
  }

  readFiles13(files, index = 0) {
    let reader = new FileReader();
    const tipo = files[0].type;

    if ( tipo === 'image/jpeg' ) {

      if (index in files) {
        // const type = files[index].name.split('.').pop();
        // const type2 = files[index].type.split('/')[0];
        this.readFile(files[index], reader, (result) => {
          this.docs13.push(result);
          // result = result.replace("data:image/png;base64,", "");
          // result = result.replace("data:image/jpeg;base64,", "");
          // result = result.replace("data:video/mp4;base64,", "");

          this.readFiles13(files, index + 1);
        });
        this.info13 = true;
      }
    } else {
      Swal.fire('Error', 'El archivo seleccionado no es pdf', 'error');
    }
  }

  readFiles14(files, index = 0) {
    let reader = new FileReader();
    const tipo = files[0].type;

    if ( tipo === 'image/jpeg' ) {

      if (index in files) {
        // const type = files[index].name.split('.').pop();
        // const type2 = files[index].type.split('/')[0];
        this.readFile(files[index], reader, (result) => {
          this.docs14.push(result);
          // result = result.replace("data:image/png;base64,", "");
          // result = result.replace("data:image/jpeg;base64,", "");
          // result = result.replace("data:video/mp4;base64,", "");

          this.readFiles14(files, index + 1);
        });
        this.info14 = true;
      }
    } else {
      Swal.fire('Error', 'El archivo seleccionado no es pdf', 'error');
    }
  }

  readFiles15(files, index = 0) {
    let reader = new FileReader();
    const tipo = files[0].type;

    if ( tipo === 'image/jpeg' ) {

      if (index in files) {
        // const type = files[index].name.split('.').pop();
        // const type2 = files[index].type.split('/')[0];
        this.readFile(files[index], reader, (result) => {
          this.docs15.push(result);
          // result = result.replace("data:image/png;base64,", "");
          // result = result.replace("data:image/jpeg;base64,", "");
          // result = result.replace("data:video/mp4;base64,", "");

          this.readFiles15(files, index + 1);
        });
        this.info15 = true;
      }
    } else {
      Swal.fire('Error', 'El archivo seleccionado no es pdf', 'error');
    }
  }

  readFiles16(files, index = 0) {
    let reader = new FileReader();
    const tipo = files[0].type;

    if ( tipo === 'image/jpeg' ) {

      if (index in files) {
        // const type = files[index].name.split('.').pop();
        // const type2 = files[index].type.split('/')[0];
        this.readFile(files[index], reader, (result) => {
          this.docs16.push(result);
          // result = result.replace("data:image/png;base64,", "");
          // result = result.replace("data:image/jpeg;base64,", "");
          // result = result.replace("data:video/mp4;base64,", "");

          this.readFiles16(files, index + 1);
        });
        this.info16 = true;
      }
    } else {
      Swal.fire('Error', 'El archivo seleccionado no es pdf', 'error');
    }
  }

  readFiles17(files, index = 0) {
    let reader = new FileReader();
    const tipo = files[0].type;

    if ( tipo === 'image/jpeg' ) {

      if (index in files) {
        // const type = files[index].name.split('.').pop();
        // const type2 = files[index].type.split('/')[0];
        this.readFile(files[index], reader, (result) => {
          this.docs17.push(result);
          // result = result.replace("data:image/png;base64,", "");
          // result = result.replace("data:image/jpeg;base64,", "");
          // result = result.replace("data:video/mp4;base64,", "");

          this.readFiles17(files, index + 1);
        });
        this.info17 = true;
      }
    } else {
      Swal.fire('Error', 'El archivo seleccionado no es pdf', 'error');
    }
  }

  viewImage(images: any) {
    this.dialog.showComponent(ViewImageComponent, {
      width: '90%',
      height: '90%',
      disableClose: true,
      data: {
        imagen: images
      }
    }).subscribe(res => {
      // console.log('res :>> ', res);

    });
  }

  showPdfDocumento( documento, titulo ) {
    this.dialog.showComponent(VisorPdfComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: {
        documento,
        titulo,
      }
    }).subscribe(res => {
      // console.log(res);
    });
  }

}
