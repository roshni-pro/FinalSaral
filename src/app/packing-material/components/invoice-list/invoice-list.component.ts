import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PackingMaterialService } from 'app/shared/services/packing-material.service';
import { Table } from 'primeng/table';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  @ViewChild(Table, { static: false }) dataTableComponent: Table;
//  @ViewChild('printsection',{static:false})  printsection: ElementRef;
  invoiceList : any;
  cols:any;
  totalRecords :any;
  isClick : boolean = false;
  data : any;
  WareHouseGSTin :any;
  BilltoGSTin : any;
  ShippedtoGSTin:any;
  constructor(private packingmaterialService: PackingMaterialService,private router : Router ) { }

  ngOnInit() {
    this.cols = [
      { field: 'InvoiceChallanNo', header: 'InvoiceChallanNo' },
      { field: 'Type', header: 'Type' },
      { field: 'BilltoWarehouseName', header: 'BilltoWarehouseName' },
      { field: 'ShippedtoWarehouseName', header: 'ShippedtoWarehouseName' },
      { field: 'TransportMode', header: 'TransportMode' },
      { field: 'VehicleNumber', header: 'VehicleNumber' },
    
    ]
  }
  load(event){
    var First = event.first + 1;//(event.first == 0 || event.first) ? event.first  : 0;
    var Last = event.rows ? event.first + event.rows : 3;

    this.packingmaterialService.GetRawMasterAcBuyer(First,Last).subscribe(result=>{
      
      console.log(result);
      this.invoiceList = result.GetRawMaterialMstDetails;
      this.totalRecords = result.Count 
      
    })
  }

  open(rowdata){
    console.log(rowdata);
    this.isClick = true;
    
    this.packingmaterialService.GetInvoiceDeliveryChallanDetails(rowdata.InvoiceChallanNo).subscribe(result=>{
      this.data = result;
      this.WareHouseGSTin  = this.data.GetRawMaterialMstDetails.WareHouseGSTin.substring(0, 2)
      this.ShippedtoGSTin  = this.data.GetRawMaterialMstDetails.ShippedtoGSTin.substring(0, 2)
      console.log(result);
    })
  }
  back(){
    this.isClick = false;
    this.dataTableComponent.reset();
  }

  print() {
   
   var printContents = document.getElementById('print-section').innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;


  }

  AddInvoice(){
    this.router.navigateByUrl('layout/packing-material/add-invoice')
  }

}
