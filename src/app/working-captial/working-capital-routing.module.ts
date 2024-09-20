import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkingCapitalComponent } from './components/working-capital/working-capital.component';
import { AddWorkingCapitalComponent } from './components/add-working-capital/add-working-capital.component';
import { WorkingCapitalCalanderComponent } from './components/working-capital-calander/working-capital-calander.component';




const routes: Routes = [
  { path: 'view-capital', component: WorkingCapitalComponent },
  { path: 'Add-capital', component: AddWorkingCapitalComponent },
  // {path: 'add', component: AddWarehouseComponent},
  { path: 'wccalander', component: WorkingCapitalCalanderComponent },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkingCaptialRoutingModule { }
