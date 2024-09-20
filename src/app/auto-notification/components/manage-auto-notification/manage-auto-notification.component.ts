import { Component, OnInit } from '@angular/core';
import { AutoNotificationService } from 'app/shared/services/auto-notification/auto-notification.service';
import { ANEntityMaster } from 'app/shared/interface/auto-notification/anentity-master';
import { AutoNotification } from 'app/shared/interface/auto-notification/auto-notification';
import { AutoNotificationHelperService } from 'app/shared/services/auto-notification/auto-notification-helper.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-auto-notification',
  templateUrl: './manage-auto-notification.component.html',
  styleUrls: ['./manage-auto-notification.component.scss']
})
export class ManageAutoNotificationComponent implements OnInit {
  autoNotificationId: number;
  autoNotification: AutoNotification;
  anEntityMasterList: ANEntityMaster[];
  isNotificationMasterSelected: boolean;
  isMasterFormInvalid: boolean;
  selectedANEntityMaster: ANEntityMaster;

  actionEntity: any;
  AutoNotificationTitle: any;
  constructor(private autoNotificationService: AutoNotificationService, private autoNotificationHelperService: AutoNotificationHelperService, private route: ActivatedRoute,  private messageService: MessageService) { }

  ngOnInit() {
    this.autoNotificationId = Number(this.route.snapshot.paramMap.get("autoNotificationID"));
    console.log('  this.autoNotificationId: ', this.autoNotificationId);
    if (this.autoNotificationId > 0) {
      this.selectedANEntityMaster = null;
      this.isMasterFormInvalid = false;
      this.isNotificationMasterSelected = false;
    } else {
      this.initializeAutoNotification();
      this.autoNotificationService.ANEntityMaster().subscribe(result => {
        this.anEntityMasterList = result;
        console.log('anNotificationMasterList: ', result);
      });
    }


  }



  initializeAutoNotification() {
    this.selectedANEntityMaster = null;
    this.isMasterFormInvalid = false;
    this.isNotificationMasterSelected = false;
    this.autoNotificationHelperService.initializeAutoNotification();
    this.autoNotificationHelperService.autoNotification.subscribe(notification => {
      this.autoNotification = notification;
      console.log('autoNotification:', this.autoNotification);
    });

    this.actionEntity = {
      Add: false,
      Edit: false,
      Delete: false
    }
  }

  onSelectUnselectAutoNotification(masterForm) {
    console.log('masterForm: ', masterForm );
    if (!this.isNotificationMasterSelected && masterForm.form.status == "INVALID") {
      this.isMasterFormInvalid = true;
      return;
    }
    else {
      this.isMasterFormInvalid = false;
      this.isNotificationMasterSelected = !this.isNotificationMasterSelected;
    }

    if (this.isNotificationMasterSelected) {
      this.selectedANEntityMaster = this.anEntityMasterList.filter(x => { return x.EntityName == this.autoNotification.EntityName })[0];
      this.autoNotification.ClassName = this.selectedANEntityMaster.ClassName;
    } else {
      this.resetNotification();
    }
  }

  onEventTypeChange() {
    //this.autoNotificationHelperService.updateAutoNotification(this.autoNotification);
  }

  private resetNotification() {
    this.selectedANEntityMaster = null;
    this.autoNotification.EntityName = '';
    this.autoNotification.DbObjectName = '';
    this.isMasterFormInvalid = false;
    this.isNotificationMasterSelected = false;
    this.autoNotificationHelperService.reset();
  }

  onEntityNameChange() {
    if (this.autoNotification.EntityName) {
      const entity = this.anEntityMasterList.filter(x => {
        return x.EntityName == this.autoNotification.EntityName;
      })[0];
      this.autoNotification.DbObjectName = entity.DbObjectName;
    } else {
      this.autoNotification.DbObjectName = '';
    }
  }


  onChangeAction(actionName: string) {
    if (actionName == 'Add') {
      //this.actionEntity.Add = !this.actionEntity.Add;
      this.actionEntity.Edit = false;
      this.actionEntity.Delete = false;
    } else if (actionName == 'Edit') {
      //this.actionEntity.Edit = !this.actionEntity.Edit;
      this.actionEntity.Add = false;
      this.actionEntity.Delete = false;
    } else if (actionName == 'Delete') {
      //this.actionEntity.Delete = !this.actionEntity.Delete;
      this.actionEntity.Add = false;
      this.actionEntity.Edit = false;
    } else {
      this.actionEntity.Add = false;
      this.actionEntity.Edit = false;
      this.actionEntity.Delete = false;
    }
    this.update(actionName);
  }

  update(actionName: string) {
    this.autoNotification.EntityAction = '';
    if (actionName == 'Add' && this.actionEntity.Add) {
      this.autoNotification.EntityAction = 'A';
    } else if (actionName == 'Edit' && this.actionEntity.Edit) {
      this.autoNotification.EntityAction = 'E';
    } else if (actionName == 'Delete' && this.actionEntity.Delete) {
      this.autoNotification.EntityAction = 'D';
    }

  }

  TitleSearch(AutoNotificationTitle){
    
    this.autoNotificationService.GetBankMatch(AutoNotificationTitle).subscribe(result =>{
      if(result == null)
      {
        console.log('AutoNotificationTitle Check :::: ',result);
        this.messageService.add({ severity: 'error', summary: 'AutoNotificationTitle Already Exist!', detail: '' });
      }  
      console.log('AutoNotificationTitle Name :::: ',result);  
    });
    
  }

}
