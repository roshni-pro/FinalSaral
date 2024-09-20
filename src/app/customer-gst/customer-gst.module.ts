import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerGstRoutingModule } from './customer-gst-routing.module';
import { CustomerGstComponent } from './components/customer-gst.component';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

// import { GalleryModule } from '@ngx-gallery/core';
// import { LightboxModule } from '@ngx-gallery/lightbox';


@NgModule({
  declarations: [CustomerGstComponent],
  imports: [
    CommonModule,
    CustomerGstRoutingModule,
    DropdownModule,
    TableModule,
    NgbModule,
    ShaopkiranaSharedModule,
    DialogModule,
    FormsModule,
    CalendarModule,

  ]
})
export class CustomerGstModule { }
