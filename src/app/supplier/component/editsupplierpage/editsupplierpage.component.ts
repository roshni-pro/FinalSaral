import { Component, OnInit } from '@angular/core';
import {AddNewSupplier} from '../../../shared/interface/supplier/addnewsupplier'
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'app/shared/services/supplier.service';
import { NgForm } from '@angular/forms';
import { SelectItem, MessageService } from 'primeng/api';
import { environment } from 'environments/environment';
import { getDate } from 'date-fns';
import { DateFormatorService } from 'app/shared/services/date-formator.service';
import { DepotService } from 'app/shared/services/depot.service';
import { DialogModule } from 'primeng/dialog';
import { debug } from 'console';
import { IFrameComponent } from 'app/iframe/iframe.component';
import { ViewChild,ElementRef } from '@angular/core';
import { threadId } from 'worker_threads';
import * as moment from 'moment';
import { BuyerService } from 'app/shared/services/buyer.service';


@Component({
  selector: 'app-editsupplierpage',
  templateUrl: './editsupplierpage.component.html',
  styleUrls: ['./editsupplierpage.component.scss']
})
export class EditsupplierpageComponent implements OnInit {
 public selectedSupplier:AddNewSupplier;
  AddressProofs:any[];
  selectedAddressProof:string;
  Supplierinfo:any;
  suppliertypeArray:any[];
  selectedSType:any;
  sellingBrandsList: SelectItem[];
  selectedItems:any;
  supid:any;
  updateFlag:boolean=true;
  loanReqFlag:boolean=true;
  baseURL:any;
  BrandList:any=[];
  selectedList:any;
  errorMsg:any;
  yearRangeForCalender: string;
  todatydate:any;
  statelist:any=[];
  citylist:any=[];
  file:any;
  public imagePath;
  imgURL:any;
  uploadFlagpan:boolean=true;
  uploadFlagAdd:boolean=true;
  uploadFlagfassi:boolean=true;
  uploadFlaggstImage:boolean=true;
  uploadFlagBankAc:boolean=true;
  uploadFlagAgreementImage: boolean = true;
  uploadFlagPropPan: boolean = true;
  Proprietornamebytype: string;
  supplietyperequiredsign:boolean;
  myFiles: string[] = [];
  imagelist: any[];
  docName :string;
  display: boolean = false;
  totalroles : any;
  isShow : boolean = false;
  selectedStatus: any;
  statusbackend:any;
  //----
  gstNumberfrombackend:string;
  //----
  isShowBtn : boolean = false;
  fathernamerequired:boolean;
  constructor(private router:Router
    ,private supplierService:SupplierService
    ,private MessageService:MessageService
    ,private DepotService: DepotService
    ,private buyerservice:BuyerService) { this.baseURL = environment.apiURL;  }

