import { Component,EventEmitter, Input, OnInit,Output } from '@angular/core';
import { Router } from '@angular/router';
import { SkBuisnessLoanService } from 'app/sk-buisness-lead/services/sk-buisness-loan.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loan-offer-repayment-schedule',
  templateUrl: './loan-offer-repayment-schedule.component.html',
  styleUrls: ['./loan-offer-repayment-schedule.component.scss']
})
export class LoanOfferRepaymentScheduleComponent implements OnInit {

  constructor(private _skBuisnessLoanService : SkBuisnessLoanService,private router: Router,
    private messageService: MessageService,private confirmationService : ConfirmationService) {  
      this.baseURL = environment.apiURL;
      this.statuslist=[
        {name:'kyc data approved',value:'kyc_data_approved'},
        // {name:'credit approved',value:'credit_approved'},
        // {name:'disbursal approved',value:'disbursal_approved'}
      ]
    }
  @Input() LeadMasterId : number;
statuslist:any=[]
  baseURL: any;
  selectedstatus:any
  blocked : boolean = false;
  @Input() rowData : any;
  isRejectDoc : boolean = false;
  Comment : any;
  Disbursementdetails:any=[]
  @Output() refreshParent = new EventEmitter();
  ngOnInit() {
    debugger;
   
    this.GetLoanByLoanIdcall();
    this.GetLoanRepaymentScheduleDetails();
    this.GetofferInformation();
    debugger;
  }



  RepaymentScheduleDataList:any;
  offerInformationDetails:any
  offerInformationData:any[]=[];
  slaDocs:any
  GetLoanRepaymentScheduleDetails(){
    debugger;
    if (this.LeadMasterId>0) {
      debugger;
       this.blocked = true;
      this._skBuisnessLoanService.RepaymentScheduleData(this.LeadMasterId).subscribe(x=>
      {
        this.blocked = false;
        if(x.Status){
          this.RepaymentScheduleDataList=x.Data.data.rows;
          // if(this.RepaymentScheduleDataList.lenght==0)  {
          //   document.body.scrollTop = 0;
          //   document.documentElement.scrollTop = 0;
          //   this.messageService.add({ severity: 'error', summary: 'Data not found!' , detail: '' });
          // }
          //console.log('pageData',this.RepaymentScheduleDataList);
        }
      })
    }
  }
  isopenPopup:boolean=false
  Disbursementdata(){
    if (this.LeadMasterId>0) {
      debugger;
       this.blocked = true;
      this._skBuisnessLoanService.CompositeDisbursement(this.LeadMasterId).subscribe(x=>
      {
        this.blocked = false;        
        if(x.Status){
          debugger;
          this.messageService.add({ severity: 'success', summary: x.Msg, detail: '' });
          this.isopenPopup=true
          this.Disbursementdetails.push(x.Data);
          console.log('Disbursementdetails',this.Disbursementdetails);
        }else{
          this.messageService.add({ severity: 'error', summary: x.Msg, detail: '' });
        }
      })
    }
  }
  GetLoanByLoanIdcall(){
    debugger;
    if (this.LeadMasterId>0) {
      debugger;
      this._skBuisnessLoanService.GetLoanByLoanId(this.LeadMasterId).subscribe(x=>
      {
        if(x){}
      })
    }
  }
  GetofferInformation(){
    if (this.LeadMasterId>0) {
      debugger;
       this.blocked = true;
      this._skBuisnessLoanService.offerInformation(this.LeadMasterId).subscribe(x=>
      {
        debugger;
        this.blocked = false;
        if(x.length>0){
          this.offerInformationDetails=x[0];
          this.offerInformationData.push(x[0]);
          console.log('offer',this.offerInformationDetails);
        }else{
          this.offerInformationDetails = []
        }
        // else{
        //   this.messageService.add({ severity: 'error', summary: 'data not found' , detail: '' });
        // }
      })
    }
  }

  kycapproval(){
    if(this.selectedstatus!=undefined){
      this.confirmationService.confirm({
        message: 'Are you sure that you want to approve for kyc?',
        accept: () => { 
          this.blocked = true;
          this._skBuisnessLoanService.kycstausApprove(this.LeadMasterId,this.selectedstatus.value).subscribe(x=>{
            debugger;
            this.blocked = false;
            if(x.Status)
            {
              // alert(x.Msg);
              this.messageService.add({ severity: 'success', summary: x.Msg, detail: '' });
            }else{
              // alert(x.Msg);
              this.messageService.add({ severity: 'error', summary: x.Msg, detail: '' });
            }
          })
        }
      });
    }
    else{
      this.messageService.add({ severity: 'error', summary: 'select status first', detail: '' });
      this.refreshParent.emit();
    }

  }

}




