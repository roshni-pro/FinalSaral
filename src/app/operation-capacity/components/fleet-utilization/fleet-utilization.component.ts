import { Component, OnInit } from '@angular/core';
import { DeliveyMappingService } from 'app/operation-capacity/services/delivey-mapping.service';
import { SelectItem } from 'primeng/api';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { DeliveryOptimizationReportService } from 'app/operation-capacity/services/delivery-optimization-report.service';
import { VehiclePerformanceInputDc } from 'app/operation-capacity/interface/vehicle-performance-input-dc';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-fleet-utilization',
  templateUrl: './fleet-utilization.component.html',
  styleUrls: ['./fleet-utilization.component.scss']
})
export class FleetUtilizationComponent implements OnInit {
  cityList: SelectItem[];
  warehouseList: SelectItem[];
  dateOptionList: SelectItem[];
  vehicleList: any[];
  input: VehicleVM;
  constructor(private deliveyMappingService: DeliveyMappingService, private deliveryOptimizationReportService: DeliveryOptimizationReportService) { }

  async ngOnInit() {
    this.input = {
      selectedCityId: [],
      selectedWarehouseList: null,
      selectedDateOption: 'y',
      startDate: null,
      endDate: null,
      rangeDates: null,
      isFilterFormSubmitted: false,
    };
    this.dateOptionList = this.getDateOptionList();
    this.cityList = await this.getCityList();
    this.onChangeDateOption();
  }

  async getCityList() {
    return await this.deliveyMappingService.getCityListNew().toPromise();
  }

  async onCityChange() {
    this.warehouseList = null;
    this.input.selectedWarehouseList = null;
    console.log('onCityChange', this.input.selectedCityId.value);
    if (this.input.selectedCityId && this.input.selectedCityId.value > 0 ) {
      this.warehouseList = await this.deliveyMappingService.getWarehouseList(this.input.selectedCityId.value).toPromise();
      console.log('this.warehouseList', this.warehouseList);
    }
  }

  async onChangeDateOption() {
    this.input.rangeDates = null;
    if (this.input.selectedDateOption == 'y') {
      this.input.startDate = moment().subtract(1, 'days').startOf('day').toDate();
      this.input.endDate = moment().startOf('day').toDate();
    } else if (this.input.selectedDateOption == 't') {
      this.input.startDate = moment().startOf('day').toDate();
      this.input.endDate = moment().add(1, 'days').startOf('day').toDate();
    } else if (this.input.selectedDateOption == 'm') {
      this.input.startDate = moment().startOf('month').toDate();
      this.input.endDate = moment().add(1, 'days').startOf('day').toDate();
    } else {
      this.input.startDate = moment().startOf('month').toDate();
      this.input.endDate = moment().add(1, 'days').startOf('day').toDate();
      this.input.rangeDates = [this.input.startDate, this.input.endDate];
    }
    console.log('this.input.startDate', this.input.startDate);
    console.log('this.input.endDate', this.input.endDate);
  }


  setDate() {
    this.input.startDate = this.input.rangeDates[0];
    this.input.endDate = this.input.rangeDates[1];

    this.input.endDate = moment(this.input.endDate).add(1, 'days').subtract(1, 'seconds').toDate();


  }

  async onWarehouseChange() {
    console.log("this.input.selectedWarehouseList", this.input.selectedWarehouseList);
  }

  async onSearch(filterForm: NgForm) {
    this.input.isFilterFormSubmitted = true;
    if (filterForm.valid) {
      let params: VehiclePerformanceInputDc = {
        EndDate: this.input.endDate,
        StartDate: this.input.startDate,
        WarehouseIdList: this.input.selectedWarehouseList
      };
      this.vehicleList =await this.deliveryOptimizationReportService.vehiclePerformanceReport(params).toPromise();
      console.log('this.vehicleList : ', this.vehicleList );
    }
  }

  async export(filterForm: NgForm) {
    this.input.isFilterFormSubmitted = true;
    if (filterForm.valid) {
      let params: VehiclePerformanceInputDc = {
        EndDate: this.input.endDate,
        StartDate: this.input.startDate,
        WarehouseIdList: this.input.selectedWarehouseList
      };
      let path = await this.deliveryOptimizationReportService.vehiclePerformanceExport(params).toPromise();
      window.open(environment.apiURL + '/'+path, '_blank');
      console.log('this.vehicleList : ', this.vehicleList );
    }
  }

  private getDateOptionList(): SelectItem[] {
    let list: SelectItem[] = [
      { label: 'Today', value: 't' },
      { label: 'Yesterday', value: 'y' },
      { label: 'MTD', value: 'm' },
      { label: 'Custom', value: 'c' },
    ];
    return list;
  }

}

interface VehicleVM {
  selectedCityId: any;
  selectedWarehouseList: number[];
  selectedDateOption: string;
  startDate: Date | null;
  endDate: Date | null;
  rangeDates: Date[];
  isFilterFormSubmitted: boolean;
}