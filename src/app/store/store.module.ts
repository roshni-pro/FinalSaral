import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreListComponent } from './components/store-list/store-list.component';
import { ManageStoreComponent } from './components/manage-store/manage-store.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { TooltipModule } from 'primeng/tooltip';
import { StoreClusterBeatMappingComponent } from './components/store-cluster-beat-mapping/store-cluster-beat-mapping.component';


@NgModule({
  declarations: [StoreListComponent, ManageStoreComponent, StoreClusterBeatMappingComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
    ShaopkiranaSharedModule,
    TooltipModule,
  ]
})
export class StoreModule { }
