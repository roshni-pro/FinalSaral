import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CurrentStockService } from 'app/shared/services/current-stock.service';
import { MessageService } from 'primeng/api';
import { LoaderService } from 'app/shared/services/loader.service';


@Component({
  selector: 'app-current-stock-form',
  templateUrl: './current-stock-form.component.html',
  styleUrls: ['./current-stock-form.component.scss']
})
export class CurrentStockFormComponent implements OnInit {

  // @Input()key: any;
  @Input() details : any
  itemList : any
  stockTransferdata : any
  data:any
  disablesave:boolean;
  @Output() refreshParent = new EventEmitter(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 
  currentStockBatchMasterList : any;
  transferStockQtyList : any[]=[];
  isChecked : boolean = false;
  constructor(private currentStockService : CurrentStockService 
    ,private messageService : MessageService
    ,private loaderService: LoaderService) { this.stockTransferdata = {} }

  ngOnInit() {
    // this.count = 0;
    // this.stockTransferdata.itemBaseName = this.details.itemBaseName;
    debugger;
    this.details;
    this.getStockBatchMastersData();
    this.disablesave=false;
    this.stockTransferdata.CurrentInventory = this.details.CurrentInventory
    this.currentStockService.getItemList(this.details).subscribe(res=>{
      this.itemList = res;
      console.log(this.itemList);
    })
  }
  save(){
    this.disablesave=true;
    if(this.stockTransferdata.ItemNumberTrans){
      
    if(this.stockTransferdata.CurrentInventory <= this.details.CurrentInventory && this.stockTransferdata.CurrentInventory>0){
      this.stockTransferdata.WarehouseId=this.details.WarehouseId
      this.stockTransferdata.ItemNumber= this.details.ItemNumber
      this.stockTransferdata.ItemMultiMRPId= this.details.ItemMultiMRPId
      console.log(this.stockTransferdata);
      this.loaderService.loading(true);
      this.currentStockService.stockTransfer(this.stockTransferdata).subscribe(res=>{
        console.log(res);
        this.loaderService.loading(false);
        this.messageService.add({severity:'success', summary: 'Stock Transfer Successfully!', detail:''});
        this.refreshParent.emit();
      }, error => {
        this.loaderService.loading(false);
      });
    }else{
      this.messageService.add({severity:'error', summary: 'Please Select Valid Quantity', detail:''});
    }
  }else{
    this.messageService.add({severity:'error', summary: 'Please Select Item', detail:''});
  }
   
  }
  onSAVE(){
    this.transferStockQtyList = [];
    if(this.stockTransferdata && this.stockTransferdata.ManualReason == null)
    {
      alert('Please Enter Reason');
      return false;
    }
    debugger;
    this.currentStockBatchMasterList.forEach(element => {
      if(element.IsChecked == true)
      {
        this.isChecked = true;
        debugger;
        if(element.data == undefined)
        {
          this.isChecked = false;
          alert('Please Select ToItemMultiMRPID in ' + element.BatchCode);
          return false;
        }
        if(element.SelectedQty > 0)
        {
          let obj = {
            BatchCode : element.BatchCode,
            WarehouseId : this.details.WarehouseId,
            Qty : element.SelectedQty,
            StockBatchMasterId : element.StockBatchMasterId,
            ManualReason: this.stockTransferdata.ManualReason,
            ItemMultiMRPId : this.details.ItemMultiMRPId,
            ItemNumberTrans : element.data.ItemNumber,
            ItemMultiMRPIdTrans : element.data.ItemMultiMRPId,
            BatchMasterId : element.BatchMasterId
          }
          this.transferStockQtyList.push(obj);
        }else{
          this.messageService.add({severity:'error', summary: 'Please Select Valid Quantity', detail:''});
          return false;    
        }
      }
    });
    if(this.transferStockQtyList && this.transferStockQtyList.length ==0 && !this.isChecked)
    {
      alert('Please Select Atleast one Stock!');
      return false;
    }
    if(this.transferStockQtyList && this.isChecked)
    {
      console.log(this.transferStockQtyList);
      this.loaderService.loading(true);
      this.currentStockService.stockTransferNew(this.transferStockQtyList).subscribe(res=>{
        console.log(res);
        this.loaderService.loading(false);
        this.messageService.add({severity:'success', summary: 'Stock Transfer Successfully!', detail:''});
        this.refreshParent.emit();
      }, error => {
        this.loaderService.loading(false);
      });
    }
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
  }
  plus(){
    // this.count++;
  }

  minus(){
    // this.count--;
  }
  onChange(w){
    console.log(w)
    this.stockTransferdata.ItemNumberTrans = w.ItemNumber;
    this.stockTransferdata.ItemMultiMRPIdTrans= w.ItemMultiMRPId;   
  }
  onCancel(){
    this.isdetailsclose.emit(false);
  }
  getStockBatchMastersData(){
    this.currentStockService.getStockBatchMastersData(this.details.ItemMultiMRPId,this.details.WarehouseId,'C').subscribe(x=>{
      // debugger;
      // this.isBatchCodeAvailableQTY = true;
      // x.forEach(element => {
      //   element.IsChecked = false;
      // });
      this.currentStockBatchMasterList = x;
    })
  }
  keyPress(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
