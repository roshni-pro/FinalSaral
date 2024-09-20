import { Component, OnInit } from '@angular/core';
import { LMDDashboardInput, LMDOverAllData } from 'app/operation-capacity/interface/lmdover-all-data';
import { LMDVehicle } from 'app/operation-capacity/interface/lmdvehicle';
import { LmdDashboardService } from 'app/operation-capacity/services/lmd-dashboard.service';
import { PlanMasterService } from 'app/operation-capacity/services/plan-master.service';
import { LoaderService } from 'app/shared/services/loader.service';
import { environment } from 'environments/environment';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-lmddashboard',
  templateUrl: './lmddashboard.component.html',
  styleUrls: ['./lmddashboard.component.scss']
})
export class LMDDashboardComponent implements OnInit {

  isCalculateOnOrderCount: boolean = true;
  isShowAnimation: boolean;
  warehouseList: SelectItem[];
  startdate: any = null;
  enddate: any = null;
  warehouseids: any;
  overallData: any;
  deliveryEfficienyData: any;

  overAllDataList: LMDOverAllData[];
  lmdVehicleList: LMDVehicle[];
  ftlData: any[];
  orderData: any;
  disciplinaryMatrixData: any;
  isTestingOnFrontend: boolean = false;

  isGlobal: boolean;

