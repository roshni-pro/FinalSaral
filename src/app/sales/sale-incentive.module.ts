import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleIncentiveRoutingModule } from './sale-incentive-routing.module';
import { SaleIncentiveComponent } from './component/sale-incentive/sale-incentive.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { AddsaleIncentiveComponent } from './component/addsale-incentive/addsale-incentive.component';


@NgModule({
  declarations: [SaleIncentiveComponent, AddsaleIncentiveComponent],
  imports: [
    NgbModule,
    ShaopkiranaSharedModule,
    CommonModule,
    SaleIncentiveRoutingModule
  ],
  exports: [SaleIncentiveComponent]
})
export class SaleIncentiveModule { }
