import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from 'app/shared/services/customer.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TradeCustomerService } from 'app/shared/services/trade-customer.service';
import { customerWalletDc } from 'app/shared/interface/trade/customerWalletDc';

@Component({
  selector: 'app-customertrade-edit',
  templateUrl: './customertrade-edit.component.html',
  styleUrls: ['./customertrade-edit.component.scss']
})
export class CustomerTradeEditComponent implements OnInit {
  @Input() Customerdetails: any;
  customerId: number;
  CustomerList: any;
  customer: any;
  isInvalid: boolean;
  sellRequestList: any[];
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  invalidDates: Array<Date>
  CustomerId: any;
  customerRating: any[];
  zoneList: any;
  Role:any;
  isSellerRole:boolean;
  showCoupon: boolean;
  constructor(private customerservice: TradeCustomerService,
    private router: Router,
    private messageService: MessageService,
    private activatedroute: ActivatedRoute) { this.customer = {}; }

  ngOnInit() {
    this.showCoupon = false;
    this.isSellerRole=false;
    this.Role = localStorage.getItem('role');
    this.isSellerRole=this.Role.includes('HQ Master login')||this.Role.includes('Customer support senior executive');
    this.activatedroute.paramMap.subscribe(params => {
      this.customerId = Number(params.get('customerId'));
      this.customerservice.GetById(this.customerId).subscribe(result => {
        this.customer = result;
        this.customer.CreatedDate = new Date(this.customer.CreatedDate);
      })

    });

    this.isInvalid = false;


    this.customerservice.getBuyerZoneList(this.customerId).subscribe(x => {
      this.zoneList = x;
      console.log('ZoneList :', this.zoneList);
    });

  }

  onCancel() {
    this.router.navigateByUrl("layout/trade/customer-list");
  }

  update(CustomerEditForm: any) {
    console.log('CustomerEditForm', CustomerEditForm);
    if (CustomerEditForm.form.status == "VALID") {
      console.log('this.customer: ', this.customer);
      this.customerservice.PostCustomer(this.customer).subscribe(result => {
        this.messageService.add({ severity: 'success', summary: 'Save Successfully!', detail: '' });
        this.router.navigateByUrl("layout/trade/customer-list");
        // this.router.navigateByUrl('full-layout/customer/') ;
        // this.refreshParent.emit();

      },

        (err) => {
          this.messageService.add({ severity: 'success', summary: 'error!', detail: '' });
        });
    }
    else {
      this.isInvalid = true;
    }
  }

  onTabChange(event) {
    this.showCoupon = false;
    if (event.index == 1) {
      this.GetCustomerSellRequest();
    } else if (event.index == 2) {
      this.GetCustomerRatings();
    } else if (event.index == 3) {
      this.showCoupon = true;
    }
  }

  private GetCustomerSellRequest() {
    this.customerservice.GetCustomerSellRequest(this.customer.CustomerId).subscribe(x => {
      this.sellRequestList = x;
    })
  }

  private GetCustomerRatings() {
    this.customerservice.GetCustomerRatings(this.customer.CustomerId).subscribe(x => {
      this.customerRating = x;
    })
  }


}
