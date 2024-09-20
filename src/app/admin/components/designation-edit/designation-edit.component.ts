import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CountryService } from 'app/shared/services/country.service';
import {Router} from '@angular/router';
import { DesignationService } from 'app/shared/services/designation.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-designation-edit',
  templateUrl: './designation-edit.component.html',
  styleUrls: ['./designation-edit.component.scss']
})
export class DesignationEditComponent implements OnInit {

  @Input() Designationid: number;
  designation : any;
  peopleList : any;
  isInvalid: boolean;
  @Output() refreshParent = new EventEmitter(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 

  constructor( private messageService : MessageService,private designationservice :DesignationService, private router : Router) { this.designation = {}; }

  ngOnInit() {
    if(this.Designationid){
      this.designation = this.Designationid;
    console.log(this.Designationid)
    // this.designationservice.DesignationGetByID(this.Designationid).subscribe(result => {
    //   this.designation = result;
    //   this.designation.CreatedDate = this.designation.CreatedDate ? new Date(this.designation.CreatedDate) : null;
     
    //   console.log('GetByID: ', this.designation);
    // });
  }
  
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
  
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
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
  //   console.log(this.designation)
  //   this.designationservice.UpdateDesignation(this.designation).subscribe(result => {
  //     alert("Country Updated");
  //    // this.expanded = false;
  //   },
  //   (err)=>{
  //     alert("error")
   
  //   });
  // }




  update(desgEditForm: any) {
    console.log('desgEditForm: ', desgEditForm);
    if (desgEditForm.form.status == "VALID") {
    console.log(this.designation);
    if(this.Designationid == null){
    this.designationservice.addDesignation(this.designation).subscribe(result => {
      this.router.navigateByUrl('layout/admin/designation');
      this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
     // this.expanded = false;
    },
    (err)=>{
    //  alert("error")
      this.messageService.add({severity:'error', summary: 'Error!', detail:''});
    });
  }else{
    this.designationservice.UpdateDesignation(this.designation).subscribe(result => {
      console.log(this.Designationid);
      //this.router.navigateByUrl('layout/admin/designation');
      this.messageService.add({severity:'success', summary: 'Update Successfully!', detail:''});
      this.refreshParent.emit();
     // this.expanded = false;
    },
    (err)=>{
     // alert("error")
      this.messageService.add({severity:'error', summary: 'Error!', detail:''});
    });
  }
  }else{
    this.isInvalid = true;
    this.messageService.add({severity:'error', summary: 'Please Fill required Fields!', detail:''});
  }
}


  onCancel(){
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('layout/admin/designation')
  }

  
  

}

