import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DebitNoteRegisterComponent } from '../Components/debit-note-register/debit-note-register.component';


@Injectable({
  providedIn: 'root'
})
export class PodashboardserviceService {

  apiUrl: string;
  alternativeApiUrl: string = 'http://192.168.1.149:80';
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  PoApprovalHistroy(poapprovalid): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'api/PoApr/POApprovalhistory?poapprovalid=' + poapprovalid);
  }

  getapr1(wid): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'api/PoApr/getapr1?warehouseid=' + wid);
  }

  GetWarehouse(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'api/Warehouse');
  }
  GetPOApproval(wid): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'api/PoApr?wid=' + wid);
  }

  GetPOForClose(filter): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/api/PurchaseOrderNew/GetPOForClose/', filter);
  }

  GetPurchaseOrderCloseRequests(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/PurchaseOrderNew/GetPurchaseOrderCloseRequests/');
  }

  GetClosePOForApproval() {
    return this.httpClient.get<any>(this.apiUrl + '/api/PurchaseOrderNew/GetClosePOForApproval/');
  }


  GetClosePOForApproval1(pOCloseRequest): Observable<any> {

    return this.httpClient.post<any>(this.apiUrl + '/api/PurchaseOrderNew/GetClosePOForApprovalFilter/', pOCloseRequest);
  }

  getExcelDataForPOTracker(filter) {
    return this.httpClient.post<any>(this.apiUrl + '/api/POLifeCycle/GetPoTracker/', filter);
  }

  getExcelDataForItemLevelTracker(filter) {

    // http://localhost:26265/api/POLifeCycle/GetItemTracker
    return this.httpClient.post<any>(this.apiUrl + '/api/POLifeCycle/GetItemTracker/', filter);
  }

  getDashboardData(filter): Observable<any> {
    let startdate = null;
    let enddate = null;
    return this.httpClient.post<any>(this.apiUrl + '/api/POLifeCycle/GetPoDashBoard/', filter);
  }

  GetPoDahboardExport(filter): Observable<any> {

    return this.httpClient.post<any>(this.apiUrl + '/api/POLifeCycle/GetPoDahboardExport/', filter);
  }

  GetCreatedPoDahboardExport(filter): Observable<any> {

    return this.httpClient.post<any>(this.apiUrl + '/api/POLifeCycle/GetPoCreatedDahboardExport/', filter);
  }
  SendPOForClose(purchaseorderid) {
    return this.httpClient.get<any>(this.apiUrl + '/api/PurchaseOrderNew/SendPOForClose?purchaseOrderId=' + purchaseorderid);
  }

  getRejectedHistory(purchaseorderid) {
    return this.httpClient.get<any>(this.apiUrl + '/api/PurchaseOrderNew/GetRejectedPOApprovalsHistory?purchaseOrderId=' + purchaseorderid);

  }

  getSuppliers() {
    return this.httpClient.get<any>(this.apiUrl + '/api/POLifeCycle/GetSuppliers');
  }

  getPOWithoutGR(warehouseid, skip, take, purchaseorderId) {
    return this.httpClient.get<any>(this.apiUrl + '/api/PurchaseOrderNew/GetPOWithNoGR/warehouseId/'
      + warehouseid + '/skip/' + skip + '/take/' + take + '/purchaseorderId/' + purchaseorderId);
  }

  POCloseApprove(approveObject) {
    return this.httpClient.post<any>(this.apiUrl + '/api/PurchaseOrderNew/POCloseApprove', approveObject);
  }

  TransferPOToHub(fromwarehouseId, purchaseorderid, towarehouseid) {
    return this.httpClient.get<any>(this.apiUrl + '/api/PurchaseOrderNew/TransferPOToHub/fromwarehouseId/'
      + fromwarehouseId + '/purchaseorderid/' + purchaseorderid + '/towarehouseid/' + towarehouseid);
  }

  //advance-purchase-order-request

  getCity(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/City');
  }

  getWarehouseList(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + "/api/Warehouse")
  }

  getWarehouseByCity(cityID): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/Warehouse/GetWarehouseCity/?cityid=' + cityID);
  }

  getSupplierList(SearchKey, warehouseID): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/Suppliers/searchSupplierForPRadd?key=' + SearchKey + '&Warehouseid=' + warehouseID);
  }

  getPRList(listNo, pageNo, warehouseId): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/PurchaseOrderNew/GetPRlist?list=' + listNo + '&page=' + pageNo + '&Warehouseid=' + warehouseId)
  }

  getPRListByPOID(POID): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/PurchaseOrderNew/SearchPR?PoId=' + POID)
  }

  exportADV(payload): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/api/PurchaseOrderNew/AdvExport', payload)
  }

  getBuyer(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/Suppliers/GetBuyer');
  }

  getSupDetail(SupplierID): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + "/api/Suppliers/SupDetail?sid=" + SupplierID)
  }

  GetDepoForPR(SupplierID): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + "/api/Suppliers/GetDepoForPR?id=" + SupplierID)
  }

  getSupplierOutStandingAmount(SupplierID): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + "/api/PurchaseOrderNew/GetSupplierOutStandingAmount?supplierId=" + SupplierID)
  }

  getETADateCountWHWise(payload): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/api/PurchaseOrderNew/GetETADateCountWHWise', payload)
  }

  GetAdvanceOutstandingForAdj(payload): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/api/PurchaseRequestSettlement/GetAdvanceOutstandingForAdj', payload)
  }

  CheckPRPOStopBySupplierDepo(depoId): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/Suppliers/CheckPRPOStopBySupplierDepo?depoId=' + depoId)
  }

  searchItemsInPR(key, warehouseID): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'api/PurchaseOrderNew/SearchinitemPRadd?key=' + key + '&ids=' + warehouseID)
  }



  // https://uat.shopkirana.in/api/PurchaseOrderNew/SavePR (save button)
  // payload [{"Itemname":"oil test 5 Ltr","ItemId":409688,"Type":1,"Conversionvalue":0,"Noofset":123,"PurchaseMinOrderQty":"50",
  //"SupplierId":3082,"BuyerId":"248","WarehouseId":1,"WarehouseName":"MP-INDB-1","DepoId":3412,"price":1500,"NetPurchasePrice":1190.476,
  //"PurchasePrice":1250,"IsDraft":false,"PRType":1,"PickerType":"DeliveryfromSupplier","PRPaymentType":"AdvancePR","SupplierCreditDay":2,
  //"Category":"D","Qty":0,"inventryCount":5000,"DemandQty":4990,"OpenPOQTy":0,"ETAdate":"2022-03-15T18:30:00.000Z"},
  //{"Itemname":"Test safoya packing 500 gm 1  Kg","ItemId":389481,"Type":2,"Conversionvalue":209,"Noofset":121,"PurchaseMinOrderQty":"10","SupplierId":3082,
  //"BuyerId":"248","WarehouseId":1,"WarehouseName":"MP-INDB-1","DepoId":3412,"price":500,"NetPurchasePrice":380.952,"PurchasePrice":400,"IsDraft":false,"PRType":1,
  //"PickerType":"DeliveryfromSupplier","PRPaymentType":"AdvancePR","SupplierCreditDay":2,"Category":"A4","Qty":40,"inventryCount":4660,
  //"DemandQty":2771,"OpenPOQTy":20000,"ETAdate":"2022-03-15T18:30:00.000Z"}]

  GetWarehouseItemById(itemId, payload): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/api/PurchaseOrderNew/GetWarehouseItemById?itemId=' + itemId, payload)
  }


  //advance-purchase-details
  GetPOWithDetial(id): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/PurchaseOrderNew/GetPOWithDetial?id=' + id)
  }

  GetPRWithDetial(id): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'api/PurchaseOrderNew/GetPRWithDetial?id=' + id)
  }



  GetAdvanceAmount(id): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/PurchaseOrderNew/GetAdvanceAmount?PurchaseOrderId=' + id)
  }



  GetClosedPOAmount(id): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/PurchaseOrderNew/GetClosedPOAmount?PurchaseOrderId=' + id)
  }

  GetuserRole(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/PurchaseOrderNew/GetuserRole')
  }


  Suppliers(id): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/Suppliers?id=' + id)
  }

  getPurchaseOrderMaster(id): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/PurchaseOrderMaster?id=' + id)
  }

  GetDepoData(id): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/Suppliers/GetDepoData?id=' + id)
  }

  //advance-purchase-order-edit

  GetApproverNames(id): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/PurchaseOrderNew/GetApprovarName?POID=' + id)
  }

  GetPaymentApproverNames(id): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/PurchaseOrderNew/GetPaymentApproval?POID=' + id)
  }

  // https://uat.shopkirana.in/api/PurchaseOrderNew/PRedit
  saveEditedPurchaseRequest(payload): Observable<any> {
    return this.httpClient.put<any>(this.apiUrl + '/api/PurchaseOrderNew/PRedit', payload)
  }

  GetuserRoleByPOID(id): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/PurchaseOrderNew/Getuser?POID=' + id)
  }

  AddItemInPR(payload): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/api/PurchaseOrderNew/AddItemInPR', payload)
  }

  // https://uat.shopkirana.in/api/PurchaseOrderNew/PRRemove

  PRRemove(payload): Observable<any> {
    return this.httpClient.put<any>(this.apiUrl + '/api/PurchaseOrderNew/PRRemove', payload)
  }

  PRCancel(payload): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + "/api/PurchaseOrderNew/PRCancel", payload);
  }

  GetOpenPo(warehouseid: number, skip: number, take: number) {
    return this.httpClient.get<any>(this.apiUrl + '/api/PurchaseOrderNew/OpenPOData?warehouseid=' + warehouseid + '&skip=' + skip + '&take=' + take);
  }

  getDetailDashboardData(filter): Observable<any> {
    let startdate = null;
    let enddate = null;
    return this.httpClient.post<any>(this.apiUrl + '/api/POLifeCycle/GetDetailPoDashBoard/', filter);
  }

  EditIR(id: any) {
    return this.httpClient.get<any>(this.apiUrl + 'api/PurchaseOrderNew/EditIR?id=' + id)
  }

  GetIRDetailViaIcApprove(id: any, sdate: any, edate: any) {
    return this.httpClient.get<any>(this.apiUrl + 'api/PurchaseOrderNew/GetIRDetailViaIcApprove?warehouseid=' + id + '&StartDate=' + sdate + '&EndDate=' + edate)
  }

  AcceptRejectByIcLeadIR(IrMasterID: any, approved: any): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/PurchaseOrderNew/AcceptRejectByIcLeadIR?IrMasterID=' + IrMasterID + '&approved=' + approved);
  }
  GetDebitNoteRegisterData(payload: any) {
    return this.httpClient.post<any>(this.apiUrl + '/api/PurchaseOrderNew/GetDebitNoteRegisterData/', payload);
  }
  GetAllSubCategory(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '/api/SubCategory/getallsubcategory');
  }
  FullFillMentCompany(mapdata): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + 'api/Masters/SubCategories', mapdata);
  }
  FullFillMentBrand(mapdata): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + 'api/BuyerForecast/GetBrandsForFullfillment', mapdata);
  }
  AddnewSeasonalConfig(payload: any) {
    return this.httpClient.post<any>(this.apiUrl + 'api/PurchaseOrderNew/AddPoStopConfig/', payload);
  }
  GetSeasonalConfig(payload): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + 'api/PurchaseOrderNew/GetPoStopConfig', payload);

  }
  EditSeasonalConfigById(Id, FromDate, ToDate, StopPo): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '/api/PurchaseOrderNew/EditPoStopById?Id=' + Id + '&FromDate=' + FromDate + '&ToDate=' + ToDate + '&StopPo=' + StopPo);
  }
  getAllConfig(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + 'api/PurchaseOrderNew/getAllConfig');
  }
  EditSeasonConfig(SeasonId, FromMonth, ToMonth): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'api/PurchaseOrderNew/EditSeasonConfig?SeasonId=' + SeasonId + '&FromMonth=' + FromMonth + '&ToMonth=' + ToMonth);
  }
  AddnewSeasonConfig(SeasonName, FromMonth, ToMonth, IsEdit): Observable<any> {

    return this.httpClient.get<any>(this.apiUrl + 'api/PurchaseOrderNew/AddnewSeasonConfig?SeasonName=' + SeasonName + '&FromMonth=' + FromMonth + '&ToMonth=' + ToMonth + '&Iseditdisabled=' + IsEdit);
  }
  GetSubSubCategoryBySubCategoryId(subCatID): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'api/PurchaseOrderNew/GetSubSubCategoryBySubCategoryId?subCatID=' + subCatID);
  }
  GetPostopConfigHistory(Id): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'api/PurchaseOrderNew/GetPostopConfigHistory?Id=' + Id);
  }
  GetSeasonalConfigHistory(SeasonId): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'api/PurchaseOrderNew/GetSeasonalConfigHistory?SeasonId=' + SeasonId);
  }
  Inactiveseasonalconfig(SeasonId, Isedit): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'api/PurchaseOrderNew/Inactiveseasonalconfig?SeasonId=' + SeasonId + '&Isedit=' + Isedit);
  }

  GrQualityApprovalConfiguration(pay): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + 'api/PurchaseOrderNew/GrQualityApprovalConfiguration',pay);
  }

  AddSearchGrQualityItem(payload): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + 'api/PurchaseOrderNew/AddSearchGrQualityItem',payload);
  }

  AddNewGrQualityApprovalItem(b): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + 'api/PurchaseOrderNew/AddNewGrQualityApprovalItem', b);
  }

  ChangeEditQualityConfig(payload): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + 'api/PurchaseOrderNew/ChangeEditQualityConfig', payload);
  }
  GetItemByBrand(id): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'api/PurchaseOrderNew/GetItemByBrand',id);
  }

  QualityCheckerPeopleList(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'api/PurchaseOrderNew/QualityCheckerPeopleList');
  }
}

