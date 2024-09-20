import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbcclassificationService {
  apiUrl: string;
  behavior = new BehaviorSubject<any>('');


  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  getAbcClassificationReport(cityId,warehouseId,categories): Observable<any> {
    
    return this.httpClient.get<any>(this.apiUrl + '/api/BuyerDashboard/GetAbcClassificationReport/' + cityId +'/' + warehouseId + '/' + categories);
  }
}
