import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  generate(code: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Voucher/Generate/' + code);
  }


}
