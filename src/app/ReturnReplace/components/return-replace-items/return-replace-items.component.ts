import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ReturnReplaceService } from 'app/shared/services/return-replace.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { rejects } from 'assert';
import { Router } from '@angular/router';
import { SalesReturnDetailDC } from 'app/ReturnReplace/interface/sales-return-detail-dc';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-return-replace-items',
  templateUrl: './return-replace-items.component.html',
  styleUrls: ['./return-replace-items.component.scss']
})
export class ReturnReplaceItemsComponent implements OnInit {
  @Input() details : any;
  @Output() isdetailsclose = new EventEmitter<boolean>();
  itemList : any;
  cols:any;
  deliveryBoyList : any;
  custList : any;
  DBoyId:any;
  orderData : any;
  Comment:any;
  IsStockReceivewithin24Hours : boolean = false;
  BatchNoAndPKD :  boolean = false;
  CrossCheckWithInvoice :  boolean = false;
  StockConditionisSealable :  boolean = false;
  ManualWalletPoint : number = 0;
  isQCReject : boolean = false;
  roleName:any;
  roleList:any[];
  IsUpload:boolean=false;
  sum : any;
  baseURL: any;
  warehouseInBoundLead : any;
  buyerRole : any;
  plannerRole : any;
  custId : any;
  blocked : boolean = false;
  salesReturnDetailDC : SalesReturnDetailDC;
  selectedItemRowData : any;
  isHistoryOpen : boolean = false;
  entity : any;
  constructor( private confirmationService : ConfirmationService,private returnReplaceService : ReturnReplaceService,private messageService : MessageService) { 
    this.baseURL = environment.apiURL; //'https://uat.shopkirana.in';//
    this.entity='KKReturnReplaceDetail';
  }

  ngOnInit() {
    this.sum = 0;
    // this.roleName = localStorage.getItem('role');
    // this.roleList = this.roleName.split(',');
    // for (var i in this.roleList) {
    //   console.log('Index' + i)
    //   if (this.roleList[i] == 'HQ Master login'|| this.roleList[i] == 'Quality Checker') {
    //     this.IsUpload = true;
    //   }
    this.roleList = (localStorage.getItem('role')).split(',');
   
    // var warehouseInBoundLead = 'WH delivery planner';
    this.warehouseInBoundLead = this.roleList.find(x => x == warehouseInBoundLead);
    var buyerRole = 'Buyer';
    this.buyerRole = this.roleList.find(x => x == buyerRole);
    var warehouseInBoundLead = 'Inbound Lead';
    this.warehouseInBoundLead = this.roleList.find(x => x == warehouseInBoundLead);
    // var whPlannerRole = 'WH delivery planner';
    // var hubPlannerRole = 'Hub delivery planner';
    // this.plannerRole = this.roleList.find(x => x == whPlannerRole || x == hubPlannerRole);
    // }
  debugger;


    this.DBoyId = this.details.DBoyId
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
      // { field: 'ReturnReason', header: 'Return Reason' },
      // { field: 'Itempic', header: 'Itempic' },
      { field: 'ReturnImage', header: 'Itempic' },
    ]
    console.log(this.details);
    if(!this.plannerRole)
    {
    this.blocked = true;
    this.returnReplaceService.GetReturnReplaceItems(this.details.KkRequestId).subscribe(result=>{
      console.log(result);
      this.blocked = false;
      this.itemList = result;
      this.itemList.forEach(element => {
        console.log(element.price);
        console.log(element.Qty);
        debugger;
        if(element.ReturnImage != null)
        {
          element.ReturnImage = element.ReturnImage.split(',');
          debugger;
        }
        this.sum += (element.price * element.Qty)*10
      });
      this.selectedList = this.itemList;
      console.log("check"+this.sum)
    })
  }else{
    this.onSelectCustomer(this.details.CustomerId);
  }
    // this.returnReplaceService.GetDeliveryBoy().subscribe(result=>{
      
