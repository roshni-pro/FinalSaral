import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { PodashboardserviceService } from 'app/Purchase-Order/Services/podashboardservice.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-debit-note-register',
  templateUrl: './debit-note-register.component.html',
  styleUrls: ['./debit-note-register.component.scss']
})
export class DebitNoteRegisterComponent implements OnInit {

  warehouseList: any[];
  selectedwarehousesList: any;
  warehouseid:any;
  FromDate:any;
  EndDate:any;
  skip:number;
  take:number;
  blocked=false;
  datalist:any=[];
  Issearch:boolean=false;
  totalRecords:any;
  constructor(private WarehouseServices: WarehouseService,
    private exportService: ExportServiceService,private messageService: MessageService,private poservice:PodashboardserviceService) { }

  ngOnInit() {
    this.selectedwarehousesList = [];
    this.WarehouseServices.getWarehouseCommon().subscribe(result => {
      this.warehouseList = result;

      if (this.warehouseList && this.warehouseList.length > 0) {
        this.selectedwarehousesList = this.warehouseList.filter(x => { return x.Selected == true })
      }
    })
  }
  load(event){
    debugger
    this.skip = event ? event.first : 0;
    this.take = event ? event.rows : 10;
    if(this.Issearch) this.search();
    this.Issearch=true;
  }


  search(){
    debugger
    this.Issearch=true;
    if(this.warehouseid==undefined){
      alert('Please Select Warehouse!!');
      return false;
    }
    let whouse = [];
   this.warehouseid.forEach(element => {
      whouse.push(element.value);
    });
    var FromDate = this.FromDate ? moment(this.FromDate).format('YYYY-MM-DD') : null
    var ToDate = this.EndDate ? moment(this.EndDate).format('YYYY-MM-DD') : null
    if(FromDate == null){
      alert('Please Select StartDate!!');
      return false;
    }
    if(ToDate == null){
      alert('Please Select Enddate')
      return false;
    }
    var datatoPost={
      StartDate:FromDate,
      EndDate:ToDate,
      WarehouseId:whouse,
      Skip:this.skip,
      take:this.take,
      IsExport:false
      };
      //GetDebitNoteRegisterData
      this.blocked=true;
        this.poservice.GetDebitNoteRegisterData(datatoPost).subscribe(res=>{
          this.blocked=false;
          if(res.length >0){
            this.datalist=res;
            this.totalRecords = res[0].totalrecords
            console.log(res);
          }
          else{
            this.datalist=[];
            this.totalRecords=0;
          alert("No data found");
          }
        })
  }

  export(){ 
   // this.Issearch=true;
    if(this.warehouseid==undefined){
      alert('Please Select Warehouse!!');
      return false;
    }
    let whouse = [];
   this.warehouseid.forEach(element => {
      whouse.push(element.value);
    });
    var FromDate = this.FromDate ? moment(this.FromDate).format('YYYY-MM-DD') : null
    var ToDate = this.EndDate ? moment(this.EndDate).format('YYYY-MM-DD') : null
    if(FromDate == null){
      alert('Please Select StartDate!!');
      return false;
    }
    if(ToDate == null){
      alert('Please Select Enddate')
      return false;
    }
    var datatoPost={
      StartDate:FromDate,
      EndDate:ToDate,
      WarehouseId:whouse,
      Skip:this.skip,
      take:this.take,
      IsExport:true
      };
      //GetDebitNoteRegisterData
      this.blocked=true;
        this.poservice.GetDebitNoteRegisterData(datatoPost).subscribe(res=>{
          this.blocked=false;
          if(res.length >0){
            this.exportService.exportAsExcelFile(res, 'DebitnoteRegistorData');
            console.log(res);
          }
          else{
          alert("No data found");
          }
        })
  }

}
