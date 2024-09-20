import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AutoNotification } from 'app/shared/interface/auto-notification/auto-notification';

@Injectable({
  providedIn: 'root'
})
export class AutoNotificationHelperService {

  autoNotification: BehaviorSubject<AutoNotification>;
  constructor() { }

  // updateAutoNotification(autoNotification: AutoNotification){
  //   this.autoNotification.next(autoNotification);
  // }

  initializeAutoNotification() {
    let autoNotification: AutoNotification = {
      ANEventType: '',
      ANFrequencyMaster: null,
      ANFrequencyMasterId: null,
      ANScheduleMaster: null,
      ANScheduleMasterId: null,
      ANType: '',
      AutoDialAudioFile: '',
      AutoDialAudioText: '',
      AutoDialUrl: '',
      AutoNotificationConditions: null,
      CityId: null,
      ClusterId: null,
      CreatedBy: null,
      CreatedDate: null,
      DbObjectName: '',
      EndDate: null,
      EntityName: '',
      Id: null,
      IsActive: true,
      IsDeleted: false,
      IsPublish: false,
      ModifiedBy: null,
      ModifiedDate: null,
      PublishBy: null,
      PublishDate: null,
      RecurEvery: null,
      SqlQuery: '',
      StartDate: null,
      TextMessage: '',
      TextNotification: '',
      WarehouseId: null,
      FCMNotification: '',
      EntityAction:'',
      IsCustomerNotification: false,
      IsPeopleNotification: false,
      IsSupplierNotification: false,
      AutoNotificationTitle:'',
      ClassName:''
    }
    this.autoNotification = new BehaviorSubject<AutoNotification>(autoNotification);
  }

  reset() {
    this.autoNotification.subscribe(x => {
      x.ANEventType = '';
      x.ANFrequencyMaster = null;
      x.ANFrequencyMasterId = null;
      x.ANScheduleMaster = null;
      x.ANScheduleMasterId = null;
      x.ANType = '';
      x.AutoDialAudioFile = '';
      x.AutoDialAudioText = '';
      x.AutoDialUrl = '';
      x.AutoNotificationConditions = null;
      x.CityId = null;
      x.ClusterId = null;
      x.CreatedBy = null;
      x.CreatedDate = null;
      x.DbObjectName = '';
      x.EndDate = null;
      x.EntityName = '';
      x.Id = null;
      x.IsActive = true;
      x.IsDeleted = false;
      x.IsPublish = false;
      x.ModifiedBy = null;
      x.ModifiedDate = null;
      x.PublishBy = null;
      x.PublishDate = null;
      x.RecurEvery = null;
      x.SqlQuery = '';
      x.StartDate = null;
      x.TextMessage = '';
      x.TextNotification = '';
      x.WarehouseId = null;
      x.FCMNotification = '';
      x.IsCustomerNotification = false;
      x.IsPeopleNotification = false;
      x.IsSupplierNotification = false;
      x.EntityAction = '';
    })
  }
}
