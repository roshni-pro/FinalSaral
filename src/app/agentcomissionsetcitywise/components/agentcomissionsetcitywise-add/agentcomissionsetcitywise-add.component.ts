import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AgentcomissionsetcitywiseService } from 'app/shared/services/agentcomissionsetcitywise.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AnyARecord } from 'dns';

@Component({
  selector: 'app-agentcomissionsetcitywise-add',
  templateUrl: './agentcomissionsetcitywise-add.component.html',
  styleUrls: ['./agentcomissionsetcitywise-add.component.scss']
})
export class AgentcomissionsetcitywiseAddComponent implements OnInit {
  @Output() isdetailsclose = new EventEmitter<boolean>();
  @Output() refreshParent = new EventEmitter();
  cityList: any;
  Comission: any;
  loadingOnSubmit:boolean;
  Id:any;
  isInvalid:any;



  constructor(private agentcomission: AgentcomissionsetcitywiseService, private router: Router, private messageService: MessageService) { this.Comission = {}; }

  ngOnInit() {
    this.loadingOnSubmit=false;
    this.Comission.CommissionType = '';
    this.Comission.Cityid = '';

    this.agentcomission.GetAllCity().subscribe(result => {
      this.cityList = result;


    })


  }
  onCancel() {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('layout/agentcomissionsetcitywise/agentcomissionsetcitywise')
  }
  Addagentcomission(Comission,agentcommissionForm) {

  if (agentcommissionForm.form.status == "VALID" && Comission.CommissionAmount > 0) {
      if (this.Id == null ) {
    
  
   
    this.loadingOnSubmit=true;
    this.agentcomission.addagentcomissioncitywise(Comission).subscribe(result => {
      
      this.messageService.add({ severity: 'success', summary: 'Add Successfully!', detail: '' });
      setTimeout(() => {
        this.router.navigateByUrl('layout/agentcomissionsetcitywise/agentcomissionsetcitywise');
      }, 1000);

    })

      }
    }
    else{
      this.isInvalid = true;
    }
    if (Comission.CommissionAmount == 0) {
      this.messageService.add({severity:'error', summary: 'Comission amount can not be null or zero!', detail:''});
         }
   
 
}
}

