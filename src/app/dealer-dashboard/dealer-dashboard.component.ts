import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Crops } from '../farmer-dashboard/farmer-dashboard';
import { Farmer } from '../farmer-details/farmer-detail.model';
import { DealerServiceService } from '../services/dealer-service.service';
import { FarmerServiceService } from '../services/farmer-service.service';
import { LoginService } from '../services/login.service';
import { Dealer } from './dealer.model';
import { CartService } from '../services/cart.service';
import { Cart } from './cart.model';
import Swal from 'sweetalert2';
import {PaymentInfo} from '../payment/paymentinfo';

declare var Razorpay: any;
@Component({
  selector: 'app-dealer-dashboard',
  templateUrl: './dealer-dashboard.component.html',
  styleUrls: ['./dealer-dashboard.component.css']
})
export class DealerDashboardComponent implements OnInit {
  public loggedIn=false;
  liveCrops:Crops[];
  liveCropsViewObject:Crops = new Crops();
  searchText:any;
  oneFarmer:Farmer;
  dealeremail:any;
  formValue!:FormGroup;
  dealerDetails:Dealer;
  buyObject:Crops;
  dealerObject: Dealer = new Dealer();
  dealerId: any;
  cart:Cart = new Cart();
  paymentId:'';
  error:'';
  payment: PaymentInfo={
    customerName : '',
    email: '',
    amount : 0,
    phoneNumber: ''
  }
  options = {
    "key": "",
    "amount": "", 
    "name": "Payment Gate-Way",
    "description": "Kindly Pay!",
    "image": "https://www.javachinna.com/wp-content/uploads/2020/02/android-chrome-512x512-1.png",
    "order_id":"",
    "handler": function (response:any){
      var event = new CustomEvent("payment.success", 
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );	  
      window.dispatchEvent(event);
    }
    ,
    "prefill": {
    "name": "",
    "email": "",
    "contact": ""
    },
    "notes": {
    "address": ""
    },
    "theme": {
    "color": "#3399cc"
    }
    };
  //dealerId: string = "62376af69be2d36022834c6f";

  constructor(private formBuilder: FormBuilder,private farmerService: FarmerServiceService,private route: ActivatedRoute,private router: Router,private loginService: LoginService, private dealerService: DealerServiceService, private cartService: CartService){}

  ngOnInit(): void {
    this.loggedIn=this.loginService.isLoggedIn();
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
    this.getDealerDetails();
    this.getLiveCrops();
    // this.liveCrops = this.dealerDetails.crops;
    // this.getOneFarmerDetails();
    
  }
  logoutUser()
  {
    this.loginService.logout()
    location.reload()
  }

  onSelect()
  {
    this.router.navigate(['/dealer-dashboard',this.dealerId,this.dealerId]);
  }

