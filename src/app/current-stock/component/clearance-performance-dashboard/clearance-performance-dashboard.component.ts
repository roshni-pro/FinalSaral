import { Component, OnInit } from '@angular/core';
import { ClearancePerfomanceDashboardService } from 'app/current-stock/services/clearance-perfomance-dashboard.service';
import { InventoryAssignSupervisiorService } from 'app/current-stock/services/inventory-assign-supervisior.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { LoaderService } from 'app/shared/services/loader.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import * as moment from 'moment';

@Component({
  selector: 'app-clearance-performance-dashboard',
  templateUrl: './clearance-performance-dashboard.component.html', 
  styleUrls: ['./clearance-performance-dashboard.component.scss']
})
export class ClearancePerformanceDashboardComponent implements OnInit {
  BrandID:any;
  BrandList:any=[]
  Warehouses:any
  dateValue:any=null
  SelectedId:any
  SelectedValue:any
  TableView:any
  ClearanceList:any
  Data: any = []
  BuyerPendingMTDQty:any 
  BuyerPendingYTD:any
  PhysicallyMovedMTDQty:any 
  PhysicallyMovedYTD:any
  ApprovedMTDQty:any 
  ApprovedYTD:any
  TotalCLItemMTDQty:any 
  TotalCLItemYTD:any
  InActiveItemMTDQty:any 
  InActiveItemYTD:any
  LiveItemMTDQty:any 
  LiveItemYTD:any
  OrderCancelationMTDQty:any 
  OrderCancelationYTD:any
  SaleMTDQty:any 
  SaleYTD:any
  PrepareItemYTD:any
  PrepareItemMTDQty:any
  CurrentYear:any
  constructor(private _service:InventoryAssignSupervisiorService,private Get:ClearancePerfomanceDashboardService  
    ,private loaderService: LoaderService,private exportService: ExportServiceService) {}

  ngOnInit() {
    this.GetaAllWarehouse();
    this.SelectedValue="MTD"
    this.CurrentYear=new Date();
  }
  GetaAllWarehouse()
  {
    
    this._service.getWarehouseList().subscribe(
      (res)=>{
      this.Warehouses=res;
      this.SelectedId=this.Warehouses
      this.dateValue=this.CurrentYear
      this.GetBrandListData();
        this.Search();
     
     
     
    })
  }

  GetBrandListData()
  {
     
    let WarehouseId =[]
    if(this.SelectedId!=undefined){
    this.SelectedId.forEach(element => {
      WarehouseId.push(element.WarehouseId)
    });}
    const payload =
    {
      "WarehouseId":WarehouseId,
    }
    this.Get.GetBrandList(payload).subscribe((res:any)=>{
      this.BrandList=res;
      this.BrandID=WarehouseId.length>1?this.BrandList:null
      
    })
  }

