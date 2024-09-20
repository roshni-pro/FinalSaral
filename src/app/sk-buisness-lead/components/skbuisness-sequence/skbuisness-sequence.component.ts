import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RetryApiDc } from 'app/sk-buisness-lead/interface/retry-api-dc';
import { SkBuisnessLoanService } from 'app/sk-buisness-lead/services/sk-buisness-loan.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-skbuisness-sequence',
  templateUrl: './skbuisness-sequence.component.html',
  styleUrls: ['./skbuisness-sequence.component.scss']
})
export class SKBuisnessSequenceComponent implements OnInit {
@Input() Id : number;
rowData : any;
@Output() closeManually: EventEmitter<void> = new EventEmitter<void>();
@Output() closepopeup: EventEmitter<void> = new EventEmitter<void>();
SequenceName: any = 'Offer Task';
sequenceData : any;
isSearch : boolean = true;
isOpenBackgroundRun : boolean = false;
blocked : boolean = false;
retryApiDc: RetryApiDc;
isFrontUpload : boolean = false;
isBackUpload : boolean = false;
isReload : boolean = false;
loanDetail : any;
isLoanOffer : boolean = false;
isEmendet : boolean = false;
isEAgreement : boolean = false;
isPageReload : boolean = false;
isBuisnessInfo : boolean = false;
isActivityhistory : boolean = false;
  constructor(private _skBuisnessLoanService : SkBuisnessLoanService,
              private confirmationService : ConfirmationService,
              private route : ActivatedRoute,private messageService: MessageService) { }
  ngOnInit() {
    this.Id = Number(this.route.snapshot.paramMap.get("Id"));
    debugger;
    window.scroll(0, 0);
    this.blocked = true;
    this.isPageReload = true;
    this.RejectDoc = this.RejectDoc == undefined ? '' : this.RejectDoc;
    console.log(this.RejectDoc,'dasdad');
    this.getCustomerPageData() 
    
    this.blocked = true;
    this._skBuisnessLoanService.getLeadDetailsData(this.Id).subscribe(x=>
      {
        debugger;
        this.blocked = false;
        this.sequenceData = x;
        console.log("Main DAta",x);        
      })
      // this.getBackgroundDetail();
      this.onTabChangeLoanDetail(this.Id);
  }
  displayLoan:any
  
  generateLoan(){
    this.displayLoan=true;
  }

  getCustomerPageData(){
    this._skBuisnessLoanService.getCustomerPageData(this.Id).subscribe(res=>{
      this.blocked = false;
      this.rowData = res;
      console.log("customerpagedata",this.rowData);
    })
  }
  
  onTabChange(event) { //
    debugger;
    console.log(event);
    this.isVerified=true;
    this.isLoanOffer = false;
    this.isEmendet=false;
    this.isEAgreement=false;  
    this.isActivityhistory=false; 
this.isPageReload = true;
    if(this.isReload)
    {
      event.index == 7;
      event == 7
    }
    if (event.index == 0 || event == 0) {
      this.isVerified=false;
      this.SequenceName = 'PAN';
      this.Search();
    }else if (event.index == 1 || event == 1) {
      this.isVerified=false;
      this.SequenceName = 'Selfie';
      this.Search();
    }else if (event.index == 2 || event == 2) {
      this.isVerified=false;
      this.isFrontUpload = false;
      this.isBackUpload = false;      
      this.SequenceName = 'Aadhar Card Detail';
      this.Search();
    }
    // else if (event.index == 2) {
    //   this.isVerified=false;
    //   this.SequenceName = 'Aadhar Verification';
    //   this.Search();
    // }
    else if (event.index == 3 || this.indexNo == 3) {
      this.isVerified=false;
      // this.handleClose(event);
      this.SequenceName = 'Personal Info';
      this.Search();
    }
    // else if (event.index == 4) {
    //   this.SequenceName = 'Phone Verification';
    //   this.Search();
    // }
    else if (event.index == 6 || event == 6) {
      this.isVerified=false;
      this.SequenceName = 'MSME Cerrificate';
      this.Search();
    }
    else if (event.index == 5 || event == 5) {
      this.isVerified=false;
      this.SequenceName = 'Bank Detail';
      this.Search();
    }
    else if (event.index == 4 || event == 4) {
      this.isVerified=false;
      this.isBuisnessInfo = true;
      this.SequenceName = 'Buisness Info';
      this.Search();
    }
    // else if (event.index == 8) {
    //   this.isVerified=false;
    //   this.SequenceName = 'EAgreement';
    //   this.Search();
    // }
    // else if (event.index == 9) {
    //   this.isVerified=false;
    //   this.SequenceName = 'LoanOfferRepaymentSchedule';
    //   this.Search();
    // }
    else if (event.index == 7 || event == 7) {
      this.isVerified=false;
      this.isPageReload = false;
      this.SequenceName = 'Approve Or Reject';
      this.Search();
    }

    else if (event.index == 8 || event == 8) {
      this.isVerified=false;
      this.isLoanOffer = true;
      this.SequenceName = 'Loan Offer Repayment Schedule';
      this.Search();
    }
    else if (event.index == 9 || event == 9) {
      debugger
      this.isVerified=false;
      this.isEAgreement=true
      this.SequenceName = 'EAgreement';
      this.Search();
    }
    else if (event.index == 10 || event == 10) {
      this.isVerified=false;
      this.isEmendet=true
      this.SequenceName = 'Emandet';
      this.Search();
    }
    else if (event.index == 11 || event == 11) {
      debugger
      this.isActivityhistory=true
      this.SequenceName = 'Activity Histroy';
      this.Search();
    }
  }
  Search()
  {

  }
  onBack()
  {
    this.closeManually.emit();
  }
  onReload()
  {
    debugger;
    this.isReload = true;
    this.ngOnInit();
  }
  handleClose(e) {
    // if(condition)
        e.close();
 }
  toggleSearch() {
    if (this.isSearch == true) {
      this.isSearch = false;
    } else{
      this.isSearch = true;    
    }
  }
  toggleBackgroundSearch() {
    if (this.isOpenBackgroundRun == true) {
      this.isOpenBackgroundRun = false;
    } else{
      this.getBackgroundDetail();
      this.isOpenBackgroundRun = true;    
    }
  }

