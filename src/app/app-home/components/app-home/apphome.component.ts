import { filter } from 'rxjs/operators';
import { LoaderService } from 'app/shared/services/loader.service';
import { Component, OnInit, ViewChild, SimpleChanges, OnChanges, ChangeDetectorRef, DoCheck, EventEmitter } from '@angular/core';
import { AppHomeService } from 'app/shared/services/appHome.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2'
import { ItemMasterService } from 'app/shared/services/item-master.service';
import { AppHomeTileComponent } from '../tile/apphome-tile.component';
import { Accordion } from 'primeng/accordion';
import { MessageService } from 'primeng/api';
import { BlockableUI } from 'primeng/primeng';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-apphome',
  templateUrl: './apphome.component.html',
  styleUrls: ['./apphome.component.scss']
})
export class AppHomeComponent implements OnInit, OnChanges {
  @ViewChild(Accordion, { static: false }) accordion: Accordion;
  apiURL: string;
  showMobileView: boolean = true;
  index: number = null;
  lastIndex = -1;
  isAppHomeEdit: boolean;
  SectionData = {
    WarehouseId: null,
    AppType: ''
  };
  openclonepopup = false;
  Items = [];
  warehouseList = [];
  accordionSectionsList: any;
  BaseCategories: any;
  categorys: any;
  subsubcats: any;
  openpopup = false;
  IsPopupValid: boolean
  IsTileValid: boolean
  Tilealreadysave: boolean = false
  Popupalreadysave: boolean = false
  Banneralreadysave: boolean = false;
  // -------------------------------------------------
  data = {
    SectionID: 0,
    CreatedDate: new Date(),
    UpdatedDate: new Date(),
    SectionType: '',
    IsBanner: false,
    IsPopUp: false,
    IsTile: false,
    SectionName: '',
    sectionHindiName: '',
    SectionSubType: '',
    ViewType: 'AppView',
    AppItemsList: [],
    WarehouseID: this.SectionData.WarehouseId,
    AppType: this.SectionData.AppType,
    WebViewUrl: '',
    ColumnCount: 0,
    Deleted: false,
    itemOpen: false,
    Sequence: 0,
    IsSingleBackgroundImage: false
  };
  SubSectionType = [];

  SubSectionTypeForTile = [{
    'type': 'Base Category'
  }, {
    'type': 'Category'
  }, {
    'type': 'Item'
  }, {
    'type': 'Brand'
  }, {
    'type': 'Offer'
  }, {
    'type': 'Flash Deal'
  }
    , {
    'type': 'SubCategory'
  }, {
    'type': 'Other'
  },
  {
    'type': 'Store'
  }
  ];
  sectionSubTypeforPopUp = [{
    'type': 'Item'
  }, {
    'type': 'Brand'
  }, {
    'type': 'Video'
  }, {
    'type': 'Other'
  }, {
    'type': 'Base Category'
  }, {
    'type': 'Category'
  }
  ];

  SubSectionTypeForBanner = [
    {
      'type': 'Base Category'
    }, {
      'type': 'Category'
    }, {
      'type': 'Item'
    }, {
      'type': 'Brand'
    }, {
      'type': 'Offer'
    }, {
      'type': 'Slider'
    }
    , {
      'type': 'SubCategory'
    }, {
      'type': 'DynamicHtml'
    }, {
      'type': 'Other'
    }
    , {
      'type': 'BucketGame'
    }
  ];


  Apptype = [{ name: 'Select AppType', code: '' }, { name: 'Retailer App', code: 'Retailer App' }, { name: 'Sales App', code: 'Sales App' }];
  currentToggleIndex: number;
  accordionOpen: boolean;
  validAppHome: boolean = true;
  @ViewChild(AppHomeTileComponent, { static: false }) AppHomeTileComponent: AppHomeTileComponent;
  blocked: boolean = false;
  isAppHomeSaved = false;
  cloneSectionData = { appTypefrom: '', wIdfrom: null, appType: '', wId: null };
  appHomeDeleted: boolean;

