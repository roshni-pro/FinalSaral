import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from './../../services/purchase.service';
import { Component, OnInit } from '@angular/core';
import { PurchaseModel, POReturnRequestPager } from 'app/Purchase/interface/purchaseModel';
import { ConfirmationService, MessageService } from 'primeng/api';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {
  returnPager: POReturnRequestPager;
  PurchaseOrderData: PurchaseModel;
  PurchaseOrderDetails = [];
  GoodReceivedDetailList = [];
  GRGroup: any[];
  IRGroup: any[];
  InvoiceReceiptDetailList = [];
  WarehouseId: number;
  purchaseOrderId: number;
  blocked = true;
  constructor(private purchaseService: PurchaseService
    , private activatedRoute: ActivatedRoute
    , private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private r: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.purchaseOrderId = param.id;
      this.GetPurchaseOrderById(param.id);
    })

  }

  GetPurchaseOrderById(purchaseOrderId) {
    this.purchaseService.GetPurchaseOrderById(purchaseOrderId).subscribe(result => {
      this.blocked = false;
      console.log('GetPurchaseOrderById: ', result);
      this.PurchaseOrderData = result.POMaster;
      if (result.POMaster != null && result.POMaster != null) {
        this.WarehouseId = result.POMaster.WarehouseId;
      }
      this.PurchaseOrderDetails = result.PODetailList;
      this.GoodReceivedDetailList = result.GoodReceivedDetailList;
      this.InvoiceReceiptDetailList = result.InvoiceReceiptDetailList;
      if (this.PurchaseOrderData == null) {
        if (this.InvoiceReceiptDetailList == null) {
          this.messageService.add({ severity: 'error', summary: 'No IR exists for this Purchase Order', detail: '' });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'PO Details Not Found ', detail: '' });
        }
      }
      this.makeGoodReceivedDetailList();
      this.makeInvoiceReciptList();
      console.log('this.GRGroup: ', this.GRGroup);
      console.log('this.IRGroup: ', this.IRGroup);
    });
  }

  deletePoGrIr(id, cancelType) {
    console.log('delete gr', id);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        let method = null;
        this.blocked = true;
        if (cancelType == "PO") {
          this.purchaseService.isGRExistsForPO(id).subscribe(x => {
            if (x) {
              alert('Dependent entry exists!')
            } else {
              this.cancelRequest(id, cancelType, this.purchaseOrderId);
            }
          });
        } else if (cancelType == "GR") {
          this.purchaseService.isIRExistsForGR(this.purchaseOrderId, id).subscribe(x => {
            if (x) {
              alert('Dependent entry exists!')
            } else {
              this.cancelRequest(id, cancelType, this.purchaseOrderId);
            }
          });
        }
        else {
          this.cancelRequest(id, cancelType, this.purchaseOrderId);
        }
      }
    });

  }


  private cancelRequest(id, cancelType, PurchaseOrderId) {
    let poReturnRequestDc = { ItemId: id, CancelType: cancelType, WarehouseId: this.WarehouseId, PurchaseOrderId: PurchaseOrderId };
    this.purchaseService.makeCancelRequest(poReturnRequestDc)
      .subscribe(x => {

        console.log('poReturnRequestDc: ', poReturnRequestDc);
        this.messageService.add({ severity: 'success', summary: 'Request Sent For Approval!', detail: '' });
        setTimeout(() => {
          this.blocked = false;
          this.router.navigate(["returnList"], { relativeTo: this.r.parent });
        }, 2500);
      });
  }


  makeGoodReceivedDetailList() {
    if (this.GoodReceivedDetailList && this.GoodReceivedDetailList.length > 0) {
      let list = [];
      let serionNumber = '';
      let innerObject = { serionNumber: '', list: [] };
      this.GoodReceivedDetailList.forEach(x => {
        if (x.GrSerialNumber == serionNumber) {
          innerObject.list.push(x);
        } else {
          list.push(innerObject);
          serionNumber = x.GrSerialNumber;
          innerObject = { serionNumber: x.GrSerialNumber, list: [] };
          innerObject.list.push(x);
        }
      });
      list.push(innerObject);
      list.splice(0, 1);
      this.GRGroup = list;
    }
  }

  makeInvoiceReciptList() {
    if (this.InvoiceReceiptDetailList && this.InvoiceReceiptDetailList.length > 0) {
      let list = [];
      let IRMasterId = '';
      let innerObject = { IRMasterId: '', list: [] };
      this.InvoiceReceiptDetailList.forEach(x => {
        if (x.IRMasterId == IRMasterId) {
          innerObject.list.push(x);
        } else {
          list.push(innerObject);
          IRMasterId = x.IRMasterId;
          innerObject = { IRMasterId: x.IRMasterId, list: [] };
          innerObject.list.push(x);
        }
      });
      list.push(innerObject);
      list.splice(0, 1);
      this.IRGroup = list;
    }

  }

  getPOReturnRequestList() {
    this.purchaseService.getPOReturnRequestList(this.returnPager)
      .subscribe(result => {
        if (result.RequestReturnList && result.RequestReturnList.length) {
          return result.RequestReturnList;
        }
      });
  }

}
