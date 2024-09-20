import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { OrderService } from 'app/shared/services/order.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';


@Component({
  selector: 'app-order-cancel-request',
  templateUrl: './order-cancel-request.component.html',
  styleUrls: ['./order-cancel-request.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ],
})
export class OrderCancelRequestComponent implements OnInit {
  @Input() Id: any;

  group: any;
  isopen: boolean;
  searchModel: any;

  warehouses: any[];
  OLIST: any[];
  isInvalid: boolean;
  isDetails: boolean;
  selectedRowDetails: any;
  loading: boolean;
  isLoading: boolean;
  totalRecords: number;
  selectedRow: any;
  show: boolean;
  paymentFrom: any[];
  WarehouseIdlist: any[];
  orderlist: any;
  popUpopen: boolean;
  data: any;
  data2: any;
  data3: any;
  data4: any;
  listOrder: any;
  detailList: any;
  searchModel2:any;
  RDList:any[];
  callbackpop:any;
  addData:any;
  cbRDData:any;
  Redispatchedcheck:any;
  blocked:boolean;
  openHistory:boolean;
  historylist:any;
  dataDC:any;
  rangeDates:any;
  minDate: Date;
  maxDate: Date;
  addexport:any;
  Redispatchedcount:any;
  constructor(private OrderService: OrderService,private exportService: ExportServiceService,private router: Router, private modalService: NgbModal, private wh: WarehouseService, private messageService: MessageService) { this.isopen === false; this.group = {}; this.searchModel = {}; this.data = {};this.searchModel2={};this.addData={};this.dataDC={};this.addexport={}; }

  ngOnInit() {
    this.blocked = true;
    this.isInvalid = false;
    this.show = false;
    this.popUpopen = false;
    this.callbackpop=false;
    this.searchModel=[];
    //  this.IsActive = true;
    this.wh.getSpecificWarehouses().subscribe(result => {
      this.warehouses = result;
    })
   // this.paymentFrom.push(0); 
        let today = new Date();
        let lastDate = new Date();
        lastDate.setDate(today.getDate() + 5);
        this.rangeDates = [ lastDate, today];
        this.minDate = today;
        this.maxDate = lastDate;
  }

  load(event)  {
    this.blocked = true;
    this.wh.getSpecificWarehouses().subscribe(result => {
      this.warehouses = result;
      let whouse = [];
      this.warehouses.forEach(element => {
        whouse.push(element.WarehouseId);
      });
      this.group.warehouseid = whouse;
      var Last=  event.first ? event.first + event.rows : 20;
      var dataToPost = {
        ItemPerPage: event.rows,
        PageNo:Last / event.rows,
        WarehouseIds: this.group.warehouseid,
        Cityids: 0,
        start: null,
        end: null,
        OrderId: 0,
        Skcode: "",
        ShopName: "",
        Mobile: "",
        status: "Delivery Canceled Request",
        TimeLeft: null,
        LevelName: null,
        invoice_no: null,
        PaymentFrom: [""],
        GenerationId: 0,
        OrderType: -1,
        SortDirection: ""
      }
      this.OrderService.GetData(dataToPost).subscribe(result => {
        if(result.ordermaster.length>0){
          this.OLIST = result.ordermaster;
          this.totalRecords = result.total_count;
          this.blocked = false;
          this.messageService.add({ severity: 'success', summary: 'Get Data Successfully!!', detail: '' });
        }else{
          this.OLIST=[];
          this.blocked = false;
          this.messageService.add({ severity: 'error', summary: 'No data found!!', detail: '' });
        }
    
      })
    })
}
  onTabChange(event) {
    
    this.blocked=true;
    this.show = false;
    if (event.index == 0) {
      this.show = true;
      this.blocked=false;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigateByUrl('layout/OrderAssignments/orderCancelRequest'));
    }
    else if (event.index == 1) {
      this.show = true;
      this.blocked=false;
      var dataToPost = {
        WarehouseId:0,
        OrderId:0,
        Skcode:'',
        MobileNumber:null
      }
      this.SearchRD(dataToPost);
    } else if (event.index == 2) {
      this.show = true;
      this.blocked=false;
      //this.GetCompanyWheelConfigurations();
    }
  }
  Search(group) {
    this.blocked=true;
    this.WarehouseIdlist = [];
    this.paymentFrom = [];
    let whouse = [];
    if (group.Warehouseid !=undefined ) {
      this.group.Warehouseid.forEach(element => {
        whouse.push(element.WarehouseId);
      });
      this.group.warehouseid = whouse;
    } else {
      this.blocked=false;
      this.messageService.add({ severity: 'error', summary: 'Please select warehouse!!', detail: '' });
      return;
    }
    // if (group.Warehouseid.length > 0) {
    //   this.WarehouseIdlist.push(group.Warehouseid);
    // }else{
    //   this.messageService.add({ severity: 'error', summary: 'Please select warehouse!!', detail: '' });
    //   return;
    // }
    this.paymentFrom.push();
    var dataToPost = {
      ItemPerPage: 20,
      PageNo: 1,
      WarehouseIds: this.group.warehouseid,
      Cityids: 0,
      start: null,
      end: null,
      OrderId: group.Orderid,
      Skcode: group.SkCode ? group.SkCode : "",
      ShopName: "",
      Mobile: "",
      status: "Delivery Canceled Request",
      TimeLeft: null,
      LevelName: null,
      invoice_no: null,
      PaymentFrom: this.paymentFrom,
      GenerationId: 0,
      OrderType: -1,
      SortDirection: ""
    }
    this.OrderService.GetData(dataToPost).subscribe(result => {
      if(result.ordermaster.length>0){
        this.OLIST = result.ordermaster;
        this.totalRecords = result.total_count;
        this.blocked=false;
        this.messageService.add({ severity: 'success', summary: 'Get Data Successfully!!', detail: '' });
      }else{
        this.OLIST=[];
        this.blocked=false;
        this.messageService.add({ severity: 'error', summary: 'No data found!!', detail: '' });
      }

    })
  }

  updateStatus(data1) {
    this.popUpopen = true;
    this.data = [];
    this.listOrder = data1;
    this.searchModel =[];
    this.Redispatchedcount=data1.ReDispatchCount;
  }


  update(storedata) {
    let d = this.searchModel;
    let f =this.searchModel2;
    let orderid = this.listOrder.OrderId;
    if(storedata.Comments==null ||storedata.Comments ==undefined){
      this.messageService.add({ severity: 'error', summary: 'Enter Please Comment!!', detail: '' });
      return;
    }
    if (d.value == "Reject") {
      this.OrderService.getOrderDetails(orderid).subscribe(x => {
        this.detailList = x[0];

        var datatopost = {
          OrderDispatchedMasterId: this.detailList.OrderDispatchedMasterId,
          OrderId: this.detailList.OrderId,
          Status: "Shipped",
          DeliveryIssuanceId: this.detailList.DeliveryIssuanceId,
          DboyMobileNo: this.detailList.DboyMobileNo,
          DboyName: this.detailList.DboyName,
          ReDispatchCount: this.detailList.RecivedAmount,
          WarehouseId: this.detailList.WarehouseId,
          DeliveryLat: this.detailList.DeliveryLat,
          DeliveryLng: this.detailList.DeliveryLng,
          CancelrequestComments: storedata.Comments
        }
        if (this.detailList != null) {
          this.OrderService.updateOrderStatus(datatopost).subscribe(x => {
            this.popUpopen = false;
            this.messageService.add({ severity: 'success', summary: 'Update Successfully!!', detail: '' });
          //  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            //  this.router.navigateByUrl('layout/OrderAssignments/orderCancelRequest'));
          });
        }
      });
    } else if (d.value == "Delivery Canceled") {
      if(storedata.regionStatus==null ||storedata.regionStatus ==undefined){
        this.messageService.add({ severity: 'error', summary: 'Enter Please Region Status!!', detail: '' });
        return;
      }
      this.OrderService.getOrderDetails(orderid).subscribe(x => {
        this.detailList = x[0];

        var datatoposts = {
          OrderDispatchedMasterId: this.detailList.OrderDispatchedMasterId,
          OrderId: this.detailList.OrderId,
          Status: d.value,
          DeliveryIssuanceId: this.detailList.DeliveryIssuanceId,
          DboyMobileNo: this.detailList.DboyMobileNo,
          DboyName: this.detailList.DboyName,
          ReDispatchCount: this.detailList.RecivedAmount,
          WarehouseId: this.detailList.WarehouseId,
          DeliveryLat: this.detailList.DeliveryLat,
          DeliveryLng: this.detailList.DeliveryLng,
          CancelrequestComments: storedata.Comments,
          DeliveryCanceledStatus:storedata.regionStatus
        }
        if (this.detailList != null) {
          this.OrderService.updateOrderStatus(datatoposts).subscribe(x => {
            var list = x.Message;
            this.popUpopen=false;
            if(x.Status){
               this.messageService.add({ severity: 'success', summary: list, detail: '' });
             }else{
               this.messageService.add({ severity: 'error', summary: list, detail: '' });
              // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
               //this.router.navigateByUrl('layout/OrderAssignments/orderCancelRequest'));
             }
          });

        }
      });
    } else if (d.value == "Delivery Redispatch") {
      this.OrderService.getOrderDetails(orderid).subscribe(x => {
        this.detailList = x[0];
        if(f.value=="Call back"){
        var datatoposts = {
          OrderDispatchedMasterId: this.detailList.OrderDispatchedMasterId,
          OrderId: this.detailList.OrderId,
          Status: d.value,
          DeliveryIssuanceId: this.detailList.DeliveryIssuanceId,
          DboyMobileNo: this.detailList.DboyMobileNo,
          DboyName: this.detailList.DboyName,
          ReDispatchCount: this.detailList.RecivedAmount,
          WarehouseId: this.detailList.WarehouseId,
          DeliveryLat: this.detailList.DeliveryLat,
          DeliveryLng: this.detailList.DeliveryLng,
          CancelrequestComments: storedata.Comments,
          DeliveryCanceledStatus:f.value,
          ConformationDate:null
        }
        if (this.detailList != null) {
          this.OrderService.updateOrderStatus(datatoposts).subscribe(x => {
            var list = x.Message;
            this.popUpopen=false;
            this.messageService.add({ severity: 'success', summary: list, detail: '' });
            //this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
           // this.router.navigateByUrl('layout/OrderAssignments/orderCancelRequest'));
          });
        }
      }else if(f.value=="Confirm"){
        if(storedata.ToDate==null||storedata.ToDate==undefined){
          this.messageService.add({ severity: 'error', summary: 'Please Select Date !!', detail: '' });
          return;
        }
        var datatoposts1 = {
          OrderDispatchedMasterId: this.detailList.OrderDispatchedMasterId,
          OrderId: this.detailList.OrderId,
          Status: d.value,
          DeliveryIssuanceId: this.detailList.DeliveryIssuanceId,
          DboyMobileNo: this.detailList.DboyMobileNo,
          DboyName: this.detailList.DboyName,
          ReDispatchCount: this.detailList.RecivedAmount,
          WarehouseId: this.detailList.WarehouseId,
          DeliveryLat: this.detailList.DeliveryLat,
          DeliveryLng: this.detailList.DeliveryLng,
          CancelrequestComments: storedata.Comments,
          ConformationDate:storedata.ToDate,
          DeliveryCanceledStatus:f.value
        }
        if (this.detailList != null) {
          this.OrderService.updateOrderStatus(datatoposts1).subscribe(x => {
            var list =  x.Message;
            this.popUpopen=false;
            this.messageService.add({ severity: 'success', summary: list, detail: '' });
            //this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            //this.router.navigateByUrl('layout/OrderAssignments/orderCancelRequest'));
          });
        }
      }
      });
    }
  }
  SearchRD(group) {
    this.blocked=true;
    var dataToPost = {
      WarehouseId:group.WarehouseId,
      OrderId:group.OrderId,
      Skcode:group.SkCode,
      MobileNumber:null
    }
    this.OrderService.getOrderCallback(dataToPost).subscribe(result => {
      if(result.length>0){
        this.RDList = result;
        this.blocked=false;
        this.messageService.add({ severity: 'success', summary: 'Get Data Successfully!!', detail: '' });
      }else{
        this.RDList=[];
        this.blocked=false;
        this.messageService.add({ severity: 'error', summary: 'No data found!!', detail: '' });
      }
    })
  }
  updateStatusRD(RDData) {
    this.callbackpop = true;
    this.cbRDData = RDData;
    this.Redispatchedcheck = RDData.ReDispatchCount;
    this.addData = [];
    this.data=[];
    this.dataDC=[];
  }
  callBackRDupdate(getCallBackData) {
    this.blocked = true;
    let Z = this.addData;
    let orderid = this.cbRDData.OrderId;
    if (getCallBackData.Comments == null || getCallBackData.Comments == undefined) {
      this.messageService.add({ severity: 'error', summary: 'Enter Please Comment!!', detail: '' });
      this.blocked = false;
      return;
    }
    this.OrderService.getOrderDetails(orderid).subscribe(x => {
      this.detailList = x[0];
      if (this.detailList != null) {
        if (Z.value == "Confirm") {
          if (getCallBackData.ToDate == null || getCallBackData.ToDate == undefined) {
            this.messageService.add({ severity: 'error', summary: 'Please Select Date !!', detail: '' });
            this.blocked = false;
            return;
          }
          var datatoposts = {
            value: Z.value,
            OrderId: this.detailList.OrderId,
            Comments: getCallBackData.Comments,
            DeliveryCanceledStatus: Z.value,
            Date: getCallBackData.ToDate
          }
          if (this.detailList != null) {
            this.OrderService.UpdateCallBackdate(datatoposts).subscribe(x => {
              var list = x;
              this.callbackpop = false;
              this.blocked = false;
              //this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              //this.router.navigateByUrl('layout/OrderAssignments/orderCancelRequest'));
            });
          }
        } else if (Z.value == "Delivery Canceled") {
          var datatoposts1 = {
            OrderDispatchedMasterId: this.detailList.OrderDispatchedMasterId,
            OrderId: this.detailList.OrderId,
            Status: "Delivery Canceled",
            DeliveryIssuanceId: this.detailList.DeliveryIssuanceId,
            DboyMobileNo: this.detailList.DboyMobileNo,
            DboyName: this.detailList.DboyName,
            ReDispatchCount: this.detailList.RecivedAmount,
            WarehouseId: this.detailList.WarehouseId,
            DeliveryLat: this.detailList.DeliveryLat,
            DeliveryLng: this.detailList.DeliveryLng,
            CancelrequestComments: getCallBackData.Comments,
            ConformationDate: null,
            DeliveryCanceledStatus: Z.value
          }
          if (this.detailList != null) {
            this.OrderService.UpadteDCStatus(datatoposts1).subscribe(x => {
              var list = x.Message;
              this.callbackpop = false;
              this.blocked = false;
              if (x.Status) {

                // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                //this.router.navigateByUrl('layout/OrderAssignments/orderCancelRequest'));
                this.messageService.add({ severity: 'success', summary: list, detail: '' });
              } else {
                this.messageService.add({ severity: 'error', summary: list, detail: '' });
                // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                //this.router.navigateByUrl('layout/OrderAssignments/orderCancelRequest'));
              }

              //window.location.reload();
            });
          }
        }
      }
      this.blocked=false;
    });
  }
  reset(){
this.group=[];
  }

  getExport(){
    if(this.OLIST.length>0)
    {
       var exportOrder=[];
       this.OLIST.forEach(element => {
        exportOrder.push(
          {
             OrderId:element.OrderId,
             SkCode:element.SkCode,
             //MobileNumber:element.Customerphonenum,
             WarehouseName:element.WarehouseName,
             Status:element.Status,
             DispatchedAmount:element.DispatchAmount,
             OrderDate:element.CreatedDate,
             DCRDate:element.Distance
          }
        )
       });
       this.exportService.exportAsExcelFile(exportOrder, 'DCROrderExport');
    }
    else
    {
      alert('Data not found');
    }
  }

  export(Q) {
    
    this.blocked = true;
    if (Q.type == undefined) {
      this.messageService.add({ severity: 'error', summary: 'Please select type', detail: '' });
      return;
    }else if(Q.start==undefined){
      this.messageService.add({ severity: 'error', summary: 'Please select Start Date', detail: '' });
      return;
    }
    else if(Q.end==undefined){
      this.messageService.add({ severity: 'error', summary: 'Please select End Date', detail: '' });
      return;
    }
    var FromDate = Q.start ? moment(Q.start).format('YYYY-MM-DD') : null
      var ToDate = Q.end ? moment(Q.end).format('YYYY-MM-DD') : null
  
    this.OrderService.getDCRExport(Q.type,FromDate,ToDate).subscribe(x => {
      var exportlist=x;
      this.blocked = false;
      this.exportService.exportAsExcelFile(exportlist, 'DCROrderExport');
    });
  }
  resetExport(E){
this.addexport=[];
  }
}
