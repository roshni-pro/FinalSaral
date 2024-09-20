import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LedgermasterService {

 apiURL:string;
 User:any;
 
 constructor(private http: HttpClient) {
  this.apiURL=environment.apiURL;
 }
 GetAllLadgerType():  Observable<any[]> {
  console.log("pooja")
  return this.http.get<any[]>(this.apiURL + '/api/LedgerTypeUI/GetAll');
}
  
//  this.addLedgerMasterData():Observable<any[]>{

//     return this.http.post<any>(this.apiURL + '/api/Legderma ')

//  }

}
