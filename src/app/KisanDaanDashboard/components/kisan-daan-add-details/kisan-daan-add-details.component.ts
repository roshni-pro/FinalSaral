import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { KisanDanService } from 'app/shared/services/kisan-dan.service';
import { environment } from 'environments/environment';
import { kisanDan } from 'app/shared/interface/kisan-dan-add';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-kisan-daan-add-details',
  templateUrl: './kisan-daan-add-details.component.html',
  styleUrls: ['./kisan-daan-add-details.component.scss']
})
export class KisanDaanAddDetailsComponent implements OnInit {
  [x: string]: any;
  cols : any;
  Imagedetaillist:any;
  DescriptionList;any;
  IsPopupopen: boolean;
  isPopupOpenUpdate: boolean;
  IsPopupopenDescription:boolean;
  KisanDanimagedata:any;
  file:any;
  imagePath:any;
  imgURL:any;
  Id:number;
  details:any;
  data:any;
  kisanDanAddDetails: kisanDan;
 // baseURL: any;
  imagedata:any;
  constructor(private router: Router, private route: ActivatedRoute, private KisanDanService:KisanDanService,private messageService : MessageService ) { 
    this.data={} ,
    this.imagedata={}
   // this.baseURL = environment.apiURL;
  }

  ngOnInit() {
   
      this.KisanDanService.kisandanimageDetails().subscribe(result =>{
      this.Imagedetaillist =result;
      console.log (this.Imagedetaillist + 'gfdg')
    })   
    
    this.KisanDanService.kisandanDetails().subscribe(result =>{   
      this.DescriptionList =result;
      console.log (this.DescriptionList + 'gfdg')
    })   
    
    this.KisanDanService.kisandanDescriptionDetails().subscribe(result =>{
      
      this.data =result;
      console.log (this.data + 'gfdg')
    })   

   this.kisanDanAddDetails={
    LogoUrl: null,
    Description: null,
    IsGallaryImage: false,
    IsActive:true,
    IsDeleted:false
    }
    this.AddDetails();
    
   }

   addNewDetail() {
     
     this.IsPopupopen = true;
     this.AddDetails();
     this.imagedata={}
    if (this.IsPopupopen != true) {

    }else{
      
    
    this.IsPopupopen = true;
    }
  }
  addDescription() {
    
    this.IsPopupopenDescription = true;
    this.AddDetails();

   if (this.IsPopupopenDescription != true) {

   }else{      
   this.IsPopupopenDescription = true;
   }
 }

  EditDetails(data) {
    this.Imagedetaillist = data;
    this.isPopupOpenUpdate = true;

  }
  AddDetails(){
    this.Imagedetaillist={
    Id: null,
    KisanDaanImage:'',
    Description:'',
    IsGallaryImage:'',
    
    }

   
  }
  NewDetail(){   
  }

  upload(file: File[]) {
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
   // this.imgURL = reader.result;
    }
    (success) => {
      alert("image uploaded successfully")

    };


  }
  UploadImage(){
   
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0]);
      this.KisanDanService.uploadImage(formData).subscribe(x => {
       
        console.log(x);
       // this.imgURL = this.baseURL + x;
        this.imgURL=x;
    })
  }
  }


  Save(data:any){
   
    console.log("data", data);    
    this.KisanDanService.adddatails(this.data).subscribe(result => {
    console.log(result);
    this.IsPopupopenDescription=false;
    this.messageService.add({severity:'success', summary: 'Save Successfully!', detail:''});
    //window.location.reload();
    
    })
    // this.expanded = false;

  }

  saveImage(imagedata:any){
  
   this.kisanDanAddDetails.Description=imagedata.Description;
   this.kisanDanAddDetails.LogoUrl= this.imgURL;
   this.kisanDanAddDetails.IsGallaryImage=imagedata.IsGallaryImage;
   this.KisanDanService.addImage(this.kisanDanAddDetails).subscribe(result => {
   
    console.log(result);  
    this.IsPopupopen=false;
    this.messageService.add({severity:'success', summary: 'Save Successfully!', detail:''});   
   this.ngOnInit();
    
    
   })

  }
  Active(rowdata){
  
    rowdata.LogoUrl=rowdata.KisanDaanImage;
    this.KisanDanService.addImage(rowdata).subscribe(result => {
    
    console.log(rowdata);
    })
  }
  delete(rowdata1){
    rowdata1.IsDeleted=true;
    rowdata1.IsActive=false;
    rowdata1.LogoUrl=rowdata1.KisanDaanImage;
    this.KisanDanService.addImage(rowdata1).subscribe(result => {    
    this.messageService.add({severity:'success', summary: 'Remove Image Successfully!', detail:''}); 
    this.ngOnInit();
    console.log(rowdata1);
    })
  }
}
 


