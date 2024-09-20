import { Component, OnInit } from '@angular/core';
import { ReturnReplaceService } from 'app/shared/services/return-replace.service';
import { ContentPagesModule } from 'app/pages/content-layout-page/content-pages.module';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-planner-list',
  templateUrl: './planner-list.component.html',
  styleUrls: ['./planner-list.component.scss']
})
export class PlannerListComponent implements OnInit {

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

  constructor(private  confirmationService :  ConfirmationService,private returnReplaceService : ReturnReplaceService,private warehouseService : WarehouseService,private messageService : MessageService)
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
    this.items = [
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
    this.blocked = true;
    this.returnReplaceService.GetAllReturnReplaceRequest(this.warehouseid.value,true).subscribe(result=>{
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
}
