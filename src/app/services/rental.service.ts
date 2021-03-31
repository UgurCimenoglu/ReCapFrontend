import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private httpClient: HttpClient) { }
  rentCart:Rental;

  apiUrl = "https://localhost:44372/api/"

  RentACar(rent: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl+"rental/rent";
    return this.httpClient.post<ResponseModel>(newPath, rent);
  }

}
