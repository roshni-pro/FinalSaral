import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { TableModule } from 'primeng/table';
import { DeletePeopleComponent } from './components/delete-people/delete-people.component';
import { DocumentComponent } from './components/document/document.component';
import { PeoplePilotComponent } from './components/people-pilot/people-pilot.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { CountryComponent } from './components/country/country.component';
import { CountryEditComponent } from './components/country-edit/country-edit.component';
import { ZoneListComponent } from './components/zone-list/zone-list.component';
import { ZoneComponent } from './components/zone/zone.component';
import { StateComponent } from './components/state/state.component';
import { StateListComponent } from './components/state-list/state-list.component';
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
import { AgentDetailsComponent } from './components/agent-details/agent-details.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { DepartmentDetailsComponent } from './components/department-details/department-details.component';
import { DesignationDetailsComponent } from './components/designation-details/designation-details.component';
import { CityDetailsComponent } from './components/city-details/city-details.component';
import { StateDetailsComponent } from './components/state-details/state-details.component';
import { SkillDetailsComponent } from './components/skill-details/skill-details.component';
import { ZoneDetailsComponent } from './components/zone-details/zone-details.component';
import { DocumentEditComponent } from './components/document-edit/document-edit.component';
import { DocumentDetailsComponent } from './components/document-details/document-details.component';
import { RoleComponent } from './components/role/role.component';
import { RoleAddComponent } from './components/role-add/role-add.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { RegionComponent } from './components/region/region.component';
import { RegionDetailsComponent } from './components/region-details/region-details.component';
import { RegionEditComponent } from './components/region-edit/region-edit.component';
import { RoleDetailsComponent } from './components/role-details/role-details.component';
import { PeopleComponent } from './components/people/people.component';
import { AddPeopleComponent } from './components/add-people/add-people.component';
import { PeopleDetailsComponent } from './components/people-details/people-details.component';
import { MembershipPageComponent } from './components/membership-page/membership-page.component';
import { MembershipEditComponent } from './components/membership-edit/membership-edit.component';
import { ActivatePeopleComponent } from './components/activate-people/activate-people.component';

@NgModule({
  declarations: [PeopleComponent, AddPeopleComponent, PeopleDetailsComponent, DeletePeopleComponent, DocumentComponent, PeoplePilotComponent, CountryComponent, CountryEditComponent,
    ZoneComponent, ZoneListComponent, StateComponent, StateListComponent, CityComponent, CityEditComponent, DepartmentComponent, DepartmentEditComponent,
    SkillComponent, SkillEditComponent, DesignationComponent, DesignationEditComponent, AgentComponent, AgentEditComponent, AgentDetailsComponent,
    CountryDetailsComponent, DepartmentDetailsComponent, DesignationDetailsComponent, CityDetailsComponent, StateDetailsComponent, SkillDetailsComponent,
    ZoneDetailsComponent, DocumentEditComponent, DocumentDetailsComponent, RegionComponent, RegionDetailsComponent, RegionEditComponent, RoleComponent, RoleDetailsComponent, RoleAddComponent, MembershipPageComponent, MembershipEditComponent, ActivatePeopleComponent],

  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    NgbModule,
    ShaopkiranaSharedModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule

  ]


})
export class AdminModule { }
