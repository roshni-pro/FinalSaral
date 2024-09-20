import { Component, OnInit } from '@angular/core';
import { PickerService } from 'app/shared/services/picker/picker.service';

@Component({
  selector: 'app-picker-statistic',
  templateUrl: './picker-statistic.component.html',
  styleUrls: ['./picker-statistic.component.scss']
})
export class PickerStatisticComponent implements OnInit {
  warehouseList : any;
  clusterList : any;
  blocked : boolean;
  IsComplete : any;
  List : any;
  ClusterId : any;
  isInvalid  :any;
  WarehouseId : any;
  constructor(private pickerservice : PickerService) { }

  ngOnInit() {
    this.IsComplete = '';
    this.blocked = true;
    this.pickerservice.GetAllWarehouse().subscribe(x => {
      this.warehouseList = x;
      this.blocked = false;
      console.log('x:', x);
    });
  }


  getClusterlist(WarehouseId) {
    
    this.blocked = true;
    this.pickerservice.GetAllCluster(WarehouseId).subscribe(y => {
      this.clusterList = y;
      console.log('y:', y);
      this.blocked = false;
      
    });
  }

  filter(whclForm,ClusterId)
  {
      this.pickerservice.GetReadyPickedOrdersA7(ClusterId).subscribe(z => {
      this.List = z;
      this.blocked = false;
      console.log('z:', z);
    });
  }
}
