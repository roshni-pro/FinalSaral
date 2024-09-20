import { Component, OnInit } from '@angular/core';
import { PickerService } from 'app/shared/services/picker/picker.service';

import { Router } from '@angular/router';
import { GetItemOrdersList, GetItemOrdersListV2, CompletedPickerDispatch, EditPickerorderQty } from 'app/shared/interface/picker/picker';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { PickList } from 'primeng/picklist';
import { PeopleService } from 'app/shared/services/people.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-order-picker-view',
  templateUrl: './order-picker-view.component.html',
  styleUrls: ['./order-picker-view.component.scss']
})
export class OrderPickerViewComponent implements OnInit {
  warehouseList: any;
  clusterList: any;
  pickerList: any;
  dataList : any;
  blocked: boolean;
  isOpenPopupPayments: boolean;
  selecteddetails: any;
  getDataList: any;
  y: any[];

  orderIds: number[];
  isSelectedIds: boolean[];
  WarehouseId: any;
  ClusterId: any;
  GetItemOrdersList: GetItemOrdersList;
  msgs: Message[] = [];
  generatedpickerList: any;
  getPeople: any;
  getPeoples: any;
  PeopleID: any;
  item: any;
  isInvalid: boolean;
  WarehouseName: any;
  GetItemOrdersListV2: GetItemOrdersListV2
  CompletedPickerDispatch: CompletedPickerDispatch;
  isItemdetail: boolean;
  printdetail: boolean;
  isSelect: boolean;
  orderblank: boolean;
  cols: any[];
  whname: any;
  savedata: boolean;
  data: any;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  DisplayName: any;
  orders: number[];
  pickerjobList: boolean;
  IsComplted: any;
  pickerId: any;
  Isdispatch: any;
  Iscomplete: any;
  StartTime: any;
  EndTime: any;
  Editable: any;
  Data: any;
  EditPickerorderQty: EditPickerorderQty;
  PickerItem: any[] = [];
  DeliveryBoy: any;
  datadispatch: any[];
  datadispatchgrthqty: any[];
  disp: boolean;
  RTD: any;
  datalist: any[];//aaaaa  
  Id: any;
  CreatedDate: any;
  CreatedBy: any;
  save: boolean;
  Editab: boolean;
  CreatedName: boolean;
  editedlist: any;
  ReadyToDispatch: boolean;
  Reject: boolean;
  Commentpopup: boolean;
  IsApproved: boolean;
  IsSelectOrder: any;
  exportpicker  :any;
  Comment : boolean;
  userid:any;
  pickerCancelOrder: boolean;
  comments:any;
  cancelOnNew : boolean = false;
  cancelHide : boolean = false;
  CancelBtn : boolean = false;
  picktimelist : any;
  entity : any;
  HistoryView : boolean = false;
  historyDetail : any;
  isSearch : boolean;
  isTable : boolean;

  constructor(private pickerservice: PickerService, private peopleService: PeopleService, private messageService: MessageService,private exportService: ExportServiceService, private router: Router, private confirmationService: ConfirmationService, public location: Location) {
    this.orderIds = [];
    this.isSelectedIds = [];
    this.orders = [];
    this.datadispatch = [];
    this.datadispatchgrthqty = [];
    this.IsSelectOrder = {};
    this.comments={};
    this.entity = "OrderPickerDetails";
    // this.entity = "OrderDispatchedMaster";
  }

