import { Component, OnInit } from '@angular/core';
import { SkBuisnessLoanService } from 'app/sk-buisness-lead/services/sk-buisness-loan.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-arthmate-repayment-update',
  templateUrl: './arthmate-repayment-update.component.html',
  styleUrls: ['./arthmate-repayment-update.component.scss']
})
export class ArthmateRepaymentUpdateComponent implements OnInit {
uploadedData:any;
FileUploadName:any;
  constructor(private _skBuisnessLoanService : SkBuisnessLoanService,private exportService : ExportServiceService) { }

  ngOnInit() {
    this.load(null);
  }

  load(event:any){
    this._skBuisnessLoanService.GetArthmateRepaymentUpload().subscribe(res=>{
        console.log(res,'res');  
        this.uploadedData =res.Data;    
    })
  }

  downloadSample(){

  }
  fileExist:boolean=false;
  async TocheckDuplicateFileName(FileUploadName:any){
    debugger
    this.fileExist =false;
    this.uploadedData.forEach(element => {
        debugger
        if(element.Filename == FileUploadName) {
            debugger;
            this.fileExist = true;
            console.log( this.fileExist,' this.fileExist');
            
            // alert('File Already Exist can not upload');
        }
    });
    if(this.fileExist){
        return false;
    }
  }

  async onUpload(event, uploadCustom) {
    const files = event.files[0];
    console.log(files);

    this.FileUploadName = files.name;
    var result=await this.TocheckDuplicateFileName(this.FileUploadName);
    let file = new FormData();
    file.append("file", files)

    // var reader = new FileReader();
    // const splitName = event[0].type.split('.');


    // if (splitName[3] == 'sheet') {
    //     reader.readAsDataURL(event[0]);
    //     reader.onload = (_event) => {
    //     }
    //     let formData = new FormData();
    //     formData.append('file', event[0]);
    //     formData.append('uploadDate',Date())

    if(!this.fileExist){
        this._skBuisnessLoanService.AddArthmateRepaymentUpload(file).subscribe((res) => {
          alert(res.Msg);
          console.log(res);
          window.location.reload();
        },
          (err:any) => {
            console.log(err);
            alert(err.message);
          })
    }
    else{
        alert('file already exist can not upload');
    }
  }
  Export(){

    this.exportService.exportAsExcelFile(this.uploadedData, 'Alldata');
  }
}
