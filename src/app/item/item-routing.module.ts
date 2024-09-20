import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemMasterComponent } from './component/item-master/item-master.component';
import { ItemDetailsComponent } from './component/item-details/item-details.component';
import { ItemFormComponent } from './component/itemForm/itemForm.component';
import { BrandBuyerComponent } from './brand-buyer/brand-buyer.component';
import { ItemBarcodeComponent } from './component/item-barcode/item-barcode.component';
import { ItemViewPageComponent } from './component/item-view-page/item-view-page.component';
// import { ItemMRPSensitiveComponent } from './component/item-mrpsensitive/item-mrpsensitive.component';
import { MrpsensitiveComponent } from './component/mrpsensitive/mrpsensitive.component';
import { ItemSchemeComponent } from './component/item-scheme/item-scheme.component';
import { ItemSchemeUploadedComponent } from './component/item-scheme-uploaded/item-scheme-uploaded.component';
import { ItemSchemeUploadedDetailsComponent } from './component/item-scheme-uploaded-details/item-scheme-uploaded-details.component';
import { ItemSchemeMasterComponent } from './component/item-scheme-master/item-scheme-master.component';
import { ItemSchemeMasterDetailsComponent } from './component/item-scheme-master-details/item-scheme-master-details.component';
import { CustomerNotifyItemComponent } from './component/customer-notify-item/customer-notify-item.component';
import { BlockBrandComponent } from './component/block-brand/block-brand.component';
import { BarcodeItemComponent } from './component/barcode-item/barcode-item.component';
import { ScanItemBarcodeComponent } from './component/scan-item-barcode/scan-item-barcode.component';
import { GitConfigurationForLeadComponent } from './component/git-configuration-for-lead/git-configuration-for-lead.component';
import { ItemLivePageComponent } from './component/item-live-page/item-live-page.component';
import { WarehouseQuadrantCustomerTypeComponent } from './component/warehouse-quadrant-customer-type/warehouse-quadrant-customer-type.component';
import { NewItemSchemeComponent } from './component/new-item-scheme/new-item-scheme.component';
import { StorePriceConfigurationComponent } from './component/store-price-configuration/store-price-configuration.component';
const routes: Routes = [
  {path: 'item-master', component: ItemMasterComponent},
  {path: 'item-master/details', component: ItemDetailsComponent} ,
  {path: 'item-master/form', component: ItemFormComponent},
  {path: 'item-master/form/:companyCode/:comapanyStockCode', component: ItemFormComponent},
  {path: 'item-master/BrandBuyer', component: BrandBuyerComponent} ,
  {path: 'item-barcode', component: ItemBarcodeComponent}, 
  {path: 'item-view-page', component: ItemViewPageComponent},
  //{path: 'item-mrpsensitive', component: ItemMRPSensitiveComponent},
  {path: 'item', component: MrpsensitiveComponent}  ,
  {path: 'itemScheme', component: ItemSchemeComponent}  ,
  {path: 'uploaded-itemscheme', component: ItemSchemeUploadedComponent}  ,
  {path: 'itemschemeuploadeddetails', component: ItemSchemeUploadedDetailsComponent}  ,
  {path: 'itemschememaster', component: ItemSchemeMasterComponent}  ,
  {path: 'itemschememasterdetails', component: ItemSchemeMasterDetailsComponent}  ,
  {path: 'CustNotifyItem',component:CustomerNotifyItemComponent},
  {path: 'Block-Brand',component:BlockBrandComponent},
  {path: 'Barcode',component:BarcodeItemComponent},
  {path: 'ScanBarcode',component:ScanItemBarcodeComponent},
  {path: 'jitConfig-lead',component:GitConfigurationForLeadComponent},
  {path: 'live-item-page',component:ItemLivePageComponent} ,
  {path: 'Warehouse-Quadrant-page',component:WarehouseQuadrantCustomerTypeComponent} ,
  {path: 'ExcelUploadItemScheme',component:NewItemSchemeComponent} ,
  {path:'Store-configuration',component:StorePriceConfigurationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
