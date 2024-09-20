import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ABCClassificationComponent } from './components/abc-classification/abc-classification.component';


const routes: Routes = [
  { path: 'abcclassification', component: ABCClassificationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbcClassificationRoutingModule { }
