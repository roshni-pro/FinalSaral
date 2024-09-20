import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountclassificationService } from 'app/shared/services/accountclassification.service';
import {Router} from '@angular/router';
import { loadavg } from 'os';
@Component({
  selector: 'app-accountclassification-add',
  templateUrl: './accountclassification-add.component.html',
  styleUrls: ['./accountclassification-add.component.scss']
})
export class AccountclassificationAddComponent implements OnInit {
  account : any
  @Input() ID: number;
  @Output() refreshParent = new EventEmitter(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 
  isInvalid: boolean;
  constructor(private accountclassification : AccountclassificationService, private router : Router ) { this.account = {} }

  ngOnInit() {
    this.accountclassification.GetByID(this.ID).subscribe(result => {
      this.account = result;
      console.log('GetByID: ', this.account);
    })
  
  }
// //   onclick(accountclassificationForm:any){
// //     console.log('accountclassificationForm: ', accountclassificationForm);
// //     if (accountclassificationForm.form.status == "VALID") {
// //     console.log(this.account);
// //     if(this.ID == null){
// //     this.accountclassification.addClassification(this.account).subscribe(result => {
// //       this.router.navigateByUrl('layout/Account/accountclassificatiion')
// //      // this.expanded = false;
// //     },
// //     (err)=>{
// //       alert("error")
   
// //     });
// //   }else{
// //     this.accountclassification.UpdateClassification(this.account).subscribe(result => {
// //       console.log(this.ID);
// //       // window.location.reload();
// //       this.router.navigateByUrl("layout/Account/accountclassificatiion");//pz
// //         ////this.refreshParent.emit(false);
// //       // this.router.navigateByUrl("layout/Account/accountclassificatiion");
// //      // this.expanded = false;
// //     },
// //     (err)=>{
// //       alert("error")
   
// //     });
// //   }
// //   }else{
// //     this.isInvalid = true;
// //   }
 

// // }

onclick(accountclassificationForm:any){
  console.log('accountclassificationForm: ', accountclassificationForm);
  if (accountclassificationForm.form.status == "VALID") {
  console.log(this.account);
  if(this.ID == null){
  this.accountclassification.addClassification(this.account).subscribe(result => {
    this.router.navigateByUrl('layout/Account/accountclassificatiion')
   // this.expanded = false;
  },
  (err)=>{
    alert("error")
 
  });
}else{
  this.accountclassification.UpdateClassification(this.account).subscribe(result => {
    console.log(this.ID);
    this.router.navigateByUrl('layout/Account/accountclassificatiion');
    this.isdetailsclose.emit(false);
    this.refreshParent.emit(false);
   // this.expanded = false;
  },
  (err)=>{
    alert("error")
 
  });
}
}else{
  this.isInvalid = true;
}
}



  onCancel(){
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('layout/Account/accountclassificatiion');  
  }
}
