import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dealer } from '../dealer-dashboard/dealer.model';
import { Crops } from '../farmer-dashboard/farmer-dashboard';

@Injectable({
  providedIn: 'root'
})
export class DealerServiceService {

  constructor(private http:HttpClient) { }

  getDealers(){
    return  this.http.get("http://localhost:8082/dealer/finddealer");
  }

  //get crops
  getLiveCrops():Observable<Crops[]>
  {
    return this.http.get<Crops[]>("http://localhost:2222/crop/findcrops");
  }

  getDealerDetails(dealerid:string):Observable<Dealer[]>
  {
    return this.http.get<Dealer[]>("http://localhost:8082/dealer/getdealer/"+dealerid);
  }

  //update
  updateDealerDetails(dealer:Dealer):Observable<Dealer[]>
  {
    return this.http.put<Dealer[]>("http://localhost:8082/dealer/updatedealer", dealer);
  }

  //delete
  deleteDealerDetails(dealerid:string):Observable<Dealer[]>
  {
    return this.http.delete<Dealer[]>("http://localhost:8002/delete/"+dealerid);
  }
}
