import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiveBrandDataForMetabaseComponent } from './component/live-brand-data-for-metabase/live-brand-data-for-metabase.component';


const routes: Routes = [
  {path:'', component:LiveBrandDataForMetabaseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveBrandDataForMetabaseRoutingModule { }
