import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'app/shared/services/supplier.service';
import { AdddepoMaster } from 'app/shared/interface/supplier/adddepo-master';
import { DepotService } from 'app/shared/services/depot.service';
import { MessageService } from 'primeng/api';
import { environment } from 'environments/environment';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-editdepotpage',
  templateUrl: './editdepotpage.component.html',
  styleUrls: ['./editdepotpage.component.scss']
})
export class EditdepotpageComponent implements OnInit {
  depotID:any;
  dopedetails:any=[];
  selectdepoMaster: AdddepoMaster;
  statelist: any;
  citylist: any;
  file: any;
  baseURL: any;
  public imagePath;
  imgURL: any;
  uploadFlagGST: boolean = true;
  uploadFlagPAN: boolean = true;
  uploadFlagFSSAI: boolean = true;
  uploadFlagCancelChq: boolean = true;
  errorMsg: any;
  myFiles: string[] = [];
  imagelist: any[];
  display: boolean = false;
  docName :string;
  // Stateid:any;
  constructor(private supplierService:SupplierService,
    private depoService: DepotService
    , private messageService: MessageService, private router:Router) {
      this.baseURL = environment.apiURL;
     }
  totalroles:any
  isShow:boolean
  depotdepoid:any;
  blocked:boolean=false;
  //---
  
  //---
  ngOnInit() {
    this.totalroles =localStorage.getItem('role');
    console.log("totalroles",this.totalroles);
    
    var a = this.totalroles.split(',');
    for (var i in a) {
      if (a[i] == "Zonal purchase lead" ) {
        this.isShow = true;
        break
      } else {
        this.isShow = false;
      }
    }
    //----
   
    //----


    // StateId
    let info=localStorage.getItem('depotconfig');
    this.depotID=info;
    let infoid = localStorage.getItem('depotdepid');
    this.depotdepoid=infoid;
    // this.depotID=info;
    console.log(info,'info');
    this.getDepoId();
    
   //  this.selectdepoMaster.Stateid=0;
    // this.selectdepoMaster = {
    //   Stateid: 0,
    //   StateName: null,
    //   cityId: 0,
    //   CityName: null,
    //   DepoName: null,
    //   GSTin: null,
    //   DepoCodes: null,
    //   Address: null,
    //   Email: null,
    //   PhoneNumber: null,
    //   ContactPerson: null,
    //   FSSAI: null,
    //   CityPincode: null,
    //   Bank_Name: null,
    //   Bank_AC_No: null,
    //   BankAddress: null,
    //   Bank_Ifsc: null,
    //   BankPinCode: null,
    //   PANCardNo: null,
    //   OpeningHours: null,
    //   PRPOStopAfterValue: null,
    //   GstImage: null,
    //   FSSAIImage: null,
    //   PanCardImage: null,
    //   CancelCheque: null,
    //   Status: null,
    //   SupplierCode: null,
    //   SupplierName: null,
    //   SupplierId: 0,
    //   TINNo: null,
    //   Phone: null,
    //   Message: null
    // }
    this.depoService.Getstates().subscribe(x => {
      this.statelist = x;
    })
  }
  
