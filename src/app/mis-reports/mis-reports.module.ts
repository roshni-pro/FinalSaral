import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MISReportsRoutingModule } from './mis-reports-routing.module';
import { SKPKPPCommisionComponent } from './skpkppcommision/skpkppcommision.component';
import { PackageMaterialCostComponent } from './package-material-cost/package-material-cost.component';
import { MisrepotabsComponent } from './misrepotabs/misrepotabs.component';
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
import { AccountMISComponent } from './account-mis/account-mis.component';
import { AccountMIsReportComponent } from './account-mis-report/account-mis-report.component';
import { KeysPipe } from './pipes/keys.pipe';

@NgModule({
  declarations: [SKPKPPCommisionComponent, PackageMaterialCostComponent, MisrepotabsComponent, AccountMISComponent, AccountMIsReportComponent,KeysPipe],
  imports: [
    CommonModule,
    MISReportsRoutingModule
    ,TabViewModule
    ,CardModule
    ,DropdownModule
    ,ShaopkiranaSharedModule
    ,FormsModule
    ,SkSharedModule,
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
export class MISReportsModule { }
