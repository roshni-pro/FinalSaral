import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from 'app/shared/services/loader.service';
import { Component, OnInit } from '@angular/core';
import { TradeOrdersService } from 'app/shared/services/trade-orders.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { environment } from 'environments/environment';
import { filterConsumerOrderdc } from 'app/shared/interface/trade/filterConsumerOrder-dc';
import * as moment from 'moment';
import { OrderAssignmentsService } from 'app/order-assignments/Services/order-assignments.service';
// import moment = require('moment');

@Component({
  selector: 'app-order-assignments',
  templateUrl: './order-assignments.component.html',
  styleUrls: ['./order-assignments.component.scss']
})
export class OrderAssignmentsComponent implements OnInit {
  max = 5;
  cartstatus = ''
  //mine
  // isOpenPopup = false;
  deliveryBoyExisting = {};
  dboyid = 0;
  newdboy = false;
  dboy = {};
  irSummaryObject = null;
  sellerslist = [];
  clusterList = [];
  //old
  ConsumerOrderList: any[];
  shoppingCartlist: any;
  baseUrl: any;
  Skip: number;
  Take: number;
  blocked: boolean;
  totalRecords: number;
  selectedRowDetails: any;
  data: filterConsumerOrderdc;
  selectedRow: any;
  isDetails: boolean;
  InvoiceUrl: any;
  isDboyPopup: boolean;
  isSearch: boolean = true;
  isTable: boolean;
  Reason: string;
  OrderStatus: any[];
  isOpenPopup: boolean;
  isFormInvalid: boolean;
  order: any;
  PageSize: number;
  selectedque: any;
  dBoyList: any[];
  peopleId: any;
  exportInvoiceList: any[];
  idnotexist = false;

  cols: any[] = [
    { field: 'SellerName', header: 'Seller Name' },

    { field: 'ClusterName', header: 'Cluster' },
    { field: 'BuyerName', header: 'Buyer Name' },
    // { field: 'BuyerMobile', header: 'Buyer Mobile' },


    { field: 'InvoiceNo', header: 'Invoice No  ' },
    { field: 'OrderAmount', header: 'Order Amount' },
    { field: 'PaymentMode', header: 'Payment Mode' },
    { field: 'CartStatus', header: 'Cart Status' },

    // { field: 'CartStatus', header: 'Status' },

    { field: 'DeliveryCharges', header: 'Delivery Charges' },

    { field: 'AmountExDelivery', header: 'Amount excluding Delivery Charge' },


    { field: 'InvoiceDate', header: 'Invoice Date' },

    // { field: 'ShippingAddress', header: 'Buyer Address' },
    { field: 'Details', header: 'Details', bools: true },
    // { field: 'Status', header: 'Status',isSatus:true},
    // { field: 'Dboydetails', header: 'Edit/Dboy',isDboy:true},
    { field: 'Action', header: 'Print Invoice', bool: true }
  ];
  selectedList: any = [];
  isValidated: boolean;
  isBigOpenPopup: boolean;
  deliveryBoyList: any[];
  deliverycharge = 0;
  sellerList: any;
  zones = []

  constructor(private router: Router, private r: ActivatedRoute, private loaderService: LoaderService, private confirmationService1: ConfirmationService, private consumerOrderService: OrderAssignmentsService, private messageService: MessageService,
    private exportService: ExportServiceService, private confirmationService: ConfirmationService, ) {
    this.order = {};
    this.baseUrl = environment.tradeapiURL;
    this.OrderStatus = [
      // { label: 'Select', value: null },
      // { label: 'Pending', value: 'Pending' },
      { label: 'Confirmed', value: 'Confirmed' },
      { label: 'Shipped', value: 'Shipped' },
      // { label: 'Delivered', value: 'Delivered' },
      // { label: 'settled', value: 'settled' },
      // { label: 'Cancelled', value: 'Cancelled' }
    ];
  }

