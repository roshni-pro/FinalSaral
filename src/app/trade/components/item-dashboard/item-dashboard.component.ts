import { Component, OnInit } from '@angular/core';
import { PaginatorViewModel } from 'app/shared/interface/paginator-view-model';
import { BidService } from 'app/shared/services/bid.service';
import { ItemTrendsService } from 'app/shared/services/item-trends.service';
import { ActivatedRoute } from "@angular/router";
import { TradeOrdersService } from 'app/shared/services/trade-orders.service';
declare var d3: any;


@Component({
  selector: 'app-item-dashboard',
  templateUrl: './item-dashboard.component.html',
  styleUrls: ['./item-dashboard.component.scss']
})
export class ItemDashboardComponent implements OnInit {
  paginatorViewModel: PaginatorViewModel;
  totalRecords: number;
  rows: number;
  isLoading: boolean;
  itemId: number;

  demandList: any[];
  demandOptions: any;
  demandData: any;

  stockList: any[];
  stockOptions: any;
  stockData: any;
  itemName = 'Parle 250g';

  
  orderList: any[];
  orderData: any;
  orderOptions: any;

  constructor(private bidService: BidService, 
    private itemTrendsService: ItemTrendsService,
    private tradeOrdersService: TradeOrdersService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.rows = 25;
    
    this.itemId = Number(this.route.snapshot.paramMap.get("itemid"));
    this.itemName = this.route.snapshot.paramMap.get("itemname");
    console.log('this.itemId: ', this.itemId);
    this.paginatorViewModel = {
      Keyword: '',
      Skip: 0,
      Take: this.rows
    };

    this.setDemandOptions();
    this.setStockOptions();
 this.setorderOptions();

    let inputModel: any = {
      
    }
    inputModel.StartDate = new Date();
    inputModel.StartDate = new Date(inputModel.StartDate.setHours(0, 0, 0, 0));
    inputModel.EndDate = new Date();
    inputModel.BidType = 'buy';
    inputModel.ItemId= this.itemId;
    this.getDemandData(inputModel);

       
    inputModel.Skip = 0;
    inputModel.Take = 10000;
    this.topTopOrdersTradeItems(inputModel);
    this.getOrderData(inputModel);
    
    
    inputModel.BidType = 'sell';
    inputModel.ItemId= this.itemId
    this.getStockData(inputModel);

    inputModel.BidType = 'buy';
    inputModel.ItemId= this.itemId;
    this.bidService.GetCustomerDemandOrStockForItem(inputModel).subscribe(result => {
      this.demandList = result;
      console.log('this.demandList : ', this.demandList);
      //this.totalRecords = result.Count;
      this.isLoading = false;
    });

    inputModel.BidType = 'sell';
    inputModel.ItemId= this.itemId;
    this.bidService.GetCustomerDemandOrStockForItem(inputModel).subscribe(result => {
      this.stockList = result;
      console.log('this.stockList : ', this.stockList);
      //this.totalRecords = result.Count;
      this.isLoading = false;
    });

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
    
    this.bidService.GetDemandOrStockItemSummary(inputModel).subscribe(result => {
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
      
      this.demandData =  [{
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





  getStockData(inputModel) {
    
    this.bidService.GetDemandOrStockItemSummary(inputModel).subscribe(result => {
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
      
      this.stockData =  [{
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

}
