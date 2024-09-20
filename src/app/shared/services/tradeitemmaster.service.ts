import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, ObservedValueOf } from 'rxjs';
import { TradeMisTarget } from '../interface/trade/trade-mis-target';
import { TradeDashboardFilters } from '../interface/trade/trade-dashboard-filters';
import { TradeCommissionDc } from 'app/shared/interface/trade/trade-commission-dc';
import { TradeCommissionFilters } from '../interface/trade/trade-commission-dc';
import { AppStartupPopupsDc } from '../interface/trade/app-startup-popups-dc';
import { PaginatortradeMaster } from '../interface/paginator-trade-itemMaster';
import { ZaruriAppdashboardFilter } from '../interface/trade/ZaruriAppdashboardFilter';




@Injectable({
  providedIn: 'root'
})
export class TradeitemmasterService {
  apiURL: string;
  User: any;
  comment: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.tradeapiURL;
  }
  GetAll(IM : PaginatortradeMaster): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/TradeItem/GetAllItems', IM);
  }

 
  PutItem(Item): Observable<any[]> {
    return this.http.put<any[]>(this.apiURL + '/api/TradeItem/Update', Item);
  }

  PostItem(Item): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/itemMaster/?item=', Item);
  }

  DeleteItem(ItemId): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/itemMaster/?ID=' + ItemId);
  }
  GetByID(ID): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster?ID=' + ID);
  }

  GetByWarehouseID(warehouseId): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/GetItemAgainstWareHouse?warehouseid=' + warehouseId);
  }


  GetCentral(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/Central');
  }

  searchCentralItem(key): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/Searchinitemat?key=' + key);
  }


  itemsearch(item: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/TradeItem/GetItemAutoCompleteAsync/' + item);
  }

  GetTradeItem(ID): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/TradeItem/GetItemForTradeUI?ID=' + ID);
  }


  UpdateItems(ItemData): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/TradeItem/PutItemForTradeUI', ItemData);
  }
  SelectCategory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/TradeItem/SelectCategoryDrop');
  }
  SelectBaseCategoryDrop(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/TradeItem/SelectBaseCategoryDrop');
  }
  SelectSubCategoryNameDrop(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/TradeItem/SelectSubCategoryNameDrop');
  }
  SelectBrandNameDrop(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/TradeItem/SelectBrandNameDrop');
  }
  AddItem(ItemData): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/TradeItem/AddItemFromTradeUI', ItemData); // no longer in use 
  }
  UploadItemImage(src): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/TradeItem/UploadItemImage', src);
  }
  UploadBrandImage(src): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/TradeItem/UploadBrandImage', src);
  }



  GetTradeDashboardMonth(tradeDashboardFilters: TradeDashboardFilters): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/TradeDashboard/Monthly', tradeDashboardFilters);
  }

  GetTradeDashboardDaily(tradeDashboardFilters: TradeDashboardFilters): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/TradeDashboard/Daily', tradeDashboardFilters);
  }

  GetTradeDashboardYearly(tradeDashboardFilters: TradeDashboardFilters): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/TradeDashboard/Yearly', tradeDashboardFilters);
  }


  SelectCity(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/TradeDashboard/SelectCity');
  }

  InsertMisTarget(tradeMisTarget: TradeMisTarget): Observable<any[]> {
    
    return this.http.post<any[]>(this.apiURL + '/api/TradeDashboard/InsertMisTarget', tradeMisTarget);
  }


  GetMisTarget(tradeMisTarget: TradeMisTarget): Observable<any[]> {
    
    return this.http.post<any[]>(this.apiURL + '/api/TradeDashboard/GetMisTarget', tradeMisTarget);
  }


  GetMisTargetSearch(tradeMisTarget: TradeMisTarget): Observable<any[]> {
    
    return this.http.post<any[]>(this.apiURL + '/api/TradeDashboard/GetMisTargetSearch', tradeMisTarget);
  }



  GetAllMisTargets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/TradeDashboard/GetAllMisTargets');
  }


  SelectCategoryv1(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/TradeDashboard/SelectCategory');
  }




  SelectCategoryV2(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/TradeCommission/SelectCategoryV2');
  }

  CommissionCrud(tradeCommissionDc: TradeCommissionDc): Observable<any[]> {

    return this.http.post<any[]>(this.apiURL + '/api/TradeCommission/CommissionCrud', tradeCommissionDc);

  }

  GetTradeCommission(tradeCommissionFilters: TradeCommissionFilters): Observable<any[]> {

    return this.http.post<any[]>(this.apiURL + '/api/TradeCommission/GetTradeCommission', tradeCommissionFilters);

  }

  UpdateTradeCommission(tradeCommission: TradeCommissionFilters): Observable<any[]> {

    return this.http.post<any[]>(this.apiURL + '/api/TradeCommission/UpdateTradeCommission', tradeCommission);

  }

  GetCityV2(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/AppStartupPopups/GetCityV2');
  }

  UploadStartupPopup(src): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/AppStartupPopups/UploadStartupPopup', src);
  }

  AddAppStartupPopups(AppStartupPopups:AppStartupPopupsDc): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/AppStartupPopups/AddAppStartupPopups', AppStartupPopups);
  }

  GetAppStartupPopups(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/AppStartupPopups/GetAppStartupPopups');
  }
 
  UpdateAppStartupPopups(AppStartupPopups:AppStartupPopupsDc): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/AppStartupPopups/UpdateAppStartupPopups', AppStartupPopups);
  }

  GetAllCity(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/tradeCity/GetCityV2');
  }
  UpdateCityList(citydata): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/tradeCity/UpdateCity', citydata);
  }

  GetZaruriAppDashboard(zaruriAppDashboardFilter: ZaruriAppdashboardFilter): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/ShoppingCart/ZaruriAppDashboardA7', zaruriAppDashboardFilter);
  }

  getTkItemsCreated(dataToPost): Observable<any> {
    return this.http.post<any[]>(this.apiURL + '/api/TradeItem/GetNewCreatedItems',dataToPost);
  }

  ApproveItemRequest(postdata): Observable<any> {
    return this.http.post<any[]>(this.apiURL + '/api/TradeItem/ApprovedTkItem',postdata);
  }

}
