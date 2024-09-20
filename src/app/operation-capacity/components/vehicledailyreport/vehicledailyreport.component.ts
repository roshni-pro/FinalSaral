



import { Component, OnInit } from '@angular/core';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { VehicleMasterService } from 'app/vehicle-master/services/vehicle-master.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import * as moment from 'moment';

@Component({
  selector: 'app-vehicledailyreport',
  templateUrl: './vehicledailyreport.component.html',
  styleUrls: ['./vehicledailyreport.component.scss']
})
export class VehicledailyreportComponent implements OnInit {
  warehouseList: any;
  selectedWarehouses: any;
  blocked: boolean;
  vehiclereportList: any;
  searchModel; any;

  constructor(private exportService: ExportServiceService, private vehicleMasterService: VehicleMasterService, private confirmationService: ConfirmationService, private warehouseService: WarehouseService, private messageService: MessageService) { this.searchModel = {}; }

  ngOnInit() {
    this.searchModel = {
      WarehouseId: 0,
      Date: null
    }
    this.searchModel.Date = new Date();
    this.blocked = true;
    this.warehouseList = null;
    this.warehouseService.getWarehouseCommon().subscribe(result => {
      this.blocked = false;
      this.warehouseList = result;
    })
  }

  getReport() {
    this.searchModel.Date = this.searchModel.Date;
    this.searchModel.WarehouseId = this.selectedWarehouses.value;
    this.blocked = true;
    this.vehiclereportList = null;
    this.vehicleMasterService.GetAllVehicleReportOfDate(this.searchModel).subscribe(result => {
      this.blocked = false;
      this.vehiclereportList = result;
    })
  }

  export() {
    this.blocked = true;
    if (this.vehiclereportList == undefined && this.vehiclereportList == null) {
      this.messageService.add({ severity: 'error', summary: 'No data found!!', detail: '' });
      this.blocked = false;
      return;
    }
    this.exportService.exportAsExcelFile(this.vehiclereportList, 'Export');
    this.blocked = false;
  }
  clear() {
    this.vehiclereportList = null;
    this.selectedWarehouses = null;
    this.searchModel.Date = new Date();
  }
}
