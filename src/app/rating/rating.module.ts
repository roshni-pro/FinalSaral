import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingRoutingModule } from './rating-routing.module';
import { AddRatingComponent } from './components/add-rating/add-rating.component';
import { RatingListPageComponent } from './components/rating-list-page/rating-list-page.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { SharedModule } from 'app/shared/shared.module';
import { UserRatingComponent } from './components/user-rating/user-rating.component';
import { CustomerRatingComponent } from './components/customer-rating/customer-rating.component';


@NgModule({
  declarations: [AddRatingComponent, RatingListPageComponent, UserRatingComponent, CustomerRatingComponent],
  imports: [
    CommonModule,
    RatingRoutingModule,
    ShaopkiranaSharedModule,
    SharedModule
  ]
})
export class RatingModule { }
