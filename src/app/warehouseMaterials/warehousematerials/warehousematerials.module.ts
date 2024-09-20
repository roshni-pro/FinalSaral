import { BrandlistComponent } from './../components/brandlist/brandlist.component';
import { CarouselModule } from 'primeng/carousel';
import { ChartsModule } from 'ng2-charts';
import { BlockUIModule } from 'primeng/blockui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseMaterialsRoutingModule } from './warehousematerials-routing.module';
import { WarehousematerialslistComponent } from '../components/warehousematerialslist/warehousematerialslist.component';
import { WhousBrandGraphComponent } from '../components/whous-brand-graph/whous-brand-graph.component';
import { SubgraphComponent } from '../components/subgraph/subgraph.component';



@NgModule({
  declarations: [WarehousematerialslistComponent , WhousBrandGraphComponent, BrandlistComponent,  SubgraphComponent],
  imports: [
    CommonModule,
    WarehouseMaterialsRoutingModule,
    TableModule,
    DialogModule,
    ToastModule,
    ProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    BlockUIModule,
    ChartsModule,
    CarouselModule,
    
  ]
})
export class WarehousematerialsModule { }
