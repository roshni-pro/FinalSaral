import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintTicketService {
  apiURL: string;
  User: any;
  comment: string;
  apiUrl: string;
  httpClient: any;
  url: string;
  constructor(private http: HttpClient) { 
    this.apiURL = environment.apiURL;
    this.url = environment.apiURL;

  }


WarehouseGetByID():  Observable<any> {
 
  return this.http.get<any>(this.apiURL + '/api/Warehouse/GetAllWarehouse');
}
GetTicket(ComplaintTicket):  Observable<any> {
  
  return this.http.post<any>(this.apiURL + '/api/ComplaintTicket/GetFilterTicket',ComplaintTicket);
}
GetCategory(Type):  Observable<any> {

  return this.http.get<any>(this.apiURL + '/api/ComplaintTicket/GetCategory?Type='+ Type);
}
GetTicketChat(TicketId):  Observable<any> {

  return this.http.get<any>(this.apiURL + '/api/ComplaintTicket/GetTicketChat?ticketid='+ TicketId);
}
SaveCategory(CategoryType,CategoryName):  Observable<any> {
 
  return this.http.get<any>(this.apiURL + '/api/ComplaintTicket/SaveCategory?CategoryType='+CategoryType + '&CategoryName='+ CategoryName);
}
GetAllCategory():  Observable<any> {
  
  return this.http.get<any>(this.apiURL + '/api/ComplaintTicket/GetCategoryAll');
}

IsActive(Id, IsActive):  Observable<any> {
  
  return this.http.get<any>(this.apiURL + '/api/ComplaintTicket/IsActive?CategoryId='+ Id + '&IsActive=' + IsActive);
}
UploadImage(src): Observable<any> {
  return this.http.post<any>(this.apiURL + '/api/ComplaintTicket/UploadTicketImageWeb', src);
}

PostChat(TicketChat):  Observable<any> {  
  return this.http.post<any>(this.apiURL + '/api/ComplaintTicket/CompliantTicketChat' , TicketChat);
}
PostStatus(ChangeStatus):  Observable<any> {

  return this.http.post<any>(this.apiURL + '/api/ComplaintTicket/EditCompliantTicket',ChangeStatus);
}
GetChat(TicketId):  Observable<any> {
  
  return this.http.get<any>(this.apiURL + '/api/ComplaintTicket/GetTicketChat?ticketid='+ TicketId);
}
} 