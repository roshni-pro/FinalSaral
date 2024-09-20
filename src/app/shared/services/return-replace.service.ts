import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReturnReplaceService {
  apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }


  GetAllReturnReplaceRequest(warehouseid,IsPlanner): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/KKReturnReplace/GetReturnReplaceOrderForDashboard?warehouseid='+warehouseid + '&IsPlanner=' + IsPlanner);
  }

  GetReturnReplaceItems(requestid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/KKReturnReplaceHistory/GetReturnReplaceItemList?KKRequestId='+requestid);
  }

  GetDeliveryBoy(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DeliveryBoy');
  }

  UppdateDBoyId(dboyid,kkID): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/KKReturnReplace/UpdateDeliveryBoy?DboyId='+dboyid + '&&KkRequestid='+kkID , null);
  }

  UpdateReturnReplace(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/KKReturnReplace/UpdateKKReturnReplace', data);
  } 
  
  approveOrReject(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/KKReturnReplace/ApproveOrReject', data);
  }

  uploadImages(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/itemimageupload/UploadKKReturnReplaceImages', data);
  }
  buyerApprovedCustList(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/KKReturnReplace/BuyerApprovedCustList');
  }
  getReturnListByCustId(CustomerId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/KKReturnReplace/GetReturnListByCustId?CustomerId=' + CustomerId);
  }
  createReturnOrder(salesReturn): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/KKReturnReplace/CreateReturnOrder',salesReturn);
  }
  multiApproveOrReject(MultiOrderReturnApproveRejectDC): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/KKReturnReplace/MultiApproveOrReject',MultiOrderReturnApproveRejectDC);
  }
  
  getKKReturnRequestDetailHistory(KKReturnDetailId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/KKReturnReplace/GetKKReturnRequestDetailHistory?KKReturnDetailId=' + KKReturnDetailId);
  }
  salesReturnDashboard(wid,orderIdKeyword): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/KKReturnReplace/SalesReturnDashboard?WarehouseId='+wid + '&OrderId=' + orderIdKeyword);
  }
  salesReturnDashboardDetail(orderId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/KKReturnReplace/SalesReturnDashboardDetail?OrderId='+orderId);
  }
  salesReturnExport(warehouseid:any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/KKReturnReplace/SalesReturnExport?warehouseid='+warehouseid);
  }
}
