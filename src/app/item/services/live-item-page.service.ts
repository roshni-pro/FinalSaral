import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LiveItemPageService {
    apiUrl: string;
    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiURL;
    }

    getBrandListByWarehouseId(): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/api/JITLiveItem/GetBrandListByWarehouseId');
    }
    getLiveItemList(LiveItemListFilterDc): Observable<any> {
        return this.http.post<any>(this.apiUrl + '/api/JITLiveItem/GetLiveItemList', LiveItemListFilterDc);
    }
    getLiveItems(LiveItemListFilterDc): Observable<any> {
        return this.http.post<any>(this.apiUrl + '/api/JITLiveItem/GetLiveItems', LiveItemListFilterDc);
    }
    getMultiMrpList(WarehouseId, ItemNumber): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/api/JITLiveItem/GetMultiMrpList?WarehouseId=' + WarehouseId + '&ItemNumber=' + ItemNumber);
    }
    getSupplierList(): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/api/Suppliers');
    }
    getDepo(): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/api/Suppliers/GetAllDepo');
    }
    getOpenMoqList(OpenMoqFilterDc): Observable<any> {
        return this.http.post<any>(this.apiUrl + '/api/JITLiveItem/GetOpenMoqList', OpenMoqFilterDc);
    }
    updateJITLiveItem(UpdateJITLiveItemDc): Observable<any> {
        return this.http.post<any>(this.apiUrl + '/api/JITLiveItem/UpdateJITLiveItem', UpdateJITLiveItemDc);
    }
    updateLimit(UpdateRiskItemDc): Observable<any> {
        return this.http.post<any>(this.apiUrl + '/api/JITLiveItem/UpdateLimit', UpdateRiskItemDc);
    }
    updateRisk(UpdateRiskItemDc): Observable<any> {
        return this.http.post<any>(this.apiUrl + '/api/JITLiveItem/UpdateRisk', UpdateRiskItemDc);
    }
    getRiskList(WarehouseId, MultiMrpId): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/api/JITLiveItem/GetRiskList?WarehouseId=' + WarehouseId + '&MultiMrpId=' + MultiMrpId);
    }
    insertJitRiskQuantity(InsertJitRiskQuantityDc): Observable<any> {
        return this.http.post<any>(this.apiUrl + '/api/JITLiveItem/InsertJitRiskQuantity', InsertJitRiskQuantityDc);
    }
    getRiskQuantityHistory(WarehouseId, ItemMultiMrpId, skip, take): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/api/JITLiveItem/GetRiskQuantityHistory?WarehouseId=' + WarehouseId + '&ItemMultiMrpId=' + ItemMultiMrpId + '&skip=' + skip + '&take=' + take);
    }
    getPriceChange(WarehouseId, BrandId, skip, take): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/api/JITLiveItem/GetUnitPriceChange?WarehouseId=' + WarehouseId + '&BrandId=' + BrandId + '&Skip=' + skip + '&Take=' + take);
    }
    GetMRPMediaList(itemnumber: any, WarehouseId: any): Observable<any> {
        return this.http.get<any>(this.apiUrl + 'api/itemMaster/GetMRPMediaList?ItemNumber=' + itemnumber + '&WarehouseId=' + WarehouseId);
    }
    // http://localhost:26265/api/itemMaster/AddUpdateConsumerItem
    AddUpdateConsumerItem(payload:any): Observable<any> {
        return this.http.post<any>(this.apiUrl + 'api/itemMaster/AddUpdateConsumerItem',payload);
    }
}