  ngOnInit() {
    this.order.Reason = null;
    this.isOpenPopup = false;
    this.isDboyPopup = false;
    this.peopleId = localStorage.getItem('userid');
    // console.log('peopleId:',this.peopleId);
    this.getClusterList();
    this.PageSize = 10;
    this.data = {
      InvoiceNo: null,
      OrderStatus: '',
      skip: 0,
      take: this.PageSize,
      StartDate: null,
      EndDate: null
    }
    this.getSelletsList();


    //  this.initialize();
  }

  getSeLlerList(event) {
    if (event.query.length > 2) {
      this.consumerOrderService.getSellerByName(event.query).subscribe(result => {
        this.sellerslist = result;
        console.log('this.getSellerByName :', this.sellerslist);
      });
      //this.sellerList = this.sellerList.filter(x=>x.CustomerName == event.query);
    }
  }

  getSelletsList() {
    this.consumerOrderService.getAllSellers().subscribe(result => {

      this.sellerslist = result;
      this.sellerslist.forEach(element => {
        if (element.CustomerName == "") {

          this.sellerslist.splice(this.sellerslist.findIndex(seller => seller.CustomerId == element.CustomerId), 1);
        }
      });
      this.sellerslist.sort(function (a, b) {
        if (a.CustomerName < b.CustomerName) { return -1; }
        if (a.CustomerName > b.CustomerName) { return 1; }
        return 0;
      })

    });
  }

  getClusterList() {
    this.consumerOrderService.getAllClusters('Indore').subscribe(x => {

      this.clusterList = x;

    });
  }


