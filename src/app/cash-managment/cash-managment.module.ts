import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashManagmentRoutingModule } from './cash-managment-routing.module';
import { MtDCollectionScreenComponent } from './Component/mt-dcollection-screen/mt-dcollection-screen.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import { MultiCashierComponent } from './multi-cashier/multi-cashier.component';


@NgModule({
  declarations: [MtDCollectionScreenComponent, MultiCashierComponent],
  imports: [
    CommonModule,
    CashManagmentRoutingModule,
    ShaopkiranaSharedModule,
    SkSharedModule
  ]
})
export class CashManagmentModule { }
