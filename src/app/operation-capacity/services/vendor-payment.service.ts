import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class VendorPaymentService {
  private apiUrl: string;
  constructor(private httpclient: HttpClient) {
    this.apiUrl = environment.apiURL + "/api/TransporterPayment/";
  }

  getTranspoterPaymentDetailList(payload): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'GetTranspoterPaymentDetailList' , payload);
  }

  getFleetList(WarehouseId): Observable<any> {
    return this.httpclient.get<any>(this.apiUrl + 'GetFleetListByWhId?WarehouseId='+ WarehouseId);
  }

  updateTransporterPaymentDetail(obj): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'UpdateTransporterPaymentDetailById',obj );
  }

  getTransporterPaymentVehicleAttadanceList(obj): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'GetTransporterPaymentVehicleAttadanceList',obj );
  }

  insertTransporterPaymentDetailDoc(obj): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'InsertTransporterPaymentDetailDoc',obj );
  }

  uploader(obj): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'UploadTransporterDocument',obj );
  }

  
  GetRegionalList(WarehouseId, month): Observable<any> {
    return this.httpclient.get<any>(this.apiUrl + 'GetRegionalList?Warehouseid='+WarehouseId+'&ForDate='+ month);
  }

  GetRegionalListByAllWh(input:any): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'GetRegionalListByAllWh', input);
  }

  GetRegionalSummaryList(input:any): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'GetRegionalSummayList', input);
  }


  RegionalTranspoterPaymentDetailList(payload): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'RegionalTranspoterPaymentDetailList', payload);
  }

  invoiceUploader(obj): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'UploadTransporterDocument',obj );
  }

  Fianlized(obj): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'Fianlized?',obj );
  }

  deleteDocById(Id,obj  ): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'DeleteTransporterPaymentDetailDocById?Id='+Id,obj );
  }

  getDocList(Id): Observable<any> {
    return this.httpclient.get<any>(this.apiUrl + 'GetDocList?TransporterPayDetailId='+ Id);
  }

  getPaymentHistoryList(Id): Observable<any> {
    return this.httpclient.get<any>(this.apiUrl + 'GetTransporterPaymentHistoryList?paymentId='+ Id);
  }

  UpdateInvoice(payload: any): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'UpdateInvoice', payload);
  }
  
  // -------------------------------------------------------------------------------------------------------
  ExportTallyFile(WarehouseId: any, Fordate: any): Observable<any> {
    return this.httpclient.get<any>(this.apiUrl + 'ExportTallyFile?Warehouseid='+WarehouseId+'&ForDate='+ Fordate);

  }

  TallyFilegenerated(payload: any): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'ExportTallyFile', payload);
  }

  ExportPaymentFile(WarehouseId: any, Fordate: any): Observable<any> {
    return this.httpclient.get<any>(this.apiUrl + 'ExportPaymentFile?Warehouseid='+WarehouseId+'&ForDate='+ Fordate);
  }

  ExportPaymentFileV2(input: any): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'ExportPaymentFileV2', input);
  }

  ExportPaymentFileV3(input: any): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'ExportPaymentFileV3', input);
  }

  RegionalExport(WarehouseId: any, Fordate: any): Observable<any> {
    return this.httpclient.get<any>(this.apiUrl + 'RegionalExport?Warehouseid='+WarehouseId+'&ForDate='+ Fordate);
  }

  RegionalExportV2(input: any): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'RegionalExportV2', input);
  }

  // --------------------------------------------------------------------------

  ApproveRejectByRegional(payload: any): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'ApproveRejectByRegional', payload);
  }
 
  ApproveRejectByOpsLead(payload: any): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'ApproveRejectByOpsLead', payload);
  }
 
  ApproveRejectByAccounts(payload: any): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'ApproveRejectByAccounts', payload);
  }

  ApproveRejectByAccountLead(payload: any): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'ApproveRejectByAccountLead', payload);
  }


 getTranspoterPaymentVehicleList(transpoterPaymentId: number): Observable<any[]> {
    return this.httpclient.get<any[]>(this.apiUrl + 'GetTranspoterPaymentVehicleList?TranspoterPaymentId=' + transpoterPaymentId);
  }

  getTransporterPayVehicleInfo(vehicleMasterId:number): Observable<any> {
    return this.httpclient.get<any>(this.apiUrl + 'GetTransporterPayVehicleInfo?VehicleMasterId=' + vehicleMasterId);
  }


  paymentDetailVehicleInsert(data:any): Observable<any> {
    return this.httpclient.post<any>(this.apiUrl + 'PaymentDetailVehicleInsert', data);
  }

  transporterPayDetailList(id:number): Observable<any> {
    return this.httpclient.get<any>(this.apiUrl + 'TransporterPayDetailList?Id='+ id);
  }
}

