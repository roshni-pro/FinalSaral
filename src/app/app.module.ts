import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LoginPageComponent } from './login/login-page.component';
import { RegisterPageComponent } from './register/register-page.component';
import { Dashboard1Component } from './dashboard/dashboard1.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from "ngx-toastr";

import { ReactiveFormsModule } from '@angular/forms'
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthInterceptor } from './shared/auth/auth.interceptor';
import { TokenLoginComponent } from './token-login/token-login.component';
import { AgmCoreModule } from '@agm/core';
import { AgmOverlays } from "agm-overlays";
import { AgmDirectionModule } from 'agm-direction';   // agm-direction

import { DeliveryBoyReportComponent } from './maps/component/delivery-boy-report/delivery-boy-report.component';
import { ManualSalesOrdersComponent } from './manualSales/manual-sales-orders/manual-sales-orders.component';
import { CustomerUploadDocComponent } from './customer-upload-doc/customer-upload-doc.component';
import { MessageService } from 'primeng/api';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
// import { DialPointComponent } from './Offer/Components/dial-point/dial-point.component';
import { CallsSMSMasterComponent } from './customerdelight/calls-smsmaster/calls-smsmaster.component';
import { WebviewappComponent } from './webviewapp/webviewapp.component';
import { ShareItemAppComponent } from './share-item-app/share-item-app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { TodayFlashDealComponent } from './flashdeal/components/today-flash-deal/today-flash-deal.component';

//import { CustomerkisanwebviewComponent } from './kisandaanwebviewapp/components/customerkisanwebview/customerkisanwebview.component';

//import { PagerService } from './_services/index';
// import { TaxMasterComponent } from './taxmaster/component/tax-master/tax-master.component';
// import { AccountclassificationComponent } from './AccountModule/components/AccountClassification/accountclassification/accountclassification.component';
// import { AccountclassificationAddComponent } from './AccountModule/components/AccountClassification/accountclassification-add/accountclassification-add.component';
import { WarehouseSelectionComponent } from './warehouse-selection/warehouse-selection.component';
import { ShaopkiranaSharedModule } from './shared/shaopkirana-shared/shaopkirana-shared.module';
import { ShareItemTradeComponent } from './share-item-trade/share-item-trade.component';
import { CompanyMissionComponent } from './company-mission/company-mission.component';
import { NgDragDropModule } from 'ng-drag-drop';
import { WuduDashboardComponent } from './wudu/components/wudu-dashboard/wudu-dashboard.component';
import { DatePipe } from '@angular/common';
import { environment } from 'environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { IFrameComponent } from './iframe/iframe.component';
import { NgxPrintModule } from 'ngx-print';
import { CalendarModule } from "primeng/calendar";
//import { NewComponentComponent } from './new-component/new-component.component';
// import { PageOneComponent } from './Aapna-kaam/page-one/page-one.component';
// import { InvoiceDispatchComponent } from './orderMaster/invoice-dispatch/invoice-dispatch.component';
import { CashModModule } from './cashCM/cash-mod/cash-mod.module';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}


@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent,
    LoginPageComponent,
    RegisterPageComponent,
    Dashboard1Component, TokenLoginComponent, CustomerUploadDocComponent, WebviewappComponent, ShareItemAppComponent, WarehouseSelectionComponent, ShareItemTradeComponent, CompanyMissionComponent, WuduDashboardComponent, IFrameComponent,// NewComponentComponent
    //TaxMasterComponent, 
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ShaopkiranaSharedModule,
    HttpClientModule,
    AgmOverlays,
    BlockUIModule,
    ProgressSpinnerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    CashModModule,
    Ng2OrderModule,
    AgmCoreModule.forRoot({
      //apiKey: "AIzaSyCbogFMyrNTlMdtsrYzgffJ3guhCdzRS2Y" + '&libraries=visualization',
      apiKey: environment.apiKeyGoogle + '&libraries=visualization',
      libraries: ['places', 'drawing', 'geometry', 'visualization'],
    }),
    AgmDirectionModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    PerfectScrollbarModule,
    NgDragDropModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseDboyTrackerConfig),
    AngularFirestoreModule, // for firestore
    NgxPrintModule,
    CalendarModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    //PagerService,
    MessageService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }

  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]

})
export class AppModule { }