import { filter } from 'rxjs/operators';
import { AppHomeService } from './../../../shared/services/appHome.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, Input, Output, EventEmitter, ContentChildren, ViewChild, SimpleChanges, OnChanges, ElementRef, DoCheck, AfterContentChecked } from '@angular/core';
import Swal from 'sweetalert2';
import { ItemService } from 'app/shared/services/item.service';
import { Tab } from '../tabsets/tab';
import { Tabset } from '../tabsets/tabset';
import { environment } from 'environments/environment';
import { SectionItem } from 'app/app-home/SectionItem';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import { contains, event } from 'jquery';
import * as moment from 'moment';




type AOA = any[][];

@Component({
  selector: 'apphome-tile',
  templateUrl: './apphome-tile.component.html',
  styleUrls: ['./apphome-tile.component.scss']
})
export class AppHomeTileComponent implements OnInit, OnChanges {

  display: boolean = false;
  apiURL: string;
  cloudUrl: string;
  @Input() item: any;
  @Input() indexOfItem: any;
  @Input() BaseCategories: any;
  @Input() categorys: any;
  @Input() subsubcats: any;
  @Input() Items: any;
  @ViewChild('myInput', null) fileUploader: ElementRef;
  @ViewChild('myInput2', null) fileUploader2: ElementRef;
  @ViewChild('myInput3', null) fileUploader3: ElementRef;
  @ViewChild('myInput4', null) fileUploader4: ElementRef;
  @ViewChild('myInput5', null) fileUploader5: ElementRef;
  @Input() subcategory: any;
  @Output() addNewSection = new EventEmitter();
  @Output() refreshAppHome = new EventEmitter();
  @Output() addSection = new EventEmitter();
  @Output() removeTile = new EventEmitter();
  @Input() showMobileView: any;
  @Input() currentToggleIndex: any;
  @Input() itemOpen: any;
  @Input() WarehouseId: any;
  @Output() IsTileValid = new EventEmitter<{ title: boolean }>();
  @ViewChild('selectList', { static: false }) selectList: ElementRef;
  TileValid: boolean;
  OriginalItems: any[]


  terraceVar = false;
  count = 1;
  SectionData = {
    WarehouseId: '',
    AppType: ''
  };
  accordionSectionsList: any;
  file: any;
  public imagePath;
  isUploaded: boolean;
  tileItem = new SectionItem();
  deletedItemsLength: number = 0;
  @Output() disablePublish = new EventEmitter();
  @ContentChildren(Tab) tabs;
  @ViewChild(Tabset, { static: false }) tabset!: Tabset;
  currentTileItem = '';
  currentRowColumnCount: number;
  deletedRecords: number = 0;
  Flashdealexcelupload: boolean;
  alternateData: any[];
  AppItemsListRepeat: any;
  ColRowCountChanged: boolean;
  ColRowCountChangedList: boolean;
  actualItemsLength: number = 0;
  invalidTile: boolean = false;
  invalidItemArray = [];
  currentAppItem: any;
  currentItemIndex: any;
  displayTable: boolean;
  flashDealList = [];
  EditEnable: boolean = true;
  cols = [
    { field: 'TileName', header: 'TileName' },
    { field: 'OfferStartTime', header: 'OfferStartTime' },
    { field: 'OfferEndTime', header: 'OfferEndTime' },
    { field: 'FlashDealQtyAvaiable', header: 'FlashDealQtyAvaiable' },
    { field: 'FlashDealSpecialPrice', header: 'FlashDealSpecialPrice' },
  ];

  constructor(private itemService: ItemService, private dom: DomSanitizer, private apphomeservice: AppHomeService, private msg: MessageService) {
    this.apiURL = environment.apiURL;
    this.cloudUrl = 'https://res.cloudinary.com';
    this.tileItem.TileName = 'New Tile Item' + this.count;
    this.TileValid = true;
    this.onCheckComplete();


  }





  ngOnInit() {


    // if(this.item.AppItemsList.length > 0 &&  this.item.SectionSubType && this.item.AppItemsList != null){
    //   this.TileValid=true;
    //   this.onCheckComplete();
    // }
    if (this.item && this.item.AppItemsList.length > 0) {
      this.item.AppItemsList.forEach(element => {
        if (element.SectionItemID && element.SectionItemID != null) {
          this.enableSave = false;
          // this.TileValid=true;
          // this.onCheckComplete();
        }
        else {
          this.enableSave = true;
          // this.TileValid=false;
          // this.onCheckComplete();
        }
      });



      if (this.item && this.item.AppItemsList.length > 0) {
        this.item.AppItemsList.forEach(element => {
          element.TileHeaderBackgroundColor = '#FFFFFF';
          if (element.HasOffer == true) {
            if (element.OfferStartTime && element.OfferEndTime) {
              element.OfferStartTime = element.OfferStartTime ? moment(element.OfferStartTime).format('MM/DD/YYYY HH:mm') : null
              element.OfferEndTime = element.OfferEndTime ? moment(element.OfferEndTime).format('MM/DD/YYYY HH:mm') : null



            }
          }
          else {

          }
        });
      }



    }


    // image code 
    debugger
    if (this.item.TileBackgroundImage && (!(this.item.TileBackgroundImage.includes(this.apiURL)) && !(this.item.TileBackgroundImage.includes(this.cloudUrl)))) {
      this.item.TileBackgroundImage = this.apiURL + this.item.TileBackgroundImage
      console.log(this.item.TileBackgroundImage)
    }
    if (this.item.TileHeaderBackgroundImage && (!(this.item.TileHeaderBackgroundImage.includes(this.apiURL)) && !(this.item.TileHeaderBackgroundImage.includes(this.cloudUrl)))) {
      this.item.TileHeaderBackgroundImage = this.apiURL + this.item.TileHeaderBackgroundImage
      console.log(this.item.TileHeaderBackgroundImage)
    }
    if (this.item.sectionBackgroundImage && (!(this.item.sectionBackgroundImage.includes(this.apiURL)) && !(this.item.sectionBackgroundImage.includes(this.cloudUrl)))) {
      this.item.sectionBackgroundImage = this.apiURL + this.item.sectionBackgroundImage
      console.log(this.item.sectionBackgroundImage)
    }
    //debugger
    this.item.AppItemsList.forEach(element => {
      if (element.TileImage && (!(element.TileImage.includes(this.apiURL)) && !(element.TileImage.includes('https://res.cloudinary.com')))) {
        element.TileImage = this.apiURL + element.TileImage
      }
      if (element.DynamicHeaderImage && (!(element.DynamicHeaderImage.includes(this.apiURL)) && !(element.DynamicHeaderImage.includes('https://res.cloudinary.com')))) {
        element.DynamicHeaderImage = this.apiURL + element.DynamicHeaderImage
      }
    });




    this.allItems = this.Items;
  }

