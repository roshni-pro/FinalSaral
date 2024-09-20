import { Component, OnInit } from '@angular/core';
import { DfrCfrService } from 'app/report/services/dfr-cfr.service';
import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
//import { map } from 'jquery';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import {  Observable, Subscription, from, interval, of, pipe } from 'rxjs';
import { filter, map, take, toArray} from 'rxjs/operators';

@Component({
  selector: 'app-new-dfr',
  templateUrl: './new-dfr.component.html',
  styleUrls: ['./new-dfr.component.scss']
})
export class NewDFRComponent implements OnInit {

  constructor(private _service:DfrCfrService, private service:SalesAppServiceService,
    private messageService : MessageService,private exportService : ExportServiceService) { }
  warehouseListData:any[]=[]
  blocked:boolean=false
  DFRTableData:any[]=[]
  selectedBuyers:any[] = [];
  selectedBrands:any[] = [];
  selectedwarehouse: any[] = [];
  wareIds:any[];
  buyerList:any[];
  brandList:any[];
  buyerId:any[]=[];
  brandIds:any[]=[];
  monthsValue:any
  ngOnInit() {
    debugger;
    
    this.warehouseList();
  }
  warehouseList(){
    this.blocked = true;
    this._service.getWarehouseList().subscribe(res => {
      //console.log(res);
      this.blocked = false;
      this.warehouseListData = res;
    })
  }
  getWarehouseList(warehouse){  
    if (warehouse && warehouse.length > 0) {
      this.wareIds = warehouse.map(function (elem) {
        return elem.WarehouseId ? elem.WarehouseId : elem
      });

      const payload = {
        'warehouseids' : this.wareIds
      }
      this.blocked = true;
      this._service.getBuyerListFromWarehouseId(payload).subscribe(result => {
        //console.log('buyerList', result);
        this.blocked = false;
        this.buyerList = result;
      });
    }else{
      this.selectedBuyers = [];
      this.buyerList = [];
      this.brandList=[];
      this.selectedBrands=[];
      this.DFRTableData = null;
    }
   }
   getbuyerList(buyers){
   this.buyerId = [];
   debugger;
   if(buyers && buyers.length > 0){
     this.buyerId = buyers.map(function (a) {
       return a.BuyerId ? a.BuyerId : a
      })
      this.getBrandList();
   }else{
    this.brandList=[];
    this.selectedBrands=[];
     this.DFRTableData = null;
   }
  }
  getBrandList()
  {
    this.blocked = true;
    const payload = {
      'warehouseids' : this.wareIds,
      "buyerIds" : this.buyerId,
    }
    //console.log("", payload);
    this.service.GetBrands(payload).subscribe(x=>
    {
      //console.log("brandlist", x);
      if(x!=null && x.Status==true)
      {
        this.brandList=x.Data
        this.blocked = false; 
      }
      else
      {
        this.showerror(x.Message)
        this.blocked = false;
      }
    })
  }
  onSearchBrand(brands){
    this.brandIds = [];
    if(brands && brands.length > 0){
      this.brandIds = brands.map(function (a) {
        return a.SubsubCategoryid ? a.SubsubCategoryid : a
       }) 
    }
  }
  getMonthVal(month){
    //console.log(month)
  }
  
  getSearchRecord(){
    debugger
    if((this.selectedwarehouse && this.selectedwarehouse.length > 0) ){
      const payload = {
        'warehouseids' : this.wareIds,
        'brandids' : this.brandIds,
        'buyerIds':this.buyerId,
        'date':this.monthsValue==undefined?'':moment(this.monthsValue).format('YYYY-MM-DD')
      }
    this.blocked =true;
    this._service.getnewDfrReportData(payload).subscribe(res => {
      console.log(res);
      if(res.Status==false){
        this.blocked = false;
        this.showError(res.Message)
      }
      else if(res.Data.length==0){
        this.showError("Data Not Found")
      }
      else{
        this.DFRTableData = res.Data;
        this.blocked = false;
      }
    },(error):any=>{console.log(error); this.blocked=false;})
    }else{
      if(this.selectedwarehouse && this.selectedwarehouse.length == 0){
        this.showerror('Select Warehouse!');
      }
      // else{
      //   alert('Select Buyers!');
      // }     
      this.DFRTableData = null;
    }
  }

  // exportDownload(){
  //   if(this.DFRTableData && this.DFRTableData.length > 0)
  //   {
  //     this.DFRTableData.forEach(element => {
  //       element.DemandDate = moment(element.DemandDate).format('MM/DD/YYYY HH:mm:ss')
  //     });
  //     this.exportService.exportAsExcelFile(this.DFRTableData, 'DFR Report');
  //   }else{
  //     this.showerror('No Data Found!');
  //   }   
  // }
  sourcesub:Subscription
  users=[
    {name:'roshni',devloper:'angular'},
    {name:'Mayur',devloper:'.Net'},
    {name:'Gourav',devloper:'React'},
    {name:'Nikhil',devloper:'Nodejs'},
  ]
  exportDownload(){
    //debugger
    const source = interval()
    // this.sourcesub = source.subscribe(res => {
    //   console.log(res)  
    //   if(res==7) this.sourcesub.unsubscribe();
    // })
    this.sourcesub = source.pipe(take(5),toArray()).subscribe(res => {
      console.log(res)
    })
    const MyUsersData = from(this.users);
    MyUsersData.pipe(toArray()).subscribe(res => {console.log(res)})
    
    var data = Observable.create(observer=>{
      observer.next("My Name")
      observer.next("Your Name")
      observer.next("tada Name")
      observer.complete();
    })
    data.subscribe(res => {console.log(res)})
  }

  showSuccessfull(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }
  showError(msg: string) {
    this.messageService.add({ severity: 'info', summary: 'info', detail: msg });
  }
  showerror(msg: string) {
    this.messageService.add({ severity: 'warn', summary: 'warning', detail: msg });
  }
}
