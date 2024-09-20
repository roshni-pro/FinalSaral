import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MurliService {
  apiURL: string;
  User: any;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  PostMurliItem(ItemId: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/MurliItem?ItemId=' + ItemId);
  }

  GetWarehousedata(WarehouseId: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/GetMurliItem?WarehouseId=' + WarehouseId);
  }

  GetSearchdata(searchitem: any, WarehouseId: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/SearchMurliItem?key=' + searchitem + '&WarehouseId=' + WarehouseId);
  }
  DeleteItemdata(MurliItemId: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/DeleteMurliItem?MurliItemId=' + MurliItemId);
  }
  ConvertItemdata(concateItems: any, language: any, WarehouseId: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/ConvertMurliItem?Items=' + concateItems + '&language=' + language + '&WarehouseId=' + WarehouseId);
  }

  ConvertAudio(hindiText: any, WarehouseId: any,startDate:any,endDate:any): Observable<any> {
    
    let obj = {
      hindiText: hindiText,
      WarehouseId: WarehouseId,
      FromDate:startDate,
      ToDate:endDate
    }

    return this.http.post<any>(this.apiURL + '/api/itemMaster/AddHindiMurliItem', obj);
  }


  ConvertAudioSeller(hindiText: any, SubCatId: any,startDate:any,endDate:any): Observable<any> {
    let obj = {
      hindiText: hindiText,
      SubCatId:SubCatId,
      FromDate:startDate,
      ToDate:endDate
    }

    return this.http.post<any>(this.apiURL + '/api/MurliReq/GenerateMurliaudio', obj);
  }
  GetAllMurliTopItem(): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/itemMaster/GetMurliwarehouseitem');
  }

  GetAllMurliqWarehouseTopItem(WarehouseId: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/GetMurliwarehousebaseditem?WarehouseId=' + WarehouseId);
  }
  GetWarehouseItem(name: string, WarehouseId: number): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/itemMaster/GetByName/name/' + name + '/WarehouseId/' + WarehouseId);
  }

  IsActiveItemWarehouseDetails(Id: any, WarehouseId: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/UpdateIsActive?Id=' + Id + '&WarehouseId=' + WarehouseId);
  }
  AddMurliWarehouse(WarehouseId: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/itemMaster/AddMurliwarehouse?&WarehouseId=' + WarehouseId);
  }
  RemoveItemWarehouseDetails(Id: any, WarehouseId: any): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/itemMaster/Removemurliaudio?Id=' + Id + '&WarehouseId=' + WarehouseId);
  }




  UploadMurliImageForMobile(src): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/itemMaster/UploadMurliImageForMobile', src);
  }



  AddMurliImage(src): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/itemMaster/AddMurliImage', src);
  }


  GetMurliImage(Whsearch): Observable<any> {
    
    return this.http.get<any>(this.apiURL + '/api/itemMaster/GetMurliImage?warehouseId=' + Whsearch);
  }





  ActiveMurliImages(Id: number, IsActive: boolean ,WarehouseId:number): Observable<boolean> {
    return this.http.get<boolean>(this.apiURL + '/api/itemMaster/ActiveMurliimages/Id/' + Id + '/IsActive/' + IsActive + '/WarehouseId/'+ WarehouseId);

  }


  DeleteMurliImages(Id: number,WarehouseId:number): Observable<boolean> {
    return this.http.get<boolean>(this.apiURL + '/api/itemMaster/DeleteMurliImages/Id/' + Id + '/WarehouseId/'+ WarehouseId);
  }





}




