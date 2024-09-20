import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckerRoutingModule } from './checker-routing.module';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MastercheckerComponent } from './component/masterchecker/masterchecker.component';
import { MastercheckerDetailsComponent } from './component/masterchecker-details/masterchecker-details.component';
import { MastercheckerEditComponent } from './component/masterchecker-edit/masterchecker-edit.component';
import { ApproverComponent } from './component/approver/approver.component';
import { ChecherdetailsComponent } from './component/checherdetails/checherdetails.component';
// import { CheackereditComponent } from './component/cheackeredit/cheackeredit.component';


@NgModule({
  declarations: [MastercheckerComponent, MastercheckerDetailsComponent,
    MastercheckerEditComponent, ApproverComponent, ChecherdetailsComponent,
  ],

  imports: [
    CommonModule,
    CheckerRoutingModule,
    TableModule,
    NgbModule,
    ShaopkiranaSharedModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule

  ]

})
export class CheckerModule { }