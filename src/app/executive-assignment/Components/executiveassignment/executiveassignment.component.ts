import { CustomerService } from 'app/shared/services/customer.service';
import { ClusterService } from 'app/shared/services/cluster.service';
import { DeliveryService } from 'app/shared/services/delivery.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExecutiveService } from './../../Services/executive.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Table } from 'primeng/table';
import { Searchmappedexe } from 'app/executive-assignment/Interfaces/searchmappedexe';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { StoreService } from 'app/store/services/store.service';
import { timeStamp } from 'console';

export interface ClusterExecutive {
  ExecutiveId: number;
  ExecutiveName: string;
  Email: string;
  EmployeeCode: string;
  Mobile: string;
  Role: string;
  ClusterNames: string;
  WarehouseName: string;
}


export interface ClusterExecutiveBeatExport {
  Skcode: string;
  BeatNumber: number | null;
  Day: string;
  EvenOrOddWeek: string;
  SkipDays:string;
  SkipWeeks:string
  MonthWeek:number
}
//test
export interface LatestBeatReporExport {
  SkCode: string;
  StoreName: string;
  Day: string;
  ClusterName: string;
}

export interface ClusterExecutiveBeat {
  Skcode: string;
  BeatNumber: number | null;
  Day: string;
  ExecutiveId: number;
  SkipDays: number;
  SkipWeeks: number;
  StoreId: number;
  EvenOrOddWeek: string;
  MonthWeek: number,
}

export interface ValidatingAssignBeatDc {
  ClusterExecutiveBeat: any;
  clusterIds: any;
  StoreId: number;
  ChannelMasterIds: any;
}


@Component({
  selector: 'app-executiveassignment',
  templateUrl: './executiveassignment.component.html',
  styleUrls: ['./executiveassignment.component.scss']
})
export class ExecutiveassignmentComponent implements OnInit {
  globalsearchval: string;
  AgentListMaster = [];
  @ViewChild(Table, { static: false }) Table: Table;
  cid: any[] = []
  Peopleid: any[] = []
  GetLatestBeatReportData: any[] = []
  ClusterId = 0;
  clusteritem: any = {}
  ClusterName = '';
  warehouseList = [];
  ExecutivesList: ClusterExecutive[] = [];
  StoreId: any;
  IsResetBeat: boolean = false;
  blocked = false
  currentExecutive: any = {};
  displayUploadDialog = false;
  page: { skip: 0; take: 10; };
  initialCall: boolean = true;
  whId: any
  whouseId: number
  agentId: number = null;
  totalRecords: number;
  executiveMaster: any[];
  AgentList: any[];
  clusterList = [];
  selectedclusterList = [];
  customerList: any[];
  ExeMappedCustomerList: any[];
  outOfbeatSkcode: string;
  IsshowdownloadFile: boolean = false;
  displayoutOfbeatSkcode: boolean;
  storeList: any[];
  selectedStoreList: any[];
  SearchMappedExeOnClusterDc: Searchmappedexe = {
    clusterIds: null,
    ExecutiveId: 0,
    StoreId: null,
    ChannelMasterIds: null
  };
  IsPostBeat: boolean;
  SkcodePopUPFilter: string = '';
  beatList: ClusterExecutiveBeat[] = [];
  ValidatingAssignBeat: ValidatingAssignBeatDc = {
    ClusterExecutiveBeat: [],
    clusterIds: [],
    StoreId: null,
    ChannelMasterIds: []
  };


  constructor(private clusterservice: ClusterService,
    private messageService: MessageService, private warehouseService: WarehouseService,
    private executiveService: ExecutiveService,private confirmationService:ConfirmationService,
    private exportService: ExportServiceService) { }

  ngOnInit() {
    this.getAllWarehouses();
  }
  getAllWarehouses() {
    this.warehouseService.GetWarehouses()
      .subscribe(result => {
        this.blocked = false
        this.warehouseList = result;
      });
  }

