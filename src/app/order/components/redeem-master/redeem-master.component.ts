import { Component, OnInit } from '@angular/core';
import { RedeemMasterService } from 'app/order/services/redeem-master.service';
import * as moment from 'moment';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-redeem-master',
  templateUrl: './redeem-master.component.html',
  styleUrls: ['./redeem-master.component.scss']
})

export class RedeemMasterComponent implements OnInit {
  cities: any;
  cols:any[];
  zoneList:any;
  getZoneValue:number;
  regionData:any;
  getRegionValue:number;
  wareHouseData:any;
  getWareHouseValue:number;
  wareHouseTableData:any;
  ItemPerPage:any;
  PageNo:any;
  totalRecords:number;
  wareHouseRecord: any[]
  dboy:any;
  keyword:any;
  keywordName:string;
  blocked:boolean;
  isDetails:boolean;
  displayOpen: boolean = false;
  displayComment: boolean = false;
  selectedRow:any;
  selectedRowDetails:any;
  wareHouseRecordObj:any = null;
  deliveryBoyList:any[];
  deliveryFilter:any[];
  saveData:FormGroup;
  submitted = false;
  Zoneid : any;
  Regionid : any;
  Warehouseid :any;
  

  constructor(private redeemService : RedeemMasterService, 
    private exportService : ExportServiceService, 
    private messageService : MessageService,
    private formBuilder: FormBuilder) {
      this.cities = [
        {statusName: 'Pending', statusCode: '0'},
        {statusName: 'Canceled', statusCode: '1'},
        {statusName: 'Dispatched', statusCode: '2'},
        {statusName: 'Delivered', statusCode: '3'}
    ];

    this.saveData = this.formBuilder.group({
      Order_Id:[''],
      comments: [''],
      comments2: ['']
  });
  }

  ngOnInit() {

    this.redeemService.getZone().subscribe(res => {
      this.zoneList = res;
    });

    this.cols = [
      { field: '', header: 'S No'},
      { field: 'Order_Id', header: 'Order No' },
      { field: 'Skcode', header: 'SK Code' },
      { field: 'ShopName', header: 'Shop Name' },
      { field: 'WarehouseName', header: 'Warehouse Name' },
      { field: 'CustomerMobile', header: 'Customer Phone' },
      { field: 'CreatedDate', header: 'Order Date' },
      { field: 'Status', header: 'Status' },
      { field: '', header: 'Open Order Details' },
      { field: '', header: 'Comment Box' },

    ]
    this.getDeliveryBoyList();
  }

  getDeliveryBoyList(){
    this.redeemService.getAllDeliveryBoy().subscribe(res =>{
      this.deliveryBoyList = res;
      this.deliveryFilter = this.deliveryBoyList.filter(function(result){
        return result.Department == "Delivery Boy";
      });
    })
  }
 
  showDialogOpen(){
    this.displayOpen = true;
    this.dboy = undefined;
  }

  showDialogComment() {
    this.displayComment = true;
  }

  cancelComment(){
    this.displayComment = false;
  }

  getZoneId(event){
    this.getZoneValue = event.value.ZoneId;
    this.redeemService.getRegionWithZoneId(this.getZoneValue).subscribe(res => {
      this.regionData = res;
    });
  }

  getRegionId(event){
    this.getRegionValue = event.value.RegionId;
    this.redeemService.getWareHouseWithRegionId(this.getRegionValue).subscribe(res => {
      this.wareHouseData = res;
    })
  }

  cityName:string;
  warehouseName:string;
  getWarehouseData(event){
    this.keyword = '';
    this.cityName = event.value.WarehouseName.split(' - ')[1];
    this.getWareHouseValue = event.value.WarehouseId;
    this.warehouseName = event.value.WarehouseName.split(' - ')[0];
    this.load(event)
  }

  load(event) {
    //debugger
    var Last = event.first ? event.first + event.rows : 30
    this.ItemPerPage = event.rows
    this.PageNo = Last / event.rows
    var pageno = 1;
    this.blocked=true;
    this.redeemService.getWareHouseBasedData(this.PageNo || pageno, this.getWareHouseValue).subscribe(res=>{
      //console.log(res);
      this.wareHouseTableData = res;
      this.wareHouseRecord = this.wareHouseTableData.ordermaster;
      this.totalRecords=this.wareHouseRecord.length;
      if(this.wareHouseRecord.length == 0){
        this.totalRecords = 0;
      }else{
        this.totalRecords=this.wareHouseTableData.total_count
        for(var i in this.wareHouseRecord){
          this.wareHouseRecord[i].CreatedDate = this.wareHouseRecord[i].CreatedDate ? moment(this.wareHouseRecord[i].CreatedDate).format('MMM D, YYYY h:mm:ss a') : null
        }
      }
      this.blocked=false;
    });
  }

