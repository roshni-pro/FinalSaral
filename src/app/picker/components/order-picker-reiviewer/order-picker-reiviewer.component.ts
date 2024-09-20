import { Component, OnInit } from '@angular/core';
import { EditPickerorderQty, CompletedPickerDispatch, GetItemOrdersListV2, GetItemOrdersList, PickerRTDOrderDC } from 'app/shared/interface/picker/picker';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { PickerService } from 'app/shared/services/picker/picker.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PeopleService } from 'app/shared/services/people.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';
import { DeliveryBoyService } from 'app/shared/services/delivery-boy.service';

@Component({
  selector: 'app-order-picker-reiviewer',
  templateUrl: './order-picker-reiviewer.component.html',
  styleUrls: ['./order-picker-reiviewer.component.scss']
})
export class OrderPickerReiviewerComponent implements OnInit {
  isSearch : boolean;
  isTable : boolean;
  warehouseList: any;
  clusterList: any;
  pickerList: any;
  dataList : any;
  blocked: boolean;
  isOpenPopupPayments: boolean;
  WarehouseId: any;
  ClusterId: any;
  getPeople: any;
  getPeoples: any;
  PeopleID: any;
  isInvalid: boolean;
  whname: any;
  data: any;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  DisplayName: any;
  pickerId: any;
  Isdispatch: any;
  Iscomplete: any;
  StartTime: any;
  EndTime: any;
  Data: any;
  datalist: any[];//aaaaa  
  Id: any;
  CreatedDate: any;
  CreatedBy: any;
  CreatedName: boolean;
  IsApproved: boolean;
  IsSelectOrder: any;
  exportpicker  :any;
  userid:any;
  // pickerCancelOrder: boolean;
  comments:any;
  cancelOnNew : boolean = false;
  // cancelHide : boolean = false;
  // CancelBtn : boolean = false;
  picktimelist : any;
  entity : any;
  HistoryView : boolean = false;
  historyDetail : any;
  IsComplted : any;
  repicked : any;
  historyHide : boolean = false;
  term : number;
  DeliveryIssuanceId : any;
  DBoyName : any;
  AgentName : any;
  checkerTimerList : any;
  makerTimerList : any;
  StartedTime : any;
EndedTime : any;
orderIds: number[];
pickerRTDOrderDC: PickerRTDOrderDC;
  IsExtension: boolean;
  RTD: any;
  dboyList: any;
  agentList: any;
  mobile: number;
  AgentId: any;
  pickerOrderList:any;
  errorlist:any[];
  skip:any;
  take:any;
  searchdata:any;
  totalcount:any;
  DboyId:any;
  db:any;
  RedispatchorderList:any[]; 
  dboyMobile:any;
  OrderidRedispached:number[];
  isSelectedIds:boolean[];
  itemList: any[];
  orderdetails:any;
  poPopup:boolean;
  hide:boolean;
  constructor(private pickerservice : PickerService,private messageService : MessageService,private deliveryBoyService : DeliveryBoyService,
    private peopleService : PeopleService,private confirmationService: ConfirmationService,) {   
    this.IsSelectOrder = {};
    this.comments={};
    this.searchdata={};
    this.db={};
    this.isSelectedIds = [];
    this.itemList=[];
    this.entity = "OrderPickerDetails";
  }

