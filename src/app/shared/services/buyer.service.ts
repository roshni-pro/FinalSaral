import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {
  apiURL: string;
  User: any;


  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }
  getbuyer():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/BuyerDashboard/GetBuyers');
  }
  getbuyerlist(data):  Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/BuyerDashboard/Get',data);
  }
  getbuyerSalesData(data):  Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/BuyerDashboard/GetBuyerSale',data);
  }
  getbuyerClosingStockData(data):  Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/BuyerDashboard/GetBuyerClosingStock',data);
  }

  getbuyerGrossMarginData(data):  Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/BuyerDashboard/GetBuyerGrossMargin',data);
  }

  getbuyerInventoryDaysData(data):  Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/BuyerDashboard/GetBuyerInventoryDays',data);
  }
  getbuyerexportData(data):  Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/BuyerDashboard/ExportData',data);
  }

  getexportURL(data): Observable<any[]> {
  
  return this.http.post<any[]>(this.apiURL + '/api/BuyerDashboard/DashboardExport',data);
  }

GetInOut(month,year):  Observable<any[]> {

 return this.http.get<any[]>(this.apiURL + '/api/BuyerDashboard/GetInOutData?month='+month+'&year='+year);

}
GetOtherStockInOut(stock,month,year):  Observable<any[]> {

  return this.http.get<any[]>(this.apiURL + '/api/BuyerDashboard/GetOtherStockInOutData?stockname='+stock+'&month='+month+'&year='+year);
 
 }
GetBuyers():Observable<any[]>{
  
  return this.http.get<any[]>(this.apiURL + '/api/BuyerDashboard/GetBuyers');
}
GetSearch(filterModel):Observable<any[]>{
  
  return this.http.post<any[]>(this.apiURL + '/api/BuyerDashboard/Get', filterModel);
}

GetDashBoardExport(filterModel):Observable<string>{
  
return this.http.post<string>(this.apiURL + '/api/BuyerDashboard/DashboardExport', filterModel );
}


GetExportBuyerData(filterModel):Observable<string>{

return this.http.post<string>(this.apiURL + '/api/BuyerDashboard/ExportBuyerData', filterModel );

}
}
