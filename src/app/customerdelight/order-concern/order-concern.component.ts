import { Component, OnInit } from '@angular/core';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OrderConcernCount, OrderForStatus } from '../interface/order-for-status';
import { OrderConcernService } from '../services/order-concern.service';

@Component({
  selector: 'app-order-concern',
  templateUrl: './order-concern.component.html',
  styleUrls: ['./order-concern.component.scss']
})
export class OrderConcernComponent implements OnInit {
  statusList : any;  
  keyWord : any;
  SelectedStatus : any;
  customerlist : any;
  isOpen : boolean = false;
  Comment : any;
  Status : any;
  orderForStatus : OrderForStatus;
  custdetail : any;
  isHistoryOpen : boolean = false;
  selectedItem : any;
  entity : any;
  TodayDate : Date;
  selectedMonth : any;
  orderConcernCount : OrderConcernCount;
  skip : number = 1;
  rowCount : number = 10;
  totalRecords : number = 0;
  blocked : boolean = false;
  isInvalid : boolean = false;
  first: number = 0;
  isOpenCustComment : boolean = false;
  custComment : any;
  labelText : any;
  warehouselistData : any;
  selectedWarehouse : any;
  hubIds : number[]=[];
  minDateValue: any;
  selectedDate : any;
  
  constructor(private _orderConcernService : OrderConcernService, private confirmationService: ConfirmationService
    ,private messageService: MessageService,private exportService : ExportServiceService
    ,private wareService : WarehouseService) { this.entity = "OrderConcern";this.custdetail={}; }

