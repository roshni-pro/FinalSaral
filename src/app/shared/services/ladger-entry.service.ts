import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { PagerDataV7 } from '../interface/pager-data-v7';


@Injectable({
  providedIn: 'root'
})
export class LadgerEntryService {
  apiURL: string;
  // PeopleAll:any;
  User: any;
  comment: string;



  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }


  GetAllLadgerEntry(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/LadgerEntryV7');
  }

  GetByID(id: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/LadgerEntryV7/GetByID/' + id);
  }

  addLadgerEntry(LadgerEntry): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/LadgerEntryV7', LadgerEntry);
  }

  UpdateLadgerEntry(details): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/LadgerEntryV7/UpdateByID/' + details.ID, details);
  }
  DeleteLadgerEntry(ID): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/LadgerEntryV7?ID='+ ID);
  }

  ExportLadgerEntry(data): Observable<any[]> {
    console.log(this.apiURL + '/api/LadgerEntryV7/GetDataForExport/'+ data.FromDate + '/' + data.ToDate + '/'+ data.type)
    return this.http.get<any[]>(this.apiURL + '/api/LadgerEntryV7/GetDataForExport/'+ data.FromDate + '/' + data.ToDate + '/'+ data.type);
  }

  getList(pager:PagerDataV7):  Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/LadgerEntryV7/GetList', pager);
  }

  getDetails(data):  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/LadgerEntryV7/GetDetails/'+ data.FromDate + '/' + data.ToDate + '/'+ data.ObjectType);
  }

  getCustomerLedger(ledgerInputViewModel: any):  Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/LadgerEntryV7/CustomerLedger/', ledgerInputViewModel);
  }

  uploadAll(list : any[]):  Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/LadgerEntryV7/uploadAll', list);
  }
  getledgerReport():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/LadgerUI/GetLedgerDashboard/');
  }
}