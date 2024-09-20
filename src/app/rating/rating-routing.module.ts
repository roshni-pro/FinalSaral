import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRatingComponent } from './components/add-rating/add-rating.component';
import { CustomerRatingComponent } from './components/customer-rating/customer-rating.component';
import { RatingListPageComponent } from './components/rating-list-page/rating-list-page.component';


const routes: Routes = [
  {path:'add-rating', component:AddRatingComponent},
  {path:'', component:RatingListPageComponent},
  // {path:'user-rating', component:UserRatingComponent},
  {path:'user-rating', component:CustomerRatingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatingRoutingModule { }
