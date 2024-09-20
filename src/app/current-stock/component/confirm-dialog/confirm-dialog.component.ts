import { Component, OnInit, Inject, Input, EventEmitter, Output } from '@angular/core';
import { ConfirmDialogService } from 'app/current-stock/services/confirm-dialog.service';
import { CurrentStockService } from 'app/shared/services/current-stock.service';
import { ConfirmModel } from '../confirm-model';


export interface DialogData {
  title: string;
  message: string;
}


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  confirmModel: ConfirmModel;
  // @Input() isHit : any;
  // @Input() StockId : any;
  // @Input() StockName : any;
  currentStockBatchMasterList : any;
  // @Output() close = new EventEmitter();
  constructor(
    private confirmDialogService: ConfirmDialogService,
    private currentStockService : CurrentStockService
  ) {


  }

  ngOnInit() {
    this.confirmDialogService.confirModelObserver.subscribe(x => {
      this.confirmModel = x;
      if(x!=null)
      {
        this.currentStockService.getCurrentStockBatchMastersData(x.StockId,x.StockName).subscribe(res=>{
          this.currentStockBatchMasterList = res;
          debugger;
        })
      }
    })  
  }

  onConfirm(): void {
    this.confirmDialogService.reset();
    this.confirmDialogService.accept();
    // Close the dialog, return true
    // this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.confirmDialogService.reset();
    this.confirmDialogService.cancel();
    // this.close.emit(false);
    // Close the dialog, return false
    // this.dialogRef.close(false);
  }

}
