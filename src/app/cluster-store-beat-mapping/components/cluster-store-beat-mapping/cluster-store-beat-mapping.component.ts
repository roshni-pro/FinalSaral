import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { ClusterStoreBeatMappingService } from 'app/cluster-store-beat-mapping/services/cluster-store-beat-mapping.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as XLSX from 'xlsx';


export interface ModifyArrayData {
  Skcode: string;
  ClusterId : number;
  StoreId : number;
  CustomerId  : number;
  SchedulerType  : number;
  SkipWeeks  : number;
  Day  : number;
  Priority  : number;
}


export interface ValidatingClusterCustomerDc {
  Skcodes: any[];
  ClusterId: any;
}

@Component({
  selector: 'app-cluster-store-beat-mapping',
  templateUrl: './cluster-store-beat-mapping.component.html',
  styleUrls: ['./cluster-store-beat-mapping.component.scss']
})
export class ClusterStoreBeatMappingComponent implements OnInit {

  heroForm: FormGroup;
  keyword: any;
  warehouseList: any;
  warehouseId: any;
  storeList: any;
  getWarehouseIdNumber: number;
  clusterWiseWarehouseList: any;
  scheduleList: any;
  skipList: any;
  weekList: any;
  scheduleIdNumber: number;
  hideSkipAndWeek: boolean = false;
  clusterIdNumber: number;
  customerList: any;
  AllClustercustomerList: any;
  storeIdNumber: number;
  storeName: string;
  clusterName: string;
  customerIdNumber: number;
  customerName: string;
  customerSkCode: string;
  skipIdNumber: number;
  weekIdNumber: number;
  isActive: boolean;
  isDeleted: boolean;
  WarehouseName: any;
  getSkipNumber: number;
  storeAndClusterBasedList: any;
  getPriority: any;
  scheduleType: any;
  selectedStore: any;
  selectedCluster: any;
  outOfbeatSkcode: string;
  displayoutOfbeatSkcode: boolean;


  IsPostBeat: boolean;

  beatList: any;
  ValidatingClusterCustomer: ValidatingClusterCustomerDc = {
    Skcodes: [],
    ClusterId: [],
  };

  constructor(private clusterService: ClusterStoreBeatMappingService, private fb: FormBuilder, private messageService: MessageService, private exportService: ExportServiceService) {
    this.weekList = [
      { weekName: 'Monday', weekId: '1' },
      { weekName: 'Tuesday', weekId: '2' },
      { weekName: 'Wednesday', weekId: '3' },
      { weekName: 'Thursady', weekId: '4' },
      { weekName: 'Friday', weekId: '5' },
      { weekName: 'Saturday', weekId: '6' },
      { weekName: 'Sunday', weekId: '7' },
    ];
  }


