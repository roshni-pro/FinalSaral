import { Component, OnInit, Input } from '@angular/core';
import { SupplierService } from 'app/shared/services/supplier.service';
import { MessageService, ConfirmationService, Message } from 'primeng/api';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-payment-list',
  templateUrl: './supplier-payment-list.component.html',
  styleUrls: ['./supplier-payment-list.component.scss']
})
export class SupplierPaymentListComponent implements OnInit {
  searchModel: any;
  msgs: Message[] = [];
  constructor(private confirmationService: ConfirmationService, private supplierService: SupplierService, private messageService: MessageService, private router: Router) { }
  totalRecordCount: number;
  rowSize: number;
  supplierpaymenList: any[];
  IRPaymentdetailsId: any;
  paymentRequestid: any;
  deletepaymentrecord:any;
  yearRangeForCalender:string;
  @Input() Id: any;
  ngOnInit() {
    this.yearRangeForCalender = '2016:';
    this.yearRangeForCalender += (new Date()).getFullYear();
    this.rowSize = 20;
    this.searchModel = {
      Contains: '',
      FromDate: null,
      ToDate: null,
      Skip: 0,
      Take: this.rowSize,
      SupplierID: null
    }

    // this.supplierService.GetHistorydata(this.IRPaymentdetailsId).subscribe(result => {
    //   this.list = result;
    //   console.log('this.list::', result);
    // })

  }


  search(event) {
    if (event) {
      this.searchModel.Skip = event.first;
      this.searchModel.Take = event.rows;
      this.searchModel.FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('MM/DD/YYYY HH:mm:ss') : null
      this.searchModel.ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('MM/DD/YYYY HH:mm:ss') : null
    }

    this.supplierService.getIrpaymentdetails(this.searchModel).subscribe(result => {
      this.supplierpaymenList = result.PaymentList;
      console.log(' this.supplierpaymenList : ',  this.supplierpaymenList );
      this.totalRecordCount = result.TotalRecords;
    });
  }

  searchByFilter() {
    this.searchModel.Skip = 0;
    this.searchModel.Take = this.rowSize;
    this.search(null);
  }

  clear() {
    this.searchModel = {
      Contains: '',
      FromDate: null,
      ToDate: null,
      Skip: 0,
      Take: this.rowSize,
      SupplierID: null
    }
    this.search(null);
  }
  redirect() {
    
    this.router.navigateByUrl("layout/supplier/supplierpayment");
  }

  list(Id) {
    this.Id = Id;
    this.router.navigateByUrl('layout/supplier/supplierlist/' + this.Id);
  }

  delete(rowData) {
 
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        rowData.InProcess = true;
        this.supplierService.deletePayemntRecord(rowData.Id).subscribe(result => {
          this.deletepaymentrecord = result;

          let index = this.supplierpaymenList.indexOf(rowData);
          this.supplierpaymenList.splice(index, 1);
          this.messageService.add({ severity: 'success', summary: 'Delete Payment Successfully!', detail: '' });
        
         
        }, error =>{
          rowData.InProcess = false;
        });
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
    console.log('rowData is: ', rowData);
  }
}
