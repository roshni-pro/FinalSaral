// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppTemplateService {
  UatApi: any
  UatWhatsAppImgApi : any;
  constructor(private http: HttpClient) {
    this.UatApi = environment.apiURL;
    this.UatWhatsAppImgApi = environment.whatsAppImagapiURL;
  }
  getTemplateList() {
     return this.http.get(this.UatApi+'api/WhatsAppTemplate/getWhatsAppTemplateListFromThirdParty')
  }
  deleteTempData(Id: any) {
    return this.http.delete(this.UatApi + 'api/WhatsAppTemplate/DeleteWhatsAppTemplate', Id)
  }
  updateTemplateList(obj) {
    return this.http.post(this.UatApi + 'api/WhatsAppTemplate/AddUpdateWhatsAppTemplate', obj)
  }
  DropDown() {
    return this.http.get(this.UatApi + 'api/WhatsAppTemplate/GetWATemplateValConfigurationList')
  }
  WATemplateList() {
    return this.http.get(this.UatApi + 'api/WhatsAppTemplate/GetAllTemplateAsync')
  }

  getGroupList(warehouseIds: any[]) {
    return this.http.post(this.UatApi + 'api/WhatsAppTemplate/GetGroupList' , warehouseIds)
  }


  DeleteTemplate(Id) {
    return this.http.delete(this.UatApi + 'api/WhatsAppTemplate/DeleteWhatsAppTemplate?Id=' + Id)
  }
  uploadImageWATemplate(formData): Observable<any> {
    return this.http.post<any>(this.UatWhatsAppImgApi + 'api/logoUpload/UploadWhatsAppTemplateImage', formData)
  }


  InsertWhatsAppGrpNotify(payload: any): Observable<any> {
    return this.http.post<any>(this.UatApi + 'api/WhatsAppTemplate/InsertWhatsAppGrpNotify', payload)
  }


  whatsAppGroupNotificationList(skip: number, take: number) {
    return this.http.get(this.UatApi + 'api/WhatsAppTemplate/WhatsAppGroupNotificationList?skip='+ skip +'&take=' + take)
  }

  DeleteWhatsAppGroupNotificationMasters(Id) {
    return this.http.get(this.UatApi + 'api/WhatsAppTemplate/DeleteWhatsAppGroupNotificationMasters?Id=' + Id)
  }

  SendNotification(Id) {
    // http://localhost:26265/api/WhatsAppTemplate/SendNotification?Id=3
    return this.http.get(this.UatApi + 'api/WhatsAppTemplate/SendNotification?Id=' + Id)
  }
}
