import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SkBuisnessLoanService } from 'app/sk-buisness-lead/services/sk-buisness-loan.service';
import { environment } from 'environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-selfie-image',
  templateUrl: './selfie-image.component.html',
  styleUrls: ['./selfie-image.component.scss']
})
export class SelfieImageComponent implements OnInit {
@Input() selfieDetailsDcs : any;
@Input() Id : any;
@Output() onApprovedSelfie: EventEmitter<any> = new EventEmitter<any>();
@Output() onRejectSelfie: EventEmitter<any> = new EventEmitter<any>();
@Output() OnhistoryClick: EventEmitter<any> = new EventEmitter<any>();
baseURL: any;
@Input() isVerified : boolean = false;
@Input() isRejected : boolean = false;
blocked : boolean = false;
@Input() rowData : any;
isRejectDoc : boolean = false;
@Input() loanPosted : boolean = false;
Comment : any;
constructor(private _skBuisnessLoanService: SkBuisnessLoanService,private messageService: MessageService) {
  this.baseURL = environment.apiURL;
 }

ngOnInit() {
  this.isVerified = false;
  if(this.selfieDetailsDcs)
  {
    this.blocked = true;
    debugger;
    this._skBuisnessLoanService.getVerifiedDocumentStatus(this.selfieDetailsDcs.SequenceNo,this.Id).subscribe(res=>
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
onUploadSelfieimage(imagePath: any) {
  debugger;
  if (imagePath) {
    this.isUpload = true;
    this.selfieDetailsDcs.FrontFileUrl =imagePath;
  }
}
onApproved()
{
 this.onApprovedSelfie.emit(this.selfieDetailsDcs);
 this.ngOnInit();
}
onReject()
{
  debugger;
  if(this.Comment && this.Comment.length > 3)
  {
  this.isRejectDoc = false;
  let payload={
    "DocumentName":this.selfieDetailsDcs.DocumentName,
    "LeadmasterId":this.Id,
    "isApprove":false,
    "SequenceNo":this.selfieDetailsDcs.SequenceNo,
    "Comment":this.Comment
  }
  this.onRejectSelfie.emit(payload);
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
isValid : boolean = false;
onClickPostArthmate()
{
  this.blocked = true;
  this._skBuisnessLoanService.docPostArthmate(this.Id,'selfie').subscribe(x=>
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
isopenPopup : boolean = false;
Img : any;
openImg(SelfieImage) {
  this.Img = this.baseURL + SelfieImage;
  this.isopenPopup = true;
}
onUpdate()
  {
    this.blocked = true;
    this._skBuisnessLoanService.updateDocument(this.selfieDetailsDcs.DocumentName,this.Id,this.selfieDetailsDcs.FrontFileUrl,null).subscribe(res=>{
      console.log('Upload Doc :',res);
      this.blocked = false;
      this.isUpload = false;
      alert(res.Msg);
    });
  }

}
