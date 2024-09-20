import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';
import { threadId } from 'worker_threads';


@Injectable({
  providedIn: 'root'
})
export class LedgerCorrectionService {

  apiURL:any
  constructor(private http: HttpClient) { 
    this.apiURL = environment.apiURL;

  }

  LedgerCorrectionSaveService(obj:any)
  {
    return this.http.post(this.apiURL+'api/LedgerCorrection/AddLegerEntry',obj)
  }
  GetledgerData()
  {
    return this.http.get(this.apiURL+'api/LedgerCorrection/GetLegerEntry')
  }
  DeleteLedgerData(Id)
  {
    return this.http.delete(this.apiURL+'api/LedgerCorrection/RemoveLedgerItem?id='+Id)
  }
  GetProcessData()
  {
      return this.http.get(this.apiURL+'api/LedgerCorrection/ProcesJob')
  }
  GetHistroyledgerData()
  {
    return this.http.get(this.apiURL+'api/LedgerCorrection/GetHistroyLegerEntry')
  }
  getLedgerIsssueTypeList()
  {
    return this.http.get(this.apiURL+'api/LedgerCorrection/GetLedgerIsssueTypeList');
  }
}
