import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeliveryDashboardService } from 'app/operation-capacity/services/delivery-dashboard.service';
import { LoaderService } from 'app/shared/services/loader.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  @Input() ClusterId : number;
  @Input() warehouseId : number;
  @Input() orderNo : number;
  orderList : any;
  isOpenOrderDetail : boolean = false;
  OrderId : number;
  skip : number = 1;
  Take : number = 10;
  totalRecords : number;
  constructor(private deliveryDashboardService : DeliveryDashboardService
    , private loaderService: LoaderService) { }

  ngOnInit() {
  }
  
  load(event) {    
    var Last=  event.first ? event.first + event.rows : 10;
    this.skip=Last/ event.rows;
    this.Take= event.rows;
    this.loaderService.loading(true);
    this.deliveryDashboardService.numberOfOrderClusterWiseOrderlist(this.warehouseId,this.orderNo,this.skip,this.Take).subscribe(result => {
      this.orderList = result.listOrder;
      console.log('this.orderList',this.orderList);
      this.totalRecords = result.TotalCount;
      this.loaderService.loading(false);
    })
  }
  openOrderDetail(rowData)
  {
    this.loaderService.loading(true);
    this.OrderId = rowData.OrderId;
    this.isOpenOrderDetail = true;
    this.loaderService.loading(false);
  }

}
