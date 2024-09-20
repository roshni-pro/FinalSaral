import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CardDealItemComponent } from './components/card-deal-item/card-deal-item.component';



@NgModule({
  declarations: [ShoppingListComponent, CardDealItemComponent],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    MultiSelectModule,
    ShaopkiranaSharedModule,
    TableModule,
    DialogModule,
    CalendarModule,
    ProgressSpinnerModule,
    NgbModule,
    FormsModule,
    DropdownModule,
    CheckboxModule
  ]
})
export class ShoppingCartModule { }
