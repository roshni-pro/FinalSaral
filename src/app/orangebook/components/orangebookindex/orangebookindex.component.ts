import { Component, OnInit } from '@angular/core';
import { OrangebookversionService } from 'app/shared/services/orangebookversion.service';
import { json } from 'd3';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-orangebookindex',
  templateUrl: './orangebookindex.component.html',
  styleUrls: ['./orangebookindex.component.scss']
})
export class OrangebookindexComponent implements OnInit {

  OBVersionList: any;
  list: any;
  OBVersionListnew: any[];
  subcatList: any[];
  selectedRowDetails: any;
  selectedRow: any;
  isDetails: boolean;
  url: string;
  roleName: string;
  roleList: string[];
  IsUpload: boolean;
  OBActiveVersion: any[];
  popupdata: any;
  isOpenPopup: boolean;
  itemdatass: any[];
  entity: string;
  entityID: number;
  OBVersionHistory: any[];
  cols: { field: string; header: string; }[];
  isUploadPopup: boolean;
  file: File[];
  IsExtension: boolean;
  imagePath: File[];
  OrangeBook: any;
  blocked: boolean;
  FilePath: any;
  catid: any;
  subcatid: any;
  apptype: any;
 // messageService: any;
  isUploadedpdf: any;
  OBVersionNew: string | Blob;
  IsCategory: boolean;
  isPDF: any;
  path: string;
  src: string;
  IsFrame: boolean;
  safeSrc: SafeResourceUrl;
  selectedcat: {};
  selectedsubcat: {};
  cat: any;
  subcat: any;
  ver: any;
  IsAccept: any;
  versionaccept: any;

  constructor(
    private orangebookversionservice: OrangebookversionService,private messageService: MessageService,
    private router: Router, private sanitizer: DomSanitizer) {
    this.list = [];
    this.subcatList = [];
    this.url = this.orangebookversionservice.apiURL + '/OrangeBook/';
    this.IsUpload = false;
  }

  ngOnInit() {

    this.cols = [
      // { field: 'Id', header: 'Id' },
      { field: 'Version', header: 'Version' },
      { field: 'FilePath', header: 'File Path' },
      { field: 'IsActive', header: 'Is Active' },
      { field: 'CreatedDate', header: 'Created Date' },
      { field: 'ModifiedDate', header: 'Modified Date' }
    ];
    this.isDetails = false;
    this.orangebookversionservice.OBCurrentVersion().subscribe(result => {
      console.log('OBActiveVersion : ', result);

      this.OBActiveVersion = result;
      this.entity = "Supplier";
      this.entityID = 12;
    })

    this.orangebookversionservice.obversionlistnew().subscribe(result => {
     // console.log('OBLatestVersion : ', result);
      this.OBVersionListnew = result;
      this.OBVersionListnew.sort(function(a,b){
        return a.Sequence - b.Sequence
      });
    })

    this.roleName = localStorage.getItem('role');
    this.roleList = this.roleName.split(',');


    for (var i in this.roleList) {
      console.log('Index' + i)
      if (this.roleList[i] == 'HQ Master login') {
        this.IsUpload = true;
      }
    }
  }


  readCategoryfile(category) {
    this.IsCategory = true;
    this.selectedcat = category;
    this.path = category.FilePath;
    this.src = this.url + category.FilePath;
    if (this.src != null) {
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
      this.IsFrame = true;
    }
    this.isPDF = true;
    this.cat = category.Id;
    this.subcat = 0;
    this.ver = category.Version;
    this.IsAccept = category.IsAccept;
    this.versionaccept = this.IsAccept;
   // this.UserAcceptance();
  }



  uploadCategoryfile(cat) {
    
  }
  uploadSubCategoryfile(subcat) {
    
  }

  readSubCategoryfile(subcategory) {
    this.IsCategory = false;
    this.selectedsubcat = subcategory;
    this.src = this.url + subcategory.FilePath;
    if (this.src != null) {
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
      this.IsFrame = true;
    }
    this.isPDF = true;
    this.cat = subcategory.CategoryID;
    this.subcat = subcategory.Id;
    this.ver = subcategory.Version;
    this.IsAccept = subcategory.IsAccept;
    this.versionaccept = this.IsAccept;
   // this.UserAcceptance();
  }


