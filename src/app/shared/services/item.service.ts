import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  apiURL: string;
  User: any;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }

  GetItemBarDetail(skip, take, keyword, IsExport): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ItemBarcodeA7/GetItemBarcode?skip=' + skip + '&take=' + take + '&keyword=' + keyword + '&IsExport=' + IsExport)
  }

  DeleteItemBarcodes(itemNumber, Barcode): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/itemMaster/DeleteItemBarcodes?itemNumber=' + itemNumber + '&Barcode=' + Barcode)
  }

  GetBarCode(barcode): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ItemBarcodeA7/GetBarcode?Number=' + barcode)
  }


  //for subcategory api

  getSubCategory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SubCategory/GetItemSchemeSubCategory');
  }

  GetActiveItemWH(warehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/GetActiveItemWH?warehouseId=' + warehouseId);
  }

  GetAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/itemMaster');
  }
  PutItem(Item): Observable<any[]> {
    return this.http.put<any[]>(this.apiURL + '/api/itemMaster', Item);
  }

  PutCentralItem(Item): Observable<any[]> {
    return this.http.put<any[]>(this.apiURL + '/api/itemMaster/PutCItem', Item);
  }
  PutWarehouseItem(Item): Observable<any[]> {
    return this.http.put<any[]>(this.apiURL + '/api/itemMaster', Item);
  }
  PostItem(Item): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/itemMaster', Item);
  }

  DeleteItem(ItemId): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/itemMaster/?ID=' + ItemId);
  }
  GetByID(ID): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster?ID=' + ID);
  }
  GetItemlimtData(ItemId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/GetItemLimitData?itemId=' + ItemId);
  }
  GetByWarehouseID(warehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/GetItemAgainstWareHouse?warehouseid=' + warehouseId);
  }

  GetCentral(): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/itemMaster/Central');
  }
  Getbarcode(selectedItem): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ItemBarcodeA7/GetBarcode?Number=' + selectedItem.Number);
  }

  Getitembarcode(selectedItem): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ItemBarcodeA7/GetDataBarcode?Barcode=' + selectedItem.Barcode);
  }

  // searchCentralItem(key): Observable<any> {
  //   
  //   return this.http.get<any>(this.apiURL + '/api/itemMaster/GetItemForBarcodeA7?key='+ key);


  // }

  searchCentralItem(key): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/Searchinitemat?key=' + key);
  }


  searchCentralItem7(key): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/Searchinitemat7?key=' + key);
  }

  getPagerItemList(list, page, status): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster?list=' + list + '&page=' + page + '&status=' + status);

  }

  Getwarehouseitems(list, page, warehouseId, status, strtyp): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/Getwarehouseitems?list=' + list + '&page=' + page + '&warehouseid=' + warehouseId + '&status=' + status + '&type=' + strtyp);
  }
  generatItemeCode(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/GenerateItemCode');
  }

  GetBuyer(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/itemMaster/GetBuyer');
  }

  getMultiMRP(itemNumber): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/GetItemMRP?ItemNumber=' + itemNumber);
  }

  addIemMultiMRP(itemMRP): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/itemMaster/AddItemMRP', itemMRP);
  }

  getItemLimit(itemNumber, warehouseId, multiMrpId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/GetItemLimit?itemNumber=' + itemNumber + '&WarehouseId=' + warehouseId + '&multiMrpId=' + multiMrpId);
  }
  getItemBillLimit(itemId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/GetItemBillLimit?itemId=' + itemId);
  }
  PutItemLimit(Item): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/itemMaster/PutItemLimit', Item);
  }
  PutBillItemLimit(Item): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/itemMaster/AddBillItemLimit', Item);
  }
  uploadImage(code, ImageUrl): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/itemimageupload/itemimageuploadV7?type=' + code, ImageUrl);
  }

  updateItemImage(item): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/itemMaster/updateItemImage', item);
  }

  exportCentralItem(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/exportCentral');
  }

  export(wID): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/export?warehouseid=' + wID);
  }
  exportFullWarehouse(wID): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/exportFullWarehouse?warehouseid=' + wID);
  }

  exportDeactivatedWarehouseItems(wID): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/ItemMasterDeactivatedList?warehouseid=' + wID);
  }

  searchWarehouseItems(key, wID, type?): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/WHSearchinitematAdmin?key=' + key + '&warehouseid=' + wID + '&type=' + type);
  }
  exportCurrentWarehouseItemList(wId, status): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/GetwarehouseitemsExport?warehouseid=' + wId + '&status=' + status);
  }
  GetSensitivedata(itemnumber, warehouseid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/GetSensitiveItem?itemnumber=' + itemnumber + '&warehouseid=' + warehouseid);
  }
  GetWarehousesStock(itemnumber: string): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/GetWarehousesStock?Number=' + itemnumber);
  }
  MRPSensitiveWarehouseStock(itemMRP: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/itemMaster/MRPSensitiveWarehouseStock?MRPSensitiveCollection=', itemMRP);
  }

  printBarcode(selectedItem): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/ItemBarcodeA7/printBarcode?Number=' + selectedItem.Number);
  }

  //item scheme methods

  getItemScheme(filterModel): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/itemMaster/GetItemSchemeData?' + 'keyword=' + filterModel.Key + '&skip=' + filterModel.Skip + '&take=' + filterModel.Take, filterModel.CityId);
  }

  updateItemSchemeDetails(filterModel): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/itemMaster/UpdateItemSchemeData', filterModel);
  }

  GetItemcity(name, cityid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/GetItemAgainstCity?keyword=' + name + '&CityId=' + cityid);
  }
  GetItemDetail(ItemMultiMRPId, CityId, Number): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/digitalsale/ItemAgainstCityMRPId?ItemMultiMRPId=' + ItemMultiMRPId + '&CityId=' + CityId + '&Number=' + Number);
  }
  postitemdetail(itemobject): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/digitalsale/UpdateSingleCityItemMultiHub', itemobject);
  }

  getItemLiveDashboard(TempG): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/itemMaster/ItemliveDashboard', TempG);
  }

  UploadExcel(formData: FormData) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const httpOptions = { headers: headers };
    return this.http.post(this.apiURL + 'UploadItemSchemExcel', formData, httpOptions)
  }

  GetExcelUploadItemScheme(CityId, skip, take): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ItemSchemeMaster/GetExcelUploadItemScheme?' + 'CityId=' + CityId +
      '&skip=' + skip + '&take=' + take
    );
  }

  GetItemSchExcelUploaderDetails(excelUploaderMasterId, skip, take): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ItemSchemeMaster/GetItemSchemeExcelUploaderDetailsList?' + 'excelUploaderMasterId=' + excelUploaderMasterId +
      '&skip=' + skip + '&take=' + take
    );
  }
  UploadExcel1(companycode, companystockcode, SubCatId, SubSubCatId, Cityids: any, formData: FormData) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const httpOptions = { headers: headers };
    return this.http.post(this.apiURL + 'UploadItemSchemExcel?IsCompanyCode=' + companycode + '&IsCompanyStockCode=' + companystockcode + '&SubCatId=' + SubCatId + '&SubSubCatId=0', formData, httpOptions)
  }
  getUploadedItemScheme(filterModel): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ItemSchemeMaster/GetUploadedItemScheme?' + 'CityId=' + filterModel.CityId +
      '&SubsubCategoryid=' + filterModel.SubsubCategoryid + '&skip=' + filterModel.First + '&take=' + filterModel.Last
    );
  }
  getUploadedItemSchemeById(Id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ItemSchemeMaster/ItemSchemeUploadedMasterById/' + Id);
  }


  getItemSchemeMaster(filterModel): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ItemSchemeMaster/GetItemSchemeMaster?' + 'CityId=' + filterModel.CityId +
      '&SubsubCategoryid=' + filterModel.SubsubCategoryid + '&skip=' + filterModel.First + '&take=' + filterModel.Last
    );
  }

  getItemSchemeMasterById(Id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ItemSchemeMaster/GetItemSchemeMasterById/' + Id);
  }

  PostApproveItemSchemMaster(Data): Observable<any> {

    return this.http.put<any>(this.apiURL + '/api/ItemSchemeMaster/ApproveItemSchemMaster', Data);
  }
  DeActivateSchemeDetail(MasterId, DetailId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ItemSchemeMaster/DeActivateSchemeDetail?MasterId=' + MasterId + '&DetailId=' + DetailId);
  }
  DeActivateSchemeMaster(MasterId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ItemSchemeMaster/DeActivateSchemeMaster?Id=' + MasterId);
  }

  UpdateForReErrorChecking(MasterId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ItemSchemeMaster/UpdateForReErrorChecking?MasterId=' + MasterId);
  }


  DeActivateFreebiesByDetailId(MasterId, data): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/ItemSchemeMaster/DeActivateFreebiesDetailId?MasterId=' + MasterId + '&DetailId=' + data.ItemSchemeDetailId);
  }

  GetCustNotifyItem(WarehouseId, FromDate, ToDate, skip, take): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Report/GetCustomerNotifyItem?warehouseId=' + WarehouseId + '&startDate=' + FromDate + '&endDate=' + ToDate + '&skip=' + skip + '&take=' + take);
  }
  CustomerNotifyItemExport(WarehouseId, FromDate, ToDate): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Report/CustomerNotifyItemExport?warehouseId=' + WarehouseId + '&startDate=' + FromDate + '&endDate=' + ToDate);
  }

  GetAllWarehouse(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/');
  }
  getBylistCityWise(cityId, keyword): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/itemMaster/getItemListCityWise?cityId=' + cityId + '&keyword=' + keyword);
  }
  getExistItemListCityWise(cityId, keyword): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/getExistItemListCityWise?cityId=' + cityId + '&keyword=' + keyword);
  }
  addItemCityWise(addScheme): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/itemMaster/AddItemCityWise', addScheme);
  }
  updateItemCityWise(addScheme): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/itemMaster/UpdateItemCityWise', addScheme);
  }
  getItemById(Id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/GetItemById/' + Id);
  }
  updateItemBarCode(UpdateItemBarCodeDc): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/itemMaster/UpdateItemBarCode', UpdateItemBarCodeDc);
  }
  getItemBarcodes(itemNumber): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/GetItemBarcodes?itemNumber=' + itemNumber);
  }
  addItemBarcode(ItemBarcodedDc): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/itemMaster/AddItemBarcode', ItemBarcodedDc);
  }
  generateBarcode(itemNumber): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/GenerateBarcode?itemNumber=' + itemNumber);
  }
  GetCatBrandConfig(catid, brandid): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/KKReturnReplace/CheckCatBrandConfig?CategoryId=' + catid + '&BrandId=' + brandid);
  }
  ItemSchemeSampleFile(cityids: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/itemMaster/ItemSchemeSampleFile', cityids);
  }
}
