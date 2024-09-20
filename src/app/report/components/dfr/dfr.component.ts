import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DfrCfrService } from 'app/report/services/dfr-cfr.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { DFRInterface } from 'app/report/interface/dfrDC';

const DEFAULT_COLORS = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
'#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
'#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
'#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC']

@Component({
  selector: 'app-dfr',
  templateUrl: './dfr.component.html',
  styleUrls: ['./dfr.component.scss']
})

export class DfrComponent implements OnInit {
  cities: any;
  todayData: any;
  monthData: any;
  monthsValue:any;
  monthValStatus:boolean;
  todayValStatus:boolean=true;
  monthVal:any;
  dataSource: any;
  optionsObject: any;
  getMonthStartDate:any;
  getMonthEndDate:any;
  warehouseListData:any;
  selectedwarehouse: any[] = [];
  wareIds:any[];
  buyerList:any[];
  selectedBuyers:any[] = [];
  buyerId:any[];
  DFRDashboardResult:any;
  DFRTableData:DFRInterface;
  DRFGraphData:any;
  DFRTotalGreen:any;
  DFRTotalRed:any;
  totalGreenCount : any[]=[];
  totalRedCount : any[]=[];
  BuyerName : any[];
  blocked : boolean = false;
  selectedGraphBuyers : any[]=[];
  selectedBuyerForGraph : any[]=[];

  constructor(private _service:DfrCfrService, private exportService : ExportServiceService) {}

  ngOnInit() {
      this.warehouseList();
  }

  chartDesign(graphDetails){
    // debugger;
    // this.BuyerName = this.DRFGraphData.BuyerName
    var pieData = this.DRFGraphData.map((proj) => proj.DemandData);
    var pieLabels = this.DRFGraphData.map((proj) => proj.BuyerName);
    var pieDFRPercent = this.DRFGraphData.map((proj) => proj.DFRPercent);
    var pieColors = this.configureDefaultColours(pieData);
    // this.optionsObject = {
    
    //   scales: {
    //     yAxes: [
    //       {
    //         display: true,
    //         scaleLabel: {
    //           show: false,
    //         },
    //         ticks: {
    //           beginAtZero: true,
    //           max: 100,
    //           min: 20,
    //           stepSize: 20,
    //           callback: (label) => {
    //             return label  = label + '%';
    //           }
    //         }
    //       }
    //     ],
    //   }
    // };
  debugger;
    this.todayData = {
      labels:  pieData,
      datasets: [
          {
              label: '',
              backgroundColor: pieColors,
              borderColor: '#1E88E5',
              data: pieDFRPercent
          },
          // {
          //     label: 'My Second dataset',
          //     backgroundColor: '#FFA726',
          //     data: [28, 48, 40, 22, 86, 27, 90, 40, 70, 33, 66 , 77]
          // }
      ]
  };
  
  // this.monthData = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec'],
  //   datasets: [
  //       {
  //           label: 'First Dataset',
  //           data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56],
  //           fill: false,
  //           borderColor: '#42A5F5',
  //           tension: .4
  //       },
  //       {
  //           label: 'Second Dataset',
  //           data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86],
  //           fill: false,
  //           borderColor: '#FFA726',
  //           tension: .4
  //       }         
  //   ]
  // };
  }

  getTodayVal(){
    this.monthVal = '';
    this.todayValStatus = true;
    this.monthValStatus = false;
  }

  getMonthVal(event){
    // this.monthVal = event.value.code;
    // if(this.monthVal){
    //   this.todayValStatus = false;
    //   this.monthValStatus = true;
    // }
  }

  warehouseList(){
    this.blocked = true;
    this._service.getWarehouseList().subscribe(res => {
      console.log(res);
      this.blocked = false;
      this.warehouseListData = res;
    })
  }

  getWarehouseList(warehouse){  
    if (warehouse && warehouse.length > 0) {
      this.wareIds = warehouse.map(function (elem) {
        return elem.WarehouseId ? elem.WarehouseId : elem
      });

      const payload = {
        'warehouseids' : this.wareIds
      }
      this.blocked = true;
      this._service.getBuyerListFromWarehouseId(payload).subscribe(result => {
        console.log('buyerList', result);
        this.blocked = false;
        this.buyerList = result;
      });
    }else{
      this.selectedBuyers = [];
      this.buyerList = [];
      this.DFRTableData = null;
    }
   }