 //fetch crops
 getLiveCrops()
 {
 this.dealerService.getLiveCrops().subscribe((data:any[])=> {
   console.log(data);
   this.liveCrops= data;
   //this.liveCrops = Array.of(this.liveCrops); 
 })
}

onBuyRes(data:any)
{
  this.formValue.controls['uploadedBy'].setValue(data.uploadedBy);
  this.formValue.controls['id'].setValue(data.id);
  this.formValue.controls['price'].setValue(data.price);
  this.formValue.controls['cropQuantity'].setValue(data.cropQuantity);
  if(this.dealerDetails.crops == null){
    this.dealerDetails.crops = [data];
  }else{
    this.dealerDetails.crops.push(data);
  }
  
  this.dealerService.updateDealerDetails(this.dealerDetails).subscribe((data:any) =>{
  console.log(data);
  }
  );
  
  if(this.dealerDetails.crops.length == 1){
    this.cart.cartId = this.dealerDetails.dealerEmail;
    this.cart.price = data.price;
    this.cart.quantity = data.cropQuantity;
    this.cart.userId = this.dealerDetails.dealerEmail;
    this.cartService.addCart(this.cart).subscribe((data:any) => {
      console.log(data);
    });
  }else{
    this.cartService.searchCartByUserId(this.dealerDetails.dealerEmail).subscribe(data => {
        this.cart = data[0];
    });

    const q1 = parseInt(data.cropQuantity);
    const q2 = parseInt(this.cart.quantity);
    const ans1 = (q1 + q2);

    const price = parseFloat(data.price);
    const price2 = parseFloat(this.cart.price);
    const ans = (price + price2);

    this.cart.price = (ans).toString();
    this.cart.quantity = (ans1).toString();
    this.cartService.updateCart(this.cart).subscribe((data:any)=>{
      console.log(data);
    });
  }
}

//get the farmerDetails of the selected crop
oneRes(data:any)
{
  this.oneFarmer.farmerId = data.uploadedBy;
  this.getOneFarmerDetails();
}

getOneFarmerDetails()
{
  
  this.farmerService.getFarmerDetails(this.liveCropsViewObject.uploadedBy).subscribe((data:any)=>
  {
    console.log(data);
    this.oneFarmer=data;
    
  })
}

getDealerDetails()
{
  this.dealerService.getDealerDetails(this.dealerId).subscribe((resp:any)=>
  {
    console.log(resp);
    this.dealerDetails = resp;
    //this.dealerDetails = Array.of(this.dealerDetails);

  })
}

onliveCropsViewRes(res:any)
{
 
  this.liveCropsViewObject.id = res.id;
  this.liveCropsViewObject.cropName = res.cropName;
  this.liveCropsViewObject.uploadedBy = res.uploadedBy;
  this.liveCropsViewObject.location = res.location;
  this.liveCropsViewObject.price = res.price;
  this.liveCropsViewObject.cropType = res.cropType;
  this.liveCropsViewObject.cropQuantity = res.cropQuantity;
}

public makepayment(){
  this.cartService.searchCartByUserId(this.dealerDetails.dealerEmail).subscribe(data => {
    this.cart = data[0];
});
  this.payment.customerName = this.dealerDetails.dealerName;
  this.payment.amount = Number(this.cart.price);
  this.payment.email = this.dealerDetails.dealerEmail;
  this.payment.phoneNumber = this.dealerDetails.dealerContactNo;
    Swal.fire({
      title: 'Make Payment?',
      text: this.cart.price + " Rupees will be deducted from your Account.",
      icon: 'warning',
      position:'center-start',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        
          this.paymentId = ''; 
          this.error = ''; 
          this.cartService.createOrder(this.payment).subscribe(
          data => {
            // this.options.key = data.secretId;
            // this.options.order_id = data.razorpayOrderId;
            // this.options.amount = data.applicationFee; //paise
            this.options.prefill.name = "Capgemini";
            this.options.prefill.email = "acs.cg@gmail.com";
            this.options.prefill.contact = this.dealerDetails.dealerEmail;
            
            
              this.options.image="";
              var rzp1 = new Razorpay(this.options);
              rzp1.open();
            

            rzp1.on('payment.failed',  (response:any) =>{    
              // Todo - store this information in the server
              console.log(response);
              console.log(response.error.code);    
              console.log(response.error.description);    
              console.log(response.error.source);    
              console.log(response.error.step);    
              console.log(response.error.reason);    
              console.log(response.error.metadata.order_id);    
              console.log(response.error.metadata.payment_id);
              this.error = response.error.reason;
            }
            );
          }
        
          // err => {
          //   this.error = err.error.message;
          // }
          );
        
    

        
        
      }
    })
  
}

@HostListener('window:payment.success', ['$event']) 
onPaymentSuccess(event:any): void {
 console.log(event.detail);
 Swal.fire({
  title: 'Congratulations Payment is done successfully!!',
  text:  "Amount has been deducted from your Account.",
  icon: 'success',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Done!'
}).then((result) => {
  window.location.reload();
});
}
}