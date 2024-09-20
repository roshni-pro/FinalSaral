import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MtdService {
  UatApi: any;
  apiuRL : any;
  constructor(private http: HttpClient) { 
    //this.UatApi = environment.apiURL;
    this.apiuRL = environment.apiURL;
  }
  GetWareHouse(): Observable<any> {
    return this.http.get(this.apiuRL+'api/Warehouse/GetWarehouseWOKPP')
  }
  // api/TestCashCollection/MTDCollection
  GetData(Data:any):Observable<any>
  {
    return this.http.post(this.apiuRL+'api/TestCashCollection/MTDCollection',Data)
  }
}
