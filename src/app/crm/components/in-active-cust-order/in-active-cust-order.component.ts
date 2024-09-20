import { Component, OnInit } from '@angular/core';
import { InActiveCustOrderService } from 'app/crm/services/in-active-cust-order.service';
import * as moment from 'moment';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-in-active-cust-order',
  templateUrl: './in-active-cust-order.component.html',
  styleUrls: ['./in-active-cust-order.component.scss']
})
export class InActiveCustOrderComponent implements OnInit {
  warehouseList: any;
  warehouseId: number;
  warehouseIdArr: any[] = [];
  warehouseData: any;
  warehouseBasedList: any;
  warehouseListCount: number;
  ItemPerPage: any;
  PageNo: any;
  statusList: any;
  skCode: any;
  mobile: any;
  rangeDates: any;
  startDate: any;
  endDate: any;
  selectedStatus: any;
  displayOpen: boolean = false;
  displayHistroy: boolean = false;
  warehouseFilterList: any;
  entity: any;
  statusValue: any;
  warehouseValue: any;
  blocked: boolean = false;
  warehousekeyword: any[] = [];
  constructor(private custOrderService: InActiveCustOrderService, private exportService: ExportServiceService) {
    this.statusList = [
      { statusName: 'All', statusCode: '0' },
      { statusName: 'Dummy Order', statusCode: '1' },
      { statusName: 'Order Confirmed', statusCode: '2' },
      { statusName: 'Order Canceled', statusCode: '3' },
      { statusName: 'Inactive', statusCode: '4' },
      { statusName: 'Dummy Order Cancelled', statusCode: '5' }
    ];

    this.entity = "OrderMaster"
  }

  ngOnInit() {
    this.custOrderService.getList().subscribe(res => {
      this.warehouseFilterList = res;
      this.warehouseList = res.map(function (a) {
        return {
          'WarehouseId': a.WarehouseId,
          'WarehouseName': a.WarehouseName + ' ' + a.CityName,
          'Cityid': a.Cityid
        }
      });
    })

    // var start = null
    // var end = null
    // var skcodedata = '';
    // var mobileNodata = '';
    // var statusIddata = '';
    // this.blocked=true;
    // var warehouseBlankArr = [];
    // warehouseBlankArr.push(0)
    // this.custOrderService.searchResultBasedOnkey(start,end,skcodedata,mobileNodata,statusIddata,warehouseBlankArr).subscribe(res => {
    //   console.log(res);
    //   this.warehouseData = res;
    //   this.warehouseBasedList = this.warehouseData.ordermaster;
    //   this.warehouseListCount = this.warehouseData.total_count;
    //   for(var i in this.warehouseBasedList){
    //     this.warehouseBasedList[i].CreatedDate = this.warehouseBasedList[i].CreatedDate ? moment(this.warehouseBasedList[i].CreatedDate).format('MMM D, YYYY h:mm:ss a') : null
    //     this.blocked=false;
    //   }
    // })
  }

  warehouseCityId: number;
  getWarehouseId(event) {
    //this.warehouseIdArr = [];
    this.selectedStatus = null;
    //this.warehouseId = event.value.WarehouseId;
    this.warehouseCityId = event.value.cityId;
    //this.warehouseIdArr.push(this.warehouseId);

    if (this.warehousekeyword.length > 0) {
      this.warehouseIdArr = this.warehousekeyword.map(function (e) {
        return e.WarehouseId ? e.WarehouseId : e
      })
    }

    //this.load(event);
  }

  warehouseBasedListData: any;
  warehouseListCountData: any;
  load(event) {
    var Last = event.first ? event.first + event.rows : 40
    this.ItemPerPage = event.rows
    this.PageNo = Last / event.rows
    var pageno = 1;

    if (this.warehousekeyword.length > 0) {
      this.blocked = true;
      this.custOrderService.inOderCusOrderList(this.PageNo || pageno, this.warehouseIdArr).subscribe(res => {
        this.warehouseData = res;
        console.log(res);
        this.warehouseBasedList = this.warehouseData.ordermaster;
        this.warehouseListCount = this.warehouseData.total_count;
        this.warehouseBasedListData = this.warehouseData.ordermaster;
        this.warehouseListCountData = this.warehouseData.total_count;
        for (var i in this.warehouseBasedList) {
          this.warehouseBasedList[i].CreatedDate = this.warehouseBasedList[i].CreatedDate ? moment(this.warehouseBasedList[i].CreatedDate).format('MMM D, YYYY h:mm:ss a') : null
        }
        this.blocked = false;
      })
    }

  }

