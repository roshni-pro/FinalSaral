import { Component, OnInit } from '@angular/core';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { PickerService } from 'app/shared/services/picker/picker.service';
import * as moment from 'moment';

@Component({
  selector: 'app-rejected-picker-report',
  templateUrl: './rejected-picker-report.component.html',
  styleUrls: ['./rejected-picker-report.component.scss']
})
export class RejectedPickerReportComponent implements OnInit {

  WareHouseList:any[]=[]
  selectedWareHouse:any[]=[]
  wareId:any[]=[]
  ListData:any[]=[]
  CurentRes:any[]=[]
  WID:any=null
  allWID:any[]=[]
  blocked:boolean=false;
  minDateValue: any;
  selectedDate : any;
  TodayDate : Date;
  

  constructor(private pickerservice : PickerService,private exportservice:ExportServiceService) { }

  ngOnInit() {
    this.TodayDate = new Date();
    this.GetWarehouse();
  }

  GetWarehouse() {
    this.blocked=true;
    this.pickerservice.GetAllWarehouseNew().subscribe(WareRes => { 
      this.blocked=false;
      this.WareHouseList = WareRes
      this.WareHouseList.forEach(x=>{
        this.allWID.push(x.value)
      }) 
    })   
  }

  SearchExportD()
  {
    this.wareId=[]
    this.selectedWareHouse.forEach(element=>{
      this.wareId.push(element.value);    
    })
    if(this.selectedWareHouse.length==0 || this.selectedWareHouse==undefined)
      {
        alert("please select warehouse")
      }
      if(this.selectedWareHouse.length>0 && this.selectedWareHouse!=undefined )
      {
        // debugger;
    const payload={
      "warehouselist":this.wareId,
      "allWarehouses": this.wareId.length == this.allWID.length ? this.allWID : [],
      "StartDate" : this.selectedDate && this.selectedDate[0] ? moment(this.selectedDate[0]).format('YYYY-MM-DD') : moment(this.TodayDate).format('YYYY-MM-DD'),
      "EndDate" : this.selectedDate && this.selectedDate[1] ? moment(this.selectedDate[1]).format('YYYY-MM-DD') : moment(this.TodayDate).format('YYYY-MM-DD')
    }
    this.blocked=true;
    this.pickerservice.RejectedPickerReportList(payload).subscribe(Eres=>{
      this.blocked=false;
      this.ListData=Eres
      console.log(this.ListData);
      
    })
  }
  }

  CurrentM(item)
  {
    debugger
    this.WareHouseList.forEach(x=>
      {
        var s =x.label.slice((x.label.indexOf('('))+2, x.label.indexOf(' )'));
        if(s==item.WarehouseName)
        {
          this.WID=x.value
        }
      })
      
      
        const payload=
      {
        "warehouselist": this.WID ? [this.WID] : this.allWID,
        "month":0,
        "StartDate" : this.selectedDate && this.selectedDate[0] ? moment(this.selectedDate[0]).format('YYYY-MM-DD') : moment(this.TodayDate).format('YYYY-MM-DD'),
        "EndDate" : this.selectedDate && this.selectedDate[1] ? moment(this.selectedDate[1]).format('YYYY-MM-DD') : moment(this.TodayDate).format('YYYY-MM-DD'),
        "isSelectedDate": false
      }
      this.blocked=true;
      
    this.pickerservice.rejectedPickerReportExport(payload).subscribe(Cres=>
    {
      this.blocked=false;
      this.CurentRes=Cres  
      let str = JSON.stringify(this.CurentRes,(k, v) =>  v === null ? 0 : v);
      let result = JSON.parse(str);
      this.exportservice.exportAsExcelFile(result," Collection Data") 
    })
    this.WID ='';
    
      
  }

  PreviousM(item)
  {
    this.WareHouseList.forEach(x=>
      {
        var s =x.label.slice((x.label.indexOf('('))+2, x.label.indexOf(' )'));
        if(s==item.WarehouseName)
        {
          this.WID=x.value
        }
      })
      const payload=
      {
        "warehouselist": this.WID ? [this.WID] : this.allWID,
        "month":1,
        "StartDate" : this.selectedDate && this.selectedDate[0] ? moment(this.selectedDate[0]).format('YYYY-MM-DD') : moment(this.TodayDate).format('YYYY-MM-DD'),
        "EndDate" : this.selectedDate && this.selectedDate[1] ? moment(this.selectedDate[1]).format('YYYY-MM-DD') : moment(this.TodayDate).format('YYYY-MM-DD'),
        "isSelectedDate": false
      }
    
      this.blocked=true;
    this.pickerservice.rejectedPickerReportExport(payload).subscribe(Cres=>
    {
      this.blocked=false;
      this.CurentRes=Cres  
      let str = JSON.stringify(this.CurentRes,(k, v) =>  v === null ? 0 : v);
      let result = JSON.parse(str);
      this.exportservice.exportAsExcelFile(result," Collection Data") 
    })
    this.WID ='';
  }

  CasualM(item)
  {
    this.WareHouseList.forEach(x=>
      {
        var s =x.label.slice((x.label.indexOf('('))+2, x.label.indexOf(' )'));
        if(s==item.WarehouseName)
        {
          this.WID=x.value
        }
      })
      const payload=
      {
        "warehouselist": this.WID ? [this.WID] : this.allWID,
        "month":1,
        "StartDate" : this.selectedDate && this.selectedDate[0] ? moment(this.selectedDate[0]).format('YYYY-MM-DD') : moment(this.TodayDate).format('YYYY-MM-DD'),
        "EndDate" : this.selectedDate && this.selectedDate[1] ? moment(this.selectedDate[1]).format('YYYY-MM-DD') : moment(this.TodayDate).format('YYYY-MM-DD'),
        "isSelectedDate": true
      }
    
      this.blocked=true;
    this.pickerservice.rejectedPickerReportExport(payload).subscribe(Cres=>
    {
      this.blocked=false;
      this.CurentRes=Cres  
      let str = JSON.stringify(this.CurentRes,(k, v) =>  v === null ? 0 : v);
      let result = JSON.parse(str);
      this.exportservice.exportAsExcelFile(result," Collection Data") 
    })
    this.WID ='';
  }
}