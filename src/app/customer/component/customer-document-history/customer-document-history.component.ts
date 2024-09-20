import { Component, OnInit,Input } from '@angular/core';
import { CustomerService } from 'app/shared/services/customer.service';

@Component({
  selector: 'app-customer-document-history',
  templateUrl: './customer-document-history.component.html',
  styleUrls: ['./customer-document-history.component.scss']
})
export class CustomerDocumentHistoryComponent implements OnInit {
  @Input() details: any;
  @Input() customerid: number;
  count:any;
  constructor(private customerservice: CustomerService) { }

  ngOnInit() {
    this.customerservice.CustDocHistory(this.customerid).subscribe(result => {
      this.count = result;
    })

  }
}
