import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { PagerDataV7 } from '../interface/pager-data-v7';


@Injectable({
  providedIn: 'root'
})
export class AccountgroupService {
  apiURL: string;
  // PeopleAll:any;
  User: any;
  comment: string;



  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }


  GetAllAccountGroup(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/AccountGroupV7');
  }

  GetByID(id: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/AccountGroupV7/GetByID/' + id);
  }

  addAccountGroup(accountGroup): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/AccountGroupV7', accountGroup);
  }

  UpdateAccountGroup(details): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/AccountGroupV7/UpdateByID/' , details);
  }
  DeleteAccountGroup(ID): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/AccountGroupV7?ID='+ ID);
  }


  getList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/AccountGroupV7/GetList');
  }

  getPaginatorList(pager : PagerDataV7): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/AccountGroupV7/GetList',pager);
  }
}
