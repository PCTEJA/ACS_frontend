import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AdminService } from '../services/admin.service'
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  email:any
  resStore:string
  credentials={
    username:'',
    password:''
  }
    constructor(private adminService: AdminService, private router:Router)
    {}

    ngOnInit(): void {
      
    } 

    backToHome()
  {
    this.router.navigate(["/landing-page"])
  }

    onSubmit(){
      console.log("Form is Submitted");
      console.log(this.credentials);

      if((this.credentials.username!='' && this.credentials.password!='') && (this.credentials.username!=null && this.credentials.password!=null))
      {
        console.log("Save the form to server")
        this.adminService.generateTokenAdmin(this.credentials).subscribe(
          (response: any) => {
            console.log(this.credentials);
            console.log(response); 
            
            this.adminService.loginUser(response.response)
            //window.location.href="/dealer-dashboard" 
            this.router.navigate(['/admin-dashboard',this.credentials.username])
          },
  
          error=>{
            console.log(error);
          }
        )
      }
      else{
        console.log("Fields are empty");
      }
    }
    
  }