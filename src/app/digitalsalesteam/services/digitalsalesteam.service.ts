import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
// import {FlashDealRequest,AppBannerRequestDC,
//     NotificationRequest,MurliRequest,BrandStoreRequest } from 'src/app/grow-business/interfaces/growbusiness'
@Injectable({
  providedIn: 'root'
})
export class DigitalSalesTeamService {
  apiUrl: string;


  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;

  }

  postMurliReq(murliData) {
    return this.http.post<any>(this.apiUrl + '/api/MurliReq/PostMurliReq', murliData);
  }

  postFlashDealReq(flashDealReqData) {
    return this.http.post<any>(this.apiUrl + '/api/FlashDealReq/PostFlashDealReq', flashDealReqData);
  }

  postAppBannerReq(appBannerReqData) {
    return this.http.post<any>(this.apiUrl + '/api/AppBannerReq/PostAppBannerReq', appBannerReqData);
  }

  postBrandStoreReq(brandStoreReq) {
    return this.http.post<any>(this.apiUrl + '/api/BrandStoreReq/PostBrandStoreReq', brandStoreReq);
  }

  postNotificationReq(notificationReq) {
    return this.http.post<any>(this.apiUrl + '/api/NotificationReq/PostNotificationReq', notificationReq);
  }

  GetAppBannerRequestList(searchdata) {
    return this.http.post<any>(this.apiUrl + '/api/AppBannerReq/GetAppBannerRequestList', searchdata);

  }

  GetBrandStoreRequestList(searchdata) {
    return this.http.post<any>(this.apiUrl + '/api/BrandStoreReq/GetBrandStoreRequestList', searchdata);

  }

  GetFlashDealRequestList(searchdata) {
    return this.http.post<any>(this.apiUrl + '/api/FlashDealReq/GetFlashDealRequestList', searchdata);

  }
  GetFlashDealRequestItemsById(Id):Observable<any> {
    return this.http.get<any>(this.apiUrl + '/api/FlashDealReq/FlashDealRequestItemsById?Id='+Id);

  }

  GetNotificationRequestList(searchdata) {
    return this.http.post<any>(this.apiUrl + '/api/NotificationReq/GetNotificationRequestList', searchdata);

  }

  GetMurliRequestList(searchdata) {
    return this.http.post<any>(this.apiUrl + '/api/MurliReq/GetMurliRequestList/?skip', searchdata);

  }

  uploadImage(ImageUrl): Observable<any> {

    return this.http.post<any>(this.apiUrl + '/api/MurliReq/ImageUpload', ImageUrl);
  }

  getGrowBusinessList(skip: number, take: number, RequestType: number, startDate: Date, endDate: Date, warehouseId: number) {
    return this.http.get<any>(this.apiUrl + '/api/GrowBusinessHistory/GetBussinessRequestList?skip=' + skip + '&take=' + take + '&RequestType=' + RequestType + '&startDate=' + startDate + '&endDate=' + endDate + '&warehouseId=' + warehouseId);

  }

  getCategoryList(SubCatId) {
    return this.http.get<any>(this.apiUrl + '/api/BrandStoreReq/GetCategory?SubCatId=' + SubCatId);

  }

  getItemMoq(itemnumber: number, cityid: number) {
    return this.http.get<any>(this.apiUrl + '/api/FlashDealReq/HubItemMoq?itemnumber=' + itemnumber + '&cityid=' + cityid);

  }

  getGrowBusinessDetails(RequestType: number, Id: number) {
    return this.http.get<any>(this.apiUrl + '/api/GrowBusinessHistory/GetBussinessDetail?RequestType=' + RequestType + '&Id=' + Id);

  }

  GetWarehouseCitiesOnOrder(citylist) {
    return this.http.post<any>(this.apiUrl + '/api/Warehouse/GetWarehouseCitiesOnOrder', citylist);

  }

  exportAsExcelFile(data) {
    return this.http.post<any>(this.apiUrl + '/api/NotificationReq/ExportNotificationRequest', data);

  }
  ApproveAppBannerReq(data) {
    debugger
    return this.http.post<any>(this.apiUrl + '/api/AppBannerReq/ApproveReq', data);
  }
  AppBannerAcceptReq(data) {
    return this.http.post<any>(this.apiUrl + '/api/AppBannerReq/AcceptReq', data);
  }

  ApproveNotiReq(data) {
    debugger
    return this.http.post<any>(this.apiUrl + '/api/NotificationReq/ApproveReq', data);
  }
  NotiAcceptReq(data) {
    return this.http.post<any>(this.apiUrl + '/api/NotificationReq/AcceptReq', data);
  }
  ApproveMurliReq(data) {
    debugger
    return this.http.post<any>(this.apiUrl + '/api/MurliReq/ApproveReq', data);
  }
  MurliReqAcceptReq(data) {
    return this.http.post<any>(this.apiUrl + '/api/MurliReq/AcceptReq', data);
  }
  ApproveFlashDealReq(data) {
    debugger
    return this.http.post<any>(this.apiUrl + '/api/FlashDealReq/ApproveReq', data);
  }
  FlashDealReqAcceptReq(data) {
    return this.http.post<any>(this.apiUrl + '/api/FlashDealReq/AcceptReq', data);
  }

  ApproveBrandDealReq(data) {
    debugger
    return this.http.post<any>(this.apiUrl + '/api/BrandStoreReq/ApproveReq', data);
  }
  BrandReqAcceptReq(data) {
    return this.http.post<any>(this.apiUrl + '/api/BrandStoreReq/AcceptReq', data);
  }

  // Export service
  ExportAppBannerRequest(searchdata) {
    return this.http.post<any>(this.apiUrl + '/api/AppBannerReq/ExportAppBannerRequest', searchdata);
  }
  ExportNotificationRequest(searchdata) {
    return this.http.post<any>(this.apiUrl + '/api/NotificationReq/ExportNotificationRequest', searchdata);
  }
  ExportMurliRequest(searchdata) {
    return this.http.post<any>(this.apiUrl + '/api/MurliReq/ExportMurliRequest', searchdata);
  }
  ExportFlashDealRequest(searchdata) {
    return this.http.post<any>(this.apiUrl + '/api/FlashDealReq/ExportFlashDealRequest', searchdata);
  }
  // GetSectionpreview service
  GetSectionpreview(Id, rtype) {
    return this.http.get<any>(this.apiUrl + '/api/GrowBusinessHistory/GetSectionpreview?requestId=' + Id + '&RequestType=' + rtype,);
  }
}
