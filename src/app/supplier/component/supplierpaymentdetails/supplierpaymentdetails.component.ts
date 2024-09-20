import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'app/shared/services/supplier.service';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';

@Component({
  selector: 'app-supplierpaymentdetails',
  templateUrl: './supplierpaymentdetails.component.html',
  styleUrls: ['./supplierpaymentdetails.component.scss']
})
export class SupplierpaymentdetailsComponent implements OnInit {

  constructor(private supplierService: SupplierService,private messageService:MessageService ) { }
   cols: any[];
   supplierpaymentrequest:any[];
   supplierpaymentdata:any;
  ngOnInit() {
    this.cols = [
      { field: 'paymentRequestid', header: 'Id' },
      { field: 'SupplierId', header: 'SupplierId' },
      { field: 'SUPPLIERCODES', header: 'SupplierCode' },
      { field: 'Name', header: 'SupplierName' },
      { field: 'POId', header: 'POId' },
      { field: 'CityName', header: 'CityName' },
      { field: 'Amount', header: 'Amount' },
      { field: 'status', header: 'Status' },
      { field: 'CreatedDate', header: 'CreatedDate' },
      { field: 'Createdby', header: 'CreateBy' }
    ];
    this.supplierpaymentdata={
    paymentRequestid: 0,
    SupplierId: 0,
    status:0,
    Amount:0,
  }
    this.supplierService.GetPaymentRequestData().subscribe(result =>{
      this.supplierpaymentrequest = result;
      for(var i in this.supplierpaymentrequest){
        this.supplierpaymentrequest[i].CreatedDate = this.supplierpaymentrequest[i].CreatedDate ? moment(this.supplierpaymentrequest[i].CreatedDate).format('DD/MM/YYYY') : null
        
        }
    });

  }

  approved(supplierdata){
    this.supplierpaymentdata.status="Approved";
    this.supplierpaymentdata.paymentRequestid=supplierdata.paymentRequestid;
    this.supplierpaymentdata.SupplierId=supplierdata.SupplierId;
    this.supplierService.ApprovedSupplierPayment(this.supplierpaymentdata).subscribe(result =>{
      
      if(result!=null){
        this.messageService.add({ severity: 'success', summary: 'Approved Successfully!', detail: '' });

        this.ngOnInit();
      }
      
        });

  }
  reject(supplierdata){
    this.supplierpaymentdata.status="Reject";
    this.supplierpaymentdata.paymentRequestid=supplierdata.paymentRequestid;
    this.supplierpaymentdata.SupplierId=supplierdata.SupplierId;
    this.supplierService.RejectSupplierPayment(this.supplierpaymentdata).subscribe(result =>{
      
      if(result!=null){
        this.messageService.add({ severity: 'success', summary: 'Reject Successfully!', detail: '' });
        this.ngOnInit();
      }
     
        });
  }
  pay(supplierdata){
    this.supplierpaymentdata.status="Pay";
    this.supplierpaymentdata.paymentRequestid=supplierdata.paymentRequestid;
    this.supplierpaymentdata.SupplierId=supplierdata.SupplierId;
    this.supplierpaymentdata.Amount= supplierdata.Amount;
    this.supplierService.PaySupplierPayment(this.supplierpaymentdata).subscribe(result =>{
      
      if(result!=null){
        this.messageService.add({ severity: 'success', summary: 'Payment Successfully!', detail: '' });
        this.ngOnInit();
      }
      
        });
  }

}
