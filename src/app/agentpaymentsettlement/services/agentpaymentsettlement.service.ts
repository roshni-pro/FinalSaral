import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentpaymentsettlementService {

  url: string;
  apiURL: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiURL;
    this.apiURL = environment.apiURL + '/api/AgentPaymentSettlement/';
  }


  GetAgentCommissionPaymentsByAgentId(agentId): Observable<any> {
    
    let agentCommissionPaymentList = this.http.get<any>(this.apiURL + 'GetAgentCommissionPayments/' + agentId);
    
    return agentCommissionPaymentList;
  }


  GetAssignmentCommissions(agentId, page): Observable<any> {
    
    let commissionAssignmentList = this.http.get<any>(this.apiURL + 'GetAssignmentCommissions/agentId/' + agentId + '/skip/' + page.skip + '/take/' + page.take);
    
    return commissionAssignmentList;
  }

  saveAgentPaymentSettlementList(agentPaymentSettlementList): Observable<any> {
    
    return this.http.post<any>(this.apiURL + 'AddPaymentandUpdate/', agentPaymentSettlementList);
  }

  GetAssignmentDetailById(Id): Observable<any> {
    let agentCommissionDetails = this.http.get<any>(this.apiURL + 'GetAssignmentCommissionDetails/' + Id);
    return agentCommissionDetails;
  }

  getAgentPaymentSettlementList(page): Observable<any> {
    let agentModel = this.http.get<any>(this.apiURL + 'GetAgentPaymentSettlementList/skip/' + page.skip + '/take/' + page.take);
    
    return agentModel;
  }

  getAgentPaymentSettlementByName(name: string, status: string, page): Observable<any> {
    
    if (status.length == 0) {
      status = 'nostatus';
    }
    let agentPaymentSettlementList = this.http.get<any>(this.apiURL + 'GetAgentPaymentSettlementListByName/name/' + name + '/status/' +
    status + '/skip/' + page.skip + '/take/' + page.take);
    return agentPaymentSettlementList;
  }

  GetPeople(): Observable<any> {
    let peopleList = this.http.get<any>(this.apiURL + 'GetPeople');
    return peopleList;
  }

}
