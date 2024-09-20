import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { MisreportService } from '../Service/misreport.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { StoreService } from 'app/store/services/store.service';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { environment } from "environments/environment";
@Component({
  selector: 'app-account-mis',
  templateUrl: './account-mis.component.html',
  styleUrls: ['./account-mis.component.scss']
})
export class AccountMISComponent implements OnInit {

  constructor(private WarehouseService :WarehouseService ,private service : MisreportService ,private exportService:ExportServiceService,private StoreService:StoreService, private msg:MessageService) { }

  ngOnInit() {
  }
  blocked:boolean=false;
  WareHouseList:any
  alepop:boolean=false;
  ViewList:any

  emp() {
    this.alepop=true;
  }

  selectDate:any

  Export()
  {
    debugger;
    
    if(this.selectDate==undefined)
    {
      this.showError("Select Date");
    }
    else if(this.selectDate!=undefined) {
    
      const payload=
      {
        "MonthDate":this.selectDate!=null ? moment(this.selectDate).format('L') : null
      }
      this.blocked=true;
      this.service.AccountMisTemplateExport(payload).subscribe(x=>{
        this.blocked=false;
        if(x.Status==false) this.showError(x.Message)
        else{
          this.blocked=false;
          window.open(x.Message);
        }
          console.log(x);
      })
    }
    else {
      if(this.alepop==true)
      {
        this.showError("Please Select the search feilds")
        this.alepop=false;
      }
    }
  }
  
  onUpload(event,selectDate) {
    debugger;
    const files = event.files[0];
    console.log(files);
    let file = new FormData();
    file.append("file", files)
    if(selectDate==undefined)
	{
      this.showError("Please Select Date");
    }
    else{
    this.blocked=true;
    let Date=moment(selectDate).format('L');

    this.service.AccountMISTemplateUploder(Date,file).subscribe(res => {
        debugger;
        console.log(res)
        this.blocked=false;
        alert(res);
      },
      err => {
        alert(err.error)
        this.blocked=false;
      })
    }
  }

  clear()
  {
    this.selectDate=undefined;
  }
  
  showError(msg1:string){
    this.msg.add({severity:'error', summary: 'Error', detail:msg1});
  }
  showSuccess(msg1:string){
    this.msg.add({severity:'success', summary: 'Success', detail:msg1});
  }
  DownLoadSampleFile()
  {
    let arr = [];
    arr.push({
      'Tally Ledger':null,
      'Warehouse':null, 
      'Department':null,
      'Vertical'	:null,
      'CM5 head':null,
      'Canvas Head'	:null,
      'Expense MIS Head'	:null,     			
      'MIS Head'	:null,
      'Cost MIS Head'	:null,
      'Financial Head'	:null,
      'Amount'	:null      
    })
  this.exportService.exportAsExcelFile(arr,"SampleFile AccountMISTemplate")
  }
}
