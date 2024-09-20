import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeliveryDashboardService } from 'app/operation-capacity/services/delivery-dashboard.service';
import { LoaderService } from 'app/shared/services/loader.service';

@Component({
  selector: 'app-order-detail-list',
  templateUrl: './order-detail-list.component.html',
  styleUrls: ['./order-detail-list.component.scss']
})
export class OrderDetailListComponent implements OnInit {
  @Input() warehouseId : number;
  @Input() orderNo : number;
  isOpenOrderDetail : boolean = false;
  @Input() OrderId : number;
  orderDetailList : any;
  freeItemList : any;
  constructor(private deliveryDashboardService : DeliveryDashboardService
    , private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.loading(true);
    this.deliveryDashboardService.getOfferOnOrder(this.OrderId).subscribe(x=>
      {
        this.orderDetailList = x;
        this.loaderService.loading(false);
      });
  }

}
