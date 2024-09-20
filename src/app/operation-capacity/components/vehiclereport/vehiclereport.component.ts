import { Component, OnInit } from '@angular/core';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { VehicleMasterService } from 'app/vehicle-master/services/vehicle-master.service';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import * as moment from 'moment';
import { VehicleReportDC } from 'app/operation-capacity/interface/vehicle-report-dc';
import { environment } from 'environments/environment';
import { VehicleReportDetailDC } from 'app/operation-capacity/interface/vehicle-report-detail-dc';
import { DeliveyMappingService } from 'app/operation-capacity/services/delivey-mapping.service';

@Component({
  selector: 'app-vehiclereport',
  templateUrl: './vehiclereport.component.html',
  styleUrls: ['./vehiclereport.component.scss']
})
export class VehiclereportComponent implements OnInit {
  warehouseList: any;
  selectedWarehouses: number;
  blocked: boolean;
  vehicleList: any;
  vehiclereportList: VehicleReportDC[];
  vehicleSummary: VehicleReportDetailDC;
  selectedvehicleID: number = null;
  searchModel; any;
  cityList: SelectItem[];
  selectedCityId: number = null;
  isFilterFormSubmitted: boolean;

  constructor(private exportService: ExportServiceService
    , private vehicleMasterService: VehicleMasterService
    , private confirmationService: ConfirmationService
    , private warehouseService: WarehouseService
    , private messageService: MessageService
    , private deliveyMappingService: DeliveyMappingService) { this.searchModel = {}; }

  async ngOnInit() {
    this.searchModel = {
      WarehouseId: 0,
      FromDate: null,
      ToDate: null,
      Id: 0,
    }

    this.cityList = await this.getCityList();
   

    this.searchModel.FromDate = new Date();
    this.searchModel.FromDate = new Date(this.searchModel.FromDate.setHours(0, 0, 0, 0));
    this.searchModel.ToDate = new Date();


  }

  getVehicle() {
    this.blocked = true;
    this.vehicleList = null;
    this.vehicleMasterService.GetVehicleListByWarehouseId(this.selectedWarehouses).subscribe(result => {
      this.blocked = false;
      this.vehicleList = result;

    })
  }

  getReport() {
    this.searchModel.FromDate = this.searchModel.FromDate;
    this.searchModel.ToDate = this.searchModel.ToDate;
    this.searchModel.Id = this.selectedvehicleID;
    this.searchModel.WarehouseId = this.selectedWarehouses;
    this.blocked = true;
    this.vehiclereportList = null;
    this.vehicleMasterService.GetVehicleReport(this.searchModel).subscribe(result => {
      console.log('result', result);
      this.blocked = false;
      if (result) {
        this.vehiclereportList = result.DayWiseTripList;
        this.vehicleSummary = result.VehicleSummary;
        
      }

    })
  }

  export() {
    this.blocked = true;
    this.searchModel.FromDate = this.searchModel.FromDate;
    this.searchModel.ToDate = this.searchModel.ToDate;
    this.searchModel.Id = this.selectedvehicleID;
    this.searchModel.WarehouseId = this.selectedWarehouses;
    this.vehicleMasterService.exportVehicleReport(this.searchModel).subscribe(x => {
      this.blocked = false;
      if (x) {
        window.open(environment.apiURL + '/' + x);
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'No data found!!', detail: '' });
      }
    });

    // this.blocked = true;
    // if (this.vehiclereportList == undefined && this.vehiclereportList == null) {
    //   this.messageService.add({ severity: 'error', summary: 'No data found!!', detail: '' });
    //   this.blocked = false;
    //   return;
    // }
    // this.exportService.exportAsExcelFile(this.vehiclereportList, 'ExportvehicleMasterList');
    // this.blocked = false;
  }
  clear() {
    window.location.reload();
  }

  async getCityList() {
    return await this.deliveyMappingService.getCityList().toPromise();
  }

  async onCityChange() {
    this.warehouseList = null;
    this.selectedWarehouses = null;
    console.log('onCityChange', this.selectedWarehouses);
    if (this.selectedCityId) {
      this.warehouseList = await this.deliveyMappingService.getWarehouseList(this.selectedCityId).toPromise();
      // this.selectedWarehouses
      //   = this.warehouseList && this.warehouseList.length > 0 ? this.warehouseList[0].value : null;
      console.log('this.warehouseList', this.warehouseList);
    }
  }

}
