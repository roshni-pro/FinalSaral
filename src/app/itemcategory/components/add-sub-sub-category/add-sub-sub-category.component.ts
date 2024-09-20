import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef  } from '@angular/core';
import { SubSubCategoryService } from 'app/shared/services/sub-sub-category.service';

import { Router } from '@angular/router';
import { CategoryService } from 'app/shared/services/category.service';
import { SubCategoryService } from 'app/shared/services/sub-category.service';
import { MessageService } from 'primeng/api';
import { windowWhen } from 'rxjs/operators';
import { LoaderService } from 'app/shared/services/loader.service';


@Component({
  selector: 'app-add-sub-sub-category',
  templateUrl: './add-sub-sub-category.component.html',
  styleUrls: ['./add-sub-sub-category.component.scss']
})
export class AddSubSubCategoryComponent implements OnInit {
  @Input() SubsubCategoryid: any
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  @ViewChild('myInput', { static: true }) myInputVariable: ElementRef;
  subsubCategory: any
  categoryList: any;
  subcategoryList: any;
  typeList: any;
  isInvalid: Boolean;
  file: any;
  imgURL: any;
  isUploaded: boolean;
  public imagePath;
  itemcategory: any;
  a: any;
  uploadedImage: any;
  CategorySubCategory: any;
  ListResult: any;
  EditCategoryData: any;
  constructor(private messageService: MessageService, private loaderService: LoaderService, private subsubCategoryService: SubSubCategoryService, private categoryService: CategoryService, private subCategoryService: SubCategoryService, private subcategory: SubCategoryService, private router: Router) { this.subsubCategory = {} }

  ngOnInit() {
    this.loaderService.loading(true);
    this.categoryService.GetAllCategory().subscribe(result => {
      //debugger;
      console.log(result);
      this.loaderService.loading(false);
      this.categoryList = result;
    })
    if (this.SubsubCategoryid) {
      debugger;
      this.subsubCategory = this.SubsubCategoryid;
      //this.CategorySubCategory = this.SubsubCategoryid.CategoryAndSubCategory.split(',');
      console.log('this.CategorySubCategory', this.subsubCategory);
      //debugger;
      this.subsubCategory.IsActive = this.SubsubCategoryid.IsActive;
      this.subsubCategory.AgentCommisionPercent = this.SubsubCategoryid.CommisionPercent;
      this.categoryService.selectedCategoryChanged(this.SubsubCategoryid.SubsubCategoryid, this.SubsubCategoryid.SubCategoryId).subscribe(x => {
        this.EditCategoryData = x;
        this.CategorySubCategory = x.filter(x => x.Selected == true);
        //debugger;
        this.subsubCategory.Categoryid = this.CategorySubCategory[0].Id;
        this.categoryService.GetSubCategory(this.CategorySubCategory[0].Id).subscribe(x => {
          //debugger;
          this.itemcategory = x
          var filterData = this.itemcategory.filter(x => x.SubCategoryId == this.subsubCategory.SubCategoryId);
          this.subsubCategory.SubCategoryMappingId = filterData[0].SubCategoryMappingId;
          this.itemcategory = this.itemcategory.filter(x => x.SubCategoryMappingId == this.subsubCategory.SubCategoryMappingId);

        })
      });
    }
    else {
      this.subsubCategoryService.GenerateSubSubCode().subscribe(result => {
        console.log("result", result);
        this.subsubCategory.Code = result;
      })
    }
  }

  getSubCategory(id) {
    console.log('item category', id);
    this.categoryService.GetSubCategory(id).subscribe(x => {
      console.log('item sub-category', x);
      //debugger;
      this.itemcategory = x
    })
  }


