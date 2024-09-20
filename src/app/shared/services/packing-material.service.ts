import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { AddMaterialItemMasterComponent } from 'app/packing-material/components/add-material-item-master/add-material-item-master.component';

@Injectable({
  providedIn: 'root'
})
export class PackingMaterialService {
  apiURL: string;
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  searchPMSupplier(searchkey): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/PMSupplier/GetSupplierDetails/' + searchkey);
  }

  GetPackingBagDetails(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/PMSupplier/GetPackingBagDetails');
  }

  InsertPackingMaterialPO(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/PMSupplier/InsertPackingMaterialPO', data);
  }

  GetPackingMaterialPoList(first,last): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/PMSupplier/GetPackingMaterailPoDetails?Skip='+first +'&Take='+last);
  }

  InsertGRPackingMaterial(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/PMSupplier/InsertPackingMaterialGR', data);
  }

  GetPackingMaterialGRDetails(poId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/PMSupplier/GetGRPackingMaterialDetails/'+poId);
  }

  ApproveRejectGR(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/PMSupplier/ApproveRejectGR', data);
  }
  
  GetOuterBagDetails(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ItemMaterial/GetOuterBag');
  }

  AddMaterialItem(data): Observable<any>{
    return this.http.post<any>(this.apiURL + '/api/ItemMaterial/CreateMaterialItemMaster', data);
  }
  GetInnerBag(Id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ItemMaterial/GetBagDescription?OuterBagId='+Id);
  }

  AddMaterialItemDetails(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/ItemMaterial/CreateMaterialItemDetails', data);
  }

  GettemMasterDetailsActype(WId,itemnumber): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/RawMaterial/GettemMasterDetailsActype?WareHouseId='+WId + '&&ItemNumber='+ itemnumber);
  }
  InsertRawMaterialMst(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/RawMaterial/InsertRawMaterialMst', data);
  }

  GetRawMasterAcBuyer(skip,take): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/RawMaterial/GetRawMasterAcBuyer?Skip='+skip + '&&Take='+ take);
  }

  GetInvoiceDeliveryChallanDetails(invoiceno): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/RawMaterial/GetInvoiceDeliveryChallanDetails?InvoiceChallanNo='+invoiceno);
  }

  GetAddedBomDetails(id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ItemMaterial/GetAddedBomDetails?BomId='+id);
  }


  GetPackingMaterialReport(id , sid , skip , take): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/RawMaterial/GetPackingMaterialReport?WareHouseId='+id + '&SupplierId='+sid +'&Skip='+skip+'&Take='+take ); //+'&Skip='+skip+'&Take='+take
  }
 // http://192.168.1.149:8080/api/RawMaterial/GetInvoiceDtlsAcInvoice?InvoiceChallanNo=303814562&WareHouseId=10

  GetInvoiceDtlsAcInvoice(InvoiceChallanNo , WareHouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/RawMaterial/GetInvoiceDtlsAcInvoice?InvoiceChallanNo='+InvoiceChallanNo + '&WareHouseId='+WareHouseId )
  }
  GetMaterialMaster(Number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ItemMaterial/GetMaterialMaster?ItemNumber='+Number)
  }
}
