import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { DatePipe } from '@angular/common'
import { ClearanceOrderPickerListService } from 'app/current-stock/services/clearance-order-picker-list.service';
import { MessageService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-clearance-order-picker',
  templateUrl: './clearance-order-picker.component.html',
  styleUrls: ['./clearance-order-picker.component.scss']
})
export class ClearanceOrderPickerComponent implements OnInit {
  warehouseList : any;
  pickerstatus:any;
  selWarehouse:any;
  selpickerstatus:any;
  rangeDates:any;
  item:any;
  TotalRecordsCount:number
  blocked:boolean=false;
  constructor(private wareService : WarehouseService,public datepipe: DatePipe,private exportserv:ExportServiceService,
     private _Service : ClearanceOrderPickerListService,private msg:MessageService) {
      this.minDate = new Date();
      this.maxDate = new Date();
      this.minDate.setMonth(this.maxDate.getMonth() - 2);
  }
  minDate:Date
  maxDate:Date
  ngOnInit() {
    this.wareService.GetAllWarehouse().subscribe(
      (res) => {
        this.warehouseList = res;
      });
      this.pickerstatus=[
        {Name:'All', Value:null},
        {Name:'New', Value:'New'},
        // {Name:'In Progress', Value:'In Progress'},
        {Name:'Accepted', Value:'Accepted'},
        {Name:'Rejected', Value:'Rejected'},
      ]
  }

  startDate:any
  endtDate:any
  onSearch(){
    debugger;
    if(this.selWarehouse==undefined){
      this.showError("select warehouse first")
      return
    }
    else{
      if(this.rangeDates!=undefined)
      {
        this.startDate=this.datepipe.transform(this.rangeDates[0], 'yyyy-MM-dd')
        this.endtDate=this.datepipe.transform(this.rangeDates[1], 'yyyy-MM-dd')
        if(this.rangeDates[1]==undefined)
        {
          this.showError("select date range first")
          return
        }
      }
      this.load(null)
    }
  }

  skip:number;
  take:number;
  ClearanceOrderPickerList:any;
  load(event) {
    debugger;
    if(event!=null){
      this.take = event.rows;
      this.skip = event.first; 
    }
    if(this.selWarehouse==undefined){
      return
    }else{
      const SearchClearanceOrderPickerDC={
        "WareHouseId":this.selWarehouse.WarehouseId,
        "FromDate":this.startDate==undefined?null:this.startDate,
        "ToDate":this.endtDate==undefined?null:this.endtDate,
        "ItemName":this.item==undefined?null:this.item,
        "PickerStatus":this.selpickerstatus==undefined?null:this.selpickerstatus.Name,
        "skip":this.skip,
        "take":this.take
      }
      console.log("payload",SearchClearanceOrderPickerDC)
      this.blocked=true;
      this._Service.GetClearanceOrderPickerRecords(SearchClearanceOrderPickerDC).subscribe(result => {
        console.log("apiResponse",result)
        if(result!=null){
          if(result.ClearanceOrderPickerListDCs.length==0 && result.TotalRecords==0){
            this.blocked=false;
            this.showError("Data not found")
            this.ClearanceOrderPickerList=[];
            this.TotalRecordsCount=0;
          }
          else{
            this.blocked=false;
            this.ClearanceOrderPickerList=result.ClearanceOrderPickerListDCs;
            this.TotalRecordsCount=result.TotalRecords;
            this.startDate=undefined
            this.endtDate=undefined
          }
          this.blocked=false;
        }
        else{
          this.blocked=false;
          this.showError("Something went wrong!")
        }
      },(err: any) => {
        this.blocked = false;
        this.showError(err.statusText); 
      });
    }
  }

  showError(msg1:string){
    this.msg.add({severity:'error', summary:'Error', detail:msg1});
  }

  showSuccess(msg1:string){
    this.msg.add({severity:'success', summary:'Success', detail:msg1});
  }

  onRefresh(){
    this.ClearanceOrderPickerList=[];
    this.TotalRecordsCount=0
    this.selWarehouse=undefined
    this.selpickerstatus=undefined
    this.item=undefined
    this.rangeDates=undefined
    this.skip=0;
    this.take=10;
  }

  onExport(){
    if(this.selWarehouse==undefined){
      this.showError("select warehouse first")
      return
    }
    else if(this.rangeDates==undefined){ 
      this.showError("select date range first")
      return
    }
    else{
      if(this.rangeDates!=undefined){
      this.startDate=this.datepipe.transform(this.rangeDates[0], 'yyyy-MM-dd')
        if(this.rangeDates[1]==undefined){
          this.showError("select date range first")
          return
        }
        else this.endtDate=this.datepipe.transform(this.rangeDates[1], 'yyyy-MM-dd')
      }
      debugger;
      const SearchClearanceOrderPickerExportDC={
        "WareHouseId":this.selWarehouse.WarehouseId,
        "FromDate":this.startDate,
        "ToDate":this.endtDate,
        "ItemName":this.item==undefined?null:this.item,
        "PickerStatus":this.selpickerstatus==undefined?null:this.selpickerstatus.Name,
        "skip":0,
        "take":0
      }
      this.blocked=true;
      this._Service.GetClearanceOrderPickerExport(SearchClearanceOrderPickerExportDC).subscribe(result => {
        console.log("ExportApiResponse",result)
        if(result!=null){
          if(result.length==0){
            this.blocked=false;
            this.showError("Data not found")
          }
          else{
            this.blocked=false;
            //export
            // var res = result.map(function(a) {
            //   return {
            //     'Type':a.type,
            //     'StoreName': a.storeName,
            //     'GroupName': a.GroupName,
            //     'CreatedDate': a.CreatedDate,
            //     'ValidityDate': a.ValidityDate,
            //     'Status':a.ValidityDate
            //    };
            //  });
             this.exportserv.exportAsExcelFile(result,"ClearanceOrderPickerExcelFile")
          }
          this.blocked=false;
        }
        else{
          this.blocked=false;
          this.showError("Something went wrong!")
        }
      },(err: any) => {
        this.blocked = false;
        this.showError(err); 
      });
    }
  }

}
