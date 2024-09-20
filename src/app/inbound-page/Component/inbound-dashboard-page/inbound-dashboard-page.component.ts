import { Component, OnInit } from '@angular/core';
import { Console, log } from 'console';
import { InboundService } from 'app/inbound-page/services/inbound.service';
import { MessageService } from 'primeng/api';
import { AnyPtrRecord } from 'dns';
import * as moment from 'moment';

@Component({
  selector: 'app-inbound-dashboard-page',
  templateUrl: './inbound-dashboard-page.component.html',
  styleUrls: ['./inbound-dashboard-page.component.scss']
})
export class InboundDashboardPageComponent implements OnInit {

  constructor(private InboundService: InboundService, private messageService: MessageService) { }

  sectionList: any[] = [
    {
      'value': 1,
      'name': 'Dashboard'
    }
    ,
    {
      'value': 2,
      'name': 'Inventory'
    },
    {
      'value': 3,
      'name': 'Shelf Life'
    },
    {
      'value': 4,
      'name': 'Damage'
    },
    {
      'value': 5,
      'name': 'NonSellable'
    },
    {
      'value': 6,
      'name': 'Clearance'
    }
  ]
  selectedSection: any
  blocked: boolean = false
  totalCurrentCount:number=0
  first: number = 0;
  totalCurrentAmount:number=0
  totalSelllableCount:number=0
  totalSelllableAmount:number=0
  totalSelllablepercent:number=0
  totalCurrentpercent:number=0
  totalNetCount:number=0
  totalcountOfDamage:number
  totalAmountDamage:number
  totalperDamage:number
  warehouseids: any[] = []
  storeIdss: any[] = []
  totalNetPercOfStock:number=0
  totalNetAmount:number=0
  showDashBoard: boolean = false
  startDate: any
  endDate: any
  clearnceData: any
  totalClearCount:number
  totalClearAmount:number
  totalClearPercent:number
  showInventory: boolean = false
  selectedStore: any
  selectedwarehouse: any
  selectedDateDashBoard: any
  showStockAging: boolean = false
  showDamage: boolean = false
  warehouseIdarr: any[] = []
  dashBoardList: any[] = []
  netInventory: any[] = []
  stockAgingList: any[] = []
  warehouseList: any[] = []
  storeList: any[] = []
  display: boolean = false
  nonSellableData: any
  selectedwarehousePop: any
  displayInventoryExport: boolean = false
  displayDamageExport: boolean = false
  showNonSellable: boolean = false
  showClearance: boolean = false
  inboundHeads: any[]
  damageData: any
  currentInventory: any
  warehouseHeading: any = null
  getRoleData: any
  regionInboundLead: any
  totalCountshelf:number=0
  totalAmountshelf:number=0
  totalPercentShelf:number=0
  TdStockIn: any
  MTDStockIn: any
  inboundDashBoardData: any[]
  TdStockOut: any
  MTDStockOut: any
  TdDamage: any
  MTDDamage: any
  TdExpiry: any
  MTDExpiry: any
  hqMasterRole: any
  ngOnInit() {
    this.getRoleData = (localStorage.getItem('role')).split(',');
    var regionInboundLead = 'Regional Inbound Lead';
    var HQMaster = 'HQ Master login';
    this.regionInboundLead = this.getRoleData.find(x => x == regionInboundLead)
    this.hqMasterRole = this.getRoleData.find(x => x == HQMaster)
    this.getWareHouseList()
    this.getStoreList()
    // this.showDashBoard = true
    this.selectedSection =
    {
      'value': 1,
      'name': 'Dashboard'
    }
    this.showDamage = false
    this.showClearance = false
    // this.showDashBoard = true
    this.showNonSellable = false
    this.showStockAging = false
   
    this.getDashBoardHeadingData()
  }
  showDialog() {
    this.display = true
  }
  getWareHouseList() {
    
    this.InboundService.getWarehouseList().subscribe(res => {

      this.warehouseList = res
     
    })
  }
  getStoreList() {
    
    this.InboundService.StoreList().subscribe(res => {
      this.storeList = res
    
    })
  }
  getStockAging(payload) {
    debugger
    this.totalCountshelf=0
    this.totalAmountshelf=0
    this.totalPercentShelf=0
    this.blocked = true
    this.InboundService.getStockAging(payload).subscribe(res => {
      this.stockAgingList = res
      this.showStockAging=true
      console.log(this.stockAgingList,"stockagingList");
      this.blocked = false
      this.stockAgingList.forEach(x=>
        {
          this.totalCountshelf=this.totalCountshelf+x.CountOfItem
          this.totalAmountshelf=this.totalAmountshelf+x.Amount
          this.totalPercentShelf=this.totalPercentShelf+x.PerOfStock
        })
    })
  }

