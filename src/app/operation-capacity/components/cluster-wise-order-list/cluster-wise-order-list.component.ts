import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeliveryDashboardService } from 'app/operation-capacity/services/delivery-dashboard.service';
import { LoaderService } from 'app/shared/services/loader.service';

@Component({
  selector: 'app-cluster-wise-order-list',
  templateUrl: './cluster-wise-order-list.component.html',
  styleUrls: ['./cluster-wise-order-list.component.scss']
})
export class ClusterWiseOrderListComponent implements OnInit {
  orderList : any;
  @Input() warehouseId : number;
  @Input() orderNo : number;
  isOpenOrder : boolean = false;
  ClusterId : number;
  constructor(private deliveryDashboardService : DeliveryDashboardService
    , private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.loading(true);
     this.deliveryDashboardService.numberOfOrderClusterWise(this.warehouseId,this.orderNo).subscribe(res=>
      {
        this.orderList = res;
        console.log('this.orderList',this.orderList);
        this.loaderService.loading(false);
      });
  }
  openOrder(rowData)
  {
    this.loaderService.loading(true);
    this.isOpenOrder = true;
    this.ClusterId = rowData.ClusterId;
    this.loaderService.loading(false);
  }
}
