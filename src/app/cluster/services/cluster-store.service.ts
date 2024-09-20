import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClusterStoreService {
  apiURL:string;

  constructor(private httpClient : HttpClient) { 
    this.apiURL = environment.apiURL;
  }

  getWarehouse(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiURL + 'api/Warehouse');
  }

  getStoreList(){
    return this.httpClient.get<any[]>(this.apiURL + 'api/Store/GetStoreList');
  }
  
  getClusterWiseWarehouse(warehouseid:number){
    return this.httpClient.get<any[]>(this.apiURL + 'api/cluster/GetClusterWiseWareHouse?warehouseid=' +warehouseid);
  }

  getClusterStore(storeid:number, clusterid:number){
    return this.httpClient.get<any[]>(this.apiURL + 'api/ClusterStoreBeatMapping/GetClusterStoreBeatMapping/'+storeid+'/'+clusterid);
  }

  addAndUpdate(details:any){
    return this.httpClient.post<any[]>(this.apiURL + 'api/ClusterStoreBeatMapping/AddAndUpdate', details);
  }

  deleteClusterId(id:number){
    return this.httpClient.delete<any[]>(this.apiURL + 'api/ClusterStoreBeatMapping/Delete/' +id);
  }

  getCustomerByClusterId(clusterid:number){
    return this.httpClient.get<any[]>(this.apiURL + 'api/ClusterStoreBeatMapping/GetCustomersByClusterId/' +clusterid);
  }

}
