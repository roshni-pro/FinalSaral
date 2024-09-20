import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClusterStoreBeatMappingRoutingModule } from './cluster-store-beat-mapping-routing.module';
import { ClusterStoreBeatMappingComponent } from './components/cluster-store-beat-mapping/cluster-store-beat-mapping.component';

import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import {MessageModule} from 'primeng/message';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';


@NgModule({
  declarations: [ClusterStoreBeatMappingComponent],
  imports: [
    CommonModule,
    ClusterStoreBeatMappingRoutingModule,
    ReactiveFormsModule,
    ShaopkiranaSharedModule,
    TableModule,
    MessageModule
  ]
})
export class ClusterStoreBeatMappingModule { }
