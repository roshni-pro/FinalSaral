import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CashMgmtServicesService {
  apiURL:string
  constructor(private http:HttpClient) {
    this.apiURL = environment.apiURL;
  }

  cashCollections(warehouseid,Inputdate):Observable<any>{
    var obj={}
   return this.http.get<any>(this.apiURL+'api/Currency/LiveCasherWarehouseCashDashboard?warehouseid='+warehouseid + '&Inputdate=' + Inputdate);

     //https://uat.shopkirana.in/api/Currency/https://uat.shopkirana.in/api/Currency/LiveCasherWarehouseCashDashboard?warehouseid=7?warehouseid=7
  }


  
  GetRequestBtn(warehouseid, action, CashierPeopleId,TotalAmtCash,TotalAmtcheque,dateTime,buttonClickName)
  {
    return this.http.get<any>(this.apiURL+'api/TestCashCollection/CMSCashierVerification?warehouseid='+warehouseid+'&action='+action+'&CashierPeopleId='+CashierPeopleId+'&TotalAmtCash='+TotalAmtCash+'&TotalAmtcheque='+TotalAmtcheque + '&dateTime='+dateTime+'&buttonClickName='+buttonClickName);
  }


  GetWarehouse()
  {
    return this.http.get(this.apiURL+'api/Warehouse/GetWarehouseWOKPP');
  }


}

