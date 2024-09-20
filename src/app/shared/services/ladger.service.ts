import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Ladger } from '../interface/ladger';
import { PagerDataV7 } from '../interface/pager-data-v7';

@Injectable({
  providedIn: 'root'
})
export class LadgerService {
  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  // // // save(ladger: Ladger ):  Observable<Ladger> {
  // // //   return this.http.post<Ladger>(this.apiURL + '/api/LadgerUI/Save', ladger);
  // // // }
  // GetByID(id: number): Observable<any> {
  //   return this.http.get<any>(this.apiURL + '/api/LadgerUI/GetByID/' + id);
  // }

  get(id: number ):  Observable<Ladger> {
    return this.http.get<Ladger>(this.apiURL + '/api/LadgerUI/GetById?id=' + id);
  }


  addLadger(countryservice):  Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/LadgerUI/Save',countryservice);
    }
  

  getList(pager:PagerDataV7):  Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/LadgerUI/GetList', pager);
  }


  delete(ladgerID: number):  Observable<Ladger> {
    return this.http.delete<Ladger>(this.apiURL + '/api/LadgerUI/Delete/' + ladgerID);
  }

  UpdateLadger(details):  Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/LadgerUI/UpdateByID', details);
  }

  getByName(name: string, ledgerTypeID: number): Observable<Ladger[]>{
    return this.http.get<Ladger[]>(this.apiURL + '/api/LadgerUI/GetByName/name/' + name +'/ledgerTypeId/' + ledgerTypeID);
  }
  // api/LadgerUI/GetOpenPO?LadgerID=38456
  GetOpenPO(id:any)
  {
    return this.http.get<any>(this.apiURL+'api/LadgerUI/GetOpenPO?LadgerID='+id);
  }
  ExportLadger(data): Observable<any[]> {
    console.log(this.apiURL + '/api/LadgerEntryV7/GetDataForExport/'+ data.FromDate + '/' + data.ToDate + '/'+ data.type)
    return this.http.get<any[]>(this.apiURL + '/api/LadgerUI/GetLadgerExport/'+ data.FromDate + '/' + data.ToDate);
  }
  

  customerConsolidatedLedger(fromDate: string, toDate: string): Observable<string> {
    return this.http.get<string>(this.apiURL + '/api/LadgerUI/CustomerConsolidatedLedger/'+ fromDate + '/' + toDate);
  }

  supplierConsolidatedLedger(fromDate: string, toDate: string): Observable<string> {
    return this.http.get<string>(this.apiURL + '/api/LadgerUI/SupplierConsolidatedLedger/'+ fromDate + '/' + toDate);
  }

  getBankTypeLedger(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/LadgerUI/GetBankTypeLedger');
  }
  getLadgerToCorrect(order_id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/ManualLedger/GetLedger?orderid='+ order_id);
  }

  updateLedger(obj: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/ManualLedger/UpdateLedger', obj);
  }

  
  GetBankList( ):  Observable<Ladger> {
    return this.http.get<Ladger>(this.apiURL + '/api/LadgerUI/Get');
  }

  GetBankName( ):  Observable<Ladger> {
    return this.http.get<Ladger>(this.apiURL + '/api/MobileDelivery/GetBankName');
  }

  AddBankDetail(name: string): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/LadgerUI/Save?BankName='+ name);
  }
  
  GetBankMatch(name: string):  Observable<Ladger> {
    return this.http.get<Ladger>(this.apiURL + '/api/LadgerUI/GetMatch?Name='+ name);
  }
  GetDepoList(SupplierId:any): Observable<any[]>{
    return this.http.get<any[]>(this.apiURL + '/api/LadgerUI/GetDepoLIst/{id}?='+ SupplierId);

  }

  SupplierConsolidatedLedger(){
    return this.http.get<any[]>(this.apiURL + '/api/LadgerUI/SupplierConsolidatedLedgerV1');
  }
  GetPOIDId(Id:any){
    
    return this.http.get<any>(this.apiURL + '/api/LadgerUI/GetPOId?LedgerId='+ Id);
    
  }

}