  constructor(private apphomeservice: AppHomeService, private warehouseService: WarehouseService,
    private itemMasterService: ItemMasterService, private _changeRef: ChangeDetectorRef, private loaderService: LoaderService, private msg: MessageService) {
    this.isAppHomeEdit = true;
    // this.getBaseCategoryByRedirectionType();
    // this.getCategoriesByRedirectionType();
    // this.getBrandByRedirectionType();
    // this.blocked = true;
    this.apiURL = environment.apiURL;
    this.getSubCategory();




  }

  async getSectionTile() {
    if (this.SectionData.AppType == 'Consumer') {
      this.SubSectionTypeForTile = []
      this.SubSectionTypeForBanner = []
      this.SubSectionTypeForTile = [{
        'type': 'Base Category'
      }, {
        'type': 'Category'
      }, {
        'type': 'Item'
      }, {
        'type': 'Brand'
      }, {
        'type': 'Offer'
      }, {
        'type': 'Flash Deal'
      }
        , {
        'type': 'SubCategory'
      }, {
        'type': 'Other'
      },
      {
        'type': 'Store'
      },
      {
        'type': 'DynamicItem'
      }
      ];
      this.SubSectionTypeForBanner = [
        {
          'type': 'Base Category'
        }, {
          'type': 'Category'
        }, {
          'type': 'Item'
        }, {
          'type': 'Brand'
        }, {
          'type': 'Offer'
        }, {
          'type': 'Slider'
        }
        , {
          'type': 'SubCategory'
        }, {
          'type': 'DynamicHtml'
        }, {
          'type': 'Other'
        }
        , {
          'type': 'BucketGame'
        }
        , {
          'type': 'DynamicItem'
        }
      ];
      await this.getConsumerWarehosues();

    }
    else {
      this.SubSectionTypeForTile = [{
        'type': 'Base Category'
      }, {
        'type': 'Category'
      }, {
        'type': 'Item'
      }, {
        'type': 'Brand'
      }, {
        'type': 'Offer'
      }, {
        'type': 'Flash Deal'
      }
        , {
        'type': 'SubCategory'
      }, {
        'type': 'Other'
      },
      {
        'type': 'Store'
      }
      ];
      this.SubSectionTypeForBanner = [
        {
          'type': 'Base Category'
        }, {
          'type': 'Category'
        }, {
          'type': 'Item'
        }, {
          'type': 'Brand'
        }, {
          'type': 'Offer'
        }, {
          'type': 'Slider'
        }
        , {
          'type': 'SubCategory'
        }, {
          'type': 'DynamicHtml'
        }, {
          'type': 'Other'
        }
        , {
          'type': 'BucketGame'
        }

      ];
      await this.getAllWarehosues();

    }
  }

  ngOnInit() {


    // this.blocked = false;
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
  }
  onChangeAppType(SectionData) {
    // ;
    this.SectionData.AppType = SectionData.code;
  }
  onChangeWarehouse(SectionData) {
    // ;
    this.SectionData.WarehouseId = SectionData.WarehouseId;
  }

  getConsumerWarehosues() {
    this.apphomeservice.getConsumerWarehouse(1).subscribe((result: any) => {
      console.log(result);
      if (result.Status) {
        this.warehouseList = result.Warehouses;
      }
      else{
        alert('Warehouses not found!')
      }

    });
  }

  getAllWarehosues() {
    // this.blocked=true;
    this.warehouseService.GetAllWarehouse().subscribe(result => {
      this.warehouseList = result;
      console.log(result);


      //this.blocked = false;
    });
  }

  getSectionsByWarehouseId(WarehouseId, e?) {
    // debugger
    if (WarehouseId == 'Select WareHouse') {
      this.showSuccess("please select warehouse")
    }
    else {
      let data = { AppType: this.SectionData.AppType, WarehouseId: WarehouseId };

      this.blocked = true;
      this.apphomeservice.getSectionsByWarehouseId(data).subscribe(result => {
        this.accordionSectionsList = result;
        if (this.accordionSectionsList && this.accordionSectionsList.length > 0) {
          this.accordionSectionsList.forEach(item => {
            item.itemOpen = false;
            if (item.IsPopUp == true) {
              item.AppItemsList.forEach(item => {
                item.displayPopup = true;
              });
            }
            if (item.IsBanner == true) {
              if (item.AppItemsList == '' || !item.AppItemsList && item.SectionSubType == 'DynamicHtml' && item.WebViewUrl != '') {
                item = item;
              }
            }
          });
        }


        //   this.getBaseCategoryByRedirectionType();
        //  this.getCategoriesByRedirectionType();
        //   this.getBrandByRedirectionType();
        this.getItemsByRedirectionType(Number(WarehouseId));
        this.blocked = false;
      });
    }
  }

