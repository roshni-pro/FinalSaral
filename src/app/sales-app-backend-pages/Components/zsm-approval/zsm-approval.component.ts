import { DatePipe } from '@angular/common';
import { Component, OnInit,ViewChild  } from '@angular/core';
import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-zsm-approval',
  templateUrl: './zsm-approval.component.html',
  styleUrls: ['./zsm-approval.component.scss']
})
export class ZsmApprovalComponent implements OnInit {
  constructor(private warehouseService: WarehouseService,private SalesAppServiceService: SalesAppServiceService, 
    public datepipe: DatePipe,private confirmationService: ConfirmationService, private messageService: MessageService,
    private exportserv:ExportServiceService) {
      this.statusList=[
        {name:'Pending',id:1},
        {name:'Approved',id:2},
        {name:'Rejected',id:3}
      ]
    }
  first = 0;
  statusList:any[]
  warehouseList: any[];
  ZsmList: any[];
  selectedWarehouses:any
  blocked:boolean
  Showupload:boolean
  status:any
  comment:any
  displayStatus:any
  selectedstatus:any
  ngOnInit() {
    this.warehouseService.GetAllWarehouse().subscribe(result => {
      this.warehouseList = result;
    });
  }
  onSearchWareHouseId(wd){}
  onSearchStatus(st){

  }
  skip:number=0;
  take:number=10;
  totalRecords:number;
  load(event) {
    debugger
    this.take = event.rows;
    this.skip = event.first;     
    if(event.globalFilter){
      this.OnSearch(false,event.globalFilter)
    }else{this.OnSearch(false,null)}
  }
  OnSearch(isshow,filter){
    debugger
      if(this.selectedWarehouses==undefined && isshow==true) this.showError("Select Warehouse First!");
      else{
        if(isshow==true){this.skip=0; this.first=0; }
      this.blocked=true
      if(  this.selectedstatus!=undefined && this.selectedstatus.name=='Pending') this.selectedstatus.name='Approval Pending';
      this.SalesAppServiceService.GetQuadrantDetails(this.selectedWarehouses.WarehouseId,this.selectedstatus==undefined?'':this.selectedstatus.name,this.skip,this.take,filter==null?'':filter).subscribe((res:any)=>{
        this.blocked=false
        if(res.Status==true){
          this.ZsmList=[];
          this.ZsmList=res.Data.ZsmPerformanceList;
          this.totalRecords=res.Data.TotalRecord;
        }
        else{ 
          this.showError("Data Not Found");
          this.ZsmList=[];
        }
      },(error:any)=>{
        this.showError(error);
      })
    }
  }
  onselectrowData:any
  onRejectApprove(rowdata,status){debugger;
    this.status=status
    this.displayStatus =status=='Approved'?status.substring(0, status.length - 1):status.substring(0, status.length - 2)
    this.onselectrowData=rowdata;
    this.Showupload=true
  }
  SaveComment(){
    debugger
    if(this.comment==undefined) this.showError("Enter your comment!");
    else{
      this.blocked=true
      this.SalesAppServiceService.IsApproveReject(this.status,this.comment,this.onselectrowData.Id,this.onselectrowData.CommitedForeCastValue).subscribe((res:any)=>{
        this.blocked=false
        if(res.Status==true){ this.OnSearch(false,null); this.showSuccessfull(res.Message) ;}
        else this.showError(res.Message);
      },(error:any)=>{this.showError(error)})
      this.Showupload=false;
      this.comment=undefined;
    }
  }
  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
    if (!reg.test(input)) {
        event.preventDefault();
    }

    if ( event.which == 45 || event.which == 189 ) {
      event.preventDefault();
   }
 }
 CheckPtr(e){
  var pattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
  if(e.match(pattern)) {
    this.onselectrowData.CommitedForeCastValue = undefined;
  }
  else{
   this.onselectrowData.CommitedForeCastValue
  }
}
 cancel() {
  this.Showupload=false;
  this.comment=undefined;
  }

  Export(){
    debugger;
    if(this.ZsmList==undefined ||this.ZsmList.length==0) this.showError("please search the data first!")
    else if(this.ZsmList!=null && this.ZsmList!=undefined && this.ZsmList.length>0){
      this.blocked=true
      this.exportserv.exportAsExcelFile(this.ZsmList,"ZSMReport")
      this.blocked=false;
    }else if(this.ZsmList.length==0) this.showError("Data Not Found!")
    else this.showError("Something Went Wrong")
  }
  showSuccessfull(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }
  showError(msg: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail:msg});
  }
}
