import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { PaginatorCustomerCallSMSRequest } from 'app/shared/interface/paginator-customer-call-smsrequest';

@Injectable({
  providedIn: 'root'
})
export class EwayBillOrderDetailServiceService {

  apiURL:string
  constructor(private http:HttpClient) {
    this.apiURL = environment.apiURL;
  }

  OrderPageHistory(orderid): Observable<any> {
    return this.http.get<any>(this.apiURL+'api/Ewaybill/OrderPageHistory?orderid=' + orderid);
  }


  ITHistory(TransferOrderId): Observable<any> {
    return this.http.get<any>(this.apiURL+'api/Ewaybill/ITHistory?TransferOrderId=' + TransferOrderId);
  }


  GeneratedEwayBillNo(OID):Observable<any>{
    return this.http.get<any>(this.apiURL+'api/Ewaybill/GeneratedEwayBillNo?orderid='+OID);
  }

  // GetvehicleUpdate(eno,  vno, rcode,  rrem):Observable<any>{
  //   debugger;
  //   console.log(this.apiURL+'api/Ewaybill/UpdateVehicle?ewbNo='+eno+'&vehicleNo='+vno+'&reasonCode='+rcode+'&reasonRem='+rrem);
  //   var obj={};
  //   return this.http.post<any>(this.apiURL+'api/Ewaybill/UpdateVehicle?ewbNo='+eno+'&vehicleNo='+vno+'&reasonCode='+rcode+'&reasonRem='+rrem,obj);
  // }
  GetvehicleUpdate(obj:any):Observable<any>{
    debugger;
    // console.log(this.apiURL+'api/Ewaybill/UpdateVehicle?ewbNo='+eno+'&vehicleNo='+vno+'&reasonCode='+rcode+'&reasonRem='+rrem);
    // var obj={};
    return this.http.post<any>(this.apiURL+'api/Ewaybill/UpdateVehicle',obj);
  }

  IRNReGenerate(data :any): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL+'api/IRNReGenerate/GetSearchOrderMaster',data);
  }

  GetEwaybillOrder(data :any): Observable<any[]> {
    return this.http.post<any>(this.apiURL+'api/Ewaybill/Ewaybillorder',data);
  }

  GetFailedEwaybill(data :any): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL+'api/Ewaybill/FailedEwaybill',data);
  }

  GetOrderType():Observable<any>
  {
    return this.http.get<any>(this.apiURL+'api/Ewaybill/GetOrderType')
  }

  internaltransfernew(data :any): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL+'/api/Ewaybill/internaldatanew?Warehouseid',data);
  }

  NearExpiryewaybills(data :any): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL+'api/Ewaybill/NearExpiry',data);
  }

  CheckVarifiedCustomerGSTNO(GSTNO): Observable<any> {
    return this.http.get<any>(this.apiURL+'api/RetailerApp/CustomerGSTVerify?GSTNO=' + GSTNO);
  }
}
