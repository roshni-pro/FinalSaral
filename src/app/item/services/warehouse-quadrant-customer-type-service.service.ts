import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseQuadrantCustomerTypeServiceService {

  apiURL: string;
  constructor(private http: HttpClient) {this.apiURL = environment.apiURL; }

  getWarehouseCommon(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/DeliveyMapping/GetWarehouseIsCommon');
  }

  GetWarehouseQuadrant(Data:any)
  {
    return this.http.post(this.apiURL + '/api/SalesAppItem/GetWarehouseQuadrantByCustomerType',Data);
  }
  WarehouseQuadrantMarginExport(Data:any)
  {
    return this.http.post(this.apiURL + '/api/SalesAppItem/WarehouseQuadrantMarginExport',Data); 
  }
  UpdateWarehouseQuadrant(Data:any)
  {
    return this.http.post(this.apiURL + '/api/SalesAppItem/UpdateWarehouseQuadrantByCustomerType',Data);
  }

UpdateWarehouseStoreQuadrant(id:any,margin:any)
{
  return this.http.get(this.apiURL + '/api/SalesAppItem/UpdateStoreQuadrantMargin?id='+id+'&Margin='+margin);

}

getStoreQuadrantWise(QuadrantId)
{
  return this.http.get(this.apiURL + '/api/SalesAppItem/getStoreQuadrantWise?QuadrantId='+QuadrantId);
}
GetWarehouse(): Observable<any> {
  return this.http.get<any>(this.apiURL + 'api/DeliveyMapping/GetStoreWarehouse');
}
Searchiteminstoreconfig(keyword)
{
  return this.http.get(this.apiURL + 'api/BackendOrder/Searchiteminstoreconfig?keyword='+keyword);
}
GetStoreConfig(Data:any)
  {
    return this.http.post(this.apiURL + 'api/BackendOrder/GetStoreConfig',Data);
  }
  AddnewStopConfig(Data:any)
  {
    return this.http.post(this.apiURL + 'api/BackendOrder/AddnewStopConfig',Data);
  }
  Deletestoreconfig(Id)
{
  return this.http.get(this.apiURL + 'api/BackendOrder/Deletestoreconfig?Id='+Id);
}
Editstoreconfig(Id,Type,Percentage)
{
  return this.http.get(this.apiURL + 'api/BackendOrder/Editstoreconfig?Id='+Id+'&Type='+Type+'&Percentage='+Percentage);
}
Uploader(file: any,id): Observable<any> {

  return this.http.post<any>(this.apiURL + 'api/BackendOrder/UploadStorePriceConfiguration?wid='+id, file)
}
DownloadSampleFile(){
  return this.http.get<any>(this.apiURL + 'api/BackendOrder/DownloadConfiguration')
}
ExportStoreConfig(wid:any)
{
  return this.http.get<any>(this.apiURL + 'api/BackendOrder/ExportStoreConfig?Warehouseid='+wid);
}
}
