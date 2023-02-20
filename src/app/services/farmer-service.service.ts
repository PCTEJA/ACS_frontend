import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { Crops } from '../farmer-dashboard/farmer-dashboard';
import { Farmer } from '../farmer-details/farmer-detail.model';


@Injectable({
  providedIn: 'root'
})
export class FarmerServiceService {

  constructor(private http:HttpClient) { }

  /*public getDetails()
  {
    return this.http.get("http://localhost:8001/62109c6e54d8ceb199635f32",{responseType:'text' as'json'});
  }*/


  getFarmers(){
    return this.http.get("http://localhost:1111/farmer/findfarmers");
  }
  getDetails(fid:string):Observable<Farmer>
  {
    return this.http.get<Farmer>("http://localhost:1111/farmer/getFarmerById/"+fid);
  }


  addCrops(crops:Crops): Observable<Crops[]>
  {
    return this.http.post<Crops[]>("http://localhost:2222/crop/addcrop", crops);
  }

  //update
  updateCrops(crops:Crops): Observable<Crops[]>
  {
    return this.http.put<Crops[]>("http://localhost:2222/crop/updatecrop", crops);
    
  }
  //delete
  deleteAd(fid:string,cropid:number) : Observable<Crops[]>
  {
    return this.http.delete<Crops[]>("http://localhost:8001/"+fid+"/delete/"+cropid);
  }

  //getfarmerDetails
  getFarmerDetails(fid:string): Observable<Farmer[]>
  {
    return this.http.get<Farmer[]>("http://localhost:1111/farmer/getFarmerById/"+fid);
  }

  //get farmer details by email
  getFarmerDetailsByEmail(femail:string):Observable<Farmer[]>
  {
    return this.http.get<Farmer[]>("http://localhost:8001/farmer/"+femail);
  }

  //update farmer details
  updateFarmerDetails(farmer:Farmer): Observable<Farmer[]>
  {
    return this.http.put<Farmer[]>("http://localhost:1111/farmer/updatefarmer",farmer);
  }

  //delete farmer
  deleteFarmer(fid:string): Observable<Farmer[]>
  {
    return this.http.delete<Farmer[]>("http://localhost:8001/delete/"+fid);
  }
}
