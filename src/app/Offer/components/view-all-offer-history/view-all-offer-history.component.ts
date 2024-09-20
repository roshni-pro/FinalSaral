import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OfferService } from 'app/offer/Service/offer.service';

@Component({
  selector: 'app-view-all-offer-history',
  templateUrl: './view-all-offer-history.component.html',
  styleUrls: ['./view-all-offer-history.component.scss']
})
export class ViewAllOfferHistoryComponent implements OnInit {
  @Input() getRowData: any;
  @Input() listType: any;
  data;
  constructor(
    public offerServices: OfferService
  ) {

  }

  ngOnInit() {
    console.log(this.getRowData, 'testtttt');

  }




}
