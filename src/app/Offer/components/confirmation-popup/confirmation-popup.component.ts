import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OfferService } from 'app/offer/Service/offer.service';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {
  @Output() getStatusUpdate = new EventEmitter();
  @Output() closePopup = new EventEmitter();
  @Input() getRowData: any;
  data;
  activeStatus;

  isConfirmActive: boolean = false;
  constructor(
    public OfferService: OfferService
  ) {
    this.data = {}
  }

  ngOnInit() {
    this.isConfirmActive = this.getRowData.IsActive;
    // this.activeStatus = this.getRowData.IsActive
  }

  onCancel() {
    this.closePopup.emit('çlose')
  }

  onClickCustomer(e) {
    this.activeStatus = e;
  }
  updateStatus() {
    debugger;
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
      IsActive: this.isConfirmActive,
      // IsActive: this.activeStatus,
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
      IsFreebiesLevel:this.getRowData.IsFreebiesLevel
    }
    console.log("payload", payload);
    this.OfferService.updateStatus(payload).subscribe(res => {
      console.log(res, 'res');
      if (res.status) {
        this.getRowData.IsActive = this.isConfirmActive;
        alert('Updated Successfully');
        this.closePopup.emit('update');
      } else {
        let msgVal = res.msg != null ? res.msg : 'Something Wrong';
        alert(msgVal);
      }
    })
  }
}
