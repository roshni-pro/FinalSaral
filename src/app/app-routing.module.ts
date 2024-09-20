import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { AuthGuard } from './shared/auth/auth-guard.service';
import { LoginPageComponent } from './login/login-page.component';
import { RegisterPageComponent } from './register/register-page.component';
import { TokenLoginComponent } from './token-login/token-login.component';
import { CustomerUploadDocComponent } from './customer-upload-doc/customer-upload-doc.component';
import { WebviewappComponent } from './webviewapp/webviewapp.component';
import { ShareItemAppComponent } from './share-item-app/share-item-app.component';
import { WarehouseSelectionComponent } from './warehouse-selection/warehouse-selection.component';
import { CompanyMissionComponent } from './company-mission/company-mission.component';
import { WuduDashboardComponent } from './wudu/components/wudu-dashboard/wudu-dashboard.component';
import { IFrameComponent } from './iframe/iframe.component';

import { Component } from '@fullcalendar/core';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'layout',
    pathMatch: 'full',
  },

  { 
    path: 'token/:redirectURL/:token/:Warehouseids/:userid/:userName/:Warehouseid',
    component: TokenLoginComponent
    //, canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent
    // , canActivate: [AuthGuard]
    //redirectTo: '',
    // pathMatch: 'login',
  },
  {
    path: 'register',
    component: RegisterPageComponent
    , canActivate: [AuthGuard]
    //redirectTo: '',
    // pathMatch: 'login',
  },
  {
    path: 'customer-upload-doc/:Mobile',
    component: CustomerUploadDocComponent
    , canActivate: [AuthGuard]
  },
  {
    path: 'webviewapp/:customerid/:lang/:wid',
    component: WebviewappComponent
    , canActivate: [AuthGuard]
  },
  {
    path: 'shareitem',
    component: ShareItemAppComponent
    , canActivate: [AuthGuard]
  },
  {
    path: 'shareitemtk',
    component: ShareItemAppComponent
    , canActivate: [AuthGuard]
  },
  {

    path: 'webview',
    loadChildren: () => import('./kisandaanwebviewapp/kisandaanwebviewapp.module').then(m => m.KisandaanwebviewappModule)
    , canActivate: [AuthGuard]
  },
  
 
  {
    path: 'layout/warehouse-selection',
    component: WarehouseSelectionComponent
    , canActivate: [AuthGuard]
  },


  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   //redirectTo: '',
  //   // pathMatch: 'login',
  // },

  {
    path: 'layout',
    component: FullLayoutComponent,
    children: [
      {
        path:"EwayPage",loadChildren:()=>import('./eway-details/eway-details.module').then(m=>m.EwayDetailsModule), canActivate: [AuthGuard]
      },
      {
        path:"EwayBillOrderDetails",
        loadChildren:()=>import('./eway-bill-order-detail/eway-bill-order-detail.module').then(m=>m.EwayBillOrderDetailModule) , canActivate: [AuthGuard]
      },
      { 
        path:"DeliveryCapacityOptimization",
        loadChildren:()=>import('./delivery-capacity-opti/delivery-capacity-opti.module').then(m=>m.DeliveryCapacityOptiModule)
        , canActivate: [AuthGuard]
      },

      {
        path:'Cm', 
        loadChildren: () => import('./cashCM/cash-mod/cash-mod.module').then(m => m.CashModModule)
        , canActivate: [AuthGuard]
      },
      {
        path: 'wududashboard',
        component: WuduDashboardComponent
        , canActivate: [AuthGuard]
      },
      {
        path: 'salesApp',
        loadChildren: () => import('./sales-app-backend-pages/sales-app-backend-pages.module').then(m => m.SalesAppBackendPagesModule)
        , canActivate: [AuthGuard]
      },
      {
        path:'batchMaster',
        loadChildren:()=>import('./batchmaster/batchmaster/batchmaster.module').then(m=>m.BatchmasterModule)
        , canActivate: [AuthGuard]
      },
      {
        path: 'sms',
        loadChildren: () => import('./sms-template/sms-template.module').then(m => m.SmsTemplateModule)
        , canActivate: [AuthGuard]
      },
      { path: 'iframe', component: IFrameComponent , canActivate: [AuthGuard]},
      { path: '', component: CompanyMissionComponent, canActivate: [AuthGuard] },
      // login
      { path: 'test', loadChildren: () => import('./test/test.module').then(m => m.TestModule), canActivate: [AuthGuard] },
      { path: 'CashManagment', loadChildren: () => import('./cash-managment/cash-managment.module').then(m=>m.CashManagmentModule), canActivate: [AuthGuard]},
      { path: 'inventoryforcast', loadChildren: () => import('./inventory-forcast/inventory-forcast.module').then(m => m.InventoryForcastModule), canActivate: [AuthGuard] },
      // { path: 'buyerprogress', loadChildren: () => import('./buyers-pdca/buyers-pdca.module').then(m => m.BuyersPdcaModule), canActivate: [AuthGuard] },
     // { path: 'buyerprogress', loadChildren: () => import('./buyers-pdca/buyers-pdca.module').then(m => m.BuyersPdcaModule), canActivate: [AuthGuard] },
     // { path: 'ApnaModuleLoadKro', loadChildren: () => import('./Aapna-kaam/apna/apna.module').then(m => m.ApnaModule), canActivate: [AuthGuard] },
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] },
      { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule), canActivate: [AuthGuard] },
      { path: 'Account', loadChildren: () => import('./AccountModule/account.module').then(m => m.AccountModule), canActivate: [AuthGuard] },
      { path: 'taxmaster', loadChildren: () => import('./taxmaster/taxmaster.module').then(m => m.TaxMasterModule), canActivate: [AuthGuard] },
      { path: 'warehousevedio', loadChildren: () => import('./warehousevedio/warehousevedio.module').then(m => m.WarehousevedioModule), canActivate: [AuthGuard] },
      { path: 'warehouse', loadChildren: () => import('./warehouse/warehouse.module').then(m => m.WarehouseModule), canActivate: [AuthGuard] },
      { path: 'delivery', loadChildren: () => import('./delivery/delivery.module').then(m => m.DeliveryModule), canActivate: [AuthGuard] },
      { path: 'item', loadChildren: () => import('./item/item.module').then(m => m.ItemModule), canActivate: [AuthGuard] },
      { path: 'current-stock', loadChildren: () => import('./current-stock/current-stock.module').then(m => m.CurrentStockModule), canActivate: [AuthGuard] },
      { path: 'supplier', loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule), canActivate: [AuthGuard] },
      { path: 'item-category', loadChildren: () => import('./itemcategory/itemcatagory.module').then(m => m.ItemCategoryModule), canActivate: [AuthGuard] },
      // { path: 'depot', loadChildren: () => import('./depot/depot.module').then(m => m.DepotModule), canActivate: [AuthGuard] },
      { path: 'permission', loadChildren: () => import('./permissions/permission.module').then(m => m.PermissionModule), canActivate: [AuthGuard] },
      { path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule), canActivate: [AuthGuard] },
      { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule), canActivate: [AuthGuard] },
      { path: 'company-dashboard', loadChildren: () => import('./company-dashboard/company-dashboard.module').then(m => m.CompanyDashboardModule) },

      { path: 'murli', loadChildren: () => import('./murli/murli.module').then(m => m.MurliModule), canActivate: [AuthGuard] },
      { path: 'combodashboard', loadChildren: () => import('./combodashboard/combodashboard.module').then(m => m.CombodashboardModule), canActivate: [AuthGuard] },
      // { path: 'dashboard', component: Dashboard1Component, data: { extraParameter: '' } },
      { path: 'townhall', loadChildren: () => import('./TownHall/townhall.module').then(m => m.TownhallModule), canActivate: [AuthGuard] },
      { path: 'Purchase-Order', loadChildren: () => import('./Purchase-Order/purchase-order.module').then(m => m.PurchaseOrderModule), canActivate: [AuthGuard] },
      { path: 'trade', loadChildren: () => import('./trade/trade.module').then(m => m.TradeModule), canActivate: [AuthGuard] },
      { path: 'manualSales', loadChildren: () => import('./manualSales/manual-sales.module').then(m => m.ManualSalesModule), canActivate: [AuthGuard] },
      { path: 'orangebook', loadChildren: () => import('./orangebook/orangebook.module').then(m => m.OrangebookModule), canActivate: [AuthGuard] },
      { path: 'checker', loadChildren: () => import('./checker/checker.module').then(m => m.CheckerModule), canActivate: [AuthGuard] },
      { path: 'master-export', loadChildren: () => import('./master-export/master-export.module').then(m => m.MasterExportModule), canActivate: [AuthGuard] },
      { path: 'tat', loadChildren: () => import('./tat/tat.module').then(m => m.TatModule), canActivate: [AuthGuard] },
      { path: 'customerdelight', loadChildren: () => import('./customerdelight/customerdelight.module').then(m => m.CustomerdelightModule), canActivate: [AuthGuard] },
      { path: 'skdashboards', loadChildren: () => import('./skdashboards/skdashboards.module').then(m => m.SkdashboardsModule), canActivate: [AuthGuard] },
      { path: 'auto-notification', loadChildren: () => import('./auto-notification/auto-notification.module').then(m => m.AutoNotificationModule), canActivate: [AuthGuard] },
      { path: 'holiday', loadChildren: () => import('./holiday/holiday.module').then(m => m.HolidayModule), canActivate: [AuthGuard] },
      { path: 'offer', loadChildren: () => import('./Offer/offer.module').then(m => m.OfferModule), canActivate: [AuthGuard] },
      //  { path: 'commission-payment', loadChildren: () => import('./commission-payment/commission-payment.module').then(m => m.CommissionPaymentModule), canActivate: [AuthGuard] },
      { path: 'flashdeal', loadChildren: () => import('./flashdeal/flashdeal.module').then(m => m.FlashdealModule), canActivate: [AuthGuard] },
      { path: 'ledgerconfiguration', loadChildren: () => import('./ledgerconfiguration/ledgerconfiguration.module').then(m => m.LedgerconfigurationModule), canActivate: [AuthGuard] },
      { path: 'buyer', loadChildren: () => import('./buyer/buyer.module').then(m => m.BuyerModule), canActivate: [AuthGuard] },
      { path: 'shopping-cart', loadChildren: () => import('./shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule), canActivate: [AuthGuard] },
      { path: 'purchaseRegister', loadChildren: () => import('./purchaseRegister/purchase-register.module').then(m => m.PurchaseRegisterModule), canActivate: [AuthGuard] },
      { path: 'cpmatrix', loadChildren: () => import('./cpmatrix/cpmatrix.module').then(m => m.CpmatrixModule), canActivate: [AuthGuard] },
      { path: 'complaint-ticket', loadChildren: () => import('./complaint-ticket/complaint-ticket.module').then(m => m.ComplaintTicketModule), canActivate: [AuthGuard] },
      { path: 'customer-gst', loadChildren: () => import('./customer-gst/customer-gst.module').then(m => m.CustomerGstModule), canActivate: [AuthGuard] },
      { path: 'category-master', loadChildren: () => import('./category-master/category-master.module').then(m => m.CategoryMasterModule), canActivate: [AuthGuard] },
      { path: 'levelcolor', loadChildren: () => import('./levelcolor/levelcolor.module').then(m => m.LevelcolorModule), canActivate: [AuthGuard] },
      { path: 'crmReport', loadChildren: () => import('./CRMReport/components/crm-report.module').then(m => m.CrmReportModule), canActivate: [AuthGuard] },
      { path: 'crm', loadChildren: () => import('./crm/crm.module').then(m => m.CrmModule), canActivate: [AuthGuard] },
      { path: 'KisanDaanDashboard', loadChildren: () => import('./KisanDaanDashboard/kisandaan-dashboard.module').then(m => m.KisandaanDashboardModule), canActivate: [AuthGuard] },
      { path: 'paymentreconcile', loadChildren: () => import('./paymentreconcile/paymentreconcile.module').then(m => m.PaymentreconcileModule), canActivate: [AuthGuard] },
      { path: 'workingcapital', loadChildren: () => import('./working-captial/working-capital.module').then(m => m.WorkingCaptialModule), canActivate: [AuthGuard] },
      { path: 'wudu', loadChildren: () => import('./wudu/wudu.module').then(m => m.WuduModule), canActivate: [AuthGuard] },
      { path: 'app-home', loadChildren: () => import('./app-home/app-home.module').then(m => m.AppHomeModule), canActivate: [AuthGuard] },
      { path: 'gullakcashback', loadChildren: () => import('./gullakcashback/gullakcashback.module').then(m => m.GullakcashbackModule), canActivate: [AuthGuard] },
      { path: 'agentcommissionpayments', loadChildren: () => import('./agent-commission-payment/agent-commission-payment.module').then(m => m.AgentCommissionPaymentModule), canActivate: [AuthGuard] },
      { path: 'purchase', loadChildren: () => import('./Purchase/purchase.module').then(m => m.PurchaseModule), canActivate: [AuthGuard] },
      { path: 'picker', loadChildren: () => import('./picker/picker.module').then(m => m.PickerModule), canActivate: [AuthGuard] },
      { path: 'returnreplace', loadChildren: () => import('./ReturnReplace/return-replace.module').then(m => m.ReturnReplaceModule), canActivate: [AuthGuard] },
      { path: 'agentcomissionsetcitywise', loadChildren: () => import('./agentcomissionsetcitywise/agentcomissionsetcitywise.module').then(m => m.AgentcomissionsetcitywiseModule), canActivate: [AuthGuard] },
      { path: 'packing-material', loadChildren: () => import('./packing-material/packingmaterial.module').then(m => m.PackingmaterialModule), canActivate: [AuthGuard] },
      { path: 'order-status', loadChildren: () => import('./orderstatusReport/order-status-salse-report.module').then(m => m.OrderStatusSalseReportModule), canActivate: [AuthGuard] },
      { path: 'distributer-price-update', loadChildren: () => import('./distributer-price-update/distributerprice.module').then(m => m.DistributerpriceModule), canActivate: [AuthGuard] },
      { path: 'custominput', loadChildren: () => import('./custom-input/custom-input.module').then(m => m.CustomInputModule), canActivate: [AuthGuard] },
      { path: 'agentpaymentsettlement', loadChildren: () => import('./agentpaymentsettlement/agentpaymentsettlement.module').then(m => m.AgentpaymentsettlementModule), canActivate: [AuthGuard] },
      { path: 'virtualstock', loadChildren: () => import('./VirtualStockManagement/VirtualStock.module').then(m => m.VirtualStockModule), canActivate: [AuthGuard] },
      { path: 'PR-IR-Payments', loadChildren: () => import('./pr-ir-payments/irpayments.module').then(m => m.IRPaymentsModule), canActivate: [AuthGuard] },
      { path: 'brandbuyerallocation', loadChildren: () => import('./warehouseMaterials/warehousematerials/warehousematerials.module').then(m => m.WarehousematerialsModule), canActivate: [AuthGuard] },
      { path: 'SupplierViewPage', loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule), canActivate: [AuthGuard] },
      { path: 'InternalTransfer', loadChildren: () => import('./internal-transfer/internal-transfer.module').then(m => m.InternalTransferModule), canActivate: [AuthGuard] },
      { path: 'OrderAssignments', loadChildren: () => import('./order-assignments/order-assignments.module').then(m => m.OrderAssignmentsModule), canActivate: [AuthGuard] },
      { path: 'CouponCodes', loadChildren: () => import('./couponcodes/couponcodes.module').then(m => m.CouponcodesModule), canActivate: [AuthGuard] },
      { path: 'DistributerOffer', loadChildren: () => import('./Offer/offer.module').then(m => m.OfferModule), canActivate: [AuthGuard] },
      { path: 'ExecutiveAssignment', loadChildren: () => import('./executive-assignment/executive-assignment.module').then(m => m.ExecutiveAssignmentModule), canActivate: [AuthGuard] },
      { path: 'opreports', loadChildren: () => import('./opreports/opreports.module').then(m => m.OpreportsModule), canActivate: [AuthGuard] },
      { path: 'Ticket', loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule), canActivate: [AuthGuard] },
      { path: 'TicketCategory', loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule), canActivate: [AuthGuard] },
      { path: 'abcclassification', loadChildren: () => import('./abc-classification/abc-classification.module').then(m => m.AbcClassificationModule), canActivate: [AuthGuard] },
      { path: 'incidentreporting', loadChildren: () => import('./incident-reporting/incident-reporting.module').then(m => m.IncidentReportingModule), canActivate: [AuthGuard] },
      { path: 'smeloan', loadChildren: () => import('./smeLoan/sme-loan.module').then(m => m.SmeLoanModule), canActivate: [AuthGuard] },
      { path: 'digitalsales', loadChildren: () => import('./Digital-Sales/digital.module').then(m => m.DigitalModule), canActivate: [AuthGuard] },
      { path: 'store', loadChildren: () => import('./store/store.module').then(m => m.StoreModule), canActivate: [AuthGuard] },
      { path: 'rtgs', loadChildren: () => import('./rtgs-orders-approve/rtgs-orders-approve.module').then(m => m.RtgsOrdersApproveModule), canActivate: [AuthGuard] },
      { path: 'irn', loadChildren: () => import('./irn/irn.module').then(m => m.IRNModule), canActivate: [AuthGuard] },
      { path: 'vehicle', loadChildren: () => import('./Vehicle-Master/vehicle-master.module').then(m => m.VehicleMasterModule), canActivate: [AuthGuard] },
      { path: 'fleetMaster', loadChildren: () => import('./fleet-master/fleet-master.module').then(m => m.FleetMasterModule), canActivate: [AuthGuard] },
      { path: 'master', loadChildren: () => import('./Master/mastermodule.module').then(m => m.MastermoduleModule), canActivate: [AuthGuard] },
      { path: 'operation-capacity', loadChildren: () => import('./operation-capacity/operation-capacity.module').then(m => m.OperationCapacityModule), canActivate: [AuthGuard] },
      { path: 'digitalsales-team', loadChildren: () => import('./digitalsalesteam/digitalsalesteam.module').then(m => m.DigitalsalesteamModule), canActivate: [AuthGuard] },
      { path: 'sale', loadChildren: () => import('./sales/sale-incentive.module').then(m => m.SaleIncentiveModule), canActivate: [AuthGuard] },
      { path: 'damageview', loadChildren: () => import('./damageViewOrder/damageview-order.module').then(m => m.DamageviewOrderModule), canActivate: [AuthGuard] },
      { path: 'damagestockitem', loadChildren: () => import('./damageStockItem/damagestock-item.module').then(m => m.DamagestockItemModule), canActivate: [AuthGuard] },
      { path: 'currentnetstock', loadChildren: () => import('./current-net-stock/current-net-stock.module').then(m => m.CurrentNetStockModule), canActivate: [AuthGuard] },
      { path: 'damagestock', loadChildren: () => import('./damage-stock/damage-stock.module').then(m => m.DamageStockModule), canActivate: [AuthGuard] },
      { path: 'OrderMaster', loadChildren: () => import('./order-master/order-master.module').then(m => m.OrderMasterModule), canActivate: [AuthGuard] },
      { path: "dashboard", loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
      { path: 'rating', loadChildren: () => import('./rating/rating.module').then(m => m.RatingModule), canActivate: [AuthGuard] },
      { path: 'notification', loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule), canActivate: [AuthGuard] },
      { path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule), canActivate: [AuthGuard] },
      //{ path: 'statistical-report', loadChildren: () => import('./statistical-report/statistical-report.module').then(m => m.StatisticalReportModule), canActivate:[AuthGuard]},
      { path: 'direct-network', loadChildren: () => import('./direct-open-network-pincode/direct-open-network-pincode.module').then(m => m.DirectOpenNetworkPincodeModule), canActivate: [AuthGuard] },
      {path:'LedgerCorrection',loadChildren:()=>import('./ledger-correction/ledger-correction.module').then(m=>m.LedgerCorrectionModule)},
      { path: 'paymentRefundProcess', loadChildren: () => import('./payment-refund-process/payment-refund-process.module').then(m => m.PaymentRefundProcessModule), canActivate: [AuthGuard] },
      { path: 'liveBrandDataForMetabase', loadChildren: () => import('./live-brand-data-for-metabase/live-brand-data-for-metabase.module').then(m => m.LiveBrandDataForMetabaseModule), canActivate: [AuthGuard] },
      // { path: 'buyerforcast', loadChildren: () => import('./buyerforcastupload/buyerforcastupload.module').then(m => m.BuyerforcastuploadModule)},
      // { path: 'clusterStore', loadChildren: () => import('./cluster-store-beat-mapping/cluster-store-beat-mapping.module').then(m => m.ClusterStoreBeatMappingModule), canActivate: [AuthGuard] },
      { path: 'inbound', loadChildren: () => import('./inbound-page/inbound-page.module').then(m => m.InboundPageModule), canActivate: [AuthGuard]},
      //{ path: 'AppInt', loadChildren: () => import('./app-integration/app-integration.module').then(m => m.AppIntegrationModule)},
      { path: 'whatsAppTemplate', loadChildren: () => import('./whats-app-template/whats-app-template.module').then(m => m.WhatsAppTemplateModule), canActivate: [AuthGuard]},
      { path: 'ROC', loadChildren: () => import('./roc/roc.module').then(m => m.ROCModule), canActivate: [AuthGuard]},
      { path: 'MIS-Report', loadChildren: () => import('./mis-reports/mis-reports.module').then(m => m.MISReportsModule), canActivate: [AuthGuard]},
      { path: 'OrderReconciliation', loadChildren: () => import('./order-reconciliation/order-reconciliation.module').then(m => m.OrderReconciliationModule), canActivate: [AuthGuard]},
      { path: 'skBuisnessLead', loadChildren: () => import('./sk-buisness-lead/sk-buisness-lead.module').then(m => m.SkBuisnessLeadModule), canActivate: [AuthGuard]},
      { path: 'POS-System', loadChildren: () => import('./pos-system/pos-system.module').then(m => m.PosSystemModule), canActivate: [AuthGuard]}


      
    ], canActivate: [AuthGuard]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {

    onSameUrlNavigation: 'reload',
    useHash: true

  })],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
