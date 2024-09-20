import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from 'app/shared/services/city.service';
import { DelightService } from '../delight.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-customer-tracking-list',
  templateUrl: './customer-tracking-list.component.html',
  styleUrls: ['./customer-tracking-list.component.scss']
})
export class CustomerTrackingListComponent implements OnInit {

  customerlist: any[];
  TotalCount: number;
  skip: any;
  take: any;
  data: any;
  cityList: any;
  clusterList: any;
  Cityid: number;
  blocked: boolean;
  SelectedStatus: any;
  IsDocument: any;
  TotalPending: number;
  TotalRequest: number;
  TotalVerified: number;
  TotalReject: number;
  TotalActive: number;
  isShowCustomerDetail: boolean = false;
  Id: number;
  rows: number = 10;
  first: number = 0;
  detail: any;

  constructor(private _service: DelightService, private cityService: CityService, public router: Router, private exportService: ExportServiceService) {
    this.data = {};

  }

  ngOnInit() {
    this.blocked = true;
    this.data.CustomerType = "All";
    this.SelectedStatus = 0;
    this.data.IsActive = -1;
    this.Cityid = 0;
    this.IsDocument = 0;
    this.cityService.GetAllCity().subscribe(result => {
      this.cityList = result;
      this.blocked = false;
    })
  }
  load(event) {
    var Last = event.first ? event.first + event.rows : 10;
    this.skip = Last / event.rows;
    this.take = event.rows;
    this.data.skip = this.skip;
    this.data.Take = this.take;
    this.blocked = true;
    this.data.CityID = this.Cityid;
    //debugger;
    this._service.CustomerList(this.data).subscribe(res => {
      this.customerlist = res.CustomerDelightListDcs;
      this.TotalCount = res.TotalCount;
      this.delightCout();
      this.blocked = false;
    })
  }
  delightCout() {
    if (this.Cityid == undefined) {
      this.Cityid = 0;
    }
    if (this.data.ClusterId == undefined) {
      this.data.ClusterId = 0;
    }
    this._service.DelightCount(this.data.ClusterId, this.Cityid).subscribe(res => {
      this.TotalPending = res.Table.length != 0 ? res.Table[0]["Total"] : 0;
      this.TotalRequest = res.Table1.length != 0 ? res.Table1[0]["Total"] : 0;
      this.TotalVerified = res.Table2.length != 0 ? res.Table2[0]["Total"] : 0;
      this.TotalReject = res.Table3.length != 0 ? res.Table3[0]["Total"] : 0;
      this.TotalActive = res.Table4.length != 0 ? res.Table4[0]["Total"] : 0;

    })
  }
  Search() {
    this.blocked = true;
    this.data.skip = 1;
    this.data.Take = this.rows;
    this.data.Status = Number.parseInt(this.SelectedStatus);
    this.data.CityID = this.Cityid;
    this.customerlist = [];
    this.TotalCount = 0;
    this.data.IsDocument = this.IsDocument;
    //debugger;
    this._service.CustomerList(this.data).subscribe(res => {
     debugger;
      this.customerlist = res.CustomerDelightListDcs;
      this.TotalCount = res.TotalCount;
      if(this.customerlist.length == 0)
      {
        alert("No Record Found");
      }
      this.first = 0
      this.delightCout();
      this.blocked = false;
      console.log('1111111111111111', this.customerlist);
    })
  }
  CityChange(Cityid) {
    this.blocked = true;
    this.data.CustomerType = "All";
    this.SelectedStatus = 0;
    this.IsDocument = 0;
    this.data.IsActive = -1;
    this.Cityid = 0;
    this.data.ClusterId = 0;
    this.data.Keyward = "";
    this.customerlist = null;
    this.TotalCount = 0;
    this.TotalPending = 0;
    this.TotalRequest = 0;
    this.TotalVerified = 0;
    this.TotalReject = 0;
    this.TotalActive = 0;
    this._service.getClusterByCity(Cityid).subscribe(result => {
      if(Cityid > 0){
        let obj = [];
        result.forEach(element => {
          if(element.ClusterId > 0){
            obj.push(element);
          }
        });
        this.clusterList = obj;
      }else{
      this.clusterList = result;
      }
      this.Cityid = Cityid;
      this.blocked = false;
    })
  }
  Check(Id, item) {
    this.Id = Id;
    this.detail = item;
    console.log("item;;;;;",item);
    
    this.isShowCustomerDetail = true;
    // this.router.navigateByUrl('layout/customerdelight/customerDetail/' + Id)
  }
  Export() {
    this.blocked = true;
    this.data.Status = Number.parseInt(this.SelectedStatus);
    this.data.IsDocument = this.IsDocument;
    this._service.ExportCustomerDelight(this.data).subscribe(res => {
      this.exportService.exportAsExcelFile(res, 'CustomerDelightData');
      this.blocked = false;
    })

  }
  Refresh() {
    this.data.CustomerType = "All";
    this.SelectedStatus = 0;
    this.IsDocument = 0;
    this.data.IsActive = -1;
    this.Cityid = 0;
    this.data.ClusterId = 0;
    this.data.Keyward = "";
    this.customerlist = null;
    this.TotalCount = 0;
    this.TotalPending = 0;
    this.TotalRequest = 0;
    this.TotalVerified = 0;
    this.TotalReject = 0;
    this.TotalActive = 0;
    this.Search();
  }
  closeDetail() {
    this.isShowCustomerDetail = false;
    this.blocked = false;
    this.Search();
  }
}