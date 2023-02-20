import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { __spreadArrays } from 'tslib';
import { Farmer } from '../farmer-details/farmer-detail.model';
import { FarmerServiceService } from '../services/farmer-service.service';
import { LoginService } from '../services/login.service';
import { Crops } from './farmer-dashboard';

@Component({
  selector: 'app-farmer-dashboard',
  templateUrl: './farmer-dashboard.component.html',
  styleUrls: ['./farmer-dashboard.component.css']
})
export class FarmerDashboardComponent implements OnInit {

  cropsObject: Crops = new Crops();
  public loggedIn=false;
  public email:any;
  cropsEditObject: Crops= new Crops();
  crops: any;
  fetchedbyemail:Farmer[];
  searchText:any;
  farmerDetails: Farmer;
  farmerId:any;
  //farmerId: string ="62388868431ff25ebe08edd6";
  formValue!: FormGroup
  dummycropimage:any;
  cropsViewObject: Crops = new Crops();

  constructor(private route: ActivatedRoute,private loginService: LoginService, private router: Router, private formBuilder: FormBuilder,private farmerService:FarmerServiceService) {
   }

  ngOnInit(): void {
    this.loggedIn=this.loginService.isLoggedIn();
    let farmerId = String(this.route.snapshot.paramMap.get('tk') || '');
    this.farmerId = farmerId;
    this.formfunction();  
    this.getCrops();
    this.getFarmerDetails();
    
    }
  logoutUser()
  {
    this.loginService.logout()
    location.reload()
  }

    //form Builder
    formfunction()
    {
      this.formValue = this.formBuilder.group(
        {

          id:[''],
          cropName:[''],
          cropType:[''],
          location: [''],
          uploadedBy:[''],
          cropQuantity: [''],
          price: [''],
     
        }
      )
    }

  
    onSelectionFile(event:any)
    {
      ​​​​​​const reader = new FileReader();
      if(event.target.files && event.target.files.length) 
      {
        ​​​​​​const [file] = event.target.files;
        reader.readAsDataURL(file);
        retrievedImage: this.getCrops;
        reader.onload = () => {​​​​​​
          this.formValue.patchValue({​​​​​​
            cropimage: reader.result
          }​​​​​​);
          //this.getProduct();  
        }​​​​​​
      }​​​​​​ 
    }​​​​​



    //onselect
     onSelect()
     {
       this.router.navigate(['/farmer-dashboard',this.farmerId,this.farmerId]);
     }


    //fetch crops
    getCrops()
    {
      this.farmerService.getDetails(this.farmerId).subscribe((data:Farmer)=> {
        console.log(data);
        this.crops= data.crops;
        //this.crops = Array.of(this.crops); 
    })
  }
    //add crops
    save()
    {
      console.log("Trying to Add Crop");
      this.cropsObject.id = this.farmerId + this.formValue.value.id;
      this.cropsObject.cropName = this.formValue.value.cropName;
      this.cropsObject.cropType = this.formValue.value.cropType;
      this.cropsObject.location = [this.formValue.value.location];
      this.cropsObject.uploadedBy = this.formValue.value.uploadedBy;
      this.cropsObject.cropQuantity = this.formValue.value.cropQuantity;
      this.cropsObject.price = this.formValue.value.price;


      this.farmerDetails.crops.push(this.cropsObject);
      this.updateFarmer();


      this.farmerService.addCrops(this.cropsObject).subscribe((data:any[])=> {
        console.log(data)});
        alert("Crop Added");
        this.formValue.reset();        
    }

    onViewRes(data1:any)
    {

      this.cropsViewObject.id = data1.id;
      this.cropsViewObject.cropName = data1.cropName;
      this.cropsViewObject.cropType = data1.cropType;
      this.cropsViewObject.cropQuantity = data1.cropQuantity;
      this.cropsViewObject.uploadedBy = data1.uploadedBy;
      this.cropsViewObject.location = data1.location;
      this.cropsViewObject.price = data1.price;
    }

  onEditRes(data:any)
  {
    this.dummycropimage = data.cropimage;

    this.formValue.controls['id'].setValue(data.id);
    this.formValue.controls['cropName'].setValue(data.cropName);
    this.formValue.controls['cropType'].setValue(data.cropType);
    this.formValue.controls['location'].setValue(data.location);
    this.formValue.controls['uploadedBy'].setValue(data.uploadedBy);
    this.formValue.controls['cropQuantity'].setValue(data.cropQuantity);
    this.formValue.controls['price'].setValue(data.price);
  }

  cropUpdate()
  {
    this.cropsEditObject.id = this.formValue.value.id;
    this.cropsEditObject.cropName = this.formValue.value.cropName;
    this.cropsEditObject.cropType = this.formValue.value.cropType;
    this.cropsEditObject.location = this.formValue.value.location;
    this.cropsEditObject.uploadedBy = this.formValue.value.uploadedBy;
    this.cropsEditObject.cropQuantity = this.formValue.value.cropQuantity;
    this.cropsEditObject.price = this.formValue.value.price;
    
    //console.log(this.cropsObject)
    
    this.farmerDetails.crops = this.farmerDetails.crops.filter((item) => item.id !== this.cropsEditObject.id);
    
    this.farmerDetails.crops.push(this.cropsEditObject);
    
    console.log("after", this.farmerDetails);
    this.updateFarmer();
    
    this.farmerService.updateCrops(this.cropsEditObject).subscribe((data:any[])=> {
      console.log("value", this.cropsEditObject);
      console.log(data)});
      alert("Crop Updated");
      this.formValue.reset();
  }

  //delete
  AdDelete(data:any)
  {
    this.farmerService.deleteAd(data.fid,data.cropid).subscribe((res:any[])=>{
      console.log(res);
      alert("Record Deleted");
      this.getCrops();
    },
    err => {
      alert("Record Deleted");
      this.getCrops();
  });
}

getFarmerDetails()
{
  this.farmerService.getFarmerDetails(this.farmerId).subscribe((res:any)=>
  {
    console.log(res);
    this.farmerDetails = res;
  })
}
updateFarmer(){
  this.farmerService.updateFarmerDetails(this.farmerDetails).subscribe((data:any)=> {
  console.log(data);
})
}
}
