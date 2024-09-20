import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { CustomInputRoutingModule } from './custom-input-routing.module';



@NgModule({
  declarations: [CustomInputComponent],
  imports: [
    CommonModule,
    CustomInputRoutingModule,
    ShaopkiranaSharedModule
  ]
})
export class CustomInputModule { }
