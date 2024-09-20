import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customerfeedback',
  templateUrl: './customerfeedback.component.html',
  styleUrls: ['./customerfeedback.component.scss'],
})

export class CustomerfeedbackComponent implements OnInit {
  Alldata:any;
  cols : any[];
  searchModel:any;
  warehouseList:any;
  Warehouseid:any;
  Search:any;
  FromDate:any;
  ToDate:any;
  AlldataExportcustomer:any;
  blocked: boolean;
  constructor(private customer : CustomerService,private exportService : ExportServiceService,private warehouseService: WarehouseService,private messageService: MessageService ) {this.searchModel={}; }

  ngOnInit() {
  this.cols = [
    {field:'Skcode', header:'Skcode'},
    {field:'Name', header:'Customer Name'},     
    {field:'Mobile', header:'Mobile'},
    {field:'WarehouseName', header:'Warehouse Name'},
    {field:'Rating', header:'Rating'},
    {field:'Comments', header:'Comments'},
    {field:'OrderId', header:'OrderId'},
    {field:'OrderDate', header:'OrderDate'},
    {field:'Question', header:'Question'},
    {field:'RatingDate', header:'RatingDate'},
 ];
    this.warehouseService.GetAllWarehouse().subscribe(result => {
      this.warehouseList = result;
    })
}

 
search(searchModel) {    
   
  this.blocked = true;    
    if((this.searchModel.FromDate || this.searchModel.ToDate) && (!this.searchModel.Warehouseid))
    {
      this.messageService.add({severity:'error', summary: 'Please Select Warehouse', detail:''});
      this.blocked = false;
      return;
    }
    else if(this.searchModel.Warehouseid || this.searchModel.Search){
    
    }
    else{
      this.messageService.add({severity:'error', summary: 'Please Enter Details', detail:''});
      this.blocked = false;
      return;
      
    }
    var Warehouseid = searchModel.Warehouseid;
    var Search = searchModel.Search ; 
    var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
    var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null
    this.customer.GetAllCustomerData(Warehouseid,Search,FromDate,ToDate).subscribe(res => {
      this.Alldata = res;
      this.blocked = false;
    })
  
  }
  AlldataExport() {
    if(!this.Alldata)
    {
      this.messageService.add({severity:'error', summary: 'Please Select Date Range', detail:''});
      return;
    }
    let allExportData=[];
    this.Alldata.forEach(element => {
      allExportData.push({
        Skcode:element.Skcode,
        Rating:element.Rating,
        RatingDate:element.RatingDate,
        OrderDate:element.OrderDate,
        Comments:element.Comments,
        OrderId:element.OrderId,
        Question:element.Question,
        WarehouseName:element.WarehouseName,
        CityName:element.CityName

      })      
    });
    this.exportService.exportAsExcelFile(allExportData, 'Alldata');
  }

  clear(){ 
   this.searchModel = {};
  }
  Export(searchModel){
    var Warehouseid = searchModel.Warehouseid;
    var Search = searchModel.Search ; 
    var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
    var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null
    this.customer.GetAllCustomerData(Warehouseid,Search,FromDate,ToDate).subscribe(res => {
    this.AlldataExportcustomer = res;
    let allExportData=[];
    this.AlldataExportcustomer.forEach(element => {
      allExportData.push({
        Skcode:element.Skcode,
        Rating:element.Rating,
        RatingDate:element.RatingDate,
        OrderDate:element.OrderDate,
        Comments:element.Comments,
        OrderId:element.OrderId,
        Question:element.Question,
        WarehouseName:element.WarehouseName,
        CityName:element.CityName

      })      
    });
    this.exportService.exportAsExcelFile(allExportData, 'AllFeedBackCustomerData');
    
    })
  }
}
