import { Component, OnInit,Input } from '@angular/core';
import { SkBuisnessLoanService } from 'app/sk-buisness-lead/services/sk-buisness-loan.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-emandet-details',
  templateUrl: './emandet-details.component.html',
  styleUrls: ['./emandet-details.component.scss']
})
export class EmandetDetailsComponent implements OnInit {

  constructor(private _skBuisnessLoanService : SkBuisnessLoanService,private messageService: MessageService) { }
  @Input() LeadMasterId : number;
  ngOnInit() {
    debugger
    this.GetofferInformation()
  }
  blocked:boolean=false
  offerInformationDetails:any
  previousUMRN:any
  save(){
    if (this.LeadMasterId>0 && this.UMRN) {
      debugger;
       this.blocked = true;
      this._skBuisnessLoanService.LoanNachUmrn(this.LeadMasterId,this.UMRN).subscribe(x=>
      {
        this.blocked = false;
        console.log(x)
        if(x.Status){
        
          debugger;
          this.messageService.add({ severity: 'sucsess', summary: x.Msg , detail: '' });
          this.GetofferInformation();
        }
        else{
          this.messageService.add({ severity: 'error', summary: x.Msg , detail: '' });
        }
      })
    }
    else{
      this.messageService.add({ severity: 'error', summary: 'please enter umrn number' , detail: '' });
    }
  }

  UMRN:any

  updateUmrnFlag: boolean = false;
    checkUMRN(UMRN) {
      console.log(UMRN)

    }
    falseUMRN:boolean=false
    UMRNLength(event)
    {
        if(this.UMRN && this.UMRN.length > 10)
        {
            this.falseUMRN=false
        }
        else{
            this.falseUMRN=true
        }
    }
    GetofferInformation(){
      if (this.LeadMasterId>0) {
         this.blocked = true;
        this._skBuisnessLoanService.offerInformation(this.LeadMasterId).subscribe(x=>
        {
          this.blocked = false;
          if(x){
            this.offerInformationDetails=x;
            this.previousUMRN=this.offerInformationDetails[0].UMRN?this.offerInformationDetails[0].UMRN:null;
          }
          // else{
          //   this.messageService.add({ severity: 'error', summary: 'data not found' , detail: '' });
          // }
        })
      }
    }
}