  ngOnChanges(simplechanges: SimpleChanges) {
    simplechanges.subsubcats && simplechanges.subsubcats.currentValue && simplechanges.subsubcats.currentValue.length ?
      this.subsubcats = simplechanges.subsubcats.currentValue : '';
    simplechanges.Items && simplechanges.Items.currentValue && simplechanges.Items.currentValue.length ?
      this.Items = simplechanges.Items.currentValue : '';
    // && this.currentAppItem.RedirectionType == 'Offer'
    if (this.item && this.item.AppItemsList && this.item.AppItemsList.length) {
      // this.item.AppItemsList.forEach(item => {
      //   item.OfferStartTime = new Date(item.OfferStartTime);
      //   item.OfferEndTime = new Date(item.OfferEndTime);
      // });

      if (this.item.AppItemsList.length > 0 && this.item.SectionSubType == 'Other' || this.item.SectionSubType == 'Store') {
        this.disableDeleteRow = true;
      }
      else {
        this.disableDeleteRow = false;
      }

    }

    // if(this.item.SectionSubType=='Flash Deal'){
    //   this.item.AppItemsList.forEach(element => {
    //       if(element.SectionItemID !=null || element.SectionItemID !=''){
    //         this.EditEnable=false;
    //       }        
    //       else{
    //         this.EditEnable=true;
    //       }
    //   });
    // }



    this.currentRowColumnCount = this.item.ColumnCount * this.item.RowCount;
    this.tileItem.RedirectionType = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal' ? 'Item' : this.item.SectionSubType;
    this.item.RowCount = 1;




    if (this.item.AppItemsList && this.item.AppItemsList.length > 0) {
      let flag = 0;
      debugger;
      this.item.AppItemsList.forEach(element => {
        if (element.Deleted == true && element.Active == false) {
          flag = flag + 1;
        }
      });
      if (flag == this.item.AppItemsList.length) {
        this.item.AppItemsList = [];
      }
      if (this.item.AppItemsList.length == 0) {
        this.item.ColumnCount = 0;
      }
    }

    console.log("--------------------------------------------------------------------", this.item);


    if (this.item.AppItemsList.length == 0) {
      this.item.ColumnCount = 0;
    }

    if (this.item.SectionSubType == "Other" && this.item.SectionType == 'Tile' && this.item.WebViewUrl) {
      this.item.WebViewUrl = this.item.WebViewUrl;

      // this.onOtherEnable = true;

    }
    if (this.item.AppItemsList) {
      if (this.item.IsTileSlider == true) {
        debugger
        this.item.IsTileSlider = true;
      }
      else {
        this.item.IsTileSlider = false;
      }
    }
  }


  //file uploader check for flash deal
  isChecked: boolean;
  check1 = [
    { label: 'Is Excel uploaded', selected: false }
  ];
  allcheckuncheck(event) {

    const checked = event.target.checked;
    this.check1.forEach(item => {
      item.selected = checked;
      if (checked == true) {
        this.isFlashEnable = true;
      }
      else {
        this.isFlashEnable = false;
      }
    });
  }


  //checker for tile slider
  tileSlider = [{ label: 'Is Tile slider', selected: false }]
  TileCheckslider(event) {
    //debugger
    const checked = event.target.checked;
    this.tileSlider.forEach(item => {
      item.selected = checked;
      if (checked == true) {
        this.item.IsTileSlider = true;
      }
      else {
        this.item.IsTileSlider = false;
      }
    });
  }



