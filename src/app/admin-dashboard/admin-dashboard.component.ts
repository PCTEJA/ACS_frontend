import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Crops } from '../farmer-dashboard/farmer-dashboard';
import { Farmer } from '../farmer-details/farmer-detail.model';
import { DealerServiceService } from '../services/dealer-service.service';
import { FarmerServiceService } from '../services/farmer-service.service';
import { AdminService } from '../services/admin.service';
import { LoginService } from '../services/login.service';
import {Admin} from '../login-admin/admin.model';
import { Dealer } from '../dealer-dashboard/dealer.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {


  
  @Component({
    selector: 'app-dealer-dashboard',
    templateUrl: './dealer-dashboard.component.html',
    styleUrls: ['./dealer-dashboard.component.css']
  })
  
    public loggedIn=false;
    liveCrops:Crops[] = [];
    liveCropsViewObject:Crops = new Crops();
    searchText:any;
    oneFarmer:Farmer;
    dealeremail:any;
    formValue!:FormGroup;
    dealerDetails:Dealer;
    buyObject:Crops;
    dealerId: any;
    farmers: Farmer[] = [];
    dealers: Dealer[];
    //dealerId: string = "62376af69be2d36022834c6f";
  
    constructor(private formBuilder: FormBuilder,private farmerService: FarmerServiceService,private route: ActivatedRoute,private router: Router,private adminService: AdminService, private dealerService: DealerServiceService){}
  
    ngOnInit(): void {
      this.loggedIn=this.adminService.isLoggedIn();
      let id = String(this.route.snapshot.paramMap.get('token') || '');
      this.dealerId = id;
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
      this.getLiveCrops();
      this.getFarmers();
      this.getDealers();
      
    }
    
    getLiveCrops(){
    this.dealerService.getLiveCrops().subscribe((data:any[])=> {
   console.log(data);
   this.liveCrops= data;
   //this.liveCrops = Array.of(this.liveCrops); 
    })
    }
    getFarmers(){
      this.farmerService.getFarmers().subscribe((data:any) =>{
        console.log(data);
        this.farmers = data;
      })
    }
    getDealers(){
      this.dealerService.getDealers().subscribe((data:any) => {
        console.log(data);
        this.dealers = data;
        console.log("data inside dealers: ", this.dealers);
      })
    }
logoutUser()
  {
    this.adminService.logout()
    location.reload()
  }


}
