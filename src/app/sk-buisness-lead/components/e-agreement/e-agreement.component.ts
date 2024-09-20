import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { SkBuisnessLoanService } from 'app/sk-buisness-lead/services/sk-buisness-loan.service';
import { environment } from 'environments/environment';
import {  ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-e-agreement',
  templateUrl: './e-agreement.component.html',
  styleUrls: ['./e-agreement.component.scss']
})
export class EAgreementComponent implements OnInit {

  baseURL: any;
  constructor(private _skBuisnessLoanService : SkBuisnessLoanService,private router: Router,private messageService: MessageService,private confirmationService : ConfirmationService) {
    this.baseURL = environment.apiURL;
   }

   @Input() LeadMasterId : number;
   blocked:boolean=false
   SlaDetails:any
  ngOnInit() {
    debugger
    this.sladata();
  }
  sladata(){
    if (this.LeadMasterId>0) {
      debugger;
       this.blocked = true;
      this._skBuisnessLoanService.offerInformation(this.LeadMasterId).subscribe(x=>
      {
        this.blocked = false;
        if(x){
        debugger;
          this.SlaDetails=x.length > 0 ? x[0] : x;
          console.log('egriment',this.SlaDetails);
        }
        else{
          //this.messageService.add({ severity: 'error', summary: 'data not found' , detail: '' });
        }
      })
    }

  }
  DawnloadSampleFile(){
    debugger
    if(this.SlaDetails.UrlSlaDocument){

      console.log(this.baseURL+this.SlaDetails.UrlSlaDocument)
      window.open(this.baseURL+this.SlaDetails.UrlSlaDocument);
    }
  }
  view(){
    console.log(this.fileURL)
    window.open(this.fileURL);
  }
  view1(){
    console.log(this.baseURL+this.SlaDetails.UrlSlaUploadSignedDocument)
    window.open(this.baseURL+this.SlaDetails.UrlSlaUploadSignedDocument);
  }
  upoloadSLAdocuments(){
    debugger
    if(this.hasSelectedFile){
      if (this.LeadMasterId>0) {
        this.blocked = true;
        this.confirmationService.confirm({
          message: 'Are you sure that you want upload document?',
          accept: () => { 
            this.blocked = true;
            this._skBuisnessLoanService.SLAdocumentUpload(this.LeadMasterId,this.file).subscribe(x=>
              {
              debugger;
              this.blocked = false;
              //alert(x)
              if(x=='Saved Successfully')
              {
                // alert(x.Msg);
                this.messageService.add({ severity: 'success', summary: x, detail: '' });
              }else{
                // alert(x.Msg);
                this.messageService.add({ severity: 'error', summary: x, detail: '' });
              }
            })
          }
        });
      }
    }
    else{
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.messageService.add({ severity: 'error', summary: 'plase select a file' , detail: '' });
    }
  }
  fileURL:any
  file:any
hasSelectedFile:any
  openFilePicker() {debugger
    if(this.SlaDetails.UrlSlaDocument || this.SlaDetails.UrlSlaDocument=='' ){
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    fileInput.addEventListener('change', (event) => {
      
      const file1 = event.target as HTMLInputElement;
      try {

        let file = new FormData();
        file.append("file", file1.files[0])
        this.file=file;
        const fileName = file1.files[0].name;
        var splitted = fileName.split(".");
        console.log(splitted[1])
        if(splitted[1]!='pdf'){
          this.messageService.add({ severity: 'error', summary: 'plase select pdf file' , detail: '' });
          return
        }
        this.fileURL = URL.createObjectURL(file1.files[0]);
        console.log('File URL:', this.fileURL);
 
        // Display the file name in an HTML element
        const fileNameElement = document.getElementById('file-name');
        fileNameElement.textContent = fileName;
        this.hasSelectedFile = fileNameElement !== null;
        const button = document.getElementById('my-button');
      !this.hasSelectedFile?fileNameElement.textContent='Please select a file.':button.textContent=null
      this.messageService.add({ severity: 'sucsess', summary: "file selected" , detail: '' });
      } catch (error) {
        console.log(error);
      }
    });
    fileInput.click();
    }
  }
}