  editImage(event, mainimage, itemIndex, imageIndex) {
    this.accordionSectionsList[itemIndex].AppItemsList[imageIndex].BannerImage = event.target.result;
  }

  getBaseCategoryByRedirectionType() {
    // this.blocked=true;
    this.apphomeservice.getBaseCategoryByRedirectionType().subscribe(result => {
      this.BaseCategories = result;
      // this.blocked=false;
    });
  }

  getCategoriesByRedirectionType() {
    // this.blocked=true;
    this.apphomeservice.getCategoriesByRedirectionType().subscribe(result => {
      this.categorys = result;
      // this.blocked=false;
    });
  }

  getBrandByRedirectionType() {
    // this.blocked=true;
    this.apphomeservice.getBrandByRedirectionType().subscribe(result => {
      this.subsubcats = result;

      this.getSubCategory();
      // ;


      // this.blocked=false;
    });

  }



  subcategory: any = [];
  getSubCategory() {
    this.blocked = true;
    this.apphomeservice.getSubCategory().subscribe(res => {
      if (res) {
        this.subcategory = res.SubCategorysDTO;
        this.BaseCategories = res.AppHomeBaseCategoryDc;
        this.categorys = res.AppHomeCategoryMinDc;
        this.subsubcats = res.SubsubCategoryDTOM;
        this.blocked = false;
      }
    })
  }


  getItemsByRedirectionType(WarehouseId) {
    // this.blocked=true;
    this.apphomeservice.GetItemM(WarehouseId).subscribe(result => {
      setTimeout(() => {
        this.Items = result;
      }, 1000);
      // this.blocked=false;
    });
  }

  addSection(SectionID) {
    let section = this.accordionSectionsList.filter(section => SectionID == section.SectionID)[0];
    this.blocked = true;
    this.apphomeservice.saveSection(section).subscribe(result => {
      Swal.fire('section saved');
      this.blocked = false;
    });
  }

  addNewSection() {
    this.openpopup = true;
  }

  createNewSection() {

    if (this.data.IsTile && this.data.SectionSubType == 'Flash Deal') {
      let existingItem = this.accordionSectionsList.filter(item => item.SectionSubType == 'Flash Deal' && item.Deleted == false)[0];

      if (existingItem) {
        Swal.fire({ icon: 'error', text: 'Please Delete Previous Flash Deal to Add New' });
        this.data = {
          SectionID: 0,
          CreatedDate: new Date(),
          UpdatedDate: new Date(),
          SectionType: '',
          IsBanner: false,
          IsPopUp: false,
          IsTile: false,
          SectionName: '',
          sectionHindiName: '',
          SectionSubType: '',
          ViewType: 'AppView',
          AppItemsList: [],
          WarehouseID: this.SectionData.WarehouseId,
          AppType: this.SectionData.AppType,
          WebViewUrl: '',
          ColumnCount: 0,
          Deleted: false,
          itemOpen: false,
          Sequence: this.index,
          IsSingleBackgroundImage: false
        };
        this.openpopup = false;
      }

      else {
        this.openpopup = false;
        this.blocked = true;
        this.data.WarehouseID = this.SectionData.WarehouseId;
        this.data.AppType = this.SectionData.AppType;
        this.apphomeservice.saveSection(this.data).subscribe(result => {
          this.appHomeDeleted = false;
          this.blocked = false;
          result.itemOpen = false;
          this.accordionSectionsList.push(result);
          this.isAppHomeSaved = false;
          Swal.fire('section saved');
          this.data = {
            SectionID: 0, CreatedDate: new Date(), UpdatedDate: new Date(), SectionType: '', IsBanner: false, IsPopUp: false, IsTile: false, SectionName: '', ColumnCount: 0,
            sectionHindiName: '', SectionSubType: '', ViewType: 'AppView', AppItemsList: [], WarehouseID: this.SectionData.WarehouseId, AppType: this.SectionData.AppType, WebViewUrl: '', Deleted: false,
            itemOpen: false, Sequence: this.index, IsSingleBackgroundImage: false
          };
          Swal.fire('new section created');
        });
      }
    }
    else {
      this.openpopup = false;
      this.data.WarehouseID = this.SectionData.WarehouseId;
      this.data.AppType = this.SectionData.AppType;
      // this.data.Sequence=this.index
      ;
      this.blocked = true;
      this.apphomeservice.saveSection(this.data).subscribe(result => {
        this.appHomeDeleted = false;
        this.blocked = false;
        result.itemOpen = false;
        this.accordionSectionsList.push(result);
        this.isAppHomeSaved = false;
        Swal.fire('section saved');
        this.data = {
          SectionID: 0, CreatedDate: new Date(), UpdatedDate: new Date(), SectionType: '', IsBanner: false, IsPopUp: false, IsTile: false, SectionName: '', ColumnCount: 0,
          sectionHindiName: '', SectionSubType: '', ViewType: 'AppView', AppItemsList: [], WarehouseID: this.SectionData.WarehouseId, AppType: this.SectionData.AppType, WebViewUrl: '', Deleted: false,
          itemOpen: false, Sequence: this.index, IsSingleBackgroundImage: false
        };
        Swal.fire('new section created');
      });
    }
  }

