import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from 'app/shared/services/supplier.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { createDiffieHellman } from 'crypto';


@Component({
  selector: 'app-manual-ladger',
  templateUrl: './manual-ladger.component.html',
  styleUrls: ['./manual-ladger.component.scss']
})
export class ManualLadgerComponent implements OnInit {
  @ViewChild(Table,{static:false}) dataTableComponent: Table;
  inputModel: any
  manualLadgerList:any;
  supplierList: any;
  selectedSupplier: any;
  isInvalid: boolean;
  paymentList: any[];
  cols: any;
  bankTypeLedgerList: any[];
  voucherTypeList: any[];
  sucessList: any;
  guidList : any
  totalRecords:any
  credit:any;
  debit:any
  constructor(private supplierService: SupplierService, private messageService : MessageService, private confirmationService: ConfirmationService) { this.inputModel = {}  }

  ngOnInit() {
    this.supplierService.getGuid().subscribe(result=>{
      console.log(result);
      this.guidList = result;
    })
    // this.supplierService.GetManualLadger().subscribe(result => {
    // //   this.manualLadgerList = result
    // this.totalRecords = result.length;
    // })
  }

  load(event){
    this.inputModel.First = (event.first == 0 || event.first) ? event.first  : 0;
    this.inputModel.Last = event.rows ? event.first + event.rows : 10;
    this.supplierService.search(this.inputModel).subscribe(result => {
      
      this.totalRecords = result.TotalRecords;
      this.manualLadgerList = result.LagerEntryDetailsList;
      console.log(this.manualLadgerList);

    })
  }
  getSupplierList(event) {
    if (event.query.length > 2) {
      this.supplierService.getBySupplierName(event.query)
        .subscribe(result => {
          this.supplierList = result;
          console.log('this.supplierList :', this.supplierList);
        });
    }
  }

  onSelectSupplier() {
    console.log(this.selectedSupplier);
    this.inputModel.ObjectID = this.selectedSupplier.ID;
  }

  search(){
    console.log(this.inputModel);
    this.dataTableComponent.reset();
    // this.supplierService.search(this.inputModel).subscribe(result => {
    //   console.log(result);
    //   this.manualLadgerList = result.LagerEntryDetailsList;
    //   this.dataTableComponent.reset();
    // })
  }

  onRowEditSave(rowdata){
    console.log(this.manualLadgerList)
    console.log(rowdata)
    this.supplierService.UpdateManualLadger(rowdata).subscribe(result =>{
      console.log(result);
      // this.inputModel.ObjectID  = null
      // this.selectedSupplier = null;
      // this.inputModel.UploadGUID = null;
      this.search();
      this.messageService.add({
        severity: 'success',
        summary: 'Updated',
        detail: ''
      });
    })
  }

  onDelete(id){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.supplierService.DeleteManualLadger(id).subscribe(result => {
          let ac = this.manualLadgerList.filter(x => x.ID == id)[0];
          let index = this.manualLadgerList.indexOf(ac);
          this.manualLadgerList.splice(index, 1);
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted',
            detail: ''
          });
        });
      }
    });
  }

  onRowEditInit(rowdata){
    rowdata.editing = true;
    console.log(this.manualLadgerList)
      this.manualLadgerList.forEach(element => {
        element.editing = false;
      });
      rowdata.editing = true;
      this.credit = rowdata.Credit;
      this.debit = rowdata.Debit;
      // console.log(this.credit + 'and' + this.debit)
    
  }
  oncancel(rowdata){
    // console.log(this.credit + 'and' + this.debit)
     rowdata.Credit = this.credit ;
     rowdata.Debit = this.debit;
     rowdata.editing = false;

  }
  clear(){
    this.inputModel.ObjectID  = null
    this.selectedSupplier = null;
    this.inputModel.UploadGUID = null;
    this.search();
  }
}
