import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SkBuisnessLoanService } from 'app/sk-buisness-lead/services/sk-buisness-loan.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-buisness-info',
  templateUrl: './buisness-info.component.html',
  styleUrls: ['./buisness-info.component.scss']
})
export class BuisnessInfoComponent implements OnInit {
@Input() businessDetailDc : any;
@Input() isVerified : boolean = false;
@Input() isRejected : boolean = false;
@Input() LeadMasterId : number;
@Output() onApproveBuisnessInfo: EventEmitter<any> = new EventEmitter<any>();
@Output() onRejectBuisnessInfo: EventEmitter<any> = new EventEmitter<any>();
@Output() OnhistoryClick: EventEmitter<any> = new EventEmitter<any>();
blocked : boolean = false;
@Input() rowData : any;
@Input() loanPosted : boolean = false;

isRejectDoc : boolean = false;
Comment : any;
  constructor(private _skBuisnessLoanService : SkBuisnessLoanService,private messageService: MessageService) { }

  ngOnInit() {
    this.isVerified = false;
    if(this.businessDetailDc != null)
    {
      debugger;
      this.blocked = true;
    this._skBuisnessLoanService.getVerifiedDocumentStatus(this.businessDetailDc.SequenceNo,this.LeadMasterId).subscribe(x=>
      {
        console.log('isverified:',x);
        this.blocked = false;
        if(x.Status)
        {
          this.isVerified = x.Msg == 'Verified Successfully' ? true : false;
          this.isRejected = x.Msg == 'Rejected Successfully' ? true : false;
        }else{
          this.isRejected = false;
          this.isVerified = false;
        }      
      })
    }
  }
  Onhistory(){
    this.OnhistoryClick.emit(true)
  }
  onApproved()
  {
   this.onApproveBuisnessInfo.emit(this.businessDetailDc);
   debugger;
   this.ngOnInit();
  }

  onReject()
  {
    debugger;
    if(this.Comment && this.Comment.length > 3)
    {
    this.isRejectDoc = false;
    let payload={
      "DocumentName":this.businessDetailDc.DocumentName,
      "LeadmasterId":this.LeadMasterId,
      "isApprove":false,
      "SequenceNo":this.businessDetailDc.SequenceNo,
      "Comment":this.Comment
    }
    debugger;
    this.onRejectBuisnessInfo.emit(payload);
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
