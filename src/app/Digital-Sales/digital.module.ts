import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitalRoutingModule } from './digital-routing.module';
import { ItemActiveInactiveComponent } from './components/item-active-inactive/item-active-inactive.component';
import { ItemPriceUpdateComponent } from './components/item-price-update/item-price-update.component';
import { ToastModule } from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { SpinnerModule, ConfirmDialogModule, MessageModule, ProgressSpinnerModule, CalendarModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutoCompleteModule } from 'primeng/primeng';
import { ItemliveDashboardComponent } from './components/itemlive-dashboard/itemlive-dashboard.component';
import { AddSubcategoryTargetDashboardComponent } from './components/add-subcategory-target-dashboard/add-subcategory-target-dashboard.component';
import { StockClearanceComponent } from './components/stock-clearance/stock-clearance.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { SubcategoryTargetComponent } from './components/subcategory-target/subcategory-target.component';
import { CompanyTargetComponent } from './components/company-target/company-target.component';
import { AddCompanyTargetComponent } from './components/add-company-target/add-company-target.component';
import { AgentPitchComponent } from './components/agent-pitch/agent-pitch.component';
import { CityprimeItemMasterComponent } from './components/cityprime-item-master/cityprime-item-master.component';
import { CheckboxModule } from 'primeng/checkbox';
import { CustomerTargetListComponent } from './components/customerTargetList/customer-target-list/customer-target-list.component';
import { ShowcustomerlevelComponent } from './components/showCustomerLevel/showcustomerlevel/showcustomerlevel.component';
import { CustomerRetentionConfigurationComponent } from './components/customer-retention-configuration/customer-retention-configuration.component';
import { CustomerRetentionConfigDetailsComponent } from './components/customer-retention-config-details/customer-retention-config-details.component';
import { UploadCfrArticleComponent } from './components/upload-cfr-article/upload-cfr-article.component';
import { LiveCfrArticleComponent } from './components/live-cfr-article/live-cfr-article.component';

import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { SalesAppdashboardComponent } from './components/sales-appdashboard/sales-appdashboard.component';
import { ExecuteBeatTargetListComponent } from './components/execute-beat-target-list/execute-beat-target-list.component';
import { AddExecuteBeatTargetComponent } from './components/add-execute-beat-target/add-execute-beat-target.component';
@NgModule({
  declarations: [ItemActiveInactiveComponent, ItemPriceUpdateComponent, ItemliveDashboardComponent, AddSubcategoryTargetDashboardComponent, StockClearanceComponent, SubcategoryTargetComponent, CompanyTargetComponent, AddCompanyTargetComponent, AgentPitchComponent, CityprimeItemMasterComponent, CustomerTargetListComponent, ShowcustomerlevelComponent, CustomerRetentionConfigurationComponent, CustomerRetentionConfigDetailsComponent, UploadCfrArticleComponent, LiveCfrArticleComponent, SalesAppdashboardComponent, ExecuteBeatTargetListComponent, AddExecuteBeatTargetComponent],
  imports: [
    CommonModule,
    DigitalRoutingModule,
    ToastModule,
    BlockUIModule,
    SpinnerModule,
    ConfirmDialogModule,
    MessageModule,
    ProgressSpinnerModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    NgbModule,
    AutoCompleteModule,
    CalendarModule,
    MultiSelectModule,
    DialogModule,
    ShaopkiranaSharedModule
  ]
})
export class DigitalModule { }

export class exportdata {
  CityId: any = '';
  SubCategoryId: any = '';
  StartDate: any = '';
  EndDate: any = '';
  SubCatTargetDetails: Array<DynamicGrid> = [];
}


export class DynamicGrid {
  Level: string;
  SlabLowerLimit: any;
  SlabUpperLimit: any;
  TargetbyValue: any;
  NoofBrand: any;
  NoOfLineItem: any;
  Type: string;
  Value: any;
  subCatTargetBrandLists: brandlist_class[] = [];
  subCatTargetItemLists: itemlist_class[] = [];
}

export class brandlist_class {
  SubsubCategoryid: any;
}
export class itemlist_class {
  ItemId: any;
  Qty: any
}

