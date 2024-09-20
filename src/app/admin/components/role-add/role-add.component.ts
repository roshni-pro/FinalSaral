import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

// import { RoleService } from 'app/shared/services/role.service';
import { Router } from '@angular/router';
import { RoleService } from 'app/shared/services/role.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {
  @Input() RoleId: any;
  RoleData: any;
  RoleTitle: any;
  isInvalid: boolean;
  data:any;
  role:any;
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();

  constructor( private messageService : MessageService, private router: Router,private roleservice:RoleService) { this.RoleData ={}}
  // private roleservice: RoleService,

  ngOnInit() {
    if(this.RoleId){
      this.RoleData = this.RoleId;
      
    }
    
   
}



public inputValidator(event: any) {
  //console.log(event.target.value);
  const pattern = /^[a-zA-Z]*$/;   
  //let inputChar = String.fromCharCode(event.charCode)
  if (!pattern.test(event.target.value)) {
    event.target.value = event.target.value.replace(/[^a-zA-Z]/g, "");
    // invalid character, prevent input

  }
}


Addrole(r) {

    console.log(r);
    if (r.form.status == "VALID") {
    if (this.RoleId == null) {
    this.roleservice.addRole(this.RoleData).subscribe(result => {
    // // //   this.router.navigateByUrl('layout/admin/role');
     
    // // //   this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
    // // //   console.log(result);
    // // // },
    console.log(result);

    // if(result !="Already Exists"){
      if(result !=this.RoleData){
      this.router.navigateByUrl('layout/admin/role');      
     
      this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
    }else{
      this.messageService.add({severity:'error', summary: 'Data Already Exist!', detail:''});
    }
    // this.expanded = false;
    },
    (err) => {
             // alert("error")
             this.messageService.add({severity:'error', summary: 'Error!', detail:''});
            });
        } else {
          this.roleservice.Updaterole(this.RoleData).subscribe(result => {
          
            console.log("dfkjdfhdakjfh");
            console.log(r.data);
            //this.router.navigateByUrl('layout/admin/role');
            this.messageService.add({severity:'success', summary: 'Update Successfully!', detail:''});
            this.refreshParent.emit();
            // this.expanded = false;
          },
            (err) => {
           //   alert("error")
           this.messageService.add({severity:'error', summary: 'Error!', detail:''});
            });
        }
     
  }
  
  else{
    this.isInvalid = true;
    this.messageService.add({severity:'error', summary: 'Please Fill required Fields!', detail:''});
  }
  if (this.RoleTitle.length > 0) {
    this.messageService.add({severity:'error', summary: 'Role already exists!', detail:''});
       }
 

}
  Cancel() {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('layout/admin/role')
  }

}