import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { PagerDataV7 } from '../interface/pager-data-v7';


@Injectable({
  providedIn: 'root'
})
export class AccounttypeService {
  apiURL: string;
  // PeopleAll:any;
  User: any;
  comment: string;



  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }


  GetAllAccountType(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/AccountTypeV7');
  }

  GetByID(id: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/AccountTypeV7/GetByID/' + id);
  }

  addAccountType(accountType): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/AccountTypeV7', accountType);
  }

  UpdateAccountType(details): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/AccountTypeV7/UpdateByID/', details);
  }
  DeleteAccountType(ID): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/AccountTypeV7?ID='+ ID);
  }

  getList(pager:PagerDataV7):  Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/AccountTypeV7/GetList', pager);
  }

}
