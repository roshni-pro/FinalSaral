import { Component, OnInit } from '@angular/core';
import { PlanMasterService } from 'app/operation-capacity/services/plan-master.service';
import { InventoryProvisioningService } from 'app/report/services/inventory-provisioning.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inventory-provisioning',
  templateUrl: './inventory-provisioning.component.html',
  styleUrls: ['./inventory-provisioning.component.scss']
})
export class InventoryProvisioningComponent implements OnInit {

  constructor(private planMasterService: PlanMasterService,private service:InventoryProvisioningService,
    private msg:MessageService,private exportserv:ExportServiceService,private router: Router) { }

  ngOnInit() {
    var date = new Date();
    this.selectedDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.getWareHouseList();
    this.getBrandList();
  }
  blocked:boolean
  warehouseList:any[]=[];
  warehouseId:any
  selectedBrands:any
  BrandList:any=[];
  filterValue:any;
  selectedDate: Date;
  getWareHouseList() {
    this.blocked = true;
    this.planMasterService.getWarehouseList().subscribe((res) => {
      // debugger;
      if (res.length>0) {
        let obj={
          label : "All",
          value : 0
        }
        res.unshift(obj);
        this.warehouseList = res;
      }
      this.blocked = false;
      console.log("warehouseList:", this.warehouseList);
    },(error:any)=>{
      console.log("", error);
    });
  }

  getBrandList() {
    debugger;
    this.blocked = true;
    this.service.GetAllBrandList().subscribe((res) => {
      if (res.length>0) {this.BrandList = res;} 
      this.blocked = false;
    },(error:any)=>{
      console.log("", error);
    });
  }

  ProvisionDataList:any[]=[];
  mapped=[]
  first=0;
  Searchbtn(){
    debugger
    if(this.warehouseId==undefined) this.showError("select warehouse first!")
    else if(this.selectedBrands==undefined) this.showError("select brand first!")
    else{
      var bids=[];
      this.selectedBrands.forEach(element => {
        bids.push(element.BrandId)
      });
      const model={
        "CalculationDate" :this.selectedDate,//moment(new Date()).format('YYYY-MM-DD'),
        "WarehouseId" : this.warehouseId.value,
        "BrandIdList" : bids,
        "Keyword": this.filterValue==undefined?"":this.filterValue
      }
      this.first=0
      this.blocked=true
      this.service.GetProvisionData(model).subscribe((res) => {
        if (res.length>0) {this.ProvisionDataList = res;
          //this.mapped = Object.entries(this.ProvisionDataList[0]).map(([k,v]) =>`${k}`);
        } 
        else {
          this.showError("Data Not Found")
        }
        this.blocked = false;
      },(error:any)=>{
        console.log("", error);
      });
    }
  }

  filterGlobal(value){
    if(this.warehouseId==undefined) this.showError("select warehouse first!")
    else if(this.selectedBrands==undefined) this.showError("select brand first!")
    else{
      var bids=[];
      this.selectedBrands.forEach(element => {
        bids.push(element.BrandId)
      });
    }
    const model={
      "CalculationDate" :this.selectedDate,//moment(new Date()).format('YYYY-MM-DD'),
      "WarehouseId" : this.warehouseId.value,
      "BrandIdList" : bids,
      "Keyword": this.filterValue==undefined?"":this.filterValue
    }
    this.blocked=true
    this.service.GetProvisionData(model).subscribe((res) => {
      if (res.length>0) {this.ProvisionDataList = res;} 
      else {
        this.showError("Data Not Found")
      }
      this.blocked = false;
    },(error:any)=>{
      console.log("", error);
    });
  }

  Export(){
    debugger;
    if(this.ProvisionDataList==undefined ||this.ProvisionDataList.length==0) this.showError("please search the data first!")
    else if(this.ProvisionDataList!=null && this.ProvisionDataList!=undefined && this.ProvisionDataList.length>0){
      this.blocked=true
      // var exportRes=this.ProvisionDataList.map(r=>{
      //   return {
      //     "WarehouseName":r.WarehouseName,
      //     "ItemMultiMrpId":r.ItemMultiMrpId,
      //     "MRP":r.MRP,
      //     "itemBaseName":r.itemBaseName,
      //     "WarehouseId":r.WarehouseId,
      //     "InDate":'',
      //     "Ageing":'',
      //     "ClosingQty":r.ClosingQty,
      //     "ClosingAmount":r.ClosingAmount,
      //     "Item Number":r.Number,
      //     "31-60 Days":r['30-60'],
      //     "61-90 Days":r['61-90'],
      //     "91-180 Days":'',
      //     "181-360 Days":r['181-360'],
      //     "361- 3 years":r['361-1080'],
      //     "Total Provisioning":r.TotalProvisioning,
      //     "P/L Impact":r.PandLImpact,
      //     "Final Impact":r.FinalImpact
      //   }
      // })
      // this.exportserv.exportAsExcelFile(exportRes,"InventoryProvisioningReport")
      this.exportserv.exportAsExcelFile(this.ProvisionDataList,"InventoryProvisioningReport")
      this.blocked=false;
    }else if(this.ProvisionDataList.length==0) this.showError("Data Not Found!")
    else this.showError("Something Went Wrong")
  }

  redirect(){
    debugger
    this.router.navigateByUrl("layout/report/Inventory-Provisioning-graph");
  }
  showError(msg1:string){
    this.msg.add({severity:'error', summary: 'Error', detail:msg1});
  }
  showSuccess(msg1:string){
    this.msg.add({severity:'success', summary: 'Success', detail:msg1});
  }
}
