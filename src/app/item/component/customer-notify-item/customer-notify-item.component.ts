import { Component, OnInit } from '@angular/core';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { ItemService } from 'app/shared/services/item.service';
import { take } from 'rxjs/operators';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-notify-item',
  templateUrl: './customer-notify-item.component.html',
  styleUrls: ['./customer-notify-item.component.scss']
})
export class CustomerNotifyItemComponent implements OnInit {
  masterwarehouseList: any[];
  isOpenPopup: boolean;
  ItemList:any[];
  selectedRowDetailList:any[];
  selectedWarehouseId:number=0;
  ItemPerPage:any;
  PageNo:any;
  totalRecords: number;
  exportData: any;
  FromDate:Date;
  ToDate:Date;
  constructor(private itemService: ItemService, private exportService: ExportServiceService,private datePipe: DatePipe) { }

  ngOnInit() {
    this.isOpenPopup = false;
   this.getWarehouse();
   //this.GetCustNotifyItem();
  }
getWarehouse(){
  this.itemService.GetAllWarehouse().subscribe(result => {
     this.masterwarehouseList = result;
   });
}
  GetCustNotifyItem(){
    var FromDate = this.FromDate ? moment(this.FromDate).format('YYYY-MM-DD') : null
    var ToDate = this.ToDate ? moment(this.ToDate).format('YYYY-MM-DD') : null

    this.itemService.GetCustNotifyItem(this.selectedWarehouseId,FromDate,ToDate,this.PageNo,this.ItemPerPage).subscribe(result=>{
     this.ItemList=result.CustomerItemNotifyMeDcs;
     this.totalRecords=result.total_count;
    })
  }
  onSelect(){
    this.selectedWarehouseId=this.selectedWarehouseId;
    //this.GetCustNotifyItem();
  }
  openDetails(d) {
    this.isOpenPopup = true;
    this.selectedRowDetailList= d.Customers;
    console.log(this.selectedRowDetailList)
  }
  load(event)  {
    var Last=  event.first ? event.first + event.rows : 20
    this.ItemPerPage= event.rows
    this.PageNo=Last / event.rows
    this.selectedWarehouseId= this.selectedWarehouseId
    var FromDate = this.FromDate ? moment(this.FromDate).format('YYYY-MM-DD') : null
    var ToDate = this.ToDate ? moment(this.ToDate).format('YYYY-MM-DD') : null

    this.itemService.GetCustNotifyItem(this.selectedWarehouseId,FromDate,ToDate,this.PageNo,this.ItemPerPage).subscribe(result=>{
      this.ItemList=result.CustomerItemNotifyMeDcs;
      this.totalRecords=result.total_count;
    })
  }

  Refresh(){
    window.location.reload();
  }

  Export(){
    var startdate = this.FromDate ? moment(this.FromDate).format('MM-DD-YYYY hh:mm') : null
    var enddate = this.ToDate ? moment(this.ToDate).format('MM-DD-YYYY hh:mm') : null
    this.itemService.CustomerNotifyItemExport(this.selectedWarehouseId,startdate,enddate).subscribe(result=>{
      this.exportData = result.CustomerItemNotifyMeDcs;
      if(this.exportData.length>0)
      {
        this.exportService.exportAsExcelFile(this.exportData, 'NotifyItem');
      }
      else{
        alert('No Record')
      }
     })
  }
  search(FromDate,ToDate){
    var startdate = this.FromDate ? moment(this.FromDate).format('MM-DD-YYYY hh:mm') : null
    var enddate = this.ToDate ? moment(this.ToDate).format('MM-DD-YYYY hh:mm') : null
    this.itemService.GetCustNotifyItem(this.selectedWarehouseId,startdate,enddate,this.PageNo,this.ItemPerPage).subscribe(result=>{
      this.ItemList=result.CustomerItemNotifyMeDcs;
      this.totalRecords=result.total_count;
     })
  }
}
