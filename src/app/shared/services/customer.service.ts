import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiURL: string;
  // PeopleAll:any;
  User: any;
  comment: string;
  apiUrl: string;
  httpClient: any;
  tradeapiURL: any;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
    this.tradeapiURL = environment.tradeapiURL;
  }

  GetAllCustomer(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Customers');
  }

  GetCustomer(skcode): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + 'api/wallet/customer?skcode=' + skcode);
  }

  // GetCustomerService(skcode,dateto,datefrom,mobile,Cityid ):  Observable<any[]> {
  //   return this.http.get<any[]>(this.apiURL + '/api/customers?Cityid='+ Cityid +'&mobile='+ mobile +'&skcode='+ skcode + '&datefrom='+datefrom +'&dateto='+ dateto);
  // }
  GetCustomerService(skcode, dateto, datefrom, mobile, Cityid, pagerData, levelname, IsKPP, CustomerAppType, Warehouseid, ClusterId): Observable<any> {
    var date = new Date();
    if (datefrom == null)
      datefrom = new Date(date.setFullYear(date.getFullYear() - 20));

    if (dateto == null)
      dateto = new Date(date.setFullYear(date.getFullYear() + 40));
    let searchFilter = { skcode: skcode, dateto: dateto, datefrom: datefrom, mobile: mobile, Cityid: Cityid, pager: pagerData, levelname: levelname, IsDistributor: IsKPP, CustomerAppType: CustomerAppType, Warehouseid: Warehouseid, ClusterId: ClusterId };
    return this.http.post<any>(this.apiURL + '/api/customers/GetSearchCustomerV7', searchFilter);
  }

  GetCustomerSearch(key): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/customers/serach?key=' + key);
  }

  GetCustomers(key): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/customers/getcustomers' + key);
  }

  GetMissingCustomers(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/customers/GetCustomersMissingDetailV7', data);
  }

  DeleteCustomers(ID): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/customers/?id=' + ID);
  }

  CustomerGetByID(mobile: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Customers?Mobile=' + mobile);
  }
  allCustomer(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CRM/AllCustomer');
  }
  cRMReportData(Year): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CRM/CRMYearDashboard?Year=' + Year);
  }
  exportDate(month, Year): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CRM/CurrentMonthCRMExport?Month=' + month + '&Year=' + Year);
  }
  getdatamonths(month, Year): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CRM/CurrentMonthCRMDashboard?Month=' + month + '&Year=' + Year);
  }
  getcustMobile(Mobile: any): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "True"
      })
    };
    return this.http.get<any>(this.apiURL + '/api/Customers/UploadDoc?Mobile=' + Mobile, httpOptions);
  }
  addCustomer(Customer): Observable<any> {

    return this.http.post<any>(this.apiURL + '/api/Customers', Customer);
  }

  UpdateCustomer(Customer): Observable<any> {

    return this.http.put<any>(this.apiURL + '/api/Customers/V1', Customer);
  }
  DeleteCustomer(ID): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/Customers/DeleteV7?ID=' + ID);
  }
  getWareHouseByCity(cityId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Warehouse/GetActiveWarehouseDelivery?cityid=' + cityId);
  } //old warehouse api  --simran

  getWareHouseByCityNew(cityId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DeliveyMapping/GetWarehoueList/' + cityId);
  }


  getWareHouseList(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Warehouse/WhForWarkingCapital');
  }

  getWarehouseId(WarehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ItemMaster/GetWarehouseItem?WarehouseId=' + WarehouseId);
  }
  getZoneId(cityId): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/inventory/GetRegion?zoneid=' + cityId);
  }
  getClusterByCity(cityId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/cluster/hubwise?WarehouseId=' + cityId);
  }
  getAreaByCity(cityId): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/area/GetArea?CityId=' + cityId);
  }

  getCustomerPagerList(pager): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Customers/GetCustomerV7', pager);
  }

  getCustomerlevelcolor(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/TargetModule/GetLevelcolour');
  }
  getAgentByCluster(cID): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/cluster/AgentsClusterBased?clusterId=' + cID);
  }
  getExecutive(cID): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/AsignDay/Activesalesexe?WarehouseId=' + cID);
  }

  getOrderForCustomer(cID, wID): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Customers/Customerdata?Customerid=' + cID + '&warehouseid=' + wID);
  }

  Hubtransferdata(cID, wID): Observable<any> {

    return this.http.put<any>(this.apiURL + '/api/Customers/Hubtransferdata?Customerid=' + cID + '&warehouseid=' + wID, null);
  }

  HubtransferdataV2(cID, fromwID, towId): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/Customers/PendingOrderHubTransfer?Customerid=' + cID + '&fromwarehouseid=' + fromwID + '&towarehouseid=' + towId, null);
  }

  exportFullCustomer(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Customers/export');
  }
  // exportCustomer(): Observable<any>{
  //   return this.http.get<any>(this.apiURL + '/api/AsignDay/Activesalesexe');
  // }
  exportDateBased(skcode, dateto, datefrom, mobile, Cityid): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/customers?Cityid=' + Cityid + '&mobile=' + mobile + '&skcode=' + skcode + '&datefrom=' + datefrom + '&dateto=' + dateto);
  }
  exportMissing(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Customers/getcustomers');
  }
  list(): Observable<any> {
    return this.http.get<any[]>(this.tradeapiURL + '/api/TradeCustomer/GetList');
  }
  GetById(Id): Observable<any> {
    return this.http.get<any[]>(this.tradeapiURL + '/api/TradeCustomer/GetById?Id=' + Id);
  }
  SkCode(SkCode): Observable<any> {
    return this.http.get<any[]>(this.tradeapiURL + '/api/TradeCustomer/Search?SkCode=' + SkCode);
  }

  UpdateCustomers(customer): Observable<any> {
    return this.http.post<any>(this.tradeapiURL + '/api/TradeCustomer/PutItemForCustomerUI', customer);
  }

  PostCustomer(customer): Observable<any> {
    return this.http.post<any>(this.tradeapiURL + '/api/TradeCustomer/PutItemForCustomerUI', customer);
  }

  gstUpload(Customerid, ImageUrl): Observable<any> {

    return this.http.post<any>(this.apiURL + '/api/logoUpload/UploadCXimagesGSTV7?CustomerId=' + Customerid, ImageUrl);
  }
  shopUpload(Customerid, ImageUrl): Observable<any> {

    return this.http.post<any>(this.apiURL + '/api/logoUpload/UploadCXimagesSHOPV7?CustomerId=' + Customerid, ImageUrl)
  }
  UploadTCSExemptionDocument(Customerid, ImageUrl): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/Customers/UploadTCSExemptionDocument?CustomerId=' + Customerid, ImageUrl)
  }
  regupload(Customerid, ImageUrl): Observable<any> {

    return this.http.post<any>(this.apiURL + '/api/logoUpload/UploadCXimagesREGV7?CustomerId=' + Customerid, ImageUrl);
  }
  uploadCustDoc(value, CustomerId, ImageUrl): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        "No-Auth": "True"
      })
    };
    return this.http.post<any>(this.apiURL + '/api/logoUpload/UploadCustomerDoc?value=' + value + '&CustomerId=' + CustomerId, ImageUrl, httpOptions);
  }
  getCustomersmsMobile(Mobile): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Customers/CustomerUploadDocSMS?Mobile=' + Mobile);
  }

  CustomerDocUpload(CustomerId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Customers/CallCustomerForMissingDocs?customerId=' + CustomerId);
  }
  CustDocHistory(customerid) {
    return this.http.get<any>(this.apiURL + '/api/Customers/CustSMSDocHistory?CustomerId=' + customerid);
  }
  GetFilterCustomerData(pager) {
    return this.http.post<any>(this.apiURL + '/api/Customers/FilterCustomerData', pager);
  }
  GetAllCustomerData(WarehouseId, Search, FromDate, ToDate) {
    return this.http.get<any>(this.apiURL + '/api/Customers/getAllCustomerFeedbackData?WarehouseId=' + WarehouseId + '&search=' + Search + '&from=' + FromDate + '&To=' + ToDate);
  }

  GetWalletPoints(custid) {
    return this.http.get<any>(this.apiURL + '/api/Customers/GetWalletPoints?CustomerId=' + custid);
  }
  GetChequeCustomer(Warehouseid) {
    return this.http.get<any>(this.apiURL + '/api/Customers/getChequeallcustomer?WarehouseId=' + Warehouseid);
  }

  updateChequeCustomer(selectedList) {
    return this.http.post<any>(this.apiURL + '/api/Customers/updateChequeCustomer', selectedList);
  }
  chequeBounceDate(customerId) {
    return this.http.get<any>(this.apiURL + '/api/Customers/getChequeBounceDate?CustomerId=' + customerId);
  }
  getCutomerChequLimit(ChequeLimit, customerId) {
    return this.http.get<any>(this.apiURL + '/api/Customers/GetCutomerChequLimit?ChequeLimit=' + ChequeLimit + '&CustomerId=' + customerId);
  }
  geChequeinoperation(customerId) {
    return this.http.get<any>(this.apiURL + '/api/Customers/GetChequeinoperation?customerId=' + customerId);
  }
  geChequeinBank(customerId) {
    return this.http.get<any>(this.apiURL + '/api/Customers/GetChequeinBank?CustomerId=' + customerId);
  }
  getdistributionDetails(customerId) {
    return this.http.get<any>(this.apiURL + '/api/DistributorApp/getdistributionDetails?customerId=' + customerId);
  }
  updatedistributionVerify(customerId) {
    return this.http.get<any>(this.apiURL + '/api/DistributorApp/updatedistributionVerify?customerId=' + customerId);
  }
  Searchdata(orderId) {
    return this.http.get<any>(this.apiURL + '/api/Customers/Searchdata?OrderId=' + orderId);
  }
  updatepayment(dataToPost) {
    return this.http.post<any>(this.apiURL + '/api/Customers/HDFCPaymentUpdate', dataToPost);
  }
  customertargetdetails(month, year) {
    return this.http.get<any>(this.apiURL + '/api/TargetModule/GetCustomerTargetMonthWise?month=' + month + '&year=' + year);
  }
  Searchtarge(skcode) {
    return this.http.get<any>(this.apiURL + '/api/TargetModule/Searchtarge?skocde=' + skcode);
  }
  banddetails(month, year) {
    return this.http.get<any>(this.apiURL + '/api/TargetModule/GetAllLevelBands?month=' + month + '&year=' + year);
  }
  uploadFlashDealImage(WarehouseId, imagepath): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/logoUpload/UpdateComingFlashDealImage?WarehoueId=' + WarehouseId, imagepath);
  }

  GetCustomerPrimeMemberShip(customerId) {
    return this.http.get<any>(this.apiURL + '/api/Customers/GetCustomerPrimeMemberShip?customerId=' + customerId);
  }

  GetCustomerMembershiplist(datToPost) {
    return this.http.post<any>(this.apiURL + '/api/Customers/GetCustomerMembershiplist', datToPost);
  }

  MakeCustomerPrimeMember(dataToPost) {
    return this.http.post<any>(this.apiURL + '/api/Customers/MakeCustomerPrimeMember', dataToPost);
  }

  RevokMemberShip(customerId) {
    return this.http.get<any>(this.apiURL + '/api/Customers/RevokMemberShip?customerId=' + customerId);
  }

  getOTPbyMobile(mobileNo) {
    return this.http.get<any>(this.apiURL + '/api/Customers/getOTPbyMobileNo?Mobile=' + mobileNo);
  }

  GetCustomerPrimeRegDetails(customerId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Customers/GetCustomerPrimeRegDetails?customerId=' + customerId);
  }

  getCustomerMobileNo(customerId, mobile): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Customers/getCustomerMobileNo?CustomerId=' + customerId + '&mobile=' + mobile);
  }

  CheckVarifiedCustomerGSTNO(GSTNO): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/RetailerApp/CustomerGSTVerify?GSTNO=' + GSTNO);
  }
  getAllStore(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Store/GetAllStore')
  }
  getSalesTargetList(StoreId): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SalesAppReport/SalesTargetListByStoreId?StoreId=' + StoreId)
  }
  InsertUpdateSalesTarget(data): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SalesAppReport/InsertUpdateSalesTarget', data)
  }
  getMRPList(itemNo): Observable<any[]> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/GetItemMRP?ItemNumber=' + itemNo)
  }
  GetVATM(custId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Customers/GetVATM?custId=' + custId)
  }
  GetCustomerDocType(warehouseId, PeopleId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/SalesApp/GetCustomerDocType?warehouseId=' + warehouseId + '&PeopleId=' + PeopleId);
  }
  isGstExist(RefNo): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Customers/IsGstExist?RefNo=' + RefNo)
  }
  isLicenseNumberExist(LicenseNumber): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Customers/IsLicenseNumberExist?LicenseNumber=' + LicenseNumber)
  }
  checkCustomerLatLong(Customer): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Customers/CheckCustomerLatLong', Customer);
  }
  GetSKP_KPP_OwnerList(Warehouseid, CustomerId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/DeliveryApp/GetSKP_KPP_OwnerList?Warehouseid=' + Warehouseid + '&CustomerId=' + CustomerId)
  }

  updateVerificationVal(CustomerId, status) {
    return this.http.get<any>(this.apiURL + 'api/Customers/CustomerDocumentStatus/' + CustomerId + '/' + status)
  }

  getStateList(): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/States')
  }

  getCityListByStateId(stateId): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/States/GetstatebyCity?StateId=' + stateId)
  }

  getCustCodLimitData(codData): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Customers/GetCODLimitCustomerList', codData);
  }

  updateCodCustLimit(codUpdateData): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Customers/UpdateCustomersCODLimit', codUpdateData);
  }

  exportCodCustLimit(exportData): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Customers/GetExportCODLimitCustomerList', exportData);
  }

  getCodLimitByCustomeId(custId): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/Customers/GetCODLimitHistoryCustomerIdWise?CustomerId=' + custId)
  }
  CheckValidationforSupplierCustomer(data: string, fieldname: string, type: string) {
    return this.http.get<any>(this.apiURL + '/api/Suppliers/CheckFieldForSupplierAndCustomer?data=' + data + '&fieldname=' + fieldname + '&type=' + type);
  }

  UpdateAllCustomerTargetExcel(month: any, year: any, file: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/TargetModule/UpdateAllCustomerTargetExcel?month=' + month + '&year=' + year, file)
  }


  downloadsample(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/TargetModule/GetDownloadeSampleFile')
    // return this.http.get<any>('http://localhost:26265/api/TargetModule/GetDownloadeSampleFile')
  }

  GetCustomerDashboardData(Payload: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/TargetModule/GetCustomerTargetDashboard', Payload)
  }

  GetSkCodeListForTarget(Payload: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/TargetModule/GetSkCodeListForTarget', Payload)
  }

  GetWarehouseListForTarget(Payload: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/Warehouse/GetWarehouseCitiesOnOrder', Payload)
  }

  GetWarehouseListForTargetV2(Payload: any): Observable<any> {
    debugger;
    return this.http.post<any>(this.apiURL + '/api/DeliveyMapping/WarehouseGetByCityListCommon', Payload)
  }

  getWareHouseByCityV2(cityId): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/api/DeliveyMapping/WarehouseGetByCityListCommon', cityId);
  }


  GetAllCityNew(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/api/DeliveyMapping/GetCityIsCommon')
  }



  ExportAllDashboardData(Month, Year, obj: any): Observable<any> {
    //debugger;
    return this.http.post<any>(this.apiURL + 'api/TargetModule/ExportCustomerTargetMonthWise?Month=' + Month + '&Year=' + Year, obj)
  }

  getBankList(): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/Customers/GetBankName');
  }
  UploadCustomerChannelTypeFile(file): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/Customers/UploadCustomerChannelTypeFile', file);
  }

  CustomerChannelTypeList(): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/Customers/CustomerChannelTypeList');
  }
  ClusterExecutiveByWarehouseIdandChannelId(WarehouseId, channelid): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/ClusterStoreExecutive/ClusterExecutiveChannelId?WarehouseId=' + WarehouseId + '&ChannelMasterId=' + channelid);
  }

  GetSKCodeByStoreChannel(skcode): Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/Customers/GetSKCodeByStoreChannel?SkCode=' + skcode);
  }

  Add_Update_Delete_CustomerMapping(obj: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/Customers/Add_Update_Delete_CustomerMapping', obj)
  }

  ExportStoreChannelSkCodes(obj: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'api/Customers/ExportStoreChannelSkCodes', obj)
  }
  AllStore()
  {
    return this.http.get<any>(this.apiURL+"/api/Store/GetAllStore")
  }
  AddChannel(obj:any)
  {
    return this.http.post<any>(this.apiURL+"/api/MobileExecutive/AddCustomerChannel",obj);
  }

  PanVerify(PanNo:any): Observable<any[]> {
    return this.http.get<any>(this.apiURL + '/api/Customers/VerifyCustomerPan?PanNo='+ PanNo);
  }

  ClearAllOtp(MobileNumber:any): Observable<any[]> {
    return this.http.get<any>(this.apiURL + '/api/RetailerApp/ClearAllOtp?MobileNumber='+ MobileNumber);
  }
}




