import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ShopKiranaConfirmDialogComponent } from './components/shop-kirana-confirm-dialog/shop-kirana-confirm-dialog.component';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SlideMenuModule } from 'primeng/slidemenu';
import { DepotComponent } from './components/depot/depot.component';
import { DepotFormComponent } from './components/depot-form/depot-form.component';
import { HistoryComponent } from './components/history/history.component';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AccordionModule } from 'primeng/accordion';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { PickListModule } from 'primeng/picklist';
import { RatingModule } from 'primeng/rating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ContextMenuModule } from 'primeng/contextmenu';
import { StepsModule } from 'primeng/steps';
import { DataViewModule } from 'primeng/dataview';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LedgerAutoCompleteComponent } from './components/ledger-auto-complete/ledger-auto-complete.component';
import { LedgerAutoCompleteService } from './services/ledger-auto-complete.service';
import { HttpClientModule } from '@angular/common/http';
import { PeopleAutoCompleteComponent } from './components/people-auto-complete/people-auto-complete.component';
import { CustomerAutoCompleteComponent } from './components/customer-auto-complete/customer-auto-complete.component';
import { LedgerDropDownComponent } from './components/ledger-drop-down/ledger-drop-down.component';
import { ItemAutoCompleteComponent } from './components/item-auto-complete/item-auto-complete.component';
import { SelectedItemListComponent } from './components/selected-item-list/selected-item-list.component';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {SidebarModule} from 'primeng/sidebar';
import {PanelModule} from 'primeng/panel';

@NgModule({
  declarations: [
    ShopKiranaConfirmDialogComponent,
    DepotComponent,
    DepotFormComponent,
    HistoryComponent,
    LedgerAutoCompleteComponent,
    PeopleAutoCompleteComponent,
    CustomerAutoCompleteComponent,
    LedgerAutoCompleteComponent,
    LedgerDropDownComponent,
    ItemAutoCompleteComponent,
    SelectedItemListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    MultiSelectModule,
    CheckboxModule,
    ConfirmDialogModule,
    ToastModule,
    AutoCompleteModule,
    SlideMenuModule,
    BlockUIModule,
    ProgressSpinnerModule,
    FileUploadModule,
    TooltipModule,
    TabViewModule,
    DragDropModule,
    AccordionModule,
    InputSwitchModule,
    DialogModule,
    EditorModule,
    PickListModule,
    RatingModule,
    NgbModule,
    RadioButtonModule,
    ContextMenuModule,
    StepsModule,
    DataViewModule,
    VirtualScrollerModule,
    Ng2SearchPipeModule,
    ToggleButtonModule,
    PanelModule

  ],
  exports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    MultiSelectModule,
    CheckboxModule,
    ConfirmDialogModule,
    ShopKiranaConfirmDialogComponent,
    ToastModule,
    AutoCompleteModule,
    SlideMenuModule,
    DepotComponent,
    DepotFormComponent,
    HistoryComponent,
    BlockUIModule,
    ProgressSpinnerModule,
    FileUploadModule,
    TooltipModule,
    TabViewModule,
    DragDropModule,
    AccordionModule,
    InputSwitchModule,
    DialogModule,
    EditorModule,
    PickListModule,
    RatingModule,
    NgbModule,
    RadioButtonModule,
    ContextMenuModule,
    StepsModule,
    DataViewModule, VirtualScrollerModule,
    Ng2SearchPipeModule,
    LedgerAutoCompleteComponent,
    PeopleAutoCompleteComponent,
    CustomerAutoCompleteComponent,
    LedgerAutoCompleteComponent,
    LedgerDropDownComponent,
    ItemAutoCompleteComponent,
    SelectedItemListComponent,
    ToggleButtonModule,
    SidebarModule,
    PanelModule,
  ],
  providers: [
    ConfirmationService,
    MessageService,
  ]
})
export class ShaopkiranaSharedModule { }
