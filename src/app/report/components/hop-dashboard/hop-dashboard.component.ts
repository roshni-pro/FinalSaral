import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HopService } from 'app/report/services/hop.service';
import * as moment from 'moment';


@Component({
  selector: 'app-hop-dashboard',
  templateUrl: './hop-dashboard.component.html',
  styleUrls: ['./hop-dashboard.component.scss']
})
export class HopDashboardComponent implements OnInit {
  tabledata: any;
  typeVal: number;
  summaryRecord: any;
  quarterTable: boolean;
  monthTable: boolean;
  curMonName: any;
  firstLastMonth: any;
  secondLastMonth: any;
  curMonNo: any;
  firstLastMonthNo: any;
  secondLastMonthNo: any;
  firstYear:any;
  secondYear:any;
  curYear: any;
  groupArr: [];
  pureColumns: any[] = [];
  headerList: any[] = []
  arr1: any[] = []
  arr2: any[] = []
  arr3: any[] = []
  getItemRecord: any;
  headsDropdownVal: any;
  headWithHeadNameArr: any[] = []
  // headsArr2: any[] = []
  // headsArr3: any[] = []

  selectedPlantype: string = ''

  constructor(private _service: HopService, public router: Router) {
  }

  ngOnInit() {

    this.curMonName = moment().subtract(0, 'months').format('MMM');
    this.secondLastMonth = moment().subtract(2, 'months').format('MMM');
    this.firstLastMonth = moment().subtract(1, 'months').format('MMM');
    this.curYear = new Date().getFullYear().toString();

    this.curMonNo = moment().subtract(0, 'months').format('M');
    this.secondLastMonthNo = moment().subtract(2, 'months').format('M');
    this.firstLastMonthNo = moment().subtract(1, 'months').format('M');
    this.firstYear= (moment().subtract(1, 'months').format('Y')).toString();
    this.secondYear= (moment().subtract(2, 'months').format('Y')).toString();
    this.quarterList();
  }



  quarterList() {
    const qurterno = 1
    this.arr1 = [];
    this.arr2 = [];
    this.arr3 = [];
    let Payload = {
      'type': 1,
      'plantype': '',
      'storeid': '',
      'warehouseid': '',
    }
    this._service.getOverallSummary(Payload).subscribe(res => {
      console.log(res);
      this.summaryRecord = res;
      this.summaryRecord.forEach(element => {
        element.Summary = element.Summary.filter(x =>
          ['Dispatch', 'Monthly Active User', 'Cancellation %', 'Spill Over %', 'Hit'].includes(x.PlanType)
        );
      });
   
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
        if (this.summaryRecord[i].Month == (parseInt(this.secondLastMonthNo) )) {
          this.arr1 = this.summaryRecord[i].Summary;
        }
        if (this.summaryRecord[i].Month == (parseInt(this.firstLastMonthNo) )) {
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
          // ArrowDirection
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
      console.log(this.pureColumns)
    })
  }

  // getSwitchVal(val) {
  //   this.typeVal = val;
  //   if (this.typeVal == 2) {
  //     this.quarterTable = true
  //     this.monthTable = false;
  //   } else {
  //     this.monthTable = true
  //     this.quarterTable = false;
  //   }
  //   this._service.getOverallSummary(this.typeVal).subscribe(res => {
  //     console.log(res);
  //     this.summaryRecord = res;

  //   })
  // }


  getRecord(item) {
    console.log(item);
    const newVal = { 'type': this.typeVal || 1 }
    const data = Object.assign(item, newVal);
    localStorage.setItem('hopSumryHeads', JSON.stringify(this.summaryRecord));
    localStorage.setItem('hopSumry', JSON.stringify(data));
    window.open('#' + '/layout/report/hopDashSumry', '_blank');

  }


}


