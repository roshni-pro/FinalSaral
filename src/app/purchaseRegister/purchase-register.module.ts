import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseRegisterComponent } from './components/purchase-register/purchase-register.component';
import { PuchaseRegisterRoutingModule } from './puchase-register-routing.module';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import {NgxPaginationModule} from 'ngx-pagination';
import { MultiSelectModule } from 'primeng/primeng';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';

@NgModule({
  declarations: [PurchaseRegisterComponent],
  imports: [
    CommonModule,
    MultiSelectModule,
    PuchaseRegisterRoutingModule,
    TableModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    NgxPaginationModule,
    ShaopkiranaSharedModule
   // DropdownModule

  ]
  

})
export class PurchaseRegisterModule { }
