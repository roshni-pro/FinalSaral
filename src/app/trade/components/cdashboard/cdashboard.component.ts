import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { BidService } from 'app/shared/services/bid.service';
import { PaginatorViewModel } from 'app/shared/interface/paginator-view-model';
import { ItemTrendsService } from 'app/shared/services/item-trends.service';
import { ConfigService } from 'app/shared/services/config.service';
import { TradeOrdersService } from 'app/shared/services/trade-orders.service';
import { Router } from '@angular/router';

declare var d3: any;

@Component({
  selector: 'app-cdashboard',
  templateUrl: './cdashboard.component.html',
  styleUrls: ['./cdashboard.component.scss']
})
export class CDashboardComponent implements OnInit {

  paginatorViewModel: PaginatorViewModel;
  totalRecords: number;
  rows: number;
  isLoading: boolean;
  StartDate: Date;
  EndDate: Date;

  demandList: any[];
  demandCustomerList: any[];
  demandOptions: any;
  demandData: any;

  stockList: any[];
  stockCustomerList: any[];
  stockOptions: any;
  stockData: any;

  orderList: any[];
  orderCustomerList: any[];
  orderOptions: any;
  orderData: any;

  @ViewChild('toggleIcon', { static: false }) toggleIcon: ElementRef;
  public config: any = {};
  expanded: boolean;
  nav_collapsed_open = false;

  constructor(private bidService: BidService,
    private itemTrendsService: ItemTrendsService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private configService: ConfigService,
    private tradeOrdersService: TradeOrdersService,
    private router: Router) { }

  ngOnInit() {
    var todayDate = new Date();
    this.StartDate = new Date(todayDate.setHours(0, 0, 0, 0));
    this.EndDate = new Date();

    this.rows = 25;
    this.paginatorViewModel = {
      Keyword: '',
      Skip: 0,
      Take: this.rows
    };



    this.setDemandOptions();
    this.setStockOptions();
    this.setorderOptions();

    this.getAllData();
  }


  getAllData() {
    let inputModel: any = {

    }
    inputModel.StartDate = this.StartDate;
    inputModel.EndDate = this.EndDate;

//     localStorage.StartDate = this.StartDate;
// localStorage.EndDate = this.EndDate;
// this.StartDate = Date.parse(localStorage.StartDate); // parse to date object
// this.EndDate = Date.parse(localStorage.EndDate);


// var StartDate = <StartDate>
// var EndDate = <EndDate>
localStorage.setItem('StartDate', this.StartDate.toString())
localStorage.setItem('EndDate', this.EndDate.toString())

var StartDate = new Date(localStorage.getItem('StartDate'));
var EndDate = new Date(localStorage.getItem('EndDate'));
// var diff = StartDate - EndDate


    inputModel.BidType = 'buy';
    this.getDemandData(inputModel);


    inputModel.BidType = 'sell';
    this.getStockData(inputModel);

    inputModel.Skip = 0;
    inputModel.Take = 10000;
    this.topTopOrdersTradeItems(inputModel);
    this.getOrderData(inputModel);

    inputModel.BidType = 'buy';
    this.GetDemandOrStockCustomer(inputModel, 'buy');

    this.bidService.getDemandOrStockItems(inputModel).subscribe(result => {
      this.demandList = result;
      console.log('this.demandList : ', this.demandList);
      //this.totalRecords = result.Count;
      this.isLoading = false;
    });

    inputModel.BidType = 'sell';
    this.bidService.getDemandOrStockItems(inputModel).subscribe(result => {
      this.stockList = result;
      console.log('this.stockList : ', this.stockList);
      //this.totalRecords = result.Count;
      this.isLoading = false;
    });
    this.GetDemandOrStockCustomer(inputModel, 'sell');

  }

  ngAfterViewInit() {
  }