  leadHistoryData:any=[]
  onHistory(data){
    debugger
    
    // this.blocked = true;
    // //long Leadmasterid, long sequenceNo, long? ActivityMasterId, string ActivityName, string Comments
    // this._skBuisnessLoanService.GetleadHistory(this.Id,data.SequenceNo,).subscribe(x=>
    //   {
    //     debugger;
    //     this.blocked = false;
    //     this.leadHistoryData
    //   })
  }
  isVerified : boolean = false;
  onApproved(event)
  {
    debugger;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to approve?',
      accept: () => { 
        this.blocked = true;
        let payload={
          "DocumentName":event.DocumentName,
          "LeadmasterId":this.Id,
          "isApprove":true,
          "SequenceNo":event.SequenceNo,
          "Comment":''
        }
        this._skBuisnessLoanService.verifyUploadedDocument(payload).subscribe(x=>{
          debugger;
          this.blocked = false;
          if(x.Status)
          {
            debugger;
            // alert(x.Msg);
            this.messageService.add({ severity: 'success', summary: x.Msg, detail: '' });

            this.blocked = true;
            this._skBuisnessLoanService.getVerifiedDocumentStatus(event.SequenceNo,this.Id).subscribe(res=>
              {
                debugger;
                this.blocked = false;
                if(res.Status)
                {
                  this.isVerified = res.Msg == 'Verified Successfully' ? true : false;
                  this.isRejected = res.Msg == 'Rejected Successfully' ? true : false;
                  if(this.isVerified){
                    for (const key in this.sequenceData) {
                      console.log(key);
                      console.log(this.sequenceData[key]); 
                      
                      let filtered =this.sequenceData[key].filter(x => x.DocumentName===event.DocumentName)
                      if(filtered.length>0){ 
                        filtered[0].IsComplete =true;
                        filtered[0].IsApprove =1;
                      }
                    }
                  }
                }else{
                  this.isRejected = false;
                  this.isVerified = false;
                }
                
              })
          }else{
            // alert(x.Msg);
            debugger;
            this.messageService.add({ severity: 'error', summary: x.Msg, detail: '' });
          }
        })
      }
    });
  }
  loanPosted:boolean=false
  IsloanPosted(value){
    console.log(value)
    this.loanPosted=value
  }
  isRejected : boolean = false;
  RejectDoc : any;
  indexNo : number;
  onReject(event)
  {
    debugger;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to reject?',
      accept: () => { 
        this.blocked = true;
        this._skBuisnessLoanService.verifyUploadedDocument(event).subscribe(x=>{
          this.blocked = false;
          if(x.Status)
          {
            this.messageService.add({ severity: 'success', summary: x.Msg, detail: '' }); 
            this.blocked = true;
            this._skBuisnessLoanService.getVerifiedDocumentStatus(event.SequenceNo,this.Id).subscribe(res=>
              {
                debugger;
                this.blocked = false;
                if(res.Status)
                {
                  this.isVerified = res.Msg == 'Verified Successfully' ? true : false;
                  this.isRejected = res.Msg == 'Rejected Successfully' ? true : false;

                  if(this.isRejected){
                    for (const key in this.sequenceData) {
                      console.log(key);
                      console.log(this.sequenceData[key]); 
                      
                      if(event.DocumentName == 'MSME')
                      {
                        event.DocumentName = 'udyam_reg_cert';
                      }
                      else if(event.DocumentName == 'BankDetail')
                      {
                        event.DocumentName == 'bank_stmnts';
                      }                    
                      else if(event.DocumentName == 'AadharCard')
                      {
                        event.DocumentName == 'bank_stmnts';//aadharcard
                      }
                      else if(event.DocumentName == 'PanCard')
                      {
                        event.DocumentName == 'pan_card';
                      }
                      
                      let filtered =this.sequenceData[key].filter(x => x.DocumentName===event.DocumentName)
                      if(filtered.length>0){ 
                        filtered[0].IsComplete =false;
                        filtered[0].IsApprove =2;
                        if(event.isFinalSelectedDocument)
                        {
                          this.RejectDoc = event.DocumentName;
                          this.indexNo = 7;
                          if(event.DocumentName == 'PanCard' ) this.indexNo=0
                          else if(event.DocumentName == 'selfie' ) this.indexNo=1
                          else if(event.DocumentName == 'AadharCard' ) this.indexNo=2
                          else if(event.DocumentName == 'PersonalDetail' ) this.indexNo=3
                          else if(event.DocumentName == 'BusinessDetail' ) this.indexNo=4
                          else if(event.DocumentName == 'BankDetail' ) this.indexNo=5
                          else if(event.DocumentName == 'MSME' ) this.indexNo=6;
                          this.onTabChange(event);
                        }
                        return
                      }
                    }
                  }
    
                }else{
                  this.isRejected = false;
                  this.isVerified = false;
                }
                
              })
          }else{
            // alert(x.Msg);
            debugger;
            this.messageService.add({ severity: 'error', summary: x.Msg, detail: '' });
          }
        })
      }
    });
  }
  backgroundRunAPIList : any;
  getBackgroundDetail()
  {
    debugger;
    this.blocked = true;
    this._skBuisnessLoanService.getLeadBackgroundRuns(this.Id).subscribe(x=>
      {
        debugger;
        this.blocked = false;
        this.isOpenBackgroundRun= true;
        this.backgroundRunAPIList = x.Data;
        console.log('backgroundRunAPIData',this.backgroundRunAPIList);
        
      })
  }
  isOpenJsonPopup : boolean = false;
  isReq : boolean = false;
  isResp : boolean = false;
  jsonData : any;
  onOpenReqJson(ir,ReqJson)
  {
    this.isReq = true;
    this.isResp = false;
    debugger;
    if(ir.JsonType == 'Request')
    {
      this.jsonData = JSON.parse(ReqJson);
    }
    this.isOpenJsonPopup = true;
  }
  onOpenResJson(ir,ResJson)
  {
    this.isReq = false;
    this.isResp = true;
    // ResJson = '{"pan_number":"ATDPY6869M","first_name":"DEEPAK","middle_name":"","last_name":"YADAV","pan_holder_title":"Shri","pan_last_updated":"22/08/2017","name_on_card":"DEEPAK YADAV","seeding_status":"Y","pan_status":"E","status":"Success","msg":"Existing and Valid"}'
    debugger;
    console.log('list',ResJson[0]);
    
    if(ir.JsonType == 'Response')
    {
      this.jsonData = JSON.parse(ResJson);
    }
    
    // // Get Table headers and print
    // for (var k = 0; k < Object.keys(ResJson[0]).length; k++) {
    //   $('#table_head').append('<td>' + Object.keys(ResJson[0])[k] + '</td>');
    // }
    //   let obj = [];
    // // Get table body and print
    // for (var i = 0; i < Object.keys(ResJson).length; i++) {
    //   $('#table_content').append('<tr>');
    //   for (var j = 0; j < Object.keys(ResJson[0]).length; j++) {
    //     $('#table_content').append('<td>' + ResJson[i][Object.keys(ResJson[0])[j]] + '</td>');
    //   }
    //   $('#table_content').append('</tr>');
    //   // obj.push()
    // }
    this.isOpenJsonPopup = true;
  }
  onClickRetry(ir)
  {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Retry?',
      accept: () => { 
        this.retryApiDc = {
          ApiName : ir.ArthmateActivityMastersApiName,
          LeadMasterId : this.Id,
          start_date : null,
          end_date : null
        }
        this.blocked = true;
        this._skBuisnessLoanService.postRetryApi(this.retryApiDc).subscribe(x=>{
          debugger;
          this.blocked = false;
          if(x.Status)
          {
            debugger;
            this.messageService.add({ severity: 'sucsess', summary: x.Msg, detail: '' });
          }else{
            this.messageService.add({ severity: 'error', summary: x.Msg ? x.Msg : 'Something Went Wrong!!', detail: '' });
          }
        })
      }
    });
  }
  scrollableCols:any
  loanDetails:any=[]
  LeadDetailheader:any = []
  onTabChangeLoanDetail(leadId)
  {
    debugger;
    this._skBuisnessLoanService.getLoanDetail(leadId).subscribe(x=>{
      if(x.Status)
      {        
        console.log(x);
        debugger;
        this.loanDetail=x.Data
        console.log(this.loanDetail,"loanDetail");
        
        // let header: string[] = [];
        // this.abc = []
        this.loanDetails.push(this.loanDetail)
        console.log(this.loanDetails);
        
        this.loanDetails.forEach((value) => {  
          Object.keys(value).forEach((key) => {
            if(!this.LeadDetailheader.find((header) => header == key)){
              this.LeadDetailheader.push(key)
              console.log("headers",this.LeadDetailheader);
            }
          })
        })   
           }
        else{
          this.messageService.add({ severity: 'warning', summary: "Data Not Found", detail: '' });
        }
      });
      
      // console.log("this.loanDetail = ",this.loanDetail);
      
    // })
  }
  onRefreshParent()
  {
    this.ngOnInit();
  } 
}
