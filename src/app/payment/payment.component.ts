import { Component, HostListener, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { DealerServiceService } from '../services/dealer-service.service';
import { FarmerServiceService } from '../services/farmer-service.service';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';
import {PaymentInfo} from './paymentinfo';
import { Cart } from '../dealer-dashboard/cart.model';
import { CartService } from '../services/cart.service';
import { Dealer } from '../dealer-dashboard/dealer.model';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public _opened: boolean = false;
  orders:any=[];
  paymentId: string='';
  error: string='';
  cart:Cart;
  
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
    
    ngOnInit(): void {
      
    }
  constructor(private cartService:CartService) {}
  
  
   public _toggleSidebar() {
    this._opened = !this._opened;
  }
  public makepayment(dealer:Dealer, cart:Cart){
    this.payment.customerName = dealer.dealerName;
    this.payment.amount = Number(cart.price);
    this.payment.email = dealer.dealerEmail;
    this.payment.phoneNumber = dealer.dealerContactNo;
      Swal.fire({
        title: 'Make Payment?',
        text: cart.price + " Rupees will be deducted from your Account.",
        icon: 'warning',
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
              this.options.prefill.contact = dealer.dealerEmail;
              
              
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



