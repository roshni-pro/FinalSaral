import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OrderConcernMasterDc } from '../interface/order-for-status';
import { OrderConcernService } from '../services/order-concern.service';

@Component({
  selector: 'app-order-concern-master',
  templateUrl: './order-concern-master.component.html',
  styleUrls: ['./order-concern-master.component.scss']
})
export class OrderConcernMasterComponent implements OnInit {
  orderConcernMasterList : any;
  isShowAddPopup : boolean = false;
  statusLabel : boolean = false;
  concernData : any;
  orderConcernMasterDc : OrderConcernMasterDc;
  blocked : boolean = false;
  constructor(private _service : OrderConcernService,private confirmationService: ConfirmationService
    ,private messageService: MessageService) { this.concernData = {};}

  ngOnInit() {
    this.blocked = true;
    this._service.getOrderConcernMasterData().subscribe(x=>{
      this.orderConcernMasterList = x;
      this.blocked = false;
    })
  }
  onAddOrderConcernMaster(){
    this.concernData = [];
    this.isShowAddPopup = true;
    this.statusLabel = false;
  }
  editData(row){
    this.concernData.IsActive = row.IsActive;
    this.concernData.Description = row.Description;
    this.concernData.Id = row.Id;
    this.isShowAddPopup = true;
  }
  deleteData(row)
  {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this concern?',
      accept: () => {
        this.blocked = true;
      this._service.deleteOrderConcernMaster(row.Id).subscribe(x=>{
        this.blocked = false;
        if(x.Msg == 'Deleted Successfully'){
          this.messageService.add({ severity: 'success', summary: x.Msg, detail: '' });
          this.ngOnInit();
        }else{
          this.messageService.add({ severity: 'error', summary: x.Msg, detail: '' });
        }
      })
    }
    });
  }
  onSubmit(){
    
    this.orderConcernMasterDc={
      Id : this.concernData.Id ? this.concernData.Id : null,
      IsActive : this.concernData.IsActive,
      Description : this.concernData.Description
    }
    if(this.concernData.Id == null)
    {
      this.blocked = true;
      this._service.postOrderConcernMasterdata(this.orderConcernMasterDc).subscribe(x=>{
        this.blocked = false;
        if(x.Msg == 'Data Added Sucesfully'){
          this.isShowAddPopup = false;
          this.concernData = [];
          this.messageService.add({ severity: 'success', summary: x.Msg, detail: '' });
          this.ngOnInit();          
        }else{
          this.messageService.add({ severity: 'error', summary: x.Msg, detail: '' });
        }
      })
   }else{
    this.blocked = true;
      this._service.updateOrderForStatus(this.orderConcernMasterDc).subscribe(x=>{
        this.blocked = false;
        if(x.Msg == 'Data Update Sucesfully'){
          this.isShowAddPopup = false;
          this.concernData = [];
          this.messageService.add({ severity: 'success', summary: x.Msg, detail: '' });
          this.ngOnInit();
        }else{
          this.messageService.add({ severity: 'error', summary: x.Msg, detail: '' });
        }
      })
   }
  }
  chkStatus(event){
    if(event == true){
      this.statusLabel = true;
    }else{
      this.statusLabel = false;
    }
  }
  space(event) {
    if (event.target.selectionStart === 0 && event.code === 'Space') {
      event.preventDefault();
    }
  }

  omit_special_char(event)
  {   
    var k;  
    k = event.charCode; 
    return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }
  
}
