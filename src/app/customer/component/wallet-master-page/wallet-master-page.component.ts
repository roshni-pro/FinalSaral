import { Component, OnInit } from '@angular/core';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WalletService } from 'app/shared/services/wallet.service';

@Component({
  selector: 'app-wallet-master-page',
  templateUrl: './wallet-master-page.component.html',
  styleUrls: ['./wallet-master-page.component.scss']
})
export class WalletMasterPageComponent implements OnInit {
  selectedWarehouseId: any;
  searchdata: any;
  walletList: any;
  columnList: any[];
  warehouseList: any;
  isOpenPopup: boolean;
  isEditWalletPopup: boolean;
  cash: any;
  saveData: any;
  Manualwalletdropdown: any;
  IsComment: boolean = false;
  IsHistoryPopup: boolean = false;
  OldStockData: any[];
  ItemPerPage: any;
  PageNo: any;
  totalRecords: number;
  CustId: number;
  keyword: any;
  UserRole: any;
  IsShow: boolean = false;
  blocked: boolean;
  WalletExpData: any[];
  first: number = 0
  GetWalletList:any
  constructor(private _service: WalletService, private exportService: ExportServiceService) {
    this.searchdata = {},
      this.cash = {},
      this.saveData = {}
  }

  ngOnInit() {
    this.columnList = [
      { field: 'CustomerId', header: 'CustomerId' },
      { field: 'City', header: 'City' },
      { field: 'WarehouseName', header: 'WarehouseName' },
      { field: 'Skcode', header: 'SKCode' },
      { field: 'ShopName', header: 'ShopName' },
      { field: 'TotalAmount', header: 'TotalAmount' },
      // { field: 'CreatedDate', header: 'CreateDate' }
    ]
    this._service.getWarehouse().subscribe(res => {
      this.warehouseList = res;
    })
    this._service.GetManualName().subscribe(res => {
      this.Manualwalletdropdown = res;
      console.log(res)
    })
    this.UserRole = localStorage.getItem('role')
    var RoleList = this.UserRole.split(',');
    for (var i in RoleList) {
      if (RoleList[i] == 'HQ Master login' || RoleList[i] == 'HQ CS LEAD') {
        this.IsShow = true;
      }
      else {
        this.IsShow = false;
      }
    }
    console.log('RoleList', RoleList);
    //this.IsShow = (this.UserRole.rolenames.indexOf('HQ Master login') > -1 || this.UserRole.rolenames.indexOf('HQ CS LEAD') > -1) == true ? true : false
  }
  load_wallet(event) {
    this.first = event.first;
    this.blocked = true;
    var Last = event.first ? event.first + event.rows : 20
    this.ItemPerPage = event.rows
    this.PageNo = Last / event.rows
    if (this.searchdata.startDate == undefined && this.searchdata.endDate == undefined && this.selectedWarehouseId == undefined) {
      this.searchdata.startDate = null;
      this.searchdata.endDate = null;
      this.selectedWarehouseId = 0;
    }
    this._service.GetWalletList(this.searchdata.startDate, this.searchdata.endDate, this.selectedWarehouseId, this.PageNo, this.ItemPerPage).subscribe(res => {
      this.walletList = res.walletdata;
      this.totalRecords = res.TotalCount;
      this.blocked = false;
    })
  }


