
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../login-admin/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService{

  constructor(private http:HttpClient) { }


  generateTokenAdmin(dcredentials: any){
    return this.http.post("http://localhost:7777/Admin/signin", dcredentials)
  }

  loginUser(token: string)
  {
    localStorage.setItem("token", token)
    //location.reload();
    return true;
  }

  isLoggedIn()
  {
    let token=localStorage.getItem("token");
    if (token==undefined || token==='' || token === null || token == "Failed Authentication")
    {
      return false;
    } 
    else{
      return true;
    }
  }

  logout()
  {
    localStorage.removeItem('token');
    location.reload();
    return true;
  }

  getToken()
  {return localStorage.getItem("token")}


  //get user email
 getUser(token: string) : Admin
  {

    return JSON.parse(atob(token.split('.')[1])).sub as Admin;
  }

}
