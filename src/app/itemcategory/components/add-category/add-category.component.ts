import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { CategoryService } from 'app/shared/services/category.service';
import { Router } from '@angular/router';
import { BaseCategoryService } from 'app/shared/services/base-category.service';
import { IfStmt } from '@angular/compiler';
import { MessageService } from 'primeng/api';
import { LoaderService } from 'app/shared/services/loader.service';
import { SubCategoryService } from 'app/shared/services/sub-category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  @Input() CategoryId : any
  @ViewChild('myInput', null) fileUploader: ElementRef;
  @ViewChild('myInput2', null) fileUploader2: ElementRef;
  @Output() refreshParent = new EventEmitter(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 
  Category : any;
  baseCategoryList:any;
  isInvalid : Boolean;
  file:any;
  imgURL: any;  
  isUploaded:boolean;
  allSeasonConfig:any
  public imagePath;
  public image;
  constructor( private messageService : MessageService,private loaderService: LoaderService,private CategoryService:CategoryService,
    private BaseCategoryService :BaseCategoryService,private router:Router, private subcategory: SubCategoryService) 
    {this.Category = {}}

  ngOnInit() {
    this.GetAllSeasonConfig()

    console.log('aai'+this.CategoryId)
    if(this.CategoryId !=undefined )
    {
      this.Category.SeasonId=this.CategoryId.SeasonId
    }        
    // if(this.CategoryId){
    //   this.CategoryService.GetByID(this.CategoryId).subscribe(result => {
    //     this.Category = result;
    //    console.log('category'+this.Category);
       
    //   });
    //   }
    //debugger
    if(this.CategoryId)
    {
      this.Category = this.CategoryId;
    }
      this.BaseCategoryService.GetAllBaseCategory().subscribe(result=>{
        this.baseCategoryList=result;
        console.log(this.baseCategoryList);
      });
  }
       
  onclick(categoryForm : any){    
     debugger;

    if(this.Category.LogoUrl && this.Category.LogoUrl.includes('data:image/')){
      alert("Please upload category image again in JPEG/PNG/JPG format!!!");
      return
    }
    if(this.Category.RDSLogoUrl && this.Category.RDSLogoUrl.includes('data:image/')){
      alert("Please upload RDS category image again in JPEG/PNG/JPG format!!!");
      return
    }

    this.loaderService.loading(true);
    console.log("categoryForm", categoryForm);
    if(categoryForm.form.status == "VALID"){
      if(this.Category.LogoUrl ){                        //&& this.isUploaded ==true
     if(this.CategoryId == null){
      console.log("aaaa");
      this.CategoryService.addCategory(this.Category).subscribe(result => {
        this.loaderService.loading(false);
        this.messageService.add({severity:'success', summary: 'Category sent for approver.', detail:''}); 
        setTimeout(() => {
          this.router.navigateByUrl('/layout/item-category/category');
        }, 1000);
      },
      (err)=>{
      //  alert("error")
      this.loaderService.loading(false);
      this.messageService.add({severity:'error', summary: 'Error!', detail:''});
      });
    }else{
      
      this.CategoryService.UpdateCategory(this.Category).subscribe(result => {
        console.log(this.CategoryId);
       // this.router.navigateByUrl('/layout/item-category/category')
       alert("Update Successfully!");
       this.loaderService.loading(false);
       this.messageService.add({severity:'success', summary: 'Update Successfully!', detail:''});
        this.refreshParent.emit(false);
       // this.expanded = false;
      },
      (err)=>{
       // alert("error")
       this.messageService.add({severity:'error', summary: 'Error!', detail:''});
       this.loaderService.loading(false);
      });
    }
  }else{
    this.messageService.add({severity:'error', summary: 'Please upload Category image before saving', detail:''});
    this.loaderService.loading(false);
  }
  }else{
    this.isInvalid = true;
    this.messageService.add({severity:'error', summary: 'Please Fill required Fields!', detail:''});
    this.loaderService.loading(false);
  }
}

  onCancel(){
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('/layout/item-category/category')
  }

  imageurl:any;
  upload(file: File[]){
    // debugger
    if (file[0].size < 1000000){
      this.file = file;
      console.log('file',this.file);
      
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file[0]); 
      reader.onload = (_event) => { 
        // this.Category.LogoUrl  = reader.result; 
        // this.imageurl=reader.result;
      }
      (success)=>{
        alert("image uploaded successfully")
     
      };
    }
    else{
      alert('Select Image size less than 1MB!!!');
      this.fileUploader.nativeElement.value = null;
      if(!this.Category.LogoUrl){
        this.reset();
      }
    }
   
  }

  onUpload(){
    let formData = new FormData();
    formData.append('file',this.file[0])    
    // this.http.post('https://file.io', file, {reportProgress: true, observe: 'events'})
    this.CategoryService.UploadImage(formData).subscribe(result =>{
      this.isUploaded = true
      this.file=null;
      console.log(result)
      this.Category.LogoUrl = result;
      
    if(this.Category.LogoUrl.includes('data:image/')){
      alert("Please upload category image again in JPEG/PNG/JPG format!!!");
      this.Category.LogoUrl="";
    }

      this.messageService.add({severity:'success', summary: 'Uploaded Successfully!', detail:''});
    })
      
  }

  reset(){
    // this.Category.LogoUrl="";
    this.fileUploader.nativeElement.value = null;
  }
  
  reset2(){
    // this.Category.LogoUrl="";
    this.fileUploader2.nativeElement.value = null;
  }
  Rdsimageurl:any;
  uploadRDSImg(files: File[]){
    if (files[0].size < 1000000){
      this.file = files;
      var reader = new FileReader();
      this.image = files;
      reader.readAsDataURL(files[0]); 
      reader.onload = (_event) => { 
        // this.Category.RDSLogoUrl = reader.result;
        // this.Rdsimageurl = reader.result;
      }
      (success)=>{
        alert("image uploaded successfully")
     
      };
    }
    else{
      alert('Select Image size less than 1MB!!!');
      this.fileUploader2.nativeElement.value = null;
      if(!this.Category.RDSLogoUrl){
        this.reset2();
      }
    }
  
  }
  onRDSImageUpload(){
    // this.Category.RDSLogoUrl = this.Rdsimageurl;
    //debugger
    let formData = new FormData();
    formData.append('file',this.file[0])     
    // this.http.post('https://file.io', file, {reportProgress: true, observe: 'events'})
    this.CategoryService.UploadRDSBaseImageV7(formData).subscribe(result =>{
      this.file=null;
     console.log("res",result);
     console.log("res",this.Category.RDSLogoUrl);
     this.Category.RDSLogoUrl = result;
     if(this.Category.RDSLogoUrl.includes('data:image/')){
      alert("Please upload RDS category image again in JPEG/PNG/JPG format!!!");
      this.Category.RDSLogoUrl="";
    }
      this.messageService.add({severity:'success', summary: 'Uploaded Successfully!', detail:''});
    })
  }
 
  GetAllSeasonConfig()
  {
    this.subcategory.GetAllSeasonConfig().subscribe(result=>
      {
        if(result.length>0)
        {
          this.allSeasonConfig=result;
          if(this.CategoryId ==undefined || this.CategoryId.SeasonId==undefined)  {
            this.Category.SeasonId = this.allSeasonConfig[0].SeasonId
          }
        }else   {
          this.allSeasonConfig=undefined;
        }
      })
  }

}
