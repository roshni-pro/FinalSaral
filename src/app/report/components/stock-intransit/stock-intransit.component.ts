import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { TurnAroundTimeService } from 'app/shared/services/turn-around-time.service';
import * as moment from 'moment';
import { element } from 'protractor';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-stock-intransit',
  templateUrl: './stock-intransit.component.html',
  styleUrls: ['./stock-intransit.component.scss']
})
export class StockIntransitComponent implements OnInit {
  StockInTransit: any[];
  warehouseList: any[];
  //selectedWarehouse: number;
  selectedWarehouse: any;
  startDate: any;
  endDate: any;
  cols: any[];
  selectedColumns: any[];
  id: any;
  columns: { field: string; header: string; }[];
  blocked: boolean;
  constructor(
    private router: Router, private pepolePilotService: PepolePilotService, private turuAroundService: TurnAroundTimeService, private exportServiceService:ExportServiceService) { }

  ngOnInit() {
this.selectedWarehouse = [];
    this.pepolePilotService.Warehouse().subscribe(result => {
      console.log(result);
      this.warehouseList = result
      this.selectedWarehouse = this.warehouseList.filter(x => { return x.Selected == true }, x => x.WarehouseId);
      console.log('selected' + this.selectedWarehouse)
    })


    this.columns = [
      { field: 'PurchaseOrderId', header: 'Purchase Order Id' },
      { field: 'PoDate', header: 'PO Date' },
      { field: 'SupplierName', header: 'Supplier Name' },      
      { field: 'WarehouseName', header: 'Warehouse Name' },
      { field: 'InvoiceNumber', header: 'Invoice Number' },
      { field: 'InvoiceDate', header: 'Invoice Date' },  
      { field: 'IntransitQty', header: 'Intransit Qty' },
      { field: 'IntransitAmount', header: 'Intransit Amount' }      
    ];

    this.selectedColumns = this.columns;
  }

  getData() {

this.blocked = true;
    let warehouseList = [];
    let list = "";
    if (this.selectedWarehouse && this.selectedWarehouse.length > 0) {

      for (var i = 0; i < this.selectedWarehouse.length; i++) {
        warehouseList.push(this.selectedWarehouse[i].WarehouseId);        
        }

        list = warehouseList.join();     
     
    }

    var startDate = moment(this.startDate).format("YYYY-MM-DD HH:mm:ss")
    var endDate = moment(this.endDate).format("YYYY-MM-DD HH:mm:ss");
    this.StockInTransit = null;
    this.turuAroundService.getTransitstock(startDate, endDate, list).subscribe(result => {
      
      this.blocked = false;
      if(result.length > 0){
      this.StockInTransit = result;}
      else{
        this.StockInTransit = null;
        alert("No Data Found");
      }
      console.log(result);
    });
  }

  ExportReport(){
    if(this.StockInTransit != null){      
    this.exportServiceService.exportAsExcelFile(this.StockInTransit,"StockInTransit");}
    else{alert("No data found for export");}
  }
  

}
