import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrangebookversionService } from 'app/shared/services/orangebookversion.service';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';

@Component({
  selector: 'app-orangebookmaster',
  templateUrl: './orangebookmaster.component.html',
  styleUrls: ['./orangebookmaster.component.scss']
})
export class OrangebookmasterComponent implements OnInit {

  apptype: any;
  OBLatestVersion: any;
  NewOBVersion: any;
  OrangeBook: any;
  public imagePath;
  file: any;
  isUploaded: boolean;
  cols: any;
  versionList: any;
  url: any;
  IsExtension: boolean;
  blocked: boolean;
  OBCategory: any;
  OBSubCategory: any[];
  catid: any;
  subcatid: any;
  List = ['Page 1','Page 10', 'Page 15','Page 20'];
  constructor(private messageService: MessageService, private orangebookversionService: OrangebookversionService, private router: Router) {

    this.url = this.orangebookversionService.apiURL + '/OrangeBook/';
  }

  ngOnInit() {
    this.orangebookversionService.currentversion().subscribe(result => {
      console.log(result);
      this.OBLatestVersion = result;
      // this.apptype=result;
      console.log("mhjj")
      this.isUploaded = false;
      this.IsExtension = true;
      this.GetCategory();
      this.catid = 0;
      this.subcatid = 0;
    })
    this.cols = [
      { field: 'Version', header: 'Version' },
      { field: 'CreatedDate', header: 'CreatedDate' },
      { field: 'FilePath', header: 'FilePath' }
    ];



    this.orangebookversionService.OBversionData().subscribe(result => {
      this.blocked = false;
      this.versionList = result;
      for (var i in this.versionList) {
        this.versionList[i].CreatedDate = this.versionList[i].CreatedDate ? moment(this.versionList[i].CreatedDate).format('DD/MM/YYYY') : null

      }
    })
  }
  selectever(apptype) {

    this.orangebookversionService.currentversion().subscribe(result => {
      console.log(result);
      this.NewOBVersion = result;
      // this.apptype=result;
      console.log("mhjj")
    })
  }

  upload(file: File[]) {

    if (this.catid != 0) {
      this.file = file;
      var fileExtension = file[0].name.split('.').pop();
      if (fileExtension == "pdf") {
        this.IsExtension = true;
        var reader = new FileReader();
        this.imagePath = file;
        reader.readAsDataURL(file[0]);
        reader.onload = (_event) => {
          this.OrangeBook.LogoUrl = reader.result;
        }
        (success) => {
          //alert("image uploaded successfully")
          this.messageService.add({ severity: 'success', summary: 'File uploaded successfully! Please Save', detail: '' });
        };
      }
      else {

        alert("File Formate Not Accepted");
        this.IsExtension = false;
      }
    } else { alert("Please select Category First"); }

  }



  uploader() {
    let formData = new FormData();
    formData.append('file', this.file[0])
    formData.append('value', this.OBLatestVersion)
    this.orangebookversionService.UploadImage(formData, this.OBLatestVersion).subscribe(result => {

      console.log(result)
      this.isUploaded = result;
      if (this.isUploaded == true) {
        alert("File Sucessfully Uploaded! Please Save ");
      }

    })

  }

  GetCategory() {
    this.orangebookversionService.GetCategories().subscribe(result => {
      console.log('OBCategory : ', result);
      this.OBCategory = result;
    })
  }

  onsearch(categoryid) {

    this.catid = categoryid;
    this.orangebookversionService.GetSubCategories(categoryid).subscribe(result => {
      console.log('OBSubCategory : ', result);
      this.OBSubCategory = result;
    })
  }

  onselect(subcategoryid) {
    this.subcatid = subcategoryid;
  }

  AddOrangeBookVersion() {
    ;
    this.blocked = true;
    if (this.isUploaded == true) {
      if (!this.OBLatestVersion) {
        // alert("Please enter version .");
        this.messageService.add({ severity: 'error', summary: 'Please enter version!', detail: '' });
        return false;
      }
      console.log(this.OBLatestVersion);
      this.orangebookversionService.updateversion(this.OBLatestVersion, this.catid, this.subcatid).subscribe(result => {

        this.blocked = false;
        console.log(result);
        this.apptype = result;
        alert(this.apptype.Message);
        //this.messageService.add({ severity: 'info', summary: this.apptype.Message, detail: '' });
        this.router.navigateByUrl('layout/orangebook/orangebookmaster');
        window.location.reload();
      })
    } else {
      // alert("Please Upload File First");
      this.messageService.add({ severity: 'error', summary: 'Please Upload File First!', detail: '' });
    }
  }
}