import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetail } from '../models/rentaldetail';


@Injectable({
  providedIn: 'root'
})
export class RentaldetailService {

  constructor(private httpClient: HttpClient) { }
  apiUrl = "https://localhost:44372/api/rental/getdetails";

  getRentalDetail(): Observable<ListResponseModel<RentalDetail>> {
    return this.httpClient.get<ListResponseModel<RentalDetail>>(this.apiUrl);
  }
}
