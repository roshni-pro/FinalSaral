import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseCategoryComponent } from './components/base-category/base-category.component';
import { AddBaseCategoryComponent } from './components/add-base-category/add-base-category.component';
import { SubSubCategoryComponent } from './components/sub-sub-category/sub-sub-category.component';
import { AddSubSubCategoryComponent } from './components/add-sub-sub-category/add-sub-sub-category.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { AddSubCategoryComponent } from './components/add-sub-category/add-sub-category.component';
import { CategoryComponent } from './components/category/category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { CategoryimageComponent } from './components/categoryimage/categoryimage.component';
import { AddCategoryImageComponent } from './components/add-category-image/add-category-image.component';
import { CategoryImageDetailsComponent } from './components/category-image-details/category-image-details.component';


const routes: Routes = [
  {path: 'basecategory', component: BaseCategoryComponent},
  {path: 'basecategoryadd', component: AddBaseCategoryComponent},
  {path: 'subsubcategory', component: SubSubCategoryComponent},
  {path: 'subsubcategoryadd', component: AddSubSubCategoryComponent},
  {path: 'subcategory', component: SubCategoryComponent},
  {path: 'subcategoryadd', component: AddSubCategoryComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'categoryadd', component: AddCategoryComponent},
  {path: 'categoryimage', component: CategoryimageComponent},
  {path: 'addCategoryimage', component: AddCategoryImageComponent},
  {path: 'categoryimagedetails', component: CategoryImageDetailsComponent},
   
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemCategoryRoutingModule { }
