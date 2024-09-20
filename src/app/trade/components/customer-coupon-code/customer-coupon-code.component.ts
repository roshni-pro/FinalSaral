import { Component, OnInit, Input } from '@angular/core';
import { CouponCodeService } from 'app/trade/services/coupon-code.service';
import { CouponCodes } from 'app/trade/interfaces/coupon-code';
import { ConfirmationService, MessageService } from 'primeng/components/common/api';
import * as moment from 'moment';
import { ExportServiceService } from 'app/shared/services/export-service.service';
@Component({
  selector: 'app-customer-coupon-code',
  templateUrl: './customer-coupon-code.component.html',
  styleUrls: ['./customer-coupon-code.component.scss']
})
export class CustomerCouponCodeComponent implements OnInit {

  @Input() customerId: number;
  couponCodesList: CouponCodes[];
  originalCouponCodesList: CouponCodes[];
  selectedCouponCode: CouponCodes;
  isLoading: boolean;
  openPopup: boolean;
  isInvalid: boolean;
  showDeleted: boolean;
  minDate: Date;
  showingListStatus: number; // 0 active , 1 all , 2 deleted 

  constructor(private couponCodeService: CouponCodeService
    , private confirmationService: ConfirmationService,private exportService:ExportServiceService
    , private messageService: MessageService) { }

  ngOnInit() {
    this.minDate = new Date();
    this.showingListStatus = 0;
    this.isInvalid = false;
    this.openPopup = false;
    this.selectedCouponCode = null;
    this.isLoading = true;
    this.showDeleted = true;
    this.couponCodeService.getCustomerCouponList(this.customerId).subscribe(x => {
      this.originalCouponCodesList = x;
      this.updateCouponCodeList();
      this.updateShowingList(0);
      this.isLoading = false;
      console.log('x is: ', x);
    }, error => {
      this.isLoading = false;
    });
  }


  onCouponAmountChange() {
    this.selectedCouponCode.CouponCode = 'Z' + this.customerId + (this.selectedCouponCode.CouponAmount ? this.selectedCouponCode.CouponAmount : '');
  }

  addCoupon() {
    this.selectedCouponCode = {
      AvailableToBuyers: [this.customerId],
      AppliedByBuyers: null,
      CouponAmount: null,
      CouponCode: 'Z' + this.customerId,
      CouponPercent: null,
      ExpiryDate: null,
      IsPercent: false,
      IsPromotion: false,
      MinOrderAmount: null,
      SellerId: null,
      IsEditable: true,
      Id: null
    }
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.openPopup = true;
    }, 1000);
  }

  saveNewCoupon(addCouponForm) {
    this.isInvalid = false;
    if (addCouponForm.valid) {
      if (!this.isCouponAmountValid()) {
        return;
      }
      this.confirmationService.confirm({
        message: 'Are you sure that you want to add new coupon?',
        accept: () => {
          this.isLoading = true;
          this.couponCodeService.addNewCoupon(this.customerId, this.selectedCouponCode).subscribe(result => {
            console.log('result is: ', result);
            if (result.IsSuccess) {
              this.messageService.add({ severity: 'success', summary: 'Added successfully!', detail: '' });
              this.isLoading = false;
              this.ngOnInit();
            } else {
              this.messageService.add({ severity: 'error', summary: result.ErrorMessage, detail: '' });
              this.isLoading = false;
            }

          }, error => {
            this.isLoading = false;
          });
        }
      });


    } else {
      this.isInvalid = true;
    }
    console.log(addCouponForm);
  }

  delete(code: CouponCodes) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to inactive coupon?',
      accept: () => {
        this.isLoading = true;
        this.couponCodeService.inActiveCoupon(code.Id).subscribe(result => {
          if (result.IsSuccess) {
            this.messageService.add({ severity: 'success', summary: 'Deleted successfully!', detail: '' });

            this.ngOnInit();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Something went wrong!', detail: '' });
          }
          this.isLoading = false;
        });

      }
    });


  }


  cancel() {
    this.isInvalid = false;
    this.openPopup = false;
    this.selectedCouponCode = null;
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.openPopup = false;
    }, 300);
  }


  updateShowingList(count: number) {

    if (count) {
      this.showingListStatus = (this.showingListStatus + 1) % 3;
    }


    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 400);

    //show active only
    if (this.showingListStatus == 0) {
      this.couponCodesList = this.originalCouponCodesList.filter(x => {


        let expiryTime = null;
        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        if (x.ExpiryDate != null) {
          expiryTime = moment(new Date(x.ExpiryDate)).format('YYYY-MM-DD');
        }
        return x.IsActive && (expiryTime == null || expiryTime >= todayDate ) &&  x.Status != 'Used';
      });
    }
    //all  
    else if (this.showingListStatus == 1) {
      this.couponCodesList = this.originalCouponCodesList;
    }
    // deactive only
    else {
      this.couponCodesList = this.originalCouponCodesList.filter(x => {
        let expiryTime = null;
        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        if (x.ExpiryDate != null) {
          expiryTime = moment(new Date(x.ExpiryDate)).format('YYYY-MM-DD');
        }

        return !x.IsActive || (expiryTime != null && expiryTime < todayDate) ||  x.Status == 'Used';
      });
    }
  }

  private updateCouponCodeList() {
    if (this.originalCouponCodesList && this.originalCouponCodesList.length > 0) {
      this.originalCouponCodesList.forEach(item => {

        if (!item.AvailableToBuyers || item.AvailableToBuyers.length < 1 || !item.IsActive) {
          item.IsEditable = false;
        } else {
          item.IsEditable = true;
        }

        let expiryTime = null;
        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        if (item.ExpiryDate != null) {
          expiryTime = moment(new Date(item.ExpiryDate)).format('YYYY-MM-DD');
        }

        let status = '';

        if (item.AppliedByBuyers != null && item.AppliedByBuyers.indexOf(this.customerId) > -1) {
          status = 'Used';
          item.IsEditable = false;
        } else {
          if (expiryTime != null && expiryTime != null && expiryTime < todayDate) {
            status = 'Expired'
          }
         
        }

        if (!item.IsActive && status) {
          status = status + ' and Deactive'
        } else if (!item.IsActive && !status) {
          status = 'Deactive';
        }
        item.Status = status;

       
      });
    }
  }

  private isCouponAmountValid() {
    if (this.selectedCouponCode.CouponAmount >= this.selectedCouponCode.MinOrderAmount) {
      this.messageService.add({ severity: 'error', summary: 'Coupon amount must be less than Min order amount', detail: '' });
      return false;
    } else if (this.selectedCouponCode.CouponAmount < 1) {
      this.messageService.add({ severity: 'error', summary: 'Coupon amount colud not be less than one', detail: '' });
      return false;
    }
    else {
      return true;
    }
  }

  exportCouponlist()
  {
    this.exportService.exportAsExcelFile(this.originalCouponCodesList, 'Couponlist');
  }

}
