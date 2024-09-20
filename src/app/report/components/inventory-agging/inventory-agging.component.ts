import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';
import { InventoryAggingServiceService } from 'app/report/services/inventory-agging-service.service';
@Component({
  selector: 'app-inventory-agging',
  templateUrl: './inventory-agging.component.html',
  styleUrls: ['./inventory-agging.component.scss']
})
export class InventoryAggingComponent implements OnInit {
 
  //warehouselist 
  warehouseList: any[];

  //selectedwarehouse=warehouseid
  warehouseId: any
  selectedwarehouse:any;

    //selected warehouse list
    selectedwarehouselist:any;


    //MonthYear
    MonthYear:any;
    month:any;
    year:any;
    formattedMonth:string;

    //validation
    check:any=false
    msg:string=""

    //result data
    Data:any[]

    //loader
    blocked=false;
    found:boolean=false;

  constructor(private warehouseService: WarehouseService,private exportService:ExportServiceService,private messageService: MessageService,
    private inventoryagging:InventoryAggingServiceService) { }

  ngOnInit() {
    this.getSpecificWarehouses();
    this.month=new Date().getMonth()+1;
    console.log("this.month",this.month)
    this.year=new Date().getFullYear();
    console.log("this.year",this.year)
  }

//service calls
private async getSpecificWarehouses() {
  this.warehouseService.GetAllWarehouse().subscribe(result => {
      this.warehouseList = result
      this.warehouseId = result[0].WarehouseId;
    });
 }
 Searchbtn()
 {
  if(!this.check)
  {
    this.CheckWarehouse();
  }
  if(this.selectedwarehouselist && this.month && this.year)
  {
    this.blocked = true;
    this.selectedwarehouse= this.selectedwarehouselist.map(function(el){return el.WarehouseId})
   

    const payload={
      "WarehouseId":this.selectedwarehouse,
      "month":this.month,
      "year":this.year
  }
  console.log(payload)
  this.inventoryagging.GetSearchResult(payload).subscribe(res=>
    {
      
      this.Data=res
      if(this.Data.length>0){this.showSuccess("data found"); this.found=true}
      else{this.showError("data not found");this.found=false;this.check=false}
      this.blocked = false
      console.log(this.Data)
    })
  }
 }


 //validations
 CheckWarehouse(){
  if(this.selectedwarehouselist == 0 || this.selectedwarehouselist == undefined){
    this.msg="please select Warehouse"
    this.showError(this.msg);
    console.log("check False");
    this.found=false
     return this.check=false
   
  }    
  else
  {
    console.log("check true");
    this.found=true
   
  } 
 }

 showSuccess(msg:string)
 {
  this.messageService.add({severity:'success', summary: 'Success', detail: msg});
 }

 showError(msg:string)
 {
  this.messageService.add({severity:'error', summary: 'Error', detail: msg});
 }

 //export service call
 Export(){
  this.exportService.exportAsExcelFile(this.Data,"Inventory-Agging-Data");
}

}
