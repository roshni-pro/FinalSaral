import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { CategoryService } from 'app/shared/services/category.service';
import { ItemService } from 'app/shared/services/item.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-item-barcode',
  templateUrl: './item-barcode.component.html',
  styleUrls: ['./item-barcode.component.scss']
})
export class ItemBarcodeComponent implements OnInit {
  @Input() itemDetails: any;
  @Input() ItemId: any;
  // @Input() downloadLink: ElementRef;
  @ViewChild('chartContainer', { read: ElementRef, static: false }) downloadLink: ElementRef;

  selectedItem: any;
  selectedItemView: any[];
  barcode: any;
  Barcode: any;
  show: boolean;
  canvas: any;
  barcodegetvalue: any;

  inputModel: any = {

  };
  imgPath: string;
  barcodeList: any;
  width = 0;
  constructor(private category: CategoryService, private itemservice: ItemService, downloadLink: ElementRef) {
    this.selectedItem = {};
  }

  ngOnInit() {
    this.show = false;
    this.barcodegetvalue = ""
  }

  getitembarcode(event) {
    

    if (event.query.length > 2) {
      this.itemservice.searchCentralItem7(event.query)
        .subscribe(result => {
          this.barcodeList = result;

          console.log('this.barcodeList :', this.barcodeList);
        });
    }

  }

  onmodelChange(ItemId) {
    
    this.barcode = this.selectedItem;
    this.selectedItem = ItemId;
    console.log(this.selectedItem);
    console.log(this.selectedItem.Barcode);
    console.log(this.selectedItem.itemBaseName);

  }

  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    console.log("image");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }
  getbarcode() {
    
    if (this.barcodegetvalue == 'Getbarcode' && this.selectedItem.Id != null) {
      this.itemservice.Getbarcode(this.selectedItem).subscribe(result => {

        this.Barcode = result;
        this.show = true;


        console.log("sdfsdfdsfsdfsdf", this.Barcode);
        this.imgPath = "data:image/png;base64," + this.Barcode.BarcodeImage;

      })
    } else if (this.barcodegetvalue == 'Getbarcodeofitem' && this.selectedItem.Id != null) {

      this.itemservice.Getitembarcode(this.selectedItem).subscribe(result => {
        if (result !== null) {
          this.Barcode = result;
          this.show = true;
        }
        if (this.selectedItem.Barcode == '') {
          alert("Barcode is not available for this item")
          this.show = false;

          console.log("sdfsdfdsfsdfsdf", this.Barcode);

        }
        else {
          this.imgPath = "data:image/png;base64," + this.Barcode.BarcodeImage;
        }
      })

    }
    else {
      alert("please select item from list")
    }
  }

  print() {
    
    this.itemservice.printBarcode(this.selectedItem).subscribe(result => {
      
    })

  }

}

