import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  CurrentUser: User;
  email: string | null;
  constructor(
    private auth: AuthService,
    private localStorageService: LocalstorageService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEmailFromLS();
    this.getCurrentUser();
  }

  isAuthenticated() {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }

  getEmailFromLS() {
    if (this.localStorageService.getItem("email")) {
      this.email = this.localStorageService.getItem("email")
    }

  }

  getCurrentUser() {
    if (this.email) {
      this.userService.getByMail(this.email).subscribe(response => {
        this.CurrentUser = response.data[0];
      })
    }

  }

  logOut() {
    this.localStorageService.deleteItem("token");
    this.localStorageService.deleteItem("email");
    this.router.navigateByUrl("/").then(() => window.location.reload());
  }

}
