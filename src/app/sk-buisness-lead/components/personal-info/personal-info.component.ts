import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SkBuisnessLoanService } from 'app/sk-buisness-lead/services/sk-buisness-loan.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
@Input() customerPersonalSDetailsDc : any;
@Input() isVerified : boolean = false;
@Input() isRejected : boolean = false;
@Input() LeadMasterId : number;
@Output() onApprovePersonalInfo: EventEmitter<any> = new EventEmitter<any>();
@Output() onRejectPersonalInfo: EventEmitter<any> = new EventEmitter<any>();
@Output() OnhistoryClick: EventEmitter<any> = new EventEmitter<any>();
blocked : boolean = false;
@Input() rowData : any;
isRejectDoc : boolean = false;
@Input() loanPosted : boolean = false;
Comment : any;
constructor(private _skBuisnessLoanService : SkBuisnessLoanService,private messageService: MessageService) { }

ngOnInit() {
  this.isVerified = false;
  if(this.customerPersonalSDetailsDc != null)
  {
    this.blocked = true;
  this._skBuisnessLoanService.getVerifiedDocumentStatus(this.customerPersonalSDetailsDc.SequenceNo,this.LeadMasterId).subscribe(x=>
    {
      this.blocked = false;
      if(x.Status)
      {
        this.isVerified = x.Msg == 'Verified Successfully' ? true : false;
        this.isRejected = x.Msg == 'Rejected Successfully' ? true : false;
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
  onApproved()
  {
   this.onApprovePersonalInfo.emit(this.customerPersonalSDetailsDc);
   this.ngOnInit();
  }
  onReject()
  {
    if(this.Comment && this.Comment.length > 3)
  {
    this.isRejectDoc = false;
    let payload={
      "DocumentName":this.customerPersonalSDetailsDc.DocumentName,
      "LeadmasterId":this.LeadMasterId,
      "isApprove":false,
      "SequenceNo":this.customerPersonalSDetailsDc.SequenceNo,
      "Comment":this.Comment
    }
    this.onRejectPersonalInfo.emit(payload);
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
