import { filter } from 'rxjs/operators';
import { Component, OnInit, Input, OnChanges, EventEmitter,ElementRef, Output, ContentChildren, ViewChild, SimpleChanges, DoCheck, AfterContentChecked } from '@angular/core';
import Swal from 'sweetalert2';
import { ItemService } from 'app/shared/services/item.service';
import { Tab } from '../tabsets/tab';
import { Tabset } from '../tabsets/tabset';
import { SectionItem } from 'app/app-home/SectionItem';
import { AppHomeService } from './../../../shared/services/appHome.service';
import * as moment from 'moment';
import { environment } from 'environments/environment';
@Component({
  selector: 'apphome-popup',
  templateUrl: './apphome-popup.component.html',
  styleUrls: ['./apphome-popup.component.scss']
})

export class AppHomePopupComponent implements OnInit, OnChanges {

  @Input() item: any;
  @Input() itemOpen: any;
  @Input() indexOfItem: any;
  @Input() BaseCategories: any;
  @Input() categorys: any;
  @Input() subsubcats: any;
  @Input() Items: any;
  @Input() WarehouseId: any;
  @Output() addNewSection = new EventEmitter();
  @Output() addSection = new EventEmitter();
  @Output() removePopup = new EventEmitter();
  @Input() showMobileView: any;
  @Input() currentToggleIndex: any;
  @Output() disablePublish = new EventEmitter();
  @Output() refreshAppHome = new EventEmitter();
  @Output() IsPopupValid = new EventEmitter<{ title: boolean }>();
  @ViewChild('myInput', null) fileUploader: ElementRef;
  PopupValid: boolean;
  apiURL:string;

  activeItemsLength = 0;
  SectionData = {
    WarehouseId: '',
    AppType: ''
  };

  count = 1;
  accordionSectionsList: any;
  file: any;
  public imagePath;
  isUploaded: boolean;
  bannerItem = new SectionItem();

  value: Date;


  @ContentChildren(Tab) tabs;
  @ViewChild(Tabset, { static: false }) tabset !: Tabset;
  display: boolean;
  currentAppItem: any;
  currentItemIndex: any;
  invalidItemArray = [];
  othervar: any = [{
    value: 'games', Label: 'Game'
  },
  { value: 'prime', Label: 'Prime' },
  { value: 'target', Label: 'Target' },
  { value: 'shoppingcart', Label: 'shoppingcart' },
  { value: 'category', Label: 'category' },
  { value: 'tradeoffer', Label: 'tradeoffer' },
  { value: 'allbrands', Label: 'allbrands' },
  { value: 'myorder', Label: 'myorder' },
  { value: 'freebies', Label: 'freebies' },
  { value: 'direct', Label: 'direct' },
  { value: 'ExternalURL', Label: 'ExternalURL' }

  ]
  cloudUrl: string;



  constructor(private itemService: ItemService, private apphomeservice: AppHomeService) {
    this.bannerItem.BannerName = 'New Popup Item' + this.count;
    // this.onCheckComplete();
    this.PopupValid = true;
    this.apiURL=environment.apiURL
    this.cloudUrl='https://res.cloudinary.com';
  }

  ngOnInit() {
    if (this.item && this.item.AppItemsList.length > 0) {
      this.item.AppItemsList.forEach(element => {
        if (element.SectionItemID && element.SectionItemID != null) {
          this.enableSave = false;
        }
        else {
          this.enableSave = true;
        }
      });

      this.item.AppItemsList.forEach(element => {
        if(element.BannerImage && (!(element.BannerImage.includes(this.apiURL)) && !(element.BannerImage.includes('https://res.cloudinary.com')) )){
          element.BannerImage=this.apiURL+element.BannerImage
        }
      });

    }
   

    if(this.item && this.item.AppItemsList.length>0){
      this.item.AppItemsList.forEach(element => {
        if(element.HasOffer==true){
          if(element.OfferStartTime && element.OfferEndTime){
            element.OfferStartTime = element.OfferStartTime ? moment(element.OfferStartTime).format('MM/DD/YYYY HH:mm') : null
            element.OfferEndTime = element.OfferEndTime ? moment(element.OfferEndTime).format('MM/DD/YYYY HH:mm') : null                       
            
          }
        }
        else{

        }
      });
    }
    this.allItems=this.Items;
  }

