import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'app/dashboard/services/dashboard.service';
import { LoaderService } from 'app/shared/services/loader.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  monthSales: any={
    'TSale':0,
    'DTSale':0,
    'DSKTSale':0,
    'MSale':0,
    'DMSale':0,
    'DSKMSale':0
  }
  
  warehouseList: any;
  WarehouseId: any;
  fillRate: number;
  currentDate: any;
  blocked: boolean;
  storeMonthSales: any;
  totalSale : any
  totalDispatchValue :any
  monthSalesValue :any;
  monthDispatchValue :any;

  //misc var
  currentMonth: any;

  // Graph variables
  graphTodaySale: any;
  graphMonthlySale: any;
  TodaySaleValue: any[];

  constructor(private dashboardService: DashboardService, private whService: WarehouseService,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.currentDate = new Date();
    // console.log(this.currentDate);
    // this.currentMonth = this.currentDate.toString().split(' ', 2);
    // this.currentMonth = this.currentMonth[1];
    //console.log("month", this.currentMonth);

    this.WarehouseId = '';
    this.blocked = true;
    this.whService.getWarehouseCommon().subscribe(wh => {
      this.warehouseList = wh;
      this.blocked = false;
    })
    // this.blocked = true;
    // this.dashboardService.monthSale().subscribe(x => {
    //   console.log('month sales', x);
    //   this.monthSales = x;
    //   this.blocked = false;
    //   // this.updateGraph(this.monthSales)
    // })
    this.onTabOpen();
    this.onChangeWarehouse(localStorage.getItem('Warehouseid'));
    // update graph function

  }

  // update graph function

  updateGraph() {
    //set today's sale value in graph
    // console.log("value", salesValue);
    console.log("tableData", this.storeMonthSales);

    //  let result = this.storeMonthSales.map(function(a){
    //   return a.Name+':'+a.TSale
    //  })
    //  console.log(result);

    if (this.storeMonthSales && this.storeMonthSales.length > 0) {

      this.graphTodaySale = {
        labels: [],
        datasets: [
          {
            label: `Today's sale`,
            backgroundColor: ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
              '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
              '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
              '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'],
            // borderColor: '#1E88E5',
            data: []
          },
        ]
      }

      this.graphMonthlySale = {
        labels: [],
        datasets: [
          {
            label: `Monthly's sale`,
            backgroundColor: ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
              '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
              '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
              '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'],
            // borderColor: '#1E88E5',
            data: []
          },
        ]
      }

      this.storeMonthSales.forEach(element => {
        // console.log(element);
        this.graphTodaySale.labels.push(element.Name);
        // this.graphTodaySale.datasets[0].backgroundColor = '#9CCC65';
        // this.graphTodaySale.datasets[0].borderColor = '#1E88E5';
        this.graphTodaySale.datasets[0].data.push(element.TSale);

        this.graphMonthlySale.labels.push(element.Name);
        // this.graphMonthlySale.datasets[0].backgroundColor = '#9CCC65';
        // this.graphMonthlySale.datasets[0].borderColor = '#1E88E5';
        this.graphMonthlySale.datasets[0].data.push(element.MSale);


        // this.graphMonthlySale.labels.push(element.Name);
        // // this.graphMonthlySale.datasets[0].backgroundColor = ['#42A5F5'];
        // this.graphMonthlySale.datasets[0].data.push(element.MSale);

      });

      console.log(this.graphTodaySale);


    }



    // this.graphTodaySale = {
    //   labels: ['CENTRAL', 'DIRECT', 'DIRECT+SK', 'FMCG', 'Safoya', 'KK QA', 'Mobile'],
    //   datasets: [
    //     {
    //       label: `Today's sale`,
    //       backgroundColor: ['#42A5F5', '#9CCC65', '#00ccff', '#969696', '#bfb600', '#bf0000'],
    //       borderColor: '#1E88E5',
    //       data: [salesValue.TSale.toFixed(2), salesValue.DTSale.toFixed(2), salesValue.DSKTSale.toFixed(2), this.storeMonthSales[0].TSale.toFixed(2), salesValue.TStore3.toFixed(2), this.storeMonthSales[2].TSale.toFixed(2), this.storeMonthSales[3].TSale.toFixed(2)]
    //     },
    //   ]
    // }


    //set monthly's sale value in graph
    // this.graphMonthlySale = {
    //   labels: ['CENTRAL', 'DIRECT', 'DIRECT+SK', 'FMCG', 'Safoya', 'KK QA', 'Mobile'],
    //   datasets: [
    //     {
    //       label: `Monthly sale`,
    //       backgroundColor: ['#42A5F5', '#9CCC65', '#00ccff', '#969696', '#bfb600', '#bf0000'],
    //       borderColor: '#1E88E5',
    //       data: [salesValue.MSale.toFixed(2), salesValue.DMSale.toFixed(2), salesValue.DSKMSale.toFixed(2), this.storeMonthSales[0].MSale.toFixed(2), salesValue.MStore3.toFixed(2), this.storeMonthSales[2].MSale.toFixed(2), this.storeMonthSales[3].MSale.toFixed(2)]
    //     },
    //   ]
    // }



  }

  onChangeWarehouse(WarehouseId) {
    this.blocked = true;
    this.dashboardService.fillrate(WarehouseId).subscribe(y => {
      console.log('fiterate', y);
      this.blocked = false;
      this.fillRate = y;
    })
  }
  onTabClose(event) {
    // this.messageService.add({severity:'info', summary:'Tab Closed', detail: 'Index: ' + event.index})
  }

  onTabOpen() {
    this.totalSale=0;
    this.totalDispatchValue=0;
    this.monthSalesValue=0;
    this.monthDispatchValue=0;
    this.blocked = true;
    this.dashboardService.storesMonthSales().subscribe(storemthSales => {
      console.log('store month sales', storemthSales);
      this.storeMonthSales = storemthSales;
      storemthSales.forEach(e=>{
        this.totalSale+=e.TSale
        this.totalDispatchValue+=e.TDispatchValues
        this.monthSalesValue+=e.MSale
        this.monthDispatchValue+=e.MDispatchValues

        this.monthSales.TSale+=e.TSale;
        this.monthSales.MSale+=e.MSale;
        this.monthSales.DTSale+=e.DTSale;
        this.monthSales.DMSale+=e.DMSale;
      })
      //this.monthSales.DTSale=0; this.monthSales.DMSale=0;
      this.monthSales.DSKTSale=this.monthSales.TSale + this.monthSales.DTSale;
      this.monthSales.DSKMSale=this.monthSales.MSale + this.monthSales.DMSale;
      console.log("this.monthSales.TSale",this.monthSales.TSale);
      
      this.blocked = false;
      this.updateGraph();
    })
    // this.messageService.add({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
  }

  onTabOpens(){
    this.storeMonthSales = undefined;      
    this.totalSale=undefined;
    this.totalDispatchValue=undefined;
    this.monthSalesValue=undefined;
    this.monthDispatchValue=undefined;
    this.monthSales.TSale=0;
    this.monthSales.MSale=0;
    this.monthSales.DTSale=0;
    this.monthSales.DMSale=0;      
    this.monthSales.DSKTSale=0;
    this.monthSales.DSKMSale=0;      
  	this.onTabOpen();
  }
}
