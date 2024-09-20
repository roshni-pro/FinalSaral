import { AccordionModule } from 'primeng/accordion';
import { FileUploadModule } from 'primeng/fileupload';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ItemMasterComponent } from './component/item-master/item-master.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ItemFormComponent } from './component/itemForm/itemForm.component';
import { ItemDetailsComponent } from './component/item-details/item-details.component';
import { BrandBuyerComponent } from './brand-buyer/brand-buyer.component';

import { MultiSelectModule } from 'primeng/multiselect';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { AddMultiMRPComponent } from './component/add-multi-mrp/add-multi-mrp.component';
import { ItemBarcodeComponent } from './component/item-barcode/item-barcode.component';
import { ItemViewPageComponent } from './component/item-view-page/item-view-page.component';
// import { ItemMRPSensitiveComponent } from './component/item-mrpsensitive/item-mrpsensitive.component';
import { MrpsensitiveComponent } from './component/mrpsensitive/mrpsensitive.component';
//import { SensitiveItemMrpComponent } from './component/sensitive-item-mrp/sensitive-item-mrp.component';

import { RadioButtonModule } from 'primeng/radiobutton';
import { AddMaterialItemMasterComponent } from 'app/packing-material/components/add-material-item-master/add-material-item-master.component';
import { ItemSchemeComponent } from './component/item-scheme/item-scheme.component';
import { ItemSchemeUploadedComponent } from './component/item-scheme-uploaded/item-scheme-uploaded.component';
import { ItemSchemeUploadedDetailsComponent } from './component/item-scheme-uploaded-details/item-scheme-uploaded-details.component';
import { ItemSchemeMasterComponent } from './component/item-scheme-master/item-scheme-master.component';
import { ItemSchemeMasterDetailsComponent } from './component/item-scheme-master-details/item-scheme-master-details.component';
import { CustomerNotifyItemComponent } from './component/customer-notify-item/customer-notify-item.component';
import { BlockBrandComponent } from './component/block-brand/block-brand.component';
import { NgxPrintModule } from 'ngx-print';
import { BarcodeItemComponent } from './component/barcode-item/barcode-item.component';
import { AddBatchCodeComponent } from './component/add-batch-code/add-batch-code.component';
import { ScanItemBarcodeComponent } from './component/scan-item-barcode/scan-item-barcode.component';
import { CardModule } from 'primeng/card';
import { GitConfigurationForLeadComponent } from './component/git-configuration-for-lead/git-configuration-for-lead.component';
//import { DocumentComponent } from './components/do  cument/document.component';
//import { DropdownModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/messages';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { ItemLivePageComponent } from './component/item-live-page/item-live-page.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { WarehouseQuadrantCustomerTypeComponent } from './component/warehouse-quadrant-customer-type/warehouse-quadrant-customer-type.component';
import { NewItemSchemeComponent } from './component/new-item-scheme/new-item-scheme.component';
import { TypePipe } from './pipe/type.pipe';
import { StorePriceConfigurationComponent } from './component/store-price-configuration/store-price-configuration.component';
import { MrpMediaComponent } from './component/mrp-media/mrp-media.component';

@NgModule({
  declarations: [ItemMasterComponent,ItemFormComponent, ItemDetailsComponent, BrandBuyerComponent, AddMultiMRPComponent, ItemBarcodeComponent, ItemViewPageComponent, MrpsensitiveComponent, AddMaterialItemMasterComponent, ItemSchemeComponent, ItemSchemeUploadedComponent, ItemSchemeUploadedDetailsComponent, ItemSchemeMasterComponent, ItemSchemeMasterDetailsComponent, CustomerNotifyItemComponent, BlockBrandComponent, BarcodeItemComponent, AddBatchCodeComponent, ScanItemBarcodeComponent,GitConfigurationForLeadComponent,ItemLivePageComponent, WarehouseQuadrantCustomerTypeComponent, NewItemSchemeComponent, TypePipe, StorePriceConfigurationComponent, MrpMediaComponent],
  imports: [
    ConfirmDialogModule,
    CommonModule,
    NgbModule,
    ItemRoutingModule,
    TableModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    MultiSelectModule,
    ShaopkiranaSharedModule,
    RadioButtonModule,
    FileUploadModule,
    AccordionModule,
    NgxPrintModule,
    CardModule,
    MessagesModule ,
    SelectButtonModule
    // DropdownModule
  ],
  providers: [ConfirmationService],


})
export class ItemModule { }
