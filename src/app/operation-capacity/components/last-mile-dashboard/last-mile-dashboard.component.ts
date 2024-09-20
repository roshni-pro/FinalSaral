import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DeliveyMappingService } from 'app/operation-capacity/services/delivey-mapping.service';
import { SelectItem } from 'primeng/api';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { DeliveryOptimizationReportService } from 'app/operation-capacity/services/delivery-optimization-report.service';
import { TripSummaryReportInputDc } from 'app/operation-capacity/interface/trip-summary-report-input-dc';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { DeliveryDashboardService } from 'app/operation-capacity/services/delivery-dashboard.service';
import { LmdDashboardPart1InputDc } from 'app/operation-capacity/interface/lmd-dashboard-part1-input-dc';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-last-mile-dashboard',
  templateUrl: './last-mile-dashboard.component.html',
  styleUrls: ['./last-mile-dashboard.component.scss']
})
export class LastMileDashboardComponent implements OnInit {
  cityList: SelectItem[];
  warehouseList: SelectItem[];
  dateOptionList: SelectItem[];
  summary: any = null;
  cost: any;
  input: TripSummaryVM;
  public pieOrderChart: any;
  public touchPointUtilizationChart: any;
  public valueUtilizationChart: any;
  public pieTripData: any;
  public lineChartData: any;
  public lineChartSelectedData: any;
  chartOptions = {
    responsive: false
  };
  selectedWarehouse : any;
  selectedTransporter : any;
  wids : any[]=[];
  transporterList : any;
  lmdDashboardPart1InputDc :LmdDashboardPart1InputDc;
  utilizationDC : any;
  vehicleCountDC : any;
  blocked : boolean = false;
  isLineChart : boolean = false;
  
