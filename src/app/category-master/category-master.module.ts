import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryMasterRoutingModule } from './category-master-routing.module';
import { CategoryMasterComponent } from './components/category-master.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SaleDefaultCategoryComponent } from './components/sale-default-category/sale-default-category.component';

@NgModule({
  declarations: [CategoryMasterComponent, SaleDefaultCategoryComponent],
  imports: [
    CommonModule,
    CategoryMasterRoutingModule,
    MultiSelectModule,
    ShaopkiranaSharedModule,
    TableModule,
  DialogModule,
CalendarModule,
ProgressSpinnerModule 
  ]
})
export class CategoryMasterModule { }
