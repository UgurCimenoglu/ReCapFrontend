import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/cardetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class CardetailService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = "https://localhost:44372/api/";

  GetCarDetails(): Observable<ListResponseModel<CarDetail>> {
    let newPath = `${this.apiUrl}cars/getdetail`;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

  GetCarDetailsByBrand(brandId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = `${this.apiUrl}cars/getdetailbybrandid?brandId=${brandId}`;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  GetCarDetailByColor(colorId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = `${this.apiUrl}cars/getdetailbycolorid?colorId=${colorId}`;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  GetCarDetailByCarId(carId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = `${this.apiUrl}cars/getdetailbycarid?carId=${carId}`;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  GetCarDetailByBrandIdAndColorId(brandId: number, colorId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = `${this.apiUrl}cars/getcarsdetailbybrandandcolor?brandId=${brandId}&colorId=${colorId}`;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = `${this.apiUrl}cars/getall`;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(CarId: number): Observable<ListResponseModel<Car>> {
    let newPath = `${this.apiUrl}cars/getbycarid?carId=${CarId}`;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  AddCar(car: Car): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}cars/add`;
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  updateCar(car: Car): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}cars/update`;
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
}