  getDashBoardHeadingData() {
    this.warehouseids=[]
    this.storeIdss=[] 
    console.log(this.selectedwarehouse, "warehouse");
    if (this.selectedwarehouse != undefined) {
      this.warehouseids.push(this.selectedwarehouse.WarehouseId)
    }
    else {
      this.warehouseids = []
    }
    if (this.selectedStore == undefined) {
      this.storeIdss = []
    }
    else {
      this.selectedStore.forEach(x => {
        console.log(x.Id);
        this.storeIdss.push(x.Id)
      })
    }
    var date = new Date();
    var dateNew = date ? moment(date).format('YYYY-MM-DD') : null
    console.log(date, "Date");

    const DashBoardPayload =
    {
      'WhId': this.warehouseids,
      'StoreId': this.storeIdss,
      'SearchDate': date
    }
    this.blocked = true
    this.InboundService.getDashBoardHeading(DashBoardPayload).subscribe(res => {
      this.inboundHeads = res
      this.showDashBoard = true
      this.blocked = false
      console.log(this.inboundHeads, "inboundHeads");
      this.inboundDashBoardData = res.inboundDashboardTableDC
      console.log(this.inboundDashBoardData, "inboundDashBoardData");
      this.TdStockIn = res.TdStockIn
      this.MTDStockIn = res.MtdStockIn
      this.TdStockOut = res.TdStockOut
      this.MTDStockOut = res.MtdStockOut
      this.TdDamage = res.TdDamage
      this.MTDDamage = res.MtdDamage
      this.TdExpiry = res.TdExpiy
      this.MTDExpiry = res.MtdExpiy
    })
  }
  getNetInventoryData(payload) {
    debugger
    this.totalCurrentCount=0
    this.totalCurrentAmount=0
    this.totalCurrentpercent=0
    this.totalNetCount=0
    this.totalNetAmount=0
    this.totalNetPercOfStock=0
    this.blocked = true
    this.InboundService.getNetInventoryData(payload).subscribe(res => {
      this.netInventory = res
      console.log(this.netInventory,"netInventory");
      
      this.first=1
      this.showInventory=true
      this.netInventory.forEach(x=>{
        this.totalCurrentCount=this.totalCurrentCount+x.CurrentInvCountOfItem
        this.totalCurrentAmount=this.totalCurrentAmount+x.CurrentInvAmount
        this.totalCurrentpercent=this.totalCurrentpercent+x.PerOfCurrentStock
        this.totalNetCount=this.totalNetCount+x.NetInvCountOfItem
        this.totalNetAmount=this.totalNetAmount+x.NetAmount
        this.totalNetPercOfStock=this.totalNetPercOfStock+x.NetAmountDDPer   
      }    
      )
      this.blocked = false
    })
  }
  getDamageData(payload) {
    this.damageData=[]
    this.totalcountOfDamage=0
    this.totalperDamage=0
    this.totalAmountDamage=0
    this.blocked = true
    this.InboundService.getDamageData(payload).subscribe(res => {
      this.showDamage = true;
      this.first = 0;
      this.damageData = res
      console.log(this.damageData,"DamageData")
      this.blocked = false
      this.damageData.forEach(x=>
        {
          this.totalcountOfDamage=this.totalcountOfDamage+x.countofitems
          this.totalAmountDamage=this.totalAmountDamage+x.Amount
          this.totalperDamage=this.totalperDamage+x.perofDamage
        })
    })
  }
  getNonSellableData(payload1) {
    this.totalSelllablepercent=0
    this.totalSelllableAmount=0
    this.totalSelllableCount=0
    this.blocked = true
    this.InboundService.getNonSellableData(payload1).subscribe(res => {
      this.nonSellableData = res
      this.showNonSellable = true
      
      this.blocked = false
      this.nonSellableData.forEach(x=>
        {
          this.totalSelllableCount=this.totalSelllableCount+x.CountOfItems
          this.totalSelllableAmount=this.totalSelllableAmount+x.Amount
          this.totalSelllablepercent=this.totalSelllablepercent+x.perofNonSellable
        })
    })
  }

