import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageZoneComponent } from './components/manage-zone/manage-zone.component';
import { ManageZoneListPageComponent } from './components/manage-zone-list-page/manage-zone-list-page.component';


const routes: Routes = [
  { path: 'manage', component: ManageZoneComponent },
  { path: 'managezonelist', component: ManageZoneListPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradeZoneRoutingModule { }
