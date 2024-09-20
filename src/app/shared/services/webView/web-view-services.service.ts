
import { Survey } from 'app/shared/interface/servey/survey.GetSurvey';
import { SaveAnswerDc } from 'app/shared/interface/servey/save-answer-dc';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class WebViewServicesService {


  apiURL: string;
  User: any;
  comment: string;
  apiUrl: string;
  httpClient: any;
  tradeapiURL: any;


  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
    this.tradeapiURL = environment.tradeapiURL;


  }


  GetSurvey(Survey: Survey): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "True"
      })
    };
    return this.http.post<any>(this.apiURL + '/api/SurveyModuleAndroid/GetSurvey', Survey , httpOptions);
  }


  SaveAnswer(saveAnswerDc: SaveAnswerDc): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "True"
      })
    };
    return this.http.post<any>(this.apiURL + '/api/SurveyModuleAndroid/SaveAnswer', saveAnswerDc, httpOptions);
  }









}



