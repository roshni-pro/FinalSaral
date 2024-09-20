import { Component, OnInit } from '@angular/core';
import { InventoryAssignSupervisiorService } from 'app/current-stock/services/inventory-assign-supervisior.service';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';


@Component({
  selector: 'app-hq-stock-movement-request',
  templateUrl: './hq-stock-movement-request.component.html',
  styleUrls: ['./hq-stock-movement-request.component.scss']
})
export class HqStockMovementRequestComponent implements OnInit {
  wareHousList:any;
  warehouseIds:any=[]
  stockList:any;
  statusList:any;
  selWhId:any;
  selStockId:any;
  selStatusId:any;
  getDate:any;
  ItemPerPage:any;
  PageNo:any;
  movmentItemList:any;
  totalRecord:any;
  stDate:any;
  edDate:any;
  blocked:any;
  btnEnableStatusName:boolean;
  todayDate:Date;
  startDate:any;
  endDate:any;
  commentMsg:any;
  first:number;
  fromStockList : any;
  selFromStockId : any;
  constructor(private _service:InventoryAssignSupervisiorService, private confirmationService: ConfirmationService,private exportService : ExportServiceService) {
    this.stockList=[
      {'stockId':'All','stockName': 'All'},
      {'stockId':'DamageStock','stockName': 'Damage'},
      {'stockId':'NonSellable','stockName': 'NonSellable'},
      {'stockId':'NonRevenueStock','stockName': 'NonRevenueOrder'}
    ]

    this.fromStockList=[
      {'stockId':'All','stockName': 'Select From Stock Type'},
      {'stockId':'Current','stockName': 'Current'},
      {'stockId':'Clearance','stockName': 'Clearance'}
    ]

    this.statusList=[
      {'statusId':0,'statusName':'All'},
      // {'statusId':1,'statusName':'Pending'},
      // {'statusId':2,'statusName':'Approved By WLP'},
      {'statusId':3,'statusName':'Pending From HQLP'},
      {'statusId':4,'statusName':'Approved'},
      // {'statusId':5,'statusName':'Reject by WLP'},
      {'statusId':6,'statusName':'Reject by HQLP'},
    ]
   }

  ngOnInit() {
    this.getWHList();
     this.selStatusId = this.statusList.filter((x:any) => x.statusId == 3)[0];
    if(this.selStatusId.statusId == 3){
      this.btnEnableStatusName = true;
    }else{
      this.btnEnableStatusName = false;
    }
    this.todayDate = new Date();
  }

  getWHList(){
    this._service.getWarehouseList().subscribe(
      (res)=>{
        this.wareHousList = res;
      },
      (err)=>{
        alert(err.error.ErrorMessage)
      }
    )
  }

  load(event){
    this.first=0;
    //console.log(event)
    // if(event){
    //   var Last = event.first ? event.first + event.rows : 10
    //   this.ItemPerPage = event.rows
    //   this.PageNo = Last / event.rows
    // }
    console.log(this.getDate);

    if(this.selStatusId.statusId == 3){
      this.btnEnableStatusName = true;
    }else{
      this.btnEnableStatusName = false;
    }

    this.warehouseIds = [];
    if(this.selWhId != undefined){
      this.selWhId.forEach(element => {
        this.warehouseIds.push(element.WarehouseId)
      });
    }
    // this.selWhId ? this.selWhId.WarehouseId  :  1
    var payload={
      'warehouseId' :this.warehouseIds ,
      'stockType' : this.selStockId ? this.selStockId.stockId : 'All',
      'fromStockType' : this.selFromStockId ? this.selFromStockId.stockId : 'All',
      'status' : this.selStatusId ? this.selStatusId.statusId : 3,
      'startDate' : this.getDate == undefined ? '' : moment(this.getDate[0]).format('MM/DD/YYYY'),
      'endDate' : this.getDate == undefined ? '' : moment(this.getDate[1]).format('MM/DD/YYYY'),
      'skip' : event && (event.first/event.rows) ? (event.first/event.rows) : 0,
      'take' :  event && event.rows ? event.rows : 10,
      'actiontype' : null
    }
    
    console.log(payload);
    this.blocked = true;
    this._service.getMovementStockForHQList(payload).subscribe(
      (res)=>{
        console.log(res);
        res.MovementItems.forEach((el:any) => {
          el.approvedBtn = false;
          el.rejectBtn = false;
        });
        this.movmentItemList = res.MovementItems;
        this.totalRecord = res.totalRecord;
        this.blocked = false;
      },
      (err)=>{
        alert(err.error.ErrorMessage);
        this.blocked = false;
      }
    )
    
  }

  getSearchRecord()
  {
    this.first=0;
    this.load(event);
  }

  // getSearchRecord(){
  //   if(this.selWhId == undefined){
  //     alert('Please Select Warehouse');
  //     return false;
  //   }

  //   if(this.selStockId == undefined){
  //     alert('Please Select Stock');
  //     return false;
  //   }

  //   if(this.selStatusId.statusId == 3){
  //     this.btnEnableStatusName = true;
  //   }else{
  //     this.btnEnableStatusName = false;
  //   }
    
  //   var payload={
  //     'warehouseId' : this.selWhId.WarehouseId,
  //     'stockType' : this.selStockId.stockId,
  //     'status' : this.selStatusId.statusId,
  //     'startDate' : '',
  //     'endDate' : '',
  //     'skip' : 0,
  //     'take' : 10,
  //     'actiontype' : null
  //   }

  //   console.log(payload);
  //   this.blocked = true;
  //   this._service.getMovementStockForHQList(payload).subscribe(
  //     (res)=>{
  //       console.log(res);
  //       this.movmentItemList = res.MovementItems;
  //       this.totalRecord = res.totalRecord;
  //       this.blocked = false;
  //     },
  //     (err)=>{
  //       alert(err);
  //       this.blocked = false;
  //     }
  //   )

