import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User;
  apiUrl = "https://localhost:44372/api/user/";
  constructor(private httpClient: HttpClient) { }


  getByMail(email: string): Observable<ListResponseModel<User>> {
    let newPath = `${this.apiUrl}getuserbymail?email=${email}`;
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  updateUser(user: User): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}update`;
    return this.httpClient.post<ResponseModel>(newPath, user);
  }

}
