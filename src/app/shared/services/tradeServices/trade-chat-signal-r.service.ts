import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Survey } from 'app/shared/interface/servey/survey.GetSurvey';
import { SaveAnswerDc } from 'app/shared/interface/servey/save-answer-dc';
import { Observable } from 'rxjs';
import { GetchatforA7, ReadMessageResponse, CustomerMessages } from 'app/shared/interface/trade/trade-chat';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class TradeChatSignalRService {
  private connection: any;
  private proxy: any;
  apiURL: string;
  User: any;
  comment: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.tradeapiURL;
  }

  public initializeSignalRConnection(): void {
    
    let signalRServerEndPoint = this.apiURL + '/signalr';
    this.connection = $.hubConnection(signalRServerEndPoint);
    this.proxy = this.connection.createHubProxy('chatHub');

    this.proxy.on('broadcastMessage', (serverMessage) => this.onMessageReceived(serverMessage));
    this.connection.start().done((data: any) => {
      console.log('Connected to Notification Hub');
      this.broadcastMessage();
    }).catch((error: any) => {
      console.log('Notification Hub error -> ' + error);
    });
  }
  private broadcastMessage(): void {
    this.proxy.invoke('send', 'text message', 'klkfksfskslk')
      .catch((error: any) => {
        console.log('broadcastMessage error -> ' + error);
      });
  }
  private onMessageReceived(serverMessage: string) {
    console.log('received: ', serverMessage);
  }
}
