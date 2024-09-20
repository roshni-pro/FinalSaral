import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpillOverOrderService {
  apiURL: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }

  getSpillOverOrdersList(SpillOverOrderFilter): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/SpillOverOrders/GetSpillOverOrdersList', SpillOverOrderFilter);
  }



  exportSpillOver(spillOverOrderFilter): Observable<any> {
    return this.http.post<any>(this.apiURL +'/api/SpillOverOrders/ExportSpillOver',spillOverOrderFilter );
  }
}
