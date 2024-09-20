import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { CurrentStockService } from 'app/shared/services/current-stock.service';
import { MessageService } from 'primeng/api';
import { LoaderService } from 'app/shared/services/loader.service';

@Component({
  selector: 'app-transfertofreestock',
  templateUrl: './transfertofreestock.component.html',
  styleUrls: ['./transfertofreestock.component.scss']
})
export class TransfertofreestockComponent implements OnInit {
  @Input() details : any
  @Input() StockId:any;
  stockTransferdata : any;
  @Output() refreshParent = new EventEmitter(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 
  Transferinventory : any;
  ManualReason: any;
  currentStockBatchMasterList : any;
  isBatchCodeAvailableQTY : boolean = false;
  isChecked : boolean = false;
  
  constructor(private currentStockService : CurrentStockService 
    ,private messageService : MessageService
    ,private loaderService: LoaderService) { this.stockTransferdata = {} }
  ngOnInit() {
    // debugger;
    if(this.details)
    {
      console.log('Stock Id is: ', this.details.StockId);
    }
    this.getStockBatchMastersData();
  }
  getStockBatchMastersData(){
    this.currentStockService.getStockBatchMastersData(this.details.ItemMultiMRPId,this.details.WarehouseId,'C').subscribe(x=>{
      // debugger;
      this.isBatchCodeAvailableQTY = true;
      // x.forEach(element => {
      //   element.IsChecked = false;
      // });
      this.currentStockBatchMasterList = x;
    })
  }
  approvedStockQtyList : any[]=[]; 
  stockMasterDC : any;
  // check(rowIndex) {
  //   debugger;
  //   this.stockMasterDC = {
  //     BatchCode: this.currentStockBatchMasterList[rowIndex].BatchCode,
  //     ExpiryDate: this.currentStockBatchMasterList[rowIndex].ExpiryDate,
  //     MFGDate: this.currentStockBatchMasterList[rowIndex].MFGDate,
  //     // Qty : this.currentStockBatchMasterList[rowIndex].SelectedQty
  //   }
  //   // if (this.currentStockBatchMasterList[rowIndex].IsChecked) {
  //   //   this.approvedStockQtyList.push(this.stockMasterDC)
  //   // } else {
  //   //   let index = this.approvedStockQtyList.indexOf(this.currentStockBatchMasterList[rowIndex].IsChecked);
  //   //   this.approvedStockQtyList.splice(index, 1);
  //   // }
  // }
  onSave(ManualReason){   
    debugger;
    if(ManualReason == null)
    {
      alert('Please Enter Reason');
      return false;
    }
    this.approvedStockQtyList=[];
    this.currentStockBatchMasterList.forEach(element => {
      if(element.IsChecked == true)
      {
        this.isChecked = true;
        if(element.SelectedQty > 0 )
        {
            let obj = {
              BatchCode : element.BatchCode,
              // CreatedDate : element.CreatedDate,
              // ExpiryDate : element.ExpiryDate,
              // IsChecked : element.IsChecked,
              // MFGDate : element.MFGDate,
              // Qty : element.Qty,
              WarehouseId : this.details.WarehouseId,
              Qty : element.SelectedQty,
              StockBatchMasterId : element.StockBatchMasterId,
              ManualReason: this.ManualReason,
              ItemMultiMRPId : this.details.ItemMultiMRPId
            }
            this.approvedStockQtyList.push(obj);
            debugger;      
          // if (this.currentStockBatchMasterList[rowIndex].IsChecked) {
          //   this.approvedStockQtyList.push(this.stockMasterDC)
          // } else {
          //   let index = this.approvedStockQtyList.indexOf(this.currentStockBatchMasterList[rowIndex].IsChecked);
          //   this.approvedStockQtyList.splice(index, 1);
          // }
        }else{
          alert('Please Enter Quantity in ' + element.BatchCode + ' BatchCode');
          return false;
        }
      }
    });
    if(this.approvedStockQtyList && this.approvedStockQtyList.length ==0 && !this.isChecked)
    {
      alert('Please Select Atleast one Stock!');
      return false;
    }
    if(this.approvedStockQtyList && ManualReason)
    {
    this.loaderService.loading(true);
      this.currentStockService.transferToFreeStockV1(this.approvedStockQtyList).subscribe(res=>{
        this.loaderService.loading(false);
        console.log(res);
        this.messageService.add({severity:'success', summary: res,});
        this.refreshParent.emit();
      }, error =>{
        this.loaderService.loading(false);
      })
    }
  }
  keyPress(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  TransfertoFreeStock(Transferinventory, ManualReason)
  {
    debugger;
    if(Transferinventory && ManualReason)
    {
      if (Transferinventory<0) 
      {
        this.messageService.add({severity:'error', summary: 'Quantity Can not be negative',});
        return false;
      }


      if (this.details.CurrentInventory < Transferinventory) 
      {
        this.messageService.add({severity:'error', summary: 'please Quantity less than current Quantity ',});
        return false;
      }
      
      this.stockTransferdata.ItemNumber= this.details.ItemNumber,
      this.stockTransferdata.ItemMultiMRPId= this.details.ItemMultiMRPId,
      this.stockTransferdata.WarehouseId= this.details.WarehouseId,
      this.stockTransferdata.StockBatchMasterId= this.details.StockBatchMasterId,
      this.stockTransferdata.Transferinventory= Transferinventory,
      this.stockTransferdata.ManualReason= ManualReason
      console.log(this.stockTransferdata);
      this.loaderService.loading(true);
      this.currentStockService.TransferToFreeStock(this.stockTransferdata).subscribe(res=>{
        this.loaderService.loading(false);
        console.log(res);
        this.messageService.add({severity:'success', summary: res,});
        this.refreshParent.emit();
      }, error =>{
        this.loaderService.loading(false);
      })
    }
    else
    {
      this.messageService.add({severity:'error', summary: 'enter reason and Transfer qty'});
    }
  }
  onCancel(){
    this.isdetailsclose.emit(false);
  }
  onAddQty(rowData)
  {
    debugger
    if(rowData.Qty < rowData.SelectedQty)
    {
      alert('Qty cannot be greater then CurrentInventory!');
      rowData.SelectedQty=null;
      return false;
    }
    // this.approvedStockQtyList=[];
    // this.currentStockBatchMasterList.forEach(element => {
    //   if(element.IsChecked == true)
    //   {
    //   if(this.approvedStockQtyList && this.approvedStockQtyList.length > 0)
    //   {
    //     this.approvedStockQtyList.forEach(element => {
    //       if(element.BatchCode == rowData.BatchCode)
    //       {
    //         return false;
    //       }
    //     });
    //   }     
    //   let obj = {
    //     BatchCode : rowData.BatchCode,
    //     CreatedDate : rowData.CreatedDate,
    //     ExpiryDate : rowData.ExpiryDate,
    //     IsChecked : rowData.IsChecked,
    //     MFGDate : rowData.MFGDate,
    //     Qty : rowData.Qty,
    //     SelectedQty : rowData.SelectedQty
    //   }
    //   this.approvedStockQtyList.push(obj);
    // //   }
    // // });
  }
}
