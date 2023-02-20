import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-signup-dealer',
  templateUrl: './signup-dealer.component.html',
  styleUrls: ['./signup-dealer.component.css']
})
export class SignupDealerComponent implements OnInit {

  dcredentials:any={
    "id":"",
    "dealerName" : "",
		"dealerEmail" : "",
		"dealerContactNo" : "",
		"dealerAddress" : "",
		"bankDetail" : "",
    "passWord":""
  };


  adduser:any={
    "username":"",
    "password":"",
    "email":""
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

    this.adduser.username = this.dcredentials.dealerEmail
    this.adduser.email = this.dcredentials.dealerEmail
    this.adduser.password = this.dcredentials.passWord

    this.dcredentials.id = this.dcredentials.dealerEmail

    this.service.registerDealer(this.adduser)
    .subscribe((data:any)=>
    {
      console.log(data);

      
    });

    this.service.addDealer(this.dcredentials)
    .subscribe((data:any)=>
    {
      console.log(data);
      this.router.navigate(['login']);
      
    });

  }
}
