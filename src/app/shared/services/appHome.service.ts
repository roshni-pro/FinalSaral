import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppHomeService {

  url: string;
  apiURL: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiURL;
    this.apiURL = environment.apiURL + '/api/AppHomeSectionv2/';
  }


  getConsumerWarehouse(storeType:number) {
    return this.http.get(this.apiURL + 'GetConsumerWarehouse?storeType=' + storeType);
  }

  getSectionsByWarehouseId(data) {
    return this.http.get(this.apiURL + 'GetSection?appType=' + data.AppType + '&wId=' + data.WarehouseId);
  }

  getBaseCategoryByRedirectionType() {
    return this.http.get(this.url + '/api/BaseCategory/activeBase');
  }

  getCategoriesByRedirectionType() {
    return this.http.get(this.url + '/api/Category/activeCat');
  }

  getBrandByRedirectionType() {

    return this.http.get(this.url + '/api/SubsubCategory/activeSubSub');
  }

  getSubCategory(): Observable<any> {
    return this.http.get<any>(this.url + 'api/AppHomeSection/AppHomeRequiredData');
  }

  saveCompleteAppHome(appHomeSectionsList): Observable<any> {
    return this.http.post<any>(this.apiURL + 'AddCompleteAppHome', appHomeSectionsList);
  }

  uploadImage(fileImg) {
    let res = this.http.post(this.url + '/api/imageupload/HomeSectionImages', fileImg);
    return res;
  }

  saveSection(data): Observable<any> {
    return this.http.post<any>(this.apiURL + 'AddSection', data);
  }
  deleteSectionItem(SectionId, SectionItemID): Observable<any> {
    return this.http.delete<any>(this.apiURL + 'DeleteItem?SectionId=' + SectionId + '&SectionItemID=' + SectionItemID);
  }
  deleteSection(SectionID): Observable<any> {

    return this.http.delete<any>(this.apiURL + 'DeleteSection?SectionID=' + SectionID);
  }

  GetItemM(WarehouseId): Observable<any> {
    let warehouseId = Number(WarehouseId);
    return this.http.get<any>(this.url + '/api/itemMaster/GetWarehouseItem?WarehouseId=' + warehouseId);
  }

  getMOQByItemId(itemId): Observable<any> {
    return this.http.get<any>(this.url + '/api/ItemMaster/GetItemMOQ?ItemId=' + itemId);
  }


  deleteAppHome(AppHomeList): Observable<any> {

    return this.http.post(this.apiURL + 'DeleteAppHome/', AppHomeList);
  }


  publishCompleteAppHome(appHomeSectionsList): Observable<any> {
    return this.http.post<any>(this.apiURL + 'PublishAppHome', appHomeSectionsList);
  }

  cloneAppHome(cloneObject) {

    let res = this.http.post(this.apiURL + 'CloneAppHome/', cloneObject);
    return res;
  }


  // 2022
  UploadFlashDoc(SectionId, data) {

    let res = this.http.post<any>(this.apiURL + 'post?SectionID=' + SectionId, data);
    return res;
  }



}
