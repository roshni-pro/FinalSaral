import { Component, Input, OnInit } from '@angular/core';
import { PlanMasterService } from 'app/operation-capacity/services/plan-master.service';
import { LoaderService } from 'app/shared/services/loader.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {
  @Input() warehouseId : number;
  @Input() vehicleReqNo : number;
  vehicleDetailList : any;
  constructor(private planMasterService : PlanMasterService
    , private loaderService: LoaderService) { }

  ngOnInit() {
   console.log('vehicleReqNo',this.vehicleReqNo);
    if(this.vehicleReqNo == 0)
    {
      this.loaderService.loading(true);
      this.planMasterService.availableVehiclesDetails(this.warehouseId).subscribe(x=>
        {
          this.vehicleDetailList = x;
          this.loaderService.loading(false);
        });
    }
    if(this.vehicleReqNo == 1)
    {
      this.loaderService.loading(true);
      this.planMasterService.vehiclesNotUtilized(this.warehouseId).subscribe(x=>
        {
          this.vehicleDetailList = x;
          this.loaderService.loading(false);
        });
    }   
      
    }

}