  searchdata(){
    this.keywordName = this.keyword.statusName;
    // if(this.keywordName==undefined || this.keywordName==null){
    //   alert("Enter Status");
    // return;
    // }
    this.blocked=true;
    this.getWareHouseValue;
    this.redeemService.searchData(this.keywordName, this.getWareHouseValue).subscribe(res => {
    this.wareHouseRecord = res;
    if(this.wareHouseRecord.length == 0){
        this.totalRecords=0;
    }else{
      for(var i in this.wareHouseRecord){
        this.wareHouseRecord[i].CreatedDate = this.wareHouseRecord[i].CreatedDate ? moment(this.wareHouseRecord[i].CreatedDate).format('MMM D, YYYY h:mm:ss a') : null
        this.totalRecords=0;
      }
    }
      this.blocked = false;
    });
  }

 newData:any[];
  excelFile(){
    this.wareHouseRecord;
    this.wareHouseRecord.forEach(object => {
      object.cityName = this.cityName;
      object.selectedWarehouseName = this.warehouseName;
    });
     var result = this.wareHouseRecord.map(function(a) {
       return {
         'Order_Id': a.Order_Id,
         'CustomerId': a.CustomerId,
         'Skcode': a.Skcode,
         'ShopName': a.ShopName,
         'ShippingAddress': a.ShippingAddress,
         'WarehouseName': a.WarehouseName != null ? a.WarehouseName : a.selectedWarehouseName,
         'Status': a.Status,
         'CityName': a.cityName,
         'CreatedDate': a.CreatedDate,
         'Deliverydate': a.Deliverydate,
         'UpdateDate': a.UpdateDate,
         'comments': a.comments,
         'comments2': a.comments2,
        };
      });
    this.exportService.exportAsExcelFile(result, 'RedeemOrder');
  }

  shopName:string;
  mobile:string;
  ship:string;
  walletPoint:number;
  resultData:any[];
  wareHouseFilterData:any;
  orderId:number;
  comments:string;
  comments2:string;
  status:string;
  DboyName:string;
  openDetails(d,e){
    this.selectedRowDetails  = d;
    //console.log(this.selectedRowDetails);
    this.DboyName = this.selectedRowDetails.DboyName ? this.selectedRowDetails.DboyName : '';
    this.shopName = this.selectedRowDetails.ShopName;
    this.mobile = this.selectedRowDetails.CustomerMobile;
    this.ship = this.selectedRowDetails.ShippingAddress;
    this.walletPoint = this.selectedRowDetails.WalletPoint;
    this.orderId = this.selectedRowDetails.Order_Id;
    this.comments = this.selectedRowDetails.comments;
    this.comments2 = this.selectedRowDetails.comments2;
    this.status = this.selectedRowDetails.Status;
    this.wareHouseFilterData = this.selectedRowDetails.DreamItemDetails;
    this.wareHouseFilterData.forEach(element => {
      this.resultData = element;
    });
    if(this.selectedRow != undefined){
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
  
    onSubmit(){
      this.submitted = true;
      this.redeemService.saveCommentOrderId(this.saveData.value).subscribe(res => {
      });
      this.displayComment = false;
      if(this.keyword){
        this.searchdata();
      }else{
        this.load(event);
      }
    }

    cancelOrder(){
      if(confirm("Do you want to cancel this order")) {
        this.orderId;
        this.redeemService.updateCancelOrderId(this.orderId).subscribe(res => {
          if(res){
            this.messageService.add({ severity: 'warn', summary: "Your Order is Canceled SuccessFully", detail: '' });
          }
      })
      }
      this.displayOpen = false;
      this.load(event);
    }

    data:any;
    singleData:any[];
    updateStatus:string;
    isShown: boolean = true;
    flag:boolean;
    statusChange:any;
    save(){
      if(this.dboy==undefined){
        alert("Please Select Delivery Boy");
        return;
      }
      var ID = this.dboy;
      this.deliveryFilter;
      this.singleData = this.deliveryFilter.filter(function(result){
        return result.PeopleID == ID;
      });
      this.selectedRowDetails['Status'] = 'Dispatched';
      this.selectedRowDetails['DboyMobileNo'] = this.singleData[0]['Mobile'];
      this.selectedRowDetails['DboyName'] = this.singleData[0]['DisplayName'];
      this.selectedRowDetails
      this.redeemService.updateOrderStatus(this.selectedRowDetails).subscribe(res => {
        if(res){
          this.messageService.add({ severity: 'info', summary: "Your Order is Dispatched SuccessFully", detail: '' });
        }
      })
      this.status = 'Dispatched';
    }
    Delivered(){
      this.selectedRowDetails['Status'] = 'Delivered';
      // this.selectedRowDetails['DboyMobileNo'] = this.singleData[0]['Mobile'];
      // this.selectedRowDetails['DboyName'] = this.singleData[0]['DisplayName'];
      this.redeemService.updateOrderStatus(this.selectedRowDetails).subscribe(res => {
        if(res){
          this.messageService.add({ severity: 'success', summary: "Your Order is Delivered SuccessFully", detail: '' });
        }
      })
      this.displayOpen = false;
    }
}


