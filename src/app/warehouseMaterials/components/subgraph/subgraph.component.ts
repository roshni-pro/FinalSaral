import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { WarehousematerialsserviceService } from './../../services/warehousematerialsservice.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { Component, OnInit, HostListener, ViewChild, ElementRef, Input } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-subgraph',
  templateUrl: './subgraph.component.html',
  styleUrls: ['./subgraph.component.scss']
})
export class SubgraphComponent implements OnInit {


  @Input('whouseId') whouseId: any;
  @Input('buyerId') buyerId: any;
  @ViewChild('ctrl', { static: true }) ctrl: any;
  maxLimit = 0;
  warehouselist = [];
  currwarehouse: any;
  graphData: any = {};
  initial = false;
  count = 1;
  unmountedgraphData: any = {};
  unmountedbrandlist = [];
  blocked = false;
  barChartData = [


    {
      data: [], callback: function (value, index, values) {
        return value;
      }, label: 'Capacity',
      backgroundColor: "lightgreen",
      hoverBackgroundColor: "lightgreen",
    },
    {
      data: [],
      callback: function (value, index, values) {
        return value;
      },
      label: 'Consume Capacity',
      backgroundColor: "lightsalmon",
      hoverBackgroundColor: "lightsalmon",
    }
  ];

  labels = [];
  searchVal = '';
  public options = {

  };

