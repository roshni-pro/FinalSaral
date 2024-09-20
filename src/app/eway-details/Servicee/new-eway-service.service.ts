import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NewEwayServiceService {

  apiURL:string
  constructor(private http:HttpClient) {
    this.apiURL = environment.apiURL;
  }
  // http://localhost:26265/api/Ewaybill/GenerateEwayBYIRN
  GenerateEwayBYIRN(data :any): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL+'api/Ewaybill/GenerateEwayBYIRN',data);
  }
  ReGenerateEwayBYIRNN(data :any): Observable<any[]> { //Internal Transfer
    debugger 
    //return this.http.post<any[]>(this.apiURL+'api/Ewaybill/RegenerateEwaybill',data);
    return this.http.post<any[]>(this.apiURL+'api/InternalEwaybill/ReGenerateEwaybillInternalTransfer',data);
  }
  ReGenerateEwayBYIRN(data :any): Observable<any[]> {
    debugger
    return this.http.post<any[]>(this.apiURL+'api/Ewaybill/RegenerateEwaybill',data);
    //return this.http.post<any[]>(this.apiURL+'api/InternalEwaybill/ReGenerateEwaybillInternalTransfer',data);
  }

  // http://localhost:26265/api/Ewaybill/ExtendValidityEwaybill
  ExtendValidityEwaybill(data :any): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL+'api/Ewaybill/ExtendValidityEwaybill',data);
  }
  
  // localhost:26265/api/Ewaybill/UpdatePartB
  updateVehiclePartB(data :any): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL+'api/Ewaybill/UpdatePartB',data);
  }
  UpdatePartA(data :any): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL+'api/Ewaybill/UpdatePartA',data);
  }


  // http://localhost:26265/api/Ewaybill/CancelEwayBill
  CancelEwayBill(data :any): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL+'api/Ewaybill/CancelEwayBill',data);
  }

  OrderPageHistory(orderid): Observable<any> {
    return this.http.get<any>(this.apiURL+'api/Ewaybill/OrderPageHistory?orderid=' + orderid);
  }

  ITHistory(TransferOrderId): Observable<any> {
    return this.http.get<any>(this.apiURL+'api/Ewaybill/ITHistory?TransferOrderId=' + TransferOrderId);
  }

  // GeneratedEwayBillNo(OID):Observable<any>{
  //   return this.http.get<any>(this.apiURL+'api/Ewaybill/GeneratedEwayBillNo?orderid='+OID);
  // }

  IRNReGenerate(Id): Observable<any[]> {
    const data={}
    return this.http.post<any[]>(this.apiURL+'api/InternalEwaybill/InternalIRNGenerate?TransferOrderId='+Id,data);
  }

  GetEwaybillOrder(data :any): Observable<any[]> {
    return this.http.post<any>(this.apiURL+'api/Ewaybill/Ewaybillorder',data);
  }

  GetFailedEwaybill(data :any): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL+'api/Ewaybill/FailedEwaybill',data);
  }

  GetOrderType():Observable<any>  {   
    return this.http.get<any>(this.apiURL+'api/Ewaybill/GetOrderType')
  }

  internaltransfernew(data :any): Observable<any[]> {
    // return this.http.post<any[]>(this.apiURL+'/api/Ewaybill/internaldatanew',data);
    return this.http.post<any[]>(this.apiURL+'/api/InternalEwaybill/GetInternalPageData',data);
  }

  NearExpiryewaybills(data :any): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL+'api/Ewaybill/NearExpiry',data);
  }

  CheckVarifiedCustomerGSTNO(GSTNO): Observable<any> {
    return this.http.get<any>(this.apiURL+'api/RetailerApp/CustomerGSTVerify?GSTNO=' + GSTNO);
  }
  GetEwaybillPdf(data :any): Observable<any[]> {
    return this.http.post<any>(this.apiURL+'api/Ewaybill/GetEWaybillPDF',data);
    // http://localhost:26265/api/Ewaybill/GetEWaybillPDF
  }



  EwayBillGenerateByIrn(data :any): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL+'api/InternalEwaybill/GenerateEwaybillByIRN',data);

    //http://localhost:26265/api/InternalEwaybill/GenerateEwaybillByIRN
  }
}
