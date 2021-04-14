import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = "https://localhost:44372/api/auth/";

  login(login: Login) {
    let newPath = `${this.apiUrl}login`;
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, login)
  }

  isAuthenticated() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false
    }
  }

  register(register: Register) {
    let newPath = `${this.apiUrl}register`;
    return this.httpClient.post<ResponseModel>(newPath, register);
  }
}