  // }

  commentShowForReject:boolean=false;
  reqId:number;
  status:boolean;
  rowData:any;
  getWHMovStatus(data,status){
   debugger
    // if(data.StockType=="NonRevenueStock")
    // {
    // fromStockType=9
    // }else{
      var fromStockType =data.StockType == 'Current' ? 7 : 8;
      debugger
    
    this.commentMsg = null;
    this.rowData = data;
    this.reqId = this.rowData.Id;
    this.status = status;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action ?',
      accept: () => {

        if(status == true){
          this.commentShowForReject = false;
          this.blocked = true;
          this.rowData.approvedBtn = true;
          
          
          this._service.hQMovementRequestProcess(this.reqId,this.status,this.commentMsg,fromStockType).subscribe(
            (res)=>{
              console.log(res);
              if(res.Status == true){
                alert(res.Message);
                this.load(event);
              }

              if(res.Status == false){
                alert(res.Message);
                this.load(event);
              }
              this.blocked = false;
            },
            (err)=>{
              alert(err.error.ErrorMessage);
              this.blocked = false;
            }
          )

        }else{
          this.commentShowForReject = true;
        }
      }
    });
  }

  closePopUp(){
    this.commentShowForReject = false;
  }

  space(event) {
    if (event.target.selectionStart === 0 && event.code === 'Space') {
      event.preventDefault();
    }
  }

  rejectBtn:boolean=false;
  saveCommentDetails(){
    if(this.commentMsg == null || this.commentMsg == ''){
      alert('Comment can not blank');
      return false;
    }
    this.rejectBtn = true;
    this.rowData.rejectBtn = true;
    var fromStockType = this.rowData.FromStockType == 'Current' ? 7 : 8;
    this._service.hQMovementRequestProcess(this.reqId,this.status,this.commentMsg,fromStockType).subscribe(
      (res)=>{
        console.log(res);
        if(res.Status == true){
          alert(res.Message);
          this.commentShowForReject = false;
          this.load(event);
        }

        if(res.Status == false){
          alert(res.Message);
          this.commentShowForReject = false;
          this.load(event);
        }
        this.rejectBtn = false;
        this.blocked = false;
      },
      (err)=>{
        alert(err.error.ErrorMessage);
        this.blocked = false;
        this.rejectBtn = false;
      }
    )
  }

  exportDownload(){
    if(this.selWhId == undefined){
      alert('Please Select Warehouse');
      return false;
    }
    if(this.selStockId == undefined){
      alert('Please Select Stock');
      return false;
    }
    if(this.getDate == undefined){
      alert('Please Select Date');
      return false;
    }

    this.startDate = moment(this.getDate[0]).format('MM/DD/YYYY') != 'Invalid date' ? moment(this.getDate[0]).format('MM/DD/YYYY') : '';
    this.endDate = moment(this.getDate[1]).format('MM/DD/YYYY') != 'Invalid date' ? moment(this.getDate[1]).format('MM/DD/YYYY') : '';

    this.warehouseIds = [];
    if(this.selWhId != undefined){
      this.selWhId.forEach(element => {
        this.warehouseIds.push(element.WarehouseId)
      });
    }

    var payload={
      'warehouseId' : this.warehouseIds,
      'stockType' : this.selStockId.stockId,
      'fromStockType' : this.selFromStockId ? this.selFromStockId.stockId : 'All',
      'status' : this.selStatusId.statusId, 
      'startDate' : this.startDate,
      'endDate' : this.endDate,
      'skip' : 0,
      'take' : this.totalRecord,
      'actiontype' : 'export'
    }
    this.blocked = true;
    // console.log(payload);
    this._service.getMovementStockForHQList(payload).subscribe(
      (res)=>{
        let exportList = [];
        this.blocked=false;
        console.log(res);
        res.MovementItems.forEach(element => {
          let obj = {
          StockType : element.StockType,
          FromStockType : element.FromStockType,
        WarehouseId : element.WarehouseId,
        WarehouseName : element.WarehouseName,
        ItemName : element.ItemName,
        ItemNumber : element.ItemNumber,
        MRP : element.MRP,
        ItemMultiMrpId : element.ItemMultiMrpId,
        CreatedDate  : element.CreatedDate,
        ModifiedDate  : element.ModifiedDate,
        BatchCode : element.BatchCode,
        MFGDate  : element.MFGDate,
        ExpiryDate  : element.ExpiryDate,
        RequestQty : element.RequestQty,
        Status : element.Status,
        Comment : element.Comment,
        Imageurl : element.Imageurl,
        RequestBy : element.RequestBy,
        AvailableQty : element.AvailableQty,
        APP : element.APP,
        PastInventory : element.PastInventory,
        FinalApprovedBy : element.FinalApprovedBy,
        StoreName : element.StoreName,
        CategoryName : element.CategoryName,
        SubCategory : element.SubCategory,
        SubsubCategory : element.SubsubCategory
          }
          exportList.push(obj);
        });
        // let exportList  = res.MovementItems;
        // debugger;
        if(exportList.length != 0){
          this.blocked=false;
          this.exportService.exportAsExcelFile(exportList, 'HQStockMovementRequestReport');
        }else{
          this.blocked=false;
          alert('No Record Found')
        }
      },
      (err)=>{
        this.blocked=false;
        alert(err.error.ErrorMessage);
      }
    )
  }

  displayImage:boolean=false;
  showSelImage:any;
  showImage(imgDetails){
    this.displayImage = true;
    this.showSelImage = imgDetails;
  }


}

