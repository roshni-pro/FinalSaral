import { Component, OnInit } from '@angular/core';
import { HopService } from 'app/report/services/hop.service';
import * as moment from 'moment';
import { threadId } from 'worker_threads';


@Component({
  selector: 'app-hop-dahboard-summary',
  templateUrl: './hop-dahboard-summary.component.html',
  styleUrls: ['./hop-dahboard-summary.component.scss']
})
export class HopDahboardSummaryComponent implements OnInit {
  tabledata: any;
  tableArr = [];
  quarterTable: boolean;
  monthTable: boolean;
  getPlanType: string;
  getId: number;
  getType: number;
  planWarehouseData: any;
  typeVal: number = 1;
  planStoreData: any;
  planBrandData: any;
  monthlyQtrlyView: boolean;
  chipsArrBusiness: string[] = [];
  chipsArrWarehouse: string[] = [];
  chipsArrSales: string[] = [];
  chipsArrBrand: string[] = [];
  blocked: boolean = false;
  selectedList = [];
  planKpiName: string;
  planWhId: number;
  planWhName: any;
  planStoreId: number;
  planBusinessUnitName: any;
  planBrandName: any;
  curMonName: any;
  firstLastMonth: any;
  secondLastMonth: any;
  curMonNo: any;
  firstLastMonthNo: any;
  secondLastMonthNo: any;
  curYear: any;
  pureColumnsWarehouse: any[] = [];
  headerList: any[] = []

  pureColumnsStore: any[] = [];
  storeList: any[] = [];

  pureColumnsBrand: any[] = [];
  brandList: any[] = [];
  arr1w: any[] = [];
  arr2w: any[] = [];
  arr3w: any[] = [];
  arr1s: any[] = [];
  arr2s: any[] = [];
  arr3s: any[] = [];
  arr1b: any[] = [];
  arr2b: any[] = [];
  arr3b: any[] = [];
  arr1wMonth: number;
  arr2wMonth: any;
  newName: any;
  name: any;

  hopHeads: any;

  dropdownHeads: any[] = [];
  dropdownSubHeads: any[] = [];

  selectedPlanType: any;
  selectedHead: any;

  arr1: any[] = [];
  arr2: any[] = [];
  arr3: any[] = [];
  summaryRecord = [];
  headsDropdownVal = [];
  pureColumns = [];
  firstYear:any;
  secondYear:any;
  constructor(private _service: HopService) {
  }

  ngOnInit() {

    this.curMonName = moment().subtract(0, 'months').format('MMM');
    this.secondLastMonth = moment().subtract(2, 'months').format('MMM');
    this.firstLastMonth = moment().subtract(1, 'months').format('MMM');
    this.curYear = new Date().getFullYear().toString();

    this.curMonNo = moment().subtract(0, 'months').format('M');
    this.secondLastMonthNo = moment().subtract(2, 'months').format('M');
    this.firstLastMonthNo = moment().subtract(1, 'months').format('M');
    this.firstYear= ( moment().subtract(1, 'months').format('Y')).toString();
    this.secondYear= (moment().subtract(2, 'months').format('Y')).toString();

    this.PlanTableData()
    this.getWarehouseList();
    this.getStoreList();
    this.getBrandList();


  }


  PlanTableData() {

    this.tabledata = localStorage.getItem('hopSumry')
    this.tabledata = JSON.parse(this.tabledata)
    this.tableArr.push(this.tabledata);

    if (this.tableArr.length > 0) {
      this.getPlanType = this.tableArr[0].heading.replace("%20", " ");
      this.getId = this.tableArr[0].id || 0;
      this.getType = this.tableArr[0].type || 1;
      this.chipsArrSales.push(this.getPlanType)
      if (this.getType == 1) {
        this.monthlyQtrlyView = true;
      } else {
        this.monthlyQtrlyView = false
      }
    }

    this.monthTable = true
    this.quarterTable = false;

    this.hopHeads = localStorage.getItem('hopSumryHeads')
    this.hopHeads = JSON.parse(this.hopHeads)
    console.log('head', this.hopHeads);

    this.dropdownHeads = this.hopHeads[0].Heads;
    console.log("this.dropdownHeads", this.dropdownHeads);
    
    let container = [];
    this.dropdownHeads.forEach((ele: any)=>{
      if(ele.HeadName != "Summary"){
        container.push(ele);
      }
    });
    console.log("container", container);
    
    this.dropdownHeads = container;
    this.selectedHead = this.dropdownHeads.filter(e => e.HeadName == this.tableArr[0].headerName)[0];

    console.log(this.selectedHead);

    //this.dropdownSubHeads = this.selectedHead

    this.selectedHead.PlanTypes.forEach(element => {
      let obj = {
        name: ''
      }
      obj.name = element
      this.dropdownSubHeads.push(obj);
    });


    // var i: number = 0;
    // var arr: any[] = [];
    // this.dropdownHeads.forEach(element => {
    //   arr.push(element.plantype);
    //   i++
    // });

    // console.log("sub types", arr);


    // this.hopHeads[0].Heads[0].PlanTypes.forEach(e => {
    //   obj = {
    //     name: ''
    //   }
    //   obj.name = e;
    //   this.dropdownSubHeads.push(obj);
    // })


    console.log(this.dropdownHeads, this.dropdownSubHeads);

    console.log(this.tableArr[0].headerName);
    console.log(this.tableArr[0].heading);

    this.selectedPlanType = this.dropdownSubHeads.filter(e => e.name == this.tableArr[0].heading)[0];


    // let i = this.dropdownHeads.indexOf(this.selectedHead)
    // console.log(this.selectedHead, this.selectedPlanType, i);

    // this.getPlanType = this.selectedPlanType.name;

    // this.selectedHead = this.tableArr[0].headerName
    // this.selectedPlanType = this.tableArr[0].heading


  }

