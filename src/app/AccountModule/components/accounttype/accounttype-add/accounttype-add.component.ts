import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccounttypeService } from 'app/shared/services/accounttype.service';
import { AccountclassificationService } from 'app/shared/services/accountclassification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounttype-add',
  templateUrl: './accounttype-add.component.html',
  styleUrls: ['./accounttype-add.component.scss']
})
export class AccounttypeAddComponent implements OnInit {
  @Input() ID: number;
  @Output() refreshParent = new EventEmitter(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 
  isInvalid:boolean;  
  accountClassificationList: any;
  accountType:any;
  constructor(private accounttype : AccounttypeService,private accountclassification  : AccountclassificationService,private router : Router) { this.accountType = {}}

  ngOnInit() {
    if(this.ID){
    this.accounttype.GetByID(this.ID).subscribe(result => {
      this.accountType = result;
     
      console.log('GetByID: ', this.accountType);
    })
    }

    this.accountclassification.GetAccountClassification().subscribe(result => {
      this.accountClassificationList = result;
      console.log(this.accountClassificationList);
     });
  }
  onclick(acctypeForm:any){    
    console.log('acctypeForm: ', acctypeForm);
    if (acctypeForm.form.status == "VALID") {    
    if(this.ID == null){
      this.accounttype.addAccountType(this.accountType).subscribe(result => {
        this.router.navigateByUrl('layout/Account/accounttype')
       // this.expanded = false;
      },
      (err)=>{
        alert("error")
     
      });
    }else{
      this.accounttype.UpdateAccountType(this.accountType).subscribe(result => {
        console.log(this.ID);          
        this.router.navigateByUrl('layout/Account/accounttype');
        // this.isdetailsclose.emit(false);
        this.refreshParent.emit();

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
    this.router.navigateByUrl('layout/Account/accounttype')
  }
}
