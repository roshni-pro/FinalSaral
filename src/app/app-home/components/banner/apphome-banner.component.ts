import { filter } from 'rxjs/operators';
import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ContentChildren, ViewChild, DoCheck, AfterContentChecked,ElementRef  } from '@angular/core';
import { ItemService } from 'app/shared/services/item.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { SectionItem } from 'app/app-home/SectionItem';
import { AppHomeService } from './../../../shared/services/appHome.service';
import { LOADIPHLPAPI } from 'dns';
import { DomSanitizer } from '@angular/platform-browser';
// import { element } from 'protractor';
// import { Element } from '@angular/compiler';

import { environment } from 'environments/environment';


@Component({
  selector: 'apphome-banner',
  templateUrl: './apphome-banner.component.html',
  styleUrls: ['./apphome-banner.component.scss']
})
export class AppHomeBannerComponent implements OnInit, OnChanges {
  
  @Input() item: any;
  @Input() indexOfItem: any;
  @Input() BaseCategories: any;
  @Input() categorys: any;
  @Input() subsubcats: any;
  @Input() Items: any;
  @Output() addNewSection = new EventEmitter();
  @Output() addSection = new EventEmitter();
  @Output() refreshAppHome = new EventEmitter();
  @Output() removeBanner = new EventEmitter();
  @Output() disablePublish = new EventEmitter();
  @Output() clearMobileBanner = new EventEmitter<any>();
  @Input() showMobileView: any;
  @Input() itemOpen: any;
  @Input() currentToggleIndex: any;
  @Input() WarehouseId: any;
  @Input() subcategory: any;
  @Output() IsBannerValid=new EventEmitter<{ title: boolean }>();

  BannerValid: boolean;

  
  // ---------
  @ViewChild('myInput', null) fileUploader: ElementRef;
  @ViewChild('myInput2', null) fileUploader2: ElementRef;

  public imagePath;
  currentItemIndex: any;
  display: boolean = false;
  currentAppItem: any;
  SectionData = {
    WarehouseId: '',
    AppType: ''
  };
  accordionSectionsList: any;
  file: any;
  count = 1;
  bannerItem = new SectionItem();
  invalidItemArray = [];
  activeItemsLength = 0;
  apiURL: string;
  cloudUrl: string;

  constructor(private itemService: ItemService, private apphomeservice: AppHomeService, private dom: DomSanitizer) {
    this.bannerItem.BannerName = 'New Banner Item' + this.count;
    this.currentAppItem = {};
    this.BannerValid=true;
    this.apiURL = environment.apiURL;
    this.cloudUrl='https://res.cloudinary.com';
    this.onCheckComplete();
  }

