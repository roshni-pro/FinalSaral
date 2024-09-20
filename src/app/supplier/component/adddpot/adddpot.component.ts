import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdddepoMaster } from 'app/shared/interface/supplier/adddepo-master';
import { DepotService } from 'app/shared/services/depot.service';
import { MessageService } from 'primeng/api';
import { environment } from 'environments/environment';
import { SupplierService } from 'app/shared/services/supplier.service';
import { DialogModule } from 'primeng/dialog';
import { Observable, Observer } from 'rxjs';
import * as FileSaver from 'file-saver';
// ---
import { ViewChild,ElementRef } from '@angular/core';
// --



@Component({
  selector: 'app-adddpot',
  templateUrl: './adddpot.component.html',
  styleUrls: ['./adddpot.component.scss']
})
export class AdddpotComponent implements OnInit {
  @Input() supplierid: number;
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
  SupplierSegment: string;
  docName :string;
  imgSrc: any;
  blocked:boolean=false;
 
  constructor(private router: Router, private depoService: DepotService
    , private messageService: MessageService, private route: ActivatedRoute, private supplierService: SupplierService) {
    this.baseURL = environment.apiURL;
  }

  ngOnInit() {
    this.supplierid = Number(this.route.snapshot.paramMap.get("supplierid"));
    this.selectdepoMaster = {
      dpoid: 0,
      Stateid: 0,
      StateName: null,
      cityId: 0,
      CityName: null,
      DepoName: null,
      GSTin: null,
      DepoCodes: null,
      Address: null,
      Email: null,
      PhoneNumber: null,
      ContactPerson: null,
      FSSAI: null,
      CityPincode: null,
      Bank_Name: null,
      Bank_AC_No: null,
      BankAddress: null,
      Bank_Ifsc: null,
      BankPinCode: null,
      PANCardNo: null,
      OpeningHours: null,
      PRPOStopAfterValue: null,
      GstImage: null,
      FSSAIImage: null,
      PanCardImage: null,
      CancelCheque: null,
      Status: null,
      SupplierCode: null,
      SupplierName: null,
      SupplierId: 0,
      TINNo: null,
      Phone: null,
      Message: null,
      BankAccountType:null,
      PanCardImages:[],
      CancelCheques:[],
      FSSAIImages:[],
      GstImages:[]
    }
    this.depoService.Getstates().subscribe(x => {
      this.statelist = x;
    })
    this.supplierService.GetSupplierBySupplierId(this.supplierid).subscribe(
      data => {
        
        let x = data.data;
        console.log(x,"data");
        
        this.selectdepoMaster.BankAddress = x.BankAddress;
        this.selectdepoMaster.BankPinCode = x.BankPinCode;
        this.selectdepoMaster.Bank_AC_No = x.BankAccNo;
        this.selectdepoMaster.Bank_Ifsc = x.IFSCCode;
        this.selectdepoMaster.Bank_Name = x.BankName;
        
        this.SupplierSegment = x.SupplierSegment;
        this.selectdepoMaster.TINNo = x.TINNo;
        this.selectdepoMaster.Address = x.FullBusinessAddress;
        this.selectdepoMaster.ContactPerson = x.ContactPerson;
        this.selectdepoMaster.PhoneNumber = x.ContactPersonMobileNo;
        this.selectdepoMaster.Email = x.EmailId;
        this.selectdepoMaster.FSSAI = x.FSSAINO;
        this.selectdepoMaster.PANCardNo = x.PanNumber;
         this.selectdepoMaster.BankPinCode = x.bankPinCode;
        this.selectdepoMaster.CityPincode = x.PinCode;

      });
    
  }
  back() {
    this.router.navigate(['/layout/supplier/newsupplierlist']);
  }
  getcity(stateid) {
    this.depoService.Getcity(stateid).subscribe(y => {
      this.citylist = y;
    })
  }

