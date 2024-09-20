import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SkBuisnessLoanService } from 'app/sk-buisness-lead/services/sk-buisness-loan.service';
import { environment } from 'environments/environment';
import { MessageService } from 'primeng/api';
import { ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {
@Input() bankDetailsDc : any;
@Input() BankStatementDc : any;
@Input() LeadMasterId : number;
@Output() onApproveBankStmt: EventEmitter<any> = new EventEmitter<any>();
@Output() onRejectBankStmt: EventEmitter<any> = new EventEmitter<any>();
@Output() OnhistoryClick: EventEmitter<any> = new EventEmitter<any>();
baseURL: any;
@Input() isVerified : boolean = false;
@Input() isRejected : boolean = false;
blocked : boolean = false;
@Input() rowData : any;
isRejectDoc : boolean = false;
@Input() loanPosted : boolean = false;
@ViewChild('fileRef',{static:true}) fileUploader: ElementRef;
AccountTypeList:any[]=[];
Comment : any;
  constructor(private _skBuisnessLoanService : SkBuisnessLoanService,private messageService: MessageService) { 
    this.baseURL = environment.apiURL; 
    this.AccountTypeList=[
      {name:'Savings'},{name:'Current'}
    ]
  }
   BankStatementCount:any=0 
  ModifyAccountHoldername=undefined
  ModifybankName=undefined
  ModifyaccountNumber =undefined
  Modifyifsc=undefined
  ModifyAccounttype =undefined
  ngOnInit() {
    debugger;

    if(this.bankDetailsDc.ben_Accountholdername!=undefined || this.bankDetailsDc.ben_Accountholdername!=null 
      || this.bankDetailsDc.ben_Bankname!=undefined || this.bankDetailsDc.ben_Bankname!=null
      || this.bankDetailsDc.ben_AccountNumber!=undefined || this.bankDetailsDc.ben_AccountNumber!=null
      || this.bankDetailsDc.ben_IFSCCode!=undefined || this.bankDetailsDc.ben_IFSCCode!=null
      || this.bankDetailsDc.ben_Typeofaccount!=undefined || this.bankDetailsDc.ben_Typeofaccount!=null
      ){
        this.AccountHoldername= this.bankDetailsDc.ben_Accountholdername
        this.bankName=this.bankDetailsDc.ben_Bankname 
        this.accountNumber=this.bankDetailsDc.ben_AccountNumber 
        this.ifsc=this.bankDetailsDc.ben_IFSCCode
        this.Accounttype = {name:this.bankDetailsDc.ben_Typeofaccount}

        this.ModifyAccountHoldername= this.bankDetailsDc.ben_Accountholdername
        this.ModifybankName=this.bankDetailsDc.ben_Bankname 
        this.ModifyaccountNumber =this.bankDetailsDc.ben_AccountNumber
        this.Modifyifsc= this.bankDetailsDc.ben_IFSCCode
        this.ModifyAccounttype ={name:this.bankDetailsDc.ben_Typeofaccount}
        this.SaveNachDetailsResponse=true;
    }
    this.isVerified = false;
    console.log("this.BankStatementDc",this.BankStatementDc)
    this.BankStatementCount =this.BankStatementDc.lenght;
    if(this.bankDetailsDc != null)
    {
      this.blocked = true;
    this._skBuisnessLoanService.getVerifiedDocumentStatus(this.bankDetailsDc.SequenceNo,this.LeadMasterId).subscribe(x=>
      {
        this.blocked = false;
        if(x.Status)
        {
          this.isVerified = x.Msg == 'Verified Successfully' ? true : false;
          this.isRejected = x.Msg == 'Rejected Successfully' ? true : false;
        }else{
          this.isRejected = false;
          this.isVerified = false;
        }  this.Comment='';       
      })
    }
  }

  checked:boolean=false
  sameAsbankDetails(){
    debugger
    if (this.checked) {
      this.AccountHoldername= this.bankDetailsDc.AccountHolderName
      this.bankName=this.bankDetailsDc.borro_bank_name 
      this.accountNumber=this.bankDetailsDc.borro_bank_acc_num 
      this.ifsc=this.bankDetailsDc.borro_bank_ifsc
      this.Accounttype = {name:this.bankDetailsDc.AccountType}
    } else {
      this.AccountHoldername= undefined
      this.bankName = undefined  
      this.accountNumber=undefined
      this.ifsc=undefined
      this.Accounttype=undefined
    }

  }
  AccountHoldername=undefined
  bankName=undefined
  accountNumber=undefined
  ifsc=undefined
  Accounttype=undefined
  SaveNachDetailsResponse:boolean=false
  SaveNachDetails(){
    debugger
    if(this.AccountHoldername ==undefined || this.AccountHoldername =='' || this.bankName==undefined || this.bankName==''||  this.accountNumber==undefined 
    || this.accountNumber==''  || this.ifsc==undefined || this.ifsc=='' || this.Accounttype==undefined)
    {
      alert("Please Fill All Bank Account NACH Details")
    }
    else{
      var AddBenBankDetail=
      {
          LeadmasterId:this.LeadMasterId,
          ben_bank_name : this.bankName,
          ben_bank_ifsc : this.ifsc,
          ben_bank_acc_num : this.accountNumber,
          ben_accountHolderName :this.AccountHoldername,
          ben_Typeofaccount: this.Accounttype.name,
      }
      debugger
      this.blocked=true;
      this._skBuisnessLoanService.AddBenBankDetail(AddBenBankDetail).subscribe(x=>{
        debugger
        this.blocked=false;
        if(x=='Saved Succesfully'){
          this.SaveNachDetailsResponse = true;

          this.ModifyAccountHoldername= this.AccountHoldername
          this.ModifybankName=this.bankName
          this.ModifyaccountNumber =this.accountNumber
          this.Modifyifsc= this.ifsc
          this.ModifyAccounttype ={name:this.Accounttype.name}
        }
        else{
          this.SaveNachDetailsResponse = false;
        }
        console.log(x); alert(x)
      })
    }
  }
  validateAlphaNumeric(event: any) {
    const inputValue = event.target.value;
    var key = event.keyCode;
    if (key === 32) {
      event.preventDefault();
    }
    // Prevent the user from entering a full stop at the first letter
    if (inputValue[0] === '.') {
      event.target.value.preventDefault();
    }
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }
  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
    if (!reg.test(input)) {
      event.preventDefault();
    }
    if (event.which == 45 || event.which == 189) {
      event.preventDefault();
    }
  }
  onKeydown(event: any) {
    // debugger;
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    console.log(charCode, ': charCode');

    if (((charCode != 8 && charCode != 17 && charCode != 18 && charCode != 46 && charCode != 37 && charCode < 48) || (charCode > 57 && charCode != 65 && charCode != 174))) {
      // this.toastr.error('You Can Enter Or Paste Numbers Only!!');
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  comment:any
  showAddDoc:boolean=false;
  documentType:any
  imageUrl:any
  filess:any
  finalURL:any
  tempArray:any=[]
  AddDocuments()
  {
    this.clearbatch();
    this.tempArray=[];
    this.showAddDoc=true;
  }
  onSave()
  {
    debugger
    if(this.comment==null || this.comment==undefined)
    {
      alert("Add Comment First")
      return false;
    }
    if(this.imageUrl==null || this.imageUrl==undefined)
    {
      alert(" Select Document First")
      return false;
    }
    var obj={
      'comment':this.comment,
      'file':this.filess,
      'imgURL':this.imageUrl,
      'LeadId':this.LeadMasterId,
      'finalURL':this.finalURL
    }
    this.tempArray.push(obj)
    this.clearbatch();
  }
  allfiles:any
  imgOrpdF:boolean=false
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.filess=file
    console.log(file);
    var type=file.type
    if(file && type=='application/pdf')
    {
      this.imgOrpdF=true
      const file = event.target.files[0];
      if (file) {
        // You can perform additional checks here to ensure the file is a PDF.
  
        // Now, you can trigger the download.
        this.imageUrl= file;
        let formData = new FormData();
        formData.append('file', file);
        this.blocked=true;
        this._skBuisnessLoanService.UploadStatement(formData).subscribe(x=>{
          this.blocked=false;
          console.log(x,"PDFRes");
          this.finalURL=x
          //this.detectchange.emit(x);
        })
    }
    console.log(this.imageUrl,"ImageURL");
  }
  }
  DeleteUploadedDocument(rowdata){
      debugger
      if (confirm("Are You Sure Want To Delete??") == true) {
        this.blocked = true;
        this._skBuisnessLoanService.DeleteBankStatementById(rowdata.LeadBankStatementId).subscribe(x=>{
          this.blocked = false;
          if(x.Status){
            alert(x.Msg)
            this.BankStatementDc = this.BankStatementDc.filter(x => x.LeadBankStatementId!== rowdata.LeadBankStatementId);
            }
            else{
              alert(x.Msg)
            }
          })
      }
  }

  OnSaveDocument()
  {
    if(this.tempArray.length==0)
    {
      alert("Please Add Data")
      return false;
    }
    if (confirm("Are You Sure Want To Save??") == true) {
      console.log(this.tempArray);
      debugger
      var result = this.tempArray.map(function(a) {
        return a.finalURL
       });
      var  AddBankStatementDc ={
        "LeadMasterId":this.LeadMasterId,
        "BankStatement": result,
        "Remark": this.tempArray[0].comment!=null ? this.tempArray[0].comment :''
        }
       console.log(AddBankStatementDc,"result");
       this.blocked=true;
       this._skBuisnessLoanService.AddBankStatement(AddBankStatementDc).subscribe(res=>
        {
          debugger
          console.log(res,"After Save");
          this.blocked=false;
          // alert(res.Msg)
          if(res.Status==true)
          {
            this.messageService.add({ severity: 'success', summary: res.Msg, detail: '' })
            location.reload();
          }
          else
          {
            this.messageService.add({ severity: 'error', summary: res.Msg, detail: '' })
          }
          this.showAddDoc=false;
          this.tempArray=[];
        })
    } else {
    }
  }
  ViewUploadedDocument(rowDaTA){
    debugger
    window.open(this.baseURL+rowDaTA.StatementFile);
  }
  ViewDocument(rowData)
  {
    debugger
    console.log(rowData,"rowDaTA");
    if(rowData.file.type=='application/pdf')
    {
      this.downloadPDF(rowData.file)
    }
  }
  downloadPDF(file: File) {
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(file);
    downloadLink.download = file.name;
    downloadLink.click();
  }
  clearbatch()
  {
    this.comment=null;
    this.imageUrl=null;
    this.filess=null
    this.fileUploader.nativeElement.value = null;
    //this.finalURL=null
  }
  Delete(rowData)
  {
    this.tempArray=this.tempArray.filter(x=> !(x.documentType==rowData.documentType && x.comment==rowData.comment));
  }
  
  Onhistory(){
    this.OnhistoryClick.emit(true)
  }
  isUpload : boolean = false;
  onUploadFrontimage(imagePath: any) {
    if (imagePath) {
      this.isUpload = true;
      this.bankDetailsDc.FrontFileUrl = imagePath;
    }
  }
  onApproved()
  {
    debugger
    if(this.AccountHoldername ==undefined || this.AccountHoldername =='' || this.bankName==undefined || this.bankName==''||  this.accountNumber==undefined 
    || this.accountNumber==''  || this.ifsc==undefined || this.ifsc=='' || this.Accounttype==undefined){
      alert("Please Fill All Bank Account NACH Details")
    }
    else if(this.ModifyAccountHoldername!=undefined && this.AccountHoldername!=this.ModifyAccountHoldername){
      alert("Save Modify Account Holder Name Before Approve")
    }
    else if(this.ModifybankName!=undefined && this.bankName!=this.ModifybankName){
      alert("Save Modify Bank Name Before Approve")
    }
    else if(this.ModifyaccountNumber!=undefined && this.accountNumber!=this.ModifyaccountNumber){
      alert("Save Modify Account Number Before Approve")
    }
    else if(this.Modifyifsc!=undefined && this.ifsc!=this.Modifyifsc){
      alert("Save Modify IFSC Before Approve")
    }
    else if(this.ModifyAccounttype!=undefined && this.Accounttype.name!=this.ModifyAccounttype.name){
      alert("Save Modify Account Type Before Approve")
    }
    else if(this.SaveNachDetailsResponse==false){
      alert("Save Bank Account NACH Details Before Approve")
    }
    else{
      this.onApproveBankStmt.emit(this.bankDetailsDc);
      debugger;
      this.ngOnInit();
    }
  }
  onReject()
  {
    debugger;
    if(this.Comment && this.Comment.length > 3)
    {
    this.isRejectDoc = false;
    let payload={
      "DocumentName":this.bankDetailsDc.DocumentName,
      "LeadmasterId":this.LeadMasterId,
      "isApprove":false,
      "SequenceNo":this.bankDetailsDc.SequenceNo,
      "Comment":this.Comment
    }
    this.onRejectBankStmt.emit(payload);
    this.ngOnInit();
    }else{
      if(this.Comment && this.Comment.length > 0)
      {
        this.messageService.add({ severity: 'error', summary: 'Comment Should be Atleast more then 3 char!', detail: '' }); 
      }else{
        this.messageService.add({ severity: 'error', summary: 'Please Enter Comment', detail: '' }); 
      }
    }
  }
  
  onRejectDoc()
  {
    this.Comment=''; 
    this.isRejectDoc = true;
  }
  OpenPdf()
  {
    window.open(this.baseURL + '' + this.bankDetailsDc.FrontFileUrl);
  }
  isValid : boolean = false;
  onClickPostArthmate()
  {
    this.blocked = true;
    this._skBuisnessLoanService.docPostArthmate(this.LeadMasterId,'borro_bank_stmt').subscribe(x=>
      {
        this.blocked = false;
        if(x.Status)
        {
          this.isValid = true;
        }
        else{
          this.isValid = false;
        }
      })
  }

  onUpdate()
  {
    this.blocked = true;
    this._skBuisnessLoanService.updateDocument(this.bankDetailsDc.DocumentName,this.LeadMasterId,this.bankDetailsDc.FrontFileUrl,null).subscribe(res=>{
      console.log('Upload Doc :',res);
      this.blocked = false;
      alert(res.Msg);
    });
  }

}