  ngOnInit() {
    debugger;

    this.totalroles =localStorage.getItem('role');
    var a = this.totalroles.split(',');
    for (var i in a) {
      if (a[i] == "Zonal purchase lead" || a[i] == "Accounts department lead") {
        this.isShow = true;
        break
      } else {
        this.isShow = false;
      }
    }
    console.log("totalroles",this.totalroles);
    let info=localStorage.getItem('config');
    let supplierId= Number.parseInt(localStorage.getItem('supplierId'));
    this.supid=Number.parseInt(info);
    this.yearRangeForCalender = '2015:';
    this.yearRangeForCalender += (new Date()).getFullYear();
    this.supplierService.GetSupplierById(this.supid,supplierId).subscribe(
      data =>{debugger
        console.log("data",data)
        this.selectedSupplier = data.data;

        this.selectedSupplier.id=data.data.id;
        let supplierid=data.data.SupplierId;
        this.selectedSType=data.data.SupplierType;
        this.selectedSupplier.supplierType=data.data.SupplierType;
        this.selectedSupplier.supplierName=data.data.SupplierName;
         this.selectedSupplier.addressProofType=data.data.AddressProofType;
         this.selectedSupplier.fatherName=data.data.FatherName;
         this.selectedSupplier.emailId=data.data.EmailId;
         this.selectedSupplier.bankAccNo=data.data.BankAccNo;
         this.selectedSupplier.bankAccType=data.data.BankAccType;
         this.selectedSupplier.bankAddress=data.data.BankAddress;
         this.selectedSupplier.City=data.data.City;

        this.selectedSupplier.typeofFirm=data.data.TypeofFirm;


         this.selectedSupplier.ProprietorPanNumber=data.data.ProprietorPanNumber;
         this.selectedSupplier.panNumber=data.data.PanNumber;
         this.selectedSupplier.paymentTerms=data.data.PaymentTerms;
         this.selectedSupplier.businessEstablishmentYear=data.data.BusinessEstablishmentYear;
         this.selectedSupplier.bankName=data.data.BankName;
         this.selectedSupplier.bankPinCode=data.data.bankPinCode;
         this.selectedSupplier.ifscCode=data.data.IFSCCode;
         this.selectedSupplier.creditScore=data.data.CreditScore;
         this.selectedSupplier.gstinno=data.data.GSTINNO;
         //-------
         this.gstNumberfrombackend=this.selectedSupplier.gstinno;
         //-------
         this.selectedSupplier.headOffice=data.data.HeadOffice;
         this.selectedSupplier.pinCode=data.data.PinCode;
         this.selectedSupplier.mobileNo=data.data.MobileNo;
         this.selectedSupplier.proprietorName=data.data.ProprietorName;
         this.selectedSupplier.proprietorphonenumber=data.data.proprietorphonenumber;
         this.selectedSupplier.fullBusinessAddress=data.data.FullBusinessAddress;
         this.selectedSupplier.isIRNInvoiceRequired=data.data.IsIRNInvoiceRequired;
         this.selectedSupplier.isStopAdvancePr=data.data.IsStopAdvancePr;
         this.selectedSupplier.contactPerson = data.data.ContactPerson;
         this.selectedSupplier.ContactPersonMobileNo = data.data.ContactPersonMobileNo;
         this.proppan1=data.data.PanNumberImage?data.data.PanNumberImage.length:0
         this.proppan2=data.data.AddressProofImage?data.data.AddressProofImage.length:0
         this.proppan3=data.data.FSSAIImage?data.data.FSSAIImage.length:0
         this.proppan4=data.data.ChequeImage?data.data.ChequeImage.length:0
         this.proppan5=data.data.GSTImage?data.data.GSTImage.length:0
         this.proppan6=data.data.AgreementImage?data.data.AgreementImage.length:0
         this.proppan7=data.data.ProprietorPanImage?data.data.ProprietorPanImage.length:0
         this.proppan8=data.data.MSMEImage?data.data.MSMEImage.length:0

         if(data.data.SupplierType=" "){
          this.selectedSupplier.supplierType ="Credit";
         }
         else{
          this.selectedSupplier.supplierType = data.data.SupplierType;
         }
        //  if(data.data.TypeofFirm=="prop" || data.data.TypeofFirm=="Proprietor"){
        //   this.selectedSupplier.typeofFirm="Proprietor";
        //  }


        if(data.data.IsVerified==false){
          if(data.data.Active==true){
            this.statusbackend='Active'
          }
          else{
            this.statusbackend='Inactive'
          }
         }
         else if(data.data.IsVerified==true && data.data.Active==false)
         {
          this.statusbackend='Block'
         }

         if(data.data.IsVerified==false){
          if(data.data.Active==true){
            this.selectedStatus='Active'
          }
          else{
            this.selectedStatus='Inactive'
          }
         }
         else if(data.data.IsVerified==true && data.data.Active==false)
         {
          this.selectedStatus='Block'
         }
        //  this.selectedStatus = data.data.Deleted == false && data.data.Active == true  ? 'Active' :'';
        //  this.selectedStatus = data.data.Active == false && data.data.Deleted == true ? 'Block' : 'Inactive';

        // this.todatydate= new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate());
        // this.selectedSupplier.StartedBusiness=this.todatydate;
        // let getdate = moment(data.data.StartedBusiness).format('DD/MM/YYYY');
        // this.selectedSupplier.StartedBusiness =data.data.StartedBusiness;

        this.selectedSupplier.StartedBusiness = moment(data.data.StartedBusiness).format('YYYY/MM/DD');
        // moment(data.data.StartedBusiness).format('DD/MM/YYYY');



        this.TypeofFirmchange(data.data.TypeofFirm);

        this.getcity(this.selectedSupplier.Stateid);
      //  this.getSellingBrandesList();
        this.selectedSupplier.SellingBrandDCs=data.data.SellingBrandDCs;
        console.log(this.selectedSupplier.SellingBrandDCs,'br');
        if(data.data.IsLoanRequirement=='Yes'){
          this.activecheck=true;
        }
        if(data.data.IsLoanRequirement=='No' || data.data.IsLoanRequirement==null){
          this.inactivecheck=true;
          this.loanReqFlag=false;
        }
        console.log(this.selectedSupplier,'se');
        ///editGetAllBrands
        if (supplierid>0) {
          this.supplierService.editGetAllBrands(supplierid).subscribe(result => {
            this.BrandList = result;
            console.log(this.BrandList, 'hdh');
            this.selectedList = result.filter(x => x.Selected == true);
            var a = [];
            this.selectedList.forEach(element => {
              // console.log(element.id);
              a.push(element.id);
            });
            this.selectedSupplier.SellingBrandDCs = a;
          })
        } else {
          this.supplierService.editGetAllBrands(this.supid).subscribe(result => {
            this.BrandList = result;
            console.log(this.BrandList, 'hdh');
            this.selectedList = result.filter(x => x.Selected == true);
            var a = [];
            this.selectedList.forEach(element => {
              // console.log(element.id);
              a.push(element.id);
            });
            this.selectedSupplier.SellingBrandDCs = a;
          })
        }
        ///end
        },
      error =>{
        console.log("some error occured");
        console.log(error.errorMessage);

      })
      // this.supplierService.editGetAllBrands(this.supid).subscribe(result => {
      //   debugger
      //   this.BrandList = result;
      //   console.log(this.BrandList,'hdh');
      // })

      this.DepotService.Getstates().subscribe(x => {
        this.statelist = x;
        console.log(this.statelist,'ss')
      })
      this.GetBuyers();
      this.SuppLastPoFirstGrDate();
  }
  UpdateData()
  {
    alert("Update")
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

  gstNumberChange(gstno){
    console.log("event",gstno);
    debugger;
    if(this.gstNumberfrombackend == gstno){
      this.isShowBtn = false;
    }else{
      this.isShowBtn = true;
    }
  }

   VarifiedSupplierGSTNO(text:string) {
    debugger

    console.log("GstNo",text);

    if (text.length == 15) {
      this.blocked=true;
      this.supplierService.CheckVerifiedSuppierGSTNO(text).subscribe(result => {
        console.log("result",result);
        console.log(result.Address);
         if (result.IsVerify) {
          this.blocked=false;
          this.selectedSupplier.fullBusinessAddress=result.Address;
          this.selectedSupplier.pinCode=result.Pincode;
          this.isShowBtn=false
          console.log("Pincode",result.Pincode);
         }
         else{
          this.blocked=false;
          alert(result.Message);
         this.selectedSupplier.gstinno=''
         }
      })
    }
    else {
       alert("Pls enter valid GST/TIN_No/Ref No. For eg. - 23AAVCS1981Q1ZE");
       this.selectedSupplier.gstinno=''

       }
   }

   blocked:boolean=false
  onSave(form: NgForm){
    debugger
   console.log("formstatus",form.valid)


  //  if(this.isGstClick==false){
  //   alert('Please Verify Gst')
  //   return false;
  //  }
    // if(this.uploadFlagpan==true || this.uploadFlagAdd==true || this.uploadFlagfassi==true){
    //   this.MessageService.add({ severity: 'error', summary: "Please upload pan and address proof and fssai images", detail: '' });
    //   return;
    //   }
    // if (this.selectedSupplier.SupplierSegment != 'Non Food') {
    //   if (this.selectedSupplier.FSSAINO == undefined || this.selectedSupplier.FSSAINO == '') {
    //     this.messageService.add({ severity: 'error', summary: "Please enter Fssai No", detail: '' });
    //     return false;
    //   }
    //   if (this.uploadFlagfassi == true) {
    //     this.messageService.add({ severity: 'error', summary: "Please Upload Fssai Image", detail: '' });
    //     return false;
    //   }
    // }
   if(this.selectedStatus == 'Active'){

    console.log("started business datew",this.selectedSupplier.StartedBusiness)
    if(this.selectedSupplier.SupplierSegment!='Non Food'){
      if(this.selectedSupplier.FSSAINO==null ||this.selectedSupplier.FSSAINO=='' ){
       // this.MessageService.add({ severity: 'error', summary: "Please enter Fssai No", detail: '' });
       alert('Please enter Fssai No');
       return false;
      }
      if(this.uploadFlagfassi==true && (this.selectedSupplier.FSSAIImage==null || this.selectedSupplier.FSSAIImage.length==0)){
       // this.MessageService.add({ severity: 'error', summary: "Please Upload Fssai Image", detail: '' });
       alert('Please Upload Fssai Image');
       return false;
      }
    }
    if(this.uploadFlagpan==true && (this.selectedSupplier.PanNumberImage==null || this.selectedSupplier.PanNumberImage.length==0)){
      alert('Please Upload Pan Card Image');
      return false;
    }
    if(this.selectedSupplier.typeofFirm!='Private Limited' && this.selectedSupplier.typeofFirm!='Limited'){
      if( this.uploadFlagAdd==true &&(this.selectedSupplier.AddressProofImage==null ||this.selectedSupplier.AddressProofImage.length==0)){
        alert("Please Upload Address Proof Image");
        return false;
      }
    }
    if(this.uploadFlagBankAc==true && ( this.selectedSupplier.ChequeImage==null || this.selectedSupplier.ChequeImage.length==0)){
      alert("Please Upload Bank Account Image");
      return false;
    }
    if( this.uploadFlaggstImage==true && (this.selectedSupplier.GSTImage==null ||this.selectedSupplier.GSTImage.length==0)){
      alert("Please Upload Gst Image");
      return false;
    }
    if(this.uploadFlagAgreementImage==true && (this.selectedSupplier.AgreementImage==null || this.selectedSupplier.AgreementImage.length==0)){
      alert("Please Upload Agreement/VRF  Image");
      return false;
    }
    if(this.selectedSupplier.ExpiryDays==0)
    {
      alert("Please enter Expiry days greater than 0 ");
      return false;
    }
    if(this.fathernamerequired ==true){
      if(this.selectedSupplier.fatherName == null || this.selectedSupplier.fatherName == ''){
        alert("Please Enter Father / Husband Name ");
        return false;
      }
    }
    if(this.selectedSupplier.MSMEType=="Registered"  && this.selectedSupplier.MSMEImage.length == 0){
      this.MessageService.add({severity:'error', summary:"Please upload MSME Doc.", detail:''});
      return false;
    }
    if (!this.selectedSupplier.BuyerId || !this.selectedSupplier.BuyerId) {
      this.MessageService.add({ severity: 'error', summary: "Please Select Buyer", detail: '' });
      return false;
    }
    if (form.status == "VALID" && this.isShowBtn==false) {
      debugger;
      if(this.flag)
      {
      this.selectedSupplier.Active=this.active;
      this.selectedSupplier.IsVerified=this.isverified;
      }
      this.flag=false;
      debugger
      this.blocked=true
    this.supplierService.editsupplier(this.selectedSupplier).subscribe(x=>{
      debugger;
      console.log('x',x);
      this.errorMsg = x.Message;
      if (x.Status) {
        this.blocked=false
        alert(this.errorMsg);
       // this.MessageService.add({ severity: 'success', summary: this.errorMsg, detail: '' });
        this.router.navigate(['/layout/supplier/newsupplierlist']);
      } else {
        this.blocked=false
        alert(this.errorMsg);
        //this.MessageService.add({ severity: 'error', summary: this.errorMsg, detail: '' });
      }
      // alert('supplier added successfully')
      // this.router.navigate(['/layout/supplier/newsupplierlist']);
    })
  }
  else{
    this.blocked=false;
    if(this.isShowBtn==true){
      alert('Please Verify Gst')
    }
  }

}
else{
  debugger
  console.log("date",this.selectedSupplier.StartedBusiness);
  if(this.selectedStatus =='Inactive' || this.selectedStatus == 'Block'){
    if(this.selectedSupplier.Comments == null || this.selectedSupplier.Comments ==''){
      alert("Please Enter Comments");
      return false;
    }
  }

  debugger
  if ( this.isShowBtn==false) {
    debugger;
    if(this.flag)
    {
    this.selectedSupplier.Active=this.active;
    this.selectedSupplier.IsVerified=this.isverified;
    }
    this.flag=false;
    if(this.selectedSupplier.MSMEType=="Registered"  && this.selectedSupplier.MSMEImage.length == 0){
      this.MessageService.add({severity:'error', summary:"Please upload MSME Doc.", detail:''});
      return false;
    }
    if (!this.selectedSupplier.BuyerId || !this.selectedSupplier.BuyerId) {
      this.MessageService.add({ severity: 'error', summary: "Please Select Buyer", detail: '' });
      return false;
    }
    debugger
    this.blocked=true
  this.supplierService.editsupplier(this.selectedSupplier).subscribe(x=>{
    debugger;
    console.log('x',x);
    this.errorMsg = x.Message;
    if (x.Status) {
      this.blocked=false
      alert(this.errorMsg);
     // this.MessageService.add({ severity: 'success', summary: this.errorMsg, detail: '' });
      this.router.navigate(['/layout/supplier/newsupplierlist']);
    } else {
      this.blocked=false
      alert(this.errorMsg);
      //this.MessageService.add({ severity: 'error', summary: this.errorMsg, detail: '' });
    }
    // alert('supplier added successfully')
    // this.router.navigate(['/layout/supplier/newsupplierlist']);
  })
}
else{
  this.blocked=false;
  if(this.isShowBtn==true){
    alert('Please Verify Gst')
  }
}
}
  }

  getSellingBrandesList(){
    this.supplierService.editGetAllBrands(this.supid).subscribe(result => {
      debugger
      this.BrandList = result;
      console.log(this.BrandList,'hdh');
    })


  }

  back(){
    this.router.navigate(['/layout/supplier/newsupplierlist'])
  }

  setradio(){
    this.loanReqFlag=false;
    this.activecheck=false;
    this.inactivecheck=true;
  }
  activecheck:boolean;
  inactivecheck:boolean;
  setradioyes(){
    this.loanReqFlag=true;
    this.inactivecheck=false;
    this.activecheck=true;
  }
    selectedBands() {
    var a = [];
    console.log("this.selectedCategory", this.selectedList)
    this.selectedList.forEach(element => {
      // console.log(element.id);
      a.push(element.id);
    });
    debugger;
    this.selectedSupplier.SellingBrandDCs = a;
  }


  // upload(file: File[]) {
  //   this.file = file;
  //   var reader = new FileReader();
  //   this.imagePath = file;
  //   reader.readAsDataURL(file[0]);
  //   reader.onload = (_event) => {
  //     this.imgURL = reader.result;
  //     console.log(this.imgURL,'urlimg')
  //   }
  //   (success) => {
  //     alert("image uploaded successfully")

  //   };


  // }

  showDialog(img,name) {
    debugger
    console.log('imgggg',this.selectedSupplier);
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
      if(name=="MSME"){this.proppan8=this.imagelist?this.imagelist.length:0}
      if(name=="Pan Card"){this.proppan1=this.imagelist?this.imagelist.length:0}
      if(name=="Address proof"){this.proppan2=this.imagelist?this.imagelist.length:0}
      if(name=="FSSAI"){this.proppan3=this.imagelist?this.imagelist.length:0}
      if(name=="Bank A/C"){this.proppan4=this.imagelist?this.imagelist.length:0}
      if(name=="GST" || name=="GSTN"){this.proppan5=this.imagelist?this.imagelist.length:0}
      if(name=="Agreement"){this.proppan6=this.imagelist?this.imagelist.length:0}
      if(name=="Proprietor" || name=="Partnership" || name== "LLP"|| name=="Private Limited"|| name=="Limited"){
        this.proppan7=this.imagelist?this.imagelist.length:0;
      }
      this.docName = name;
      this.display = true;
    }
    else{
      if(this.imagelist.length==0){
        // alert('No document uploaded');
        if(name=="MSME"){
          this.myFiles = [];
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
        if(name=="Proprietor" || name=="Partnership" || name== "LLP"|| name=="Private Limited"|| name=="Limited"){
          this.myFiles = [];
          this.selectedSupplier.ProprietorPanImage=[];
          this.uploadPropPanImagProof();
        }

      }
    }
  }
  upload(e,name?) {

    debugger;
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }

    if(name=="MSME"){this.proppan8=this.myFiles?this.myFiles.length:0}
    // if(name=="MSME"){this.imageSrc8=this.myFiles.length!=0?this.imageSrc8:""}
    if(name=="MSME" && this.selectedSupplier.MSMEImage!=undefined) this.uploadFlagMSME=true;

    if(name=="Pan Card"){this.proppan1=this.myFiles?this.myFiles.length:0}
    if(name=="Pan Card" && this.selectedSupplier.PanNumberImage!=undefined) this.uploadFlagpan=true;
    

    if(name=="Address Proof"){this.proppan2=this.myFiles?this.myFiles.length:0}
    if(name=="Address Proof" && this.selectedSupplier.AddressProofImage!=undefined) this.uploadFlagAdd=true;

    if(name=="FSSAI"){this.proppan3=this.myFiles?this.myFiles.length:0}
    if(name=="FSSAI" && this.selectedSupplier.FSSAIImage!=undefined) this.uploadFlagfassi=true;

    if(name=="Bank A/C"){this.proppan4=this.myFiles?this.myFiles.length:0}
    if(name=="Bank A/C" && this.selectedSupplier.ChequeImage!=undefined) this.uploadFlagBankAc=true;

    if(name=="GST" || name=="GSTIN"){this.proppan5=this.myFiles?this.myFiles.length:0}
    if(name=="GST" || name=="GSTIN" && this.selectedSupplier.GSTImage!=undefined) this.uploadFlaggstImage=true;
    
    if(name=="Agreement"){this.proppan6=this.myFiles?this.myFiles.length:0}
    if(name=="Agreement" && this.selectedSupplier.AgreementImage!=undefined) this.uploadFlagAgreementImage=true;

    if(name=="Proprietor" || name=="Partnership" || name== "LLP"|| name=="Private Limited"|| name=="Limited" || name == "Partner" || name=="Director" ){
      this.proppan7=this.myFiles?this.myFiles.length:0
      
    if(name=="Proprietor" || name=="Partnership" || name== "LLP"|| name=="Private Limited"|| name=="Limited" || name == "Partner" || name=="Director"  
    && this.selectedSupplier.ProprietorPanImage!=undefined) this.uploadFlagPropPan=true;
    }
  }

