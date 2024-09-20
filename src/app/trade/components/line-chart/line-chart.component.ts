import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ItemTrendsService } from 'app/shared/services/item-trends.service';
import { environment } from 'environments/environment';
import { TradeitemmasterService } from 'app/shared/services/tradeitemmaster.service';

declare var d3: any;
declare var $: any;

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  options: any;
  data: any;
  //inputModel: any;

  connection: any;
  proxy: any;
  connectionData: any;
  selectedItem:any;
  itemTypeList:any[];
  itemList:any;
  inputModel: any = {
    ItemId: null,
    ItemSearch:null,
    ItemName:null
  };
  @ViewChild('nvd3', null) nvd3;
  constructor(private itemTrendsService: ItemTrendsService, private ref: ChangeDetectorRef, private tradeitemmasterservice:TradeitemmasterService) { }

  ngOnInit() {
    this.options = {
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
    this.inputModel = {};
    // this.inputModel.ItemId = 1276;
    this.inputModel.StartDate = new Date();
    this.inputModel.StartDate = new Date(this.inputModel.StartDate.setHours(0, 0, 0, 0));
    this.inputModel.EndDate = new Date();

    this.getData();

    var sin = [], sin2 = [],
      cos = [];

    for (var i = 0; i < 100; i++) {
      sin.push({ x: i, y: Math.sin(i / 10) });
      sin2.push({ x: i, y: i % 10 == 5 ? null : Math.sin(i / 10) * 0.25 + 0.5 });
      cos.push({ x: i, y: .5 * Math.cos(i / 10 + 2) + Math.random() / 10 });
    }


    
    // this.tradeitemmasterservice.itemsearch(this.inputModel).subscribe(result => {
    //   this.itemTypeList = result;
    //   console.log('ItemSearch: ', this.inputModel);
    // });


  }

  onItemTypeChange(){
    this.inputModel.Id =  null;
    this.selectedItem = null;
  }

  onSelectItem() {
    this.inputModel.ItemId = this.selectedItem.ItemId;
    console.log(this.inputModel);
  }

  getItemList(event) {
    console.log(event.query)
    if (event.query.length > 2) {
      this.tradeitemmasterservice.itemsearch(event.query)
        .subscribe(result => {
          this.itemList = result;
          console.log('this.itemList :', this.itemList);
        });
    }

  }
  

  getData() {

    this.itemTrendsService.companyChartData(this.inputModel).subscribe(result => {
      console.log('result is: ', result);
      let priceData = [];
      let volumeData = [];
      if (result && result.length > 0) {
        result.forEach(item => {
          let priceItem = { y: item.Price, x: +new Date(item.TradeDate) }
          priceData.push(priceItem);

          let volumeItem = { y: item.Volume, x: +new Date(item.TradeDate) }
          volumeData.push(volumeItem);
        });
      }

      this.data = [{
        values: priceData,
        key: 'Price',
        color: '#2ca02c'
      },
      {
        values: volumeData,
        key: 'Volume',
        color: '#7777ff'
      }];
      console.log('this.data: ', this.data);

      this.initializeSignalRConnection();

    });


    // this.itemTrendsService.itemsearch(this.inputModel).subscribe(result => {
    //   this.inputModel = result;
     
    //   // console.log('GetByID: ', this.accountgroupService);
    //   console.log('ItemSearch: ', this.inputModel);
    // })

  }


  public initializeSignalRConnection(): void {

    let signalRServerEndPoint = environment.tradeapiURL + '/signalr';
    this.connection = $.hubConnection(signalRServerEndPoint);
    this.proxy = this.connection.createHubProxy('priceticker');

    this.proxy.on('itemFeed', (serverMessage) => this.onMessageReceived(serverMessage));

    // this.ref.detectChanges();
    this.connection.start().done((data: any) => {
      console.log('data is : ', data);
      this.connectionData = data;

      let subscriptions = {
        "connectionId": this.connectionData.id,
        "itemIds": [1276]
      }

      console.log('JSON.stringify(subscriptions): ', JSON.stringify(subscriptions));
      this.proxy.invoke('subscribeFeed', JSON.stringify(subscriptions)).done(d => {
        console.log('connected', d);

        this.ref.detectChanges();

      }).catch((error: any) => {
        console.log('broadcastMessage error -> ' + error);
      });

      // this.broadcastMessage();
    }).catch((error: any) => {

      console.log('Notification Hub error -> ' + error);
    });
  }

  onMessageReceived(serverMessage) {
    let price = { y: serverMessage.CurrentPrice, x: +new Date(serverMessage.TradeDate) }
    let volume = { y: serverMessage.Volume, x: +new Date(serverMessage.TradeDate) }
    this.data[0].values.push(price);
    this.data[1].values.push(volume);
    // this.ref.detectChanges();
    this.nvd3.ngNvD3.chart.update();
  }

}





