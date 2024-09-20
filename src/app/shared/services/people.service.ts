import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  apiURL: string;
 // PeopleAll:any;
 User:any;
 comment : string;


                                         
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
 
  GetAll() {
    
    return this.http.get<any[]>(this.apiURL + '/api/Peoples/GetAllV2/');
  }

  GetPeopleWithPaging(filterModel) { 
      
    return this.http.get<any[]>(this.apiURL + '/api/Peoples/GetPeopleWithPaging?'+'mobile='+filterModel.mobile+'&page='+filterModel.page+'&list='+filterModel.list);
  }
  GetPeopleAll(skip, take): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/Peoples/GetPeopleAll?skip=' + skip + '&take=' + take);
  }
  GetPeopleByKey(key): Observable<any> {

    return this.http.get<any>(this.apiURL + '/api/Peoples/GetPeopleByKey?key=' +key);
  }

 // GetAll():  Observable<any[]> {
  //   return this.http.get<any[]>(this.apiURL + '/api/Peoples/GetAll');
  // }
  // GetByID(id: number):  Observable<any> {
  //   return this.http.get<any>(this.apiURL + '/api/PeopleV7/GetByID/' + id);
  // }

   PeopleGetByDep(dep: string):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/Peoples/?department=' + dep);
   }


  DeletePeople(id: number , DeleteComment: string):Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/Peoples?PeopleID=' + id + '&&' + 'DeleteComment=' + DeleteComment);
  }




  GetAllRoles():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/usersroles/GetAllRoles');
  }

  GetPeopleByWarehouse(WarehouseId):  Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/Peoples/WarehouseId?WarehouseId=',WarehouseId);
  }
  GetById():  Observable<any> {
    return this.http.get<any>(this.apiURL + 'api/Peoples/GetAgentWarehouse?WarehouseId=');
  }
  City():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/City');
  }
  Designation():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Designation');
  }
  States():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/States');
  }
  Warehouse():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse');
  }
  
  all():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/cluster/all');
  }
  PeopleGetByID(id: number):  Observable<any> {
       return this.http.get<any>(this.apiURL + '/api/Peoples/GetById?peopleId=' + id);
   }
  
  
  UpdatePeople(people):  Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/Peoples', people);
  }
  addPeople(people):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/Peoples' ,people);
  }

}
