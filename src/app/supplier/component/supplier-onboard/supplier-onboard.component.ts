import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SupplierService } from 'app/shared/services/supplier.service';
import { AddNewSupplier } from 'app/shared/interface/supplier/addnewsupplier'
import { NgForm } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { SelectItem, MessageService } from 'primeng/api';
import { environment } from 'environments/environment';
import { timeStamp } from 'console';
import { MenuItem } from 'primeng/api';
import { DepotService } from 'app/shared/services/depot.service';
import { DialogModule } from 'primeng/dialog';
import { DateFormatorService } from 'app/shared/services/date-formator.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ViewChild,ElementRef } from '@angular/core';
import { BuyerService } from 'app/shared/services/buyer.service';
// import { IDropdownSettings } from '../../../shared/';


@Component({
  selector: 'app-supplier-onboard',
  templateUrl: './supplier-onboard.component.html',
  styleUrls: ['./supplier-onboard.component.scss'],

})

export class SupplierOnboardComponent implements OnInit {

  myFiles: string[] = [];

  isSupplier: boolean;
  items: MenuItem[];
  activeIndex: number = 0;
  baseURL: any;
  uploadFlagpan: boolean = true;
  uploadFlagAdd: boolean = true;
  uploadFlagfassi: boolean = true;
  uploadFlagBankAc: boolean = true;
  uploadFlaggstImage: boolean = true;
  uploadFlagAgreementImage: boolean = true;
  uploadFlagPropPan: boolean = true;
  file: any;
  active = 1;
  selectedSupplier: AddNewSupplier;
  url: any;
  id: any;
  result: any;
  public imagePath;
  imgURL: any;
  sellingBrandsList: any[];
  selectedItems: any;
  dropdownSettings = {};
  AddressProofs: any[];
  selectedAddressProof: string;
  typeoffirmsarray: any[];
  bankacctypearray: any[];
  suppliertypeArray: any[];
  loanReqFlag: boolean = false;
  isCheckedButton: any;
  text: string;
  errorMsg: any;
  citylist: any = [];
  statelist: any = [];
  brandlistid: any[];
  Proprietornamebytype: string;
  supplietyperequiredsign: boolean;
  display: boolean = false;
  imagelist: any[];
  public date = new Date();
  fileToUpload: File = null;
  docName :string;
  images=[]
  myForm;

  blocked:boolean=false
 
  statusforcheck:boolean=false;
  texts:string="";
  isshow:boolean =false;
  fathernamerequired:boolean;

  constructor(private router: Router, private supplierService: SupplierService,
    private messageService: MessageService
	,private DepotService: DepotService 
	,private buyerservice:BuyerService) {
    this.baseURL = environment.apiURL;
  }
  

  ngOnInit() {
    this.isCheckedButton = 'true';
    this.isSupplier = false;
    this.items = [{
      label: 'General Info',
      command: (event: any) => {
        this.activeIndex = 0;
        // this.messageService.add({severity:'info', summary:'General Info', detail: event.item.label});
        // this.text='jyoti';
      }
    },
    {
      label: 'Bank Details',
      command: (event: any) => {
        this.activeIndex = 1;
        // this.messageService.add({severity:'info', summary:'Bank Details', detail: event.item.label});
      }
    },
    {
      label: 'Address',
      command: (event: any) => {
        this.activeIndex = 2;
        // this.messageService.add({severity:'info', summary:'Address', detail: event.item.label});
      }
    },
    {
      label: 'Summary',
      command: (event: any) => {
        this.activeIndex = 3;
        // this.messageService.add({severity:'info', summary:'Summary', detail: event.item.label});
      }
    }
    ];

    this.getSellingBrandesList();
    console.log(this.selectedSupplier, 'sele')
    this.selectedSupplier = {
      City: null,
      id: 0,
      supplierId: 0,
      Stateid: 0,
      StateName: null,
      Cityid: 0,
      CityName: null,
      supplierName: null,
      typeofFirm: null,
      proprietorName: null,
      proprietorphonenumber:null,
      panNumber: null,
      PanNumberImage: null,
      addressProofType: '',
      AddressProofImage: null,
      GSTImage: null,
      emailId: null,
      mobileNo: null,
      creditScore: null,
      fatherName: null,
      isLoanRequirement: false,
      loanAmount: null,
      supplierType: null,
      // sellingBrands: [],
      SellingBrandDCs: null,
      businessEstablishmentYear: null,
      gstinno: null,
      FSSAINO: null,
      FSSAIImage: null,
      ChequeImage: null,
      fullBusinessAddress: null,
      headOffice: null,
      pinCode: null,
      bankAccType: null,
      bankAccNo: null,
      bankAddress: null,
      bankName: null,
      bankPinCode:null,
      ifscCode: null,
      userid: 0,
      Comments: null,
      suppliercodes: null,
      isStopAdvancePr: false,
      isIRNInvoiceRequired: false,
      password: null,
      webUrl: null,
      contactPerson: null,
      bussinessType: null,
      ExpiryDays:null,
      StartedBusiness: new Date(),
      paymentTerms: null,
      Message: '',
      Status: null,
      SupplierSegment: null,
      ContactPersonMobileNo: null,
      ProprietorPanNumber: null,
      AgreementImage: null,
      ProprietorPanImage: null,
      // --comment by anjali
      IsVerified:false,
      Active:true,
      Deleted:false,
      PanNumberImages:[],
      AddressProofImages:[],
      AgreementImages :[],
      ChequeImages:[],
      FSSAIImages :[],
      GSTImages:[],
      ProprietorPanImages :[],
      MSMEImage:[],
      MSMEType:null,
     BuyerId: 0,
     BuyerName: null,
    }

    this.DepotService.Getstates().subscribe(x => {
      this.statelist = x;
      console.log(this.statelist, 'ss')
    })
    this.GetBuyers();
  }

  getcity(stateid) {
    this.DepotService.Getcity(stateid).subscribe(y => {
      this.citylist = y;
    })
  }

