import { Component, OnInit } from '@angular/core';
import { InventoryapprovalService } from 'app/shared/services/inventoryapproval.service';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { InventoryAssignSupervisiorService } from 'app/current-stock/services/inventory-assign-supervisior.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-pv-reconciliation',
  templateUrl: './pv-reconciliation.component.html',
  styleUrls: ['./pv-reconciliation.component.scss']
})
export class PvReconciliationComponent implements OnInit {
  reconciliationList : any;
  blocked : boolean = false;
  selectedWarehouse: number;
  first: number;
  totalRecords: any;
  PageNo: any=0;
  ItemPerPage: any;
  rangeDates: any
  start : any= null;
  end : any = null;
  warehouses: any[];
  dateRange : any;
  warehouseId : any;
  startDate :any;
  IsExport : boolean = false;
  StatusList:any;
  Status:string=null;

  constructor(private inventoryapprovalService: InventoryapprovalService,private messageService: MessageService, 
    private inveService: InventoryAssignSupervisiorService ,private exportserv: ExportServiceService) { }

  ngOnInit() {
    this.GetStatusList();
    this.warehouseId = null;
    this.startDate = null;
    this.getWarehouseList();
  }

GetStatusList(){
  this.StatusList = [
    {
      label:"All"
    },{
      label:"Pending"
    },{
      label:"Sarthi Scanned"
    },{
      label:"Warehouse Pending"
    },{
      label:"Approved By Warehouse"
    },{
      label:"Rejected By Warehouse"
    },{
      label:"L&P Pending"
    },{
      label:"Approved By L&P"
    },{
      label:"Rejected By L&P"
    },{
      label:"AutoApproved"
    }]
}

  getWarehouseList() {
    this.blocked = true;
    this.inveService.getWarehouseList().subscribe(result => {
      console.log(this.selectedWarehouse);
      this.blocked = false;
      this.warehouses = result;
      console.log(this.warehouses, "warehouses");
    });

  }
  onChangeWarehouse(wid)
  {
    this.inventoryapprovalService.getPvReconcillationDateList(wid).subscribe(x=>{
      debugger;
      x.Data.forEach(element => {
        element.Date = element.Date ? moment(element.Date).format('YYYY-MM-DD  hh:mm a') : null
      });
      this.dateRange = x.Data;
    })
    this.startDate = null;
    this.Status = null;
  }

  load(event) {
    debugger;
    if(this.warehouseId==undefined || this.warehouseId == "null")
    {
      this.messageService.add({ severity: 'error', summary: 'Please Select Warehouse!', detail: '' });
      return;
    }
    else if(this.startDate == undefined || this.startDate == "null")
    {
      this.messageService.add({ severity: 'error', summary: 'Please Select Date!', detail: '' });
      return;
    }
    else if(this.Status == undefined || this.Status == "null"){
      this.messageService.add({ severity: 'error', summary: 'Please Select Status!', detail: '' });
      return;
    }
    else
    {
        this.first = 0;
        var Last = event && event.first ? event.first + event.rows : event.rows
        this.ItemPerPage = event && event.rows ? event.rows : 25;
        // this.PageNo = event && event.rows ? Last / event.rows : 0
        this.PageNo = event && event.first ? event.first : 0
        debugger;
        this.blocked = true;
        let PvRecocillationFilter = {
          WarehouseId : this.warehouseId,
          StartDate: this.startDate,
          Skip : this.PageNo,
          Take : this.ItemPerPage,
          Status:this.Status,
          IsExport : this.IsExport
        }
        this.inventoryapprovalService.getPvReconcillationReport(PvRecocillationFilter).subscribe(result => {
          console.log(result);
          if(!this.IsExport && result.Data.length>0)
          {
            this.reconciliationList = result.Data;
            this.totalRecords = result.Data[0].TotalRecords;
          }
          else if(this.IsExport && result.Data.length>0)
          {
            const res=result.Data.map((a:any)=>{
              return{
                'ItemNumber':a.ItemNumber,
                'ItemName':a.ItemName,
                'ItemMultiMRPId':a.ItemMultiMRPId,
                'CurrentInventory':a.CurrentInventory,
                'MRP':a.MRP,
                'WarehouseName':a.WarehouseName,
                'HQComment':a.HQComment,
                'WarehouseComment':a.WarehouseComment,
                'Status':a.Status,
                'APP':a.APP
              }
            })
            this.exportserv.exportAsExcelFile(res, "ExportData")
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Data Not Found!', detail: '' });
            this.reconciliationList = this.reconciliationList.length>0 && !this.IsExport ? [] : this.reconciliationList;
          }
          
          this.IsExport = false;
          this.blocked = false;
        })
        this.blocked = false;
    }
  }

  onSearch()
  {
    if(this.rangeDates && this.rangeDates[0] != undefined && this.rangeDates[1] != undefined)
      {
        this.start = moment(this.rangeDates[0]).format("YYYY-MM-DD");
        this.end = moment(this.rangeDates[1]).format("YYYY-MM-DD");
      }
      else if(this.rangeDates && this.rangeDates[0] != undefined && this.rangeDates[1] == undefined)
      {
        this.messageService.add({ severity: 'error', summary: 'Please Select Date!', detail: '' });
        return false;
      }
   this.load(event); 
  }
  onExport()
  {
    if(this.warehouseId==undefined || this.warehouseId == "null")
    {
      this.messageService.add({ severity: 'error', summary: 'Please Select Warehouse!', detail: '' });
      return;
    }
    else if(this.startDate == undefined || this.startDate == "null")
    {
      this.messageService.add({ severity: 'error', summary: 'Please Select Date!', detail: '' });
      return;
    }
    else if(this.Status == undefined || this.Status == "null"){
      this.messageService.add({ severity: 'error', summary: 'Please Select Status!', detail: '' });
      return;
    }
    if(this.warehouseId > 0 && this.startDate != null)
    {
      this.IsExport = true;
     this.load(event);
    }
    

  }

 

}
