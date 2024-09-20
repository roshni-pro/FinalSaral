
import { ItemService } from 'app/shared/services/item.service';
import { ItemMasterService } from 'app/shared/services/item-master.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { InternaltransfersService } from './../../Services/internaltransfers.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-internaltransfer',
  templateUrl: './internaltransfer.component.html',
  styleUrls: ['./internaltransfer.component.scss']
})
export class InternaltransferComponent implements OnInit {

  //@ViewChild("dt", { static: true }) dt: Table;
  MainTransferList = [];
  checkerListMaster = [];
  @ViewChild("dt", { static: false }) public dt: Table;
  displayct = 0;
  blocked = true;
  specifics = false;
  agentPaymentSettlementList = [];
  totalRecords = 0;
  filterBy = '';
  searchFilterValue = '';
  peopleList = [];
  keepLoading = true;
  displayError = '';
  globalsearchval = '';
  displaypopup = false;
  internalTransferRequest: any;
  TransferOrderDetails: any[];
  TransferOrderData: any;
  cols = [
    //    { field: 'CityId', header: ' CityId' },

    { field: 'WarehouseName', header: 'Warehouse Name' },
    //  { field: 'ItemNumber', header: 'ItemNumber' },
    { field: 'Itemname', header: 'Item Name' },
    { field: 'ItemNumber', header: 'Item No' },

    // { field: 'WarehouseId', header: 'WarehouseId' },
    //{ field: 'ItemMultipMrpId', header: ' ItemMultipMrpId' },
    { field: 'Requiredqty', header: 'Required Quantity' },
    // { field: 'Availableqty', header: 'Available Quantity' },
    //  { field: 'OtherWarehouseid', header: 'OtherWarehouseid' },
    { field: 'OtherWarehouseName', header: 'Other Warehouse Name' },

    { field: 'OtherWarehouseRemainingqty', header: 'Other Warehouse Remaining Qty' },

  ];
  selectedWarehouses = null;
  warehouseList = [];
  internaltransferlist = [];
  immutabletransferlist: any = [];
  page: { skip: any; take: any; };
  items: any[];
  savedata: any;
  transferList: any;
  editMode: boolean;
  editCancel: boolean;
  RequiredQty: any;
  // EditableRequiredQty : boolean;
  totalMRP: any;
  Total: any;
  settotal: number;
  add: boolean;
  MasterTransferList: any;
  invalid: boolean;
  exceededList: any;

  constructor(private internaltransferservice: InternaltransfersService,
    private messageService: MessageService,
    private ItemService: ItemService,
    private ItemMasterService: ItemMasterService,
    private router: Router, private r: ActivatedRoute,
    private warehouseService: WarehouseService,
    private confirmationService: ConfirmationService
  ) {
    this.transferList = [];
  }

  ngOnInit() {
    //this.getAllItems();
    this.editMode = false;
    this.editCancel = false;
    // this.EditableRequiredQty = false;
    this.getAllWarehouses();
    this.TransferOrderDetails = new Array();
    this.immutabletransferlist = new Array();
    this.internaltransferlist = new Array();
    this.MainTransferList = new Array();
    //this.getagentPaymentSettlementList();
  }

  getAllWarehouses() {
    this.warehouseService.GetWarehouses()
      .subscribe(result => {
        this.blocked = false
        this.warehouseList = result;
      });
  }

  getAllItems() {
    this.ItemService.GetAll()
      .subscribe(result => {

        this.items = result;
      });
  }

  load(event) {

    this.Total = 0;
    this.blocked = true

    if (this.immutabletransferlist && this.immutabletransferlist.length) {
      this.page = { skip: event.first, take: event.rows };

      let whouseIdslist = []
      // this.selectedWarehouses.filter(function (v) {
      //   whouseIdslist.push(v.WarehouseId);
      // });

      // this.internaltransferservice.GetInternaltransferslist(this.selectedWarehouses)
      //   .subscribe(result => {
      //     
      //     this.immutabletransferlist = result;

      this.internaltransferlist = this.immutabletransferlist.filter(wh => this.immutabletransferlist.indexOf(wh) >= this.page.skip);
      this.internaltransferlist.splice(10, this.immutabletransferlist.length - 10);
      this.totalRecords = this.immutabletransferlist.length;

      for (var i in this.internaltransferlist) {
        this.internaltransferlist[i].totalMRP = this.internaltransferlist[i].Requiredqty * this.internaltransferlist[i].Price;
        console.log('totalMRP', this.internaltransferlist[i].totalMRP);
        // this.Total += this.internaltransferlist[i].totalMRP;
      }
      this.blocked = false;
      console.log('internaltransferlist', this.internaltransferlist);

      //});
    }
  }

