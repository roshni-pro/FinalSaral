import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ArthmateServiceService {

  apiURL: string;
  constructor(private http: HttpClient) { this.apiURL = environment.apiURL; }
  
  // UploadStamps(formData)
  // {
  //   return this.http.post<any>(this.apiURL + 'api/ArthMate/UploadStamps',formData);
  // }

  AddStampPaperData (formData)
  {
    debugger
    return this.http.post<any>(this.apiURL + 'api/ArthMate/AddStampPaperData',formData);
  }
  getArthmateStampData(isStampUsed)
  {
    return this.http.get<any>(this.apiURL+'api/ArthMate/getArthmateStampData?isStampUsed='+isStampUsed)
  }
  getArthmateSlaLbaStampAutoFilled()
  {
    return this.http.get<any>(this.apiURL+'api/ArthMate/getArthmateSlaLbaStampAutoFilled')
  }
  EditRowData(formData)
  {
    return this.http.post<any>(this.apiURL+'api/ArthMate/StampPaperModification',formData)
  }
}
