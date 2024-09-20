import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TradeitemmasterService } from 'app/shared/services/tradeitemmaster.service';
import { Router } from '@angular/router';
import { SaveEditableRow } from 'primeng/table';
import { SelectItem, MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-add-trade-item',
  templateUrl: './add-trade-item.component.html',
  styleUrls: ['./add-trade-item.component.scss']
})
export class AddTradeItemComponent implements OnInit {
  @Input() ID: any;
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  ItemDetails: any
  ItemData: any;
  CategoryName: any[];
  BaseCategoryName: any[];
  SubCategoryName: any[];
  BrandName: any[];
  isInvalid: boolean;
  value: boolean;
  apiURL: string;
  brandImage: any;
  ItemImage: any;
  public imagePath;
  file: any;
  fileB: any;
  isUploaded: boolean;
  url: any;
  UnitOfMeasurement: any[];
  EnterManually: boolean;
  isItemImage: boolean;
  



  constructor(private ItemServices: TradeitemmasterService, private router: Router, private messageService: MessageService) {

    this.url = this.ItemServices.apiURL + '/TradeItem/';
    this.apiURL = environment.tradeapiURL;




  }

  ngOnInit() {
    this.ItemData = {};
    this.ItemData.SubCategoryName=" ";
    this.ItemData.CategoryName="";
    this.ItemData.BaseCategoryName="";
    this.ItemData.BrandName="";
    this.isItemImage=false;
    console.log('this.ItemData: ', this.ID);
    if (this.ID) {
      this.ItemServices.GetTradeItem(this.ID).subscribe(result => {
        this.ItemData = result;
        console.log('this.ItemData: ', this.ItemData);
      });
    }


    this.UnitOfMeasurement = [
      { label: 'Gm', value: 'Gm' },
      { label: 'Ml', value: 'Ml' },
      { label: 'Kg', value: 'Kg' },
      { label: 'Ltr', value: 'Ltr' },
      { label: 'Pc', value: 'Pc' },
      { label: 'Size', value: 'Size' },
      { label: 'Combo', value: 'Combo' }
    ];

    this.ItemServices.SelectCategory().subscribe(result => {
      this.CategoryName = result;
      console.log('this.CategoryName: ', this.CategoryName);
    });
    this.ItemServices.SelectBaseCategoryDrop().subscribe(result => {
      this.BaseCategoryName = result;
      console.log('this.BaseCategoryName: ', this.BaseCategoryName);
    });
    this.ItemServices.SelectSubCategoryNameDrop().subscribe(result => {
      this.SubCategoryName = result;
      console.log('this.SubCategoryName: ', this.SubCategoryName);
    });
    this.ItemServices.SelectBrandNameDrop().subscribe(result => {
      this.BrandName = result;
      console.log('this.BrandName: ', this.BrandName);

      console.log("umtof mmmm", this.UnitOfMeasurement);

    });
  }

  onChangeSelectionData(data) {
    this.EnterManually = false;
    if (data == "EnterManually") {
      this.ItemData.BrandName = null;
      this.EnterManually = true;
    }
  }
  uploadItem(file: File[]) {
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.ItemImage = reader.result;
      this.isItemImage=false;
    }
    (success) => {
      alert("image uploaded successfully")

    };
  }

  uploaderItem() {
    let formData = new FormData();
    formData.append('file', this.file[0])
    formData.append('url', this.apiURL)
    console.log("formdata", formData);
    this.ItemServices.UploadItemImage(formData).subscribe(result => {
      this.isItemImage=false;
      this.ItemData.ImagePath = result;
      console.log(this.ItemData.ImagePath);

      this.messageService.add({ severity: 'success', summary: 'Uploaded Successfully!', detail: '' });
    })
  }

  uploadBrand(fileB: File[]) {
    this.fileB = fileB;
    var reader = new FileReader();
    this.imagePath = fileB;
    reader.readAsDataURL(fileB[0]);
    reader.onload = (_event) => {
      this.brandImage = reader.result;
    }
  }

  uploaderBrand() {
    let formData = new FormData();
    formData.append('file', this.fileB[0])
    formData.append('url', this.apiURL)
    this.ItemServices.UploadBrandImage(formData).subscribe(result => {
      this.ItemData.BrandImagePath = result;
      console.log(this.ItemData.BrandImagePath);
      this.messageService.add({ severity: 'success', summary: 'Uploaded Successfully!', detail: '' });
    })
  }


  onSave(ItemAddForm: any) {
    console.log(this.ItemData);
    this.isItemImage=false;
    if (ItemAddForm.form.status == "VALID") {
      // if (!this.ItemData.BrandImagePath) {
      //   this.messageService.add({ severity: 'error', summary: 'Please Upload Brand Image !!', detail: '' });
      //   return false;
      // }
      if (!this.ItemData.ImagePath) {
        this.isItemImage=true;
        this.messageService.add({ severity: 'error', summary: 'Please Upload Item Image !!', detail: '' });
        return false;
      }else if (this.ItemData.BrandImagePath==null || this.ItemData.BrandImagePath=='') {
        this.ItemData.BrandImagePath=this.ItemData.ImagePath;
      }
      if (this.ID == null) {
        this.ItemServices.AddItem(this.ItemData).subscribe(result => {
          this.messageService.add({ severity: 'success', summary: 'Item Add Successfully.Send for Approval!', detail: '' });
          this.router.navigateByUrl('layout/trade/trade-item')
          this.refreshParent.emit();
        });
      } else {
        if (this.ItemData.IsTradeItem==false && this.ItemData.IsConsumerItem==false) {
          this.ItemData.IsActive=false;
        }
        else{
          this.ItemData.IsActive=true;
        }
        this.ItemServices.UpdateItems(this.ItemData).subscribe(result => {
          this.messageService.add({ severity: 'success', summary: 'Updated Successfully!', detail: '' });
          this.refreshParent.emit();
          // this.router.navigateByUrl('full-layout/item')
        });
      }
    }
    else {
      this.isInvalid = true;
    }
  }

  onCancel() {
    if (this.ID == null) {
      this.isdetailsclose.emit(false);
      this.router.navigateByUrl('/layout/trade/trade-item');
    }
    else {
      this.isdetailsclose.emit(false);
      this.router.navigateByUrl('/layout/trade/trade-item');
    }
  }



}

