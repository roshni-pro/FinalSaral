import { Component, OnInit } from '@angular/core';
import { TradeCustomerService } from 'app/shared/services/trade-customer.service';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-approve-customer-request',
  templateUrl: './approve-customer-request.component.html',
  styleUrls: ['./approve-customer-request.component.scss']
})
export class ApproveCustomerRequestComponent implements OnInit {


  Items: any[];
  cols: any[];
  totalRecords = 50;
  loading: boolean;
  istrue: boolean;
  itemID: any;
  isOpenPopup: boolean;
  selectedQue: any;
  customerdetails: any;
  blocked: boolean;
  remarks: any;
  isdisabled: boolean;
  isRemark: boolean;
  isFormInvalid: boolean;
  OpenSellerPopup: boolean;
  customer: any;

  constructor(private tradecustomerservice: TradeCustomerService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private exportService: ExportServiceService) { this.customer = {}; }

  ngOnInit() {
    this.blocked = true;
    this.isOpenPopup = false;
    this.customer.IsSeller = false;
    this.customer.IszaruriSeller = false;
    this.isRemark = false;
    this.isdisabled = false;
    this.OpenSellerPopup = false;
    this.cols = [
      { field: 'SkCode', header: 'SkCode' },
      { field: 'CustomerName', header: 'Customer Name' },
      { field: 'CategoryNames', header: 'Categories' },
      { field: 'Address', header: 'Address' },
      { field: 'Mobile', header: 'Mobile' },
      //{ field: 'CreatedDate', header: 'CreatedDate' },
      { field: 'IsApproved', header: 'IsApproved' },
      { field: 'IsReject', header: 'IsReject' },
      { field: 'remarks', header: 'Remarks' },
      { field: 'Action', header: 'Action', bool: true }
    ];


    this.tradecustomerservice.GetCustomerSellRequestV1().subscribe(data => {
      this.Items = data;
      console.log("CustomerId", data);
      this.blocked = false;

    });



  }

  exportCustomer() {
    this.blocked = true;
    this.exportService.exportAsExcelFile(this.Items, 'TradeCustomerApprove');
    this.blocked = false;
  }

  edit(rowData: any, isApprove: boolean, ) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (isApprove) {
          this.OpenSellerPopup = true;
          this.customer.IsSeller = false;
          this.customer.IszaruriSeller = false;
          this.selectedQue = rowData;
          // this.tradecustomerservice.ApproveSellRequest({ CustomerId: rowData.CustomerId, Id: rowData.Id }).subscribe(x => {
          //   rowData.IsApproved = true;
          //   this.messageService.add({ severity: 'success', summary: 'Approved Successfully!', detail: '' });
          // });
        } else {
          this.OpenSellerPopup = false;
          this.selectedQue = rowData;
          this.isFormInvalid = false;
          this.remarks = [];
          this.isOpenPopup = true;
          this.isRemark = true;
        }
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Canceled!', detail: 'Operation canceled' });

      }
    });

  }

  approveSeller(sellerType) {
    this.selectedQue;
    this.blocked = true;
    this.tradecustomerservice.ApproveSellRequest({
      CustomerId: this.selectedQue.CustomerId, Id: this.selectedQue.Id,
      IsSeller: sellerType.IsSeller, IszaruriSeller: sellerType.IszaruriSeller}).subscribe(x => {
      this.blocked = false;
      this.OpenSellerPopup = false;
      this.selectedQue.IsApproved = true;
      this.messageService.add({ severity: 'success', summary: 'Approved Successfully!', detail: '' });
    });
  }

  Rejectremarks(form) {
    this.selectedQue;
    if (form.invalid) {
      this.isFormInvalid = true;
    }
    else {
      if (form.value.comment.length <= 0) {
        this.isFormInvalid = true;
        return this.isFormInvalid;
      }
      this.blocked = true;
      this.isFormInvalid = false;
      this.tradecustomerservice.RejectSellRequest({ CustomerId: this.selectedQue.CustomerId, Id: this.selectedQue.Id, remarks: form.value.comment }).subscribe(x => {
        this.selectedQue.IsReject = true;
        this.isOpenPopup = false;
        this.blocked = false;
        this.messageService.add({ severity: 'success', summary: 'Rejected Successfully!', detail: '' });
        window.location.reload();
      });
    }
  }

  remark(rowData) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedQue = rowData;
        this.remarks = [];
        this.isRemark = false;
        // this.QuestionName=this.Questionlist[i].QueName;
        this.isOpenPopup = true;
        this.isFormInvalid = false;
      }
    })
  }

  Saveremarks(form) {
    console.log('formfromfrom:', form);
    this.isFormInvalid = false;
    this.blocked = true;
    this.selectedQue;
    this.tradecustomerservice.requestRemarks({ CustomerId: this.selectedQue.CustomerId, Id: this.selectedQue.Id, remarks: form.value.comment }).subscribe(result => {
      this.isOpenPopup = false;
      this.blocked = false;
      this.messageService.add({ severity: 'success', summary: 'Remark Save Successfully!!Thank you.', detail: '' });
      window.location.reload();
    })
  }

  //Remark Validation (Check length of enter String)
  onremarksChange(remarkstring) {
    console.log('formfromfrom:', remarkstring);
    var strlength = new String(remarkstring);
    if (strlength.length >= 200) {
      return this.isdisabled = true;
    }
    else {
      return this.isdisabled = false;
    }
  }

}
