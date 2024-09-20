import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiveBrandDataForMetabaseService {


  apiURL: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }


  getLiveBrandDataForMetaBaseList(LiveBrandDataForMetaBaseFilterDC): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/LiveBrandDataForMetaBase/GetLiveBrandDataForMetaBaseList', LiveBrandDataForMetaBaseFilterDC);
  }

}
