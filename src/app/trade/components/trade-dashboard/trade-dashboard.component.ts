import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { TradeCustomerService } from 'app/shared/services/trade-customer.service';
import { LadgerEntryService } from 'app/shared/services/ladger-entry.service';
import { TradeitemmasterService } from 'app/shared/services/tradeitemmaster.service';
import { TradeDashboardDc } from 'app/shared/interface/trade-dashboard-dc';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TradeDashboardFilters } from 'app/shared/interface/trade/trade-dashboard-filters';


@Component({
  selector: 'app-trade-dashboard',
  templateUrl: './trade-dashboard.component.html',
  styleUrls: ['./trade-dashboard.component.scss']
})
export class TradeDashboardComponent implements OnInit {
  MonthList: any[];
  dailyList: any[];
  TotalSalesDay: any[];
  TotalSalesMonth: any[];
  tradeDashboardDc: TradeDashboardDc;
  tradeDashboardFilters: TradeDashboardFilters;
  cityList: any[];
  isSearch: boolean;
  selectedCity: any;
  CategoryList: any[];
  tradedashboard: any;
  yearList: any[];
  blocked: boolean;
  selectedcategory: number;



  constructor(private tradeitemmasterService: TradeitemmasterService,
    private TradeCustomerService: TradeCustomerService,
    private router: Router,
    private ItemServices: TradeitemmasterService, ) {

    this.tradedashboard = {};

    this.TotalSalesDay = [
      {
        count: 0,
        amount: 0
      }
    ]


    this.TotalSalesMonth = [
      {
        count: 0,
        amount: 0
      }
    ]
  }

  ngOnInit() {
    this.blocked = true;
    this.tradeDashboardFilters = {
      City: "",
      categoryid: null
    }
    this.selectedCity = null;
    this.tradedashboard = {};
    this.selectedcategory = null;

    this.ItemServices.SelectCategoryV2().subscribe(result => {
      this.CategoryList = result;
      console.log('this.CategoryName: ', this.CategoryList);
    });



    this.tradeDashboardDc = {
      DeliveredCountToday: 0,
      DeliveredAmountToday: 0,
      CancledCountToday: 0,
      CancledAmountToday: 0,
      PlacedCountToday: 0,
      PlacedAmountToday: 0,
      DeliveredCountMonth: 0,
      DeliveredAmountMonth: 0,
      CancledCountMonth: 0,
      CancledAmountMonth: 0,
      PlacedCountMonth: 0,
      PlacedAmountMonth: 0,
      DeliveredCountAllTime: 0,
      DeliveredAmountAllTime: 0,
      CancledCountAllTime: 0,
      CancledAmountAllTime: 0,
      PlacedCountAllTime: 0,
      PlacedAmountAllTime: 0,
      DeliveredCountYear: 0,
      DeliveredAmountYear: 0,
      PlacedCountYear: 0,
      PlacedAmountYear: 0,
    };

    this.ItemServices.SelectCity().subscribe(result => {
      console.log('thisressfsdfsdf ', result);
      this.cityList = result.filter(x => x == "Indore" || x=="Lucknow" || x=="Gwalior"|| x=="Raipur" || x=="Ahmedabad" ||
        x=="Kota" || x=="Jodhpur" || x=="Jabalpur" || x=="Ujjain" || x=="Udaipur" || x.startsWith('Jaipur'));


      console.log('this.cityListcityList:dfgdfsgdfsgdfsgdfsgdfshdfshdfghdftsgh ', this.cityList);
    });



    this.blocked = false;
    this.onInitialize(this.tradeDashboardFilters);



  }

