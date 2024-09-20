import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { TradeCustomerService } from 'app/shared/services/trade-customer.service';
import { TradeitemmasterService } from 'app/shared/services/tradeitemmaster.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Chat } from 'app/supplier/component/supplier-chat/chat.model';
import { ChatService } from 'app/shared/services/tradeServices/chat.service';
import { CustomerContactsListA7, GetchatforA7, ChatMessageBodyA7, ReadMessageResponse, CustomerMessages, ChatContactFilters } from 'app/shared/interface/trade/trade-chat';
import { SignalRService } from '../../../shared/services/signal-r.service';
import { TradeChatSignalRService } from 'app/shared/services/tradeServices/trade-chat-signal-r.service';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';




@Component({
  selector: 'app-customer-support-chat',
  templateUrl: './customer-support-chat.component.html',
  styleUrls: ['./customer-support-chat.component.scss']
})
export class CustomerSupportChatComponent implements OnInit {

  cxList: any;
  customerContactsListA7: CustomerContactsListA7;
  customerContactTotalCount: number;
  getchatforA7: GetchatforA7;
  ChatMessageBodyA7: ChatMessageBodyA7[];
  readMessageResponse: ReadMessageResponse;
  messageReadList: any[];
  blocked: boolean;
  customerMessages: CustomerMessages;
  chat_message: string;
  showchatbox: boolean;
  chatContactFilters: ChatContactFilters;
  SearchKeyWord: string;
  selectedChat: boolean;


  constructor
    (private tradeitemmasterService: TradeitemmasterService,
      private TradeCustomerService: TradeCustomerService,
      private router: Router,
      private ItemServices: TradeitemmasterService,
      private chatService: ChatService,
      private tradeChatSignalRService: TradeChatSignalRService

    ) {




  }

  ngOnInit() {
    this.showchatbox = false;
    this.blocked = true;
    this.getchatforA7 = {
      receiverId: null,
      senderId: null,
    }

    this.customerMessages = {
      IsReaded: false,    //always false when we send 
      Message: null,   // message what we send 
      SenderCustomerId: null,  // our customer ID  
      SenderName: null,   // our customer name
      ReceiverCustomerId: null,   // receiver customer ID
      ReceiverName: null,  //receiver name
      ReadTime: null,   // can be null
      ReceivedTime: null,   // can be null
      SendTime: null,   // can be null
    }

    this.readMessageResponse = {
      ObjectIdList: '',
    }

    this.chatContactFilters =
    {
      Skip: 0,
      Take: 25,
      SearchKeyWords: null,
    }
    this.blocked = true;


  }

  private getContacts(chatContactFilters: ChatContactFilters) {
    
    this.chatService.GetTopMsgCX(chatContactFilters).subscribe(result => {
      this.customerContactsListA7 = result.customerContactsListA7;
      this.customerContactTotalCount = result.TotalCount;

      console.log(this.customerContactsListA7);
      this.blocked = false;
    })

  }


  loadContactsLazy(event) {
    this.blocked = true;
    this.chatContactFilters.Skip = event.first;
    this.chatContactFilters.Take = event.rows ? event.first + event.rows : 25;
    this.getContacts(this.chatContactFilters);
  }

  //dynamic Search
  dynamicSearch(SearchKeyWords) {
    
    if (SearchKeyWords && SearchKeyWords.length > 2) {

      this.chatContactFilters =
      {
        Skip: 0,
        Take: 25,
        SearchKeyWords: SearchKeyWords,
      }
      this.getContacts(this.chatContactFilters);
    } else if (this.chatContactFilters.SearchKeyWords.length == 0) {
      this.getContacts(this.chatContactFilters);
    }

  }

