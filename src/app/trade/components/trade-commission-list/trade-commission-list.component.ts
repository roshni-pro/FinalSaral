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
import { TradeCommissionFilters } from '../../../shared/interface/trade/trade-commission-dc';

@Component({
  selector: 'app-trade-commission-list',
  templateUrl: './trade-commission-list.component.html',
  styleUrls: ['./trade-commission-list.component.scss']
})
export class TradeCommissionListComponent implements OnInit {

  tradelistData:any;
  tradeCommissionDc: TradeCommissionDc;
  tradeCommissionFilters: TradeCommissionFilters;
  tradelist : any[];
  cityList: any[];
  CategoryList: any[];
  isSearch:boolean;
  blocked:boolean;
  constructor(
    private tradeitemmasterService: TradeitemmasterService,
    private TradeCustomerService: TradeCustomerService,
    private router: Router,
    private ItemServices: TradeitemmasterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) 
  { 
    this.tradelistData={};
 }

  ngOnInit() {
    this.isSearch=true;
    this.tradelistData.city="";
    this.tradeCommissionFilters = {
      CategoryId : null,
      City : null,
    }
  
    this.ItemServices.SelectCity().subscribe(result => {
      this.cityList = result;
      console.log('this.cityListcityList: ', this.cityList);
    });

    this.ItemServices.SelectCategoryV2().subscribe(result => {
      this.CategoryList = result;
      this.onInitialize(this.tradeCommissionFilters);
      console.log('this.CategoryName: ', this.CategoryList);
    });


   
    

  }

  onInitialize(tradeCommissionFilters: TradeCommissionFilters)
  {
    this.blocked=true;
    this.ItemServices.GetTradeCommission(tradeCommissionFilters).subscribe(result => {
      this.blocked=false;
      this.tradelist = result;
      for(var i=0; i< this.tradelist.length;i++)
      {
        for(var j=0;j< this.CategoryList.length;j++)
        {
          if( this.tradelist[i].CategoryId==this.CategoryList[j].CategoryId)
          {
            this.tradelist[i].CategoryName = this.CategoryList[j].CategoryName;            
          }
        }
       
      }
     
     
    });
  }

  onSave(tradelistData)
  {
   console.log('this.tradelist: ', this.tradelistData);
    if(tradelistData != null)
    {
      this.tradeCommissionFilters.CategoryId=tradelistData.CategoryId;
      this.tradeCommissionFilters.City=tradelistData.city;
      this.onInitialize(this.tradeCommissionFilters);
    }
   else{
    this.tradeCommissionFilters.CategoryId=null;
    this.tradeCommissionFilters.City=null;
    this.onInitialize(this.tradeCommissionFilters);
   }
   

  }

  //Active/Inactive Commission List
  ActiveCommissionlist(data)
  {
     console.log('Commissiondata=',data);  
     this.confirmationService.confirm({
      message: 'Are you sure.You want to active for given City? because,it is a way to directly connecting  with End users.Creator is only responsible for this. Please make sure all the details added by you are correct and verified !!',
      accept: () => {
        this.ItemServices.UpdateTradeCommission(data).subscribe(result=>{
          if(result != null)
          {
            this.messageService.add({ severity: 'success', summary: 'trade-Commission-list Activeted Successfully!!,for given City.', detail: '' });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        });
      },
      reject: () =>
      {
        if(data.IsActive == true)
        {
          data.IsActive=false;
        }
        else
        {
          data.IsActive=true;
        }
      }
    });

  }

  //to Disable Search Button when drop-down in Empty.
  gettradedata(list)
  {
  if(list != null)
  {
    this.isSearch=false;
  }
  }



}
