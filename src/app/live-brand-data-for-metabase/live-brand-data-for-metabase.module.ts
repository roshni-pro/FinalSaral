import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveBrandDataForMetabaseRoutingModule } from './live-brand-data-for-metabase-routing.module';
import { LiveBrandDataForMetabaseComponent } from './component/live-brand-data-for-metabase/live-brand-data-for-metabase.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [LiveBrandDataForMetabaseComponent],
  imports: [
    CommonModule,
    LiveBrandDataForMetabaseRoutingModule,
    ShaopkiranaSharedModule,
    SharedModule
  ]
})
export class LiveBrandDataForMetabaseModule { }
