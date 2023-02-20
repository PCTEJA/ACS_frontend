import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dealer } from '../dealer-dashboard/dealer.model';
import { DealerServiceService } from '../services/dealer-service.service';

@Component({
  selector: 'app-dealer-details',
  templateUrl: './dealer-details.component.html',
  styleUrls: ['./dealer-details.component.css']
})
export class DealerDetailsComponent implements OnInit {

  constructor(private dealerService: DealerServiceService,  private formBuilder: FormBuilder,private route:ActivatedRoute) { }

  public dealerid: any;
  formValue!: FormGroup;
  dealerDetails:Dealer;
  dummyprofileimage:any;
  dealerUpdateObject: Dealer = new Dealer();

  ngOnInit(): void {
    this.formValue = this.formBuilder.group(
      {
        id:[''],
        dealerName:[''],
        dealerEmail:[''],
        dealerContactNo:[''],
        passWord:[''],
        bankDetail:[''],
        dealerAddress:['']
       }
     )
     let id = String(this.route.snapshot.paramMap.get('dealerid') || '');
    this.dealerid = id;
    this.getDealerDetails();
  }

  getDealerDetails()
  {
    this.dealerService.getDealerDetails(this.dealerid).subscribe((res:any)=>
    {
      console.log(res);
      this.dealerDetails = res;
    })
  }

  //edit
  editRes()
  {
    this.dummyprofileimage = "bg-image2.jpg";
    this.formValue.controls['id'].setValue(this.dealerDetails.id);
    this.formValue.controls['dealerName'].setValue(this.dealerDetails.dealerName);
    this.formValue.controls['dealerEmail'].setValue(this.dealerDetails.dealerEmail);
    this.formValue.controls['dealerContactNo'].setValue(this.dealerDetails.dealerContactNo);
    this.formValue.controls['bankDetail'].setValue(this.dealerDetails.bankDetail);
    this.formValue.controls['passWord'].setValue(this.dealerDetails.passWord);
    this.formValue.controls['dealerAddress'].setValue(this.dealerDetails.dealerAddress);
  }

  updateDealerDetails()
  {
    this.dealerUpdateObject.id = this.formValue.value.id;
    this.dealerUpdateObject.dealerName = this.formValue.value.dealerName;
    this.dealerUpdateObject.dealerEmail = this.formValue.value.dealerEmail;
    this.dealerUpdateObject.passWord = this.formValue.value.passWord;
    this.dealerUpdateObject.dealerAddress = this.formValue.value.dealerAddress;
    this.dealerUpdateObject.bankDetail = this.formValue.value.bankDetail;
    this.dealerUpdateObject.dealerContactNo= this.formValue.value.dealerContactNo;


    this.dealerService.updateDealerDetails(this.dealerUpdateObject)
    .subscribe((res:any)=>
    {
      console.log(res);
      alert("Profile Updated");
      this.getDealerDetails();
      
    },
    err=>
    
    {
      alert("Profile Updated");
      this.getDealerDetails();
      
    })
  }

  //delete
  deleteDealerDetails()
  {
    this.dealerService.deleteDealerDetails(this.dealerid).subscribe((res:any)=>
    {
      alert("Dealer Deleted")
      this.getDealerDetails();
    },err=>
    {
      alert("Dealer Deleted");
      this.getDealerDetails();
    })
  }
}