  GetThisChat(CustomerId, CustomerSupportId, cxdata) {
    cxdata.selectedChat = false;
    this.showchatbox = true;
    this.chat_message = null;
    this.blocked = true;
    this.getchatforA7.receiverId = CustomerId;
    this.getchatforA7.senderId = CustomerSupportId;
    console.log("CustomerId vc", this.getchatforA7.receiverId)
    console.log("CustomerSupportId vc", this.getchatforA7.senderId)
    this.chatService.GetChatWithCxA7(this.getchatforA7).subscribe(result => {
      this.ChatMessageBodyA7 = result;
      console.log("cxdatacxdatacxdatacxdatacxdatacxdatacxdatacxdata", cxdata);
      console.log("this.getchatforA7 vc", this.getchatforA7);
      console.log("this.ChatMessageBodyA7", this.ChatMessageBodyA7);
      
      if (this.getchatforA7.senderId == cxdata.CustomerSupportId) {

        cxdata.selectedChat = true;
      }

      this.ChatMessageBodyA7.forEach(element => {

        element.selectedChat = false;

      });
      var string = "";
      this.ChatMessageBodyA7.forEach(element => {
        if (element.IsReaded == false) {
          string += element.Id + ",";
        }
      });
      console.log("string", string);
      var sendstring = removeLastComma(string);
      function removeLastComma(strng) {
        var n = strng.lastIndexOf(",");
        var a = strng.substring(0, n)
        return a;
      }
      
      console.log("string", sendstring);
      this.readMessageResponse.ObjectIdList = sendstring;
      console.log("string", this.readMessageResponse);
      console.log("string", this.readMessageResponse.ObjectIdList);

      this.ReadChatMessageAsyncFN(this.readMessageResponse);
      this.blocked = false;
      this.showchatbox = true;
    })

  }

  initializeSignalRForSelectedChat() {
    
    this.tradeChatSignalRService.initializeSignalRConnection();
  }

  ReadChatMessageAsyncFN(readMessageResponse) {
    this.blocked = true;

    this.chatService.ReadChatMessageAsync(readMessageResponse).subscribe(result => {
      this.blocked = false;
    })

  }

  sendMessage(chat_message) {
    
    if (chat_message) {
      this.blocked = true;
      console.log("chat_message", chat_message)
      this.customerMessages = {
        IsReaded: false,    //always false when we send 
        Message: chat_message,   // message what we send 
        SenderCustomerId: this.getchatforA7.senderId,  // our customer ID  
        SenderName: null,   // our customer name
        ReceiverCustomerId: this.getchatforA7.receiverId,   // receiver customer ID
        ReceiverName: null,  //receiver name
        ReadTime: null,   // can be null
        ReceivedTime: null,   // can be null
        SendTime: null,   // can be null
      }
      this.chatService.SendChatA7(this.customerMessages).subscribe(result => {
        this.chat_message = null;
        this.blocked = false;
        this.GetThisChataftersend(this.customerMessages.ReceiverCustomerId, this.customerMessages.SenderCustomerId);
      })
    }
  }

  GetThisChataftersend(CustomerId, CustomerSupportId) {
    this.showchatbox = true;
    this.chat_message = null;
    this.blocked = true;
    this.getchatforA7.receiverId = CustomerId;
    this.getchatforA7.senderId = CustomerSupportId;
    console.log("CustomerId vc", this.getchatforA7.receiverId)
    console.log("CustomerSupportId vc", this.getchatforA7.senderId)
    this.chatService.GetChatWithCxA7(this.getchatforA7).subscribe(result => {
      this.ChatMessageBodyA7 = result;
      console.log(this.ChatMessageBodyA7);
      var string = "";
      this.ChatMessageBodyA7.forEach(element => {
        if (element.IsReaded == false) {
          string += element.Id + ",";
        }
      });
      console.log("string", string);
      var sendstring = removeLastComma(string);
      function removeLastComma(strng) {
        var n = strng.lastIndexOf(",");
        var a = strng.substring(0, n)
        return a;
      }
      
      console.log("string", sendstring);
      this.readMessageResponse.ObjectIdList = sendstring;
      console.log("string", this.readMessageResponse);
      console.log("string", this.readMessageResponse.ObjectIdList);
      this.blocked = false;
      this.showchatbox = true;
    })

  }

  refreshChat() {
    window.location.reload();
  }

}
