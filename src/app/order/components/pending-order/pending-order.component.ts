import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { PendingOrderService } from 'app/order/services/pending-order.service';
import * as moment from 'moment';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { Subscription, interval, timer } from 'rxjs';

@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.component.html',
  styleUrls: ['./pending-order.component.scss']
})
export class PendingOrderComponent implements OnInit {

  warehouse:any;
  ItemPerPage:any;
  PageNo:any;
  warehouseId:number;
  wareHouseTableData:any;
  totalRecords:number;
  wareHouseRecord: any[];
  order_id:number;
  sk_code:any;
  shop_name:string;
  mobile:string;
  rangeDates:any;
  loading: boolean = false;
  private subscription: Subscription;  
  public countdown;

  constructor(private pendingOrderservice : PendingOrderService, 
              private exportService : ExportServiceService
              ) { }

    seconds:any;
    minutes:any;
    hours:any;
    days:any;
    template:any;
    
    GetOrderTime(countdown) {
          
          var millis = 0;
          millis = countdown * 1000;
          this.seconds = Math.floor((millis / 1000) % 60);
          this.minutes = Math.floor(((millis / (1000 * 60)) % 60));
          this.hours = Math.floor(((millis / (1000 * 60 * 60)) % 24));
          this.days = Math.floor(((millis / (1000 * 60 * 60)) / 24));

          if (this.days != 0)
              this.hours += (this.days * 24);

              if (this.hours >= 0 && this.hours <= 48)
                  this.template = this.hours + ':' + this.minutes + ':' + this.seconds;
              else if (this.hours >= 48 && this.hours <= 72)
                  this.template = this.hours + ':' + this.minutes + ':' + this.seconds;
              else if (this.hours >= 72 && this.hours <= 100)
                  this.template = this.hours + ':' + this.minutes + ':' + this.seconds;
              else if (this.hours > 100)
                  this.template = this.hours + ':' + this.minutes + ':' + this.seconds;
          
              var result = {
                'hours':this.hours,
                'template':this.template
              };
          return result;
    }


  ngOnInit() {

    this.pendingOrderservice.getWarehouse().subscribe(res => {
      this.warehouse = res.map(function(ele) {
        return {
          'WarehouseId' : ele.WarehouseId,
          'WarehouseName' : ele.WarehouseName +' '+ele.CityName
        };
      });
    });

    //this.subscription = interval(1000)
           //.subscribe(x => { this.GetOrderTime (this.countdown); });   
  }

  getWarehouseId(event){
    this.warehouseId = event.value.WarehouseId;
    this.load(event)
  }

  load(event) {
    //debugger
    var Last = event.first ? event.first + event.rows : 50
    this.ItemPerPage = event.rows
    this.PageNo = Last / event.rows
    var pageno = 1;
    this.loading = true;
    this.pendingOrderservice.getOrderPendingList(this.PageNo || pageno, this.warehouseId).subscribe(res=>{
      //console.log(res);
      this.wareHouseTableData = res;
      this.wareHouseRecord = this.wareHouseTableData.ordermaster;
      this.totalRecords = this.wareHouseTableData.total_count;
      for(var i in this.wareHouseRecord){
        this.wareHouseRecord[i].CreatedDate = this.wareHouseRecord[i].CreatedDate ? moment(this.wareHouseRecord[i].CreatedDate).format('MMM D, YYYY h:mm:ss a') : null
        this.wareHouseRecord[i].Deliverydate = this.wareHouseRecord[i].Deliverydate ? moment(this.wareHouseRecord[i].Deliverydate).format('MMM D, YYYY h:mm:ss a') : null
      }
      this.loading = false;
    });
  }

  refresh(){
    this.order_id = null;
    this.sk_code = null;
    this.shop_name = null;
    this.mobile = null;
    this.rangeDates = null;
    this.wareHouseRecord = this.wareHouseTableData.ordermaster;
    this.totalRecords = this.wareHouseTableData.total_count;
  }

  searchdata(){
    var start = this.rangeDates ?  moment(this.rangeDates[0]).format('MM/DD/YYYY h:mm A') : null
    var end = this.rangeDates ?  moment(this.rangeDates[1]).format('MM/DD/YYYY h:mm A') : null
    var orderId = this.order_id ? this.order_id : 0;
    var skcode = this.sk_code ? this.sk_code : '';
    var shopname = this.shop_name ? this.shop_name : '';
    var mobileno = this.mobile ? this.mobile : '';
  
    this.pendingOrderservice.searchOrdeListrWithKey(start,end,orderId,skcode,shopname,mobileno,this.warehouseId).subscribe(res => {
      this.wareHouseRecord = res;
      for(var i in this.wareHouseRecord){
        this.wareHouseRecord[i].CreatedDate = this.wareHouseRecord[i].CreatedDate ? moment(this.wareHouseRecord[i].CreatedDate).format('MMM D, YYYY h:mm:ss a') : null
        this.wareHouseRecord[i].Deliverydate = this.wareHouseRecord[i].Deliverydate ? moment(this.wareHouseRecord[i].Deliverydate).format('MMM D, YYYY h:mm:ss a') : null
        this.totalRecords = 0;
      }
    })
  }

