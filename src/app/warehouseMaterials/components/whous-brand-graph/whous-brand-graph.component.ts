import { BaseChartDirective } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { WarehousematerialsserviceService } from './../../services/warehousematerialsservice.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-whous-brand-graph',
  templateUrl: './whous-brand-graph.component.html',
  styleUrls: ['./whous-brand-graph.component.scss']
})
export class WhousBrandGraphComponent implements OnInit {
  @ViewChild('chart', { static: true }) chart: BaseChartDirective;

  @ViewChild('ctrl', { static: true }) ctrl: any;
  warehouselist = [];
  currwarehouse: any;
  graphData: any = {};
  initial = false;
  count = 1;
  unmountedgraphData: any = {};
  unmountedbrandlist = [];
  whouseId = null;
  blocked = false;
  barChartData = [


    {
      data: [], callback: function (value, index, values) {
        return value;
      }, label: 'Capacity'
    },
    {
      data: [],
      callback: function (value, index, values) {
        return value;
      },
      label: 'Consume Capacity'
    }
  ];

  labels = [];
  searchVal = '';
  public options = {
  };
  currentIndex: any;
  buyerId: any;
  forIndexArr: any;

  constructor(private whouseservice: WarehouseService, private warehousematerialservice: WarehousematerialsserviceService,
    private messageService: MessageService, private r: ActivatedRoute, private WarehouseService: WarehouseService
  ) { }

  ngOnInit() {
    this.blocked = true;


    if (this.r.params) {
      this.r.params.subscribe(param => {
        if (param.warehouseId) {
          this.whouseId = Number(param.warehouseId);

          this.blocked = true;
          this.getwarehouseList();
          this.setWarehouse(this.whouseId, this.ctrl.nativeElement);

        }
        else {

          this.getwarehouseList();

          // this.getwarehouseList();

        }
      }
      );
    }
    else {

      this.getwarehouseList();


    }
  }

  getwarehouseList() {

    // this.warehousematerialservice.GetWareHouseBrand()
    //   .subscribe(result => {
    //     this.blocked = false;

    //     this.warehouselist = result.WarehouseWareHouseDc;

    //   });

    this.WarehouseService.getSpecificWarehouses()
      .subscribe(result => {
        this.blocked = false;

        this.warehouselist = result;
        this.warehouselist.sort((a, b) => {
          return a.WarehouseId - b.WarehouseId;
        });
        
      });


  }

