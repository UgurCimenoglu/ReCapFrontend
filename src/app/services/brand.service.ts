import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient: HttpClient) { }
  apiUrl = "https://localhost:44372/api/";

  getBrand(): Observable<ListResponseModel<Brand>> {
    let newPath = `${this.apiUrl}brand/getall`;
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  addBrand(brand: Brand): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}brand/add`;
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }

  updateBrand(brand: Brand) {
    let newPath = `${this.apiUrl}brand/update`;
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }

  deleteBrand(brand: Brand) {
    let newPath = `${this.apiUrl}brand/delete`;
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }
}
