import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { VehicleMasterService } from 'app/vehicle-master/services/vehicle-master.service';
import { environment } from 'environments/environment';
import { event } from 'jquery';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { element } from 'protractor';

@Component({
  selector: 'app-vehicle-master-list-page',
  templateUrl: './vehicle-master-list-page.component.html',
  styleUrls: ['./vehicle-master-list-page.component.scss']
})
export class VehicleMasterListPageComponent implements OnInit {
  vehicleMasterList: any;
  isOpen: boolean = false;
  selectedRowDetails: any;
  selectedRow: any;
  baseURL: any;
  skip: any;
  take: any;
  totalRecords: number;
  searchModel:any;
  blocked:boolean;
  

  constructor(private vehicleMasterService : VehicleMasterService
    ,private router: Router,private exportService: ExportServiceService
    ,private messageService: MessageService, private confirmationService:ConfirmationService) {
      this.baseURL = environment.apiURL;
      this.searchModel={};
     }

  ngOnInit() {
  
  }
  load(event) {
    debugger;
    this.blocked=true;
    var Last=  event.first ? event.first + event.rows : 10;
    this.skip=Last/ event.rows;
    this.take= event.rows;
    this.vehicleMasterService.getVehicleMasterList(this.skip,this.take).subscribe(x=>
      {
        this.totalRecords = x.data.totalCount;
        this.vehicleMasterList = x.data.VehicleMasterlist;
        this.blocked=false;
      })
  }
  openRowDetails(rowData)
  {
    this.router.navigateByUrl('layout/vehicle/edit-vehicle/' + rowData.Id);
  }
  addvehicle()
  {
    this.router.navigateByUrl('layout/vehicle/vehicle');
  }

  openDetails(d,e)
  {
    debugger
    this.selectedRowDetails  = d;
    this.selectedRow = e;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    }
    console.log(this.selectedRow,'ggg');
    this.isOpen = true;
    // this.postActivity.Id=d.Id;
  }

  search(DataSelect){
    
    if(DataSelect.searchall ==null){
      this.blocked=true;
      this.messageService.add({ severity: 'error', summary: 'Please Select Name!!', detail: '' });
      this.blocked=false;
      return;
    }else{
      var search=DataSelect.searchall;
    }
    var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
    var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null
    // this.vehicleMasterService.getData(FromDate,ToDate,search).subscribe(x=>
    //   {
    //     this.vehicleMasterList =x;
    //     console.log(this.vehicleMasterList,'hhh')
    //     this.blocked=false;
    //   })
  }
  export() {
    this.blocked=true;
    if (this.searchModel.FromDate == undefined && this.searchModel.ToDate==undefined) {
      this.messageService.add({ severity: 'error', summary: 'Please Select Start Date!!', detail: '' });
      this.blocked=false;
      return;
    } else if(this.searchModel.ToDate==undefined){
      this.messageService.add({ severity: 'error', summary: 'Please Select End Date!!', detail: '' });
      this.blocked=false;
      return;
    }
    this.exportService.exportAsExcelFile(this.vehicleMasterList, 'ExportvehicleMasterList');
    this.blocked=false;
  }
  clear(){
    this.searchModel={};
    this.refresh();
  }
  refresh(){
    this.vehicleMasterService.getVehicleMasterList(this.skip,this.take).subscribe(x=>
      {
        this.totalRecords = x.data.totalCount;
        this.vehicleMasterList = x.data.VehicleMasterlist;
      })
  }
  ActiveInactive(d,bool){
    this.blocked=true;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.vehicleMasterService.postactivety(d.Id,bool).subscribe(res=>{
          console.log(res,'res');
        this.blocked=false;
        })
      }
    });
  }
  isBlocked(b,bool){
    this.blocked=true;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.vehicleMasterService.postIsBlocked(b.Id,bool).subscribe(res=>{
          console.log(res,'res');
        this.blocked=false;
        })
      }
    });
  }
}
