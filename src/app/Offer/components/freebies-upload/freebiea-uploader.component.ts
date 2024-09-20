import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfferService } from 'app/offer/Service/offer.service';
import { environment } from 'environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-freebiea-uploader',
  templateUrl: './freebiea-uploader.component.html',
  styleUrls: ['./freebiea-uploader.component.scss']
})
export class FreebieaUploaderComponent implements OnInit {
  getList: any = [];
  totalRecords: any;
  fileValue;
  rows: number = 10;
  first = 0;
  apiURL:any;
  blocked:boolean=false;

  constructor(
    public offerservices: OfferService, private router: Router, private messageService:MessageService
    
  ) { this.apiURL = environment.apiURL;}

  ngOnInit() {
  }

  getEventFile(file) { // get File Value
    console.log(file, 'fileeeeeeeeee');
    this.fileValue = file[0]
  }

  uploadFile(event) { // upload file 
    const files = event.files[0];
    //console.log(files);

    let file = new FormData();
    file.append("file", files);
    var fd = new FormData();
    fd.append('file', this.fileValue);
    fd.append('compid', '1');
    this.blocked=true;
    this.offerservices.freebieFileUpload(file).subscribe((data1:any) => {
      debugger
      console.log(data1);
     this.blocked=false;
      if (data1 == "Error") {
        debugger
        alert("Some error occurred during save file data.");
     // this.messageService.add({severity: 'error', summary: 'Some error occurred during save file data.', detail: ''});
       window.location.reload();
      }
      else if (data1 == "Success") {
       alert("File Uploaded and offer created Successfully");
       // this.messageService.add({severity: 'success', summary: 'File Uploaded Successfully', detail: ''});
       window.location.reload();
      }
      else {
        this.getList = data1; 
        console.log(this.getList);
        alert("File not Uploaded Please check File"+" , "+this.getList);
      }
    })
  }

  back(){
    this.router.navigateByUrl("/layout/offer/offer-list");
  }
  refreshPage() { // refresh page
    this.getList = [];
    window.location.reload();
  }

  // load(event) {
  //   const payload = {
  //     page: 'this.skip',
  //     totalitem: 'this.take',
  //   }
  //   this.offerservices.GetGetAllBrand().subscribe(res => {
  //     console.log(res, 'result');
  //     this.getList = res.OfferListDTO;
  //     this.totalRecords = res.total_count;
  //   })
  // }



}
