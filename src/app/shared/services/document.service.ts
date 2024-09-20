import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PagerDataV7 } from '../interface/pager-data-v7';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
apiURL:string;
User:any;
  constructor(private http: HttpClient ) {
    this.apiURL = environment.apiURL;
  }

  // GetDocument(pager:PagerDataV7): Observable<any>
  // {
  //   return this.http.post<any>(this.apiURL +'/api/DocumentV7', pager);
  // }


  GetAllDocument():  Observable<any[]> {
    // return this.http.get<any[]>(this.apiURL + '/api/Document');
    return this.http.get<any[]>(this.apiURL + '/api/Documents/GetDocument');
  }
  DocumentGetByID(id: number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Document/GetById?id=' + id);
  }
  

  addDocument(documentservice):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Documents/DocumentData',documentservice);
    }
  
    
  
    UpdateDocument(details):  Observable<any> {
      return this.http.put<any>(this.apiURL + '/api/Documents/Put', details);
    }
  
    
    DeleteDocument(id: number):Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/Documents/DeleteV7?id=' + id);
  }

}