  statusId: string;
  getStatusId(event) {
    this.statusId = event.value.statusName;
  }

  refresh() {
    this.warehousekeyword = [];
    this.skCode = null;
    this.mobile = null;
    this.warehouseId = null;
    //this.rangeDates = null;
    this.startDate = null;
    this.endDate = null;
    this.statusId = null;
    this.selectedStatus = null;
    this.warehouseBasedList = [];
    this.warehouseListCount = 0;
    this.exportBtn = false;
    this.exportTwoMonthBtn = false;
  }

  exportBtn:boolean=false;
  exportTwoMonthBtn:boolean=false;
  searchdata() {
    var start = this.startDate ? moment(this.startDate).format('MM/DD/YYYY h:mm A') : null
    var end = this.endDate ? moment(this.endDate).format('MM/DD/YYYY h:mm A') : null
    var skcodedata = this.skCode ? this.skCode : '';
    var mobileNodata = this.mobile ? this.mobile : '';
    var statusIddata = this.statusId ? this.statusId : '';
    
    if (this.warehousekeyword.length == 0) {
      alert('Please Select Warehouse')
    } else {
      if (statusIddata == 'All' || statusIddata == '') {
        if(skcodedata != '' || mobileNodata != '' || start != null || end != null){
          this.blocked = true;
          this.custOrderService.searchResultBasedOnkey(start, end, skcodedata, mobileNodata, statusIddata == 'All' ? '' : statusIddata, this.warehouseIdArr).subscribe(res => {
            console.log(res);
            if(res.ordermaster.length > 0 ){
              this.warehouseData = res;
              this.warehouseBasedList = this.warehouseData.ordermaster;

            for (var i in this.warehouseBasedList) {
              this.warehouseBasedList[i].CreatedDate = this.warehouseBasedList[i].CreatedDate ? moment(this.warehouseBasedList[i].CreatedDate).format('MMM D, YYYY h:mm:ss a') : null;
              this.warehouseListCount = 0;
            }
            }
            this.blocked = false;
          })
          }else{
            this.blocked = true;
            this.load(event);
            this.blocked = false;
          }
      } else {
          this.blocked = true;
          this.custOrderService.searchResultBasedOnkey(start, end, skcodedata, mobileNodata, statusIddata, this.warehouseIdArr).subscribe(res => {
            console.log(res);
            if(res.ordermaster.length > 0 ){
              this.warehouseData = res;
              this.warehouseBasedList = this.warehouseData.ordermaster;

            for (var i in this.warehouseBasedList) {
              this.warehouseBasedList[i].CreatedDate = this.warehouseBasedList[i].CreatedDate ? moment(this.warehouseBasedList[i].CreatedDate).format('MMM D, YYYY h:mm:ss a') : null;
              this.warehouseListCount = 0;
            }
            }
            this.blocked = false;
          })
        }
        this.exportBtn = true;
        this.exportTwoMonthBtn = true;
    }
  }

  exportDownload() {
    if (this.warehousekeyword.length > 0) {
      this.blocked = true;
      this.custOrderService.exportInOderCusOrderList(this.warehouseListCount,1, this.warehouseIdArr).subscribe(res => {
        this.warehouseData = res;
        var warehouseBasedList = this.warehouseData.ordermaster;
        for (var i in warehouseBasedList) {
         warehouseBasedList[i].CreatedDate = warehouseBasedList[i].CreatedDate ? moment(warehouseBasedList[i].CreatedDate).format('MMM D, YYYY h:mm:ss a') : null
        }
        
        var result = warehouseBasedList.map(function (a) {
          return {
            'OrderId': a.OrderId,
            'WarehouseName': a.WarehouseName,
            'SalesPerson': a.SalesPerson,
            'SalesMobile': a.SalesMobile,
            'CustomerId': a.CustomerId,
            'CustomerName': a.CustomerName,
            'Skcode': a.Skcode,
            'ShopName': a.ShopName,
            'invoice_no': '',
            'Status': a.Status,
            'GrossAmount': a.GrossAmount,
            'ShippingAddress': a.ShippingAddress,
            'CreatedDate': a.CreatedDate,
            'OrderTypestr': a.OrderTypestr
          }
        })
        this.exportService.exportAsExcelFile(result, 'InActiveCustOrder');
        this.blocked = false;
      })
    } else {
      alert('Please Select Warehouse')
    }
  }