  getInternalTransferList() {
    this.transferList = [];
    this.TransferOrderDetails = []
    if (this.specifics == true) {
      // this.dt.reset();
    }
    this.blocked = true

    this.page = { skip: 0, take: 10 };

    let whouseIdslist = []
    // this.selectedWarehouses.filter(function (v) {
    //   whouseIdslist.push(v.WarehouseId);
    // });

    this.Total = 0;
    this.internaltransferservice.GetInternaltransferslist(this.selectedWarehouses)
      .subscribe(result => {

        if (result.length) {
          this.specifics = true;
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'No Items Found!', detail: '' });

        }
        this.checkerListMaster = result
        this.immutabletransferlist = result;
        this.MainTransferList = new Array(result);
        this.MasterTransferList = result;
        this.internaltransferlist = this.MasterTransferList.filter(wh => this.MasterTransferList.indexOf(wh) >= this.page.skip);
        this.internaltransferlist.splice(10, this.internaltransferlist.length - 10);


        this.totalRecords = this.MasterTransferList.length;
        for (var i in this.internaltransferlist) {
          this.internaltransferlist[i].totalMRP = this.internaltransferlist[i].Requiredqty * this.internaltransferlist[i].Price;
          console.log('totalMRP', this.internaltransferlist[i].totalMRP);
          // this.Total += this.internaltransferlist[i].totalMRP;
        }
        this.blocked = false;
        this.globalsearchval = '';
        this.globalsearch('');
      },
        err => {
        //   this.messageService.add({ severity: 'error', summary: 'Some Error has Occured' + '', detail: '' });
        // this.blocked = false;

        }
      );

  }

  globalsearch(textValue) {
    textValue = textValue.toLowerCase();
    let filteredList = [];

    filteredList = Object.assign([], this.MasterTransferList).filter(
      item =>
        item.WarehouseName.toLowerCase().indexOf(textValue.toLowerCase()) > -1
        || item.Itemname.toLowerCase().indexOf(textValue.toLowerCase()) > -1
        || item.ItemNumber.toLowerCase().indexOf(textValue.toLowerCase()) > -1
        || item.ItemMultipMrpId.toString().toLowerCase().indexOf(textValue.toLowerCase()) > -1
    );


    if (filteredList.length) {

      this.immutabletransferlist = filteredList;

    }
    else {
      if (textValue == '') {
        this.immutabletransferlist = this.MasterTransferList;
      }
      else {
        this.immutabletransferlist = [];
      }
    }

    this.internaltransferlist = this.immutabletransferlist.filter(wh => this.MasterTransferList.indexOf(wh) >= this.page.skip);
    this.internaltransferlist.splice(10, this.immutabletransferlist.length - 10);
    this.totalRecords = this.immutabletransferlist.length

  }

  navToPostOrders() {


    this.internaltransferservice.whList = this.warehouseList;
    this.router.navigate(["Addinternaltransferitem"], { relativeTo: this.r.parent });

  }

  isInternalTransferPost() {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
    this.blocked = true

        this.InternalTransferPost();
      }
    });
  }

  editData(rowData) {

    // rowData.IsSelected = false;
    let index = this.transferList.indexOf(rowData);
    // this.transferList.splice(index, 1);
    console.log('splice', this.transferList);

    // this.editMode = true;
    rowData.editMode = true;
    this.editCancel = true;
  }
  getData(rowData) {
    
    this.add = true;
    if (true) {
      // if (rowData.Requiredqty > this.RequiredQty) {
      //   // this.messageService.add({ severity: 'error', summary: 'Editable Required Quantity Should not be greater than RequiredQty:' + '' , detail: '' });
      //   // rowData.Requiredqty = this.RequiredQty;
      //   // this.editMode = false;
      //   // this.editCancel = false;
      //   return;
      // }
      if(rowData.Requiredqty > rowData.OtherWarehouseAvailableqty)
      {
        this.messageService.add({ severity: 'error', summary: 'Required Quantity Should be less than Other warehouse available quantity' });
        // rowData.Requiredqty = this.RequiredQty;
        //   this.editMode = false;
        // this.editCancel = false;
        return;
      }

      if (rowData.Requiredqty <= 0) {
        this.messageService.add({ severity: 'error', summary: 'Editable Required Quantity Should be greater than 0 or equal to Required Quamtity :' + '', detail: '' });
        // rowData.Requiredqty = this.RequiredQty;
        //   this.editMode = false;
        // this.editCancel = false;
        return;
      }
      else {
        rowData.IsSelected = !rowData.IsSelected;
        //   this.editMode = false;
        // this.editCancel = false;
        console.log('rowData is: ', rowData);
        if (rowData.IsSelected) {
          this.Total += rowData.totalMRP;
          this.transferList.push(rowData);
          // rowData.edit = true
          console.log('dssdds', this.transferList);
        } else {
          let index = this.transferList.indexOf(rowData);
          // rowData.edit = false;
          this.Total -= rowData.totalMRP;
          this.transferList.splice(index, 1);
          console.log('splice', this.transferList);
        }
      }
    }
    let totalAmount = 0;
    let exceededList = '';
    let exceedListwithObj = [];
    for (var i in this.transferList) {
      totalAmount += this.transferList[i].Requiredqty * this.transferList[i].Price;
      console.log('TotalAmt:', totalAmount);
      let netamtexceeded = 0;
      let list = this.transferList.filter(transferItem => this.transferList[i].OtherWarehouseid == transferItem.OtherWarehouseid);
      list.forEach(element => {
        netamtexceeded = netamtexceeded + (element.Requiredqty && element.Price ? element.Requiredqty * element.Price : 0);
        if (netamtexceeded > 90000) {

          let index = exceedListwithObj.findIndex(elem => elem.OtherWarehouseid == element.OtherWarehouseid)
          if (index == -1) {
            exceedListwithObj.push(element);
          }
          // exceededList = exceededList + element.OtherWarehouseName
        }
      });
    }

    exceedListwithObj.forEach(element => {

      exceededList = exceededList + ' , ' + element.OtherWarehouseName;
    });

    if (exceededList != '') {
      this.invalid = true;
      this.exceededList = exceededList;
      this.messageService.add({ severity: 'error', summary: 'Your Total Amount is greater than 90,000 in warehouses - ', detail: exceededList + '' });
    }
    else {
      this.invalid = false;
      this.exceededList = []
    }

  }

  InternalTransferPost() {

    var totalAmount = 0;
    for (var i in this.transferList) {
      totalAmount += this.transferList[i].Requiredqty * this.transferList[i].Price;
      console.log('TotalAmt:', totalAmount);
    }
    if (this.invalid == true) {
      this.messageService.add({ severity: 'error', summary: 'Your Amount is greater than 90,000 for ' + this.exceededList, detail: '' });
    }
    else {
      // this.internaltransferlist.forEach(element => {
      this.transferList.forEach(element => {
        this.TransferOrderData = {
          // CityId: element.CityId,
          // WareHouseId: element.WarehouseId,
          WareHouseId: this.selectedWarehouses,


          ItemNumber: element.ItemNumber,
          WareHouseName: element.WarehouseName,
          RequestToWarehouseId: element.OtherWarehouseid,
          RequestToWarehouseName: element.OtherWarehouseName,
          ItemName: element.Itemname,
          TotalQuantity: element.Requiredqty,
          ItemMultipMrpId: element.ItemMultipMrpId,
          HSNCode: element.HSNCode,
          ItemId: element.ItemId
        }
        this.TransferOrderDetails.push(this.TransferOrderData);
      });
      this.internalTransferRequest = {
        RequestFromWarehouseid: parseInt(this.selectedWarehouses),
        CompanyId: 1,
        Peopleid: 0,
        TransferOrderDetails: this.TransferOrderDetails
      }

      this.internaltransferservice.PostTransfer(this.internalTransferRequest).subscribe(result => {
        this.getInternalTransferList();
        if (result == true) {
          this.messageService.add({ severity: 'success', summary: 'Internal TransferRequest Genetaed successfully ', detail: '' });
          // this.ngOnInit();
          setTimeout(() => {
            this.getInternalTransferList();

          }, 1000);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Something Went wrong please Try Asgain!', detail: '' });

        }


        this.savedata = result;


      })
    }
  }
  // edit(rowData)
  // {
  //   for(var i in this.internaltransferlist)
  //   {
  //   if(rowData.ItemId == this.internaltransferlist[i].ItemId && rowData.ItemNumber == this.internaltransferlist[i].ItemNumber)
  //   {
  //     if(rowData.Requiredqty > this.internaltransferlist[i].Requiredqty)
  //     {
  //       alert('You entered Quantity should not be Greater than Required Quantity');
  //     }
  //     else if(rowData.Requiredqty < 0)
  //     {
  //       alert('You entered Quantity zero it should be Greater than 0 or equal to Required Quantity');
  //     }
  //   }
  //   {

  //   }
  //   }
  // }
  // increment(rowData) {  
  //   
  //     if(rowData.Requiredqty==null){          
  //       rowData.Requiredqty =  parseInt(rowData.Requiredqty);
  //     }else{
  //       rowData.Requiredqty = parseInt(rowData.Requiredqty);
  //       rowData.Requiredqty += parseInt(rowData.Requiredqty);         
  //     }
  // };
  // decrement(rowData)
  // {    
  //   for(var i in this.internaltransferlist){
  //     if(rowData.ItemId == this.internaltransferlist[i].ItemId)
  //     {
  //       if(rowData.Requiredqty >=0){
  //         if(rowData.Requiredqty == 0){
  //           return rowData.Requiredqty;
  //         }
  //         rowData.Requiredqty = parseInt(rowData.Requiredqty);
  //         rowData.Requiredqty -=  parseInt(this.internaltransferlist[i].Requiredqty);        
  //       }else{
  //         rowData.Requiredqty = 0;

  //       }
  //     }
  //   } 
  // };

  onRowEditCancel(rowData, i) {

    rowData.IsSelected = false;
    this.editCancel = false;
    // this.editMode = false;
    rowData.editMode = true;

  }
  totalMrp(rowData) {

    this.Total = 0;
    rowData.totalMRP = rowData.Requiredqty * rowData.Price;
    for (var i in this.internaltransferlist) {
      // if(rowData.ItemId == this.internaltransferlist[i].ItemId && rowData.ItemNumber == this.internaltransferlist[i].ItemNumber)
      // {
      this.Total += this.internaltransferlist[i].totalMRP;
      // }
    }
    console.log('rowData:', rowData.totalMRP);
  }

  getTotal() {

    let total = 0;
    if (this.transferList && this.transferList.length) {
      this.transferList.forEach(element => {
        total += element.Price * element.Requiredqty;

      });

      if (total > 90000) {

        setTimeout(() => {
          // this.messageService.add({ severity: 'error', summary: 'Your Total Amount is greater than 90,000.Total Amount should not be greater than 90,000', detail: '' });
        }, 500);

      }


      return total;
    }
    else {
      return 0;
    }

  }

  detectRowEdit(rowData, val) {

    let editedTransferITem = this.MainTransferList[0].filter(internaltransfer => internaltransfer.ItemNumber == rowData.ItemNumber)[0];

    // if (val > (rowData.totalMRP / rowData.Price) || val < 0) {
    //   if (val > (rowData.totalMRP / rowData.Price)) {
    //     this.messageService.add({ severity: 'error', summary: 'Editable Required Quantity Should not be greater than RequiredQty:' + (rowData.totalMRP / rowData.Price), detail: '' });
    //   }
    //   if (val < 0) {
    //     this.messageService.add({ severity: 'error', summary: 'Editable Required Quantity Should not be Negative', detail: '' });
    //   }
    //   rowData.Requiredqty = rowData.totalMRP / rowData.Price
    //   let editedITem = this.internaltransferlist.indexOf(internaltransfer => internaltransfer.ItemNumber == rowData.ItemNumber);

    //   this.internaltransferlist[editedITem].Requiredqty = rowData.totalMRP / rowData.Price;

    // }

    // else {

    //   let editedItem = this.internaltransferlist.indexOf(internaltransfer => internaltransfer.ItemNumber == rowData.ItemNumber);

    //   this.internaltransferlist[editedItem].Requiredqty = val;


    //   rowData.Requiredqty = val;
    // }


    if (val > (rowData.OtherWarehouseAvailableqty) || val < 0) {
      if (val > (rowData.OtherWarehouseAvailableqty)) {
        this.messageService.add({ severity: 'error', summary: 'Editable Required Quantity Should not be greater than Other Warehouse Required Quantity:' + (rowData.OtherWarehouseAvailableqty), detail: '' });
      }
      if (val < 0) {
        this.messageService.add({ severity: 'error', summary: 'Editable Required Quantity Should not be Negative', detail: '' });
      }
      rowData.Requiredqty = rowData.totalMRP / rowData.Price
      let editedITem = this.internaltransferlist.indexOf(internaltransfer => internaltransfer.ItemNumber == rowData.ItemNumber);

      this.internaltransferlist[editedITem].Requiredqty = rowData.totalMRP / rowData.Price;

    }

    else {

      let editedItem = this.internaltransferlist.indexOf(internaltransfer => internaltransfer.ItemNumber == rowData.ItemNumber);

      this.internaltransferlist[editedItem].Requiredqty = val;


      rowData.Requiredqty = val;
    }
  }

  calculateByToWarehouseArray() {
    let arr = [];
    let alreadyoccuppiedId = [];
    alreadyoccuppiedId.push(999999);
    if (this.transferList && this.transferList.length) {
      let trList = this.transferList;
      trList.forEach(element => {

        let alreadyoccuppiedarray = alreadyoccuppiedId.filter(ar => ar == element.OtherWarehouseid)[0];
        if (alreadyoccuppiedarray) {
        }
        else {
          let filteredArray = trList.filter(a => a.OtherWarehouseid == element.OtherWarehouseid);
          if (filteredArray && filteredArray.length) {
            let amt = 0;
            filteredArray.forEach(el => {
              alreadyoccuppiedId.push(el.OtherWarehouseid);
              amt = amt + (el.Price * el.Requiredqty)
            });
            arr.push({
              OtherWarehouseid: element.OtherWarehouseid,
              OtherWarehouseName: element.OtherWarehouseName,
              Amount: amt
            });
          }
        }
      });


    }
    return arr
  }
}
