import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class SurveyModuleService {

  apiURL: string;
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }


  GetServey(Id:number):  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SurveyModule/GetServey?warehouseid='+Id);
  }

  AddServeyQuestionaries(list:any):  Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/SurveyModule/AddServeyQuestionaries?serveydata=',list);
  }

  UpdateServeyQuestionaries(Serveydata:any):  Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/SurveyModule/UpdateServeyQuestionaries?serveydata=',Serveydata);
  }
  
  deleteSurvey(surveyId:number,WarehouseId:number):  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SurveyModule/DeleteSurvey?serveyid='+ surveyId + '&WarehouseId=' + WarehouseId);
  }

  searchServey(surveyName:string):  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SurveyModule/GetServeybyName?serveyname='+ surveyName);
  }

  GetServeyData(surveyId:number):  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SurveyModule/GetServeyData?serveyid='+surveyId);
  }

  CopySurvey(surveyId:number,WarehouseId:number):  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SurveyModule/CopySurvey?serveyid='+ surveyId + "&WarehouseId=" + WarehouseId);
  }

  PublishSurvey(surveyId,WarehouseId,isPublish):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SurveyModule/PublishSurvey?serveyid='+ surveyId + '&WarehouseId=' + WarehouseId + '&IsPublish=' + isPublish);
  }
}