  getDepoId(){
    
    this.supplierService.getDepoByDepoId(this.depotID,this.depotdepoid).subscribe(x=>{
      console.log(x,'x')
      this.selectdepoMaster=x.data;
      console.log("depo",x.data);
      
      if(this.selectdepoMaster.PhoneNumber == ""){
        let phone = this.selectdepoMaster.Phone
        this.selectdepoMaster.PhoneNumber=phone;
      }
      this.getcity(this.selectdepoMaster.Stateid);
      console.log(this.selectdepoMaster,'dopedetails')
      this.proppan1=this.selectdepoMaster.PanCardImage?this.selectdepoMaster.PanCardImage.length:0;
      this.proppan2=this.selectdepoMaster.CancelCheque?this.selectdepoMaster.CancelCheque.length:0;
      this.proppan3=this.selectdepoMaster.FSSAIImage?this.selectdepoMaster.FSSAIImage.length:0;
      this.proppan4=this.selectdepoMaster.GstImage?this.selectdepoMaster.GstImage.length:0;
    })

   
  }
 

onSave(form: NgForm) {
  debugger
  // if(this.uploadFlagGST==true || this.uploadFlagPAN==true || this.uploadFlagFSSAI==true){
  //   this.messageService.add({ severity: 'error', summary: "Please upload images", detail: '' });
  //   return;
  // }


  //   if(this.uploadFlagPAN==true && (this.selectdepoMaster.PanCardImage==null || this.selectdepoMaster.PanCardImage[0] == "" || this.selectdepoMaster.PanCardImage.length <= 0)){
  //   alert('Please Upload Pan Card Image');
  //   return false;
  // }
  if(this.uploadFlagCancelChq==true && (this.selectdepoMaster.CancelCheque==null || this.selectdepoMaster.CancelCheque[0] == "" || this.selectdepoMaster.CancelCheque.length <= 0)){
    alert('Please Upload Cancel Cheque Image');
    return false;
  }
  if(this.uploadFlagGST==true && (this.selectdepoMaster.GstImage==null || this.selectdepoMaster.GstImage[0]=="" || this.selectdepoMaster.GstImage.length <= 0)){
    alert('Please Upload Gst Image');
    return false;
  }
  
  
  // if (this.selectdepoMaster.PanCardImage != null  ) {
  //   if (this.uploadFlagPAN == true) {
  //     this.messageService.add({ severity: 'error', summary: "Please upload Pan Card image", detail: '' });
  //     return false;
  //   }
  // }

  if (form.status == "VALID") {
    this.blocked=true;
    // this.selectdepoMaster.Stateid=this.
    // this.selectdepoMaster.SupplierId = this.SupplierId;
    this.selectdepoMaster.dpoid=this.depotID;
    this.depoService.PostEditedDepo(this.selectdepoMaster).subscribe(x => {
      
      this.errorMsg = x.Message;
      if (x.Status) {
        alert(this.errorMsg);
        this.blocked=false ;
        console.log(this.selectdepoMaster,'selecteddepomaster')
        this.messageService.add({ severity: 'success', summary: this.errorMsg, detail: '' });
        this.router.navigate(['/layout/supplier/newsupplierlist']);
        
      } else {
        this.messageService.add({ severity: 'error', summary: this.errorMsg, detail: '' });
        this.blocked=false ;
      }
    })
  } 
  else {
    this.blocked=false;
    alert('Depo Not Edited');
  }

}
uploadGSTProof() {
  debugger;
  if (this.myFiles && this.myFiles.length>0) {
    // let formData = new FormData();
    // formData.append('file', this.file[0], 'gst.jpg')
    const frmData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      frmData.append("GSTImage", this.myFiles[i]);
    }
    this.blocked=true;
    this.depoService.DepoDocumentImageUploadMulti(frmData).subscribe(result => {
      this.blocked=false;
      this.selectdepoMaster.GstImage = result;
      this.proppan4=this.selectdepoMaster.GstImage?this.selectdepoMaster.GstImage.length:0;
      this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
      this.file = [];
      this.myFiles=[];
      this.uploadFlagGST = false;
    }, (err) => {
      this.imageSrc="";
        this.blocked=false;
        this.uploadFlagGST=true;
        this.myFiles=[];
        this.file=[];
        this.InputVar1.nativeElement.value="";
        alert("Document Size is more then 20 mb");
    });
  }
  else{
    this.blocked=false;
    alert("Select Document");
  }
}
uploadFSSAIProof() {
  if (this.myFiles && this.myFiles.length>0) {
    // let formData = new FormData();
    // formData.append('file', this.file[0], 'FSSAI.jpg')
    const frmData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      frmData.append("FSSAIImage", this.myFiles[i]);
    }
    this.blocked=true;
    this.depoService.DepoDocumentImageUploadMulti(frmData).subscribe(result => {
      this.blocked=false;
      this.selectdepoMaster.FSSAIImage = result;
      this.proppan3=this.selectdepoMaster.FSSAIImage?this.selectdepoMaster.FSSAIImage.length:0;
      this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
      this.file = [];
      this.myFiles=[];
      this.uploadFlagFSSAI = false;
    }, (err) => {
      this.imageSrc1="";
      this.blocked=false;
      this.uploadFlagFSSAI=true;
      this.myFiles=[];
      this.file=[];
      this.InputVar2.nativeElement.value="";
      alert("Document Size is more then 20 mb");
    });
  }else{
    this.blocked=false;
    alert("Select Document");
  }
  
}
uploadPanCardProof() {
  if (this.myFiles && this.myFiles.length>0) {
    // let formData = new FormData();
    // formData.append('file', this.file[0], 'panCard.jpg')
    const frmData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      frmData.append("PanCardImage", this.myFiles[i]);
    }
    this.blocked=true;
    this.depoService.DepoDocumentImageUploadMulti(frmData).subscribe(result => {
      this.blocked=false;
      this.selectdepoMaster.PanCardImage = result;
      this.proppan1=this.selectdepoMaster.PanCardImage?this.selectdepoMaster.PanCardImage.length:0
      this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
      this.file = [];
      this.myFiles=[];
      this.uploadFlagPAN = false;
    }, (err) => {
      this.imageSrc2="";
      this.blocked=false;
      this.uploadFlagPAN=true;
      this.myFiles=[];
      this.file=[];
      this.InputVar3.nativeElement.value="";
      alert("Document Size is more then 20 mb");
    });
  }
  else{
    this.blocked=false;
    alert("Select Document");
  }
}
uploadCancelChequeProof() {
  if (this.myFiles && this.myFiles.length>0) {
    // let formData = new FormData();
    // formData.append('file', this.file[0], 'cancelCheque.jpg')
    const frmData = new FormData();
      for (var i = 0; i < this.myFiles.length; i++) {
        frmData.append("CancelChequeImage", this.myFiles[i]);
      }
      this.blocked=true;
    this.depoService.DepoDocumentImageUploadMulti(frmData).subscribe(result => {
      this.blocked=false;
      this.selectdepoMaster.CancelCheque = result;
      this.proppan2= this.selectdepoMaster.CancelCheque?this.selectdepoMaster.CancelCheque.length:0;
      this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
      this.file = [];
      this.myFiles=[];
      this.uploadFlagCancelChq = false;
    }, (err) => {
      this.imageSrc3="";
      this.blocked=false;
      this.uploadFlagCancelChq=true;
      this.myFiles=[];
      this.file=[];
      this.InputVar4.nativeElement.value="";
      alert("Document Size is more then 20 mb");
    });
  }
  else{
    this.blocked=false;
    alert("Select Document");
  }
}
// upload(file: File[]) {
//   this.file = file;
//   var reader = new FileReader();
//   this.imagePath = file;
//   reader.readAsDataURL(file[0]);
//   reader.onload = (_event) => {
//     this.imgURL = reader.result;
//   }
//   (success) => {
//     alert("image uploaded successfully!!")
//   };
// }
upload(e,name?) {

  debugger;
  //console.log (e.target.files);  
  for (var i = 0; i < e.target.files.length; i++) {
    this.myFiles.push(e.target.files[i]);
  }

  if(name=="PanCard"){this.proppan1=this.myFiles?this.myFiles.length:0}
  if(name=="CancelCheque"){this.proppan2=this.myFiles?this.myFiles.length:0}
  if(name=="FSSAI"){this.proppan3=this.myFiles?this.myFiles.length:0}
  if(name=="GST" || name=="GSTN"){this.proppan4=this.myFiles?this.myFiles.length:0}

  if(name=="PanCard" && this.selectdepoMaster.PanCardImage!=undefined) this.uploadFlagPAN=true;
  if(name=="CancelCheque" && this.selectdepoMaster.CancelCheque!=undefined) this.uploadFlagCancelChq=true;
  if(name=="FSSAI"  && this.selectdepoMaster.FSSAIImage!=undefined) this.uploadFlagFSSAI=true;
  if(name=="GST" || name=="GSTN"  && this.selectdepoMaster.GstImage!=undefined) this.uploadFlagGST=true;

}

