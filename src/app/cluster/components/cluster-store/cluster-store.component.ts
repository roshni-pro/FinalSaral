import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ClusterStoreService } from 'app/cluster/services/cluster-store.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { clusterStoreInterface } from 'app/cluster/services/cluster-store-interface';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cluster-store',
  templateUrl: './cluster-store.component.html',
  styleUrls: ['./cluster-store.component.scss']
})
export class ClusterStoreComponent implements OnInit {
  clusterStoreInterface: clusterStoreInterface;
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
  getPriority:any;

  constructor(private clusterService: ClusterStoreService, private fb: FormBuilder, private messageService : MessageService) {
    this.scheduleList = [
      { scheduleName: 'Weekly', scheduleId: '1' },
      { scheduleName: 'Monthly', scheduleId: '2' }
    ];

    this.skipList = [
      { skipName: '0', skipId: '0' },
      { skipName: '1', skipId: '1' },
      { skipName: '2', skipId: '2' },
      { skipName: '3', skipId: '3' }
    ];


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
    });

    this.clusterService.getStoreList().subscribe(res => {
      this.storeList = res;
    })

    this.getClusterStore();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`onchanges ${changes.currentValue} `);
    
    this.getClusterStore();
    // throw new Error('Method not implemented.');
  }

  hideFieldBasedOnWarehouse:boolean= false;
  getWarehouseId(event) {
    this.getWarehouseIdNumber = event.value.WarehouseId;
    if(this.getWarehouseIdNumber != undefined){
      this.hideFieldBasedOnWarehouse = true
    }else{
      this.hideFieldBasedOnWarehouse = false;
    }
    this.clusterService.getClusterWiseWarehouse(this.getWarehouseIdNumber).subscribe(res => {
      this.clusterWiseWarehouseList = res;
    })
  }

  
  hideFieldBasedOnStore:boolean = false;
  getStoreId(event) {
    this.storeIdNumber = event.value.Id;
    this.storeName = event.value.Name;
    if(this.storeIdNumber != undefined){
      this.hideFieldBasedOnStore = true;
    }else{
      this.hideFieldBasedOnStore = false;
    }
    this.getClusterStore();
  }

  
  hideFieldBasedOnCluster:boolean=false;
  getClusterId(event) {
    this.clusterIdNumber = event.value.ClusterId;
    if(this.clusterIdNumber != undefined){
      this.hideFieldBasedOnCluster = true;
    }else{
      this.hideFieldBasedOnCluster = false;
    }
    this.clusterName = event.value.ClusterName;
    this.clusterService.getCustomerByClusterId(this.clusterIdNumber).subscribe(res => {
      this.customerList = res.map(function (ele) {
        return {
          'CustomerId': ele.CustomerId,
          'CustomerName': ele.Name + ' ' + ele.Skcode
        };
      });
    })
    this.getClusterStore();
  }

  
  multipleCustmer: any;
  hideFieldBasedOnCustomer:boolean=false;
  getCustomerId(event) {
    this.multipleCustmer = event.value;
    if(this.multipleCustmer.length >= 1){
      this.hideFieldBasedOnCustomer = true;
    }else{
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
    //console.log(event.value);
    this.multipleWeek = event.value;
  }


  addNewRecord:any;
  savedBtnEnable:boolean=false;
  findExistingId:any;
  findCustomerId:any;
  updatedListData = [];
  onclick() {
    let arr = [];

    //this.storeAndClusterBasedList  isme find kro CustomerId if found then 
   //if(Yes){}else{}
   
    this.multipleCustmer.forEach(element => {
        
      console.log(this.storeAndClusterBasedList);
      this.findExistingId =  this.storeAndClusterBasedList.find(x => x.CustomerId == element.CustomerId);
      console.log(this.findExistingId);
     
      
      if(this.findExistingId == undefined){
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
      }else{
        let ind =  this.storeAndClusterBasedList.findIndex(x => x.CustomerId == element.CustomerId);
        
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
          'IsActive': this.isActive  == undefined ? false : this.getSkipNumber,
          'IsDeleted': this.isDeleted  == undefined ? false : this.getSkipNumber
        }
      //  this.storeAndClusterBasedList[ind] = tempObj;
      //  console.log(this.storeAndClusterBasedList[ind]);
      this.updatedListData.push(tempObj);
      console.log(this.updatedListData);
      }

      
    });
    //console.log(this.multipleWeek);
    if(this.scheduleIdNumber == 1){
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
   }else{

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
    arr.forEach(element=> {
      this.storeAndClusterBasedList.unshift(element);
    })

    
    this.addNewRecord = arr;
    if((this.addNewRecord.length >= 1) || (this.updatedListData.length >= 1)){
      this.savedBtnEnable = true;
    }else{
      this.savedBtnEnable = false;
    }
  }

  openDetails(d, e) {
    //console.log(d);
  }

  
  saveData(){
    console.log(this.addNewRecord);
    if(this.addNewRecord.length>=1){
      this.clusterService.addAndUpdate(this.addNewRecord).subscribe(res => {
        console.log(res);
      })
    }
    
    console.log(this.updatedListData);
    if(this.updatedListData.length>=1){
      this.clusterService.addAndUpdate(this.updatedListData).subscribe(res => {
        console.log(res);
      })
    }

    this.ngOnInit();
    this.getClusterStore();
    this.savedBtnEnable = false;
  }

  getClusterStore(){
    if(this.storeIdNumber != undefined && this.clusterIdNumber != undefined){
      this.clusterService.getClusterStore(this.storeIdNumber, this.clusterIdNumber).subscribe(res => {
        this.storeAndClusterBasedList = res;
        for(var i in this.storeAndClusterBasedList){
          this.storeAndClusterBasedList[i].CreatedDate = this.storeAndClusterBasedList[i].CreatedDate ? moment(this.storeAndClusterBasedList[i].CreatedDate).format('MMM D, YYYY h:mm:ss a') : null
        }
        console.log(this.storeAndClusterBasedList);
      })
    }  else {
    }
  }

  removeListData:any;
  removeId:number;
  removeData(list) {
    this.removeListData = list;
    this.removeId = list.Id;
    // if(confirm("Do you want to delete this cluster")){
        this.clusterService.deleteClusterId(this.removeId).subscribe(res => {
          console.log(res);
          if(res){
            this.messageService.add({severity:'error', summary: 'Deleted Successfully!', detail:''});
          }
        })
        
    //}
    this.ngOnInit();
    this.getClusterStore();
  }
}
