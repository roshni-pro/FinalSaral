import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PeopleService } from 'app/shared/services/people.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-people-pilot',
  templateUrl: './people-pilot.component.html',
  styleUrls: ['./people-pilot.component.scss']
})
export class PeoplePilotComponent implements OnInit {
  @Input() peopleID: number;
  @Input() expanded: {};
  // @Output() close: EventEmitter<any> = new EventEmitter();

  people: any;


    stateList: any[];
  designationList: any;

  cityList: any;

  warehouseList: any[];
  departmentList: any;
  selectedDepartment: any;
  statusList: any;
  selectedStatus: any;
  isExpanded : boolean
  //selectedPeople: People;

  constructor(private pepolePilotService: PepolePilotService ,private router:Router) { this.isExpanded = false; }

  ngOnInit() {

    console.log('expanded: ', this.expanded);
    this.pepolePilotService.GetAllRoles().subscribe(result => {
      console.log();
    });

    this.pepolePilotService.City().subscribe(result => {
      this.cityList = result;
      console.log('this.cityList: ', this.cityList);
    });
    this.pepolePilotService.Designation().subscribe(result => {
      this.designationList = result;
      console.log('this.designationList:', result);


    });

    this.pepolePilotService.Warehouse().subscribe(result => {
      this.warehouseList = result;
      console.log('this.warehouseList :', result);
    });


    this.pepolePilotService.all().subscribe(result => {
      this.departmentList = result;
      console.log(result);
    });

    this.pepolePilotService.States().subscribe(result => {
      this.stateList = result;
      console.log('this.stateList :', result);
      this.pepolePilotService.GetByID(this.peopleID).subscribe(result => {
        this.people = result;
        this.updatePeopleData();
        console.log('GetByID: ', this.people);
      })

    });


  }


  onclick(){
    console.log(this.people)
    this.pepolePilotService.UpdatePeople(this.people).subscribe(result => {
      alert("People Updated");
     // this.expanded = false;
    },
    (err)=>{
      alert("error")
   
    });
  }

  onCancel(){
    console.log(this.expanded)
    
  }

  updatePeopleData() {
    if (this.people) {
      this.people.DOB = this.people.DOB ? new Date(this.people.DOB) : null;
      this.people.DataOfJoin = this.people.DataOfJoin ? new Date(this.people.DataOfJoin) : null;
      this.people.EndDate = this.people.EndDate ? new Date(this.people.EndDate) : null;
      this.people.DataOfMarriage = this.people.DataOfMarriage ? new Date(this.people.DataOfMarriage) : null;
    }
  }



}
