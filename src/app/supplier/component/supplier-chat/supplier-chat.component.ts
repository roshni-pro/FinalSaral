import { Component, Input, ViewChild, ElementRef, OnInit, ChangeDetectionStrategy, Renderer2, OnChanges, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { SupplierService } from 'app/shared/services/supplier.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-supplier-chat',
  templateUrl: 'supplier-chat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['supplier-chat.component.scss'],
})
export class SupplierChatComponent implements OnChanges, AfterViewInit {

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

  constructor(private elRef: ElementRef, private renderer: Renderer2, private supplierService: SupplierService) {
    this.chatObject = {};

  }

  ngOnInit() {
    
    console.log("Chat threads:" + this.ChatThread);

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
    this.getchat(this.PurchaseId);
  }




  sendMessage(c) {
    console.log(this.chat_message);
    console.log(this.id);

    this.chatObject = {
      SupplierId: this.id,
      Chat: c,
      PurchaseId: this.PurchaseId,
    }
    console.log(this.chatObject)
    this.supplierService.sendMessage(this.chatObject)
      .subscribe(result => {
        this.getchat(this.PurchaseId);
        this.chat_message = null;
        this.scrollToBottom();

      })
  }



}
