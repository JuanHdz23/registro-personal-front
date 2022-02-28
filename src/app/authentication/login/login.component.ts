import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { LoginService } from '../../services/auth/login.service';
import { AuthService } from '../../services/auth/auth.service';
import { AppLoaderService } from 'src/app/services/common/app-loader/app-loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder,
    private AuthService: AuthService,
    private loader: AppLoaderService
  ) {

    // console.log(this.loginForm)
  }

  loginform = true;
  recoverform = false;

  public loginForm = this.fb.group({
    USER: [localStorage.getItem('USER') || '', [Validators.required]],
    PASSWORD: [[], [Validators.required]],
    Remember: [false]
  });

  ngOnInit() {
    if (localStorage.getItem('USER')) {
      this.loginForm.controls['Remember'].setValue(true);
    }
  }

  login() {

    this.loader.open('Ingresando...');
    // console.log(this.loginForm.value);

    this.loginService.login(this.loginForm.value).subscribe(resp => {
      // console.log(resp);
      this.loader.close();
      this.AuthService.setPermissions();
      if (this.loginForm.get('Remember').value) {
        localStorage.setItem('USER', this.loginForm.get('USER').value);
      } else {
        localStorage.removeItem('USER');
      }
      if (this.AuthService.getUserRol()==9) {
        this.router.navigateByUrl('/expediente');
      }else{
         this.router.navigateByUrl('/expediente');
      }

    }, (err) => {
      this.loader.close();
      Swal.fire('Error', err.error.Message, 'error');
      console.log(err);
    });

  }

}
