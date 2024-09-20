import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KisandaanwebviewappRoutingModule } from './kisandaanwebviewapp-routing.module';
import { CustomerkisanwebviewComponent } from './components/customerkisanwebview/customerkisanwebview.component';
import { KisanDaanComponent } from './components/kisan-daan/kisan-daan.component';
import { KisandaangallaryComponent } from './components/kisandaangallary/kisandaangallary.component';
import { CarouselModule } from 'primeng/carousel';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';



@NgModule({
  declarations: [CustomerkisanwebviewComponent, KisanDaanComponent, KisandaangallaryComponent],
  imports: [
    CommonModule,
    CarouselModule,
    KisandaanwebviewappRoutingModule,
    ShaopkiranaSharedModule
  ]
})
export class KisandaanwebviewappModule { }
