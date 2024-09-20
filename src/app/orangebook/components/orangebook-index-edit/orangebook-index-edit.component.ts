import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrangebookversionService } from 'app/shared/services/orangebookversion.service';

@Component({
  selector: 'app-orangebook-index-edit',
  templateUrl: './orangebook-index-edit.component.html',
  styleUrls: ['./orangebook-index-edit.component.scss']
})
export class OrangebookIndexEditComponent implements OnInit {
  @Input() details: any;
  @Output() isdetailsclose = new EventEmitter<boolean>();
  @Output() refreshParent = new EventEmitter();
  @Output() deleteSelected = new EventEmitter<any>();
  file: any;
  catid: any;
  subcatid: any;
  IsExtension: boolean;
  imagePath: File[];
  OrangeBook: any;
  messageService: any;
  isUploaded: any;
  OBVersion: any;
  blocked: boolean;
  router: any;
  apptype: any;
  IsCategory:any;
  Name: any;
  FilePath: any;
  constructor(private orangebookversionservice: OrangebookversionService) {

  }

  

  ngOnInit() {
    
    
  }

  ngOnChanges(){

    console.log(this.details)      
    if (this.details.orangeBookSubCategory)
    {
      this.IsCategory = true;
      this.Name = this.details.CategoryName;
      this.catid = this.details.Id;
      this.subcatid = 0;
    }
    else{
      this.IsCategory =  false;
      this.Name = this.details.SubCategoryName;
      this.subcatid = this.details.Id;
      this.catid = this.details.CategoryID;
    }
    console.log(this.IsCategory)  
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
          this.OrangeBook.LogoUrl = reader.result;
        }
        (success) => {
          alert("image uploaded successfully")
          //this.messageService.add({ severity: 'success', summary: 'File uploaded successfully! Please Save', detail: '' });
        };
      }
      else {

        alert("File Formate Not Accepted");
        this.IsExtension = false;}

  }

  uploader() {
    
    let formData = new FormData();
    formData.append('file', this.file[0])
    formData.append('value', this.OBVersion)
    this.orangebookversionservice.UploadImage(formData, this.Name).subscribe(result => {
      console.log(result)
      
      this.isUploaded = result.Status;
      if (this.isUploaded == true) {
        this.FilePath = result.FileName;
        alert("File Sucessfully Uploaded! Please Save ");
      }
    })
  }

  AddOrangeBookVersion() {
    
    this.blocked = true;
    if (this.isUploaded == true) {      
      this.orangebookversionservice.updateversion(this.FilePath, this.catid, this.subcatid).subscribe(result => {
        this.blocked = false;
        console.log(result);
        this.apptype = result;
        alert(this.apptype.Message);
        window.location.reload();
      })
    } else {
      this.messageService.add({ severity: 'error', summary: 'Please Upload File First!', detail: '' });
    }
  }

  closeDetails(isDetails: boolean){
    this.isdetailsclose.emit(isDetails);
  }

  


}