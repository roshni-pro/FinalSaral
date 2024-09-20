import { Component, OnInit, Input } from '@angular/core';
import { AssignmentpaymentService } from '../../../../app/shared/services/assignmentpayment.service';
import { resolveAny } from 'dns';
import { WarehouseService } from '../../../../app/shared/services/warehouse.service';
import { CountryService } from '../../../../app/shared/services/country.service';
import { DialogService } from 'primeng/components/dynamicdialog/dialogservice';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { Observable, forkJoin } from 'rxjs';
import { DboysigneddesignslipService } from 'app/shared/services/dboysigneddesignslip/dboysigneddesignslip.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TatService } from 'app/shared/services/tat.service';

@Component({
  selector: 'app-dboy-signed-design-slip',
  templateUrl: './dboy-signed-design-slip.component.html',
  styleUrls: ['./dboy-signed-design-slip.component.scss'],
  providers: [DialogService]
})
export class DboySignedDesignSlipComponent implements OnInit {
  date: Date;
  date13: Date;
  cols: any;
  cols1: any;
  Pay: boolean;
  isInvalid: boolean;
  @Input() DBoyId  :any;
  @Input() DisplayName: any;
  @Input() WarehouseId: any;
  @Input() AssignmentId: any;
  signedList: any;
  hubList: any;
  agentList: any;
  warehouseId: any;
  searchdata: any;
  selectedRowDetails: any;
  selectedRow: any;
  isDetails : boolean;
  isOpenPopupPayment : boolean;
  dboyList : any;
  url: string;
  SignOffUrl : any;
  safeSrc: SafeResourceUrl;
  src : string;
  isPDF : boolean;
  IsFrame: boolean;
blocked : boolean;

  constructor(private warehouseService: WarehouseService, private assignmentpaymentService: AssignmentpaymentService, public dialogService: DialogService,private tatservice : TatService
    , private countryService: CountryService, public messageService: MessageService, private dboysigneddesignslipService: DboysigneddesignslipService, private sanitizer: DomSanitizer
  ) {  this.url = this.dboysigneddesignslipService.apiURL ; }

  ngOnInit() {
    this.warehouseId ="";
  
  
    // this.warehouseService.GetAllWarehouse().subscribe(result => {
    //   this.hubList = result;
    //   this.warehouseId = this.hubList[0].WarehouseId;    
    // })
   
    this.warehouseService.getSpecificWarehouses().subscribe(result => {
      this.hubList = result;
    
      // this.warehouseId = this.hubList[0].WarehouseId;    
      this. onsearchDboy(this.warehouseId);
    })
   

    this.searchdata = {
      DBoyId: 0,     
      AssignmentId: 0,
      Id: 0,
      Type:null
     

    }
    this.isInvalid = false;
  }

  onsearchDboy(warehouseId)
{
  
  this.tatservice.DboybasedonWarehouseId(warehouseId).subscribe(result => {
    
    
    this.dboyList = result;

  })
}


  search(searchdata) {
    
   
    searchdata.PageNumber = 1;
    searchdata.PageSize = 20
    searchdata.AssignmentId
    searchdata.Type
    this.blocked= true;
    if(searchdata.Type !=null){
    this.dboysigneddesignslipService.getSignedDepositSlip(searchdata.Id,searchdata.AssignmentId,searchdata.DBoyId,searchdata.StartDate,searchdata.EndDate,searchdata.PageNumber,searchdata.PageSize,searchdata.Type).subscribe(result => {
      this.signedList = result;
      for (var i in this.signedList) {
        this.signedList[i].CreatedDate = this.signedList[i].CreatedDate ? moment(this.signedList[i].CreatedDate).format('DD/MM/YYYY') : null
      }
      this.blocked= false;
      console.log('signedList : ', result);
      console.log('AssignmentId : ', this.AssignmentId);

    })
  }
  else{
    this.messageService.add({ severity: 'error', summary: 'Select Type  is required ', detail: '' });
    this.blocked=false;
    //window.location.reload();
  }
  
  
  }

  openDetails(d, e) {
    
    this.isOpenPopupPayment = true;
    this.selectedRowDetails = d;
    this.SignOffUrl = d.SignOffUrl;
    if (this.selectedRow != undefined) {
      if(this.selectedRow.path){
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
    }
    this.selectedRow = e;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    }
    console.log(this.selectedRow);
    this.isDetails = true;
  }
  
  readCategoryfile(category) {
    
 this.blocked=true;

    this.src = this.url + category.SignOffUrl;
    if (this.src != null) {
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
      this.IsFrame = true;
    }

    this.isPDF = true;
    this.blocked = false;
   // this.UserAcceptance();
  }
  

  readCategoryfileUN(category) {
    
 this.blocked=true;


    this.src= this.url + category.IsUNSignOffUrl;
 
    if (this.src != null) {
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
      this.IsFrame = true;
    }

    this.isPDF = true;
    this.blocked = false;
   // this.UserAcceptance();
  }

}
