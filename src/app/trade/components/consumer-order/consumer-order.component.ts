import { Component, OnInit } from '@angular/core';
import { TradeOrdersService } from 'app/shared/services/trade-orders.service';
import { ExportService } from 'app/shared/services/export.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { filterConsumerOrderdc } from 'app/shared/interface/trade/filterConsumerOrder-dc';

@Component({
  selector: 'app-consumer-order',
  templateUrl: './consumer-order.component.html',
  styleUrls: ['./consumer-order.component.scss']
})
export class ConsumerOrderComponent implements OnInit {
  ConsumerOrderList: any[];
  shoppingCartlist: any;
  baseUrl: any;
  blocked: boolean;
  totalRecords: number;
  selectedRowDetails: any;
  data: filterConsumerOrderdc;
  selectedRow: any;
  isDetails: boolean;
  InvoiceUrl: any;
  isDboyPopup: boolean;
  isSearch: boolean;
  isTable: boolean;
  Reason: string;
  OrderStatus: any[];
  OrderStatusV1: any[];
  isOpenPopup: boolean;
  isFormInvalid: boolean;
  currentStaus: any;
  order: any;
  PageSize: number;
  selectedque: any;
  dBoyList: any[];
  peopleId: any;
  exportInvoiceList: any[];
  isDelivered: boolean;
  isPending: boolean;
  isorderAmount: boolean;
  Count: number;
  showDirectionDialog: boolean;
  selectedLocation: any;
  clusterList: any[];
  selectedOrderStatus: any[];
  resonrequired: boolean;
  showDeliveryBoy: boolean;
  deliveryBoyList: any[];
  selectedDboy: any;
  constructor(private consumerOrderService: TradeOrdersService
    , private messageService: MessageService,
    private exportService: ExportServiceService,
    private confirmationService: ConfirmationService) {
    this.order = {};
    this.baseUrl = environment.tradeapiURL;
    this.OrderStatusV1 = [
      { label: 'Select OrderStatus', value: null, order: 0 },
      { label: 'Pending', value: 'Pending', order: 1 },
      { label: 'Confirmed', value: 'Confirmed', order: 2 },
      { label: 'Shipped', value: 'Shipped', order: 3 },
      { label: 'Delivered', value: 'Delivered', order: 4 },
      { label: 'settled', value: 'settled', order: 5 },
      { label: 'Cancelled', value: 'Cancelled', order: 6 },
      // { label: 'Payment Pending', value: 'Payment Pending', order: 7 },

    ];
    this.OrderStatus = [
      //{ label: 'Select OrderStatus', value: null },
      { label: 'Pending', value: 'Pending', order: 1 },
      { label: 'Confirmed', value: 'Confirmed', order: 2 },
      { label: 'Shipped', value: 'Shipped', order: 3 },
      { label: 'Delivered', value: 'Delivered', order: 4 },
      { label: 'settled', value: 'settled', order: 5 },
      { label: 'Cancelled', value: 'Cancelled', order: 6 }
    ];

    this.selectedOrderStatus = [];
  }

  ngOnInit() {
    this.selectedDboy = null;
    this.showDirectionDialog = false;
    this.order.Reason = null;
    this.isOpenPopup = false;
    this.isDboyPopup = false;
    this.peopleId = localStorage.getItem('userid');
    // console.log('peopleId:',this.peopleId);
    this.getClusterList();
    this.PageSize = 30;
    this.data = {
      InvoiceNo: null,
      OrderStatus: '',
      skip: 0,
      take: this.PageSize,
      StartDate: null,
      EndDate: null,
      SearchString: '',
      ClusterId: null
    }
    //  this.initialize();
  }

  initialize() {
    this.blocked = true;
    this.consumerOrderService.getConsumerOrders(this.data).subscribe(result => {
      console.log('result is:', result);
      this.blocked = false;
      this.isDboyPopup = false;
      this.shoppingCartlist = result;
      this.ConsumerOrderList = this.shoppingCartlist.shoppingCartDc;
      this.totalRecords = this.shoppingCartlist.Total_Orders;
      for (var i in this.ConsumerOrderList) {
        this.ConsumerOrderList[i].InvoiceDate = this.ConsumerOrderList[i].InvoiceDate ? moment(this.ConsumerOrderList[i].InvoiceDate).format('DD/MM/YYYY') : null
      }

    })
  }

  load(event) {
    this.data.skip = event.first;
    this.data.take = event.rows;
    this.initialize();
  }

  PrintInvoice(rowData) {
    this.consumerOrderService.getCartInvoice(rowData.CartId).subscribe(x => {
      this.InvoiceUrl = this.baseUrl + x;
      window.open(this.InvoiceUrl);
    })
  }

