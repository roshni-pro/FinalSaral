import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowScrollController } from '@fullcalendar/core';
import { CityService } from 'app/shared/services/city.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { PickerService } from 'app/shared/services/picker/picker.service';
import { VehicleService } from 'app/shared/services/vehicle.service';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-damagestock',
  templateUrl: './damagestock.component.html',
  styleUrls: ['./damagestock.component.scss']
})
export class DamagestockComponent implements OnInit {

  dboyList: any[];
  cols: any[];
  colmns:any[];
  dataAdd: any;
  blocked: boolean;
  file: any;
  imgURL: any;
  baseURL: any;
  skip: any;
  take: any;
  totalRecords: number;
  cityList: any[];
  getDataList: any;
  isItemdetail: boolean;
  AgentList: any[];
  IshowAdd: boolean = true;
  IshowEdit: boolean = true;
  @Input() Id: any;
  isInvalid: boolean = false;
  isdetails :boolean = false;
  masterwarehouseList: any[];
  regions:any[];
  hubs:any[];
  hubval:any[];
  statusval:string;
  pageNum: number = 1;
  search:any[];
  DboyValidity: boolean = false;
  CurrentDate: any;
  IsDisabled: boolean = false;
  DamageorderDetails:any;
  BuyerIds: any;
  selectedBuyer: any;
  length:number;
  amount:number;
  warehouseid:any;
  items;any;
  selectedqty:any;
  quantity:number;
  reason:any;
  abc: any;
  itemmrp:any;
  itemno:any;
  stocktype:any;
  dstocktype : any;
  constructor(private _service: VehicleService, private router: Router, private customerService: CustomerService, private route: ActivatedRoute, private exportService: ExportServiceService, private cityService: CityService, private messageService: MessageService, private datepipe: DatePipe, private pickerservice: PickerService) {
    this.dataAdd = {}; this.baseURL = environment.apiURL;
    this.CurrentDate = moment(new Date()).format('MM/DD/YYYY');
  }

  ngOnInit() {
  
    this.cols = [
      { field: 'StockId', header: 'Stock Id' },
      { field: 'ItemName', header: 'ItemName' },
      { field: 'ABCClassification', header: 'ABC Classification' },
      { field:'ItemNumber', header: 'Item Number' },
      { field: 'ItemMultiMRPId', header: 'ItemMultiMRPId' },
      { field: 'MRP', header: 'MRP' },
      { field: 'CurrentInventory', header: 'Available Qty' },
      { field: 'Action1', header: 'Qty' },
      { field: 'Action2', header: 'Reason' },  
      { field: 'Action', header: 'Submit' }, 
      // { field: 'Action1', header: 'Edit Order' },
    ];
   
    this.IsDisabled = false;
    this.IshowAdd = true;
    this.IshowEdit = false;
    this.Id = Number(this.route.snapshot.paramMap.get("Id"));
    this.cityService.GetAllWarehouseName().subscribe(result => {
      this.cityList = result;
      console.log('-------', result);
    })
    if (this.Id != 0) {

      this._service.GetdamageStockListById(this.Id).subscribe(res => {
        this.dataAdd = res;
        this.IsDisabled = true;
        this.dataAdd.WarehouseId = res.WarehouseId;
        this.dataAdd.Cityid = res.CityId;
        this.amount= res.NetTotalamount;
        this.getHubVal(res.CityId);
        this.IshowAdd = false;
        this.IshowEdit = true;
      });
    }

  }

  getHubVal(id) {
    console.log('Warehouseid',id); 
    this.warehouseid=id;  
    this.cityService.GetItems(id).subscribe(x => {
      console.log('data',x);
      this.regions = x; 
    })
  }
  getRegionVal(id) {
      this.items = id;
      console.log('this.items',id);
  }
  Search() {
         if(this.warehouseid==null)
         {
            this.messageService.add({severity:'success', summary: 'Please Select atleast one Item', detail:''});
         }
         let data ={
         ids: this.BuyerIds,
         Warehouseid:this.warehouseid
        }
        this.cityService.GetDamageStockData(data).subscribe(x => {
        console.log('searchdata',x);
        this.search = x;
        this.abc=x.ItemNumber;
        console.log('this.abc',this.abc);
        
    })
  }
  Detail(i) {
    console.log('i',i);
    let data ={
      ABCClassification: i.ABCClassification,
      DamageInventory:this.quantity,
      ItemMultiMRPId:i.ItemMultiMRPId,
      ItemNumber:i.ItemNumber,
      ReasonToTransfer:this.reason,
      StockId:i.StockId,
      Warehouseid:this.warehouseid,
      stocktype:this.stocktype,
    }
    this.getDataList = null;
    this.isItemdetail = true;
    this.blocked = true;
    if(this.quantity==null || this.stocktype == null || this.selectedBuyer==null)
    {
      this.messageService.add({severity:'success', summary: 'Please Enter Quantity', detail:''});
      this.blocked = false;
    }
    
    // if(this.quantity==null)
    // {
    //   this.messageService.add({severity:'success', summary: 'Please Enter a reason for transfer', detail:''});
    // }
    else {
      if(this.reason==null)
    {
      this.messageService.add({severity:'success', summary: 'Please Enter a reason for transfer', detail:''});
      this.blocked = false;
    }
    else if(this.quantity == 0 || this.quantity < 0 ){
      alert("Please enter Quantity");
      this.blocked = false;
    }
    else if(this.quantity> this.regions[0].CurrentInventory){
      alert("Your qty greater than current stock qty");
      this.blocked = false;
    }
      else{
        if(confirm('Are you sure you want to continue')) {
          this.pickerservice.PostData(data).subscribe(x => {
            this.getDataList = x;
            this.blocked = false;      
            console.log('this.getDataList',this.getDataList);
            this.isdetails = true;
            console.log('isdetails',this.isdetails);
            debugger;
            if(this.getDataList.Status) {
            //  this.messageService.add({severity:'success', summary: 'Transaction Saved Successfully', detail:''});
            alert(this.getDataList.Message); 
            window.location.reload();
            } else {
              alert(this.getDataList.Message);
              window.location.reload();
            }                
          });
        } else {
          this.blocked = false;      
          this.isdetails = true;
        }
  }
  }
}
  onPanelHide() {
    this.BuyerIds = [];
    this.abc=[];
    this.itemmrp = [];
    this.itemno=[];
    this.stocktype=[];
    console.log("this.selectedWH");
    console.log(this.selectedBuyer);  
    for (var i in this.selectedBuyer) {
      this.BuyerIds.push(this.selectedBuyer[i].StockId)     
    }
    // this.selectedBuyer = 0; 
  }
  btnClick= function () {
    this.router.navigateByUrl('/layout/damagestockitem/itemlist');
};
  onQuantity(val) {
  this.quantity =val;
   console.log('Quantity',this.quantity);   
  }
      onReason(val) {
    this.reason =val;
     console.log('Reason',this.reason);   
    }
    // getDStock(val){
    //   this.stocktype = val;
    //   console.log('this.stocktype',this.stocktype);
    // }
    getDStock(val) {
      this.stocktype = val;
      console.log('stocktype',val);   
    }
}