  setWarehouse(whId, ctrl?) {
    this.blocked = true;

    ctrl.blur();
    this.barChartData = [


      {
        data: [],
        callback: function (value, index, values) {
          return value;
        }, label: 'Capacity'
      },
      {
        data: [],
        callback: function (value, index, values) {
          return value;
        }, label: 'Consume Capacity'
      }
    ];

    this.labels = [];

    this.options = {


      events: ['click'],
      scales: {
        // type: 'logarithmic',
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'warehouse capacity-9'
          },
          ticks: {
            beginAtZero: true,
            max: 0,
            min: 0,
            stepSize: 1000,
            // Create scientific notation labels
            callback: function (value, index, values) {
              return 'Rs.  ' + value + '/-';;
            }
          }
        }],
        xAxes: [{
          categoryPercentage: 1.0,
          barPercentage: 0.6
        }]
      }
    };

    // this.warehousematerialservice.GetWareHouseBrandCapacity(whId)
    this.warehousematerialservice.GetWareHouseBrandCapacityV2(whId)
      .subscribe(result => {
        // this.getwarehouseList();

        this.blocked = false;

        if (result.WarehouseCapacity != 0) {
          
          this.graphData = result;
          this.unmountedgraphData = result;
          this.unmountedbrandlist = result.BuyerwiseCapacity
          this.searchVal = '';
          let BrandCapacity = this.graphData.BuyerwiseCapacity.sort(function (a, b) {

            return - (a.Capacity - b.Capacity);
          });

          // BrandCapacity.sort(function (a, b) {

          //   return - (a.Capacity - b.Capacity);
          // });
          BrandCapacity = BrandCapacity.filter(wh => BrandCapacity.indexOf(wh) >= 0 && BrandCapacity.indexOf(wh) < 6);
          this.forIndexArr = BrandCapacity;


          let firstInput = true;





          BrandCapacity.forEach(data => {



            console.log(data.Capacity);

            if (firstInput == true) {
              this.barChartData[0].data.push(this.graphData.WarehouseCapacity);

              this.barChartData[1].data.push(this.graphData.WarehouseConsumeCapacity);
              this.labels.push(this.graphData.WarehouseName);
              firstInput = false;
            }
            this.barChartData[0].data.push(data.Capacity);
            this.barChartData[1].data.push(data.ConsumeCapacity);
            this.labels.push(['']);
          });

          // this.barChartData = [
          //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Capacity' },
          //   { data: [28, 48, 40, 19, 86, 26, 90], label: 'Consume Capacity' }
          // ];

          // this.labels = ['2006, 3333', '2006 , 3333', '2008 , 3333', '2009 , 3333', '206 , 3333', '2011 , 3333', '206 , 3333'];


          let maxFindArray = [];
          this.unmountedbrandlist.filter(item => {
            maxFindArray.push(item.Capacity);
            maxFindArray.push(item.ConsumeCapacity);
            maxFindArray.push(this.graphData.WarehouseCapacity);
            maxFindArray.push(this.graphData.WarehouseConsumeCapacity);
          }
          );

          
          let maxVal = Math.max(...maxFindArray);
          
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
                  // max: result.WarehouseCapacity * 1.025,
                  max: Math.floor(maxVal * 1.025),
                  min: 0,
                  //stepSize: 1000000,
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

        }
        else {

          this.blocked = false;

          this.messageService.add({ severity: 'error', summary: 'Warehouse Capacity unavailable', detail: ' Pls select another warehouse' });

        }
      });

  }



  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(e: KeyboardEvent): void {
    if (e.keyCode == 37) {
      if (this.count - 1 != 0) {
        this.barChartData = [


          {
            data: [],
            callback: function (value, index, values) {

              return value;
            }, label: 'Capacity'
          },
          {
            data: [],
            callback: function (value, index, values) {

              return value;
            }, label: 'Consume Capacity'
          }
        ];

        this.labels = [];
        let maxFindArray = [];
        this.unmountedbrandlist.filter(item => {
          maxFindArray.push(item.Capacity);
          maxFindArray.push(item.ConsumeCapacity);
          maxFindArray.push(this.graphData.WarehouseCapacity);
          maxFindArray.push(this.graphData.WarehouseConsumeCapacity);
        }
        );

        
        let maxVal = Math.max(...maxFindArray);
        
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
                // max: result.WarehouseCapacity * 1.025,
                max: Math.floor(maxVal * 1.025),
                min: 0,
                // Create scientific notation labels
                callback: function (value, index, values) {
                  return 'Rs.  ' + value + '/-';;
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

        let BrandCapacity = this.graphData.BuyerwiseCapacity;
        BrandCapacity = BrandCapacity.filter(wh => BrandCapacity.indexOf(wh) >= ((6 * this.count) - 6) && BrandCapacity.indexOf(wh) < 6 * this.count);
        this.forIndexArr = BrandCapacity;
        let firstInput = true;



        BrandCapacity.forEach(data => {

          if (firstInput == true) {
            this.barChartData[0].data.push(this.graphData.WarehouseCapacity);
            this.barChartData[1].data.push(this.graphData.WarehouseConsumeCapacity);
            this.labels.push(this.graphData.WarehouseName);
            firstInput = false;
          }
          this.barChartData[0].data.push(data.Capacity);
          this.barChartData[1].data.push(data.ConsumeCapacity);
          this.labels.push(['']);
        });
      }
    }
    if (e.keyCode == 39) {

      this.barChartData = [


        {
          data: [], callback: function (value, index, values) {

            return value;
          }, label: 'Capacity'
        },
        {
          data: [], callback: function (value, index, values) {

            return value;
          }, label: 'Consume Capacity'
        }
      ];

      this.labels = [];
      let maxFindArray = [];
      this.unmountedbrandlist.filter(item => {
        maxFindArray.push(item.Capacity);
        maxFindArray.push(item.ConsumeCapacity);
        maxFindArray.push(this.graphData.WarehouseCapacity);
        maxFindArray.push(this.graphData.WarehouseConsumeCapacity);
      }
      );

      
      let maxVal = Math.max(...maxFindArray);
      
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
              // max: result.WarehouseCapacity * 1.025,
              max: Math.floor(maxVal * 1.025),
              min: 0,
              // Create scientific notation labels
              callback: function (value, index, values) {
                return 'Rs.  ' + value + '/-';;
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
      let BrandCapacity = this.graphData.BuyerwiseCapacity;
      BrandCapacity = BrandCapacity.filter(wh => BrandCapacity.indexOf(wh) >= ((6 * this.count) - 6) && BrandCapacity.indexOf(wh) < 6 * this.count);
      this.forIndexArr = BrandCapacity;

      if (BrandCapacity.length == 0) {
        // this.count = this.count - 1;
        this.navigate(37);

      }

      let firstInput = true;

      BrandCapacity.forEach(data => {

        if (firstInput == true) {
          this.barChartData[0].data.push(this.graphData.WarehouseCapacity);
          this.barChartData[1].data.push(this.graphData.WarehouseConsumeCapacity);
          this.labels.push(this.graphData.WarehouseName);
          firstInput = false;
        }
        this.barChartData[0].data.push(data.Capacity);
        this.barChartData[1].data.push(data.ConsumeCapacity);
        this.labels.push(['']);
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
            }, label: 'Capacity'
          },
          {
            data: [], callback: function (value, index, values) {

              return value;
            }, label: 'Consume Capacity'
          }
        ];

        this.labels = [];
        let maxFindArray = [];
        this.unmountedbrandlist.filter(item => {
          maxFindArray.push(item.Capacity);
          maxFindArray.push(item.ConsumeCapacity);
          maxFindArray.push(this.graphData.WarehouseCapacity);
          maxFindArray.push(this.graphData.WarehouseConsumeCapacity);
        }
        );

        
        let maxVal = Math.max(...maxFindArray);
        
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
                // max: result.WarehouseCapacity * 1.025,
                max: Math.floor(maxVal * 1.025),
                min: 0,
                // Create scientific notation labels
                callback: function (value, index, values) {
                  return 'Rs.  ' + value + '/-';;
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

        let BrandCapacity = this.graphData.BuyerwiseCapacity;
        BrandCapacity = BrandCapacity.filter(wh => BrandCapacity.indexOf(wh) >= ((6 * this.count) - 6) && BrandCapacity.indexOf(wh) < 6 * this.count);
        this.forIndexArr = BrandCapacity;

        let firstInput = true;

        BrandCapacity.forEach(data => {

          if (firstInput == true) {
            this.barChartData[0].data.push(this.graphData.WarehouseCapacity);
            this.barChartData[1].data.push(this.graphData.WarehouseConsumeCapacity);
            this.labels.push(this.graphData.WarehouseName);
            firstInput = false;
          }
          this.barChartData[0].data.push(data.Capacity);
          this.barChartData[1].data.push(data.ConsumeCapacity);
          this.labels.push(['']);
        });
      }
    }
    if (e == 39) {

      this.barChartData = [
        {
          data: [], callback: function (value, index, values) {

            return value;
          }, label: 'Capacity'
        },
        {
          data: [], callback: function (value, index, values) {

            return value;
          }, label: 'Consume Capacity'
        }
      ];

      this.labels = [];
      let maxFindArray = [];
      this.unmountedbrandlist.filter(item => {
        maxFindArray.push(item.Capacity);
        maxFindArray.push(item.ConsumeCapacity);
        maxFindArray.push(this.graphData.WarehouseCapacity);
        maxFindArray.push(this.graphData.WarehouseConsumeCapacity);
      }
      );

      
      let maxVal = Math.max(...maxFindArray);
      
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
              // max: result.WarehouseCapacity * 1.025,
              max: Math.floor(maxVal * 1.025),
              min: 0,
              // Create scientific notation labels
              callback: function (value, index, values) {
                return 'Rs.  ' + value + '/-';;
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
      let BrandCapacity = this.graphData.BuyerwiseCapacity;
      BrandCapacity = BrandCapacity.filter(wh => BrandCapacity.indexOf(wh) >= ((6 * this.count) - 6) && BrandCapacity.indexOf(wh) < 6 * this.count);
      this.forIndexArr = BrandCapacity;

      if (BrandCapacity.length == 0) {
        // this.count = this.count - 1;
        this.navigate(37);

      }

      let firstInput = true;

      BrandCapacity.forEach(data => {

        if (firstInput == true) {
          this.barChartData[0].data.push(this.graphData.WarehouseCapacity);
          this.barChartData[1].data.push(this.graphData.WarehouseConsumeCapacity);
          this.labels.push(this.graphData.WarehouseName);
          firstInput = false;
        }
        this.barChartData[0].data.push(data.Capacity);
        this.barChartData[1].data.push(data.ConsumeCapacity);
        this.labels.push(['']);
      });
    }
  }


  searchMenuItems(textValue) {
    textValue = textValue.toLowerCase();
    let filteredList = [];


    filteredList = Object.assign([], this.unmountedbrandlist).filter(
      item => item.BuyerName != null && item.BuyerName.toLowerCase().indexOf(textValue.toLowerCase()) > -1
        || item.BuyerName != null && item.BuyerName.toLowerCase().indexOf(textValue.toLowerCase()) > -1
      // && item.WareHouseId == this.whouseId
    )

    if (filteredList.length) {

      this.graphData.BuyerwiseCapacity = filteredList;
    }
    else {
      if (textValue == '') {
        this.graphData.BuyerwiseCapacity = this.unmountedbrandlist;
      }
      else {
        this.graphData.BuyerwiseCapacity = []
      }
    }
    this.barChartData = [


      {
        data: [],
        callback: function (value, index, values) {

          return value;
        }, label: 'Capacity'
      },
      {
        data: [],
        callback: function (value, index, values) {

          return value;
        }, label: 'Consume Capacity'
      }
    ];

    this.labels = [];
    let maxFindArray = [];
    this.unmountedbrandlist.filter(item => {
      maxFindArray.push(item.Capacity);
      maxFindArray.push(item.ConsumeCapacity);
      maxFindArray.push(this.graphData.WarehouseCapacity);
      maxFindArray.push(this.graphData.WarehouseConsumeCapacity);
    }
    );

    
    let maxVal = Math.max(...maxFindArray);
    
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
            // max: result.WarehouseCapacity * 1.025,
            max: Math.floor(maxVal * 1.025),
            min: 0,
            // Create scientific notation labels
            callback: function (value, index, values) {
              return 'Rs.  ' + value + '/-';;
            }
          }
        }],
        xAxes: [{
          categoryPercentage: 1.0,
          barPercentage: 0.6
        }]
      }
    };


    let BrandCapacity = this.graphData.BuyerwiseCapacity;
    BrandCapacity = BrandCapacity.filter(wh => BrandCapacity.indexOf(wh) >= 0 && BrandCapacity.indexOf(wh) < 6);
    this.forIndexArr = BrandCapacity;


    let firstInput = true;

    BrandCapacity.forEach(data => {

      if (firstInput == true) {
        this.barChartData[0].data.push(this.graphData.WarehouseCapacity);
        this.barChartData[1].data.push(this.graphData.WarehouseConsumeCapacity);
        this.labels.push(this.graphData.WarehouseName);
        firstInput = false;
      }
      this.barChartData[0].data.push(data.Capacity);
      this.barChartData[1].data.push(data.ConsumeCapacity);
      this.labels.push(['']);
    });



    let maxFindArr = [];
    this.unmountedbrandlist.filter(item => {
      maxFindArr.push(item.Capacity);
      maxFindArr.push(item.ConsumeCapacity);
      maxFindArr.push(this.graphData.WarehouseCapacity);
      maxFindArr.push(this.graphData.WarehouseConsumeCapacity);
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
            // max: result.WarehouseCapacity * 1.025,
            max: Math.floor(maxVl * 1.025),
            min: 0,
            // Create scientific notation labels
            callback: function (value, index, values) {
              // return value + '%';
              return 'Rs.  ' + value + '/-';;

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



  openSubGraph(evt, graph) {

    let ctx = graph.getContext("2d");
    // from the endPoint we get the end of the bars area
    let that = this;

  }

  subGraphDisplay(i) {
    this.buyerId = this.forIndexArr[i].BuyerId;
  }


}