  Search()
  {
   
   this.ClearanceList='';
  this.BuyerPendingMTDQty=''; 
  this.BuyerPendingYTD='';
  this.PhysicallyMovedMTDQty=''; 
  this.PhysicallyMovedYTD='';
  this.ApprovedMTDQty=''; 
  this.ApprovedYTD='';
  this.TotalCLItemMTDQty=''; 
  this.TotalCLItemYTD='';
  this.InActiveItemMTDQty='';
  this.InActiveItemYTD='';
  this.LiveItemMTDQty='';
  this.LiveItemYTD='';
  this.OrderCancelationMTDQty='';
  this.OrderCancelationYTD='';
  this.SaleMTDQty='';
  this.SaleYTD='';
  this.PrepareItemYTD='';
  this.PrepareItemMTDQty='';
    if(this.SelectedId==null && this.SelectedId==undefined )
    {
      alert("Please Select Warehouse !")
    }
    else if( (this.dateValue==null && this.dateValue==undefined) && this.SelectedId)
    {
      alert("Please Select Date !")
    }
    
    else
    {
      
      this.loaderService.loading(true);
      let dy= moment(this.dateValue).format('MM/YYYY');
      let Val=this.SelectedValue
      let BID =[]
    if(this.BrandID!=undefined){
    this.BrandID.forEach(element => {
      BID.push(element.BrandNumber)
    });}

    let WarehouseId =[]
    if(this.SelectedId!=undefined){
    this.SelectedId.forEach(element => {
      WarehouseId.push(element.WarehouseId)
    });}
    const payload =
    {
     
      "WarehouseIds":WarehouseId,
      "Date":dy,
      "Value":Val,
      "BrandIds":BID
    }
      this.Get.GetSearchData(payload).subscribe((res:any)=>{
        this.ClearanceList=res
      this.loaderService.loading(false);
      this.TableView=this.SelectedValue

      this.ClearanceList.forEach(element => {          
          if(element.Status =="Buyer Side Pending" )
          {
            this.BuyerPendingMTDQty =this.SelectedValue=="YTD" && element.YTDTotalQty>0?element.YTDTotalQty:element.MTDTotalQty
            this.BuyerPendingYTD=this.SelectedValue=="YTD" && element.YTDTotalValue>0?element.YTDTotalValue:element.MTDTotalValue
          }
          if(element.Status =="Physically Moved")
          {
            this.PhysicallyMovedMTDQty =this.SelectedValue=="YTD"&& element.YTDTotalQty>0?element.YTDTotalQty:element.MTDTotalQty
            this.PhysicallyMovedYTD=this.SelectedValue=="YTD" && element.YTDTotalValue>0?element.YTDTotalValue:element.MTDTotalValue
          }
          if(element.Status =="Approved")
          {
            this.ApprovedMTDQty=this.SelectedValue=="YTD"&& element.YTDTotalQty>0?element.YTDTotalQty:element.MTDTotalQty
            this.ApprovedYTD=this.SelectedValue=="YTD" && element.YTDTotalValue>0?element.YTDTotalValue:element.MTDTotalValue
          }
          if(element.Status =="TotalCLItem")
          {
            this.TotalCLItemMTDQty=this.SelectedValue=="YTD"&& element.YTDTotalQty>0?element.YTDTotalQty:element.MTDTotalQty
            this.TotalCLItemYTD=this.SelectedValue=="YTD" && element.YTDTotalValue>0?element.YTDTotalValue:element.MTDTotalValue
          }
          if(element.Status =="InActiveItem")
          {
            this.InActiveItemMTDQty=this.SelectedValue=="YTD"&& element.YTDTotalQty>0?element.YTDTotalQty:element.MTDTotalQty
            this.InActiveItemYTD=this.SelectedValue=="YTD" && element.YTDTotalValue>0?element.YTDTotalValue:element.MTDTotalValue
          }
          if(element.Status =="LiveItem")
          {
            this.LiveItemMTDQty=this.SelectedValue=="YTD"&& element.YTDTotalQty>0?element.YTDTotalQty:element.MTDTotalQty
            this.LiveItemYTD=this.SelectedValue=="YTD" && element.YTDTotalValue>0?element.YTDTotalValue:element.MTDTotalValue
          }
          if(element.Status =="OrderCancelation")
          {
            this.OrderCancelationMTDQty=element.YTDTotalQty
            this.OrderCancelationYTD=element.YTDTotalValue
          }
          if(element.Status =="Sale")
          {
            this.SaleMTDQty=element.YTDTotalQty
            this.SaleYTD=element.YTDTotalValue
          }
          if(element.Status =="PrepareItem")
          {
            this.PrepareItemMTDQty=this.SelectedValue=="YTD"&& element.YTDTotalQty>0?element.YTDTotalQty:element.MTDTotalQty
            this.PrepareItemYTD=this.SelectedValue=="YTD" && element.YTDTotalValue>0?element.YTDTotalValue:element.MTDTotalValue
          }
        });
      })
    }
  } 
  
ExportSearch()
  {
   
    if(this.SelectedId==null && this.SelectedId==undefined )
    {
      alert("Please Select Warehouse !")
    }
    else if( (this.dateValue==null && this.dateValue==undefined) && this.SelectedId.WarehouseId)
    {
      alert("Please Select Date !")
    }
  else
  {
    this.Data = []
    this.loaderService.loading(true);
    let dy= moment(this.dateValue).format('MM/YYYY');
    let Val=this.SelectedValue
    let BID =[]
    if(this.BrandID!=undefined){
    this.BrandID.forEach(element => {
      BID.push(element.BrandNumber)
    });}

    let WarehouseId =[]
    if(this.SelectedId!=undefined){
    this.SelectedId.forEach(element => {
      WarehouseId.push(element.WarehouseId)
    });}
    const payload =
    {
      "WarehouseIds":WarehouseId,
      "Date":dy,
      "Value":Val,
      "BrandIds":BID
    }
    this.Get.GetSearchData(payload).subscribe((res:any)=>{
       let ClearanceLists
      if(Val=="YTD")
      {
        res.forEach(element => {
          ClearanceLists={  
            "WarehouseName,":element.WarehouseName,
            "Status": element.Status,
            "YTDQty": element.YTDQty>0?element.YTDQty:element.MTDQty,
            "YTDValue": element.YTDValue>0?element.YTDValue:element.MTDValue,

          }
          this.Data.push(ClearanceLists)
        })
        this.exportService.exportAsExcelFile(this.Data,'YTDDetails');
      }
      else
      {
        res.forEach(element => {
          ClearanceLists={  
            "WarehouseName,":element.WarehouseName,
            "Status": element.Status,
            "MTDQty": element.MTDQty,
            "MTDValue": element.MTDValue,

          }
          this.Data.push(ClearanceLists)
        })
        this.exportService.exportAsExcelFile(this.Data,'MTDDetails');
      }
      
      this.loaderService.loading(false);
    })
    
  }
}

GetExportData(num:any)
{
  var status="";
  if(this.SelectedId==null && this.SelectedId==undefined )
    {
      alert("Please Select Warehouse !")
    }
    else if( (this.dateValue==null && this.dateValue==undefined) && this.SelectedId.WarehouseId)
    {
      alert("Please Select Date !")
    }
    else
    {
     
      let dy= moment(this.dateValue).format('MM/YYYY');
      let Val=this.SelectedValue
      let BID =[]
      if(this.BrandID!=undefined){
      this.BrandID.forEach(element => {
        BID.push(element.BrandNumber)
      });}
  
      let WarehouseId =[]
      if(this.SelectedId!=undefined){
      this.SelectedId.forEach(element => {
        WarehouseId.push(element.WarehouseId)
      });}
      
      this.loaderService.loading(true);
      
    if(num==1) status="PrepareItem";
    else if(num==2) status="Pending";
    else if(num==3) status="Approved";
    else if(num==4) status="Physically Moved";
    
    const payload =
    {
      "WarehouseIds":WarehouseId,
      "Date":dy,
      "Value":Val,
      "BrandIds":BID,
      "Status":status
    }
    this.Get.GetExportSearchData(payload).subscribe((res:any)=>{
      this.ClearanceList=res
      if(num==1) this.exportService.exportAsExcelFile(this.ClearanceList.PrepareItemExportClearanceDashboardDataDcs,status);
    else if(num==2)  this.exportService.exportAsExcelFile(this.ClearanceList.PendingExportClearanceDashboardDataDcs,status);
    else if(num==3)  this.exportService.exportAsExcelFile(this.ClearanceList.ApprovedExportClearanceDashboardDataDcs,status);
    else if(num==4) this.exportService.exportAsExcelFile(this.ClearanceList.PhysicallMovedExportClearanceDashboardDataDcs,status);
      
      this.loaderService.loading(false);
    })
  }
}
}
