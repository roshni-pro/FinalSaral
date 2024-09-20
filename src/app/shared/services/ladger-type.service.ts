import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user';




@Injectable({
  providedIn: 'root'
})
export class LadgerTypeService {
  apiURL: string;
  // PeopleAll:any;
  User:any;
  comment : string;
 
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;

  }
  // save(ladger: LadgerType ):  Observable<LadgerType> {
  //   return this.http.post<Ladger>(this.apiURL + '/api/LadgerUI/Save', ladger);
  // }
 

  GetAllLadgerType():  Observable<any[]> {
    console.log("pooja")
    return this.http.get<any[]>(this.apiURL + '/api/LedgerTypeUI/GetAll');
  }
  LadgerTypeGetByID(id: number):  Observable<any> {
    console.log("sddsdd");
    return this.http.get<any>(this.apiURL + '/api/LedgerTypeUI/GetById/?id=' + id);
  }
  

  addLadgerType(countryservice):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/LedgerTypeUI/Save',countryservice);
    }
  
   
  
    UpdateLadgerType(details):  Observable<any> {
      return this.http.put<any>(this.apiURL + '/api/LedgerTypeUI/UpdateByID', details);
    }

 
  
    DeleteLadgerType(ID):Observable<any> {
    return this.http.delete<any>(this.apiURL + '/api/LadgerTypeUI/Delete?id='+ ID);
  }

}