  ngOnInit() {
    this.ClusterId = '';
    this.WarehouseId = '';
    this.IsComplted = null;
    this.PeopleID = null;
    this.RTD = false;

    this.GetItemOrdersList = {
      orderid: null
    }
    this.GetItemOrdersListV2 = {
      orderid: null,
      peopleId: null,
      ClusterId: null,
      LineItemCutItems : null,
      dboyid:0,
      MongoObjectid:null
    }
    this.CompletedPickerDispatch = {
      OrderIds: null,
      pickerId: null,
      DeliveryBoyId: null
    }
    this.EditPickerorderQty = {
      PickerId: null,
      orderPickerDetails: []
    }
    this.PickerItem = this.EditPickerorderQty.orderPickerDetails;

    this.blocked = true;
    this.pickerservice.GetAllWarehouse().subscribe(x => {
      this.warehouseList = x;
      this.blocked = false;
      console.log('x:', x);
    });
    this.isOpenPopupPayments = false;
    this.peopleService.GetAll().subscribe(x => {
      this.getPeoples = x;
    });
    this.pickerservice.getPickerTimerList().subscribe(x=>
      {
        this.picktimelist = x;
        for(var i in this.picktimelist)
        {
          this.picktimelist[i].differenceHrs = this.picktimelist[i].EndTime - this.picktimelist[i].StartTime;

        }
      })
  }


  getClusterlist(WarehouseId) {
    this.blocked = true;
    this.pickerservice.GetAllCluster(WarehouseId).subscribe(y => {
      this.clusterList = y;
      this.blocked = false;
      console.log('y:', y);
    });
  }