  onInitialize(tradeDashboardFilters: TradeDashboardFilters) {
    this.blocked = true;
    //
    this.tradeDashboardDc.DeliveredCountToday = 0;
    this.tradeDashboardDc.DeliveredAmountToday = 0;
    this.tradeDashboardDc.CancledCountToday = 0;
    this.tradeDashboardDc.CancledAmountToday = 0;
    this.tradeDashboardDc.PlacedCountToday = 0;
    this.tradeDashboardDc.PlacedAmountToday = 0;
    this.tradeDashboardDc.DeliveredCountMonth = 0;
    this.tradeDashboardDc.DeliveredAmountMonth = 0;
    this.tradeDashboardDc.CancledCountMonth = 0;
    this.tradeDashboardDc.CancledAmountMonth = 0;
    this.tradeDashboardDc.PlacedCountMonth = 0;
    this.tradeDashboardDc.PlacedAmountMonth = 0;
    this.tradeDashboardDc.DeliveredCountYear = 0;
    this.tradeDashboardDc.DeliveredAmountYear = 0;
    this.tradeDashboardDc.PlacedCountYear = 0;
    this.tradeDashboardDc.PlacedAmountYear = 0;
    this.tradeDashboardDc.DeliveredCountAllTime = 0;
    this.tradeDashboardDc.DeliveredAmountAllTime = 0;
    this.tradeDashboardDc.CancledCountAllTime = 0;
    this.tradeDashboardDc.CancledAmountAllTime = 0;
    this.tradeDashboardDc.PlacedCountAllTime = 0;
    this.tradeDashboardDc.PlacedAmountAllTime = 0;

    this.tradeitemmasterService.GetTradeDashboardMonth(tradeDashboardFilters).subscribe(result => {
      this.blocked = true;

      this.MonthList = result;
      console.log("resultresultresultresultresultresult", result);

      console.log("this.ledgerList", this.MonthList);
      // var v1 = this.MonthList.filter(x => x.CurrentStatus == "Cancelled" || x.CurrentStatus == "Canceled by System")

      // v1.forEach(element => {
      //   console.log(element);
      //   this.tradeDashboardDc.CancledCountMonth += element.counts;
      //   this.tradeDashboardDc.CancledAmountMonth += element.amount;
      // });


      var v2 = this.MonthList.filter(x => x.CurrentStatus == "Delivered")
      v2.forEach(element => {
        console.log(element);
        this.tradeDashboardDc.DeliveredCountMonth += element.counts;
        this.tradeDashboardDc.DeliveredAmountMonth += element.amount;
      });
      this.tradeDashboardDc.DeliveredAmountMonth = (this.tradeDashboardDc.DeliveredAmountMonth / 10000000);

      var v3 = this.MonthList.filter(x => x.CurrentStatus == "Booked" || x.CurrentStatus == "Confirmed")
      v3.forEach(element => {
        console.log(element);
        this.tradeDashboardDc.PlacedCountMonth += element.counts;
        this.tradeDashboardDc.PlacedAmountMonth += element.amount;
      });
      this.tradeDashboardDc.PlacedAmountMonth = (this.tradeDashboardDc.PlacedAmountMonth / 10000000);
      console.log("this.totaltotaltotaltotaltotaltotal", this.tradeDashboardDc);
      this.blocked = false;
    })
    this.blocked = true;

    this.tradeitemmasterService.GetTradeDashboardDaily(tradeDashboardFilters).subscribe(result => {
      this.blocked = true;
      this.dailyList = result;
      console.log("resultresultresultresultresultresult", result);

      console.log("this.ledgerList", this.dailyList);
      // var v1 = this.dailyList.filter(x => x.CurrentStatus == "Cancelled" || x.CurrentStatus == "Canceled by System")

      // v1.forEach(element => {
      //   console.log(element);
      //   this.tradeDashboardDc.CancledCountToday += element.counts;
      //   this.tradeDashboardDc.CancledAmountToday += element.amount;
      // });
      var v2 = this.dailyList.filter(x => x.CurrentStatus == "Delivered")
      v2.forEach(element => {
        console.log(element);
        this.tradeDashboardDc.DeliveredCountToday += element.counts;
        this.tradeDashboardDc.DeliveredAmountToday += element.amount;
      });
      this.tradeDashboardDc.DeliveredAmountToday = (this.tradeDashboardDc.DeliveredAmountToday / 10000000);
      var v3 = this.dailyList.filter(x => x.CurrentStatus == "Booked" || x.CurrentStatus == "Confirmed")
      v3.forEach(element => {
        console.log(element);
        this.tradeDashboardDc.PlacedCountToday += element.counts;
        this.tradeDashboardDc.PlacedAmountToday += element.amount;
      });
      this.tradeDashboardDc.PlacedAmountToday = (this.tradeDashboardDc.PlacedAmountToday / 10000000);
      console.log("this.totaltotaltotaltotaltotaltotal", this.tradeDashboardDc);
      this.blocked = false;
    })
    this.blocked = true;
    //for Year
    this.tradeitemmasterService.GetTradeDashboardYearly(tradeDashboardFilters).subscribe(result => {

      this.blocked = true;
      this.yearList = result;

      var v1 = this.yearList.filter(x => x.CurrentStatus == "Delivered")
      v1.forEach(element => {
        console.log(element);
        this.tradeDashboardDc.DeliveredCountYear += element.counts;
        this.tradeDashboardDc.DeliveredAmountYear += element.amount;
      });
      this.tradeDashboardDc.DeliveredAmountYear = (this.tradeDashboardDc.DeliveredAmountYear / 10000000);
      var v2 = this.yearList.filter(x => x.CurrentStatus == "Booked" || x.CurrentStatus == "Confirmed")
      v2.forEach(element => {
        console.log(element);
        this.tradeDashboardDc.PlacedCountYear += element.counts;
        this.tradeDashboardDc.PlacedAmountYear += element.amount;
      });
      this.tradeDashboardDc.PlacedAmountYear = (this.tradeDashboardDc.PlacedAmountYear / 10000000);
      this.blocked = false;
    })

  }

  onCityClick(selectedCity) {


    this.tradeDashboardFilters.City = selectedCity;
    this.onInitialize(this.tradeDashboardFilters);

  }

  oncatClick(selectedcategory) {
    this.tradeDashboardFilters.categoryid = selectedcategory;
    this.onInitialize(this.tradeDashboardFilters);


  }

  toggleSearch() {
    if (this.isSearch == true) {
      this.isSearch = false;
    } else {

      this.isSearch = true;

    }
  }


}



