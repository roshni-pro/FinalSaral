import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectOpenNetworkPincodeRoutingModule } from './direct-open-network-pincode-routing.module';
import { OpenNetworkPincodeComponent } from './open-network-pincode/open-network-pincode.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';


@NgModule({
  declarations: [OpenNetworkPincodeComponent],
  imports: [
    CommonModule,
    DirectOpenNetworkPincodeRoutingModule,
    ShaopkiranaSharedModule,
  ]
})
export class DirectOpenNetworkPincodeModule { }
