import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardDealItemComponent } from './components/card-deal-item/card-deal-item.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';

const routes: Routes = [
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'dealItem',component:CardDealItemComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingCartRoutingModule { }
