import { Component, OnInit } from '@angular/core';
import { ReferralServService } from '../customerService/referral-serv.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CityService } from 'app/shared/services/city.service';
import { RatingService } from 'app/rating/service/rating.service';
import * as moment from 'moment';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-van-transaction',
  templateUrl: './van-transaction.component.html',
  styleUrls: ['./van-transaction.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class VanTransactionComponent implements OnInit {

  vanTransactionList: any[] = [];
  // subVanTransactionList: any[] = [];
  cityList: any[] = [];
  selectedCityList: any[] = [];

  cityIds: any[] = [];
  hubList: any;
  selectedHubList: any[] = [];
  keyword: string = '';

  VanDC: {
    WarehouseIds: number[],
    keyward: string
  }

  first: number = 0;

  vanOrderList:any;
  remainAmount:number;

  constructor(private apiService: ReferralServService, 
              private cityService: CityService, 
              private ratingService: RatingService,
              private exportService : ExportServiceService, ) {}

  ngOnInit() {
    // this.getAllCity();
    this.getVanTransactionBySKcode();

    this.cityService.GetActiveCity().subscribe(result => {
      this.cityList = result;
    })
  }


  getVANTransactionList() {
    let datatopost = {
      WarehouseIds: [0],
      keyward: ''
    }
    this.apiService.GetVANTransactionList(datatopost).subscribe(
      (res: any[]) => {
        console.log(res);
        if (res.length > 0) {
          this.vanTransactionList = res;
        }
        else {
          this.vanTransactionList = [];
        }
      },
      (err) => {
        console.log(err)
      }
    );
  }

  // getSubVANTransactionList(id) {
  //   this.apiService.GetSubVANTransactionList(id).subscribe(
  //     (res: any[]) => {
  //       console.log(res);
  //       if (res.length > 0) {
  //         this.subVanTransactionList = res;
  //       }
  //       else {
  //         this.subVanTransactionList = [];
  //       }
  //     },
  //     (err) => {
  //       console.log(err)
  //     }
  //   );
  // }


  filterList:any;
  onSelectCity(selectedCityList) {
    this.cityIds = [];
    selectedCityList.forEach(element => {
      this.cityIds.push(element.Cityid);
    });

    this.ratingService.getCityWiseHubList(this.cityIds).subscribe(x => {
      this.hubList = x;
      this.hubList = this.hubList.filter(x => x.IsKPP === false)
      this.selectedHubList = this.hubList;
      // this.onSelectHub(this.selectedHubList);
      //console.log('xxx', x);
    })
  }


  getVanTransactionByFilter() {
    console.log("selectedHubList", this.selectedHubList);
  }

  vanArray=[];
  getVanTransactionBySKcode() {

    let ids: any[] = [0];
    if (this.selectedHubList.length > 0) {
      ids = [];
      this.selectedHubList.forEach(element => {
        ids.push(element.WarehouseId);
      });
    }
    let datatopost = {
      WarehouseIds: ids,
      keyward: this.keyword
    }

    // debugger;
    this.apiService.GetVANTransactionList(datatopost).subscribe(
      (res: any[]) => {
        //console.log(res);
        if (res.length > 0) {
          // this.vanTransactionList = undefined;
          // debugger
          this.vanTransactionList = res;
          this.first = 0;
        }
        else {
          this.vanTransactionList = [];
        }
      },
      (err) => {
        this.vanTransactionList = [];

        console.log(err)
      }
    );
  }

  exportDownload(){

    this.vanTransactionList.forEach(object => {
      object.remain_amount = object.Amount - object.UsedAmount;
    });

    var result = this.vanTransactionList.map(function(a){
      return{
        'Warehouse' : a.WarehouseName,
        'Sk-Code' : a.Skcode,
        'Reference Number' : a.AlertSequenceNo,
        'User Reference Number' : a.UserReferenceNumber,
        'Name' : a.Name,
        'Mobile' : a.Mobile,
        'Added Amount' : a.Amount,
        'Created Date' : a.CreatedDate,
        'Mode Of Payment' : 'RTGS',
        'Used Amount' : a.UsedAmount,
        'Remaining Amount' : a.remain_amount
      }
    })
    this.exportService.exportAsExcelFile(result, 'Van-transaction');
  }

  subExcelDownload(details){
    var getData = details
    var resultData = getData.map(function(a){
      return{
        'OrderID' : a.ObjectId,
        'Order Amount' : a.OrderAmount,
        'Used Amount' : a.UsedAmount,
        'Created Date' : a.CreatedDate,
      }
    })
    this.exportService.exportAsExcelFile(resultData, 'Van-transaction');

  }



}
