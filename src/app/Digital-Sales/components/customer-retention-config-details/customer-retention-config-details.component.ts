import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerRetention } from 'app/shared/interface/CustomerRetention/Customer-Retention';

@Component({
  selector: 'app-customer-retention-config-details',
  templateUrl: './customer-retention-config-details.component.html',
  styleUrls: ['./customer-retention-config-details.component.scss']
})
export class CustomerRetentionConfigDetailsComponent implements OnInit {
  @Input() CustomerRetention:CustomerRetention;
  @Input() CustomerType:any;
  // @Input() DayList:any;
  @Output() onBranChange = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

}
