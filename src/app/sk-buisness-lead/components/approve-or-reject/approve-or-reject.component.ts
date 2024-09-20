import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SkBuisnessLoanService } from 'app/sk-buisness-lead/services/sk-buisness-loan.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-approve-or-reject',
  templateUrl: './approve-or-reject.component.html',
  styleUrls: ['./approve-or-reject.component.scss']
})
export class ApproveOrRejectComponent implements OnInit {
  @Input() rowData: any;
  LeadResponse: any;
  AScoreResponse: any;
  CeplarResponse: any;
  ColenderResponse: any;
  blocked: boolean = false;
  isLeadResponse: boolean = false;
  isAScoreResponse: boolean = true;
  isCeplarResponse: boolean = true;
  isColenderResponse: boolean = true;
  @Output() closeLeadProcess: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSelectedDocReject: EventEmitter<any> = new EventEmitter<any>();
  @Input() loan_app_id: any;
  @Input() isReload: boolean = false;
  @Input() ButtonActive: number;
  @Input() sequenceDc: any;
  @Input() Msg: any;
  @Input() LeadMasterId: number;
  isButtonShow: boolean = false;
  isOpenRejectPopup: boolean = false;
  @Input() closepopeup: any;
  DocumentName: any;
  pageSequenceList: any;
  Comment: any;
  @Output() IsloanPost: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _skBuisnessLoanService: SkBuisnessLoanService, private messageService: MessageService) { debugger }

  CreatedDate: any
  ngOnInit() {
    debugger
    // console.log(this.rowData);

    this.DocumentName = '';
    if (this.LeadMasterId > 0) {
      this._skBuisnessLoanService.getNoActivityDocList(this.LeadMasterId).subscribe(x => {
        debugger;
        console.log('rowdata', this.rowData)
        if (this.rowData.loan_app_id != null && this.rowData.borrower_id != null) {
          this.CreatedDate = this.rowData.CreatedDate
        }
        if (this.rowData.loan_app_id != null && this.rowData.loan_app_id != '') {
          this.getgeneratedleadofferdata();
          this.offerdata();
        }
        console.log('noActivity', x);

        if (x.length > 0) {
          this.isButtonShow = true;
        } else {
          this.isButtonShow = false;
        }
      });
    }
    this.checkApprovedDoc();
  }
  IsbuttonEnable: number
  getCustomerPageData() {
    this._skBuisnessLoanService.getCustomerPageData(this.LeadMasterId).subscribe(res => {
      this.blocked = false;
      // this.rowData = res;
      this.IsbuttonEnable = res.ButtonActive;
      console.log("buttondata", res);
    })
  }

  showResponse: boolean = false;
  showRes(){
    this.showResponse = this.showResponse == true? false: true;
  }


  checkCompleteDocument: boolean = true;

  checkApprovedDoc() {
    this.checkCompleteDocument = true;
    console.log("testing", this.sequenceDc)
    if (this.sequenceDc) {
      for (const key in this.sequenceDc) {
        console.log(key);
        console.log(this.sequenceDc[key]);
        if (key != 'eagreementDcs' && key != 'LeadActivityProgressesHistDcs' && key !='BankStatementDcs') {
          if (this.sequenceDc[key].length == 0) {
            this.checkCompleteDocument = false;
          }
          else {
            let filtered = this.sequenceDc[key].filter(x => x.IsComplete == false || x.IsApprove == 2 || x.IsApprove == 0)
            if (filtered.length > 0) {
              this.checkCompleteDocument = false;
              //return
            }
          }
        }
      }
    }
  }

  onClickApproved() {
    debugger;
    this.rowData;
    debugger;
    this.blocked = true;
    //this.getCustomerPageData();
    this.checkApprovedDoc();
    if (this.checkCompleteDocument) {
      this._skBuisnessLoanService.postLead(this.rowData.Id).subscribe(x => {
        console.log('APPROVED', x);
        this.blocked = false;
        if (x.Status) {
          this.getCustomerPageData();
          this.messageService.add({ severity: 'success', summary: x.Msg, detail: '' });
          this.closeLeadProcess.emit();
        } else {
          this.messageService.add({ severity: 'error', summary: x.Msg, detail: '' });
          // this.closeLeadProcess.emit();
        }
        this.isLeadResponse = true;
        this.LeadResponse = x.Msg;
        debugger
      });
    }
    else {
      this.blocked = false;
      this.messageService.add({ severity: 'error', summary: "Please approve all documents.", detail: '' });
    }
  }
  onClickReject() {
    let SequenceNo = this.pageSequenceList.filter(x => x.ScreenName == this.DocumentName)[0].SequenceNo;
    let payload = {
      "DocumentName": this.DocumentName,
      "LeadmasterId": this.LeadMasterId,
      "isApprove": false,
      "SequenceNo": SequenceNo,
      "Comment": this.Comment,
      "isFinalSelectedDocument": true
    }
    debugger;
    this.isOpenRejectPopup = false;
    this.onSelectedDocReject.emit(payload);
    // this._skBuisnessLoanService.postLead(this.rowData.Id).subscribe(x=>{
    //   console.log('Reject',x);
    //   this.LeadResponse = x.Msg;
    //   debugger
    // });
  }
  getgeneratedleadofferdetails: any;
  getgeneratedleadofferdata() {
    debugger
    this._skBuisnessLoanService.GetLeadOfferdata(this.LeadMasterId).subscribe(x => {
      if (x.Status) {
        this.getgeneratedleadofferdetails = x.Data;
        console.log('getgeneratedleadofferdata', this.getgeneratedleadofferdetails)
      }
    });
  }


  offerdetails: any;
  offerdata() {
    debugger
    this._skBuisnessLoanService.offerInformation(this.LeadMasterId).subscribe(x => {
      if (x) {
        this.offerdetails = x[0];
        if (this.offerdetails){
         this.IsloanPost.emit(true);
        console.log('offerdetails', this.offerdetails)
        this.calcEMI(this.offerdetails.pricing, this.offerdetails.tenure, this.offerdetails.loan_amount);
        }
      }
    });
  }

  EMI: number = 0;
  loanIntAmt: number = 0;
  calcEMI(yearlyInterestRate: number, totalNumberOfMonths: number, loanAmount: number) {
    // this.loanOfferDC.interest_rt, this.loanOfferDC.selected_loan_tnr, this.loanOfferDC.selected_loan_amt
    //monthly EMI
    if (yearlyInterestRate > 0) {
      const rate = yearlyInterestRate / 100 / 12;
      const denominator = Math.pow((1 + rate), totalNumberOfMonths) - 1;
      this.EMI = (rate + (rate / denominator)) * loanAmount;
    } else {
      this.EMI = totalNumberOfMonths > 0 ? loanAmount / totalNumberOfMonths : 0;
    }
    //monthly EMI
    this.loanIntAmt = (this.EMI * totalNumberOfMonths) - loanAmount;
  }
  
  onClickRejectPopup() {
    this.DocumentName = '';
    this.Comment = '';
    this.blocked = true;
    this._skBuisnessLoanService.getSequence(this.LeadMasterId).subscribe(res => {
      this.blocked = false;
      this.pageSequenceList = res.Data;
      this.isOpenRejectPopup = true;
      console.log("pageSequenceList", this.pageSequenceList);
    })

  }
  onClickAscorerequest() {
    this.blocked = true;
    this._skBuisnessLoanService.requestAScoreAPI(this.rowData.Id).subscribe(x => {
      console.log('AScoreResponse', x);
      this.blocked = false;
      // this.isLeadResponse = false;
      this.isAScoreResponse = true;
      if (x.status_code > 0) {
        this.closeLeadProcess.emit();
      } else {
        this.AScoreResponse = x.message;
      }
      debugger
    });
  }

  onClickCeplar() {
    this.blocked = true;
    this._skBuisnessLoanService.ceplrPdfReports(this.rowData.Id).subscribe(x => {
      console.log('CeplarResponse', x);
      this.blocked = false;
      this.closeLeadProcess.emit();
      this.isCeplarResponse = true;
      this.CeplarResponse = x.Msg;
      debugger
    });
  }

  onClickColender() {
    this.blocked = true;
    this._skBuisnessLoanService.coLenderSelectorAPI(this.rowData.Id).subscribe(x => {
      console.log('ColenderResponse', x);
      this.closeLeadProcess.emit();
      this.blocked = false;
      this.isColenderResponse = true;
      this.ColenderResponse = x.Msg;
      debugger
    });
  }
  IsGenerateOfferResponse: boolean = false;
  onClickGenerateOffer() {
    this.blocked = true;
    this._skBuisnessLoanService.testAScoreWebhookResponse(this.rowData.Id).subscribe(x => {
      console.log('Generate Offer : ', x);
      this.blocked = false;
      if (x) {
        this.IsGenerateOfferResponse = true;
        this.messageService.add({ severity: 'success', summary: x.Msg ? x.Msg : 'Generated Successfully!!', detail: '' });
        this.closeLeadProcess.emit();
      } else {
        this.messageService.add({ severity: 'error', summary: x.Msg ? x.Msg : 'Something went wrong!!', detail: '' });
      }
      // this.isColenderResponse = true;
      // this.ColenderResponse = x.Msg;
    });
  }


}
