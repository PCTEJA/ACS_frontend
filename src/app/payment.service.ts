import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Crops } from './farmer-dashboard/farmer-dashboard';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  submitPaymentDetails(CUST_ID:string, TXN_AMOUNT:string, ORDER_ID:string):Observable<any>
  {
    return this.http.post<any>("http://localhost:8080/submitPaymentDetail",);
  }
}
