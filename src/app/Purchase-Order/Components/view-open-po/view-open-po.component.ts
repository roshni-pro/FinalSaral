import { Component, OnInit } from '@angular/core';
import { PodashboardserviceService } from 'app/Purchase-Order/Services/podashboardservice.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';


@Component({
  selector: 'app-view-open-po',
  templateUrl: './view-open-po.component.html',
  styleUrls: ['./view-open-po.component.scss']
})
export class ViewOpenPoComponent implements OnInit {

  constructor(private warehouseService: WarehouseService,private poservice:PodashboardserviceService,private exportService: ExportServiceService) { }

  selectedid:any;
  skip:number;
  take:number;
  totalRecords:number;
  podata:any;
  warehouseList:any;
  blocked:boolean=false;
IsSearch:boolean=false
  ngOnInit() {
    this.getAllWarehouses();
  }
  load(event){
    debugger
    this.skip = event ? event.first : 0;
    this.take = event ? event.rows : 10;
    if(this.IsSearch) this.Search();
    this.IsSearch=true;
  }

  getAllWarehouses() {   
    debugger 
    this.warehouseService.GetWarehouses()
      .subscribe(result => {
        this.warehouseList = result; 
        console.log(this.warehouseList);
               
      });
  }
  Search(){
    debugger
    if(this.selectedid == null ){
      alert("Please Select Warehouse");
      return false;
    }
    this.blocked=true;
    this.poservice.GetOpenPo(this.selectedid.WarehouseId,this.skip,this.take).subscribe(res=>{
      if(res.Status)
      {
        this.podata=res.data.OpenPODataList;
        this.totalRecords = res.data.TotalCount;
        console.log(this.podata);
        
      }
      else{
        alert(res.data);
      }
      this.blocked=false;
    })
  }
  export(){
    debugger
    this.blocked=true;
    this.poservice.GetOpenPo(0,0,0).subscribe(res=>{
      
      if(res.Status == true)
      {
        var OpenPODataList;  
        OpenPODataList = res.data.OpenPODataList.map(function (a) {
          return {
             // PaymentRefNo: a.PaymentRefNo,
             WarehouseId :a.WarehouseId,
             WarehouseName:a.WarehouseName,
             PurchaseOrderId :a.PurchaseOrderId,
             TotalAmount:a.TotalAmount,
             CreationDate:a.CreationDate,
             Status :a.Status,
             RemainingAmount:a.RemainingAmount,
             SupplierName:a.SupplierName,
             IRStatus:a.IRStatus,
             IRID:a.IRID
          };
        });
        
        this.exportService.exportAsExcelFile(OpenPODataList, 'OpenPoData'); 
      }
      else{
        alert(res.data);
      }
      this.blocked=false;
    })
  }

  // Search(){
  //   this.poservice.GetOpenPo(this.selectedid,this.skip,this.take).subscribe(res=>{
  //     if(res.Status)
  //     {
  //       this.podata=res;
  //     }
  //     else{
  //       alert(res.data);
  //     }
  //   })
  // }
}
