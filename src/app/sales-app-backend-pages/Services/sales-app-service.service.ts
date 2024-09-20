import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesAppServiceService {
  apiURL: string;  
  CRMapiURL:string
  constructor(private http: HttpClient) { 
    this.apiURL = environment.apiURL;
    this.CRMapiURL = environment.CRMapiURL;
  }

  public editDataDetails: any = [];
  ///public subject = new Subject<any>();
  private messageSource = new  BehaviorSubject(this.editDataDetails);
  currentMessage = this.messageSource.asObservable();
  FromBucket(message: any[]) {  debugger;  this.messageSource.next(message)  }
  
  GetCustomerwithSkCode():Observable<any>{
    return this.http.get<any>(this.apiURL +'api/Gamification/GetCustomerwithSkCode');
  }
  GetQuadrantDetails(warehouseId,status,skip,take,filter):Observable<any>{
    return this.http.get<any>(this.apiURL +'api/WarehouseQuadrant/GetQuadrantDetails?warehouseId='+warehouseId+'&status='+status+'&skip='+skip+'&take='+take+'&filter='+filter);
  }
  GetConfigDatabyWid():Observable<any>{
    return this.http.get<any>(this.apiURL +'api/WarehouseQuadrant/GetConfigDatabyWid');
  }
  InsertSBForcastConfig(SBFconfigDc:any):Observable<any>{
    return this.http.post<any>(this.apiURL +'api/WarehouseQuadrant/InsertSBForcastConfig',SBFconfigDc);
  }
  UploadNewProductFile(file):Observable<any>{
    return this.http.post<any>(this.apiURL +'api/WarehouseQuadrant/UploadNewProductFile',file);
  }
  dawnloadNewProductFile():Observable<any>{
    return this.http.get<any>(this.apiURL +'api/WarehouseQuadrant/DownloadConifgSampleFile');
  }
  IsApproveReject(status:string,comment:string,quadrantDetailId:number,forcast:any):Observable<any>{
    return this.http.get<any>(this.apiURL +'api/WarehouseQuadrant/IsApproveReject?status='+status+'&comment='+comment+'&quadrantDetailId='+quadrantDetailId+'&forcast='+forcast);
  }
  beatDSR(data:any):Observable<any>{
    return this.http.post<any>(this.apiURL + 'api/MobileExecutive/SearchBeatDSR',data);
  }
  GetTelecallerBeatDSR(data:any):Observable<any>{
    return this.http.post<any>(this.apiURL + 'api/MobileExecutive/GetTelecallerBeatDSR',data);  
    //return this.http.post<any>(this.apiURL + 'api/MobileExecutive/GetTelecallerBeatDSR',data); 
  }
  GetSalesPerformanceDashbord(data:any):Observable<any>{
    return this.http.post<any>(this.apiURL + 'api/MobileExecutive/GetSalesPerformanceDashbord',data);
  }
  GetSalesPerformanceDashbordTest(data:any):Observable<any>{
    return this.http.post<any>(this.apiURL + 'api/MobileSales/GetSalesPerformanceDashbordTest',data);
  }
    
  CityStatusChange(CityId,IsActive):Observable<any>{
    return this.http.get<any>(this.apiURL +'api/MobileExecutive/CityStatusChange?CityId='+CityId+'&IsActive='+IsActive);
  }
  
  getCityList():Observable<any>{
    return this.http.get<any>(this.apiURL +'api/MobileExecutive/GetCityList');
  }

  getConfigCityList():Observable<any>{
    return this.http.get<any>(this.apiURL +'api/MobileExecutive/GetConfigCityList');
  }
  
  GroupTypesStatus(GroupId:any,status:boolean):Observable<any>{
    return this.http.get<any>(this.apiURL +'api/SalesGroup/GroupTypesStatus?groupid='+GroupId+'&type='+status);
  }

  DeleteCatalogConfigByCityId(CityId):Observable<any>{
    return this.http.get<any>(this.apiURL +'api/MobileExecutive/DeleteCatalogConfigByCityId?CityId='+CityId);
  }

  GetCatalogConfigByCityId(CityId):Observable<any>{
    return this.http.get<any>(this.apiURL +'api/MobileExecutive/GetCatalogConfigByCityId?CityId='+CityId);
  }

  PostInsertCatalogConfiguration(data:any):Observable<any>{
    return this.http.post<any>(this.apiURL + 'api/MobileExecutive/InsertCatalogConfiguration',data);
  }


  GetGroupsOnPageLoad(skip:number,take:number):Observable<any>{
    return this.http.get<any>(this.apiURL + 'api/SalesGroup/GetAllGrp?skip='+skip+'&take='+take);
  }

  GetGroups(storeId):Observable<any>{
    return this.http.get<any>(this.apiURL+ 'api/SalesGroup/GetGroupByStoreId?storeid='+storeId);
  }

  AddGroup(groupName:string,peopleId,storeId,appname,SegmentId,segName):Observable<any>{
    var obj={};
    return this.http.post<any>(this.apiURL+ 'api/SalesGroup/AddGroup?GroupName='+groupName+'&PeopleId='+peopleId+'&StoreId='+storeId+'&Appname='+appname+'&SegmentId='+SegmentId+'&SegmentName='+segName,obj)
  }

  isActive(groupId,status):Observable<any>{
    var obj={};
    return this.http.put<any>(this.apiURL + 'api/SalesGroup/GroupStatus?groupid='+groupId+'&Status='+status,obj);
  }

  SearchGroups(groupName,skip,take):Observable<any>{
    return this.http.get<any[]>(this.apiURL + 'api/SalesGroup/SearchGroup?skip='+skip+'&take='+take+'&GroupName='+groupName);
  }

  EditGroup(gpId,editedDateValue):Observable<any[]> { 
    var obj={};  
    return this.http.put<any>(this.apiURL + 'api/SalesGroup/EditValidityDate?GroupId='+gpId+'&ValidityDate='+editedDateValue,obj);
  }

  GetCustomers(GroupId,skip,take): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + 'api/SalesGroup/GetCustomerByGroup?GroupId='+GroupId+"&skip="+skip+"&take="+take);
  }
  
  RemoveCustomer(GroupId,CustomerId):Observable<any>{
    var obj={};
    return this.http.put(this.apiURL +'api/SalesGroup/RemoveCustomer?GroupId='+GroupId+'&CustomerId='+CustomerId,obj);
  }

  SearchCustomer(skcode:number):Observable<any>{
    return this.http.get<any>(this.apiURL +'api/SalesGroup/SearchCustomer?skcode='+skcode);
  }

  AddCustomer(GroupId,custId):Observable<any>{
    var obj={};
    return this.http.post<any>(this.apiURL + 'api/SalesGroup/AddCustomerInGroup?GroupId='+GroupId+'&CustomerId='+custId,obj);
  }

  GetItemList(warehouseid:number,StoreId:number,KeyValue:string):  Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/MobileExecutive/GetSKUItemList?warehouseid='
    +warehouseid+'&StoreId='+StoreId+'&KeyValue='+KeyValue);
  }

  RemoveItem(id:any):Observable<any>{
    alert(id)
    return this.http.delete<any>(this.apiURL+'api/MobileExecutive/RemoveSKUItemList?id='+id);
  }
  RemoveNew(id:number)
  {
    return this.http.get<any>(this.apiURL+'api/MobileExecutive/DeleteProductCatalogItemById?Id='+id);
  }
  deleteProductCatalogById(id:number)
  {
    return this.http.get<any>(this.apiURL+'api/MobileExecutive/DeleteProductCatalogById?Id='+id);
  }

  getAll(WarehouseId,StoreId):Observable<any>{debugger;
    return this.http.get<any>(this.apiURL+'api/MobileExecutive/GetSKUItemList?warehouseid='+WarehouseId+'&storeid='+StoreId);
  }

  AddItemList(AddItem:any):Observable<any>{
    return this.http.post<any>(this.apiURL+'api/MobileExecutive/InsertTopHighMarginSKUItemList',AddItem)
  }

  GetCity(cityid):Observable<any>{
    return this.http.get<any>(this.apiURL + 'api/Warehouse/GetWarehouseByCity?cityid='+cityid);
  }

  GetWarehouseCity():Observable<any>{
    return this.http.get<any>(this.apiURL + 'api/Warehouse/GetActiveWarehouseCity');
  }

  GetStoreList():Observable<any>{
    return this.http.get<any>(this.apiURL + 'api/Store/GetStoreList');
  }

  GetTargetData(wareHouseId,storeId,currentMontDate,Skip,Take):Observable<any[]>{
   return this.http.get<any[]>(this.apiURL + 'api/MobileExecutive/GetTargetData?warehouseid='+wareHouseId+'&storeid='+storeId+'&month='+currentMontDate+'&skip='+Skip+'&take='+Take);
  }

  UploadMonthTarget(startDate,isMonth,endDate,file):Observable<any>{ 
    return this.http.post<any>(this.apiURL + 'api/MobileExecutive/UploadMonthTargetFile?StartDate='+startDate+'&IsMonth='+isMonth+'&EndDate='+endDate,file);
  }

  DownloadeMonthTargetFile(payload):Observable<any>{
    return this.http.post<any>(this.apiURL + 'api/MobileExecutive/DownloadTargetFile',payload);
  }
  DownloadSamplefile():Observable<any>{
    return this.http.get<any>(this.apiURL + 'api/MobileExecutive/SalesTargetDashboardReport');
  }
  getWarehouses(): Observable<any>
  {
    return this.http.get<any>(this.apiURL +'/api/Warehouse/GetAllWarehouse');
  }

  getCategory():Observable<any>
  {
    return this.http.get<any>(this.apiURL+'api/SalesGroup/AllCategory')
  }

  getSubCategory():Observable<any>
  {
    return this.http.get<any>(this.apiURL+'api/SalesGroup/AllSubcat')
  }

  getSubSubCategory():Observable<any>
  {
    
    return this.http.get<any>(this.apiURL+'api/SalesGroup/AllBrand')
  }

  uploadCustomersWithFile(file,uploadStoreName,uplaodGoupName):Observable<any>
  {
    return this.http.post<any>(this.apiURL+'api/SalesGroup/UploadCustomerFile?StoreName='+uploadStoreName+'&GoupName='+uplaodGoupName,file)
  }

  getCustomerSearch(payload):Observable<any>
  {
    return this.http.post<any>(this.apiURL+'api/SalesGroup/getDataBySearch',payload)
 
  }
  
  addCustomer(payload):Observable<any>
  {
    return this.http.post<any>(this.apiURL+'api/SalesGroup/addCustomerByGroup',payload)
  }

  CRMSubGroupList():Observable<any>{
    return this.http.get<any>(this.CRMapiURL+'api/SegmentOverview/GetAllSegmentDetails');
  }

  getCustomerDetail(criteriaList:any[]):Observable<any[]>
  {
    return this.http.post<any>(this.apiURL+'/api/SalesGroup/GetCustomerDetail',criteriaList)
  }
  GetItemNamePromotions(warehouseId:any,KeyValue:any)
  {
    return this.http.get<any>(this.apiURL+'api/MobileExecutive/GetPromotionalSKUItemList?warehouseid='+warehouseId+'&KeyValue='+KeyValue)
  }
  getItemPromotionList(warehouseId:any)
  {
    return this.http.get<any>(this.apiURL+'api/MobileExecutive/GetProdCatItemByWareId?warehouseid='+warehouseId)
  }
  AddItemListPromotions(obj)
  {
    return this.http.post<any>(this.apiURL+'api/MobileExecutive/InsertProductCatalogItem',obj)
  }

  getDataSave(payload)
  {
    return this.http.post<any>(this.apiURL+'api/MobileExecutive/AddCheckOutComment',payload)
   
  }

  RemoveData(Id)
  {
    return this.http.get<any>(this.apiURL+'api/MobileExecutive/DeleteCheckOutComment?Id='+Id)
  }
  GetAllData()
  {
    return this.http.get<any>(this.apiURL+'api/MobileExecutive/GetAllComment')
  }
  GetBeatEdit()
  {
    return this.http.get<any>(this.apiURL+'api/MobileExecutive/GetBeatEditConfig')
  }
  SaveBeatEdit(data:any):Observable<any>
  {
    return this.http.post<any>(this.apiURL+'api/MobileExecutive/BeatEditConfig',data)
  }

  // ----------------------------------------Gamification Services-----------------------------------------------

  GetDataGameRewards(skip,take)
  {
    return this.http.get<any>(this.apiURL+'api/Gamification/GetData?skip='+skip+'&take='+take)
  }
  DeleteDataGameRewards(Id)
  {
    return this.http.get<any>(this.apiURL+'api/Gamification/DeleteBucketwithConditions?Id='+Id)
  }
  RewardTypeList()
  {
    return this.http.get<any>(this.apiURL+'api/Gamification/GetRewardType')
  }
  AddNewGameReward(obj)
  {
    
    return this.http.post<any>(this.apiURL+'api/Gamification/PostData',obj)
  }
  EditNewGameReward(obj)
  {
    return this.http.post<any>(this.apiURL+'api/Gamification/EditNew',obj)
  }
  AppDescriptionList()
  {
    return this.http.get<any>(this.apiURL+'api/Gamification/GetDataForConditionMasters')
  }
  PostBucketCondition(AppDescId,BucketId,Value)
  {
    const obj={}
    return this.http.post<any>(this.apiURL+'api/Gamification/PostBucketCondition?GameConditionMasterId='+AppDescId+'&GameBucketRewardId='+BucketId+'&value='+Value,obj)
  }
  GetAllGameCondition(skip,take,bucketno)
  {
    return this.http.get<any>(this.apiURL+'api/Gamification/GetAllGameCondition?skip='+skip+'&take='+take+'&BucketNo='+bucketno)
  }
   DeleteGameCondition(Id)
   {
    return this.http.get<any>(this.apiURL+'api/Gamification/DeleteGameConditions?BucketRewardConditionsID='+Id)
   }
   GetDataShowforConditionMaster(skip,take)
  {
    return this.http.get<any>(this.apiURL+'api/Gamification/GetDataShowforConditionMaster?skip='+skip+'&take='+take)
  }
  getcityList(): Observable<any> {
    return this.http.get(this.apiURL+"/api/BuyerForecast/GetCities");
  }

  getHubList(cityId): Observable<any> {
    return this.http.get<any>(this.apiURL+"api/BuyerForecast/GetWarehouse?cityId="+cityId);
  }
  GetSearchDataByBucketNo(fromDate , toDate,filter): Observable<any> {
    return this.http.get<any>(this.apiURL+"api/Gamification/GetSearchDataByBucketNo?FromBucketNo="+fromDate+'&EndBucketNo='+toDate+'&filtertype='+filter);
  }
  GetDistinctBucketNo()
  {
    return this.http.get<any>(this.apiURL+"api/Gamification/GetDistinctBucketNo");
  }
  GetBucketNoCondition(fromdate,toDate,Id)
  {
    return this.http.get<any>(this.apiURL+"api/Gamification/GetBucketNoCondition?FromBucketNo="+fromdate+"&EndBucketNo="+toDate+"&BucketId="+Id)
  }
  InActiveActiveGameBucketRewards(Id,IsActive)
  {
    return this.http.get<any>(this.apiURL+'api/Gamification/InActiveActiveGameBucketRewards?Id='+Id+'&IsActive='+IsActive)
  }
  CheckActiveInactiveBucket(bucketno,isactive,id)
  {
    return this.http.get<any>(this.apiURL+'api/Gamification/CheckActiveInactiveBucket?BucketNo='+bucketno+'&isActive='+isactive+'&Id='+id)
  }

  //-----------DashBoard Apis------------------------------------
  GetDashboardGameProgress(obj)
  {
    return this.http.post<any>(this.apiURL+"api/Gamification/GetGameDashboard",obj);
  }
  GetGameDashboardDetail(obj)
  {
    
    return this.http.post<any>(this.apiURL+"api/Gamification/GetGameDashboardDetail",obj);
  }
  EditBucketCondition(Id,value)
  {
    const obj={}
    return this.http.post<any>(this.apiURL+"api/Gamification/EditBucketCondition?Id="+Id+"&value="+value,obj)
  }
  GetGameStreakLevelConfigMaster(from,to,skip,take,Id)
  {
    
    return this.http.get<any>(this.apiURL+"api/Gamification/GetGameStreakLevelConfigMaster?BucketNoFrom="+from+"&BucketNoTo="+to+"&skip="+skip+"&take="+take+"&filtertype="+Id)
  }
  GetGameStreakLevelConfigDetail(from,to,skip,take,CreatedDate)
  {
    return this.http.get<any>(this.apiURL+"api/Gamification/GetGameStreakLevelConfigDetail?BucketNoFrom="+from+"&BucketNoTo="+to+"&skip="+skip+"&take="+take+"&CreatedDate="+CreatedDate)
  }
  InsertGameStreakLevelConfig(obj)
  {
    return this.http.post<any>(this.apiURL+"api/Gamification/InsertGameStreakLevelConfig",obj)
  }
  DeleteGameStreakMaster(bucketfrom,bucketto)
  {
    return this.http.get<any>(this.apiURL+'api/Gamification/DeleteGameStreakMaster?BucketNoFrom='+bucketfrom+'&BucketNoTo='+bucketto)
  }
  InActiveActiveGameStreakMaster(bucketfrom,bucketto,configActive,CreatedDate)
  {
    return this.http.get<any>(this.apiURL+'api/Gamification/InActiveActiveGameStreakMaster?BucketNoFrom='+bucketfrom+'&BucketNoTo='+bucketto+'&ConfigIsActive='+configActive+"&CreatedDate="+CreatedDate)
  }
  CheckBucketNo(bucketfrom,bucketto)
  {
    return this.http.get<any>(this.apiURL+'api/Gamification/CheckBucketNo?BucketFrom='+bucketfrom+'&BucketTo='+bucketto)
  }
  StreakDuration()
  {
    return this.http.get<any>(this.apiURL+'api/Gamification/StreakDuration')
  }

  GetBrands(payload)
  {
    return this.http.post<any>(this.apiURL+'api/BrandBuyer/GetBuyerWiseBrands',payload);
  }
  GetBrandList()
  {
    return this.http.get<any>(this.apiURL+'api/KKReturnReplace/GetBrandList');
  }
  GetCategoryListByBrandId(Id)
  {
    return this.http.get<any>(this.apiURL+'api/KKReturnReplace/GetCategoryList?BrandId='+Id);
  }
  insertUpdateSalesReturn(obj)  {
    return this.http.post<any>(this.apiURL+'api/KKReturnReplace/InsertUpdateSalesReturn',obj);
  }
  getSalesReturnList(obj)  {
    return this.http.post<any>(this.apiURL+'api/KKReturnReplace/GetSalesReturnList',obj);
  }
  deleteSalesReturnId(id)  {
    return this.http.get<any>(this.apiURL+'api/KKReturnReplace/DeleteSalesReturnId?id='+id);
  }
  getSalesReturnExport(KeyValue)  {
    return this.http.get<any>(this.apiURL+'api/KKReturnReplace/GetSalesReturnExport?KeyValue='+KeyValue);
  }
}



