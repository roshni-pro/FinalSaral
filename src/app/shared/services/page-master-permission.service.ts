import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PagerDataV7 } from '../interface/pager-data-v7';

@Injectable({
  providedIn: 'root'
})
export class PageMasterPermissionService {
  apiURL: string;

  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }

  GetAllPagesForDropDown():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/PageMaster/GetAllPagesForDropDown');
  }
  GetAllParentPages():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/PageMaster/GetAllParentPages');
  }
  addMasterPage(PageMaster):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/PageMaster/SavePageMaster' ,PageMaster);
  }
  UpdateList(itemList , ParentId):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/PageMaster/UpdatePageSequence?parentPageid=' + ParentId,itemList );
  }
  addChildPage(pageMasterId:number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/PageMaster/GetAllChildPages?pageMasterId=' + pageMasterId);
  }
  DeletePage(ID): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/PageMaster/Remove?id='+ ID , '');
  }

}