  ngOnChanges(simplechanges: SimpleChanges) {


    simplechanges.subsubcats && simplechanges.subsubcats.currentValue && simplechanges.subsubcats.currentValue.length ?
      this.subsubcats = simplechanges.subsubcats.currentValue : '';

    simplechanges.Items && simplechanges.Items.currentValue && simplechanges.Items.currentValue.length ?
      this.Items = simplechanges.Items.currentValue : '';


    if (this.item && this.item.AppItemsList && this.item.AppItemsList.length) {
      // this.item.AppItemsList.forEach(item => {
      // item.OfferStartTime = new Date(item.OfferStartTime);
      // item.OfferEndTime = new Date(item.OfferEndTime);
      // });
    }


    this.activeItemsLength = this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false) ?
      this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false).length : '';
    this.bannerItem.RedirectionType = this.item.SectionSubType;


  }

  onCheckComplete() {
    
    this.IsPopupValid.emit({ title: this.PopupValid });
  }

  //calling apphome refresh 
  refreshAppHomes(WarehouseID) {
    
    this.refreshAppHome.emit(WarehouseID);
  }


  //delete accordian
  deleteItem(index) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Item will be Cleared',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {

      
      if (result.value) {

        if(this.item.AppItemsList){
          this.item.AppItemsList.forEach(element => {
            if(element.SectionItemID || element.SectionItemID!=null){
              this.apphomeservice.deleteSectionItem(this.item.SectionID, this.item.AppItemsList[index].SectionItemID).subscribe(res => {              
                this.refreshAppHomes(this.item.WarehouseID);
              })
            }
            else{
              this.item.SectionSubType == "Video" ? this.item.WebViewUrl = "" : this.item.WebViewUrl;
              this.item.AppItemsList[index].Deleted = true;
            }
          }
        )
          }
       
          this.item.AppItemsList = this.item.AppItemsList.filter(item => !item.Deleted || item.Deleted == false);
          this.activeItemsLength =this.item.AppItemsList.length;
      }
    });

    this.disablePublish.emit(false);
  }



  //save section
  SaveSection(SectionID) {
    
    this.addSection.emit(SectionID);
    let appItemInvalidArray = [];
    let appItemInvalidCount = 0;

    if (this.item.AppItemsList && this.item.AppItemsList.length > 0) {

      this.item.AppItemsList.forEach(appItem => {

        if (!appItem.Deleted) {

          if (!appItem.BannerImage || !appItem.RedirectionType || !appItem.RedirectionID || (appItem.HasOffer && appItem.OfferEndTime.setHours(0, 0, 0, 0) == appItem.OfferStartTime.setHours(0, 0, 0, 0))) {

            appItemInvalidCount++
            appItemInvalidArray.push(appItem.BannerName)

          }
        }
      });

      appItemInvalidCount > 0 ?

        Swal.fire('Please Fill Complete Details for ' + appItemInvalidArray) :
        setTimeout(() => {

          this.item.AppItemsList && this.item.AppItemsList.length == 1 &&
            this.tabset.tabs && this.tabset.tabs.last ? this.tabset.tabClicked(this.tabset.tabs.last) : '';
        }, 1000),
        this.addSection.emit(SectionID);
    }

    this.disablePublish.emit(false);
  }




  //uploade external image
  upload(file: File[], i, j) {
    if (file[0].size < 1000000){
      this.file = file;
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file[0]);
      reader.onload = (_event) => {
        this.onUpload(j);
      }
      (success) => {
        alert("image uploaded successfully")
        this.onUpload(j);
      };
      this.disablePublish.emit(false);
    }
    else{
      alert('Select Image size less than 1MB!!!');
      this.reset();
    }
   
  }


  //upload image
  ifUploaded: boolean = false;
  onUpload(j) {
    this.ifUploaded = false;
    let formData = new FormData();
    formData.append('file', this.file[0])
    this.itemService.uploadImage(0, formData).subscribe(result => {
      this.isUploaded = true

      if((!(result.includes(this.apiURL))) && !(result.includes(this.cloudUrl))){
        this.imageSrc=result;
        this.currentAppItem.BannerImage = this.apiURL+result;
        console.log(this.imageSrc);
      }
      else{
        this.currentAppItem.BannerImage=result;
      }

      // this.imageSrc = result;
      // this.currentAppItem.BannerImage = result;
      this.ifUploaded = true;
      this.item.AppItemsList[j].BannerImage = result;
    },
      err => {
        this.ifUploaded = false;
      })
    this.disablePublish.emit(false);
  }


  //create new popup item
  createNewSection() {
    this.addNewSection.emit(true);
    this.disablePublish.emit(false);
  }


  //ddrop open and close
  handleClose(event) {
    this.deleteItem(this.item.AppItemsList[event.index].SectionItemID);
    this.disablePublish.emit(false);
  }


 


  //create popup new popup
  createNewBannerItem() {
    // this.onLoadButtonDisable=true;
    if (this.checkInvalidTileItem() == false) {
      let bannerItemData = new SectionItem();
      bannerItemData.BannerName = 'New Popup Item' + this.count;
      bannerItemData.RedirectionType = this.item.SectionSubType == 'Video' || this.item.SectionSubType == 'Other' ? null : this.item.SectionSubType;
      if (this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal') {
        bannerItemData.HasOffer = true;
      }
      this.item.AppItemsList.push(bannerItemData);
      Swal.fire('Popup Item Created');
    }
    else {
      Swal.fire('Please Fill Valid Details for Item' + this.invalidItemArray);
      this.invalidItemArray = [];
    }
    this.activeItemsLength = this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false) ?
      this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false).length : '';
    this.disablePublish.emit(false);
  }




  //check validation
  checkInvalidTileItem() {
    let invalidItems = 0;
    this.item.AppItemsList.forEach((mainimage, index) => {
      if (!mainimage.Deleted || mainimage.Deleted == false) {
        if (this.item.SectionSubType != 'Offer' || this.item.SectionSubType != 'Flash Deal') {
          if (!mainimage.BannerImage || !mainimage.BannerName || !mainimage.RedirectionID) {
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
      return false;
    }
  }


  //create popup image and POPUPName ------------------payload 
  imageSrc: string;
  setBannerItemName(bannerItem) {
    this.disablePublish.emit(false);
    

    if (this.item.SectionSubType == 'Video' || this.currentAppItem.RedirectionType) {
      this.currentAppItem.ImageLevel = '1';
    }



    if (bannerItem.HasOffer == true) {
      if (!bannerItem.OfferStartTime || bannerItem.OfferStartTime == '' || bannerItem.OfferStartTime == undefined) { Swal.fire('Please Fill offer Start Date'); this.display = true; return false; }
      if (!bannerItem.OfferEndTime || bannerItem.OfferEndTime == '' || bannerItem.OfferEndTime == undefined) { Swal.fire('Please Fill offer End Date'); this.display = true; return false; }

    }

    else {


      if (this.currentAppItem.RedirectionType == 'Item' || this.currentAppItem.RedirectionType == 'Brand'
        || this.currentAppItem.RedirectionType == 'Other' || this.currentAppItem.RedirectionType == 'Video') {
        this.currentAppItem.ImageLevel = '1';
      }

      
      if (this.item.SectionSubType == 'Item' || this.item.SectionSubType == 'Brand' || this.item.SectionSubType == 'Base Category' || this.item.SectionSubType == 'Category' || this.item.SectionSubType == 'Other') {

        this.currentAppItem.ImageLevel = '1';

        if (this.currentAppItem.HasOffer == false) {
          this.currentAppItem.OfferStartTime = null;
          this.currentAppItem.OfferEndTime = null;
        }

        this.item.Active = true;
        //  this.currentAppItem.BannerName=''; 

        // else{
        // }
      }

      this.currentAppItem.BannerName = this[bannerItem.arrayName].filter(item => item[bannerItem.nameOfId] == bannerItem.redirectionId)[0][bannerItem.catName];


      // if(this.currentAppItem.RedirectionType=='Other'){
      //   this.currentAppItem.RedirectionUrl=this.currentAppItem.RedirectionUrl;
      // }

      // EXIST IMAGE

       //debugger
      if(bannerItem.imageName){
        var key=  this[bannerItem.arrayName].filter(item => item[bannerItem.nameOfId] == bannerItem.redirectionId)[0][bannerItem.imageName];
        var exist=false;
        if(bannerItem.arrayName=='categorys'){
          this.categorys.forEach(e=>{
            if(e.LogoUrl==this.currentAppItem.BannerImage){
              exist=true;
            }
          })
        }
        if(bannerItem.arrayName=='BaseCategories'){
          this.BaseCategories.forEach(e=>{
            if(e.LogoUrl==this.currentAppItem.BannerImage){
              exist=true;

            }
          })
        }
        if(bannerItem.arrayName=='Items'){
          this.Items.forEach(e=>{
            if(e.LogoUrl==this.currentAppItem.BannerImage){
              exist=true;
            }
          })
        }
        if(bannerItem.arrayName=='subsubcats'){
          this.subsubcats.forEach(e=>{
            if(e.LogoUrl==this.currentAppItem.BannerImage){
              exist=true;
            }
          })
        }
        if(key!=this.currentAppItem.BannerImage && this.currentAppItem.BannerImage!="" && this.currentAppItem.BannerImage!=undefined && exist==false){this.ifUploaded=true;}
        this.imageSrc= this.ifUploaded ?this.currentAppItem.BannerImage:null;
        }



      // IMAGE CHECK
      if (!this.ifUploaded) {
        this.currentAppItem.BannerImage = this[bannerItem.arrayName].filter(item => item[bannerItem.nameOfId] == bannerItem.redirectionId)[0][bannerItem.imageName];
      }

      if (this.ifUploaded) {
        this.currentAppItem.BannerImage = this.imageSrc
      }
      else {
        this.currentAppItem.BannerImage = this[bannerItem.arrayName].filter(item => item[bannerItem.nameOfId] == bannerItem.redirectionId)[0][bannerItem.imageName];
      }

    }

  }


  //open dialog
  showDialog(j) {
    this.PopupValid=false;
    this.onCheckComplete();
    this.disablePublish.emit(false);
    this.display = true;
    this.currentAppItem = new SectionItem(this.item.AppItemsList[j]);    
    this.currentItemIndex = j;
  }





  //particular save option
  enableSave: boolean = false;
  flag = 0;
  disableSelect: boolean = true;
  // onLoadButtonDisable:boolean=false;
  save(currentAppItem) {
    
    // if(this.currentAppItem.RedirectionType=='Other' && this.currentAppItem.BannerActivity=='ExternalURL' ){
    //   this.currentAppItem.RedirectionUrl=this.currentAppItem.RedirectionUrl;
    // }


    if (currentAppItem.HasOffer == true) {
      if (!currentAppItem.OfferStartTime || currentAppItem.OfferStartTime == '' || currentAppItem.OfferStartTime == undefined) { Swal.fire('Please Fill offer Start Date'); this.display = true; return false; }
      if (!currentAppItem.OfferEndTime || currentAppItem.OfferEndTime == '' || currentAppItem.OfferEndTime == undefined) { Swal.fire('Please Fill offer End Date'); this.display = true; return false; }
      if(currentAppItem.HasOffer == true ){
        if(currentAppItem.OfferStartTime && currentAppItem.OfferEndTime){
          currentAppItem.OfferStartTime = currentAppItem.OfferStartTime ? moment(currentAppItem.OfferStartTime).format('MM/DD/YYYY HH:mm:ss') : null
          currentAppItem.OfferEndTime = currentAppItem.OfferEndTime ? moment(currentAppItem.OfferEndTime).format('MM/DD/YYYY HH:mm:ss') : null
        }
      }

    }
    if(this.item.SectionSubType=='Video'  && this.currentAppItem.RedirectionType=='Other'|| this.item.SectionSubType=='Other'){
      if (!this.currentAppItem.RedirectionType || this.currentAppItem.RedirectionType == undefined) { Swal.fire("select redirection type");return false; } 
      if(!this.currentAppItem.BannerActivity|| this.currentAppItem.BannerActivity == undefined ) { Swal.fire("select banner activity type"); return false; }
      if (!this.currentAppItem.BannerImage || this.currentAppItem.BannerImage == '') { Swal.fire("select popup image");return false; }
    }

    if (!this.currentAppItem.RedirectionType || this.currentAppItem.RedirectionType == undefined && !this.currentAppItem.BannerImage || this.currentAppItem.BannerImage == undefined && !this.currentAppItem.RedirectionID || this.currentAppItem.RedirectionID == undefined
    && this.item.SectionSubType!='Video'&& this.item.SectionSubType!='Other') {
      if (!this.currentAppItem.RedirectionType || this.currentAppItem.RedirectionType == undefined) { Swal.fire("select redirection type") } 
      if (!this.currentAppItem.BannerImage || this.currentAppItem.BannerImage == '') { Swal.fire("select popup image") }
      if( this.currentAppItem.RedirectionType  !='Other'){
        if (!this.currentAppItem.RedirectionID || this.currentAppItem.RedirectionID == undefined ) { Swal.fire("select redirection type details") }
      }
      return false
    }

    // else if(this.currentAppItem.RedirectionType =='Other'){
    //   if (!this.currentAppItem.BannerActivity || this.currentAppItem.BannerActivity == undefined) { Swal.fire("select banner activity type") }
    //   if (!this.currentAppItem.BannerImage || this.currentAppItem.BannerImage == '') { Swal.fire("select popup image") }
    // }
    else {
      if (this.item.SectionSubType == 'Other') {
        this.currentAppItem.ImageLevel = '1';
      }
     
      this.enableSave = true;
      this.item.AppItemsList[this.currentItemIndex] = currentAppItem;
  
      this.currentAppItem = new SectionItem();
      this.currentAppItem.BannerName = 'New Popup Item' + this.count;
      this.currentAppItem.RedirectionID = 'null';
      this.currentAppItem.RedirectionType = this.item.SectionSubType == 'Video' || this.item.SectionSubType == 'Other' ? null : this.item.SectionSubType;
      this.display = false;
    }
   
  }


  //overall save popup
  saveSectionItem() {
    this.flag = 0;
    // if(this.item.SectionSubType=='Item' || this.item.SectionSubType=='Brand' ){
    //   if(this.currentAppItem.RedirectionType!='Base Category' || this.currentAppItem.RedirectionType!='Category'){

    //   }}

    if (this.item.SectionSubType == 'Other') {
      this.currentAppItem.ImageLevel = '1';
    }
    this.item.AppItemsList.forEach(element => {
      if (!element.BannerName) { alert("Fill valid item "); return false; }
      else { this.flag++; }
    });

    let startIndex=0;
    let endIndex=0;
    let string='https://uat.shopkirana.in/';
    this.item.AppItemsList.forEach(element => {
      if (  element.BannerImage && this.ifUploaded && this.imageSrc &&  this.item.SectionSubType != 'DynamicHtml' && this.item.SectionSubType !="Slider") {
        element.BannerImage=this.imageSrc;
      }
      if(this.item.SectionSubType=="Slider" && ((element.BannerImage.includes(this.apiURL))|| (element.BannerImage.includes(string)) ))
          {
            if((element.BannerImage.includes(string))){
              startIndex = element.BannerImage.indexOf(string);
              endIndex = startIndex + string.length;
            } 
            else{
              startIndex = element.BannerImage.indexOf(this.apiURL);
              endIndex = startIndex + this.apiURL.length;
            }
           
            element.BannerImage = element.BannerImage.substring(0, startIndex).concat(element.BannerImage.substring(endIndex));
          }
    });
    
    if (this.item.ColumnCount >= 0 && this.flag == this.item.AppItemsList.length) {
    


      this.apphomeservice.saveSection(this.item).subscribe(result => {
        

        this.PopupValid = true;
        this.onCheckComplete()

        this.enableSave = false;
        this.disableSelect = false;

        this.refreshAppHomes(this.item.WarehouseID);
        Swal.fire('Popup Item Saved');
        // this.onLoadButtonDisable=false;

      });
    }
    else {
      this.checkInvalidTileItem();
    }

  }



  reset() {
    this.ifUploaded = false
    this.imageSrc = ''
    this.imagePath = ''
    this.currentAppItem.BannerImage = ''
    this.fileUploader.nativeElement.value = null;
  }

  filteredItems:any
  allItems:any
  assignCopy(){
    //debugger
    // this.filteredItems = Object.assign([], this.Items);
    this.Items=this.allItems
 }

  filterItem(value){
    //debugger
    if(!value){
   this.assignCopy();
    } // when nothing has typed
    this.Items=this.allItems
    this.filteredItems = Object.assign([], this.Items).filter(
       item => item.itemname.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
    this.Items=this.filteredItems
 }

}