  drop(event: CdkDragDrop<string[]>) {

    moveItemInArray(this.accordionSectionsList, event.previousIndex, event.currentIndex);
    if (this.accordionSectionsList && this.accordionSectionsList.length > 0) {
      this.accordionSectionsList.forEach((currentValue, index) => {
        currentValue.Sequence = index + 1;
      });
    }
  }

  removeSection(item) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        popup: 'large-sa-popup'
      }
    }).then((result) => {
      if (result.value) {
        this.blocked = true;
        let itemIndex = this.accordionSectionsList.findIndex(section =>
          section.SectionID == item.SectionID && section.CreatedDate == item.CreatedDate && section.UpdatedDate == item.UpdatedDate);
        this.accordionSectionsList[itemIndex].IsActive = false;
        this.accordionSectionsList[itemIndex].Deleted = true;
        this.apphomeservice.deleteSection(item.SectionID).subscribe(result => {
          this.blocked = false;
          this.getSectionsByWarehouseId(this.SectionData.WarehouseId);
        });

        // this.apphomeservice.saveSection(this.accordionSectionsList[itemIndex]).subscribe(result => {
        // });
        Swal.fire(
          'Deleted!',
          'Your Item has been deleted.',
          'success'
        )
      }
    })
  }

  saveCompleteAppHome() {
    this.checkSectionValidation('saveCompleteAppHome');
  }

  setCurrentIndex(event) {
    this.currentToggleIndex = event.index;
  }

  checkTileExist() {

  }

  deleteCompleteAppHome() {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      width: 400,
    }).then((result) => {
      if (result.value) {
        this.blocked = true;
        this.apphomeservice.deleteAppHome(this.accordionSectionsList).subscribe(result => {
          this.appHomeDeleted = true;
          this.blocked = false;
          this.accordionSectionsList = [];
          Swal.fire('App Home Deleted');
        });
      }
    });
  }

  publishCompleteAppHome() {
    this.checkSectionValidation('publishCompleteAppHome');
  }

  checkSectionValidation(action) {

    let invalidTiles = [];
    this.accordionSectionsList.forEach((item, index) => {
      let invalidItems = 0;
      ;


      //debugger
      // url image code

      let startIndex = 0;
      let endIndex = 0;
      let string = 'https://uat.shopkirana.in/';
      //TileBackgroundImage
      if (item.TileBackgroundImage && (item.TileBackgroundImage.includes(this.apiURL) || item.TileBackgroundImage.includes(string))) {
        if ((item.TileBackgroundImage.includes(string))) {
          startIndex = item.TileBackgroundImage.indexOf(string);
          endIndex = startIndex + string.length;
        }
        else {
          startIndex = item.TileBackgroundImage.indexOf(this.apiURL);
          endIndex = startIndex + this.apiURL.length;
        }

        item.TileBackgroundImage = item.TileBackgroundImage.substring(0, startIndex).concat(item.TileBackgroundImage.substring(endIndex));
      }

      //TileHeaderBackgroundImage
      if (item.TileHeaderBackgroundImage && (item.TileHeaderBackgroundImage.includes(this.apiURL) || item.TileHeaderBackgroundImage.includes(string))) {
        startIndex = 0
        endIndex = 0
        if ((item.TileHeaderBackgroundImage.includes(string))) {
          startIndex = item.TileHeaderBackgroundImage.indexOf(string);
          endIndex = startIndex + string.length;
        }
        else {
          startIndex = item.TileHeaderBackgroundImage.indexOf(this.apiURL);
          endIndex = startIndex + this.apiURL.length;
        }

        item.TileHeaderBackgroundImage = item.TileHeaderBackgroundImage.substring(0, startIndex).concat(item.TileHeaderBackgroundImage.substring(endIndex));
      }









      // debugger
      item.AppItemsList.forEach(el => {

        if ((item.SectionType == "Banner" || item.SectionType == "PopUp") && el.BannerImage && el.BannerImage.includes(this.apiURL)) {
          const startIndex1 = el.BannerImage.indexOf(this.apiURL);
          const endIndex1 = startIndex1 + this.apiURL.length;
          // el.BannerImage=el.BannerImage.slice(startIndex,endIndex);
          el.BannerImage = el.BannerImage.substring(0, startIndex1).concat(el.BannerImage.substring(endIndex1));
        }

      })

      //flash deal excel 
      if (item.SectionSubType == 'Flash Deal') {
        item.AppItemsList.forEach(el => {
          if (el.SectionItemID || el.SectionItemID != null) {
            this.Tilevalid = true;
            this.Tilealreadysave = true;
          }
        })
      }
      //overall validation for Tile Other and Store
      if (item.SectionSubType == 'Other' || item.SectionSubType == 'Store' && item.IsTile == true) {
        if (item.WebViewUrl) {
          this.Tilealreadysave = true
        }
        else {
          this.Tilealreadysave = false
        }
      }
      //overall validation for Tile Other and Store
      if (item.SectionSubType == 'DynamicItem' && item.IsTile == true) {
        item.AppItemsList.forEach(el => {
          if (el.SectionItemID || el.SectionItemID != null && el.RedirectionUrl) {
            // this.Tilevalid=true;
            if (this.Tilevalid == true) {


              this.Tilealreadysave = true
            }
          }
          else {
            this.Tilevalid = false;
            this.Tilealreadysave = false
          }
        })
      }
      //debugger
      //overall validation
      if (item.SectionSubType != 'Flash Deal' && item.SectionSubType != 'Other' && item.SectionSubType != 'Store'
        && item.SectionSubType != 'DynamicItem' && item.IsTile == true) {
        item.AppItemsList.forEach(el => {
          if (el.SectionItemID || el.SectionItemID != null) {
            // this.Tilevalid=true;
            if (this.Tilevalid == true) {


              this.Tilealreadysave = true
            }
          }
          else {
            this.Tilevalid = false;
            this.Tilealreadysave = false
          }
        })
      }
      //overall validation for Tile section subtype
      // if(item.AppItemsList && item.AppItemsList.length>0 && item.AppItemsList  !=null || this.Tilevalid==true && item.IsTile==true){
      //   item.AppItemsList.forEach(el=>{
      //     if((el.SectionItemID || el.SectionItemID !=null && item.SectionSubType !='Other' && item.SectionSubType !='Store') && (this.Tilevalid==true)){
      //       this.Tilealreadysave=true;
      //     }
      //     else{
      //       this.Tilealreadysave=false;
      //     }
      //   })
      // }

      //   overall validation for popup
      if (item.AppItemsList && item.AppItemsList.length > 0 && item.AppItemsList != null && item.IsPopUp == true) {
        item.AppItemsList.forEach(el => {
          if ((el.SectionItemID || el.SectionItemID != null && item.SectionSubType != 'Other')) {
            if (this.popvalid == true) {
              this.Popupalreadysave = true;
            }
          }
          else {
            this.popvalid == false
            this.Popupalreadysave = false;
          }
        })
      }



      //overall validation for dynamic html
      if (item.SectionSubType == 'DynamicHtml' && item.IsBanner == true) {
        if (item.WebViewUrl) {
          this.Banneralreadysave = true
        }
        else {
          this.Banneralreadysave = false
        }
      }


      //overall validation for banner
      if (item.AppItemsList && item.AppItemsList.length > 0 && item.AppItemsList != null && item.IsBanner == true) {
        item.AppItemsList.forEach(el => {
          if ((el.SectionItemID || el.SectionItemID != null && item.SectionSubType != 'DynamicHtml' && item.SectionSubType != 'DynamicItem')) {
            //debugger
            if ((this.Bannervalid == true)) {
              this.Banneralreadysave = true;
            }
          }
          else {
            this.Bannervalid == false;
            this.Banneralreadysave = false;
          }
        })
      }
      if (item.SectionSubType == 'DynamicItem' && item.IsBanner == true) {
        item.AppItemsList.forEach(el => {
          if (el.SectionItemID || el.SectionItemID != null && el.RedirectionUrl) {
            // this.Tilevalid=true;
            if (this.Bannervalid == true) {


              this.Banneralreadysave = true
            }
          }
          else {
            this.Bannervalid = false;
            this.Banneralreadysave = false
          }
        })
      }


      if (!item.Deleted || item.Deleted == false) {
        if (item.AppItemsList.length == 0 && item.SectionSubType == 'DynamicHtml' ||
          item.SectionSubType == 'Other' && item.IsTile == true || item.SectionSubType == 'Store' && item.WebViewUrl) {

        }
        else {


          if (item.AppItemsList && item.AppItemsList.length) {
            item.AppItemsList.forEach((mainimage, index) => {
              ;
              if (!mainimage.Deleted || mainimage.Deleted == false && mainimage.Deleted != undefined && item.SectionSubType != 'Other' || item.SectionSubType != 'Store') {
                if (item.SectionSubType == 'Offer' && item.IsTile == true) {
                  if (!mainimage.TileImage || !mainimage.TileName || !mainimage.RedirectionID || !(mainimage.HasOffer && mainimage.OfferStartTime && mainimage.OfferEndTime)) {
                    invalidItems++;
                  }
                }
                if (item.SectionSubType == 'Offer' && item.IsBanner == true) {
                  if (!mainimage.BannerImage || !mainimage.BannerName || !mainimage.RedirectionID || !(mainimage.HasOffer && mainimage.OfferStartTime && mainimage.OfferEndTime)) {
                    invalidItems++;
                  }
                }
                //debugger
                if (item.SectionSubType == 'Flash Deal') {
                  if (!mainimage.TileImage || !mainimage.TileName || !mainimage.RedirectionID || !mainimage.RedirectionID || !(mainimage.OfferStartTime && mainimage.OfferEndTime) || !mainimage.MOQ || !mainimage.FlashDealQtyAvaiable || !mainimage.FlashDealSpecialPrice || !mainimage.UnitPrice || !mainimage.PurchasePrice || !mainimage.FlashDealMaxQtyPersonCanTake) {
                    invalidItems++;
                  }
                }
                //debugger

                if (item.SectionSubType != 'Flash Deal') {
                  if (mainimage.RedirectionType != 'page' && !mainimage.BannerImage && mainimage.BannerImage == '') {
                    invalidItems++;
                  }
                }
                //debugger
                let flag = 0;
                if (item.SectionSubType && item.AppItemsList) {
                  item.AppItemsList.forEach(element => {
                    // debugger
                    if (element.Active == false && element.Deleted == true) {
                      flag++;
                    }
                    else {

                    }
                  });
                  if (flag > 0) {
                    invalidItems++;
                  }
                }


                if (item.SectionSubType == 'Store' || item.SectionSubType == 'DynamicHtml') {
                  if (!item.WebViewUrl || item.WebViewUrl == null) {
                    invalidItems++;
                  }
                }

                if (item.SectionSubType == 'Slider') {
                  if (!mainimage.RedirectionType || mainimage.RedirectionType == '' || mainimage.RedirectionType == null && !mainimage.BannerImage || mainimage.BannerImage == '' || mainimage.BannerImage == undefined) {
                    invalidItems++;
                  }
                }





                if (item.IsTile == true) {

                  if (this.Tilealreadysave == false) {
                    // this.Tilevalid=false;

                    invalidItems++;
                  }
                  if (item.SectionSubType == 'Other' || item.SectionSubType == 'Store' || item.SectionSubType == 'DynamicHtml') {
                    if (!item.WebViewUrl || item.WebViewUrl == null) {
                      invalidItems++;
                    }
                  }
                  if (item.SectionSubType == 'DynamicItem') {
                    if (!mainimage.TileImage || !mainimage.RedirectionUrl) {
                      invalidItems++;
                    }
                  }
                  if (item.SectionSubType != 'Store' && item.SectionSubType != 'Flash Deal' &&
                    item.SectionSubType != 'DynamicItem' && item.SectionSubType != 'Other' && item.SectionSubType != 'Offer' && item.SectionSubType != 'DynamicHtml') {
                    if (!mainimage.TileImage || !mainimage.TileName || !mainimage.RedirectionID) {
                      invalidItems++;
                    }
                  }


                }
                if (item.IsBanner == true) {
                  if (this.Banneralreadysave == false) {

                    invalidItems++;
                  }
                  if (item.SectionSubType != 'Slider' && item.SectionSubType != 'Store' && item.SectionSubType != 'Other' &&
                    item.SectionSubType != 'DynamicHtml' && item.SectionSubType != 'DynamicItem' && mainimage.RedirectionType != 'page') {
                    if (mainimage.RedirectionType == 'Page' || mainimage.RedirectionType == 'BucketGame') {
                      if (!mainimage.BannerImage || mainimage.BannerImage == '') {
                        invalidItems++;
                      }
                    }
                    else {
                      if (!mainimage.BannerImage || !mainimage.BannerName || !mainimage.RedirectionID && mainimage.RedirectionType != 'Page' && mainimage.RedirectionType != 'BucketGame'
                        && item.SectionSubType != 'DynamicItem'
                      ) {
                        invalidItems++;
                      }
                    }
                  }
                  if (item.SectionSubType == 'Store' || item.SectionSubType == 'DynamicHtml' && mainimage.RedirectionType != 'Page') {
                    if (!item.WebViewUrl || item.WebViewUrl == null) {
                      invalidItems++;
                    }
                  }
                  if (item.SectionSubType == 'DynamicItem') {
                    if (!mainimage.BannerImage || !mainimage.RedirectionUrl) {
                      invalidItems++;
                    }
                  }

                }
                if (item.IsPopUp == true) {

                  if (this.Popupalreadysave == false) {

                    invalidItems++;
                  }

                  if (item.SectionSubType == 'Other' || item.AppItemsList.RedirectionType == 'Other') {
                    if (item.AppItemsList[0].RedirectionType == 'Other' && item.AppItemsList[0].BannerActivity && item.AppItemsList[0].BannerActivity != undefined) {

                    }
                    else {
                      invalidItems++;
                    }
                  }
                  if (item.SectionSubType == 'Video') {
                    if (!mainimage.BannerImage && !mainimage.BannerName && !item.WebViewUrl || item.AppItemsList.WebViewUrl == '') {
                      invalidItems++;

                    }
                  }
                  if (item.SectionSubType != 'Store' && item.SectionSubType != 'Flash Deal' && item.SectionSubType != 'Offer' && item.SectionSubType != 'DynamicHtml' && item.SectionSubType != 'Other' && item.SectionSubType != 'Video') {
                    if (!mainimage.BannerImage || !mainimage.BannerName || !mainimage.RedirectionID) {
                      invalidItems++;
                    }
                  }


                  // else {
                  //   invalidItems++;
                  // }

                }
              }

            }


            );
          }
          else {
            invalidItems++;
          }
        }

      }
      if (invalidItems > 0) {


        invalidTiles.push(index + 1);

      }
    });
    if (invalidTiles.length) {

      if (this.popvalid == false) {
        this.validAppHome = false;
        Swal.fire("Popup section not saved properly")
      }
      else if (this.Tilevalid == false) {
        this.validAppHome = false;
        Swal.fire("Tile section not saved properly")
      }
      else if (this.Bannervalid == false) {
        Swal.fire("Banner section not saved properly")
      }
      else {
        this.validAppHome = false;
        Swal.fire('Please Enter Valid Details for Section ->      ' + invalidTiles);
      }

    }

    else {
      // this.blocked = true;
      switch (action) {
        case 'saveCompleteAppHome': {
          // debugger      
          if (this.accordionSectionsList && this.accordionSectionsList.length > 0) {
            // debugger
            this.accordionSectionsList.forEach(element => {
              this.apphomeservice.saveSection(element).subscribe(result => {

              })
            });
          }

          this.apphomeservice.saveCompleteAppHome(this.accordionSectionsList).subscribe(result => {
            // this.blocked = false;
            this.isAppHomeSaved = true;
            Swal.fire(
              'app home saved'
            ).then((result) => {
              if (result.value) {
                this.validAppHome = true;
                this.getSectionsByWarehouseId(this.SectionData.WarehouseId);
              }
            });
          });
          break;
        }
        case 'createNewAppSection': {
          this.openpopup = true;
          break;
        }
        case 'publishCompleteAppHome': {
          Swal.fire({
            title: 'Are you sure?',
            text: 'You want to publish',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          })
            .then(
              (result) => {

                if (result.value) {
                  this.apphomeservice.publishCompleteAppHome(this.accordionSectionsList).subscribe(result => {
                    Swal.fire(
                      'app home published'
                    )
                    // this.blocked = false;
                  });
                }
              }
            )



          break;
        }

      }

    }

  }

  openAcc(i) {
    this.accordionSectionsList[i].itemOpen = true;

  }

  closeAcc(i) {

    this.accordionSectionsList[i].itemOpen = false;
  }

  disablePublish(disableAppHomePublish) {
    this.isAppHomeSaved = false;
  }

  resetAppHome() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Reset'
    }).then((result) => {
      if (result.value) {
        this.SectionData.AppType = '';
        this.SectionData.WarehouseId = null;
        this.accordionSectionsList = [];
        this.getSectionsByWarehouseId(this.SectionData.WarehouseId);
      }
    });
  }

  closeAllMobilePopups() {
    this.accordionSectionsList.forEach(item => {
      if (item.IsPopUp == true) {
        item.AppItemsList.forEach(item => {
          item.displayPopup = false;
        });
      }
    });
  }

  closeMobilePopups(i, j) {
    this.accordionSectionsList[i].AppItemsList[j].displayPopup = false;
  }

  resetState() {
    this.accordionSectionsList.forEach(item => {
      if (item.IsPopUp == true) {
        window.location.reload();
        item.AppItemsList.forEach(item => {
          item.displayPopup = true;
        });
      }
    });
  }

  openClonePopup() {
    this.openclonepopup = true;
    this.cloneSectionData = { appTypefrom: this.SectionData.AppType, wIdfrom: this.SectionData.WarehouseId, appType: null, wId: null };
  }

  cloneAppHome() {
    // this.blocked = true;
    this.apphomeservice.cloneAppHome(this.cloneSectionData).subscribe(result => {
      Swal.fire(
        'app home cloned'
      )
      // this.blocked = false;


    });
  }

  clearBanner() {

    this.accordionSectionsList.AppItemsList = [];
    this.accordionSectionsList.SectionSubType = '';
    this.getSectionsByWarehouseId(this.SectionData.WarehouseId);
  }


  showSuccess(Msg: string) {
    this.msg.add({ severity: 'success', summary: Msg, detail: 'Message Content' });
  }

  title: boolean;
  // popval:boolean
  popvalid: boolean = true
  onpoploaded(eventData: { title: boolean }) {

    this.popvalid = eventData.title;

    // this.popvalid = this.popvalid.concat({
    //   title: eventData.title,
    // });
  }


  // Tileval:boolean
  Tilevalid: boolean = true;

  onTileloaded(eventData: { title: boolean }) {

    this.Tilevalid = eventData.title;


  }


  Bannervalid: boolean = true;
  onbannerloaded(eventData: { title: boolean }) {

    this.Bannervalid = eventData.title;
  }


  getviewType(e) {

    if (this.data.SectionSubType == 'Video') {

      this.data.ViewType = "WebView";
    }
    else {
      this.data.ViewType = "AppView";
    }
  }
}