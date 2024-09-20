import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { POCinterfaceDc } from '../interface/paginator-POC-interface';


@Injectable({
  providedIn: 'root'
})
export class TurnAroundTimeService {

  apiURL: string;
  constructor(private http: HttpClient) { 
    this.apiURL = environment.apiURL;
  }

  get(startDate: string, endDate: string, warehouseId: number): Observable<any[]>{
    return this.http.get<any[]>( this.apiURL + '/api/TurnAroundTimeV7/GetData?start=' + startDate + '&end=' + endDate + '&WarehouseId=' + warehouseId);
  }


  getWarehouseList(): Observable<any[]>{
    return this.http.get<any[]>( this.apiURL + '/api/Warehouse');
  }
  
  getTransitstock(startDate, endDate, warehouseId): Observable<any[]>{
    
    return this.http.get<any[]>( this.apiURL + '/api/Report/GetStockInTransitReport?from=' + startDate + '&to=' + endDate + '&warehouseId=' + warehouseId);
  }

  getPOCVerification(startDate, endDate, warehouseId): Observable<any>{
    
    return this.http.get<any>( this.apiURL + '/api/DeliveryAssignment/POCVerification?start=' + startDate + '&end=' + endDate + '&WarehouseId=' + warehouseId);
  }
  getKppDashboard(): Observable<any>{
    
    return this.http.get<any>( this.apiURL + '/api/inventory/KPPDashboard');
  }

  getKppReportExport(): Observable<any>{
    
    return this.http.get<any>( this.apiURL + '/api/inventory/GetKPPReportExport');
  }

  // Added method by Anoop multiselect warehouse

  getPOCancelOrdersbyMultiW(paginatorPOC): Observable<any>{
    
      return this.http.post<any>( this.apiURL + '/api/DeliveryAssignment/GetPOCancelledOrderbyMuliW',paginatorPOC); 
    }

  getPOCancelOrders(paginatorPOC:POCinterfaceDc): Observable<any>{
    return this.http.post<any>( this.apiURL + '/api/DeliveryAssignment/GetPOCancelledOrderbyMuliW',paginatorPOC); 
  }



  updatePOClist(POCorderlist): Observable<any>{
    return this.http.post<any>( this.apiURL + '/api/DeliveryAssignment/updatePOCOrderlist',POCorderlist); 
  }
}
