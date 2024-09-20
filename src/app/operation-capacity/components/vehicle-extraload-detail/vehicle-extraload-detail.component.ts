import { Component, Input, OnInit } from '@angular/core';
import { PlanMasterService } from 'app/operation-capacity/services/plan-master.service';
import { LoaderService } from 'app/shared/services/loader.service';

@Component({
  selector: 'app-vehicle-extraload-detail',
  templateUrl: './vehicle-extraload-detail.component.html',
  styleUrls: ['./vehicle-extraload-detail.component.scss']
})
export class VehicleExtraloadDetailComponent implements OnInit {
  @Input() warehouseId: number;
  extraVehicleLoadList: any;
  constructor(private planMasterService: PlanMasterService
    , private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.loading(true);
    this.planMasterService.extraVehicleRequired(this.warehouseId).subscribe(x => {
      this.extraVehicleLoadList = x;
      console.log(' this.extraVehicleLoadList:',  this.extraVehicleLoadList);
      this.loaderService.loading(false);
    });
  }

}