@ViewChild('takeInput1', {static: false})
InputVar1: ElementRef;
removeGSTimg() {
  this.selectdepoMaster.GstImage = null;
  this.uploadFlagGST = true;
  this.imageSrc=null;
  this.InputVar1.nativeElement.value = "";
  this.proppan4=0;
}
@ViewChild('takeInput2', {static: false})
InputVar2: ElementRef;
removeFSSAIimg() {
  this.selectdepoMaster.FSSAIImage = null;
  this.uploadFlagFSSAI = true;
  this.imageSrc1=null;
  this.InputVar2.nativeElement.value = "";
  this.proppan3=0;
}
@ViewChild('takeInput3', {static: false})
InputVar3: ElementRef;
removePANimg() {
  this.selectdepoMaster.PanCardImage = null;
  this.uploadFlagPAN = true;
  this.imageSrc2=null;
  this.InputVar3.nativeElement.value = "";
  this.proppan1=0;
}
@ViewChild('takeInput4', {static: false})
InputVar4: ElementRef;
removeCancelChqimg() {debugger;
  this.selectdepoMaster.CancelCheque = null;
  this.uploadFlagCancelChq = true;
  this.imageSrc3=null;
  this.InputVar4.nativeElement.value = "";
  this.proppan2=0;
}

// showDialog(img,name) {
//   debugger
//   let img1 = [];
//   this.imagelist = [];
//   this.docName='';
//   if (img != null ) {
//     for (var i = 0; i < img.length; i++) {
//       if(img[i] ==""){
//         alert("No Document Uploaded");
//         return false;
//       }
//       else{
//         img1.push(this.baseURL + img[i]);
//         this.imagelist = img1;
//         this.docName = name;
//         this.display = true;
//       }
//     }
//   }
//   else{
//     alert('No Document upload');
//   }
// }

