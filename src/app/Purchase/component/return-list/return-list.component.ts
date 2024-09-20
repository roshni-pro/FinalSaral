import { MessageService } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PurchaseService } from 'app/Purchase/services/purchase.service';
import { POReturnRequestPager } from 'app/Purchase/interface/purchaseModel';
import { POReturnRequest } from 'app/Purchase/interface/POReturnRequest';
import Swal from 'sweetalert2'
import { Table } from 'primeng/table';

@Component({
  selector: 'app-return-list',
  templateUrl: './return-list.component.html',
  styleUrls: ['./return-list.component.scss']
})
export class ReturnListComponent implements OnInit {
  @ViewChild(Table, { static: false }) table: Table;
  returnPager: POReturnRequestPager;
  CancelTypeList = [{ name: 'IR' }, { name: 'PO' }, { name: 'GR' }];
  CancelType: string = '';
  recordCount: number;
  first = 0;
  blocked = false;
  poReturnRequestList: POReturnRequest[];

  cols = [

    { field: 'POReturnRequestId', header: ' POReturnRequestId' },
    { field: 'RequestedBy', header: ' RequestedBy' },
    { field: 'RequestedDate', header: 'RequestedDate' },
    { field: 'ApprovedBy', header: 'ApprovedBy' },
    { field: 'ItemId', header: 'ItemId' },
    { field: 'ApprovedDate', header: 'ApprovedDate' },
    { field: 'Amount', header: 'Amount' },
    { field: 'RefNumber', header: 'RefNumber' }

  ];
  constructor(private purchaseService: PurchaseService, private messageService: MessageService) {
    this.returnPager = new POReturnRequestPager();
  }

  ngOnInit() {
    this.getPOReturnRequestList();
  }

  getPOReturnRequestList() {
    this.purchaseService.getPOReturnRequestList(this.returnPager)
      .subscribe(result => {
        this.recordCount = result.recordCount;
        this.poReturnRequestList = result.RequestReturnList;
        this.table.reset();
      });
  }

  approveCancelRequest(POReturnRequestId) {
    Swal.fire({
      title: 'Approve cancel Request ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.purchaseService.ApproveCancelRequest(POReturnRequestId)
          .subscribe(result => {
            if (result == 'Access Denied') {
              this.messageService.add({ severity: 'error', summary: result, detail: '' });
            }
            else {
              if (this.poReturnRequestList.filter(request => request.POReturnRequestId == POReturnRequestId)) {
                this.poReturnRequestList.filter(request => request.POReturnRequestId == POReturnRequestId).forEach(requestItem => {
                  requestItem.POReturnRequestStatus = 'Approved'
                });
                this.messageService.add({ severity: 'success', summary: result, detail: '' });
              }
            }
          });
      }
    });
  }


  rejectCancelRequest(POReturnRequestId) {
    Swal.fire({
      title: 'Reject cancel Request ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.purchaseService.RejectCancelRequest(POReturnRequestId)
          .subscribe(result => {
            if (result == 'Access Denied') {
              this.messageService.add({ severity: 'error', summary: result, detail: '' });
            }
            else {
              if (this.poReturnRequestList.filter(request => request.POReturnRequestId == POReturnRequestId)) {
                this.poReturnRequestList.filter(request => request.POReturnRequestId == POReturnRequestId).forEach(requestItem => {
                  requestItem.POReturnRequestStatus = 'Rejected'
                });
                this.messageService.add({ severity: 'success', summary: result, detail: '' });
              }
            }


          });
      }
    });
  }

  load(event) {
    this.returnPager.Take = event.rows
    this.returnPager.Skip = event.first
    this.purchaseService.getPOReturnRequestList(this.returnPager)
      .subscribe(result => {
        this.recordCount = result.recordCount;
        this.poReturnRequestList = result.RequestReturnList;
      });
  }
}
