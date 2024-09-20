import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoryListComponent } from './components/story-list/story-list.component';
import { MurliComponent } from './components/murli/murli.component';
import { MurliItemDetailsComponent } from './components/murli-item-details/murli-item-details.component';
import { MurliWarehouseDetailsComponent } from './components/murli-warehouse-details/murli-warehouse-details.component';
import { MurliAudioImagesComponent } from './components/murli-audio-images/murli-audio-images.component';
import { MurliAudioImagesDetailsComponent } from './components/murli-audio-images-details/murli-audio-images-details.component';

const routes: Routes = [
  { path: 'story-list', component: StoryListComponent },
  { path: 'murli', component: MurliComponent },
  { path: 'murliitemdetails/:WarehouseId', component: MurliItemDetailsComponent },
  { path: 'murliwarehousedetails/:WarehouseId', component: MurliWarehouseDetailsComponent },
  { path: 'murliaudioimage', component: MurliAudioImagesComponent },
  { path: 'murliaudioimageDetails', component: MurliAudioImagesDetailsComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MurliRoutingModule { }