  onclick(subsubcategoryForm: any) {
    //debugger;
    console.log("subsubcategoryForm", subsubcategoryForm);
    if (subsubcategoryForm.form.status == "VALID") {
      if (this.subsubCategory.LogoUrl) {
        if (this.SubsubCategoryid == null) {
          var categorys = this.categoryList.filter(x => x.Categoryid == this.subsubCategory.Categoryid);
          this.subsubCategory.Categoryid = categorys[0].Categoryid;
          this.subsubCategory.CategoryName = categorys[0].CategoryName;
          var itemcategoryobject = this.itemcategory.filter(x => x.SubCategoryMappingId == this.subsubCategory.SubCategoryMappingId);
          this.subsubCategory.SubCategoryMappingId = itemcategoryobject[0].SubCategoryMappingId;
          this.subsubCategory.SubcategoryName = itemcategoryobject[0].SubcategoryName;
          this.subsubCategory.SubsubCategoryid = itemcategoryobject[0].SubsubCategoryid;
          this.subsubCategory.SubCategoryId = itemcategoryobject[0].SubCategoryId;
          this.subsubCategory.CommisionPercent = this.subsubCategory.AgentCommisionPercent;
          if (this.subsubCategory.IsActive == undefined) {
            this.subsubCategory.IsActive = false;
          } else {
            this.subsubCategory.IsActive = this.subsubCategory.IsActive;
          }

          console.log(this.subsubCategory,);
          this.loaderService.loading(true);
          this.subsubCategoryService.addSubSubCategory(this.subsubCategory).subscribe(result => {
            //debugger;
            //console.log(result);
            this.loaderService.loading(false);
            if (result.Isalreadyadd == true) {
              console.log('result', result);
              alert("Already Added !!");
              this.router.navigateByUrl('/layout/item-category/subsubcategory');
              this.messageService.add({ severity: 'success', summary: 'Already Added!!', detail: '' });
              // window.location.reload();
              // this.expanded = false;
            } else if (result != null) {
              console.log('result', result);
              alert("Add Successfully");
              this.router.navigateByUrl('/layout/item-category/subsubcategory');
              this.messageService.add({ severity: 'success', summary: 'Add Successfully!', detail: '' });
              // window.location.reload();
              // this.expanded = false;
            }
            else {
              this.loaderService.loading(false);
              this.messageService.add({ severity: 'success', summary: 'Subsubcategory not Added!', detail: '' });
            }
          },
            (err) => {
              //alert("error")
              this.loaderService.loading(false);
              this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
            });
        } else {
          //debugger;
          this.loaderService.loading(false);
          var categorys = this.categoryList.filter(x => x.Categoryid == this.subsubCategory.Categoryid);
          var dataselect = [];

          this.CategorySubCategory.forEach(element => {
            var Row = {
              Key: element.Id, Value: element.AgentCommisionPercent
            };
            dataselect.push(Row);
          });
          if (dataselect.length == 0) {
            alert("Please select atleast one category.");
            return false;
          }
          this.subsubCategory.Categoryid = categorys[0].Categoryid;
          this.subsubCategory.CategoryName = categorys[0].CategoryName;
          var itemcategoryobject = this.itemcategory.filter(x => x.SubCategoryMappingId == this.subsubCategory.SubCategoryMappingId);
          this.subsubCategory.SubCategoryMappingId = itemcategoryobject[0].SubCategoryMappingId;
          this.subsubCategory.SubcategoryName = itemcategoryobject[0].SubcategoryName;
          this.subsubCategory.SubsubCategoryid = this.subsubCategory.SubsubCategoryid;
          this.subsubCategory.SubCategoryId = itemcategoryobject[0].SubCategoryId;
          this.subsubCategory.CommisionPercent = this.subsubCategory.AgentCommisionPercent;
          this.subsubCategory.IsActive = this.subsubCategory.IsActive;
          this.subsubCategory.CategoriesId = dataselect

          this.loaderService.loading(true);
          console.log(this.subsubCategory); 
          this.subsubCategoryService.UpdateSubSubCategory(this.subsubCategory).subscribe(result => {
            this.loaderService.loading(false);
            console.log(this.SubsubCategoryid);
            //debugger;
            if (result != null) {

              //this.router.navigateByUrl('/layout/item-category/subsubcategory');

              this.messageService.add({ severity: 'success', summary: 'Update Successfully!', detail: '' });
              debugger;
              this.refreshParent.emit();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Not Update Successfully!', detail: '' });
              this.refreshParent.emit(false);
            }
            // this.expanded = false;
          },
            (err) => {
              // alert("error")
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
    this.router.navigateByUrl('/layout/item-category/subsubcategory');

  }

  imageEnable:boolean=false;
  upload(file: File[]) {
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    var image_type = this.file[0].type;
    if (image_type == 'image/png' || image_type == 'image/jpeg') {
      reader.readAsDataURL(file[0]);
      reader.onload = (_event) => {
        // this.subsubCategory.LogoUrl = reader.result; 
        // console.log( this.subsubCategory.LogoUrl, 'url');
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

  onUpload() {
    //debugger;
    // if(this.file){
    let formData = new FormData();
    formData.append('file', this.file[0])
    // this.http.post('https://file.io', file, {reportProgress: true, observe: 'events'})
    this.subCategoryService.StoreImageUpload(formData).subscribe(result => {
      //console.log(result);
      var file_type = result.split('.')[1]
      if (file_type == 'png' || file_type == 'jpg' || file_type == 'jpeg') {
        this.subsubCategory.LogoUrl = 'https://uat.shopkirana.in/../../' + result;
        this.subCategoryService.UploadImagge(formData).subscribe(result => {
          //console.log('tttttttsssssssssssss',result)
        })
        //debugger;
        //console.log("IamgesSubsubcat",result)
        this.isUploaded = true;
        this.uploadedImage = result;
        this.messageService.add({ severity: 'success', summary: 'Uploaded Successfully!', detail: '' });
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

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