  getActiveSaleExecutives() {
    this.whouseId = this.whId.WarehouseId
    this.clusterservice.getExecutiveList(this.whouseId).subscribe(x => {
      this.ExecutivesList = x;
      console.log('executive list: ', x);
    });
  }

  warehouseDetails: any
  setCurrentExecutive(currentExecutive: ClusterExecutive) {
    debugger;
    this.clusterList = null;
    this.storeList = null;
    this.currentExecutive = currentExecutive;
    this.displayUploadDialog = true;
    this.ExeMappedCustomerList = [];
    this.IsshowdownloadFile = false;
    this.StoreId = null;
    this.SkcodePopUPFilter = '';
    this.selectedclusterList = [];
    this.AllOldExecutiveList = [];
    this.ExecutiveId = currentExecutive.ExecutiveId;
    this.warehouseDetails = this.warehouseList.filter(x => x.WarehouseName == currentExecutive.WarehouseName)
    this.clusterservice.getClusterBywarehouse(this.currentExecutive.ExecutiveId)
      .subscribe(result => {
        this.clusterList = result
      })

    //
    this.executiveService.StoresOfMappedExecutive(this.currentExecutive.ExecutiveId).subscribe(x => {
      this.storeList = x;
    })
    this.CustomerChannelTypeList();
  }

