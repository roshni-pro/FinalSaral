import { ViewChild, ElementRef } from '@angular/core';
import { EventEmitter, Input, NgZone, Output } from '@angular/core';
import { Component, OnInit  } from '@angular/core';
import {MessageService} from 'primeng/api';
import { environment } from 'environments/environment';
import { SkBuisnessLoanService } from 'app/sk-buisness-lead/services/sk-buisness-loan.service';
// import { NgxImageCompressService } from 'ngx-image-compress';
// import { Ng2ImgMaxService } from 'ng2-img-max';
// import { ImageCroppedEvent } from 'ngx-image-cropper';
// import { NgxImageCompressService } from 'ngx-image-compress';
// import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-additional-documents',
  templateUrl: './additional-documents.component.html',
  styleUrls: ['./additional-documents.component.scss']
})
export class AdditionalDocumentsComponent implements OnInit  {

  constructor(private service:SkBuisnessLoanService,private messageService: MessageService) {

    // public ng2ImgMax: Ng2ImgMaxService, private imageCompress: NgxImageCompressService
    // 
   }
  InputVar: ElementRef;
  documentType:any
  additionalDocumentList:any[]=[]
  files:any
  uploadedFiles:any
  showAddNew:boolean=false
  selectedDocumentType:any
  finalURL:any
  comment:any
  tempArray:any[]=[]
  blocked:boolean=false;
  imageUrl: any | null = null;
  documentURL:any
  showViewDocument:boolean=false
  showDocPop:boolean=false
  showImg:any
  pdfUrl:any
  @Input() LeadId: number;
  @Output() detectchange = new EventEmitter();
  @ViewChild('fileRef',{static:true}) fileUploader: ElementRef;
  ngOnInit(): void { 
    this.getDocumentList(); 
    console.log(this.LeadId);
    this.selectedDocumentType=0;
    this.onChangeDocumentType()
  }
  addNew()
  {
    this.showAddNew=true
    this.documentType=null;
    this.documentType=undefined;
    this.clearbatch()
  }
  base64textString:any
  onSave()
  {
    if(this.documentType==null)
    {
      alert(" Select Document Type")
      return false;
    }
    if(this.imageUrl==null || this.imageUrl==undefined)
    {
      alert("Upload Document")
      return false;
    }
    var obj={
      'documentName':this.documentType.DocumentName,
      'documentType':this.documentType.Id,
      'comment':this.comment,
      'file':this.filess,
      'imgURL':this.imageUrl,
      'ImageUrl':this.finalURL,
      'LeadId':this.LeadId
    }
    this.tempArray.push(obj)
    this.clearbatch();
  }
  Delete(rowData)
  {
    this.tempArray=this.tempArray.filter(x=> !(x.documentType==rowData.documentType && x.comment==rowData.comment));
  }
  imgOrpdF:boolean=false
  filess:any
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.filess=file
    console.log(file);
    var type=file.type
    // if (file && (type=='image/png' || type=='image/jpeg')) {
    //   this.imgOrpdF=false
    //   // Read the selected file as a data URL
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     this.imageUrl = e.target.result;
    //   };
    // reader.readAsDataURL(file);
    // console.log(this.imageUrl,"ImageURL");
    // const uploadfile: any = this.filess;
    // var readerr = new FileReader();
    // readerr.onload = this._handleReaderLoaded.bind(this);
    // readerr.readAsBinaryString(uploadfile);
      
    // }
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
        // this.blocked=true;
        // this.service.uploadElectriCityBill(formData).subscribe(x=>{
        //   this.blocked=false;
        //   console.log(x,"PDFRes");
        //   this.finalURL=x
        //   this.detectchange.emit(x);
        // })
    }
    console.log(this.imageUrl,"ImageURL");
  }
  }

  ViewDocument(rowData)
  {
    console.log(rowData,"rowDaTA");
    if(rowData.file.type=='image/png' || rowData.file.type=='image/jpeg')
    {
      this.showViewDocument=true;
      this.showImg=rowData.imgURL;
    }
    if(rowData.file.type=='application/pdf')
    {
      this.downloadPDF(rowData.file)
    }
  }
  clearbatch()
  {
    this.comment='';
    this.documentType=null;
    this.imageUrl=null;
    this.fileUploader.nativeElement.value = null;
    this.finalURL=null
  }
  
  downloadPDF(file: File) {
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(file);
    downloadLink.download = file.name;
    downloadLink.click();
  }
  documentList:any[]=[]
  getDocumentList()
  {
  var type='AdditionalDocument';
  // this.service.getDocumentList(type).subscribe(res=>
  //   {
  //     console.log(res,"res");
  //     this.documentList=res.Data;
  //     console.log(this.documentList,"res");
      
  //   })
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
      var result = this.tempArray.map(function(a) {
        return {
          'LeadMasterId':a.LeadId,
          'DocumentMasterId': a.documentType,
          'Comment': a.comment,
          'ImageUrl':a.ImageUrl,
         };
       });
       console.log(result,"result");
       this.blocked=true;
      //  this.service.onSaveAdditional(result).subscribe(res=>
      //   {
      //     console.log(res,"After Save");
      //     this.blocked=false;
      //     // alert(res.Msg)
      //     if(res.Result==true)
      //     {
      //       this.showSuccess(res.Msg)
      //     }
      //     else
      //     {
      //       this.showError(res.Msg)
      //     }
      //     this.showAddNew=false;
      //     this.tempArray=[];
      //     this.onChangeDocumentType()
      //   })
    } else {
    }
  }
  getAdditionalDocument()
  {
    console.log(this.LeadId);
  }

  onChangeDocumentType()
  {
    this.additionalDocumentList=[]
    console.log(this.selectedDocumentType);
    // this.service.getAdditionalDocument(this.selectedDocumentType,this.LeadId).subscribe(res=>
    //   {
    //     console.log(res,"res");
    //     this.additionalDocumentList=res;
    //   })
  }
  showDownloadDocument(docURL)
  {
    console.log(docURL);
     var docURLL=docURL.split('//')
     console.log(docURL);
    var FinalURL='/'+docURL[2]
    this.documentURL=environment.apiURL+FinalURL;
    console.log('documentURL:',this.documentURL);
    var checkExt=docURLL[2].split('.')
    console.log(checkExt,"checkExt");
    if(checkExt[1]=="pdf")
    {
    window.open(docURL)
    }
    if(checkExt[1]=="jpg" || checkExt[1]=="png")
    {
   //  this.showDocPop=true;
    this.documentURL=docURL
    window.open(this.documentURL)
    console.log('documentURL:',this.documentURL);
    }
  //console.log(this.removeExtension('myFile.jpeg'));
  }
  DeleteDoc(Id)
  {
    if (confirm("Are You Sure Want To Delete??") == true) {
      this.blocked=true;
    // this.service.DeleteRecord(Id).subscribe((res:any)=>
    //   {
    //     console.log(res,"res");
    //     this.blocked=false;
    //     if(res.Result==true)
    //     {
    //       this.showSuccess(res.Msg)
    //     }
    //     else
    //     {
    //       this.showError(res.Msg)
    //     }
        
    //     this.onChangeDocumentType()
    //   })
    }else
    {}
  }
  showSuccess(msg) {
    this.messageService.add({severity:'success', summary:msg});
}
showError(msg) {
  this.messageService.add({ severity: 'error', summary: msg});
}
 removeExtension(filename) {
  return (
    filename.substring(0, filename.lastIndexOf('.')) || filename
  );
}
}
