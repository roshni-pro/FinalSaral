import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseRegisterComponent } from './components/purchase-register/purchase-register.component';

const routes: Routes = [
  {path: 'purchaseregister', component: PurchaseRegisterComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuchaseRegisterRoutingModule { }
