import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { OfferService } from 'app/Offer/Service/offer.service';
import { CustomerEstimationOffer, UpdateGullakDc } from '../interface/offer';
import { DatePipe } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-offer-history-page',
  templateUrl: './offer-history-page.component.html',
  styleUrls: ['./offer-history-page.component.scss'],
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
export class OfferHistoryPageComponent implements OnInit {
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
  Skip : number;
  Take : number;
  exportData: any [];
  myDate = new Date();

    constructor(private router : Router,private messageService : MessageService,private offerService : OfferService,private confirmationService: ConfirmationService,private exportService: ExportServiceService, private datePipe: DatePipe) { 
      // this.orderIds = [];
      this.isSelectedIds = [];
    }
  
    ngOnInit() {
      this.commentSection = false;
      this.savebtn = false;
      this.Skip = 1;
      this.Take = 10;
      this.offerService.getChekerHistoryByChecker(this.Skip,this.Take).subscribe(y=>
        {
          this.CheckerData = y;
          this.exportData = this.CheckerData;
          for(var i in this.CheckerData)
          {
            if(this.CheckerData[i].Status == 2)
            {
              this.CheckerData[i].Status = 'Approved';
            }
            if(this.CheckerData[i].Status == 3)
            {
              this.CheckerData[i].Status = 'Rejected';
            }
            if(this.CheckerData[i].Status == 0)
            {
              this.CheckerData[i].Status = 'Rejected';
            }
          }
          
           console.log('CheckerData',this.CheckerData);
        })
    }

    exportOffer()
  {
    let exportadd=[];
    this.exportData.forEach(element=>{
      exportadd.push({
        Id:element.Id,
        OfferId:element.OfferId,
        OfferCode:element.OfferCode,
        Skcode:element.Skcode,
        OrderIds:element.OrderIds,
        OfferOn:element.OfferOn,
        OrderValue:element.OrderValue,
        CustomerId:element.CustomerId,
        Discount:element.Discount,
        DispatchDiscount:element.DispatchDiscount,
        Status:element.Status,
        Comment:element.Comment
      })
    }) 
    this.exportService.exportAsExcelFile(exportadd, 'OfferHistoryPage');
  }      
  }
  
