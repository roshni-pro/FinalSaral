import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TradeitemmasterService } from 'app/shared/services/tradeitemmaster.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-approve-items-request',
  templateUrl: './approve-items-request.component.html',
  styleUrls: ['./approve-items-request.component.scss']
})
export class ApproveItemsRequestComponent implements OnInit {
  itemlist: any[];
  data: any;
  PageSize: number;
  totalRecords: number;
  blocked: boolean;
  cols: any[];
  selectedQue: any;
  isFormInvalid: boolean;
  isOpenPopup: boolean;
  //reason:any;
  userId: any;
  isdisabled: boolean;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
    private ItemServices: TradeitemmasterService) { this.data = {}; }

  ngOnInit() {
    this.PageSize = 15;
    console.log('userId', this.userId);
    this.data.sstatus = '';
    this.data.reason = null;
    this.isdisabled = false;
    this.isFormInvalid = false;
    this.cols = [
      { field: 'ItemName', header: 'Item Name' },
      { field: 'MRP', header: 'MRP' },
      { field: 'BrandName', header: 'Brand Name' },
      { field: 'BasePrice', header: 'Base Price' },
      { field: 'SellingDP', header: 'Selling DP' },
      { field: 'BuyingDP', header: 'Buying DP' },
      { field: 'CreatedDate', header: 'Created Date' },
      { field: 'IsConsumerItem', header: 'IsConsumer Item' },
      { field: 'Action', header: 'Action', bool: true }
    ];

    var dataToPost = {
      status: null,
      Skip: 0,
      Take: this.PageSize
    }
    this.onInitialize(dataToPost);
  }

  onInitialize(data) {
    this.blocked = true
    this.ItemServices.getTkItemsCreated(data).subscribe(result => {
      this.blocked = false;
      if (result.total > 0) {
        this.itemlist = result.TradeItemMasterDcs;
        this.totalRecords = result.total;
        for (var i in this.itemlist) {
          this.itemlist[i].CreatedDate =  this.itemlist[i].CreatedDate ? moment( this.itemlist[i].CreatedDate).format('DD/MM/YYYY') : null
        }
      }
      else {
        this.itemlist = [];
       // this.messageService.add({ severity: 'error', summary: 'data not found !!', detail: '' })
      }
    })
  }

  load(event) {
    var dataToPost = {
      status: null,
      Skip: event.first,
      Take: event.rows
    }
    this.onInitialize(dataToPost);
  }


  GetCheckerList(data) {
    var dataToPost = {
      status: data.sstatus,
      Skip: 0,
      Take: this.PageSize
    }
    this.onInitialize(dataToPost);
  }

  edit(rowData: any, isApprove: boolean, ) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (isApprove) {
          var post = {
            Id: rowData.Id,
            IsApproved: isApprove,
            Reason: null
          }
          this.blocked = true;
          this.ItemServices.ApproveItemRequest(post).subscribe(x => {
            this.blocked = false;
            rowData.IsApproved = true;
            this.messageService.add({ severity: 'success', summary: 'Approved Successfully!', detail: '' });
            this.ngOnInit();
          });
        } else {
          this.selectedQue = rowData;
          this.isFormInvalid = false;
          this.data.reason = null;
          this.isOpenPopup = true;
        }
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Canceled!', detail: 'Operation canceled' });
      }
    });

  }

  Saveremarks(data) {
    if (data.reason == null || data.reason == '') {
      this.isFormInvalid = true;
    }
    else {
      this.isFormInvalid = false;
      this.selectedQue;
      this.blocked = true;
      var post = {
        Id: this.selectedQue.Id,
        IsApproved: false,
        Reason: data.reason
      }
      this.ItemServices.ApproveItemRequest(post).subscribe(x => {
        this.isOpenPopup = false;
        this.blocked = false;
        this.messageService.add({ severity: 'success', summary: 'Item Reject Sucessfully!!', detail: '' });
        this.ngOnInit();
      })
    }
  }

  //Remark Validation (Check length of enter String)
  onremarksChange(remarkstring) {
    // console.log('formfromfrom:',remarkstring);
    var strlength = new String(remarkstring);
    if (strlength.length >= 200) {
      return this.isdisabled = true;
    }
    else {
      this.isFormInvalid = false;
      return this.isdisabled = false;
    }
  }

}
