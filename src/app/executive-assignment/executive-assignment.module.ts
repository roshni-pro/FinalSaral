import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { BlockUIModule } from 'primeng/blockui';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExecutiveassignmentComponent } from './Components/executiveassignment/executiveassignment.component';
import { ExecutiveAssignmentRoutingModule } from './executive-assignment-routing.module';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import { TreeModule } from 'primeng/tree';



@NgModule({
  declarations: [ExecutiveassignmentComponent],
  imports: [
    CommonModule,
    ShaopkiranaSharedModule,
    SkSharedModule,
    TreeModule,
    NgbModule,
    TableModule,
    BlockUIModule,
    DialogModule,
    ProgressSpinnerModule,
    ExecutiveAssignmentRoutingModule
  ]
})
export class ExecutiveAssignmentModule { }