  onSave(form: NgForm) {
    debugger
    if (this.uploadFlagGST == true) {
      this.messageService.add({ severity: 'error', summary: "Please upload GSTN image", detail: '' });
      return false;
    }
    
    // if (this.uploadFlagPAN == true) {
    //     this.messageService.add({ severity: 'error', summary: "Please upload Pan Card image", detail: '' });
    //     return false;
    // }
    
    if(this.uploadFlagCancelChq==true){
      this.messageService.add({ severity: 'error', summary: "Please upload Cancel Cheque image", detail: '' });
        return false;
    }
    
    if (this.SupplierSegment == 'Food' || this.SupplierSegment=='Both') {
      if (this.selectdepoMaster.FSSAI == null || this.selectdepoMaster.FSSAI == '' || this.selectdepoMaster.FSSAI == undefined) {
        this.messageService.add({ severity: 'error', summary: "Please enter fssai no", detail: '' });
        return false;
      }
      if (this.uploadFlagFSSAI == true) {
        this.messageService.add({ severity: 'error', summary: "Please upload fssai images", detail: '' });
        return false;
      }
    }
    

    if (form.status == "VALID") {
      this.blocked=true;
      this.selectdepoMaster.SupplierId = this.supplierid;
      this.depoService.PostNewDepo(this.selectdepoMaster).subscribe(x => {
       
        this.errorMsg = x.Message;
        if (x.Status) {
          this.blocked=false ;
          alert(this.errorMsg);
          this.messageService.add({ severity: 'success', summary: this.errorMsg, detail: '' });
          this.router.navigate(['/layout/supplier/newsupplierlist']);
        } else {
          
          this.messageService.add({ severity: 'error', summary: this.errorMsg, detail: '' });
          this.blocked=false;
        }
      })
    }

    else {
      this.blocked=false;
    }

  }

  
  uploadGSTProof() {
    if (!this.myFiles) {
      this.messageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    
    if (this.myFiles) {
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
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.myFiles = [];
        this.uploadFlagGST = false;
      }, (err) => {
        this.imageSrc="";
        this.blocked=false;
        this.uploadFlagGST=true;
        this.myFiles=[];
        this.InputVar.nativeElement.value="";
        alert("Select Document");
      });
    }
  }

  
  uploadFSSAIProof() {
    if (!this.myFiles) {
      this.messageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.myFiles) {
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
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.myFiles = [];
        this.uploadFlagFSSAI = false;
      }, (err) => {
        this.imageSrc2="";
        this.blocked=false;
        this.uploadFlagFSSAI=true;
        this.myFiles=[];
        this.InputVar1.nativeElement.value="";
        alert("Select Document");
      });
    }
  }
  
  uploadPanCardProof() {
    if (!this.myFiles) {
      this.messageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.myFiles) {
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
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.myFiles = [];
        this.uploadFlagPAN = false;
      }, (err) => {
        this.imageSrc3="";
        this.blocked=false;
        this.uploadFlagPAN=true;
        this.myFiles=[];
        this.InputVar2.nativeElement.value="";
        alert("Select Document");
      });
    }
  }
  
  uploadCancelChequeProof() {
    if (!this.myFiles) {
      this.messageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.myFiles) {
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
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.myFiles = [];
        this.uploadFlagCancelChq = false;
      }, (err) => {
        this.imageSrc4="";
        this.blocked=false;
        this.uploadFlagCancelChq=true;
        this.myFiles=[];
        this.InputVar3.nativeElement.value="";
        alert("Select Document");
      });
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
  proppan1:number=0;
  proppan2:number=0;
  proppan3:number=0;
  proppan4:number=0;
 
  upload(e,name?) {

    debugger;
    //console.log (e.target.files);  
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
    if(name=="PanCard"){this.proppan1=this.myFiles?this.myFiles.length:0}
    if(name=="FSSAI"){this.proppan2=this.myFiles?this.myFiles.length:0}
    if(name=="GST" || name=="GSTN"){this.proppan3=this.myFiles?this.myFiles.length:0}
    if(name=="CancelCheque"){
      this.proppan4=this.myFiles?this.myFiles.length:0
    }

    if(name=="PanCard" && this.selectdepoMaster.PanCardImage!=undefined) this.uploadFlagPAN=true;
    if(name=="CancelCheque" && this.selectdepoMaster.CancelCheque!=undefined) this.uploadFlagCancelChq=true;
    if(name=="FSSAI"  && this.selectdepoMaster.FSSAIImage!=undefined) this.uploadFlagFSSAI=true;
    if(name=="GST" || name=="GSTN"  && this.selectdepoMaster.GstImage!=undefined) this.uploadFlagGST=true;


  }
  showDialog(img,name) {
    debugger
    let img1 = [];
    this.imagelist = [];
    this.docName='';
    if (img != null && img.length !=0) {
      for (var i = 0; i < img.length; i++) {
        img1.push(this.baseURL + img[i]);
      }
      this.imagelist = img1;

      if(name=="PanCard"){this.proppan1=this.imagelist?this.imagelist.length:0}
      if(name=="FSSAI"){this.proppan2=this.imagelist?this.imagelist.length:0}
      if(name=="GST" || name=="GSTN"){this.proppan3=this.imagelist?this.imagelist.length:0}
      if(name=="CancelCheque"){
        this.proppan4=this.imagelist?this.imagelist.length:0;
      }
      this.docName = name;
      this.display = true;
    }
    else{
      alert('No document uploaded.')
      if(name=="PanCard"){
        this.myFiles = [];
        this.selectdepoMaster.PanCardImage=null;
        this.uploadPanCardProof();
      }
      if(name=="FSSAI"){
        this.myFiles = [];
        this.selectdepoMaster.FSSAIImage=null;
        this.uploadFSSAIProof();
      }
      if(name=="GSTN"){
        this.myFiles = [];
        this.selectdepoMaster.GstImage=null;
        this.uploadGSTProof();
      }
      if(name=="CancelCheque"){
        this.myFiles = [];
        this.selectdepoMaster.CancelCheque=null;
        this.uploadCancelChequeProof();
      }
    }
  }
  
  @ViewChild('takeInput', {static: false})
  InputVar: ElementRef;
  removeGSTimg() {
    debugger;
    this.selectdepoMaster.GstImage = null;
    this.uploadFlagGST = true;
    this.imageSrc=null;
    this.InputVar.nativeElement.value = "";
    this.proppan3=0;
  }
  @ViewChild('takeInput1', {static: false})
  InputVar1: ElementRef;
  removeFSSAIimg() {
    this.selectdepoMaster.FSSAIImage = null;
    this.uploadFlagFSSAI = true;
    this.imageSrc2=null;
    this.InputVar1.nativeElement.value = "";
    this.proppan2=0;
  }
  @ViewChild('takeInput2', {static: false})
  InputVar2: ElementRef;
  removePANimg() {
    this.selectdepoMaster.PanCardImage = null;
    this.uploadFlagPAN = true;
    this.imageSrc3=null;
    this.InputVar2.nativeElement.value = "";
    this.proppan1=0;
  }
  @ViewChild('takeInput3', {static: false})
  InputVar3: ElementRef;
  removeCancelChqimg() {
    this.selectdepoMaster.CancelCheque = null;
    this.uploadFlagCancelChq = true;
    this.imageSrc4=null;
    this.InputVar3.nativeElement.value = "";
    this.proppan4=0;
  }
  

  RemoveImage(index,docName){
    debugger;
    console.log(this.myFiles)
    if(docName=="PanCard"){
      if (index > -1)
      {
        this.imagelist.splice(index, 1);
        this.selectdepoMaster.PanCardImage.splice(index,1);
        this.proppan1=this.imagelist ? this.imagelist.length:0;
        if(this.imagelist.length==0){
          this.display=false;
          this.imageSrc3="";
          this.uploadFlagPAN=true;
        } 
      }
    }
   
    if(docName=="FSSAI"){
      if (index > -1) this.imagelist.splice(index, 1);
      this.selectdepoMaster.FSSAIImage.splice(index,1);
      this.proppan2=this.imagelist ? this.imagelist.length:0;
      if(this.imagelist.length==0){
        this.display=false;
        this.imageSrc2="";
        this.uploadFlagFSSAI=true;
      } 
    }
   
   
    if(docName=="GSTN"){
      if (index > -1) this.imagelist.splice(index, 1);
      this.selectdepoMaster.GstImage.splice(index,1);
      this.proppan3=this.imagelist ? this.imagelist.length:0;
      if(this.imagelist.length==0){
        this.display=false;
        this.imageSrc="";
        this.uploadFlagGST=true;
      } 
    }
    if(docName=="CancelCheque"){
      if (index > -1) this.imagelist.splice(index, 1);
      this.selectdepoMaster.CancelCheque.splice(index,1);
      this.proppan4=this.imagelist ? this.imagelist.length:0;

      if(this.imagelist.length==0){
        this.display=false;
        this.imageSrc4="";
        this.uploadFlagCancelChq=true;
      } 

    }
    if(this.imagelist.length==0)this.display=false;
    
    // //this.upload(index,"index"); 
    // console.log(this.proppanimage.nativeElement)
  }
  // DownloadFile(filepath)
  // {
  //   var a = document.createElement('a');
  //   a.href = filepath;
  //   a.download = "favicon.png";
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
      
  // }
  // downloadUrl(url: string) {
  //   const a: any = document.createElement('a');
  //   a.href = url;
  //   a.download = "image";
  //   document.body.appendChild(a);
  //   a.style = 'display: none';
  //   a.click();
  //   a.remove();
  // };

  imageSrc: string;
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
    } this.blocked=false;
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
    } this.blocked=false;
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
    } this.blocked=false;
  }
  imageSrc4:string;
  onFileChange4(event) {
    this.blocked=true;
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc4 = reader.result as string;
        this.blocked=false;
      }
    } this.blocked=false;
  }
  
  // download(room) {
  // //  window.location.assign(room)
  //   // console.log("Image",room);    
  //   // window.location.href=pdfUrl;
  //   //window.open(pdfUrl);  
  //   FileSaver.saveAs(room, 'Image');
  // }
  download(uri) 
{
  console.log("room",uri);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(uri);
  a.download = "title";
  document.body.appendChild(a);
  a.click();
  
  
    // var link = document.createElement("a");
    // link.download = name;
    // link.href = uri;
    // link.click();
}
  

numberOnly(event): boolean { 
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

 
  
}
