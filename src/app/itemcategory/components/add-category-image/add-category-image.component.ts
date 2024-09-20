import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef  } from '@angular/core';
import { BaseCategoryService } from 'app/shared/services/base-category.service';
import { SubCategoryService } from 'app/shared/services/sub-category.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IfStmt } from '@angular/compiler';
import { LoaderService } from 'app/shared/services/loader.service';
@Component({
  selector: 'app-add-category-image',
  templateUrl: './add-category-image.component.html',
  styleUrls: ['./add-category-image.component.scss']
})
export class AddCategoryImageComponent implements OnInit {
  @Input() BaseCategoryId: any
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  isInvalid: boolean;
  baseCategory: any;
  file: any;
  imgURL: any;
  @ViewChild('myInput', { static: true }) myInputVariable: ElementRef;
  
  // isUploaded : boolean;
  public imagePath;
  allCategory: any;
  addCategory: any;
  categoryadded: any;
  uploadedImage: any;
  isEdit = false;
  @Input() CategoryIdDetail: any;
  constructor(private messageService: MessageService, private subCategoryService: SubCategoryService, private loaderService: LoaderService, private baseCategoryService: BaseCategoryService, private router: Router) { this.addCategory = {} }

  AppTypeList:any
  ngOnInit() {
    this.AppTypeList=[
      {code: 'Retailer',name:'Retailer'},
      {code: 'Consumer',name:'Consumer'}
    ]
    if (this.CategoryIdDetail) {
      this.isEdit = true;
      this.baseCategoryService.GetAllCategoryImage().subscribe(result => {
        this.allCategory = result;
        var categorys = this.allCategory.filter(x => x.Categoryid == this.CategoryIdDetail.CategoryId);
        this.addCategory.Categoryid = categorys[0].Categoryid;
      });
      console.log(this.CategoryIdDetail);
      // this.addCategory = this.CategoryIdDetail;
      this.addCategory.LogoUrl = this.CategoryIdDetail.CategoryImg;
      // this.addCategory.CategoryId = this.CategoryIdDetail.CategoryId;
      this.addCategory.CategoryImageId = this.CategoryIdDetail.CategoryImageId;
      this.addCategory.CreatedDate = this.CategoryIdDetail.CreatedDate;
      this.addCategory.IsActive = this.CategoryIdDetail.IsActive;
      this.addCategory.AppType = this.CategoryIdDetail.AppType;
      this.addCategory.CategoryImg = "";
    }
    else {
      this.addCategory.CategoryImg = "";
      this.baseCategoryService.GetAllCategoryImage().subscribe(result => {
        this.allCategory = result;
      });
    }
  }

  onclick(categoryForm: any) {
    //debugger;
    //console.log(categoryForm.form.value.category_id);
    console.log(categoryForm);
    console.log(this.addCategory);
    if (this.addCategory.Categoryid != null || this.addCategory.Categoryid != undefined) {


      if (this.addCategory.IsActive == undefined) {
        this.addCategory.IsActive = false;
      }



      if (this.addCategory.LogoUrl) {
        console.log(this.isEdit);
        if (!this.isEdit) {

          this.addCategory.CategoryImg = this.addCategory.LogoUrl;
          this.addCategory.Categoryid = this.addCategory.Categoryid;
          this.loaderService.loading(true);
          this.baseCategoryService.AddCategory(this.addCategory).subscribe(result => {
            console.log(result);
            this.categoryadded = result;
            this.loaderService.loading(false);
            if (result) {
              if (result.Isalreadyadd) {
                alert("Item Already Exists")
                this.loaderService.loading(false);
              } else {
                alert("Add Successfully");
                this.loaderService.loading(false);
                this.messageService.add({ severity: 'success', summary: 'Add Successfully!', detail: '' });
                this.router.navigateByUrl('/layout/item-category/categoryimage');
              }
            } else {
              this.loaderService.loading(false);
              this.messageService.add({ severity: 'error', summary: 'Not Add Successfully!', detail: '' });
            }
          },

            (err) => {
              //  alert("error")
              this.loaderService.loading(false);
              this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
            });
        } else {
          this.addCategory.CategoryImg = this.addCategory.LogoUrl;
          this.addCategory.CreatedDate = new Date();
          this.loaderService.loading(true);
          this.baseCategoryService.PutCategory(this.addCategory).subscribe(result => {
            //this.router.navigateByUrl('/layout/item-category/basecategory')
            if (result == 1) {
              this.loaderService.loading(false);
              this.messageService.add({ severity: 'success', summary: 'Update Successfully!', detail: '' });
              this.router.navigateByUrl('/layout/item-category/categoryimage');
              alert("Updated Successfully");
              window.location.reload();
              this.refreshParent.emit(false);
            } else {
              this.loaderService.loading(false);
              this.messageService.add({ severity: 'error', summary: 'Not Update Successfully!', detail: '' });
            }
            // this.expanded = false;
          },
            (err) => {
              //alert("error")
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
      alert("Please Select Category")
    }

  }

  onCancel() {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('/layout/item-category/categoryimage');

  }

  imageEnable:boolean=false;
  upload(file: File[]) {
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    var image_type = this.file[0].type;
    if (image_type == 'image/png' || image_type == 'image/jpeg' || image_type == 'image/jpe'|| image_type == 'image/jfif') {
      reader.readAsDataURL(file[0]);
      reader.onload = (_event) => {
        // this.addCategory.LogoUrl = reader.result;
        // console.log(this.addCategory.LogoUrl, 'url');
        // this.uploadedImage = reader.result;
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

  uploader1() {
    let formData = new FormData();
    formData.append('file', this.file[0])
    this.subCategoryService.StoreImageUpload(formData).subscribe(result => {
      console.log(result);
      var file_type = result.split('.')[1]
      if (file_type == 'png' || file_type == 'jpg' || file_type == 'jpeg' || file_type == 'jpe'|| file_type == 'jfif') {
        this.addCategory.LogoUrl = 'https://uat.shopkirana.in/../../' + result;
        this.baseCategoryService.UploadImage(formData).subscribe(result => {
          console.log('tttttttsssssssssssss', result)
          this.addCategory.LogoUrl= result;
          this.messageService.add({ severity: 'success', summary: 'Uploaded Successfully!', detail: '' });
        })


        this.uploadedImage = result;
        this.messageService.add({ severity: 'success', summary: 'Uploaded Successfully!', detail: '' });
      } else {
        alert("Please upload png/jpg file")
      }
    })


  }
}
// this.subCategoryService.StoreImageUpload(formData).subscribe(result => {
//   console.log('tttttttsssssssssssss',result)
//   this.isUploaded = true
//   this.subCategory.StoreImage = result;
//   this.messageService.add({ severity: 'success', summary: 'Uploaded Successfully!', detail: '' });
// })