  @ViewChild('proppanimage', {static: false})
  proppanimage: ElementRef;
  uploadPropPanImagProof() {

    debugger;

    if (!this.myFiles) {
      this.MessageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.myFiles && this.myFiles.length>0) {
      const frmData = new FormData();
      for (var i = 0; i < this.myFiles.length; i++) {
        frmData.append("Proppancard", this.myFiles[i]);
      }
      // if (this.file) {
      //   let formData = new FormData();
      //   formData.append('file', this.file[0], 'pancard.jpg');
      this.blocked=true;
      this.supplierService.UploadSupplierDocMulti(frmData).subscribe(result => {
        this.blocked=false;
        console.log(result)
        this.selectedSupplier.ProprietorPanImage = result;
        this.MessageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.file = [];
        this.myFiles = [];
        this.uploadFlagPropPan = false;
      }, (err) => {
        debugger
        this.blocked=false;
        this.file=[];
        this.myFiles=[];
        this.uploadFlagPropPan=true;
        this.imageSrc="";
        this.proppanimage.nativeElement.value="";
        alert("Document Size is more then 20 mb");
      });
    }
    else{
      this.selectedSupplier.ProprietorPanImage=undefined;
      this.file = [];
      this.myFiles = [];
      this.uploadFlagPropPan = true; 
      this.imageSrc="";
      alert('please choose file');
      // this.proppan7=0;
      this.display=false;
    }
  }
  RemovePropPanImagProof()
  {
    this.selectedSupplier.ProprietorPanImage=undefined;
    this.file = [];
    this.myFiles = [];
    this.uploadFlagPropPan = true; 
    this.imageSrc="";
    this.display=false;
    this.proppan7=0;
  }