  constructor(private ref: ChangeDetectorRef, private deliveyMappingService: DeliveyMappingService, private deliveryOptimizationReportService: DeliveryOptimizationReportService,
    private warehouseService : WarehouseService,private _deliveryDashboardService :  DeliveryDashboardService) { }

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
    this.onChangeDateOption();
    this.getWarehouseList();
  }

  getWarehouseList()
  {
    this.blocked = true;
    this.warehouseService.getSpecificWarehouses().subscribe(x=>
      {
        this.blocked = false;
        this.warehouseList = x;
      })
  }

  onChangeWarehouse()
  {
    this.wids = [];
    this.selectedWarehouse.forEach(element => {
      this.wids.push(element.WarehouseId);
    });
    this.blocked = true;
    this._deliveryDashboardService.LMDTransporterGet(this.wids).subscribe(x=>
      {
        this.blocked = false;
        this.transporterList = x;
        this.selectedTransporter = x;
      })
  }

  todaysDate = new Date();
  async onChangeDateOption() {
   // debugger;
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
      // debugger; 
      this.input.startDate = moment(this.todaysDate).startOf('month').toDate();
      // this.input.endDate = moment(this.todaysDate).endOf('month').toDate();
      this.input.endDate = moment(this.todaysDate).startOf('day').subtract(1, 'seconds').toDate();
      // debugger;
      // this.input.endDate = moment(this.todaysDate).subtract(1, 'days').toDate();
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

  onSearch(filterForm: NgForm)
  {
    if (filterForm.valid) {
      let transporterNames = [];
      if(this.selectedTransporter && this.selectedTransporter.length > 0)
      {
        this.selectedTransporter.forEach(element => {
          transporterNames.push(element.Name);
        });
      }     
      if(this.input.selectedDateOption=='c')
      {
        this.setDate();
      }
      this.lmdDashboardPart1InputDc = {
        WarehouseId : this.wids,
        TransporterNames : transporterNames,
        EndDate: moment(this.input.endDate).format("YYYY-MM-DD").toString(),
        StartDate: moment(this.input.startDate).format("YYYY-MM-DD").toString(),
        DateRangeOption: this.input.selectedDateOption,
        LabelName  : ''
      }
      this.input.showData = false;
      this.blocked = true;
      this.isLineChart = false;
      this._deliveryDashboardService.LMDDashboardPart1(this.lmdDashboardPart1InputDc).subscribe(x=>
        {
          console.log('part1',x);
          // this.blocked = false;
          if(x.length > 0)
          {
            this.summary = x[0];
            debugger;
          }
          // this.blocked = true;
          this._deliveryDashboardService.LMDDashboardPart2(this.lmdDashboardPart1InputDc).subscribe(x=>
            {
              console.log('part2',x);
              if(x.length > 0)
              {
                this.cost = x[0];
              }              
              this._deliveryDashboardService.LMDDashboardPart3(this.lmdDashboardPart1InputDc).subscribe(x=>
                {
                  console.log('utilizationDC',x);
                  this.utilizationDC = x;
                  // this.blocked = false;
                  this._deliveryDashboardService.LMDDashboardPart4(this.lmdDashboardPart1InputDc).subscribe(x=>
                    {
                      console.log('vehicleCountDC',x);
                      // this.blocked = false;
                      this.vehicleCountDC = x;
                      this.pieOrderChart = this.getOrderChartData(this.summary);
                      this.touchPointUtilizationChart = this.getVehicleUtilizationChartData(this.utilizationDC,'touchPoint');
                      this.valueUtilizationChart = this.getVehicleUtilizationChartData(this.utilizationDC,'value');
                      console.log('pieOrderChart', this.pieOrderChart);
                      console.log('touchPointUtilizationChart', this.touchPointUtilizationChart);
                      console.log('valueUtilizationChart', this.valueUtilizationChart);
                      this.pieTripData = this.getTripChartData(this.summary);
                      console.log('pieTripData', this.pieTripData);
                            let param: LmdDashboardPart1InputDc = {
                              EndDate: moment(this.input.endDate).format("YYYY-MM-DD").toString(),
                              StartDate: moment(this.input.startDate).format("YYYY-MM-DD").toString(),
                              WarehouseId: this.wids,
                              DateRangeOption: this.input.selectedDateOption,
                              TransporterNames : transporterNames,
                              LabelName : ''
                            };
                            
                      this._deliveryDashboardService.LMDChart(param).subscribe(x=>
                        {
                          this.lineChartData =  x;
                          this.blocked = false;
                          console.log('lineChartData',this.lineChartData);
                          // debugger;
                          console.log('this.summary', this.summary);
                      console.log('this.cost', this.cost);
                      this.input.showData = true;
                      this.showData(this.input.selectedChartOption);
                        });
                    })
                })
              // this.blocked = false;
            })
            // this.blocked = true;
          
              // this.blocked = true;
   
            
        })
       
    }else{
        alert('Please Select Warehouse!');
    }
  }
  showData(chartOption: string) {
    this.input.selectedChartOption = chartOption;
    this.lineChartSelectedData = null;
    setTimeout(() => {
      if (this.lineChartData) {
        debugger;
        this.lineChartSelectedData = JSON.parse(JSON.stringify(this.lineChartData));
        this.lineChartSelectedData.datasets = this.lineChartSelectedData.datasets.filter(x => x.label == chartOption);
        if(this.lineChartSelectedData.datasets.length > 0)
        {
          this.isLineChart = true;
        // this.lineChartSelectedData.datasets[0].backgroundColor= [
        //   "#FF6384",
        // ],
        this.lineChartSelectedData.datasets[0].hoverBackgroundColor= [
          "#FF6384",
          ],
          this.lineChartSelectedData.datasets[0].fill= false,
          this.lineChartSelectedData.datasets[0].borderColor= "#8A3324"
        }
        this.ref.detectChanges();
      }
    }, 200);
  }
  private getOrderChartData(summary: any) {
    let data: any = null;
    if (summary) {
      data = {
        labels: ['Delivered', 'Delivery Cancel', 'Delivery Redispatch', 'Delivery Re-Attempt'],
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
              // "#00FF00", // green
              // "#f00c0c", // red
              // "#d6620f", // pink
              // "#083178" //blue
              "#50C878",// "#000000",//Black,
              "#C21A09",//"#98AFC7",//bluegray
              // "#AAF0D1",//Magic Mint
              "#8A2BE2",
              // "#EBE8FC",
              
              "#BDEDFF"//Robin Egg Blue
            ],
            hoverBackgroundColor: [
              // "#00FF00", // green
              // "#f00c0c", // red
              // "#d6620f", // pink
              // "#083178" //blue
              "#50C878",//"#000000",//Black,
              
              "#C21A09",// "#98AFC7",//bluegray
              // "#EBE8FC",
              "#8A2BE2",
              // "#AAF0D1",//Magic Mint
              
              "#BDEDFF"//Robin Egg Blue
            ]
          }]
      };
    }
    return data;
  }
  private getVehicleUtilizationChartData(utilizationDC: any,input : any) {
    let data: any = null;
    debugger
    if (utilizationDC.UtilizedPercentageByTouchPoints > 0 && input == 'touchPoint') {
      var remainingTouchPoint = utilizationDC.UtilizedPercentageByTouchPoints <= 100 ? (100-utilizationDC.UtilizedPercentageByTouchPoints) : 0;
      data = {
        // labels: ['TouchPoint',''],
        datasets: [
          {
            data: [
              utilizationDC.UtilizedPercentageByTouchPoints <= 100 ? (Number(utilizationDC.UtilizedPercentageByTouchPoints).toFixed(2)) : 100,
              Number(remainingTouchPoint).toFixed(2)
            ],
            backgroundColor: [
              "#50C878",//"#50C878",//"#000000",//Black,
              "#C21A09"// "#BDEDFF"
            ],
            hoverBackgroundColor: [
              "#50C878",//"#50C878",//"#000000",//Black,
              "#C21A09"// "#BDEDFF"
            ]
          }]
      };
    }else if(utilizationDC.UtilizedPercentageByAmount > 0 && input == 'value')
    {
      var valueUtilization = utilizationDC.UtilizedPercentageByAmount <= 100 ? (100-utilizationDC.UtilizedPercentageByAmount) : 0;
      data = {
        // labels: ['Value',''],
        datasets: [
          {
            data: [
              utilizationDC.UtilizedPercentageByAmount <= 100 ? (Number(utilizationDC.UtilizedPercentageByAmount).toFixed(2)) : 100,
              Number(valueUtilization).toFixed(2)
            ],
            backgroundColor: [
              "#50C878",//"#8A2BE2",//Black,
              "#C21A09"// "#C21A09"// "#000000"
            ],
            hoverBackgroundColor: [
              "#50C878",// "#8A2BE2",//Black,
              "#C21A09"// "#C21A09"// "#000000"
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
        labels: ['On-Time', 'Delayed Late', 'Very Late'],
        datasets: [
          {
            data: [
              // 10, 20, 30,
              summary.OnTime,
              summary.Late,
              summary.VeryLate
            ],
            backgroundColor: [
              // "#00FF00", // green
              // "#083178",//blue
              // "#f00c0c", // red
              // "#98AFC7",//bluegray
              "#000000",//Black,
              "#98AFC7",
              // "#EBE8FC",//Magic Mint
              
              "#BDEDFF"//Robin Egg Blue
            ],
            hoverBackgroundColor: [
              // "#00FF00", // green
              // "#083178", //blue
              // "#f00c0c", // red
              // "#98AFC7",//bluegray
              "#000000",//Black,
              "#98AFC7",
              // "#AAF0D1",//Magic Mint
              
              "#BDEDFF"//Robin Egg Blue
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

  onExportSummary(filterForm : NgForm)
  {
    if (filterForm.valid) {
    let transporterNames = [];
    this.selectedTransporter.forEach(element => {
      transporterNames.push(element.Name);
    });
    this.lmdDashboardPart1InputDc = {
      WarehouseId : this.wids,
      TransporterNames : transporterNames,
      EndDate: moment(this.input.endDate).format("YYYY-MM-DD").toString(),
      StartDate: moment(this.input.startDate).format("YYYY-MM-DD").toString(),
      DateRangeOption: this.input.selectedDateOption,
      LabelName  : ''
    }
    this.blocked = true;
    this._deliveryDashboardService.LMDDashboardExportSummary(this.lmdDashboardPart1InputDc).subscribe(x=>
      {
        this.blocked = false;
        if(x != null)
        {
          window.open(environment.apiURL + x);
        }else{
          alert("Data is not found!!");
        }
      })
    }
    else{
      alert('Please Select Warehouse!');
  }
  }

  onExportOrder(filterForm : NgForm)
  {
   
    if (filterForm.valid) {
      let transporterNames = [];
      this.selectedTransporter.forEach(element => {
        transporterNames.push(element.Name);
      });
      this.lmdDashboardPart1InputDc = {
        WarehouseId : this.wids,
        TransporterNames : transporterNames,
        EndDate: moment(this.input.endDate).format("YYYY-MM-DD").toString(),
        StartDate: moment(this.input.startDate).format("YYYY-MM-DD").toString(),
        DateRangeOption: this.input.selectedDateOption,
        LabelName  : ''
      }
      this.blocked = true;
    this._deliveryDashboardService.LMDDashboardExportOrder(this.lmdDashboardPart1InputDc).subscribe(x=>
      {
        this.blocked = false;
        if(x != null)
        {
          window.open(environment.apiURL + x);
        }else{
          alert("Data is not found!!");
        }
      })
    }
    else{
      alert('Please Select Warehouse!');
  
  }
}


  onExport(filterForm : NgForm)
  {
    if(filterForm.valid) {
    let transporterNames = [];
    this.selectedTransporter.forEach(element => {
      transporterNames.push(element.Name);
    });
    this.lmdDashboardPart1InputDc = {
      WarehouseId : this.wids,
      TransporterNames : transporterNames,
      EndDate: moment(this.input.endDate).format("YYYY-MM-DD").toString(),
      StartDate: moment(this.input.startDate).format("YYYY-MM-DD").toString(),
      DateRangeOption: this.input.selectedDateOption,
      LabelName  : ''
    }
    this.blocked = true;
    this._deliveryDashboardService.LMDDashboardExportAll(this.lmdDashboardPart1InputDc).subscribe(x=>
      {
        this.blocked = false;
        if(x != null)
        {
          window.open(environment.apiURL + x);
        }else{
          alert("Data is not found!!");
        }
      })
    }
    else{
      alert('Please Select Warehouse!');
  }
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