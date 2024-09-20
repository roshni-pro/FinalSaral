import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SkBuisnessLoanService } from 'app/sk-buisness-lead/services/sk-buisness-loan.service';
import { environment } from 'environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-msme-certification',
  templateUrl: './msme-certification.component.html',
  styleUrls: ['./msme-certification.component.scss']
})
export class MsmeCertificationComponent implements OnInit {
@Input() MsMeDataDcs : any;
@Input() LeadMasterId : number;
@Output() onApproveMSME: EventEmitter<any> = new EventEmitter<any>();
@Output() onRejectMSME: EventEmitter<any> = new EventEmitter<any>();
@Output() OnhistoryClick: EventEmitter<any> = new EventEmitter<any>();
  baseURL: any;
  @Input() isVerified : boolean = false;
  @Input() isRejected : boolean = false;
  blocked : boolean = false;
  @Input() rowData : any;
  isRejectDoc : boolean = false;
  @Input() loanPosted : boolean = false;
  
Comment : any;
  constructor(private _skBuisnessLoanService : SkBuisnessLoanService,private messageService: MessageService) {
    this.baseURL = environment.apiURL;
   }

  ngOnInit() {
    if(this.MsMeDataDcs != null)
    {
      this.blocked = true;
    this._skBuisnessLoanService.getVerifiedDocumentStatus(this.MsMeDataDcs.SequenceNo,this.LeadMasterId).subscribe(res=>
      {
        this.blocked = false;
        if(res.Status)
        {
          this.isVerified = res.Msg == 'Verified Successfully' ? true : false;
          this.isRejected = res.Msg == 'Rejected Successfully' ? true : false;
        }else{
          this.isRejected = false;
          this.isVerified = false;
        }
        this.Comment=''; 
      })
    }
  }
  Onhistory(){
    this.OnhistoryClick.emit(true)
  }
  isUpload : boolean = false;
  onUploadFrontimage(imagePath: any) {
    if (imagePath) {
      this.isUpload = true;
      this.MsMeDataDcs.FrontFileUrl = imagePath;
    }
  }
  // onUploadBackimage(imagePath: any) {
  //   if (imagePath) {
  //     this.MsMeDataDcs.BackFileUrl = imagePath;
  //   }
  // }
  onApproved()
  {
   this.onApproveMSME.emit(this.MsMeDataDcs);
   this.ngOnInit();
  }
  // onReject()
  // {
  //   this.onRejectMSME.emit(this.MsMeDataDcs);
  // }
  onReject()
{
  debugger;
  if(this.Comment && this.Comment.length > 3)
  {
  this.isRejectDoc = false;
  let payload={
    "DocumentName":this.MsMeDataDcs.DocumentName,
    "LeadmasterId":this.LeadMasterId,
    "isApprove":false,
    "SequenceNo":this.MsMeDataDcs.SequenceNo,
    "Comment":this.Comment
  }
  this.onRejectMSME.emit(payload);
  this.ngOnInit();
  }else{
    if(this.Comment && this.Comment.length > 0)
    {
      this.messageService.add({ severity: 'error', summary: 'Comment Should be Atleast more then 3 char!', detail: '' }); 
    }else{
      this.messageService.add({ severity: 'error', summary: 'Please Enter Comment', detail: '' }); 
    }
  }
}

onRejectDoc()
{
  this.Comment=''; 
  this.isRejectDoc = true;
}

  OpenPdf()
  {
    window.open(this.baseURL + '' + this.MsMeDataDcs.FrontFileUrl);
  }
  isValid : boolean = false;
  onClickPostArthmate()
  {
    this.blocked = true;
    this._skBuisnessLoanService.docPostArthmate(this.LeadMasterId,'udyam_reg_cert').subscribe(x=>
      {
        this.blocked = false;
        if(x.Status)
        {
          this.isValid = true;
        }
        else{
          this.isValid = false;
        }
      })
  }
  onUpdate()
  {
    this.blocked = true;
    this._skBuisnessLoanService.updateDocument(this.MsMeDataDcs.DocumentName,this.LeadMasterId,this.MsMeDataDcs.FrontFileUrl,null).subscribe(res=>{
      console.log('Upload Doc :',res);
      this.blocked = false;
      this.isUpload = false;
      alert(res.Msg);
    });
  }

}
