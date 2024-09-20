import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TradeOrdersService } from 'app/shared/services/trade-orders.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { window } from 'rxjs/operators';

@Component({
  selector: 'app-consumer-itemdetails',
  templateUrl: './consumer-itemdetails.component.html',
  styleUrls: ['./consumer-itemdetails.component.scss']
})
export class ConsumerItemdetailsComponent implements OnInit {
  displayTabs: any[];
  @Input() details: any;
  @Output() closev1: EventEmitter<any> = new EventEmitter();

  @Output() isdetailsclose = new EventEmitter<boolean>();
  @Output() refreshParent = new EventEmitter();
  ShoppingCartItems: any;
  peopleId: any;
  blocked: boolean;
  constructor(private consumerOrderService: TradeOrdersService,
    private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.peopleId = localStorage.getItem('userid');
    console.log('details:', this.details);
    this.ShoppingCartItems = this.details.ShoppingCartItems;
  }

  ngOnChanges() {
    this.displayTabs = [{ field: 'overview', bool: true },
      // { field: 'edit-form', bool: false },
      // { field: 'history', bool: false },
    ];
    $('.nav .nav-item .nav-link').removeClass('active');
    $('#overview-btn').addClass('active');
  }

  CutlineItem(cart) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Cut this Item?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.blocked = true; 
        this.consumerOrderService.CutLineItem(cart.OrderId, this.details.CartId, this.peopleId).subscribe(x => {
          this.blocked = false;
          cart.OrderStatus = 'Cancelled';
          this.messageService.add({ severity: 'success', summary: 'Cut line item Successfully !!', detail: '' });
          // this.router.navigateByUrl("layout/trade/consumer-order"); 
          // setTimeout(() => {
          //   this.onCloseDialog();
          // }, 2000);
        });
      }
    })

  }

  onCloseDialog() {
    this.closev1.emit(false);
  }



  closeDetails(isDetails: boolean) {

    this.isdetailsclose.emit(isDetails);
  }

  RefreshParent() {
    //this.refreshParent.emit();
  }

}
