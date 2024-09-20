import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutoNotificationHelperService } from 'app/shared/services/auto-notification/auto-notification-helper.service';
import { AutoNotificationService } from 'app/shared/services/auto-notification/auto-notification.service';
import { AutoNotification } from 'app/shared/interface/auto-notification/auto-notification';
import { ANFieldMaster } from 'app/shared/interface/auto-notification/anfield-master';
import { AutoNotificationCondition } from 'app/shared/interface/auto-notification/auto-notification-condition';

@Component({
  selector: 'app-event-condition',
  templateUrl: './event-condition.component.html',
  styleUrls: ['./event-condition.component.scss']
})
export class EventConditionComponent implements OnInit, OnDestroy {
  autoNotification: AutoNotification;
  anFieldMasterList: ANFieldMaster[];
  constructor(private autoNotificationHelperService: AutoNotificationHelperService, private autoNotificationService: AutoNotificationService) { }

  ngOnInit() {
    this.autoNotificationHelperService.autoNotification.subscribe(notification => {
      this.autoNotification = notification;
      this.initialzeOrDestroy(false);
      this.getANFieldMasterList();
    });
  }
  ngOnDestroy() {
    this.initialzeOrDestroy(true);
  }

  onSelectField(condition: AutoNotificationCondition) {
    if (condition.FieldName) {
      let field = this.anFieldMasterList.filter(x => {
        return x.FieldName == condition.FieldName;
      })[0];

      condition.FieldType = field.FieldType;
      condition.DbObjectFieldName = field.DbObjectFieldName;
      condition.SqlQuery = field.SqlQuery;
      this.getOperator(condition);
    } else {
      condition.FieldType = '';
      condition.DbObjectFieldName = '';
      condition.SqlQuery = '';
    }

  }


  private getANFieldMasterList() {
    this.autoNotificationService.ANFieldMaster(this.autoNotification.EntityName).subscribe(x => {
      this.anFieldMasterList = x;
      console.log('this.anFieldMasterList: ', this.anFieldMasterList);
    });
  }

  private initialzeOrDestroy(isDestroy: boolean) {
    this.autoNotification.AutoNotificationConditions = [];
    if (isDestroy) {
      this.autoNotification.AutoNotificationConditions = null;
    } else {
      this.autoNotification.AutoNotificationConditions.push({
        AutoNotificationId: null,
        AutoNotification: null,
        DbObjectFieldName: '',
        FieldName: '',
        FieldType: '',
        Id: null,
        OperatorSign: '',
        SqlQuery: '',
        Value1: '',
        Value2: '',
        operatorMasterList: null
      });
    }

  }

  private getOperator(condition: AutoNotificationCondition) {
    this.autoNotificationService.FieldTypeMaster(condition.FieldType).subscribe(x => {
      condition.operatorMasterList = x;
      console.log('operatorMasterList', x);
    });
  }
}
