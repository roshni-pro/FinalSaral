import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustomerService } from 'app/shared/services/customer.service';
import { format } from 'path';
@Component({
  selector: 'app-update-target-customer',
  templateUrl: './update-target-customer.component.html',
  styleUrls: ['./update-target-customer.component.scss']
})
export class UpdateTargetCustomerComponent implements OnInit {
  uploadedFiles: any[] = [];
  dateValue:Date;
  month:any;
  year:any;
  dataFile:any;
  blocked:boolean=false
  file = new FormData();
  constructor(private messageService: MessageService, private customerService:CustomerService) { }

  ngOnInit() {
  }



onUpload(event){
  this.blocked=true
    const files = event.files[0];
    this.dataFile=files
  console.log(files);
  this.file.append("file", files)
  console.log("Files ",this.file);
  // alert("file uploaded successfully")
  this.messageService.add({severity: 'success', summary: 'File Uploaded Successfully', detail: ''});
  this.blocked=false

}
space(event) {
  if (event.target.selectionStart === 0 && event.code === 'Space') {
    event.preventDefault();
  }
}

submitData(form)
{
  this.blocked=true
 if(this.dataFile==undefined ){
  alert("please upload your file");
  this.blocked=false;
  return false;
 }
 else if(this.dateValue==null)
 {
  alert("please select  month and year")
  this.blocked=false;
  return false;
 }
console.log("this.dateValue==",this.dateValue);

this.month=this.dateValue.getMonth()+1;
this.year=this.dateValue.getFullYear();

 this.customerService.UpdateAllCustomerTargetExcel(this.month,this.year,this.file).subscribe(x=>
  {
    console.log(x);
    this.blocked=false
  },
  (err) => {
      console.log(err);
      this.blocked=false
    })
//  alert("File submitted successfully");
  this.messageService.add({severity: 'success', summary: 'File Submitted Successfully', detail: ''});
 form.clear()
 this.dateValue=null;

}
}

