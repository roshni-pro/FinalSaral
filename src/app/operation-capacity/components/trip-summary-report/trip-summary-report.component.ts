import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DeliveyMappingService } from 'app/operation-capacity/services/delivey-mapping.service';
import { SelectItem } from 'primeng/api';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { DeliveryOptimizationReportService } from 'app/operation-capacity/services/delivery-optimization-report.service';
import { TripSummaryReportInputDc } from 'app/operation-capacity/interface/trip-summary-report-input-dc';

@Component({
  selector: 'app-trip-summary-report',
  templateUrl: './trip-summary-report.component.html',
  styleUrls: ['./trip-summary-report.component.scss']
})
export class TripSummaryReportComponent implements OnInit {
  cityList: SelectItem[];
  warehouseList: SelectItem[];
  dateOptionList: SelectItem[];
  summary: any = null;
  cost: any;
  input: TripSummaryVM;

  public pieOrderChart: any;
  public pieTripData: any;
  public lineChartData: any;
  public lineChartSelectedData: any;

  chartOptions = {
    responsive: false
  };



  constructor(private ref: ChangeDetectorRef, private deliveyMappingService: DeliveyMappingService, private deliveryOptimizationReportService: DeliveryOptimizationReportService) { }

  async ngOnInit() {
    this.input = {
      selectedCityId:[],
      selectedWarehouseId: null,
      selectedDateOption: 'y',
      startDate: null,
      endDate: null,
      rangeDates: null,
      isFilterFormSubmitted: false,
      showData: false,
      selectedChartOption: null,
      defaultChartOption: 'Cost/Km'

    };
    this.dateOptionList = this.getDateOptionList();
    this.cityList = await this.getCityList();
    this.onChangeDateOption();
  }


  async onCityChange() {
    this.warehouseList = null;
    this.input.selectedWarehouseId = null;
    console.log('onCityChange', this.input.selectedCityId.value);
    if (this.input.selectedCityId && this.input.selectedCityId.value > 0 ) {
      this.warehouseList = await this.deliveyMappingService.getWarehouseList(this.input.selectedCityId.value).toPromise();
      this.input.selectedWarehouseId
        = this.warehouseList && this.warehouseList.length > 0 ? this.warehouseList[0].value : null;
      console.log('this.warehouseList', this.warehouseList);
    }
  }

  async getCityList() {
    return await this.deliveyMappingService.getCityListNew().toPromise();
  }

  async onWarehouseChange() {
    console.log("this.input.selectedWarehouseList", this.input.selectedWarehouseId);
  }

