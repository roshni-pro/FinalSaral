import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryAggingServiceService {
  apiURL:string
  constructor(private http:HttpClient) { 
    this.apiURL = environment.apiURL;
  }
  GetSearchResult(payload):Observable<any>
  {
    console.log(payload);
    
    return this.http.post<any>(this.apiURL+'api/Report/GetInventoryAgingData',payload)
  }}
