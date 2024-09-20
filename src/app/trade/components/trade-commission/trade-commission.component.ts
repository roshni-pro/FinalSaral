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
import { TradeCommissionDc } from 'app/shared/interface/trade/trade-commission-dc';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-trade-commission',
  templateUrl: './trade-commission.component.html',
  styleUrls: ['./trade-commission.component.scss']
})
export class TradeCommissionComponent implements OnInit {

  tradeCommissionDc: TradeCommissionDc;
  seletedData: any;
  radiodisabled: boolean;
  cityList: any[];
  CategoryList: any[];
  dateradiodisabled: boolean;
  showrange: boolean;
  showmonth: boolean
  minDateValue: any;
  showcityandcategory: boolean;
  showDateFilters: boolean;
  showcommisionwindow: boolean;
  rangeDates: Date[];
  datemonth: any;

  constructor(private tradeitemmasterService: TradeitemmasterService,
    private TradeCustomerService: TradeCustomerService,
    private router: Router,
    private ItemServices: TradeitemmasterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService, ) {
    this.seletedData = {};

  }
  ngOnInit() {
    this.radiodisabled = false;
    this.tradeCommissionDc = {
      IsSeller: null,
      IsBuyer: null,
      CategoryId: null,
      City: null,
      CommissionPercent: null,
      CrudType: null,
      EndDate: null,
      EndRange: null,
      Id: null,
      IsActive: null,
      IsDelete: null,
      MaxCommissionAmount: null,
      StartDate: null,
      StartRange: null,
    }

    this.minDateValue = new Date();
    console.log('this.this.minDateValuethis.minDateValuethis.minDateValuethis.minDateValue: ', this.minDateValue);


    this.ItemServices.SelectCity().subscribe(result => {
      this.cityList = result;
      console.log('this.cityListcityList: ', this.cityList);
    });

    this.ItemServices.SelectCategoryV2().subscribe(result => {
      this.CategoryList = result;

      console.log('this.CategoryName: ', this.CategoryList);
    });



  }



  onSave(masterForm: any, tradeCommissionDc: TradeCommissionDc) {
    
    if (masterForm.form.status == "VALID") {
      console.log(masterForm);

      console.log(tradeCommissionDc);

      console.log("rangeDatesrangeDatesrangeDates", this.rangeDates);

      console.log("rangeDatesrangeDatesrangeDates", this.datemonth);

      if (tradeCommissionDc.StartRange > tradeCommissionDc.EndRange)
      {
        this.messageService.add({ severity: 'error', summary: 'Start range ₹ shuld always be grater than end range ₹ !!', detail: '' });
        return;

      }
      

      if (this.rangeDates[0] != null && this.rangeDates[1] != null && this.rangeDates.length > 1) {
        this.tradeCommissionDc.StartDate = this.rangeDates[0];
        this.tradeCommissionDc.EndDate = this.rangeDates[1];
        this.tradeCommissionDc.IsActive = true;
      } else {
        this.messageService.add({ severity: 'error', summary: 'PLease Select the date range correctly!!', detail: '' });
        return;
      }
      this.confirmationService.confirm({
        message: 'Please create a required Commission only. It is a way to directly connecting  with End users. Creator is only responsible for this. Please make sure all the details added bu you are correct and verified !!!',
        accept: () => {

          this.tradeCommissionDc.CrudType = "insert";
          
          this.ItemServices.CommissionCrud(this.tradeCommissionDc).subscribe(result => {
            
            var resultss = result;
            if (!result) {
              
              this.messageService.add({ severity: 'error', summary: 'Commission for this date range and category and city is already added !! please fill the form again!', detail: '' });

              setTimeout(() => {
                window.location.reload();
              }, 4000);

            } else {

              console.log("result ", result);

              this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'commision for seleted days Saved Successfully!!!' });

              this.ngOnInit();
              this.router.navigateByUrl("layout/trade/trade-commission-list");


            }

          });



        }
      });

    } else {
      this.messageService.add({ severity: 'error', summary: 'PLease Fill All Feilds !!', detail: '' });

    }



  }


  onEventTypeChange(seletedData) {
    console.log(seletedData, "seletedDataseletedDataseletedDataseletedDataseletedData")
    this.radiodisabled = true;
    this.showcityandcategory = true;
  }

  onCategory() {

    this.showDateFilters = true;
  }
  onDate() {
    
    this.showcommisionwindow = true;
  }

  onDateSelect(seletedData) {
    
    console.log(seletedData, "seletedDataseletedDataseletedDataseletedDataseletedData")
    this.dateradiodisabled = true;

    if (this.seletedData.range == "true") {
      this.showrange = true;
    }
    if (this.seletedData.month == "true") {
      this.showmonth = true;
    }

  }

}
