import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {BlockUIModule} from 'primeng/blockui';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { NvD3Module } from 'ngx-nvd3';
import {ToastModule} from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import {FileUploadModule} from 'primeng/fileupload';
import {RadioButtonModule} from 'primeng/radiobutton';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    BlockUIModule,
    ProgressSpinnerModule,
    TableModule,
    CalendarModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    ScrollPanelModule,
    NvD3Module,
    ToastModule,
    FileUploadModule,
    RadioButtonModule,
    PerfectScrollbarModule
    
  ],
  exports: [
    CommonModule,
    FormsModule,
    BlockUIModule,
    ProgressSpinnerModule,
    TableModule,
    CalendarModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    ScrollPanelModule,
    NvD3Module,
    ToastModule,
    FileUploadModule,
    RadioButtonModule,
    PerfectScrollbarModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})

export class SkSharedModule { }
