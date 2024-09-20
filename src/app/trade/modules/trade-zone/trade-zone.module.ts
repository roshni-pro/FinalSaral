import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradeZoneRoutingModule } from './trade-zone-routing.module';
import { ManageZoneComponent } from './components/manage-zone/manage-zone.component';

import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { AgmOverlays } from 'agm-overlays';
import { MapsRoutingModule } from 'app/maps/maps-routing.module';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { ManageZoneListPageComponent } from './components/manage-zone-list-page/manage-zone-list-page.component';
import { environment } from 'environments/environment'
@NgModule({
  declarations: [ManageZoneComponent, ManageZoneListPageComponent],
    imports: [
      CommonModule,
      AgmOverlays,
      AgmCoreModule.forRoot({
        apiKey: environment.apiKeyGoogle,  //"AIzaSyCbogFMyrNTlMdtsrYzgffJ3guhCdzRS2Y",
        libraries: ['drawing', 'places']
      }),
      AgmDirectionModule,
      TradeZoneRoutingModule,
      TableModule,
      DialogModule,
      FormsModule,
      CalendarModule,
      DropdownModule,
      ShaopkiranaSharedModule,
      ReactiveFormsModule,
      AgmSnazzyInfoWindowModule
      // DropdownModule
  
    ]
  
  
  })
  
export class TradeZoneModule { }
