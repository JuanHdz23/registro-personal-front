import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';
import Swal from 'sweetalert2';
import { CustomValidators } from 'ngx-custom-validators';
import { AuthService } from '../../../services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  changeForm: FormGroup;
  fotoUser: any;
  dataUsuario: any;
  rol: any;
  constructor(private router: Router,
    private UsuariosService: UsuariosService,
    private AuthService: AuthService,
    private fb: FormBuilder) { }



  ngOnInit() {
    this.initForm();
    this.rol = this.AuthService.getUserNombreRol();
    // this.UsuariosService.getFoto(this.AuthService.getUserId()).subscribe(res => {
    //   this.fotoUser = environment.API_URL_FOTO + res
    // });
    this.UsuariosService.getUsuarioId(this.AuthService.getUserId()).subscribe(res => {
      this.dataUsuario = res[0];
      console.log('dataUsuario :>> ', this.dataUsuario);
    });
  }



  initForm() {

    let password = new FormControl('', Validators.required);
    let comfirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.changeForm = this.fb.group({
      username: [localStorage.getItem('Username') || ''],
      currentPassword: [[''], [Validators.required]],
      newPassword: password,
      newPassword2: comfirmPassword
    });

  }


  change() {

    console.log(this.changeForm.value)
    this.UsuariosService.changePassword(this.AuthService.getUserId(), this.changeForm.value).subscribe(resp => {
      console.log(resp);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Contraseña actulizada correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    }, (err) => {
      Swal.fire('Error', err.error.Message, 'error');
      console.log(err)
    });

  }

}
