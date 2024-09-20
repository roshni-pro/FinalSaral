import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { ItemService } from 'app/shared/services/item.service';
import { MessageService } from 'primeng/api';
import { LoaderService } from 'app/shared/services/loader.service';
import { BaseCategoryService } from 'app/shared/services/base-category.service';
import { SubCategoryService } from 'app/shared/services/sub-category.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-add-multi-mrp',
  templateUrl: './add-multi-mrp.component.html',
  styleUrls: ['./add-multi-mrp.component.scss']
})
export class AddMultiMRPComponent implements OnInit {
  @Input() details: any;
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  GetItemMRPData: any = [];
  ItemFinalData: any;
  ItemPriceData: any;
  ItemDataPrice: any;
  mediaURL = '';

  constructor(private itmServece: ItemService
    , private messageService: MessageService
    , private loaderService: LoaderService,
    private subCategoryService: SubCategoryService
  ) {
    this.mediaURL = environment.mediaURL;
    this.ItemFinalData = [];
    this.ItemPriceData = {};
    this.ItemDataPrice = {};
  }

  ngOnInit() {
    this.itmServece.getMultiMRP(this.details.Number).subscribe(result => {
      this.GetItemMRPData = result;
      if (this.GetItemMRPData == null) this.GetItemMRPData = [];
      console.log("thissisjo", this.GetItemMRPData);

    })
  }

  CheckBschem(e) {
    debugger
    var pattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
    if (e.match(pattern)) {
      this.ItemPriceData.baseScheme = undefined;
    }
    else {
      this.ItemPriceData.baseScheme
    }

  }
  Checkvalue(e) {
    debugger
    var pattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
    if (e.match(pattern)) {
      this.ItemPriceData.ptr = undefined;
    }
    else {
      this.ItemPriceData.ptr
    }

  }

