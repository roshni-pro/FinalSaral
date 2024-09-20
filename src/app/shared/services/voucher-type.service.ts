import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { PagerDataV7 } from '../interface/pager-data-v7';


@Injectable({
  providedIn: 'root'
})
export class VoucherTypeService {

  apiURL: string;
  // PeopleAll:any;
  User: any;
  comment: string;



  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }


  GetAllVoucherType(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/VoucherType/GetList');
  }

  GetByID(id: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/VoucherType/GetByID/' + id);
  }

  addVoucherType(VoucherType): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/VoucherType/Save', VoucherType);
  }

  UpdateVoucherType(details): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/VoucherType/UpdateByID/', details);
  }
  DeleteVoucherType(ID): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/VoucherType/Delete/'+ ID);
  }
  // getList(pager:PagerDataV7):  Observable<any[]> {
  //   return this.http.post<any[]>(this.apiURL + '/api/VoucherTypeV7/GetList', pager);
  // }

  allMenulEdit():  Observable<any[]>{
    return this.http.get<any[]>(this.apiURL + '/api/VoucherType/AllMenulEdit');
  }
  

}