  @ViewChild('pancardimage', {static: false})
  pancardimage: ElementRef;
  uploadPanCardProof(){

    debugger;
    if(!this.myFiles ){
      this.MessageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.myFiles && this.myFiles.length>0) {
     // let formData = new FormData();
     // formData.append('file', this.file[0],'pancard.jpg')
     const formData = new FormData();
     for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("pancard", this.myFiles[i]);
     }
     this.blocked=true;
      this.supplierService.UploadSupplierDocMulti(formData).subscribe(result => {
        console.log(result);
        this.blocked=false;
          this.selectedSupplier.PanNumberImage = result;
          this.MessageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
          this.myFiles = [];
          this.uploadFlagpan=false;
      }, (err) => {
        this.blocked=false;
        alert("Document Size is more then 20 mb");
        this.file=[];
        this.myFiles=[];
        this.uploadFlagpan=true;
        this.imageSrc2="";
        this.pancardimage.nativeElement.value="";
        this.selectedSupplier.PanNumberImage=undefined;
      });
    }
    else{
      this.blocked=false;
        alert("Select Document");
        this.file=[];
        this.myFiles=[];
        this.uploadFlagpan=true;
        this.imageSrc2="";
        this.pancardimage.nativeElement.value="";
      this.selectedSupplier.PanNumberImage=undefined;
    }
  }
  RemovePanCardProof()
  {
    this.blocked=false;
    this.file=[];
    this.myFiles=[];
    this.uploadFlagpan=true;
    this.imageSrc2="";
    this.pancardimage.nativeElement.value="";
  this.selectedSupplier.PanNumberImage=undefined;
  this.proppan1=0;

  }
  @ViewChild('addressproofimage', {static: false})
  addressproofimage: ElementRef;
  uploadAddressProof(){
    debugger
    if(!this.myFiles && this.myFiles.length>0){
      this.MessageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.myFiles) {
     // let formData = new FormData();
     // formData.append('file', this.file[0],'addressproof.jpg')
     const formData = new FormData();
     for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("AddressProof", this.myFiles[i]);
     }
     this.blocked=true;
      this.supplierService.UploadSupplierDocMulti(formData).subscribe(result => {
        console.log(result)
        this.blocked=false;
          this.selectedSupplier.AddressProofImage = result;
          this.MessageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
          this.file = [];
          this.myFiles = [];
          this.uploadFlagAdd=false;
      }, (err) => {
        this.blocked=false;
        alert("Document Size is more then 20 mb");
        this.file=[];
        this.myFiles=[];
        this.uploadFlagAdd=true;
        this.imageSrc3="";
        this.addressproofimage.nativeElement.value="";
        this.selectedSupplier.AddressProofImage=undefined;
      });
    }else
    {
      this.blocked=false;
      this.selectedSupplier.AddressProofImage=undefined;
        alert("Select Document");
        this.file=[];
        this.myFiles=[];
        this.uploadFlagAdd=true;
        this.imageSrc3="";
        this.addressproofimage.nativeElement.value="";
    }
  }
  RemoveAddressProof()
  {
    this.blocked=false;
    this.selectedSupplier.AddressProofImage=undefined;
    this.file=[];
    this.myFiles=[];
    this.uploadFlagAdd=true;
    this.imageSrc3="";
    this.addressproofimage.nativeElement.value="";  
    this.proppan2=0;
  }

  @ViewChild('fssaimage', {static: false})
  fssaimage: ElementRef;
  uploadhassiImage(){
    debugger
    if(!this.myFiles && this.myFiles.length>0){
      this.MessageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.myFiles) {
      //let formData = new FormData();
      //formData.append('file', this.file[0],'fssaiImage.jpg')
      const formData = new FormData();
      for (var i = 0; i < this.myFiles.length; i++) {
       formData.append("FSSAIImage", this.myFiles[i]);
      }
      this.blocked=true;
      this.supplierService.UploadSupplierDocMulti(formData).subscribe(result => {
        console.log(result)
        this.blocked=false;
         this.selectedSupplier.FSSAIImage = result;
          this.MessageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
          this.file = [];
          this.myFiles = [];
          this.uploadFlagfassi=false;
      }, (err) => {
        this.blocked=false;
        alert("Document Size is more then 20 mb");
        this.file=[];
        this.myFiles=[];
        this.uploadFlagfassi=true;
        this.imageSrc1="";
        this.fssaimage.nativeElement.value="";
        this.selectedSupplier.FSSAIImage=undefined
      });
    }
    else{
      this.blocked=false;
        alert("Select Document");
        this.file=[];
        this.myFiles=[];
        this.uploadFlagfassi=true;
        this.imageSrc1="";
        this.fssaimage.nativeElement.value="";
      this.selectedSupplier.FSSAIImage=undefined;
    }
  }
