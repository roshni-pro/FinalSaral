import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanMasterService } from 'app/operation-capacity/services/plan-master.service';
import { InventoryProvisioningService } from 'app/report/services/inventory-provisioning.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-inventor-provision-graph',
  templateUrl: './inventor-provision-graph.component.html',
  styleUrls: ['./inventor-provision-graph.component.scss']
})
export class InventorProvisionGraphComponent implements OnInit {

  data: any;
  GraphModeList:any
  GraphMode:any
  colorlist:any
  constructor(private messageService: MessageService,private planMasterService: PlanMasterService,
    private service:InventoryProvisioningService,private datePipe: DatePipe,private router: Router,
    private msg:MessageService,private exportserv:ExportServiceService) {
      var colorlistt=['#4bc0c0','#565656',"#ef9b20", "#edbf33", "#ede15b", "#bdcf32", "#87bc45", "#27aeef", "#b33dc6"]
      this.colorlist=["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#800000", "#008000", "#000080", "#808000", "#800080", "#008080", "#C0C0C0", "#808080", "#FFA500", "#FFC0CB", "#800080", "#FFD700", "#00FF7F", "#FF1493", "#ADFF2F", "#FF4500", "#DA70D6", "#7FFFD4", "#8A2BE2", "#FF69B4", "#20B2AA", "#DC143C", "#FF6347", "#2E8B57"]
      this.GraphModeList=[{label:'Month',type:'Month'},{label:"Day",type:"Day"}]
      this.GraphMode = {label:"Month",type:"Month"}
  }

  selectData(event) {
      this.messageService.add({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
  }

  ngOnInit() {
    this.getWareHouseList();
    this.getBrandList();
  }
  filterGlobal(value){

  }
  blocked:boolean
  warehouseList:any[]=[];
  warehouseId:any[]=[]
  selectedBrands:any[]=[]
  BrandList:any=[];
  Filterkeyword:any
  getWareHouseList() {
    this.blocked = true;
    this.planMasterService.getWarehouseList().subscribe((res) => {
      debugger;
      if (res.length>0) this.warehouseList = res;
      this.blocked = false;
      console.log("warehouseList:", this.warehouseList);
      this.warehouseList.forEach((warehouse:any) => {
        this.warehouseId.push(warehouse);
      })
    },(error:any)=>{
      console.log("", error);
    });
  }

  getBrandList() {
    debugger;
    this.blocked = true;
    this.service.GetBrandList().subscribe((res) => {
      if (res.length>0) this.BrandList = res;
      this.blocked = false;
      this.BrandList.forEach((brand:any) => {
        this.selectedBrands.push(brand);
      })
    },(error:any)=>{
      console.log("", error);
    });
  }

  Searchbtn(){
    debugger
    if(this.warehouseId==undefined || this.warehouseId.length==0) this.showError("select warehouse first!")
    //else if(this.selectedBrands==undefined || this.selectedBrands.length==0) this.showError("select brand first!")
    else if(this.dateRange==undefined) this.showError("select month range first!")
    else if(this.dateRange.length>0 && this.dateRange[1]==null) this.showError("select second month first!")
    //else if(this.errorMsg) this.showError("Minimum date range should be one month")
    else{
      var bids=[]; var wids=[];
      this.selectedBrands.forEach(element => {
        bids.push(element.BrandId)
      });
      this.warehouseId.forEach((warehouse:any) => {
        wids.push(warehouse.value);
      })
      const payload={
        "FromDate" : moment(this.dateRange[0]).format('YYYY-MM-DD'),
        "ToDate" : moment(this.dateRange[1]).format('YYYY-MM-DD'),
        "WarehouseIdList" : wids,
        "BrandIdList" : bids,
      }
      console.log("payload",payload)
      this.blocked=true;
      this.service.GetProvisionGraphData(payload).subscribe((response:any)=>{
        this.blocked=false
        this.data=[];
        if(response.datasets==null) this.showError("Data Not Found");
        else{
          var list=[],i=0;
          response.datasets.forEach(element => {
            element.fill=true;
            element.borderColor=this.colorlist[i]
            list.push(element)
            i++;
          });
          this.data.labels=response.labels
          this.data.datasets = list
        }
      },(error:any)=>{
        console.log("", error);
      })
    }
  }

  selectedRange: Date[];
  errorMsg:boolean=false;
  dateRange:any
  onDateChange(date){
    debugger
    // if(this.selectedRange[1]!=null){
    //   let days = Math.floor(this.selectedRange[1].getTime() - this.selectedRange[0].getTime())/(1000*3600*24)
    //   console.log("diff",days)
    //   const currentYear = this.selectedRange[0].getFullYear();
    //   const currentMonth = this.selectedRange[0].getMonth()
    //   var getDaysInMonth = function(month,year) {
    //     return new Date(year, month+1, 0).getDate();
    //   };
    //   console.log('curenntmondthdayscount',getDaysInMonth(currentMonth, currentYear));
    //   if((days+1)>=getDaysInMonth(currentMonth, currentYear)){ this.errorMsg=false}
    //   else{this.errorMsg=true}
    // }
    if(this.dateRange[1]!=null || this.dateRange[1]!=undefined){
      var lastDay = new Date(this.dateRange[1].getFullYear(), this.dateRange[1].getMonth() + 1, 0);
      console.log(moment(this.dateRange[0]).format('MM/DD/YYYY'),)
    }
  }
  redirect(){
    debugger
    this.router.navigateByUrl("layout/report/Inventory-Provisioning");
  }
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  showError(msg1:string){
    this.msg.add({severity:'error', summary: 'Error', detail:msg1});
  }
  showSuccess(msg1:string){
    this.msg.add({severity:'success', summary: 'Success', detail:msg1});
  }
}







