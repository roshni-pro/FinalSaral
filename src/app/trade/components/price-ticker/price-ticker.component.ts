import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { environment } from 'environments/environment';
import { TradeOrdersService } from 'app/shared/services/trade-orders.service';

declare var $: any;

@Component({
  selector: 'app-price-ticker',
  templateUrl: './price-ticker.component.html',
  styleUrls: ['./price-ticker.component.scss']
})
export class PriceTickerComponent implements OnInit {

  connection: any;
  proxy: any;
  connectionData: any;
  itemList: any[];

  constructor(private ref: ChangeDetectorRef, private tradeOrdersService: TradeOrdersService) { }

  ngOnInit() {
    this.tradeOrdersService.topTradeItems(20).subscribe(result => {
      console.log('result is: ', result);
      this.itemList = result;
      this.updateItemList();

    });

    this.initializeSignalRConnection();
  }

  private updateItemList(){
    if(this.itemList && this.itemList.length > 0){
      this.itemList.forEach(x => {
         x.UpOrDown =x.BidUpOrDown;
      })
    }
  }

  public initializeSignalRConnection(): void {

    let signalRServerEndPoint = environment.tradeapiURL + '/';
    this.connection = $.hubConnection(signalRServerEndPoint);
    this.proxy = this.connection.createHubProxy('priceticker');

    this.proxy.on('itemFeed', (serverMessage) => this.onMessageReceived(serverMessage));

    // this.ref.detectChanges();
    this.connection.start().done((data: any) => {
      console.log('data is : ', data);
      this.connectionData = data;

      let subscriptions = {
        "connectionId": this.connectionData.id,
        "itemIds": []
      }
      let list = [];
      if (this.itemList && this.itemList.length > 0) {
        list = this.itemList.map(x => x.ItemId);
        subscriptions.itemIds = list;
      }
      console.log('JSON.stringify(subscriptions): ', JSON.stringify(subscriptions));
      this.proxy.invoke('subscribeFeed', JSON.stringify(subscriptions)).done(d => {
        console.log('connected', d);

        this.ref.detectChanges();

      }).catch((error: any) => {
        console.log('broadcastMessage error -> ' + error);
      });

      // this.broadcastMessage();
    }).catch((error: any) => {

      console.log('Notification Hub error -> ' + error);
    });
  }

  onMessageReceived(serverMessage) {
    console.log('serverMessage: ', serverMessage);
    if (this.itemList && this.itemList.length > 0) {
      let item = this.itemList.filter(x => {
        return x.ItemId == serverMessage.ItemId
      });

      if (item && item.length > 0) {
        item[0].Price = serverMessage.LastTradePrice;
        item[0].UpOrDown = serverMessage.TradeUpOrDown;
      }
    }
    this.ref.detectChanges();

  }

}