  constructor(private whouseservice: WarehouseService, private warehousematerialservice: WarehousematerialsserviceService,
    private messageService: MessageService, private r: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {

    if (this.buyerId && this.buyerId! - 0) {
      this.getBrandsByBuyerId(this.buyerId, this.whouseId);
    }
  }

  getwarehouseList() {

    this.warehousematerialservice.GetWareHouseBrand()
      .subscribe(result => {
        this.blocked = false;

        this.warehouselist = result.WarehouseWareHouseDc;
        this.blocked = false;

      });
  }

  getBrandsByBuyerId(brandId, whouseId) {
    this.blocked = true;

    this.barChartData = [


      {
        data: [],
        callback: function (value, index, values) {
          return value;
        }, label: 'Capacity',
        backgroundColor: "lightgreen",
        hoverBackgroundColor: "lightgreen",
      },
      {
        data: [],
        callback: function (value, index, values) {
          return value;
        }, label: 'Consume Capacity',
        backgroundColor: "lightsalmon",
        hoverBackgroundColor: "lightsalmon",
      }
    ];

    this.labels = [];

    this.options = {

    };



    this.warehousematerialservice.GetBrandsByBuyerId(whouseId, brandId).subscribe(result => {

      this.blocked = false;


      this.graphData = { BrandCapacity: [] };
      this.graphData.BrandCapacity = result;
      this.unmountedgraphData = this.graphData;
      this.unmountedbrandlist = this.graphData.BrandCapacity
      this.searchVal = '';
      let BrandCapacity = this.graphData.BrandCapacity;
      let maxLimitArray = []
      BrandCapacity = BrandCapacity.filter(wh => BrandCapacity.indexOf(wh) >= 0 && BrandCapacity.indexOf(wh) < 7);


      let firstInput = true;

      this.unmountedbrandlist.forEach(item => {

        maxLimitArray.push(item.Capacity);
      });

      this.maxLimit = Math.max(...maxLimitArray);

      BrandCapacity.forEach(data => {


        this.barChartData[0].data.push(data.Capacity);
        this.barChartData[1].data.push(data.ConsumeCapacity);
        this.labels.push([data.SubsubcategoryName ? data.SubsubcategoryName : '']);
      });

      let maxFindArr = [];
      let brandCapacity = []
      this.unmountedbrandlist.filter(item => { brandCapacity.push(item.Capacity); });
      let consumedCapacity = []
      this.unmountedbrandlist.filter(item => { consumedCapacity.push(item.ConsumeCapacity); });

      maxFindArr = [];
      this.unmountedbrandlist.filter(item => {

        maxFindArr.push(item.Capacity);
        maxFindArr.push(item.ConsumeCapacity);
        maxFindArr.push(brandCapacity.reduce(function (a, b) { return a + b }))
        maxFindArr.push(consumedCapacity.reduce(function (a, b) { return a + b }))
      }
      );

      

      let maxVl = Math.max(...maxFindArr);

      this.options = {


        events: ['click'],
        scales: {
          yAxes: [{
            // type:'logarithmic',
            // scaleLabel: {
            //   display: true,
            //   labelString: 'warehouse capacity'
            // },
            ticks: {
              beginAtZero: true,
              // max: result.WarehouseCapacity * 1.2,
              max: Math.floor(maxVl * 1.2),
              min: 0,
              // Create scientific notation labels
              callback: function (value, index, values) {
                // return value + '%';
                return 'Rs.  ' + value + '/-';

              }
            }
          }],
          xAxes: [{
            categoryPercentage: 1.0,
            barPercentage: 0.6
          }]
        }
      };
      this.blocked = false;


      this.initial = true;


    });

  }



  @HostListener('document:keydown', ['$event'])
  handleKeyboardEventChild(e: KeyboardEvent): void {
    if (e.keyCode == 37) {
      if (this.count - 1 != 0) {
        this.barChartData = [


          {
            data: [],
            callback: function (value, index, values) {

              return value;
            }, label: 'Capacity',
            backgroundColor: "lightgreen",
            hoverBackgroundColor: "lightgreen",
          },
          {
            data: [],
            callback: function (value, index, values) {

              return value;
            }, label: 'Consume Capacity',
            backgroundColor: "lightsalmon",
            hoverBackgroundColor: "lightsalmon",
          }
        ];

        this.labels = [];

        let maxFindArr = [];
        let brandCapacity = []
        this.unmountedbrandlist.filter(item => { brandCapacity.push(item.Capacity); });
        let consumedCapacity = []
        this.unmountedbrandlist.filter(item => { consumedCapacity.push(item.ConsumeCapacity); });
  
        maxFindArr = [];
        this.unmountedbrandlist.filter(item => {
  
          maxFindArr.push(item.Capacity);
          maxFindArr.push(item.ConsumeCapacity);
          maxFindArr.push(brandCapacity.reduce(function (a, b) { return a + b }))
          maxFindArr.push(consumedCapacity.reduce(function (a, b) { return a + b }))
        }
        );


        let maxVl = Math.max(...maxFindArr);

        this.options = {


          events: ['click'],
          scales: {
            yAxes: [{
              // type:'logarithmic',
              // scaleLabel: {
              //   display: true,
              //   labelString: 'warehouse capacity'
              // },
              ticks: {
                beginAtZero: true,
                // max: result.WarehouseCapacity * 1.2,
                max: Math.floor(maxVl * 1.2),
                min: 0,
                // Create scientific notation labels
                callback: function (value, index, values) {
                                  return 'Rs.  ' + value + '/-';
;
                }
              }
            }],
            xAxes: [{
              categoryPercentage: 1.0,
              barPercentage: 0.6
            }]
          }
        };


        this.count = this.count - 1;

        let BrandCapacity = this.graphData.BrandCapacity;
        BrandCapacity = BrandCapacity.filter(wh => BrandCapacity.indexOf(wh) >= ((7 * this.count) - 7) && BrandCapacity.indexOf(wh) < 7 * this.count);
        let firstInput = true;

        BrandCapacity.forEach(data => {


          this.barChartData[0].data.push(data.Capacity);
          this.barChartData[1].data.push(data.ConsumeCapacity);
          this.labels.push([data.SubsubcategoryName ? data.SubsubcategoryName : '']);
        });
      }
    }
    if (e.keyCode == 39) {

      this.barChartData = [


        {
          data: [], callback: function (value, index, values) {

            return value;
          }, label: 'Capacity',
          backgroundColor: "lightgreen",
          hoverBackgroundColor: "lightgreen",
        },
        {
          data: [], callback: function (value, index, values) {

            return value;
          }, label: 'Consume Capacity',
          backgroundColor: "lightsalmon",
          hoverBackgroundColor: "lightsalmon",
        }
      ];

      this.labels = [];

      let maxFindArr = [];
      let brandCapacity = []
      this.unmountedbrandlist.filter(item => { brandCapacity.push(item.Capacity); });
      let consumedCapacity = []
      this.unmountedbrandlist.filter(item => { consumedCapacity.push(item.ConsumeCapacity); });

      maxFindArr = [];
      this.unmountedbrandlist.filter(item => {

        maxFindArr.push(item.Capacity);
        maxFindArr.push(item.ConsumeCapacity);
        maxFindArr.push(brandCapacity.reduce(function (a, b) { return a + b }))
        maxFindArr.push(consumedCapacity.reduce(function (a, b) { return a + b }))
      }
      );


      let maxVl = Math.max(...maxFindArr);

      this.options = {


        events: ['click'],
        scales: {
          yAxes: [{
            // type:'logarithmic',
            // scaleLabel: {
            //   display: true,
            //   labelString: 'warehouse capacity'
            // },
            ticks: {
              beginAtZero: true,
              // max: result.WarehouseCapacity * 1.2,
              max: Math.floor(maxVl * 1.2),
              min: 0,
              // Create scientific notation labels
              callback: function (value, index, values) {
                                return 'Rs.  ' + value + '/-';
;
              }
            }
          }],
          xAxes: [{
            categoryPercentage: 1.0,
            barPercentage: 0.6
          }]
        }
      };

      this.count = this.count + 1;
      let BrandCapacity = this.graphData.BrandCapacity;
      BrandCapacity = BrandCapacity.filter(wh => BrandCapacity.indexOf(wh) >= ((7 * this.count) - 7) && BrandCapacity.indexOf(wh) < 7 * this.count);

      if (BrandCapacity.length == 0) {
        // this.count = this.count - 1;
        this.navigate(37);

      }



      BrandCapacity.forEach(data => {


        this.barChartData[0].data.push(data.Capacity);
        this.barChartData[1].data.push(data.ConsumeCapacity);
        this.labels.push([data.SubsubcategoryName ? data.SubsubcategoryName : '']);
      });
    }



  }

  navigate(e): void {
    if (e == 37) {
      if (this.count - 1 != 0) {
        this.barChartData = [
          {
            data: [], callback: function (value, index, values) {

              return value;
            }, label: 'Capacity',
            backgroundColor: "lightgreen",
            hoverBackgroundColor: "lightgreen",
          },
          {
            data: [], callback: function (value, index, values) {

              return value;
            }, label: 'Consume Capacity',
            backgroundColor: "lightsalmon",
            hoverBackgroundColor: "lightsalmon",
          }
        ];

        this.labels = [];

        let maxFindArr = [];
        let brandCapacity = []
        this.unmountedbrandlist.filter(item => { brandCapacity.push(item.Capacity); });
        let consumedCapacity = []
        this.unmountedbrandlist.filter(item => { consumedCapacity.push(item.ConsumeCapacity); });
  
        maxFindArr = [];
        this.unmountedbrandlist.filter(item => {
  
          maxFindArr.push(item.Capacity);
          maxFindArr.push(item.ConsumeCapacity);
          maxFindArr.push(brandCapacity.reduce(function (a, b) { return a + b }))
          maxFindArr.push(consumedCapacity.reduce(function (a, b) { return a + b }))
        }
        );


        let maxVl = Math.max(...maxFindArr);

        this.options = {


          events: ['click'],
          scales: {
            yAxes: [{
              // type:'logarithmic',
              // scaleLabel: {
              //   display: true,
              //   labelString: 'warehouse capacity'
              // },
              ticks: {
                beginAtZero: true,
                // max: result.WarehouseCapacity * 1.2,
                max: Math.floor(maxVl * 1.2),
                min: 0,
                // Create scientific notation labels
                callback: function (value, index, values) {
                                  return 'Rs.  ' + value + '/-';
;
                }
              }
            }],
            xAxes: [{
              categoryPercentage: 1.0,
              barPercentage: 0.6
            }]
          }
        };


        this.count = this.count - 1;

        let BrandCapacity = this.graphData.BrandCapacity;

        BrandCapacity = BrandCapacity.filter(wh => BrandCapacity.indexOf(wh) >= ((7 * this.count) - 7) && BrandCapacity.indexOf(wh) < 7 * this.count);

        let firstInput = true;

        BrandCapacity.forEach(data => {


          this.barChartData[0].data.push(data.Capacity);
          this.barChartData[1].data.push(data.ConsumeCapacity);
          this.labels.push([data.SubsubcategoryName ? data.SubsubcategoryName : '']);
        });
      }
    }
    if (e == 39) {

      this.barChartData = [
        {
          data: [], callback: function (value, index, values) {

            return value;
          }, label: 'Capacity',
          backgroundColor: "lightgreen",
          hoverBackgroundColor: "lightgreen",
        },
        {
          data: [], callback: function (value, index, values) {

            return value;
          }, label: 'Consume Capacity'
          ,
          backgroundColor: "lightsalmon",
          hoverBackgroundColor: "lightsalmon",
        }
      ];

      this.labels = [];

      let maxFindArr = [];
      let brandCapacity = []
      this.unmountedbrandlist.filter(item => { brandCapacity.push(item.Capacity); });
      let consumedCapacity = []
      this.unmountedbrandlist.filter(item => { consumedCapacity.push(item.ConsumeCapacity); });

      maxFindArr = [];
      this.unmountedbrandlist.filter(item => {

        maxFindArr.push(item.Capacity);
        maxFindArr.push(item.ConsumeCapacity);
        maxFindArr.push(brandCapacity.reduce(function (a, b) { return a + b }))
        maxFindArr.push(consumedCapacity.reduce(function (a, b) { return a + b }))
      }
      );


      let maxVl = Math.max(...maxFindArr);

      this.options = {


        events: ['click'],
        scales: {
          yAxes: [{
            // type:'logarithmic',
            // scaleLabel: {
            //   display: true,
            //   labelString: 'warehouse capacity'
            // },
            ticks: {
              beginAtZero: true,
              // max: result.WarehouseCapacity * 1.2,
              max: Math.floor(maxVl * 1.2),
              min: 0,
              // Create scientific notation labels
              callback: function (value, index, values) {
                                return 'Rs.  ' + value + '/-';
;
              }
            }
          }],
          xAxes: [{
            categoryPercentage: 1.0,
            barPercentage: 0.6
          }]
        }
      };

      this.count = this.count + 1;
      let BrandCapacity = this.graphData.BrandCapacity;
      BrandCapacity = BrandCapacity.filter(wh => BrandCapacity.indexOf(wh) >= ((7 * this.count) - 7) && BrandCapacity.indexOf(wh) < 7 * this.count);

      if (BrandCapacity.length == 0) {
        // this.count = this.count - 1;
        this.navigate(37);

      }

      let firstInput = true;

      BrandCapacity.forEach(data => {


        this.barChartData[0].data.push(data.Capacity);
        this.barChartData[1].data.push(data.ConsumeCapacity);
        this.labels.push([data.SubsubcategoryName ? data.SubsubcategoryName : '']);
      });
    }
  }


  searchMenuItems(textValue) {
    textValue = textValue.toLowerCase();
    let filteredList = [];


    filteredList = Object.assign([], this.unmountedbrandlist).filter(
      item => item.SubsubcategoryName != null && item.SubsubcategoryName.toLowerCase().indexOf(textValue.toLowerCase()) > -1
        || item.BuyerName != null && item.BuyerName.toLowerCase().indexOf(textValue.toLowerCase()) > -1
      // && item.WareHouseId == this.whouseId
    )

    if (filteredList.length) {

      this.graphData.BrandCapacity = filteredList;
    }
    else {
      if (textValue == '') {
        this.graphData.BrandCapacity = this.unmountedbrandlist;
      }
      else {
        this.graphData.BrandCapacity = []
      }
    }
    this.barChartData = [


      {
        data: [],
        callback: function (value, index, values) {

          return value;
        }, label: 'Capacity',
        backgroundColor: "lightgreen",
        hoverBackgroundColor: "lightgreen",
      },
      {
        data: [],
        callback: function (value, index, values) {

          return value;
        }, label: 'Consume Capacity',
        backgroundColor: "lightsalmon",
        hoverBackgroundColor: "lightsalmon",

      }
    ];

    this.labels = [];

    let maxFindArr = [];
      let brandCapacity = []
      this.unmountedbrandlist.filter(item => { brandCapacity.push(item.Capacity); });
      let consumedCapacity = []
      this.unmountedbrandlist.filter(item => { consumedCapacity.push(item.ConsumeCapacity); });

      maxFindArr = [];
      this.unmountedbrandlist.filter(item => {

        maxFindArr.push(item.Capacity);
        maxFindArr.push(item.ConsumeCapacity);
        maxFindArr.push(brandCapacity.reduce(function (a, b) { return a + b }))
        maxFindArr.push(consumedCapacity.reduce(function (a, b) { return a + b }))
      }
      );


    let maxVl = Math.max(...maxFindArr);

    this.options = {


      events: ['click'],
      scales: {
        yAxes: [{
          // type:'logarithmic',
          // scaleLabel: {
          //   display: true,
          //   labelString: 'warehouse capacity'
          // },
          ticks: {
            beginAtZero: true,
            // max: result.WarehouseCapacity * 1.2,
            max: Math.floor(maxVl * 1.2),
            min: 0,
            // Create scientific notation labels
            callback: function (value, index, values) {
                              return 'Rs.  ' + value + '/-';
;
            }
          }
        }],
        xAxes: [{
          categoryPercentage: 1.0,
          barPercentage: 0.6
        }]
      }
    };


    let BrandCapacity = this.graphData.BrandCapacity;
    BrandCapacity = BrandCapacity.filter(wh => BrandCapacity.indexOf(wh) >= 0 && BrandCapacity.indexOf(wh) < 7);


    let firstInput = true;

    BrandCapacity.forEach(data => {


      this.barChartData[0].data.push(data.Capacity);
      this.barChartData[1].data.push(data.ConsumeCapacity);
      this.labels.push([data.SubsubcategoryName ? data.SubsubcategoryName : '']);
    });





     maxFindArr = [];
     brandCapacity = []
    this.unmountedbrandlist.filter(item => { brandCapacity.push(item.Capacity); });
     consumedCapacity = []
    this.unmountedbrandlist.filter(item => { consumedCapacity.push(item.ConsumeCapacity); });

    maxFindArr = [];
    this.unmountedbrandlist.filter(item => {

      maxFindArr.push(item.Capacity);
      maxFindArr.push(item.ConsumeCapacity);
      maxFindArr.push(brandCapacity.reduce(function (a, b) { return a + b }))
      maxFindArr.push(consumedCapacity.reduce(function (a, b) { return a + b }))
    }
    );


    maxVl = Math.max(...maxFindArr);

    this.options = {


      events: ['click'],
      scales: {
        yAxes: [{
          // type:'logarithmic',
          // scaleLabel: {
          //   display: true,
          //   labelString: 'warehouse capacity'
          // },
          ticks: {
            beginAtZero: true,
            // max: result.WarehouseCapacity * 1.2,
            max: Math.floor(maxVl * 1.2),
            min: 0,
            // Create scientific notation labels
            callback: function (value, index, values) {
              // return value + '%';
                              return 'Rs.  ' + value + '/-';
;

            }
          }
        }],
        xAxes: [{
          categoryPercentage: 1.0,
          barPercentage: 0.6
        }]
      }
    };

  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


}
