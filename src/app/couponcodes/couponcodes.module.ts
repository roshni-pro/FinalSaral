import { CouponcodesComponent } from './Components/couponcodes/couponcodes.component';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/calendar';
import { CouponCodesRoutingModule } from './couponcodes-routing.module';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import { TradeModule } from 'app/trade/trade.module';



@NgModule({
  declarations: [CouponcodesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    AutoCompleteModule,
    NgbModule,
    TableModule,
    ToastModule,
    ProgressSpinnerModule,
    BlockUIModule,
    CouponCodesRoutingModule,
    CommonModule,
    TradeModule,
    ShaopkiranaSharedModule,
    SkSharedModule,
  ],
  // providers: []
})

export class CouponcodesModule { }
