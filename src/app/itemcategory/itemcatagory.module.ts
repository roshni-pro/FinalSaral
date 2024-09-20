import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ItemCategoryRoutingModule } from './itemcatagory-routing.module';

import {TableModule} from 'primeng/table';
;

//import { AddPeopleComponent } from './components/people-add/people-add.component';
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import { BaseCategoryComponent } from './components/base-category/base-category.component';
import { AddBaseCategoryComponent } from './components/add-base-category/add-base-category.component';
import { BaseCategoryDetailsComponent } from './components/base-category-details/base-category-details.component';
import { SubSubCategoryComponent } from './components/sub-sub-category/sub-sub-category.component';
import { AddSubSubCategoryComponent } from './components/add-sub-sub-category/add-sub-sub-category.component';
import { SubSubCategoryDetailsComponent } from './components/sub-sub-category-details/sub-sub-category-details.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { AddSubCategoryComponent } from './components/add-sub-category/add-sub-category.component';
import { SubCategoryDetailsComponent } from './components/sub-category-details/sub-category-details.component';
import { CategoryComponent } from './components/category/category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { CategoryimageComponent } from './components/categoryimage/categoryimage.component';
import { AddCategoryImageComponent } from './components/add-category-image/add-category-image.component';
import { CategoryImageDetailsComponent } from './components/category-image-details/category-image-details.component';


//import { DocumentComponent } from './components/do  cument/document.component';
//import { DropdownModule } from 'primeng/primeng';

@NgModule({
  declarations: [BaseCategoryComponent, AddBaseCategoryComponent, BaseCategoryDetailsComponent,
    SubSubCategoryComponent, AddSubSubCategoryComponent,SubSubCategoryDetailsComponent,
    SubCategoryComponent, AddSubCategoryComponent,SubCategoryDetailsComponent,
    CategoryComponent, AddCategoryComponent,CategoryDetailsComponent, CategoryimageComponent, AddCategoryImageComponent, CategoryImageDetailsComponent, ],
  imports: [
    CommonModule,
    ItemCategoryRoutingModule,
    ShaopkiranaSharedModule,
    TableModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    ShaopkiranaSharedModule,
    DropdownModule
   // DropdownModule

  ]


})
export class ItemCategoryModule { }
