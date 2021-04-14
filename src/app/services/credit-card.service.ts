import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(
    private httpClient: HttpClient
  ) { }

  apiUrl = "https://localhost:44372/api/";

  getCreditCardByCustomerId(customerId: number): Observable<ListResponseModel<CreditCard>> {
    let newPath = `${this.apiUrl}creditcard/getbycustomerid?customerId=${customerId}`;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  getCreditCards(): Observable<ListResponseModel<CreditCard>> {
    let newPath = `${this.apiUrl}creditcard/getall`;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  updateCredtiCard(creditCard: CreditCard) {
    let newPath = `${this.apiUrl}creditcard/update`;
    return this.httpClient.post<ResponseModel>(newPath, creditCard);
  }

  deleteCreditCard(creditCard: CreditCard) {
    let newPath = `${this.apiUrl}creditcard/delete`;
    return this.httpClient.post<ResponseModel>(newPath, creditCard);
  }

  addCreditCard(creditCard: CreditCard) {
    let newPath = `${this.apiUrl}creditcard/add`;
    return this.httpClient.post<ResponseModel>(newPath, creditCard);
  }
}
