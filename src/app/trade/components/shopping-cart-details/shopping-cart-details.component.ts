import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { TradeCustomerService } from 'app/shared/services/trade-customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-shopping-cart-details',
  templateUrl: './shopping-cart-details.component.html',
  styleUrls: ['./shopping-cart-details.component.scss']
})
export class ShoppingCartDetailsComponent implements OnInit {
  @Input() CustomersCart: any;
  @Output() isdetailsclose = new EventEmitter<boolean>();
  customerId:any;
  customerCart:any;
  isNodata:boolean;
  ShoppingCartItems:any[];

  constructor(private customerservice: TradeCustomerService,
    private router: Router,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute) { this.customerCart = {}; }

  ngOnInit() {
    this.isNodata=false;
    this.activateRoute.paramMap.subscribe(params => {
      this.customerId = Number(params.get('customerId'));
      this.customerservice.GetCartDetailsById(this.customerId).subscribe(result => {  
        if(result.length > 0)
        {
          this.isNodata=false;
          this.customerCart = result[0];
        }
        else
        {
          this.isNodata=true;
        }
      })

    });
  }

  onCancel() {
    this.router.navigateByUrl("layout/trade/customer-shopping-cart");
  }

  onTabChange(event) {
    if (event.index == 1) {
      this.GetShoppingCartItemList();
    } 
  }
  private GetShoppingCartItemList() {
    this.ShoppingCartItems=this.customerCart.ShoppingCartItems
  }
}
