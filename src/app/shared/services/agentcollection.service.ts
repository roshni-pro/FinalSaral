import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class AgentcollectionService {
  apiURL: string;
  // PeopleAll:any;
  User: any;
  comment: string;



  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL + '/api/DBoyAssignmentDeposit/';

  }

  getcollection(dboyid: any,AssignmentId:any): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + 'getCurrencyCollectionSettlementData?DboyId=' + dboyid  + '&AssignmentId=' +AssignmentId );
  }

  saveAssignmentDeposits(assignmentIds:any[],dueamount:any): Observable<any> {
    
    http://localhost:26265/api/DBoyAssignmentDeposit/saveAssignmentDeposits?assignmentIds=27485,27760&dueamount=11
    return this.http.post<any>(this.apiURL + 'saveAssignmentDeposits?dueamount=' +  dueamount  , assignmentIds  );
  }
  
  GenrateAssignmentDeposits(AgentDBoyList): Observable<any> {
    
    return this.http.post<any>(this.apiURL + 'GetAssignmentPDF' , AgentDBoyList);
  }
}