  changeDay()
  {
    debugger;
    if(this.selectedSupplier.bussinessType=="Direct from company")
    {
      this.selectedSupplier.ExpiryDays=15;
    }
    else{
      this.selectedSupplier.ExpiryDays=7;
    }
  }

  showDialog(img,name) {
    debugger
    let img1 = [];
    this.imagelist = [];
    this.docName ='';
    if (img != null && img.length != 0) {
      for (var i = 0; i < img.length; i++) {
        img1.push(this.baseURL + img[i]);
      }
      this.imagelist = img1;
      if(name=="MSME"){this.proppan8=this.imagelist && this.imagelist.length <= 1? this.imagelist.length:0}
      if(name=="Pan Card"){this.proppan1=this.imagelist?this.imagelist.length:0}
      if(name=="Address proof"){this.proppan2=this.imagelist?this.imagelist.length:0}
      if(name=="FSSAI"){this.proppan3=this.imagelist?this.imagelist.length:0}
      if(name=="Bank A/C"){this.proppan4=this.imagelist?this.imagelist.length:0}
      if(name=="GST" || name=="GSTIN"){this.proppan5=this.imagelist?this.imagelist.length:0}
      if(name=="Agreement"){this.proppan6=this.imagelist?this.imagelist.length:0}
      if(name=="Proprietor" || name=="Partnership" || name== "LLP"|| name=="Private Limited"|| name=="Limited" || name == "Partner" || name=="Director"){
        this.proppan7=this.imagelist?this.imagelist.length:0;
      }
      
      this.docName = name;
      this.display = true;
    }
    else{
      if(this.imagelist.length==0){
        alert('No document uploaded');
        if(name=="MSME"){
          this.selectedSupplier.MSMEImage=[];
          this.uploadMSMEImage();
        }
        if(name=="Pan Card"){
          this.myFiles = [];
          this.selectedSupplier.PanNumberImage=[];
          this.uploadPanCardProof();
        }
        if(name=="Address proof"){
          this.myFiles = [];
          this.selectedSupplier.AddressProofImage=[];
          this.uploadAddressProof();
        }
        if(name=="FSSAI"){
          this.myFiles = [];
          this.selectedSupplier.FSSAIImage=[];
          this.uploadhassiImage();
        }
        if(name=="Bank A/C"){
          this.myFiles = [];
          this.selectedSupplier.ChequeImage=[];
          this.uploadBankAcImage();
        }
        if(name=="GST"){
          this.myFiles = [];
          this.selectedSupplier.GSTImage=[];
          this.uploadgstImage();
        }
        if(name=="Agreement"){
          this.myFiles = [];
          this.selectedSupplier.AgreementImage=[];
          this.uploadAgreementImage();
        }
        if(name=="GSTN"){
          this.myFiles = [];
          this.selectedSupplier.GSTImage=[];
          this.uploadgstImage();
        }
        if(name=="Proprietor" || name=="Partnership" || name== "LLP"|| name=="Private Limited"|| name=="Limited" || name == "Partner" || name=="Director"){
          this.myFiles = [];
          this.selectedSupplier.ProprietorPanImage=[];
          this.uploadPropPanImagProof();
        }

      }
    }
  }