  ngOnInit() {
    console.log(this.item); 
    if(this.item && this.item.AppItemsList.length>0){
      this.item.AppItemsList.forEach(element => {
        if(element.SectionItemID && element.SectionItemID !=null){
          this.enableSave=false;
        }
        else{
          this.enableSave=true;
        }
      });
      this.item.AppItemsList.forEach(element => {
        if(element.BannerImage && (!(element.BannerImage.includes(this.apiURL)) && !(element.BannerImage.includes('https://res.cloudinary.com')) )){
          element.BannerImage=this.apiURL+element.BannerImage
        }
        if (element.DynamicHeaderImage && (!(element.DynamicHeaderImage.includes(this.apiURL)) && !(element.DynamicHeaderImage.includes('https://res.cloudinary.com')))) {
          element.DynamicHeaderImage = this.apiURL + element.DynamicHeaderImage
        }
      });
      console.log(this.item); 
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
      this.item.AppItemsList.forEach(item => {
        // item.OfferStartTime = new Date(item.OfferStartTime);
        // item.OfferEndTime = new Date(item.OfferEndTime);
      });
    }
    this.bannerItem.RedirectionType = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Slider' ? 'null' : this.item.SectionSubType;
    if (this.item.SectionSubType != 'Slider') {
      this.activeItemsLength = this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false) ?
        this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false).length : '';
    }

    
    if (this.item.AppItemsList) {
      this.item.AppItemsList.forEach(element => {
        if (element.BannerName && element.BannerImage && this.item.SectionSubType != "Slider") {
          this.disableEdit = true;
        }
        else if (element.BannerName && element.BannerImage && this.item.SectionSubType == "Slider") {
          this.disableEdit = false;
        }
      });

    }
   

    if (this.item.SectionSubType == 'DynamicHtml' && this.item.AppItemsList == '' || !this.item.AppItemsList) {
      this.item.WebViewUrl = this.item.WebViewUrl
    }



  }

  othervar: any = [{
    value: 'games', Label: 'Game'},
  {value: 'Bucket Game', Label: 'Bucket Game'},
  {value: 'referral', Label: 'Referral'},
  {value: 'hotdeal', Label: 'Hot deals'},
  { value: 'prime', Label: 'Prime' },
  { value: 'target', Label: 'Target' },
  { value: 'shoppingcart', Label: 'shoppingcart' },
  { value: 'category', Label: 'category' },
  { value: 'tradeoffer', Label: 'tradeoffer' },
  { value: 'allbrands', Label: 'allbrands' },
  { value: 'myorder', Label: 'myorder' },
  { value: 'freebies', Label: 'freebies' },
  { value: 'direct', Label: 'direct' },
  { value: 'ExternalURL', Label: 'ExternalURL' },
  {value: 'clearance', Label: 'Clearance'},
  {value: 'None', Label: 'None'}

  ]



  onCheckComplete() {
    
    this.IsBannerValid.emit({ title: this.BannerValid });
  }

  refreshAppHomes(WId) {
    this.refreshAppHome.emit(WId);
  }
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
      this.disablePublish.emit(true);
      
      if (result.value) {
        


        if(this.item.AppItemsList){
          this.item.AppItemsList.forEach(element => {
            if(element.SectionItemID || element.SectionItemID!=null){

              this.apphomeservice.deleteSectionItem(this.item.SectionID, this.item.AppItemsList[index].SectionItemID).subscribe(res => {
             
                this.refreshAppHomes(this.item.WarehouseID);
              })
            }
            else{

              this.item.SectionSubType == "DynamicHtml" ? this.item.WebViewUrl = "" : this.item.WebViewUrl;
              // this.item.SectionSubType == "Other" ? this.ifUploaded = false : this.ifUploaded = true;
              this.item.AppItemsList[index].Deleted = true;
              // this.item.AppItemsList[index].Active = false;  
             // this.currentAppItem.BannerImage = '';
              //this.imageSrc = '';
				this.reset();
              }
            
          });
          if (this.item.SectionSubType != 'Slider') {
            // this.item.AppItemsList= this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false) ?
            //   this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false).length : '';
            this.item.AppItemsList = this.item.AppItemsList.filter(item => !item.Deleted || item.Deleted == false);
            this.activeItemsLength=0
            this.enableSave = false;
          }
          else{
            this.item.AppItemsList = this.item.AppItemsList.filter(item => !item.Deleted || item.Deleted == false);
            
          }
        }
          // this.item.TileBackgroundImage = '';
          // this.item.HasBackgroundImage = false;
          // this.item.HasBackgroundColor = false;
          // this.item.TileHeaderBackgroundImage = '';
          // this.item.HasHeaderBackgroundImage = false;
          // this.item.HasHeaderBackgroundColor = false;
          // this.item.TileAreaHeaderBackgroundImage = '';
          // this.item.sectionBackgroundImage = '';
          // this.item.AppItemsList.TileSectionBackgroundImage = '';
          // this.item.TileSectionBackgroundImage = '';
          // this.currentAppItem.TileSectionBackgroundImage = '';

        
        }
        });

    this.disablePublish.emit(false);
  }

  RBSection(SectionID) {
    this.addSection.emit(SectionID);
    let appItemInvalidArray = [];
    let appItemInvalidCount = 0;
    if (this.item.AppItemsList && this.item.AppItemsList.length > 0) {
      this.item.AppItemsList.forEach(appItem => {
        if (!appItem.Deleted) {
          if (!appItem.RedirectionType || !appItem.RedirectionID || (appItem.HasOffer && appItem.OfferEndTime.setHours(0, 0, 0, 0) == appItem.OfferStartTime.setHours(0, 0, 0, 0))) {
            appItemInvalidCount++
            appItemInvalidArray.push(appItem.BannerName)
            this.disablePublish.emit(true);
          }
        }
      });
      appItemInvalidCount > 0 ?
        Swal.fire('Please Fill Complete Details for ' + appItemInvalidArray) :
        this.addSection.emit(SectionID);
    }
    this.disablePublish.emit(false);
  }


  imageSrc: string;
  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      }
    }
  }







  uploadBackground(file: File[], imgUploadType, j?) {
    
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.onuploadBackground(imgUploadType, j);
    }
    (success) => {
      alert("image uploaded successfully")
      this.onuploadBackground(imgUploadType, j);
    };
    this.disablePublish.emit(false);


  }

  onuploadBackground(imgUploadType, j?) {
    
    let singleItem = j;
    let formData = new FormData();
    formData.append('file', this.file[0])

    this.itemService.uploadImage(0, formData).subscribe(result => {

      if (imgUploadType) {
        switch (imgUploadType) {
          case 'TileBackgroundImage': {

            this.item.TileBackgroundImage = result;
            this.item.HasBackgroundImage = true;
            this.item.HasBackgroundColor = false;
            // this.apphomeservice.saveSection(this.item).subscribe(result => {
            // });
            break;
          }
          case 'TileHeaderBackgroundImage': {
            this.item.TileHeaderBackgroundImage = result;
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
            this.item.sectionBackgroundImage = result;
            this.item.AppItemsList.TileSectionBackgroundImage = this.item.sectionBackgroundImage;
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

          default: {
            break;
          }
        }
      }
      else {
        this.currentAppItem.TileImage = result;
      }
    })
    this.disablePublish.emit(false);
  }







  upload(file: File[], i, j) {
    //debugger
   if (file[0].size < 1000000){
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      
      this.onUpload(i,j);
    }
    (success) => {
      alert("image uploaded successfully")
      this.onUpload(i,j);
    };
    this.disablePublish.emit(false);
   }
   else{
    alert('Select Image size less than 1MB!!!');
    this.reset();
    
   }
   
  }
  
  
  isUploaded: boolean;
  ifUploaded: boolean = false;
  RealFilePath:string='';
  onUpload(i,j) {
    
    this.ifUploaded = false;
    let formData = new FormData();
    formData.append('file', this.file[0])
    this.itemService.uploadImage(0, formData).subscribe(result => {
      //  this.currentAppItem.BannerImage = result;
      console.log(result);
      this.RealFilePath=result;
      // let substring='https:';
      console.log(); 
      if(i=='DynamicItem'){
        if((!(result.includes(this.apiURL)))&& !(result.includes(this.cloudUrl))){
          this.currentAppItem.DynamicHeaderImage=this.apiURL+result;
        }
        else{
          this.currentAppItem.DynamicHeaderImage=result;
        }     
      }
      else{
        if((!(result.includes(this.apiURL)))&& !(result.includes(this.cloudUrl)) ){
          this.imageSrc=result;
          this.currentAppItem.BannerImage = this.apiURL+result;
          console.log(this.imageSrc);
        }
        else{
          this.currentAppItem.BannerImage=result;
        }
        this.isUploaded = true
        // this.imageSrc = result;
        // this.currentAppItem.BannerImage = result;
        this.ifUploaded = true;
        this.item.AppItemsList[j].BannerImage = result;
      }
     
      
     
    },
      err => {
        this.ifUploaded = false;
      }
    )
    this.disablePublish.emit(false);
  }

  createNewSection() {
    this.addNewSection.emit(true);
    this.disablePublish.emit(false);
  }

  createNewBannerItem() {
    
    // this.reset();
    this.onLoadButtonDisable = true;
    if (this.checkInvalidTileItem() == false) {
      let bannerItemData = new SectionItem();
      bannerItemData.BannerName = 'New Banner Item' + this.count;
      if (this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal') {
        bannerItemData.HasOffer = true;
      }
      bannerItemData.RedirectionType = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Slider' ? 'null' : this.item.SectionSubType;
      this.bannerItem.RedirectionType = this.item.SectionSubType;
      this.item.AppItemsList.push(bannerItemData);
      this.reset()
      Swal.fire('Banner Item Created');

    }
    else {
      Swal.fire('Please Fill Valid Details for Item' + this.invalidItemArray);
      this.invalidItemArray = [];
    }
    if (this.item.SectionSubType != 'Slider') {
      this.activeItemsLength = this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false) ?
        this.item.AppItemsList.filter(itm => !itm.Deleted || itm.Deleted == false).length : '';
    }
    this.disablePublish.emit(false);

  }



  checkInvalidTileItem() {
    
    let invalidItems = 0;
    this.item.AppItemsList.forEach((mainimage, index) => {
      if (!mainimage.Deleted || mainimage.Deleted == false) {

        if (this.item.SectionSubType != 'Slider') {
          if (!mainimage.BannerImage || !mainimage.BannerName || !mainimage.RedirectionID) {
            invalidItems++;
            this.invalidItemArray.push(index + 1 + '  ')
          }
        }
        else {
          if (!mainimage.BannerImage || mainimage.BannerImage == '') {
            invalidItems++;
            this.invalidItemArray.push(index + 1 + '  ')
          }
        }
      }
    });
    if (invalidItems > 0) {
      this.item.invalidItem = true;
      Swal.fire('Please Fill Valid Details');
      return true;
    }
    else {
      this.item.invalidItem = false;
      return false;
    }
  }

  setBannerItemName(bannerItem?) {
    // debugger;
    this.disablePublish.emit(false);
    if (this.item.SectionSubType == "Slider" && this.currentAppItem.RedirectionType == "Other") {
      this.currentAppItem.ImageLevel = 1;
    }
    if(this.item.SectionSubType == "Other"){
      this.currentAppItem.ImageLevel = 1;
    }
    if (this.item.SectionSubType == 'DynamicHtml' && this.item.SectionType == "Banner") {
      this.currentAppItem = [];
    }

    else {
      if (this.currentAppItem.RedirectionType == 'Item' || this.currentAppItem.RedirectionType == 'Brand' || this.currentAppItem.RedirectionType == 'Base Category'
        || this.currentAppItem.RedirectionType == 'Category' || this.currentAppItem.RedirectionType == 'SubCategory' || this.currentAppItem.RedirectionType == 'Offer'
        || this.currentAppItem.RedirectionType == 'Slider') {
        this.currentAppItem.ImageLevel = '1';
      }

      this.currentAppItem.BannerName = this[bannerItem.arrayName].filter(item => item[bannerItem.nameOfId] == bannerItem.redirectionId)[0][bannerItem.catName];


      // if(!this.ifUploaded){
      //   this.currentAppItem.BannerImage = this[bannerItem.arrayName].filter(item => item[bannerItem.nameOfId] == bannerItem.redirectionId)[0][bannerItem.imageName];
      // }

      // if (this.item.SectionSubType == 'Other' && this.ifUploaded) {
      //   this.currentAppItem.BannerImage = this.imageSrc
      // }
      // else {
      //    this.currentAppItem.BannerImage = this[bannerItem.arrayName].filter(item => item[bannerItem.nameOfId] == bannerItem.redirectionId)[0][bannerItem.imageName];
      // }

     

     
//debugger;
      if(bannerItem.imageName){
      var key=  this[bannerItem.arrayName].filter(item => item[bannerItem.nameOfId] == bannerItem.redirectionId)[0][bannerItem.imageName];
      var exist=false;
      if(bannerItem.arrayName=='categorys'){
        this.categorys.forEach(e=>{
          if(e.LogoUrl==this.currentAppItem.BannerImage && this.currentAppItem.BannerImage!=undefined){
            exist=true;
          }
        })
      }
      if(bannerItem.arrayName=='BaseCategories'){
        this.BaseCategories.forEach(e=>{
          if(e.LogoUrl==this.currentAppItem.BannerImage && this.currentAppItem.BannerImage!=undefined){
            exist=true;
          }
        })
      }
      if(bannerItem.arrayName=='Items'){
        this.Items.forEach(e=>{
          if(e.LogoUrl==this.currentAppItem.BannerImage && this.currentAppItem.BannerImage!=undefined){
            exist=true;
          }
        })
      }
      if(bannerItem.arrayName=='subcategory'){
        this.subcategory.forEach(e=>{
          if(e.LogoUrl==this.currentAppItem.BannerImage && this.currentAppItem.BannerImage!=undefined) {
            exist=true;
          }
        })
      }
      if(bannerItem.arrayName=='subsubcats'){
        this.subsubcats.forEach(e=>{
          if(e.LogoUrl==this.currentAppItem.BannerImage && this.currentAppItem.BannerImage!=undefined){
            exist=true;
          }
        })
      }
      if(key!=this.currentAppItem.BannerImage && this.currentAppItem.BannerImage!="" && this.currentAppItem.BannerImage!=undefined && exist==false){this.ifUploaded=true;}
      this.imageSrc= this.ifUploaded ?this.currentAppItem.BannerImage:null;
      }
      



      //CHANGE IMAGE 
      if (!this.ifUploaded) {
        this.currentAppItem.BannerImage = this[bannerItem.arrayName].filter(item => item[bannerItem.nameOfId] == bannerItem.redirectionId)[0][bannerItem.imageName];
        console.log(this.currentAppItem.BannerImage)
      }

      if (this.ifUploaded) {
        this.currentAppItem.BannerImage = this.imageSrc;
        if(!(this.currentAppItem.BannerImage.includes(this.apiURL)) && !(this.currentAppItem.BannerImage.includes('https://res.cloudinary.com'))){
          this.currentAppItem.BannerImage = this.apiURL+this.imageSrc;
        }
        console.log(this.currentAppItem.BannerImage)

      }
      else {
        this.currentAppItem.BannerImage = this[bannerItem.arrayName].filter(item => item[bannerItem.nameOfId] == bannerItem.redirectionId)[0][bannerItem.imageName];
        console.log(this.currentAppItem.BannerImage)
      }


    }




  }

  handleClose(event) {
    this.disablePublish.emit(false);
    this.deleteItem(this.item.AppItemsList[event.index].SectionItemID);
  }

  showDialog(j) {
    //
    this.BannerValid=false;
    this.onCheckComplete();
    this.disablePublish.emit(false);
    this.display = true;
    this.currentAppItem = new SectionItem(this.item.AppItemsList[j]);
    this.currentItemIndex = j;
  }


  onSaveValidation(currentAppItem) {
   
   

   //  debugger
      if(currentAppItem.RedirectionType && this.item.SectionSubType!='Slider' && this.item.SectionSubType!='Other' && this.item.SectionSubType!='BucketGame' &&
      this.item.SectionSubType!='DynamicItem'
      ){
         if(!currentAppItem.RedirectionID){
            Swal.fire("select Redirection type details")
            this.display=true;
          }
          else if(currentAppItem.RedirectionID && !currentAppItem.BannerImage){
            Swal.fire("select Redirection type Image")
            this.display=true;
          }
        else{
          this.Items=this.allItems;
          this.save(currentAppItem);
            }
      }

      else if( currentAppItem.RedirectionType=='Other'){
        if(!currentAppItem.BannerActivity){
          Swal.fire("select banner activity  details")
          this.display=true;
        }
        if(!currentAppItem.BannerImage){
          Swal.fire("select banner Image")
          this.display=true;
        }
        else{
          this.Items=this.allItems;
          this.save(currentAppItem);
            }
      }

      else if(this.item.SectionSubType =='DynamicItem' )
        {
          if(!currentAppItem.BannerImage ){
            Swal.fire("Select Banner image")
            this.display=true;
          }
          else if( !currentAppItem.RedirectionUrl){
            Swal.fire("Enter redirection url!")
            this.display=true;
          }
          else{
            this.Items=this.allItems;
            this.save(currentAppItem);
              }
        }

      else if(!currentAppItem.RedirectionType && this.item.SectionSubType !='DynamicHtml' && this.item.SectionSubType !='DynamicItem'){
              if(currentAppItem.BannerImage ||currentAppItem.BannerImage!=null ){}
              else{
                    Swal.fire("Select Banner image")
                    this.display=true;
              }
            }

//&& (this.item.SectionSubType =='Other' && 
//currentAppItem.RedirectionType=='Page' && currentAppItem.BannerActivity !='Bucket Game' )
      else if ((!currentAppItem.RedirectionID && !currentAppItem.BannerImage && this.item.SectionSubType != 'DynamicHtml')  ) {
            Swal.fire("Please fill valid details. ");
            this.display=true;
            }
       else if((this.item.SectionSubType =='Other' && currentAppItem.RedirectionType=='Page' && currentAppItem.BannerActivity =='Bucket Game' && currentAppItem.RedirectionUrl ==null  || !currentAppItem.BannerImage)&& this.item.SectionSubType !='DynamicHtml' ){
              Swal.fire("Please fill valid details. ");
              this.display=true;
            }
    else {
      this.Items=this.allItems;
      this.save(currentAppItem);
    }

  }




  flag: number = 0;
  enableSave: boolean = false;
  disableSelect: boolean = true;
  onLoadButtonDisable = false;


  save(currentAppItem) {
    
//other validation
// debugger
if(this.item.SectionSubType=='Other' ){
  if(!currentAppItem.BannerActivity || currentAppItem.BannerActivity=='' ){
    Swal.fire("select banner activity");
    this.display=true;
    return false;
  }
  else{
    this.display=false;
  }
}  


//dynamichtml validation
    if(this.item.SectionSubType=='DynamicHtml' ){
      if(!this.item.WebViewUrl ||this.item.WebViewUrl ==''){
        Swal.fire("Enter valid Url");
        this.display=true;
        return false;
      }
      else{
        this.display=false;
      }
    }  

    if (currentAppItem.HasOffer == true || currentAppItem.HasOffer == false || currentAppItem.HasOffer == undefined) {

      if (currentAppItem.HasOffer == true) {
        if (!currentAppItem.OfferStartTime || currentAppItem.OfferStartTime == '' || currentAppItem.OfferStartTime == undefined) { Swal.fire('Please Fill offer Start Date'); this.display = true; return false; }
        if (!currentAppItem.OfferEndTime || currentAppItem.OfferEndTime == '' || currentAppItem.OfferEndTime == undefined) { Swal.fire('Please Fill offer End Date'); this.display = true; return false; }

      }

      if(currentAppItem.HasOffer == true ){
        if(currentAppItem.OfferStartTime && currentAppItem.OfferEndTime){

          currentAppItem.OfferStartTime = currentAppItem.OfferStartTime ? moment(currentAppItem.OfferStartTime).format('MM/DD/YYYY HH:mm:ss') : null
          currentAppItem.OfferEndTime = currentAppItem.OfferEndTime ? moment(currentAppItem.OfferEndTime).format('MM/DD/YYYY HH:mm:ss') : null
        }
      }


      if (this.item.SectionSubType == 'Slider' && currentAppItem.RedirectionType == 'Other' && this.currentAppItem.BannerActivity == 'ExternalURL') {
        this.currentAppItem.RedirectionUrl = this.currentAppItem.RedirectionUrl;
      }
      if (this.item.SectionSubType == 'Slider' && this.currentAppItem.RedirectionType == 'Other') {
        this.item.SectionName = 'Activity';
      }

      if (this.item.SectionSubType == 'DynamicHtml') {
        currentAppItem = [];
        this.item.RowCount = 1;
      }

      
      this.enableSave = true;
      this.item.AppItemsList[this.currentItemIndex] = currentAppItem;




      this.currentAppItem = new SectionItem();
      this.currentAppItem.RedirectionID = 'null'
      this.currentAppItem.RedirectionType = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Flash Deal' ? 'Item' : this.item.SectionSubType;
      // alert(this.currentAppItem.RedirectionType)
      this.item.SectionSubType == 'Offer' ? this.currentAppItem.HasOffer = true : '';
      this.display = false;
      
    }



  }

  disableEdit: boolean = false;
  saveSectionItem() {
    // this.item.AppItemsList[this.currentItemIndex] = currentAppItem;
    // this.bannerItem.RedirectionType = this.item.SectionSubType;
    // this.currentAppItem = new SectionItem();
    // this.currentAppItem.BannerName = 'New Banner Item' + this.count;
    // this.currentAppItem.RedirectionID = 'null';
    // this.currentAppItem.RedirectionType = this.item.SectionSubType == 'Offer' || this.item.SectionSubType == 'Slider' ? 'null' : this.item.SectionSubType;

    //debugger
    this.flag = 0;
    this.item.AppItemsList.forEach(element => {
      if (!element.BannerName && this.item.SectionSubType != 'DynamicHtml') {
        Swal.fire('Please Fill Valid Details');
        return false;
      }
      else { this.flag++; }
    });


    
  //  url image code
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
              element.BannerImage = element.BannerImage.substring(0, startIndex).concat(element.BannerImage.substring(endIndex));

            } 
            else if(element.BannerImage.includes(this.apiURL)){
              startIndex = element.BannerImage.indexOf(this.apiURL);
              endIndex = startIndex + this.apiURL.length;
              element.BannerImage = element.BannerImage.substring(0, startIndex).concat(element.BannerImage.substring(endIndex));

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
            else if(element.DynamicHeaderImage.includes(this.apiURL)) {
              startIndex = element.DynamicHeaderImage.indexOf(this.apiURL);
              endIndex = startIndex + this.apiURL.length;
              element.DynamicHeaderImage = element.DynamicHeaderImage.substring(0, startIndex).concat(element.DynamicHeaderImage.substring(endIndex));
            }
            else{}
          }
    });
