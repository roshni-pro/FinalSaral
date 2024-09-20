import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SkBuisnessLoanService } from 'app/sk-buisness-lead/services/sk-buisness-loan.service';
import { environment } from 'environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-aadhar-card-detail',
  templateUrl: './aadhar-card-detail.component.html',
  styleUrls: ['./aadhar-card-detail.component.scss']
})
export class AadharCardDetailComponent implements OnInit {
@Input() AadharDetailDcs : any;
@Input() Id : any;
@Output() onApproveAadhar: EventEmitter<any> = new EventEmitter<any>();
@Output() onRejectAadhar: EventEmitter<any> = new EventEmitter<any>();
@Output() OnhistoryClick: EventEmitter<any> = new EventEmitter<any>();
@Input() isVerified : boolean = false;
@Input() isRejected : boolean = false;
baseURL: any;
@Input() isFrontUpload : boolean = false;
@Input() isBackUpload : boolean = false;
@Input() loanPosted : boolean = false;
blocked : boolean = false;
@Input() rowData : any;
isRejectDoc : boolean = false;
Comment : any;
constructor(private _skBuisnessLoanService : SkBuisnessLoanService,private messageService: MessageService) {
  this.baseURL = environment.apiURL;
 }

  ngOnInit() {
    debugger;
    this.isVerified = false;
    if(this.AadharDetailDcs)
    {
      this.blocked = true;
      this._skBuisnessLoanService.getVerifiedDocumentStatus(this.AadharDetailDcs.SequenceNo,this.Id).subscribe(res=>
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
          }this.Comment=''; 
          
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
      this.isFrontUpload = false;
      this.AadharDetailDcs.FrontFileUrl = imagePath;
    }
  }
  onUploadBackimage(imagePath: any) {
    if (imagePath) {
      this.isUpload = true;
      this.isBackUpload = false;
      this.AadharDetailDcs.BackFileUrl = imagePath;
    }
  }
  onApproved()
  {
   this.onApproveAadhar.emit(this.AadharDetailDcs);
   this.ngOnInit();
  }
  onReject()
  {
    if(this.Comment && this.Comment.length > 3)
    {
    this.isRejectDoc = false;
    let payload={
      "DocumentName":this.AadharDetailDcs.DocumentName,
      "LeadmasterId":this.Id,
      "isApprove":false,
      "SequenceNo":this.AadharDetailDcs.SequenceNo,
      "Comment":this.Comment
    }
    this.onRejectAadhar.emit(payload);
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
    this._skBuisnessLoanService.docPostArthmate(this.Id,'aadhar_card').subscribe(x=>
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

  onClickFrontUpload()
  {
    this.isFrontUpload = true;
  }
  onClickBackUpload()
  {
    debugger;
    this.isBackUpload = true;
  }
  isopenPopup : boolean = false;
  Img : any;
  title : any;
  openImg(AadharImage,titleName) {
    this.title = titleName == 'BackFileUrl' ? 'Back Image' : 'Front Image';
    this.Img = this.baseURL + AadharImage;
    this.isopenPopup = true;
  }
  onUpdate()
  {
    this.blocked = true;
    this._skBuisnessLoanService.updateDocument(this.AadharDetailDcs.DocumentName,this.Id,this.AadharDetailDcs.FrontFileUrl,this.AadharDetailDcs.BackFileUrl).subscribe(res=>{
      console.log('Upload Doc :',res);
      this.blocked = false;
      alert(res.Msg);
    });
  }
}
