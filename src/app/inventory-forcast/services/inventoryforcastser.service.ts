import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryforcastserService {

  UatApi: any;
  localApi:any
  constructor(private http: HttpClient) {
    this.UatApi = environment.apiURL;
  }
  url: string;
  apiURL: string;
  whList = [];

 GETPOIDforOpenQty(id,wid):Observable<any>{
  return this.http.get(this.UatApi+'api/BuyerForecast/GETPOIDforOpenQty?ItemMultiMRPId= ' + id + '&warehouseId= ' + wid)
  }

  ForecastInventoryDaysRestrictionUploadFile(Data):Observable<any>{
    return this.http.post(this.UatApi+'api/BuyerForecastExcelFile/ForecastInventoryDaysRestrictionUploadFile',Data)
  }
  
 GetItemForecastInventory(Data: any): Observable<any> {
    return this.http.post(this.UatApi + 'api/BuyerForecast/GetItemForecastInventoryDays', Data)
  }

  InventoryDaysRestrictionUpdate(D,Wid,sid,scid,sscid,id,brandname,cid,SafetyDays):Observable<any>{
    return this.http.get(this.UatApi+ 'api/BuyerForecast/InventoryDaysRestrictionUpdate?NoOfInventoryDays=' + D + '&WarehouseId=' + Wid +'&storeid='+ sid +'&subcatid='+ scid + '&subsubcatid=' + sscid + '&Id=' + id +'&brandname=' + brandname +'&cid=' + cid +'&SafetyDays='+SafetyDays)
  }

  InventoryRestrictionUpdate(id,days):Observable<any>{
    return this.http.get(this.UatApi+ 'api/InventoryRestrictions/InventoryRestrictionUpdate?Id=' + id + '&NoOfInventoryDays=' + days )
  }

  InventoryRestrictionGet(Data: any): Observable<any> {
    return this.http.post(this.UatApi + 'api/InventoryRestrictions/InventoryRestrictionGet', Data)
  }
  
  GerPOStatus(Data: any): Observable<any> {
    // return this.http.post('http://localhost:26265/api/BuyerForecast/POCreateStatus', Data)
    return this.http.post(this.UatApi + 'api/BuyerForecast/POCreateStatus', Data)
  }

  GetBrandSaleCompaireActualVSForecastExport(GetBrandSaleCompaireActualVSForecastDc: any): Observable<any> {
    return this.http.post(this.UatApi + 'api/GetForecastData/GetBrandSaleCompaireActualVSForecastExport', GetBrandSaleCompaireActualVSForecastDc)
  }

  GetBrandSaleCompaireActualVSForecast(GetBrandSaleCompaireActualVSForecastDc: any): Observable<any> {
    return this.http.post(this.UatApi + 'api/GetForecastData/GetBrandSaleCompaireActualVSForecast', GetBrandSaleCompaireActualVSForecastDc)
  }
  // GetItemSaleCompaireActualVSForecastExport
  GetItemSaleCompaireActualVSForecastExport(GetItemSaleCompaireActualVSForecastDc: any): Observable<any> {
    return this.http.post(this.UatApi + 'api/GetForecastData/GetItemSaleCompaireActualVSForecastExport', GetItemSaleCompaireActualVSForecastDc)
  }

  GetItemSaleCompaireActualVSForecast(GetItemSaleCompaireActualVSForecastDc: any): Observable<any> {
    return this.http.post(this.UatApi + 'api/GetForecastData/GetItemSaleCompaireActualVSForecast', GetItemSaleCompaireActualVSForecastDc)
  }

  GetItemMoQ(itemMultiMrpId, warehouseId): Observable<any> {
    return this.http.get(this.UatApi + "api/BuyerForecast/GetItemMoQ?itemMultiMrpId=" + itemMultiMrpId + "&warehouseId=" + warehouseId)
  }

  UpdateItemFulFillRequest(ItemForecastPRRequestDc: any): Observable<any> {
    return this.http.post(this.UatApi + 'api/BuyerForecast/UpdateItemFulFillRequest', ItemForecastPRRequestDc)
  }

  getItemForeCastForPO(ItemForeCastRequest: any): Observable<any> {
    return this.http.post(this.UatApi + 'api/BuyerForecast/GetItemForeCastForPODetail', ItemForeCastRequest)
    //return this.http.post(this.UatApi + 'api/BuyerForecast/GetItemForeCastForPO', ItemForeCastRequest)
  }

  //-----------------------------Services by Gaurav - Start---------------------------//
  getCityList(): Observable<any> {
    return this.http.get(this.UatApi+"/api/BuyerForecast/GetCities");
  }

  getHubList(cityId): Observable<any> {
    return this.http.get<any>(this.UatApi+"api/BuyerForecast/GetWarehouse?cityId="+cityId);
  }

  getMultiHubList(cityIds): Observable<any> {
    return this.http.post<any>(this.UatApi+"api/BuyerForecast/GetWarehouseMulti",cityIds);
  }

  getCategoryList(): Observable<any> {
    return this.http.get<any>(this.UatApi +'/api/BuyerForecast/AllCategories')
  }

  getSubCategoryList(catId): Observable<any> {
    return this.http.post<any>(this.UatApi + '/api/BuyerForecast/SubCategories', catId)
  }
  
  getBrandList(subCatId) {
    return this.http.post<any>(this.UatApi + '/api/BuyerForecast/GetBrands', subCatId)
  }

  // new API for cat / subcat / brand
  getAllCategories(): Observable<any> {
    let catObj = {}
    return this.http.post<any>(this.UatApi+ '/api/BuyerForecast/AllCategories',catObj)
  }

  getSubCategories(catId): Observable<any> {
    return this.http.post<any>(this.UatApi + '/api/BuyerForecast/GetSubCategories', catId)
  }

  getSubSubCatList(subCatId): Observable<any> {
    return this.http.post<any>(this.UatApi + '/api/BuyerForecast/GetBrands', subCatId)
  }
  // new API for cat / subcat / brand

  
  getItemForcastDetails(getForcastData): Observable<any> {
    return this.http.post<any>(this.UatApi+'api/BuyerForecast/GetItemForecastDetail', getForcastData);
  }

  getItemForcastHistroy(multiMrpId, warehoueId): Observable<any> {
    return this.http.get<any>(this.UatApi + 'api/BuyerForecast/GetItemForecastHistory?itemMultiMrpId=' + multiMrpId + '&warehouseId=' + warehoueId)
  }
   // ( int Id, int PeopleId, double PercentValue,  int InventoryDays, int? CalInventoryDays,double ASP, double TotalBrandTargetValue, double TotalBrandSalesValue, int NewBuyerEditForecastQty)
  // updateItemForcast(Id, peopleId, percentValue,InventoryDays,CalInventoryDays,ASP,brandtotalvalue,BrandSalesValue,NewBuyerEditForecastQty): Observable<any> {
  //   return this.http.get<any>(this.UatApi+ 'api/BuyerForecast/UpdateItemForecast?Id=' + Id + '&PeopleId=' + peopleId + '&PercentValue=' + percentValue + '&InventoryDays=' + InventoryDays + '&CalInventoryDays=' + CalInventoryDays+'&ASP='+ ASP+'&TotalBrandTargetValue='+brandtotalvalue+'&TotalBrandSalesValue='+BrandSalesValue+'&NewBuyerEditForecastQty='+NewBuyerEditForecastQty)
  // }
  updateItemForcast(Id, peopleId, percentValue,InventoryDays,CalInventoryDays,ASP,brandtotalvalue,BrandSalesValue,NewBuyerEditForecastQty,GrowthInAmount): Observable<any> {
    return this.http.get<any>(this.UatApi+ 'api/BuyerForecast/UpdateItemForecast?Id=' + Id + '&PeopleId=' + peopleId + '&PercentValue=' + percentValue + '&InventoryDays=' + InventoryDays + '&CalInventoryDays=' + CalInventoryDays+'&ASP='+ ASP+'&TotalBrandTargetValue='+brandtotalvalue+'&TotalBrandSalesValue='+BrandSalesValue+'&NewBuyerEditForecastQty='+NewBuyerEditForecastQty+'&GrowthInAmount='+GrowthInAmount)
  }
  uploadExcelFile(excelFile): Observable<any> {
   return this.http.post<any>(this.UatApi + 'api/BuyerForecastExcelFile/BuyersEditUploadFile', excelFile);
  }
     
  GetBuyerApproveItemForeCast(approvedForcastData): Observable<any> {
    return this.http.post<any>(this.UatApi + 'api/BuyerForecast/GetBuyerApproveItemForeCast', approvedForcastData);
  }

  getSupplierList(supplierId):Observable<any>{
    return this.http.get<any>(this.UatApi + 'api/BuyerForecast/GetSupplierForForecast?warehouseId=' +supplierId)
  }

  addbuyerForcast(addData): Observable<any>{
    return this.http.post<any>(this.UatApi + 'api/BuyerForecast/CreatePoOrInternal', addData);
  }

  getDepoForPr(supplierId): Observable<any>{
    return this.http.get<any>(this.UatApi + 'api/Suppliers/GetDepoForPR?id=' +supplierId)
  }  

  forcastInvDaysUpload(addData): Observable<any>{
    return this.http.post<any>(this.UatApi + 'api/BuyerForecastExcelFile/ForecastInventoryDaysUploadFile', addData);
  }


  getListForCastInvDays(invDaysData):Observable<any>{
    return this.http.post<any>(this.UatApi + 'api/BuyerForecast/GetItemForecastInventoryDays', invDaysData);
  }

  //-----------------------------Services by Gaurav - end---------------------------//

  //---------------------------- Services By AMAN + NITISHA----------------------------------------------------//

  
  // GroupName
  groupDetail():Observable<any>
  {
    return this.http.get<any>(this.UatApi+'api/BuyerForecast/GetGroupNames')
  }
  //Main Table All Data searchnewdata
  getData( groupname:string,uploadby: string, selectDate: any,skip:number,take:number): Observable<any> {
    // return this.http.get<any>(this.localApi+ 'api/BuyerForecast/BuyerData?uploadby=' + uploadby + '&uploadDate=' + selectDate +'&GroupName='+groupname +'&skip=0&take=100')
    return this.http.get<any>(this.UatApi+ 'api/BuyerForecast/BuyerData?GroupName=' + groupname + '&uploadby=' + uploadby +'&uploadDate='+selectDate +'&skip='+skip+'&take='+take)
  }

  //Details Pop up Services
  getbuyerdetail(id: number,skip,take): Observable<any> {
    return this.http.get<any>(this.UatApi +'api/BuyerForecast/GetBuyerViewList?UplodeId=' + id +'&skip='+skip+'&take='+take)
  }
  //Detail Export Enhancement
  GetBuyerViewListExport(UplodeId:number):Observable<any>{
    debugger
    return this.http.get<any>(this.UatApi+'api/BuyerForecast/GetBuyerViewListExport?UplodeId='+UplodeId)

  }
  // summary work uat
  getsummary(id: number): Observable<any> {
    return this.http.get<any>(this.UatApi + 'api/BuyerForecast/GetBuyerSummary?UploadId=' + id)
  }

  // sales-intent-approval  '&skip'+skip+'&take='+take
  // salesintent(itembasename: string, month: any,skip,take): Observable<any> {
  //   return this.http.get<any>(this.UatApi+'api/BuyerForecast/GetSalesIntentApproval?productname='+ itembasename + '&month=' + month+ '&skip=' + skip + '&take=' + take) 
  // }

  //new POST API --gaurav
  salesintent(pendingDetails:any):Observable<any>{
    return this.http.post<any>(this.UatApi + 'api/BuyerForecast/SalesIndentPendingApproval',pendingDetails)
  }
  //new POST API --gaurav

  //uploader Api
  uploader(file): Observable<any> {
    return this.http.post<any>(this.UatApi + 'api/BuyerForecastExcelFile/BuyersForecastUploadFile', file);
  }
  //Download Sample Api
  downloadsample(): Observable<any> {
    return this.http.get<any>(this.UatApi+'api/BuyerForecastExcelFile/GetDownloadeSampleFile')
  }
  //PDCA Summary
  getpdcasummary(uploadid: number, basecatid: number, Categoryid): Observable<any> {
    return this.http.get<any>(this.UatApi + 'api/BuyerForecast/GetPdcaSummary?UplodeId=' + uploadid + '&BaseCatID=' + basecatid + '&skip=0&take=0' + '&Categoryid=' + Categoryid)
  }
  //Buyer Summary

  getbuyersummary(uploadid: number, peopleid: number, SubCategoryId): Observable<any> {
    // return this.http.get<any>(this.UatApi + 'api/BuyerForecast/BuyerSummary?UplodeId=' + uploadid + '&PeopleID=' + peopleid + '&skip=0&take=0' + '&SubCategoryId=' + SubCategoryId)
    return this.http.get<any>(this.UatApi + 'api/BuyerForecast/BuyerSummary?UplodeId=' + uploadid + '&PeopleID=' + peopleid + '&skip=0&take=0' + '&SubCategoryId=' + SubCategoryId)
  }

  //API Sales Intent Rejected BTN
  salesIntent2(Id: number, ApproverBy: number, btnApprovedReject: number): Observable<any> {
    return this.http.get<any>(this.UatApi + 'api/BuyerForecast/UpdateSalesIntentReq?Id=' + Id + '&ApproverBy=' + ApproverBy + '&btnApprovedReject=' + btnApprovedReject)
  }
  // oldRequestSearch(productname, month,skip,take) {
  //   return this.http.get<any>(this.UatApi +'api/BuyerForecast/OldRequestData?productname=' + productname + '&month=' + month + '&skip=' + skip + '&take=' + take)
  // }

  //new POST API --guarav
  oldRequestSearch(settledDeatils:any): Observable<any>  {
    return this.http.post<any>(this.UatApi +'api/BuyerForecast/SalesIndentSettledRequest',settledDeatils)
  }
  //new POST API --guarav
  //export data for buyer summary details pop up
  exportBuyerSum(uploadId: number): Observable<any> {
    return this.http.get<any>(this.UatApi + 'api/BuyerForecastExcelFile/GetDownloadeBrandSummaryFile?UploadbyID=' + uploadId)
  }

  //upload sample file of buyer summary
  uploadBuyerSum(file): Observable<any> 
  {
    return this.http.post<any>(this.UatApi + 'api/BuyerForecastExcelFile/BuyersBrandSummaryUploadFile', file)
  }

  //searching of future multi mrp
  searchFutureMRP(subCatId,itemNumber):Observable<any>
  {
    return this.http.get<any>(this.UatApi + 'api/BuyerForecast/GetFutureForcastItem?Subsubcategoryid='+subCatId+'&Number='+itemNumber)
  }

  //mapping of future multi mrp
  mapFutureMrp(ItemNo,warehouseId):Observable<any>
  {
    return this.http.get(this.UatApi+'api/BuyerForecast/GetFutureForcastMapping?ItemNumber='+ItemNo +'&warehouseId='+warehouseId)
  }

  mappingMrpUpdate(mapdata):Observable<any>
  {
    return this.http.post(this.UatApi+'api/BuyerForecast/FutureForcastMappingAdd',mapdata);
  }

  FullFillMentCategories():Observable<any>
  {
    return this.http.get<any>(this.UatApi + 'api/Masters/AllCategories')

  }

  FullFillMentCompany(mapdata):Observable<any>
  {
    return this.http.post<any>(this.UatApi+'api/Masters/SubCategories',mapdata);
  }

  FullFillMentBrand(mapdata):Observable<any>
  {
    return this.http.post<any>(this.UatApi+'api/BuyerForecast/GetBrandsForFullfillment',mapdata);
  }

  //----------------------------Services End By AMAN + NITISHA----------------------------------------------------//

  saveComment(id:number,cmt:string,supplierId:number):Observable<any>{
    return this.http.post<any>(this.UatApi + 'api/BuyerForecast/ItemfullfillmentComment?Id='+ id +'&comments='+ cmt + '&SupplierId='+supplierId,null)
  }

  saveBulkPr(PrDetails):Observable<any>{
    return this.http.post<any>(this.UatApi + 'api/BuyerForecast/UpdateItemFulFillRequestBulkItem',PrDetails)
  }

  bulkSupplierList():Observable<any>{
    return this.http.get<any>(this.UatApi + 'api/Masters/AllCategories')
  }

  buyerListForPo():Observable<any>{
    return this.http.get<any>(this.UatApi + 'api/BuyerDashboard/GetBuyers')
  }

  updatePurchaseApprovedItem(updateDetails):Observable<any>{
    return this.http.post<any>(this.UatApi+ 'api/BuyerForecast/SavePurchaseApproveItemForeCast',updateDetails)
  }

  addItemForecast(multiMrpId:number,warehouseId:number):Observable<any>{
    return this.http.get<any>(this.UatApi + 'api/BuyerForecast/AddNewItemInForecast?ItemMultiMRPId='+ multiMrpId +'&warehouseId='+ warehouseId)
  }

  exportReportForPo(ItemForeCastRequest: any):Observable<any>{
    return this.http.post<any>(this.UatApi + 'api/BuyerForecast/GetItemForeCastForPOExport',ItemForeCastRequest)
  }

  rejectPurchaseReques(fulFillMentId: any):Observable<any>{
    return this.http.post<any>(this.UatApi + 'api/BuyerForecast/RejectPurchaseRequest?fulfillmentId='+fulFillMentId,null)
  }
  
  searchNewItemNumber(itemnumber:any)
  {
    var obj=[]
    return this.http.post<any>(this.UatApi+'api/BuyerForecast/SearchNewItemNumber?ItemNumber='+itemnumber,obj)
  }
  AddNewArtical(itemmrpid,warehouseId,MaxSellingPrice,SystemSuggestedQty,InventoryDays)
  {
    var obj=[]
   return this.http.post(this.UatApi+'api/BuyerForecast/AddnewArticle?itemmrpid='+itemmrpid+'&warehouseId='+warehouseId+
   '&MaxSellingPrice='+MaxSellingPrice+'&SystemSuggestedQty='+SystemSuggestedQty+'&InventoryDays='+InventoryDays,obj)
  }

  getCommentListForSalesIntent():Observable<any>{
    return this.http.post<any>(this.UatApi+'api/BuyerForecast/GetSalesIndentComments',{})
  }

  saveCommentForSalesIntent(id:number,cmt:string):Observable<any>{
    return this.http.post<any>(this.UatApi+'api/BuyerForecast/AddCommentsSalesIndent?Id='+id+'&Comments='+cmt,{})
  }

  exportForPurchaseApprovedItemForecast(exportData):Observable<any>{
    return this.http.post<any>(this.UatApi+'api/BuyerForecast/GetPurchaseApproveItemForeCastExport',exportData)
  }

  savedDraftAsPo(draftDetails):Observable<any>{
    return this.http.post<any>(this.UatApi+'api/BuyerForecast/SaveASDraftItemfullfillment',draftDetails)
  }

  viewDraftAsPo(viewdraftDetails):Observable<any>{
    return this.http.post<any>(this.UatApi+'api/BuyerForecast/GetViewDraftByFilter',viewdraftDetails)
  }

  deleteMultipleItemDraft(deletedraftDetails):Observable<any>{
    return this.http.post<any>(this.UatApi+'api/BuyerForecast/DeleteMultipleItemSaveasDraft',deletedraftDetails)
  }

  deletePoId(deleteID):Observable<any>{
    return this.http.get<any>(this.UatApi+'api/BuyerForecast/DeleteItemSaveasDraft?Id='+deleteID)
  }

  exportItemForeCastForPO(ItemForeCastRequest: any): Observable<any> {
    return this.http.post(this.UatApi + 'api/BuyerForecast/GetItemFullfillmentExport', ItemForeCastRequest)
  }

  exportIndent(payload):Observable<any>{
    return this.http.post(this.UatApi + 'api/BuyerForecast/SalesIndentDashBoardExport', payload)
  }
  exportIndentForYtd(payload):Observable<any>{
    return this.http.post(this.UatApi + 'api/BuyerForecast/SalesIndentDashBoardYTDExport', payload)
  }
  SalesIndentDashBoard(payload):Observable<any>{
    // return this.http.post(this.UatApi + 'api/BuyerForecast/SalesIndentDashBoard', payload)
    return this.http.post(this.UatApi + 'api/BuyerForecast/SalesAllIndentDashBoard', payload)
  }
  getWarehouses(): Observable<any>
  {
    return this.http.get<any>(this.UatApi +'/api/Warehouse/GetAllWarehouse');
  }
  GetAutoPoManual(payload):Observable<any>
  {
    return this.http.post(this.UatApi + 'api/BuyerForecast/GetAutoPoManual', payload)
  }
  uploadbulkExcelFile(excelFile): Observable<any> {
    return this.http.post<any>(this.UatApi + 'api/BuyerForecastExcelFile/BulkAddNewArticleUploadFile', excelFile);
   }
   PoCheckbySubcatid(warehouseid, ItemId, SubcategoryId,SubsubCategoryid,MrpId){
    return this.http.get<any>(this.UatApi+'api/PurchaseOrderNew/PoCheckbySubcatid?warehouseid='+warehouseid+"&ItemId="+ItemId+"&SubcategoryId="+SubcategoryId+"&SubsubCategoryid="+SubsubCategoryid+"&Multimrpid="+MrpId)
   }

}