//end of code


    // if(this.item.SectionSubType=='DynamicHtml'){
    //   this.currentAppItem=[];
    // }


    if (this.item.ColumnCount >= 0 && this.flag == this.item.AppItemsList.length) {
      
      this.apphomeservice.saveSection(this.item).subscribe(result => {
        this.item = result;
       
        this.BannerValid=true;
        this.onCheckComplete()
        this.enableSave = false;
        this.disableSelect = false;
        this.onLoadButtonDisable = false;
        // 
        this.refreshAppHomes(this.item.WarehouseID);
        this.disableEdit = true;
        Swal.fire(
          'Saved!',
          'Your Item has been Saved.',
          'success'
        )
      });
    }
    else {
      this.checkInvalidTileItem();
    }

  }
  fitems = [];
  filterItems(str: string) {
    
    if (typeof str === 'string') {
      this.Items = this.fitems.filter(a => a.toLowerCase().startsWith(str.toLowerCase()))
    }
  }





  disableImageSelection(imgUploadType, j) {

    this.disablePublish.emit(false);
    let formData = new FormData();
    switch (imgUploadType) {
      case 'TileBackgroundImage': {
        this.item.TileBackgroundImage = '';
        this.item.HasBackgroundImage = false;
        this.item.HasBackgroundColor = true;
        // this.apphomeservice.saveSection(this.item).subscribe(result => {
        // });
        break;
      }
      case 'TileHeaderBackgroundImage': {
        this.item.TileHeaderBackgroundImage = '';
        this.item.HasHeaderBackgroundImage = false;
        this.item.HasHeaderBackgroundColor = true;
        // this.apphomeservice.saveSection(this.item).subscribe(result => {
        // });
        break;
      }
      case 'TileAreaHeaderBackgroundImage': {
        this.item.TileAreaHeaderBackgroundImage = '';
        // this.apphomeservice.saveSection(this.item).subscribe(result => {
        // });
        break;
      }
      case 'sectionBackgroundImage': {
        this.item.sectionBackgroundImage = '';
        // this.apphomeservice.saveSection(this.item).subscribe(result => {
        // });
        break;
      }
      case 'tileTextColor': {

        // this.apphomeservice.saveSection(this.item).subscribe(result => {
        // });
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }


  photoURL(imageUrl) {
    let thing = this.dom.bypassSecurityTrustResourceUrl(imageUrl);
    return thing;
  }

  reset(imgUploadType?: any) {
    // 
  
   
    // document.getElementById("filUpload") = "";

    if (imgUploadType == 'DynamicItem') {
      this.currentAppItem.DynamicHeaderImage = null
      this.fileUploader2.nativeElement.value ? this.fileUploader2.nativeElement.value = null : null;

    }
    else {
      this.ifUploaded = false
    this.imageSrc = ''
    this.imagePath = ''
   this.currentAppItem.BannerImage = ''
  //  this.currentAppItem = new SectionItem(this.item.AppItemsList[j]);
//    this.currentItemIndex = j;
// this.onCheckComplete();
    this.fileUploader.nativeElement.value = null;
    }



  }


  filteredItems:any
  allItems:any
  assignCopy(){
    debugger
    // this.filteredItems = Object.assign([], this.Items);
    this.Items=this.allItems
 }

  filterItem(value){
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


