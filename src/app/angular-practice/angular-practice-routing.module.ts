import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginwithFlexComponent} from './components/loginwith-flex/loginwith-flex.component';
import{WebdashbordComponent} from './components/webdashbord/webdashbord.component'

const routes: Routes = [{
  path:'practice',
  component:LoginwithFlexComponent
},{
  path:"test",
  component:WebdashbordComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AngularPracticeRoutingModule { }
