import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PagebuttonpermissionService {
  apiURL: string;

  User:any;
  comment : string;
 
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;

}
Pages():  Observable<any[]> {
  return this.http.get<any[]>(this.apiURL + '/api/PageMaster/GetAllPagesForDropDown');
}
// GetAllPagesForDropDown():  Observable<any[]> {
//   return this.http.get<any[]>(this.apiURL + '/api/PageMaster/GetAllPagesForDropDown');
// }

getButtons(id):  Observable<any[]> {
  return this.http.get<any[]>(this.apiURL + '/api/PageMaster/GetAllPageButton?pageMasterId='+id);
}

pagepermissionlist(Buttons,Id):  Observable<any[]> {
  return this.http.post<any[]>(this.apiURL + '/api/PageMaster/SavePageButton?id='+Id,Buttons);
}


}