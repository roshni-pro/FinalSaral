import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigitalSalesTeamService } from 'app/digitalsalesteam/services/digitalsalesteam.service';
import { CityService } from 'app/shared/services/city.service';
import { ClusterService } from 'app/shared/services/cluster.service';
import { environment } from 'environments/environment';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import * as XLSX from 'xlsx';
import { NotificationRequest } from 'app/digitalsalesteam/interfaces/digitalsalesteam';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notificationdetailsDetails: NotificationRequest;
  selectedWarehouseid: any = [];
  subcateid: any;
  subcateName: any;
  CityList = [];
  blocked: boolean;
  Searchcityids: any;
  warehouseList: any;
  cityid: any;
  dataset: any;
  baseURL: any;
  cityList = []
  // skip=1;
  // take=10;
  notificationdata: any;
  RequestType: any;
  Id: any;
  opendetailspopup: boolean;
  // notificationdetailsDetails=[];
  searchdata: any;
  seleware: any;
  totalRecords: number;
  fileName = 'ExcelSheet.xlsx';
  selectedHub: any;
  selectedwarehouse: any;
  skip: number;
  take: number;

  constructor(private cityService: CityService, private d: DigitalSalesTeamService,
    private clusterservice: ClusterService, private messageService: MessageService,
    private confirmationService: ConfirmationService, private exportService: ExportServiceService,) {
    this.dataset = [];
    this.searchdata = {};
    this.Searchcityids = {};
    this.baseURL = environment.apiURL;
  }

  ngOnInit() {
    this.blocked = true;

    this.cityService.GetActiveCity().subscribe(result => {
      this.blocked = false;

      this.cityList = result;
    })
    this.searchdata.startDate = null;
    this.searchdata.endDate = null;
  }
  lazyLoad(event) {
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
    this.take = event.rows ? event.rows : 10;
    this.skip = Last / this.take;



    this.searchdata.WarehouseIds = WarehouseIds;
    this.searchdata.skip = this.skip;
    this.searchdata.take = this.take;
    // this.notificationdata = null;
    // this.totalRecords = 0;
    if (WarehouseIds.length > 0) {
      this.d.GetNotificationRequestList(this.searchdata).subscribe(res => {
        this.blocked = false;
        this.notificationdata = res.NotificationRequestDcs;
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


  getnotificationList(searchdata) {



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
    this.notificationdata = null;
    this.totalRecords = 0;
    this.d.GetNotificationRequestList(this.searchdata).subscribe(res => {
      debugger;
      this.blocked = false;
      this.notificationdata = res.NotificationRequestDcs;
      this.totalRecords = res.totalcount;
      console.log(res, 'res');
      this.messageService.add({ severity: 'success', summary: 'data searched successfully', detail: '' });
    })

  }


  edit(listdata) {
    debugger
    this.opendetailspopup = true;
    this.notificationdetailsDetails = listdata;
    //this.notificationdetailsDetails.StartDate = moment(this.notificationdetailsDetails.StartDate).format('DD/MM/YYYY HH:mm:ss');
    //this.notificationdetailsDetails.EndDate = moment(this.notificationdetailsDetails.EndDate).format('DD/MM/YYYY HH:mm:ss');
    //this.notificationdetailsDetails.ApprovedDate = this.notificationdetailsDetails.ApprovedDate ==null? "": moment(this.notificationdetailsDetails.ApprovedDate).format('DD/MM/YYYY HH:mm:ss');
  }


  UpdateStatus(data) {
    if (this.notificationdetailsDetails.Status == "Reject") {
      if (this.notificationdetailsDetails.Comment == "" || this.notificationdetailsDetails.Comment == null || this.notificationdetailsDetails.Comment == undefined) {
        this.messageService.add({ severity: 'error', summary: "Comment is Required!", detail: '' });
        return;
      }
    }
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.blocked = true;
        this.d.NotiAcceptReq(this.notificationdetailsDetails).subscribe(x => {
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
          this.d.ApproveNotiReq(this.notificationdetailsDetails).subscribe(x => {
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
      this.searchdata.skip = 0;
      this.searchdata.take = 0;
      let WarehouseIds = [];
      for (var i in this.selectedwarehouse) {
        WarehouseIds.push(this.selectedwarehouse[i].WarehouseId)
      }
      this.searchdata.WarehouseIds = WarehouseIds;
      this.d.exportAsExcelFile(this.searchdata).subscribe(res => {
        this.exportService.exportAsExcelFile(res.NotificationRequestDcs, 'NotificationData');
      });
    }

  }


}