showDialog(img,name) {
  debugger
  console.log('imgggg',this.selectdepoMaster);
console.log(name);

  let img1 = [];
  this.imagelist = [];
  this.docName='';
  if (img != null && img.length > 0 && img !="") {
    // img1.push(this.baseURL + img);
    for (var i = 0; i < img.length; i++) {
      img1.push(this.baseURL + img[i]);
      console.log('img1g',img1);
    }
    this.imagelist = img1;
    if(name=="PanCard"){this.proppan1=this.imagelist?this.imagelist.length:0}
    if(name=="CancelCheque"){this.proppan2=this.imagelist?this.imagelist.length:0}
    if(name=="FSSAI"){this.proppan3=this.imagelist?this.imagelist.length:0}
    if(name=="GST" || name=="GSTN"){this.proppan4=this.imagelist?this.imagelist.length:0}
    this.docName = name;
    console.log("docName",this.docName);
    
    this.display = true;
  }
  else{
    if(this.imagelist.length==0){
      alert('No document uploaded');
      if(name=="PanCard"){
        this.myFiles = [];
        this.selectdepoMaster.PanCardImage=[];
        this.uploadPanCardProof();
      }
      if(name=="CancelCheque"){
        this.myFiles = [];
        this.selectdepoMaster.CancelCheque=[];
        this.uploadCancelChequeProof();
      }
      if(name=="FSSAI"){
        this.myFiles = [];
        this.selectdepoMaster.FSSAIImage=[];
        this.uploadFSSAIProof();
      }

      if(name=="GST"){
        this.myFiles = [];
        this.selectdepoMaster.GstImage=[];
        this.uploadGSTProof();
      }
    }
  }
}

