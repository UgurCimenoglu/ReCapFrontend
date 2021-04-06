import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient: HttpClient) { }
  apiUrl = "https://localhost:44372/api/";

  getColors(): Observable<ListResponseModel<Color>> {
    let newPath = `${this.apiUrl}color/getall`;
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  addColor(color: Color): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}color/add`;
    return this.httpClient.post<ResponseModel>(newPath, color);
  }

  updateColor(color: Color): Observable<ResponseModel> {
    let newpath = `${this.apiUrl}color/update`;
    return this.httpClient.post<ResponseModel>(newpath, color)
  }

  deleteColor(color: Color): Observable<ResponseModel> {
    let newpath = `${this.apiUrl}color/delete`;
    return this.httpClient.post<ResponseModel>(newpath, color);
  }
}
