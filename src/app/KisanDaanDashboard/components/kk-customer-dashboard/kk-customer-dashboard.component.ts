import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { KisanDanService } from 'app/shared/services/kisan-dan.service';
import { kisanDan } from 'app/shared/interface/kisan-dan-add';
import { MessageService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { ShoppingCartService } from 'app/shared/services/shopping-cart.service';
import { CustomersCartFilters } from 'app/shared/interface/shoppingCart/customers-cart-filters';

import * as moment from 'moment';
import { Kisaandaan } from 'app/shared/interface/kisaandaan';


@Component({
  selector: 'app-kk-customer-dashboard',
  templateUrl: './kk-customer-dashboard.component.html',
  styleUrls: ['./kk-customer-dashboard.component.scss']
})
export class KkCustomerDashboardComponent implements OnInit {

  warehouseList: any[];
  inputModel: {};
  warehouses: any;
  customersCartFilters: CustomersCartFilters;
  searchwh: string;
  shoppinglist: any;
  totalRecords: any;
  data: any;
  WarehouseId: any;
  @Input()Danlist:any[];
  KisaanDaan:Kisaandaan;
  Skcode: number;
  StartDate: string;
  EndDate: string;
  Total:any;
  PageNumber: number;
  PageSize: number;
  constructor(private shopservice: ShoppingCartService, private route: ActivatedRoute, private KisanDanService:KisanDanService,private messageService : MessageService,private exportService : ExportServiceService ){this.data={};
  }
  
  ngOnInit() {

    this.KisaanDaan = {
    WarehouseId:this.data.WarehouseId,
    Skcode: this.data.searchwh,
    PageSize: 100,
    PageNumber: 1,
    StartDate:this.data.StartDate,
    EndDate:this.data.EndDate,
    }

    this.KisanDanService.WarehouseGetByID().subscribe(result => {
      this.warehouses = result;
    })
  
    this.KisanDanService.GetDanList(this.KisaanDaan).subscribe(result=>{
      this.Danlist=result.Customerdashboard;
     this.totalRecords=result.total_count;
         this.Total =result.Totaldan;

    })

  }

OnClick() {
  
  var FromDate = this.data.StartDate ? moment(this.data.StartDate).format('YYYY-MM-DD') : null
  var ToDate = this.data.EndDate ? moment(this.data.EndDate).format('YYYY-MM-DD') : null
  console.log(FromDate, 'StartDate');
  console.log(ToDate, 'EndDate');
  let dataToPost = JSON.parse(JSON.stringify(this.data));
  dataToPost.StartDate = FromDate;
  dataToPost.EndDate = ToDate;
  this.KisaanDaan.PageNumber = this.PageNumber; 
  this.KisaanDaan.PageSize =this.PageSize;
  this.KisaanDaan.StartDate=this.data.StartDate;
  this.KisaanDaan.EndDate=this.data.EndDate;
  this.KisaanDaan.WarehouseId=this.data.WarehouseId;
  
  console.log(this.WarehouseId,'WarehouseId');
  this.KisaanDaan = {
    WarehouseId:this.data.WarehouseId,
    Skcode: this.data.Skcode,
    PageSize: 100,
    PageNumber: 1,
    StartDate:this.data.StartDate,
    EndDate:this.data.EndDate,
  }
  console.log(this.data);
  this.KisanDanService.GetDanList(this.KisaanDaan).subscribe(result=>{
    
    this.Danlist=result.Customerdashboard;
   this.totalRecords=result.total_count;
   this.Total =result.Totaldan;
  })
 // window.location.reload();
   
}

load(event) {
  this.KisaanDaan = {
    WarehouseId:this.data.WarehouseId,
    Skcode: this.data.Skcode,
    PageSize: 100,
    PageNumber: 1,
    StartDate:this.data.StartDate,
    EndDate:this.data.EndDate,
  }
  
  var First = event.first;//(event.first == 0 || event.first) ? event.first  : 0;
  var Last = event.rows ? event.first + event.rows : 15;
  var page = Last / event.rows;
  this.KisaanDaan.PageNumber = this.PageNumber;
 // this.KisaanDaan.total_count = Last;
    this.KisanDanService.GetDanList(this.KisaanDaan).subscribe(result=>{
      this.Danlist=result.Customerdashboard;
     this.totalRecords=result.total_count;
         this.Total =result.Totaldan;

    })   
  
}

 export() {
   var _export =[]
   for(var i in this.Danlist){
     var selectedFields ={
      OrderId :this.Danlist[i].OrderId,
      Skcode: this.Danlist[i].Skcode,
      KisanKiranaAmount:this.Danlist[i].KisanKiranaAmount,
      KisanDanAmount:this.Danlist[i].KisanDanAmount,
      CreatedDate:this.Danlist[i].strCreatedDate,
     }
     _export.push(selectedFields);
   }
   
    this.exportService.exportAsExcelFile( _export, 'Danlist');
  }

}








