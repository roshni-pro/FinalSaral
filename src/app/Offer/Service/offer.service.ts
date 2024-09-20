import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, from } from 'rxjs';
import { DistributerOffer, DistributerUpdateDC, CustomerEstimationOffer, UpdateGullakDc, offerdistributerDC } from '../components/interface/offer'


@Injectable({
  providedIn: 'root'
})
export class OfferService {
  apiURL: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }

  uploader(file):Observable<any>
  {
    return
  }
  getOfferList(Warehouseid, StartDate, EndDate, offerOn): Observable<any> {
    // return this.http.get<any[]>(this.apiURL + '/api/offer/GetDistributerOffer?warehouseid='+ WarehouseId + '&start=' + start + '&end=' + end);
    return this.http.get<any>(this.apiURL + '/api/offer/GetDistributerOffer?Warehouseid=' + Warehouseid + '&StartDate=' + StartDate + '&EndDate=' + EndDate + '&offerOn=' + offerOn);
  }
  getItem(name, WarehouseId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/offer/getOfferItem?name=' + name + '&warehouseid=' + WarehouseId);
  }
  getStoreList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/offer/GetStores');
  }
  getItemListSerchByKey(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/offer/GetOfferItemSearchByKeyWord');
  }
  getAllSratuchBrandList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/offer/GetCompanyBrand');
  }
  getItemSearchAllList(warehouseId, categoryId, subCategoryId, subSubCategoryId, margin, itemClassification): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/offer/GetItemSearch?WarehouseId=' + warehouseId +
      '&categoryId=' + categoryId + '&subCategoryid=' + subCategoryId + '&subSubCategoryId=' + subSubCategoryId + '&margin=' + margin + '&itemClassification=' + itemClassification);
  }
  save(DistributerOffer: DistributerOffer): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/offer/AddDistributorOffer', DistributerOffer);
  }
  update(DistributerUpdateDC: DistributerUpdateDC): Observable<any> {

    return this.http.put<any>(this.apiURL + '/api/offer/PutDisributerOffer', DistributerUpdateDC);
  }
  getCustomerEstimationOfferDetails(Warehouseid, Skcode, OfferCode, Startdate, EndDate, Skip, Take): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/offer/GetCustomerEstimationOfferDetails?Warehouseid=' + Warehouseid + '&Skcode=' + Skcode + '&OfferCode=' + OfferCode + '&Startdate=' + Startdate + '&EndDate=' + EndDate + '&Skip=' + Skip + '&Take=' + Take);
  }
  getCheckerList(): Observable<any> {

    // return this.http.get<any>(this.apiURL + '/api/offer/GetCheckerList');
    return this.http.get<any>(this.apiURL + '/api/offer/GetMakerCheckerList');
  }
  redeem(ObjCustomerEstimationOffer: CustomerEstimationOffer): Observable<any> {

    return this.http.post<any>(this.apiURL + '/api/offer/Redeem', ObjCustomerEstimationOffer);
  }
  gullak(ObjCustomerEstimationOffer: UpdateGullakDc): Observable<any> {

    return this.http.post<any>(this.apiURL + '/api/offer/Gullak', ObjCustomerEstimationOffer);
  }
  getDispatchValue(OfferOn: string, OfferId: string, OrderId: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/offer/GetDispatchValue?OfferOn=' + OfferOn + '&OfferId=' + OfferId + '&OrderId=' + OrderId);
  }
  getChekerHistoryByChecker(Skip, Take): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/offer/GetChekerHistoryByChecker?Skip=' + Skip + '&Take=' + Take);
  }
  getChekerHistoryAll(Skip, Take): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/offer/GetChekerHistoryAll?Skip=' + Skip + '&Take=' + Take);
  }
  getAllCategory(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/offer/GetWarehouseCategrory');
  }
  GetItemIncentiveClassificationMasters()
  {
    return this.http.get<any>(this.apiURL + '/api/MobileSales/GetItemIncentiveClassificationMasters');
  }
  getAllSubCategory(): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/offer/GetWarehouseSubCategrory');
  }
  getAllBrand(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/offer/GetWarehouseBrand');
  }
  GEtOview(offerId, billDiscountType): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/offer/GetDistributerOverviw?offerId=' + offerId + '&BillDiscountType=' + billDiscountType);
  }

  /*========Neelam Work========*/
  getAllOffersList(offerPayload, OfferOn): Observable<any> {
    if (OfferOn == 'Offer Task') {
      return this.http.post<any>(this.apiURL + '/api/offer/GetOffer/', offerPayload);
    } else {
      return this.http.post<any>(this.apiURL + '/api/offer/GetBillDiscount/', offerPayload);
    }
  }
  getDataExport(Warehouseid, StartDate, EndDate): Observable<any> {
    // return this.http.get<any[]>(this.apiURL + '/api/offer/GetDistributerOffer?warehouseid='+ WarehouseId + '&start=' + start + '&end=' + end);
    return this.http.get<any>(this.apiURL + '/api/offer/GetOfferExport?Warehouseid=' + Warehouseid + '&start=' + StartDate + '&end=' + EndDate);
  }

  getAllItemByCityId(keySearch, warehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/offer/SearchBySkuAndItemName?key=' + keySearch + '&WarehouseId=' + warehouseId);
  }
  getSearchItemData(payloadData): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/offer/GetItemClassificationsAsync', payloadData);
  }
  getSearcBrandData(payloadData): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/offer/GetItemsByType', payloadData);
  }
  getSearchItem(payloadData): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/offer/GetOfferItemSearchByKeyWord', payloadData);
  }
  
  AddNewOffer(payloadData): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/offer', payloadData);
  }

  AddOfferUsingUploader(payloadData): Observable<any> {
    return this.http.post<any>(this.apiURL + '/offer/AddOfferUsingUploader', payloadData);
  }
  getAllCustomerGroupListforOffer(StoreId,dataOfferAppType): Observable<any> {
     return this.http.get<any>(this.apiURL+'/api/offer/NewCustomerGroupList?StoreId='+StoreId+'&AppType='+dataOfferAppType);
  }
  getAllCustomerGroupList(StoreId): Observable<any> {
    return this.http.get<any>(this.apiURL+'/api/offer/NewCustomerGroupList?StoreId='+StoreId);
 }
  // getAllCustomerGroupList(): Observable<any> {
  //   // return this.http.get<any>(this.apiURL + '/api/offer/CustomerGroupList?Warehouseid=' + Warehouseid);
  //    return this.http.get<any>(this.apiURL + '/api/offer/NewCustomerGroupList');
  // }
  getAllCustomerListByOrderId(OfferId) {
    return this.http.get<any>(this.apiURL + '/api/offer/offercustomerlist?OfferId=' + OfferId);
  }
  GetCustomerBySkCode(skcode): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/offer/GetCustomerBySkCode?skcode=' + skcode);
  }
  GetGetAllBrand(WarehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SubsubCategory/GetAllBrand/V2?WarehouseId=' + WarehouseId);
  }
  getAllOfferDetails(entityName, entityId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/History?entityName=' + entityName + '&entityId=' + entityId);
  }
  updateStatus(payloadData): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/Offer/ActiveDeativeoffer', payloadData);
  }
  updateOfferValue(payloadData): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/offer', payloadData);
  }
  getAllCategoryList(payloadData): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/offer/GetItemsByType', payloadData);
  }
  freebieFileUpload(payloadData): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/offer/freebiesuploder', payloadData);
  }
  getItemStockData(ItemId, ItemMultiMRPId, wherehouseId, IsDispatchedFreeStock): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/offer/GetItemStock?itemId=' + ItemId + '&multiMRPId=' + ItemMultiMRPId + '&WarehouseId=' + wherehouseId + '&IsFreeStock=' + IsDispatchedFreeStock);
  }
  getItemSelectData(wherehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/offer/GetActiveItem/?WarehouseId=' + wherehouseId);
  }
  getSelectStoreBrand(storeId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/offer/GetStoreBrandCompany?storeId=' + storeId);
  }
  getSelectMainItem(key, Warehouseid, type): Observable<any> {
    if (type == 'Distributor App') {
      return this.http.get<any>(this.apiURL + '/api/offer/SearchRDSitem?key=' + key + "&WarehouseId=" + Warehouseid);

    } else {
      return this.http.get<any>(this.apiURL + '/api/offer/SearchinitemOfferadd?key=' + key + "&WarehouseId=" + Warehouseid);
    }
  }
  getSerchFreeItem(freeitem, Warehouseid) {
    return this.http.get<any>(this.apiURL + '/api/offer/SearchinitemOfferadd?key=' + freeitem + "&WarehouseId=" + Warehouseid);

  }

  /*========Neelam Work========*/

  /*=======Ritika Work Start=====*/



  uploadImage(ImageUrl): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/logoUpload/UploadNewImage',ImageUrl);
  }

  getOfferTypeDetails(offerid):Observable<any>
  {

    return this.http.get<any>(this.apiURL +'/api/offer/GetOfferDetailById?offerId='+offerid)
  }
  // Nitisha Work
  GetGroups(skip:number,take:number):Observable<any>{
    return this.http.get<any>(this.apiURL + 'api/SalesGroup/GetAllGrp?skip='+skip+'&take='+take);
  }
  getItemNameCleareanceStock(dataWareHouseId)
  {
    return this.http.get<any[]>(this.apiURL+'api/offer/GetItemName?warehouseId='+dataWareHouseId)
  }


  OfferUploadFile(file): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/offer/OfferUploadFile',file);
  }
  Addnewexclusivegroup(name):Observable<any>{
    return this.http.get<any>(this.apiURL+'api/offer/Addnewexclusivegroup?name='+name)
  }

  GetAllExclusivegroup():Observable<any>{
    return this.http.get<any>(this.apiURL+'api/offer/GetAllExclusivegroup')
  }


}
