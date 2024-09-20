import { Component, OnInit } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigitalSalesTeamService } from 'app/digitalsalesteam/services/digitalsalesteam.service';
import { CityService } from 'app/shared/services/city.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { MurliService } from 'app/shared/services/murli.service';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
@Component({
  selector: 'app-murli',
  templateUrl: './murli.component.html',
  styleUrls: ['./murli.component.scss']
})
export class MurliComponent implements OnInit {
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
  murliRequestdata: any;
  RequestType: any;
  Id: any;
  searchdata: any;
  opendetailspopup: boolean;
  murlidetailsDetails: any;
  selectedHub: any;
  totalcount: any;
  selectedwarehouse: any;
  concateItems: any;
  // hindiText: string;
  language: string;
  WarehouseId: number;
  startDate: any;
  endDate: any;
  convertItemDetails: any;
  //MurliNotificationMsg: string;
  // MurliFile: any;
  totalRecords: number;
  example: string = '<speak>शॉपकिरणा लाये है आप के लिए आकर्षक उपहार<break time="3s"/>. <say-as interpret-as="cardinal">१००० </say-as>रुपये की खरीद पर पाइये १० रुपये की छूट. धन्यवाद  </speak>'
  constructor(private cityService: CityService, private d: DigitalSalesTeamService,
    private messageService: MessageService, private confirmationService: ConfirmationService,
    private exportService: ExportServiceService, private murliService: MurliService) {
    this.dataset = [];
    this.searchdata = {};
    this.Searchcityids = {};
    this.baseURL = environment.apiURL;
    this.murlidetailsDetails = {};
  }


  ngOnInit() {
    this.language = 'hi';
    this.cityService.GetActiveCity().subscribe(result => {

      this.cityList = result;
    })

    this.searchdata.startDate = null;
    this.searchdata.endDate = null;
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

  load(event) {
    debugger;
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
      this.d.GetMurliRequestList(this.searchdata).subscribe(res => {
        this.blocked = false;
        this.murliRequestdata = res.MurliRequestDcs;
        this.totalRecords = res.totalcount;
      })
    }
  }

  getmurliList(searchdata) {
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
    this.d.GetMurliRequestList(this.searchdata).subscribe(res => {
      this.blocked = false;
      this.murliRequestdata = res.MurliRequestDcs;
      this.totalcount = res.totalcount;
      this.messageService.add({ severity: 'success', summary: 'data searched successfully', detail: '' });
      console.log(res, 'res')
    })

  }

  edit(listdata) {
    this.opendetailspopup = true;
    this.Id = listdata.Id;
    this.murlidetailsDetails = listdata;
    this.murlidetailsDetails.language = 'hi';
    this.WarehouseId = listdata.WarehouseId;
    //this.murlidetailsDetails.StartDate = moment(listdata.StartDate).format('MM/DD/YYYY HH:mm:ss');
    //this.murlidetailsDetails.EndDate = moment(listdata.EndDate).format('MM/DD/YYYY HH:mm:ss');
  }

  UpdateStatus(data) {
    if (this.murlidetailsDetails.Status == "Reject") {
      if (this.murlidetailsDetails.Comment == "" || this.murlidetailsDetails.Comment == null || this.murlidetailsDetails.Comment == undefined) {
        this.messageService.add({ severity: 'error', summary: "Comment is Required!", detail: '' });
        return;
      }
    }
    if (!data.MurliFile) {
      this.messageService.add({ severity: 'error', summary: 'Murli Audio is Required!', detail: '' });
      return;
    }
    if (!data.MurliNotificationMsg) {
      this.messageService.add({ severity: 'error', summary: 'Murli Notification Msg Is Required!', detail: '' });
      return;
    }
    console.log('Murlifile...file', data.MurliFile);
    console.log('Murlifile...data', data);

    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.blocked = true;
        this.d.MurliReqAcceptReq(this.murlidetailsDetails).subscribe(x => {
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
    debugger;
    if (!data.MurliFile) {
      this.messageService.add({ severity: 'error', summary: 'Murli Audio is Required!', detail: '' });
      return;
    }
    if (!data.MurliNotificationMsg) {
      this.messageService.add({ severity: 'error', summary: 'Murli Notification Msg Is Required!', detail: '' });
      return;
    }


    console.log('Murlifile...file', data.MurliFile);
    console.log('Murlifile...data', data);
    if (data.Status == 'Accept' && data.MurliFile && data.MurliNotificationMsg) {
      console.log('PostData', data);
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.blocked = true;
          this.d.ApproveMurliReq(this.murlidetailsDetails).subscribe(x => {
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
      this.d.ExportMurliRequest(this.searchdata).subscribe(res => {
        this.exportService.exportAsExcelFile(res.MurliRequestDcs, 'MurliRequestData');
      });
    }
  }
  convertHindi() {
    debugger;
    if (this.murlidetailsDetails.MurliDescription == "" || this.murlidetailsDetails.MurliDescription == null) {
      this.messageService.add({ severity: 'error', summary: 'Murli Description Is Required!', detail: '' });
      return;
    }
    this.murliService.ConvertItemdata(this.murlidetailsDetails.MurliDescription, this.language, this.WarehouseId).subscribe(result => {
      console.log('hindiText...', result);

      this.murlidetailsDetails.MurliNotificationMsg = result;
      console.log('hindiText.......', result);


      this.messageService.add({ severity: 'success', summary: 'Convert Hindi Successfully!', detail: '' });
    });
  }
  ConvertAudioSellers() {
    if (this.murlidetailsDetails.MurliNotificationMsg == undefined && this.murlidetailsDetails.MurliNotificationMsg == null) {
      this.messageService.add({ severity: 'error', summary: 'Please enter  hindi text!', detail: '' });
      return;
    }
    this.murliService.ConvertAudioSeller(this.murlidetailsDetails.MurliNotificationMsg, this.murlidetailsDetails.SubCatId, this.murlidetailsDetails.StartDate, this.murlidetailsDetails.EndDate).subscribe(result => {
      console.log('Murlifile...hhh', result);

      this.messageService.add({ severity: 'success', summary: 'Convert Audio Successfully!', detail: '' });
      this.murlidetailsDetails.MurliFile = result;

      console.log('Murlifile...', this.murlidetailsDetails.MurliFile);
    });
  }

}
