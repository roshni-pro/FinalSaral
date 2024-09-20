import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { AdddepoMaster } from '../interface/supplier/adddepo-master';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  apiURL: string;
  User:any;


                                         
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }

  GetDepotBySupplierId(supplierId):Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Suppliers/GetDepo?id='+ supplierId);
  }
  Getstates():Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/States');
  }
  Getcity(Statid):Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/City/suppliercity?Statid='+ Statid);
  }
  DepoDocumentImageUpload(ImageUrl){
    return this.http.post<any>(this.apiURL + '/api/Suppliers/DepoDocumentImageUpload',ImageUrl);
  }
  DepoDocumentImageUploadMulti(ImageUrl){
    return this.http.post<any>(this.apiURL + '/api/Suppliers/DepoDocumentImageUploadMulti',ImageUrl);
  }
  
  AddDepo(depo): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Suppliers/AddDepos', depo); 
  }
  PostNewDepo(addDepo:AdddepoMaster){
    return this.http.post<AdddepoMaster>(this.apiURL + '/api/Suppliers/AddNewDepo/V7',addDepo);
  }

  PutDepo(depo): Observable<any[]> {
    return this.http.put<any[]>(this.apiURL + '/api/Suppliers/PutDepo', depo);
  }


  PostEditedDepo(addDepo:AdddepoMaster){
    return this.http.post<AdddepoMaster>(this.apiURL + '/api/Suppliers/EditDepoTemp/V7',addDepo);
  }
  // 
}
