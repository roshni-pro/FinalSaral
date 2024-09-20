import { Component, OnInit } from '@angular/core';
import { TradeCustomerService } from 'app/shared/services/trade-customer.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  data: any;
  blocked:boolean;
  GetReferralText:any;
  constructor(private TradeCustomerService: TradeCustomerService,private messageService:MessageService) { this.data = {}; }

  ngOnInit() {
    this.data.text = null;
    this.TradeCustomerService.getReferralText().subscribe(result=> {
      this.GetReferralText=result;
    })
  }

  onSave(data) {
    this.blocked=true;
    this.TradeCustomerService.saveReferralText(data.text).subscribe(x => {
      this.blocked=false;
      if (x == true) {
        this.messageService.add({ severity: 'Sucess', summary: 'Update Sucessfully !!', detail: '' });
        this.ngOnInit();
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Update failed!plz,try again!!', detail: '' });
        this.ngOnInit();
      }
    })
  }

}
