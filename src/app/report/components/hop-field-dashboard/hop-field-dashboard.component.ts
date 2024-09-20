import { Component, OnInit } from '@angular/core';
import { HopService } from 'app/report/services/hop.service';
import * as moment from 'moment';
import { element } from 'protractor';

@Component({
  selector: 'app-hop-field-dashboard',
  templateUrl: './hop-field-dashboard.component.html',
  styleUrls: ['./hop-field-dashboard.component.scss']
})
export class HopFieldDashboardComponent implements OnInit {

  data: any;



  //dropdown values
  allWarehouseList: any[] = [];
  selectedWarehouse: any = {
    WarehouseId: 0,
    WarehouseName: "Select All"
  };

  HeadNameList: any[] = [];
  selectedHeadNameList: any;

  PlanTypeList: any[] = [];
  selectedPlanTypeList: any;


  //tables months


  //misc 
  curMonName: any;
  firstLastMonth: any;
  secondLastMonth: any;
  curMonNo: any;
  firstLastMonthNo: any;
  secondLastMonthNo: any;
  curYear: any;
  // optionChart: any;


  //graphs
  graphsValue: any[] = []

  //maintable array
  pureColumns = [];

  //cluster
  allClusterList: any = []

  //store
  allStoreList: any = []

  //brand
  allBrandList: any = []

  //is tables/cards available
  isGraphsValue: boolean = false;
  isAllBrandList: boolean = false;
  isAllClusterList: boolean = false;
  isAureColumns: boolean = false;
  isAllStoreList: boolean = false;

