import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { MessageService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { CmsServiceService } from 'app/report/services/cms-service.service';
import { DatePipe } from '@angular/common'
import { ThemeService } from 'ng2-charts';
import * as moment from 'moment';
import { element } from 'protractor';
import { Logger } from 'html2canvas/dist/types/core/logger';

@Component({
  selector: 'app-l-p-reports',
  templateUrl: './l-p-reports.component.html',
  styleUrls: ['./l-p-reports.component.scss']

})

export class LPReportsComponent implements OnInit {  
  warehouseList: any[];
  selectedwarehouselist:any;
  warehouseId:any
  msg:string=""
  blocked=false;
  selectedwarehouse:any[];
  ReportsName:any[];
  sptype:any;
  lpHeading:any[];
  dateValue:Date;
  constructor(private warehouseService: WarehouseService,private messageService: MessageService,private exportService:ExportServiceService,private LPreportService:CmsServiceService,public datepipe: DatePipe)
  {
    const role = localStorage.getItem("role");
    if(role.includes('IC department lead')){
      this.ReportsName=[
        {Name:"Debit Note Report",Id:11}
      ]
    }else{
    this.ReportsName=[
    {Name:"Cycle Count Report",Id:1},
    {Name:"Assignment Closer Report",Id:2},
    {Name:"Cash Deposit Report",Id:3},
    {Name:"Order Master POC Report",Id:4},
    {Name:"Order Clearance Report",Id:5},
    {Name:"Virtual Settle Report",Id:6},
    {Name:"Sales Register Report",Id:8},
    {Name:"Credit Note Register Report",Id:9},
    {Name:"CMS Report", Id:10},
    {Name:"Debit Note Report",Id:11},
    {Name:"Internal Transfer Report",Id:12},
    {Name:"Damage Order Master Report",Id:13},
    {Name:"PR Report",Id:14},
    {Name:"PO Master Report",Id:15},
    {Name:"Virtual Unsettled Report",Id:16},
    {Name:"Stock Transfer Report",Id:18},
    {Name:"Employee Details Report",Id:17},
    {Name:"Non Revenue Order Report",Id:19},
    {Name:"Non Sellable Order Master Report",Id:20},
  ]}
  }

  minDate: Date;
  maxDate: Date;
  ngOnInit() {
    this.getSpecificWarehouses();
    var date = new Date();
    // this.minDate = new Date(date.setMonth(date.getMonth() - 18));
    // this.maxDate = new Date();\

    // let today = new Date();
    // let month = today.getMonth();
    // let year = today.getFullYear();
    // let prevMonth = (month === 0) ? 11 : month -1;
    // let prevYear = (prevMonth === 11) ? year - 1 : year;
    // let nextMonth = (month === 11) ? 0 : month + 1;
    // let nextYear = (nextMonth === 0) ? year + 1 : year;
    // this.minDate = new Date();
    // this.minDate.setMonth(prevMonth);
    // this.minDate.setFullYear(prevYear);
    // this.maxDate = new Date();

    //this.maxDate.setMonth(nextMonth);
      // this.maxDate.setFullYear(nextYear);
  }

  private getSpecificWarehouses() {
    this.warehouseService.GetAllWarehouse().subscribe(result => {
      this.warehouseList = result;
    });
  }

  pageRefreshBtn(){
    //window.location.reload();
    this.dateValue=undefined;
    this.sptype={};
    this.showExportdata=[];
    this.showExportdata=undefined;
    this.selectedwarehouselist=[];
    this.searchBtn=false;
    this.sptype=undefined;

  }
  
  showError(msg:string){
   this.messageService.add({severity:'error', summary: 'Error', detail: msg});
  }

  showSuccess(msg:string){
    this.messageService.add({severity:'success', summary: 'Success', detail:msg});
  }

  searchBtn:boolean=false;
  onSearch(reportTypeid){
    console.log(reportTypeid);
    
    if(reportTypeid!=undefined)this.searchBtn=true; 
    else this.searchBtn=false; this.showExportdata=undefined;
  }

  onSearchWareHouseId(warehouseId){
    if(warehouseId && this.sptype['Id']==1) this.searchBtn=true;
  }
 
  rangeDates:any;
  exportdata:any[]=[];
  showExportdata:any[];
  payload:any
  Export(){
    if(this.sptype==undefined) this.showError("choose report type first");
    else if(this.selectedwarehouselist == 0 || this.selectedwarehouselist == undefined) this.showError("please select Warehouse");
     else if(this.dateValue==null || !this.dateValue==undefined) this.showError("please select month");
    // else if(this.rangeDates[1]==null) {
    //   this.showError("please select end date");
    // }
    else{
      this.blocked = true;
      this.selectedwarehouse=this.selectedwarehouselist.map(function(element){
        return element.WarehouseId
      });
      // let startDate =this.datepipe.transform(this.rangeDates[0], 'yyyy-MM-dd');
      // let endDate =this.datepipe.transform(this.rangeDates[1], 'yyyy-MM-dd');
      // let startDate =this.rangeDates[0] ? moment(this.rangeDates[0]).format('YYYY-MM-DD') : null
      // let endDate =this.rangeDates[1] ? moment(this.rangeDates[1]).format('YYYY-MM-DD') : null
      this.payload={
        'warehouseIds':this.selectedwarehouse, 
        'month' :this.dateValue.getMonth()+1,
        'year':this.dateValue.getFullYear(),
        'sptype':this.sptype['Id']
      } 
      console.log(this.payload);  
      this.LPreportService.ExportLandPreport(this.payload).subscribe(result=>{
        this.exportdata=result;    
        if(this.exportdata.length>0){
          this.exportService.exportAsExcelFile(this.exportdata,this.sptype['Name']+"-DATA");
          this.blocked = false;
          this.showSuccess("Data Export Successfully");
        }
        else{
          this.blocked = false;
          this.showError("data not found");
        }
      },(err: any) => {
        console.log(err);
        this.showError(err);
        this.blocked = false;
      });      
    }
  } 

  onSearchBtn(){
   if(this.sptype==undefined) this.showError("choose report type first");
    else if(this.selectedwarehouselist == 0 || this.selectedwarehouselist == undefined) this.showError("please select Warehouse");
    else if(this.dateValue==null || !this.dateValue==undefined) this.showError("please select month");
    // else if(this.rangeDates[1]==null) {
    //   this.showError("please select end date");
    // }
    else{
       this.blocked = true;
      this.selectedwarehouse=this.selectedwarehouselist.map(function(element){
        return element.WarehouseId
      });
      // let startDate =this.datepipe.transform(this.rangeDates[0], 'yyyy-MM-dd');
      // let endDate =this.datepipe.transform(this.rangeDates[1], 'yyyy-MM-dd');
      this.payload={
        'warehouseIds':this.selectedwarehouse, 
        'month' :this.dateValue.getMonth()+1,
        'year':this.dateValue.getFullYear(),
        'sptype':this.sptype['Id']
      } 
      this.LPreportService.ExportLandPreport(this.payload).subscribe((res:any)=>{
        console.log(res);
        if(res.length>0){
          this.lpHeading = Object.keys(res[0])
          console.log(this.lpHeading,"lpHeading");

          res.forEach(element=>
            {
                
              element.CreatedDate=moment(element.CreatedDate).format('DD-MM-YYYY');
              element.CreationDate=moment(element.CreationDate).format('DD-MM-YYYY');
              element.DateOfJoining=moment(element.DateOfJoining).format('DD-MM-YYYY');
              element.PoDate=moment(element.PoDate).format('DD-MM-YYYY');
              element.GRDate=moment(element.GRDate).format('DD-MM-YYYY');
              element.LastIRdate=moment(element.LastIRdate).format('DD-MM-YYYY');
              element.Delivery_Canceled_Date=moment(element.Delivery_Canceled_Date).format('DD-MM-YYYY');
              element.Deliverydate=( element.Deliverydate == null || element.Deliverydate=='Invalid date' ) ? element.Deliverydate='' : moment(element.Deliverydate).format('DD-MM-YYYY');
              element.Poc_DATE=moment(element.Poc_DATE).format('DD-MM-YYYY');
              element.RtdDate=moment(element.RtdDate).format('DD-MM-YYYY');
              element.Delivery_Canceled_Date =moment(element.Delivery_Canceled_Date ).format('DD-MM-YYYY');
              element.BOD =moment(element.BOD ).format('DD-MM-YYYY');
              element.GrDate=moment(element.GrDate).format('DD-MM-YYYY');
              element.OrderedDate =moment(element.OrderedDate ).format('DD-MM-YYYY'); 
              
            if(element.InvoiceDate==null){}
             else
             element.InvoiceDate=moment(element.InvoiceDate).format('DD-MM-YYYY');
            if(element.APP!=null)
              element.APP=element.APP.toFixed(2)

             if(element.CNDate==null){}
             else
             element.CNDate=moment(element.CNDate).format('DD-MM-YYYY');

              if(element.PocCreditNoteDate==null){}
              else
              element.PocCreditNoteDate=moment(element.PocCreditNoteDate).format('DD-MM-YYYY');

              if(element.UpdatedDate==null){}
              else
              element.UpdatedDate=moment(element.UpdatedDate).format('DD-MM-YYYY');

              if(element.ExitDate==null){}
              else
              element.ExitDate=moment(element.ExitDate).format('DD-MM-YYYY');
              if(element.LastIRDate==null){}
              else
              element.LastIRDate =moment(element.LastIRDate ).format('DD-MM-YYYY');

              if(element.PoCloseDate==null){}
              else
              element.PoCloseDate=moment(element.PoCloseDate).format('DD-MM-YYYY');

              if(element.DispatchDate==null){}
              else
              element.DispatchDate =moment(element.DispatchDate ).format('DD-MM-YYYY');

              if(element.DeliveredDate==null){}
              else
              element.DeliveredDate =moment(element.DeliveredDate ).format('DD-MM-YYYY');

              
            //   if(element.Deliverydate==null || element.Deliverydate=='Invalid date')
            //   element.Deliverydate=''
            //   else
            //   element.Deliverydate =moment(element.Deliverydate ).format('DD-MM-YYYY');

              if(element.IssuedDate==null){}
              else
              element.IssuedDate =moment(element.IssuedDate ).format('DD-MM-YYYY');
              if(element.OrderDate==null){}
              else
               element.OrderDate =moment(element.OrderDate).format('DD-MM-YYYY');
            })
          this.showExportdata=res;
          this.blocked = false;
          this.searchBtn=false;
        }
        else{
          this.blocked = false;
          this.searchBtn=true;
          this.showError("data not found");
          this.showExportdata=null
        }
      },(err: any) => {
        console.log(err);
        this.showError(err);
        this.blocked = false;
        this.searchBtn=false;
      })
    }
  }

}