  deleteItem(SectionItemID) {
    let itemIndex = this.item.AppItemsList.findIndex(appItem => appItem.SectionItemID == SectionItemID);

    if (this.item.SectionSubType == 'Other' || this.item.SectionSubType == 'Store') {
      this.item.AppItemsList[itemIndex].Deleted = true;
      this.item.AppItemsList[itemIndex].Active = false;
    }
    setTimeout(() => {
      this.tabset.tabs && this.tabset.tabs.first ? this.tabset.tabClicked(this.tabset.tabs.first) : '';
    }, 500);
    Swal.fire(
      'Deleted!',
      'Your Item has been deleted.',
      'success'
    )
    this.disablePublish.emit(false);
    if (this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false) &&
      this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false).length == 0) {
      this.item.ColumnCount = 0;
      this.item.rowCount = 0;
    }
  }



  SaveSection(SectionID) {
    debugger
    if (this.checkInvalidTileItem() == false) {
      this.addSection.emit(SectionID);
      let appItemInvalidArray = [];
      let appItemInvalidCount = 0;
      if (this.item.AppItemsList && this.item.AppItemsList.length > 0) {
        this.item.AppItemsList.forEach(appItem => {
          if (!appItem.Deleted) {
            if (!appItem.TileImage || !appItem.RedirectionType || !appItem.RedirectionID || (appItem.HasOffer && appItem.OfferEndTime.setHours(0, 0, 0, 0) == appItem.OfferStartTime.setHours(0, 0, 0, 0))) {
              appItemInvalidCount++
              appItemInvalidArray.push(appItem.TileName)
            }
          }
        });
        appItemInvalidCount > 0 ?
          this.terraceVar = false :
          setTimeout(() => {
            this.item.AppItemsList && this.item.AppItemsList.length == 1 &&
              this.tabset.tabs && this.tabset.tabs.last ? this.tabset.tabClicked(this.tabset.tabs.last) : '';
          }, 1000);
      }
      this.onLoadButtonDisable = false;
    }
    else {
      Swal.fire('Please Fill Valid Details for Item');
      this.invalidItemArray = [];
    }
    this.disablePublish.emit(false);
  }


  reset(imgUploadType?: any) {
    debugger
    if (imgUploadType == null) {
      this.fileUploader5.nativeElement.value ? this.fileUploader5.nativeElement.value = null : null;
      this.fileUploader4.nativeElement.value ? this.fileUploader4.nativeElement.value = null : null;

    }
    if (imgUploadType == 'DynamicItem') {
      this.currentAppItem.DynamicHeaderImage = null
      this.fileUploader5.nativeElement.value ? this.fileUploader5.nativeElement.value = null : null;

    }
    else {
      this.imageSrc = ''
      // this.imagePath = ''
      imgUploadType == 'reset' ? this.currentAppItem.TileImage = null : null
      this.fileUploader4.nativeElement.value ? this.fileUploader4.nativeElement.value = null : null;
    }
  }
  imageSrc: string;

  upload(file: File[], imgUploadType, j?) {
    debugger
    if (file[0].size < 1000000) {
      this.file = file;
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file[0]);
      reader.onload = (_event) => {
        this.onUpload(imgUploadType, j);
      }
      (success) => {
        alert("image uploaded successfully")
        this.onUpload(imgUploadType, j);
      };
      this.disablePublish.emit(false);
    }
    else {
      alert('Select Image size less than 1MB!!!');
      this.removeSectionBackgroundImage(imgUploadType);
    }
  }

  onUpload(imgUploadType, j?) {
    let singleItem = j;
    let formData = new FormData();
    formData.append('file', this.file[0])

    this.itemService.uploadImage(0, formData).subscribe(result => {
      this.isUploaded = true
      // debugger
      console.log('----------------------------------------------------------upload', result);

      if (imgUploadType) {

        switch (imgUploadType) {
          case 'TileBackgroundImage': {


            // url image code 
            if ((!(result.includes(this.apiURL))) && !(result.includes(this.cloudUrl))) {
              this.item.TileBackgroundImage = this.apiURL + result;
              console.log(this.item.TileBackgroundImage);
            }
            else {
              this.item.TileBackgroundImage = result;
            }
            // end

            this.item.HasBackgroundImage = true;
            this.item.HasBackgroundColor = false;

            // this.apphomeservice.saveSection(this.item).subscribe(result => {
            // });
            break;
          }
          case 'TileHeaderBackgroundImage': {

            // url image code 
            if ((!(result.includes(this.apiURL))) && !(result.includes(this.cloudUrl))) {
              this.item.TileHeaderBackgroundImage = this.apiURL + result;
              console.log(this.item.TileHeaderBackgroundImage);
            }
            else {
              this.item.TileHeaderBackgroundImage = result;
            }
            // end

            this.item.HasHeaderBackgroundImage = true;
            this.item.HasHeaderBackgroundColor = false;
            // this.apphomeservice.saveSection(this.item).subscribe(result => {
            // });
            break;
          }
          case 'TileAreaHeaderBackgroundImage': {
            this.item.TileAreaHeaderBackgroundImage = result;
            // this.apphomeservice.saveSection(this.item).subscribe(result => {
            // });
            break;
          }
          case 'sectionBackgroundImage': {

            if ((!(result.includes(this.apiURL))) && !(result.includes(this.cloudUrl))) {
              this.item.sectionBackgroundImage = this.apiURL + result;
              console.log(this.item.sectionBackgroundImage);
            }
            else {
              this.item.sectionBackgroundImage = result;
            }


            // this.apphomeservice.saveSection(this.item).subscribe(result => {
            // });
            break;
          }
          case 'TileSectionBackgroundImage': {
            this.item.TileSectionBackgroundImage = result;
            this.currentAppItem.TileSectionBackgroundImage = result;
            // this.apphomeservice.saveSection(this.item).subscribe(result => {
            // });
            break;
          }
          case 'DynamicItem': {
            // this.item.TileSectionBackgroundImage = result;
            if ((!(result.includes(this.apiURL))) && !(result.includes(this.cloudUrl))) {
              // this.imageSrc = result;
              this.currentAppItem.DynamicHeaderImage = this.apiURL + result;
              // this.currentAppItem.DynamicHeaderImage = result;
            }
            else {
              this.currentAppItem.DynamicHeaderImage = result;
            }
            break;
          }

          default: {
            break;
          }
        }
      }
      else {
        if ((!(result.includes(this.apiURL))) && !(result.includes(this.cloudUrl))) {
          this.imageSrc = result;
          this.currentAppItem.TileImage = this.apiURL + result;
          console.log(this.imageSrc);
        }
        else {
          this.currentAppItem.TileImage = result;
        }

      }
    })
    this.disablePublish.emit(false);
  }

  removeSectionBackgroundImage(imgUploadType) {
    if (imgUploadType == "sectionBackgroundImage") {
      this.item.sectionBackgroundImage = "";
      this.fileUploader.nativeElement.value = null;
    }
    if (imgUploadType == "TileHeaderBackgroundImage") {
      this.fileUploader2.nativeElement.value = null;
    }
    if (imgUploadType == "TileBackgroundImage") {
      this.fileUploader3.nativeElement.value = null;
    }
    // TileHeaderBackgroundImage
  }

  createNewSection() {
    // this.TileValid=false;
    this.addNewSection.emit(true);
    this.disablePublish.emit(false);
  }



  refreshAppHomes(WId) {
    this.refreshAppHome.emit(WId);
  }



  createNewTileItem() {
    let appItemInvalidArray = [];
    let appItemInvalidCount = 0;
    let tileItemData = new SectionItem();
    if (this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal') {
      tileItemData.HasOffer = true;
    }
    tileItemData.RedirectionID = null
    tileItemData.RedirectionType = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal' ? 'Item' : this.item.SectionSubType;
    this.item.SectionSubType == 'Offer' ? tileItemData.HasOffer = true : '';
    if (this.item.AppItemsList && this.item.AppItemsList.length > 0) {
      this.item.AppItemsList.forEach(appItem => {
        if (!appItem.Deleted) {
          if (!appItem.TileImage || !appItem.RedirectionType || !appItem.RedirectionID || (appItem.HasOffer && appItem.OfferEndTime.setHours(0, 0, 0, 0) == appItem.OfferStartTime.setHours(0, 0, 0, 0))) {
            appItemInvalidCount++
            appItemInvalidArray.push(appItem.TileName)
          }
        }
      });

      // appItemInvalidCount > 0 ?
      false ?
        Swal.fire('Please Fill Valid Details for') : (this.item.AppItemsList.push(tileItemData),
          this.count++,
          setTimeout(() => {
            this.item.AppItemsList && this.item.AppItemsList.length == 1 &&
              this.tabset.tabs && this.tabset.tabs.last ? this.tabset.tabClicked(this.tabset.tabs.last) : '';
          }, 1000));
    }
    else {
      this.item.AppItemsList.push(tileItemData);
      this.count++;
      setTimeout(() => {
        this.item.AppItemsList && this.item.AppItemsList.length == 1 &&
          this.tabset.tabs && this.tabset.tabs.last ? this.tabset.tabClicked(this.tabset.tabs.last) : '';
      }, 1000);
    }
    this.disablePublish.emit(false);
  }



  photoURL(imageUrl) {
    // debugger
    let thing = this.dom.bypassSecurityTrustResourceUrl(imageUrl);

    return thing;
  }






  setTileItemName(bannerItem) {
    this.disablePublish.emit(false);


    if (this.item.SectionSubType == 'Store' || this.item.SectionSubType == 'Other' && this.item.SectionType == "Tile") {
      this.currentAppItem = [];
    }

    let itemId = bannerItem.redirectionId;
    // let catid=
    this.apphomeservice.getMOQByItemId(itemId).subscribe(res => {
      if (res) {

        res.forEach(el => {

          if (el.ItemId == itemId && this.currentAppItem.RedirectionType == "Category" || this.currentAppItem.RedirectionType == "Base Category"
            || this.currentAppItem.RedirectionType == "Sub Category" || this.currentAppItem.RedirectionType == "Brand") {

            this.currentAppItem.ImageLevel = 1;
            // this.currentAppItem.PurchasePrice = 0;
            // this.currentAppItem.UnitPrice = 0;
            // this.currentAppItem.count = el.count;

          }
          else {

            if (this.currentAppItem.RedirectionType == "Item" && this.item.SectionSubType == "Flash Deal" && el.ItemId == itemId) {
              this.currentAppItem.ImageLevel = 1;
            }
          }


        })
      }

    })

    // 
    this.currentAppItem.TileName = this[bannerItem.arrayName].filter(item => item[bannerItem.nameOfId] == bannerItem.redirectionId)[0][bannerItem.catName];
    this.currentAppItem.TileImage = this[bannerItem.arrayName].filter(item => item[bannerItem.nameOfId] == bannerItem.redirectionId)[0][bannerItem.imageName];
  }


  disableImageSelection(imgUploadType, j) {
    this.disablePublish.emit(false);
    let formData = new FormData();
    switch (imgUploadType) {
      case 'TileBackgroundImage': {
        this.item.TileBackgroundImage = '';
        this.item.HasBackgroundImage = false;
        this.item.HasBackgroundColor = true;
        break;
      }
      case 'TileHeaderBackgroundImage': {
        this.item.TileHeaderBackgroundImage = '';
        this.item.HasHeaderBackgroundImage = false;
        this.item.HasHeaderBackgroundColor = true;
        break;
      }
      case 'TileAreaHeaderBackgroundImage': {
        this.item.TileAreaHeaderBackgroundImage = '';
        break;
      }
      case 'sectionBackgroundImage': {
        this.item.sectionBackgroundImage = '';
        break;
      }
      case 'tileTextColor': {
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }



  handleClose(event) {
    this.disablePublish.emit(false);
    this.item.AppItemsList[event.index].Active = false;
    this.item.AppItemsList[event.index].Deleted = true;
    //this.deleteItem(this.item.AppItemsList[event.index].SectionItemID);
  }

  getColCount() {
    return Number(this.item.ColumnCount);
  }

  saveColumnCount() {

    this.disablePublish.emit(false);
    this.apphomeservice.saveSection(this.item).subscribe(result => {
    });
  }



  onOtherEnable: boolean = false;
  onLoadButtonDisable: boolean = false;


  addNewRow() {
    // alert();
    // this.TileValid=false;
    // this.onCheckComplete();

    // if(this.item.SectionSubType=='Flash Deal'){
    //   this.EditEnable=true;
    // }
    // debugger
    this.onLoadButtonDisable = true;

    if (this.item.ColumnCount && this.item.ColumnCount > 0 && this.checkInvalidTileItem() == false) {

      if (this.item.IsTileSlider == true) {
        this.item.RowCount = !this.item.RowCount || this.item.RowCount == 'null' || this.item.RowCount == 0 ? 1 : this.item.RowCount + 0;
      }
      else {
        this.item.RowCount = !this.item.RowCount || this.item.RowCount == 'null' || this.item.RowCount == 0 ? 1 : this.item.RowCount + 1;
      }

      for (let i = 1; i <= Number(this.item.ColumnCount); i++) {
        let tileItemData = new SectionItem();
        tileItemData.RedirectionID = null
        this.item.SectionSubType == 'Offer' ? tileItemData.HasOffer = true : '';
        tileItemData.RedirectionType = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal' ? 'Item' : this.item.SectionSubType;
        tileItemData.OfferStartTime = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal' ? new Date() : null;
        tileItemData.OfferEndTime = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal' ? new Date() : null;
        if (this.item.SectionSubType == 'Flash Deal') {
          tileItemData.HasOffer = true;
        }
        this.item.AppItemsList.push(tileItemData)

      }
      this.disablePublish.emit(false);
    }
    else {

      if (this.item.SectionSubType != "Other" && this.item.SectionSubType != "Store") {
        if (!this.item.ColumnCount || this.item.ColumnCount == 0) {
          Swal.fire('Please Select Columns First');
        } else {
          Swal.fire('Please Fill Valid Details for Item');
          this.invalidItemArray = [];
        }
      } else {
        alert("created");
        if (this.item.SectionSubType == "Other") { }
        else {
          this.onOtherEnable = true;
        }
      }
    }
    // 

    if (this.item.AppItemsList[0] == undefined) {
      if (this.item.SectionSubType == "Other" || this.item.SectionSubType == 'Store') {
        this.item.RowCount = !this.item.RowCount || this.item.RowCount == 'null' || this.item.RowCount == 0 ? 1 : this.item.RowCount + 0;

        this.item.ColumnCount = 1;
        for (let i = 1; i <= Number(this.item.ColumnCount); i++) {
          let tileItemData = new SectionItem();
          tileItemData.RedirectionID = null
          this.item.SectionSubType == 'Offer' ? tileItemData.HasOffer = true : '';
          tileItemData.RedirectionType = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal' ? 'Item' : this.item.SectionSubType;
          tileItemData.OfferStartTime = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal' ? new Date() : null;
          tileItemData.OfferEndTime = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal' ? new Date() : null;
          if (this.item.SectionSubType == 'Flash Deal') {
            tileItemData.HasOffer = true;
          }
          this.item.AppItemsList.push(tileItemData)

        }
        this.disablePublish.emit(false);
      }
    }
    else {
      this.disableDeleteRow = true;
    }
  }


  clearTileItem(j) {
    debugger
    this.disablePublish.emit(false);
    Swal.fire({
      title: 'Are you sure?',
      text: 'Item will be Cleared',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      customClass: {
        popup: 'large-sa-popup !important'
      }
    }).then((result) => {
      if (result.value) {
        debugger

        if (this.item.AppItemsList[j].SectionItemID || this.item.AppItemsList[j].SectionItemID != null) {
          this.item.AppItemsList[j].TileImage = '';
          this.item.AppItemsList[j].TileName = '';
          this.item.AppItemsList[j].RedirectionID = null
        }
        else {
          this.item.AppItemsList[j] = new SectionItem();
          this.item.AppItemsList[j].RedirectionID = null
          this.item.SectionSubType == 'Offer' ? this.item.AppItemsList[j].HasOffer = true : '';
          this.item.AppItemsList[j].RedirectionType = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal' ? 'Item' : this.item.SectionSubType;
          this.item.SectionSubType == 'Flash Deal' ? this.item.AppItemsList[j].HasOffer = true : '';

        }



      }
    });
  }


  check = false;

  checkInvalidTileItem() {
    //debugger
    let invalidItems = 0;
    this.item.AppItemsList.forEach((mainimage, index) => {
      if (!mainimage.Deleted || mainimage.Deleted == false) {
        if (this.item.SectionSubType == 'Offer') {
          if (!mainimage.TileImage || !mainimage.TileName || !mainimage.RedirectionID || !(mainimage.HasOffer && mainimage.OfferStartTime && mainimage.OfferEndTime)) {
            invalidItems++;
            this.invalidItemArray.push(index + 1 + '  ')
          }
        }

        if (this.item.SectionSubType == 'Flash Deal') {
          if (!mainimage.TileImage || !mainimage.TileName || !mainimage.RedirectionID || !mainimage.RedirectionID || !(mainimage.OfferStartTime && mainimage.OfferEndTime) || !mainimage.MOQ || !mainimage.FlashDealQtyAvaiable || !mainimage.FlashDealSpecialPrice || !mainimage.UnitPrice || !mainimage.PurchasePrice || !mainimage.FlashDealMaxQtyPersonCanTake) {
            invalidItems++;
            this.invalidItemArray.push(index + 1 + '  ')
          }
        }

        if (this.item.SectionSubType != 'Offer' && this.item.SectionSubType != 'Flash Deal' && this.item.SectionSubType != "DynamicItem") {
          if (!mainimage.TileImage || !mainimage.TileName || !mainimage.RedirectionID) {
            invalidItems++;
            this.invalidItemArray.push(index + 1 + '  ')
          }
        }
      }
    });

    if (invalidItems > 0) {
      this.item.invalidItem = true;
      return true;
    }
    else {
      this.item.invalidItem = false;
      this.check = true;
      return false;
    }

  }

  deleteEntireGrid() {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'Grid will be Deleted',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.disablePublish.emit(false);
        debugger
        // e.Deleted==true && 
        // this.item.AppItemsList = this.item.AppItemsList.filter(item => !item.Deleted || item.Deleted == false)

        this.item.AppItemsList.forEach(e => {
          if (e.SectionItemID || e.SectionItemID != null) {

            this.apphomeservice.deleteSectionItem(this.item.SectionID, e.SectionItemID).subscribe(x => {
              // e.Deleted = true;
              if (x) {
                this.refreshAppHomes(this.item.WarehouseID);
              }
            })

            this.item.AppItemsList = this.item.AppItemsList.filter(item => !item.Deleted || item.Deleted == false);
            if (this.item.AppItemsList) {
              this.item.AppItemsList = []
              this.item.ColumnCount = 0;
              this.item.rowCount = 0;
            }

          }

          else {
            this.item.AppItemsList = [];
            // this.item.rowCount = this.item.rowCount - 1;
            this.item.AppItemsList = this.item.AppItemsList.filter(item => !item.Deleted || item.Deleted == false);
            if (this.item.AppItemsList && this.item.AppItemsList.length == 0)
              this.item.ColumnCount = 0;
            this.item.rowCount = 0;
          }
          // this.refreshAppHomes(this.item.WarehouseID);
          // this.item.AppItemsList = this.item.AppItemsList.filter(item => !item.Deleted || item.Deleted == false);
          // this.item.ColumnCount = 0;

        })

      }
      // if (this.item.AppItemsList && this.item.AppItemsList.length == 0) {
      //   this.item.ColumnCount = 0;
      //   this.item.rowCount = 0;
      // }
      if (this.item.SectionSubType == 'Other' || this.item.SectionSubType == 'Store') {
        this.item.AppItemsList[0].Deleted = true;
        this.item.AppItemsList[0].Active = false;
      }

    })

  }

  checkActiveItemsExist() {
    let activeItems = 0;
    this.item.AppItemsList.forEach(mainimage => {
      if (mainimage.Deleted == false) {
        activeItems++;
      }
    });
    if (activeItems > 0) {
      this.invalidTile = false;
      return false;
    }
    else {
      this.invalidTile = true;
      true;
    }
  }

  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }
  deleteRow(index) {

    // this.item.ColumnCount= index;

    this.disablePublish.emit(false);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.value) {

        if (this.item.ColumnCount == 1) {
          this.item.AppItemsList[index].Deleted = true;

          this.item.AppItemsList = this.item.AppItemsList.filter(item => item.Deleted || item.Deleted == true);
          if (this.item.AppItemsList) {
            this.item.AppItemsList.forEach(e => {
              if (e.Deleted == true && e.SectionItemID || e.SectionItemID != null) {
                this.apphomeservice.deleteSectionItem(this.item.SectionID, e.SectionItemID).subscribe(x => {

                })

                // this.ExportToExcel();
              }
            })
            this.refreshAppHomes(this.item.WarehouseID);
          }
        }
        if (this.item.ColumnCount == 2) {
          this.item.AppItemsList[index].Deleted = true;
          this.item.AppItemsList[index - 1].Deleted = true;
          console.log(this.item.AppItemsList);
          this.item.AppItemsList = this.item.AppItemsList.filter(item => item.Deleted || item.Deleted == true);

          if (this.item.AppItemsList) {
            this.item.AppItemsList.forEach(e => {

              alert(index)
              debugger
              if (e.Deleted == true && e.SectionItemID || e.SectionItemID != null) {
                this.apphomeservice.deleteSectionItem(this.item.SectionID, e.SectionItemID).subscribe(x => {
                  // if (x) {
                  // }
                })
                // this.ExportToExcel();
              }

            })
            this.refreshAppHomes(this.item.WarehouseID);
          }
        }
        if (this.item.ColumnCount == 3) {
          this.item.AppItemsList[index].Deleted = true;
          this.item.AppItemsList[index - 1].Deleted = true;
          this.item.AppItemsList[index - 2].Deleted = true;
          // index-3,index
          // this.item.AppItemsList=this.item.AppItemsList.splice(1,2)
          // this.item.AppItemsList.filter(x=>{
          // return 
          this.item.AppItemsList = this.item.AppItemsList.filter(item => item.Deleted || item.Deleted == true);
          if (this.item.AppItemsList) {
            this.item.AppItemsList.forEach(e => {
              if (e.Deleted == true && e.SectionItemID || e.SectionItemID != null) {
                this.apphomeservice.deleteSectionItem(this.item.SectionID, e.SectionItemID).subscribe(x => {
                })
                // this.ExportToExcel();
              }
            })
            this.refreshAppHomes(this.item.WarehouseID);

          }
        }
        if (this.item.ColumnCount == 4) {
          this.item.AppItemsList[index].Deleted = true;
          this.item.AppItemsList[index - 1].Deleted = true;
          this.item.AppItemsList[index - 2].Deleted = true;
          this.item.AppItemsList[index - 3].Deleted = true;
          // index-3,index
          // this.item.AppItemsList=this.item.AppItemsList.splice(1,2)
          // this.item.AppItemsList.filter(x=>{
          // return 
          this.item.AppItemsList = this.item.AppItemsList.filter(item => item.Deleted || item.Deleted == true);

          if (this.item.AppItemsList) {
            this.item.AppItemsList.forEach(e => {
              if (e.Deleted == true && e.SectionItemID || e.SectionItemID != null) {
                this.apphomeservice.deleteSectionItem(this.item.SectionID, e.SectionItemID).subscribe(x => {

                })
                // this.ExportToExcel();
              }
            })
            this.refreshAppHomes(this.item.WarehouseID);

          }


        }

        Swal.fire(" Row item deleted ")

        this.refreshAppHomes(this.item.WarehouseID);
        // this.item.rowCount = this.item.rowCount - 1;
        if (this.item.AppItemsList && this.item.AppItemsList.length == 0) {
          this.item.ColumnCount = 0;
          this.item.rowCount = 0;
        }
        else {
          // this.item.AppItemsList = this.item.AppItemsList.filter(item => !item.Deleted || item.Deleted == false);
        }
        // this.ExportToExcel();
      }
    });
  }

  arrayTwo(array) {
    return array;
  }

  disableDeleteRow: boolean = false;
  enableSave: boolean = false;

  showDialog(j) {
    //debugger
    this.TileValid = false;
    this.onCheckComplete();
    this.disablePublish.emit(false);
    this.display = true;
    this.currentAppItem = new SectionItem(this.item.AppItemsList[j]);
    this.currentItemIndex = j;
    // this.Items=this.allItems;
  }



  onSaveValidation(currentAppItem) {
    //debugger

    if (this.item.SectionSubType == 'Flash Deal') {


      if (this.currentAppItem.MOQ && this.currentAppItem.FlashDealQtyAvaiable && this.currentAppItem.FlashDealMaxQtyPersonCanTake) {
        if (this.currentAppItem.MOQ) {
          if (this.currentAppItem.FlashDealQtyAvaiable % this.currentAppItem.MOQ != 0) {
            Swal.fire("total quantity must be multiple of moq")
            return false;
          }

          if (this.currentAppItem.FlashDealMaxQtyPersonCanTake % this.currentAppItem.MOQ != 0) {
            Swal.fire("maximum quantity must be multiple of moq")
            return false;
          }

          if (this.currentAppItem.FlashDealMaxQtyPersonCanTake > this.currentAppItem.FlashDealQtyAvaiable) {
            Swal.fire("Max Qty can not be greater than Total Qty !")
            return false;
          }
          if (!this.currentAppItem.FlashDealSpecialPrice || this.currentAppItem.FlashDealSpecialPrice == '') {
            Swal.fire("special price cant be null")
            return false;
          }
          if (this.currentAppItem.FlashDealSpecialPrice > this.currentAppItem.UnitPrice) {
            Swal.fire("flash deal price cannot be more than unit price");

            return false;
          }


          if (this.currentAppItem.FlashDealMaxQtyPersonCanTake % this.currentAppItem.MOQ == 0 && this.currentAppItem.FlashDealQtyAvaiable % this.currentAppItem.MOQ == 0
            && this.currentAppItem.FlashDealMaxQtyPersonCanTake >= this.currentAppItem.FlashDealQtyAvaiable) {
            if (!currentAppItem.RedirectionID && !currentAppItem.TileImage && this.item.SectionSubType != 'DynamicHtml') {
              Swal.fire("Please fill valid details. ");
            }
            else {
              this.display = false;
              this.Items = this.allItems
              this.save(currentAppItem);
            }

          }
          else {
            this.display = false;
            this.Items = this.allItems
            this.save(currentAppItem);
          }

        }
      }
      else {

        Swal.fire("please fill valid details")
      }

    }
    else {
      if (!currentAppItem.RedirectionID && !currentAppItem.BannerImage && this.item.SectionSubType != 'DynamicHtml' && (this.item.SectionSubType != 'DynamicItem' ||
        (this.item.SectionSubType == 'DynamicItem' && !currentAppItem.RedirectionUrl))
      ) {
        Swal.fire("Please fill valid details. ");
      }
      else {
        this.display = false;
        this.Items = this.allItems
        this.save(currentAppItem);
      }
    }



  }


  save(currentAppItem) {


    //debugger
    // flash deal validation
    if (this.item.SectionSubType == 'Flash Deal') {
      if (this.currentAppItem.MOQ && this.currentAppItem.FlashDealQtyAvaiable && this.currentAppItem.FlashDealMaxQtyPersonCanTake) {
        if (this.currentAppItem.MOQ) {
          if (this.currentAppItem.FlashDealQtyAvaiable % this.currentAppItem.MOQ != 0) {
            Swal.fire("total quantity must be multiple of moq")
          }
          if (this.currentAppItem.FlashDealMaxQtyPersonCanTake % this.currentAppItem.MOQ != 0) {
            Swal.fire("maximum quantity must be multiple of moq")
          }
        }
      }
      else {
        Swal.fire("please fill valid details")
      }
    }


    if (currentAppItem.HasOffer == true || currentAppItem.HasOffer == false || currentAppItem.HasOffer == undefined) {

      if (currentAppItem.HasOffer == true) {
        if (!currentAppItem.OfferStartTime || currentAppItem.OfferStartTime == '' || currentAppItem.OfferStartTime == undefined) { Swal.fire('Please Fill offer Start Date'); this.display = true; return false; }
        if (!currentAppItem.OfferEndTime || currentAppItem.OfferEndTime == '' || currentAppItem.OfferEndTime == undefined) { Swal.fire('Please Fill offer End Date'); this.display = true; return false; }

      }
    }

    if (currentAppItem.HasOffer == true) {
      if (currentAppItem.OfferStartTime && currentAppItem.OfferEndTime) {

        currentAppItem.OfferStartTime = currentAppItem.OfferStartTime ? moment(currentAppItem.OfferStartTime).format('MM/DD/YYYY HH:mm:ss') : null
        currentAppItem.OfferEndTime = currentAppItem.OfferEndTime ? moment(currentAppItem.OfferEndTime).format('MM/DD/YYYY HH:mm:ss') : null
      }
    }


    // other store validation
    if (this.item.SectionSubType == 'Other' || this.item.SectionSubType == 'Store') {
      if (!this.item.WebViewUrl || this.item.WebViewUrl == '') {
        Swal.fire("Enter valid Url");
        this.display = true;
        return false;
      }
      else {
        this.display = false;
      }
    }





    if (currentAppItem.RedirectionType == 'Base Category' || currentAppItem.RedirectionType == 'Category' || currentAppItem.RedirectionType == 'Brand' || currentAppItem.RedirectionType == 'Item') {
      if (this.item.SectionSubType == 'Offer') {

      }
      else if (!currentAppItem.FlashDealSpecialPrice) {
        currentAppItem.OfferStartTime = null;
        currentAppItem.OfferEndTime = null;
      }

    }
    if (this.item.SectionSubType == "Other" && this.item.SectionType == "Tile" && this.item.WebViewUrl) {
      // this.currentAppItem=[];
      this.item.Active = true;
      this.item.ColumnCount = 1;
    }
    this.enableSave = true;
    this.item.AppItemsList[this.currentItemIndex] = currentAppItem;
    this.currentAppItem = new SectionItem();
    this.currentAppItem.RedirectionID = 'null'
    this.currentAppItem.RedirectionType = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal' ? 'Item' : this.item.SectionSubType;
    // alert(this.currentAppItem.RedirectionType)
    this.item.SectionSubType == 'Offer' ? this.currentAppItem.HasOffer = true : '';
  }



  disableEditFlash: boolean = false;
  flag: number = 0;
  disableMain: boolean = false;
  saveSectionItem() {

    //debugger
    this.flag = 0;
    this.item.AppItemsList.forEach(element => {
      if (!element.RedirectionUrl && this.item.SectionSubType == 'DynamicItem') {
        return false;
      }
      if (!element.TileName && this.item.SectionSubType != "Other" && this.item.SectionSubType != 'Store' && this.item.SectionSubType != 'DynamicItem') {
        return false;
      }
      else { this.flag++; }
    });

    if (this.item.IsTileSlider == true) {
      this.item.RowCount = !this.item.RowCount || this.item.RowCount == 'null' || this.item.RowCount == 0 ? 1 : this.item.RowCount + 0;
    }
    else {
      this.item.RowCount = !this.item.RowCount || this.item.RowCount == 'null' || this.item.RowCount == 0 ? 1 : this.item.RowCount + 1;
    }

    //debugger
    if (this.item.TileHeaderBackgroundImage == true || this.item.TileBackgroundImage == true) {
      alert('select background image properly!');
      return false;
    }
    // debugger
    // if (this.item.sectionBackgroundImage==null  || this.item.sectionBackgroundImage==undefined  || this.item.sectionBackgroundImage==true) { 
    //   alert('select Section Background Image properly!');
    //   return false;
    // }
    if (this.item.TileHeaderBackgroundImage == false) {
      this.item.TileHeaderBackgroundImage = null;
    }
    if (this.item.TileBackgroundImage == false) {
      this.item.TileBackgroundImage = null
    }




    // this.item.AppItemsList.forEach(el => {


    // })




    if (this.flag == this.item.AppItemsList.length && (this.item.ColumnCount >= 1 || this.item.SectionSubType == 'Other' || this.item.SectionSubType == 'Store')) {

      let tempArr = [];

      this.item.AppItemsList.forEach(element => {
        if (element.Active == undefined && element.Deleted == undefined) {
          tempArr.push(element);
        }
        if (element.Active == true || element.Deleted == false) {
          tempArr.push(element);
        }
      });

      this.item.AppItemsList = tempArr;


      // url image code

      let startIndex = 0;
      let endIndex = 0;
      let string = 'https://uat.shopkirana.in/';
      //TileBackgroundImage
      if (this.item.TileBackgroundImage && (this.item.TileBackgroundImage.includes(this.apiURL) || this.item.TileBackgroundImage.includes(string))) {

        if ((this.item.TileBackgroundImage.includes(string))) {
          startIndex = this.item.TileBackgroundImage.indexOf(string);
          endIndex = startIndex + string.length;
        }
        else {
          startIndex = this.item.TileBackgroundImage.indexOf(this.apiURL);
          endIndex = startIndex + this.apiURL.length;
        }

        this.item.TileBackgroundImage = this.item.TileBackgroundImage.substring(0, startIndex).concat(this.item.TileBackgroundImage.substring(endIndex));
      }

      //TileHeaderBackgroundImage
      if (this.item.TileHeaderBackgroundImage && (this.item.TileHeaderBackgroundImage.includes(this.apiURL) || this.item.TileHeaderBackgroundImage.includes(string))) {
        startIndex = 0
        endIndex = 0
        if ((this.item.TileHeaderBackgroundImage.includes(string))) {
          startIndex = this.item.TileHeaderBackgroundImage.indexOf(string);
          endIndex = startIndex + string.length;
        }
        else {
          startIndex = this.item.TileHeaderBackgroundImage.indexOf(this.apiURL);
          endIndex = startIndex + this.apiURL.length;
        }

        this.item.TileHeaderBackgroundImage = this.item.TileHeaderBackgroundImage.substring(0, startIndex).concat(this.item.TileHeaderBackgroundImage.substring(endIndex));
      }


      //dynamic image hedaer
      //  url image code

      this.item.AppItemsList.forEach(element => {
       // debugger
        let startIndex = 0;
        let endIndex = 0;
        let string = 'https://uat.shopkirana.in/';


        if (element.TileImage != null) {
          if ((element.TileImage && element.TileImage.includes(string))) {
            startIndex = element.TileImage.indexOf(string);
            endIndex = startIndex + string.length;
            element.TileImage = element.TileImage.substring(0, startIndex).concat(element.TileImage.substring(endIndex));

          }
          else if (element.TileImage.includes(this.apiURL)) {
            startIndex = element.TileImage.indexOf(this.apiURL);
            endIndex = startIndex + this.apiURL.length;
            element.TileImage = element.TileImage.substring(0, startIndex).concat(element.TileImage.substring(endIndex));

          }
          else {


          }
        }

        startIndex = 0
        endIndex = 0
        if (element.DynamicHeaderImage != null) {
          if (element.DynamicHeaderImage && element.DynamicHeaderImage.includes(string)) {
            startIndex = element.DynamicHeaderImage.indexOf(string);
            endIndex = startIndex + string.length;
            element.DynamicHeaderImage = element.DynamicHeaderImage.substring(0, startIndex).concat(element.DynamicHeaderImage.substring(endIndex));

          }
          else if (element.DynamicHeaderImage.includes(this.apiURL)) {
            startIndex = element.DynamicHeaderImage.indexOf(this.apiURL);
            endIndex = startIndex + this.apiURL.length;
          }
          else {

          }
        }

      });
      //end of code

      //end of code



      this.apphomeservice.saveSection(this.item).subscribe(result => {
        // if(result){this.enableSave = false;}
        // else{this.enableSave = true;}

        this.TileValid = true;
        this.onCheckComplete();
        this.refreshAppHomes(this.item.WarehouseID);
        this.enableSave = false;
        if (this.item.SectionSubType == 'Other' || this.item.SectionSubType == 'Store') {
          this.disableDeleteRow = true;
        }
        if (this.item.SectionSubType == 'Brand' || this.item.SectionSubType == 'Item' || this.item.SectionSubType == 'Category' || this.item.SectionSubType == 'Base Category') {
          this.disableMain = true;
        }
        this.disableDeleteRow = false;

        Swal.fire(
          'Saved!',
          'Your Item has been Saved.',
          'success'
        )

      });
    }
    else {
      this.checkInvalidTileItem();
      this.onSaveValidation(this.item.AppItemsList);
    }
  }

  ViewFlashDealList() {
    this.displayTable = true;
  }

  ExportToExcel() {
    this.flashDealList = []
    this.item.AppItemsList.forEach((appItem, index) => {
      if (!appItem.Deleted || appItem.Deleted == 'false') {
        this.flashDealList.push({
          SNo: index + 1,
          Tilename: appItem.TileName,
          OfferStartTime: appItem.OfferStartTime,
          OfferEndTime: appItem.OfferEndTime,
          FlashDealQtyAvaiable: appItem.FlashDealQtyAvaiable,
          FlashDealSpecialPrice: appItem.FlashDealSpecialPrice
        }
        );
      }
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.flashDealList);

    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, 'flashItemList');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: "xlsx"
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + ".xlsx");
  }


  showSuccess(Msg: string) {
    this.msg.add({ severity: 'success', summary: Msg, detail: 'Message Content' });
  }


  isFlashEnable: boolean = false;
  // data: AOA = [[1, 2], [3, 4]];
  // wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  // fileName: string = 'SheetJS.xlsx';
  UploadFlashDoc(file: File[],) {

    // const target: DataTransfer = <DataTransfer>(evt.target);
    // if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    // const reader: FileReader = new FileReader();
    // reader.onload = (e: any) => {
    //   /* read workbook */
    //   const bstr: string = e.target.result;
    //   const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    //   /* grab first sheet */
    //   const wsname: string = wb.SheetNames[0];
    //   const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    //   /* save data */
    //   this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
    //   console.log("data:", this.data);
    //   // this.data.map(res=>{
    //   //   if(res[0] === "no"){
    //   //     console.log(res[0]);
    //   //   }else{
    //   //     console.log(res[0]);
    //   //   }
    //   // })
    // };
    // reader.readAsBinaryString(target.files[0]);
    this.file = file;
    var reader = new FileReader();
    // this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      // this.onUploadClick()
      // this.onUpload(imgUploadType, j);
    }
    (success) => {
      alert("Excel uploaded successfully")
      // this.onUpload(imgUploadType, j);
    };
    this.disablePublish.emit(false);


  }
  disableExcel: boolean = false;
  onUploadClick() {

    let formData = new FormData();
    formData.append('file', this.file[0]);


    this.apphomeservice.UploadFlashDoc(this.item.SectionID, formData).subscribe(res => {

      if (res) {
        console.log(res);

        alert(res);
        if (res == 'Success') {
          this.disableExcel = true
        }
        // this.enableSave = true;
        this.refreshAppHomes(this.item.WarehouseID);
        this.TileValid = false;
        this.onCheckComplete();


      }
    },
      Error => {
        alert("Error!! please try again later  ");

        this.isFlashEnable = false;
      }
    )
  }



  onCheckComplete() {

    this.IsTileValid.emit({ title: this.TileValid });
  }

  filteredItems: any
  allItems: any
  assignCopy() {
    // this.filteredItems = Object.assign([], this.Items);
    this.Items = this.allItems
  }

  filterItem(value) {
    if (!value) {
      this.assignCopy();
    } // when nothing has typed
    this.Items = this.allItems
    this.filteredItems = Object.assign([], this.Items).filter(
      item => item.itemname.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
    this.Items = this.filteredItems
  }


}

