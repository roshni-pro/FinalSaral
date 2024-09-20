import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderPickerComponent } from './components/order-picker/order-picker.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { PrintOrderItemComponent } from './components/print-order-item/print-order-item.component';
import { OrderPickerViewComponent } from './components/order-picker-view/order-picker-view.component';
import { PickerStatisticComponent } from './components/picker-statistic/picker-statistic.component';
import { OrderPickerReiviewerComponent } from './components/order-picker-reiviewer/order-picker-reiviewer.component';
import { OrdermasterComponent } from './components/ordermaster/ordermaster.component';
import { PickerMongoOrderComponent } from './components/picker-mongo-order/picker-mongo-order.component';
import { RejectedPickerComponent } from './components/rejected-picker/rejected-picker.component';
import { RejectedPickerReportComponent } from './components/rejected-picker-report/rejected-picker-report.component';

const routes: Routes = [
  { path: 'createpicker', component: OrderPickerComponent},
  { path: 'orderdetail/:OrderId', component: OrderDetailComponent},
  { path: 'printorderitem/:orderIds', component: PrintOrderItemComponent},
  { path: 'orderpickerviews', component: OrderPickerViewComponent},
  { path: 'pickerstatistic', component: PickerStatisticComponent},
  { path: 'dispatchMaster', component: OrderPickerReiviewerComponent},
  { path: 'orderpickerMaster', component: OrdermasterComponent},
  { path: 'mongopickerMaster/:ObjectId', component: PickerMongoOrderComponent},
  { path: 'mongopickerMaster', component: PickerMongoOrderComponent},  
  { path: 'RejectedPicker', component:RejectedPickerComponent},
  { path: 'RejectedPickerReport', component:RejectedPickerReportComponent}
 ];
 
 @NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
export class PickerRoutingModule { }
