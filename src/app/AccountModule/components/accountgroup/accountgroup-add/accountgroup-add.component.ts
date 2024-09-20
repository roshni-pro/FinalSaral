import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountgroupService } from 'app/shared/services/accountgroup.service';
import { AccounttypeService } from 'app/shared/services/accounttype.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accountgroup-add',
  templateUrl: './accountgroup-add.component.html',
  styleUrls: ['./accountgroup-add.component.scss']
})
export class AccountgroupAddComponent implements OnInit {
@Input() ID: number;
@Output() refreshParent = new EventEmitter(); 
@Output() isdetailsclose = new EventEmitter<boolean>(); 
isInvalid:boolean;
accountGroup: any;
accountTypeList:any;
  constructor(private accounttype : AccounttypeService,private accountgroup  : AccountgroupService,private router : Router) { this.accountGroup = {}; }

  ngOnInit() {    
    this.isInvalid = false;
    if(this.ID){
    this.accountgroup.GetByID(this.ID).subscribe(result => {
      this.accountGroup = result;
     
      console.log('GetByID: ', this.accountGroup);
    })
    }

    this.accounttype.GetAllAccountType().subscribe(result => {
      this.accountTypeList = result;
      console.log(this.accountTypeList);
     });
  }
  onclick(accgroupForm:any){
    console.log('accgroupForm: ', accgroupForm);
    if (accgroupForm.form.status == "VALID") {
    if(this.ID == null){
      this.accountgroup.addAccountGroup(this.accountGroup).subscribe(result => {
        this.router.navigateByUrl('layout/Account/accountgroup')
       // this.expanded = false;
      },
      (err)=>{
        alert("error")
     
      });
    }else{
      this.accountgroup.UpdateAccountGroup(this.accountGroup).subscribe(result => {
        console.log(this.ID);
        // this.refreshParent.emit();//pz2Aug        
        this.router.navigateByUrl('layout/Account/accountgroup');        
        this.refreshParent.emit();
        // this.router.navigateByUrl('layout/Account/accountgroup')
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
    this.router.navigateByUrl('layout/Account/accountgroup')
  }
}