  stackedOptions = {
    tooltips: {
      mode: 'index',
      intersect: false
    },
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true,
      }],
      yAxes: [{
        stacked: true
      }]
    }
  };


  constructor(private loaderService: LoaderService, private planMasterService: PlanMasterService, private lmdDashboardService: LmdDashboardService) { }

  ngOnInit() {
    this.controlAnimation();
    this.getWareHouseList();
    // this.getOverallData();
  }

  getWareHouseList() {
debugger
    this.planMasterService.getWarehouseList().subscribe((res) => {
      this.warehouseList = res;
      console.log(' this.warehouseList:', this.warehouseList);
    })

  }

  exportVehicleReport() {
    console.log('warehouseids: ', this.warehouseids);
    console.log('startdate: ', this.startdate);
    console.log('enddate: ', this.enddate);

    let input = this.prepareAPIInput();
    console.log('input: ', input);

    this.loaderService.loading(true);
    this.lmdDashboardService.exportLMDDashboard(input).subscribe(x => {
      console.log('file is: ', x);
      this.loaderService.loading(false);
      if (x) {
        window.open(environment.apiURL + x);
      }
    });
  }

  getOverallData() {

    this.orderData = null;
    this.overallData = null;
    this.deliveryEfficienyData = null;
    if (this.isTestingOnFrontend) {
      this.overallData = {
        labels: ['Wh-indb-1', 'Wh-bpl-1', 'wh-agra-1', 'wh-mrt-1', 'wh-jpr-1', 'wh-gjbd-2', 'wh-lck-3'],
        datasets: [
          {
            label: 'Cost Efficiency',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: 'Order Efficiency',
            backgroundColor: '#9CCC65',
            borderColor: '#7CB342',
            data: [28, 48, 40, 19, 86, 27, 90]
          },
          {
            label: 'Overall Efficiency',
            backgroundColor: '#de3134',
            borderColor: '#de3134',
            data: [65, 21, 99, 12, 72, 89, 5]
          }
        ]
      }
    } else {
      let input = this.prepareAPIInput();
      console.log('input: ', input);
      this.loaderService.loading(true);
      this.lmdDashboardService.getListLMDChart(input).subscribe(x => {
        this.overAllDataList = x;
        this.loaderService.loading(false);
        console.log('overAllDataList: ', this.overAllDataList);
        if (this.overAllDataList && this.overAllDataList.length > 0) {
          this.overallData = {};
          this.overallData.labels = [];
          this.overallData.datasets = [];
          this.overallData.datasets[0] = {
            label: 'Cost Efficiency',
            backgroundColor: '#DFCF45',
            borderColor: '#1E88E5',
            data: []
          };
          this.overallData.datasets[1] = {
            label: 'Order Efficiency',
            backgroundColor: '#FEC652',
            borderColor: '#7CB342',
            data: []
          };
          this.overallData.datasets[2] = {
            label: 'Overall Efficiency',
            backgroundColor: '#FF9F92',
            borderColor: '#de3134',
            data: []
          };

          this.overAllDataList.forEach(x => {
            this.overallData.labels.push(x.HubName);
            this.overallData.datasets[0].data.push(x.UtilizationPercentageOnOrderValue);
            this.overallData.datasets[1].data.push(x.UtilizationPercentageOnOrderCount);
            this.overallData.datasets[2].data.push(x.OverallUtilizationPercentage);

          });

          this.generateDeliveryEfficienctStackedChart();
          this.getOrderData();
          this.getFTLData();
          this.getDesciplineChartData();
        }
      })
    }
  }

  generateDeliveryEfficienctStackedChart() {

    if (this.isTestingOnFrontend) {
      this.deliveryEfficienyData = {
        labels: ['Wh-indb-1', 'Wh-bpl-1', 'wh-agra-1', 'wh-mrt-1', 'wh-jpr-1', 'wh-gjbd-2', 'wh-lck-3'],
        datasets: [
          {
            type: 'bar',
            label: 'Delivered',
            backgroundColor: '#a3eb15',
            data: [65, 59, 80, 81, 56, 55, 40]
          },

          {
            type: 'bar',
            label: 'Reattempt',
            backgroundColor: '#f2f22e',
            data: [81, 55, 65, 59, 56, 80, 40]
          },
          {
            type: 'bar',
            label: 'Redispatch',
            backgroundColor: '#ffb514',
            data: [56, 80, 81, 40, 55, 65, 59]
          },
          {
            type: 'bar',
            label: 'Cancelled',
            backgroundColor: '#e62d20',
            data: [56, 55, 65, 59, 80, 81, 40]
          },
        ]
      };
    } else {
      this.deliveryEfficienyData = {
        labels: [],
        datasets: [{
          type: 'bar',
          label: 'Delivered',
          backgroundColor: '#a3eb15',
          data: []
        },
        {
          type: 'bar',
          label: 'Reattempt',
          backgroundColor: '#f2f22e',
          data: []
        },
        {
          type: 'bar',
          label: 'Redispatch',
          backgroundColor: '#ffb514',
          data: []
        },
        {
          type: 'bar',
          label: 'Cancelled',
          backgroundColor: '#e62d20',
          data: []
        }
        ]
      };

      this.overAllDataList.forEach(x => {
        this.deliveryEfficienyData.labels.push(x.HubName);
        this.deliveryEfficienyData.datasets[0].data.push(x.DeliverdCount);
        this.deliveryEfficienyData.datasets[1].data.push(x.ReattemptCount);
        this.deliveryEfficienyData.datasets[2].data.push(x.RedispatchCount);
        this.deliveryEfficienyData.datasets[3].data.push(x.DCCount);

      });
    }
  }

  getOrderData() {
    if (this.overAllDataList && this.overAllDataList.length > 0) {
      this.orderData = {};
      this.orderData.ThresholdCount = this.overAllDataList.reduce((partialSum, a) => { return partialSum + a.ThresholdOrderCount }, 0);
      this.orderData.ExecutedOrderCount = this.overAllDataList.reduce((partialSum, a) => { return partialSum + a.OrderCount }, 0);
      this.orderData.ExecutedOrderPercentage = this.orderData.ExecutedOrderCount / this.orderData.ThresholdCount * 100;
      this.orderData.DeliverdCount = this.overAllDataList.reduce((partialSum, a) => { return partialSum + a.DeliverdCount }, 0);
      this.orderData.DeliverPercentage = this.orderData.DeliverdCount / this.orderData.ExecutedOrderCount * 100;
      this.orderData.DCCount = this.overAllDataList.reduce((partialSum, a) => { return partialSum + a.DCCount }, 0);
      this.orderData.DCCountPercentage = this.orderData.DCCount / this.orderData.ExecutedOrderCount * 100;
      this.orderData.RedispatchCount = this.overAllDataList.reduce((partialSum, a) => { return partialSum + a.RedispatchCount }, 0);
      this.orderData.RedispatchCountPercentage = this.orderData.RedispatchCount / this.orderData.ExecutedOrderCount * 100;
      this.orderData.ReattemptCount = this.overAllDataList.reduce((partialSum, a) => { return partialSum + a.ReattemptCount }, 0);
      this.orderData.ReattemptCountPercentage = this.orderData.ReattemptCount / this.orderData.ExecutedOrderCount * 100;


      this.orderData.ThresholdAmount = this.overAllDataList.reduce((partialSum, a) => { return partialSum + a.ThresholdOrderAmount }, 0);
      this.orderData.ExecutedOrderAmount = this.overAllDataList.reduce((partialSum, a) => { return partialSum + a.OrderValue }, 0);
      this.orderData.ExecutedOrderOnAmountPercentage = this.orderData.ExecutedOrderAmount / this.orderData.ThresholdAmount * 100;
      this.orderData.DeliverdAmount = this.overAllDataList.reduce((partialSum, a) => { return partialSum + a.DeliverdValue }, 0);
      this.orderData.DeliverAmountPercentage = this.orderData.DeliverdAmount / this.orderData.ExecutedOrderAmount * 100;
      this.orderData.DCAmount = this.overAllDataList.reduce((partialSum, a) => { return partialSum + a.DCValue }, 0);
      this.orderData.DCAmountPercentage = this.orderData.DCAmount / this.orderData.ExecutedOrderAmount * 100;
      this.orderData.RedispatchAmount = this.overAllDataList.reduce((partialSum, a) => { return partialSum + a.RedispatchValue }, 0);
      this.orderData.RedispatchAmountPercentage = this.orderData.RedispatchAmount / this.orderData.ExecutedOrderAmount * 100;
      this.orderData.ReattemptAmount = this.overAllDataList.reduce((partialSum, a) => { return partialSum + a.ReattemptValue }, 0);
      this.orderData.ReattemptAmountPercentage = this.orderData.ReattemptAmount / this.orderData.ExecutedOrderAmount * 100;

    }
  }

  getListLMDDashboard() {
    let input = this.prepareAPIInput();
    console.log('input: ', input);
    this.lmdDashboardService.getListLMDDashboard(input).subscribe(x => {
      this.lmdVehicleList = x;
      console.log('this.lmdVehicleList: ', this.lmdVehicleList);
    });
  }

  exportOverAllData() {
    let input = this.prepareAPIInput();
    console.log('input: ', input);
    this.loaderService.loading(true);
    this.lmdDashboardService.exportLMDChart(input).subscribe(x => {
      this.loaderService.loading(false);
      if (x) {
        window.open(environment.apiURL + x);
      }
    });
  }


  getFTLData() {
    let input = this.prepareAPIInput();
    console.log('input: ', input);
    this.loaderService.loading(true);
    this.lmdDashboardService.getFTLData(input).subscribe(x => {
      this.loaderService.loading(false);
      console.log('getFTLData: ', x);
      this.ftlData = x;
    });
  }

  exportFTLData() {


    let input = this.prepareAPIInput();
    console.log('input: ', input);
    this.loaderService.loading(true);
    this.lmdDashboardService.exportFTLFullData(input).subscribe(x => {
      this.loaderService.loading(false);
      if (x) {
        window.open(environment.apiURL + x);
      }
    });
  }

  private prepareAPIInput(): LMDDashboardInput {
    let input: LMDDashboardInput = {
      enddate: this.enddate,
      startdate: this.startdate,
      warehouseId: this.warehouseids.map(x => {
        return x.value
      })
    };
    return input;
  }

  controlAnimation() {
    this.isShowAnimation = true;
    setTimeout(() => {
      this.isShowAnimation = false;
    }, 4000);
  }

  getDesciplineDataReport() {
    let input = this.prepareAPIInput();
    this.loaderService.loading(true);
    this.lmdDashboardService.getDesciplineDataReport(input).subscribe(x => {
      this.loaderService.loading(false);
      if (x) {
        window.open(environment.apiURL + x);
      } else {
        alert('No data found');
      }
    })
  }

  getDesciplineChartData() {
    let input = this.prepareAPIInput();
    this.loaderService.loading(true);
    this.lmdDashboardService.getDesciplineChartData(input).subscribe(x => {

      this.loaderService.loading(false);
      this.disciplinaryMatrixData = {
        labels: [],
        datasets: [
          {
            label: 'Total Vehicle Days',
            backgroundColor: '#42A5F5',
            data: []
          },
          {
            label: 'Descipline Vehicle Days',
            backgroundColor: '#FFA726',
            data: []
          }
        ]
      };

      if (x != null && x.length > 0) {
        x.forEach(e => {
          this.disciplinaryMatrixData.labels.push(e.HubName);
          this.disciplinaryMatrixData.datasets[0].data.push(e.TotalVehicleDays);
          this.disciplinaryMatrixData.datasets[1].data.push(e.DesciplineVehicleDays);
        })
      }

    });
  }


  showLoader(isShow: boolean, isGlobal: boolean) {

  }
  // new work end here



}
