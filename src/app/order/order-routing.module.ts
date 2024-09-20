import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderSettleComponent } from './components/order-settle/order-settle.component';
import { RedeemMasterComponent } from './components/redeem-master/redeem-master.component';
import { PendingOrderComponent } from './components/pending-order/pending-order.component';
import { MopComponent } from './components/mop/mop.component';
import { EtaUpdateOrderComponent } from './components/eta-update-order/eta-update-order.component';
import { ExpectedRtdDateComponent } from './components/expected-rtd-date/expected-rtd-date.component';


const routes: Routes = [
  {
    path: 'redeemMaster',
    component:RedeemMasterComponent
  },
  {
    path: 'orderSettle',
    component:OrderSettleComponent
  },
  {
    path:'PendingOrder',
    component:PendingOrderComponent
  },
  {
    path:'mop',
    component:MopComponent
  },
  {
    path:'Eta-Order',
    component:EtaUpdateOrderComponent
  },
  {
    path:'Rtd-Order',
    component:ExpectedRtdDateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
