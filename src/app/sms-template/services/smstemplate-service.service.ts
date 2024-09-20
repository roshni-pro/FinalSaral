import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SmstemplateServiceService {
  apiURL: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }

  //SMS Template --Start
  
  addSmsTemplate(payload){
    return this.http.post(this.apiURL + 'api/SMSTemplate/AddTemplate',payload);
  }

  updateSmsTemplate(updateData){
    return this.http.post(this.apiURL + 'api/SMSTemplate/UpdateTemplate',updateData);
  }

  listByAppType(Apptype:any){
    return this.http.get(this.apiURL + 'api/SMSTemplate/TemplateList?Apptype='+Apptype);
  }

  getSmsTempRecordById(id:any){
    return this.http.get(this.apiURL + 'api/SMSTemplate/TemplateListById?Id='+id);
  }
  
  deleteSmsTempById(id){
    return this.http.get(this.apiURL + 'api/SMSTemplate/DeleteTemplate?Id='+id);
  }

  getAll(){
    return this.http.get(this.apiURL + 'api/SMSTemplate/GetAllTemplateList');
  }

  //SMS Template --End

  //Template master --Start

  addTempMaster(tempMasData){
    return this.http.post(this.apiURL + 'api/TemplateMaster/AddTemplateMaster',tempMasData);
  }

  updateTempMaster(updatetempMasData){
    return this.http.post(this.apiURL + 'api/TemplateMaster/UpdateTemplateMaster',updatetempMasData);
  }

  deleteTempMasterId(id){
    return this.http.get(this.apiURL + 'api/TemplateMaster/DeleteTemplateMaster?Id='+id);
  }

  getTempMasteList(){
    return this.http.get(this.apiURL + 'api/TemplateMaster/GetAllTemplateMasterList');
  }

  getTempMasRecordById(id){
    return this.http.get(this.apiURL + 'api/TemplateMaster/TemplateMasterListById?Id='+id);
  }
  //Template master --End

}