RemovefassiImage()
{
  this.file=[];
  this.myFiles=[];
  this.uploadFlagfassi=true;
  this.imageSrc1="";
  this.fssaimage.nativeElement.value="";
  this.selectedSupplier.FSSAIImage=undefined
  this.proppan3=0;
}
  @ViewChild('bankacimage', {static: false})
  bankacimage: ElementRef;
  uploadBankAcImage(){
    debugger;
    if(!this.myFiles){
      this.MessageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.myFiles && this.myFiles.length>0) {
      // let formData = new FormData();
      // formData.append('file', this.file[0],'bankAcImage.jpg')
      const frmData = new FormData();
      for (var i = 0; i < this.myFiles.length; i++) {
        frmData.append("BankAccount", this.myFiles[i]);
      }
      this.blocked=true;
      this.supplierService.UploadSupplierDocMulti(frmData).subscribe(result => {
        console.log(result)
        this.blocked=false;
;         this.selectedSupplier.ChequeImage = result
          this.MessageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
          this.file = [];
          this.myFiles = [];
          this.uploadFlagBankAc=false;
      }, (err) => {
        this.blocked=false;
        alert("Document Size is more then 20 mb");
        this.file=[];
        this.myFiles=[];
        this.uploadFlagBankAc=true;
        this.imageSrc4=""
        this.bankacimage.nativeElement.value="";
        this.selectedSupplier.ChequeImage = undefined;
      });
    }
    else{
      this.blocked=false;
      this.selectedSupplier.ChequeImage = undefined;
      alert("Select Document");
      this.file=[];
      this.myFiles=[];
      this.uploadFlagBankAc=true;
      this.imageSrc4=""
      this.bankacimage.nativeElement.value="";
    }this.blocked=false;
  }
  RemoveBankAcImage()
  {
    this.blocked=false;
    this.selectedSupplier.ChequeImage = undefined;
    this.file=[];
    this.myFiles=[];
    this.uploadFlagBankAc=true;
    this.imageSrc4=""
    this.bankacimage.nativeElement.value="";
    this.proppan4=0;
  }
  @ViewChild('gstimage', {static: false})
  gstimage: ElementRef;
  uploadgstImage(){
    debugger;
    if(!this.myFiles){
      this.MessageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
      return
    }
    if (this.myFiles && this.myFiles.length>0) {
      // let formData = new FormData();
      // formData.append('file', this.file[0],'gstImage.jpg')
      const frmData = new FormData();
      for (var i = 0; i < this.myFiles.length; i++) {
        frmData.append("GSTImage", this.myFiles[i]);
      }
      this.blocked=true;
      this.supplierService.UploadSupplierDocMulti(frmData).subscribe(result => {
        console.log(result)
        this.blocked=false;
         this.selectedSupplier.GSTImage = result;
          this.MessageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
          this.file = [];
          this.myFiles = [];
          this.uploadFlaggstImage=false;
      }, (err) => {
        this.blocked=false;
        alert("Document Size is more then 20 mb");
        this.file=[];
        this.myFiles=[];
        this.uploadFlaggstImage=true;
        this.imageSrc5="";
        this.gstimage.nativeElement.value="";
        this.selectedSupplier.GSTImage=undefined;
      });
    }
    else{
      this.blocked=false;
      this.selectedSupplier.GSTImage=undefined;
        alert("Select Document");
        this.file=[];
        this.myFiles=[];
        this.uploadFlaggstImage=true;
        this.imageSrc5="";
        this.gstimage.nativeElement.value="";
    }
  }
  removegstImage()
  {
    this.selectedSupplier.GSTImage=undefined;
    this.file=[];
    this.myFiles=[];
    this.uploadFlaggstImage=true;
    this.imageSrc5="";
    this.gstimage.nativeElement.value="";
    this.proppan5=0;
  }
  @ViewChild('agreementimage', {static: false})
  agreementimage: ElementRef;
  uploadAgreementImage() {
    if (!this.myFiles) {
      this.MessageService.add({ severity: 'error', summary: 'please choose file', detail: '' });
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
        console.log(result)
        this.blocked=false;
        this.selectedSupplier.AgreementImage = result;
        this.MessageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        this.file = [];
        this.myFiles = [];
        this.uploadFlagAgreementImage = false;
      }, (err) => {
        this.blocked=false;
        alert("Document Size is more then 20 mb");
        this.file=[];
        this.myFiles=[];
        this.uploadFlagAgreementImage=true;
        this.imageSrc6="";
        this.agreementimage.nativeElement.value="";
        this.selectedSupplier.AgreementImage=undefined;
      });
    }
    else{
      this.blocked=false;
      this.selectedSupplier.AgreementImage=undefined;
      alert("Select Document");
      this.file=[];
      this.myFiles=[];
      this.uploadFlagAgreementImage=true;
      this.imageSrc6="";
      this.agreementimage.nativeElement.value="";
    }
  }
  RemoveAgreementImage()
  {
    this.selectedSupplier.AgreementImage=undefined;
    this.file=[];
    this.myFiles=[];
    this.uploadFlagAgreementImage=true;
    this.imageSrc6="";
    this.agreementimage.nativeElement.value="";
    this.proppan6=0;
  }

  TypeofFirmchange(typeoffirm) {
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

flag:boolean=false;
active:boolean;
isverified:boolean;

  test(e){
    console.log(e.target.value);
    if(e.target.value == "Active"){
      this.active = true;
      this.isverified = false;
      this.isposhow=false;
    }else if (e.target.value == "Inactive"){
      this.active = false;
      this.isverified = false;
      this.SuppLastPoFirstGrDate()
    }else {
      this.active = false;
      this.isverified = true;
      this.isposhow=false;
    }
    this.flag=true;
    // console.log(e.target.value);
    // if(e.target.value == "Active"){
    //   this.selectedSupplier.Active = true;
    //   this.selectedSupplier.IsVerified = false;
    // }else if (e.target.value == "Inactive"){
    //   this.selectedSupplier.Active = false;
    //   this.selectedSupplier.IsVerified = false;
    // }else {
    //   this.selectedSupplier.Active = false;
    //   this.selectedSupplier.IsVerified = true;
    // }
    // if(this.selectedSupplier.Active == true && this.selectedSupplier.Deleted == false){
    //   this.selectedStatus = "Active";
    //   } else if(this.selectedSupplier.Active == false && this.selectedSupplier.Deleted == false){
    //   this.selectedStatus = "Inactive";
    //   } else if(this.selectedSupplier.Active == false && this.selectedSupplier.Deleted ==true){
    //   this.selectedStatus = "Block";
    // }
  }
  GrDate:any
  PurchaseOrderId:any
  isposhow:boolean=false;
  SuppLastPoFirstGrDate(){
    let supplierId= Number.parseInt(localStorage.getItem('supplierId'));
    if(supplierId>0){
      this.supplierService.SuppLastPoFirstGrDate(supplierId).subscribe(res=>{
        this.PurchaseOrderId=res.PurchaseOrderId;
        this.GrDate=moment(res.GrDate).format("YYYY/MM/DD");
        this.isposhow=true;
      })
    }
  }
  imageSrc:string;
  onFileChange(event) {debugger;
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      this.blocked=true;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.blocked=false;
      }
    }else{
    this.blocked=false;
    this.imageSrc="";
  }}
  imageSrc1:string;
  onFileChange1(event) {debugger;
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      this.blocked=true;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc1 = reader.result as string;
        this.blocked=false;
      }
    }else{
      this.blocked=false;
      this.imageSrc1="";
    }
  }
  imageSrc2:string;
  onFileChange2(event) {debugger;
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      this.blocked=true;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc2 = reader.result as string;
        this.blocked=false;
      }
    }else{
      this.blocked=false;
      this.imageSrc2="";
    }
  }
  imageSrc3:string;
  onFileChange3(event) {debugger;
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      this.blocked=true;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc3 = reader.result as string;
        this.blocked=false;
      }
    }else{
      this.blocked=false;
      this.imageSrc3="";
    }
  }
  imageSrc4:string;
  onFileChange4(event) {debugger;
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      this.blocked=true;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc4 = reader.result as string;
        this.blocked=false;
      }
    }else{
      this.blocked=false;
      this.imageSrc4="";
    }
  }
  imageSrc5:string;
  onFileChange5(event) {debugger;
    this.blocked=true;
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc5 = reader.result as string;
        this.blocked=false;
      }
    }else{
      this.blocked=false;
      this.imageSrc5="";
    }
  }
  imageSrc6:string;
  onFileChange6(event) {debugger;
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      this.blocked=true;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc6 = reader.result as string;
        this.blocked=false;
      }
    }else{
      this.blocked=false;
      this.imageSrc6="";
    }
  }

  imageSrc8:string;
  onFileChange8(event) {debugger;
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      this.blocked=true;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc8 = reader.result as string;
        this.blocked=false;
      }
    }else{
      this.blocked=false;
      this.imageSrc8="";
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
  RemoveImage(index,docName,DocumentPath?){
    debugger
    console.log(this.myFiles)
    if(docName=="Pan Card"){
      if (index > -1)
      {
        let removeDocId=0;
        if(this.selectedSupplier.PanNumberImages && this.selectedSupplier.PanNumberImages.length>0){
          this.selectedSupplier.PanNumberImages.forEach(e=>{
            if(DocumentPath.includes(e.DocumentPath)){
              removeDocId=e.Id
            }
          })
          this.blocked=true;
          this.supplierService.removeUploadedDocuments(removeDocId).subscribe((res:any)=>{
            if(res.Status){
              this.imagelist.splice(index, 1);
              this.selectedSupplier.PanNumberImage.splice(index,1);
              this.proppan1=this.imagelist ? this.imagelist.length:0;
              this.blocked=false;
              alert("successfully removed!");
              if(this.imagelist.length==0){
                this.display=false;this.uploadFlagpan=true;
              } 
            }
            else{
              this.blocked=false;
              this.imagelist.splice(index, 1);
              this.selectedSupplier.PanNumberImage && this.selectedSupplier.PanNumberImage.length>0 ?this.selectedSupplier.PanNumberImage.splice(index,1):alert('select documemt');
              this.proppan1=this.imagelist ? this.imagelist.length:0;
              this.imageSrc2=this.imagelist[0];
              if(this.imagelist.length==0){
                this.display=false; this.imageSrc2="";this.uploadFlagpan=true;
              } 
            }
          })
        }  else{
          this.blocked=false;
          this.imagelist.splice(index, 1);
          this.selectedSupplier.PanNumberImage && this.selectedSupplier.PanNumberImage.length>0 ?this.selectedSupplier.PanNumberImage.splice(index,1):alert('select documemt');
          this.proppan1=this.imagelist ? this.imagelist.length:0;
          this.imageSrc2=this.imagelist[0];
          if(this.imagelist.length==0){
            this.display=false;
            this.imageSrc2=""; this.uploadFlagpan=true;
          } 
        }
      }
    }

    if(docName=="Address Proof"){
      if (index > -1)
      {
        let removeDocId=0;
        if(this.selectedSupplier.AddressProofImages && this.selectedSupplier.AddressProofImages.length>0){
          this.selectedSupplier.AddressProofImages.forEach(e=>{
            if(DocumentPath.includes(e.DocumentPath)){
              removeDocId=e.Id
            }
          })
          this.blocked=true
          this.supplierService.removeUploadedDocuments(removeDocId).subscribe((res:any)=>{
            if(res.Status){
              this.imagelist.splice(index, 1);
              this.selectedSupplier.AddressProofImage.splice(index,1);
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
              this.selectedSupplier.AddressProofImage && this.selectedSupplier.AddressProofImage.length>0 ?this.selectedSupplier.AddressProofImage.splice(index,1):alert('select documemt');
              this.proppan2=this.imagelist ? this.imagelist.length:0;
              this.imageSrc3=this.imagelist[0];
              if(this.imagelist.length==0){
                this.display=false;this.imageSrc3="";
              } 
            }
          })
        } else{
          this.blocked=false;
          this.imagelist.splice(index, 1);
          this.selectedSupplier.AddressProofImage && this.selectedSupplier.AddressProofImage.length>0 ?this.selectedSupplier.AddressProofImage.splice(index,1):alert('select documemt');
          this.proppan2=this.imagelist ? this.imagelist.length:0;
          this.imageSrc3=this.imagelist[0];
          if(this.imagelist.length==0){
            this.display=false;this.imageSrc3="";
          } 
        }
      } 
    }
    if(docName=="FSSAI"){
      if (index > -1){
        let removeDocId=0;
          if(this.selectedSupplier.FSSAIImages && this.selectedSupplier.FSSAIImages.length>0){
            this.selectedSupplier.FSSAIImages.forEach(e=>{
              if(DocumentPath.includes(e.DocumentPath)){
                removeDocId=e.Id
              }
            })
            this.blocked=true
            this.supplierService.removeUploadedDocuments(removeDocId).subscribe((res:any)=>{
              if(res.Status){
                this.imagelist.splice(index, 1);
                this.selectedSupplier.FSSAIImage.splice(index,1);
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
                this.selectedSupplier.FSSAIImage && this.selectedSupplier.FSSAIImage.length>0 ?this.selectedSupplier.FSSAIImage.splice(index,1):alert('select documemt');
                this.proppan3=this.imagelist ? this.imagelist.length:0;
                this.imageSrc1=this.imagelist[0];
                if(this.imagelist.length==0){
                  this.display=false;this.imageSrc1="";this.uploadFlagfassi=true;
                } 
              }
            })
          } else{
            this.blocked=false;
            this.imagelist.splice(index, 1);
            this.selectedSupplier.FSSAIImage && this.selectedSupplier.FSSAIImage.length>0 ?this.selectedSupplier.FSSAIImage.splice(index,1):alert('select documemt');
            this.proppan3=this.imagelist ? this.imagelist.length:0;
            this.imageSrc1=this.imagelist[0];
            if(this.imagelist.length==0){
              this.display=false;this.imageSrc1="";this.uploadFlagfassi=true;
            } 
          }
      }
    }
    if(docName=="Bank A/C"){
      if (index > -1) {
        let removeDocId=0;
          if(this.selectedSupplier.ChequeImages && this.selectedSupplier.ChequeImages.length>0){
            this.selectedSupplier.ChequeImages.forEach(e=>{
              if(DocumentPath.includes(e.DocumentPath)){
                removeDocId=e.Id
              }
            })
            this.blocked=true
            this.supplierService.removeUploadedDocuments(removeDocId).subscribe((res:any)=>{
              if(res.Status){
                this.imagelist.splice(index, 1);
                this.selectedSupplier.ChequeImage.splice(index,1);
                this.proppan4=this.imagelist ? this.imagelist.length:0;
                this.blocked=false
                alert("successfully removed!");
                if(this.imagelist.length==0){
                  this.display=false;this.uploadFlagBankAc=true;
                } 
              }
              else{
                this.blocked=false;
                this.imagelist.splice(index, 1);
                this.selectedSupplier.ChequeImage && this.selectedSupplier.ChequeImage.length>0 ?this.selectedSupplier.ChequeImage.splice(index,1):alert('select documemt');
                this.proppan4=this.imagelist ? this.imagelist.length:0;
                this.imageSrc4=this.imagelist[0];
                if(this.imagelist.length==0){
                  this.display=false;this.imageSrc4="";this.uploadFlagBankAc=true;
                } 
              }
            })
          } else{
            this.blocked=false;
            this.imagelist.splice(index, 1);
            this.selectedSupplier.ChequeImage && this.selectedSupplier.ChequeImage.length>0 ?this.selectedSupplier.ChequeImage.splice(index,1):alert('select documemt');
            this.proppan4=this.imagelist ? this.imagelist.length:0; this.imageSrc4=this.imagelist[0];
            if(this.imagelist.length==0){
              this.display=false;this.imageSrc4="";this.uploadFlagBankAc=true;
            } 
          }
      }
    }
    if(docName=="GSTN" || docName=="GST"){
      if (index > -1) {
        let removeDocId=0;
          if(this.selectedSupplier.GSTImages && this.selectedSupplier.GSTImages.length>0){
            this.selectedSupplier.GSTImages.forEach(e=>{
              if(DocumentPath.includes(e.DocumentPath)){
                removeDocId=e.Id
              }
            })
            this.blocked=true
            this.supplierService.removeUploadedDocuments(removeDocId).subscribe((res:any)=>{
              if(res.Status){
                this.imagelist.splice(index, 1);
                this.selectedSupplier.GSTImage.splice(index,1);
                this.proppan5=this.imagelist ? this.imagelist.length:0;
                this.blocked=false
                alert("successfully removed!");
                if(this.imagelist.length==0){
                  this.display=false;this.uploadFlaggstImage=true;
                } 
              }
              else{
                this.blocked=false;
                this.imagelist.splice(index, 1);
                this.selectedSupplier.GSTImage && this.selectedSupplier.GSTImage.length>0 ?this.selectedSupplier.GSTImage.splice(index,1):alert('select documemt');
                this.proppan5=this.imagelist ? this.imagelist.length:0;                this.imageSrc5=this.imagelist[0];
                if(this.imagelist.length==0){
                  this.display=false;this.imageSrc5="";this.uploadFlaggstImage=true;
                } 
              }
            })
          } else{
            this.blocked=false;
            this.imagelist.splice(index, 1);
            this.selectedSupplier.GSTImage && this.selectedSupplier.GSTImage.length>0 ?this.selectedSupplier.GSTImage.splice(index,1):alert('select documemt');
            this.proppan5=this.imagelist ? this.imagelist.length:0;this.imageSrc5=this.imagelist[0];
            if(this.imagelist.length==0){
              this.display=false;this.imageSrc5="";this.uploadFlaggstImage=true;
            } 
          }
      }
    }
    if(docName=="Agreement"){
      if (index > -1) {
        let removeDocId=0;
          if(this.selectedSupplier.AgreementImages && this.selectedSupplier.AgreementImages.length>0){
            this.selectedSupplier.AgreementImages.forEach(e=>{
              if(DocumentPath.includes(e.DocumentPath)){
                removeDocId=e.Id
                this.blocked=false;
              }
            })
            this.blocked=true
            this.supplierService.removeUploadedDocuments(removeDocId).subscribe((res:any)=>{
              if(res.status){
                this.imagelist.splice(index, 1);
                this.selectedSupplier.AgreementImage.splice(index,1);
                this.proppan6=this.imagelist ? this.imagelist.length:0;
                this.blocked=false
                alert("successfully removed!");
                if(this.imagelist.length==0){
                  this.display=false;this.uploadFlagAgreementImage=true;
                } 
              }
              else{
                this.blocked=false;
              this.imagelist.splice(index, 1);
              this.selectedSupplier.AgreementImage && this.selectedSupplier.AgreementImage.length>0 ?this.selectedSupplier.AgreementImage.splice(index,1):alert('select documemt');
              this.proppan6=this.imagelist ? this.imagelist.length:0;this.imageSrc6=this.imagelist[0];
              if(this.imagelist.length==0){
                this.display=false;this.imageSrc6="";this.uploadFlagAgreementImage=true;
              } 
              }
            })
          }  else{
            this.blocked=false;
          this.imagelist.splice(index, 1);
          this.selectedSupplier.AgreementImage && this.selectedSupplier.AgreementImage.length>0 ?this.selectedSupplier.AgreementImage.splice(index,1):alert('select documemt');
          this.proppan6=this.imagelist ? this.imagelist.length:0;this.imageSrc6=this.imagelist[0];
          if(this.imagelist.length==0){
            this.display=false;this.imageSrc6="";this.uploadFlagAgreementImage=true;
          } 
          }
      }
    }
    if(docName=="Proprietor" || docName=="Partnership" || docName== "LLP"|| docName=="Private Limited"|| docName=="Limited" || docName=="Partner" || docName=="Director"){
      if (index > -1) {
        let removeDocId=0;
          if(this.selectedSupplier.ProprietorPanImages && this.selectedSupplier.ProprietorPanImages.length>0){
            this.selectedSupplier.ProprietorPanImages.forEach(e=>{
              if(DocumentPath.includes(e.DocumentPath)){
                removeDocId=e.Id
              }
            })
            this.blocked=true
            this.supplierService.removeUploadedDocuments(removeDocId).subscribe((res:any)=>{
              if(res.Status){
                this.imagelist.splice(index, 1);
                this.selectedSupplier.ProprietorPanImage.splice(index,1);
                this.proppan7=this.imagelist ? this.imagelist.length:0;
                this.blocked=false;
                alert("successfully removed!");
                if(this.imagelist.length==0){
                  this.display=false;this.uploadFlagPropPan=true;
                } 
              }
              else{
                this.blocked=false;
                this.imagelist.splice(index, 1);
                this.selectedSupplier.ProprietorPanImage && this.selectedSupplier.ProprietorPanImage.length>0 ?this.selectedSupplier.ProprietorPanImage.splice(index,1):alert('select documemt');
                this.proppan7=this.imagelist ? this.imagelist.length:0;this.imageSrc=this.imagelist[0];
                if(this.imagelist.length==0){
                  this.display=false;this.imageSrc="";this.uploadFlagPropPan=true;
                } 
              }
            })
          } else{
            this.blocked=false;
            this.imagelist.splice(index, 1);
            this.selectedSupplier.ProprietorPanImage && this.selectedSupplier.ProprietorPanImage.length>0 ?this.selectedSupplier.ProprietorPanImage.splice(index,1):alert('select documemt');
            this.proppan7=this.imagelist ? this.imagelist.length:0;this.imageSrc=this.imagelist[0];
            if(this.imagelist.length==0){
              this.display=false;this.imageSrc="";this.uploadFlagPropPan=true;
            } 
          }
      }
    }
    if(this.imagelist.length==0)this.display=false;
  }


  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
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


  statusforcheck:boolean=false;
  isshow:boolean =false;
  texts:string="";

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

  uploadFlagMSME:boolean=true;
  @ViewChild('MSMEDoc', {static: false})
  MSMEDoc: ElementRef;


  uploadMSMEImage() {
   if (!this.myFiles && this.myFiles.length==0 ) {
       this.MessageService.add({ severity: 'error', summary: 'please upload MSME Doc.', detail: '' });
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
       this.MessageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
       this.file = [];
       this.myFiles = [];
       this.uploadFlagMSME = false;
     }, (err) => {
       alert("Document Size is more then 20 mb");
       this.file = [];
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
   isMSMERegis:boolean=false;
   OnChangeMSMEStatus(Status){
     if(Status=='Registered'){this.isMSMERegis=true}
     else{
       this.selectedSupplier.MSMEImage=[];
       this.isMSMERegis=false;
       this.proppan8=0;
       this.imageSrc8="";
     }
   }
   BuyersList:any
   GetBuyers(){
     this.blocked = false;
     this.buyerservice.GetBuyers().subscribe(result => {
       this.BuyersList = result;
       console.log(this.BuyersList, 'BuyersList');       
      })
    }
}



