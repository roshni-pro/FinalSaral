import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InsertCrmPlatformConfigDc } from 'app/customer/interface/insert-crm-platform-config-dc';
import { CrmPlatformConfigService } from 'app/customer/services/crm-platform-config.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-platform-list-page',
  templateUrl: './platform-list-page.component.html',
  styleUrls: ['./platform-list-page.component.scss']
})
export class PlatformListPageComponent implements OnInit {

  isAddEditPlatform : boolean = false;
  title : any;
  platformList : any;
  blocked : boolean = false;
  totalcount : number = 0;
  insertCrmPlatformConfigDc : InsertCrmPlatformConfigDc;
  platformDetail : any;
  platform : any;
  isInvalid : boolean = false;
  isOpenPopup : boolean = false;

  constructor(private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _crmPlatformConfigService : CrmPlatformConfigService) { this.title = 'Add Platform';this.platform = {}; }

  ngOnInit() {
    this.getPlatformList();
  }
  getPlatformList()
  {
    this.blocked = true;
    this._crmPlatformConfigService.cRMPlatformGetList().subscribe(x=>
      {
        this.platformList= x;
        debugger;
        this.blocked = false;
      })
  }
  onAddPlatform()
  { 
    this.title = 'Add Platform';
    this.platform.Name = null;
    this.isAddEditPlatform = true;
  }
  onEditPlatformRow(rowdata)
  {
    debugger;
    this.title = 'Edit Platform';
    this.platform = rowdata;
    this.platformDetail = rowdata;
    this.isAddEditPlatform = true;
  }
  onDelete(rowdata)
  {
  // debugger;
  this.isOpenPopup = true;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this detail?',
      accept: () => {
        this.blocked = true;
        this._crmPlatformConfigService.deleteCRMPlatform(rowdata.Id).subscribe(result => {
          this.blocked = false;
          if (result) {                           
            this.isOpenPopup = false;
            this.messageService.add({ severity: 'success', summary: 'Your Request for this Process is Deleted Successfully!', detail: '' });         
            this.getPlatformList();
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
  onSubmit(platformConfig)
  {
    this.platform;
    if (platformConfig.form.status == "VALID") {
    debugger;
    if(this.platformDetail && this.platformDetail.Id > 0)
    {
      this.insertCrmPlatformConfigDc={
        Details : null,
        Id : this.platformDetail.Id,
        IsDigital : false,
        Name : this.platform.Name
      }
      this._crmPlatformConfigService.updateCRMPlatform(this.insertCrmPlatformConfigDc).subscribe(x=>
        {
          debugger;
          if(x)
          {
            this.messageService.add({ severity: 'success', summary: 'Successfully Updated!', detail: '' });         
          }
          this.isAddEditPlatform = false;
          this.getPlatformList();
        })
    }else{
      this.insertCrmPlatformConfigDc={
        Details : null,
        Id : null,
        IsDigital : false,
        Name : this.platform.Name
      }
      this._crmPlatformConfigService.insertCRMPlatform(this.insertCrmPlatformConfigDc).subscribe(x=>
        {
          debugger;
          if(x)
          {
            this.messageService.add({ severity: 'success', summary: 'Successfully Added!', detail: '' });         
          }
          this.isAddEditPlatform = false;
          this.getPlatformList();
        })
    }
  } else{
    this.isInvalid = true;
    this.messageService.add({severity:'error', summary: 'Please Fill required Field!', detail:''});
  }
  
  }
  
}