  filter(whclForm, ClusterId, IsComplted) {
    
    this.blocked = true;
    if (whclForm.form.status == "VALID") {
      this.pickerservice.ShowPickerListsA7(ClusterId, IsComplted).subscribe(y => {
        
        this.pickerList = y;
        this.exportpicker =  this.pickerList;
        console.log('ys:', y);
        // for(var i in this.pickerList)
        // {       
        //   for(var j in this.picktimelist)
        //   {
        //     if(this.picktimelist[j].OrderPickerMasterId == this.pickerList[i].Id)
        //     {
        //       var startTime = this.picktimelist[j].StartTime ? moment(this.picktimelist[j].StartTime).format('h:mm:ss') : null
        //       var endTime = this.picktimelist[j].EndTime ? moment(this.picktimelist[j].EndTime).format('h:mm:ss') : null
        //       // alert('this.picktimelist[j].StartTime:'+this.picktimelist[j].StartTime);
        //       // alert('this.picktimelist[j].endTime:'+this.picktimelist[j].EndTime);
        //       // console.log('this.picktimelist[i].st:',this.picktimelist[j].StartTime);
        //       // console.log('this.picktimelist[i].et:',this.picktimelist[j].EndTime);
        //       this.diff_hours(endTime, startTime) 
              
        //       console.log('this.pickerList[i].differenceHrs:',this.pickerList[i].differenceHrs);
        //       alert('this.ppickerList.diffHrs:'+this.pickerList[i].differenceHrs);
        //     }
        //   }
        // }
        for(var i in this.pickerList)
        {
          if(this.pickerList[i].Status == 0 && this.pickerList[i].IsCanceled == 0)
          {
            this.pickerList[i].CurrentStatus = 'New Request';
          }
          if(this.pickerList[i].Status == 0 && this.pickerList[i].IsCanceled == 1)
          {
            for(var j in this.getPeoples)
            {
              if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
              {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            // this.pickerList[i].CurrentStatus = 'Cancelled' + ' ' + 'by' + ' ' +  this.pickerList[i].ModifiedBy;
            this.pickerList[i].CurrentStatus = 'Cancelled';
          }
          if(this.pickerList[i].Status == 1)
          {
            this.pickerList[i].CurrentStatus = 'InProgress';
          }
          if(this.pickerList[i].Status == 2)
          {
            this.pickerList[i].CurrentStatus = 'Submitted';
          }
          if(this.pickerList[i].Status == 3)
          {
            for(var j in this.getPeoples)
            {
              if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
              {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            this.pickerList[i].CurrentStatus = 'Approved';
          }
          if(this.pickerList[i].Status == 6)
          {
            this.pickerList[i].CurrentStatus = 'Assignment Created';
          }
          if(this.pickerList[i].Status == 4)
          {
            this.pickerList[i].CurrentStatus = 'Canceled';
          }
          if(this.pickerList[i].Status == 5)
          {
            for(var j in this.getPeoples)
            {
              if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
              {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            this.pickerList[i].CurrentStatus = 'RePicked';
          }
        }
        this.dataList = this.pickerList;
        // for (var j in y)
        // {
        //   if(y[j].CurrentStatus == 'null')
        //   {
        //     var t1 = this.pickerList[i].StartTime;
        //     var g = y.filter(x=>x.CurrentStatus == 'New');
        //     this.cancelOnNew = true;
        //     console.log('g:',g);
    
        //   }
        //   if(y[j].CurrentStatus == 'null' && y[j].IsCanceled == 1)
        //   {
        //     y[j].CurrentStatus == 'Cancelled';
        //   }
        //   if(y[j].CurrentStatus == 'Completed')
        //   {
        //     var A = y.filter(x=>x.CurrentStatus == 'Approved');
        //     this.cancelOnNew = false;
        //     console.log('A:',A);
    
        //   }
          
        // }
        // for (var i in this.pickerList) {
        //   var t1 = this.pickerList[i].StartTime;
        //   var t2 = this.pickerList[i].EndTime;
        //   var t3 = this.pickerList[i].IsComplted;
        //   var t4 = this.pickerList[i].IsDispatched;
        //   var t5 = this.pickerList[i].IsApproved;
        //   var t6 = this.pickerList[i].IsCanceled;



        //   if (t1 == null) {
        //     if(t1 == null && this.pickerList[i].IsCanceled == true)
        //     {
        //       this.pickerList[i].CurrentStatus = 'Cancelled';
        //     }
        //     else{
        //       this.pickerList[i].CurrentStatus = 'New';
        //       this.cancelOnNew = true;
        //     }
            

        //   } 
        //   // if (t1 == null && this.pickerList[i].IsCanceled == true) {
        //   //   
        //   //   this.pickerList[i].CurrentStatus = 'Cancelled';
        //   //   // this.cancelOnNew = false;
        //   // }          
        //   else if (t1 != null && t2 == null) {
        //     this.pickerList[i].CurrentStatus = 'Started';
        //     this.cancelOnNew = false;
        //   }
        //   else if (t2 != null && t1 != null && t3 == true && t4 == true) {
        //     this.pickerList[i].CurrentStatus = 'Completed';
        //     this.cancelOnNew = false;
        //   }
        //   else if (t3 == true && t5 == true) {
        //     this.pickerList[i].CurrentStatus = 'Approved';
        //     this.cancelOnNew = false;
        //   }
        //   else if (t3 == false && t5 == false) {
        //     this.pickerList[i].CurrentStatus = 'Rejected';
        //     this.cancelOnNew = false;
        //   }
        //   else if (t2 != null && t1 != null && t3 == true && t4 == true) {
        //     this.pickerList[i].CurrentStatus = 'Completed';
        //     this.cancelOnNew = false;
        //   }
        //   else if (t2 != null && t1 != null && t3 == true && t4 == false ) {
        //     this.pickerList[i].CurrentStatus = 'Completed Audit & RTD';
        //     this.cancelOnNew = false;
        //   }
        //   // else if (t2 != null && t1 != null && t3 == true && t4 == false && t5 == true) {
        //   //   this.pickerList[i].CurrentStatus = 'Approved';
        //   // }
        //   // else if (t2 != null && t1 != null && t3 == true && t4 == true && t5 == true) {
        //   //   this.pickerList[i].CurrentStatus = 'Approved';
        //   // }
        //   // else if (t2 != null && t1 != null && t3 == false && t4 == false && t5 == false) {
        //   //   this.pickerList[i].CurrentStatus = 'Rejected';
        //   // }
        //   else if (t3 == true && t4 == true) {
        //     this.pickerList[i].CurrentStatus = 'Ready To dispatched';
        //     this.cancelOnNew = false;
        //   }

        //   console.log('Current Status:', this.pickerList[i].CurrentStatus);
        // }
        if (this.pickerList.length == 0) {
          this.messageService.add({ severity: 'error', summary: 'No Data Found!', detail: '' });
        }
        this.blocked = false;
      });
    } else {
      this.isInvalid = true;
      this.blocked = false;
    }
  }

  statusfilter(term)
  {

      if(term == "null")
      {
        this.pickerList = this.dataList;
      }
      else{
  // let pickerList = this.dataList.filter(x => x.ItemName.toString().toLowerCase().includes(event.target.value.toLowerCase() )
      this.pickerList = this.dataList.filter(x => x.CurrentStatus.toString().toLowerCase().includes(term.toLowerCase()));      
      console.log('DL',this.pickerList);
      }

  }

  OrderIdfilter(event)
  {
    
    let term = event.target.value
    console.log(term);
    console.log('DL',this.dataList);
    this.pickerservice.SearchByPickerId(term).subscribe(x=>{
      
      console.log('DLx',x);
      this.pickerList = x;
    });
    var a = this.pickerList;

    if (term.length >= 1) {
      // let pickerList = this.dataList.filter(x => x.ItemName.toString().toLowerCase().includes(event.target.value.toLowerCase() )
      this.pickerList = this.dataList.filter(x => x.Id == term || x.CurrentStatus.toString().toLowerCase().includes(event.target.value.toLowerCase()));      
      console.log('DL',this.pickerList);
    }
    else{
      this.pickerList = [];
      this.pickerList = this.dataList;
    }
  }



  openitem(d, e, WarehouseId) {
    
    this.datalist = [];//aaa
    this.selectedRowDetails = d;
    this.PeopleID = null; // to make deliveryboy empty done on 14feb at 3:53pm
    this.IsSelectOrder = d;
    console.log('IsSelectOrder',this.IsSelectOrder)
    this.pickerservice.GetpickerofWarehouse(WarehouseId).subscribe(x => {
      this.getPeople = x;
      this.blocked = false;
      console.log('GeTPeople:', this.getPeople);

      for (var i in this.getPeople) {
        if (d.PickerPersonId == this.getPeople[i].PeopleID) {
          this.DisplayName = this.getPeople[i].DisplayName;
          console.log('displayName::', this.DisplayName);
        }
      }
    });
    this.pickerservice.getPickerTimerListByPickerId(this.selectedRowDetails.Id).subscribe(x=>{
      this.picktimelist = x;
      for(var j in this.getPeoples)
      {
        for(var i in this.picktimelist)
        {
          if(this.picktimelist[i].CreatedBy == this.getPeoples[j].PeopleID)
          {
            this.picktimelist[i].CreatedBy = this.getPeoples[j].DisplayName;
          }
         
        }
      }
      for(var i in this.picktimelist)
      {
        // this.picktimelist[i].EndTime = this.picktimelist[i].EndTime ? moment(this.picktimelist[i].EndTime).format('h:mm:ss') : null
        // this.picktimelist[i].StartTime = this.picktimelist[i].StartTime ? moment(this.picktimelist[i].StartTime).format('h:mm:ss') : null
        //   this.picktimelist[i].differenceHrs = this.picktimelist[i].EndTime - this.picktimelist[i].StartTime;
          var startTime = moment(this.picktimelist[i].StartTime, "HH:mm:ss a"),
          endTime = moment(this.picktimelist[i].EndTime, "HH:mm:ss a");
          this.picktimelist[i].differenceHrs = moment.duration(endTime.diff(startTime));
           console.log([this.picktimelist[i].differenceHrs.hours(), this.picktimelist[i].differenceHrs.minutes(), this.picktimelist[i].differenceHrs.seconds()].join(':'));
          console.log('dif in Mins: ', (this.picktimelist[i].differenceHrs.hours() * 60) + this.picktimelist[i].differenceHrs.minutes());
          // alert([this.picktimelist[i].differenceHrs.hours(),'hr', this.picktimelist[i].differenceHrs.minutes(),'min', this.picktimelist[i].differenceHrs.seconds(),'sec'].join(':'));
          // alert('this.picktimelist[i].differenceHrs in Mins: '+ (this.picktimelist[i].differenceHrs.hours() * 60) + this.picktimelist[i].differenceHrs.minutes());
      }
      
    })
    this.pickerservice.GetAllWarehouse().subscribe(x => {
      this.warehouseList = x;
      for (var i in this.warehouseList) {
        
        if (WarehouseId == this.warehouseList[i].WarehouseId) {
          
          this.whname = this.warehouseList[i].WarehouseName;
        }
      }
    });

    if (this.selectedRow != undefined) {
      if(this.selectedRow.path){
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
    }
    this.selectedRow = e;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    }
    console.log(this.selectedRow);
    this.isDetails = true;
    this.data = this.selectedRowDetails.orderPickerDetails;
    //aaaaa
    for (var i in this.data) {
      if (this.data[i].Qty >= this.data[i].DispatchedQty) {
        this.datalist.push(this.data[i]);
        for(var i in this.datalist)
        {
          if(this.datalist[i].IsFreeItem == true)
          {
            this.datalist[i].IsFreeItem = 'Free';
          }
          else{
            this.datalist[i].IsFreeItem = 'Not Free';
          }
          if(this.datalist[i].Status == 0)
          {
            this.datalist[i].Status = 'No Action';
            this.CancelBtn = true;
          }
          else if(this.datalist[i].Status == 1)
          {
            this.datalist[i].Status = 'Picker Accept';
          }
          else if(this.datalist[i].Status == 2)
          {
            this.datalist[i].Status = 'Approver Approved';
          }
          else if(this.datalist[i].Status == 3)
          {
            this.datalist[i].Status = 'Picker Reject ';
          }
          else if(this.datalist[i].Status == 4)
          {
            this.datalist[i].Status = 'Approver Reject ';
          }
        }
        console.log('dataaaaa:', this.datalist);
      }
    }///aaaaa
    this.pickerId = this.selectedRowDetails.Id;
    this.Isdispatch = this.selectedRowDetails.IsDispatched;
    this.Iscomplete = this.selectedRowDetails.IsComplted;
    this.IsApproved = this.selectedRowDetails.IsApproved;
    this.StartTime = this.selectedRowDetails.StartTime;
    this.EndTime = this.selectedRowDetails.EndTime;
    this.Id = this.selectedRowDetails.Id;
    this.CreatedDate = this.selectedRowDetails.CreatedDate;
    this.CreatedBy = this.selectedRowDetails.CreatedBy;
    this.peopleService.GetAll().subscribe(x => {
      this.getPeoples = x;
      this.blocked = false;
      console.log('GeTPeople:', this.getPeoples);

      for (var i in this.getPeoples) {
        if (d.CreatedBy == this.getPeoples[i].PeopleID) {
          this.CreatedName = this.getPeoples[i].DisplayName;
          console.log('displayNamessds66++::', this.CreatedName);
        }
      }
    });

    if (this.StartTime != null && this.EndTime != null && this.Isdispatch == true && this.Iscomplete == true) {
      d.status = 'Ready To dispatched';
      console.log('status:', status);
    }
    if (this.StartTime != null && this.EndTime != null && this.Isdispatch == false && this.Iscomplete == true) {
      d.status = 'Completed not dispatched';
      console.log('status:', status);
    }

    // if (this.Isdispatch == true) {
    //   // this.messageService.add({ severity: 'success', summary: 'It Is Already Dispatched!', detail: '' });
    // }
    this.isOpenPopupPayments = true;
    this.Data = true;
  }


  openHistory(d,e)
  {
    
    this.historyDetail = d;
    this.HistoryView = true;
    this.isDetails = true;
  }

  Detail(ir) {
    this.isItemdetail = true;
    this.blocked = true;
    
    this.pickerservice.GetItemOrder(ir).subscribe(x => {
      this.getDataList = x;
      
      this.blocked = false;
      console.log("getdataList:", this.getDataList)
    });
  }


  GeneratePickerList(orderIds) {
    
    var a = this.warehouseList.filter(x => x.WarehouseId == this.WarehouseId);
    for (var i in a) {
      console.log(a[i].WarehouseName);
      this.whname = a[i].WarehouseName;

      console.log('whname', this.whname);
    }
  }

  // readyTodispatch(data, Id, PeopleID, deliveryboy) {
  //   // if(PeopleID == '' && this.RTD == false)
  //   // {
  //   //   this.confirmationService.confirm({
  //   //     message: 'Are you sure that you are Ready to Dispatch Then Select Delivery Boy?   क्या आप वाकई इस आइटम को सहेजना चाहते हैं?',
  //   //     accept: () => {
  //   //      this.RTD = true;
  //   //       return false;
  //   //     }
  //   //   });

  //   // }
  //   // else{
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you are Ready to Dispatch?   क्या आप सुनिश्चित हैं कि आप डिस्पैच के लिए तैयार हैं?',
  //     accept: () => {
  //       this.orders = [];
  //       this.RTD = true;
  //       if (deliveryboy.form.status == "VALID") {
  //         for (var i in data) {
  //           this.orders.push(data[i].OrderId);


  //           console.log('orderidsforreadyTodispatch:', this.orders);
  //         }
  //         this.CompletedPickerDispatch = {
  //           OrderIds: this.orders,
  //           pickerId: Id,
  //           DeliveryBoyId: PeopleID,
  //         }
  //         for (var i in this.getPeople) {
  //           if (PeopleID == this.getPeople[i].PeopleID) {
  //             this.DeliveryBoy = this.getPeople[i].DisplayName;
  //             console.log('displayName::', this.DisplayName);
  //           }
  //         }
  //         
  //         this.pickerservice.PostPickerJobListToDispatch(this.CompletedPickerDispatch).subscribe(result => {
  //           
  //           if (result == true) {
  //             this.messageService.add({ severity: 'success', summary: 'Ready To Dispatch Successfully!', detail: '' });
  //             this.IsSelectOrder.IsApproved == false;
  //             this.RTD = false;
  //           }
  //           else {
  //             this.messageService.add({ severity: 'success', summary: 'Ready To Dispatch Successfully!', detail: '' });
  //           }
  //           console.log('xyzreadytoPick:', result);
  //           this.isOpenPopupPayments = false
  //           this.IsSelectOrder.IsApproved == false;
  //           this.RTD = false;
            
  //         });
  //         // window.location.reload();
  //       }
  //       else {
  //         this.isInvalid = true;
  //         this.messageService.add({ severity: 'error', summary: 'Please Select Delivery Boy!', detail: '' });
  //       }
  //       this.IsSelectOrder.IsApproved == false;
  //       this.RTD = false;
  //     }
     
  //   });
  //   // }    
  // }


  GetpickerofWarehouse(WarehouseId) {
    this.blocked = true;
    this.pickerservice.GetpickerofWarehouse(WarehouseId).subscribe(x => {
      this.getPeople = x;
      this.blocked = false;
      console.log('GeTPeople:', this.getPeople);
    });
  }

  // EditMode(data) {
  //   
  //   this.Data = false;
  //   this.Editable = true;
  //   if (data.DispatchedQty <= data.Qty) {

  //   }
  // }

  // SaveMode(Id,data)
  // {
  //   
  //   this.EditPickerorderQty = {
  //     PickerId : Id,
  //     orderPickerDetails: []
  //   }
  //   this.PickerItem = this.EditPickerorderQty.orderPickerDetails;

  //   // for(var i in data)
  //   // {
  //   // if(data[i].DispatchedQty <= data[i].Qty)
  //   // {
  //   //     this.datadispatch.push(data[i]);
  //   //   }else
  //   //   {
  //   //     this.datadispatchgrthqty.push(data[i]);
  //   //     console.log('DispatchQtyGreaterThenQty:',this.datadispatchgrthqty)
  //   //     this.messageService.add({severity:'error', summary: 'Error', detail:'DispatchedQty should be less then or equal to Qty'});
  //   //     break;
  //   //   }
  //   // }
  //   //     if(this.datadispatch.length > 0)
  //   //     {
  //   //     this.datadispatch.forEach(element => {
  //   //     var obj={
  //   //       id : element.id,
  //   //       ItemMultiMrpId : element.ItemMultiMrpId,
  //   //       ItemName : element.ItemName,
  //   //       OrderId : element.OrderId,
  //   //       OrderDetailsId : element.OrderDetailsId,
  //   //       Qty : element.Qty,
  //   //       DispatchedQty : element.DispatchedQty,
  //   //       Comment : element.Comment,
  //   //     }
  //   //     this.PickerItem.push(obj);

  //   //   });
  //   // }


  //   if(data.length > 0)
  //   {
  //     data.forEach(element => {
  //       var obj={
  //         id : element.id,
  //         ItemMultiMrpId : element.ItemMultiMrpId,
  //         ItemName : element.ItemName,
  //         OrderId : element.OrderId,
  //         OrderDetailsId : element.OrderDetailsId,
  //         Qty : element.Qty,
  //         DispatchedQty : element.DispatchedQty,
  //         Comment : element.Comment,
  //       }
  //       this.PickerItem.push(obj);

  //     });

  //   }

  //   for(var i in data)
  //   {
  //   if(data[i].DispatchedQty <= data[i].Qty)
  //   {
  //     this.pickerservice.EditPIckerorderQty(this.EditPickerorderQty).subscribe(x => {

  //       console.log('EditPIckerorderQtyxxxx:', x);
  //     });
  //     this.messageService.add({severity:'success', summary: 'Success', detail:'DispatchedQty edited succesfully'});
  //   }else
  //   {
  //     this.messageService.add({severity:'error', summary: 'Error', detail:'DispatchedQty should be less then or equal to Qty'});
  //   }
  // }
  //   this.Data = true;
  //   this.Editable = false;

  // }



  // SaveMode(Id, data) {
  //   
  //   // for(var i in data)
  //   // {
  //   // data[i].DispatchedQty=data[i].EditDispatchedQty;
  //   // }
  //   this.datadispatchgrthqty = [];
  //   this.EditPickerorderQty = {
  //     PickerId: Id,
  //     orderPickerDetails: []
  //   }
  //   this.PickerItem = this.EditPickerorderQty.orderPickerDetails;

  //   for (var i in data) {
  //     if (data[i].EditDispatchedQty > data[i].Qty) {
  //       
  //       this.disp = true;
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'DispatchedQty should be less then or equal to Qty' });
  //       return false;

  //       break;
  //     }
  //     else {
  //       
  //       this.disp = false;
  //       this.datadispatchgrthqty.push(data[i]);
  //     }
  //   }
  //   this.datadispatchgrthqty.forEach(element => {
  //     var obj = {
  //       id: element.id,
  //       ItemMultiMrpId: element.ItemMultiMrpId,
  //       ItemName: element.ItemName,
  //       OrderId: element.OrderId,
  //       OrderDetailsId: element.OrderDetailsId,
  //       Qty: element.Qty,
  //       DispatchedQty: element.EditDispatchedQty,
  //       Comment: element.Comment,
  //     }
  //     this.PickerItem.push(obj);

  //   });

  //   this.pickerservice.EditPIckerorderQty(this.EditPickerorderQty).subscribe(x => {
  //     this.datalist = x;
  //     console.log('EditPIckerorderQtyxxxx:', x);
  //   });
  //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'DispatchedQty edited succesfully' });


  //   this.Data = true;
  //   this.Editable = false;
  //   // window.location.reload();

  // }

  CancelMode() {
    this.Editable = false;
    this.Data = true;
  }

  // savee(data) {
  //   
  //   this.save = false;
  //   for (var i in data) {
  //     if (data[i].EditDispatchedQty != '' && data[i].EditDispatchedQty != null) {
  //       this.save = true;
  //     }
  //     else {
  //       return false;
  //     }
  //   }
  // }

  // editMode(ir) {
  //   
  //   this.Editab = true;
  //   ir.EditDispatchedQty = ir.DispatchedQty;
  //   console.log('ir', ir);
  // }

  // openitemS(d, e, id) {
  //   
  //   this.datalist = [];//aaa

  //   this.editMode(d);
  //   if (this.selectedRow != undefined) {
  //     this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
  //   }
  //   this.selectedRow = e;
  //   this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
  //   console.log(this.selectedRow);
  //   this.isDetails = true;
  //   this.data = d.orderPickerDetails;

  //   this.pickerId = d.Id;
  //   this.Isdispatch = d.IsDispatched;
  //   this.Iscomplete = d.IsComplted;
  //   this.StartTime = d.StartTime;
  //   this.EndTime = d.EndTime;
  //   this.Id = d.Id;
  //   this.CreatedDate = d.CreatedDate;
  //   this.CreatedBy = d.CreatedBy;

  // }

  // Approved(Id, Comment) {
  //   
  //   this.Reject = true;
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to Approved this OrderList?   क्या आप सुनिश्चित हैं कि आप इस आदेश सूची को मंजूरी दी?',
  //     // message: 'Are you sure you want to Approved this OrderList?   क्या आप सुनिश्चित हैं कि आप इस आर्डरलिस्ट को मंजूरी दे रहे हो?',
  //     accept: () => {
  //       this.ReadyToDispatch = true;
  //       this.RTD = true;
  //       this.Reject = true;
  //       this.Isdispatch == true;
  //       this.Iscomplete == true;
  //       this.IsApproved = false;
  //       this.Data == true;
  //       this.pickerservice.AcceptPickerList(Id, Comment).subscribe(result => {
  //         console.log('AcceptPickerList', result);
  //         this.IsSelectOrder = result;
  //         this.datalist = result.orderPickerDetails
  //       });
  //       // window.location.reload();
  //     }

  //   });

  // }

  // Declined(Id) {
  //   
  //   this.Reject = false;
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to Declined this OrderList? क्या आप वाकई इस ऑर्डरलिस्ट को अस्वीकृत करना चाहते हैं?',
  //     accept: () => {
  //       this.ReadyToDispatch = false;
  //       this.isInvalid = false;
  //       this.RTD = false;
  //       this.Reject = false;
  //       this.Isdispatch = true;
  //       this.Iscomplete = false;
  //       this.Data = true;
  //       this.Commentpopup = true;
  //       // IsApproved = true;
  //       // this.isOpenPopupPayments = false;
  //     }
  //   });
  // }

  // RejectSave(commentform, Id, Comment) {
  //   
  //   // if(commentform.form.Status == "VALID")
  //   // {
  //   this.IsApproved = false;
  //   this.pickerservice.RejectPickerList(Id, Comment).subscribe(result => {
  //     console.log('ANfafafVD', result);
  //     this.IsSelectOrder = result;
  //     this.datalist = result.orderPickerDetails
  //     this.Commentpopup = false
  //   });
  //   // window.location.reload();

  // }

  ExportPicker()
  {
    this.exportService.exportAsExcelFile(this.exportpicker, 'exportpicker');
  }
  // comment(Commenet)
  // {
  //   this.Comment = true;
  // }
  updatecancelorder(){
    
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.pickerCancelOrder=true;
        this.comments="";    
        this.userid = localStorage.getItem('userid');
        this.cancelOnNew = false;
      }
     
    });
    
  }
  updatecomments(comments){
    
  this.userid=this.userid;

    this.pickerservice.Updatecomments( this.userid,comments,this.selectedRowDetails.Id).subscribe(result=>{
      
      this.messageService.add({ severity: 'success', summary: result, detail: '' });
      if(result == 'Picker Order Canceled Successfully')
      {
        this.cancelHide = true;
      }
      this.pickerCancelOrder=false;
    })
  }
  cancel()
  {
    this.pickerCancelOrder=false;
  }
  toggleSearch() {
    if (this.isSearch == true) {
      this.isSearch = false;
    } else {
      if (this.isTable == true) {
        this.isTable = false;
      }
      this.isSearch = true;
    }
  }


//   diff_hours(dt2, dt1) 
//  {
//   alert(dt2);
//   alert(dt1);
//   var a =(dt2 - dt1);
//   alert(a);
//   var diff =(dt2 - dt1) / 1000;
//   alert(diff);
//   diff /= (60 * 60);
//   alert(Math.abs(Math.round(diff)));
//   return Math.abs(Math.round(diff));  
//  }
}
