import { Component, OnInit, Input, Output, EventEmitter,  ViewChild, ElementRef } from '@angular/core';
import { BaseCategoryService } from 'app/shared/services/base-category.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IfStmt, ThrowStmt } from '@angular/compiler';
//import { ConfirmationService } from 'primeng/api';
import { LoaderService } from 'app/shared/services/loader.service';
import { SubCategoryService } from 'app/shared/services/sub-category.service';

@Component({
  selector: 'app-add-base-category',
  templateUrl: './add-base-category.component.html',
  styleUrls: ['./add-base-category.component.scss']
})
export class AddBaseCategoryComponent implements OnInit {
  @Input() BaseCategoryDetail: any
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  @ViewChild('myInput', { static: true }) myInputVariable: ElementRef;
  isInvalid: boolean;
  baseCategory: any;
  file: any;
  imgURL: any;
  // isUploaded : boolean;
  // EditCategoryData: any;
  selectedCategory: any;
  EditCategory: boolean;
  subCategory: any;
  categoryList: any;
  public imagePath;
  uploadedImage: any;
  isEditMode: boolean = false;
  @Input() BaseCategoryId: number;
  constructor(private messageService: MessageService, 
    private subCategoryService: SubCategoryService, 
    private loaderService: LoaderService, 
    //private confirmationService: ConfirmationService, 
    private baseCategoryService: BaseCategoryService, 
    private router: Router) { this.baseCategory = {} }

  ngOnInit() {
    this.baseCategory.StoreType = 0;
    this.baseCategory.LogoUrl = null;
    // this.isUploaded = false;
    console.log('BaseCategoryDetail', this.BaseCategoryDetail);
    if(this.BaseCategoryDetail != undefined){
      this.isEditMode = true;
    } else {
      this.isEditMode = false;
    }
    // debugger;
    // this.baseCategory.LogoUrl = this.BaseCategoryDetail.LogoUrl;
    // if(this.BaseCategoryId){
    //   this.baseCategoryService.GetByID(this.BaseCategoryId).subscribe(result => {
    //     this.baseCategory = result;
    //    console.log('basecategory'+this.baseCategory);
    // if(!this.BaseCategoryDetail) {

    //   var valuess = null;
    //   this.baseCategoryService.GetAllCategoryV(valuess).subscribe(result => {
    //     console.log("work ", result);
    //     this.EditCategoryData = result;
    //   }) 
    // }
    if (this.BaseCategoryDetail) {
      //debugger
      this.baseCategory = this.BaseCategoryDetail;
      this.baseCategoryService.GetAllCategoryV(this.BaseCategoryDetail.BaseCategoryId).subscribe(result => {
        //debugger
        console.log("avi work ", result);
        // this.EditCategoryData = result;
        this.selectedCategory = result.filter(x => x.Selected == true);
        var a = [];
        this.selectedCategory.forEach(element => {
          console.log(element.Id);
          a.push(element.Id);
        });
        this.BaseCategoryDetail.CategoriesId = a;
        this.EditCategory = true;
      })

      this.subCategory = this.BaseCategoryDetail;
    }

    // this.baseCategoryService.GetAllBaseCategory().subscribe(result => {

    //   this.categoryList = result;

    // })
  }

