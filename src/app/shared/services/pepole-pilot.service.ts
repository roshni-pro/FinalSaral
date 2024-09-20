import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PepolePilotService {
  apiURL: string;
                                        
   constructor( private http: HttpClient) {
     this.apiURL = environment.apiURL;
 
   }
  
   /* GetById():  Observable<any[]> {
     return this.http.get<any[]>(this.apiURL + '/api/Peoples/GetById');
   } */
   
  GetAllRoles():  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/usersroles');
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

  WarehouseWithKPP():  Observable<any[]> {    
    return this.http.get<any[]>(this.apiURL + '/api/Warehouse/WarehouseWithKpp');
  }
  
  all():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/cluster/all');
  }
  PeopleGetByID(id: number):  Observable<any> {
       return this.http.get<any>(this.apiURL + '/api/Peoples/user?PeopleId=' + id);
   }
   Department():Observable<any[]> {
    return this.http.get<any[]>(this.apiURL +  '/api/Department/GetDepartment');
   
   }
  
  GetByID(id: number):  Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/PeopleV7/GetByID/' + id);
  }

  UpdatePeople(people):  Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/Peoples/UpdatePeopleV7', people);
  }
  addPeople(people):  Observable<any> {
   
    return this.http.post<any>(this.apiURL + '/api/Account/RegisterV7' ,people);
  }

  role(peopleId):Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/usersroles/GetAllUserRoles/'+peopleId);
  }

  uploadIdProof(peopleid, ImageUrl): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/logoUpload/UploadId_ProofV7?PeopleID=' + peopleid, ImageUrl);
  }
  uploadPanCardProof(peopleid, ImageUrl): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/logoUpload/UploadPanCard_ProofV7?PeopleID=' + peopleid, ImageUrl);
  }

  uploadAddressProof(peopleid, ImageUrl): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/logoUpload/UploadAddressProofV7?PeopleID=' + peopleid, ImageUrl);
  }


  uploadMarksheet(peopleid, ImageUrl): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/logoUpload/UploadMarksheetV7?PeopleID=' + peopleid, ImageUrl);
  }


  uploaderPresalary(peopleid, ImageUrl): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/logoUpload/UploadPreSalaryV7?PeopleID=' + peopleid, ImageUrl);
  }

  GetWarehouse(id)
  {
    return this.http.get<any>(this.apiURL + '/api/Peoples/GetWarehouseEditPeople?Peopleid=' + id);
  }
  
  updateRoles(obj) : Observable<any>{
    return this.http.post<any>(this.apiURL +'/api/usersroles/UpdateRoles', obj );
  }
  
  getCustomerCallSMSRequest(data)
  {
    return this.http.post<any>(this.apiURL + '/api/CallSMSRequest/getCustomerCallSMSRequest',data);
  }

  GetUserRole() : Observable<any>{
    return this.http.get<any>(this.apiURL + '/api/Account/GetUserRole');
  }


  SubCatMapping(PeopleId):Observable<any> {
   
    return this.http.get<any>(this.apiURL + '/api/Seller/PeopleSubCat/'+PeopleId);
  }


  UpdatePeopleSubCatMap(obj) : Observable<any>{
    return this.http.post<any>(this.apiURL +'/api/Seller/UpdatePeopleSubCatMapping', obj );
  }
  
}