  proppan1:number=0;
  proppan2:number=0;
  proppan3:number=0;
  proppan4:number=0;
  proppan5:number=0;
  proppan6:number=0;
  proppan7:number=0;
  proppan8:number=0;
  //remove image
  RemoveImage(index,docName,Proprietornamebytype?){
    debugger
    let check=null;
    if(docName!=Proprietornamebytype){
      check=true;
    }
    else{
      check=false;
    }

    console.log("this.selectedSupplier.ProprietorPanImage",this.selectedSupplier.ProprietorPanImage)
    if((docName=="MSME" ) && check==true ){
      if (index > -1)
      {
        this.imagelist.splice(index, 1);
        this.selectedSupplier.MSMEImage && this.selectedSupplier.MSMEImage.length>0 ?this.selectedSupplier.MSMEImage.splice(index,1):alert('select documemt');
        this.proppan8=this.imagelist ? this.imagelist.length:0;
        if(this.imagelist.length==0){
          this.display=false;
          this.imageSrc8="";
          this.uploadFlagMSME=true;
        } 
        else{
          this.imageSrc8=this.imagelist[0];
        }
      }
    }

    if((docName=="Pan Card" ) && check==true ){
      if (index > -1)
      {
        this.imagelist.splice(index, 1);
        this.selectedSupplier.PanNumberImage && this.selectedSupplier.PanNumberImage.length>0 ?this.selectedSupplier.PanNumberImage.splice(index,1):alert('select documemt');
        this.proppan1=this.imagelist ? this.imagelist.length:0;
        if(this.imagelist.length==0){
          this.display=false;
          this.imageSrc1="";
          this.uploadFlagpan=true;
        } 
        else{
          this.imageSrc1=this.imagelist[0];
        }
      }
    }
    if(docName=="Address proof"){
      if (index > -1) this.imagelist.splice(index, 1);
      this.selectedSupplier.AddressProofImage && this.selectedSupplier.AddressProofImage.length>0?this.selectedSupplier.AddressProofImage.splice(index,1):alert('select documemt');;
      this.proppan2=this.imagelist ? this.imagelist.length:0;
      if(this.imagelist.length==0){
        this.display=false;
        this.imageSrc2="";
        this.uploadFlagAdd=true;
      } else{
        this.imageSrc2=this.imagelist[0];
      }
    }
    if(docName=="FSSAI" ){
      if (index > -1) this.imagelist.splice(index, 1);
      this.selectedSupplier.FSSAIImage && this.selectedSupplier.FSSAIImage.length>0 ?this.selectedSupplier.FSSAIImage.splice(index,1):alert('select documemt');;
      this.proppan3=this.imagelist ? this.imagelist.length:0;
      if(this.imagelist.length==0){
        this.display=false;
        this.imageSrc3="";
        this.uploadFlagfassi=true;
      } else{
        this.imageSrc3=this.imagelist[0];
      }
    }
    if(docName=="Bank A/C" ){
      if (index > -1) this.imagelist.splice(index, 1);
      this.selectedSupplier.ChequeImage && this.selectedSupplier.ChequeImage.length>0?this.selectedSupplier.ChequeImage.splice(index,1):alert('select documemt');;
      this.proppan4=this.imagelist ? this.imagelist.length:0;
      if(this.imagelist.length==0){
        this.display=false;
        this.imageSrc4="";
        this.uploadFlagBankAc=true;
      } else{
        this.imageSrc4=this.imagelist[0];
      }
    }
    if(docName=="GST"){
      if (index > -1) this.imagelist.splice(index, 1);
      this.selectedSupplier.GSTImage && this.selectedSupplier.GSTImage.length>0?this.selectedSupplier.GSTImage.splice(index,1):alert('select documemt');;
      this.proppan5=this.imagelist ? this.imagelist.length:0;
      if(this.imagelist.length==0){
        this.display=false;
        this.imageSrc5="";
        this.uploadFlaggstImage=true;
      } else{
        this.imageSrc5=this.imagelist[0];
      }
    }
    if(docName=="Agreement"){
      if (index > -1) this.imagelist.splice(index, 1);
      this.selectedSupplier.AgreementImage && this.selectedSupplier.AgreementImage.length>0?this.selectedSupplier.AgreementImage.splice(index,1):alert('select documemt');;
      this.proppan6=this.imagelist ? this.imagelist.length:0;
      if(this.imagelist.length==0){
        this.display=false;
        this.imageSrc6="";
        this.uploadFlagAgreementImage=true;
      } else{
        this.imageSrc6=this.imagelist[0];
      }
    }
    if(docName=="GSTN"){
      if (index > -1) this.imagelist.splice(index, 1);
      this.selectedSupplier.GSTImage && this.selectedSupplier.GSTImage.length>0?this.selectedSupplier.GSTImage.splice(index,1):alert('select documemt');;
      this.proppan5=this.imagelist ? this.imagelist.length:0;
      if(this.imagelist.length==0){
        this.display=false;
        this.imageSrc5="";
        this.uploadFlaggstImage=true;
      } else{
        this.imageSrc5=this.imagelist[0];
      }
    }
    // (33),(52),(53),(54),(55),(67),(74),(76),(77),(78),(86),(92),(10),(95),(1),(7),(9),(12),(169),(213),(220),(221),(222),(224),(225),(226),(227),(228),(229),(230),(232),(238),(239),(241),(242),(243)
    if((Proprietornamebytype!="Proprietor" && ( Proprietornamebytype=="Partnership" || Proprietornamebytype== "LLP"|| Proprietornamebytype=="Private Limited"|| Proprietornamebytype=="Limited" || Proprietornamebytype == "Partner" || Proprietornamebytype=="Director") 
        ) && check==false)
    {
      if (index > -1) this.imagelist.splice(index, 1);
      this.selectedSupplier.ProprietorPanImage!=null && this.selectedSupplier.ProprietorPanImage.length>0 ? this.selectedSupplier.ProprietorPanImage.splice(index,1) : alert('select documemt');
      this.proppan7=this.imagelist ? this.imagelist.length : 0 ;
      if(this.imagelist.length==0){
        this.display=false;
        this.imageSrc="";
        this.uploadFlagPropPan=true;
      } else{
        this.imageSrc=this.imagelist[0];
      }
    }
    if(this.imagelist && this.imagelist.length==0)
    {
      this.display=false;
    }
    // //this.upload(index,"index"); 
    // console.log(this.proppanimage.nativeElement)
  }
   
  onSave(form: NgForm) {
    debugger
    console.log(form.value, 'form');
    var thisarray = [];
    // var array=this.selectedSupplier.SellingBrandDCs;
    // console.log(array,'array');
    // array.forEach(element => {
    //   thisarray.push(element.SubCategoryId);
    // });
    this.selectedSupplier.SellingBrandDCs = this.brandlistid;
    if(this.selectedSupplier.ExpiryDays==0)
    {
      alert("Please enter Expiry days greater than 0 ");
      return false;
    }
    
    this.blocked=true
    // this.selectedSupplier.isLoanRequirement = form.controls['isLoanRequirement'].value;
    this.supplierService.PostNewSupplier(this.selectedSupplier).subscribe(x => {
      this.errorMsg = x.Message;
      if (x.Status) {
        this.blocked=false 
        alert(this.errorMsg);
        this.messageService.add({ severity: 'success', summary: this.errorMsg, detail: '' });
        this.router.navigate(['/layout/supplier/newsupplierlist']);
      } else {
        this.blocked=false 
        this.messageService.add({ severity: 'error', summary: this.errorMsg, detail: '' });
        console.log('formadded', x);
        console.log(this.errorMsg, 'errormsg');
      }

      // this. errorMsg = x.Message;
      // console.log('formadded',x); 
      // alert(this. errorMsg)
    })
    
    // this.router.navigate(['/layout/supplier/newsupplierlist']);

  }

  moveToSelectedTab(tabName: string) {
    // for (let i =0; i< document.querySelectorAll('activeIndex').length; i++) {
    //     if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) {
    //       (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
    //     }
    //   }
  }

  upload(e,name?) {
    debugger;
    this.blocked=false;
    console.log (e.target.files);  
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }

    if(name=="MSME"){this.proppan8=this.myFiles?this.myFiles.length:0}
    // if(name=="MSME"){this.imageSrc8=this.myFiles.length==0?this.imageSrc8:""}
    if(name=="MSME" && this.selectedSupplier.MSMEImage!=undefined) this.uploadFlagMSME=true;

    if(name=="Pan Card"){this.proppan1=this.myFiles?this.myFiles.length:0}
    if(name=="Pan Card" && this.selectedSupplier.PanNumberImage!=undefined) this.uploadFlagpan=true;

