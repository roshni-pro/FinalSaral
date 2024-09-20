import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private connection: any;
  private proxy: any;
  constructor() { }
  public initializeSignalRConnection(customerId : number): void {
    let signalRServerEndPoint =  environment.apiURL + '/signalr';
    this.connection = $.hubConnection(signalRServerEndPoint);
    this.proxy = this.connection.createHubProxy('chatHub');

    this.proxy.ConnectUser('broadcastMessage', (serverMessage) => this.onMessageReceived(serverMessage));
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
    console.log('received: ',serverMessage);
  }
}
