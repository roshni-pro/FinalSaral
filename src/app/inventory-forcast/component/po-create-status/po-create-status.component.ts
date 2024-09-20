import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryforcastserService } from 'app/inventory-forcast/services/inventoryforcastser.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import * as moment from 'moment';
import { MessageService, OrderList } from 'primeng/primeng';



@Component({
  selector: 'app-po-create-status',
  templateUrl: './po-create-status.component.html',
  styleUrls: ['./po-create-status.component.scss']
})
export class PoCreateStatusComponent implements OnInit {

  constructor(private router:Router,  private API_Service: InventoryforcastserService,
    private exportservice:ExportServiceService, private msg:MessageService,
    public datepipe:DatePipe) 
    { this.searchModel = {}; }

  statusList:any[]=[]
  searchModel: any;

  EnterPN:any
  SelectedStatus:any
  selectDate:any
  CreatePOStatusList:any[]=[]
  blocked:boolean=false

  ngOnInit() {
    this.statusList=
    [
      {code:'',name:'All'},
      {code:'1',name:'Auto'},
      {code:'2',name : 'Manual'}
    ]
  }

  SearchBtn()
  {
    debugger;
    if(this.SelectedStatus==undefined && this.selectDate==undefined )
    {
      alert("Please select date")
    }
    if(this.SelectedStatus!=undefined && this.selectDate==undefined )
    {
      alert("Please select date")
    }
    if(this.selectDate!=undefined )
    {
      var sid = []
      if(this.SelectedStatus== undefined){
        sid = []
      }
      else if(this.SelectedStatus.code == ''){
        sid = []
      }
      else if(this.SelectedStatus.code == 1){
        sid = [1]
      }
      else if(this.SelectedStatus.code == 2){
        sid = [2]
      }
      const payload=
      {
        "PODate" : this.selectDate,
        "Status" : sid
      }

      this.API_Service.GerPOStatus(payload).subscribe(res=>
      {
        console.log(res);
        this.CreatePOStatusList=res;        
      })
    }
      
  }

  ClearBtn()
  {
    this.EnterPN=undefined
    this.SelectedStatus=undefined
    this.selectDate=undefined
    this.CreatePOStatusList=undefined
  }
  ExportF()
  {
    debugger;
    this.blocked=true
    var exportData=[];
          for (var i in this.CreatePOStatusList) {
            var selectedFields = {
              ItemForecastPRRequestsID: this.CreatePOStatusList[i].ItemForecastPRRequestsID,
              PurchaseOrderId: this.CreatePOStatusList[i].PurchaseOrderId,
              WarehouseName: this.CreatePOStatusList[i].WarehouseName,
              Status:this.CreatePOStatusList[i].Status,
              CreatedDate:this.CreatePOStatusList[i].CreationDate+this.CreatePOStatusList[i].CustomerName+this.CreatePOStatusList[i].MobileNo,
              CreatedBy:this.CreatePOStatusList[i].CreatedBy,
              POCreateBy:this.CreatePOStatusList[i].Po_Create_By
          }
          exportData.push(selectedFields);
        
          }
          if(this.CreatePOStatusList && this.CreatePOStatusList.length > 0)
          {
            this.exportservice.exportAsExcelFile(exportData,"Export PO Status Data")
            this.blocked=false;
          }
          else
          {
            alert('No Data Found!');
            this.blocked=false;
          }       
    
  }
}
