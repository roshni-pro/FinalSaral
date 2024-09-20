import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { SelectItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class BlockbrandService {
  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  getCategoryList(): Observable<SelectItem[]> {
    return this.httpClient.get<SelectItem[]>(this.apiUrl + '/api/Store/GetCategoryList');
  }

  getSubCategoryList(categoryId: number): Observable<SelectItem[]> {
    return this.httpClient.get<SelectItem[]>(this.apiUrl + '/api/SubCategory/GetSubCategoryByCategoryId?catId=' + categoryId);
  }

  getBrand(subCategoryId,SubCategoryId): Observable<SelectItem[]> {
    return this.httpClient.get<SelectItem[]>(this.apiUrl + '/api/BlockBrand/GetSubSubCategoryBySubCategoryId?Categoryid=' + subCategoryId+'&SubCategoryId='+SubCategoryId);
  }
  getBlockBrandList(warehouseId,CustomerType, AppType,skip,take): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/BlockBrand/GetBlockBrandList?warehouseId='+warehouseId+'&CustomerType=' + CustomerType + '&AppType=' + AppType +'&skip='+skip+'&take='+take)
  }
  BlockBrandStatusChange(Id, Status): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/BlockBrand/BlockBrandStatusChange?Id=' + Id + '&status=' + Status)
  }
  AddBlockBrand(data) {
    return this.httpClient.post<any>(this.apiUrl + '/api/BlockBrand/BlockBrandSave', data)
  }
  DeleteBlockBrand(Id): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/BlockBrand/BlockBrandDelete?Id=' + Id)
  }
  GetAllWarehouse(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '/api/Warehouse/');
  }
  ExportBlockBrandList(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/BlockBrand/ExportBlockBrandList')
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
}
