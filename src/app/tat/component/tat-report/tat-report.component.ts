import { Component, OnInit, Input } from '@angular/core';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { TatService } from 'app/shared/services/tat.service';

import {SelectItem} from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tat-report',
  templateUrl: './tat-report.component.html',
  styleUrls: ['./tat-report.component.scss'],
  providers: [DatePipe]
})

export class TatReportComponent implements OnInit {
  @Input() WarehouseId : any;
  @Input() Id : any;
  @Input() Mobile : any;
  warehouseList: any;
  tatList : any[];
  cols : any[];
  reports: any[];
  items: any[];
  exportData:any
  selectedReportList : any[];
  StartDate : any;
  EndDate : any;
  datatopost:any;
  header:any[];
  SelectReportList:any[];
  curPage = 1;
  itemsPerPage = 10;
  maxSize = 20;
  filteredItems:any;
  config: any;
  p: number = 1;
  tatobject:any;
  dboyList:any;
  DeliveryboyId:any;
  exportFilenameDatetime: any;
  myDate = new Date();
  

  constructor( private warehouseservice: WarehouseService, private tatservice: TatService,  private exportService : ExportServiceService, private datePipe: DatePipe ) { 
    this.reports = [
      {label: 'Saved As Draft to Assigned [Standard Hour=Max. 12 Hrs]', value: 'SaveAsDraftToAssigned' , sortOrder: 1},
      {label: ' Assigned to Accepted [Standard Hour=	Max. 12 Hrs]', value: 'AssignedToAccepted' , sortOrder: 2},
      {label: ' Accepted to Submitted [Standard Hour=Max. 18 Hrs]', value: 'AcceptedToSubmitted' , sortOrder: 3},
      {label: 'Submitted to Payment Accepted [Standard Hour=Max. 2 Hrs]', value: 'SubmittedToPaymentAccepted' , sortOrder: 4},
      {label: 'Payment Accepted to Payment Submitted [Standard Hour=Max. 2 Hrs]', value: 'PaymentAcceptedToPaymentSubmitted', sortOrder: 5},
      {label: ' Payment Submitted to Freezed [Standard Hour=Max. 2 Hrs]', value: 'PaymentSubmittedToFreezed', sortOrder: 6}
    
  ];

 this.selectedReportList = this.reports;
 
  }

  ngOnInit() {


    this.tatList=[];
    this.WarehouseId="";
    this.Id = "";
    this.Mobile ="";
   
    
    this.warehouseservice.getWarehouseCommon().subscribe(result => {
      this.warehouseList = result;
    })

  }

  

  
  addSearch(){
    
    this.intializevalue();
  this.datatopost={
      WarehouseId:this.WarehouseId.value,
      selectedReportList : this.selectedReportList,
      StartDate : this.StartDate,
      EndDate : this.EndDate,
      DeliveryboyId : this.DeliveryboyId
    }
   this.tatservice.GetAssignmentTATReport(this.datatopost).subscribe(result => {
    
   
    result.forEach(item => {
     
     this.tatobject={
      DeliveryIssuanceId:0,
      SavedAsDraft:null,
      DeliveryBoyName:null,
      PaymentMode:null,
      SaveAsDraftToAssigned:null,
      AssignedToAccepted:null,
      AcceptedToSubmitted:null,
      SubmittedToPaymentAccepted:null,
      PaymentAcceptedToPaymentSubmitted:null,
      PaymentSubmittedToFreezed:null
    }
     this.tatobject.DeliveryIssuanceId=item.DeliveryIssuanceId;
     this.tatobject.SavedAsDraft=item.SavedAsDraft;
     this.tatobject.DeliveryBoyName=item.DeliveryBoyName;
     this.tatobject.PaymentMode=item.PaymentMode;
     if(item.SaveAsDraftToAssigned>0){
     this.tatobject.SaveAsDraftToAssigned=(parseInt(item.SaveAsDraftToAssigned) +"hr"+parseInt(((item.SaveAsDraftToAssigned- parseInt(item.SaveAsDraftToAssigned))*60).toFixed(2))+"min");
     }
     if(item.AssignedToAccepted>0){
     this.tatobject.AssignedToAccepted=(parseInt(item.AssignedToAccepted) +"hr"+parseInt(((item.AssignedToAccepted- parseInt(item.AssignedToAccepted))*60).toFixed(2))+"min");
     }
     if(item.AcceptedToSubmitted>0){
     this.tatobject.AcceptedToSubmitted=(parseInt(item.AcceptedToSubmitted) +"hr"+parseInt(((item.AcceptedToSubmitted- parseInt(item.AcceptedToSubmitted))*60).toFixed(2))+"min");
     }
     if(item.SubmittedToPaymentAccepted>0){
     this.tatobject.SubmittedToPaymentAccepted=(parseInt(item.SubmittedToPaymentAccepted) +"hr"+parseInt(((item.SubmittedToPaymentAccepted- parseInt(item.SubmittedToPaymentAccepted))*60).toFixed(2))+"min");
     }
     if(item.PaymentAcceptedToPaymentSubmitted>0){
     this.tatobject.PaymentAcceptedToPaymentSubmitted=(parseInt(item.PaymentAcceptedToPaymentSubmitted) +"hr"+parseInt(((item.PaymentAcceptedToPaymentSubmitted- parseInt(item.PaymentAcceptedToPaymentSubmitted))*60).toFixed(2))+"min");
     }
     if(item.PaymentSubmittedToFreezed>0){
     this.tatobject.PaymentSubmittedToFreezed=(parseInt(item.PaymentSubmittedToFreezed) +"hr"+parseInt(((item.PaymentSubmittedToFreezed- parseInt(item.PaymentSubmittedToFreezed))*60).toFixed(2))+"min");
     }
     this.tatList.push(this.tatobject);
       
    })
  
    console.log('this.tatList :', this.tatList );    
    this.exportFilenameDatetime = "TatList :" + this.datePipe.transform(this.myDate, 'dd/MM/yyyy h:mm:ss a');
   
    })


  }
  onsearch(searchdata) {
   this.intializevalue();
  this.tatservice.DboybasedonWarehouseId(this.WarehouseId.value).subscribe(result => {
  
    this.dboyList = result;
   
  })
  }

  numOfPages = function () {
    return Math.ceil(this.tatList.length / this.itemsPerPage);
    
  };
  
 
  pageChanged(event){
    this.config.currentPage = event;
  }

  intializevalue(){
    this.tatList=[];
  }
  exportTAT() {
    
    if(this.tatList.length>0){
      this.exportService.exportAsExcelFile(this.tatList, 'TATReport');
    }
    
  }


}
