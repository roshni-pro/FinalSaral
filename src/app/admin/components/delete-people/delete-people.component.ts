import { Component, OnInit } from '@angular/core';

import { DeletePeopleService } from 'app/shared/services/delete-people.service';
import {LazyLoadEvent} from 'primeng/api';
import {Router} from '@angular/router';
@Component({
  selector: 'app-delete-people',
  templateUrl: './delete-people.component.html',
  styleUrls: ['./delete-people.component.scss']
})
export class DeletePeopleComponent implements OnInit {

  
  deletepeopleList: any[];
  Deletepeoples: any;
/* loading : boolean;
  datasource: any; */

  constructor(private deletepeopleservice : DeletePeopleService, private router:Router){
   
  }

  ngOnInit() {
    this.deletepeopleservice.getremovedpeople().subscribe(result=>{
      this.deletepeopleList = result;
      console.log('this.deletepeopleList' , this.deletepeopleList)
    });
    console.log(this.Deletepeoples)
  }
  active(){
    var people = []
    console.log(this.Deletepeoples);
   
    this.deletepeopleservice.unDeletePeoples(this.Deletepeoples[0].PeopleID).subscribe(result=>{
    this.ngOnInit();
    });
  }
/*  deletepeople(event: LazyLoadEvent) {
    this.loading = true;

    setTimeout(() => {
      if (this.datasource) {
          this.deletepeopleList = this.datasource.slice(event.first, (event.first + event.rows));
          this.loading = false;
      }
  }, 1000);
} */
  }

