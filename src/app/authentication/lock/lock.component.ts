import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { LoginService } from '../../services/auth/login.service';
@Component({
  selector: 'app-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.css']
})
export class LockComponent implements OnInit {
    userName: any;
  constructor(private AuthService:AuthService,private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.userName = this.AuthService.getUserName();

    //this.AuthService.logout();
  }
  public loginForm = this.fb.group({
    Username: [this.AuthService.getUserName()],
    Password:[[],[Validators.required]],
});


  login() {
    // console.log(this.loginForm.value)
    this.loginService.login(this.loginForm.value).subscribe(resp => {
      // console.log(resp);
      this.router.navigateByUrl('/');
    }, (err) => {
        Swal.fire('Error',err.error.Message,'error');
        console.log(err)
    });

  }

}