  excelFile(){
    var start = this.rangeDates ?  moment(this.rangeDates[0]).format('MM/DD/YYYY h:mm A') : null
    var end = this.rangeDates ?  moment(this.rangeDates[1]).format('MM/DD/YYYY h:mm A') : null
    var orderId = this.order_id ? this.order_id : 0;
    var skcode = this.sk_code ? this.sk_code : '';
    var shopname = this.shop_name ? this.shop_name : '';
    var mobileno = this.mobile ? this.mobile : '';
  
    this.pendingOrderservice.excelDataWithKey(start,end,orderId,skcode,shopname,mobileno,this.warehouseId).subscribe(res => {
      var exportData = res;
      var newExportData = [];
      for (var i = 0; i < exportData.length; i++) {

        var OrderId = exportData[i].OrderId;
        var Skcode = exportData[i].Skcode;
        var ShopName = exportData[i].ShopName;
        var Mobile = exportData[i].Customerphonenum;
        var CustomerName = exportData[i].CustomerName;
        var CustomerId = exportData[i].CustomerId;
        var WarehouseName = exportData[i].WarehouseName;
        var Cluster = exportData[i].Cluster;
        var Deliverydate = exportData[i].Deliverydate;
        var CompanyId = exportData[i].CompanyId;
        var BillingAddress = exportData[i].BillingAddress;
        var CreatedDate = exportData[i].CreatedDate;
        var SalesPerson = exportData[i].SalesPerson;
        var ShippingAddress = exportData[i].ShippingAddress;
        var delCharge = exportData[i].deliveryCharge;
        var Status = exportData[i].Status;
        var orderDetails = exportData[i].orderDetailsExport;
        for (var j = 0; j < orderDetails.length; j++) {
            var tts = {
                OrderId: '', Skcode: '', ShopName: '', Mobile: '', RetailerName: '', RetailerID: '', Warehouse: '', Cluster: '', Deliverydate: '', CompanyId: '', BillingAddress: '', Date: '',
                Excecutive: '', ShippingAddress: '', deliveryCharge: '', ItemID: '', ItemName: '', SKU: '', itemNumber: '', MRP: '', MOQ: '', UnitPrice: '', Quantity: '', MOQPrice: '', Discount: '',
                DiscountPercentage: '', TaxPercentage: '', Tax: '', TotalAmt: '', CategoryName: '', BrandName: '', Status: '',
            }
            tts.ItemID = orderDetails[j].ItemId;
            tts.ItemName = orderDetails[j].itemname;
            tts.SKU = orderDetails[j].sellingSKU;
            tts.itemNumber = orderDetails[j].itemNumber;
            tts.MRP = orderDetails[j].price;
            tts.UnitPrice = orderDetails[j].UnitPrice;
            tts.Quantity = orderDetails[j].qty;
            tts.MOQPrice = orderDetails[j].MinOrderQtyPrice;
            tts.Discount = orderDetails[j].DiscountAmmount;
            tts.DiscountPercentage = orderDetails[j].DiscountPercentage;
            tts.TaxPercentage = orderDetails[j].TaxPercentage;
            tts.Tax = orderDetails[j].TaxAmmount;
            tts.TotalAmt = orderDetails[j].TotalAmt;
            tts.CategoryName = orderDetails[j].CategoryName;
            tts.BrandName = orderDetails[j].BrandName;

            tts.OrderId = OrderId;
            tts.RetailerID = CustomerId;
            tts.Skcode = Skcode;
            tts.Mobile = Mobile;
            tts.RetailerName = CustomerName;
            tts.Warehouse = WarehouseName;
            tts.Cluster = Cluster;
            tts.ShopName = ShopName;
            tts.Deliverydate = Deliverydate;
            tts.CompanyId = CompanyId;
            tts.BillingAddress = BillingAddress;
            tts.Date = CreatedDate;
            tts.Excecutive = orderDetails[j].ExecutiveName;
            tts.ShippingAddress = ShippingAddress;
            tts.deliveryCharge = delCharge;
            tts.Status = Status;
            newExportData.push(tts);
        }
      }
      //console.log(newExportData)
          var result = newExportData.map(function(a) {
            return {
              'OrderId': a.OrderId,
              'Skcode': a.Skcode,
              'ShopName': a.ShopName,
              'ItemID': a.ItemID,
              'ItemName': a.ItemName,
              'CategoryName': a.CategoryName,
              'BrandName': a.BrandName,
              'SKU': a.SKU,
              'Warehouse': a.Warehouse,
              'Cluster': a.Cluster,
              'Date': a.Date,
              'Deliverydate': a.Deliverydate,
              'Excecutive': a.Excecutive,
              'MRP': a.MRP,
              'UnitPrice': a.UnitPrice,
              'MOQPrice': a.MOQPrice,
              'Quantity': a.Quantity,
              'Discount': a.Discount,
              'DiscountPercentage': a.DiscountPercentage,
              'Tax': a.Tax,
              'TaxPercentage': a.TaxPercentage,
              'TotalAmt': a.TotalAmt,
              'deliveryCharge': a.deliveryCharge,
              'Status': a.Status,
            };
          });
      this.exportService.exportAsExcelFile(result, 'PendingOrderDetails');
    })
    
  }

    
}