  async  search() {
    this.PageNo=1
    if (this.selectedWarehouseId == 0 || this.selectedWarehouseId == undefined) {
      alert("Select Warehouse");
      return;
    }
    if (this.searchdata.startDate == null || this.searchdata.startDate == undefined) {
      alert("Please Select Start Date");
      return;
    }
    if (this.searchdata.endDate == null || this.searchdata.endDate == undefined) {
      alert("Please Select End Date");
      return;
    }
    this.first = 0
    this.totalRecords = 0
    this.blocked = true;
    this.isShow=true
    this.GetWalletList = await 
    this._service.GetWalletList(this.searchdata.startDate, this.searchdata.endDate, this.selectedWarehouseId, this.PageNo, this.ItemPerPage).toPromise();
  

      this.walletList = this.GetWalletList.walletdata;
      this.totalRecords = this.GetWalletList.TotalCount;
      this.blocked = false;
      console.log("this.walletList,totalRecords",this.walletList,this.totalRecords);


  }
  SearchByKey(key) {
    debugger
    this.IsComment=false
    if (key == "" || key == undefined) {
      alert("Enter Keyword");
      return;
    }
    this.blocked = true;
    this.first = 0
    this.totalRecords = 0
    this._service.GlobalSearch(key).subscribe(res => {
      console.log(res);
      
      if (res.walletdata.length > 0) {
        this.walletList = res.walletdata;
        this.blocked = false;
      }
      else {
        alert("No Record");
        this.blocked = false;
      }
    })

  }
  Clear() {
    this.first = 0
    this.searchdata = {};
    this.selectedWarehouseId = 0;
    this.ItemPerPage = 20
    this.PageNo = 1
    this._service.GetWalletList(this.searchdata.startDate, this.searchdata.endDate, this.selectedWarehouseId, this.PageNo, this.ItemPerPage).subscribe(res => {
      this.walletList = res.walletdata;
      this.totalRecords = res.TotalCount;
      this.blocked = false;
    })
  }
  AddcashData() {
    if (this.cash.point == null || this.cash.rupee == null) {
      alert('Insert parameter');
      return false;
    }
    var dataToPost = {
      Id: this.cash.Id,
      point: this.cash.point,
      rupee: this.cash.rupee
    }
    this._service.AddCashConversion(dataToPost).subscribe(res => {
      if (res != null && res != "null") {
        alert("margin point Added Successfully... :-)");
        this.isOpenPopup = false;
        this.cash = {};
      }
      else {
        alert("got some error... :-)");
        this.isOpenPopup = false;
        this.cash = {};
      }
    })
  }
  cancel() {
    this.isOpenPopup = false;
  }
  RowEdit(item) {
    this.saveData = item;
    this.isEditWalletPopup = true;
  }
  cancel_2() {
    this.saveData = {};
    this.isEditWalletPopup = false;
  }
  onchange(data) {
    if (data == "Special") {
      this.IsComment = true;
    }
    else {
      this.IsComment = false;
    }
  }
  showSave:boolean=true
  AddWallet() {
     if (this.saveData.CreditAmount == undefined || this.saveData.CreditAmount == null) {
      alert("Insert Add Wallet Amount");
      return false;
    }
    if (this.saveData.Through == undefined || this.saveData.Through == null) {
      alert("Select Wallet Name");
     
      return false;
    }

    console.log(this.saveData.Comment);

    if(this.saveData.Through=='Special' && (this.saveData.Comment==null || this.saveData.Comment==''))
    {
      alert("Please add comment")
      return false
    }

    var dataToPost = {
      CustomerId: this.saveData.CustomerId,
      CreditAmount: this.saveData.CreditAmount,
      Through: this.saveData.Through,
      Comment: this.saveData.Comment,
    }
    this._service.AddWallet(dataToPost).subscribe(res => {
      console.log(res);
    
    if (res != null && res != "null") {
      
        alert("Wallet Amount Added Successfully... :-)");
        window.location.reload();
        this.isEditWalletPopup = false;
      }
      else {
      
        alert("got some error... :-)");
        this.isEditWalletPopup = false;
      }
      
    })
 
  }
  History(item) {

    this.CustId = item.CustomerId;
    this._service.history(this.CustId, 10, 1).subscribe(res => {
      if (res.ordermaster.length > 0) {
        this.OldStockData = res.ordermaster;
        this.totalRecords = res.total_count;
        this.IsHistoryPopup = true;
      }
      else {
        alert("No Record");
      }
    })
  }
  load(event) {
    var Last = event.first ? event.first + event.rows : 10
    this.ItemPerPage = event.rows
    this.PageNo = Last / event.rows
    this.blocked = true;
    this._service.history(this.CustId, this.ItemPerPage, this.PageNo).subscribe(res => {
      this.OldStockData = res.ordermaster;
      this.totalRecords = res.total_count;
      this.blocked = false;
    })
  }
  HistoryExportData() {
    this._service.HistoryExportData(this.CustId).subscribe(res => {
      let HistoryWalletExpData = res.map(function (obj) {
        return {
          TotalWalletAmount: obj.TotalWalletAmount,
          NewAddedWAmount: obj.NewAddedWAmount,
          NewOutWAmount: obj.NewOutWAmount,
          Through: obj.Through,
          CreatedDate: obj.CreatedDate,
          OrderId: obj.OrderId,
          PeopleName: obj.PeopleName
        }
      });
      if (HistoryWalletExpData.length > 0) {
        this.exportService.exportAsExcelFile(HistoryWalletExpData, 'HistoryWalletData');
      }
    })
  }
  walletListExport: any[] = []
  isShow:boolean=false
  WalletExportData() {
    debugger
    // if (this.selectedWarehouseId == 0 || this.selectedWarehouseId == undefined) {
    //   alert("Select Warehouse");
    //   return;
    // }
    // if (this.searchdata.startDate == null && this.searchdata.startDate == undefined) {
    //   alert("Please select Start Date")
    //   return
    // }
    // else if (this.searchdata.endDate == null && this.searchdata.endDate == undefined) {
    //   alert("please select End Date")
    //   return
    // }
    this.first = 0
    this.totalRecords = 0;
   
    this._service.GetWalletList(this.searchdata.startDate, this.searchdata.endDate, this.selectedWarehouseId, 0, 0).subscribe(res => {
      this.walletList = res.walletdata;
      this.totalRecords = res.TotalCount;
      console.log(this.totalRecords);

      this.blocked = false;

      console.log(this.walletList, "walletListExport");
      if (this.walletList.length > 0) {
        // this.exportService.exportAsExcelFile(WalletExpData, 'WalletData');
        this.exportService.exportAsExcelFile(this.walletList, 'WalletData');

      }
      else
      {
        alert("Data not found")
        this.isShow=false
      }
  
    })

    // let WalletExpData = this.walletListExport.map(function (obj) {
    //   return {
    //     CustomerId: obj.CustomerId,
    //     Skcode: obj.Skcode,
    //     City: obj.City,
    //     WarehouseName: obj.WarehouseName,
    //     CreatedDate: obj.CreatedDate,
    //     TransactionDate: obj.TransactionDate,
    //     UpdatedDate: obj.UpdatedDate,
    //     ShopName: obj.ShopName,
    //     TotalAmount: obj.TotalAmount
    //   }
    // });
    // console.log(this.walletListExport,"walletListExport");
    // if (this.walletListExport.length > 0) {
    //   // this.exportService.exportAsExcelFile(WalletExpData, 'WalletData');
    //  this.exportService.exportAsExcelFile(this.walletListExport, 'WalletData');

    // }



  }
  Close() {
    this.IsHistoryPopup = false;
  }
  GlobalClear() {
    this.keyword = null;
  }
}