  ngOnInit() {
    this.SelectedStatus = null;
    this.selectedMonth = '';
    this.TodayDate = new Date();
    this.Status = null;
    debugger;
    this._orderConcernService.test().subscribe(x=>{
      debugger;
    })
    this.wareService.GetAllWarehouse().subscribe(
      (res) => {
        this.warehouselistData = res;
        this.load(null,false)
        this.hubIds = [];
        res.forEach(element => {
          this.hubIds.push(element.WarehouseId);
        });
      });
    // this.Search();
  }
  onSelectHub(selectedHubList){
    debugger;
    this.hubIds = [];
    selectedHubList.forEach(element => {
      this.hubIds.push(element.WarehouseId);
    });
  }
  Search(){
    if(this.selectedWarehouse && this.selectedWarehouse.length > 0){
      this.hubIds = [];
      this.selectedWarehouse.forEach(element => {
        this.hubIds.push(element.WarehouseId);
      });
    }else{
      this.hubIds = [];
      this.warehouselistData.forEach(element => {
        this.hubIds.push(element.WarehouseId);
      });
    }
    if((this.selectedDate && this.selectedDate[0] != null && this.selectedDate[1] != null) || !this.selectedDate)
    {
    this.orderConcernCount={
      keyword : (this.keyWord && this.keyWord.length > 0) ? this.keyWord : null,
      selectedMonth : this.selectedMonth != '' ? this.selectedMonth : null,
      skip : this.skip,
      take : this.rowCount,
      Status : this.SelectedStatus != 'null' ? this.SelectedStatus : null,
      WarehouseIds : this.hubIds,
      StartDate : this.selectedDate && this.selectedDate[0] ? this.selectedDate[0] : null,
      EndDate : this.selectedDate && this.selectedDate[1] ? this.selectedDate[1] : null
    }
    this.blocked = true;
    this._orderConcernService.getOrderConcern(this.orderConcernCount).subscribe(x=>{
      this.customerlist = x.orderConcernDcs;
      this.totalRecords = x.TotalCount;
      this.first = 0;
      // this.customerlist.forEach(element => {
      //   if(element.ModifiedDate != null)
      //   {
      //     var diff = this.getDataDiff(new Date(element.CreatedDate), new Date(element.ModifiedDate));
      //     console.log(diff);
      //     debugger;
      //     element.TurnAroundTime = diff;
      //   }else{
      //     element.TurnAroundTime = '-';
      //   }
       
      // });
     
      this.blocked = false;
    })
    }else if(this.selectedDate && this.selectedDate[0] != null && this.selectedDate[1] == null){
      alert('Start date And End Date Both Are Mandatory!!');
      this.messageService.add({ severity: 'error', summary: 'Start date And End Date Both Are Mandatory!!', detail: '' });
    }
  }
  onUpdate(){
    if((this.Comment && this.Comment.length >=5) && (this.Status == 'Pending' || this.Status == 'In Progress' || this.Status == 'Resolved')){
      this.confirmationService.confirm({
        message: 'Are you sure that you want to update this Order concern?',
        accept: () => {
          this.orderForStatus = {
            OrderId : this.custdetail.OrderId,
            CDComment : this.Comment,
            Status : this.Status,
            Id : this.custdetail.Id
          }
          this.blocked = true;
          this._orderConcernService.postOrderForStatus(this.orderForStatus).subscribe(x=>{
            debugger;
            this.blocked = false;
            if(x!= null){
              this.messageService.add({ severity: 'success', summary: 'Status updated Succesfully!!', detail: '' });
              // alert('Status updated Succesfully!!');
              this.isOpen = false;
              this.Status = null;
              this.Comment = null;
              this.Search();
            }else{
              this.messageService.add({ severity: 'error', summary: 'Data Not updated Succesfully!!', detail: '' });
              // alert('Data Not updated Succesfully!!');
            }
          })
        }
        }); 
    }else{
      this.isInvalid = true;
      if(this.Comment && this.Comment.length <5){
        alert('Minimum 5 length is mandatory!!');
        this.messageService.add({ severity: 'error', summary: 'Minimum 5 length is mandatory!!', detail: '' });

      }
    }
  
  }
  Check(custDetail){
    this.isInvalid = false;
    this.custdetail = custDetail;
    this.Status = custDetail.Status;
    this.Comment = custDetail.CDComment;
    this.custdetail.Amount = Number(custDetail.Amount).toFixed(2);
    if(custDetail.Status == 'Open'){
      this.Status = null;
    }
    this.isOpen = true;
    debugger;
  }
  onClickHistory(rowData){
    debugger;
    this.selectedItem = rowData;
    this.isHistoryOpen = true;
  }
  load(event,st){
    debugger;
    if(this.warehouselistData != null){
      if(this.selectedWarehouse && this.selectedWarehouse.length > 0){
        this.hubIds = [];
        this.selectedWarehouse.forEach(element => {
          this.hubIds.push(element.WarehouseId);
        });
    }else{
      this.hubIds = [];
      this.warehouselistData.forEach(element => {
        this.hubIds.push(element.WarehouseId);
      });
    }   
      if(st == true){
        if(this.keyWord == null && this.SelectedStatus == null && this.selectedMonth == null){
          this.messageService.add({ severity: 'error', summary: 'Please Select Any one Filter!!', detail: '' });
        }
        else if((this.selectedDate && this.selectedDate[0] != null && this.selectedDate[1] != null) || !this.selectedDate){
          // if(this.selectedMonth != null && this.selectedMonth != ""){
          //   this.keyWord = null;
          //   this.SelectedStatus = null;
          // }
          // if(this.SelectedStatus != null){
          //   this.keyWord = null;
          //   this.selectedMonth = null;
          // }
          this.selectedMonth
          var Last = event && event.first ? event.first + event.rows : 10;
          this.orderConcernCount={
            keyword : (this.keyWord && this.keyWord.length > 0) ? this.keyWord : null,
            selectedMonth : this.selectedMonth != '' ? this.selectedMonth : null,
            skip : event && event.rows ? Last / event.rows : Last / 10,
            take : event && event.rows ? event.rows : 10,
            Status : this.SelectedStatus != 'null' ? this.SelectedStatus : null,
            WarehouseIds : this.hubIds,
            StartDate : this.selectedDate && this.selectedDate[0] ? this.selectedDate[0] : null,
            EndDate : this.selectedDate && this.selectedDate[1] ? this.selectedDate[1] : null
          }
          this.blocked = true;
          this._orderConcernService.getOrderConcern(this.orderConcernCount).subscribe(x=>{
            debugger;
            this.customerlist = x.orderConcernDcs;
            this.totalRecords = x.TotalCount;
            this.blocked = false;
          })
        }else if(this.selectedDate && this.selectedDate[0] != null && this.selectedDate[1] == null){
          alert('Start date And End Date Both Are Mandatory!!');
          this.messageService.add({ severity: 'error', summary: 'Start date And End Date Both Are Mandatory!!', detail: '' });
        }
      }
      else{
        if((this.selectedDate && this.selectedDate[0] != null && this.selectedDate[1] != null) || !this.selectedDate){
        this.selectedMonth
        var Last = event && event.first ? event.first + event.rows : 10;
        this.orderConcernCount={
          keyword : (this.keyWord && this.keyWord.length > 0) ? this.keyWord : null,
          selectedMonth : this.selectedMonth != '' ? this.selectedMonth : null,
          skip : event && event.rows? Last / event.rows : Last / 10,
          take : event && event.rows ? event.rows : 10,
          Status : this.SelectedStatus != 'null' ? this.SelectedStatus : null,
          WarehouseIds : this.hubIds,
          StartDate : this.selectedDate && this.selectedDate[0] ? this.selectedDate[0] : null,
          EndDate : this.selectedDate && this.selectedDate[1] ? this.selectedDate[1] : null
        }
        this.blocked = true;
        this._orderConcernService.getOrderConcern(this.orderConcernCount).subscribe(x=>{
          debugger;
          this.customerlist = x.orderConcernDcs;
          this.totalRecords = x.TotalCount;
          // this.customerlist.forEach(element => {
          //   if(element.ModifiedDate != null)
          //   {
          //     var diff = this.getDataDiff(new Date(element.CreatedDate), new Date(element.ModifiedDate));
          //     console.log(diff);
          //     debugger;
          //     element.TurnAroundTime = diff;
          //   }else{
          //     element.TurnAroundTime = '-';
          //   }
          // });
          this.blocked = false;
        })
      }else if(this.selectedDate && this.selectedDate[0] != null && this.selectedDate[1] == null){
        alert('Start date And End Date Both Are Mandatory!!');
        this.messageService.add({ severity: 'error', summary: 'Start date And End Date Both Are Mandatory!!', detail: '' });
      }
      }
    }
  }
  getTotalTurnAroundTime(time){
    return Math.trunc(time / 60);
  }
  getDataDiff(startDate, endDate) {
    var diff = endDate.getTime() - startDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    return { day: days, hour: hours, minute: minutes, second: seconds };
}
onReset(){
  this.selectedWarehouse = [];
  this.hubIds = [];
  this.keyWord = null;
  this.SelectedStatus = null;
  this.selectedMonth = '';
  this.selectedDate = null;
  this.Search();
}
  onViewCustComment(cust){
    this.custComment = cust.CustComment;
    this.labelText = 'Customer Comment';
    this.isOpenCustComment = true;
  }
  onViewCDComment(cust){
    this.custComment = cust.CDComment;
    this.labelText = 'CD Comment';
    this.isOpenCustComment = true;
  }
  onExport(){
    if(this.selectedWarehouse && this.selectedWarehouse.length > 0){
      this.hubIds = [];
      this.selectedWarehouse.forEach(element => {
        this.hubIds.push(element.WarehouseId);
      });
    }else{
      this.hubIds = [];
      this.warehouselistData.forEach(element => {
        this.hubIds.push(element.WarehouseId);
      });
    }
    this.orderConcernCount={
      keyword : (this.keyWord && this.keyWord.length > 0) ? this.keyWord : null,
      selectedMonth : this.selectedMonth != '' ? this.selectedMonth : null,
      skip : 1,
      take : this.totalRecords ? this.totalRecords : 10,
      Status : this.SelectedStatus != 'null' ? this.SelectedStatus : null,
      WarehouseIds : this.hubIds,
      StartDate : this.selectedDate && this.selectedDate[0] ? this.selectedDate[0] : null,
      EndDate : this.selectedDate && this.selectedDate[1] ? this.selectedDate[1] : null
    }
    this.blocked = true;
    this._orderConcernService.getOrderConcern(this.orderConcernCount).subscribe(x=>{
      this.blocked = false;
      let orderConcernExportData = [];
      console.log('x.orderConcernDcs',x.orderConcernDcs);
      if(x.orderConcernDcs != null){
        x.orderConcernDcs.forEach(element => {
          let obj = {
            
            'Shop Name': element.ShopName,
            'Skcode': element.Skcode,
            'Warehouse Name': element.WarehouseName,
            'Order Id': element.OrderId,
            'Order Date': element.OrderDate,
            'Amount': element.Amount,
            'Deliverd Date': element.Deliverydate,
            'Customers Comment': element.CustComment,
            'CD team Update': element.CDComment ? element.CDComment : 'N/A',
            'Issue Raised Date': element.CreatedDate,
            'Last Updated Date': element.ModifiedDate ? element.ModifiedDate : 'N/A',
            'Turn Around Time': element.TurnAroundTime ? element.TurnAroundTime : 'N/A',
            'Status': element.Status,
            'Modified By': element.ModifiedByName ? element.ModifiedByName : 'N/A',  
           };
           orderConcernExportData.push(obj);
        });
        console.log('orderConcernExportData',orderConcernExportData);
      this.exportService.exportAsExcelFile(orderConcernExportData, 'OrderConcern_List');
      }else{
        alert('No Data Found!');
        this.messageService.add({ severity: 'error', summary: 'No Data Found!!', detail: '' });
      }
    });
  }
  public inputValidator(event: any) {
    debugger;
    if((event.target.value as string).indexOf(' ') >= 0){  
      this.Comment = null;  
      return {cannotContainSpace: true}  
  }  
  }

  // handleInput(event) {
  //   if (event.which === 32 && !this.value.length)
  //       event.preventDefault();
  // }
  public space(event:any){
    if (event.target.selectionStart === 0 && event.code === 'Space'){
      alert('space is not allowed');
      event.preventDefault();
    }
    }
}
