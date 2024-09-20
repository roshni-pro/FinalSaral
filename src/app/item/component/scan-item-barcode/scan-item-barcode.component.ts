import { Component, OnInit } from '@angular/core';
import { ScanBarcode } from 'app/item/interface/scan-barcode';
import { ScanBarcodeService } from 'app/item/services/scan-barcode.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-scan-item-barcode',
  templateUrl: './scan-item-barcode.component.html',
  styleUrls: ['./scan-item-barcode.component.scss']
})
export class ScanItemBarcodeComponent implements OnInit {

  itemList: ScanBarcode[];
  warehouselist : any;
  WarehouseId : number;
  isopenPopup : boolean = false;
  BarcodeImageUrl : any;
  blocked : boolean = false;
  constructor(private scanBarcodeService: ScanBarcodeService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.WarehouseId = null;
    // this.itemList = this.scanBarcodeService.getItemList();
    this.blocked = true;
    this.scanBarcodeService.whForWarkingCapital().subscribe(wh=>{
      this.blocked = false;
      this.warehouselist = wh;
    })
  }
  onChangeWarehouse(){
    if(this.WarehouseId == null){
      this.itemList = [];
      return false;
    }else{
    this.blocked = true;
    this.scanBarcodeService.getBarcodeItemforpage(this.WarehouseId).subscribe(barcodeData=>{
      this.blocked = false;
      this.itemList = barcodeData;
    })
  }
  }
  onChangeStatus(itemNew,status){
      this.confirmationService.confirm({
        message: 'Are you sure that you want to ' + (status == true ? 'Approve' : 'Reject') + ' this Barcode data?',
        accept: () => {
          this.blocked = true;
          this.scanBarcodeService.barcodeItemApproved(itemNew.Id, status).subscribe(res=>{
            this.blocked = false;
            console.log(res);
              this.onChangeWarehouse();
                },
                err=>{
                    alert("Error - Please Try again");
                })
            },
            reject: () => {
                this.onChangeWarehouse();
            }
          });
  }
  openImg(image) {
    this.isopenPopup = true;
    this.BarcodeImageUrl = image;
  }
}




