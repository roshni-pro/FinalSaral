import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PagerDataV7 } from '../interface/pager-data-v7';

@Injectable({
  providedIn: 'root'
})
export class AccountclassificationService {
  apiURL: string;

  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }

  GetAccountClassification():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/AccountClassificationV7');
  }


  addClassification(accountclassification):  Observable<any> {
  console.log("test")
  console.log(this.apiURL + '/api/AccountClassificationV7' ,accountclassification)
    return this.http.post<any>(this.apiURL + '/api/AccountClassificationV7' ,accountclassification);
  }

  
  GetByID(id: number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/AccountClassificationV7/GetByID/' + id);
  }

  // UpdateClassification(details):  Observable<any> {
  //   return this.http.put<any>(this.apiURL + '/api/AccountClassificationV7/UpdateByID/' + details.ID , details);
  // }

  
  UpdateClassification(details):  Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/AccountClassificationV7/UpdateByID',details);
  }

  DeleteClassification(ID): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/AccountClassificationV7?ID='+ ID);
  }

  getList(pager:PagerDataV7):  Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/AccountClassificationV7/GetList', pager);
  }
}
