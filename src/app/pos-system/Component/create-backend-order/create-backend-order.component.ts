import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PosSystemService } from 'app/pos-system/Service/pos-system.service';
import { environment } from 'environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-create-backend-order',
  templateUrl: './create-backend-order.component.html',
  styleUrls: ['./create-backend-order.component.scss']
})
export class CreateBackendOrderComponent implements OnInit {

  warehouseListData:any;
  isLoading:boolean=false;
  Item:any[];
  WarehouseIds:any[];
  skip:number;
  take:number;
  totalRecords:number;
  first: number = 0;
  list:any;
  key:any;
  keyword:any;
  FromDate: any
  ToDate: any
  keywordValue:any;
  record:boolean=false;
  maxDate = new Date();
  rangeDates: any
  datepipe: any;
  StatusList:any;
  Status:any;
  status:any
Fromdate:any
todate:any
  constructor( private posSystemService:PosSystemService, private router : Router) { }

  ngOnInit() {
    this.warehouseList();
   
    this.StatusList=[
      {label:'All',value:'All'},
      {label:'Delivered',value:'Delivered'},
      {label:'Order Canceled',value:'Order Canceled'},
      {label:'Payment Pending',value:'Payment Pending'}
    ]
    this.Status=this.StatusList[0]
  }

  load(event){
    this.skip = event ? event.first : 0;
    this.take = event ? event.rows : 10;
    this.Search(this.WarehouseIds)
    
  }
  ForSearchHit() {
    this.record = true;
    this.first = 0;
    this.totalRecords = 0;
  }
  warehouseList() {
 
    this.isLoading = true;
    this.posSystemService.GetWarehouse().subscribe(res => {
      if (res.length > 0) {
        this.warehouseListData = res;
        this.isLoading = false;
      } else {
        alert("No Data Found!");
        this.isLoading = false;
      }

    })
  }

  Statuschange(){
    this.skip=0;
    this.take=10
  }
  Search(WarehouseIds)
  {
 
    debugger
    this.keywordValue=this.keyword==undefined?"":this.keyword;
    // this.Fromdate== this.FromDate==null?'':this.FromDate;
    // this.todate=this.ToDate==null?'':this.ToDate
   
    if((WarehouseIds ==undefined ||WarehouseIds==null || WarehouseIds =='')&& this.record == true)
    {
      alert("Please Select Warehouse")
      return false;
    }  
   
   else if ((this.rangeDates != null || this.rangeDates != undefined)&& this.record == true) {
      if (this.rangeDates.length > 0) {
        this.getDates()
      }
      if((this.FromDate && (!this.ToDate || this.ToDate=="Invalid date")) || ((!this.FromDate || this.FromDate =="Invalid date") && this.ToDate) ){
        alert("Select both date! ");
        return false
      }
    }
    else (( WarehouseIds.length>0)&& this.record == true)
    {
      this.isLoading=true;
      if (this.record == true) {
        const payload={
          'WarehouseId':WarehouseIds.value,
          'KeyValue':this.keywordValue,
          'Status': this.Status.value,
          'Fromdate':this.FromDate?this.FromDate:null,
          'Todate':this.ToDate?this.ToDate:null,
          'skip':this.skip,
          'take':this.take
        }
        this.posSystemService.searchList(payload).subscribe(res=>
          {
            console.log(res);
            
            debugger
            if(res.length>0)
            {
              this.list=res;
              console.log(this.list,"list");
              
              this.totalRecords=res[0].total_records
              this.keywordValue=[];
              this.isLoading=false;
            }
            else
            {
              alert("No Data Found!")
              this.keywordValue=[];
              this.isLoading=false;
              this.list=[];
              this.first = 0;
              this.totalRecords=0;
            }
          })
        }
      }
  }

 
    getDates() {
    this.FromDate = moment(this.rangeDates[0]).format('YYYY-MM-DD');
    this.ToDate = moment(this.rangeDates[1]).format('YYYY-MM-DD');
    this.skip=0;
    this.take=10;
  }
  // navToPo(item) {
  //   this.router.navigateByUrl("layout/POS-System/BackedOrderInvoice/"+item.OrderId); 
  //   // window.open(environment.apiURL + "#/BackedOrderInvoice/" + orderid);  
  //   this.posSystemService.FromBucket(item);
  // }
  navToPo(orderid) {
    window.open(environment.apiURL + "#/BackedOrderInvoice/" + orderid);  
  }

}
