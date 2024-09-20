import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { kisanDan } from '../interface/kisan-dan-add';

@Injectable({
  providedIn: 'root'
})
export class KisanDanService {
  apiURL: string;
  User: any;
  comment: string;
  apiUrl: string;
  httpClient: any;
  
  constructor(private http: HttpClient) { 
    this.apiURL = environment.apiURL
  }


  kishandans(customerid: number,lang: string,wids:number):  Observable<any> {
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "True"
      })
    };
    return this.http.get<any>(this.apiURL + '/api/KishanDan/GetKishan?warehouseid=' + wids + '&lang='+ lang + '&Customerid=' + customerid , httpOptions); 
  }
  

  kishandanDetail(customerid: number,lang: string,wids:number):  Observable<any> {
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "True"
      })
    };
    return this.http.get<any>(this.apiURL + '/api/KishanDan/GetkisandaanDetail?warehouseid=' + wids + '&lang='+ lang + '&Customerid=' + customerid , httpOptions); 
  }
  

  kishandanImage(customerid: number,lang: string,wids:number):  Observable<any> {
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "True"
      })
    };
    return this.http.get<any>(this.apiURL + '/api/KishanDan/GetKisandaanImage' , httpOptions); 
  }


  kisandanimageDetails():  Observable<any> {
   
    return this.http.get<any>(this.apiURL + '/api/KishanDan/GetImageData'); 
  }
  kisandanDetails():  Observable<any> {
     
    return this.http.get<any>(this.apiURL + '/api/KishanDan/GetDescriptiondata'); 
  }

  uploadImage(ImageUrl): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/KishanDan/UploadKisanDanImage',ImageUrl);
  }

  adddatails(data):Observable <any>{ 
    return this.http.post<any>(this.apiURL + '/api/KishanDan/AddDescription',data);
  }
  kisandanDescriptionDetails():  Observable<any> {  
    return this.http.get<any>(this.apiURL + '/api/KishanDan/GetDescriptiondata'); 
  }

  addImage(kisanDanAddDetails:kisanDan): Observable<any>{ 
    return this.http.post<any>(this.apiURL + '/api/KishanDan/AddGallaryImage',kisanDanAddDetails);
  }
   
  CustomerData():Observable<any> { 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "True"
      })
    };
    return this.http.get<any>(this.apiURL + '/api/KishanDan/Getcustkdaan', httpOptions); 
  }
  WarehouseGetByID():  Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/Warehouse/GetAllWarehouse');
  }
  GetDanList(KisaanDaan):  Observable<any> {
    
    return this.http.post<any>(this.apiURL + '/api/KishanDan/GetCustomerDashboard',KisaanDaan); 
  }
}