  changePlantypeDropdown() {
    debugger

    this.dropdownSubHeads = [];
    this.selectedHead.PlanTypes.forEach(element => {
      let obj = {
        name: ''
      }
      obj.name = element
      this.dropdownSubHeads.push(obj);
    });
    this.selectedPlanType = this.dropdownSubHeads[0];
    this.test();
  }

  test() {
    console.log(this.selectedHead, this.selectedPlanType);

    this.getPlanType = this.selectedPlanType.name;
    this.getPlanType = this.getPlanType.toString()
    this.getWarehouseList();
    this.getStoreList();
    this.getBrandList();

    const qurterno = 1
    this.arr1 = [];
    this.arr2 = [];
    this.arr3 = [];
    let Payload = {
      'type': 1,
      'plantype': this.getPlanType,
      'storeid': '',
    }
    this._service.getOverallSummary(Payload).subscribe(res => {
      console.log(res);
      this.summaryRecord = res;
      this.headsDropdownVal = res.Heads;
      this.monthTable = true
      this.quarterTable = false;
      let obj = {
        heading: '',
        headerName: '',
        TargetOne: '',
        ActualOne: '',
        AchievedOne: '',
        DirectionOne: '',

        TargetTwo: '',
        ActualTwo: '',
        AchievedTwo: '',
        DirectionTwo: '',


        TargetThree: '',
        ActualThree: '',
        AchievedThree: '',
        DirectionThree: '',
      }

      // debugger;
      this.headerList = [];
      this.summaryRecord.forEach(element1 => {
        element1.Summary.forEach(element2 => {
          if (!this.headerList.find(c => c == element2.PlanType)) {
            //debugger
            this.headerList.push(element2.PlanType)
          }
        });
      });

      console.log(this.headerList);
      for (var i = 0; i < this.summaryRecord.length; i++) {
        if (this.summaryRecord[i].Month == (parseInt(this.secondLastMonthNo))) {
          this.arr1 = this.summaryRecord[i].Summary;
        }
        if (this.summaryRecord[i].Month == (parseInt(this.firstLastMonthNo))) {
          this.arr2 = this.summaryRecord[i].Summary;
        }
        if (this.summaryRecord[i].Month == (parseInt(this.curMonNo))) {
          this.arr3 = this.summaryRecord[i].Summary;
        }
      }

      this.pureColumns = [];
      this.arr1.forEach(element => {

        obj = {
          heading: '',
          headerName: '',
          TargetOne: '',
          ActualOne: '',
          AchievedOne: '',
          DirectionOne: '',

          TargetTwo: '',
          ActualTwo: '',
          AchievedTwo: '',
          DirectionTwo: '',


          TargetThree: '',
          ActualThree: '',
          AchievedThree: '',
          DirectionThree: '',
        }

        if (this.headerList.find(c => c == element.PlanType)) {
          obj.heading = element.PlanType;
          obj.headerName = element.HeadName;
          obj.TargetOne = element.PlannedValue;
          obj.ActualOne = element.AchievedValue;
          obj.AchievedOne = element.AchievedPercent;
          obj.DirectionOne = element.ArrowDirection;

        }
        this.pureColumns.push(obj)
      });


      if (this.arr2.length > 0) {
        this.arr2.forEach(element => {
          if (this.pureColumns.find(x => x.heading == element.PlanType)) {
            this.pureColumns.forEach(elementm => {
              if (elementm.heading == element.PlanType) {
                elementm.headerName = element.HeadName;
                elementm.TargetTwo = element.PlannedValue;
                elementm.ActualTwo = element.AchievedValue;
                elementm.AchievedTwo = element.AchievedPercent;
                elementm.DirectionTwo = element.ArrowDirection;

              }
            });
          } else {
            obj = {
              heading: '',
              headerName: '',
              TargetOne: '',
              ActualOne: '',
              AchievedOne: '',
              DirectionOne: '',

              TargetTwo: '',
              ActualTwo: '',
              AchievedTwo: '',
              DirectionTwo: '',


              TargetThree: '',
              ActualThree: '',
              AchievedThree: '',
              DirectionThree: '',
            }

            obj.heading = element.PlanType;
            obj.headerName = element.HeadName;
            obj.TargetTwo = element.PlannedValue;
            obj.ActualTwo = element.AchievedValue;
            obj.AchievedTwo = element.AchievedPercent;
            obj.DirectionTwo = element.ArrowDirection;

            this.pureColumns.push(obj)

          }
        });
      }
      console.log(this.pureColumns)
      if (this.arr3.length > 0) {
        this.arr3.forEach(element => {
          if (this.pureColumns.find(x => x.heading == element.PlanType)) {
            this.pureColumns.forEach(elementm => {

              if (elementm.heading == element.PlanType) {
                elementm.headerName = element.HeadName;
                elementm.TargetThree = element.PlannedValue;
                elementm.ActualThree = element.AchievedValue;
                elementm.AchievedThree = element.AchievedPercent;
                elementm.DirectionThree = element.ArrowDirection;

              }
            });
          } else {
            obj = {
              heading: '',
              headerName: '',
              TargetOne: '',
              ActualOne: '',
              AchievedOne: '',
              DirectionOne: '',

              TargetTwo: '',
              ActualTwo: '',
              AchievedTwo: '',
              DirectionTwo: '',


              TargetThree: '',
              ActualThree: '',
              AchievedThree: '',
              DirectionThree: '',
            }

            obj.heading = element.PlanType;
            obj.headerName = element.HeadName;
            obj.TargetThree = element.PlannedValue;
            obj.ActualThree = element.AchievedValue;
            obj.AchievedThree = element.AchievedPercent;
            obj.DirectionThree = element.ArrowDirection;

            this.pureColumns.push(obj)

          }
        });
      }
      console.log(this.pureColumns);
      this.tableArr = this.pureColumns;
    })

  }

