import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { ScanBarcode } from "../interface/scan-barcode";

@Injectable({
  providedIn: "root",
})
export class ScanBarcodeService {
  apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  whForWarkingCapital(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/api/Warehouse/WhForWarkingCapital');
  }
  getBarcodeItemforpage(warehouseId): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/api/InventoryCycle/GetBarcodeItemforpage?warehouseId=' + warehouseId);
  }
  barcodeItemApproved(id,status): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/api/InventoryCycle/BarcodeItemApproved?id=' + id + '&status=' + status);
  }
  getItemList(): ScanBarcode[] {
    return [
      {
        ExistingEAN:'dsds,dsds',
        Id: 1,
        ImageUrl:'',
        ItemName:'Monaco',
        ItemNumber:'sfdsfss',
        NewEAN:'dsssds',
        Status:1,
        WarehouseId:12
      },
      {
        ExistingEAN:'dsds,dsds',
        Id: 1,
        ImageUrl:'',
        ItemName:'Parle',
        ItemNumber:'sfdsfss',
        NewEAN:'dsssds',
        Status:1,
        WarehouseId:12
      },
      {
        ExistingEAN:'dsds,dsds',
        Id: 1,
        ImageUrl:'',
        ItemName:'5050',
        ItemNumber:'sfdsfss',
        NewEAN:'dsssds',
        Status:1,
        WarehouseId:12
      },
      {
        ExistingEAN:'dsds,dsds',
        Id: 1,
        ImageUrl:'',
        ItemName:'Parle',
        ItemNumber:'sfdsfss',
        NewEAN:'dsssds',
        Status:1,
        WarehouseId:12
      },
      {
        ExistingEAN:'dsds,dsds',
        Id: 1,
        ImageUrl:'',
        ItemName:'2020',
        ItemNumber:'sfdsfss',
        NewEAN:'dsssds',
        Status:1,
        WarehouseId:12
      },
      {
        ExistingEAN:'dsds,dsds',
        Id: 1,
        ImageUrl:'',
        ItemName:'Hide&Sick',
        ItemNumber:'sfdsfss',
        NewEAN:'dsssds',
        Status:1,
        WarehouseId:12
      },
      {
        ExistingEAN:'dsds,dsds',
        Id: 1,
        ImageUrl:'',
        ItemName:'Britania',
        ItemNumber:'sfdsfss',
        NewEAN:'dsssds',
        Status:1,
        WarehouseId:12
      },
    ]
  }
}
