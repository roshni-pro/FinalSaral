import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { RolepagepermissionService } from 'app/shared/services/rolepagepermission.service';
import { SelectItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClusterService } from 'app/shared/services/cluster.service';
import { VehiclesService } from 'app/shared/services/vehicles.service';
import { PeopleService } from 'app/shared/services/people.service';
import { AgentService } from 'app/shared/services/agent.service';


@Component({
  selector: 'app-addagent',
  templateUrl: './addagent.component.html',
  styleUrls: ['./addagent.component.scss']
})
export class AddagentComponent implements OnInit {
  dataselect: any[];
  @Input() AgentId: any;
  @Input() ClusterId: number;
  @Input() WarehouseId: number;
  selectedAgentList: any;
  requestData: any;
  blocked:any;
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();

  constructor(private agentservice: AgentService, private clusterService: ClusterService, private messageService: MessageService, private router: Router) {

  }

  ngOnInit() {

    this.selectedAgentList = [];
    this.clusterService.GetAgentClusterWise(this.ClusterId, this.WarehouseId).subscribe(result => {
      
      console.log('Result is : ', result);
      this.dataselect = result;
      if(this.dataselect && this.dataselect.length > 0){
        this.selectedAgentList = this.dataselect.filter(x => {return x.Selected == true}) 
      }
      console.log('dataselect is : ', this.dataselect);
    })

  }

  goToPage() {
    this.isdetailsclose.emit();
  }


  Save() {
    console.log('cluster : ', this.ClusterId);
    console.log('Id of Agent ID is : ', this.selectedAgentList);

    let savingAgentList = [];
    
    if (this.selectedAgentList && this.selectedAgentList.length > 0) {
      this.selectedAgentList.forEach(item => {
        savingAgentList.push({
          ClusterId: this.ClusterId,
          // AgentId: item.PeopleID,
          AgentId: item.id,
          active: true,
          Deleted: false
        });
      });
    }
    else if (this.selectedAgentList.length == 0) {
      
      
        savingAgentList.push({
          ClusterId: this.ClusterId,
          // AgentId: item.PeopleID,
          AgentId: null,
          active: false,
          Deleted: false
        });
     
    }
    this.blocked = true;
    this.clusterService.AddAgents(savingAgentList).subscribe(result => {
      this.dataselect = result;
      this.blocked = false;
      this.refreshParent.emit();
      this.messageService.add({ severity: 'success', summary: 'Cluster Agent Updated Successfully!', detail: '' });
    });

  }
}
