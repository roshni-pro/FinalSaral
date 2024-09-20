import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemActiveInactiveComponent } from './components/item-active-inactive/item-active-inactive.component';
import { ItemliveDashboardComponent } from './components/itemlive-dashboard/itemlive-dashboard.component';
import { AddSubcategoryTargetDashboardComponent } from './components/add-subcategory-target-dashboard/add-subcategory-target-dashboard.component';
import { StockClearanceComponent } from './components/stock-clearance/stock-clearance.component';
import { SubCategoryComponent } from 'app/itemcategory/components/sub-category/sub-category.component';
import { SubcategoryTargetComponent } from './components/subcategory-target/subcategory-target.component';
import { AddCompanyTargetComponent } from './components/add-company-target/add-company-target.component';
import { AgentPitchComponent } from './components/agent-pitch/agent-pitch.component';
import { CityprimeItemMasterComponent } from './components/cityprime-item-master/cityprime-item-master.component';
import { CustomerTargetListComponent } from './components/customerTargetList/customer-target-list/customer-target-list.component';
import { ShowcustomerlevelComponent } from './components/showCustomerLevel/showcustomerlevel/showcustomerlevel.component';
import { CustomerRetentionConfigurationComponent } from './components/customer-retention-configuration/customer-retention-configuration.component';
import { UploadCfrArticleComponent } from './components/upload-cfr-article/upload-cfr-article.component';
import { LiveCfrArticleComponent } from './components/live-cfr-article/live-cfr-article.component';
import { SalesAppdashboardComponent } from './components/sales-appdashboard/sales-appdashboard.component';
import { ExecuteBeatTargetListComponent } from './components/execute-beat-target-list/execute-beat-target-list.component';
import { AddExecuteBeatTargetComponent } from './components/add-execute-beat-target/add-execute-beat-target.component';

const routes: Routes = [
  { path: 'CityBasedItemEdit', component: ItemActiveInactiveComponent },
  { path: 'itemlivedashboard', component: ItemliveDashboardComponent },
  { path: 'AddSubcategoryTargetDashboard', component: AddSubcategoryTargetDashboardComponent },
  { path: 'SubcategoryTarget', component: SubcategoryTargetComponent },
  { path: 'StockClearance', component: StockClearanceComponent },
  { path: 'AddCompanyTarget', component: AddCompanyTargetComponent },
  { path: 'AgentPitch', component: AgentPitchComponent },
  { path: 'cityprime-itemMaster', component: CityprimeItemMasterComponent },
  { path: 'CustomerTargetList', component: CustomerTargetListComponent },
  { path: 'Showcustomerlevel/:subCatBarndsIds', component: ShowcustomerlevelComponent },
  { path: 'CustomerRetentionConfiguration', component: CustomerRetentionConfigurationComponent },
  { path: 'uploadCfrArticle', component: UploadCfrArticleComponent },
  { path: 'LiveCfrArticle', component: LiveCfrArticleComponent },
  { path: 'SalesApp-Dashboard', component: SalesAppdashboardComponent },
  { path: 'ExecuteBeatList', component: ExecuteBeatTargetListComponent },
  { path: 'AddExecuteBeat', component: AddExecuteBeatTargetComponent },
  { path: 'Edit-ExecuteBeat/:Id', component: AddExecuteBeatTargetComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitalRoutingModule { }
