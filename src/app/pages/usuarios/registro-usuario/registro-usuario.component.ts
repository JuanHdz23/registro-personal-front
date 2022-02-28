import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppDialogService } from 'src/app/services/common/app-dialog/app-dialog.service';
//  import { CustomValidators } from 'ng2-validation';
import { usuario, Roles } from '../usuarios.model';
// import { RegistroUsuarioService } from '../registro-usuario.service';
import { AppLoaderService } from 'src/app/services/common/app-loader/app-loader.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from '../../../services/usuarios.service';
import { CustomValidators } from 'ngx-custom-validators';
import { CatalogosService } from '../../../services/common/catalogos/catalogos.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})
export class RegistroUsuarioComponent implements OnInit {
  public image: any;
  lugar: any;
  rol: any;
  clavesCat: any;
  UsuarioFoto: any;
  dialogHeader: string = "Usuarios";
  usuariosForm: FormGroup;
  PersonalesForm: FormGroup;
  fotoForm: FormGroup;
  usuarioForm: FormGroup;
  id = 0;
  Roles: Roles[] = [
    { Id: 1, Rol: "Administrador" },
    { Id: 2, Rol: "Medicina Legal" },
    { Id: 3, Rol: "Criminalistica" },
    { Id: 4, Rol: "Identificación" },
    { Id: 5, Rol: "dactiloscopia" },
    { Id: 6, Rol: "Toxicología" },
    { Id: 7, Rol: "Química" },
    { Id: 8, Rol: "Genética" },
    { Id: 9, Rol: "Clasificación" }
  ]
  dataActualizarUsuario: any;
  isLinear = true;
  constructor(
    private formBuilder: FormBuilder,
    private dialog: AppDialogService,
    private usuariosService: UsuariosService,
    private loader: AppLoaderService,
    private CatalogosService: CatalogosService,
    @Optional() public dialogRef: MatDialogRef<RegistroUsuarioComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.CatalogosService.getClaveLugar().subscribe(x => {
      console.log('x :>> ', x);
      this.clavesCat = x;
    });
    this.initForm();
    this.cargarUsuarioEditar();
  }

