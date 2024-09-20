import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { TradeCustomerService } from 'app/shared/services/trade-customer.service';
import { LadgerEntryService } from 'app/shared/services/ladger-entry.service';
import { TradeitemmasterService } from 'app/shared/services/tradeitemmaster.service';
import { TradeDashboardDc } from 'app/shared/interface/trade-dashboard-dc';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TradeMisTarget } from 'app/shared/interface/trade/trade-mis-target';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-mis-dashboard',
  templateUrl: './mis-dashboard.component.html',
  styleUrls: ['./mis-dashboard.component.scss']
})
export class MisDashboardComponent implements OnInit {

  CategoryName: any[];
  FinalData: any;
  years: any[];
  cityList: any[];
  tradeMisTarget: TradeMisTarget;
  isInvalid: boolean;
  dcityList: any;
  datatoshow: any;
  showTable: boolean;
  percentage: any;
  defaultMonth: number;
  defaultYear: number;



  constructor(private tradeitemmasterService: TradeitemmasterService,
    private TradeCustomerService: TradeCustomerService,
    private router: Router,
    private ItemServices: TradeitemmasterService,
    private messageService: MessageService) {
    this.FinalData = {};
    this.years = [];
    this.datatoshow = {};
    this.dcityList = {};
    this.percentage = {};

  }

  ngOnInit() {


    
    this.ItemServices.SelectCategoryv1().subscribe(result => {
      this.CategoryName = result;

      console.log('this.CategoryName: ', this.CategoryName);
    });

    this.ItemServices.SelectCity().subscribe(result => {
      this.cityList = result;

      console.log('this.cityListcityList: ', this.cityList);
    });





    var year = new Date().getFullYear();
    this.defaultYear = year;
    this.FinalData.Year=this.defaultYear;
    console.log(" this.defaultYear  this.defaultYear  this.defaultYear  this.defaultYear ",this.defaultYear);
    var range = [];
    range.push(year);
    for (var i = 1; i < 7; i++) {
      range.push(year + i);
    }
    this.years = range;
    console.log('this.years this.years  ', this.years);


    var date = new Date().getDate();
    var Month = (new Date().getMonth()) + 1;
    this.defaultMonth = Month;
    this.FinalData.Month = this.defaultMonth;


  }


  Search(TargetAddForm: any, tradeMisTarget: TradeMisTarget) {
    

    if (TargetAddForm.form.status == "VALID") {
      console.log(TargetAddForm);

      console.log(tradeMisTarget);
      this.ItemServices.GetMisTarget(tradeMisTarget).subscribe(result => {
        this.dcityList = result;
        for (var i in this.dcityList) {

          if (this.dcityList[i].Month == 1) {
            this.dcityList[i].Month = "January"
          }
          else if (this.dcityList[i].Month == 2) {

            this.dcityList[i].Month = "February"
          }
          else if (this.dcityList[i].Month == 3) {

            this.dcityList[i].Month = "March"
          }
          else if (this.dcityList[i].Month == 4) {

            this.dcityList[i].Month = "April"
          }
          else if (this.dcityList[i].Month == 5) {

            this.dcityList[i].Month = "May"
          }
          else if (this.dcityList[i].Month == 6) {

            this.dcityList[i].Month = "June"
          }
          else if (this.dcityList[i].Month == 7) {

            this.dcityList[i].Month = "July"
          }
          else if (this.dcityList[i].Month == 8) {

            this.dcityList[i].Month = "August"
          }
          else if (this.dcityList[i].Month == 9) {

            this.dcityList[i].Month = "September"
          }
          else if (this.dcityList[i].Month == 10) {

            this.dcityList[i].Month = "October"
          }
          else if (this.dcityList[i].Month == 11) {

            this.dcityList[i].Month = "November"
          }
          else if (this.dcityList[i].Month == 12) {

            this.dcityList[i].Month = "December"
          }
        }

        console.log('dcityList.dcifgfgfgfgfgfgggggggggggggggggggggggggggggggggggggggggggggggtyList: ', this.dcityList);
        this.showTable = true;


        // this.datatoshow.TargetinMonth =  this.dcityList.TotalMonthSales;
        // this.datatoshow.TotalDaySales =  this.dcityList.TotalDaySales;


      });


      // this.ItemServices.GetMisTargetSearch(tradeMisTarget).subscribe(x => {
      //   this.datatoshow = x;
      //   this.percentage.percentage = ((this.dcityList.TotalMonthSales/this.datatoshow.Target)*100).toFixed(2);
      //   console.log('datatoshow ', this.datatoshow);
      //   this.FinalData = {};
      // });




    }
    else {
      this.isInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'PLease Fill All Feilds !!', detail: '' });

    }


  }


  addTArget() {
    this.router.navigateByUrl('/layout/trade/mis-target')
  }

}