back() {
  this.router.navigate(['/layout/supplier/newsupplierlist']);
}
getcity(stateid) {
  
  // stateid=this.selectdepoMaster.Stateid;
  this.depoService.Getcity(stateid).subscribe(y => {
    
    this.citylist = y;
  })
}
imageSrc:string;
  onFileChange(event) {
    this.blocked=true;
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.blocked=false;
      }
    }this.blocked=false;
  }
  imageSrc1:string;
  onFileChange1(event) {
    this.blocked=true;
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc1 = reader.result as string;
        this.blocked=false;
      }
    }this.blocked=false;
  }
  imageSrc2:string;
  onFileChange2(event) {
    this.blocked=true;
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc2 = reader.result as string;
        this.blocked=false;
      }
    }this.blocked=false;
  }
 
  imageSrc3:string;
  onFileChange3(event) {
    this.blocked=true;
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc3 = reader.result as string;
        this.blocked=false;
      }
    }this.blocked=false;
  }

  numberOnly(event): boolean { 
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  proppan1:number=0;
  proppan2:number=0;
  proppan3:number=0;
  proppan4:number=0;
  RemoveImage(index,docName,DocumentPath?){
    debugger
    console.log(this.myFiles)
    if(docName=="PanCard"){
      if (index > -1)
      {
        let removeDocId=0;
        if(this.selectdepoMaster.PanCardImages!=null && this.selectdepoMaster.PanCardImages.length>0){
          this.selectdepoMaster.PanCardImages.forEach(e=>{
            if(DocumentPath.includes(e.DocumentPath)){
              removeDocId=e.Id
            }
          })
          this.blocked=true;
          this.supplierService.RemoveDepoDocument(removeDocId).subscribe((res:any)=>{
            if(res.Status){
              this.imagelist.splice(index, 1);
              this.selectdepoMaster.PanCardImage .splice(index,1);
              this.proppan1=this.imagelist ? this.imagelist.length:0;
              this.blocked=false;
              alert("successfully removed!");
              if(this.imagelist.length==0){
                this.display=false;
              }  
            }
            else{
              this.blocked=false;
              this.imagelist.splice(index, 1);
              this.selectdepoMaster.PanCardImage && this.selectdepoMaster.PanCardImage.length>0 ?this.selectdepoMaster.PanCardImage.splice(index,1):alert('select documemt');
              this.proppan1=this.imagelist ? this.imagelist.length:0;
              if(this.imagelist.length==0){
                this.removePANimg();this.display=false;
              }              
            }
          })

        } 
        else {
          this.blocked=false;
          this.imagelist.splice(index, 1);
          this.selectdepoMaster.PanCardImage && this.selectdepoMaster.PanCardImage.length>0 ?this.selectdepoMaster.PanCardImage.splice(index,1):alert('select documemt');
          this.proppan1=this.imagelist ? this.imagelist.length:0;
          if(this.imagelist.length==0){
            this.removePANimg();this.display=false;
          }    
        }         
      }
    }

    if(docName=="CancelCheque"){
        if (index > -1)
        {
          let removeDocId=0;
          if(this.selectdepoMaster.CancelCheques && this.selectdepoMaster.CancelCheques.length>0){
            this.selectdepoMaster.CancelCheques.forEach(e=>{
              if(DocumentPath.includes(e.DocumentPath)){
                removeDocId=e.Id
              }
            })
            this.blocked=true
            this.supplierService.RemoveDepoDocument(removeDocId).subscribe((res:any)=>{
              if(res.Status){
                this.imagelist.splice(index, 1);
                this.selectdepoMaster.CancelCheque.splice(index,1);
                this.blocked=false
                this.proppan2=this.imagelist ? this.imagelist.length:0;
                alert("successfully removed!");
                if(this.imagelist.length==0){
                  this.display=false;
                } 
              }
              else{
                  this.blocked=false;
                  this.imagelist.splice(index, 1);
                  this.selectdepoMaster.CancelCheque && this.selectdepoMaster.CancelCheque.length>0 ?this.selectdepoMaster.CancelCheque.splice(index,1):alert('select documemt');
                  this.proppan2=this.imagelist ? this.imagelist.length:0;
                  if(this.imagelist.length==0){
                    this.removeCancelChqimg();this.display=false;
                  }
              }
            })
          } else{
            this.blocked=false;
            this.imagelist.splice(index, 1);
            this.selectdepoMaster.CancelCheque && this.selectdepoMaster.CancelCheque.length>0 ?this.selectdepoMaster.CancelCheque.splice(index,1):alert('select documemt');
            this.proppan2=this.imagelist ? this.imagelist.length:0;
            if(this.imagelist.length==0){
              this.removeCancelChqimg();this.display=false;
            }
        } 
        }

 
  }
    if(docName=="FSSAI"){
      if (index > -1){
        let removeDocId=0;
          if(this.selectdepoMaster.FSSAIImages && this.selectdepoMaster.FSSAIImages.length>0){
            this.selectdepoMaster.FSSAIImages.forEach(e=>{
              if(DocumentPath.includes(e.DocumentPath)){
                removeDocId=e.Id
              }
            })
            this.blocked=true
            this.supplierService.RemoveDepoDocument(removeDocId).subscribe((res:any)=>{
              if(res.Status){
                this.imagelist.splice(index, 1);
                this.selectdepoMaster.FSSAIImage.splice(index,1);
                this.proppan3=this.imagelist ? this.imagelist.length:0;
                this.blocked=false
                alert("successfully removed!");
                if(this.imagelist.length==0){
                  this.display=false;
                } 
              }
              else{
                this.blocked=false;
                  this.imagelist.splice(index, 1);
                  this.selectdepoMaster.FSSAIImage && this.selectdepoMaster.FSSAIImage.length>0 ?this.selectdepoMaster.FSSAIImage.splice(index,1):alert('select documemt');
                  this.proppan3=this.imagelist ? this.imagelist.length:0;
                  if(this.imagelist.length==0){
                    this.removeFSSAIimg();this.display=false;
                  }
              }
            })
          }else{
            this.blocked=false;
              this.imagelist.splice(index, 1);
              this.selectdepoMaster.FSSAIImage && this.selectdepoMaster.FSSAIImage.length>0 ?this.selectdepoMaster.FSSAIImage.splice(index,1):alert('select documemt');
              this.proppan3=this.imagelist ? this.imagelist.length:0;
              if(this.imagelist.length==0){
                this.removeFSSAIimg();this.display=false;
              }
          } 
      }
    }

    if(docName=="GSTN" || docName=="GST"){
      if (index > -1) {
        let removeDocId=0;
          if(this.selectdepoMaster.GstImages && this.selectdepoMaster.GstImages.length>0){
            this.selectdepoMaster.GstImages.forEach(e=>{
              if(DocumentPath.includes(e.DocumentPath)){
                removeDocId=e.Id
              }
            })
            this.blocked=true
            this.supplierService.RemoveDepoDocument(removeDocId).subscribe((res:any)=>{
              if(res.Status){
                this.imagelist.splice(index, 1);
                this.selectdepoMaster.GstImage.splice(index,1);
                this.proppan4=this.imagelist ? this.imagelist.length:0;
                this.blocked=false
                alert("successfully removed!");
                if(this.imagelist.length==0){
                  this.display=false;
                } 
              }
              else{
                this.blocked=false;
                  this.imagelist.splice(index, 1);
                  this.selectdepoMaster.GstImage && this.selectdepoMaster.GstImage.length>0 ?this.selectdepoMaster.GstImage.splice(index,1):alert('select documemt');
                  this.proppan4=this.imagelist ? this.imagelist.length:0;
                  if(this.imagelist.length==0){
                    this.removeGSTimg();
                    this.display=false;
                  }
              }
            })
          }
          else{
            this.blocked=false;
              this.imagelist.splice(index, 1);
              this.selectdepoMaster.GstImage && this.selectdepoMaster.GstImage.length>0 ?this.selectdepoMaster.GstImage.splice(index,1):alert('select documemt');
              this.proppan4=this.imagelist ? this.imagelist.length:0;
              if(this.imagelist.length==0){
                this.removeGSTimg();
                this.display=false;
              }
          }
        }
      }
    if(this.imagelist.length==0)this.display=false;
  }



}
