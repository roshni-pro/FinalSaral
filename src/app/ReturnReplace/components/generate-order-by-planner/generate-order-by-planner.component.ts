import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ReturnReplaceService } from 'app/shared/services/return-replace.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SalesReturnDetailDC } from 'app/ReturnReplace/interface/sales-return-detail-dc';

@Component({
  selector: 'app-generate-order-by-planner',
  templateUrl: './generate-order-by-planner.component.html',
  styleUrls: ['./generate-order-by-planner.component.scss']
})
export class GenerateOrderByPlannerComponent implements OnInit {

  @Input() details : any;
  @Output() isdetailsclose = new EventEmitter<boolean>();
  itemList : any;
  cols:any;
  custList : any;
  roleName:any;
  roleList:any[];
  baseURL: any;
  plannerRole : any;
  custId : any;
  blocked : boolean = false;
  salesReturnDetailDC : SalesReturnDetailDC;
  selectedItemRowData : any;
  isHistoryOpen : boolean = false;
  entity : any;
  constructor( private confirmationService : ConfirmationService,private returnReplaceService : ReturnReplaceService,private messageService : MessageService) { 
    this.baseURL = 'https://uat.shopkirana.in';//environment.apiURL;
    this.entity='KKReturnReplaceDetail';
  }

  ngOnInit() {
    this.roleList = (localStorage.getItem('role')).split(',');
    var whPlannerRole = 'WH delivery planner';
    var hubPlannerRole = 'Hub delivery planner';
    this.plannerRole = this.roleList.find(x => x == whPlannerRole || x == hubPlannerRole);
    this.cols = [
      { field: 'KKRequestId', header: 'RequestId'},
      { field: 'OrderId', header: 'OrderId' },
      { field: 'OrderDetailsId', header: 'OrderDetailsId' },
      { field: 'ItemName', header: 'ItemName' },
      { field: 'BatchCode', header: 'BatchCode' },
      { field: 'Qty', header: 'Qty' },
      { field: 'price', header: 'price' },
      { field: 'RequestType', header: 'RequestType' },
      { field: 'ItemId', header: 'ItemId' },
      { field: 'ReturnImage', header: 'Itempic' },
    ]
    console.log(this.details);
    this.onSelectCustomer(this.details.CustomerId);

  }
  onBack(){
    this.isdetailsclose.emit(false);
  }
  onSelectCustomer(custId)
  {
    this.blocked = true;
    this.returnReplaceService.getReturnListByCustId(custId).subscribe(x=>
      {
        debugger;
        this.blocked = false;
        this.itemList = x.Data;
        console.log(this.itemList,'custdata');
        
      })
  }
  isOrderIdExist : boolean = false;
  onClick()
  {
    // debugger;
    if(this.selectedList && this.selectedList.length > 0)
    {
        this.onGenerateOrder();
    }
  }
  onGenerateOrder()
  {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Generate Order of this Customer?',
      accept: () => { 
        if(this.selectedList && this.selectedList.length > 0)
        {
          debugger;
          let orderDetailIds = [];
          this.selectedList.forEach(element => {
            orderDetailIds.push(element.OrderDetailsId);
          });
          this.salesReturnDetailDC = {
            CustomerId : this.details.CustomerId,
            OrderId : this.selectedList[0].OrderId,
            OrderDetailsId : orderDetailIds,
          }
          debugger;
        this.blocked = true;
        this.returnReplaceService.createReturnOrder(this.salesReturnDetailDC).subscribe(x=>
          {
            // debugger;
            this.blocked = false;
            if(x.Status)
            {
              alert(x.Data + " " + x.Message);
              this.isdetailsclose.emit(false);
            }else{
              alert(x.Message);
            }
            
          })
        }else{
          alert("Please Select Atleast one item!!");
        }
    }
  });
  }
  selectedList : any[];
  public space(event:any){
    if (event.target.selectionStart === 0 && event.code === 'Space'){
      alert('space is not allowed');
      event.preventDefault();
    }
    }
    
  onClickHistory(rowData)
  {
    this.returnReplaceService.getKKReturnRequestDetailHistory(rowData.KKReturnDetailId).subscribe(result=>{
      if(result.Status){
        this.selectedItemRowData = result.Data;
        this.isHistoryOpen = true;
      }
      else{
        this.messageService.add({ severity: 'error', summary: "No Data Found!!", detail: '' });
      }
    })
  
  }


  check:boolean=false;
  getSimilarOrders(rowdata,event){
    debugger;
    this.selectedList=[];
    if(event==true){
      this.itemList.forEach(element => {
        if(element.OrderId==rowdata.OrderId){
          this.selectedList.push(element)
        }
      });
    }
    this.check=!this.check;
  }
}
