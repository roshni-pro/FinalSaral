import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ANEntityMaster } from 'app/shared/interface/auto-notification/anentity-master';
import { ANScheduleMaster } from 'app/shared/interface/auto-notification/anschedule-master';
import { ANFrequencyMaster } from 'app/shared/interface/auto-notification/anfrequency-master';
import { FieldTypeMaster } from 'app/shared/interface/auto-notification/field-type-master';
import { ANFieldMaster } from 'app/shared/interface/auto-notification/anfield-master';
import { OperatorMaster } from 'app/shared/interface/auto-notification/operator-master';
import { AutoNotification } from 'app/shared/interface/auto-notification/auto-notification';

@Injectable({
  providedIn: 'root'
})
export class AutoNotificationService {

  apiURL: string;
  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  ANEntityMaster(): Observable<ANEntityMaster[]> {
    return this.httpClient.get<ANEntityMaster[]>(this.apiURL + '/api/AutoNotification/ANEntityMaster');
  }

  City(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiURL + '/api/AutoNotification/City');
  }

  Warehouse(cityid: number): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiURL + '/api/AutoNotification/Warehouse/cityid/' + cityid);
  }

  Cluster(warehouseid: number): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiURL + '/api/AutoNotification/Cluster/warehouseid/' + warehouseid);
  }

  ANScheduleMaster(): Observable<ANScheduleMaster[]> {
    return this.httpClient.get<ANScheduleMaster[]>(this.apiURL + '/api/AutoNotification/ANScheduleMaster');
  }

  ANFrequencyMasters(): Observable<ANFrequencyMaster[]> {
    return this.httpClient.get<ANFrequencyMaster[]>(this.apiURL + '/api/AutoNotification/ANFrequencyMasters');
  }

  ANFieldMaster(entityName: string): Observable<ANFieldMaster[]> {
    return this.httpClient.get<ANFieldMaster[]>(this.apiURL + '/api/AutoNotification/ANFieldMaster/EntityName/' + entityName);
  }

  FieldTypeMaster(fieldType: string): Observable<OperatorMaster[]> {
    return this.httpClient.get<OperatorMaster[]>(this.apiURL + '/api/AutoNotification/FieldTypeMaster/FieldType/' + fieldType);
  }

  // SaveAutoNotification(autoNotification: AutoNotification): Observable<AutoNotification> {
  //   return this.httpClient.post<AutoNotification>(this.apiURL + '/api/AutoNotification/AutoNotification', autoNotification);
  // }
  SaveAutoNotification(autoNotification: AutoNotification): Observable<AutoNotification> {
    return this.httpClient.post<AutoNotification>(this.apiURL + '/api/AutoNotification/AutoNotificationCheck', autoNotification);
  }
  

  PublishNotification(autoNotificationID: number){
    return this.httpClient.get<AutoNotification>(this.apiURL + '/api/AutoNotification/PublishNotification/'+ autoNotificationID );
  }

  IsActiveNotification(autoNotificationID: number,isActive: boolean){
    
    return this.httpClient.get<any>(this.apiURL + '/api/AutoNotification/ActiveInactive/'+ autoNotificationID +"/"+ isActive );
  }
 
  GetBankMatch(name: string):  Observable<AutoNotification> {
    
    return this.httpClient.get<AutoNotification>(this.apiURL + '/api/AutoNotification/GetMatch?Name='+ name);
  }
}
