import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SubCategoryService } from 'app/shared/services/sub-category.service';
import { Router } from '@angular/router';
import { CategoryService } from 'app/shared/services/category.service';
import { MessageService } from 'primeng/api';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss'],
  providers: [MessageService]
})
export class AddSubCategoryComponent implements OnInit {
  @Input() SubCategoryId: any
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  subCategory: any
  categoryList: any;
  isInvalid: Boolean;
  file: any;
  imgURL: any;
  isUploaded: boolean;
  EditCategory: boolean;
  EditCategoryData: any;
  selectedCategory: any;
  CategoriesId: any[];
  public imagePath;
  baseURL: any;
  constructor(private messageService: MessageService, private subCategoryService: SubCategoryService, private categoryService: CategoryService, private router: Router) {
    this.subCategory = {};
    this.baseURL = environment.apiURL;
  }

  ngOnInit() {
    this.subCategory.StoreType = 0;
    this.isUploaded = false;
    // if(this.SubCategoryId){
    //   this.subCategoryService.GetByID(this.SubCategoryId).subscribe(result => {
    //     this.subCategory = result;
    //    console.log('subcategory'+this.subCategory);

    //   })
    //   }
    //debugger;
    if (!this.SubCategoryId) {

      var valuess = null;
      this.categoryService.GetAllCategoryV2(valuess).subscribe(result => {
        console.log("tejas work ", result);
        this.EditCategoryData = result;
      })
    }



    if (this.SubCategoryId) {
      //debugger
      this.categoryService.GetAllCategoryV2(this.SubCategoryId.SubCategoryId).subscribe(result => {
        //debugger
        console.log("avi work ", result);
        this.EditCategoryData = result;
        this.selectedCategory = result.filter(x => x.Selected == true);
        var a = [];
        this.selectedCategory.forEach(element => {
          console.log(element.Id);
          a.push(element.Id);
        });
        this.SubCategoryId.CategoriesId = a;
        this.EditCategory = true;
      })

      this.subCategory = this.SubCategoryId;
    }

    this.categoryService.GetAllCategory().subscribe(result => {

      this.categoryList = result;

    })
  }

  selectedWarehouses() {

    var a = [];
    var b = [];
    var c = []
    console.log("this.selectedCategory", this.selectedCategory)
    this.selectedCategory.forEach(element => {
      console.log(element.Id);
      a.push(element.Id);
    });

    this.subCategory.CategoriesId = a;
  }
  onclick(subcategoryForm: any) {
   // debugger
    console.log("subcategoryForm", subcategoryForm); 
    if (subcategoryForm.form.status == "VALID" && this.subCategory.LogoUrl) {

      if (this.subCategory.LogoUrl) {
        if (this.subCategory.StoreType != 0) {
          if (this.subCategory.StoreImage == undefined) {
            alert("Please upload Store image before saving");
           // this.messageService.add({ severity: 'error', summary: 'Please upload Store image before saving', detail: '' });
            return;
          }
        }

        if (this.subCategory.CategoriesId.length >= 1) {
          if (this.SubCategoryId == null) {
            //console.log(this.subCategory);
            this.subCategoryService.addSubCategory(this.subCategory).subscribe(result => {
              //debugger
              if (result.Result) {
                // debugger;
                if(result.SubCategory.CategoryType == 1)
                {
                  result.msg = "Successfully Sent to Maker-Checker for Approval !!! ";
                  alert("Successfully Sent to Maker-Checker for Approval !!! ");
                  this.messageService.add({ severity: 'success', summary: result.msg, detail: '' });
                }else{
                  alert(result.msg);
                  this.messageService.add({ severity: 'success', summary: result.msg, detail: '' });
                }                
                
                
                this.router.navigateByUrl('/layout/item-category/subcategory');
              }
              else {
                alert(result.msg);
                //this.messageService.add({ severity: 'success', summary: result.msg, detail: '' });
              }
              // this.expanded = false;
            },
              (err) => {
                //alert("error")
                this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
              });
          } else {
            console.log(this.subCategory);
            this.subCategoryService.UpdateSubCategory(this.subCategory).subscribe(result => {
              console.log(result);
              // this.router.navigateByUrl('/layout/item-category/subcategory');
              if (result.Result) {
                this.messageService.add({ severity: 'success', summary: result.msg, detail: '' });
                this.refreshParent.emit(false);
              }
              else {
                alert(result.msg);
                //this.messageService.add({ severity: 'success', summary: result.msg, detail: '' });
              }

              // this.expanded = false;
            },
              (err) => {
                //alert("error")
                this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
              });
          }

        } else {
          this.messageService.add({ severity: 'error', summary: 'Please Select More than one category', detail: '' });
        }


      } else {
        this.messageService.add({ severity: 'error', summary: 'Please upload image before saving', detail: '' });
      }
    } else {
      this.isInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
    }
  }

  onCancel() {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('/layout/item-category/subcategory');
  }

  upload(file: File[]) {
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      // this.subCategory.LogoUrl = reader.result;
      console.log('test',this.subCategory.LogoUrl)
    }
    
    (success) => {
      alert("image uploaded successfully")

    };
  }

  onUpload() {
    //debugger
    let formData = new FormData();
    formData.append('file', this.file[0])
    // this.http.post('https://file.io', file, {reportProgress: true, observe: 'events'})
    this.subCategoryService.UploadImage(formData).subscribe(result => {

      console.log(result)
      this.isUploaded = true
      this.subCategory.LogoUrl = result;
      this.messageService.add({ severity: 'success', summary: 'Uploaded Successfully!', detail: '' });
    })

  }
  Storeupload(file: File[]) {
    this.file = file;
    console.log('file',this.file)
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.subCategory.StoreImage = reader.result;
    }
    (success) => {
      alert("image uploaded successfully")

    };
  }
  
  onUploadStoreImg() {
    let formData = new FormData();
    formData.append('file', this.file[0])
    this.subCategoryService.StoreImageUpload(formData).subscribe(result => {
      console.log('tttttttsssssssssssss',result)
      this.isUploaded = true
      this.subCategory.StoreImage = result;
      this.messageService.add({ severity: 'success', summary: 'Uploaded Successfully!', detail: '' });
    })

  }
  bannerupload(file: File[]) {
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.subCategory.StoreBanner = reader.result;
    }
    (success) => {
      alert("image uploaded successfully")

    };
  }
  onUploadStoreBanner(){
    let formData = new FormData();
    formData.append('file', this.file[0])
    this.subCategoryService.StoreImageUpload(formData).subscribe(result => {
      console.log(result)
      this.isUploaded = true
      this.subCategory.StoreBanner = result;
      this.messageService.add({ severity: 'success', summary: 'Uploaded Successfully!', detail: '' });
    })
  }

}