  onUpload(event, uploadCustom) {
    debugger
    this.IsPostBeat = false;
    this.outOfbeatSkcode = null;
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = event.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      var dataFromExcel = jsonData;
      const dataString = JSON.stringify(jsonData);

      let excelData = dataFromExcel.data;
      let invalid = false;
      let detailOfIndexedItem = [];

      if (excelData.length > 0) {

        this.beatList = null;
        let uploadbeatList = [];
        excelData.forEach((element, index) => {
          let beat: ClusterExecutiveBeat = {
            BeatNumber: element.BeatNumber,
            Skcode: element.Skcode,
            Day: element.Day,
            SkipDays: element.SkipDays > 0 ? element.SkipDays : 0,
            SkipWeeks: element.SkipWeeks > 0 ? element.SkipWeeks : 0,
            ExecutiveId: this.currentExecutive.ExecutiveId,
            StoreId: this.StoreId.Id,
            EvenOrOddWeek: element.EvenOrOddWeek,
            MonthWeek: element.MonthWeek > 0 ? element.MonthWeek : 0,
          }
          uploadbeatList.push(beat);
        });
        this.beatList = uploadbeatList;
        this.blocked = true;

        this.ValidatingAssignBeat.ClusterExecutiveBeat = this.beatList;
        this.ValidatingAssignBeat.clusterIds = this.SearchMappedExeOnClusterDc.clusterIds;
        this.ValidatingAssignBeat.ChannelMasterIds = [this.ChannelId.ChannelMasterId];;


        this.clusterservice.ValidatingAssignBeat(this.ValidatingAssignBeat).subscribe(x => {

          this.blocked = false;
          if (x) {
            alert(x);
            this.outOfbeatSkcode = x;
            this.displayoutOfbeatSkcode = true;
            this.messageService.add({ severity: 'success', summary: 'Update Done!', detail: '' });
          }
          else {
            this.IsPostBeat = true;
          }
        },
          error => {
            this.blocked = false;
            this.messageService.add({ severity: 'error', summary: 'Error In Saving!', detail: '' });
          });
      }
    }
    reader.readAsBinaryString(file);
  }

  onUploadEditedBeat(event, uploadCustom) {
    debugger
    var arr = event.files[0].name.split("_")
    var fileName = arr[0].concat(arr[1]);
    if (fileName == 'LatestBeatReportExportDataexport' || fileName == 'MappedCustomerListexport' || fileName == 'OldExecutiveBeatReportExportDataexport') {
      this.IsPostBeat = false;
      this.outOfbeatSkcode = null;
      let workBook = null;
      let jsonData = null;
      const reader = new FileReader();
      const file = event.files[0];
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        var dataFromExcel = jsonData;
        const dataString = JSON.stringify(jsonData);

        let excelData = dataFromExcel.data;
        let invalid = false;
        let detailOfIndexedItem = [];

        if (excelData.length > 0) {

          this.beatList = null;
          let uploadbeatList = [];

          excelData.forEach((element, index) => {
            let beat: ClusterExecutiveBeat = {
              BeatNumber: element.BeatNumber,
              Skcode: element.Skcode ? element.Skcode : element.SkCode,
              Day: element.Day,
              SkipDays: element.SkipDays > 0 ? element.SkipDays : 0,
              SkipWeeks: element.SkipWeeks > 0 ? element.SkipWeeks : 0,
              ExecutiveId: this.currentExecutive.ExecutiveId,
              StoreId: this.StoreId.Id,
              EvenOrOddWeek: element.EvenOrOddWeek,
              MonthWeek: element.MonthWeek > 0 ? element.MonthWeek : 0,
            }
            uploadbeatList.push(beat);
          });


          this.beatList = uploadbeatList;
          //this.blocked = true;

          this.ValidatingAssignBeat.ClusterExecutiveBeat = this.beatList;
          this.ValidatingAssignBeat.clusterIds = this.SearchMappedExeOnClusterDc.clusterIds;

          this.clusterservice.ExecutiveBeatUpload(this.ValidatingAssignBeat).subscribe(x => {

            this.blocked = false;
            if (x) {
              alert(x);
              //this.outOfbeatSkcode = x;
              //this.displayoutOfbeatSkcode = true;
              if (x == 'Something Went wrong') this.messageService.add({ severity: 'error', summary: `${x}`, detail: '' });
              else this.messageService.add({ severity: 'success', summary: `${x}`, detail: '' });
              this.displayUploadDialog = false;

            }
            else {
              this.IsPostBeat = true;
            }
          },
            error => {
              this.blocked = false;
              this.messageService.add({ severity: 'error', summary: 'Error In Saving!', detail: '' });
            });
        }
      }
      reader.readAsBinaryString(file);

    }
    else {
      this.messageService.add({ severity: 'error', summary: `please upload valid file`, detail: '' });
    }
    return

  }

  PostBeat() {
    if (this.ValidatingAssignBeat) {
      this.blocked = true;
      this.ValidatingAssignBeat.StoreId = this.StoreId.Id;
      this.clusterservice.assignBeat(this.ValidatingAssignBeat).subscribe(x => {
        this.displayUploadDialog = false;
        this.IsPostBeat = false;
        this.blocked = false;

        if (x) {
          alert(x);
          window.location.reload();
          this.messageService.add({ severity: 'success', summary: x, detail: '' });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error In Saving!', detail: '' });
        }
      },
        error => {
          this.blocked = false;
          this.messageService.add({ severity: 'error', summary: 'Error In Saving!', detail: '' });
        });
    }

  }

  returnWarehouseName(WarehouseId) {
    let whousename = this.warehouseList.filter(wh => wh.WarehouseId == WarehouseId)[0].WarehouseName;
    return whousename;
  }
  onChangingOfCluster() {
    debugger
    console.log(this.selectedclusterList);
    var ids = []
    if (this.AllOldExecutiveList.length > 0) {
      this.AllOldExecutiveList.forEach(x => {
        this.selectedclusterList.forEach(y => {
          if (y.ClusterId == x.OldClusterId) ids.push(x.OldExecutiveEmpCode);
        })

      });
      this.str = ids.join(",");
      console.log(this.str);
    }
    //this.ChannelId=[];
  }
  str: string = ''
  AllOldExecutiveList: any[] = []
  getAllExecutive(data) {
    debugger;
    this.executiveService.GetAllExecutives(data.ExecutiveId).subscribe((res: any) => {
      if (res.Status == true) {
        this.AllOldExecutiveList = res.Data
        var ids = []
        this.AllOldExecutiveList.forEach(x => {
          this.selectedclusterList.forEach(y => {
            if (y.ClusterId == x.OldClusterId) ids.push(x.OldExecutiveEmpCode);
          })

        });
        this.str = ids.join(",");
        //      console.log(this.str);
      }
    }, (err: any) => {
      console.log(err)
    })
  }
  ExecutiveId: any
  ChannelId: any = []
  getSelectedCustomer(data) {
    this.defalultBeatIsEnable = false;
    this.IsPostBeat = false;
    // console.log(this.ValidatingAssignBeat);
    // console.log(this.selectedclusterList);
    let clusterids = [];

    if ((!this.StoreId) || (this.StoreId == 'select_store')) {
      this.messageService.add({ severity: 'error', summary: 'Select Store First', detail: '' });
      return;
    }
    if (this.selectedclusterList.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Select Cluster', detail: '' });
      return;
    }
    if (this.ChannelId == 0) {
      this.messageService.add({ severity: 'error', summary: 'Select Channel', detail: '' });
      return;
    }
    for (var i in this.selectedclusterList) {
      clusterids.push(this.selectedclusterList[i].ClusterId);
    }

    this.SearchMappedExeOnClusterDc.clusterIds = clusterids;
    this.SearchMappedExeOnClusterDc.ExecutiveId = data.ExecutiveId;
    this.SearchMappedExeOnClusterDc.StoreId = this.StoreId.Id;
    this.SearchMappedExeOnClusterDc.ChannelMasterIds = [this.ChannelId.ChannelMasterId];

    if (this.SearchMappedExeOnClusterDc && this.SearchMappedExeOnClusterDc.ExecutiveId > 0 && this.SearchMappedExeOnClusterDc.clusterIds.length > 0 && this.StoreId.Id > 0 && this.ChannelId.ChannelMasterId > 0) {
      this.blocked = true;
      this.ExeMappedCustomerList = null;
      this.clusterservice.getMappedCustomerOnCluster(this.SearchMappedExeOnClusterDc).subscribe(result => {
        this.blocked = false;
        if (result.length > 0) {
          this.ExeMappedCustomerList = result;
          this.IsshowdownloadFile = true;
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'No Mapped Customer in this Cluster found', detail: '' });
        }
      });

    } else {
      this.messageService.add({ severity: 'error', summary: 'something went wrong', detail: '' });

    }

  }

  DownloadFileForOldExecutive() {
    debugger
    this.cid = []
    this.Peopleid = []
    // this.sid=[]
    // this.sid.push(this.StoreId)
    this.AllOldExecutiveList.forEach(el => {
      if (el.OldStoreId == this.StoreId) {
        this.selectedclusterList.forEach(y => {
          if (y.ClusterId == el.OldClusterId) this.Peopleid.push(el.OldExecutiveId);
        })
      }
    })
    this.selectedclusterList.forEach(x => { this.cid.push(x.ClusterId) })

    if (this.ChannelId.ChannelMasterId > 0) {

    } else {
      alert("Please Select Channel"); return false;
    }
    const payload =
    {
      "PeopleId": this.Peopleid,
      "clusterIds": this.cid,
      "StoreIds": this.StoreId.Id,
      "CurrentExecutiveId": this.ExecutiveId,
      "WarehouseId": this.warehouseDetails[0].WarehouseId,
      "ChannelMasterIds": [this.ChannelId.ChannelMasterId]
    }
    this.executiveService.GetOldExecutiveLatestBeatReport(payload).subscribe(x => {
      console.log(x);
      this.GetLatestBeatReportData = x
      if (this.GetLatestBeatReportData.length != 0) {
        this.IsResetBeat = true;
        var res = this.GetLatestBeatReportData.map(function (a) {
          return {
            'SkCode': a.SkCode,
            'Day': a.Day,
            'StoreName': a.StoreName,
            'ClusterName': a.ClusterName,
          };
        });
        this.exportService.exportAsExcelFile(res, "OldExecutiveBeatReportExportData")
      }
      else {
        this.showError("Record Not Found")
        this.IsResetBeat = false;
      }
    })
  }
  downloadFile() {
    if (this.ExeMappedCustomerList.length != 0) {
      this.IsResetBeat = true;
      let beatExportAll = [];
      this.ExeMappedCustomerList.forEach((element, index) => {
        let beatExport: ClusterExecutiveBeatExport = {
          BeatNumber: element.BeatNumber,
          Skcode: element.Skcode,
          Day: element.Day,
          EvenOrOddWeek: element.EvenOrOddWeek,
          SkipDays: element.SkipDays ,
          SkipWeeks: element.SkipWeeks,
          MonthWeek: element.MonthWeek,
        }
        beatExportAll.push(beatExport);
      });
      this.exportService.exportAsExcelFile(beatExportAll, 'MappedCustomerList');
    }
    else {
      this.showError("No data found");
      this.IsResetBeat = false;
    }

  }

  downloadlatestBeat() {
    this.cid = []
    this.Peopleid = []
    // this.sid=[]
    // this.sid.push(this.StoreId)
    this.selectedclusterList.forEach(x => { this.cid.push(x.ClusterId) })
    this.Peopleid = this.selectedclusterList[0].ExecutiveId
    let chids = [];
    if (this.ChannelId.ChannelMasterId > 0) {
    } else {
      alert("Please Select Channel"); return false;
    }
    const payload =
    {
      "PeopleId": this.Peopleid,
      "clusterIds": this.cid,
      "StoreIds": [this.StoreId.Id],
      "ChannelMasterIds": [this.ChannelId.ChannelMasterId]
    }
    this.executiveService.GetLatestBeatReport(payload).subscribe(x => {
      console.log(x);
      this.GetLatestBeatReportData = x
      if (this.GetLatestBeatReportData.length != 0) {
        this.IsResetBeat = true;
        var res = this.GetLatestBeatReportData.map(function (a) {
          return {
            'SkCode': a.SkCode,
            'Day': a.Day,
            'StoreName': a.StoreName,
            'ClusterName': a.ClusterName,
          };
        });
        this.exportService.exportAsExcelFile(res, "LatestBeatReportExportData")
      }
      else {
        this.showError("Record Not Found")
        this.IsResetBeat = false;
      }
    })
  }

  close() {
    this.IsResetBeat = false;
    this.IsshowdownloadFile = false;
    this.displayUploadDialog = false;
    this.selectedclusterList = null;
    this.ExeMappedCustomerList = [];
    this.SkcodePopUPFilter = '';
    this.ChannelId = [];
  }
  closeoutOfbeatSkcode() {
    this.outOfbeatSkcode = null;
    this.displayoutOfbeatSkcode = false;
    this.ChannelId = [];
  }
  defalultBeatIsEnable: boolean = false
  onSelect(StoreId) {
    if (StoreId == 'select_store') {
      this.IsshowdownloadFile = false;
    }
    this.selectedclusterList = [];
    this.ExeMappedCustomerList = [];
    this.beatList = null;
    this.IsPostBeat = false;
    this.defalultBeatIsEnable = true;
    //this.ChannelId=[];
  }

  ResetBeat(obj: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {

        var ClusterId = []
        this.selectedclusterList.forEach(x => { ClusterId.push(x.ClusterId) })
        console.log(obj);
        const jsondata = {
          ExecutiveId: obj.ExecutiveId,
          StoreId: this.StoreId.Id,
          ClusterIds: ClusterId
        }

        this.executiveService.ResetEditBeat(jsondata).subscribe((x: any) => {
          if (x.Status)
            this.showSuccessfull(x.Message);
          else
            this.showError(x.Message);
        })
      },
      reject: () => {
        this.showError("Data is not reset")
      }
    });


  }

  cancel() {
    this.IsResetBeat = false;
  }


  showSuccessfull(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }
  showError(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }

  ChannelTypeList: any
  CustomerChannelTypeList() {
    this.executiveService.GetExecutiveWiseChannelList(this.currentExecutive.ExecutiveId).subscribe((res: any) => {
      console.log(res);
      if (res.Status) {
        this.ChannelTypeList = res.Data;
        this.ChannelId = this.ChannelTypeList[0];
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "No Channel Mapped" });
      }
      console.log(this.ChannelId);

    })
  }


}