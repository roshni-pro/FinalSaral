import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { MakerCheckerDTO, } from 'app/checker/component/interface/MakerCheckerDTO';
import { catchError } from 'rxjs/operators'
import {ApproverSupplier} from 'app/checker/component/interface/approvesupplier'
import {ApproverDpot,activeDactivate,activeDactivateDpot} from 'app/checker/component/interface/approvesupplier'

@Injectable({
  providedIn: 'root'
})
export class MastermakercheckerService {

  apiURL: string;
  
  User:any;
  comment : string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
   }
   MasterCheckerEntity():  Observable<any[]> {
       
    return this.http.get<any[]>(this.apiURL + '/api/inventory/GetCheckerList');
  }

  MasterCheckerList(entity,status):  Observable<any> {
    
 return this.http.get<any>(this.apiURL + '/api/inventory/GetCheckerData?entityname=' + entity + '&status=' + status);
}

CheckerList(entity,status,k ,s, t):  Observable<any> {
  return this.http.get<any>(this.apiURL + '/api/Suppliers/SupplierOnboardList/V7?' + entity + '&status=' + status+ '&KeyWord='+ k + '&skip='+ s +'&take='+ t );

}

ArAction(Data:ApproverSupplier):Observable<any[]> {
  return this.http.post<any[]>(this.apiURL + '/api/Suppliers/ActionOnSupplier/V7', Data ).pipe(
    catchError(this.handleError)
  );
}

activeDactivate(data:activeDactivate){
  return this.http.post<any>(this.apiURL + '/api/Suppliers/ActiveDecativeSupplier/V7',data );
}

getSupplierhistory(supplierId:number, skcode:string){
  return this.http.get<any>(this.apiURL + '/api/Suppliers/SupplierOnboardHisotry/V7?supplierID='+ supplierId +'&SupplierCode='+ skcode);

}

MakerOperation(Data:MakerCheckerDTO):  Observable<any[]> {
  
  return this.http.post<any[]>(this.apiURL + '/api/inventory/MakerOperation', Data ).pipe(
    catchError(this.handleError)
    );  
}

approveDpot(Data:ApproverDpot){
  return this.http.post<any[]>(this.apiURL + '/api/Suppliers/ActionOnDepoOnboard/V7', Data ).pipe(
    catchError(this.handleError)
    );
}

// dpotHistory(){

// }

ActiveActiondpot(data:activeDactivateDpot){
  return this.http.post<any>(this.apiURL + '/api/Suppliers/ActiveDecativeDepo/V7',data );

}

handleError(error: HttpErrorResponse){
  
  alert('Status of this Supplier is Already Changed'+ '' +error.error.ErrorMessage);
  return throwError(error);
  }
}
