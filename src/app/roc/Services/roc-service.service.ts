import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RocServiceService {
  apiURL:any
  constructor(private http:HttpClient) 
  { 
    this.apiURL = environment.apiURL;
  }
  ExportROc(date)
  {
    return this.http.get(this.apiURL+'api/ROC/ExportRocReportData?ForMonthData='+date)
  }
}
