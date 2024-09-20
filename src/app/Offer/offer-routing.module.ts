import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferComponent } from './components/offer/offer.component';
import { AddDistributorOfferComponent } from './components/add-distributor-offer/add-distributor-offer.component';
import { CustomerOffersComponent } from './components/customer-offers/customer-offers.component';
import { OfferCheckerComponent } from './components/offer-checker/offer-checker.component';
import { OfferHistoryAdminPageComponent } from './components/offer-history-admin-page/offer-history-admin-page.component';
import { OfferHistoryPageComponent } from './components/offer-history-page/offer-history-page.component';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { AddNewOfferComponent } from './components/add-new-offer/add-new-offer.component';
import { FreebieaUploaderComponent } from './components/freebies-upload/freebiea-uploader.component';
import { NewOfferWithUploaderComponent } from './components/new-offer-with-uploader/new-offer-with-uploader.component';

const routes: Routes = [
  { path: 'offer-list', component: OfferListComponent },
  { path: 'add-offer', component: AddNewOfferComponent },
  { path: 'DistributerOffer', component: OfferComponent },
  { path: 'AddDistributerOffer', component: AddDistributorOfferComponent },
  { path: 'CustomerOffers', component: CustomerOffersComponent },
  { path: 'OfferChecker', component: OfferCheckerComponent },
  { path: 'OfferHistoryAll', component: OfferHistoryAdminPageComponent },
  { path: 'OfferHistory', component: OfferHistoryPageComponent },
  { path: 'freebies-uploader', component: FreebieaUploaderComponent },
  {path:'add-OfferWithUploader',component:NewOfferWithUploaderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
