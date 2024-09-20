import { Component, OnInit } from '@angular/core';
import { InventoryAssignSupervisiorService } from 'app/current-stock/services/inventory-assign-supervisior.service';
import * as moment from 'moment';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-inventory-cycle',
  templateUrl: './inventory-cycle.component.html',
  styleUrls: ['./inventory-cycle.component.scss']
})
export class InventoryCycleComponent implements OnInit {
  wareHousList:any;
  selWhId:any;
  getDate:any;
  inventoryList:any[]=[];
  blocked:boolean=false;
  ItemPerPage: any;
  PageNo: any;
  SelectedWareHouse:number
  TotalRecords:number
  ImgPic:any
  displayImage:boolean=false
  ImgPic1:any
  ImgPic2:any
  displayImage1:boolean=false
  displayExport:boolean=true

  constructor(private _service:InventoryAssignSupervisiorService,private exportService : ExportServiceService, ) { }

  ngOnInit() {
    this.getWHList();
  }

  getWHList(){
    this._service.getWarehouseListNew().subscribe(
      (res)=>{
        this.wareHousList = res;
      },
      (err)=>{
        alert(err.error.ErrorMessage)
      }
    )
    }
  load(event)
  {
    if (event) {
      var Last = event.first ? event.first + event.rows : 10
      this.ItemPerPage = event.rows
      this.PageNo = Last / event.rows
    }
    this.inventoryList = [];
      let modifyDate = this.getDate == undefined ? null : moment(this.getDate).format('MM/DD/YYYY');
      this.SelectedWareHouse=this.selWhId.value
      this.blocked = true;
      this._service.GetgetInventoryCycleSearchListPagination(this.SelectedWareHouse,this.PageNo,this.ItemPerPage,modifyDate).subscribe(
        (res)=>{
          this.inventoryList = res.GetInventCycledatadto;
          this.TotalRecords=res.total_count
             console.log(this.inventoryList,"inventoryList");
          this.blocked = false;
        },
        (err)=>{
          alert(err.error.ErrorMessage);
          this.blocked = false;
        }
      )
  }
  searchResult(){
    this.inventoryList=[];
    this.TotalRecords=0;
    if(this.selWhId == undefined){
      alert('Please Select Warehouse')
      return false;
    }

    if(this.getDate == undefined){
      alert('Please Select Date')
      return false;
    }

    this.SelectedWareHouse=this.selWhId.value
      let modifyDate = this.getDate == undefined ? null : moment(this.getDate).format('MM/DD/YYYY');
      this.blocked = true;
      this._service.GetgetInventoryCycleSearchListPagination(this.SelectedWareHouse,this.PageNo,this.ItemPerPage,modifyDate).subscribe(
        (res)=>{          
          // console.log(res);
          this.inventoryList = res.GetInventCycledatadto;
          if(this.inventoryList.length == 0){
            alert('No Record Found');
            this.blocked = false;
            return false;
          }
          this.TotalRecords=res.total_count
            this.inventoryList.forEach(x=>
              {
                x.Diff=((x.CurrentInventory+x.RtpCount+x.RtdCount+x.DamagedQty+x.NonSellableQty)-x.InventoryCount)
              })  
          // this.ImgPic= res.GetInventCycledatadto.InventoryCycleItemBatchDcs.DamagedImageUrl
          this.blocked = false;
        },
        (err)=>{
          alert(err.error.ErrorMessage);
          this.blocked = false;
        }
      )
  }
  exportDownload(){
    if(this.selWhId == undefined){
      alert('Please Select Warehouse')
      return false;
    }

    if(this.getDate == undefined){
      alert('Please Select Date')
      return false;
    }
      var totalRec = this.TotalRecords == 0 ?  10 : this.TotalRecords; 
      let modifyDate = this.getDate == undefined ? null : moment(this.getDate).format('MM/DD/YYYY');
      this.SelectedWareHouse=this.selWhId.value;
      this.blocked = true;
      this._service.GetgetInventoryCycleSearchListPagination(this.SelectedWareHouse,this.PageNo,totalRec,modifyDate).subscribe(
        (res)=>{
          var inventoryListExport = res.GetInventCycledatadto;
          console.log(inventoryListExport,"inventoryListExport");
          
          if(inventoryListExport.length == 0){
            alert('No Record Found');
            this.blocked = false;
            return false;
          }
          this.TotalRecords=res.total_count
          inventoryListExport.forEach(x=>
            {
              x.Diff=((x.CurrentInventory+x.RtpCount+x.RtdCount+x.DamagedQty+x.NonSellableQty)-x.InventoryCount)
            }) 
            var result = inventoryListExport.map(function (a) {
            return {
              'Id': a.Id,
              'WarehouseId': a.WarehouseId,
              'ItemName': a.ItemName,
              'ItemMultiMRPId':a.ItemMultiMRPId,
              'WarehouseName': a.WarehouseName,
              'InventoryCount': a.InventoryCount,
              'Comment': a.Comment,
              'CurrentInventory': a.CurrentInventory,
              'CreatedDate': a.CreatedDate,
              'MRP': a.MRP,
              'ItemNumber': a.ItemNumber,
              'Barcode': a.Barcode,
              'PastInventory': a.PastInventory,
              'ItemId': a.ItemId,
              'UpdatedDate': a.UpdatedDate,
              'Updatedby': a.Updatedby,
              'RtdCount': a.RtdCount,
              'RtpCount': a.RtpCount,
              'DamagedQty': a.DamagedQty,
              'NonSellableQty':a.NonSellableQty,
              'Diff':a.Diff,
              'IsApproved': a.IsApproved,
              'ABCClassification': a.ABCClassification
            };
          });
          this.exportService.exportAsExcelFile(result, 'InventoryCycleReport');
          this.blocked = false;
        },
        (err)=>{
          alert(err.error.ErrorMessage);
          this.blocked = false;
        }
      )
  }
  ShowImg(item)
  {
    this.displayImage=true
    this.ImgPic1=item
  }
  ShowImg1(item)
  {
    this.displayImage1=true
    this.ImgPic2=item
  }
}