  getSwitchVal(val) {
    console.log(val);
    this.typeVal = val;
    if (this.typeVal == 2) {
      this.quarterTable = true
      this.monthTable = false;
    } else {
      this.monthTable = true
      this.quarterTable = false;
    }
  }

  getKpiRecord(item) {
    this.planKpiName = item.PlanType;
  }


  getPlanWarehouseId(item) {

    this.chipsArrWarehouse = [];
    this.planWhName = item.warehouse
    this.planWhId = item.objectId;
    this.chipsArrWarehouse.push(this.planWhName);

    this.getStoreList();
  }

  removeWarehouseData() {
    this.planWhId = null;
    this.getWarehouseList();
    this.getStoreList();
    //this.getBrandList();
  }

  removeBusinessData() {
    this.planStoreId = null;
    this.planWhId = null;
    this.chipsArrWarehouse = [];
    this.getStoreList();
    this.getWarehouseList();
    //this.getBrandList();
  }

  getBusinessUnit(item) {
    this.chipsArrBusiness = [];
    this.planBusinessUnitName = item.store;
    this.planStoreId = item.objectId;  //storeId;
    this.chipsArrBusiness.push(this.planBusinessUnitName);
    this.getWarehouseList();
    this.getBrandList();
  }


  getBrandData(item) {
    this.chipsArrBrand = [];
    this.planBrandData = item.ObjectName;
    this.chipsArrBrand.push(this.planBrandData);
  }

