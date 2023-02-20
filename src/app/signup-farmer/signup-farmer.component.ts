import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-signup-farmer',
  templateUrl: './signup-farmer.component.html',
  styleUrls: ['./signup-farmer.component.css']
})
export class SignupFarmerComponent implements OnInit {

  credentials:any={
    "farmeremail":"",
    "password":"",
    "farmerName":"",
    "farmerContactNo":"",
    "farmerAddress":"",
    "bankDetails":""
   
  };

  addfarmer:any={
    "farmerId": "",
    "farmerName":"",
    "farmeremail":"",
    "farmerContactNo":"",
    "farmerAddress":"",
    "bankDetails":""
  };

  adduser:any={
    "username":"",
    "email": "",
    "password":""
  };
  
  formValue!: FormGroup;

  constructor(private service:LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  backToHome()
  {
    this.router.navigate(["/landing-page"])
  }

  onSingup()
  {
    this.adduser.username = this.credentials.farmeremail
    this.adduser.password = this.credentials.password
    this.adduser.email = this.credentials.farmeremail

    this.addfarmer.farmerAddress = this.credentials.farmerAddress
    this.addfarmer.farmeremail = this.credentials.farmeremail
    this.addfarmer.farmerName = this.credentials.farmerName
    this.addfarmer.bankDetails = this.credentials.bankDetails
    this.addfarmer.farmerContactNo = this.credentials.farmerContactNo
    this.addfarmer.farmerId = this.credentials.farmeremail


    this.service.registerFarmer(this.adduser)
    .subscribe((data:any)=>
    {
      console.log(data);
      
    });
    this.service.addFarmer(this.addfarmer).subscribe((data:any)=>
    {
      console.log(data);
      this.router.navigate(['login-farmer']);
      
    });
  }

}
