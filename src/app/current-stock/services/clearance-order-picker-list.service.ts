import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClearanceOrderPickerListService {

  apiURL: string;  
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL;}

  GetClearanceOrderPickerRecords(SearchClearanceOrderPickerDC):Observable<any>{
    return this.http.post<any[]>(this.apiURL + 'api/ClearanceNonSaleable/GetClearanceOrderPickerList',SearchClearanceOrderPickerDC);
  }

  GetClearanceOrderPickerExport(SearchClearanceOrderPickerDC):Observable<any>{
    return this.http.post<any[]>(this.apiURL + 'api/ClearanceNonSaleable/GetExportClearanceOrderPickerList',SearchClearanceOrderPickerDC);
  }
}
