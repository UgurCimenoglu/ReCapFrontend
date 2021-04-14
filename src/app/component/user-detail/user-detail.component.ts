import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(
    private userService: UserService,
    private localStorageService: LocalstorageService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  UserEmail: string | null;
  user: User;
  userForm: FormGroup;

  ngOnInit(): void {
    this.getEmailFromLocalStorage();
    this.getUserByMail();
  }

  UserFormControl() {
    this.userForm = this.formBuilder.group({
      email: [this.user ? this.user.email : '', [Validators.required, Validators.email]],
      firstName: [this.user ? this.user.firstName : '', [Validators.required, Validators.minLength(2)]],
      lastName: [this.user ? this.user.lastName : '', [Validators.required, Validators.minLength(2)]]
    })
  }

  getEmailFromLocalStorage() {
    this.UserEmail = this.localStorageService.getItem("email");
  }

  getUserByMail() {
    if (this.UserEmail) {
      this.userService.getByMail(this.UserEmail).subscribe(response => {
        this.user = response.data[0];
        console.log(this.user)
        this.UserFormControl();
      })
    }
  }

  updateUser() {
    if (this.userForm.valid) {
      console.log(this.userForm.value)
      let user = Object.assign({ id: 32 }, this.userForm.value);
      this.userService.updateUser(user).subscribe(response => {
        if (response.success) {
          window.location.reload();
          this.toastr.success(response.message, "Başarılı");
        }
        else {
          this.toastr.error(response.message, "Hata")
        }
      }, error => {
        this.toastr.error(error.error.Message, "Beklenmeyen Hata")
      })
    }
  }


}