  getWarehouseList() {
    this.getType;
    this.getId;

    this.blocked = true;
    this.arr1w = [];
    this.arr2w = [];
    this.arr3w = [];
    this.headerList = [];

    if (this.planStoreId != undefined) {
      const warePayload = {
        'type': 1,
        'plantype': this.getPlanType,
        'storeid': this.planStoreId,
        'warehouseid': 0,
      }

      this._service.getWarehouseData(warePayload).subscribe(res => {
        console.log(res);
        this.planWarehouseData = res;
        let warObj = {
          warehouse: '',
          objectId: 0,
          TargetOne: '',
          ActualOne: '',
          AchievedOne: '',

          TargetTwo: '',
          ActualTwo: '',
          AchievedTwo: '',

          TargetThree: '',
          ActualThree: '',
          AchievedThree: ''
        }
        this.headerList = [];
        this.planWarehouseData.forEach(element1 => {
          element1.Summary.forEach(element2 => {
            if (!this.headerList.find(c => c == element2.ObjectName)) {
              this.headerList.push(element2.ObjectName)
            }
          });
        });

        console.log(this.headerList);
        for (var i = 0; i < this.planWarehouseData.length; i++) {
          if (this.planWarehouseData[i].Month == (parseInt(this.secondLastMonthNo))) {
            this.arr1w = this.planWarehouseData[i].Summary;
          }
          if (this.planWarehouseData[i].Month == (parseInt(this.firstLastMonthNo))) {
            this.arr2w = this.planWarehouseData[i].Summary;
          }
          if (this.planWarehouseData[i].Month == (parseInt(this.curMonNo))) {
            this.arr3w = this.planWarehouseData[i].Summary;
          }
        }

        this.pureColumnsWarehouse = [];
        if (this.arr1w.length > 0) {
          this.arr1w.forEach(element => {
            warObj = {
              warehouse: '',
              objectId: 0,
              TargetOne: '',
              ActualOne: '',
              AchievedOne: '',

              TargetTwo: '',
              ActualTwo: '',
              AchievedTwo: '',

              TargetThree: '',
              ActualThree: '',
              AchievedThree: ''
            }

            if (this.headerList.find(c => c == element.ObjectName)) {
              warObj.warehouse = element.ObjectName;
              warObj.TargetOne = element.PlannedValue;
              warObj.ActualOne = element.AchievedValue;
              warObj.AchievedOne = element.AchievedPercent;
              warObj.objectId = element.ObjectId;

            }
            this.pureColumnsWarehouse.push(warObj)
          });
        }

        if (this.arr2w.length > 0) {
          this.arr2w.forEach(element => {
            if (this.pureColumnsWarehouse.find(x => x.warehouse == element.ObjectName)) {
              this.pureColumnsWarehouse.forEach(elementm => {

                if (elementm.warehouse == element.ObjectName) {

                  elementm.TargetTwo = element.PlannedValue;
                  elementm.ActualTwo = element.AchievedValue;
                  elementm.AchievedTwo = element.AchievedPercent;
                  elementm.objectId = element.ObjectId;
                }
              });
            } else {
              warObj = {
                warehouse: '',
                objectId: 0,
                TargetOne: '',
                ActualOne: '',
                AchievedOne: '',

                TargetTwo: '',
                ActualTwo: '',
                AchievedTwo: '',

                TargetThree: '',
                ActualThree: '',
                AchievedThree: ''
              }

              warObj.warehouse = element.ObjectName;
              warObj.objectId = element.ObjectId;
              warObj.TargetTwo = element.PlannedValue;
              warObj.ActualTwo = element.AchievedValue;
              warObj.AchievedTwo = element.AchievedPercent;
              this.pureColumnsWarehouse.push(warObj)

            }
          });
        }

        if (this.arr3w.length > 0) {
          this.arr3w.forEach(element => {
            if (this.pureColumnsWarehouse.find(x => x.warehouse == element.ObjectName)) {
              this.pureColumnsWarehouse.forEach(elementm => {
                if (elementm.warehouse == element.ObjectName) {

                  elementm.TargetThree = element.PlannedValue;
                  elementm.ActualThree = element.AchievedValue;
                  elementm.AchievedThree = element.AchievedPercent;
                  elementm.objectId = element.ObjectId;
                }

              });
            } else {
              warObj = {
                warehouse: '',
                objectId: 0,
                TargetOne: '',
                ActualOne: '',
                AchievedOne: '',

                TargetTwo: '',
                ActualTwo: '',
                AchievedTwo: '',

                TargetThree: '',
                ActualThree: '',
                AchievedThree: ''
              }

              warObj.warehouse = element.ObjectName;
              warObj.objectId = element.ObjectId;
              warObj.TargetThree = element.PlannedValue;
              warObj.ActualThree = element.AchievedValue;
              warObj.AchievedThree = element.AchievedPercent;
              this.pureColumnsWarehouse.push(warObj)
            }
          });
        }
        console.log(this.pureColumnsWarehouse)
        this.blocked = false;
      })
    } else {
      const warePayload = {
        'type': 1,
        'plantype': this.getPlanType,
        'storeid': 0,
        'warehouseid': 0,
      }
      this._service.getWarehouseData(warePayload).subscribe(res => {
        console.log(res);
        this.planWarehouseData = res;
        let warObj = {
          warehouse: '',
          objectId: 0,
          TargetOne: '',
          ActualOne: '',
          AchievedOne: '',

          TargetTwo: '',
          ActualTwo: '',
          AchievedTwo: '',

          TargetThree: '',
          ActualThree: '',
          AchievedThree: ''
        }
        this.headerList = [];
        this.planWarehouseData.forEach(element1 => {
          element1.Summary.forEach(element2 => {
            if (!this.headerList.find(c => c == element2.ObjectName)) {
              this.headerList.push(element2.ObjectName)
            }
          });
        });

        console.log(this.headerList);
        for (var i = 0; i < this.planWarehouseData.length; i++) {
          if (this.planWarehouseData[i].Month == (parseInt(this.secondLastMonthNo))) {
            this.arr1w = this.planWarehouseData[i].Summary;
          }
          if (this.planWarehouseData[i].Month == (parseInt(this.firstLastMonthNo))) {
            this.arr2w = this.planWarehouseData[i].Summary;
          }
          if (this.planWarehouseData[i].Month == (parseInt(this.curMonNo))) {
            this.arr3w = this.planWarehouseData[i].Summary;
          }
        }

        this.pureColumnsWarehouse = [];
        if (this.arr1w.length > 0) {
          this.arr1w.forEach(element => {
            warObj = {
              warehouse: '',
              objectId: 0,
              TargetOne: '',
              ActualOne: '',
              AchievedOne: '',

              TargetTwo: '',
              ActualTwo: '',
              AchievedTwo: '',

              TargetThree: '',
              ActualThree: '',
              AchievedThree: ''
            }

            if (this.headerList.find(c => c == element.ObjectName)) {
              warObj.warehouse = element.ObjectName;
              warObj.TargetOne = element.PlannedValue;
              warObj.ActualOne = element.AchievedValue;
              warObj.AchievedOne = element.AchievedPercent;
              warObj.objectId = element.ObjectId;

            }
            this.pureColumnsWarehouse.push(warObj)
          });
        }

        if (this.arr2w.length > 0) {
          this.arr2w.forEach(element => {
            if (this.pureColumnsWarehouse.find(x => x.warehouse == element.ObjectName)) {
              this.pureColumnsWarehouse.forEach(elementm => {

                if (elementm.warehouse == element.ObjectName) {

                  elementm.TargetTwo = element.PlannedValue;
                  elementm.ActualTwo = element.AchievedValue;
                  elementm.AchievedTwo = element.AchievedPercent;
                  elementm.objectId = element.ObjectId;
                }
              });
            } else {
              warObj = {
                warehouse: '',
                objectId: 0,
                TargetOne: '',
                ActualOne: '',
                AchievedOne: '',

                TargetTwo: '',
                ActualTwo: '',
                AchievedTwo: '',

                TargetThree: '',
                ActualThree: '',
                AchievedThree: ''
              }

              warObj.warehouse = element.ObjectName;
              warObj.objectId = element.ObjectId;
              warObj.TargetTwo = element.PlannedValue;
              warObj.ActualTwo = element.AchievedValue;
              warObj.AchievedTwo = element.AchievedPercent;
              this.pureColumnsWarehouse.push(warObj)

            }
          });
        }

        if (this.arr3w.length > 0) {
          this.arr3w.forEach(element => {
            if (this.pureColumnsWarehouse.find(x => x.warehouse == element.ObjectName)) {
              this.pureColumnsWarehouse.forEach(elementm => {
                if (elementm.warehouse == element.ObjectName) {

                  elementm.TargetThree = element.PlannedValue;
                  elementm.ActualThree = element.AchievedValue;
                  elementm.AchievedThree = element.AchievedPercent;
                  elementm.objectId = element.ObjectId;
                }

              });
            } else {
              warObj = {
                warehouse: '',
                objectId: 0,
                TargetOne: '',
                ActualOne: '',
                AchievedOne: '',

                TargetTwo: '',
                ActualTwo: '',
                AchievedTwo: '',

                TargetThree: '',
                ActualThree: '',
                AchievedThree: ''
              }

              warObj.warehouse = element.ObjectName;
              warObj.objectId = element.ObjectId;
              warObj.TargetThree = element.PlannedValue;
              warObj.ActualThree = element.AchievedValue;
              warObj.AchievedThree = element.AchievedPercent;
              this.pureColumnsWarehouse.push(warObj)
            }
          });
        }
        console.log(this.pureColumnsWarehouse)
        this.blocked = false;
      })
    }
  }

