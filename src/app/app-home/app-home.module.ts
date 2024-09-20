import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppHomeRoutingModule } from './app-home-routing.module';
import { AppHomeComponent } from './components/app-home/apphome.component';
import { AppHomeBannerComponent } from './components/banner/apphome-banner.component';
import { AppHomePopupComponent } from './components/popup/apphome-popup.component';
import { AppHomeTileComponent } from './components/tile/apphome-tile.component';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { Tab } from './components/tabsets/tab';
import { Tabset } from './components/tabsets/tabset';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { FlashDealComponent } from './components/flash-deal/flash-deal.component';
import { MobileBannerComponent } from './components/mobile-view/mobile-banner/mobile-banner/mobile-banner.component';
import { MobilePopupComponent } from './components/mobile-view/mobile-popup/mobile-popup/mobile-popup.component';
import { MobileTileComponent } from './components/mobile-view/mobile-tile/mobile-tile/mobile-tile.component';
import { CarouselModule } from 'primeng/carousel';
import { SharedModule } from 'app/shared/shared.module';
import { ProgressSpinnerModule } 
    from 'primeng/progressspinner';
import {BlockUIModule} from 'primeng/blockui';



@NgModule({
  declarations: [AppHomeComponent, AppHomeBannerComponent, AppHomePopupComponent, AppHomeTileComponent, Tab, Tabset, FlashDealComponent, MobileBannerComponent, MobilePopupComponent, MobileTileComponent],
  imports: [
    CommonModule,
    AppHomeRoutingModule,
    TableModule,
    NgbModule,
    ShaopkiranaSharedModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    CarouselModule,
    ColorPickerModule,
    ToggleButtonModule,
    AccordionModule,
    TabViewModule,
    SharedModule,
    // ProgressSpinnerModule,
    BlockUIModule,
    ProgressSpinnerModule

  ]
})
export class AppHomeModule { }
