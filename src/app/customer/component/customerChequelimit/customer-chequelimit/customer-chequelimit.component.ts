import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer-chequelimit',
  templateUrl: './customer-chequelimit.component.html',
  styleUrls: ['./customer-chequelimit.component.scss']
})
export class CustomerChequelimitComponent implements OnInit {
  warehouseList:any;
  searchModel:any;
  chequecustomerlist:any;
  cols:any;
  selectedList:any[];
  selectedopen:boolean;
  getChequeBounceDate:boolean;
  getlimt:boolean;
  chequeBounceDate:any;
  operation:boolean;
  Bank:boolean;
  data:any;
  operations:any;
  data1:any;
  data2:any;
  id:any;
  ChequeAmt:any;
  constructor(private warehouseService: WarehouseService,private customerService:CustomerService,private messageService: MessageService ) { this.searchModel={}}

  ngOnInit() {
    this.selectedopen=false;
    this.getChequeBounceDate=false;
    this.getlimt=false;
    this.operation=false;
    this.Bank=false;
    this.selectedList = [];
    this.cols = [
      {field:'Skcode', header:'Skcode'},
      {field:'Name', header:'Customer Name'},     
      {field:'Mobile', header:'Mobile'},
      {field:'WarehouseName', header:'Warehouse Name'},
      {field:'IsChequeAccepted', header:'IsChequeAccepted'},
      {field:'ChequeLimit', header:'ChequeLimit'},

   ];
    this.warehouseService.GetAllWarehouse().subscribe(result => {
      this.warehouseList = result;
    })
  }
  search(warehouseId) {
    this.id=warehouseId;
    this.customerService.GetChequeCustomer(warehouseId).subscribe(result => {
      this.chequecustomerlist = result;
    })
  }
  onSelection(){
    if(this.selectedList.length > 0){
      this.selectedopen=true;
    }else{
      this.messageService.add({severity:'error', summary: 'Please Select CheckBox', detail:''});
      this.selectedopen=false;
    }
  }
  onSave(){
    this.selectedList;
    this.customerService.updateChequeCustomer(this.selectedList).subscribe(result => {
      this.chequecustomerlist = result;
      this.selectedopen=false;
      this.selectedList = null;
      this.messageService.add({severity:'success', summary: 'Data Update  Successfully', detail:''});
      this.search(this.id);
    })
  }
  open(data){
    this.customerService.chequeBounceDate(data).subscribe(result=>{
      if(result !=null ){
        this.chequeBounceDate=result.BounseDate;
        this.ChequeAmt=result.ChequeAmt;
      }
      else if(result==null){
        this.messageService.add({severity:'success', summary: 'Data Not Exists', detail:''});
      }

      this.getChequeBounceDate=true;
    })

  }
  open1(ChequeLimit,CustomerId){
    this.data=[];
    this.customerService.getCutomerChequLimit(ChequeLimit,CustomerId).subscribe(result=>{
      this.data=result;
      this.getlimt=true;

    })
  }
  open2(CustomerId){
    this.data1=[];
    this.customerService.geChequeinoperation(CustomerId).subscribe(result=>{
      this.operations='Operation';
      this.data1=result;
      this.operation=true;
    })
  }
  open3(CustomerId){
    this.data2=[];
    this.customerService.geChequeinBank(CustomerId).subscribe(result=>{
      this.operations='Bank';
      this.data2=result;
      this.Bank=true;
    })
  }
}
