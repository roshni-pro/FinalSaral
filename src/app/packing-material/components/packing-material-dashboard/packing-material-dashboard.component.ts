import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierService } from 'app/shared/services/supplier.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { PackingMaterialService } from 'app/shared/services/packing-material.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-packing-material-dashboard',
  templateUrl: './packing-material-dashboard.component.html',
  styleUrls: ['./packing-material-dashboard.component.scss']
})
export class PackingMaterialDashboardComponent implements OnInit {
  @ViewChild(Table, { static: false }) dataTableComponent: Table;
  data : any;
  warehouseList:any;
  supplierList:any;
  cols:any;
  recordList : any;
  totalRecords:any;
  isReport :boolean = false;
  isReportDetail :boolean = false;
  detailList : any;
  detailField:any;
  constructor(private router : Router,
    private packingmaterialService : PackingMaterialService , 
    private supplierService : SupplierService , 
    private warehouseService : WarehouseService,
    private messageService : MessageService,
    ) {  this.data = {}}

  ngOnInit() {
    this.cols =[
      { field: 'InvoiceChallanNo', header: 'InvoiceChallanNo' },
      { field: 'Type', header: 'Type' },
      { field: 'ShippedtoWarehouseName', header: 'Shipped To' },
      { field: 'TransportMode', header: 'TransportMode' },
      { field: 'InvoiceType', header: 'Invoice Type' },
      { field: 'CreatedDate', header: 'Created Date' },
    ]
    this.detailField =[ 
      { field: 'ItemName', header: 'Item Name' },
      { field: 'Uom', header: 'Uom' },
      { field: 'Qty', header: 'Qty' },
      { field: 'SentQuantity', header: 'SentQuantity' },
      { field: 'ItemReceivedQuantity', header: 'ItemReceivedQuantity' },
      { field: 'RemainingQuantity', header: 'RemainingQuantity' },
    ]
    this.warehouseService.getSpecificWarehouses().subscribe(result => {
      this.warehouseList = result;
      console.log(this.warehouseList);
    });

    this.supplierService.GetAll().subscribe(result => {
      this.supplierList = result;
      console.log(this.supplierList);
    })
  }
  load(event){
    
    var First = event.first + 1;//(event.first == 0 || event.first) ? event.first  : 0;
    var Last = event.rows ? event.first + event.rows : 3;
    var supplierid = this.data.ShipToSupplierWarehouseId ? this.data.ShipToSupplierWarehouseId : null;;
    console.log(supplierid);
    this.packingmaterialService.GetPackingMaterialReport(this.data.WarehouseId,supplierid,First,Last).subscribe(result=>{
      
      console.log(result)
      if(result.GetRawMaterialMstDetails.length > 0){
        this.recordList = result.GetRawMaterialMstDetails;
        this.totalRecords = result.Count;
        this.isReport = true;
      }else{
        this.isReport = false;
        this.messageService.add({ severity: 'error', summary: "No Record Found", detail: '' });
      }
     
    })
  }

  open(rowdata){
    // this.isClick = true;
    
    this.packingmaterialService.GetInvoiceDtlsAcInvoice(rowdata.InvoiceChallanNo , rowdata.WareHouseId).subscribe(result=>{
    //  console.log(result);
      if(result){
        this.isReportDetail = true;
        this.detailList =  result;
        console.log(this.detailList);
      }else{
        this.messageService.add({ severity: 'error', summary: "No Record Found", detail: '' });
      }
      
    })
 }

  search(d){
    this.isReport = true;  
    this.isReportDetail = false;
    this.dataTableComponent.reset();
  }
}
