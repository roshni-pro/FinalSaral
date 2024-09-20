import { Component, OnInit } from '@angular/core';
import { TurnAroundTimeService } from 'app/shared/services/turn-around-time.service';
import * as moment from 'moment';
@Component({
  selector: 'app-turn-around-time',
  templateUrl: './turn-around-time.component.html',
  styleUrls: ['./turn-around-time.component.scss'],
  providers: [TurnAroundTimeService]
})
export class TurnAroundTimeComponent implements OnInit {
  warehouseList: any[];
  tatList: any[];
  selectedWarehouse: number;
  startDate: any;
  endDate: any;

  cols: any[];
  selectedColumns: any[];

  constructor(private turuAroundService: TurnAroundTimeService) { }

  ngOnInit() {
    this.turuAroundService.getWarehouseList().subscribe(warehouseList => {
      console.log('warehouseList:', warehouseList);
      this.warehouseList = warehouseList;
      if (this.warehouseList && this.warehouseList.length > 0) {
        this.selectedWarehouse = this.warehouseList[0].WarehouseId;
      }
    });

    this.cols = [
      { field: 'OrderID', header: 'OrderID' },
      { field: 'Status', header: 'Status' },
      { field: 'PendingToReadyToDispatch', header: 'pending to ready to dispatch (hrs)' },
      { field: 'ReadytoDispatchToIssued', header: 'Ready to Dispatch to issued hours (hrs)' },
      { field: 'IssuedToShipped', header: 'Issued to Shipped (hrs)' },
      { field: 'ShippedToDelivery', header: 'Shipped to delivery (hrs)' },
      { field: 'ShippedToRedispatch', header: 'Shipped to re-dispatch (hrs)' },
      { field: 'RedispatchToDelivery', header: 'Redispatch to delivery (hrs)' },
      { field: 'TotalDeliveryTime', header: 'Total Delivery diff (hrs)' },
      { field: 'DBoyName', header: 'Delivery Boy name' },
      { field: 'OrderDate', header: 'order date' },
      { field: 'ReadytoDispatchDate', header: 'Ready to Dispatch Date And time' },
      { field: 'IssuedDate', header: ' issued date and Time' },
      { field: 'ShippedDate', header: 'Shipped Date and time' },
      { field: 'DeliveredDate', header: 'delivery Date And time' },
      { field: 'DeliveryRedispatchTime', header: 'redispatch date and time' },
      { field: 'DeliveryRedispatchTime2', header: 'second redispatch Date and time' },
      { field: 'DeliveryRedispatchTime3', header: 'Third Redispatch date and Time' }
    ];

    this.selectedColumns = this.cols;
  }

  getData() {
    let startDate = moment(this.startDate, "MM/DD/YYYY").format("MM/DD/YYYY");
    let endDate = moment(this.endDate, "MM/DD/YYYY").format("MM/DD/YYYY");
    this.tatList = null;
    this.turuAroundService.get(startDate, endDate, this.selectedWarehouse).subscribe(result => {
      this.tatList = result;
      this.updateTatList();
      console.log(result);
    });
  }

  updateTatList(){
    if(this.tatList && this.tatList.length > 0){
      this.tatList.forEach(item => {
        item.PendingToReadyToDispatch = item.PendingToReadyToDispatch ? (item.PendingToReadyToDispatch/60).toFixed(2) : null; 
        item.ReadytoDispatchToIssued =  item.ReadytoDispatchToIssued ? (item.ReadytoDispatchToIssued/60).toFixed(2) : null; 
        item.IssuedToShipped =  item.IssuedToShipped ? (item.IssuedToShipped/60).toFixed(2) : null; 
        item.ShippedToDelivery =  item.ShippedToDelivery ? (item.ShippedToDelivery/60).toFixed(2) : null; 
        item.ShippedToRedispatch =  item.ShippedToRedispatch ? (item.ShippedToRedispatch/60).toFixed(2) : null; 
        item.RedispatchToDelivery =  item.RedispatchToDelivery ? (item.RedispatchToDelivery/60).toFixed(2) : null; 
        item.TotalDeliveryTime =  item.TotalDeliveryTime ? (item.TotalDeliveryTime/60).toFixed(2) : null; 
        item.OrderDate =   item.OrderDate ?  moment(new Date(item.OrderDate), "MM/DD/YYYY HH:mm:ss").format('MM/DD/YYYY HH:mm:ss').toString() : null; 
        item.ReadytoDispatchDate =   item.ReadytoDispatchDate ?  moment(new Date(item.ReadytoDispatchDate), "MM/DD/YYYY HH:mm:ss").format('MM/DD/YYYY HH:mm:ss').toString() : null; 
        item.IssuedDate =   item.IssuedDate ?  moment(new Date(item.IssuedDate), "MM/DD/YYYY HH:mm:ss").format('MM/DD/YYYY HH:mm:ss').toString() : null; 
        item.ShippedDate =   item.ShippedDate ?  moment(new Date(item.ShippedDate), "MM/DD/YYYY HH:mm:ss").format('MM/DD/YYYY HH:mm:ss').toString() : null;
        item.DeliveredDate =   item.DeliveredDate ?  moment(new Date(item.DeliveredDate), "MM/DD/YYYY HH:mm:ss").format('MM/DD/YYYY HH:mm:ss').toString() : null;  
        item.DeliveryRedispatchTime =   item.DeliveryRedispatchTime ?  moment(new Date(item.DeliveryRedispatchTime), "MM/DD/YYYY HH:mm:ss").format('MM/DD/YYYY HH:mm:ss').toString() : null;  
        item.DeliveryRedispatchTime2 =   item.DeliveryRedispatchTime2 ?  moment(new Date(item.DeliveryRedispatchTime2), "MM/DD/YYYY HH:mm:ss").format('MM/DD/YYYY HH:mm:ss').toString() : null;  
        item.DeliveryRedispatchTime3 =   item.DeliveryRedispatchTime3 ?  moment(new Date(item.DeliveryRedispatchTime3), "MM/DD/YYYY HH:mm:ss").format('MM/DD/YYYY HH:mm:ss').toString() : null;  
      });
    }
  }

}
