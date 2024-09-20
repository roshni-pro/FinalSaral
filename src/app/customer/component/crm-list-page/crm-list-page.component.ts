import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InsertCrmPlatformConfigDc } from 'app/customer/interface/insert-crm-platform-config-dc';
import { CrmPlatformConfigService } from 'app/customer/services/crm-platform-config.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-crm-list-page',
  templateUrl: './crm-list-page.component.html',
  styleUrls: ['./crm-list-page.component.scss']
})
export class CrmListPageComponent implements OnInit {
  isAddEditCRM : boolean = false;
  title : any;
  crmList : any;
  blocked : boolean = false;
  crm : any;
  crmTagList : any[]=[];
  insertCrmPlatformConfigDc : InsertCrmPlatformConfigDc;
  crmDetail : any;
  isInvalid: boolean = false;
  constructor(private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _crmPlatformConfigService : CrmPlatformConfigService) { this.crm = {}; }

  ngOnInit() {
    this.getCRMList();
  }
  getCRMList()
  {
    this.blocked = true;
    this._crmPlatformConfigService.cRMPlatformConfigGetList().subscribe(x=>
      {
        this.crmList= x;
        this.blocked = false;
      })
  }
  onAddCRM()
  {
    this.title = 'Add CRM';
    this.crm.Name = null;
    this.crm.IsDigital =  false;
    this.crm.CRMTag = null;
    this.crmTagList = null;
    this.isAddEditCRM = true;
  }
  onEditCRMRow(rowdata)
  {
    debugger;
    this.title = 'Edit CRM';
    this.crm = rowdata;
    this.crmDetail = rowdata;
    if(rowdata.Id > 0)
    {
      this._crmPlatformConfigService.getCRMPlatformConfigById(rowdata.Id).subscribe(x=>
        {
          this.crmTagList = x;
        })
    }
    this.isAddEditCRM = true;
  }
  onActive(rowdata)
  {
  // debugger;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.blocked = true;
        this._crmPlatformConfigService.activeInactiveCRMTag(rowdata.Id, rowdata.IsActive).subscribe(result => {
          this.blocked = false;
          if (result) {                           
            this.messageService.add({ severity: 'success', summary: 'Your Request for IsActive Process is Activated Successfully!', detail: '' });         
            this.getCRMList();
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
  onDelete(rowdata)
  {
  // debugger;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this detail?',
      accept: () => {
        this.blocked = true;
        this._crmPlatformConfigService.deleteCRMPlatformConfig(rowdata.Id).subscribe(result => {
          this.blocked = false;
          if (result) {                           
            this.messageService.add({ severity: 'success', summary: 'Your Request for this Process is Deleted Successfully!', detail: '' });         
            this.getCRMList();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Your Request for Delete Process is Canceled!', detail: '' });
      }
    });
  }
  onAddCRMTag(CRMTag)
  {
    this.crm.CRMTag = null;
    if(CRMTag != null)
    {
      this.crmTagList.push(CRMTag);
    }    
  }
  onSubmit(crmConfig)
  {
    this.crm;
    if (crmConfig.form.status == "VALID") {
    debugger;
    if(this.crmDetail && this.crmDetail.Id > 0)
    {
      this.insertCrmPlatformConfigDc={
        Details : this.crmTagList,
        Id : this.crmDetail.Id,
        IsDigital : this.crm.IsDigital,
        Name : this.crm.Name
      }
      this._crmPlatformConfigService.updateCRMPlatformConfig(this.insertCrmPlatformConfigDc).subscribe(x=>
        {
          debugger;
          if(x)
          {
            this.messageService.add({ severity: 'success', summary: 'Successfully Updated!', detail: '' });         
          }
          this.isAddEditCRM = false;
          this.getCRMList();
        })
    }else{
      this.insertCrmPlatformConfigDc={
        Details : this.crmTagList,
        Id : null,
        IsDigital : this.crm.IsDigital,
        Name : this.crm.Name
      }
      this._crmPlatformConfigService.insertCRMPlatformConfig(this.insertCrmPlatformConfigDc).subscribe(x=>
        {
          debugger;
          if(x)
          {
            this.messageService.add({ severity: 'success', summary: 'Successfully Added!', detail: '' });         
          }
          this.isAddEditCRM = false;
          this.getCRMList();
        })
    }
  } else{
    this.isInvalid = true;
    this.messageService.add({severity:'error', summary: 'Please Fill required Field!', detail:''});
  }
  
  }
  removeSelected(tag)
  {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        
        console.log("from html",tag);
        var b = this.crmTagList.findIndex(x=> x == tag);
        this.crmTagList.splice(b, b)
    
        console.log("crmTagList list", this.crmTagList); 
        this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
      }
     
    });
  }
  
}
