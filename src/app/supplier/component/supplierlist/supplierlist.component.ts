import { Component, OnInit, Input } from '@angular/core';
import { SupplierService } from 'app/shared/services/supplier.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-supplierlist',
  templateUrl: './supplierlist.component.html',
  styleUrls: ['./supplierlist.component.scss']
})
export class SupplierlistComponent implements OnInit {
  list : any;
  irmasterdatadclist : any[];
  irpaymenthistorylist : any[];
  ladgerEntrieslist : any[];
  cols1: any[];
  cols2: any[];
  cols3: any[];
  @Input()Id : any;
  @Input() paymentRequestid : any;
  
  constructor(private supplierService: SupplierService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.cols1 = [
      // { header: 'Edit' },
      { field: 'Id', header: 'Id' },
      { field: 'IRID', header: 'IRID'  },
      { field: 'IRType', header: 'IRType' },
      { field: 'PaymentStatus', header: 'PaymentStatus' },
      { field: 'PurchaseOrderId', header: 'PurchaseOrderId' },
      { field: 'TotalAmount', header: 'TotalAmount' },
      { field: 'TotalAmountRemaining', header: 'TotalAmountRemaining' },
      
    ];
    this.cols2 = [
      // { header: 'Edit' },
      { field: 'Id', header: 'Id' },
      { field: 'IRID', header: 'IRID' },
      { field: 'Amount', header: 'Amount'  },
      // { field: 'Createby', header: 'Createby' },
      { field: 'CreatedDate', header: 'Created Date' },
      // { field: 'Deleted', header: 'Deleted' },     
      { field: 'IRPaymentDetailId', header: 'IRPayment Detail Id' },      
      // { field: 'IsActive', header: 'IsActive' },
      { field: 'PaymentMode', header: 'Payment Mode' },
      { field: 'PurchaseOrderId', header: 'Purchase Order Id' },
      
    ];
    this.cols3 = [
      // { header: 'Edit' },
      { field: 'IrPaymentDetailsId', header: 'IR Payment Details Id' },
      { field: 'ID', header: 'ID' },
      // { field: 'Active', header: 'Active'  },
      { field: 'AffectedLadgerID', header: 'Affected Ladger ID' },
      // { field: 'CreatedBy', header: 'CreatedBy' },
      { field: 'CreatedDate', header: 'Created Date' },
      { field: 'Credit', header: 'Credit' },
      // { field: 'CreatedDate', header: 'CreatedDate' },
      { field: 'Date', header: 'Date' },
      { field: 'Debit', header: 'Debit' },   
      // { field: 'IsSupplierAdvancepay', header: 'IsSupplierAdvancepay' },
      { field: 'LagerID', header: 'LagerID' },
      { field: 'ObjectID', header: 'IRID' },
      // { field: 'ObjectType', header: 'ObjectType' },
      { field: 'Particulars', header: 'Particulars' },
      { field: 'RefNo', header: 'RefNo' },
      { field: 'Remark', header: 'Remark' },
      // { field: 'UpdatedBy', header: 'UpdatedBy' },
      { field: 'UpdatedDate', header: 'Updated Date' },
      // { field: 'UploadGUID', header: 'UploadGUID' },
      { field: 'VouchersNo', header: 'Vouchers No' },
      { field: 'VouchersTypeID', header: 'Vouchers Type ID' },
      
    ];
    

    this.Id = Number(this.route.snapshot.paramMap.get("Id"));
    this.supplierService.GetHistorydata(this.Id).subscribe(result =>{
      
      this.list = result;
      this.irmasterdatadclist=this.list.irmasterdatadc;
      // for (var i in this.irmasterdatadclist) {
      //   this.irmasterdatadclist[i].CreatedDate = this.irmasterdatadclist[i].CreatedDate ? moment(this.irmasterdatadclist[i].CreatedDate).format('DD/MM/YYYY') : null
      //   this.irmasterdatadclist[i].UpdatedDate = this.irmasterdatadclist[i].UpdatedDate ? moment(this.irmasterdatadclist[i].UpdatedDate).format('DD/MM/YYYY') : null
      // }
      this.irpaymenthistorylist=this.list.irpaymenthistory;
      for (var i in this.irpaymenthistorylist) {
        this.irpaymenthistorylist[i].CreatedDate = this.irpaymenthistorylist[i].CreatedDate ? moment(this.irpaymenthistorylist[i].CreatedDate).format('DD/MM/YYYY') : null
        // this.irpaymenthistorylist[i].UpdatedDate = this.irpaymenthistorylist[i].UpdatedDate ? moment(this.irpaymenthistorylist[i].UpdatedDate).format('DD/MM/YYYY') : null
      }
      this.ladgerEntrieslist=this.list.ladgerEntries;
      for (var i in this.ladgerEntrieslist) {
        this.ladgerEntrieslist[i].CreatedDate = this.ladgerEntrieslist[i].CreatedDate ? moment(this.ladgerEntrieslist[i].CreatedDate).format('DD/MM/YYYY') : null
        this.ladgerEntrieslist[i].Date = this.ladgerEntrieslist[i].Date ? moment(this.ladgerEntrieslist[i].Date).format('DD/MM/YYYY') : null
        this.ladgerEntrieslist[i].UpdatedDate = this.ladgerEntrieslist[i].UpdatedDate ? moment(this.ladgerEntrieslist[i].UpdatedDate).format('DD/MM/YYYY') : null
      }
      console.log('this.list::', result);
    })
  }


}
