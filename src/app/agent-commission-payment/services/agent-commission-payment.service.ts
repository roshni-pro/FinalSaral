import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentCommissionPaymentService {

  url: string;
  apiURL: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiURL;
    this.apiURL = environment.apiURL + '/api/AgentCommissionPayment/';
  }

  AddNewPayment(agentCommissionPayment): Observable<any> {
    
    return this.http.post<any>(this.apiURL + 'AddNewPayment', agentCommissionPayment);
  }

  getByName(name: string, ledgerTypeID: number): Observable<any> {
    let ledgerList = this.http.get<any>(this.url + '/api/LadgerUI/GetAgentByName/name/' + name + '/ledgerTypeId/' + ledgerTypeID);
    return ledgerList;
  }

  getAgentCommissionPaymentList(page): Observable<any> {
    let agentModel = this.http.get<any>(this.apiURL + 'GetAgentCommissionPaymentList/skip/' + page.skip + '/take/' + page.take);
    
    return agentModel;
  }

  cancelAgentCommissionPayment(agentCommissionPaymentId): Observable<any> {
    
    let agentCommissionPaymentList = this.http.get<any>(this.apiURL + 'CancelPayment/' + agentCommissionPaymentId);
    return agentCommissionPaymentList;
  }

  getAgentCommissionPaymentListByName(name: string, status: string, page): Observable<any> {
    
    if (status.length == 0) {
      status = 'nostatus';
    }
    let agentCommissionPaymentList = this.http.get<any>(this.apiURL + 'getAgentCommissionPaymentListByName/name/' + name + '/status/' +
    status + '/skip/' + page.skip + '/take/' + page.take);
    return agentCommissionPaymentList;
  }

  GetPeople(): Observable<any> {
    let peopleList = this.http.get<any>(this.apiURL + 'GetPeople');
    return peopleList;
  }




}
