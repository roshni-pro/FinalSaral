import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderAssignmentsService } from 'app/order-assignments/Services/order-assignments.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DatePipe, formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-dboy-assignment-summary',
  templateUrl: './dboy-assignment-summary.component.html',
  styleUrls: ['./dboy-assignment-summary.component.scss'],
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
  providers: [DatePipe]
})
export class DboyAssignmentSummaryComponent implements OnInit {
  sellerId: any;
  sellerName = '';
  // StartDate : Date;
  // EndDate : Date;
  dboyMobile: any;
  currentPicker = null;
  sellerList: any;
  dboyList: any;
  dataList: any = [];
  summaryList = [];
  isSearch: boolean = true;
  isTable: boolean;
  Mobile: any;
  data: any;
  isInvalid: boolean;
  exportData: any[] = [];
  totalRecords: any;
  exportFilenameDatetime: any;
  myDate = new Date();
  blocked = false;
  onhover = false;

  cols: any[] = [
    { field: 'SellerName', header: 'Seller Name' },
    { field: 'BuyerName', header: 'Buyer Name' },
    { field: 'BuyerMobile', header: 'Buyer Mobile' },

    { field: 'InvoiceNo', header: 'Invoice No' },
    { field: 'OrderAmount', header: 'Order Amount' },
    { field: 'DeliveryCharges', header: 'Delivery Charges' },
    { field: 'CollectionAmount', header: 'Total Amount' },
    { field: 'PaymentMode', header: 'Payment Mode' },
    // { field: 'CartStatus', header: 'Status' },
    { field: 'InvoiceDate', header: 'Invoice Date' },
    // { field: 'ShippingAddress', header: 'Buyer Address' },
    { field: 'DboyName', header: 'DBoy Name' },
  ];


  initial: boolean;
  isDetails = false;
  selectedRowDetails: any;
  selectedRow: any;
  isOpenPopup = false;

  constructor(private activatedroute: ActivatedRoute, private dboyService: OrderAssignmentsService, private datePipe: DatePipe, private exportService: ExportServiceService, private messageService: MessageService) { this.data = {} }

  ngOnInit() {
    this.data.StartDate = new Date();
    this.data.EndDate = new Date();
    this.dboyService.getAllSellers().subscribe(x => {

      this.sellerList = x;

      this.sellerList.forEach(element => {

        if (element.CustomerName == "") {

          this.sellerList.splice(this.sellerList.findIndex(seller => seller.CustomerId == element.CustomerId), 1);
        }
      });
      this.sellerList.sort(function (a, b) {
        if (a.CustomerName < b.CustomerName) { return -1; }
        if (a.CustomerName > b.CustomerName) { return 1; }
        return 0;
      });
    });
    this.activatedroute.params.subscribe(param => {
      if (param.sellerId) {
        this.dboyService.getAllSellers().subscribe(x => {
          this.sellerList = x;
          this.sellerList.sort(function (a, b) {
            if (a.CustomerName < b.CustomerName) { return -1; }
            if (a.CustomerName > b.CustomerName) { return 1; }
            return 0;
          })
          this.initial = true;

          this.onsearch(param.sellerId);
          this.data.SellerId = param.sellerId;
          this.data.StartDate = new Date(param.fromdate);
          this.data.EndDate = new Date(param.todate);
          this.data.CustomerId = param.sellerId;
          this.data.dboyMobile = param.dboyMobile;
          this.data.CustomerName = this.sellerName;
          this.sellerList.forEach(element => {

          })
        });

      }
    })



  }

