import { Component, OnInit } from '@angular/core';
import { InventoryforcastserService } from 'app/inventory-forcast/services/inventoryforcastser.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';
@Component({
  selector: 'app-auto-poreport',
  templateUrl: './auto-poreport.component.html',
  styleUrls: ['./auto-poreport.component.scss']
})
export class AutoPOReportComponent implements OnInit {

  constructor(private service: InventoryforcastserService,private export_service:ExportServiceService) { }
  warehouseList: any[]
  warid: any;
  sdate: Date;
  edate: Date;
  getAutoPoList: any[]
  warlist: any[] = [];
 blocked:boolean=false
  ngOnInit() {
    this.getWarehouseList()
  }
  getWarehouseList() {
    this.service.getWarehouses().subscribe(x => {
      this.warehouseList = x;
      console.log(this.warehouseList,"warid");
      
    }
    )
  }
  async ExportData(warehouseList)
  {
    debugger
    this.warlist=[]
    if(this.warid==null || this.warid ==undefined || this.warid.length==0)
    {
     alert("Select Warehouse")
     return false;
    }
    if(this.sdate==null || this.sdate==undefined)
    {
     alert("Select Start Date");
     return false;
    }
    if(this.edate==null || this.edate==undefined)
    {
     alert("Select End Date");
     return false;
    }
    console.log(warehouseList); 
    if (this.warid != undefined) {
      this.warid.forEach((warehouseList: any) => {
        this.warlist.push(warehouseList.WarehouseId)
      })
    
 
    const payload = {
      "warehouseIds": this.warlist,
      "startdate": this.sdate ? moment(this.sdate).format('YYYY-MM-DD') : null,
      "enddate": this.edate ? moment(this.edate).format('YYYY-MM-DD') : null
    }
    console.log("payload", payload);
    debugger
    // this.blocked=true
    // this.service.GetAutoPoManual(payload).subscribe(result => {
    // this.dataOfExport=result
    // console.log(this.dataOfExport,"dataOfExport");
    // this.blocked=false
    // })


    this.blocked=true
    this.dataOfExport =await this.service.GetAutoPoManual(payload).toPromise();
   this.blocked=false
   //this.warehouseList=[];
    }
    if (this.dataOfExport.length > 0) {
      this.export_service.exportAsExcelFile(this.dataOfExport, 'exportIndentData');
     // this.blocked=false

    }
    // if(this.exportIndentData.length == 0)
    // {
    //   alert("Data not found") 
    //   this.blocked=false
    // }
   
      
    
  }

  search(warehouseList) {
    debugger
    this.warlist=[]
     if(this.warid==null || this.warid ==undefined || this.warid.length==0)
     {
      alert("Select Warehouse")
      return false;
     }
     if(this.sdate==null || this.sdate==undefined)
     {
      alert("Select Start Date");
      return false;
     }
     if(this.edate==null || this.edate==undefined)
     {
      alert("Select End Date");
      return false;
     }

     
    if (this.warid != undefined) {
      this.warid.forEach((warehouseList: any) => {
        this.warlist.push(warehouseList.WarehouseId)
      })
    }
    console.log(this.warlist, "warlist");
    
    const payload = {
      "warehouseIds": this.warlist,
      "startdate": this.sdate ? moment(this.sdate).format('YYYY-MM-DD') : null,
      "enddate": this.edate ? moment(this.edate).format('YYYY-MM-DD') : null
    }
    console.log("payload", payload);
  this.blocked=true
    this.service.GetAutoPoManual(payload).subscribe(result => {

      this.getAutoPoList = result
      console.log("getAutoPoList", this.getAutoPoList);
this.blocked=false


    })
  }

  Remove() {
    window.location.reload();
  }
  exportIndentData:any[]
  dataOfExport:any[]   
  }