  setDemandOptions() {
    this.demandOptions = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function (d) { return d.x; },
        y: function (d) { return d.y; },
        useInteractiveGuideline: true,
        dispatch: {
          stateChange: function (e) { console.log("stateChange"); },
          changeState: function (e) { console.log("changeState"); },
          tooltipShow: function (e) { console.log("tooltipShow"); },
          tooltipHide: function (e) { console.log("tooltipHide"); }
        },
        xAxis: {
          axisLabel: 'Time',
          tickFormat: function (d) {
            return d3.time.format('%c')(new Date(d))
          },
          showMaxMin: false,
          staggerLabels: true
        },
        yAxis: {
          axisLabel: 'Price',
          tickFormat: function (d) {
            return d3.format('.02f')(d);
          },

        },
        callback: function (chart) {
          console.log("!!! lineChart callback !!!");
        },
        zoom: {
          enabled: true,
          scaleExtent: [1, 10],
          useFixedDomain: false,
          useNiceScale: false,
          horizontalOff: false,
          verticalOff: true,
          unzoomEventType: 'dblclick.zoom'
        }

      },
      title: {
        enable: true,
        text: 'Title for Line Chart'
      },
      subtitle: {
        enable: true,
        text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
        css: {
          'text-align': 'center',
          'margin': '10px 13px 0px 7px'
        }
      },
      caption: {
        enable: true,
        html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
        css: {
          'text-align': 'justify',
          'margin': '10px 13px 0px 7px'
        }
      }
    }
  }

  setStockOptions() {
    this.stockOptions = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function (d) { return d.x; },
        y: function (d) { return d.y; },
        useInteractiveGuideline: true,
        dispatch: {
          stateChange: function (e) { console.log("stateChange"); },
          changeState: function (e) { console.log("changeState"); },
          tooltipShow: function (e) { console.log("tooltipShow"); },
          tooltipHide: function (e) { console.log("tooltipHide"); }
        },
        xAxis: {
          axisLabel: 'Time',
          tickFormat: function (d) {
            return d3.time.format('%c')(new Date(d))
          },
          showMaxMin: false,
          staggerLabels: true
        },
        yAxis: {
          axisLabel: 'Price',
          tickFormat: function (d) {
            return d3.format('.02f')(d);
          },

        },
        callback: function (chart) {
          console.log("!!! lineChart callback !!!");
        },
        zoom: {
          enabled: true,
          scaleExtent: [1, 10],
          useFixedDomain: false,
          useNiceScale: false,
          horizontalOff: false,
          verticalOff: true,
          unzoomEventType: 'dblclick.zoom'
        }

      },
      title: {
        enable: true,
        text: 'Title for Line Chart'
      },
      subtitle: {
        enable: true,
        text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
        css: {
          'text-align': 'center',
          'margin': '10px 13px 0px 7px'
        }
      },
      caption: {
        enable: true,
        html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
        css: {
          'text-align': 'justify',
          'margin': '10px 13px 0px 7px'
        }
      }
    }
  }

  getDemandData(inputModel) {

    this.bidService.getDemandOrStockSummary(inputModel).subscribe(result => {
      console.log('result is: ', result);
      let priceData = [];
      let volumeData = [];
      if (result && result.length > 0) {
        result.forEach(item => {
          let priceItem = { y: item.Price, x: +new Date(item.Date) }
          priceData.push(priceItem);

          let volumeItem = { y: item.Volume, x: +new Date(item.Date) }
          volumeData.push(volumeItem);
        });
      }

      this.demandData = [{
        values: priceData,
        key: 'Price',
        color: '#2ca02c'
      },
      {
        values: volumeData,
        key: 'Volume',
        color: '#7777ff'
      }];


    });
  }

  getStockData(inputModel) {

    this.bidService.getDemandOrStockSummary(inputModel).subscribe(result => {
      console.log('result is: ', result);
      let priceData = [];
      let volumeData = [];
      if (result && result.length > 0) {
        result.forEach(item => {
          let priceItem = { y: item.Price, x: +new Date(item.Date) }
          priceData.push(priceItem);

          let volumeItem = { y: item.Volume, x: +new Date(item.Date) }
          volumeData.push(volumeItem);
        });
      }

      this.stockData = [{
        values: priceData,
        key: 'Price',
        color: '#2ca02c'
      },
      {
        values: volumeData,
        key: 'Volume',
        color: '#7777ff'
      }];


    });
  }

  topTopOrdersTradeItems(input) {

    this.tradeOrdersService.topTopOrdersTradeItems(input).subscribe(result => {

      this.orderList = result;
    });
  }
 
  setorderOptions() {
    this.orderOptions = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function (d) { return d.x; },
        y: function (d) { return d.y; },
        useInteractiveGuideline: true,
        dispatch: {
          stateChange: function (e) { console.log("stateChange"); },
          changeState: function (e) { console.log("changeState"); },
          tooltipShow: function (e) { console.log("tooltipShow"); },
          tooltipHide: function (e) { console.log("tooltipHide"); }
        },
        xAxis: {
          axisLabel: 'Time',
          tickFormat: function (d) {
            return d3.time.format('%c')(new Date(d))
          },
          showMaxMin: false,
          staggerLabels: true
        },
        yAxis: {
          axisLabel: 'Price',
          tickFormat: function (d) {
            return d3.format('.02f')(d);
          },

        },
        callback: function (chart) {
          console.log("!!! lineChart callback !!!");
        },
        zoom: {
          enabled: true,
          scaleExtent: [1, 10],
          useFixedDomain: false,
          useNiceScale: false,
          horizontalOff: false,
          verticalOff: true,
          unzoomEventType: 'dblclick.zoom'
        }

      },
      title: {
        enable: true,
        text: 'Title for Line Chart'
      },
      subtitle: {
        enable: true,
        text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
        css: {
          'text-align': 'center',
          'margin': '10px 13px 0px 7px'
        }
      },
      caption: {
        enable: true,
        html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
        css: {
          'text-align': 'justify',
          'margin': '10px 13px 0px 7px'
        }
      }
    }
  }

  getOrderData(input) {

    this.tradeOrdersService.topOrderSummary(input).subscribe(result => {

      console.log('topOrderSummary is: ', result);
      let priceData = [];
      let volumeData = [];
      if (result && result.length > 0) {
        result.forEach(item => {
          let priceItem = { y: item.Price, x: +new Date(item.Date) }
          priceData.push(priceItem);

          let volumeItem = { y: item.Volume, x: +new Date(item.Date) }
          volumeData.push(volumeItem);
        });
      }

      this.orderData = [{
        values: priceData,
        key: 'Price',
        color: '#2ca02c'
      },
      {
        values: volumeData,
        key: 'Volume',
        color: '#7777ff'
      }];


    });


  }

  getAllDemand(){
    this.router.navigateByUrl("layout/company-dashboard/demanditem");
  }

  
  getAllCustomer(){
    this.router.navigateByUrl("layout/company-dashboard/demandcustomer");
  }

  goToItem(item) {
   this.router.navigateByUrl('/layout/trade/item/' + item.ItemId + '/' + item.ItemName);
   // this.router.navigateByUrl('/layout/company-dashboard/customer/' + item.CustomerId + '/' + item.CustomerName);
     // this.router.navigateByUrl('/layout/company-dashboard/item');
    console.log('demand is: ', item);
  }

  goToCustomer(item) {
   this.router.navigateByUrl('/layout/trade/customer/' + item.CustomerId + '/' + item.CustomerName);
    console.log('demand is: ', item);
  }

  GetDemandOrStockCustomer(input, bidType) {
    this.bidService.GetDemandOrStockCustomer(input).subscribe(x => {
      if (bidType == 'buy') {
        this.demandCustomerList = x;
      } else if (bidType == 'sell') {
        this.stockCustomerList = x;
      }
      console.log('result Customer list: ', x);
    });
  }

}
