import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigitalSalesTeamService } from 'app/digitalsalesteam/services/digitalsalesteam.service';
// import {FlashDealRequest } from 'app/digitalsalesteam/interfaces/digitalsalesteam'
import { CityService } from 'app/shared/services/city.service';
import { environment } from 'environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-brandstore',
  templateUrl: './brandstore.component.html',
  styleUrls: ['./brandstore.component.scss']
})
export class BrandstoreComponent implements OnInit {
  selectedWarehouseid: any = [];
  subcateid: any;
  subcateName: any;
  CityList = [];
  blocked: boolean;
  Searchcityids: any;
  warehouseList = []
  cityid: any;
  dataset: any;
  baseURL: any;
  cityList = []
  skip = 1;
  take = 10;
  brandStoreRequestList: any;
  RequestType: any;
  Id: any;
  opendetailspopup: boolean;
  brandStoreRequestDetails = [];
  searchdata: any;
  selectedwarehouse: any;
  totalRecords: number;

  constructor(private cityService: CityService, private d: DigitalSalesTeamService, private confirmationService: ConfirmationService,
    private messageService: MessageService) {
    this.dataset = [];
    this.Searchcityids = {};
    this.searchdata = {};
    this.baseURL = environment.apiURL;
  }
  ngOnInit() {
    this.cityService.GetActiveCity().subscribe(result => {
      this.cityList = result;
    })
  }

  load(event) {
    if (this.dataset.cityid == null || !this.dataset.cityid == undefined) {
      this.messageService.add({ severity: 'error', summary: "Please select City First!", detail: '' });
      return;
    }
    let WarehouseIds = [];
    for (var i in this.selectedwarehouse) {
      WarehouseIds.push(this.selectedwarehouse[i].WarehouseId)
    }
    if (WarehouseIds.length <= 0) {
      this.messageService.add({ severity: 'error', summary: "Please select warehouse!", detail: '' });
      return;
    }
    var Last = event.first ? event.first + event.rows : 10;
    this.skip = Last / event.rows;
    this.take = event.rows;

    this.searchdata.WarehouseIds = WarehouseIds;
    this.searchdata.skip = this.skip;
    this.searchdata.take = this.take;
    if (WarehouseIds.length > 0) {
      this.brandStoreRequestList = null;;
      this.totalRecords = 0;
      this.d.GetBrandStoreRequestList(this.searchdata).subscribe(res => {
        this.blocked = false;
        this.brandStoreRequestList = res.BrandStoreRequestDcs;
        this.totalRecords = res.totalcount;
      })
    }
  }

  GetCityWarehouse(cityes) {
    let cityids = [];
    for (var i in cityes) {
      cityids.push(cityes[i].Cityid)
    }
    if (cityids) {
      this.Searchcityids = cityids;
      this.blocked = true;
      this.d.GetWarehouseCitiesOnOrder(this.Searchcityids).subscribe(result => {
        this.blocked = false;
        this.warehouseList = result;
      })
    } else { alert("Please city "); this.blocked = false; }
  }
  getbrandstorelList(searchdata) {
    if (this.dataset.cityid == null || !this.dataset.cityid == undefined) {
      this.messageService.add({ severity: 'error', summary: "Please select City First!", detail: '' });
      return;
    }
    let WarehouseIds = [];
    for (var i in this.selectedwarehouse) {
      WarehouseIds.push(this.selectedwarehouse[i].WarehouseId)
    }
    if (WarehouseIds.length <= 0) {
      this.messageService.add({ severity: 'error', summary: "Please select warehouse!", detail: '' });
      return;
    }
    this.searchdata.skip = 1;
    this.searchdata.take = 10;

    this.searchdata.WarehouseIds = WarehouseIds;
    this.blocked = true;
    this.d.GetBrandStoreRequestList(this.searchdata).subscribe(res => {
      this.blocked = false;
      this.brandStoreRequestList = res.BrandStoreRequestDcs;
    })

  }
  edit(listdata) {
    this.opendetailspopup = true;
    this.brandStoreRequestDetails = listdata;
  }
  UpdateStatus(data) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.blocked = true;
        this.d.BrandReqAcceptReq(this.brandStoreRequestDetails).subscribe(x => {
          this.blocked = false;
          alert(x.msg);
          if (x.Result) {
            this.messageService.add({ severity: 'success', summary: x.msg, detail: '' });
            window.location.reload();
          }
          else {
            this.messageService.add({ severity: 'error', summary: x.msg, detail: '' });
            window.location.reload();
          }
        });
      }
    });
  }

  Approve(data) {

    if (data.Status == 'Accept') {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.blocked = true;
          this.d.ApproveBrandDealReq(this.brandStoreRequestDetails).subscribe(x => {
            this.blocked = false;
            alert(x.msg);
            if (x.Result) {
              this.messageService.add({ severity: 'success', summary: x.msg, detail: '' });
              window.location.reload();
            }
          });
        }
      });
    }
  }


  openImage(img) {
    window.open(this.baseURL + img);
  }
}
