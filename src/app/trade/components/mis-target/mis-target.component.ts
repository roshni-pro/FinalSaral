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
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-mis-target',
  templateUrl: './mis-target.component.html',
  styleUrls: ['./mis-target.component.scss']
})
export class MisTargetComponent implements OnInit {


  @Output() refreshParent = new EventEmitter();

  CategoryName: any[];
  FinalData: any;
  years: any[];
  cityList: any[];
  tradeMisTarget: TradeMisTarget;
  isInvalid: boolean;
  allTargetList: any;
  cols: any[];
  defaultMonth: number;
  defaultYear: number;







  constructor(private tradeitemmasterService: TradeitemmasterService,
    private TradeCustomerService: TradeCustomerService,
    private router: Router,
    private ItemServices: TradeitemmasterService,
    private messageService: MessageService
  ) {
    this.FinalData = {};
    this.years = [];
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



    this.ItemServices.GetAllMisTargets().subscribe(result => {
      this.allTargetList = result;
      console.log('this.allTargetListallTargetListallTargetList: ', this.allTargetList);
      for (var i in this.allTargetList) {

        if (this.allTargetList[i].Month == 1) {
          this.allTargetList[i].Month = "January"
        }
        else if (this.allTargetList[i].Month == 2) {

          this.allTargetList[i].Month = "February"
        }
        else if (this.allTargetList[i].Month == 3) {

          this.allTargetList[i].Month = "March"
        }
        else if (this.allTargetList[i].Month == 4) {

          this.allTargetList[i].Month = "April"
        }
        else if (this.allTargetList[i].Month == 5) {

          this.allTargetList[i].Month = "May"
        }
        else if (this.allTargetList[i].Month == 6) {

          this.allTargetList[i].Month = "June"
        }
        else if (this.allTargetList[i].Month == 7) {

          this.allTargetList[i].Month = "July"
        }
        else if (this.allTargetList[i].Month == 8) {

          this.allTargetList[i].Month = "August"
        }
        else if (this.allTargetList[i].Month == 9) {

          this.allTargetList[i].Month = "September"
        }
        else if (this.allTargetList[i].Month == 10) {

          this.allTargetList[i].Month = "October"
        }
        else if (this.allTargetList[i].Month == 11) {

          this.allTargetList[i].Month = "November"
        }
        else if (this.allTargetList[i].Month == 12) {

          this.allTargetList[i].Month = "December"
        }
      }
    });








    var year = new Date().getFullYear();
    this.defaultYear = year;
    this.FinalData.Year = this.defaultYear;
    console.log(" this.defaultYear  this.defaultYear  this.defaultYear  this.defaultYear ", this.defaultYear);
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

  onSave(TargetAddForm: any, tradeMisTarget: TradeMisTarget) {
    

    if (TargetAddForm.form.status == "VALID") {
      console.log(TargetAddForm);

      console.log(tradeMisTarget);
      this.ItemServices.InsertMisTarget(tradeMisTarget).subscribe(result => {
        var dcityList = result;
        
        if (!result) {
          
          this.messageService.add({ severity: 'error', summary: 'Targetr for this month and category is already added !!', detail: '' });
          this.FinalData = {};
          return;
        }
        console.log('this.dcityList: ', dcityList);
        this.messageService.add({ severity: 'success', summary: 'Target Saved  !!', detail: '' });
        this.FinalData = {};
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });



  
    }
    else {
      this.isInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'PLease Fill All Feilds !!', detail: '' });
    }
  }

  RefreshParent() {
    this.refreshParent.emit();
  }









}