  initForm() {
    this.PersonalesForm = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.compose([Validators.required, soloLetrasValidator])],
      apPaterno: ['', Validators.compose([Validators.required, soloLetrasValidator])],
      apMaterno: ['', Validators.compose([Validators.required, soloLetrasValidator])],
      observaciones: [''],
      clave_lugar: ['', Validators.required],
      Celular: ['', Validators.compose([Validators.required, celularValidator])],
      CorreoElectronico: ['', Validators.compose([Validators.required, emailValidator])]
    });
    let password = new FormControl('', Validators.required);
    let comfirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.usuarioForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: password,
      comfirmPassword: comfirmPassword,
      cveEmpleado: ['', Validators.required],
      Rol: ['', Validators.required],
    });

    this.fotoForm = this.formBuilder.group({
      Foto: ['', Validators.required],
    });

    this.onChanges();
  }
  type: any;
  fileChange(input) {
    const reader = new FileReader();
    if (input.files.length) {
      const file = input.files[0];
      const type = file.name.split('.').pop();
      this.type = type;
      const tipo = file.type;
      if (tipo === 'image/jpeg' || tipo === 'image/png') {
        reader.onload = () => {
          this.image = reader.result;
          var result = String(reader.result);
          result = result.replace("data:image/png;base64,", "");
          result = result.replace("data:image/jpeg;base64,", "");
          this.UsuarioFoto = result;
          console.log('result :>> ', result);
        }
        reader.readAsDataURL(file);
      } else {
        this.dialog.show("Error", "El archivo seleccionado no es formato de imagen");
      }

    }
  }

  removeImage(): void {
    this.image = '';
    this.UsuarioFoto = '';
  }


  formatUsuario(registroUsuario: any) {
    return {
      id: this.id,
      nombre: registroUsuario.Nombre,
      apPaterno: registroUsuario.ApellidoPaterno,
      apMaterno: registroUsuario.ApellidoMaterno,
      usuario: registroUsuario.Usuario1,
      password: registroUsuario.Password,
      comfirmPassword: registroUsuario.Password,
      cveEmpleado: registroUsuario.CveEmpleado,
      Rol: registroUsuario.Rol,
      observaciones: registroUsuario.Observaciones
    };
  }

  cargarUsuarioEditar() {
    console.log(this.data.usuario);
    if (this.data.usuario != undefined) {
      this.dataActualizarUsuario = this.data.usuario
      const data = this.formatUsuario(this.data.usuario);
      console.log(data)
      this.usuariosForm.setValue(data);
    }
  }

  addUsuario() {
    const usuarioData = this.usuarioForm.value;
    const fotoData = this.fotoForm.value;
    const personalData = this.PersonalesForm.value;
    console.log('hola :>> ');
    if (this.fotoForm.valid && this.usuarioForm.valid && this.PersonalesForm.valid) {


      // if (this.dataActualizarUsuario) {
      //   var responsableData = this.usuariosForm.value;
      //   this.id = this.dataActualizarUsuario.Id;
      //   console.log("editando" + this.id);
      // } else {
      //   var responsableData = this.usuariosForm.value;
      //   console.log("agregando")
      // }

      const agregarUsuario: usuario = {
        Id: this.id,
        Nombre: personalData.nombre,
        ApellidoPaterno: personalData.apPaterno,
        ApellidoMaterno: personalData.apMaterno,
        Usuario1: usuarioData.usuario,
        Password: usuarioData.password,
        Observaciones: usuarioData.observaciones,
        CveEmpleado: usuarioData.cveEmpleado,
        EsActivo: true,
        Rol: usuarioData.Rol,
        IdUsuarioRegistro: 1,
        FechaRegistro: new Date(Date.now()),
        IdUsuarioModificacion: null,
        FechaModificacion: null,
        Foto: this.UsuarioFoto,
        Type: this.type,
        salt: [],
        clave_lugar: personalData.clave_lugar,
        CorreoElectronico: personalData.CorreoElectronico,
        Celular: personalData.Celular
      }

      console.log(agregarUsuario);

      this.dialog.confirm('Confirmar', '¿Desea guardar el usuario?').subscribe(res => {
        if (res) {
          this.loader.open('Guardando usuario...');
          if (agregarUsuario != null) {
            if (agregarUsuario.Id == 0) {
              this.usuariosService.agregarUsuario(agregarUsuario).subscribe(res => {
                this.dialogRef.close();
                this.loader.close();
                this.dialog.show('Guardado éxitoso', 'El usuario se creo correctamente.');
              }, err => {
                console.log(err);
                this.loader.close();
                this.dialog.show('Error', err.message);
              });
            } else {
              // this.loader.open('Guardando usuario...');
              // this.usuariosService.editarUsuario(agregarUsuario).subscribe(res => {

              //   this.usuariosForm.markAsPristine();
              //   this.dialogRef.close();
              //   this.loader.close();
              //   this.dialog.show('Actualización éxitosa', 'El usuario fue actualizado correctamente.');

              // }, err => {
              //   console.log(err);
              //   this.loader.close();
              //   this.dialog.show('Error', 'Ocurrió un error al procesar su solicitud, favor de verificar la información proporcionada.');
              // });
            }
          }

        }
      });


    } else {
      this.dialog.show('Registro incompleto',
        'Verifique los datos capturados, tiene datos requeridos sin capturar.');
    }
  }

  onChanges() {
    this.PersonalesForm.controls['clave_lugar'].valueChanges.subscribe(x => {
      const clavelugar = x;
      this.lugar = this.clavesCat.find(l => l.CLAVE_LUGAR === clavelugar);
    });

    this.usuarioForm.controls['Rol'].valueChanges.subscribe(x => {
      const claveRol = x;
      this.rol = this.Roles.find(l => l.Id === claveRol);
    });
  }
}
export function emailValidator(control: FormControl): { [key: string]: any } {
  var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
}

export function celularValidator(control: FormControl): { [key: string]: any } {
  var celularRegexp = /^(?:\D*\d){10}\D*$/;
  console.log('contro.value :>> ', control.value);
  if (control.value && !celularRegexp.test(control.value)) {
    return { invalidCelular: true };
  }


}

export function soloLetrasValidator(control: FormControl): { [key: string]: any } {
  var celularRegexp = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g;
  console.log('contro.value :>> ', control.value);
  if (control.value && !celularRegexp.test(control.value)) {
    return { invalidLetras: true };
  }


}

