import { Component, OnInit } from '@angular/core';
import { InventoryAssignSupervisiorService } from 'app/current-stock/services/inventory-assign-supervisior.service';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { log } from 'console';

@Component({
  selector: 'app-movement-stock-request',
  templateUrl: './movement-stock-request.component.html',
  styleUrls: ['./movement-stock-request.component.scss']
})
export class MovementStockRequestComponent implements OnInit {
  wareHousList:any;
  warehouseId:any=[]
  stockList:any;
  statusList:any;
  selWhId:any;
  selStockId:any;
  selStatusId:any;
  warehouseIds:any=[]
  getDate:any;
  ItemPerPage:any;
  PageNo:any;
  movmentItemList:any;
  totalRecord:any;
  stDate:any;
  edDate:any;
  blocked:any;
  todayDate:Date;
  pastDate:Date;
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
    this.selFromStockId= {'stockId':'All','stockName': 'Select From Stock Type'};

    this.statusList=[
      {'statusId':0,'statusName':'All'},
      {'statusId':1,'statusName':'Pending'},
      {'statusId':2,'statusName':'Approved By WLP'},
      {'statusId':3,'statusName':'Pending From HQLP'},
      {'statusId':4,'statusName':'Approved'},
      {'statusId':5,'statusName':'Reject by WLP'},
      {'statusId':6,'statusName':'Reject by HQLP'},
    ]
   }

  ngOnInit() {
    this.getWHList();
    this.selStockId = this.stockList.filter((x:any) => x.stockId == 'All')[0];
    this.selStatusId = this.statusList.filter((x:any) => x.statusId == 0)[0];
    this.pastDate = new Date(new Date().setDate(new Date().getDate() - 30));
    this.getDate = moment(this.pastDate).format('MM/DD/YYYY') +' - '+ moment(new Date()).format('MM/DD/YYYY');
    this.todayDate = new Date();
  }

  getWHList(){
    this._service.getWarehouseList().subscribe(
      (res)=>{
        this.wareHousList = res;
        console.log("wareHousList",this.wareHousList);
        
        //this.selWhId = this.wareHousList.filter((x:any) => x.WarehouseId == 1)[0];
      },
      (err)=>{
        alert(err.error.ErrorMessage)
      }
    )
  }

  startDate:any;
  endDate:any;
  load(event){
 
    this.first=0;
    // if(event){
    //   var Last = event.first ? event.first + event.rows : 10
    //   this.ItemPerPage = event.rows
    //   this.PageNo = Last / event.rows
    // }

  
    

    if(this.getDate == null){
      alert('Please Select Date');
      return false;
    }

    if(typeof(this.getDate) == 'string'){
      this.startDate = this.getDate.split(' - ')[0];
      this.endDate = this.getDate.split(' - ')[1];
    }else{
      this.startDate = moment(this.getDate[0]).format('MM/DD/YYYY') != 'Invalid date' ? moment(this.getDate[0]).format('MM/DD/YYYY') : '';
      this.endDate = moment(this.getDate[1]).format('MM/DD/YYYY') != 'Invalid date' ? moment(this.getDate[1]).format('MM/DD/YYYY') : '';
    }

    const diffTime = Math.abs(this.getDate[1] - this.getDate[0]);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if(diffDays > 30){
      alert("You Can't Select More Than 30 Days");
      this.getDate = null;
    }else{
      this.getDate;
    }

    // this.warehouseId = [];
    // if(this.selWhId != undefined){
    //  this.selWhId.forEach(element => {
    //     this.warehouseId.push(this.selWhId.WarehouseId)
    //    });
    // }
 
    this.warehouseIds = [];
    if(this.selWhId != undefined){
      this.selWhId.forEach(element => {
        this.warehouseIds.push(element.WarehouseId)
      });
    }
    
  
    var payload={
      'warehouseId' :  this.warehouseIds,
      'stockType' : this.selStockId ? this.selStockId.stockId : 'All',
      'fromStockType' : this.selFromStockId ? this.selFromStockId.stockId : 'All',
      'status' : this.selStatusId ? this.selStatusId.statusId :0,
      'startDate' : this.startDate ? this.startDate : this.getDate.split(' - ')[0],
      'endDate' : this.endDate ? this.endDate : this.getDate.split(' - ')[1],
      'skip' : event && (event.first/event.rows) ? (event.first/event.rows) : 0,
      'take' :  event && event.rows ? event.rows : 10,
      'actiontype' : null
    }
    
    console.log(payload);
   
    this.blocked = true;
    this._service.getMovementStockForWarehouseList(payload).subscribe(
      (res)=>{
        console.log(res);
        if(res.MovementItems != null)
        {
          res.MovementItems.forEach((el:any) => {
            el.approvedBtn = false;
            el.rejectBtn = false;
          });
        }        
        this.movmentItemList = res.MovementItems;
      console.log("movmentItemList",this.movmentItemList);
      
        this.totalRecord = res.totalRecord;
        console.log(this.totalRecord);
        
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
    this.warehouseId=[];
    this.load(event);
  }

  // getSearchRecords(){
  //   this.movmentItemList = [];
  //   this.totalRecord = 0;

  //   if(this.getDate == null){
  //     alert('Please Select Date');
  //     return false;
  //   }

  //   if(typeof(this.getDate) == 'string'){
  //     this.startDate = this.getDate.split(' - ')[0];
  //     this.endDate = this.getDate.split(' - ')[1];
  //   }else{
  //     this.startDate = moment(this.getDate[0]).format('MM/DD/YYYY') != 'Invalid date' ? moment(this.getDate[0]).format('MM/DD/YYYY') : '';
  //     this.endDate = moment(this.getDate[1]).format('MM/DD/YYYY') != 'Invalid date' ? moment(this.getDate[1]).format('MM/DD/YYYY') : '';
  //   }

  //   const diffTime = Math.abs(this.getDate[1] - this.getDate[0]);
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

  //   if(diffDays > 30){
  //     alert("You Can't Select More Than 30 Days");
  //     this.getDate = null;
  //   }else{
  //     this.getDate;
  //   }
    
  //   var payload={
  //     'warehouseId' : this.selWhId.WarehouseId,
  //     'stockType' : this.selStockId.stockId,
  //     'status' : this.selStatusId.statusId, 
  //     'startDate' : this.startDate,
  //     'endDate' : this.endDate,
  //     'skip' : 0,
  //     'take' : 10,
  //     'actiontype' : null
  //   }

  //   console.log(payload);
  //   this.blocked = true;
  //   this._service.getMovementStockForWarehouseList(payload).subscribe(
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
 
    
    this.commentMsg = null;
    this.rowData = data;

    this.reqId = this.rowData.Id;
    this.status = status;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action ?',
      accept: () => {
     
      if(data.StockType=="NonRevenueStock")
      {
        fromStockType=9
      }
      else
      {
        var fromStockType = this.rowData.FromStockType == 'Current' ? 7 : 8;

      }
        if(status == true){
          this.commentShowForReject = false;
          this.blocked = true;
          this.rowData.approvedBtn = true;
          var stockttype=this.selStockId

       

          this._service.whMovementRequestProcess(this.reqId,this.status,this.commentMsg,fromStockType).subscribe(
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

  exportDownload(){
    if(typeof(this.getDate) == 'string'){
      this.startDate = this.getDate.split(' - ')[0];
      this.endDate = this.getDate.split(' - ')[1];
    }else{
      this.startDate = moment(this.getDate[0]).format('MM/DD/YYYY') != 'Invalid date' ? moment(this.getDate[0]).format('MM/DD/YYYY') : '';
      this.endDate = moment(this.getDate[1]).format('MM/DD/YYYY') != 'Invalid date' ? moment(this.getDate[1]).format('MM/DD/YYYY') : '';
    }

    // //this.warehouseId =[];
    // if(this.selWhId != undefined){
    //   // this.selWhId.forEach(element => {
    //     this.warehouseId.push(this.selWhId.WarehouseId)
    //     console.log(this.warehouseId);
        
    //   // });
    // }
    this.warehouseIds = [];
    if(this.selWhId != undefined){
      this.selWhId.forEach(element => {
        this.warehouseIds.push(element.WarehouseId)
      });
    }
    if(this.selStockId.stockId=='NonRevenueStock')
    {
      this.selStockId.stockId=9
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
this.blocked=true;
    console.log(payload);
    this._service.getMovementStockForWarehouseList(payload).subscribe(
      (res)=>{
        this.blocked=false;
        console.log(res);
        let exportList = res.MovementItems;
        if(exportList.length != 0){
          this.blocked=false;
          this.exportService.exportAsExcelFile(exportList, 'WarehouseStockMovementRequestReport');
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

    this._service.whMovementRequestProcess(this.reqId,this.status,this.commentMsg,fromStockType).subscribe(
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

  displayImage:boolean=false;
  showSelImage:any;
  showImage(imgDetails){
    this.displayImage = true;
    this.showSelImage = imgDetails;
  }
}
