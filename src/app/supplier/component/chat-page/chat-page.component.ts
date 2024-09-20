import { Component, Input, ViewChild, ElementRef, OnInit, ChangeDetectionStrategy, Renderer2, OnChanges, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { SupplierService } from 'app/shared/services/supplier.service';
import { identifierModuleUrl } from '@angular/compiler';
import * as moment from 'moment';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  activeChatUser: string;
  activeChatUserImg: string;
  @Input() ChatThread: any[];
  @Input() id: any;
  @Output() refreshSupplierChat = new EventEmitter()
  @ViewChild('scrollMe', { static: false }) private myScrollContainer: ElementRef;

  supplierChat: any[];
  PurchaseId: number;
  chatObject: any;
  chat_message: string;
  StartDate : any;
  EndDate : any;

  constructor(private elRef: ElementRef, private renderer: Renderer2, private supplierService: SupplierService) {
    this.chatObject = {};

  }

  ngOnInit() {
    console.log("Chat threads:" + this.ChatThread);
    this.PurchaseId = 0;
    this.StartDate = new Date();
    this.StartDate = new Date(this.StartDate.setHours(0, 0, 0, 0));
    this.EndDate = new Date();
    // this.chatObject = {
    //   SupplierId: this.id,
    //   Chat: '',
    //   PurchaseId: 0,
    // }
    
    // this.getchat(this.PurchaseId);
    this.getchatmsg(this.id,this.StartDate);
    var StartDate = this.StartDate ? moment(this.StartDate).format('YYYY-MM-DD') : null
    var EndDate = this.EndDate ? moment(this.EndDate).format('YYYY-MM-DD') : null
    // this.supplierService.SearchPayment(StartDate,EndDate,this.id).subscribe(result => {
    // this.supplierService.GetChatForSupplierDateWise(this.id,StartDate).subscribe(result => {
    //   // this.supplierService.GetSupplierChatCurrentDateWise(this.id).subscribe(result => {
    //  // this.supplierChat = result;
    //  console.log('ChatPage:',result );
    // })
  }

  // toggle = true;
  // status = 'Enable';
  getchat(index) {

    // this.toggle = !this.toggle;
    // this.status = this.toggle ? 'Enable' : 'Disable';

    this.PurchaseId = index;
    this.supplierService.GetSupplierChat(this.id, this.PurchaseId).subscribe(result => {
      this.supplierChat = result['ChatSupplier'];
      this.refreshSupplierChat.emit();
      this.scrollToBottom();
    })
  }

  ngOnChanges() {
    this.scrollToBottom();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  refreshChat() {
    this.PurchaseId = 0;
    this.getchat(this.PurchaseId);
  }




  sendMessage(c) {
    
    console.log(this.chat_message);
    console.log(this.id);

    this.chatObject = {
      SupplierId: this.id,
      Chat: c,
      PurchaseId: 0,
    }
    console.log(this.chatObject)
    this.supplierService.sendMessage(this.chatObject)
      .subscribe(result => {
        
        this.getchatmsg(this.id,this.StartDate);
        // this.getchat(this.PurchaseId);
        this.chat_message = null;
        this.scrollToBottom();

      })
  }

  getchatmsg(id,StartDate) {
    this.StartDate = new Date();
    this.StartDate = new Date(this.StartDate.setHours(0, 0, 0, 0));
    this.EndDate = new Date();
    // this.chatObject = {
    //   SupplierId: this.id,
    //   Chat: '',
    //   PurchaseId: 0,
    // }
    
    // this.getchat(this.PurchaseId);
    var StartDates = this.StartDate ? moment(this.StartDate).format('YYYY-MM-DD') : null
    // var EndDate = this.EndDate ? moment(this.EndDate).format('YYYY-MM-DD') : null
    // this.supplierService.SearchPayment(StartDate,EndDate,this.id).subscribe(result => {
    this.supplierService.GetChatForSupplierDateWise(this.id,StartDates).subscribe(result => {
      // this.supplierService.GetSupplierChatCurrentDateWise(this.id).subscribe(result => {
      this.supplierChat = result['ChatSupplier'];
     console.log('ChatPage:',result );
    })
  }


}
