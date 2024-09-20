import { Component, OnInit } from '@angular/core';
import { ReturnReplaceService } from 'app/shared/services/return-replace.service';
import { ContentPagesModule } from 'app/pages/content-layout-page/content-pages.module';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { environment } from 'environments/environment';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-return-replace-dashboard',
  templateUrl: './return-replace-dashboard.component.html',
  styleUrls: ['./return-replace-dashboard.component.scss']
})
export class ReturnReplaceDashboardComponent implements OnInit {
  warehouseid : any;
  warehouseList:any;
  returnReplaceList : any;
  cols : any;
  items : any;
  isopen : boolean;
  order : any;
  orderData : any;
  Comment:any;
  file : any;
  imagePath:any;
  imgURL : any;
  baseURL: any;
  blocked: boolean = false;
  roleList:any[];
  plannerRole : any;

  constructor(private  confirmationService :  ConfirmationService,private returnReplaceService : ReturnReplaceService,private warehouseService : WarehouseService,private messageService : MessageService
    ,private exportService: ExportServiceService
  )
   { 
     this.isopen = false;
     this.baseURL = 'https://uat.shopkirana.in';//environment.apiURL;
     }

  ngOnInit() {
    this.baseURL = 'https://uat.shopkirana.in';
    this.roleList = (localStorage.getItem('role')).split(',');
    var whPlannerRole = 'WH delivery planner';
    var hubPlannerRole = 'Hub delivery planner';
    this.plannerRole = this.roleList.find(x => x == whPlannerRole || x == hubPlannerRole);
    debugger;
    this.cols = [
      
      { field: 'KkRequestId', header: 'RequestId' },
      // { field: 'CustomerId', header: 'Customer Id' },
      { field: 'Skcode', header: 'Skcode'},
      {field: 'CustomerName', header: 'Customer Name'},
      {field: 'CreatedDate', header: 'CreatedDate'},
      {field: 'Mobile', header: 'Mobile'}
      // { field: 'RequestType', header: 'Request Type' },
      // { field: 'Status', header: 'Status' },
      // { field: 'Cust_Comment', header: 'Customer Comment' },
      // { field: 'Warehouse_Comment', header: 'Warehouse Comment' },
      // { field: 'HQ_Comment', header: 'QC Comment' },
      // { field: 'ReturnImage', header: 'Return Image' },
      // { field: 'DOB', header: 'DOB' },
      // { field: 'Status', header: 'Status' },
    
    ];
    this.items = [
      // { field: 'CustomerId', header: 'Customer Id' },
      { field: 'Skcode', header: 'Skcode'},
      {field: 'CustomerName', header: 'Customer Name'},
      {field: 'CreatedDate', header: 'CreatedDate'},
      {field: 'Mobile', header: 'Mobile'}
    ];
    this.blocked = true;
    this.warehouseService.getWarehouseCommon().subscribe(result=>{
      this.blocked = false;
      this.warehouseList = result;
    })
  }

  onSearch(){
    if(this.warehouseid && this.warehouseid.value > 0)
    {
    this.blocked = true;
    this.returnReplaceService.GetAllReturnReplaceRequest(this.warehouseid.value,false).subscribe(result=>{
      console.log(result);
      this.blocked = false;
      if(result.length > 0){
        this.returnReplaceList = result;
        debugger;
      }else{
        this.messageService.add({ severity: 'error', summary: "No Data Found ", detail: '' });
        this.returnReplaceList = [];
      }
    
    })
  }else{
    alert('Please Select Warehouse First!!');
  }

  }
  open(rowdata){
    debugger;
    this.order = rowdata;
    this.isopen = true;
  }

  isDetailsFalse(e){
    this.isopen = e;
    this.onSearch();
    }
    
  Export()
  {
    let warehouseid = 0;
    if(this.warehouseid != undefined)
      warehouseid = this.warehouseid.value;
    this.returnReplaceService.salesReturnExport(warehouseid).subscribe((result:any)=>{
      console.log(result);
      if(result.Status){
        this.exportService.exportAsExcelFile(result.Data,'SalesReturn');
        this.messageService.add({ severity: 'success', summary: result.Message, detail: '' });
      }else{
        this.messageService.add({ severity: 'error', summary: result.Message, detail: '' });
      }
    
    })
  }

    // OnWhAccept(data) {
    //   this.orderData = data;
    //   this.confirmationService.confirm({
    //     message: 'Are you sure that you want to perform this action?',
    //     accept: () => {  
    //        if(this.Comment){
    //          console.log(this.Comment);
    //        }
    //     }
    //   });
    // }

    // upload(file: File[]) {
    //   this.file = file;
    //   var reader = new FileReader();
    //   this.imagePath = file;
    //   reader.readAsDataURL(file[0]);
    //   reader.onload = (_event) => {
    //     this.imgURL = reader.result;
    //   }
    //   (success) => {
    //     alert("image uploaded successfully")
  
    //   };
  
  
    // }

    // uploadImage(){
    //     if (this.file) {
    //       let formData = new FormData();
    //       formData.append('file', this.file[0])
    //       this.returnReplaceService.uploadImages(formData).subscribe(result => {
    //         console.log(result)
    //       });
    //     }
    
    

   // }
   
}