  exportTwoMonthData() {
    if (this.warehousekeyword.length > 0) {
      var start = this.startDate ? moment(this.startDate).format('MM/DD/YYYY h:mm A') : null
      var end = this.endDate ? moment(this.endDate).format('MM/DD/YYYY h:mm A') : null
      var skcodedata = '';
      var mobileNodata = '';
      var statusIddata = '';

      if (start != null && end != null) {

        const diffTime = Math.abs(this.endDate - this.startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
        if(diffDays > 60){
          alert("You Can't Select More Than 60 Days");
          this.endDate = null;
          return false;
        }

        this.custOrderService.searchResultBasedOnkey(start, end, skcodedata, mobileNodata, statusIddata, this.warehouseIdArr).subscribe(res => {
          this.warehouseData = res;

          var result = this.warehouseData.ordermaster.map(function (a) {
            return {
              'OrderId': a.OrderId,
              'WarehouseName': a.WarehouseName,
              'SalesPerson': a.SalesPerson,
              'SalesMobile': a.SalesMobile,
              'CustomerId': a.CustomerId,
              'CustomerName': a.CustomerName,
              'Skcode': a.Skcode,
              'ShopName': a.ShopName,
              'invoice_no': '',
              'Status': a.Status,
              'GrossAmount': a.GrossAmount,
              'ShippingAddress': a.ShippingAddress,
              'CreatedDate': a.CreatedDate,
              'OrderTypestr': a.OrderTypestr
            }
          })
          this.exportService.exportAsExcelFile(result, 'InActiveCustOrderTwoMonthData');
        })
      } else {
        alert('Please select start date and end date')
      }
    } else {
      alert('Please Select Warehouse')
    }
  }

  openPopupDetails: any;
  orderIdDetails: any;
  orderId: any;
  customerName: any;
  custPhoneNo: any;
  billAdd: any;
  shipAdd: any;
  billAmt: any;
  tableDiscriptionDetails: any;
  cityWiseWarehouse: any[] = [];
  customerId: any;
  statusValueChecked: any;
  customerDetails: any;
  cityWisewarehouseList: any;
  showDialogOpen(d, e) {
    console.log(d);
    this.cityWiseWarehouse = [];
    this.statusValue = '';
    //this.warehouseValue = this.warehousekeyword.WarehouseId;
    this.warehouseValue = d.WarehouseId;
    this.displayOpen = true;
    this.openPopupDetails = d;
    this.orderId = this.openPopupDetails.OrderId;
    this.customerId = this.openPopupDetails.CustomerId;
    this.custOrderService.getInActiveCustOrderMaster(this.orderId).subscribe(res => {
      //console.log(res);
      this.orderIdDetails = res;
      this.customerName = this.orderIdDetails.CustomerName;
      this.custPhoneNo = this.orderIdDetails.Customerphonenum;
      this.billAdd = this.orderIdDetails.BillingAddress;
      this.shipAdd = this.orderIdDetails.ShippingAddress;
      this.billAmt = this.orderIdDetails.GrossAmount + this.orderIdDetails.WalletAmount;
      this.statusValueChecked = this.orderIdDetails.Status;
      this.tableDiscriptionDetails = this.orderIdDetails.orderDetails;
      console.log(this.tableDiscriptionDetails);

      for (let i in this.tableDiscriptionDetails) {
        this.tableDiscriptionDetails[i].AmtWithoutTaxDisc = parseFloat(this.tableDiscriptionDetails[i].AmtWithoutTaxDisc).toFixed(2)
        this.tableDiscriptionDetails[i].AmtWithoutAfterTaxDisc = parseFloat(this.tableDiscriptionDetails[i].AmtWithoutAfterTaxDisc).toFixed(2)
        this.tableDiscriptionDetails[i].TaxAmmount = parseFloat(this.tableDiscriptionDetails[i].TaxAmmount).toFixed(2)
        this.tableDiscriptionDetails[i].TotalAmountAfterTaxDisc = parseFloat(this.tableDiscriptionDetails[i].TotalAmountAfterTaxDisc).toFixed(2)
        this.tableDiscriptionDetails[i].TotalAmt = parseFloat(this.tableDiscriptionDetails[i].TotalAmt).toFixed(2)
        this.tableDiscriptionDetails[i].UnitPrice = parseFloat(this.tableDiscriptionDetails[i].UnitPrice).toFixed(2)
        this.tableDiscriptionDetails[i].TaxPercentage = parseFloat(this.tableDiscriptionDetails[i].TaxPercentage).toFixed(2)
      }
    })

    // this.warehouseFilterList.forEach(element => {
    //   this.warehousekeyword.forEach(el => {
    //     if (el.Cityid === element.Cityid) {
    //       this.cityWiseWarehouse.push(element)
    //     }
    //   });
      
      this.warehousekeyword.forEach(element => {
        this.warehouseFilterList.forEach(el => {
          if (el.Cityid === element.Cityid) {
            this.cityWiseWarehouse.push(el)
            this.cityWiseWarehouse = this.cityWiseWarehouse.filter(
              (element, i) => i === this.cityWiseWarehouse.indexOf(element)
            );
          }
        });
      });

    this.custOrderService.getCustomer(this.customerId).subscribe(res => {
      this.customerDetails = res;
    })
  }

  histroyData: any;
  showHistroy(d) {
    this.histroyData = d;
    this.displayHistroy = true;
  }

  ChangeAmount(qty, Amount, tableDetails, index) {
    if (qty > tableDetails.OrderQty) {
      alert("Quantity cannot be greater than Order quantity");
      tableDetails.qty = tableDetails.OrderQty;
      tableDetails.Noqty = tableDetails.OrderQty;
      return false;
    }
    else {
      tableDetails.qty = qty;
      tableDetails.Noqty = qty;
    }
    tableDetails.AmtWithoutTaxDisc = (tableDetails.PrevAmtWithoutTaxDisc / tableDetails.Prevqty) * qty
    tableDetails.AmtWithoutAfterTaxDisc = (tableDetails.PrevAmtWithoutAfterTaxDisc / tableDetails.Prevqty) * qty;
    tableDetails.TotalAmountAfterTaxDisc = (tableDetails.PrevTotalAmountAfterTaxDisc / tableDetails.Prevqty) * qty;
    tableDetails.TaxAmmount = (tableDetails.PrevTotalAmountAfterTaxDisc / tableDetails.Prevqty) * qty;
    tableDetails.TotalAmt = (tableDetails.PrevTotalAmt / tableDetails.Prevqty) * qty;

    tableDetails.AmtWithoutTaxDisc = parseFloat(tableDetails.AmtWithoutTaxDisc).toFixed(2);
    tableDetails.AmtWithoutAfterTaxDisc = parseFloat(tableDetails.AmtWithoutAfterTaxDisc).toFixed(2);
    tableDetails.TotalAmountAfterTaxDisc = parseFloat(tableDetails.TotalAmountAfterTaxDisc).toFixed(2);
    tableDetails.TaxAmmount = parseFloat(tableDetails.TaxAmmount).toFixed(2);
    tableDetails.TotalAmt = parseFloat(tableDetails.TotalAmt).toFixed(2);

    this.tableDiscriptionDetails.splice(1, tableDetails)
  }

  PreventMinus(event) {
    if (event.keyCode != 45) {
    }
    else {
      event.preventDefault();
    }
  }

  PostOrder() {

    if (this.statusValue === undefined || this.statusValue === "") {
      alert('Please Select Status');
      return false;
    }

    if (this.statusValue === 'Order Confirmed' && this.customerDetails.CustomerVerify != 'Temporary Active') {
      if (this.statusValue === 'Order Confirmed' && !this.customerDetails.Active) {
        alert('Please Active Customer first then process order');
        return false;
      }
    }

    if ((this.tableDiscriptionDetails[0].PaymentMode === "Online" && !this.tableDiscriptionDetails.ISPaymentStatusFailed) || this.tableDiscriptionDetails[0].PaymentMode === "Gullak") {
      this.DataPost();
      return false;
    }

    if (this.warehouseValue !== this.tableDiscriptionDetails[0].WarehouseId && this.warehouseValue !== undefined) {
      for (var i = 0; i < this.tableDiscriptionDetails.length; i++) {
        this.tableDiscriptionDetails[i].WarehouseId = this.warehouseValue;
      }
    }

    if (this.statusValue === 'Order Confirmed' && (this.tableDiscriptionDetails[0].PaymentMode !== "Online" && !this.orderIdDetails.ISPaymentStatusFailed) && this.tableDiscriptionDetails[0].PaymentMode !== "Gullak") {
      if (this.tableDiscriptionDetails.length === 1) {
        if (this.tableDiscriptionDetails[0].ItemActive === false) {
          alert("Please cancel this order as item is deactive now");
          return false;
        }
        if (this.tableDiscriptionDetails[0].ISItemLimit === true) {
          if (this.tableDiscriptionDetails[0].ItemLimitQty === 0) {
            alert("Please cancel this order as it has zero item limit");
            return false;
          }
          else if (this.tableDiscriptionDetails[0].qty === 0) {
            alert("Please cancel this order as it has zero quantity");
            return false;
          }
        }
      }
    }
    else if (this.statusValue === 'Order Confirmed' && (this.tableDiscriptionDetails[0].PaymentMode === "Online" && !this.orderIdDetails.ISPaymentStatusFailed) || this.tableDiscriptionDetails[0].PaymentMode === "Gullak") {
      this.DataPost();
      return false;
    }

    for (var j = 0; j < this.tableDiscriptionDetails.length; j++) {
      if (this.tableDiscriptionDetails[j].ISItemLimit === true) {
        if (this.tableDiscriptionDetails[j].ItemLimitQty < this.tableDiscriptionDetails[j].qty) {
          if (window.confirm("Order quantity is greater than Itemlimit quantity in one of order item, Order quantity may be differ after post order Do you still want to proceed??")) {

            var DatatoPost =
            {
              CustomerName: this.orderIdDetails.name,
              OrderId: this.orderIdDetails.OrderId,
              DialEarnigPoint: 0,
              Customerphonenum: this.orderIdDetails.Customerphonenum,
              SalesPersonId: 0,
              ShippingAddress: this.orderIdDetails.ShippingAddress,
              ShopName: this.orderIdDetails.Customerphonenum.shopName,
              Skcode: this.orderIdDetails.Skcode,
              TotalAmount: this.orderIdDetails.TotalAmount,
              Savingamount: this.orderIdDetails.Savingamount,
              deliveryCharge: this.orderIdDetails.deliveryCharge,
              WalletAmount: 0,
              walletPointUsed: 0,
              DreamPoint: 0,
              status: this.statusValue,
              itemDetails: this.orderIdDetails.orderDetails,
              IsNewOrder: this.orderIdDetails.IsNewOrder
            };

            this.DataPost();
            return false;
          }
        }
      }
    }

    for (var z = 0; z < this.tableDiscriptionDetails.length; z++) {
      if (this.tableDiscriptionDetails[z].IsFreeItem) {
        alert("This order also conatins free item");
        break;
      }
    }

    if (window.confirm(" Order quantity may be differ after post order Do you still want to proceed??")) {
      this.DataPost();
    }
  }

  DataPost() {
    var DatatoPost =
    {
      CustomerName: this.orderIdDetails.name,
      OrderId: this.orderIdDetails.OrderId,
      DialEarnigPoint: 0,
      Customerphonenum: this.orderIdDetails.Customerphonenum,
      SalesPersonId: 0,
      ShippingAddress: this.orderIdDetails.ShippingAddress,
      ShopName: this.orderIdDetails.Customerphonenum.shopName,
      Skcode: this.orderIdDetails.Skcode,
      TotalAmount: this.orderIdDetails.TotalAmount,
      Savingamount: this.orderIdDetails.Savingamount,
      deliveryCharge: this.orderIdDetails.deliveryCharge,
      WalletAmount: 0,
      walletPointUsed: 0,
      DreamPoint: 0,
      status: this.statusValue,
      itemDetails: this.orderIdDetails.orderDetails,
      IsNewOrder: this.orderIdDetails.IsNewOrder
    };

    debugger
    this.custOrderService.inActiveCustomerOrderMaster(DatatoPost).subscribe(
      res => {
        console.log(res);
        if (res === true) {
          alert('OrderPost Successfully');
          window.location.reload();
        }
        else {
          alert('There Is Issue in OrderPost');
          window.location.reload();
        }
      },
      err => {
        alert(err.error.ErrorMessage);
        return false;
      }
    )
  }
}
