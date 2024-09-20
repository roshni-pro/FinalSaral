import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehousematerialsserviceService {

  url: string;
  apiURL: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiURL;
    this.apiURL = environment.apiURL + '/api/Warehouse/';
  }

  GetWareHouseBrand(): Observable<any> {
    //let brandList = this.http.get<any>('http://192.168.1.149:80/api/WareHouse/GetWareHouseBrand/');

    let brandList = this.http.get<any>(this.apiURL + 'GetWareHouseBrand/');
    return brandList;
  }

  UpdateBrandBuyer(ObjBrandBuyer) {
    //return this.http.post<any>('http://192.168.1.149:80/api/WareHouse/UpdateBrandBuyer', ObjBrandBuyer);
    return this.http.post<any>(this.apiURL + 'UpdateBrandBuyer', ObjBrandBuyer);

  }

  GetWareHouseBrandCapacity(whouseId): Observable<any> {
    //let graphData = this.http.get<any>('http://192.168.1.149:80/api/WareHouse/GetWareHouseBrandCapacity?WareHouseId=' + Number(whouseId));

      let graphData = this.http.get<any>(this.apiURL + 'GetWareHouseBrandCapacity?WareHouseId=' + Number(whouseId));


    return graphData;
  }


  GetWareHouseBrandCapacityV2(whouseId): Observable<any> {


    //let graphData = this.http.get<any>('http://192.168.1.149:80/api/Warehouse/GetWareHouseByuerWiseCapacity?WareHouseId=' + Number(whouseId));

      let graphData = this.http.get<any>(this.apiURL + 'GetWareHouseByuerWiseCapacity?WareHouseId=' + Number(whouseId));


    return graphData;
  }


  GetBrandsByBuyerId(warehouseId, buyerId): Observable<any> {

    // let graphData = this.http.get<any>('http://192.168.1.149:80/api/Warehouse/GetBrandAcBuyer?BuyerId=' + Number(buyerId) + '&WareHouseId=' + Number(warehouseId));
    
    let graphData = this.http.get<any>(this.apiURL + 'GetBrandAcBuyer?BuyerId=' + Number(buyerId) + '&WareHouseId=' + Number(warehouseId));


    return graphData;
  }


  GetBrandsByWarehouseId(WareHouseId) {
   // let brandList = this.http.get<any>('http://192.168.1.149:80/api/WareHouse/BrandBuyerAlllocation?WareHouseId=' + WareHouseId);
    let brandList = this.http.get<any>(this.apiURL + 'BrandBuyerAlllocation?WareHouseId=' + WareHouseId);


    return brandList;
  }
}
