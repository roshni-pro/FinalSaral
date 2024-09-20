import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { StoreViewModel } from 'app/store/interfaces/store';

@Injectable({
  providedIn: 'root'
})
export class ExecutiveService {
  apiURL: string;
  // PeopleAll:any;
  User: any;
  comment: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }
  GetLatestBeatReport(data): Observable<any> 
  {
    return this.http.post<any>(this.apiURL + 'api/MobileExecutive/GetLatestBeatReport', data);
  }
  GetOldExecutiveLatestBeatReport(data): Observable<any> 
  {
    return this.http.post<any>(this.apiURL + 'api/MobileExecutive/GetOldExecutiveLatestBeatReport', data);
  }
  GetActiveSaleExecutives(whouseid): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/AsignDay/Activesalesexe?WarehouseId=' + whouseid);
  }

  GetAllExecutives(executiveid:number): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + 'api/MobileExecutive/GetOldExecutiveById?Executiveid='+executiveid);
  }

  GetActiveSaleExecutivesByClusterId(clusterID): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/cluster/getActiveExecutivesByClusterID?clusterID=' + clusterID);
  }

  updateExecutivesForCustomers(customerUpdatedList, agentCode, currentExecutive): Observable<any> {
    
    let ExecutiveAssignmentDC = {
      ExecutiveId: currentExecutive.PeopleID,
      AgentCode: agentCode,
      customerList: customerUpdatedList,
      ExecutiveName: currentExecutive.DisplayName,
      ClusterId: currentExecutive.ClusterId,
      ClusterName: currentExecutive.ClusterName,
    }

    return this.http.put<any>(this.apiURL + '/api/CustSupplier/AssignMultiple', ExecutiveAssignmentDC);
  }

  UploadCfrArticle(customerUpdatedList): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/UploadCfrArticle', customerUpdatedList);
  }

  getCfrData(cityid,Subcategoryid){
    return this.http.get<any[]>(this.apiURL + '/api/UploadCfrArticle/GetCfrArticleData?cityid=' + cityid+'&Subcategoryid='+Subcategoryid);
  }
  GetCfrAddItemList(cityid){
    return this.http.get<any[]>(this.apiURL + '/api/UploadCfrArticle/GetCfrAddItemList?cityid=' + cityid);
  }

  removeCfrData(Id){
    return this.http.get<any[]>(this.apiURL + '/api/UploadCfrArticle/RemoveCfrArticleData?Id=' + Id);
    
  }

  addCfrArticle(body){
    return this.http.post<any>(this.apiURL + '/api/UploadCfrArticle/AddCfrArticleData', body);
  }



  getLiveCfr(Cityid,subcat): Observable<any[]> 
  {
    return this.http.get<any[]>(this.apiURL + '/api/Report/LiveCfr?CityId=' + Cityid + '&Subcat=' + subcat);
  }

  GetAllStore(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Store/GetAllStore');
  }

  setSalesExecutiveToCluster(executiveData) {
    return this.http.get<any[]>(this.apiURL + '/api/cluster/setSalesExecutiveToCluster?executiveId=' + executiveData.PeopleID + '&clusterid=' + executiveData.clusterId + '&updateAllCustomersExecutives=' + executiveData.updateAllCustomersExecutives);
  }

  StoresOfMappedExecutive(PeopleID): Observable<StoreViewModel[]> {
   
    return this.http.get<StoreViewModel[]>(this.apiURL + '/api/MobileExecutive/StoresOfMappedExecutive/'+PeopleID);
  }
  getCityList(): Observable<any> {
    return this.http.get(this.apiURL+"/api/BuyerForecast/GetCities");
  }
  GetAllSubCategory():  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/SubCategory/getallsubcategory');
  }
  ResetEditBeat(data:any): Observable<any>
  {
    return this.http.post<any[]>(this.apiURL + '/api/MobileExecutive/ResetEditedBeat',data);
  }
  // api/ClusterStoreExecutive/GetExecutiveWiseChannelList?ExecutiveId=0
  GetExecutiveWiseChannelList(Executiveid):  Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/MobileExecutive/GetExecutiveWiseChannelList?ExecutiveId='+Executiveid);
  }


}