  initialize() {
    this.blocked = true;

    this.consumerOrderService.getConsumerOrdersV3(this.data).subscribe(result => {

      this.blocked = false;
      this.isDboyPopup = false;
      this.shoppingCartlist = result;
      console.log('this.shoppingCartlist: ', this.shoppingCartlist);
      if (!this.shoppingCartlist || !this.shoppingCartlist.shoppingCartDc || this.shoppingCartlist.shoppingCartDc.length < 1) {

        this.messageService.add({ severity: 'error', summary: 'No Orders Found !!', detail: '' });
      }

      this.ConsumerOrderList = this.shoppingCartlist.shoppingCartDc;

      this.ConsumerOrderList.forEach(element => {
        element.AmountExDelivery= 0;
        if (element.DeliveryCharges > 0) {
          element.AmountExDelivery = element.OrderAmount - element.DeliveryCharges
        }
        else {
          element.AmountExDelivery = element.OrderAmount
        }
        element.AmountExDelivery = element.AmountExDelivery.toFixed(1);
        Math.round(element.AmountExDelivery);
      });
      if (this.ConsumerOrderList && this.ConsumerOrderList.length > 0) {
        this.totalRecords = this.shoppingCartlist.Total_Orders;
      } else {
        this.totalRecords = 0;
      }


      for (var i in this.ConsumerOrderList) {
        if (this.ConsumerOrderList[i].ClusterName == null) {
          this.ConsumerOrderList[i].ClusterName = ''
        }

        // this.ConsumerOrderList[i].InvoiceDate = new Date(this.ConsumerOrderList[i].InvoiceDate);
        this.ConsumerOrderList[i].InvoiceDate = this.ConsumerOrderList[i].InvoiceDate ? moment(this.ConsumerOrderList[i].InvoiceDate).format('MM/DD/YYYY') : null
      }

    }, error => {
      this.blocked = false;
      this.messageService.add({ severity: 'error', summary: 'No Orders Found !!', detail: '' });
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


    this.selectedRowDetails = d.ShoppingCartItems;
    if (this.selectedRow != undefined) {
      if(this.selectedRow.path){
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
    }
    this.selectedRow = e;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    }
    this.isDetails = true;
  }

  isDetailsFalse(isDetails: boolean) {
    this.isDetails = isDetails;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
  }

  OpenPopup(rowData) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Procced?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.order = rowData;
        this.order.Reason = null;
        this.isOpenPopup = true;
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

    // data.sellerId = data.CustomerId;
    this.selectedList = []
    if (!this.data.sellerId) {
      this.idnotexist = true;
    }
    else {
      this.idnotexist = false;
    }

    if (data.StartDate != null && data.EndDate == null) {
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
      let clusterlist = []
      let immutableclusterlist = []
      
      if (data.ClusterIdsList && data.ClusterIdsList.length) {
        immutableclusterlist = data.ClusterIdsList;
        data.ClusterIdsList.forEach(element => {
          
          if (element && element.ClusterId)
            clusterlist.push(element.ClusterId)
        });

        data.ClusterIdsList = clusterlist
      }
      this.data = {
        InvoiceNo: data.InvoiceNo,
        OrderStatus: this.cartstatus,
        skip: 0,
        take: this.PageSize,
        StartDate: data.StartDate,
        EndDate: data.EndDate,
        SearchString: data.SearchString,
        sellerId: data.sellerId,
        ClusterId: data.ClusterId,
        ClusterIdsList: data.ClusterIdsList,
        zoneId: data.zoneId
      }
      this.blocked = false;
      this.data.sellerId && this.data.sellerId.CustomerId ? this.data.sellerId = this.data.sellerId.CustomerId : '';
      // if (this.data.sellerId) {
      this.initialize();

      setTimeout(() => {
        this.data.ClusterIdsList = immutableclusterlist;
      }, 300);
      // }
    }
  }

  saveStatus(order, Form) {
    if (Form.form.status == "VALID") {
      this.isFormInvalid = false;
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
            dboyMobile: order.DboyMobile,
            ChangeReason: order.Reason,
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
    else {
      this.isFormInvalid = true;
    }
  }

  Cancel() {
    this.isOpenPopup = false;
    this.order.Reason = null;
    this.order = [];
    this.initialize();
  }

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
    if (dates.StartDate == null && dates.EndDate == null) {
      this.messageService.add({ severity: 'error', summary: 'Both dates are required !!', detail: '' });
    }
    else if (dates.StartDate != null && dates.EndDate == null) {
      this.messageService.add({ severity: 'error', summary: 'End date is required !!', detail: '' });
    }
    else if (dates.StartDate == null && dates.EndDate != null) {
      this.messageService.add({ severity: 'error', summary: 'Start date is required !!', detail: '' });
    }
    else if (dates.StartDate > dates.EndDate) {
      this.messageService.add({ severity: 'error', summary: 'Start date can not be greater than End date !', detail: '' });
    }
    else {
      var dataPost = {
        StartDate: dates.StartDate,
        EndDate: dates.EndDate
      }
      this.blocked = true;
      this.consumerOrderService.getExportOrderA7(dataPost).subscribe(result => {
        this.blocked = false;
        this.ConsumerOrderList = result;

        this.ConsumerOrderList.forEach(x => {
          x.ShoppingCartItems.forEach(element => {
            let obj: any = {
              BuyerName: x.BuyerName,
              SellerName: x.SellerName,
              InvoiceNo: x.InvoiceNo,
              BuyerMobile: x.BuyerMobile,
              ItemId: element.ItemId,
              ItemName: element.ItemName,
              Qty: element.Qty,
              Price: element.Price,
              TotalAmount: element.TotalAmount,
              ItemStatus: element.OrderStatus,
              CreatedDate: element.CreatedDate
            }
            arr.push(obj);
          });
        })
        this.exportService.exportAsExcelFile(arr, 'ConsumersItemList');
      }, erro => {
        this.blocked = false;
        this.messageService.add({ severity: 'error', summary: 'To many Orders.Please select minimum Date Range.!', detail: '' });
        this.data.StartDate = null;
        this.data.EndDate = null;
      });
    }
  }

  onReset() {
    this.data = {
      InvoiceNo: null,
      OrderStatus: '',
      skip: 0,
      take: this.PageSize,
      StartDate: null,
      EndDate: null,
      sellerId: null
    }
    this.cartstatus = ''
    // this.initialize();
  }

  exportConsumerInvoice(order) {
    var array = [];
    if (order.StartDate == null && order.EndDate == null) {
      this.messageService.add({ severity: 'error', summary: 'Both dates are required !!', detail: '' });
    }
    else if (order.StartDate != null && order.EndDate == null) {
      this.messageService.add({ severity: 'error', summary: 'End date is required !!', detail: '' });
    }
    else if (order.StartDate == null && order.EndDate != null) {
      this.messageService.add({ severity: 'error', summary: 'Start date is required !!', detail: '' });
    }
    else if (order.StartDate > order.EndDate) {
      this.messageService.add({ severity: 'error', summary: 'Start date can not be greater than End date !', detail: '' });
    }
    else {
      var dataPost = {
        StartDate: order.StartDate,
        EndDate: order.EndDate
      }
      this.blocked = true;
      console.log('ExportdateObj', dataPost);
      this.consumerOrderService.getExportOrderA7(dataPost).subscribe(result => {
        this.blocked = false;
        this.ConsumerOrderList = result;
        this.ConsumerOrderList.forEach(x => {
          let obj: any = {
            BuyerName: x.BuyerName,
            SellerName: x.SellerName,
            InvoiceNo: x.InvoiceNo,
            OrderAmount: x.OrderAmount,
            PaymentMode: x.PaymentMode,
            BuyerMobile: x.BuyerMobile,
            Status: x.CartStatus,
            DboyName: x.DboyName,
            DboyMobile: x.DboyMobile,
            DeliveryCharges: x.DeliveryCharges,
            InvoiceDate: x.InvoiceDate
          }
          array.push(obj);
        })
        this.exportService.exportAsExcelFile(array, 'TradeConsumerInvoice');
      }, erro => {
        this.blocked = false;
        this.messageService.add({ severity: 'error', summary: 'To many Orders.Please select Min Date Range.!', detail: '' });
        this.data.StartDate = null;
        this.data.EndDate = null;
      });
    }
  }


  onRowClick(ir) {


    if (ir.CartStatus == 'Pending') {
      ir.IsSelected = !ir.IsSelected;
      let index = this.selectedList.indexOf(ir);
      if (index != -1) {
        this.selectedList.splice(index, 1);
      }
      else {
        this.selectedList.push(ir);
        console.log("ir:", ir);


      }
      this.calcculateIrSummary();
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Please select Pending Orders!', detail: '' });


    }
  }

  openPopup() {
    this.isValidated = false;
    // this.supplierService.GetBank().subscribe(result => {

    //   this.bankList = result;
    // });
    // this.PrPayment = {
    //   BankId: null,
    //   BankName: '',
    //   PrList: this.selectedList,
    //   PaymentDate: new Date(),
    //   RefNo: '',
    //   Remark: '',
    //   TotalAmount: this.irSummaryObject.totalAmount,
    //   TotalReaminingAmount: this.irSummaryObject.TotalAmount
    // };


    this.GetSellerDeliveryBoyForAssignment();
  }

  GetSellerDeliveryBoyForAssignment() {
    this.consumerOrderService.GetSellerDeliveryBoyForAssignment(this.data.sellerId).subscribe(result => {

      this.isBigOpenPopup = true;
      this.deliveryBoyList = result;
      this.blocked = false;
    });

  }

  onDeselectIR(ir) {
    this.onRowClick(ir);

    this.messageService.add({ severity: 'success', summary: 'item removed', detail: '' });


    // this.confirmationService1.confirm({
    //   message: 'Are you sure that you want to perform this action?',
    //   accept: () => {

    //   }
    // });
  }

  detectNegativeEntry(val) {

    if (val == "") {
      this.deliverycharge = 0;

    }
    if (isNaN(val)) {
      this.deliverycharge = 0;
    } else {
      if (val < 0)
        this.deliverycharge = 0;
    }

  }

  assignDBoy(form: any) {

    let frmdate = new Date();
    frmdate.setDate(frmdate.getDate() - 1);



    this.isBigOpenPopup = false;


    this.isValidated = true;

    if (true) {
      this.loaderService.isLoading.next(true);
      let cartIds = []
      this.selectedList.forEach(selectedItem => {

        cartIds.push(selectedItem.CartId.toString());
      });

      let assignmentDc = {

        SellerId: this.data.sellerId,
        DboyMobile: form.control.controls.Mobile.value,
        DboyFirstName: form.control.controls.firstname.value,
        DboyLastName: form.control.controls.lastname.value,
        DboyAddress: form.control.controls.address.value,
        // DeliveryCharges: this.deliverycharge,
        CartIds: cartIds
      }

      // this.consumerOrderService.AssignDboyToCart(assignmentDc).subscribe(result => {



      this.consumerOrderService.AssignDboyToCartV2(assignmentDc).subscribe(result => {


        if (result == true) {
          this.messageService.add({ severity: 'success', summary: 'Order Assigned to Delivery Boy', detail: '' });
          setTimeout(() => {
            this.router.navigate(['dboyassignmentsummary', {

              sellerId: this.data.sellerId, dboyId: this.dboyid, fromdate: frmdate, todate: new Date(),
              dboyMobile: assignmentDc.DboyMobile
            }], { relativeTo: this.r.parent });

          }, 2000);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Assignment Failed', detail: '' });

        }

        this.loaderService.isLoading.next(false);

      });



    }


  }

  private getData() {
    // this.isLoading = true;
    // this.irDetailsService.getPrListByFilter(this.paginator).subscribe(x => {
    //   
    //   this.isLoading = false;
    //   this.PrPaymentsList = x.PrList;
    //   this.totalCount = x.Count;
    //   this.selectAllIrOnPageChange();
    // }, error => {
    //   this.isLoading = false;
    // });
  }

  private calcculateIrSummary() {

    this.irSummaryObject = null;
    if (this.selectedList && this.selectedList.length > 0) {
      let totalAmount = 0;
      let totalDistinctSuppliers = 0;
      let totalIr = 0;
      this.selectedList.forEach(x => {

        totalAmount += Math.trunc(x.Advance_Amt);
      });

      let set = new Set<string>([]);
      this.selectedList.forEach(x => {
        set.add(x.SupplierId);
      });

      totalIr = this.selectedList.length;
      console.log('supplier set is: ' + set.size, set);

      this.irSummaryObject = {
        totalAmount: totalAmount,
        totalDistinctSuppliers: set.size,
        totalIr: totalIr
      };

    }
  }

  private selectAllIrOnPageChange() {
    if (this.selectedList && this.selectedList.length > 0) {
      // this.list.forEach(x => {
      //   let item = this.selectedList.filter(selecteditem => {
      //     return x.Id == selecteditem.Id;
      //   });
      //   if (item && item.length > 0) {
      //     let index = this.selectedList.indexOf(item[0]);
      //     this.selectedList.splice(index, 1, x);
      //     x.IsSelected = true;
      //   }

      // });
    }
    // this.PrPaymentsList.forEach(item => {
    //   if (this.selectedList.filter(irItem => irItem.PurchaseOrderId == item.PurchaseOrderId)[0]) {
    //     item.IsSelected = true;
    //   }
    //   else {
    //     item.IsSelected = false;
    //   }
    // });
  }

  redirectpaymentsummary() {
    this.router.navigate(["PrPaymentSummary"], { relativeTo: this.r.parent });
  }



  clearData() {
  }


  onSelectAgent(obj) {
    // this.PrPayment.BankId = obj.ID;
    // this.PrPayment.BankName = obj.Name;
  }

  resetfilter() {
    //  this.initializePaginator();
    this.getData();
  }

  setPaidAmount(val, i) {

    if (!val || val == 0 || val > this.selectedList[i].Advance_Amt) {
      //this.invalidPaidAmt = true;
    }
    else {
      this.selectedList[i].PaidAmount = val;
      // this.invalidPaidAmt = false;
    }
  }

  // zone part added

  setDeliveryBoy(event) {
    this.deliveryBoyExisting = this.deliveryBoyList.filter(dboy => dboy.Id == event.target.value)[0];
    this.dboyid = this.deliveryBoyList.filter(dboy => dboy.Id == event.target.value)[0];
    console.log(this.deliveryBoyExisting);
  }

  onSelectSeller(event) {
    this.data.sellerId = event.CustomerId;

    this.consumerOrderService.getZonesBySellerId(event.CustomerId).subscribe(x => {

      this.zones = [];
      x.forEach(element => {

        if (element.ZoneName != '') {
          this.zones.push(element);
        }
      });
    });

  }



}