  UserAcceptance() {
    if (this.IsCategory) {
      this.orangebookversionservice.AddODversionAcceptance(this.cat, this.subcat, this.ver).subscribe(result => {
        this.isPDF = false;
        this.messageService.add({severity:'success', summary: 'document Read Successfully!', detail:''});
        this.ngOnInit();   
      //  window.location.reload();
      })
    }
    else {

      this.orangebookversionservice.AddODversionAcceptance(this.cat, this.subcat, this.ver).subscribe(result => {
        this.isPDF = false;
        this.messageService.add({severity:'success', summary: 'document Read Successfully!', detail:''});
        this.ngOnInit();    
     //   window.location.reload();
      })

    }
  }



  openDetails(item) {
    if (this.isOpenPopup != true) {
      if (item.orangeBookSubCategory) {
        this.IsCategory = true;
        this.Name = item.CategoryName;
        this.catid = item.Id;
        this.subcatid = 0;
      }
      else {
        this.IsCategory = false;
        this.Name = item.SubCategoryName;
        this.subcatid = item.Id;
        this.catid = item.CategoryID;
      }
      this.isUploadPopup = true;
    }
  }

  isDetailsFalse(isDetails: boolean) {
    this.isDetails = isDetails;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
  }

  NewPage() {
    this.router.navigateByUrl('layout/orangebook/orangebookacceptance');
  }

  opencat(item) {
   // console.log('cat : ', item);
    var cat = item.Id;
    var subcat = 0;
    this.orangebookversionservice.obversionhistory(cat, subcat).subscribe(result => {

      console.log('OBVersionHistory : ', result);
      this.OBVersionHistory = result;

      for (var i in this.OBVersionHistory) {
        this.OBVersionHistory[i].CreatedDate = this.OBVersionHistory[i].CreatedDate ? moment(this.OBVersionHistory[i].CreatedDate).format('DD/MM/YYYY') : null
        this.OBVersionHistory[i].ModifiedDate = this.OBVersionHistory[i].ModifiedDate ? moment(this.OBVersionHistory[i].ModifiedDate).format('DD/MM/YYYY') : null
      }
    })
    this.isOpenPopup = true;
    this.isUploadPopup = false;
  }

  opensubcat(item) {
   // console.log('subcat : ', item);
    var cat = item.CategoryID;
    var subcat = item.Id;
    this.orangebookversionservice.obversionhistory(cat, subcat).subscribe(result => {
   
      this.OBVersionHistory = result;

      for (var i in this.OBVersionHistory) {
        this.OBVersionHistory[i].CreatedDate = this.OBVersionHistory[i].CreatedDate ? moment(this.OBVersionHistory[i].CreatedDate).format('DD/MM/YYYY') : null
        this.OBVersionHistory[i].ModifiedDate = this.OBVersionHistory[i].ModifiedDate ? moment(this.OBVersionHistory[i].ModifiedDate).format('DD/MM/YYYY') : null
      }
    })
    this.isOpenPopup = true;
    this.isUploadPopup = false;
  }

  Action(rowData) {
   // console.log("rowdata", rowData);
    this.popupdata = rowData;
    this.itemdatass = rowData.manualSalesDetails;
    this.isOpenPopup = true;
    this.isUploadPopup = false;

  }

  upload(file: File[]) {
    this.file = file;
    var fileExtension = file[0].name.split('.').pop();
    if (fileExtension == "pdf") {
      this.IsExtension = true;
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file[0]);
      reader.onload = (_event) => {
        this.OrangeBook= reader.result;
      }
      (success) => {
        alert("image uploaded successfully")
        //this.messageService.add({ severity: 'success', summary: 'File uploaded successfully! Please Save', detail: '' });
      };
    }
    else {

      alert("File Formate Not Accepted");
      this.IsExtension = false;
    }

  }

  uploader() {
    let formData = new FormData();
    formData.append('file', this.file[0])
    formData.append('value', this.OBVersionNew)
    this.orangebookversionservice.UploadImage(formData, this.Name).subscribe(result => {
      //console.log(result)
      this.isUploadedpdf = result.Status;
      if (this.isUploadedpdf == true) {
        this.FilePath = result.FileName;
        alert("File Sucessfully Uploaded! Please Save ");
      }
    })
  }
  Name(formData: FormData, Name: any) {
    throw new Error("Method not implemented.");
  }

  AddOrangeBookVersion() {
    
    if (this.isUploadedpdf == true) {
      this.blocked = true;
      this.orangebookversionservice.updateversion(this.FilePath, this.catid, this.subcatid).subscribe(result => {
        this.blocked = false;
        //console.log(result);
        this.apptype = result;
        alert(this.apptype.Message);
        window.location.reload();
      })
    } else {
      this.messageService.add({ severity: 'error', summary: 'Please Upload File First!', detail: '' });
    }
  }

  closeDetails(isDetails: boolean) {
    this.isUploadPopup = false;
  }
}
