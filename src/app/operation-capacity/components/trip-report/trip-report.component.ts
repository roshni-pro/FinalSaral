import { Component, OnInit } from '@angular/core';
import { DeliveyMappingService } from 'app/operation-capacity/services/delivey-mapping.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { DeliveryOptimizationReportService } from 'app/operation-capacity/services/delivery-optimization-report.service';
import { TripReportInputDc } from 'app/operation-capacity/interface/trip-report-input-dc';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-trip-report',
  templateUrl: './trip-report.component.html',
  styleUrls: ['./trip-report.component.scss']
})
export class TripReportComponent implements OnInit {
  cityList: SelectItem[];
  warehouseList: SelectItem[];
  dateOptionList: SelectItem[];
  input: TripReportVM;
  tripOverviewList: any[];
  orderOverviewList: any[];
  constructor(private deliveyMappingService: DeliveyMappingService, private deliveryOptimizationReportService: DeliveryOptimizationReportService) { }

  async ngOnInit() {
    this.input = {
      endDate: null,
      isFilterFormSubmitted: false,
      rangeDates: null,
      selectedCityId: null,
      selectedDateOption: 'tm',
      selectedWarehouseId: null,
      startDate: null
    };
    this.cityList = await this.getCityList();
    this.dateOptionList = this.getDateOptionList();
    this.onChangeDateOption();
  }

  async getCityList() {
    return await this.deliveyMappingService.getCityList().toPromise();
  }

  async onCityChange() {
    this.warehouseList = null;
    this.input.selectedWarehouseId = null;
    console.log('onCityChange', this.input.selectedCityId);
    if (this.input.selectedCityId) {
      this.warehouseList = await this.deliveyMappingService.getWarehouseList(this.input.selectedCityId).toPromise();
      this.input.selectedWarehouseId
        = this.warehouseList && this.warehouseList.length > 0 ? this.warehouseList[0].value : null;
      console.log('this.warehouseList', this.warehouseList);
    }
  }

  async onChangeDateOption() {
    this.input.rangeDates = null;
    if (this.input.selectedDateOption == 'y') {
      this.input.startDate = moment().subtract(1, 'days').startOf('day').toDate();
      this.input.endDate = moment().startOf('day').subtract(1, 'seconds').toDate();
    } else if (this.input.selectedDateOption == 't') {
      this.input.startDate = moment().startOf('day').toDate();
      this.input.endDate = moment().add(1, 'days').startOf('day').subtract(1, 'seconds').toDate();
    } else if (this.input.selectedDateOption == 'tm') {
      this.input.startDate = moment().startOf('month').toDate();
      this.input.endDate = moment().toDate();
      // this.input.rangeDates = [this.input.startDate, this.input.endDate];
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
  }

  onSearch(form: NgForm) {

    this.input.isFilterFormSubmitted = true;
    if (form.valid) {
      this.input.isFilterFormSubmitted = false;
      let param: TripReportInputDc = {
        WarehouseId: this.input.selectedWarehouseId,
        StartDate: this.input.startDate,
        EndDate: this.input.endDate,
        TripPlannerConfirmMasterId: null
      };

      this.deliveryOptimizationReportService.tripReportOverview(param).subscribe(res => {
        console.log('res', res);
        this.tripOverviewList = res;
      });
    }
  }


  export(form: NgForm) {
    this.input.isFilterFormSubmitted = true;
    if (form.valid) {
      this.input.isFilterFormSubmitted = false;
      let param: TripReportInputDc = {
        WarehouseId: this.input.selectedWarehouseId,
        StartDate: this.input.startDate,
        EndDate: this.input.endDate,
        TripPlannerConfirmMasterId: null
      };

      this.deliveryOptimizationReportService.tripReportExport(param).subscribe(res => {
        window.open(environment.apiURL +'/' + res);
      });
    }
  }

  getRowData(trip: any) {
    let id = trip.TripPlannedConfirmMastedId;
    console.log('trip: ', trip);
    let param: TripReportInputDc = {
      WarehouseId: this.input.selectedWarehouseId,
      StartDate: this.input.startDate,
      EndDate: this.input.endDate,
      TripPlannerConfirmMasterId: id
    };

    this.deliveryOptimizationReportService.tripReportOrderOverview(param).subscribe(res => {
      console.log('res1', res);
      trip.orderOverviewList = res;
      // this.tripOverviewList = res;
    });
  }

  private getDateOptionList(): SelectItem[] {
    let list: SelectItem[] = [
      { label: 'Today', value: 't' },
      { label: 'Yesterday', value: 'y' },
      { label: 'This Month', value: 'tm' },
      { label: 'Custom', value: 'c' }
    ];
    return list;
  }

}


interface TripReportVM {
  selectedCityId: number | null;
  selectedWarehouseId: number | null;
  selectedDateOption: string;
  startDate: Date | null;
  endDate: Date | null;
  rangeDates: Date[];
  isFilterFormSubmitted: boolean;
}