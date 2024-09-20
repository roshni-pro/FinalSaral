import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { MisreportService } from '../Service/misreport.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { StoreService } from 'app/store/services/store.service';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';

@Component({
  selector: 'app-skpkppcommision',
  templateUrl: './skpkppcommision.component.html',
  styleUrls: ['./skpkppcommision.component.scss']
})
export class SKPKPPCommisionComponent implements OnInit {

  constructor(private WarehouseService :WarehouseService ,private service : MisreportService ,private exportService:ExportServiceService,private StoreService:StoreService, private msg:MessageService) { }

  ngOnInit() {
    this.GetWareHouse();
    this.getStore();
  }

  blocked:boolean=false;
  WareHouseList:any
  selectedWareHouse:any[]=[]
  selectDate:any
  allStoreList:any
  selectedStore:any[]=[]
  ViewList:any
  wid:any
  sid:any
  hitbtn:boolean=false
  first:number=0;
  TotalRecords:number=0;
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

  getStore()
  {
    this.blocked=true;
    this.StoreService.GetStoreList().subscribe((res) => {
      this.allStoreList = res;
      this.blocked=false;
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
    if(this.selectedWareHouse ==undefined|| this.selectedWareHouse.length==0 )
    {
      this.showError("Select warehouse");
    }
    else if(this.selectedStore ==undefined|| this.selectedStore.length==0 )
    {
      this.showError("Select Store");
    }
    else if(this.selectDate==undefined)
    {
      this.showError("Select Month");
    }
    else if(this.selectedWareHouse!=undefined && this.selectedStore!=undefined && this.selectDate!=undefined) {
      let year = this.selectDate.getFullYear();
      let month = moment(this.selectDate).format("MM");
      this.wid=[];this.sid=[];
      this.selectedWareHouse.forEach(element => {
        this.wid.push(element.value)
      });
      this.selectedStore.forEach(element => {
        this.sid.push(element.Id)
      });
      const payload=
      {
        "warehouseid":this.wid ? this.wid : [],
        "storeid":this.sid ? this.sid : [],
        "month":month,
        "year":year,
        "skip":event && event.first ? event.first : 0,
        "take":event && event.rows ? event.rows : 10
      }
      this.blocked=true;
      this.service.GetGetSkpKppCommission(payload).subscribe(x=>{
        console.log(x);
        this.ViewList=x.SkpKppList;
        this.TotalRecords=x. totalcount;
        this.blocked=false;
        if(this.ViewList==undefined)
        {
          this.showError("No Data Found!");
        }
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

  export()
  {
    if(this.ViewList==undefined)
    {
      this.showError("Please Search the data first!");
    }
    else{
      var exportData=[];
      exportData.push(this.ViewList);
      this.blocked=true;
      this.exportService.exportAsExcelFile(this.ViewList,"Export Skp-Kpp Commission Data");
      this.blocked=true;
    }

  }

  onUpload(event) {
    const files = event.files[0];
    console.log(files);
    let file = new FormData();
    file.append("file", files)
    this.blocked=true;
    this.service.SkpKppUploader(file).subscribe(
      res => {
        debugger;
        console.log(res)
        this.blocked=false;
        if (res.Status == false) {
          alert(res.msg);
        } else {
          alert(res.msg)
          this.blocked=false;
        }
      },
      err => {
        alert(err.error.ErrorMessage)
        this.blocked=false;
      })
  }

  DownLoadSampleFile()
  {
    let arr = [];
    arr.push({
      'StoreName':null,
      'WarehouseName':null, 
      'Type':null,
      'Month'	:null,
      'Year':null,
      'Commission'	:null      			
    })
  this.exportService.exportAsExcelFile(arr,"SampleFile Skp-Kpp Commission ")
  }

  showError(msg1:string){
    this.msg.add({severity:'error', summary: 'Error', detail:msg1});
  }
  showSuccess(msg1:string){
    this.msg.add({severity:'success', summary: 'Success', detail:msg1});
  }

  clear()
  {
    this.selectDate=undefined;
    this.selectedStore=undefined;
    this.selectedWareHouse=undefined;
    this.ViewList=undefined;
  }
}
