import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EwayDetailsRoutingModule } from './eway-details-routing.module';
import { OrderPageComponent } from './order-page/order-page.component';
import { EwayPageComponent } from './eway-page/eway-page.component';
import { InternalTransferComponent } from './internal-transfer/internal-transfer.component';
import { NearExpiryEwaybillsComponent } from './near-expiry-ewaybills/near-expiry-ewaybills.component';
import { FailedEwaybillsComponent } from './failed-ewaybills/failed-ewaybills.component';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule, CheckboxModule, ConfirmDialogModule, DialogModule, FileUploadModule, InputTextModule, ListboxModule, MenuModule, OrderListModule, PanelMenuModule, SelectButtonModule, SharedModule, SplitButtonModule, TooltipModule, TreeTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'angular-calendar';


@NgModule({
  declarations: [OrderPageComponent, EwayPageComponent, InternalTransferComponent, NearExpiryEwaybillsComponent, FailedEwaybillsComponent],
  imports: [
    CommonModule,
    EwayDetailsRoutingModule
    ,TabViewModule
    ,CardModule
    ,DropdownModule
    ,ShaopkiranaSharedModule
    ,FormsModule,
    SkSharedModule,
    AutoCompleteModule,
    OrderListModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,
    HttpClientModule,
    TabViewModule,
    PanelMenuModule,
    ToastModule,
    MenuModule,
    ConfirmDialogModule,
    SelectButtonModule,
    FileUploadModule,
    ReactiveFormsModule,
    ListboxModule,
    SharedModule,
    TreeTableModule,
    CardModule,CheckboxModule,SplitButtonModule,CalendarModule,TooltipModule
  ]
})
export class EwayDetailsModule { }
