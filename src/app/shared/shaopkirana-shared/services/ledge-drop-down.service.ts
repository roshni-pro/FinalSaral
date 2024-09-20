import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Ladger } from 'app/shared/interface/ladger';

@Injectable({
  providedIn: 'root'
})
export class LedgeDropDownService {




  private apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  GetLedger(ledgerTypeID: number): Observable<Ladger[]> {
    return this.http.get<Ladger[]>(this.apiURL + '/api/LadgerUI/GetByLedgerType/ledgerTypeId/' + ledgerTypeID);
  }
}