   getbuyerList(buyers){
     this.selectedGraphBuyers = buyers;
     this.selectedBuyerForGraph = buyers;
    this.buyerId = [];
    debugger;
    if(buyers && buyers.length > 0){
      this.buyerId = buyers.map(function (a) {
        return a.BuyerId ? a.BuyerId : a
      })
      this.getSearchRecord();
    }else{
      this.selectedGraphBuyers = [];
      this.selectedBuyerForGraph = [];
      this.DFRTableData = null;
      this.DFRTotalGreen = 0;
      this.DFRTotalRed = 0;
      this.DRFGraphData = null;
    }
    
   }
   getGraphBuyerList(selectedBuyerForGraph){
    this.buyerId = [];
    debugger;
    this.selectedBuyers = selectedBuyerForGraph;
    if(selectedBuyerForGraph && selectedBuyerForGraph.length > 0){
      this.buyerId = selectedBuyerForGraph.map(function (a) {
        return a.BuyerId ? a.BuyerId : a
      })
      this.getSearchRecord();
    }else{
      this.DFRTableData = null;
      this.DFRTotalGreen = 0;
      this.DFRTotalRed = 0;
      this.DRFGraphData = null;
    }
    
   }


  getSearchRecord(){
    var startDate = this.monthsValue;
    console.log(startDate);
    this.getMonthStartDate = this.monthsValue ? moment(this.monthsValue).format('MM/DD/YYYY') : '';
    console.log(this.getMonthStartDate);
    var lastDay = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    this.getMonthEndDate = lastDay ? moment(lastDay).format('MM/DD/YYYY') : '';
    
    const payload = {
      'warehouseIds' : this.wareIds,
      'buyerIds' : this.buyerId,
      'StartDate' : this.getMonthStartDate,
      'EndDate' : this.getMonthEndDate,
    }

    //console.log(payload);
    if((this.selectedwarehouse && this.selectedwarehouse.length > 0) && (this.selectedBuyers && this.selectedBuyers.length > 0)){
    this.blocked =true;
    this._service.getDFRDashboardTableData(payload).subscribe(res => {
      console.log(res);
      this.totalGreenCount = [];
      this.totalRedCount = [];
      this.DFRDashboardResult = res;
      this.DFRTableData = this.DFRDashboardResult.DFRDashboardDataDcs;
      this.DRFGraphData = this.DFRDashboardResult.DFRDashboardGraphDcs;
      this.DFRTotalGreen = this.DFRDashboardResult.TotalGreen;
      this.DFRTotalRed = this.DFRDashboardResult.TotalRed;
      this.DFRDashboardResult.DFRDashboardDataDcs.forEach(element => {
        // debugger;
        if(element.status =='Green'){
          this.totalGreenCount.push(element);
        }else if(element.status == 'Red'){
          this.totalRedCount.push(element);
        }
      // debugger;
       this.DRFGraphData.forEach(element => {
         element.DemandData = element.BuyerName + ' ' + '(DemandDay : ' + element.DemandDay + ')';
       }); 
      this.chartDesign(this.DRFGraphData);

      });
      this.blocked = false;
    })
    }else{
      if(this.selectedwarehouse && this.selectedwarehouse.length == 0){
        alert('Select Warehouse!');
      }else{
        alert('Select Buyers!');
      }     
      this.DFRTableData = null;
      this.DFRTotalGreen = 0;
      this.DFRTotalRed = 0;
      this.DRFGraphData = null;
    }
  }

  result:any
  exportDownload(){
    // alert('Data not found');
    this.result = this.DFRTableData
    if(this.result && this.result.length > 0)
    {
      this.result.forEach(element => {
        element.DemandDate = moment(element.DemandDate).format('MM/DD/YYYY HH:mm:ss')
      });
      this.exportService.exportAsExcelFile(this.result, 'DFR-Download');
    }else{
      alert('No Data Found!');
    }   
  }
  private configureDefaultColours(data: number[]): string[] {
    let customColours = []
    if (data.length) {
    customColours = data.map((element, idx) => {
        return DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
    });
    }
    return customColours;
}

}




  
