import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { MisreportService } from '../Service/misreport.service';
import { ExportService } from 'app/shared/services/export.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-package-material-cost',
  templateUrl: './package-material-cost.component.html',
  styleUrls: ['./package-material-cost.component.scss']
})
export class PackageMaterialCostComponent implements OnInit {

  constructor(private WarehouseService :WarehouseService ,private service : MisreportService ,private exportService:ExportServiceService, private msg:MessageService) { }

  ngOnInit() {
    this.GetWareHouse()
  }

  blocked:boolean=false;
  WareHouseList:any
  selectedWareHouse:any[]=[]
  selectDate:any
  ViewList:any
  wid:any
  first:number=0;
  TotalRecords:number=0
  hitbtn:boolean=false
  alepop:boolean=false;

  GetWareHouse( )
  {
    this.blocked=true;
    this.WarehouseService.GetWarehouseNew().subscribe(res=>
    {
      this.WareHouseList=res
      this.blocked=false;
      console.log(this.WareHouseList,"WarehousesAPi");
    })
  }
  emp() {
    this.first = 0;
    this.TotalRecords = 0;
    this.alepop=true;
    this.hitbtn=true;
  }

  load(event) {
    if(this.hitbtn)
      this.search(event)    
  }

  search(event)
  {
    debugger;
    if(this.selectedWareHouse==undefined || this.selectedWareHouse.length==0)
    {
      this.showError("Please select warehouse");
    }
    else if(this.selectDate==undefined)
    {
      this.showError("Please select month");
    }
    else if(this.selectedWareHouse!=undefined&& this.selectDate!=undefined){
      console.log(this.selectedWareHouse);
      this.wid=[];
      this.selectedWareHouse.forEach(element => {
        this.wid.push(element.value)
      });
      console.log(this.selectDate);
      let year = this.selectDate.getFullYear();
      let month = moment(this.selectDate).format("MM");
  
      const payload=
      {
        "warehouseid" : this.wid ? this.wid : [],
        "month":month,
        "year":year,
        "skip":event && event.first ? event.first : 0,
        "take":event && event.rows ? event.rows : 10
      }
      this.blocked=true;
      this.service.GetPackageMaterialCost(payload).subscribe(x=>{
        console.log(x);
        this.ViewList=x.PkgMatCostList;
        this.TotalRecords=x.totalcount
        this.blocked=false;
        if(this.ViewList==undefined)
        {
          this.showError("No data found");
        }
      })
    }
    else {
      if(this.alepop==true)
      {
        this.showError("Please select the serach feilds.")
        this.alepop=false;
      }
    }
  }

  export()
  {
    if(this.ViewList==undefined)
    {
      this.showError("Please Search the data first!");
    }
    else{
      var exportData=[];
      exportData.push(this.ViewList);
      debugger;
      this.blocked=true;
      this.exportService.exportAsExcelFile(this.ViewList,"Export Package Material Cost Data");
      this.blocked=false;
    }
  }

  onUpload(event) {
    const files = event.files[0];
    console.log(files);
    let file = new FormData();
    file.append("file", files)
    debugger;
    this.blocked=true;
    this.service.PkgMatCostuploader(file).subscribe(
      res => {
        debugger;
        this.blocked=false;
        console.log(res)
        if (res.Status == false) {
          alert(res.msg);
        } else {
          alert(res)
        }
      },
      err => {
        alert(err.error.ErrorMessage)
      })
  }

  DownLoadSampleFile() {
    let arr = [];
    arr.push({
      'MRPID':null,
      'WarehouseName':null, 
      'Month'	:null,
      'Year':null,
      'PerPieceCost'	:null      			
    })
  this.exportService.exportAsExcelFile(arr,"SampleFile Package Material Cost")
  }

  clear()
  {
    this.selectDate=undefined;
    this.selectedWareHouse=undefined;
    this.ViewList=undefined;
  }

  showError(msg1:string){
    this.msg.add({severity:'error', summary: 'Error', detail:msg1});
  }
  showSuccess(msg1:string){
    this.msg.add({severity:'success', summary: 'Success', detail:msg1});
  }
}
