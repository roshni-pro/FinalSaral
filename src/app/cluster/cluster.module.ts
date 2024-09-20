import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ClusterRoutingModule } from './cluster-routing.module';
import { ClusterStoreComponent } from './components/cluster-store/cluster-store.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';


@NgModule({
  declarations: [ClusterStoreComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClusterRoutingModule,
    ShaopkiranaSharedModule,
    TableModule
  ]
})
export class ClusterModule { }
