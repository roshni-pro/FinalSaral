import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CountryService } from 'app/shared/services/country.service';
import {Router} from '@angular/router';
import { DepartmentService } from 'app/shared/services/department.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.scss']
})
export class DepartmentEditComponent implements OnInit {
  @Input() DepId: number;
  department : any;
  peopleList : any;
  isInvalid: boolean;
  DepName : any;
  @Output() refreshParent = new EventEmitter(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 

  constructor( private messageService : MessageService,private departmentservice :DepartmentService, private router : Router) { this.department = {}; }

  ngOnInit() {
    if(this.DepId){
    console.log(this.DepId)
    this.departmentservice.DepartmentGetByID(this.DepId).subscribe(result => {
      this.department = result;
      this.department.CreatedDate = this.department.CreatedDate ? new Date(this.department.CreatedDate) : null;
     
      console.log('GetByID: ', this.department);
    });
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

  
  // onclick(){
  //   console.log(this.department)
  //   this.departmentservice.UpdateDepartment(this.department).subscribe(result => {
  //     alert("Department Updated");
  //    // this.expanded = false;
  //   },
  //   (err)=>{
  //     alert("error")
   
  //   });
  // }


  
  update(deptEditForm: any) {
    console.log('deptEditForm: ', deptEditForm);
    if (deptEditForm.form.status == "VALID") {
    console.log(this.department);
    if(this.DepId == null){
    this.departmentservice.addDepartment(this.department).subscribe(result => {      
      if(result !="Data Already Exist"){
        this.router.navigateByUrl('layout/admin/department');
        this.department=result;
        this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
      }else{
        this.messageService.add({severity:'error', summary: 'Department Already Exist!', detail:''});
      }
       // this.expanded = false;
      },

    // //   this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
    // //   this.router.navigateByUrl('layout/admin/department');
    // //   // this.refreshParent.emit();
    // //  // this.expanded = false;
    // // },
    (err)=>{
      //alert("error")
      this.messageService.add({severity:'error', summary: 'Internal Server Error', detail:''});
    });
  }else{
    this.departmentservice.UpdateDepartment(this.department).subscribe(result => {
      console.log(this.DepId);


      if(result !="Data Already Exist"){
        this.router.navigateByUrl('layout/admin/department');
        this.department=result;
        this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
      }else{
        this.messageService.add({severity:'error', summary: 'Department Already Exist!', detail:''});
      }
       // this.expanded = false;
      },

      // this.router.navigateByUrl('layout/admin/department');
    // //   this.messageService.add({severity:'success', summary: 'Update Successfully!', detail:''});
    // //   this.refreshParent.emit();
    // //  // this.expanded = false;
    // // },
    (err)=>{
     // alert("error")
     this.messageService.add({severity:'error', summary: 'Internal Server Error', detail:''});
    });
  }
  }else{
    this.isInvalid = true;
    this.messageService.add({severity:'error', summary: 'Please Fill required Fields!', detail:''});
  }
}

  onCancel(){
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('layout/admin/department')
  }

  
  // updateDepartmentData() {
  //   if (this.department) {
  //     this.department.CreatedDate = this.department.CreatedDate ? new Date(this.department.CreatedDate) : null;
     
  //   }
  // }

}
