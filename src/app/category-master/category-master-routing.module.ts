import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryMasterComponent } from './components/category-master.component';
import { SaleDefaultCategoryComponent } from './components/sale-default-category/sale-default-category.component';


const routes: Routes = [
{  path:'category-master',component:CategoryMasterComponent
},
{path:'Sale-Category', component:SaleDefaultCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryMasterRoutingModule { }
