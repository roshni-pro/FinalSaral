import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomersCartFilters } from '../interface/shoppingCart/customers-cart-filters';
import { data } from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  apiURL: string;
  User: any;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }
  // getshoppingdata(SkCode,Mobile):  Observable<any[]> {
  //   return this.http.get<any[]>(this.apiURL + '/api/ShoppingCart/SearchList'+ SkCode +Mobile);
  // }
  getshoppingdata(customersCartFilters: CustomersCartFilters):  Observable<any> {
    
    return this.http.post<any>(this.apiURL + '/api/ShoppingCart/SearchList', customersCartFilters);
  }
  getexportdata(customersCartFilters:CustomersCartFilters):  Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/ShoppingCart/ExportShoppingCart',customersCartFilters);
  }
  
  getPagershoppingList(skip, page, total_count,take): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ShoppingCart/SearchList'+'&skip=' + skip + '&page=' + page + '&total_count=' + total_count +'&take='+take);

  }
  getshoppingdetailsdata(customersCartFilters: CustomersCartFilters):  Observable<any> {
    
    return this.http.post<any>(this.apiURL + '/api/ShoppingCart/SearchList', customersCartFilters);
  }
  GetAllWarehouse(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/');
  }
  GetCardDealItem(WarehouseId,itemName,skip,take): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/GetDealItemWithPaging?warehouseId='+WarehouseId+'&itemName='+itemName+'&skip='+skip+'&take='+take);
  }
  GetItemSearchByKeyWord(data):Observable<any>{
    return this.http.post<any>(this.apiURL+'/api/offer/GetItemSearchByKeyWord',data)
  }
  SaveDealItem(data):Observable<any>{
    return this.http.post<any>(this.apiURL+'/api/itemMaster/SaveDealItem',data)
  }
  DealItemStatusChange(Id,Status):Observable<any>{
return this.http.get<any>(this.apiURL+'/api/itemMaster/DealItemStatusChange?Id='+Id+'&status='+Status)
  }
  
}