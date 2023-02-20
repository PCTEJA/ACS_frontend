import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-farmer',
  templateUrl: './login-farmer.component.html',
  styleUrls: ['./login-farmer.component.css']
})
export class LoginFarmerComponent implements OnInit {

  farmeremail:any
  fcredentials={
    username:'',
    password:''
  }

  constructor(private loginService: LoginService, private router:Router) { }

  ngOnInit(): void {
  }

  backToHome()
  {
    this.router.navigate(["/landing-page"])
  }
  onSubmit(){
    console.log("Form is Submitted");

    if((this.fcredentials.username!='' && this.fcredentials.password!='') && (this.fcredentials.username!=null && this.fcredentials.password!=null))
    {
      console.log("Save the form to server")
      this.loginService.generateTokenFarmer(this.fcredentials).subscribe(
        (response: any) => {
          console.log(response); 
          
          this.loginService.loginUser(response.response)
          //window.location.href="/dealer-dashboard" 
          this.router.navigate(['/farmer-dashboard',this.fcredentials.username])
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