  constructor(private HopService: HopService) {
    // this.init();
    this.data = {
      labels: ['January', 'February', 'March'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80]
        }
      ]
    };



  }

  firstYear: any;
  secondYear: any;
  ngOnInit() {
    console.log(" -------------------------- HOP Field Dash ----------------------------");
    this.curMonName = moment().subtract(0, 'months').format('MMM');
    this.secondLastMonth = moment().subtract(2, 'months').format('MMM');
    this.firstLastMonth = moment().subtract(1, 'months').format('MMM');
    this.curYear = new Date().getFullYear().toString();

    this.curMonNo = moment().subtract(0, 'months').format('M');
    this.secondLastMonthNo = moment().subtract(2, 'months').format('M');
    this.firstLastMonthNo = moment().subtract(1, 'months').format('M');
    this.firstYear= (moment().subtract(1, 'months').format('Y')).toString();
    this.secondYear= (moment().subtract(2, 'months').format('Y')).toString();
    this.getAllWarehouses();
    this.getDropDownValues();
  }

  getAllWarehouses() {
    this.HopService.GetAllWarehouses().subscribe(
      (res) => {
        // console.log("All warehouses", res);
        this.allWarehouseList = res;
        this.allWarehouseList.unshift({
          WarehouseId: 0,
          WarehouseName: "Select All"
        })
        // this.selectedWarehouse = this.allWarehouseList[0];
      },
      (err) => {
        console.log(err);
      },
    );
  }


  getDropDownValues() {
    this.HopService.GetDropDownValues().subscribe(
      (res) => {

        this.PlanTypeList = [];

        console.log("All dropdown list", res);
        this.HeadNameList = res;
        this.selectedHeadNameList = this.HeadNameList.filter(x => x.HeadName == "Summary")[0];

        // console.log(this.selectedHeadNameList);

        if (this.selectedHeadNameList.PlanTypes.length > 0) {
          this.selectedHeadNameList.PlanTypes.forEach(element => {
            let obj = {
              name: ''
            }
            obj.name = element;
            this.PlanTypeList.push(obj);
          });
        }
        // console.log("--------------- check this --------------", this.PlanTypeList);
        this.selectedPlanTypeList = this.PlanTypeList.filter(x => x.name == "Sales")[0];
        if(!this.selectedPlanTypeList){
          this.selectedPlanTypeList =  this.PlanTypeList[0];
        }
        this.loadAllFields();
      },
      (err) => {
        console.log(err);
      },
    );

  }



  headChange() {

    // console.log(this.selectedHeadNameList);

    this.PlanTypeList = [];

    if (this.selectedHeadNameList.PlanTypes.length > 0) {
      this.selectedHeadNameList.PlanTypes.forEach(element => {
        let obj = {
          name: ''
        }
        obj.name = element;
        this.PlanTypeList.push(obj);
      });
      this.selectedPlanTypeList = this.PlanTypeList[0];

    } else {
      alert("No Plan types available");
    }
    this.loadAllFields();

  }




  loadAllFields() {



    let FieldDashboardMasterFilter = {
      HeadName: this.selectedHeadNameList.HeadName,
      PlanType: this.selectedPlanTypeList.name,
      warehouseid: this.selectedWarehouse.WarehouseId
    }

    // console.log(" FieldDashboardMasterFilter Payload", FieldDashboardMasterFilter);
    this.HopService.AllFieldDashboardData(FieldDashboardMasterFilter).subscribe(
      (res) => {

        console.log("FieldDashboardMasterFilter res", res);

        this.graphsValue = [];
        this.pureColumns = [];
        this.allClusterList = [];
        this.allStoreList = [];
        this.allBrandList = [];


        //Graph list data processing

        if (res.Graphs.length != 0 || res.Graphs != null) {

          let graphArr1: any = [];
          let graphArr2: any = [];
          let graphArr3: any = [];

          for (var i = 0; i < res.Graphs.length; i++) {
            // debugger;
            if (res.Graphs[i].Month == (parseInt(this.secondLastMonthNo))) {
              graphArr1.push(res.Graphs[i]);
            }
            
            if (res.Graphs[i].Month == (parseInt(this.firstLastMonthNo))) {
              graphArr2.push(res.Graphs[i]);
            }
            
            if (res.Graphs[i].Month == (parseInt(this.curMonNo))) {
              graphArr3.push(res.Graphs[i]);
            }
          
          }

          console.log("graphArr1", graphArr1);  //last last
          console.log("graphArr2", graphArr2);  //mid month 
          console.log("graphArr3", graphArr3);  //current month

          // firstLastMonth: any;
          // secondLastMonth: any;
          // curMonNo: any;

          if (graphArr1.length > 0) {
            graphArr1.forEach(element => {

              let GraphObj = {
                PlanType: '',
                AchievedPercent: '',
                firstPlannedValue: '',
                lastMonthValue: '',
                midMonthValue: '',
                firstMonthValue: '',
                ArrowDirection: '',
                Target: [
                  // {
                  //   month: 0,
                  //   AchievedValue: 0,
                  //   PlannedValue: 0,
                  //   AchievedPercent: 0
                  // }
                ],
                graph: {
                  labels: [],
                  datasets: [
                    {
                      label: '',
                      backgroundColor: '#42A5F5',
                      borderColor: '#1E88E5',
                      data: []
                    }
                  ]
                }
              }

              GraphObj.PlanType = element.PlanType;
              GraphObj.lastMonthValue = element.AchievedValue;
              GraphObj.graph.labels.push(this.secondLastMonth);
              GraphObj.graph.datasets[0].data.push(element.AchievedValue);
              GraphObj.graph.datasets[0].label = element.PlanType;

              let obj = {
                month: element.Month ? element.Month : 0,
                monthName: element.Month ? this.secondLastMonth : '',
                AchievedValue: element.AchievedValue ? element.AchievedValue : 0,
                PlannedValue: element.PlannedValue ? element.PlannedValue : 0,
                AchievedPercent: element.AchievedPercent ? element.AchievedPercent : 0
              }
              GraphObj.Target.push(obj);
              // GraphObj.Target[0].AchievedValue = element.AchievedValue;
              // GraphObj.Target[0].PlannedValue = element.PlannedValue;
              // GraphObj.Target[0].AchievedPercent = element.AchievedPercent;

              this.graphsValue.push(GraphObj);

            });
          }

          if (graphArr2.length > 0) {
            graphArr2.forEach(element => {
              if (this.graphsValue.find(x => x.PlanType == element.PlanType)) {
                this.graphsValue.forEach(MainElement => {
                  if (MainElement.PlanType == element.PlanType) {
                    MainElement.midMonthValue = element.AchievedValue;
                    MainElement.graph.labels.push(this.firstLastMonth);
                    MainElement.graph.datasets[0].data.push(element.AchievedValue);
                    let obj = {
                      month: element.Month ? element.Month : 0,
                      monthName: element.Month ? this.firstLastMonth : '',
                      AchievedValue: element.AchievedValue ? element.AchievedValue : 0,
                      PlannedValue: element.PlannedValue ? element.PlannedValue : 0,
                      AchievedPercent: element.AchievedPercent ? element.AchievedPercent : 0
                    }
                    MainElement.Target.push(obj);
                    // MainElement.Target[1].month = element.Month;
                    // MainElement.Target[1].AchievedValue = element.AchievedValue;
                    // MainElement.Target[1].PlannedValue = element.PlannedValue;
                    // MainElement.Target[1].AchievedPercent = element.AchievedPercent;


                  }
                });
              } else {

                let GraphObj = {

                  PlanType: '',
                  AchievedPercent: '',
                  firstPlannedValue: '',
                  lastMonthValue: '',
                  midMonthValue: '',
                  firstMonthValue: '',
                  ArrowDirection: '',
                  Target: [
                    // {
                    //   month: 0,
                    //   AchievedValue: 0,
                    //   PlannedValue: 0,
                    //   AchievedPercent: 0
                    // }
                  ],
                  graph: {
                    labels: [],
                    datasets: [
                      {
                        label: '',
                        backgroundColor: '#42A5F5',
                        borderColor: '#1E88E5',
                        data: []
                      }
                    ]
                  }
                }

                GraphObj.PlanType = element.PlanType;
                // GraphObj.ObjectName = element.ObjectName;
                GraphObj.midMonthValue = element.AchievedValue;
                // GraphObj.midPlannedValue = element.PlannedValue;

                // GraphObj.ArrowDirection = element.ArrowDirection;
                GraphObj.graph.labels.push(this.firstLastMonth);
                GraphObj.graph.datasets[0].data.push(element.AchievedValue);
                GraphObj.graph.datasets[0].label = element.PlanType;
                let obj = {
                  month: element.Month ? element.Month : 0,
                  monthName: element.Month ? this.firstLastMonth : '',
                  AchievedValue: element.AchievedValue ? element.AchievedValue : 0,
                  PlannedValue: element.PlannedValue ? element.PlannedValue : 0,
                  AchievedPercent: element.AchievedPercent ? element.AchievedPercent : 0
                }
                GraphObj.Target.push(obj);

                this.graphsValue.push(GraphObj);
              }
            })
          }

          if (graphArr3.length > 0) {
            graphArr3.forEach(element => {
              if (this.graphsValue.find(x => x.PlanType == element.PlanType)) {
                this.graphsValue.forEach(MainElement => {
                  if (MainElement.PlanType == element.PlanType) {

                    MainElement.firstPlannedValue = element.PlannedValue;
                    MainElement.AchievedPercent = element.AchievedPercent;
                    MainElement.ArrowDirection = element.ArrowDirection;
                    MainElement.firstMonthValue = element.AchievedValue;


                    MainElement.graph.labels.push(this.curMonName);
                    MainElement.graph.datasets[0].data.push(element.AchievedValue);
                    let obj = {
                      month: element.Month ? element.Month : 0,
                      monthName: element.Month ? this.curMonName : '',
                      AchievedValue: element.AchievedValue ? element.AchievedValue : 0,
                      PlannedValue: element.PlannedValue ? element.PlannedValue : 0,
                      AchievedPercent: element.AchievedPercent ? element.AchievedPercent : 0
                    }
                    MainElement.Target.push(obj);
                    // MainElement.Target[2].month = element.Month;
                    // MainElement.Target[2].AchievedValue = element.AchievedValue;
                    // MainElement.Target[2].PlannedValue = element.PlannedValue;
                    // MainElement.Target[2].AchievedPercent = element.AchievedPercent;
                  }
                });
              } else {

                let GraphObj = {

                  PlanType: '',
                  AchievedPercent: '',
                  firstPlannedValue: '',
                  lastMonthValue: '',
                  midMonthValue: '',
                  firstMonthValue: '',
                  ArrowDirection: '',
                  Target: [
                    // {
                    //   month: 0,
                    //   AchievedValue: 0,
                    //   PlannedValue: 0,
                    //   AchievedPercent: 0
                    // }
                  ],
                  graph: {
                    labels: [],
                    datasets: [
                      {
                        label: '',
                        backgroundColor: '#42A5F5',
                        borderColor: '#1E88E5',
                        data: []
                      }
                    ]
                  }
                }

                GraphObj.PlanType = element.PlanType;
                GraphObj.firstPlannedValue = element.PlannedValue;
                GraphObj.AchievedPercent = element.AchievedPercent;
                GraphObj.firstMonthValue = element.AchievedValue;
                GraphObj.ArrowDirection = element.ArrowDirection;
                GraphObj.graph.labels.push(this.curMonName);
                GraphObj.graph.datasets[0].data.push(element.AchievedValue);
                GraphObj.graph.datasets[0].label = element.PlanType;

                let obj = {
                  month: element.Month ? element.Month : 0,
                  monthName: element.Month ? this.curMonName : '',
                  AchievedValue: element.AchievedValue ? element.AchievedValue : 0,
                  PlannedValue: element.PlannedValue ? element.PlannedValue : 0,
                  AchievedPercent: element.AchievedPercent ? element.AchievedPercent : 0
                }
                GraphObj.Target.push(obj);

                this.graphsValue.push(GraphObj);
              }
            })
          }

          console.log("this.graphsValue", this.graphsValue);

        }

        //main list data processing-------------------------------------------------------------------
        // console.log(res.MainList);
        if (res.MainList.length != 0 || res.MainList != null) {

          let arr1: any = [];
          let arr2: any = [];
          let arr3: any = [];




          for (var i = 0; i < res.MainList.length; i++) {
            if (res.MainList[i].Month == (parseInt(this.secondLastMonthNo))) {
              arr1 = res.MainList[i];
            }
            if (res.MainList[i].Month == (parseInt(this.firstLastMonthNo))) {
              arr2 = res.MainList[i];
            }
            if (res.MainList[i].Month == (parseInt(this.curMonNo))) {
              arr3 = res.MainList[i];
            }
          }
          // alert("in the function")
          // console.log("last", this.arr1);
          // console.log("second last", this.arr2);
          // console.log("first", this.arr3);

          // this.pureColumns = [];

          let obj = {

            KPI: arr1.PlanType,
            LastAchievedValue: arr1.AchievedValue,
            LastPlannedValue: arr1.PlannedValue,
            LastAchievedPercent: arr1.AchievedPercent,
            LastAchievedPercentDirection: arr1.ArrowDirection,

            secondLastAchievedValue: arr2.AchievedValue,
            secondLastPlannedValue: arr2.PlannedValue,
            secondLastAchievedPercent: arr2.AchievedPercent,
            secondAchievedPercentDirection: arr2.ArrowDirection,


            firstAchievedValue: arr3.AchievedValue,
            firstPlannedValue: arr3.PlannedValue,
            firstAchievedPercentDirection: arr3.ArrowDirection,
            firstAchievedPercent: arr3.AchievedPercent,

          }
          this.pureColumns.push(obj);
        }
        console.log("this.pureColumns", this.pureColumns);

        //Cluster list data processing----------------------------------------------------------------
        if (res.ClusterData.length != 0 || res.ClusterData != null) {

          let ClusterArr1: any = [];
          let ClusterArr2: any = [];
          let ClusterArr3: any = [];

          for (var i = 0; i < res.ClusterData.length; i++) {
            if (res.ClusterData[i].Month == (parseInt(this.secondLastMonthNo))) {
              ClusterArr1.push(res.ClusterData[i]);
            }
            if (res.ClusterData[i].Month == (parseInt(this.firstLastMonthNo))) {
              ClusterArr2.push(res.ClusterData[i]);
            }
            if (res.ClusterData[i].Month == (parseInt(this.curMonNo))) {
              ClusterArr3.push(res.ClusterData[i]);
            }
          }

          // console.log("ClusterArr1", ClusterArr1); //last month
          // console.log("ClusterArr2", ClusterArr2); // mid month
          // console.log("ClusterArr3", ClusterArr3); // current month

          // this.pureColumns = [];
          if (ClusterArr1.length > 0) {
            ClusterArr1.forEach(element => {

              let ClusterObj = {
                ObjectId: '',
                ObjectName: '',
                lastMonthValue: '',
                midMonthValue: '',
                firstMonthValue: '',
              }

              ClusterObj.ObjectId = element.ObjectId;
              ClusterObj.ObjectName = element.ObjectName;
              ClusterObj.lastMonthValue = element.AchievedValue;


              this.allClusterList.push(ClusterObj);

            });
          }

          if (ClusterArr2.length > 0) {
            ClusterArr2.forEach(element => {
              if (this.allClusterList.find(x => x.ObjectId == element.ObjectId)) {
                this.allClusterList.forEach(MainElement => {
                  if (MainElement.ObjectId == element.ObjectId) {
                    MainElement.midMonthValue = element.AchievedValue;
                  }
                });
              } else {

                let ClusterObj = {
                  ObjectId: '',
                  ObjectName: '',
                  lastMonthValue: '',
                  midMonthValue: '',
                  firstMonthValue: '',
                }

                ClusterObj.ObjectId = element.ObjectId;
                ClusterObj.ObjectName = element.ObjectName;
                ClusterObj.midMonthValue = element.AchievedValue;


                this.allClusterList.push(ClusterObj);
              }
            })
          }


          if (ClusterArr3.length > 0) {
            ClusterArr3.forEach(element => {
              if (this.allClusterList.find(x => x.ObjectId == element.ObjectId)) {
                this.allClusterList.forEach(MainElement => {
                  if (MainElement.ObjectId == element.ObjectId) {
                    MainElement.firstMonthValue = element.AchievedValue;
                  }
                });
              } else {

                let ClusterObj = {
                  ObjectId: '',
                  ObjectName: '',
                  lastMonthValue: '',
                  midMonthValue: '',
                  firstMonthValue: '',
                }

                ClusterObj.ObjectId = element.ObjectId;
                ClusterObj.ObjectName = element.ObjectName;
                ClusterObj.firstMonthValue = element.AchievedValue;


                this.allClusterList.push(ClusterObj);
              }
            })
          }

          // console.log("this.allClusterList", this.allClusterList);
        }

        //Store list data processing-------------------------------------------------------------------
        if (res.StoreData.length != 0 || res.StoreData != null) {

          let storeArr1: any = [];
          let storeArr2: any = [];
          let storeArr3: any = [];

          for (var i = 0; i < res.StoreData.length; i++) {
            if (res.StoreData[i].Month == (parseInt(this.secondLastMonthNo))) {
              storeArr1.push(res.StoreData[i]);
            }
            if (res.StoreData[i].Month == (parseInt(this.firstLastMonthNo))) {
              storeArr2.push(res.StoreData[i]);
            }
            if (res.StoreData[i].Month == (parseInt(this.curMonNo))) {
              storeArr3.push(res.StoreData[i]);
            }
          }

          // console.log("storeArr1", storeArr1); //last month
          // console.log("storeArr2", storeArr2); // mid month
          // console.log("storeArr3", storeArr3); // current month

          // this.pureColumns = [];
          if (storeArr1.length > 0) {
            storeArr1.forEach(element => {

              let storeobj = {
                ObjectId: '',
                ObjectName: '',
                lastMonthValue: '',
                midMonthValue: '',
                firstMonthValue: '',
              }

              storeobj.ObjectId = element.ObjectId;
              storeobj.ObjectName = element.ObjectName;
              storeobj.lastMonthValue = element.AchievedValue;


              this.allStoreList.push(storeobj);

            });
          }

          if (storeArr2.length > 0) {
            storeArr2.forEach(element => {
              if (this.allStoreList.find(x => x.ObjectId == element.ObjectId)) {
                this.allStoreList.forEach(MainElement => {
                  if (MainElement.ObjectId == element.ObjectId) {
                    MainElement.midMonthValue = element.AchievedValue;
                  }
                });
              } else {

                let storeobj = {
                  ObjectId: '',
                  ObjectName: '',
                  lastMonthValue: '',
                  midMonthValue: '',
                  firstMonthValue: '',
                }

                storeobj.ObjectId = element.ObjectId;
                storeobj.ObjectName = element.ObjectName;
                storeobj.midMonthValue = element.AchievedValue;


                this.allStoreList.push(storeobj);
              }
            })
          }


          if (storeArr3.length > 0) {
            storeArr3.forEach(element => {
              if (this.allStoreList.find(x => x.ObjectId == element.ObjectId)) {
                this.allStoreList.forEach(MainElement => {
                  if (MainElement.ObjectId == element.ObjectId) {
                    MainElement.firstMonthValue = element.AchievedValue;
                  }
                });
              } else {

                let storeobj = {
                  ObjectId: '',
                  ObjectName: '',
                  lastMonthValue: '',
                  midMonthValue: '',
                  firstMonthValue: '',
                }

                storeobj.ObjectId = element.ObjectId;
                storeobj.ObjectName = element.ObjectName;
                storeobj.firstMonthValue = element.AchievedValue;


                this.allStoreList.push(storeobj);
              }
            })
          }

          console.log("this.allStoreList", this.allStoreList);
        }

        //brand list data processing--------------------------------------------------------------------
        if (res.BrandData.length != 0 || res.BrandData != null) {

          let BrandArr1: any = [];
          let BrandArr2: any = [];
          let BrandArr3: any = [];

          for (var i = 0; i < res.BrandData.length; i++) {
            if (res.BrandData[i].Month == (parseInt(this.secondLastMonthNo))) {
              BrandArr1.push(res.BrandData[i]);
            }
            if (res.BrandData[i].Month == (parseInt(this.firstLastMonthNo))) {
              BrandArr2.push(res.BrandData[i]);
            }
            if (res.BrandData[i].Month == (parseInt(this.curMonNo))) {
              BrandArr3.push(res.BrandData[i]);
            }
          }

          // console.log("BrandArr1", BrandArr1); //last month
          // console.log("BrandArr2", BrandArr2); // mid month
          // console.log("BrandArr3", BrandArr3); // current month

          // this.pureColumns = [];
          if (BrandArr1.length > 0) {
            BrandArr1.forEach(element => {

              let Brandobj = {
                ObjectId: '',
                ObjectName: '',
                lastMonthValue: '',
                midMonthValue: '',
                firstMonthValue: '',
              }

              Brandobj.ObjectId = element.ObjectId;
              Brandobj.ObjectName = element.ObjectName;
              Brandobj.lastMonthValue = element.AchievedValue;


              this.allBrandList.push(Brandobj);

            });
          }

          if (BrandArr2.length > 0) {
            BrandArr2.forEach(element => {
              if (this.allBrandList.find(x => x.ObjectId == element.ObjectId)) {
                this.allBrandList.forEach(MainElement => {
                  if (MainElement.ObjectId == element.ObjectId) {
                    MainElement.midMonthValue = element.AchievedValue;
                  }
                });
              } else {

                let Brandobj = {
                  ObjectId: '',
                  ObjectName: '',
                  lastMonthValue: '',
                  midMonthValue: '',
                  firstMonthValue: '',
                }

                Brandobj.ObjectId = element.ObjectId;
                Brandobj.ObjectName = element.ObjectName;
                Brandobj.midMonthValue = element.AchievedValue;


                this.allBrandList.push(Brandobj);
              }
            })
          }


          if (BrandArr3.length > 0) {
            BrandArr3.forEach(element => {
              if (this.allBrandList.find(x => x.ObjectId == element.ObjectId)) {
                this.allBrandList.forEach(MainElement => {
                  if (MainElement.ObjectId == element.ObjectId) {
                    MainElement.firstMonthValue = element.AchievedValue;
                  }
                });
              } else {

                let Brandobj = {
                  ObjectId: '',
                  ObjectName: '',
                  lastMonthValue: '',
                  midMonthValue: '',
                  firstMonthValue: '',
                }

                Brandobj.ObjectId = element.ObjectId;
                Brandobj.ObjectName = element.ObjectName;
                Brandobj.firstMonthValue = element.AchievedValue;


                this.allBrandList.push(Brandobj);
              }
            })
          }

          // console.log("this.allBrandList", this.allBrandList);
        }

        this.isGraphsValue = this.graphsValue.length > 0 ? true : false;
        this.isAureColumns = res.MainList.length > 0 ? true : false;
        this.isAllClusterList = this.allClusterList.length > 0 ? true : false;
        this.isAllStoreList = this.allStoreList.length > 0 ? true : false;
        this.isAllBrandList = this.allBrandList.length > 0 ? true : false;

        console.log(this.isGraphsValue, this.isAureColumns, this.isAllClusterList, this.isAllStoreList, this.isAllBrandList);
        // document.body.scrollTop = 0;
        // document.documentElement.scrollTop = 0;
        document.getElementById("section1").scrollIntoView();
      },
      (err) => {
        console.log(err);
      },
    );

  }

}
