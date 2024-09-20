import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigitalSalesTeamService } from 'app/digitalsalesteam/services/digitalsalesteam.service';
import { CityService } from 'app/shared/services/city.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-flashdeal',
  templateUrl: './flashdeal.component.html',
  styleUrls: ['./flashdeal.component.scss']
})
export class FlashdealComponent implements OnInit {
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
  flashRequestdata: any;
  RequestType: any;
  Id: any;
  opendetailspopup: boolean;
  flashRequestdataDetails: any;
  searchdata: any;
  selectedwarehouse: any;
  totalRecords: number;
  ItemList: any[];
  ItemTable: boolean = false;
  MaxQty: boolean;
  AvailableQty: boolean;
  FlashDealPrice: boolean;
  Moq: boolean;
  ItemName: boolean;
  IsCommentShow:boolean;
  constructor(private cityService: CityService, private d: DigitalSalesTeamService, private exportService: ExportServiceService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.dataset = [];
    this.searchdata = {};
    this.Searchcityids = {};
    this.baseURL = environment.apiURL;
    this.flashRequestdataDetails = {};
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
      this.d.GetFlashDealRequestList(this.searchdata).subscribe(res => {
        debugger;
        this.flashRequestdata = res.FlashDealRequestDcs;
        this.blocked = false;
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
    } else { alert("Please city "); this.blocked = false; }
  }
  getflashdealList(searchdata) {

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
    this.d.GetFlashDealRequestList(this.searchdata).subscribe(res => {
      this.flashRequestdata = res.FlashDealRequestDcs;
      this.totalRecords = res.totalcount;
    })

  }
  edit(listdata) {
    this.d.GetFlashDealRequestItemsById(listdata.Id).subscribe(res => {
      this.flashRequestdataDetails = listdata;
      if(listdata.Status=="Accept"){
        this.IsCommentShow=false;
      }
      else{
        this.IsCommentShow=true;
      }
      this.ItemList = res.FlashDealItemsDcs;
      if (this.ItemList.length > 0) {
        this.ItemTable = true;
        this.AvailableQty = false;
        this.MaxQty = false;
        this.FlashDealPrice = false;
        this.Moq = false;
        this.ItemName = false;
      }
      else {
        this.ItemTable = false;
        this.AvailableQty = true;
        this.MaxQty = true;
        this.FlashDealPrice = true;
        this.Moq = true;
        this.ItemName = true;
      }
      console.log("item list", this.ItemList)
      this.opendetailspopup = true;
    })
  }
  UpdateStatus(data) {
    if (this.flashRequestdataDetails.Status == "Reject") {
      if (this.flashRequestdataDetails.Comment == "" || this.flashRequestdataDetails.Comment == null || this.flashRequestdataDetails.Comment == undefined) {
        this.messageService.add({ severity: 'error', summary: "Comment is Required!", detail: '' });
        return;
      }
    }
    if (this.ItemList.length == 0 &&this.flashRequestdataDetails.Status == "Accept") {
      this.messageService.add({ severity: 'error', summary: 'You Cannot Accept!', detail: '' });
      return false;
    }
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.blocked = true;
        this.d.FlashDealReqAcceptReq(this.flashRequestdataDetails).subscribe(x => {
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
    // if (!data.SequenceNo || data.SequenceNo == 0) {
    //   this.messageService.add({ severity: 'error', summary: "Enter SequenceNo", detail: '' });
    //   return false;
    // }
    if (data.Status == 'Accept') {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.blocked = true;
          this.d.ApproveFlashDealReq(this.flashRequestdataDetails).subscribe(x => {
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
  Export(searchdata): void {

    if (this.searchdata.startDate == null || !this.searchdata.startDate == undefined) {
      alert("Please select Start Date!");
      return;
    }

    if (this.searchdata.endDate == null || !this.searchdata.endDate == undefined) {
      alert("Please select To Date!");
      return;
    }
    {
      // export api     
      let WarehouseIds = [];
      for (var i in this.selectedwarehouse) {
        WarehouseIds.push(this.selectedwarehouse[i].WarehouseId)
      }
      this.searchdata.skip = 0;
      this.searchdata.take = 0;
      this.searchdata.WarehouseIds = WarehouseIds;
      this.d.ExportFlashDealRequest(this.searchdata).subscribe(res => {
        this.exportService.exportAsExcelFile(res.FlashDealRequestDcs, 'FlashDealData');
      });
    }
  }
}
