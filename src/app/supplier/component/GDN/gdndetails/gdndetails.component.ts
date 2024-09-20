import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'app/shared/services/supplier.service';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-gdndetails',
  templateUrl: './gdndetails.component.html',
  styleUrls: ['./gdndetails.component.scss']
})
export class GDNDetailsComponent implements OnInit {

  isOpenPopup: boolean;
  ItemList: any[];
  ItemLists: any[];
  selectedRowDetailList: any[];
  totalRecords: number;
  PageNo: any;
  ItemPerPage: any;
  blocked: boolean;
  btnstatus: boolean;
  btnSendstatus: boolean;
  group: any;
  isGDNPopup: boolean;
  GNDStatus: boolean;
  constructor(private _service: SupplierService, private messageService: MessageService, private confirmationService: ConfirmationService) { this.group = {}; }

  ngOnInit() {
    this.isOpenPopup = false;
    this.btnSendstatus = false;
    this.isGDNPopup = false;
    //this.GetGDNMaster();
  }
  // load(event)  {
  //   var Last=  event.first ? event.first + event.rows : 20
  //   this.ItemPerPage= event.rows
  //   this.PageNo=Last / event.rows
  //   this._service.GetGDNMaster(0,'',this.PageNo,this.ItemPerPage).subscribe(result => {
  //     this.ItemList = result.GoodsDescripancyNoteMasterDB;
  //     this.totalRecords=result.totcount;
  //   })
  // }
  GetGDNMaster(POId) {
    this.blocked = true;
    var FromDate = this.group.FromDate ? moment(this.group.FromDate).format('YYYY-MM-DD') : null
    var ToDate = this.group.ToDate ? moment(this.group.ToDate).format('YYYY-MM-DD') : null


    if (FromDate != null || ToDate != null) {
      if (FromDate == null) {
        this.messageService.add({ severity: 'error', summary: 'Please select from Date !!', detail: '' });
        this.blocked = false;
        return;
      }
      if (ToDate == null) {
        this.messageService.add({ severity: 'error', summary: 'Please select To Date !!', detail: '' });
        this.blocked = false;
        return;
      }
      if (ToDate < FromDate) {
        this.messageService.add({ severity: 'error', summary: 'To Date can not less than from date !!', detail: '' });
        this.blocked = false;
        return;
      }
    }
    if (((POId.POId == undefined || POId.POId == "0") && POId.GDNNo == undefined && (FromDate == null || ToDate == null))) {
      this.messageService.add({ severity: 'error', summary: 'Please select one parameter !!', detail: '' });
      this.blocked = false;
      return;
    }


    if (POId.POId == undefined) {
      POId.POId = 0;
    }
    else if (POId.GDNNo == undefined) {
      POId.GDNNo = '';
    }

    this._service.GetGDNMaster(POId.POId, POId.GDNNo, FromDate, ToDate).subscribe(result => {
      this.ItemLists = result.GoodsDescripancyNoteMasterDB;
      this.totalRecords = result.totcount;
      this.blocked = false;
    })
  }
  openDetails(GDNId, status) {
    this._service.GetGDNDetail(GDNId).subscribe(result => {
      
      this.selectedRowDetailList = result;
      if (result.length > 0) {
        this.btnstatus = status == "Rejected" ? true : false;
        this.isOpenPopup = true;
      }
      else {
        alert("No Record found")
      }

    })
  }
  UpdateQty(obj) {
    if (obj.ChangedShortQty == undefined && obj.ChangedDamageQty == undefined && obj.ChangedExpiryQty == undefined) {
      alert("Please enter qty!!");
      return;
    }

    if(confirm("Are you sure want to update Qty?")) {
    this._service.UpdateGDNDetail(obj).subscribe(result => {
      if (result == 1) {
        alert("Update Successfully")
        this.isOpenPopup = true;
        this.btnSendstatus = true;
      }
      else {
        alert("Update Failed")
        this.isOpenPopup = false;
        this.btnSendstatus = false;
      }
    })
  }
  }
  Send(obj) {
    
    if(confirm("Are you sure want to send to Supplier")) {
    this._service.SendSupplire(obj.PurchaseOrderId, obj.WarehouseName, obj.SupplierId, obj.GoodsDescripancyNoteMasterId).subscribe(result => {
      if (result == true) {
        alert("Send Successfully")
        this.isOpenPopup = false;
        this.btnSendstatus = false;
      }
      else {
        alert("Update Failed")
        this.isOpenPopup = false;
        this.btnSendstatus = false;
      }
    })
  }
}
  Refresh() {
    window.location.reload();
  }

  gDNNote(id) {
    this._service.GetGDNDetaillist(id).subscribe(result => {
      this.isGDNPopup = true;
      this.ItemList = result;
      // this.GNDStatus=this.ItemList[0].GNDStatus;
      this.GNDStatus = this.ItemList[0].GNDStatus == "Rejected" ? true : false;

    })
  }
  gDNCancel(comment, GDnId) {
    if (comment == undefined || comment == null) {
      this.messageService.add({ severity: 'error', summary: 'Please enter Comment!!', detail: '' });
      return;
    }
    this.confirmationService.confirm({
      message: 'Are you sure want to Cancel GDN?',
      accept: () => {
        this._service.CancelGDN(comment, GDnId).subscribe(result => {
          this.isGDNPopup = false;
          this.messageService.add({ severity: 'success', summary: 'GDN Cancel Successfully!!', detail: '' });
        })
      }
    });
  }
}