  Check(event) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
    // if (reg.test(input)) { }
    if ((event.which > 64 && event.which < 91) || (event.which > 96 && event.which < 123) || (event.which == 45 || event.which == 189)) {
      event.preventDefault();
    }
  }

  addMRP(data) {
    if (this.ItemFinalData.length == 1) {
      this.messageService.add({ severity: 'error', summary: "please press save button first", detail: '' });
      return;
    }
    if (this.ItemPriceData.ptr > 100) {
      this.messageService.add({ severity: 'error', summary: "PTR Can't be greater than 100", detail: '' });
      return;
    }
    if (this.ItemPriceData.baseScheme > 100) {
      this.messageService.add({ severity: 'error', summary: "BaseScheme Can't be greater than 100", detail: '' });
      return;
    }
    this.loaderService.loading(true);
    var count = 0;
    debugger
    if (this.GetItemMRPData.length == 0 || this.GetItemMRPData == null || this.GetItemMRPData == undefined) {
      if (data.Price && data.UnitofQuantity && data.UOM && data.ptr && data.baseScheme && data.CompanyStockCode && data.ColourName && data.ColourImage) {
        this.ItemDataPrice = {};
        this.ItemDataPrice.MRP = data.Price;
        this.ItemDataPrice.ItemNumber = this.details.Number;
        this.ItemDataPrice.UnitofQuantity = data.UnitofQuantity;
        this.ItemDataPrice.UOM = data.UOM;
        this.ItemDataPrice.itemname = this.details.itemname;
        this.ItemDataPrice.itemBaseName = this.details.itemBaseName;
        this.ItemDataPrice.isNew = true;
        this.ItemDataPrice.CompanyStockCode = data.CompanyStockCode;
        this.ItemDataPrice.ptr = data.ptr;
        this.ItemDataPrice.baseScheme = data.baseScheme;
        this.ItemDataPrice.ColourName = data.ColourName;
        this.ItemDataPrice.ColourImage = data.ColourImage;
        this.ItemFinalData.push(this.ItemDataPrice);
        this.GetItemMRPData.push(this.ItemDataPrice);
        console.log(this.ItemFinalData);
        this.ItemPriceData.Price = '';
        this.onSave();
        this.messageService.add({ severity: 'success', summary: "Item Added", detail: '' });
      } else {
        this.messageService.add({ severity: 'error', summary: "Please Fill Required Fields", detail: '' });
      }
      this.loaderService.loading(false);
    }
    else {
      for (var i = 0; i < this.GetItemMRPData.length; i++) {
        if (this.GetItemMRPData[i].MRP == data.Price && this.GetItemMRPData[i].UOM == data.UOM && this.GetItemMRPData[i].UnitofQuantity == data.UnitofQuantity) {
          this.messageService.add({ severity: 'error', summary: "Same MRP and UOM and UOQ cannot be added.", detail: '' });
          count = 0;
          this.loaderService.loading(false);
          return null;
        }
        else {
          count++;
          this.loaderService.loading(false);
        }
      }
      if (count > 0) {
        if (data.Price && data.UnitofQuantity && data.UOM && data.ptr && data.baseScheme && data.ColourName && data.ColourImage) {
          this.ItemDataPrice = {};
          this.ItemDataPrice.MRP = data.Price;
          this.ItemDataPrice.ItemNumber = this.details.Number;
          this.ItemDataPrice.UnitofQuantity = data.UnitofQuantity;
          this.ItemDataPrice.UOM = data.UOM;
          this.ItemDataPrice.itemname = this.details.itemname;
          this.ItemDataPrice.itemBaseName = this.details.itemBaseName;
          this.ItemDataPrice.isNew = true;
          this.ItemDataPrice.CompanyStockCode = data.CompanyStockCode;
          this.ItemDataPrice.ptr = data.ptr;
          this.ItemDataPrice.baseScheme = data.baseScheme;
          this.ItemDataPrice.ColourName = data.ColourName;
          this.ItemDataPrice.ColourImage = data.ColourImage;
          this.ItemFinalData.push(this.ItemDataPrice);
          this.GetItemMRPData.push(this.ItemDataPrice);
          console.log(this.ItemFinalData);
          this.ItemPriceData.Price = '';
          this.onSave()
          this.messageService.add({ severity: 'success', summary: "Item Added", detail: '' });
        } else {
          this.messageService.add({ severity: 'error', summary: "Please Fill Required Fields", detail: '' });
        }
      }
      this.loaderService.loading(false);
    }
    this.loaderService.loading(false);
  }


  file: any;
  imagePath: string = '';
  @ViewChild('myInput2', null) fileUploader2: ElementRef;
  @ViewChild('myInput3', null) fileUploader3: ElementRef;
  @ViewChild('myInput4', null) fileUploader4: ElementRef;
  @ViewChild('myInput5', null) fileUploader5: ElementRef;
  upload(file: File[], type: string) {
    if (file[0].size < 1000000) {
      console.log(file[0])
      //  file[0].name = this.details.Number;
      this.file = file[0];
      // this.file.name = this.details.Number;
      var reader = new FileReader();
      this.imagePath = this.file;
      console.log(this.imagePath);
      reader.readAsDataURL(this.file);
      reader.onload = (_event) => {
        // this.details.LogoUrl = reader.result;
      }
      (success) => {
        alert("image uploaded successfully")
      };
      this.uploader1(type);
    }
    else {
      alert('Select Image size less than 1MB!!!');
      this.fileUploader2.nativeElement.value = null;
      this.fileUploader3.nativeElement.value = null;
      this.fileUploader4.nativeElement.value = null;
      this.fileUploader5.nativeElement.value = null;
      this.reset('All');
    }
  }

  uploadVideoFile(file: File[], type: string) {
    // if (file[0].size < 1000000) {
    console.log(file[0])
    //  file[0].name = this.details.Number;
    this.file = file[0];
    // this.file.name = this.details.Number;
    var reader = new FileReader();
    this.imagePath = this.file;
    console.log(this.imagePath);
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      // this.details.LogoUrl = reader.result;
    }
    (success: any) => {
      alert("image uploaded successfully")
    };
    this.uploaderVideo();
    // }
    // else {
    //   alert('Select Image size less than 1MB!!!');
    //   this.fileUploader2.nativeElement.value = null;
    //   this.fileUploader3.nativeElement.value = null;
    //   this.fileUploader4.nativeElement.value = null;
    //   this.reset('All');
    // }
  }

  colourDisplayPop: boolean = false;
  subMedia: any;
  openColourDetails(item: any) {
    this.colourDisplayPop = true;
    debugger
    this.subMedia = item;
    if (item.mrpMediaDC == null) {
      this.subMedia.mrpMediaDC = []
    } else {
      item.mrpMediaDC.forEach((element: any) => {
        element.isDeleted = element.isDeleted == true ? true : false;
      });
    }
    this.subMedia.showColourImage = 'https://uat.shopkirana.in/../../' + item.ColourImage;
    console.log('selected item -', item);
  }


  uploader1(type: string) {
    // if (this.file && this.file[0]) {
    let formData = new FormData();
    formData.append('file', this.imagePath)
    this.subCategoryService.StoreImageUpload(formData).subscribe(result => {
      console.log('image uploaded res', result);
      debugger
      if (type == 'main') {
        this.ItemPriceData.ColourImage = result;
        this.ItemPriceData.showColourImage = 'https://uat.shopkirana.in/../../' + result;
      } else if (type == 'sub') {
        this.subMedia.ColourImage = result;
        this.subMedia.showColourImage = 'https://uat.shopkirana.in/../../' + result;
      } else if (type == 'subSub') {
        this.addMediaDetailspayload.Url = result;
        this.addMediaDetailspayload.ShowUrl = 'https://uat.shopkirana.in/../../' + result;
      } else {

      }

      this.messageService.add({ severity: 'success', summary: 'Uploaded Successfully!', detail: '' });

    })
    // }else{
    //   this.messageService.add({ severity: 'error', summary: 'Please Select a File', detail: '' });
    // }
  }

  uploaderVideo() {
    // if (this.file && this.file[0]) {
    let formData = new FormData();
    formData.append('file', this.imagePath)
    this.loaderService.loading(true);
    this.subCategoryService.UploadVideo(formData).subscribe(result => {
      console.log('image uploaded res', result);
      this.loaderService.loading(false);
      this.addMediaDetailspayload.Url = result;
      this.addMediaDetailspayload.ShowUrl = 'https://uat.shopkirana.in/../../' + result;
      this.messageService.add({ severity: 'success', summary: 'Uploaded Successfully!', detail: '' });
    })
    // }else{
    //   this.messageService.add({ severity: 'error', summary: 'Please Select a File', detail: '' });
    // }
  }

  reset(type: string) {
    if (type == 'main') {
      this.ItemPriceData.ColourImage = '';
      this.ItemPriceData.showColourImage = '';
      if (this.fileUploader2) {
        this.fileUploader2.nativeElement.value = null;
      }
    } else if (type == 'sub') {
      this.subMedia.ColourImage = '';
      this.subMedia.showColourImage = '';
      if (this.fileUploader3) {
        this.fileUploader3.nativeElement.value = null;
      }
    } else if (type == 'subSub') {
      this.addMediaDetailspayload.Url = ''
      this.addMediaDetailspayload.ShowUrl = ''
      if (this.fileUploader4) {
        this.fileUploader4.nativeElement.value = null;
      }
      if (this.fileUploader5) {
        this.fileUploader5.nativeElement.value = null;
      }
    }
  }

  onSave() {
    if (this.ItemFinalData.length > 0) {
      this.loaderService.loading(true);
      this.itmServece.addIemMultiMRP(this.ItemFinalData).subscribe(result => {
        console.log(result);
        this.loaderService.loading(false);
        this.messageService.add({ severity: 'success', summary: "Added Successfully", detail: '' });
        this.ngOnInit();
        // this.refreshParent.emit();
      }, error => {
        this.loaderService.loading(false);
      })
    } else {
      this.messageService.add({ severity: 'error', summary: "Please Add Item MRP Details", detail: '' });
    }
  }

  onCancel() {
    this.isdetailsclose.emit(false)
  }

  addMediaDetailspayload = {
    id: 0,
    Type: '',
    Url: '',
    ShowUrl: '',
    SequenceNo: 0,
    isDeleted: false,
    isActive: true
  }

  // MediaDetailsPayload : MediaDetails;
  addToMediaList() {
    console.log(this.addMediaDetailspayload, this.subMedia);
    let subMediaPaytload = {
      id: 0,
      Type: this.addMediaDetailspayload.Type,
      Url: this.addMediaDetailspayload.Url,
      // ShowUrl: '',
      SequenceNo: 0,
      isDeleted: false,
      isActive: true
    }
    if (subMediaPaytload.Type == '') {
      alert("please enter media type");
      return;
    }
    if (subMediaPaytload.Url == '') {
      alert("please upload your media");
      return;
    }

    this.subMedia.mrpMediaDC.push(subMediaPaytload);

    this.addMediaDetailspayload = {
      id: 0,
      Type: '',
      Url: '',
      ShowUrl: '',
      SequenceNo: 0,
      isDeleted: false,
      isActive: true
    }

  }

  saveMediaDetails() {

    if (this.subMedia.ColourImage == '') {
      alert('Colour Image is required')
      return
    }

    if (this.subMedia.ColourName == '') {
      alert('Colour Name is required')
      return
    }

    this.subMedia.mrpMediaDC.forEach((element: any, index: any) => {
      let count = 0;
      if (element.isDeleted == false && element.isActive == true) {
        count++;
        element.SequenceNo = count;
      } else {
        element.SequenceNo = 0;
      }
    });

    console.log(this.subMedia);

    this.loaderService.loading(true);
    this.subCategoryService.UpdateMRPMedia(this.subMedia).subscribe((res: any) => {
      console.log("res", res);
      this.loaderService.loading(false);
      // if (res.status == true) {
      alert(res.Message);
      this.colourDisplayPop = false;
      this.ngOnInit();

      // } else {
      //   alert(res.Message);
      // }
    }, (err: any) => {
      alert("Error API - UpdateMRPMedia");
    })

  }

  removeItem(index: number): void {
    // Remove the item from the array

    if (this.subMedia.mrpMediaDC[index].id == 0) {
      this.subMedia.mrpMediaDC.splice(index, 1);
    } else {
      this.subMedia.mrpMediaDC[index].isActive = false;
      this.subMedia.mrpMediaDC[index].isDeleted = true;
    }
  }

  handleClose(){
    this.ngOnInit();
    this.colourDisplayPop = false;
  }

}

export interface MediaDetails {
  "ItemMultiMRPId": 0,
  "ColourImage": "",
  "ColourName": "",
  "mrpMediaDC": mrpMediaDC[]
}

export interface mrpMediaDC {
  "id": 0,
  "Type": "",
  "Url": "",
  "SequenceNo": 0,
  "isActive": boolean,
  "isDeleted": boolean
}