  getStoreList() {

    this.getType;
    this.planWhId;
    this.arr1s = [];
    this.arr2s = [];
    this.arr3s = [];
    this.storeList = [];
    if (this.planWhId != undefined) {
      this.blocked = true;
      const storePayload = {
        'type': 1,
        'plantype': this.getPlanType,
        'storeid': 0,
        'warehouseid': this.planWhId,
      }

      this._service.getStoreData(storePayload).subscribe(res => {
        console.log("business unit data", res);
        this.planStoreData = res;
        //this.blocked=false;

        let storeObj = {
          store: '',
          objectId: 0,

          TargetOne: '',
          ActualOne: '',
          AchievedOne: '',

          TargetTwo: '',
          ActualTwo: '',
          AchievedTwo: '',

          TargetThree: '',
          ActualThree: '',
          AchievedThree: ''
        }

        this.storeList = [];
        this.planStoreData.forEach(element1 => {
          element1.Summary.forEach(element2 => {
            if (!this.storeList.find(c => c == element2.ObjectName)) {
              this.storeList.push(element2.ObjectName)
            }
          });
        });

        for (var i = 0; i < this.planStoreData.length; i++) {
          if (this.planStoreData[i].Month == (parseInt(this.secondLastMonthNo))) {
            this.arr1s = this.planStoreData[i].Summary;
          }
          if (this.planStoreData[i].Month == (parseInt(this.firstLastMonthNo))) {
            this.arr2s = this.planStoreData[i].Summary;
          }
          if (this.planStoreData[i].Month == (parseInt(this.curMonNo))) {
            this.arr3s = this.planStoreData[i].Summary;
          }
        }

        this.pureColumnsStore = [];
        this.arr1s.forEach(element => {

          storeObj = {
            store: '',
            objectId: 0,

            TargetOne: '',
            ActualOne: '',
            AchievedOne: '',

            TargetTwo: '',
            ActualTwo: '',
            AchievedTwo: '',

            TargetThree: '',
            ActualThree: '',
            AchievedThree: ''
          }

          if (this.storeList.find(c => c == element.ObjectName)) {
            storeObj.store = element.ObjectName;
            storeObj.TargetOne = element.PlannedValue;
            storeObj.ActualOne = element.AchievedValue;
            storeObj.AchievedOne = element.AchievedPercent;
            storeObj.objectId = element.ObjectId;


          }
          this.pureColumnsStore.push(storeObj);

        });

        if (this.arr2s.length > 0) {
          this.arr2s.forEach(element => {
            if (this.pureColumnsStore.find(x => x.store == element.ObjectName)) {
              this.pureColumnsStore.forEach(elementm => {

                if (elementm.store == element.ObjectName) {

                  elementm.TargetTwo = element.PlannedValue;
                  elementm.ActualTwo = element.AchievedValue;
                  elementm.AchievedTwo = element.AchievedPercent;
                  elementm.objectId = element.ObjectId;
                }
              });
            } else {
              storeObj = {
                store: '',
                objectId: 0,

                TargetOne: '',
                ActualOne: '',
                AchievedOne: '',

                TargetTwo: '',
                ActualTwo: '',
                AchievedTwo: '',

                TargetThree: '',
                ActualThree: '',
                AchievedThree: ''
              }

              storeObj.store = element.ObjectName;
              storeObj.objectId = element.ObjectId;
              storeObj.TargetTwo = element.PlannedValue;
              storeObj.ActualTwo = element.AchievedValue;
              storeObj.AchievedTwo = element.AchievedPercent;
              this.pureColumnsStore.push(storeObj)

            }
          });
        }

        if (this.arr3s.length > 0) {
          this.arr3s.forEach(element => {
            if (this.pureColumnsStore.find(x => x.store == element.ObjectName)) {
              this.pureColumnsStore.forEach(elementm => {

                if (elementm.store == element.ObjectName) {

                  elementm.TargetThree = element.PlannedValue;
                  elementm.ActualThree = element.AchievedValue;
                  elementm.AchievedThree = element.AchievedPercent;
                  elementm.objectId = element.ObjectId;
                }
              });
            }
            else {
              storeObj = {
                store: '',
                objectId: 0,

                TargetOne: '',
                ActualOne: '',
                AchievedOne: '',

                TargetTwo: '',
                ActualTwo: '',
                AchievedTwo: '',

                TargetThree: '',
                ActualThree: '',
                AchievedThree: ''
              }

              storeObj.store = element.ObjectName;
              storeObj.objectId = element.ObjectId;
              storeObj.TargetThree = element.PlannedValue;
              storeObj.ActualThree = element.AchievedValue;
              storeObj.AchievedThree = element.AchievedPercent;
              this.pureColumnsStore.push(storeObj)

            }
          });
        }
        console.log(this.pureColumnsStore)
        this.blocked = false;
      })
      this.getBrandList();
    }
    else {

      this.blocked = true;
      const storePayload = {
        'type': 1,
        'plantype': this.getPlanType,
        'storeid': this.planStoreId,
        'warehouseid': this.planWhId,
      }
      this._service.getStoreData(storePayload).subscribe(res => {
        console.log(res);
        this.planStoreData = res;
        //this.blocked=false;

        let storeObj = {
          store: '',
          objectId: 0,

          TargetOne: '',
          ActualOne: '',
          AchievedOne: '',

          TargetTwo: '',
          ActualTwo: '',
          AchievedTwo: '',

          TargetThree: '',
          ActualThree: '',
          AchievedThree: ''
        }

        this.storeList = [];
        this.planStoreData.forEach(element1 => {
          element1.Summary.forEach(element2 => {
            if (!this.storeList.find(c => c == element2.ObjectName)) {
              this.storeList.push(element2.ObjectName)
            }
          });
        });


        for (var i = 0; i < this.planStoreData.length; i++) {
          // if (i==0) {
          //   this.arr1s = this.planStoreData[i].Summary;
          // }
          // if (i==1) {
          //   this.arr2s = this.planStoreData[i].Summary;
          // }
          // if (i==2) {
          //   this.arr3s = this.planStoreData[i].Summary;
          // }

          if (this.planStoreData[i].Month == (parseInt(this.secondLastMonthNo))) {

            this.arr1s = this.planStoreData[i].Summary;
          }
          if (this.planStoreData[i].Month == (parseInt(this.firstLastMonthNo))) {
            this.arr2s = this.planStoreData[i].Summary;
          }
          if (this.planStoreData[i].Month == (parseInt(this.curMonNo))) {
            this.arr3s = this.planStoreData[i].Summary;
          }
        }

        this.pureColumnsStore = [];
        this.arr1s.forEach(element => {
          storeObj = {
            store: '',
            objectId: 0,

            TargetOne: '',
            ActualOne: '',
            AchievedOne: '',

            TargetTwo: '',
            ActualTwo: '',
            AchievedTwo: '',

            TargetThree: '',
            ActualThree: '',
            AchievedThree: ''
          }

          if (this.storeList.find(c => c == element.ObjectName)) {
            storeObj.store = element.ObjectName;
            storeObj.TargetOne = element.PlannedValue;
            storeObj.ActualOne = element.AchievedValue;
            storeObj.AchievedOne = element.AchievedPercent;
            storeObj.objectId = element.ObjectId;


          }
          this.pureColumnsStore.push(storeObj)

        });

        if (this.arr2s.length > 0) {
          this.arr2s.forEach(element => {
            if (this.pureColumnsStore.find(x => x.store == element.ObjectName)) {
              this.pureColumnsStore.forEach(elementm => {
                //console.log(elementm, element.PlanType);

                if (elementm.store == element.ObjectName) {

                  elementm.TargetTwo = element.PlannedValue;
                  elementm.ActualTwo = element.AchievedValue;
                  elementm.AchievedTwo = element.AchievedPercent;
                  elementm.objectId = element.ObjectId;
                }
              });
            }
            else {
              storeObj = {
                store: '',
                objectId: 0,

                TargetOne: '',
                ActualOne: '',
                AchievedOne: '',

                TargetTwo: '',
                ActualTwo: '',
                AchievedTwo: '',

                TargetThree: '',
                ActualThree: '',
                AchievedThree: ''
              }

              storeObj.store = element.ObjectName;
              storeObj.objectId = element.ObjectId;
              storeObj.TargetTwo = element.PlannedValue;
              storeObj.ActualTwo = element.AchievedValue;
              storeObj.AchievedTwo = element.AchievedPercent;
              this.pureColumnsStore.push(storeObj)

            }
          });
        }

        if (this.arr3s.length > 0) {
          this.arr3s.forEach(element => {
            if (this.pureColumnsStore.find(x => x.store == element.ObjectName)) {
              this.pureColumnsStore.forEach(elementm => {

                if (elementm.store == element.ObjectName) {

                  elementm.TargetThree = element.PlannedValue;
                  elementm.ActualThree = element.AchievedValue;
                  elementm.AchievedThree = element.AchievedPercent;
                  elementm.objectId = element.ObjectId;
                }

              });
            } else {
              storeObj = {
                store: '',
                objectId: 0,

                TargetOne: '',
                ActualOne: '',
                AchievedOne: '',

                TargetTwo: '',
                ActualTwo: '',
                AchievedTwo: '',

                TargetThree: '',
                ActualThree: '',
                AchievedThree: ''
              }

              storeObj.store = element.ObjectName;
              storeObj.objectId = element.ObjectId;
              storeObj.TargetThree = element.PlannedValue;
              storeObj.ActualThree = element.AchievedValue;
              storeObj.AchievedThree = element.AchievedPercent;
              this.pureColumnsStore.push(storeObj)

            }
          });
        }
        console.log(this.pureColumnsStore)
        this.blocked = false;
      })
      this.getBrandList();
    }
  }