  onclick(basecategoryForm: any) {
    // debugger;  
    this.loaderService.loading(true);
    console.log(this.baseCategory);
    console.log("baseCategoryForm", basecategoryForm);
    // var image_path = this.baseCategory.LogoUrl.split('//StoreImage')[1];
    // var file_type = image_path.split('.')[1];
    if (basecategoryForm.form.status == "VALID") {
      if (this.baseCategory.LogoUrl) {
        if (this.BaseCategoryDetail == null) {
          console.log("this.baseCategory", this.baseCategory);
          console.log(basecategoryForm);
          if (basecategoryForm.value.isActiveCheck == undefined) {
            this.baseCategory.IsActive = false;
          }
          //debugger;
          this.baseCategoryService.addBaseCategory(this.baseCategory).subscribe(result => {
            if (result.Isalreadyadd == true) {
              alert("Already Added !!");
              console.log(result);

              this.messageService.add({ severity: 'success', summary: 'Already Added !', detail: '' });
              this.loaderService.loading(false);
              //this.router.navigateByUrl('/layout/item-category/basecategory');
            } else {
              alert("Add Successfully");
              console.log(result);
              this.router.navigateByUrl('/layout/item-category/basecategory');
              this.messageService.add({ severity: 'success', summary: 'Add Successfully!', detail: '' });
              this.loaderService.loading(false);
              this.router.navigateByUrl('/layout/item-category/basecategory');
            }
          },
            (err) => {
              this.loaderService.loading(false);
              this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
            });
        } else {
          this.baseCategoryService.UpdateBaseCategory(this.baseCategory).subscribe(result => {
            console.log(this.BaseCategoryDetail);
            if (result.Isalreadyadd == true) {
              alert("Base Category Name Already Exist !!");
              console.log(result);
              this.baseCategory.BaseCategoryName = this.BaseCategoryDetail.BaseCategoryName;
              this.messageService.add({ severity: 'success', summary: 'Base Category Name Already Exist !', detail: '' });
              this.loaderService.loading(false);
            } else {
            alert("Update Successfully");
            this.loaderService.loading(false);
            this.messageService.add({ severity: 'success', summary: 'Update Successfully!', detail: '' });
            this.refreshParent.emit();
            }
          },
            (err) => {
              this.loaderService.loading(false);
              this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
            });
        }
      } else {
        this.loaderService.loading(false);
        this.messageService.add({ severity: 'error', summary: 'Please upload image before saving', detail: '' });
      }
    } else {
      this.loaderService.loading(false);
      this.isInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
    }

  }

  onCancel() {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('/layout/item-category/basecategory');

  }
  imageEnable:boolean=false;
  upload(file: File[]) {
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    var image_type = this.file[0].type;
    if (image_type == 'image/png' || image_type == 'image/jpeg') {
      reader.readAsDataURL(file[0]);
      console.log('file[0]', file[0]);
      // https://uat.shopkirana.in/
      reader.onload = (_event) => {
        this.uploadedImage = reader.result;
        // console.log( this.baseCategory.LogoUrl, 'url');

      }
      (success) => {
        alert("image uploaded successfully")

      };
      this.imageEnable = true;
    }else{
      this.imageEnable = false;
      this.myInputVariable.nativeElement.value = "";
      alert('Please upload png/jpg file')
    }
  }
  
  isUploaded: boolean;
  uploader1() {
    let formData = new FormData();
    formData.append('file', this.file[0])
    // console.log('uploader', this.file[0])
    // var reader = new FileReader();
    // this.imagePath = this.file[0];
    // reader.readAsDataURL(this.file[0]);
    // reader.onload = (_event) => {
    //   this.baseCategory.LogoUrl = reader.result;
    //   this.uploadedImage = reader.result;
    // }
    this.subCategoryService.StoreImageUpload(formData).subscribe(result => {
      //debugger;
      console.log(result);
      var file_type = result.split('.')[1]
      if (file_type == 'png' || file_type == 'jpg' || file_type == 'jpeg') {
        this.baseCategory.LogoUrl = 'https://uat.shopkirana.in/../../' + result;
        this.baseCategoryService.UploadImage(formData).subscribe(result => {
          console.log('tttttttsssssssssssss', result)

        })
        this.isUploaded = true;
        this.uploadedImage = result;
        alert('Uploaded Successfully');
        //this.messageService.add({ severity: 'success', summary: 'Uploaded Successfully!', detail: '' });
      } else {
        alert("Please upload png/jpg file")
      }
    })

  }

  space(event) {
    if (event.target.selectionStart === 0 && event.code === 'Space') {
      event.preventDefault();
    }
  }

}