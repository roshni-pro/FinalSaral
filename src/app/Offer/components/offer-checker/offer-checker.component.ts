import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { OfferService } from 'app/Offer/Service/offer.service';
import { CustomerEstimationOffer, UpdateGullakDc } from '../interface/offer';

@Component({
  selector: 'app-offer-checker',
  templateUrl: './offer-checker.component.html',
  styleUrls: ['./offer-checker.component.scss']
})
export class OfferCheckerComponent implements OnInit {
CheckerData : any;
orderIds: any;
isSelectedIds: boolean[];
isSelect : boolean;
customerEstimationOffer : CustomerEstimationOffer;
type : any;
selectedRow : any;
commentSection : boolean;
isInvalid : boolean;
savebtn : boolean;
updateGullakDc : UpdateGullakDc;

  constructor(private router : Router,private messageService : MessageService,private offerService : OfferService,private confirmationService: ConfirmationService) { 
    // this.orderIds = [];
    this.isSelectedIds = [];
  }

  ngOnInit() {
    this.commentSection = false;
    this.savebtn = false;
    this.offerService.getCheckerList().subscribe(y=>
      {
        this.CheckerData = y;
        
         console.log('CheckerData',this.CheckerData);
      })
  }
  rejectOffer(offercheckerForm,data)
  {
    
    if(offercheckerForm.form.status == 'VALID')
    {
      // if(data.length > 3)
      // {
      //   this.savebtn = true;
      // }
    // this.commentPopup();
    this.orderIds;
    this.type='REJECT';
    // this.selectedRow = [];
    this.updateGullakDc = 
      {
          OfferId : this.orderIds.OfferId,
          Id : this.orderIds.Id,
        Type : this.type,
        Comment : data
      }
    
  //   this.orderIds.forEach(element => {     
    
  //     let obj: any=
  //   {
  //       OfferId : element.OfferId,
  //       Id : element.Id,
  //       Type : this.type,
  //       Comment : data
  //   }
  //   this.selectedRow.push(obj);
  // });
    this.offerService.gullak(this.updateGullakDc).subscribe(y=>
      {
        console.log('y',y);
        if(y == true)
        {
          this.messageService.add({severity:'success', summary:  'Your Offer is Rejected.', detail:''});
          window.location.reload();
        }
        else{
          this.messageService.add({severity:'error', summary:  'Something went wrong.', detail:''});
        }
       
      })
      
    //  this.router.navigateByUrl('layout/DistributerOffer/CustomerOffers');
    }
    else{
     this.isInvalid = true; 
    }
  }

  getData(ir)
  {
    
    ir.IsSelected = !ir.IsSelected;
    console.log('ir is: ', ir);
    if (ir.IsSelected) {
      
      this.orderIds.push(ir);
      var b = this.orderIds;
      this.isSelectedIds.push(ir.IsSelected);
      console.log('dssdds', this.orderIds);
      console.log('isSelectedIds', this.isSelectedIds);
      console.log('dddd', b);
    } else {
      let index = this.orderIds.indexOf(ir.OfferCode);
      this.orderIds.splice(index, 1);
      console.log('splice', this.orderIds);
    }
    if (ir.IsSelected == true) {
      this.isSelect = ir.IsSelected;
      if (this.isSelect == false) {
        this.orderIds == [];
      }
    }
    // this.router.navigateByUrl('layout/DistributerOffer/CustomerOffers');
  }

  addGullak(row,event)
  {   
    
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {      
    this.orderIds = row;
    this.type='ADD';
    // this.selectedRow = [];
    this.updateGullakDc = 
      {
          OfferId : this.orderIds.OfferId,
          Id : this.orderIds.Id,
        Type : this.type,
        Comment : ''
      }
    
  //   this.orderIds.forEach(element => {     
    
  //     let obj: any=
  //   {
  //     OfferId : element.OfferId,
  //     Id : element.Id,
  //     Type : this.type
  //   }
  //   this.selectedRow.push(obj);
  // });
  // this.customerEstimationOffer = this.selectedRow;
    this.offerService.gullak(this.updateGullakDc).subscribe(y=>
      {
        console.log('y',y);
        if(y == true)
        {
          this.messageService.add({severity:'success', summary:  'Your Offer is Added in Gullak.', detail:''});
          window.location.reload();
        }
        else
        {
          this.messageService.add({severity:'error', summary:  'Something went wrong', detail:''});
        }
      })
     
    }
  });
  

  }

    commentPopup(row,event)
    {
      
      this.commentSection = true;
      this.orderIds = row;
    }
    commentbox(offercheckerForm,Comment)
    {
      
      if(offercheckerForm.form.status == 'VALID')
      {
        if(Comment.length > 4)
        {
          this.savebtn = true;
        }
      }
      else{
        this.isInvalid = true;
      }
    }

}
