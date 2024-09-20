
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { TableModule } from 'primeng/table';
;

//import { AddPeopleComponent } from './components/people-add/people-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { AddWarehouseComponent } from './components/add-warehouse/add-warehouse.component';
import { WarehouseCreationComponent } from './components/warehouse-creation/warehouse-creation.component';
import { WarehouseDetailsComponent } from './components/warehouse-details/warehouse-details.component';
import { ClusterEditComponent } from './components/cluster-edit/cluster-edit.component';

import { AreaComponent } from './components/area/area.component';
import { AreaEditComponent } from './components/area-edit/area-edit.component';
import { AreaDetailsComponent } from './components/area-details/area-details.component';
// import { ClusterComponent } from './components/cluster/cluster.component';
import { ClusterDetailsComponent } from './components/cluster-details/cluster-details.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { AddagentComponent } from './components/addagent/addagent.component';
import { AddcityComponent } from './components/addcity/addcity.component';
import { AddvehicleComponent } from './components/addvehicle/addvehicle.component';
import { ClustercitymapComponent } from './components/clustercitymap/clustercitymap.component';
import { AgmOverlays } from 'agm-overlays';
import { MapsRoutingModule } from 'app/maps/maps-routing.module';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { ClustermapComponent } from './components/clustermap/clustermap.component';
import { ClusterComponent } from './components/cluster/cluster.component';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { ClusterEditinfoComponent } from './components/cluster-editinfo/cluster-editinfo.component';
import { RefreshClusterCustomerComponent } from './components/refresh-cluster-customer/refresh-cluster-customer.component';
import { ViewClusterComponent } from './components/view-cluster/view-cluster.component';
import { ViewClusterDetailComponent } from './components/view-cluster-detail/view-cluster-detail.component';
import { ViewClusterMapComponent } from './components/view-cluster-map/view-cluster-map.component';
import { ViewClusterCityMapComponent } from './components/view-cluster-city-map/view-cluster-city-map.component';
import { environment } from 'environments/environment';
import { InventCyclesWarehouesComponent } from './components/InventCyclesWarehoues/invent-cycles-warehoues/invent-cycles-warehoues.component';
import { WarehousemapComponent } from './components/warehousemap/warehousemap.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { WarehouseActionComponent } from './components/warehouse-action/warehouse-action.component';


//import { DocumentComponent } from './components/do  cument/document.component';
//import { DropdownModule } from 'primeng/primeng';

@NgModule({
  declarations: [AddWarehouseComponent, WarehouseCreationComponent, WarehouseDetailsComponent, ClusterDetailsComponent, ClusterComponent, ClusterEditComponent, AreaComponent, AreaEditComponent, AreaDetailsComponent, AddagentComponent, AddcityComponent, AddvehicleComponent, ClustercitymapComponent, ClustermapComponent, ClusterEditinfoComponent, RefreshClusterCustomerComponent,  ViewClusterComponent, ViewClusterDetailComponent, ViewClusterMapComponent, ViewClusterCityMapComponent, InventCyclesWarehouesComponent, 
  WarehousemapComponent, WarehouseActionComponent, 
  ],
  // WarehouseSupplierComponent, AddWarehouseSupplierComponent, WarehouseSupplierDetailComponent,
  imports: [
    CommonModule,
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: environment.apiKeyGoogle, // "AIzaSyCbogFMyrNTlMdtsrYzgffJ3guhCdzRS2Y",
      libraries: ['drawing', 'places']
    }),
    AgmDirectionModule,
    WarehouseRoutingModule,
    TableModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    ShaopkiranaSharedModule,
    ReactiveFormsModule,
    AgmSnazzyInfoWindowModule
    // DropdownModule

  ],
  providers: [ MessageService, ConfirmationService ]
  // providers: [ MessageService, ConfirmationService ]



})
export class WarehouseModule { }
