import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  currentUser: User;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private localstorageService: LocalstorageService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.LoginFormControl();
  }

  LoginFormControl() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      let login = Object.assign({}, this.loginForm.value);
      this.auth.login(login).subscribe(response => {
        console.log(response.data.token);
        if (response.success) {
          this.localstorageService.setItem("token", response.data.token);
          this.localstorageService.setItem("email", this.loginForm.value.email);
          this.userService.getByMail(this.loginForm.value.email).subscribe(response => {
            this.userService.currentUser = response.data[0];
          })
          this.toastr.info(response.message, "Başarılı")
          window.location.reload();
        }
      }, error => {
        console.log(error)
        this.toastr.error(error.error.message, "Hata")
      })
    } else {
      this.toastr.error("Bilgierinizi doğru giriniz...", "Hata")
    }

  }
}
