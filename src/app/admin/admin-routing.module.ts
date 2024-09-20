import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from './components/people/people.component';
import { DeletePeopleComponent } from './components/delete-people/delete-people.component';
import { DocumentComponent } from './components/document/document.component';
import { AddPeopleComponent } from './components/add-people/add-people.component';
import { CountryComponent } from './components/country/country.component';
import { CountryEditComponent } from './components/country-edit/country-edit.component';
import { ZoneListComponent } from './components/zone-list/zone-list.component';
import { ZoneComponent } from './components/zone/zone.component';
import { StateListComponent } from './components/state-list/state-list.component';
import { StateComponent } from './components/state/state.component';
import { CityComponent } from './components/city/city.component';
import { CityEditComponent } from './components/city-edit/city-edit.component';
import { DepartmentComponent } from './components/department/department.component';
import { DepartmentEditComponent } from './components/department-edit/department-edit.component';
import { SkillComponent } from './components/skill/skill.component';
import { SkillEditComponent } from './components/skill-edit/skill-edit.component';
import { DesignationComponent } from './components/designation/designation.component';
import { DesignationEditComponent } from './components/designation-edit/designation-edit.component';
import { AgentComponent } from './components/agent/agent.component';
import { AgentEditComponent } from './components/agent-edit/agent-edit.component';
import { DocumentEditComponent } from './components/document-edit/document-edit.component';
import { RegionComponent } from './components/region/region.component';
import { RegionEditComponent } from './components/region-edit/region-edit.component';
import { RoleComponent } from './components/role/role.component';
import { RoleAddComponent } from './components/role-add/role-add.component';
import { MembershipPageComponent } from './components/membership-page/membership-page.component';
import { MembershipEditComponent } from './components/membership-edit/membership-edit.component';
import { ActivatePeopleComponent } from './components/activate-people/activate-people.component';

const routes: Routes = [
 { path: 'people', component: PeopleComponent},
 { path: 'deletepeople', component: DeletePeopleComponent},
 { path:'document', component: DocumentComponent},
 { path:'AddPeople', component: AddPeopleComponent},
 { path:'country', component: CountryComponent},
 { path:'country-edit', component: CountryEditComponent},
 { path:'agent', component: AgentComponent},
 { path:'add-agent', component: AgentEditComponent},
 { path:'zone', component: ZoneComponent},
 { path:'zone-list', component: ZoneListComponent},
 { path:'state', component: StateComponent},
 { path:'state-list', component: StateListComponent},
 { path:'city', component: CityComponent},
 { path:'city-edit', component: CityEditComponent},
 { path:'department', component: DepartmentComponent},
 { path:'department-edit', component: DepartmentEditComponent},
 { path:'skill', component: SkillComponent},
 { path:'skill-edit', component: SkillEditComponent},
 { path:'designation', component: DesignationComponent},
 { path:'designation-edit', component: DesignationEditComponent},
 { path:'document-edit', component: DocumentEditComponent},
 { path:'region', component: RegionComponent},
 { path:'region-edit', component: RegionEditComponent},
 
 { path:'role', component: RoleComponent },
 { path:'role-add', component: RoleAddComponent },
 { path:'membership-page', component: MembershipPageComponent },
 { path:'membership-edit/:Id', component: MembershipEditComponent },
 { path:'activate-people-profile', component: ActivatePeopleComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
