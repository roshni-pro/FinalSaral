import { Component, OnInit } from '@angular/core';
import { DeliveyMappingService } from 'app/operation-capacity/services/delivey-mapping.service';
import { SelectItem } from 'primeng/api';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { DeliveryOptimizationReportService } from 'app/operation-capacity/services/delivery-optimization-report.service';
import { DboyPerformanceInputDC } from 'app/operation-capacity/interface/dboy-performance-input-dc';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-dboy-pursuit-report',
  templateUrl: './dboy-pursuit-report.component.html',
  styleUrls: ['./dboy-pursuit-report.component.scss']
})
export class DBoyPursuitReportComponent implements OnInit {

  cityList: SelectItem[];
  warehouseList: SelectItem[];
  dateOptionList: SelectItem[];
  input: DboyVM;
  dboyList: any[];
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
    console.log('this.cityListtt', this.cityList);
  }

  async getCityList() {
    return await this.deliveyMappingService.getCityListNew().toPromise();
  }

  async onCityChange() {
    this.warehouseList = null;
    this.input.selectedWarehouseList = null;
    console.log('onCityChange', this.input.selectedCityId.value);
    if (this.input.selectedCityId && this.input.selectedCityId.value>0) {
      this.warehouseList = await this.deliveyMappingService.getWarehouseList(this.input.selectedCityId.value).toPromise();
      console.log('this.warehouseList', this.warehouseList);
    }
  }

  async onWarehouseChange() {
    console.log("this.input.selectedWarehouseList", this.input.selectedWarehouseList);
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

  onSearch(filterForm: NgForm) {
    this.input.isFilterFormSubmitted = true;
    if (filterForm.valid) {
      console.log('filterForm', filterForm);
      this.dboyList = null;
      let param: DboyPerformanceInputDC = {
        EndDate: this.input.endDate,
        StartDate: this.input.startDate,
        WarehouseIdList: this.input.selectedWarehouseList
      };
      this.deliveryOptimizationReportService.dboyPerformanceList(param).subscribe(res => {
        this.dboyList = res;
        console.log(' this.dboyList ', this.dboyList);
      });
    }
  }

  export(filterForm: NgForm) {
    this.input.isFilterFormSubmitted = true;
    if (filterForm.valid) {
      console.log('filterForm', filterForm);
      this.dboyList = null;
      let param: DboyPerformanceInputDC = {
        EndDate: this.input.endDate,
        StartDate: this.input.startDate,
        WarehouseIdList: this.input.selectedWarehouseList
      };
      this.deliveryOptimizationReportService.dboyPerformanceExport(param).subscribe(res => {
        window.open(environment.apiURL + '/'+ res);
      });
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


interface DboyVM {
  selectedCityId: any;
  selectedWarehouseList: number[];
  selectedDateOption: string;
  startDate: Date | null;
  endDate: Date | null;
  rangeDates: Date[];
  isFilterFormSubmitted: boolean;
}