  ngOnInit() {
    this.WarehouseId = '';
    this.ClusterId = "";
    this.IsComplted = null;
    this.OrderidRedispached=[];
    this.poPopup=false;
    this.hide=false;
    this.pickerservice.GetAllWarehouse().subscribe(x => {
      this.warehouseList = x;
      this.blocked = false;
      console.log('x:', x);
    });
    this.peopleService.GetAll().subscribe(x => {
      this.getPeoples = x;
      console.log('GeTPeople:', this.getPeoples);
    });
  }
  getClusterlist(WarehouseId) {
    this.blocked = true;
    this.pickerservice.GetAllCluster(WarehouseId).subscribe(y => {
      this.clusterList = y;
      this.blocked = false;
      console.log('y:', y);
    });
  }
  load(event)  {
    
    var Last=  event.first ? event.first + event.rows : 20;
   this.skip=Last/ event.rows;
   this.take= event.rows;
   this.filter(this.searchdata);
    
  }
  filter(searchdata) {
    
    this.hide=false;
    if (searchdata.term ==undefined) {
      if (searchdata.WarehouseId == undefined) {
        this.messageService.add({ severity: 'error', summary: 'Please Select Warehoues!', detail: '' });
        return;
      }
    }
    if(searchdata.WarehouseId != "")
    {
    if(searchdata.ClusterId == "" || searchdata.ClusterId == undefined)
    {
      searchdata.ClusterId = 0;
      this.ClusterId = 0;
    }
  }
    if(searchdata.term == "" || searchdata.term == undefined)
    {
      searchdata.term = undefined;
    }
    if(searchdata.IsComplted == undefined && searchdata.term == undefined)
    {      
    this.blocked = true;
    //if (whclForm.form.status == "VALID") {
      this.pickerservice.GetApprovedList(searchdata.WarehouseId,searchdata.ClusterId,this.skip,this.take).subscribe(y => {
         
         this.pickerList = y.PickerList;
        this.totalcount= y.Totalcount;        
        this.exportpicker =  this.pickerList;
        for(var i in this.pickerList)
        {
          this.repicked= this.pickerList[i].orderPickerDetails;
          if(this.pickerList[i].Status == 0 && this.pickerList[i].IsCanceled == 0)
          {
            for(var j in this.getPeoples)
            {
              if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
              {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
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
            this.pickerList[i].CurrentStatus = 'Cancelled';
          }
          if(this.pickerList[i].Status == 1  && this.pickerList[i].IsCanceled == 0)
          {
            for(var j in this.getPeoples)
            {
              if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
              {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            this.pickerList[i].CurrentStatus = 'InProgress';
          }
          if(this.pickerList[i].Status == 1  && this.pickerList[i].IsCanceled == 1)
          {
            for(var j in this.getPeoples)
            {
              if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
              {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            this.pickerList[i].CurrentStatus = 'Cancelled';
          }
          if(this.pickerList[i].Status == 2  && this.pickerList[i].IsCanceled == 0)
          {
            for(var j in this.getPeoples)
            {
              if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
              {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            this.pickerList[i].CurrentStatus = 'Submitted';
          }
          if(this.pickerList[i].Status == 2  && this.pickerList[i].IsCanceled == 1)
          {
            for(var j in this.getPeoples)
            {
              if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
              {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            this.pickerList[i].CurrentStatus = 'Cancelled';
          }
          if(this.pickerList[i].Status == 3  && this.pickerList[i].IsCanceled == 0)
          {
            for(var j in this.getPeoples)
            {
              if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
              {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            // this.pickerList[i].CurrentStatus = 'Dispatched';
            this.pickerList[i].CurrentStatus = 'Approved(RTD Done)';            
          }
          if(this.pickerList[i].Status == 6  && this.pickerList[i].IsCanceled == 0)
          {
            for(var j in this.getPeoples)
            {
              if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
              {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            // this.pickerList[i].CurrentStatus = 'Dispatched';
            this.pickerList[i].CurrentStatus = 'Assignment Created';            
          }
          if(this.pickerList[i].Status == 3  && this.pickerList[i].IsCanceled == 1)
          {
            for(var j in this.getPeoples)
            {
              if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
              {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            this.pickerList[i].CurrentStatus = 'Cancelled';
          }
          if(this.pickerList[i].Status == 4)
          {
            for(var j in this.getPeoples)
            {
              if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
              {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            this.pickerList[i].CurrentStatus = 'Cancelled';
          }
          // if(this.repicked[i].Status == 4 && this.pickerList[i].IsComplted == 1 && this.pickerList[i].IsCanceled == 0 )
          // {
          //   this.pickerList[i].CurrentStatus = 'RePicked';
          // }
          // if(this.repicked[i].Status == 4 && this.pickerList[i].IsComplted == 1  && this.pickerList[i].IsCanceled == 1 )
          // {
          //   this.pickerList[i].CurrentStatus = 'Cancelled';
          // }
          if(this.pickerList[i].Status == 5  && this.pickerList[i].IsCanceled == 0)
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
          if(this.pickerList[i].Status == 5  && this.pickerList[i].IsCanceled == 1)
          {
            for(var j in this.getPeoples)
            {
              if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
              {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            this.pickerList[i].CurrentStatus = 'Cancelled';
          }
        }
        this.dataList = this.pickerList;
        
        if (this.pickerList.length == 0) {
          this.messageService.add({ severity: 'error', summary: 'No Data Found!', detail: '' });
        }
        this.blocked = false;
      });
    // } else {
    //   this.isInvalid = true;
    //   this.blocked = false;
    // }
  }
  else
  {
    if(searchdata.IsComplted !=undefined)
    {
      if(searchdata.WarehouseId == "")
      {
      this.statusfilter(searchdata.IsComplted);
      }
      else
      {
        this.pickerservice.GetApprovedList(searchdata.WarehouseId,searchdata.ClusterId,this.skip,this.take).subscribe(y => {
          // 
          this.pickerList = y;        
          this.exportpicker =  this.pickerList;
          console.log('ys:', y);
          
          for(var i in this.pickerList)
          {
            this.repicked= this.pickerList[i].orderPickerDetails;
            if(this.pickerList[i].Status == 0 && this.pickerList[i].IsCanceled == 0)
            {
              for(var j in this.getPeoples)
              {
                if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
                {
                  this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                }
              }
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
              this.pickerList[i].CurrentStatus = 'Cancelled';
            }
            if(this.pickerList[i].Status == 1  && this.pickerList[i].IsCanceled == 0)
            {
              for(var j in this.getPeoples)
              {
                if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
                {
                  this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                }
              }
              this.pickerList[i].CurrentStatus = 'InProgress';
            }
            if(this.pickerList[i].Status == 1  && this.pickerList[i].IsCanceled == 1)
            {
              for(var j in this.getPeoples)
              {
                if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
                {
                  this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                }
              }
              this.pickerList[i].CurrentStatus = 'Cancelled';
            }
            if(this.pickerList[i].Status == 2  && this.pickerList[i].IsCanceled == 0)
            {
              for(var j in this.getPeoples)
              {
                if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
                {
                  this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                }
              }
              this.pickerList[i].CurrentStatus = 'Submitted';
            }
            if(this.pickerList[i].Status == 2  && this.pickerList[i].IsCanceled == 1)
            {
              for(var j in this.getPeoples)
              {
                if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
                {
                  this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                }
              }
              this.pickerList[i].CurrentStatus = 'Cancelled';
            }
            if(this.pickerList[i].Status == 3  && this.pickerList[i].IsCanceled == 0)
            {
              for(var j in this.getPeoples)
              {
                if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
                {
                  this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                }
              }
              // this.pickerList[i].CurrentStatus = 'Dispatched';
              this.pickerList[i].CurrentStatus = 'Approved';
            }
            if(this.pickerList[i].Status == 6  && this.pickerList[i].IsCanceled == 0)
            {
              for(var j in this.getPeoples)
              {
                if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
                {
                  this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                }
              }
              // this.pickerList[i].CurrentStatus = 'Dispatched';
              this.pickerList[i].CurrentStatus = 'Assignment Created';
            }
            if(this.pickerList[i].Status == 3  && this.pickerList[i].IsCanceled == 1)
            {
              for(var j in this.getPeoples)
              {
                if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
                {
                  this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                }
              }
              this.pickerList[i].CurrentStatus = 'Cancelled';
            }
            if(this.pickerList[i].Status == 4)
            {
              for(var j in this.getPeoples)
              {
                if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
                {
                  this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                }
              }
              this.pickerList[i].CurrentStatus = 'Cancelled';
            }
            if(this.pickerList[i].Status == 5  && this.pickerList[i].IsCanceled == 0)
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
            if(this.pickerList[i].Status == 5  && this.pickerList[i].IsCanceled == 1)
            {
              for(var j in this.getPeoples)
              {
                if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
                {
                  this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                }
              }
              this.pickerList[i].CurrentStatus = 'Cancelled';
            }
          }
          this.dataList = this.pickerList;
          if(searchdata.IsComplted == "All")
          {
            this.pickerList = this.dataList;
          }
          else{
            this.pickerList = this.dataList.filter(x => x.CurrentStatus.toString().toLowerCase().includes(searchdata.IsComplted.toLowerCase()));      
          }
          if (this.pickerList.length == 0) {
            this.messageService.add({ severity: 'error', summary: 'No Data Found!', detail: '' });
          }
          this.blocked = false;
        }); 
      }
    }
    if(searchdata.term != undefined)
    {
      this.OrderIdfilter(searchdata.term);
    }
    
  }
  }

  statusfilter(term)
  {
    // 
    if(this.WarehouseId == '' && this.ClusterId == '')
    {
      this.pickerservice.pickerListsA7().subscribe(x=>
        {
          this.pickerList = x;
          for(var i in this.pickerList)
          {
            this.repicked= this.pickerList[i].orderPickerDetails;
            if(this.pickerList[i].Status == 0 && this.pickerList[i].IsCanceled == 0)
            {
              for(var j in this.getPeoples)
              {
                if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
                {
                  this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                }
              }
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
              this.pickerList[i].CurrentStatus = 'Cancelled';
            }
            if(this.pickerList[i].Status == 1  && this.pickerList[i].IsCanceled == 0)
            {
              for(var j in this.getPeoples)
              {
                if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
                {
                  this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                }
              }
              this.pickerList[i].CurrentStatus = 'InProgress';
            }
            if(this.pickerList[i].Status == 1  && this.pickerList[i].IsCanceled == 1)
            {
              for(var j in this.getPeoples)
              {
                if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
                {
                  this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                }
              }
              this.pickerList[i].CurrentStatus = 'Cancelled';
            }
            if(this.pickerList[i].Status == 2  && this.pickerList[i].IsCanceled == 0)
            {
              for(var j in this.getPeoples)
              {
                if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
                {
                  this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                }
              }
              this.pickerList[i].CurrentStatus = 'Submitted';
            }
            if(this.pickerList[i].Status == 2  && this.pickerList[i].IsCanceled == 1)
            {
              for(var j in this.getPeoples)
              {
                if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
                {
                  this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                }
              }
              this.pickerList[i].CurrentStatus = 'Cancelled';
            }
            if(this.pickerList[i].Status == 3  && this.pickerList[i].IsCanceled == 0)
            {
              for(var j in this.getPeoples)
              {
                if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
                {
                  this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                }
              }
              // this.pickerList[i].CurrentStatus = 'Dispatched';Assignment Created
              this.pickerList[i].CurrentStatus = 'Approved';
            }if(this.pickerList[i].Status == 6  && this.pickerList[i].IsCanceled == 0)
            {
              for(var j in this.getPeoples)
              {
                if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
                {
                  this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                }
              }
              // this.pickerList[i].CurrentStatus = 'Dispatched';Assignment Created
              this.pickerList[i].CurrentStatus = 'Assignment Created';
            }

            
            if(this.pickerList[i].Status == 3  && this.pickerList[i].IsCanceled == 1)
            {
              for(var j in this.getPeoples)
              {
                if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
                {
                  this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                }
              }
              this.pickerList[i].CurrentStatus = 'Cancelled';
            }
            if(this.pickerList[i].Status == 4)
            {
              for(var j in this.getPeoples)
              {
                if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
                {
                  this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                }
              }
              this.pickerList[i].CurrentStatus = 'Cancelled';
            }
            if(this.pickerList[i].Status == 5  && this.pickerList[i].IsCanceled == 0)
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
            if(this.pickerList[i].Status == 5  && this.pickerList[i].IsCanceled == 1)
            {
              for(var j in this.getPeoples)
              {
                if(this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID)
                {
                  this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                }
              }
              this.pickerList[i].CurrentStatus = 'Cancelled';
            }
          }
          this.dataList = this.pickerList;
        
        if(term == "null")
        {
          this.pickerList = [];
        }
        else if(term == "All")
        {
          this.pickerList = this.dataList;
        }
        else{
        this.pickerList = this.dataList.filter(x => x.CurrentStatus.toString().toLowerCase().includes(term.toLowerCase()));      
        console.log('DL',this.pickerList);
        }
      });
    }
    else{
        if(term == "null")
        {
          this.pickerList = this.dataList;
        }
        else{
          // 
        this.pickerList = this.dataList.filter(x => x.CurrentStatus.toString().toLowerCase().includes(term.toLowerCase()));      
        // this.IsComplted = "";
        console.log('DL',this.pickerList);
        }
    }
   

  }

  OrderIdfilter(event)
  {
    let term = event;
    console.log(term);
    console.log('DL',this.dataList);
    this.pickerservice.SearchByPickerId(term).subscribe(x=>{
      // 
      console.log('DLx',x);
      this.pickerList = x;
    });
    var a = this.pickerList;
// 
    if (term.length >= 1) {
      this.pickerList = this.dataList.filter(x => x.Id == term || x.CurrentStatus.toString().toLowerCase().includes(event.toLowerCase()));      
      // this.term = null;
      console.log('DL',this.pickerList);
    }
    else{
      this.pickerList = [];
      this.pickerList = this.dataList;
    }
  }

  openitem(d, e, WarehouseId) {
    this.blocked=true;
    
    this.OrderidRedispached=[];
    this.datalist = [];//aaa
    this.makerTimerList = [];
    this.checkerTimerList = [];
    this.DeliveryIssuanceId = d.DeliveryIssuanceId;
    this.DBoyName = d.DBoyName;
    this.DboyId=d.DboyId;
    this.dboyMobile=d.DboyMobile;
    this.AgentName = d.AgentName;
    this.selectedRowDetails = d;
    this.getDboyList(d.WarehouseId);
    this.PeopleID = null; // to make deliveryboy empty done on 14feb at 3:53pm
    this.IsSelectOrder = d;
    this.CreatedName = this.IsSelectOrder.CreatedByName;
    if(this.IsSelectOrder.CreatedByName == null)
    {
            for (var i in this.getPeoples) {
              if (d.CreatedBy == this.getPeoples[i].PeopleID) {
                this.CreatedName = this.getPeoples[i].DisplayName;
                console.log('displayNamessds66++::', this.CreatedName);
              }
            }
    }
    this.pickerservice.GetpickerofWarehouse(d.WarehouseId).subscribe(x => {
      this.getPeople = x;
      this.blocked = false;

      for (var i in this.getPeople) {
        if (d.PickerPersonId == this.getPeople[i].PeopleID) {
          this.DisplayName = this.getPeople[i].DisplayName;
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
      for(var k in this.picktimelist)
      {
        if(this.picktimelist[k].Type == 0)
        {
          this.makerTimerList.push(this.picktimelist[k]);       
        }
        if(this.picktimelist[k].Type == 1)
        {
          this.checkerTimerList.push(this.picktimelist[k]);
         
        }
      }
      for(var i in this.makerTimerList)
      {
          var startTime = moment(this.makerTimerList[i].StartTime, "HH:mm:ss a"),          
          endTime = moment(this.makerTimerList[i].EndTime, "HH:mm:ss a");
          this.makerTimerList[i].differenceHrs = moment.duration(endTime.diff(startTime));
          if(this.makerTimerList[i].differenceHrs == 'NaNNaN')
          {
            this.makerTimerList[i].differenceHrs = '-';
          }
           console.log([this.makerTimerList[i].differenceHrs.hours(), this.makerTimerList[i].differenceHrs.minutes(), this.makerTimerList[i].differenceHrs.seconds()].join(':'));
          console.log('dif in Mins: ', (this.makerTimerList[i].differenceHrs.hours() * 60) + this.makerTimerList[i].differenceHrs.minutes());
          
      }

      for(var i in this.checkerTimerList)
      {
        // this.StartedTime = this.checkerTimerList[i].StartTime;
        // this.EndedTime = this.checkerTimerList[i].EndTime
        this.StartedTime = this.checkerTimerList[i].StartTime ? moment(this.checkerTimerList[i].StartTime).format('HH:mm:ss') : null
        this.EndedTime = this.checkerTimerList[i].EndTime ? moment(this.checkerTimerList[i].EndTime).format('HH:mm:ss') : null
        
          var startTime = moment(this.StartedTime, "HH:mm:ss a"),          
          endTime = moment(this.EndedTime, "HH:mm:ss a");
          this.checkerTimerList[i].differenceHrs = moment.duration(endTime.diff(startTime));   
          if(this.checkerTimerList[i].differenceHrs == 'NaNNaN')
          {
            this.checkerTimerList[i].differenceHrs = '-';
          }
          // alert(this.checkerTimerList[i].differenceHrs.hours() + "hours" + ":" + this.checkerTimerList[i].differenceHrs.minutes() + "min" + ":"  + this.checkerTimerList[i].differenceHrs.seconds() + "sec")
           console.log([this.checkerTimerList[i].differenceHrs.hours(), this.checkerTimerList[i].differenceHrs.minutes(), this.checkerTimerList[i].differenceHrs.seconds()].join(':'));
          console.log('dif in Mins: ', (this.checkerTimerList[i].differenceHrs.hours() * 60) + this.checkerTimerList[i].differenceHrs.minutes());
         
      }
      
    })
    this.pickerservice.GetAllWarehouse().subscribe(x => {
      this.warehouseList = x;
      for (var i in this.warehouseList) {
        if (d.WarehouseId == this.warehouseList[i].WarehouseId) {
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
    this.isDetails = true;
    this.data = this.selectedRowDetails.orderPickerDetails;
    // 
    // for (var i in this.data) {
    //   // if (this.data[i].Qty >= this.data[i].DispatchedQty) {
    //     this.datalist.push(this.data[i]);
    //     for(var i in this.datalist)
    //     {
    //       if(this.datalist[i].IsFreeItem == 'Free')
    //       {
    //         this.datalist[i].IsFreeItem = 'Free';
    //       }
    //       else if(this.datalist[i].IsFreeItem == 'Not Free'){
    //         this.datalist[i].IsFreeItem = 'Not Free';
    //       }
    //       if(this.datalist[i].IsFreeItem == true)
    //       {
    //         this.datalist[i].IsFreeItem = 'Free';
    //       }
    //       else if(this.datalist[i].IsFreeItem == false){
    //         this.datalist[i].IsFreeItem = 'Not Free';
    //       }
          
    //       if(this.datalist[i].Status == 0)
    //       {
    //         this.datalist[i].Status = 'No Action';
    //         // this.CancelBtn = true;
    //       }
    //       else if(this.datalist[i].Status == 1)
    //       {
    //         this.datalist[i].Status = 'Picker Accept';
    //       }
    //       else if(this.datalist[i].Status == 2)
    //       {
    //         this.datalist[i].Status = 'Approver Approved';
    //       }
    //       else if(this.datalist[i].Status == 3)
    //       {
    //         this.datalist[i].Status = 'Picker Reject';
    //       }
    //       else if(this.datalist[i].Status == 4)
    //       {
    //         this.datalist[i].Status = 'Approver Reject ';
    //       }
    //     }
    //     console.log('dataaaaa:', this.datalist);
    //   // }
    // }
    this.pickerId = this.selectedRowDetails.Id;
    this.Isdispatch = this.selectedRowDetails.IsDispatched;
    this.Iscomplete = this.selectedRowDetails.IsComplted;
    this.IsApproved = this.selectedRowDetails.IsApproved;
    this.StartTime = this.selectedRowDetails.StartTime;
    this.EndTime = this.selectedRowDetails.EndTime;
    this.Id = this.selectedRowDetails.Id;
    this.CreatedDate = this.selectedRowDetails.CreatedDate;
    this.CreatedBy = this.selectedRowDetails.CreatedBy;
    this.DisplayName = this.selectedRowDetails.PickerPersonName;
   
    if (this.StartTime != null && this.EndTime != null && this.Isdispatch == true && this.Iscomplete == true) {
      d.status = 'Ready To dispatched';
      console.log('status:', status);
    }
    if (this.StartTime != null && this.EndTime != null && this.Isdispatch == false && this.Iscomplete == true) {
      d.status = 'Completed not dispatched';
      console.log('status:', status);
    }
    this.isOpenPopupPayments = true;
    this.Data = true;
    this.pickerservice.getPickerOrderdetails(d.Id).subscribe(x => {
    this.pickerOrderList=x;
    });
    
    this.blocked=true;
    if(this.dboyMobile !=undefined){
      this.pickerservice.GetRedispatchorders(this.dboyMobile).subscribe(y => {
        
        this.RedispatchorderList=y;
        this.blocked=false;
        });
    }


  }

  getData(ir) {
    
    ir.IsSelected = !ir.IsSelected;
    if (ir.IsSelected) {
      this.OrderidRedispached.push(ir.OrderId);
      this.isSelectedIds.push(ir.IsSelected);
    }
    else {
      let index = this.OrderidRedispached.indexOf(ir.OrderId);
      if (index >= 0) {
        this.OrderidRedispached.splice(index, 1);

        this.itemList.forEach(element => {
          this.itemList.splice(index, 1);
        });
      }
    }
 

  }




  openHistory(d,e)
  {
    // 
    this.historyDetail = d;
    this.HistoryView = true;
    this.isDetails = true;
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

  print()
  {
    // 
    this.historyHide = true;
  }

  readyTodispatch(Id, PeopleID, AgentId,pickerOrderList) {
    
    this.orderIds = [];
    this.errorlist=[];

    if (AgentId != null && PeopleID != null && AgentId != '' && PeopleID != '') {
      this.isInvalid = false;
      if (pickerOrderList != null) {
        for (var i in pickerOrderList) {
          if (!pickerOrderList[i].IsGenerateIRN) {
            if (pickerOrderList[i].EwayBillNumber == null && pickerOrderList[i].GrossAmount >= 50000) {
              this.errorlist.push("Awaiting for EwayBillNumber this :" + pickerOrderList[i].OrderId);

            } else if (pickerOrderList[i].OrderType == 4 && pickerOrderList[i].IsNotCreateAssingment == true) {
              this.errorlist.push("Awaiting for Remainning Amount For RDS Customer this :" + pickerOrderList[i].OrderId);
              //this.messageService.add({ severity:'error' , summary: 'Awaiting for Remainning Amount For RDS Customer this :'+ this.errorlist, detail: '' });
            }
          } else if (pickerOrderList[i].IsGenerateIRN) {
            if (pickerOrderList[i].IRNNo==null || pickerOrderList[i].IRNNo==undefined ||  pickerOrderList[i].IRNNo=='') {
              this.errorlist.push("Awaiting for IRN Number Generation this :" + pickerOrderList[i].OrderId);

            } else if (pickerOrderList[i].EwayBillNumber == null && pickerOrderList[i].GrossAmount >= 50000) {
              this.errorlist.push("Awaiting for EwayBillNumber this :" + pickerOrderList[i].OrderId);
              //this.messageService.add({ severity:'error' , summary: 'Awaiting for Remainning Amount For RDS Customer this :'+ this.errorlist, detail: '' });
            }
            else if(pickerOrderList[i].OrderType == 4 && pickerOrderList[i].IsNotCreateAssingment == true){
              this.errorlist.push("Awaiting for Remainning Amount For RDS Customer this :" + pickerOrderList[i].OrderId);
            }
          }
        }        
      }
      if(this.errorlist.length>0){       
          this.messageService.add({ severity: 'error', summary: '' + this.errorlist, detail: '' });     
        return;
        this.removeMessage();
      }
      
      
  this.confirmationService.confirm({
    message: 'Are you sure that you are Ready to Dispatch?   क्या आप सुनिश्चित हैं कि आप डिस्पैच के लिए तैयार हैं?',
    accept: () => {
      // if (data) {
      //   for (var i in data) {
      //     this.orderIds.push(data[i].OrderId);
      //   }
      // }
      this.pickerRTDOrderDC =
      {
        PickerId: Id,
        Message: '',
        OrderIds: this.orderIds,
        DeliveryBoyId: PeopleID,
        AgentId: AgentId,
        OrderidRedispachedOrder:this.OrderidRedispached,
      }
      
      this.pickerservice.PickerRTDOrderProcess(this.pickerRTDOrderDC).subscribe(y => {
        console.log('result RtD :', y);
        if(y.Status == true)
        {
          this.messageService.add({ severity: 'success', summary: y.Message, detail: '' });
        }
        else{
          this.messageService.add({ severity: 'info', summary: y, detail: y.Message });
        }
        
        this.isOpenPopupPayments = false
        this.RTD = false;
        this.Data = true;
        this.IsSelectOrder.IsApproved == false;
        this.RTD = false;

        
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        
      })
      this.isOpenPopupPayments = false
      // this.pickerservice.GetApprovedList(ClusterId).subscribe(y => {
      //   
      //   this.pickerList = y;
      // });
      this.IsSelectOrder.IsApproved == false;
      this.RTD = false;
      this.Data = true;
      // window.location.reload();
      this.IsSelectOrder.IsApproved == false;
      this.RTD = false;
    }

  });

    
    }
    else {
      if (AgentId == null || AgentId == '') {
        this.isInvalid = true;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Agent is Mandatory' });
      }
      else if (PeopleID == null || PeopleID == '') {
        this.isInvalid = true;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Delivery Boy is Mandatory' });
      }


    }
  }

  getDboyList(WarehouseId) {
    this.pickerservice.WarehousebasedDeliveryBoyRole(WarehouseId).subscribe(y => {  
       
      this.dboyList  = y;
      var dboy =this.dboyList.filter(x=>x.PeopleID==this.DboyId);
      this.dboyList = dboy;
      // 
      // for (var i in dboy) {
      //   this.dboyMobile = dboy[i].Mobile;
      // }
    });
    this.pickerservice.salesagent(WarehouseId).subscribe(y => {
      this.agentList = y;
    })
    if (this.dboyList != null && this.agentList != null) {
      this.IsExtension = true;
    }

  }

  getList(agentId) {
    for (var i in this.agentList) {
      if (agentId == this.agentList[i].PeopleID) {
        this.mobile = this.agentList[i].Mobile;
      }
    }
    if (this.dboyList != null && this.agentList != null) {
      this.IsExtension = true;
    }
  }
  removeMessage() {
    setTimeout(() => {
      this.messageService.clear();
    }, 2500);
  }

  SendForApproval(ir) {
    
    this.hide=true;
    var dataToPost = {
      OrderId: ir.OrderId,
      Redispatchcount: ir.ReDispatchCount
    };
    this.pickerservice.sendapproval(dataToPost).subscribe(y => {
      var data = y;
      if (data != null) {
        this.messageService.add({ severity: 'success', summary: 'Successfully Send for approval', detail: 'Successfully Send for approval' });
      }
    })
  }
  Details(ir){
    
    this.poPopup=true;
    this.orderdetails=ir.orderDetails;
  
  }
}