    //   this.deliveryBoyList = re  sult
    //   console.log(this.deliveryBoyList)
    // })
    // this.blocked = true;
    // this.returnReplaceService.buyerApprovedCustList().subscribe(result=>{
    //   // debugger;
    //   this.blocked = false;
    //   this.custList = result.Data;
    //   console.log(this.custList);
    // })
    
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
    debugger;
    if(this.selectedList && this.selectedList.length > 0)
    {
      // var OrderIds = []; 
      // this.isOrderIdExist = false;
      // this.selectedList.forEach(element => {
      //   if(OrderIds.length > 0)
      //   {
      //     var existOrderId = OrderIds.find(x => x == element.OrderId);
      //     if(existOrderId && existOrderId.length > 0)
      //     {

      //     }else{
      //       debugger;
      //       var b = this.selectedList.findIndex(x=> x.OrderId == element.OrderId);
      //       this.selectedList.splice(b, b)
      
      //       alert(OrderIds[0] + " Already Exist.You Can't Select Other Order Id " + element.OrderId);
      //       this.isOrderIdExist = true;
      //       return false; 
      //     }
      //   }else{
      //     OrderIds.push(element.OrderId);
      //   }
      // });
      // console.log('OrderId List',OrderIds);
      // if(!this.isOrderIdExist)
      // {
        this.onGenerateOrder();
      // }
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

  ChangeDeliveryBoy(){
    
    this.returnReplaceService.UppdateDBoyId(this.DBoyId , this.details.KkRequestId).subscribe(result=>{
      console.log(result);
      this.messageService.add({ severity: 'success', summary: "Success ", detail: 'Delivery Boy Successfully Changed' });
    })
  }
  selectedList : any[];
  OnWhAccept(rowData) {
    debugger;
    this.selectedList;
    if(this.selectedList && this.selectedList.length > 0)
    {
    // if(this.selectedList && this.selectedList.length > 0)
    // {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to Accept?',
        accept: () => {  
          if(this.Comment){
            // debugger;
            if (this.Comment === 0 && this.Comment === 'Space'){
              alert('space is not allowed');
              return false;
              // event.preventDefault();
            }
            // debugger;
          this.details.Warehouse_Comment = this.Comment;
          this.details.Status = "Received at Warehouse";
          let ApproveRejectDC={
            KKReturnDetailId : rowData.KKReturnDetailId,
            Comment : this.Comment,
            Status : true,
            IsWarehoues : this.warehouseInBoundLead ? true : false
          }
          this.returnReplaceService.approveOrReject(ApproveRejectDC).subscribe(result=>{
            if(result){
              this.messageService.add({ severity: 'success', summary: "Successfully updated ", detail: '' });
              this.isdetailsclose.emit(false);
            }
            else{
              this.details.Status =  "Pick From Customer";
              this.messageService.add({ severity: 'error', summary: "Somthing went wrong ", detail: '' });
            }
          })
          }else{
            this.selectedList.forEach(x=>{
              alert("Please Enter Comment for " + x.OrderId);
              });
          }
        },
        reject:()=>{
          this.Comment = null;
          
        }
      });
    }
    else{
      if((!this.selectedList || this.selectedList.length == 0 ) && (!rowData.Comment || rowData.Comment.length == 0))
      {
        alert("Please Select Atleast 1 row!!");
      }else{
        this.selectedList.forEach(x=>{
        alert("Please Enter Comment for " + x.OrderId);
        });
      }
    }
  }
  OnWhReject(rowdata) {
    if(this.selectedList && this.selectedList.length > 0)
    {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Reject?',
      accept: () => {  
        if(this.Comment){
          if (this.Comment === 0 && this.Comment === 'Space'){
            alert('space is not allowed');
            return false;
            // event.preventDefault();
          }
          this.details.Warehouse_Comment = this.Comment;
          this.details.Status = "Received at Warehouse";
          let ApproveRejectDC={
            KKReturnDetailId : rowdata.KKReturnDetailId,
            Comment : this.Comment,
            Status : false,
            IsWarehoues : this.warehouseInBoundLead ? true : false
          }
          this.returnReplaceService.approveOrReject(ApproveRejectDC).subscribe(result=>{
            if(result){
              this.messageService.add({ severity: 'success', summary: "Successfully updated ", detail: '' });
              this.isdetailsclose.emit(false);
            }
            else{
              this.details.Status =  "Pick From Customer";
              this.messageService.add({ severity: 'error', summary: "Somthing went wrong ", detail: '' });
            }
          })
          }else{
            this.selectedList.forEach(x=>{
              alert("Please Enter Comment for " + x.OrderId);
              });
          }
      },
      reject:()=>{
        this.Comment = null;
        
      }
    });
  }else{
    if((!this.selectedList || this.selectedList.length == 0 ) && (!rowdata.Comment || rowdata.Comment.length == 0))
    {
      alert("Please Select Atleast 1 row!!");
    }else{
      this.selectedList.forEach(x=>{
      alert("Please Enter Comment for " + x.OrderId);
      });
    }
  }
  }
  approvedList : any[]=[];
  rejectList : any[]=[];
  onSubmit()
  {
    debugger;
    this.selectedList;
    let notChecked = false;    
    let MultiOrderReturnIsApproveList = [];    
        if(this.warehouseInBoundLead)
        {
          this.selectedList.forEach(ele => {
            if(!notChecked)
            {
              if(ele.inboundapprove || ele.inboundreject)
              {
                let MultiOrderReturnApproveRejectDC={
                  KKReturnDetailId : ele.KKReturnDetailId,
                  Status : ele.StatusType
                }
                MultiOrderReturnIsApproveList.push(MultiOrderReturnApproveRejectDC);
              }else if(!ele.inboundapprove || !ele.inboundreject)
              {
                notChecked = true;
                alert('Please check all request either Approve or reject for ' + ele.KKRequestId + ' and BatchCode is ' + ele.BatchCode +' !!!');
                return true;
              }
            }
          });
          if(this.selectedList.length == MultiOrderReturnIsApproveList.length)
          {
            this.confirmationService.confirm({
              message: 'Are you sure that you want to Accept?',
              accept: () => {  
                if(this.Comment){
                  if (this.Comment === 0 && this.Comment === 'Space'){
                    alert('space is not allowed');
                    return false;
                  }
                  else
                  {
                    MultiOrderReturnIsApproveList.forEach(ele => {
                            ele.Comment = this.Comment
                    });
                  }
            this.blocked = true;
            this.returnReplaceService.multiApproveOrReject(MultiOrderReturnIsApproveList).subscribe(result=>{
              this.blocked = false;
              if(result){
                    this.messageService.add({ severity: 'success', summary: result.Message, detail: '' });
                    this.isdetailsclose.emit(false);
                  }
                  else{
                    this.messageService.add({ severity: 'error', summary: "Somthing went wrong ", detail: '' });
                  }
            });
          }else{
            alert("Please Enter Comment");
          }
          },
          reject:()=>{
            this.Comment = null;
            
          }
          });
          }
        }else if(this.buyerRole)
        {
          this.selectedList.forEach(ele => {
            if(!notChecked)
            {
              if(ele.buyerapprove || ele.buyerreject)
              {
                let MultiOrderReturnApproveRejectDC={
                  KKReturnDetailId : ele.KKReturnDetailId,
                  Comment : this.Comment,
                  Status : ele.StatusType
                }
                MultiOrderReturnIsApproveList.push(MultiOrderReturnApproveRejectDC);
              }else if(!ele.buyerapprove || !ele.buyerreject)
              {
                notChecked = true;
                alert('Please check all request either Approve or reject for ' + ele.KKRequestId + ' and BatchCode is ' + ele.BatchCode +' !!!');
                return true;
              }
            }
          });
          if(this.selectedList.length == MultiOrderReturnIsApproveList.length)
          {
            this.confirmationService.confirm({
              message: 'Are you sure that you want to Accept?',
              accept: () => {  
                if(this.Comment){
                  if (this.Comment === 0 && this.Comment === 'Space'){
                    alert('space is not allowed');
                    return false;
                  }
                  else
                  {
                    MultiOrderReturnIsApproveList.forEach(ele => {
                            ele.Comment = this.Comment
                    });
                  }
            this.blocked = true;
            this.returnReplaceService.multiApproveOrReject(MultiOrderReturnIsApproveList).subscribe(result=>{
              this.blocked = false;
              if(result){
                    this.messageService.add({ severity: 'success', summary: result.Message, detail: '' });
                    this.isdetailsclose.emit(false);
                  }
                  else{
                    this.messageService.add({ severity: 'error', summary: "Somthing went wrong ", detail: '' });
                  }
            });
          }else{
            alert("Please Enter Comment");
          }
          },
          reject:()=>{
            this.Comment = null;
            
          }
          });
          }
  }
   
  }
  // OnWhReject() {
                
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to Reject?',
  //     accept: () => {  
  //        if(this.Comment){
  //        this.details.Warehouse_Comment = this.Comment;
  //        this.details.Status = "Reject From Warehouse";
  //        this.details.Status = "Pending to Pick From Warehouse";
        
  //        this.returnReplaceService.UpdateReturnReplace(this.details).subscribe(result=>{
  //         if(result){
  //          this.messageService.add({ severity: 'success', summary: "Successfully updated ", detail: '' });
  //           this.isdetailsclose.emit(false);
  //         }else{
  //           this.details.Status =  "Pick From Customer";
  //           this.messageService.add({ severity: 'error', summary: "Somthing went wrong ", detail: '' });
  //         }
  //       })
  //        }
  //     },
  //     reject:()=>{
  //       this.Comment = null;
        
  //     }
  //   });
  // }

  // onQCAccept() {
  //   this.isQCReject = false;
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to Accept?',
  //     accept: () => {  
  //       if(this.Comment){
  //         this.details.HQ_Comment = this.Comment;
  //         this.details.Status =  "Settled by QC";
  //         this.returnReplaceService.UpdateReturnReplace(this.details).subscribe(result=>{
  //           if(result){
  //            this.messageService.add({ severity: 'success', summary: "Successfully updated ", detail: '' });
  //             this.isdetailsclose.emit(false);
  //           }else{
  //             this.details.Status =  "Received at Warehouse";
  //             this.messageService.add({ severity: 'error', summary: "Somthing went wrong ", detail: '' });
  //           }
  //         })
  //         }
  //     },
  //     reject:()=>{
  //       this.Comment = null;
  //       this.IsStockReceivewithin24Hours  = false;
  //       this.BatchNoAndPKD = false;
  //       this.CrossCheckWithInvoice  = false;
  //       this.StockConditionisSealable = false;
  //     }
  //   });
  // }

  // onQCReject() {
  //  // this.details.Status =  "Cancel";
  //  this.isQCReject = true;
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to Reject?',
  //     accept: () => {  
  //       if(this.Comment){
  //         this.details.HQ_Comment = this.Comment;
  //         this.details.Status =  "Reject From QC";
  //         this.details.Status = "Pending to Pick From Warehouse";
  //         this.returnReplaceService.UpdateReturnReplace(this.details).subscribe(result=>{
  //           if(result){
  //            this.messageService.add({ severity: 'success', summary: "Successfully Canceled ", detail: '' });
  //             this.isdetailsclose.emit(false);
  //           }else{
  //             this.details.Status =  "Received at Warehouse";
  //             this.messageService.add({ severity: 'error', summary: "Somthing went wrong ", detail: '' });
  //           }
  //         })
  //         }
  //     },
  //     reject:()=>{
  //       this.details.Status =  "Received at Warehouse";
  //       this.Comment = null;
  //       this.IsStockReceivewithin24Hours  = false;
  //       this.BatchNoAndPKD = false;
  //       this.CrossCheckWithInvoice  = false;
  //       this.StockConditionisSealable = false;
  //     }
  //   });
  // }

  // onSettleRejectOrder(){
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to perform this action?',
  //     accept: () => {  
  //       if(this.Comment){
  //         this.details.HQ_Comment = this.Comment;
  //         this.details.Status =  "Settled Rejected Order by QC";
  //         this.returnReplaceService.UpdateReturnReplace(this.details).subscribe(result=>{
  //           if(result){
  //            this.messageService.add({ severity: 'success', summary: "Successfully updated ", detail: '' });
  //             this.isdetailsclose.emit(false);
  //           }else{
  //             this.details.Status =  "Customer Refused Rejected Order";
  //             this.messageService.add({ severity: 'error', summary: "Somthing went wrong ", detail: '' });
  //           }
  //         })
  //         }
  //     },
  //     reject:()=>{
  //       this.Comment = null;
  //       this.ManualWalletPoint = 0;
  //       // this.IsStockReceivewithin24Hours  = false;
  //       // this.BatchNoAndPKD = false;
  //       // this.CrossCheckWithInvoice  = false;
  //       // this.StockConditionisSealable = false;
  //     }
  //   });
  // }

  onApproveReject(isapprove)
  {
    debugger;
    console.log(isapprove,'is approved');
    console.log(this.selectedList,'this.selectedList');
        this.confirmationService.confirm({
          message: 'Are you sure that you want to Accept?',
          accept: () => {  
            if(this.Comment){
              if (this.Comment === 0 && this.Comment === 'Space'){
                alert('space is not allowed');
                return false;
              }
              let KKReturnDetailIds = [];
              this.selectedList.forEach(x=>{
                  KKReturnDetailIds.push(x.KKReturnDetailId);
              });
            this.details.Warehouse_Comment = this.Comment;
            this.details.Status = "Received at Warehouse";
            let MultiOrderReturnApproveRejectDC={
              KKReturnDetailId : KKReturnDetailIds,
              Comment : this.Comment,
              Status : isapprove,
              IsWarehoues : this.warehouseInBoundLead ? true : false
            }
            this.approvedList.push(MultiOrderReturnApproveRejectDC);
            this.returnReplaceService.multiApproveOrReject(MultiOrderReturnApproveRejectDC).subscribe(result=>{
              if(result){
                this.messageService.add({ severity: 'success', summary: result.Message, detail: '' });
                this.isdetailsclose.emit(false);
              }
              else{
                this.messageService.add({ severity: 'error', summary: "Somthing went wrong ", detail: '' });
              }
            })
            }else{
              this.selectedList.forEach(x=>{
                alert("Please Enter Comment for " + x.OrderId);
                });
            }
          },
          reject:()=>{
            this.Comment = null;
            
          }
        });
  }

  onWarehouseAcceptRejectOrder(){
    
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {  
        if(this.Comment){
          this.details.Warehouse_Comment = this.Comment;
          this.details.Status =  "Warehouse Accept Reject Order";
          this.returnReplaceService.UpdateReturnReplace(this.details).subscribe(result=>{
            if(result){
             this.messageService.add({ severity: 'success', summary: "Successfully updated ", detail: '' });
              this.isdetailsclose.emit(false);
            }else{
              this.details.Status =  "Settled Rejected Order by QC";
              this.messageService.add({ severity: 'error', summary: "Somthing went wrong ", detail: '' });
            }
          })
          }
      },
      reject:()=>{
        this.Comment = null;
        // this.IsStockReceivewithin24Hours  = false;
        // this.BatchNoAndPKD = false;
        // this.CrossCheckWithInvoice  = false;
        // this.StockConditionisSealable = false;
      }
    });
  }
  isImageShow : boolean = false;
  imgList : any;
  onClickImage(img)
  {
    debugger;
    this.imgList = img;
    console.log('imgList',this.imgList);
    
    this.isImageShow = true;
  }
  public space(event:any){
    if (event.target.selectionStart === 0 && event.code === 'Space'){
      alert('space is not allowed');
      event.preventDefault();
    }
    }
    public inputValidator(event: any) {
      debugger;
    //   if((event.target.value as string).indexOf(' ') >= 0){  
    //     this.Comment = null;  
    //     return {cannotContainSpace: true}  
    // }  
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
        if(element.KKRequestId==rowdata.KKRequestId){
          this.selectedList.push(element)
        }
      });
    }
    this.check=!this.check;
  }
  onSelectRow(rowData,type)
  {
    debugger;
    if(!this.selectedList || this.selectedList.length == 0)
    {
      rowData.inboundapprove = false;
      rowData.inboundreject = false;
      rowData.buyerapprove = false;
      rowData.buyerreject = false;
      alert('Please select this row on clicking checkbox!');
    }else{
      this.selectedList.forEach(x=>{
        if(x.OrderDetailsId == rowData.OrderDetailsId && x.BatchCode == rowData.BatchCode)
        {
          if(this.warehouseInBoundLead && !(!x.inboundapprove && !x.inboundreject))
          {
            x.StatusType = type == 'approve'?true : false;
          }else if(this.buyerRole && !(!x.buyerapprove && !x.buyerreject))
          {
            x.StatusType = type == 'approve'?true : false;
          }
          else{
            x.StatusType = undefined;
          }
        }
        console.log(this.selectedList,'selectedList');
        
      });
    }
  }
}