  todaysDate = new Date();
  async onChangeDateOption() {
    console.log("todaysDate", this.todaysDate);
    this.input.rangeDates = null;
    if (this.input.selectedDateOption == 'y') {
      this.input.startDate = moment(this.todaysDate).subtract(1, 'days').startOf('day').toDate();
      this.input.endDate = moment(this.todaysDate).startOf('day').subtract(1, 'seconds').toDate();
    } else if (this.input.selectedDateOption == 't') {
      this.input.startDate = moment(this.todaysDate).startOf('day').toDate();
      this.input.endDate = moment(this.todaysDate).add(1, 'days').startOf('day').subtract(1, 'seconds').toDate();
    } else if (this.input.selectedDateOption == 'tw') {
      this.input.startDate = moment(this.todaysDate).startOf('week').toDate();
      this.input.endDate = moment(this.todaysDate).add(1, 'days').startOf('day').subtract(1, 'days').subtract(1, 'seconds').toDate();
    } else if (this.input.selectedDateOption == 'lw') {
      this.input.startDate = moment(this.todaysDate).weekday(-7).startOf('day').toDate();
      this.input.endDate = moment(this.todaysDate).startOf('week').subtract(1, 'seconds').toDate();
      // this.input.rangeDates = [this.input.startDate, this.input.endDate];
    } else if (this.input.selectedDateOption == 'tm') {
      this.input.startDate = moment(this.todaysDate).startOf('month').toDate();
      this.input.endDate = moment(this.todaysDate).subtract(1, 'days').toDate();
      // this.input.rangeDates = [this.input.startDate, this.input.endDate];
    } else if (this.input.selectedDateOption == 'lm') {
      this.input.startDate = moment(this.todaysDate).subtract(1, 'months').startOf('month').toDate();
      this.input.endDate = moment(this.todaysDate).subtract(1, 'months').endOf('month').toDate();
      // this.input.rangeDates = [this.input.startDate, this.input.endDate];
    } else {
      this.input.startDate = moment(this.todaysDate).startOf('month').toDate();
      this.input.endDate = moment(this.todaysDate).add(1, 'days').startOf('day').toDate();
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

  async onSearch(filterForm: NgForm) {
    this.input.isFilterFormSubmitted = true;
    if (filterForm.valid) {
      this.input.showData = false;
      this.input.isFilterFormSubmitted = false;
      let param: TripSummaryReportInputDc = {
        EndDate: moment(this.input.endDate).format("YYYY-MM-DD").toString(),
        StartDate: moment(this.input.startDate).format("YYYY-MM-DD").toString(),
        WarehouseId: this.input.selectedWarehouseId,
        DateRangeOption: this.input.selectedDateOption
      };
      console.log('param', param);
      this.summary = await this.deliveryOptimizationReportService.tripSummaryDashboardSummary(param).toPromise();
      this.pieOrderChart = this.getOrderChartData(this.summary);
      console.log('pieOrderChart', this.pieOrderChart);
      this.pieTripData = this.getTripChartData(this.summary);
      console.log('pieTripData', this.pieTripData);
      this.cost = await this.deliveryOptimizationReportService.tripSummaryDashboardCost(param).toPromise();

      this.lineChartData = await this.deliveryOptimizationReportService.tripSummaryDashboardLineChart(param).toPromise();
      console.log('this.summary', this.summary);
      console.log('this.cost', this.cost);
      console.log('this.lineChartData', this.lineChartData);
      this.input.showData = true;

      this.input.selectedChartOption =this.input.defaultChartOption; 
      this.showData(this.input.selectedChartOption);

    }
  }

  showData(chartOption: string) {
    this.input.selectedChartOption = chartOption;
    this.lineChartSelectedData = null;
    setTimeout(() => {
      if (this.lineChartData) {
        this.lineChartSelectedData = JSON.parse(JSON.stringify(this.lineChartData));
        this.lineChartSelectedData.datasets = this.lineChartSelectedData.datasets.filter(x => x.label == chartOption);
        this.lineChartSelectedData.datasets[0].backgroundColor= [
          "#FF6384",
        ],
        this.lineChartSelectedData.datasets[0].hoverBackgroundColor= [
          "#FF6384",
        ]
        this.ref.detectChanges();
      }
    }, 200);
  }


  private getOrderChartData(summary: any) {
    let data: any = null;
    if (summary) {
      data = {
        labels: ['Delivered', 'Delivery Cancel', 'Delivery Redispatch', 'Re-Attempt'],
        datasets: [
          {
            data: [
              // 10, 20, 0, 30
              summary.DeliveredCount,
              summary.DeliveryCancelCount,
              summary.DeliveryRedispatchCount,
              summary.ReAttemptCount
            ],
            backgroundColor: [
              "#00FF00", // green
              "#f00c0c", // red
              "#d6620f", // pink
              "#083178" //blue
            ],
            hoverBackgroundColor: [
              "#00FF00", // green
              "#f00c0c", // red
              "#d6620f", // pink
              "#083178" //blue
            ]
          }]
      };
    }
    return data;
  }

  private getTripChartData(summary: any) {
    let data: any = null;
    if (summary) {
      data = {
        labels: ['On-Time', 'Late', 'Very Late'],
        datasets: [
          {
            data: [
              // 10, 20, 30,
              summary.OnTime,
              summary.Late,
              summary.VeryLate
            ],
            backgroundColor: [
              "#00FF00", // green
              "#083178",//blue
              "#f00c0c", // red
            ],
            hoverBackgroundColor: [
              "#00FF00", // green
              "#083178", //blue
              "#f00c0c", // red
            ]
          }]
      };
    }
    return data;
  }



  private getDateOptionList(): SelectItem[] {
    let list: SelectItem[] = [
      { label: 'Today', value: 't' },
      { label: 'Yesterday', value: 'y' },
      { label: 'This Week', value: 'tw' },
      { label: 'Last Week', value: 'lw' },
      { label: 'This Month', value: 'tm' },
      { label: 'Last Month', value: 'lm' },
      { label: 'Custom', value: 'c' }
    ];
    return list;
  }

}


interface TripSummaryVM {
  selectedCityId: any;
  selectedWarehouseId: number;
  isFilterFormSubmitted: boolean;
  selectedDateOption: string;
  startDate: Date | null;
  endDate: Date | null;
  rangeDates: Date[];
  showData: boolean;
  selectedChartOption: string;
  defaultChartOption: string;
}