import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Ladger } from 'app/shared/interface/ladger';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LedgerAutoCompleteService {

  private apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getByName(name: string, ledgerTypeID: number): Observable<Ladger[]> {
    return this.http.get<Ladger[]>(this.apiURL + '/api/LadgerUI/GetByName/name/' + name + '/ledgerTypeId/' + ledgerTypeID);
  }
}
