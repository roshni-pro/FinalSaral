import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'app/shared/services/supplier.service';
import { Router } from '@angular/router';
import { SelectItem, MessageService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { LoaderService } from 'app/shared/services/loader.service';
@Component({
  selector: 'app-payment-acknowlegement',
  templateUrl: './payment-acknowlegement.component.html',
  styleUrls: ['./payment-acknowlegement.component.scss']
})
export class PaymentAcknowlegementComponent implements OnInit {

  errorMsg: any;
  PaymentAcknowledgementList: any[];
  totalRecords: number;
  blocked: boolean;
  Filters: Filter;
  yearRangeForCalender: string;
  issentmail:boolean = false
  constructor(private router: Router, private supplierService: SupplierService,
    private messageService: MessageService,private exportService: ExportServiceService,private loaderService: LoaderService) { }

  ngOnInit() {
    this.blocked = true;
    this.yearRangeForCalender = '2020:';
    this.yearRangeForCalender += (new Date()).getFullYear();
    this.Filters = {
      Fromdate: null,
      Todate: null,
      Skip: 0,
      Take: 20,
      SupplierCode: null,
      ISExport: 0,
    };
  }

  load(event) {
    debugger
    var Last = event.first ? event.first + event.rows : 20;
    this.Filters.Skip = Last / event.rows;
    this.Filters.Take = event.rows;
    if (this.Filters.Fromdate == null || this.Filters.Todate == null) {            
      return false;
    }
     this.getData(this.Filters);
  }

  Search() {
    debugger

    let filter = this.Filters;
    if (filter.Fromdate == null || filter.Todate == null) {
      //alert('Please enter From or To date');
      this.messageService.add({ severity: 'error', summary: 'Please enter From or To date', detail: '' });
      return false;
    }
    this.Filters.ISExport = 0;
    this.getData(this.Filters);
  }

  Refresh() {
    this.PaymentAcknowledgementList = [];
    this.Filters.Fromdate=null;
    this.Filters.Todate=null;
    this.Filters.SupplierCode=null;
    this.totalRecords=0;
  }
  Export() {
    debugger
    let filter = this.Filters;
    if (filter.Fromdate == null || filter.Todate == null) {
      //alert('Please enter From or To date');
      this.messageService.add({ severity: 'error', summary: 'Please enter From or To date', detail: '' });
      return false;
    }
    this.Filters.ISExport = 1;
    this.supplierService.GetSupplierPaymentAcknowledgement(this.Filters).subscribe(x => {
      debugger
      this.errorMsg = x.data;
      if (x.Status) {
        this.exportService.exportAsExcelFile(x.data, 'SupplierPaymentAcknowledgement');
        this.messageService.add({ severity: 'success', summary: "Data Export", detail: '' });
      } else {
        this.messageService.add({ severity: 'error', summary: this.errorMsg, detail: '' });         
      }
    });
    
  }

  getData(filters) {
    this.PaymentAcknowledgementList=[];
    this.supplierService.GetSupplierPaymentAcknowledgement(filters).subscribe(x => {
      debugger
      this.errorMsg = x.data;
      if (x.Status) {
        this.PaymentAcknowledgementList = x.data;
        this.totalRecords = x.TotalCount;
        this.messageService.add({ severity: 'success', summary: "Data Get", detail: '' });
      } else {
        this.messageService.add({ severity: 'error', summary: this.errorMsg, detail: '' });
        this.PaymentAcknowledgementList = [];
      }
    });

  }
  Confirm(){
    debugger
    this.loaderService.loading(true);
    let filter = this.Filters;
    if (filter.Fromdate == null || filter.Todate == null) {
      //alert('Please enter From or To date');
      this.loaderService.loading(false);
      this.messageService.add({ severity: 'error', summary: 'Please enter From or To date', detail: '' });
      return false;
    }
    if (filter.SupplierCode == null || filter.SupplierCode==undefined || filter.SupplierCode==""){
      this.loaderService.loading(false);
      this.messageService.add({ severity: 'error', summary: 'Please enter Search Code', detail: '' });
      return false;
    }
    else
    {
      this.loaderService.loading(false);
      this.issentmail=true;
    }
  }
  MailSent(){
    this.loaderService.loading(true);
    let filter = this.Filters;
    if (filter.Fromdate == null || filter.Todate == null) {
      //alert('Please enter From or To date');
      this.loaderService.loading(false);
      this.messageService.add({ severity: 'error', summary: 'Please enter From or To date', detail: '' });
      return false;
    }
    if (filter.SupplierCode == null || filter.SupplierCode==undefined || filter.SupplierCode==""){
      this.loaderService.loading(false);
      this.messageService.add({ severity: 'error', summary: 'Please enter Search Code', detail: '' });
      return false;
    }
    this.Filters.ISExport = 1;
    this.supplierService.SupplierPaymentAcknowledgementMail(this.Filters).subscribe(x => {
      debugger
      if (x.Status) {
        this.loaderService.loading(false);
        alert(x.Message);
      } else {
        this.loaderService.loading(false);
        alert(x.Message);
      }
    });
  }

}
export interface Filter {
  Fromdate: any;
  Todate: any;
  SupplierCode: string;
  Skip: number;
  Take: number;
  ISExport: number;
}
