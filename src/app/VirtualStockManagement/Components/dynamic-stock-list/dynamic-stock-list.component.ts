import { Component, OnInit } from '@angular/core';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { VirtualStockService } from 'app/VirtualStockManagement/Services/virtual-stock.service';

@Component({
  selector: 'app-dynamic-stock-list',
  templateUrl: './dynamic-stock-list.component.html',
  styleUrls: ['./dynamic-stock-list.component.scss']
})
export class DynamicStockListComponent implements OnInit {
  warehouseList = [];
  cols: any[];
  warehouseId: any;
  TableName: string;
  DynamicStockList: any;
  exportData: any[];
  blocked: boolean;

  constructor(private virtualService: VirtualStockService, private exportService: ExportServiceService, private warehouseService: WarehouseService) {

  }

  ngOnInit() {
    this.cols = [
      { field: 'ItemMultiMRPId', header: 'ItemMultiMRPId' },
      { field: 'MRP', header: 'MRP' },
      { field: 'ItemNumber', header: 'ItemNumber' },
      { field: 'itemname', header: 'itemname' },
      { field: 'AvailableStock', header: 'AvailableStock Qty' },
      { field: 'WarehouseName', header: 'Warehouse Name' },
    ];
    this.warehouseService.GetWarehouses().subscribe(result => {
      this.warehouseList = result;
    });
  }
  onSelectTable(warehouseId, TableName) {
    if (warehouseId > 0 && TableName) {
      this.blocked = true;

      this.virtualService.getFetchDynamicStockList(warehouseId, TableName).subscribe(x => {
        this.DynamicStockList = x;
        this.exportData = this.DynamicStockList;
        this.blocked = false;

      })
    }
  }
  reset() {
    this.warehouseId = 0;
    this.TableName = null;
  }
  export() {
    this.exportService.exportAsExcelFile(this.exportData, 'Report_'+this.TableName);
  }
}
