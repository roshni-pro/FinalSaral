import { HttpHeaders } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})




export class InternaltransfersService {

  url: string;
  apiURL: string;
  whList = []


  constructor(private http: HttpClient) {
    this.url = environment.apiURL;
    //    this.apiURL = 'http://192.168.1.149:80/api/';
    this.apiURL = environment.apiURL + '/api/';

  }


  GetInternaltransferslist(selectedWarehouses): Observable<any> {
    return this.http.get(this.apiURL + 'InternalTransfer/GetInternalTransferDetails?WarehouseId=' + selectedWarehouses)

  }

  // PostTransferOrder(orderList): Observable<any> {
  //   return this.http.post(this.apiURL + 'TransferOrder/AddTranferOrder', orderList)
  //   //    return this.http.post('http://localhost:26265/api/TransferOrder/AddTranferOrder', orderList)
  // }

  // PostTransferOrderV2(orderList): Observable<any> {

  //   // const httpOptions = {
  //   //   headers: new HttpHeaders({
  //   //     'Content-Type': 'application/json',
  //   //     "No-Auth": "True"
  //   //   })
  //   // };


  //   let headers = new HttpHeaders();

  //   let peopleId = localStorage.getItem('userid');

  //   headers.append('CustomerId', peopleId);
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'CustomerId': peopleId
  //     })
  //   };

  //   return this.http.post(this.apiURL + 'InternalTransfer/PostTransferData', orderList, httpOptions)
  //   //    return this.http.post('http://localhost:26265/api/TransferOrder/PostTransferData', orderList)
  // }

  getCurrentStockItems(data): Observable<any> {
    
    return this.http.get(this.apiURL + 'TransferOrder/SearchStockitem?key=' + data.key + '&WarehouseId=' + data.whouseid)

  }
  PostTransfer(immutabletransferlist: any): Observable<any> {
    
    return this.http.post(this.apiURL + 'InternalTransfer/PostTransferData', immutabletransferlist)
  }

}