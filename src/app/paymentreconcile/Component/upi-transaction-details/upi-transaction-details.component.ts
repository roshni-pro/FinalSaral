import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { UpiTransactionDetailsServiceService } from '../upi-transaction-details-service.service';
import { MessageService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';
@Component({
  selector: 'app-upi-transaction-details',
  templateUrl: './upi-transaction-details.component.html',
  styleUrls: ['./upi-transaction-details.component.scss']
})
export class UpiTransactionDetailsComponent implements OnInit {
Keyword:string='';
TransactionData:any;
OrderId:number=null
skip:number=0
take:number=10
first:number=0
totalRecords:number;
isExport:boolean;
response:any;
display:boolean=false;
rangeDates:any
Fromdate:string=null
Todate:string=null
warehouses:any[]=[]
selectedHub:any
hubList:any
constructor(
    private _service:UpiTransactionDetailsServiceService,
    private _msg:MessageService,
    private _exp:ExportServiceService
  ) { }

  ngOnInit() {
   this.getDataList();
   this.GetWarehouse();
  }
  GetWarehouse()
  {
    this._service.getWarehouses().subscribe(res=>
      {
        console.log(res);
        this.hubList=res
      })
  }

getDataList(){
  debugger

  const payload={
    'OrderId':this.Keyword,
    'Fromdate':this.Fromdate,
    'Todate':this.Todate,
    'Skip':this.skip,
    'take':this.take,
    'warehouses':this.warehouses
  }
  this._service.getUpiTransactionData(payload).subscribe((res:any)=>{
      this.TransactionData=res.UPItransactions;
      console.log(res);
      this.totalRecords=res.totalRecords;
      if(this.TransactionData!=undefined){
        this.isExport=true;
      }
      else{
        this.isExport=false;
      }
  })


}
load(event?){
  // var Last = event.first ? event.first + event.rows : 10;
  this.skip = event ? event.first : 0;
  this.take = event ? event.rows : 10;
  this.getDataList();
}

GetDates(){
  this.Fromdate=moment(this.rangeDates[0]).format('MM/DD/YYYY');
  this.Todate=moment(this.rangeDates[1]).format('MM/DD/YYYY');
}
Search(){
  debugger
  this.warehouses=[]
  console.log(this.selectedHub,"selectedHub");
  if(this.selectedHub!=null || this.selectedHub !=undefined)
  {

  this.selectedHub.forEach(x=>
    {
      this.warehouses.push(x.WarehouseId)
    }
    )
  }
    console.log(this.warehouses,"WarehouseId");
  if(this.rangeDates !=undefined ){
    this.GetDates();
  }
  this.TransactionData=[];
  this.totalRecords=0;
  const payload={
    'OrderId':this.Keyword,
    'Fromdate':this.Fromdate,
    'Todate':this.Todate,
    'Skip':this.skip,
    'take':this.take,
    'warehouses':this.warehouses
  }
  this._service.getUpiTransactionData(payload).subscribe((res:any)=>{
    debugger
    console.log(res);
    this.TransactionData=res.UPItransactions
    console.log(this.TransactionData,"TransactionDataSearch");
    this.totalRecords=res.totalRecords
    console.log(this.totalRecords,"totalrecords");
    
    if(this.TransactionData.length!=0){
      this.isExport=true;
    }
    else{
      this.isExport=false;
    }
  })
}
showDialog(OrderId){
  this.display=true;
  this.TransactionData.forEach(e=>{
  if(e.OrderId==OrderId){
    this.response=e.ResponseMsg
  }
})
}
ExportTransactionData:any[]=[]
Export(){
  debugger
  const payload={
    'OrderId':this.Keyword,
    'Fromdate':this.Fromdate,
    'Todate':this.Todate,
    'warehouses':this.warehouses
  }
  console.log(this.totalRecords,"totalRecords");
  this._service.ExportgetUpiTransactionData(payload).subscribe((res:any)=>{
    console.log(res);
    
    this.ExportTransactionData=res.UPItransactions
    console.log(this.ExportTransactionData,"ExportTransactionData"); 
    this._exp.exportAsExcelFile(this.ExportTransactionData,"ExportTransactionData");
  })
  
}
}
