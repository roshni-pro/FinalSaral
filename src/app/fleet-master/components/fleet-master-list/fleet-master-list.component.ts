import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FleetMasterService } from 'app/fleet-master/services/fleet-master.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-fleet-master-list',
  templateUrl: './fleet-master-list.component.html',
  styleUrls: ['./fleet-master-list.component.scss']
})
export class FleetMasterListComponent implements OnInit {
 
  skip:any;
  take:any;
  fleetMasterList : any;
  totalRecords:number;
  searchModel;any;
  blocked:boolean;
  constructor(private fleetMasterService : FleetMasterService,
    private router: Router,private exportService: ExportServiceService,
    private messageService: MessageService,
    private confirmationService:ConfirmationService) {this.searchModel={}; }

  ngOnInit() {
   
    // this.fleetMasterService.getFleetMasterList(this.skip,this.take).subscribe(x=>
    //   {
    //     this.totalRecords = x.data.totalcount;
    //     this.fleetMasterList = x.data.FleetMasterList;
    //   })
  }
  load(event) {
    this.blocked=true;
    var Last=  event.first ? event.first + event.rows : 10;
    this.skip=Last/ event.rows;
    this.take= event.rows;
    this.fleetMasterService.getFleetMasterList(this.skip,this.take).subscribe(x=>
      {
        this.blocked=false;
        this.totalRecords = x.data.totalcount;
        this.fleetMasterList = x.data.FleetMasterList;
      })
  }

  openDetails(rowData)
  {
    this.router.navigateByUrl('layout/fleetMaster/edit-fleet/' + rowData.Id);
  }
  addFleetmaster()
  {
    this.router.navigateByUrl('layout/fleetMaster/fleet');
  }
  search(DataSelect){
    this.blocked=true;
    if(DataSelect.searchall ==null){
      this.messageService.add({ severity: 'error', summary: 'Please Enter Name!!', detail: '' });
      this.blocked=false;
      return;
    }else{
      var search=DataSelect.searchall;
    }
    var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
    var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null
    // this.fleetMasterService.getData(FromDate,ToDate,search).subscribe(x=>
    //   {
    //     this.blocked=false;
    //     this.fleetMasterList =x;
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
    this.exportService.exportAsExcelFile(this.fleetMasterList, 'ExportFleetMasterList');
    this.blocked=false;
  }
  clear(){
    this.searchModel={};
    this.refresh();
  }
  refresh(){
    this.blocked=true;
    this.fleetMasterService.getFleetMasterList(this.skip,this.take).subscribe(x=>
      {
        this.blocked=false;
        this.totalRecords = x.data.totalcount;
        this.fleetMasterList = x.data.FleetMasterList;
      })
  }

  ActiveInactive(d,bool){
    this.blocked=true;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.fleetMasterService.postactivety(d.Id,bool).subscribe(res=>{
          console.log(res,'res');
          this.blocked=false;
        })
      }
    });
  }
  isBlocked(e,bool){
    this.blocked=true;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.fleetMasterService.postIsBlocked(e.Id,bool).subscribe(res=>{
          console.log(res,'res');
          this.blocked=false;
        })
      }
    });
  }
}

