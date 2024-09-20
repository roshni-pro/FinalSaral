import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigitalSalesTeamService } from 'app/digitalsalesteam/services/digitalsalesteam.service';
import { CityService } from 'app/shared/services/city.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { ConfirmationService, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-applicationbanner',
  templateUrl: './applicationbanner.component.html',
  styleUrls: ['./applicationbanner.component.scss']
})
export class ApplicationbannerComponent implements OnInit {

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
  AppBannerRequestList = [];
  RequestType: any;
  Id: any;
  opendetailspopup: boolean;
  AppBannerRequestListDetails = [];
  searchdata: any;
  AppImageUrl: any;
  detailData: any;
  IsChangeStatus: boolean;
  selectedwarehouse: any;
  totalRecords: number;
  IsSectionpreview: boolean = false;
  AppHomeSections: any;
  // selectedwarehouseList : any[]=[];
  constructor(private cityService: CityService, private d: DigitalSalesTeamService, private exportService: ExportServiceService, private confirmationService: ConfirmationService,
    private messageService: MessageService) {
    this.dataset = [];
    this.Searchcityids = {};
    this.searchdata = {};
    this.baseURL = environment.apiURL;
    this.detailData = {};
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
      this.d.GetAppBannerRequestList(this.searchdata).subscribe(res => {
        this.blocked = false;
        this.AppBannerRequestList = res.AppBannerRequestDcs;
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
        this.selectedwarehouse = [];

      })
    }

    // else { alert("Please city "); this.blocked = false; }
  }

  getApplicationBannerList(searchdata) {

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
    this.AppBannerRequestList = null;
    this.d.GetAppBannerRequestList(this.searchdata).subscribe(res => {
      this.blocked = false;

      this.AppBannerRequestList = res.AppBannerRequestDcs;
      this.totalRecords = res.totalcount;
    })
    //}
  }
  Export(data) {
    if (this.searchdata.startDate == null || !this.searchdata.startDate == undefined) {
      this.messageService.add({ severity: 'error', summary: "Please select Start Date!", detail: '' });
      return;
    }

    if (this.searchdata.endDate == null || !this.searchdata.endDate == undefined) {
      this.messageService.add({ severity: 'error', summary: "Please selectTo Date!", detail: '' });
      return;
    }
    this.d.ExportAppBannerRequest(data).subscribe(res => {
      this.exportService.exportAsExcelFile(res.AppBannerRequestDcs, 'AppBannerRequest');
    })
  }
  edit(listdata) {
    this.opendetailspopup = true;
    this.detailData = listdata;
    this.AppImageUrl = listdata.ImageUrl
    //this.detailData.StartDate = moment(this.detailData.StartDate).format('MM/DD/YYYY HH:mm:ss');
    //this.detailData.EndDate = moment(this.detailData.EndDate).format('MM/DD/YYYY HH:mm:ss');
  }

  UpdateStatus(data) {
    if (this.detailData.Status == "Reject") {
      if (this.detailData.Comment == "" || this.detailData.Comment == null || this.detailData.Comment == undefined) {
        this.messageService.add({ severity: 'error', summary: "Comment is Required!", detail: '' });
        return;
      }
    }
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.blocked = true;
        this.d.AppBannerAcceptReq(this.detailData).subscribe(x => {
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

    if (!data.SequenceNo || data.SequenceNo == 0) {
      this.messageService.add({ severity: 'error', summary: "Enter SequenceNo", detail: '' });
      return false;

    }

    if (data.Status == 'Accept' && data.SequenceNo > 0) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.blocked = true;
          this.d.ApproveAppBannerReq(this.detailData).subscribe(x => {
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
  showpreview(data) {
    debugger;
    let btype = "";
    btype = "Banner";
    this.d.GetSectionpreview(data.Id, btype).subscribe(res => {
      this.AppHomeSections = res;
    })
    this.IsSectionpreview = true;
  }
}