    if(name=="Address proof"){this.proppan2=this.myFiles?this.myFiles.length:0}
    if(name=="Address proof" && this.selectedSupplier.AddressProofImage!=undefined) this.uploadFlagAdd = true;


    if(name=="FSSAI"){this.proppan3=this.myFiles?this.myFiles.length:0}
    if(name=="FSSAI" && this.selectedSupplier.FSSAIImage!=undefined) this.uploadFlagfassi = true;

    if(name=="Bank A/C"){this.proppan4=this.myFiles?this.myFiles.length:0}
    if(name=="Bank A/C" && this.selectedSupplier.ChequeImage!=undefined) this.uploadFlagBankAc = true;

    if(name=="GST" || name=="GSTIN"){this.proppan5=this.myFiles?this.myFiles.length:0}
    if(name=="GST" || name=="GSTIN" && this.selectedSupplier.GSTImage!=undefined) this.uploadFlaggstImage = true;


    if(name=="Agreement"){this.proppan6=this.myFiles?this.myFiles.length:0}
    if(name=="Agreement" && this.selectedSupplier.AgreementImage!=undefined) this.uploadFlagAgreementImage = true;

    if(name=="Proprietor" || name=="Partnership" || name== "LLP"|| name=="Private Limited"|| name=="Limited" || name == "Partner" || name=="Director"){
      this.proppan7=this.myFiles?this.myFiles.length:0}
    if((name=="Proprietor" || name=="Partnership" || name== "LLP"
    ) 
    && this.selectedSupplier.ProprietorPanImage!=undefined)
    {
      this.uploadFlagPropPan=true;    
    }
    


  }
  
  @ViewChild('proppanimage', {static: false})
  proppanimage: ElementRef;
  uploadPropPanImagProof() {
    debugger;
    if (!this.myFiles) {
      this.messageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return false;
    }
    if (this.myFiles && this.myFiles.length>0) {
      const frmData = new FormData();
      for (var i = 0; i < this.myFiles.length; i++) {
        frmData.append("Proppancard", this.myFiles[i]);
      }
      debugger;
      // if (this.file) {
      //   let formData = new FormData();
      //   formData.append('file', this.file[0], 'pancard.jpg');
      this.blocked=true;
      this.supplierService.UploadSupplierDocMulti(frmData).subscribe(result => {
        this.blocked=false;
        console.log(result)
        this.selectedSupplier.ProprietorPanImage = result;
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.file = [];
        this.myFiles = [];
        this.uploadFlagPropPan = false;
      }, (err) => {
        alert("Document Size is more then 20 mb");
        this.proppan7=0;
        this.file = [];
        this.myFiles = [];
        this.uploadFlagPropPan = true; 
        this.blocked=false;
        this.imageSrc="";
        this.proppanimage.nativeElement.value="";
        this.selectedSupplier.ProprietorPanImage=undefined;
      });
    }
    else{
      this.selectedSupplier.ProprietorPanImage=undefined;
      this.file = [];
      this.myFiles = [];
      this.uploadFlagPropPan = true; 
      this.imageSrc="";
      this.blocked=false;
      alert('please choose file');
      this.proppan7=0;
      this.display=false;
    }
  }
  removePropPanImagProof()
  {
    this.selectedSupplier.ProprietorPanImage=undefined;
      this.file = [];
      this.myFiles = [];
      this.uploadFlagPropPan = true; 
      this.imageSrc="";
      this.blocked=false;
      this.proppan7=0;
      this.display=false;
  }

  @ViewChild('pancardimage', {static: false})
  pancardimage: ElementRef;
  uploadPanCardProof() {

     debugger;

    if (!this.myFiles && this.myFiles.length==0) {
      this.messageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.myFiles && this.myFiles.length>0) {
      const frmData = new FormData();
      for (var i = 0; i < this.myFiles.length; i++) {
        frmData.append("pancard", this.myFiles[i]);
      }
      // if (this.file) {

      //   let formData = new FormData();
      //   formData.append('file', this.file[0], 'pancard.jpg');
      this.blocked=true;
      this.supplierService.UploadSupplierDocMulti(frmData).subscribe(result => {
        this.blocked=false;
        console.log(result)
        this.selectedSupplier.PanNumberImage = result;
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.file = [];
        this.myFiles = [];
        this.uploadFlagpan = false;
      }, (err) => {
        alert("Document Size is more then 20 mb");
        this.file = [];
        this.myFiles = [];
        this.uploadFlagpan = true; 
        this.blocked=false;
        this.imageSrc1="";      this.proppan1=0;
        this.pancardimage.nativeElement.value="";
      });
    }
    else{
      this.file = [];
      this.myFiles = [];
      this.uploadFlagpan = true; 
      this.blocked=false;
      this.imageSrc1="";
      this.pancardimage.nativeElement.value="";
      this.display=false;
      this.proppan1=0;
      this.selectedSupplier.PanNumberImage=undefined;
      alert('please choose file');
    }
  }
  removePanCardProof()
  {
    this.file = [];
      this.myFiles = [];
      this.uploadFlagpan = true; 
      this.blocked=false;
      this.imageSrc1="";
      this.pancardimage.nativeElement.value="";
      this.display=false;
      this.proppan1=0;
      this.selectedSupplier.PanNumberImage=undefined;
  }

  @ViewChild('addressproofimage', {static: false})
  addressproofimage: ElementRef;
  uploadAddressProof() {
    // debugger
    if (!this.myFiles) {
      this.messageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.myFiles && this.myFiles.length>0) {
      const frmData = new FormData();
      for (var i = 0; i < this.myFiles.length; i++) {
        frmData.append("AddressProof", this.myFiles[i]);
      }
      // let formData = new FormData();
      this.blocked=true;
      //formData.append('file', this.file[0], 'addressproof.jpg')
      
      this.supplierService.UploadSupplierDocMulti(frmData).subscribe(result => {
        this.blocked=false;
        console.log(result)
        this.selectedSupplier.AddressProofImage = result;
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.file = [];
        this.myFiles = [];
        this.uploadFlagAdd = false;
      }, (err) => {
        alert("Document Size is more then 20 mb");
        this.file = [];
        this.myFiles = [];
        this.uploadFlagAdd = true; 
        this.blocked=false;
        this.imageSrc2="";
        this.proppan2=0;
        this.addressproofimage.nativeElement.value="";
      });
    }
    else{
        this.file = [];
        this.myFiles = [];
        this.uploadFlagAdd = true; 
        this.blocked=false;
        this.imageSrc2="";
        this.addressproofimage.nativeElement.value="";
        this.display=false;
        this.proppan2=0;
        this.selectedSupplier.AddressProofImage=undefined;
        alert('please choose file');
    }
  }

  RemoveAddressProof()
  {
    this.file = [];
    this.myFiles = [];
    this.uploadFlagAdd = true; 
    this.blocked=false;
    this.imageSrc2="";
    this.addressproofimage.nativeElement.value="";
    this.display=false;
    this.proppan2=0;
    this.selectedSupplier.AddressProofImage=undefined;
  }

  @ViewChild('fssaimage', {static: false})
  fssaimage: ElementRef;

  uploadhassiImage() {
    // debugger
    if (!this.myFiles) {
      this.messageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if(this.selectedSupplier.FSSAIImage!=undefined) this.uploadFlagfassi = true; 
    if (this.myFiles && this.myFiles.length>0) {
      // let formData = new FormData();
      // formData.append('file', this.file[0], 'fssaiImage.jpg')
      const frmData = new FormData();
      for (var i = 0; i < this.myFiles.length; i++) {
        frmData.append("FSSAIImage", this.myFiles[i]);
      }
      this.blocked=true;
      this.supplierService.UploadSupplierDocMulti(frmData).subscribe(result => {
        this.blocked=false;
        console.log(result)
        this.selectedSupplier.FSSAIImage = result;
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.file = [];
        this.myFiles = [];
        this.uploadFlagfassi = false;
      }, (err) => {
        alert("Document Size is more then 20 mb");
        this.file = [];
        this.myFiles = [];
        this.uploadFlagfassi = true; 
        this.blocked=false;
        this.imageSrc3="";        this.proppan3=0;
        this.fssaimage.nativeElement.value="";
      });
    }
    else{
      this.file = [];
        this.myFiles = [];
        this.uploadFlagfassi = true; 
        this.blocked=false;
        this.imageSrc3="";
        this.proppan3=0;
        this.fssaimage.nativeElement.value="";
      this.display=false;
      this.selectedSupplier.FSSAIImage=undefined;
      alert('please choose file');
    }
  }

  removeFassiImage()
  {
    this.file = [];
    this.myFiles = [];
    this.uploadFlagfassi = true; 
    this.blocked=false;
    this.imageSrc3="";
    this.proppan3=0;
    this.fssaimage.nativeElement.value="";
    this.display=false;
    this.selectedSupplier.FSSAIImage=undefined;
  }

  @ViewChild('bankacimage', {static: false})
  bankacimage: ElementRef;
  uploadBankAcImage() {
    debugger
    if (!this.myFiles) {
      this.messageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.myFiles && this.myFiles.length>0) {
      //let formData = new FormData();
      //formData.append('file', this.file[0], 'bankAcImage.jpg')
      const frmData = new FormData();
      for (var i = 0; i < this.myFiles.length; i++) {
        frmData.append("BankAccount", this.myFiles[i]);
      }
      this.blocked=true;
      this.supplierService.UploadSupplierDocMulti(frmData).subscribe(result => {
        this.blocked=false;
        console.log(result)
        this.selectedSupplier.ChequeImage = result;
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.file = [];
        this.myFiles = [];
        this.uploadFlagBankAc = false;
      }, (err) => {
        alert("Document Size is more then 20 mb");
        this.file = [];
        this.myFiles = [];
        this.uploadFlagBankAc = true; 
        this.blocked=false;
        this.imageSrc4="";    this.proppan4=0;
        this.bankacimage.nativeElement.value="";
      });
    }
    else{    
      this.display=false;
      this.file = [];
        this.myFiles = [];
        this.uploadFlagBankAc = true; 
        this.blocked=false;
        this.imageSrc4="";
        this.proppan4=0;
        this.bankacimage.nativeElement.value="";
        this.selectedSupplier.ChequeImage=undefined;
      alert('please choose file');
    }
  }

  RemoveBankAcImage()
  {
    this.display=false;
    this.file = [];
    this.myFiles = [];
    this.uploadFlagBankAc = true; 
    this.blocked=false;
    this.imageSrc4="";
    this.proppan4=0;
    this.bankacimage.nativeElement.value="";
    this.selectedSupplier.ChequeImage=undefined;
  }
  @ViewChild('gstimage', {static: false})
  gstimage: ElementRef;
  uploadgstImage() {
    if (!this.myFiles) {
      this.messageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.myFiles && this.myFiles.length>0) {
      //let formData = new FormData();
      //formData.append('file', this.file[0], 'gstImage.jpg')
      const frmData = new FormData();
      for (var i = 0; i < this.myFiles.length; i++) {
        frmData.append("GSTImage", this.myFiles[i]);
      }
      this.blocked=true;
      this.supplierService.UploadSupplierDocMulti(frmData).subscribe(result => {
        this.blocked=false;
        console.log(result)
        this.selectedSupplier.GSTImage = result;
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.file = [];
        this.myFiles = [];
        this.uploadFlaggstImage = false;
      }, (err) => {
        alert("Document Size is more then 20 mb");
        this.file = [];
        this.myFiles = [];
        this.uploadFlaggstImage = true; 
        this.blocked=false;
        this.imageSrc5="";this.proppan5=0;
        this.gstimage.nativeElement.value="";
      });
    }
    else{
      this.display=false;
      this.file = [];
      this.myFiles = [];
      this.uploadFlaggstImage = true; 
      this.blocked=false;
      this.imageSrc5="";
      this.proppan5=0;
      this.gstimage.nativeElement.value="";
      this.selectedSupplier.GSTImage=undefined
      alert('please choose file');
    }
  }
  RemovegstImage()
  {
    this.display=false;
    this.file = [];
    this.myFiles = [];
    this.uploadFlaggstImage = true; 
    this.blocked=false;
    this.imageSrc5="";
    this.proppan5=0;
    this.gstimage.nativeElement.value="";
    this.selectedSupplier.GSTImage=undefined
  }

  @ViewChild('agreementimage', {static: false})
  agreementimage: ElementRef;
  uploadAgreementImage() {
    if (!this.myFiles) {
      this.messageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.myFiles && this.myFiles.length>0) {
      //let formData = new FormData();
      //formData.append('file', this.file[0], 'gstImage.jpg')
      const frmData = new FormData();
      for (var i = 0; i < this.myFiles.length; i++) {
        frmData.append("AgreementImage", this.myFiles[i]);
      }
      this.blocked=true;
      this.supplierService.UploadSupplierDocMulti(frmData).subscribe(result => {
        this.blocked=false;
        console.log(result)
        this.selectedSupplier.AgreementImage = result;
        this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.file = [];
        this.myFiles = [];
        this.uploadFlagAgreementImage = false; 
      }, (err) => {
        alert("Document Size is more then 20 mb");
        this.file = [];
        this.myFiles = [];
        this.uploadFlagAgreementImage = true; 
        this.blocked=false;
        this.imageSrc6="";    this.proppan6=0;
        this.agreementimage.nativeElement.value="";
      });
    }
    else{
      this.display=false;
      this.file = [];
      this.myFiles = [];
      this.proppan6=0;
      this.uploadFlagAgreementImage = true; 
      this.blocked=false;
      this.imageSrc6="";
      this.agreementimage.nativeElement.value="";
      this.selectedSupplier.AgreementImage=undefined;
      alert('please choose file');
    }
  }
  RemoveAgreementImage()
  {
    this.display=false;
    this.file = [];
    this.myFiles = [];
    this.proppan6=0;
    this.uploadFlagAgreementImage = true; 
    this.blocked=false;
    this.imageSrc6="";
    this.agreementimage.nativeElement.value="";
    this.selectedSupplier.AgreementImage=undefined;
  }
  // upload(file: File[]) {
  //   this.file = file;
  //   var reader = new FileReader();
  //   this.imagePath = file;
  //   reader.readAsDataURL(file[0]);
  //   reader.onload = (_event) => {
  //     this.imgURL = reader.result;
  //     console.log(this.imgURL, 'urlimg')
  //   }
  //   (success) => {
  //     alert("image uploaded successfully")

  //   };
  // }
  isGstClick:boolean
   SuplierPincode:number
   VarifiedSupplierGSTNO(text:string) {
    console.log("GstNo",text);
    
    if (text.length == 15) {
      // this.blocked = true;
      this.blocked=true;
      this.supplierService.CheckVerifiedSuppierGSTNO(text).subscribe(result => {
        console.log("result",result);

        this.isGstClick=true

        console.log(result.Address);
        
        
         if (result.IsVerify) {
          this.blocked=false;
          this.selectedSupplier.fullBusinessAddress=result.Address;
          this.selectedSupplier.pinCode=result.Pincode
          this.SuplierPincode=result.Pincode
          console.log("Pincode",result.Pincode);
          
          
          
        //   this.blocked = false;
        //   this.customer.NameOnGST = result.custverify.Name;
        //   this.customer.BillingCity = result.custverify.City;
        //   this.customer.BillingState = result.custverify.State;
        //   this.customer.BillingZipCode = result.custverify.Zipcode;
        //   this.customer.BillingAddress = result.custverify.ShippingAddress;
        //   this.GSTData = result.custverify;
        //   this.GSTdisplay = true;
        //   this.IsGstDisturb = false;
        //   this.IsBillingAddEditable = true;
         }
         else{
          this.blocked=false;
          alert(result.Message);
        this.selectedSupplier.gstinno=''
         }
         
        //  else { this.blocked = false; alert("Invalid  GST/TIN_No/Ref No."); }
      })
    } 
    else { 
      
      this.selectedSupplier.gstinno=''
      alert("Pls enter valid GST/TIN_No/Ref No. For eg. - 23AAVCS1981Q1ZE"); 
    }
    
   }

  public postbrand: any[];
  getSellingBrandesList() {
    this.supplierService.getSellingBrands().subscribe(data => {
      console.log(data, 'data')
      this.sellingBrandsList = data;
    })
  }

  setradio() {
    // this.checkedThis=true;
    this.loanReqFlag = false;
  }
  setradioyes() {
    this.loanReqFlag = true;
  }

  next(formName) {
    debugger
    this.display = false;
    console.log(this.selectedSupplier.SellingBrandDCs, 'branfs')
    // this.selectedSupplier.SellingBrandDCs;
    // if (!this.selectedSupplier.SellingBrandDCs) {
    //   this.messageService.add({ severity: 'error', summary: "Please Select Selling Brands", detail: '' });
    //   return;
    // }
    if(this.selectedSupplier.MSMEType=="Registered" && this.selectedSupplier.MSMEImage.length == 0){
      this.messageService.add({severity:'error', summary:"Please upload MSME Doc.", detail:''});
      return false;
    }
    if(this.selectedSupplier.supplierType==null){
      this.messageService.add({severity:'error', summary:"Please select supplier type", detail:''});
      return false;
    }
    if(this.selectedSupplier.SupplierSegment==null){
      this.messageService.add({severity:'error', summary:"Please select supplier segment", detail:''});
      return false;
    }
    // if (this.selectedSupplier.ProprietorPanNumber != '') {
    //   if (this.uploadFlagPropPan == true) {
    //     this.messageService.add({ severity: 'error', summary: "Please upload " + this.Proprietornamebytype + " pan card proof images", detail: '' });
    //     return false;
    //   }
    // }
    if ((this.uploadFlagpan == true ) ) {
      this.messageService.add({ severity: 'error', summary: "Please upload pan  images", detail: '' });
      return false;
    }
    if(this.uploadFlagAdd == true){
      if(this.selectedSupplier.typeofFirm !='Private Limited' && this.selectedSupplier.typeofFirm !='Limited'){
        this.messageService.add({ severity: 'error', summary: "Please upload address proof images", detail: '' });
      return false;
      }
      
    }
    if (this.selectedSupplier.SupplierSegment != 'Non Food') {
      if (this.selectedSupplier.FSSAINO == null || this.selectedSupplier.FSSAINO == '') {
        this.messageService.add({ severity: 'error', summary: "Please enter Fssai No", detail: '' });
        return false;
      }
      if (this.uploadFlagfassi == true) {
        this.messageService.add({ severity: 'error', summary: "Please Upload Fssai Image", detail: '' });
        return false;
      }
    }
    if(this.fathernamerequired==true){
      if(this.selectedSupplier.fatherName==null || this.selectedSupplier.fatherName == ''){
        this.messageService.add({severity: 'error', summary: "Please enter Father/Husband Name", detail: ''});
        return false;
      }
    }debugger;
    if (!this.selectedSupplier.BuyerId || !this.selectedSupplier.BuyerId) {
      this.messageService.add({ severity: 'error', summary: "Please Select Buyer", detail: '' });
      return false;
    }
    // if(this.selectedSupplier.typeofFirm != 'Limited'){
    //   if(this.selectedSupplier.fatherName == null || this.selectedSupplier.fatherName == ''){
    //     this.messageService.add({severity:'error',summary:"Please Enter Father/Husband Name", detail:''})
    //     return false;
    //   }
    // }
    if (formName.invalid) {
      formName.invalid = true;
    }
    else {
      this.activeIndex = 1;
    }
  }

  next2(formName) {
    // console.log(this.selectedSupplier.SellingBrandDCs,'branfs')
    // this.selectedSupplier.SellingBrandDCs;
    // if(!this.selectedSupplier.SellingBrandDCs){
    //   this.messageService.add({ severity: 'error', summary: "Please Select Selling Brands", detail: '' });
    //   return;
    // }
    this.display = false;
    if (this.uploadFlagBankAc == true) {
      this.messageService.add({ severity: 'error', summary: "Please Upload Bank A/C Image", detail: '' });
      return false;
    }
    if (formName.invalid) {
      formName.invalid = true;
    }
    else {
      this.activeIndex = 2;
    }
  }

 
  next3(formName) {
    
    this.display = false;
    if (this.uploadFlaggstImage == true) {
      this.messageService.add({ severity: 'error', summary: "Please Upload Gst Image", detail: '' });
      return false;
    }
    if (this.uploadFlagAgreementImage == true) {
      this.messageService.add({ severity: 'error', summary: "Please Upload Agreement Image", detail: '' });
      return false;
    }
    if (!this.selectedSupplier.Stateid || !this.selectedSupplier.Cityid) {
      this.messageService.add({ severity: 'error', summary: "Please Select State and City", detail: '' });
      return false;
    }
    if (this.selectedSupplier.ExpiryDays==0 ) {
      this.messageService.add({ severity: 'error', summary: "Please Enter Expiry days greater than 0", detail: '' });
      return false;
    }
    this.selectedSupplier.SellingBrandDCs;
    if (formName.invalid) {
      // alert('please fill details')
      formName.invalid = true;
      return false;
    }
    else {
      if(this.isGstClick==true){
        this.activeIndex = 3;
      }
      else{
        this.messageService.add({ severity: 'error', summary: "Please Verify Gst Number", detail: '' });
      }      
    }
  }
  onEventTypeYes(seletedData) {
    this.selectedSupplier.isLoanRequirement = true;
    this.isCheckedButton = 'false';
  }
  onEventTypeNo(seletedData) {
    this.selectedSupplier.isLoanRequirement = false;
  }

  selectedBands() {
    var a = [];
    this.brandlistid = [];
    console.log("this.selectedCategory", this.selectedSupplier.SellingBrandDCs)
    this.selectedSupplier.SellingBrandDCs.forEach(element => {
      console.log(element.SubCategoryId);
      a.push(element.SubCategoryId);
    });
    this.brandlistid = a;
  }

  TypeofFirmchange(typeoffirm) {
    debugger
    if (typeoffirm == 'Proprietor') {
      this.Proprietornamebytype = 'Proprietor';
      this.fathernamerequired=true;
    }
    else if (typeoffirm == 'Partnership') {
      this.Proprietornamebytype = 'Partner';
      this.fathernamerequired=true;
    }
    else if (typeoffirm == 'LLP') {
      this.Proprietornamebytype = 'Partner';
      this.fathernamerequired=true;
    }
    else if (typeoffirm == 'Private Limited') {
      this.Proprietornamebytype = 'Director';
      this.fathernamerequired=true;
    }
    else if (typeoffirm == 'Limited') {
      this.Proprietornamebytype = 'Director';
      this.fathernamerequired=false;
    }

  }
  SupplierTypechange(supplietypee) {
    if (supplietypee == 'Non Food') {
      this.supplietyperequiredsign = false;
    }
    else {
      this.supplietyperequiredsign = true;
    }
  }


  urls = [];
  onSelectFile(event) {
    debugger
    
    // if (event.target.files && event.target.files[0]) {
    //     var filesAmount = event.target.files.length;
    //     for (let i = 0; i < filesAmount; i++) {
          
    //             var reader = new FileReader();
    //             reader.onload = (event:any) => {
    //               console.log(event.target.result);
    //                this.urls.push(event.target.result); 
    //             }
    //             reader.readAsDataURL(event.target.files[i]);
    //             this.fileToUpload = this.urls[i];
    //     }
    // }

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
              var reader = new FileReader();
              reader.onload = (event:any) => {
                console.log(event.target.result);
                 this.images.push(event.target.result); 
                 this.myForm.patchValue({
                    fileSource: this.images
                 });
              }
              reader.readAsDataURL(event.target.files[i]);
              this.fileToUpload=this.images[i];
      }
    }

  }

  uploadFileToActivity() {
    debugger
    this.supplierService.postFile(this.fileToUpload).subscribe(data => {
      }, error => {
        console.log(error);
      });
  }


  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyPress1(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyPress2(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
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

  imageSrc8:string;
  onFileChange8(event) {
      // if(this.myFiles.length>1){
      //   alert("Upload only one file");return false;
      // }else
      {
    this.blocked=true;
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc8 = reader.result as string;
        this.blocked=false;
      }
    }
    this.blocked=false;
  }}

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
    }
    this.blocked=false;
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
    }this.blocked=false;
  }
  imageSrc5:string;
  onFileChange5(event) {
    this.blocked=true;
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc5 = reader.result as string;
        this.blocked=false;
      }
    }this.blocked=false;
  }
  imageSrc6:string;
  onFileChange6(event) {
    this.blocked=true;
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc6 = reader.result as string;
        this.blocked=false;
      }
    }this.blocked=false;
  }

  onChangeGST(){
    this.isGstClick = false;
  }

  numberOnly(event): boolean { 
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  
  oncontactnumbervaildate(data){
    var type ='Supplier';
    var fieldname ='mobilenumber';
    if(data.length==10){
      this.blocked=true;
      this.supplierService.CheckValidationforSupplierCustomer(data,fieldname,type).subscribe(result=>{
        this.statusforcheck=result.Status;
        if(result.Status==false){
          this.isshow=true;
          this.blocked=false;
          this.texts = result.Message;
        }
        else{
          this.isshow=true;
          this.blocked=false;
          this.texts = result.Message;
        }
      })
    }
    else{

    }
  }


  ongstnumbervalidate(data){
    let pattern = "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
    let result = data.match(pattern);
    var type ='Supplier';
    var fieldname ='gstnumber';
    if(data.length==15 && result != null){
      this.blocked=true;
      this.supplierService.CheckValidationforSupplierCustomer(data,fieldname,type).subscribe(result=>{
        this.statusforcheck=result.Status;
        if(result.Status==false){
          this.blocked=false;
          this.isshow=true;
          this.texts = result.Message;
        }
        else{
          this.blocked=false;
          this.isshow=true;
          this.texts = result.Message;
        }
      })
    }
    else{

    }
  }

  onpannumbervaildate(data){
   let pattern="^[A-Za-z]{5}[0-9]{4}[A-Za-z]$" 
   let result = data.match(pattern);
    var type ='Supplier';
    var fieldname ='pannumber';
    if(data.length==10 && result != null){
      this.blocked=true;
      this.supplierService.CheckValidationforSupplierCustomer(data,fieldname,type).subscribe(result=>{
        this.statusforcheck=result.Status;
        if(result.Status==false){
          this.blocked=false;
          this.isshow=true;
          this.texts = result.Message;
        }
        else{
          this.blocked=false;
          this.isshow=true;
          this.texts = result.Message;
        }
      })
    }
    else{

    }
  }

  
  ok(){
    this.isshow=false;
    this.texts="";
  }

  isMSMERegis:boolean=false;
  OnChangeMSMEStatus(Status){
    console.log(Status);
    if(Status=='Registered'){this.isMSMERegis=true}
    else{
      this.selectedSupplier.MSMEImage=[];
      this.isMSMERegis=false;
      this.proppan8=0;
      this.imageSrc8="";
    }
  }

    uploadFlagMSME:boolean=true;
    @ViewChild('MSMEDoc', {static: false})
    MSMEDoc: ElementRef;

    uploadMSMEImage() {
      debugger; 
     if (!this.myFiles && this.myFiles.length==0 ) {
         this.messageService.add({ severity: 'error', summary: 'please upload MSME Doc.', detail: '' });
       return
     }
     if (this.myFiles && this.myFiles.length>0) {
       const frmData = new FormData();
       for (var i = 0; i < this.myFiles.length; i++) {
         frmData.append("msme", this.myFiles[i]);
       }
       this.blocked=true;
       this.supplierService.UploadSupplierDocMulti(frmData).subscribe(result => {
         this.blocked=false;
         console.log(result)
         this.selectedSupplier.MSMEImage = result;
         this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
         this.file = [];
         this.myFiles = [];
         this.uploadFlagMSME = false;
       }, (err) => {
         alert("Document Size is more then 20 mb");
         this.file = [];
         this.proppan8=0;
         this.myFiles = [];
         this.uploadFlagMSME = true; 
         this.blocked=false;
         this.imageSrc8="";
         this.MSMEDoc.nativeElement.value="";
       });
     }
     else{
       this.file = [];
       this.myFiles = [];
       this.uploadFlagMSME = true; 
       this.blocked=false;
       this.imageSrc8="";
       this.MSMEDoc.nativeElement.value="";
       this.display=false;
       this.proppan8=0;
       alert('please choose file');
     }
   }
   removeMSMEImage()
   {
     this.file = [];
       this.myFiles = [];
       this.uploadFlagMSME = true; 
       this.blocked=false;
       this.imageSrc8="";
       this.MSMEDoc.nativeElement.value="";
       this.display=false;
       this.proppan8=0;
   }

   BuyersList:any
   GetBuyers(){
     this.blocked = false;
     this.buyerservice.GetBuyers().subscribe(result => {
       this.BuyersList = result;
       console.log(this.BuyersList, 'BuyersList');       
      })
    }
    BuyerChange(id){
      if(id>0){
        this.BuyersList.forEach(ele => {
          if(ele.PeopleID==id){
            this.selectedSupplier.BuyerName=ele.DisplayName;
          }
        });
      }

    }

}