  getClearanceData(payload) {
  this.totalClearCount=0
  this.totalClearAmount=0
  this.totalClearPercent=0
    this.blocked = true
    this.InboundService.getClearanceData(payload).subscribe(res => {
      this.clearnceData = res
      this.showClearance = true
      this.blocked = false
      this.clearnceData.forEach(x=>
        {
          this.totalClearCount=this.totalClearCount+x.CountOfItem
          this.totalClearAmount=this.totalClearAmount+x.Amount
          this.totalClearPercent=this.totalClearPercent+x.perofClearance
        })
    })
  }

  showInventoryPop() {
    this.displayInventoryExport = true

  }
  displayStockAgingExport: boolean = false
  showStockAgingPop() {
    this.displayStockAgingExport = true
  }

  showDamagePop() {
    this.displayDamageExport = true
  }
  reset() {

    this.selectedStore = null
    this.selectedwarehouse = null
    this.selectedSection = null
  }
  StoreIdds: any[] = []
  searchInboundData() {
    debugger
    this.warehouseids = []
    this.storeIdss = []
    var date = new Date();
    console.log(date);
    
    var dateNew = date ? moment(date).format('YYYY-MM-DD') : null
    if (this.selectedSection == null) {
      alert("Please Select Section")
      return false;
    }
    if (this.selectedwarehouse == null) {
      alert("Please Select Warehouse")
      return false;
    }
    if (this.selectedStore == null) {
      alert("Please Select Store")
      return false
    }
    if (this.selectedwarehouse != undefined) {
      this.warehouseids.push(this.selectedwarehouse.WarehouseId)
    }
    else {
      this.warehouseids = []
    }
    if (this.selectedStore == undefined) {
      this.storeIdss = []
    }
    else {
      this.selectedStore.forEach(x => {
        console.log(x.Id);
        this.storeIdss.push(x.Id)
      })
    }
    if(this.storeIdss.length==0)
    {
      alert("Please Select Store")
      return false
    }
    const payload =
    {
      'warehouseid': this.warehouseids,
      'storeids': this.storeIdss,
      'SearchDate':date
    }
    if (this.selectedSection.value == 1) {
      this.showDamage = false
      this.showClearance = false
      this.showNonSellable = false
      this.showInventory=false
      this.showStockAging = false
      this.getDashBoardHeadingData()
    }
    if(this.selectedSection.value==2)
    {
     
      this.showDamage = false
      this.showClearance = false
      this.showDashBoard = false
      this.showNonSellable = false
      this.showStockAging = false
      this.getNetInventoryData(payload)
    }
    if (this.selectedSection.value == 3) {
    
     this.showDamage = false
     this.showClearance = false
     this.showDashBoard = false
     this.showInventory=false
     this.showNonSellable = false
     this.getStockAging(payload)
    }
    if (this.selectedSection.value == 4) {
      
      this.showClearance = false
      this.showDashBoard = false
      this.showInventory=false
      this.showNonSellable = false
      this.showStockAging = false
      this.getDamageData(payload)
    }
    if (this.selectedSection.value == 5) {
     
      this.showDamage = false
      this.showClearance = false
      this.showInventory=false
      this.showDashBoard = false
      this.showStockAging = false
      this.getNonSellableData(payload)
    }
    if (this.selectedSection.value == 6) {
   
      this.showDamage = false
      this.showDashBoard = false
      this.showInventory=false
      this.showNonSellable = false
      this.showStockAging = false
      this.getClearanceData(payload)
    
  }
  }

  ExportDashboardPopUp() {
    console.log(this.selectedDateDashBoard, "warehousePop")
    this.startDate = this.selectedDateDashBoard[0]
    this.endDate = this.selectedDateDashBoard[1]
    var date1 = new Date(this.startDate);
    var date2 = new Date(this.endDate);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    console.log(Difference_In_Days, "Difference_In_Days")
    if (Difference_In_Days > 90) {
      alert("Cannot Export More than 3 months")
      return false;
    }
  }

  showSuccess(msg) {
    this.messageService.add({ severity: 'success', summary: msg, detail: 'Via MessageService' });
  }
  showError(msg) {
    this.messageService.add({ severity: 'error', summary: msg, detail: 'Message Content' });
  }
}
