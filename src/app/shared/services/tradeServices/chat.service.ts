
import { Survey } from 'app/shared/interface/servey/survey.GetSurvey';
import { SaveAnswerDc } from 'app/shared/interface/servey/save-answer-dc';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetchatforA7, ReadMessageResponse, CustomerMessages, ChatContactFilters } from 'app/shared/interface/trade/trade-chat';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  apiURL: string;
  User: any;
  comment: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.tradeapiURL;
  }


  GetTopMsgCX(chatContactFilters : ChatContactFilters): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/ClientChat/GetTopMsgCX', chatContactFilters);
  }

  GetChatWithCxA7(getchatforA7: GetchatforA7): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/ClientChat/GetChatWithCxA7', getchatforA7);
  }


  ReadChatMessageAsync(readMessageResponse: ReadMessageResponse): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/ClientChat/ReadChatMessageAsync', readMessageResponse);
  }

  SendChatA7(customerMessages: CustomerMessages): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/ClientChat/SendChatA7', customerMessages);
  }



}
