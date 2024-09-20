import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetGullak,GetGullakTransaction,AddGullakPayment, GullakPendingDc } from 'app/shared/interface/gullak/gullak';

@Injectable({
  providedIn: 'root'
})
export class GullakService {
  apiURL: string;  
  User:any;
  comment : string;
  
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  GetGullak(GetGullak : GetGullak):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Gullak/GetGullak',GetGullak);
  }
  
  addNewGullak(skcode:string):Observable<any>
  {
    return this.http.get<any>(this.apiURL + '/api/Gullak/addNewGullak?skcode='+skcode);
  }

  GetGullakTransaction(GetGullakTransaction : GetGullakTransaction):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Gullak/GetGullakTransaction',GetGullakTransaction);
  }
  GetExportGullakTransaction(GetEportGullakTransaction : GetGullakTransaction):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Gullak/GetExportGullakTransaction',GetEportGullakTransaction);
  }
  PaymentResponse(AddGullakPayment : AddGullakPayment):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Gullak/PaymentResponse',AddGullakPayment);
  }
  uploadgullak(ImageUrl): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Gullak/uploadgullak',ImageUrl);
  }

  getPendingGullakDetail(GetGullakTransaction : GetGullakTransaction):  Observable<any> {
    
    return this.http.post<any>(this.apiURL + '/api/Gullak/getPendingGullakDetail',GetGullakTransaction);
  }

  ChangePendingStatusV2(GullakPendingDc : GullakPendingDc):  Observable<any> {
    
    return this.http.put<any>(this.apiURL + '/api/Gullak/ChangePendingStatusV2',GullakPendingDc);
  }

  ChangePendingStatus(GullakPendingDc : GullakPendingDc):  Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/Gullak/ChangePendingStatus',GullakPendingDc);
  }
  
  ChangePendingV2(GullakPendingDc : GullakPendingDc):  Observable<any[]> {
    
    return this.http.put<any[]>(this.apiURL + '/api/Gullak/ChangePendingV2',GullakPendingDc);
  }

  getPendingStatus():  Observable<any> {
    
    return this.http.post<any>(this.apiURL + '/api/Gullak/getPendingStatus',null);
  }

}
