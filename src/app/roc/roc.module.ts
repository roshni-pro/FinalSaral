import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ROCRoutingModule } from './roc-routing.module';
import { BuyerRocComponent } from './Component/buyer-roc/buyer-roc.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';


@NgModule({
  declarations: [BuyerRocComponent],
  imports: [
    CommonModule,
    ROCRoutingModule,
    FormsModule,
    ShaopkiranaSharedModule,
    SkSharedModule
  ]
})
export class ROCModule { }