  getBrandList() {

    this.planWhId;
    this.planStoreId;
    this.arr1b = [];
    this.arr2b = [];
    this.arr3b = [];
    this.brandList = []
    if (this.planWhId != undefined && this.planStoreId != undefined) {
      this.blocked = true;
      const brandPayload = {
        'type': 1,
        'plantype': this.getPlanType,
        'storeid': this.planStoreId,
        'warehouseid': this.planWhId,
      }
      this._service.getBrandData(brandPayload).subscribe(res => {
        console.log(res);
        this.planBrandData = res;

        let brandObj = {
          store: '',
          AchievedValue_1: '',
          AchievedValue_2: '',
          AchievedValue_3: '',

        }

        this.brandList = [];
        this.planBrandData.forEach(element1 => {
          element1.Summary.forEach(element2 => {
            if (!this.brandList.find(c => c == element2.ObjectName)) {
              this.brandList.push(element2.ObjectName)
            }
          });
        });

        for (var i = 0; i < this.planBrandData.length; i++) {

          if (this.planBrandData[i].Month == (parseInt(this.secondLastMonthNo))) {
            this.arr1b = this.planBrandData[i].Summary;
          }
          if (this.planBrandData[i].Month == (parseInt(this.firstLastMonthNo))) {
            this.arr2b = this.planBrandData[i].Summary;
          }
          if (this.planBrandData[i].Month == (parseInt(this.curMonNo))) {
            this.arr3b = this.planBrandData[i].Summary;
          }
        }

        this.pureColumnsBrand = [];
        this.arr1b.forEach(element => {

          brandObj = {
            store: '',
            AchievedValue_1: '',
            AchievedValue_2: '',
            AchievedValue_3: '',
          }

          if (this.brandList.find(c => c == element.ObjectName)) {
            brandObj.store = element.ObjectName;
            brandObj.AchievedValue_1 = element.AchievedValue;


          }
          this.pureColumnsBrand.push(brandObj)

        });

        if (this.arr2b.length > 0) {
          this.arr2b.forEach(element => {
            if (this.pureColumnsBrand.find(x => x.store == element.ObjectName)) {
              this.pureColumnsBrand.forEach(elementm => {
                //console.log(elementm, element.PlanType);

                if (elementm.store == element.ObjectName) {

                  elementm.AchievedValue_2 = element.AchievedValue;
                }
              });
            } else {
              brandObj = {
                store: '',
                AchievedValue_1: '',
                AchievedValue_2: '',
                AchievedValue_3: '',
              }
              brandObj.store = element.ObjectName;
              brandObj.AchievedValue_2 = element.AchievedValue;

              this.pureColumnsBrand.push(brandObj)

            }
          });
        }

        if (this.arr3b.length > 0) {
          this.arr3b.forEach(element => {
            if (this.pureColumnsBrand.find(x => x.store == element.ObjectName)) {
              this.pureColumnsBrand.forEach(elementm => {

                if (elementm.store == element.ObjectName) {
                  elementm.AchievedValue_3 = element.AchievedValue;

                }
              });
            } else {
              brandObj = {
                store: '',
                AchievedValue_1: '',
                AchievedValue_2: '',
                AchievedValue_3: '',
              }
              brandObj.store = element.ObjectName;
              brandObj.AchievedValue_3 = element.AchievedValue;

              this.pureColumnsBrand.push(brandObj)

            }
          });
        }
        console.log(this.pureColumnsBrand)

        this.blocked = false;
      })
    } else if (this.planStoreId != undefined) {
      this.blocked = true;
      const brandPayload = {
        'type': 1,
        'plantype': this.getPlanType,
        'storeid': this.planStoreId,
        'warehouseid': this.planWhId,
      }
      this._service.getBrandData(brandPayload).subscribe(res => {
        console.log(res);
        this.planBrandData = res;

        let brandObj = {
          store: '',
          AchievedValue_1: '',
          AchievedValue_2: '',
          AchievedValue_3: '',

        }

        this.brandList = [];
        this.planBrandData.forEach(element1 => {
          element1.Summary.forEach(element2 => {
            if (!this.brandList.find(c => c == element2.ObjectName)) {

              this.brandList.push(element2.ObjectName)
            }
          });
        });

        for (var i = 0; i < this.planBrandData.length; i++) {
          if (this.planBrandData[i].Month == (parseInt(this.secondLastMonthNo))) {
            this.arr1b = this.planBrandData[i].Summary;
          }
          if (this.planBrandData[i].Month == (parseInt(this.firstLastMonthNo))) {
            this.arr2b = this.planBrandData[i].Summary;
          }
          if (this.planBrandData[i].Month == (parseInt(this.curMonNo))) {
            this.arr3b = this.planBrandData[i].Summary;
          }
        }

        this.pureColumnsBrand = [];
        this.arr1b.forEach(element => {

          brandObj = {
            store: '',
            AchievedValue_1: '',
            AchievedValue_2: '',
            AchievedValue_3: '',
          }

          if (this.brandList.find(c => c == element.ObjectName)) {
            brandObj.store = element.ObjectName;
            brandObj.AchievedValue_1 = element.AchievedValue;
          }
          this.pureColumnsBrand.push(brandObj)

        });

        if (this.arr2b.length > 0) {
          this.arr2b.forEach(element => {
            if (this.pureColumnsBrand.find(x => x.store == element.ObjectName)) {
              this.pureColumnsBrand.forEach(elementm => {
                //console.log(elementm, element.PlanType);

                if (elementm.store == element.ObjectName) {

                  elementm.AchievedValue_2 = element.AchievedValue;
                }
              });
            } else {
              brandObj = {
                store: '',
                AchievedValue_1: '',
                AchievedValue_2: '',
                AchievedValue_3: '',
              }
              brandObj.store = element.ObjectName;
              brandObj.AchievedValue_2 = element.AchievedValue;

              this.pureColumnsBrand.push(brandObj)

            }
          });
        }

        if (this.arr3b.length > 0) {
          this.arr3b.forEach(element => {
            if (this.pureColumnsBrand.find(x => x.store == element.ObjectName)) {
              this.pureColumnsBrand.forEach(elementm => {

                if (elementm.store == element.ObjectName) {
                  elementm.AchievedValue_3 = element.AchievedValue;
                }

              });
            } else {
              brandObj = {
                store: '',
                AchievedValue_1: '',
                AchievedValue_2: '',
                AchievedValue_3: '',
              }
              brandObj.store = element.ObjectName;
              brandObj.AchievedValue_3 = element.AchievedValue;

              this.pureColumnsBrand.push(brandObj)

            }
          });
        }
        console.log(this.pureColumnsBrand)
        this.blocked = false;
      })
    } else {
      this.blocked = true;
      const brandPayload = {
        'type': 1,
        'plantype': this.getPlanType,
        'storeid': this.planStoreId,
        'warehouseid': this.planWhId,
      }
      this._service.getBrandData(brandPayload).subscribe(res => {
        console.log(res);
        this.planBrandData = res;

        let brandObj = {
          store: '',
          AchievedValue_1: '',
          AchievedValue_2: '',
          AchievedValue_3: '',

        }

        this.brandList = [];
        this.planBrandData.forEach(element1 => {
          element1.Summary.forEach(element2 => {
            if (!this.brandList.find(c => c == element2.ObjectName)) {

              this.brandList.push(element2.ObjectName)
            }
          });
        });

        for (var i = 0; i < this.planBrandData.length; i++) {
          if (this.planBrandData[i].Month == (parseInt(this.secondLastMonthNo))) {
            this.arr1b = this.planBrandData[i].Summary;
          }
          if (this.planBrandData[i].Month == (parseInt(this.firstLastMonthNo))) {
            this.arr2b = this.planBrandData[i].Summary;
          }
          if (this.planBrandData[i].Month == (parseInt(this.curMonNo))) {
            this.arr3b = this.planBrandData[i].Summary;
          }
        }

        this.pureColumnsBrand = [];
        this.arr1b.forEach(element => {

          brandObj = {
            store: '',
            AchievedValue_1: '',
            AchievedValue_2: '',
            AchievedValue_3: '',
          }

          if (this.brandList.find(c => c == element.ObjectName)) {
            brandObj.store = element.ObjectName;
            brandObj.AchievedValue_1 = element.AchievedValue;
          }
          this.pureColumnsBrand.push(brandObj)

        });

        if (this.arr2b.length > 0) {
          this.arr2b.forEach(element => {
            if (this.pureColumnsBrand.find(x => x.store == element.ObjectName)) {
              this.pureColumnsBrand.forEach(elementm => {
                //console.log(elementm, element.PlanType);

                if (elementm.store == element.ObjectName) {

                  elementm.AchievedValue_2 = element.AchievedValue;
                }
              });
            } else {
              brandObj = {
                store: '',
                AchievedValue_1: '',
                AchievedValue_2: '',
                AchievedValue_3: '',
              }
              brandObj.store = element.ObjectName;
              brandObj.AchievedValue_2 = element.AchievedValue;

              this.pureColumnsBrand.push(brandObj)

            }
          });
        }

        if (this.arr3b.length > 0) {
          this.arr3b.forEach(element => {
            if (this.pureColumnsBrand.find(x => x.store == element.ObjectName)) {
              this.pureColumnsBrand.forEach(elementm => {

                if (elementm.store == element.ObjectName) {
                  elementm.AchievedValue_3 = element.AchievedValue;
                }

              });
            } else {
              brandObj = {
                store: '',
                AchievedValue_1: '',
                AchievedValue_2: '',
                AchievedValue_3: '',
              }
              brandObj.store = element.ObjectName;
              brandObj.AchievedValue_3 = element.AchievedValue;

              this.pureColumnsBrand.push(brandObj)

            }
          });
        }
        console.log(this.pureColumnsBrand)
        this.blocked = false;
      })
    }
  }

  displayLocationModal: boolean;
  showLocationModal() {
    this.displayLocationModal = true;
  }

  displayBusinessModal: boolean;
  showBusinessModal() {
    this.displayBusinessModal = true;
  }

  displayBrandModal: boolean;
  showBrandModal() {
    this.displayBrandModal = true;
  }



}
