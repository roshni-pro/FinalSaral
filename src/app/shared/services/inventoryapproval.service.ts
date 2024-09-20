import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PagerDataV7 } from '../interface/pager-data-v7';
import { Inventoryapproval } from '../interface/inventoryapproval';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class InventoryapprovalService {
  apiURL: string;
  User: any;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }
  GetExportApprovedRejectedData(WarehouseId:number,ExportId:number,startDate:any,endDate:any,IsHQ): Observable<any>
  {
    return this.http.get<any>(this.apiURL +'api/InventoryCycle/GetExportData?WarehouseId='+WarehouseId+'&ExportId='+ExportId+'&startDate='+startDate+'&endDate='+endDate + '&IsHQ=' + IsHQ)
  }
  exportItemWiseInventoryCycle(WarehouseId:number,IsHQ:boolean,startDate:any,endDate:any,status: number,IsPV): Observable<any>
  {
    return this.http.get<any>(this.apiURL +'api/InventoryCycle/ExportItemWiseInventoryCycle?WarehouseId='+WarehouseId+ '&IsHQ=' + IsHQ +'&start='+startDate+'&end='+endDate+'&status=' + status + '&IsPV=' + IsPV)
  }
  getPvReconcillationDateList(warehouseId:number): Observable<any>
  {
    return this.http.get<any>(this.apiURL +'api/InventoryCycle/GetPvReconcillationDateList?warehouseId='+warehouseId)
  }
  getPvReconcillationReport(PvRecocillationFilter): Observable<any>
  {
    return this.http.post<any>(this.apiURL +'api/InventoryCycle/GetPvReconcillationReport',PvRecocillationFilter);
  }
  getapproval(warehouseId: any,skip,take,IsHQ,keyword,status,isZeroDifference,start,end,type): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/InventoryCycle/GetInventoryApproval?WarehouseId=' + warehouseId+'&skip='+skip+'&take='+take + '&IsHQ=' + IsHQ + '&keyword=' + keyword + '&status=' + status + '&isZeroDifference=' + isZeroDifference + '&start=' + start + '&end=' + end + '&Type=' + type);
  }
  getInventoryZeroDifference(warehouseId: any,skip,take,IsHQ,keyword,status,isZeroDifference,start,end,type): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/InventoryCycle/getInventoryZeroDifference?WarehouseId=' + warehouseId+'&skip='+skip+'&take='+take + '&IsHQ=' + IsHQ + '&keyword=' + keyword + '&status=' + status + '&isZeroDifference=' + isZeroDifference + '&start=' + start + '&end=' + end + '&Type=' + type);
  }
  getInventoryCycleStatistics(warehouseId: any,IsHQ,start,end,IsPV): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/InventoryCycle/GetInventoryCycleStatistics?WarehouseId=' + warehouseId+ '&IsHQ=' + IsHQ + '&start=' + start + '&end=' + end + '&IsPV=' + IsPV);
  }
  SaveApprovalData(inventoryapproval: Inventoryapproval[]): Observable<any> {

    return this.http.post<any>(this.apiURL + '/api/InventoryCycle/SaveApprovalData', inventoryapproval);
  }
  SaveRejectedData(inventoryapproval: Inventoryapproval[]): Observable<any> {

    return this.http.post<any>(this.apiURL + '/api/InventoryCycle/SaveRejectedData', inventoryapproval);
  }
  saveRejectedDataForWH(inventoryapproval: Inventoryapproval[]): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/InventoryCycle/SaveRejectedDataForWH', inventoryapproval);
  }
  getInventCycleBatchHistory(BatchMasterId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/InventoryCycle/GetInventoryCycleBatchHistory?BatchMasterId=' + BatchMasterId);
  }
  getInventoryCycleHistory(InventCycleId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/InventoryCycle/GetInventoryCycleHistory?InventCycleId=' + InventCycleId);
  }
  getExportData(warehouseId: any,ExportId:number): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/InventoryCycle/GetExportData?WarehouseId=' + warehouseId+'&ExportId='+ExportId);
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  // Nitisha Work
  SearchitemForInventoryCycle(key,warehoueId)
  {
    return this.http.get<any[]>(this.apiURL +'/api/InventoryCycle/SearchitemForInventoryCycle?key='+key+'&warehouseid='+warehoueId);

  }
  AddItemInInventoryCycle(itemMultiMrpId,warehouseid)
  {
    return this.http.get<any[]>(this.apiURL+'api/InventoryCycle/AddItemInInventoryCycle?itemMultiMrpId='+itemMultiMrpId+'&warehouseid='+warehouseid);

  }
  UploadItem(obj):Observable<any>
  {
    return this.http.post(this.apiURL+'/api/InventoryCycle/UploadItemInInventoryCycle',obj);
  }
}
