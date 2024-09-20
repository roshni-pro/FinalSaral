import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MurliRoutingModule } from './murli-routing.module';
import { StoryListComponent } from './components/story-list/story-list.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { MurliItemDetailsComponent } from './components/murli-item-details/murli-item-details.component';
import { MurliComponent } from './components/murli/murli.component';
import { MurliWarehouseDetailsComponent } from './components/murli-warehouse-details/murli-warehouse-details.component';
import { MurliAudioImagesComponent } from './components/murli-audio-images/murli-audio-images.component';
import { MurliAudioImagesDetailsComponent } from './components/murli-audio-images-details/murli-audio-images-details.component';

@NgModule({
  declarations: [
    StoryListComponent,
    MurliItemDetailsComponent,
    MurliComponent,
    MurliWarehouseDetailsComponent,
    MurliAudioImagesComponent,
    MurliAudioImagesDetailsComponent
  ],
  imports: [
    CommonModule,
    MurliRoutingModule,
    ShaopkiranaSharedModule
  ]
})
export class MurliModule { }