  getSeLlerList(event) {
    if (event.query.length > 2) {
      this.dboyService.getSellerByName(event.query).subscribe(result => {
        this.sellerList = result;
        console.log('this.getSellerByName :', this.sellerList);
      });
      //this.sellerList = this.sellerList.filter(x=>x.CustomerName == event.query);
    }
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
  onsearch(searchdata) {
    
    if (searchdata.CustomerId) {
      searchdata = searchdata.CustomerId
    }
    this.sellerName = this.sellerList.filter(seller => seller.CustomerId == searchdata)[0].CustomerName;


    this.dboyService.getSellerDeliveryBoyForAssignment(searchdata).subscribe(y => {

      this.dboyList = y;

      if (this.initial == true) {
        setTimeout(() => {
          
          this.dboyService.getDboyCartSummaryV2(this.data).subscribe(x => {


            this.summaryList = x;
            console.log('dboy cart summary', x);

            this.initial = false;
            this.dataList = x.shoppingCartDc;
            console.log("datalist :", this.dataList)
            //this.exportData = this.dataList;

            if (!x.shoppingCartDc || !x.shoppingCartDc.length) {
              // this.messageService.add({ severity: 'error', summary: 'No Orders assigned to this Delivery Boy !!', detail: 'Please Choose different Seller/Delivery Boy' });
            }
            this.dataList.forEach(data => {

              data.DboyName = data.DboyName + (data.LastName ? data.LastName : '');
              data.SellerName = this.sellerName;
              this.exportData.push(
                {
                  SellerName: data.SellerName,
                  BuyerName: data.BuyerName,
                  BuyerAddress: data.ShippingAddress,
                  InvoiceNo: data.InvoiceNo,
                  OrderAmount: data.OrderAmount,
                  DeliveryCharges: data.DeliveryCharges,
                  CollectionAmount: data.CollectionAmount,
                  PaymentMode: data.PaymentMode,
                  BuyerMobile: data.BuyerMobile,
                  InvoiceDate: data.InvoiceDate,

                  DboyName: data.DboyName + (data.LastName ? data.LastName : ''),
                  DboyMobile: data.DboyMobile,
                  Signature: ''
                }




              );
            });
            this.totalRecords = x.Total_Orders;
          })
        }, 2000);

      }
    });


  }
  onSearchdata(DboysummaryForm, data) {

    if (data.StartDate == null) {
      this.messageService.add({ severity: 'error', summary: 'Start date is Mandatory', detail: '' });
    }
    else if (data.EndDate == null) {
      this.messageService.add({ severity: 'error', summary: 'End date is Mandatory', detail: '' });
    }
    else
      if (data.StartDate > data.EndDate) {
        this.messageService.add({ severity: 'error', summary: 'Start date can not be greater then End Date', detail: '' });
        return;
      }
    if (DboysummaryForm.form.status == 'VALID') {
      for (var i in this.dboyList) {
        if (data.SellerId == this.dboyList[i].SellerId) {
          this.Mobile = this.dboyList[i].Mobile;
        }
      }
      var start = data.StartDate;
      // start.setDate(start.getDate() - 1);

      var end = data.EndDate;
      var dataToPost = {
        dboyMobile: this.data.dboyMobile,
        StartDate: start,
        EndDate: end
      }
      this.blocked = true;
      this.dboyService.getDboyCartSummaryV2(dataToPost).subscribe(x => {

        this.summaryList = x;
        this.blocked = false;
        console.log('dboy cart summary', x);

        this.dataList = x.shoppingCartDc;

        if (!x.shoppingCartDc || !x.shoppingCartDc.length) {

          // this.messageService.add({ severity: 'error', summary: 'No Orders assigned to this Delivery Boy !!', detail: 'Please Choose different Seller/Delivery Boy' });
        }
        console.log("datalist :", this.dataList)
        // this.dataList.forEach(data => {
        //   data.SellerName = this.sellerName;

        //   data.DboyName = data.DboyName + (data.LastName ? data.LastName : '');
        //   this.exportData.push(
        //     {
        //       SellerName: data.SellerName,
        //       BuyerName: data.BuyerName,
        //       BuyerAddress: data.ShippingAddress,
        //       InvoiceNo: data.InvoiceNo,
        //       OrderAmount: data.OrderAmount,
        //       DeliveryCharges: data.DeliveryCharges,
        //       CollectionAmount: data.CollectionAmount,
        //       PaymentMode: data.PaymentMode,
        //       BuyerMobile: data.BuyerMobile,
        //       InvoiceDate: data.InvoiceDate,

        //       DboyName: data.DboyName + (data.LastName ? data.LastName : ''),
        //       DboyMobile: data.DboyMobile,
        //       Signature: ''
        //     }




        //   );
        // });

        this.totalRecords = x.Total_Orders;

      }, err => {
        this.blocked = false;
        this.messageService.add({ severity: 'error', summary: 'Something went wrong, try later!', detail: '' });
      });
      this.exportFilenameDatetime = "getDboyCartSummary :" + this.datePipe.transform(this.myDate, 'dd/MM/yyyy h:mm:ss a');
    }
    else {
      this.isInvalid = true;
    }
  }



  exportAssignmentSummary() {
    if (this.exportData.length) {
      this.exportService.exportAsExcelFile(this.exportData, 'exportData');

    }
    else {
      this.messageService.add({ severity: 'error', summary: 'No Records Found !!', detail: '' });

    }
  }

  //after changes

  openDetails(item, i) {



    // if (this.selectedRow != undefined) {
    //   this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    // }
    // this.selectedRow = e;
    // this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    // this.isDetails = true;

    let shoppingcartitems = []
    item.forEach(order => {
      order.ShoppingCartItems.forEach(element => {

        shoppingcartitems.push(element);
      });
    });
    this.selectedRow = i;
    this.isDetails = true;
    this.selectedRowDetails = shoppingcartitems;

  }

  OPENDETAIL(item) {
    this.blocked = true;
    this.currentPicker = item.ConsumerOrderDc.shoppingCartDc;
    item.ConsumerOrderDc.shoppingCartDc.forEach(element => {
      
      element.InvoiceDate = new Date(element.InvoiceDate)
      // element.InvoiceDate = formatDate(new Date(element.InvoiceDate), 'dd/MM/yyyy', 'en'); 
      // element.pickedDate = new Date(item.PickerSummary.CreatedDate)
    });

    setTimeout(() => {
      this.blocked = false;
      this.isOpenPopup = true;
    }, 1000);

  }

  isDetailsFalse(isDetails: boolean) {
    this.isDetails = isDetails;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
  }


  calculateTotalITems(orders) {
    let noofitems = 0;
    orders.forEach(order => {
      noofitems = noofitems + order.ShoppingCartItems.length;
    });
    return noofitems;
  }

  // exportByOrder(ordr) {
  //   let item = ordr;
  //   let shoppingcartitems = []
  //   item.forEach(order => {
  //     order.ShoppingCartItems.forEach(element => {

  //       shoppingcartitems.push({
  //         OrderId: element.OrderId,
  //         ItemId: element.ItemId,
  //         ItemName: element.ItemName,
  //         MRP: element.MRP,
  //         Qty: element.Qty,
  //         Price: element.Price,
  //         TotalAmount: element.TotalAmount
  //       });
  //     });
  //   });
  //   // this.configureExcel(shoppingcartitems, 'Order');
  //   this.exportService.exportAsExcelFile(shoppingcartitems, 'Order');

  // }

  exportByItems(ordr) {
    let item = ordr;

    let shoppingcartitems = []
    item.forEach(order => {
      console.log('order: ', order);
      if (order.CartStatus != 'Cancelled') {
        order.ShoppingCartItems.forEach(element => {
          console.log('line item: ', element);
          if (element.OrderStatus != 'Cancelled') {
            let index = shoppingcartitems.findIndex(item => item.ItemId == element.ItemId);
            if (index == -1) {
              shoppingcartitems.push({
                ItemId: element.ItemId,
                ItemName: element.ItemName,

                MRP: element.MRP,
                InvoiceNo: order.InvoiceNo.toString(),
                Qty: element.Qty
              });
            }
            else {
              shoppingcartitems[index].Qty = shoppingcartitems[index].Qty + element.Qty;
              // shoppingcartitems[index].TotalAmount = shoppingcartitems[index].Qty * shoppingcartitems[index].Price;
              
              shoppingcartitems[index].InvoiceNo = order.InvoiceNo ? shoppingcartitems[index].InvoiceNo + ' , ' + order.InvoiceNo : shoppingcartitems[index].InvoiceNo;
            }
          }

        });
      }

    });
    shoppingcartitems.forEach(cartitm => {
      
      delete cartitm.ItemId;
    });
    this.exportService.exportAsExcelFile(shoppingcartitems, 'Items');
  }

  // configureExcel(json: any[], excelFileName: string) {
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  //   console.log('worksheet', worksheet);
  //   const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  //   // worksheet.set_column(1, 1, 25)

  //   this.exportService.saveAsExcelFile(excelBuffer, excelFileName);
  // }

  cutLineItem(item, cartId) {

    if (item.OrderStatus == "Booked" || item.OrderStatus == "Picked") {
      item.cartId = cartId;
      item.customerId = this.data.SellerId;
      this.blocked = true;
      this.dboyService.cancelLineITem(item).subscribe(x => {
        this.blocked = false;
        if (x == true) {
          item.OrderStatus = 'Cancelled';
          this.messageService.add({ severity: 'success', summary: 'Item Cancelled', detail: '' });
        }
      }, error => {
        this.messageService.add({ severity: 'success', summary: 'Something went wrong, try later', detail: '' });
        this.blocked = false;
      });
    }
    else {
      if (item.OrderStatus == "Confirmed") {

        this.messageService.add({ severity: 'error', summary: 'Item Already Confirmed', detail: '' });

      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Item not booked', detail: '' });
      }
    }
  }

  confirmOrder(order) {
    console.log('order is: ', order);
    let isValidOrder = false;
    if (order && order.ShoppingCartItems && order.ShoppingCartItems.length > 0) {
      order.ShoppingCartItems.forEach(x => {
        if (x.OrderStatus == 'Booked') {
          isValidOrder = true;
        }
      });
    }

    if (isValidOrder) {
      if (order.CartStatus == "Picked") {
        this.blocked = true;
        this.dboyService.confirmOrder({
          cartId: order.CartId,
          status: "Confirmed",
          deliveryCharges: 0,
          dboyMobile: order.DboyMobile,
          ChangeReason: "sdfsdfs",
          ReceivedAmount: null,
          userId: localStorage.getItem('userid'),
          customerId: this.data.SellerId

        }).subscribe(x => {
          this.blocked = false;
          if (x == true) {
            this.messageService.add({ severity: 'success', summary: 'Order Confirmed', detail: '' });

            order.CartStatus = 'Confirmed';
            order.ShoppingCartItems.forEach(element => {
              if (element.OrderStatus != 'Cancelled') {
                element.OrderStatus = 'Confirmed'
              }

            });

            // this.isOpenPopup = false;
          }
        }, error => {
          this.blocked = false;
          this.messageService.add({ severity: 'success', summary: 'Something went wrong, try later! ', detail: '' });
        });
      }
      else {
        if (order.CartStatus == "Confirmed") {
          this.messageService.add({ severity: 'error', summary: 'Order Already Confirmed', detail: '' });

        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Cart not picked', detail: '' });
        }
      }
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Item Issue', detail: 'Order not contais any Booked item' });
    }

  }

  closePopup() {
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
      this.isOpenPopup = false;
    }, 1000);
  }
}