  ngOnInit() {
    this.clusterService.getWarehouse().subscribe(res => {
      this.warehouseList = res;
      this.clusterWiseWarehouseList = [];
      this.storeAndClusterBasedList = [];
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`onchanges ${changes.currentValue} `);

    this.getClusterStore();
    this.scheduleList = [];
    // throw new Error('Method not implemented.');
  }

  hideFieldBasedOnWarehouse: boolean = false;
  getWarehouseId(event) {

    // debugger;
    this.storeAndClusterBasedList = [];
    this.clusterWiseWarehouseList = [];
    this.customerList = [];
    this.AllClustercustomerList = [];

    this.selectedStore = {};
    this.selectedCluster = {};
    this.storeIdNumber = null;
    this.clusterIdNumber = null;
    this.scheduleType = null;
    this.getSkipNumber = null;
    this.getPriority = null;
    this.hideFieldBasedOnWarehouse = false;
    this.hideFieldBasedOnStore = false;
    this.hideFieldBasedOnCluster = false;
    this.hideFieldBasedOnCustomer = false;
    this.hideSkipAndWeek = false;
    //this.showExcelBtn = false;

    this.getWarehouseIdNumber = event.value.WarehouseId;
    if (this.getWarehouseIdNumber != undefined) {
      this.hideFieldBasedOnWarehouse = true

      this.clusterService.getStoreList().subscribe(res => {
        this.storeList = res;
        this.storeList.unshift({
          Id: 0,
          Name: 'Select Store'
        })
      })

      this.clusterService.getClusterWiseWarehouse(this.getWarehouseIdNumber).subscribe(res => {
        this.clusterWiseWarehouseList = res;
        this.clusterWiseWarehouseList.unshift({
          ClusterId: 0,
          ClusterName: 'Select Cluster'
        })
      })

    } else {
      this.hideFieldBasedOnWarehouse = false;
    }

  }


  hideFieldBasedOnStore: boolean = false;
  getStoreId(event) {
    this.storeIdNumber = event.value.Id;
    this.storeName = event.value.Name;
    if ((this.storeIdNumber != undefined) && (this.storeIdNumber != 0)) {
      this.hideFieldBasedOnStore = true;
    } else {
      this.hideFieldBasedOnStore = false;
    }
    this.getClusterStore();
  }


  hideFieldBasedOnCluster: boolean = false;
  showExcelBtn: boolean  = false;
  hideAddBtn:boolean = true;
  getClusterId(event) {
    this.AllClustercustomerList = null;
    this.customerList = null;
    this.clusterIdNumber = event.value.ClusterId;
    this.clusterName = event.value.ClusterName;
    if (confirm("Do you want to upload excel file ?")) {
      this.showExcelBtn = true;
      this.hideAddBtn = false;
      this.hideFieldBasedOnCluster = false;
    }else{
      this.showExcelBtn = false;
      this.hideAddBtn = true;
      this.hideFieldBasedOnCluster = true;
    }
      if ((this.clusterIdNumber != undefined) && (this.clusterIdNumber != 0)) {
        //this.hideFieldBasedOnCluster = true;
  
        this.clusterService.getCustomerByClusterId(this.clusterIdNumber).subscribe(res => {
  
          this.AllClustercustomerList = res;
  
          this.customerList = res.map(function (ele) {
            return {
              'CustomerId': ele.CustomerId,
              'CustomerName': ele.Name + ' ' + ele.Skcode
            };
          });
        })
        this.getClusterStore();
  
      } else {
        //this.hideFieldBasedOnCluster = false;
      }
  }


  multipleCustmer: any;
  hideFieldBasedOnCustomer: boolean = false;
  getCustomerId(event) {
    this.multipleCustmer = event.value;
    if (this.multipleCustmer.length >= 1) {
      this.hideFieldBasedOnCustomer = true;

      this.scheduleList = [
        { scheduleName: 'Select Schedule', scheduleId: '0' },
        { scheduleName: 'Weekly', scheduleId: '1' },
        { scheduleName: 'Monthly', scheduleId: '2' }
      ];

    } else {
      this.hideFieldBasedOnCustomer = false;
    }
  }

  getScheduleId(event) {
    this.scheduleIdNumber = event.value.scheduleId;
    if (this.scheduleIdNumber == 1) {
      this.hideSkipAndWeek = true;
    } else {
      this.hideSkipAndWeek = false;
    }
  }

  numberOnly(event): boolean {
    var digitNumber = event.key;
    if (digitNumber <= 4) {

    } else {
      return false;
    }
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  numberOnlyForPriority(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getSkipId(event) {
    this.skipIdNumber = event.value.skipId
  }

  multipleWeek: any;
  getweekId(event) {
    this.multipleWeek = event.value;
  }


  addNewRecord: any;
  savedBtnEnable: boolean = false;
  findExistingId: any;
  findCustomerId: any;
  updatedListData = [];
  finalRecord: any;
  onclick() {
    let arr = [];
    //this.storeAndClusterBasedList  isme find kro CustomerId if found then 
    //if(Yes){}else{}
    this.multipleCustmer.forEach(element => {

      this.findExistingId = this.storeAndClusterBasedList.find(x => x.CustomerId == element.CustomerId);

      if (this.findExistingId == undefined) {
        let tempObj = {
          'Id': 0,
          'ClusterId': this.clusterIdNumber,
          'StoreId': this.storeIdNumber,
          'CustomerId': element.CustomerId,
          'Name': element.CustomerName.split(' ')[0],
          'StoreName': this.storeName,
          'ClusterName': this.clusterName,
          'Skcode': element.CustomerName.split(' ')[1],
          'SchedulerType': this.scheduleIdNumber,
          'SkipWeeks': this.getSkipNumber,
          'BeatSchedulers': [{
            'Id': 0,
            'Days': this.weekIdNumber,
            'Priority': 0,
            'ClusterStoreBeatMappingId': 0
          }],
          'CreatedDate': undefined,
          'ModifiedDate': undefined,
          'IsActive': this.isActive,
          'IsDeleted': this.isDeleted
        }
        arr.push(tempObj)
      } else {
        let ind = this.storeAndClusterBasedList.findIndex(x => x.CustomerId == element.CustomerId);

        var dbId = this.findExistingId.Id;
        var dbClusterId = this.findExistingId.ClusterId;
        var dbStoreId = this.findExistingId.StoreId;
        var dbCustomerId = this.findExistingId.CustomerId;
        var dbName = this.findExistingId.Name;
        var dbStoreName = this.findExistingId.StoreName;
        var dbClusterName = this.findExistingId.ClusterName;
        var dbSkcode = this.findExistingId.Skcode;
        let tempObj = {
          'Id': dbId,
          'ClusterId': dbClusterId,
          'StoreId': dbStoreId,
          'CustomerId': dbCustomerId,
          'Name': dbName,
          'StoreName': dbStoreName,
          'ClusterName': dbClusterName,
          'Skcode': dbSkcode,
          'SchedulerType': this.scheduleIdNumber,
          'SkipWeeks': this.getSkipNumber == undefined ? 0 : this.getSkipNumber,
          'BeatSchedulers': [{
            'Id': 0,
            'Days': this.weekIdNumber == undefined ? 0 : this.weekIdNumber,
            'Priority': 0,
            'ClusterStoreBeatMappingId': 0
          }],
          'CreatedDate': undefined,
          'ModifiedDate': undefined,
          'IsActive': this.isActive == undefined ? false : this.getSkipNumber,
          'IsDeleted': this.isDeleted == undefined ? false : this.getSkipNumber
        }
        //  this.storeAndClusterBasedList[ind] = tempObj;
        //  console.log(this.storeAndClusterBasedList[ind]);
        this.updatedListData.push(tempObj);
        //debugger;
      }
    });
    if (this.scheduleIdNumber == 1) {
      let days = [];
      this.multipleWeek.forEach(element => {

        let BeatSchedulers = {
          'Id': 0,
          'Day': element.weekId,
          'Priority': this.getPriority,
          'ClusterStoreBeatMappingId': 0
        }
        days.push(BeatSchedulers)
      });

      arr.forEach(element => {
        element.BeatSchedulers = days;
      })

      this.updatedListData.forEach(element => {
        element.BeatSchedulers = days;
      })
      this.updatedListData.forEach(element => {
        //debugger;
        let index = this.storeAndClusterBasedList.findIndex(x => x.CustomerId == element.CustomerId);
        this.storeAndClusterBasedList[index] = {
          'Skcode': element.Skcode,
          'Name': element.Name,
          'CreatedDate': this.storeAndClusterBasedList[index].CreatedDate,
          'SchedulerType': element.SchedulerType,
          'SkipWeeks': element.SkipWeeks == undefined ? 0 : element.SkipWeeks,
          'BeatSchedulers': days
        }

        console.log('indexOf', this.storeAndClusterBasedList);
      });
    } else {
      arr.forEach(element => {
        element.BeatSchedulers = [{
          'Id': 0,
          'Day': 0,
          'Priority': 0,
          'ClusterStoreBeatMappingId': 0
        }]
      })
    }
    console.log("arr", arr);
    arr.forEach(element => {
      this.storeAndClusterBasedList.unshift(element);
    })

    this.storeAndClusterBasedList
    this.total_count = this.storeAndClusterBasedList.length;

    this.addNewRecord = arr;
    if ((this.addNewRecord.length >= 1) || (this.updatedListData.length >= 1)) {
      this.savedBtnEnable = true;
    } else {
      this.savedBtnEnable = false;
    }

    if (arr.length >= 1) {
      this.addNewRecord = arr;
    } else {
      this.addNewRecord = this.updatedListData;
    }
  }

  openDetails(d, e) {
    //console.log(d);
  }

  addbtnafterSave: boolean = false;
  saveData() {
    //  console.log(this.addNewRecord);
    if (this.addNewRecord.length >= 1) {
      this.clusterService.addAndUpdate(this.addNewRecord).subscribe(res => {
        console.log(res);
        if (res == true) {
          alert('Data Saved Successfully')
          window.location.reload()
        } else {
          alert('Data Not Saved')
        }
      })
    }
  }

  actualData: any;
  total_count: any;
  getClusterStore() {
    this.storeAndClusterBasedList = [];
    if (this.storeIdNumber != undefined && this.clusterIdNumber != undefined) {
      this.clusterService.getClusterStore(this.storeIdNumber, this.clusterIdNumber).subscribe(res => {
        this.storeAndClusterBasedList = res;
        this.total_count = res.length;
        for (var i in this.storeAndClusterBasedList) {
          this.storeAndClusterBasedList[i].CreatedDate = this.storeAndClusterBasedList[i].CreatedDate ? moment(this.storeAndClusterBasedList[i].CreatedDate).format('MMM D, YYYY h:mm:ss a') : null
        }
        // console.log(this.storeAndClusterBasedList);
      })
    } else {
      this.storeAndClusterBasedList = [];
    }
  }

  removeListData: any;
  removeId: number;
  removeData(list) {
    this.removeListData = list;
    this.removeId = list.Id;
    if (confirm("Do you want to delete this record ?")) {
      this.clusterService.deleteClusterId(this.removeId).subscribe(res => {
        //console.log(res);
        if (res == true) {
          alert('Deleted Successfully!')
          this.messageService.add({ severity: 'success', summary: 'Deleted Successfully!', detail: '' });
        } else {
          alert('Record Not Deleted!')
          this.messageService.add({ severity: 'error', summary: 'Record Not Deleted!', detail: '' });
        }
        this.getClusterStore();
      })

    }
  }

  excelDownload() {
    debugger;
    var result = this.AllClustercustomerList.map(function (a) {
      return {
        'CustomerId' : a.CustomerId,
        'Skcode': a.Skcode,
        'SchedulerType': '',
        'SkipWeeks': '',
        'Day': '',
        'Priority': '',
      }
    })
    console.log(result);
    this.exportService.exportAsExcelFile(result, 'clusterSoreBeatMappedList');
  }

  modifyExcelData : any;
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
     
      excelData.forEach(key => {
        key.ClusterId = this.clusterIdNumber,
        key.StoreId = this.storeIdNumber
      })

      this.modifyExcelData = excelData
      
      for (var i in this.modifyExcelData) {
        this.modifyExcelData[i].CustomerId = parseInt(this.modifyExcelData[i].CustomerId ? this.modifyExcelData[i].CustomerId : 0)
        this.modifyExcelData[i].Priority = parseInt(this.modifyExcelData[i].Priority ? this.modifyExcelData[i].Priority : 0)
        this.modifyExcelData[i].SchedulerType = parseInt(this.modifyExcelData[i].SchedulerType ? this.modifyExcelData[i].SchedulerType : 0)
        this.modifyExcelData[i].SkipWeeks = parseInt(this.modifyExcelData[i].SkipWeeks ? this.modifyExcelData[i].SkipWeeks : 0)
        this.modifyExcelData[i].Day = this.modifyExcelData[i].Day == 'Monday' ? 1 : (this.modifyExcelData[i].Day == 'Tuesday' ? 2 : (this.modifyExcelData[i].Day == 'Wednesday' ? 3 : (this.modifyExcelData[i].Day == 'Thursday' ? 4 : (this.modifyExcelData[i].Day == 'Friday' ? 5 : (this.modifyExcelData[i].Day == 'Saturday' ? 6 : (this.modifyExcelData[i].Day == 'Sunday' ? 0 : ''))))))
      }
      console.log(this.modifyExcelData);

      let invalid = false;
      let detailOfIndexedItem = [];

      if (excelData.length > 0) {

        this.beatList = null;
        let uploadbeatList = [];
        excelData.forEach((element, index) => {
          uploadbeatList.push(element.Skcode);
        }
        );
        this.beatList = uploadbeatList;
        this.ValidatingClusterCustomer.Skcodes = this.beatList;
        this.ValidatingClusterCustomer.ClusterId = this.selectedCluster.ClusterId;
        this.clusterService.getValidateClusterCustomer(this.ValidatingClusterCustomer).subscribe(x => {
          //console.log(x);
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
            //this.blocked = false;
            this.messageService.add({ severity: 'error', summary: 'Error In Saving!', detail: '' });
          });
      }
    }
    reader.readAsBinaryString(file);
  }

  closeoutOfbeatSkcode() {
    this.outOfbeatSkcode = null;
    this.displayoutOfbeatSkcode = false;
  }

  uploadExcelRecord(){
    this.modifyExcelData;
    this.clusterService.uploadExcelSheet(this.modifyExcelData).subscribe(res => {
      console.log(res);
    })
  }
}
