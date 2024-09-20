import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { TicketCategoriesDc,AcitveSubCatTicketDc,AcitveTicketDc,DeleteSubCatTicketDc,DeleteTicketDc } from '../Interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  apiUrl: string;
  behavior = new BehaviorSubject<any>('');


  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  getAllTicketCategories(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/Ticket/GetAllTicketCategories');
  }

  getActivityLogByTicketId(ticketId): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/Ticket/GetActivityLogByTicketId?ticketId=' + ticketId);
  }


  GetAllCustomers(val): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/Ticket/GetAllCustomers?SearchVal=' + val);
    // return this.httpClient.get<any>(this.apiUrl + '/api/Ticket/GetAllActiveInActiveCustomers?CustomerId=' + val);
  }
   getAllActiveInActiveCustomers(val): Observable<any> {
    // return this.httpClient.get<any>(this.apiUrl + '/api/Ticket/GetAllCustomers?SearchVal=' + val);
    return this.httpClient.get<any>(this.apiUrl + '/api/Ticket/GetAllActiveInActiveCustomers?CustomerId=' + val);
  }

  GetAllTickets(filter): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/api/Ticket/GetAllTickets', filter);
  }
  exportAllTickets(filter): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/api/Ticket/ExportAllTickets', filter);
  }

  GetAllTicketsByUserId(filter): Observable<any> {
    let headers = new HttpHeaders();
    let userId = localStorage.getItem('userid');
    headers.append('CustomerId', userId);
    const httpOptions = {
      headers: new HttpHeaders({
        'userId': userId
      })
    };
    return this.httpClient.post<any>(this.apiUrl + '/api/Ticket/GetAllTicketsByUserId', filter, httpOptions);
  }

  createTicket(ticket): Observable<any> {
    let CustomerId = localStorage.userid;

    const httpOptions = {
      headers: new HttpHeaders({
        'CustomerId': CustomerId
      })
    };
    
    return this.httpClient.post<any>(this.apiUrl + '/api/Ticket/CreateTicket', ticket, httpOptions);
  }

  closeTicket(ticket): Observable<any> {
    return this.httpClient.put<any>(this.apiUrl + '/api/Ticket/CloseTicket', ticket);
  }

  AssignTicket(ticketActivityLog) {

    let CustomerId = localStorage.userid;

    const httpOptions = {
      headers: new HttpHeaders({
        'CustomerId': CustomerId
      })
    };
    
    return this.httpClient.post<any>(this.apiUrl + '/api/Ticket/AssignTicket', ticketActivityLog, httpOptions);

  }

  getTicketCategory(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/Ticket/GetTicketCategory');
  }
  getTicketSubCategory(ParentId : number): Observable<any> {
    
    return this.httpClient.get<any>(this.apiUrl + '/api/Ticket/GetTicketSubCategory?ParentId='+ParentId);
  }
  
  ticketCategoryAdd(TicketCategory : TicketCategoriesDc): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/api/Ticket/TicketCategoryAdd',TicketCategory);
  }
  
  getTicketCategorys(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/Ticket/GetTicketCategory');
  }
  getAllCategory(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/Ticket/GetAllCategory');
  }
  getDepartmentCategory(DepartmentId): Observable<any> {
    // return this.httpClient.get<any[]>(this.apiUrl + '/api/Ticket/GetDepartmentCategory?DepartmentId='+DepartmentId);
    // return this.httpClient.get<any[]>(this.apiUrl + '/api/Ticket/GetDepartmentCategoryNew?DepartmentId='+DepartmentId);
    return this.httpClient.get<any[]>(this.apiUrl + '/api/Ticket/GetCategoryTreeView?DepartmentId='+DepartmentId);
  }
  ActiveInActive(AcitveTicketDc : AcitveTicketDc): Observable<any> {
    return this.httpClient.put<any>(this.apiUrl + '/api/Ticket/ActiveTicketCategory',AcitveTicketDc);
  }
  ActiveTicketSubCategory(AcitveSubCatTicketDc : AcitveSubCatTicketDc): Observable<any> {
    return this.httpClient.put<any>(this.apiUrl + '/api/Ticket/ActiveTicketSubCategory',AcitveSubCatTicketDc);
  }
  DeleteTicketCategory(DeleteTicketDc : DeleteTicketDc): Observable<any> {
    return this.httpClient.put<any>(this.apiUrl + '/api/Ticket/DeleteTicketCategory',DeleteTicketDc);
  }
  DeleteTicketSubCategory(DeleteSubCatTicketDc : DeleteSubCatTicketDc): Observable<any> {
    return this.httpClient.put<any>(this.apiUrl + '/api/Ticket/DeleteTicketSubCategory',DeleteSubCatTicketDc);
  }  
  getAllCategories(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/Ticket/GetAllCategories');
  }
}