  openDetails(d, e) {
    this.selectedRowDetails = d;
    // if (this.selectedRow != undefined) {
    //   this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    // }
    // this.selectedRow = e;
    // this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    this.isDetails = true;
  }

  isDetailsFalse(isDetails: boolean) {
    this.isDetails = isDetails;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
  }

  OpenPopup(rowData) {
    this.showDeliveryBoy = false;
    this.selectedDboy = null;
    console.log('rowData: ', rowData);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Procced?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.order = rowData;
        this.currentStaus = this.order.CartStatus;
        this.updateStatusList(this.currentStaus, rowData.PaymentMode, rowData);
        this.order.Reason = null;
        this.order.Amount = null;
        this.Count = null;
        this.isOpenPopup = true;
        this.isPending = false;
        this.isDelivered = false;
        this.isorderAmount = false;
        this.isFormInvalid = false;
      }
    })
  }

  toggleSearch() {
    if (this.isSearch == true) {
      this.isSearch = false;
    } else {
      if (this.isTable == true) {
        this.isTable = false;
      }
      this.isSearch = true;
    }
  }

  onSearch(data) {
    if (data.SearchString && data.SearchString.length < 3) {
      this.messageService.add({ severity: 'error', summary: 'please enter more Keywords!!', detail: '' });
    }
    else if (data.StartDate != null && data.EndDate == null) {
      this.messageService.add({ severity: 'error', summary: 'End date is required !!', detail: '' });
    }
    else if (data.StartDate == null && data.EndDate != null) {
      this.messageService.add({ severity: 'error', summary: 'Start date is required !!', detail: '' });
    }
    else if (data.StartDate > data.EndDate) {
      this.messageService.add({ severity: 'error', summary: 'Start date can not be greater than End date !', detail: '' });
    }
    else {
      this.blocked = true;
      this.data = {
        InvoiceNo: data.InvoiceNo,
        OrderStatus: data.CartStatus,
        CartStatus: data.CartStatus,
        skip: 0,
        take: this.PageSize,
        StartDate: data.StartDate,
        EndDate: data.EndDate,
        SearchString: data.SearchString,
        ClusterId: data.ClusterId ? Number(data.ClusterId) : null
      }
      this.blocked = false;
      this.initialize();
    }
  }

  onstatusChange() {

    if (this.order.CartStatus == "Confirmed") {
      //console.log('data:', data);
      this.showDeliveryBoy = true;
      this.consumerOrderService.getSellerDeliveryBoyForAssignment(this.order.SellerId).subscribe(x => {
        this.deliveryBoyList = x;
        console.log('getSellerDeliveryBoyForAssignment: ', x);
      });
    } else {
      this.showDeliveryBoy = false;
      this.selectedDboy = null;
    }



    if (this.order.CartStatus == "Delivered") {
      this.isorderAmount = true;
    }
    else {
      this.isorderAmount = false;
    }
    if (this.currentStaus == "Delivered") {
      if (this.order.CartStatus != "settled") {
        this.isDelivered = true;
        this.Count = 1;
        //this.order.CartStatus=this.currentStaus;
      }
      else {
        this.Count = 0;
        this.isDelivered = false;
        this.isPending = false;
      }
    }
    else if (this.currentStaus == "Shipped") {
      if (this.order.CartStatus == "Pending") {
        this.isPending = true;
        this.Count = 1;
      }
      else {
        this.Count = 0;
        this.isDelivered = false;
        this.isPending = false;
      }
    }
    else {
      this.Count = 0;
      this.isDelivered = false;
      this.isPending = false;
    }


  }

  saveStatus(order, Form) {
    console.log('order is: ', order);
    if (Form.form.status == "VALID" && order.CartStatus != "null") {
      if (order.CartStatus == 'Cancelled' && order.Reason == null) {
        this.resonrequired = false
        this.messageService.add({ severity: 'error', summary: 'Reason Required for Cancelled!!', detail: '' });
        return;
      }
      this.isFormInvalid = false;
      if (order.PaymentMode == "UPI" && order.CartStatus == "Cancelled") {
        this.isOpenPopup = false;
        order.CartStatus = this.currentStaus;
        this.messageService.add({ severity: 'error', summary: 'UPI payment cant be Cancelled!!', detail: '' });
        //this.onReset();
      }
      else {
        if (this.Count == 1) {
          this.isOpenPopup = false;
          order.CartStatus = this.currentStaus;
          this.messageService.add({ severity: 'error', summary: 'Can not change status!!', detail: '' });
        }
        else {
          this.confirmationService.confirm({
            message: 'Are you sure that you want to change Consumer orderStatus?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              
              var dataToPost =
              {
                cartId: order.CartId,
                status: order.CartStatus,
                deliveryCharges: order.DeliveryCharges,
                dboyMobile: this.selectedDboy ? this.selectedDboy.Mobile : order.DboyMobile,
                ChangeReason: order.Reason,
                ReceivedAmount: order.Amount,
                userId: this.peopleId
              }
              this.blocked = true;
              this.consumerOrderService.changeorderStatus(dataToPost).subscribe(result => {
                this.blocked = false;
                this.isOpenPopup = false;
                this.messageService.add({ severity: 'success', summary: 'Status change Successfully!!', detail: '' });
                this.initialize();
              })
            }
          })
        }
      }
    }
    else {
      this.isFormInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'Please select valid order status', detail: '' });

    }
  }

  // Cancel() {
  //   this.isOpenPopup = false;
  //   this.order.Reason = null;
  //   this.order = [];
  //   this.onReset();
  // }

  editDboy(data) {

    this.isDboyPopup = true;
    this.consumerOrderService.getDboydetails(data.DboyMobile).subscribe(x => {
      this.selectedque = x;
    })
    this.consumerOrderService.getDBoyList().subscribe(result => {

    })
  }

  exportItemlist(dates) {
    var arr = [];
    if (dates.StartDate != null && dates.EndDate == null) {
      this.messageService.add({ severity: 'error', summary: 'End date is required !!', detail: '' });
    }
    else if (dates.StartDate == null && dates.EndDate != null) {
      this.messageService.add({ severity: 'error', summary: 'Start date is required !!', detail: '' });
    }
    else if (dates.StartDate > dates.EndDate) {
      this.messageService.add({ severity: 'error', summary: 'Start date can not be greater than End date !', detail: '' });
    }
    else
    //  if (dates.CartStatus ||dates.EndDate || 
    //   dates.StartDate|| dates.SearchString || dates.ClusterId) 
    {
      this.blocked = true;
      this.data = {
        InvoiceNo: null,
        OrderStatus: dates.CartStatus,
        skip: 0,
        take: this.totalRecords,
        StartDate: dates.StartDate,
        EndDate: dates.EndDate,
        SearchString: dates.SearchString,
        ClusterId: dates.ClusterId ? Number(dates.ClusterId) : null
      }
      this.consumerOrderService.getConsumerOrders(this.data).subscribe(result => {
        this.blocked = false;
        this.shoppingCartlist = result;
        this.ConsumerOrderList = this.shoppingCartlist.shoppingCartDc;
        console.log('this.shoppingCartlist : ', this.shoppingCartlist);
        this.ConsumerOrderList.forEach(x => {
          x.ShoppingCartItems.forEach(element => {
            let obj: any = {
              BuyerName: x.BuyerName,
              SellerName: x.SellerName,
              ClusterName: x.ClusterName,
              InvoiceNo: x.InvoiceNo,
              BuyerMobile: x.BuyerMobile,
              Address: x.ShippingAddress,
              ItemId: element.ItemId,
              ItemName: element.ItemName,
              Qty: element.Qty,
              Price: element.Price,
              TotalAmount: element.TotalAmount,
              OrderStatus: x.CartStatus,
              ItemStatus: element.OrderStatus,
              CreatedDate: element.CreatedDate,
              DeliveredDate: x.DeliveredDate,
              PaymentMode: x.PaymentMode,
            }
            arr.push(obj);
          });
        })
        this.exportService.exportAsExcelFile(arr, 'ConsumersItemList');
        this.ngOnInit();
      }, erro => {
        this.blocked = false;
        this.messageService.add({ severity: 'error', summary: 'To many Orders.Please select minimum Date Range.!', detail: '' });
        this.data.StartDate = null;
        this.data.EndDate = null;
      });
    }
    // else{
    //   this.messageService.add({ severity: 'error', summary: 'Please Select atleast one field(Exclude Invoice No.) !', detail: '' });
    // }
  }

  onReset() {
    this.isOpenPopup = false;
    this.order.Reason = null;
    this.order = [];
    this.data = {
      InvoiceNo: null,
      OrderStatus: '',
      skip: 0,
      take: this.PageSize,
      StartDate: null,
      EndDate: null,
      SearchString: ''
    }
    this.initialize();
  }

  exportConsumerInvoice(order) {
    var array = [];
    if (order.StartDate != null && order.EndDate == null) {
      this.messageService.add({ severity: 'error', summary: 'End date is required !!', detail: '' });
    }
    else if (order.StartDate == null && order.EndDate != null) {
      this.messageService.add({ severity: 'error', summary: 'Start date is required !!', detail: '' });
    }
    else if (order.StartDate > order.EndDate) {
      this.messageService.add({ severity: 'error', summary: 'Start date can not be greater than End date !', detail: '' });
    }
    else {
      this.blocked = true;
      this.data = {
        InvoiceNo: null,
        OrderStatus: order.CartStatus,
        skip: 0,
        take: this.totalRecords,
        StartDate: order.StartDate,
        EndDate: order.EndDate,
        SearchString: order.SearchString,
        ClusterId: order.ClusterId ? Number(order.ClusterId) : null
      }
      this.consumerOrderService.getConsumerOrders(this.data).subscribe(result => {
        this.blocked = false;
        this.shoppingCartlist = result;
        this.ConsumerOrderList = this.shoppingCartlist.shoppingCartDc;
        // console.log(' this.ConsumerOrderList : ', this.ConsumerOrderList);
        this.ConsumerOrderList.forEach(x => {
          let obj: any = {
            BuyerName: x.BuyerName,
            SellerName: x.SellerName,
            ClusterName: x.ClusterName,
            InvoiceNo: x.InvoiceNo,
            OrderAmount: x.OrderAmount,
            PaymentMode: x.PaymentMode,
            BuyerMobile: x.BuyerMobile,
            ShippingAddress: x.ShippingAddress,
            Status: x.CartStatus,
            DboyName: x.DboyName,
            DboyMobile: x.DboyMobile,
            DeliveryCharges: x.DeliveryCharges,
            DeliveredDate: x.DeliveredDate,
            InvoiceDate: x.InvoiceDate
          }
          array.push(obj);
        })
        this.exportService.exportAsExcelFile(array, 'TradeConsumerInvoice');
        this.ngOnInit();

      }, erro => {
        this.blocked = false;
        this.messageService.add({ severity: 'error', summary: 'To many Orders.Please select valid Date Range.!', detail: '' });
        this.data.StartDate = null;
        this.data.EndDate = null;
      });
    }
    // else{
    //   this.messageService.add({ severity: 'error', summary: 'Please Select atleast one field(Exclude Invoice No.) !', detail: '' });
    // }
  }

  onCloseDirectionDialog(event) {
    this.showDirectionDialog = false;
  }
  CloseItemDetils(event) {
    window.location.reload();
  }

  openLocation(data) {
    this.selectedLocation = data;

    this.showDirectionDialog = true;
  }

  getClusterList() {
    this.consumerOrderService.getAllClusters('Indore').subscribe(x => {
      this.clusterList = x;
      console.log('Cluster list: ', x);
    });
  }

  onCancelPopup() {
    this.order.CartStatus = this.currentStaus;
    this.order.Reason = null;
    this.order.Amount = null;
    this.Count = null;
    this.order = null;
    this.isOpenPopup = false;
    this.isPending = false;
    this.isDelivered = false;
    this.isorderAmount = false;
    this.isFormInvalid = false;
  }

  private updateStatusList(currentStatus: string, paymentMode: string, rowData) {
    
    //'Pending' 'Confirmed' 'Shipped' 'Delivered' 'settled' 'Cancelled'
    if (currentStatus == 'Pending' && paymentMode == "Cash on Delivery") {
      this.selectedOrderStatus = this.OrderStatus.filter(x => {
        return x.label == 'Pending' || x.label == 'Confirmed' || x.label == 'Cancelled';
      });
    }
    else if (currentStatus == 'Pending' && paymentMode != "Cash on Delivery") {
      this.selectedOrderStatus = this.OrderStatus.filter(x => {
        return x.label == 'Pending' || x.label == 'Confirmed';
      });
    }
    else if (currentStatus == 'Confirmed') {
      this.selectedOrderStatus = this.OrderStatus.filter(x => {
        return x.label == 'Confirmed' || x.label == 'Shipped';
      });
    }
    else if (currentStatus == 'Shipped') {
      this.selectedOrderStatus = this.OrderStatus.filter(x => {
        return x.label == 'Shipped' || x.label == 'Delivered';
      });
    }
    else if (currentStatus == 'Delivered') {
      this.selectedOrderStatus = this.OrderStatus.filter(x => {
        return x.label == 'Delivered';
        //return x.label == 'Delivered' || x.label == 'settled';
      });
    }
    if (currentStatus == 'Pending' && rowData.ShoppingCartItems[0].OrderStatus == 'Payment Pending') {
      this.selectedOrderStatus = this.OrderStatus.filter(x => {
        return x.label == 'Confirmed' || x.label == 'Cancelled';
        //return x.label == 'Delivered' || x.label == 'settled';
      });
    }



  }
}
