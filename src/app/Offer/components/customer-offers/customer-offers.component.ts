import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OfferService } from 'app/Offer/Service/offer.service';
import { CustomerEstimationOffer } from '../interface/offer';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { DatePipe } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as moment from 'moment';
import { debounce } from '@fullcalendar/core';

@Component({
  selector: 'app-customer-offers',
  templateUrl: './customer-offers.component.html',
  styleUrls: ['./customer-offers.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ],
  providers: [DatePipe]
})
export class CustomerOffersComponent implements OnInit {
  WarehouseList:any;
  WarehouseId : any;
  data  :any;
  OfferCode : any;
  SKCode : any;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  isItemdetail : boolean;
  isInvalid : boolean;
  customerEstimationList : any;
  start : any;
  end : any;
  redeemHide : boolean;
  customerEstimationOffer : CustomerEstimationOffer;
  calculatedDiscount : any;
  SkipCount: number;
  Take : number;
  exportData: any [];
  myDate = new Date();
  Disdata:any;
  btnsave : boolean;
  percentsign : boolean;
  amtsign : boolean;
  validFormcalDis : boolean;
  validFormcalDisc : boolean;

  constructor(private warehouseService:WarehouseService,private offerService : OfferService,private router : Router,private messageService : MessageService, private exportService: ExportServiceService, private datePipe: DatePipe) { this.data = {}; this.calculatedDiscount = {};}

  ngOnInit() {
    this.isItemdetail = false;
    this.data.WarehouseId = '';
    this.redeemHide = false;
    this.validFormcalDis = false;
    this.validFormcalDisc = false;
    // this.percentsign = false;
    // this.amtsign = false;
    this.SkipCount = 0;
    this.Take = 10
    this.btnsave = false;
    this.warehouseService.GetAllWarehouse().subscribe(result => {
      
      this.WarehouseList = result;
    }) 
    // if(this.WarehouseId == 'undefined' || this.SKCode == 'undefined' || this.start == undefined || this.end == undefined || this.SkipCount == undefined || this.Take == undefined)
    // {
    //   if(this.WarehouseId == undefined)
    //   {
    //     this.WarehouseId = "";
    //   }
    //   if(this.SKCode == undefined)
    //   {
    //     this.SKCode = "";
    //   }
    //   if(this.OfferCode == undefined)
    //   {
    //     this.OfferCode = "";
    //   }
    //   if(this.start == undefined)
    //   {
    //     this.start = "";
    //   }
    //   if(this.end == undefined)
    //   {
    //     this.end = "";
    //   }
    //   if(this.SkipCount == undefined)
    //   {
    //     this.SkipCount = null;
    //   }
    //   if(this.Take == undefined)
    //   {
    //     this.Take = null;
    //   }
    // }
    // this.offerService.getCustomerEstimationOfferDetails(this.WarehouseId,this.SKCode,this.OfferCode,this.start,this.end,this.SkipCount,this.Take).subscribe(x=>
    //   {
    //     this.customerEstimationList = x;
    //     for(var i in this.customerEstimationList)
    //     {
    //       if(this.customerEstimationList[i].Status == 1)
    //       {
    //         this.redeemHide = true;
    //       }
    //     }
    //     console.log('customerEstimationList',this.customerEstimationList);
    //   })
     
  }

  openDetails(d,e) {
    
    this.isItemdetail = true;
    this.selectedRowDetails = d;
    
    this.offerService.getDispatchValue(this.selectedRowDetails.OfferOn,this.selectedRowDetails.OfferId,this.selectedRowDetails.OrderIds).subscribe(
      result => {
        this.Disdata=result;
        console.log('result',result);
      });
    // this.selectedRowDetails.DispatchDiscount = 100;
    this.calculatedDiscount = this.selectedRowDetails.DispatchValue;
      // this.calculatedDiscount.push(this.selectedRowDetails.DispatchDiscount);
      
      // if (this.selectedRow != undefined) {
    //   this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    // }
    // this.selectedRow = e;
    // this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    // console.log(this.selectedRow);
    this.isDetails = true;
  }
  Cancel()
  {
    this.isItemdetail = false;
  }
  redeem(selectedRowDetails)
  {
    
    if(selectedRowDetails.DispatchDiscount == this.calculatedDiscount)
    {
      this.customerEstimationOffer = 
      {
          OfferId : selectedRowDetails.OfferId,
          CustomerId : selectedRowDetails.CustomerId,
          OrderIds : selectedRowDetails.OrderIds,
          CalculateDiscountvalue : selectedRowDetails.DispatchValue,
          ChangeCalculateDiscountValue : null,
          CheakerId : null,
          CheakerDate : null,
          Status : 1,
          OfferDiscount : selectedRowDetails.OfferDiscount,
          Type : '',
          OfferOn : selectedRowDetails.OfferOn,
          Comment : '',
          Id : selectedRowDetails.Id
      }
    }
   else if(selectedRowDetails.DispatchDiscount != this.calculatedDiscount)
    {
      this.customerEstimationOffer = 
      {
          OfferId : selectedRowDetails.OfferId,
          CustomerId : selectedRowDetails.CustomerId,
          OrderIds : selectedRowDetails.OrderIds,
          CalculateDiscountvalue : this.calculatedDiscount,
          ChangeCalculateDiscountValue : selectedRowDetails.DispatchDiscount,
          CheakerId : null,
          CheakerDate : null,
          Status : 1,
          OfferDiscount : selectedRowDetails.OfferDiscount,
          Type : '',
          OfferOn : selectedRowDetails.OfferOn,
          Comment : '',
          Id : selectedRowDetails.Id
      }
    }
  
    this.offerService.redeem(this.customerEstimationOffer).subscribe(z=>
    {
      console.log('z',z);
      if(z==true)
      {
        this.messageService.add({severity:'success', summary: 'Your Offer is Redeemed Successfully!', detail:''});
        this.btnsave = true;
        this.isItemdetail = false;
        window.location.reload();
      }
      else{
        this.messageService.add({severity:'success', summary: 'Something went wrong!', detail:''});
        // this.btnsave = true;
      }
    })
   
    // this.router.navigateByUrl('layout/DistributerOffer/OfferChecker');
    // window.location.reload();
  }

  customerOffer(WarehouseId,SKCode,OfferCode,start,end)
  {
    
    if(SKCode == undefined || OfferCode == undefined || start == undefined || end == undefined || this.SkipCount == undefined || this.Take == undefined)
    {
      if(SKCode == undefined)
      {
        SKCode = "";
      }
      if(OfferCode == undefined)
      {
        OfferCode = "";
      }
      if(start == undefined)
      {
        start = "";
      }
      if(end == undefined)
      {
        end = "";
      }
      if(this.SkipCount == undefined)
      {
        this.SkipCount = null;
      }
      if(this.Take == undefined)
      {
       this.Take = null;

      }
    }
    if(start != null )
    {
      start = start ? moment(start).format('DD/MM/YYYY') : null;
      // end = end ? moment(end).format('DD/MM/YYYY') : null;
    }
    if(end != null )
    {
      // start = start ? moment(start).format('DD/MM/YYYY') : null;
      end = end ? moment(end).format('DD/MM/YYYY') : null;
    }

    this.offerService.getCustomerEstimationOfferDetails(WarehouseId,SKCode,OfferCode,start,end,this.SkipCount,this.Take).subscribe(x=>
      {
        
        this.customerEstimationList = x;
        for(var i in this.customerEstimationList)
        {
          if(this.customerEstimationList[i].Slaboffer == "WalletPoint")
          {
            this.customerEstimationList[i].Slaboffer = "Amount";
              this.amtsign = true;
          }
          else if(this.customerEstimationList[i].Slaboffer == "Percentage")
          {
            this.customerEstimationList[i].Slaboffer = 'Percentage';
            this.amtsign = false;
          }
        }
        this.exportData = this.customerEstimationList;
        console.log('customerEstimationList',this.customerEstimationList);
      })
  }

  load(event,WarehouseId,SKCode,OfferCode,start,end) {
    
    this.SkipCount = event.first;
    this.Take = event.rows;
    
    if(SKCode == 'undefined' || OfferCode == 'undefined' || start == undefined || end == undefined || this.SkipCount == undefined || this.Take == undefined)
    {
      if(SKCode == undefined)
      {
        SKCode = "";
      }
      if(OfferCode == undefined)
      {
        OfferCode = "";
      }
      if(start == undefined)
      {
        start = "";
      }
      if(end == undefined)
      {
        end = "";
      }
      if(this.SkipCount == undefined)
      {
        this.SkipCount = null;
      }
      if(this.Take == undefined)
      {
       this.Take = null;

      }
    }
    this.offerService.getCustomerEstimationOfferDetails(WarehouseId,SKCode,OfferCode,start,end,this.SkipCount,this.Take).subscribe(x=>
      {
        
        this.customerEstimationList = x;
        for(var i in this.customerEstimationList)
        {
          if(this.customerEstimationList[i].Slaboffer == "Amount")
          {
              this.amtsign = true;
          }
          else if(this.customerEstimationList[i].Slaboffer == "Percentage")
          {
            this.amtsign = false;
          }
        }
        this.exportData = this.customerEstimationList;
        console.log('customerEstimationList',this.customerEstimationList);
      })
  }
  exportCustomerEstimationOffer()
  {
    let exportsheet=[];
    this.exportData.forEach(element => {
      exportsheet.push(
        {
          OfferCode:element.OfferCode,
          Skcode:element.Skcode,
          OrderIds:element.OrderIds,
          OrderValue:element.OrderValue,
          DispatchValue:element.DispatchValue,
          Discount:element.Discount,
          CalculateDiscountvalue:element.CalculateDiscountvalue,
          OfferOn:element.OfferOn,
          Status:element.Status,
          OfferId:element.OfferId,
          CustomerId:element.CustomerId,
          Id:element.Id,
          Slaboffer:element.Slaboffer
      })
    });
    this.exportService.exportAsExcelFile(exportsheet, 'ExportCustomerEstimationOfferDetail(Maker)');
  }
  calDiscount(DispatchDiscount)
  {
    
    
    if(DispatchDiscount < 0)
    {
      this.validFormcalDis = true;
      this.validFormcalDisc = false;
      this.messageService.add({severity:'error', summary: 'Cal Discount should not be negative!', detail:''});
      this.selectedRowDetails.DispatchDiscount = '';
      
    }
    else if(DispatchDiscount == 0)
    {
      this.validFormcalDisc = true;
      this.validFormcalDis = false;
      this.messageService.add({severity:'error', summary: 'Cal Discount should be greater then 0!', detail:''});
      this.selectedRowDetails.DispatchDiscount = '';
      
    }
    else{
      this.validFormcalDis = false;
      this.validFormcalDisc = false;
    }
  }

}

