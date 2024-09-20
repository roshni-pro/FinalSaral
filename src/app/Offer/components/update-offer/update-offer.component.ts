import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OfferService } from 'app/offer/Service/offer.service';

@Component({
  selector: 'app-update-offer',
  templateUrl: './update-offer.component.html',
  styleUrls: ['./update-offer.component.scss']
})
export class UpdateOfferComponent implements OnInit {
  @Input() getRowData: any;
  @Input() tabSelectVale: any;

  @Output() closePopup = new EventEmitter();
  activeStatus;
  constructor(
    public offerservice: OfferService,
  ) { }

  ngOnInit() {
    console.log(this.getRowData, 'getRowData');
  }

  getStatusValue(e) {
    console.log(e, 'eeeeeeeeee');

  }

  onClickCustomer(e) {
    this.activeStatus = e;
  }


  onCancel() {
    this.closePopup.emit()
  }

  updateOffer() {
    const payload = {
      CreatedDate: this.getRowData.CreatedDate,
      Description: this.getRowData.Description,
      DiscountPercentage: this.getRowData.DiscountPercentage,
      FreeItemId: this.getRowData.FreeItemId,
      FreeItemMRP: this.getRowData.FreeItemMRP,
      FreeItemName: this.getRowData.FreeItemName,
      FreeOfferType: this.getRowData.FreeOfferType,
      FreeWalletPoint: this.getRowData.FreeWalletPoint,
      InactivePreviousOffer: this.getRowData.InactivePreviousOffer,
      IsActive: this.activeStatus,
      IsDeleted: this.getRowData.IsDeleted,
      MaxQtyPersonCanTake: this.getRowData.MaxQtyPersonCanTake,
      MinOrderQuantity: this.getRowData.MinOrderQuantity,
      NoOffreeQuantity: this.getRowData.NoOffreeQuantity,
      OfferAppType: this.getRowData.OfferAppType,
      OfferCategory: this.getRowData.OfferCategory,
      OfferCode: this.getRowData.OfferCode,
      OfferId: this.getRowData.OfferId,
      OfferName: this.getRowData.OfferName,
      OfferOn: this.getRowData.OfferOn,
      OfferVolume: this.getRowData.OfferVolume,
      OfferWithOtherOffer: this.getRowData.OfferWithOtherOffer,
      QtyAvaiable: this.getRowData.QtyAvaiable,
      QtyConsumed: this.getRowData.QtyConsumed,
      UpdateDate: this.getRowData.UpdateDate,
      WarehouseId: this.getRowData.WarehouseId,
      end: this.getRowData.end,
      itemId: this.getRowData.ItemId,
      itemname: this.getRowData.itemname,
      start: this.getRowData.start,
      BillAmount: this.getRowData.BillAmount,
      BillDiscountOfferOn: this.getRowData.BillDiscountOfferOn,
      BillDiscountType: this.getRowData.BillDiscountType,
      BillDiscountWallet: this.getRowData.BillDiscountWallet,
      FreeItemLimit: this.getRowData.FreeItemLimit,
      IsMultiTimeUse: this.getRowData.IsMultiTimeUse,
      IsUseOtherOffer: this.getRowData.IsUseOtherOffer,
      LineItem: this.getRowData.LineItem,
      MaxBillAmount: this.getRowData.MaxBillAmount,
      MaxDiscount: this.getRowData.MaxDiscount,
      OfferUseCount: this.getRowData.OfferUseCount,
    }
    this.offerservice.updateOfferValue(payload).subscribe(res => {
      console.log(res, 'res');
      alert('Updated Successfully');
      this.closePopup.emit();
    })
  }

}
