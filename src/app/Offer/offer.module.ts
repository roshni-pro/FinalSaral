import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferRoutingModule } from './offer-routing.module';
import { OfferComponent } from './components/offer/offer.component';
import { AddDistributorOfferComponent } from './components/add-distributor-offer/add-distributor-offer.component';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { OfferDetailsComponent } from './components/offer-details/offer-details.component';
import { CustomerOffersComponent } from './components/customer-offers/customer-offers.component';
import { OfferCheckerComponent } from './components/offer-checker/offer-checker.component';
import { OfferHistoryPageComponent } from './components/offer-history-page/offer-history-page.component';
import { OfferHistoryAdminPageComponent } from './components/offer-history-admin-page/offer-history-admin-page.component';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { AddNewOfferComponent } from './components/add-new-offer/add-new-offer.component';
import { ConfirmationPopupComponent } from './components/confirmation-popup/confirmation-popup.component';
import { ViewAllOfferHistoryComponent } from './components/view-all-offer-history/view-all-offer-history.component';
import { UpdateOfferComponent } from './components/update-offer/update-offer.component';
import { OfferCustomerListComponent } from './components/offer-customer-list/offer-customer-list.component';
import { FreebieaUploaderComponent } from './components/freebies-upload/freebiea-uploader.component';
import { NewOfferWithUploaderComponent } from './components/new-offer-with-uploader/new-offer-with-uploader.component';

@NgModule({
  declarations: [
    OfferComponent,
    AddDistributorOfferComponent,
    OfferDetailsComponent,
    CustomerOffersComponent,
    OfferCheckerComponent,
    OfferHistoryPageComponent,
    OfferHistoryAdminPageComponent,
    OfferListComponent,
    AddNewOfferComponent,
    FreebieaUploaderComponent,
    ConfirmationPopupComponent,
    ViewAllOfferHistoryComponent,
    UpdateOfferComponent,
    OfferCustomerListComponent,
    NewOfferWithUploaderComponent,
    
  ],
  imports: [
    CommonModule,
    OfferRoutingModule,
    TableModule,
    NgbModule,
    ShaopkiranaSharedModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule
  ],
  entryComponents: [ConfirmationPopupComponent]
})
export class OfferModule { }
