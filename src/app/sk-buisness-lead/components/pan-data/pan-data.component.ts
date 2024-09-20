import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SkBuisnessLoanService } from 'app/sk-buisness-lead/services/sk-buisness-loan.service';
import { environment } from 'environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-pan-data',
  templateUrl: './pan-data.component.html',
  styleUrls: ['./pan-data.component.scss']
})
export class PanDataComponent implements OnInit {
@Input() panDetailsDc : any;
@Input() Id : any;
@Output() onApprovePANInfo: EventEmitter<any> = new EventEmitter<any>();
@Output() onRejectPANInfo: EventEmitter<any> = new EventEmitter<any>();
@Output() OnhistoryClick: EventEmitter<any> = new EventEmitter<any>();
baseURL: any;
blocked : boolean = false;
isRejectDoc : boolean = false;
Comment : any;
fathersname:any
@Input() isVerified : boolean = false;
@Input() isRejected : boolean = false;
@Input() loanPosted : boolean = false;
constructor(private _skBuisnessLoanService : SkBuisnessLoanService,private messageService: MessageService) {
  this.baseURL = environment.apiURL;
 }
  ngOnInit() {
    this.isVerified = false;
    if(this.panDetailsDc)
    {
      this.panDetailsDc.OtherInfo
      var panJson= this.panDetailsDc.OtherInfo
        var json=JSON.parse(panJson)
        this.fathersname=json.fathers_name

      this.blocked = true;
      this._skBuisnessLoanService.getVerifiedDocumentStatus(this.panDetailsDc.SequenceNo,this.Id).subscribe(res=>
        {
          debugger;
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
  onUploadbackimage(imagePath: any) {
    if (imagePath) {
      this.panDetailsDc.FrontFileUrl = imagePath;
    }
  }
  onUploadSelfieimage(imagePath: any) {
    if (imagePath) {
      this.panDetailsDc.Selfie = imagePath;
    }
  }
  Onhistory(){
    this.OnhistoryClick.emit(this.panDetailsDc)
  }
  onApproved()
  {
   this.onApprovePANInfo.emit(this.panDetailsDc);
   this.ngOnInit();
  }
  isopenPopup : boolean = false;
  Img : any;
  openImg(PanImage) {
    this.isopenPopup = true;
    this.Img = this.baseURL + PanImage;
  }
  isValid : boolean = false;
  onClickPostArthmate()
  {
    this.blocked = true;
    this._skBuisnessLoanService.docPostArthmate(this.Id,'pan_card').subscribe(x=>
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
  onReject()
  {
    if(this.Comment && this.Comment.length > 3)
  {
    this.isRejectDoc = false;
    let payload={
      "DocumentName":this.panDetailsDc.DocumentName,
      "LeadmasterId":this.Id,
      "isApprove":false,
      "SequenceNo":this.panDetailsDc.SequenceNo,
      "Comment":this.Comment
    }
    this.onRejectPANInfo.emit(payload);
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


}
