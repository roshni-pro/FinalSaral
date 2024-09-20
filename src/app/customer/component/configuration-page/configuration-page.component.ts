import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrmPlatformConfigService } from 'app/customer/services/crm-platform-config.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-configuration-page',
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.scss']
})
export class ConfigurationPageComponent implements OnInit {

  isAddEditConfig : boolean = false;
  title : any;
  configList : any[]=[];
  blocked : boolean = false;
  totalcount : number = 0;
  cols: any[];
  arrayList : any[]=[];
  childList : any[]=[];
  parentList : any[]=[];
  tempList : any[]=[];
  constructor(private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _crmPlatformConfigService : CrmPlatformConfigService) { this.title = 'Add CRM'; }

  ngOnInit() {
    this.getConfigList();
  }
  getConfigList()
  {
    this._crmPlatformConfigService.cRMPlatformMappingGetList().subscribe(x=>
      {
        this.childList = [];
        debugger;
        x.forEach(element => {
          let platformObj = {
            CrmId : element.CrmId,
            CRMPlatformId : element.CRMPlatformId,
            CRMPlatformName: element.CRMPlatformName,
            CRMPlatformMappingId : element.CRMPlatformMappingId,
            Active : element.CRMPlatformMappingId > 0 ? true : false
          }
          // let childObj = [];
          this.childList.push(platformObj);
        });
        x.forEach(element => {
          let platformObj = {
            CrmId : element.CrmId,
            CRMPlatformId : element.CRMPlatformId,
            CRMPlatformName: element.CRMPlatformName,
            CRMPlatformMappingId : element.CRMPlatformMappingId,
            Active : element.CRMPlatformMappingId > 0 ? true : false
          }
          // let childObj = [];
          if(this.tempList && this.tempList.length > 0)
          {
            var existId = this.tempList.filter(x=>x.CRMPlatformId == element.CRMPlatformId);
            if(existId == null || existId.length == 0)
            {
              this.tempList.push(platformObj);
            }  
          }else{
            this.tempList.push(platformObj);
          }

        });
        x.forEach(element => {
          let parentObj = {
            CrmId : element.CrmId,
            CrmName : element.CrmName,
            childObj : []
          }
          if(this.parentList && this.parentList.length > 0)
          {
            var lst = this.parentList.filter(x=>x.CrmId == parentObj.CrmId);
            if(lst == null || lst.length == 0)
            {
              this.parentList.push(parentObj);
            }
          }else{
            this.parentList.push(parentObj);
          }
          
        });
        this.parentList.forEach(element => {
          this.childList.forEach(ele => {
            if(element.CrmId == ele.CrmId)
            {
              element.childObj.push(ele);
            }            
          });
          this.configList = this.parentList;
        });
        // this.childList.forEach(element => {
        //   let obj=
        //     {field : element.CRMPlatformName, value : element.CRMPlatformMappingId}
        //   this.cols.push(obj);
        // });
        console.log(this.childList,'cols');
        console.log(this.parentList,'parentList');
        console.log(this.configList,'configList');
        console.log(this.tempList,'tempList');
      })
  }
  onAddConfig()
  {
    this.title = 'Add Config';
    this.isAddEditConfig = true;
  }
  onEditConfigRow(rowdata)
  {
    this.title = 'Edit Config';
    this.isAddEditConfig = true;
  }
  onActive(rowdata)
  {
  // debugger;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.blocked = true;
        // this.Id = rowdata.Id;
        // this._customerProfileService.isPhysiclVisit(rowdata.CheckOutReasonId, rowdata.IsPhysicalVisit).subscribe(result => {
        //   this.blocked = false;
        //   if (result) {                           
        //     this.messageService.add({ severity: 'success', summary: 'Your Request for Physically Visited is Activated Successfully!', detail: '' });         
        //   } else {
        //     this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
        //   }
        // });
      },
      reject: () => {
        rowdata.IsPhysicalVisit = !rowdata.IsPhysicalVisit;
        this.messageService.add({ severity: 'error', summary: 'Your Request for Physically Visit Process is Canceled!', detail: '' });
      }
    });
  }
  onActiveConfig(col,config)
  {
    debugger;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.blocked = true;
        this._crmPlatformConfigService.activeInactiveCRMPlatformMapping(col.CrmId, col.CRMPlatformId,col.Active).subscribe(result => {
          this.blocked = false;
          if (result) {                           
            this.messageService.add({ severity: 'success', summary: 'Your Request for IsActive Process is Activated Successfully!', detail: '' });         
            this.getConfigList();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Your Request for IsActive Process is Canceled!', detail: '' });
      }
    });
  }
  
}
