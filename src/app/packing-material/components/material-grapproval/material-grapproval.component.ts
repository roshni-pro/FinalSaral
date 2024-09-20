import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { PackingMaterialService } from 'app/shared/services/packing-material.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-material-grapproval',
  templateUrl: './material-grapproval.component.html',
  styleUrls: ['./material-grapproval.component.scss']
})
export class MaterialGRApprovalComponent implements OnInit {
  @Input() packingID : any;
  @Output() isdetailsclose = new EventEmitter<boolean>();
  cols:any;
  GRList : any;
  Comment:any;
  constructor(private packingmaterialService : PackingMaterialService ,private confirmationService : ConfirmationService , private messageService : MessageService) { }

  ngOnInit() {
    this.cols = [
      { field: 'PackingId', header: 'PackingId' },
      { field: 'Quantity', header: 'Quantity' },
      { field: 'InvoiceUrl', header: 'InvoiceUrl' },
      { field: 'UnitPrice', header: 'UnitPrice' },
      // { field: 'Status', header: 'Status' },
    ]
    this.packingmaterialService.GetPackingMaterialGRDetails(this.packingID).subscribe(result=>{
      console.log(result);
      this.GRList = result;
    })
    console.log(this.packingID);
  }

  grApproveAccept(row){
    console.log(row);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
          if(this.Comment){
            var data = {
              PackingId:row.PackingId,
              GRId:row.GRId,
              Comment : this.Comment,
              Status : 1,
            }
            console.log(data);
            this.packingmaterialService.ApproveRejectGR(data).subscribe(result=>{
              console.log(result);
              this.messageService.add({ severity: 'success', summary: "GR Approved", detail: '' })
              this.ngOnInit();
            })
          }
        },
        reject:() => {
          this.Comment = null;
        }
    
    });
  }

  grApproveReject(row){

  }

  onBack(){
    this.isdetailsclose.emit(false);
  }

}
