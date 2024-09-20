import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsRoutingModule } from './maps-routing.module';
import { AgmCoreModule } from '@agm/core';
import { AgmOverlays } from 'agm-overlays';
import { DeliveryBoyReportComponent } from './component/delivery-boy-report/delivery-boy-report.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { AgmDirectionModule } from 'agm-direction';   // agm-direction
import { HitMapComponent } from './component/hit-map/hit-map.component';
import { HeatMapChildComponent } from './component/heat-map-child/heat-map-child.component';
import { MarkerMapChildComponent } from './component/marker-map-child/marker-map-child.component';
import { SalesPersonReportComponent } from './component/sales-person-report/sales-person-report.component';

@NgModule({
  declarations: [DeliveryBoyReportComponent, HitMapComponent, HeatMapChildComponent, MarkerMapChildComponent, SalesPersonReportComponent],
  imports: [
    ShaopkiranaSharedModule,
    CommonModule,
    AgmOverlays,
    MapsRoutingModule,
    AgmCoreModule,
    AgmDirectionModule
  ],
  exports: [HeatMapChildComponent, MarkerMapChildComponent]
})
export class MapsModule { }
