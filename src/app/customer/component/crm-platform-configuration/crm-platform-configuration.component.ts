import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-crm-platform-configuration',
  templateUrl: './crm-platform-configuration.component.html',
  styleUrls: ['./crm-platform-configuration.component.scss']
})
export class CrmPlatformConfigurationComponent implements OnInit {
  index: number = -1;
  btnClick : any;
  isDialogOpen : boolean = false; 
  selectedTab : any;
  blocked : boolean = false;
  constructor(  private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {this.selectedTab = 'Configuration'; }

  ngOnInit() {
    // this.messageService.add({ severity: 'success', summary: 'Your Request for Physically Visited is Activated Successfully!', detail: '' });         

  }
  onTabClose(event) {
    this.messageService.add({severity:'info', summary:'Tab Closed', detail: 'Index: ' + event.index})
}

onTabOpen(event) {
    this.messageService.add({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
}
onTabChange(event) { //
  // debugger;
  console.log(event);
  if (event.index == 0) {
    this.selectedTab = 'Configuration';
  } else if (event.index == 1) {
    this.selectedTab = 'CRM';
  }
  else if (event.index == 2) {
    this.selectedTab = 'Platform';
    // this.onBack();
  }
}
  onClick(data)
  {
    this.btnClick = data;
    this.isDialogOpen = true;
    debugger;
  }

  // IsPhysicalVisit(rowdata) {
  //   // debugger;
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to perform this action?',
  //     accept: () => {
  //       if(rowdata.CheckOutReasonId > 0)
  //       {
  //       this.blocked = true;
  //       // this.Id = rowdata.Id;
  //       this._customerProfileService.isPhysiclVisit(rowdata.CheckOutReasonId, rowdata.IsPhysicalVisit).subscribe(result => {
  //         this.blocked = false;
  //         if (result) {                           
  //           this.messageService.add({ severity: 'success', summary: 'Your Request for Physically Visited is Activated Successfully!', detail: '' });         
  //         } else {
  //           this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
  //         }
  //       });
  //     }else{
  //       this.blocked = true;
  //       // this.Id = rowdata.Id;
  //       this._customerProfileService.customerProfilingInsertPhysicalVisit(rowdata.CustomerId).subscribe(result => {
  //         this.blocked = false;
  //         if (result) {                           
  //           this.messageService.add({ severity: 'success', summary: 'Your Request for Physically Visited is Activated Successfully!', detail: '' });         
  //         } else {
  //           this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
  //         }
  //       });
  //     }
  //     },
  //     reject: () => {
  //       rowdata.IsPhysicalVisit = !rowdata.IsPhysicalVisit;
  //       this.messageService.add({ severity: 'error', summary: 'Your Request for Physically Visit Process is Canceled!', detail: '' });
  //     }
  //   });
  // }

}
