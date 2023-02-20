import { Component, OnInit, Input} from '@angular/core';
import { FarmerServiceService } from '../services/farmer-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Farmer } from './farmer-detail.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Crops } from '../farmer-dashboard/farmer-dashboard';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-farmer-details',
  templateUrl: './farmer-details.component.html',
  styleUrls: ['./farmer-details.component.css']
})
export class FarmerDetailsComponent implements OnInit {

  public farmerId: any;
  public loggedIn=false;
  storeFarmerDetails:Farmer;
  dummyprofileimage:any;
  formValue!: FormGroup
  updatedFarmerDetails: Farmer = new Farmer();
  updatedBankDetails: Farmer;

  constructor(private route: ActivatedRoute, private farmerService:FarmerServiceService,private router: Router, private loginService: LoginService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loggedIn=this.loginService.isLoggedIn();
    this.formValue = this.formBuilder.group(
          {
            farmerId:[''],
            farmerName:[''],
            farmeremail:[''],
            farmerContactNo:[''],
            farmerAddress:[''],
            bankDetails:[''],
             crops:[Crops]
           }
         )
         let farmerId = String(this.route.snapshot.paramMap.get('tk') || '');
         this.farmerId = farmerId;
    console.log("check", this.farmerId);
    this.getFarmerDetails();
    //this.formfunction
    console.log(this.storeFarmerDetails);
  }
  logoutUser()
  {
    this.loginService.logout()
    location.reload()
  }
  onSelect()
  {
    this.router.navigate(['/farmer-dashboard',this.farmerId,this.farmerId]);
  }
  //form Builder
  // formfunction()
  // {
  //   this.formValue1 = this.formBuilder.group(
  //     {
  //       fid:[''],
  //       femail:[''],
  //       fpass:[''],
  //       fname: [''],
  //       fcontact:[''],
  //       fbank:[''],
  //       fimage:[''],
  //       faccountno:[''],
  //       fpaytmid:[''],
  //       fbankbranch:[''],
  //       flocation:[''],
  //       fabout: ['']
  //     }
  //   )
  // }

  getFarmerDetails()
  {
    this.farmerService.getFarmerDetails(this.farmerId).subscribe((res:any)=>
    {
      
      console.log(res);
      this.storeFarmerDetails = res;
    })
  }

  updateRes()
  { 

    this.formValue.controls['farmerId'].setValue(this.storeFarmerDetails.farmerId);
    this.formValue.controls['farmerName'].setValue(this.storeFarmerDetails.farmerName);
    this.formValue.controls['farmeremail'].setValue(this.storeFarmerDetails.farmeremail);
    this.formValue.controls['farmerContactNo'].setValue(this.storeFarmerDetails.farmerContactNo);
    this.formValue.controls['farmerAddress'].setValue(this.storeFarmerDetails.farmerAddress);
    this.formValue.controls['bankDetails'].setValue(this.storeFarmerDetails.bankDetails);
  }

  updateFarmerDetails()
  {
    this.updatedFarmerDetails.farmerId = this.formValue.value.farmerId;
    this.updatedFarmerDetails.farmerName = this.formValue.value.farmerName;
    this.updatedFarmerDetails.farmeremail= this.formValue.value.farmeremail;
    this.updatedFarmerDetails.crops = this.storeFarmerDetails.crops;
    this.updatedFarmerDetails.farmerContactNo = this.formValue.value.farmerContactNo;
    this.updatedFarmerDetails.farmerAddress = this.formValue.value.farmerAddress;
    this.updatedFarmerDetails.bankDetails = this.formValue.value.bankDetails;

    this.farmerService.updateFarmerDetails(this.updatedFarmerDetails)
    .subscribe((res:any)=>
    {
      console.log(res);
      alert("Profile Updated");
      this.getFarmerDetails();
      
    },
    err=>
    {
      alert("Profile Updated");
      this.getFarmerDetails();
      
    })
  }

  //delete farmer
  deleteFarmer()
  {
    this.farmerService.deleteFarmer(this.storeFarmerDetails.farmerId).subscribe((res:any)=>
    {
      console.log(res);
      alert("Farmer Deleted");
      this.getFarmerDetails();
    })
  }
}
