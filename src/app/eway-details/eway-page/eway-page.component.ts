import { Component, OnInit } from '@angular/core';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';

@Component({
  selector: 'app-eway-page',
  templateUrl: './eway-page.component.html',
  styleUrls: ['./eway-page.component.scss']
})
export class EwayPageComponent implements OnInit {
  roleName: any;
  roleList: any;
  roleListarry: boolean = true;
  constructor(private peoplePilot: PepolePilotService) { }

  ngOnInit() {
    this.peoplePilot.GetUserRole().subscribe(result => {
      localStorage.setItem('role', result);
      this.roleName = localStorage.getItem('role');
      this.roleList = this.roleName.split(',');
      console.log(this.roleList);
      
      for (var i in this.roleList) {
        if (this.roleList[i] == 'WH delivery planner' || this.roleList[i] == 'Outbound Lead' || this.roleList[i] == 'Hub delivery planner') {
          this.roleListarry = false;
        } 
      }
    });
  }

}
