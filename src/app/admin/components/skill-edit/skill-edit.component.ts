import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import {Router} from '@angular/router';
import { SkillService } from 'app/shared/services/skill.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.scss']
})
export class SkillEditComponent implements OnInit {

  @Input() SkillId: number;
  skill : any;
  Name: any;
  isInvalid: boolean;
  @Output() refreshParent = new EventEmitter(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 

  constructor( private messageService : MessageService,private skillservice :SkillService, private router : Router) { this.skill = {}; }

  ngOnInit() {
    if(this.SkillId){
    console.log(this.SkillId)
    // this.skillservice.SkillGetByID(this.SkillId).subscribe(result => {
    //   this.skill = result;
    //   this.skill.CreatedDate = this.skill.CreatedDate ? new Date(this.skill.CreatedDate) : null;
     
    //   console.log('GetByID: ', this.skill);
    // });

    if(this.SkillId){
      this.skill=this.SkillId;
    }
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
  



  update(SkillEditForm: any) {
    console.log('SkillEditForm: ', SkillEditForm);
    if (SkillEditForm.form.status == "VALID") {
    console.log(this.skill);
    if(this.SkillId == null){
      // // if(this.Name == this.Name)
      // // {
      // //   this.messageService.add({severity:'error', summary: ' Skill Already Exist!', detail:''});
      // // }
    this.skillservice.addSkill(this.skill).subscribe(result => {
      console.log(result);

      if(result !="Data Already Exist"){
        this.router.navigateByUrl('layout/admin/skill');
        this.skill = result;
        this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
      }else{
        this.messageService.add({severity:'error', summary: 'Data Already Exist!', detail:''});
      }
       // this.expanded = false;
      },
    // // //   this.skill = result;
    // // //   this.router.navigateByUrl('layout/admin/skill');
    // // //   this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
    // // //  // this.expanded = false;
    // // // },
    (err)=>{
      //alert("error")
      this.messageService.add({severity:'error', summary: 'Error!', detail:''});
    });
  }else{
    this.skillservice.UpdateSkill(this.skill).subscribe(result => {
      console.log(this.SkillId);


      if(result !="Data Already Exist"){
        this.router.navigateByUrl('layout/admin/skill');
        this.skill = result;
        this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
      }else{
        this.messageService.add({severity:'error', summary: 'Data Already Exist!', detail:''});
      }
       // this.expanded = false;
      },

    // // //   //this.router.navigateByUrl('layout/admin/skill');
    // // //   this.messageService.add({severity:'success', summary: 'Update Successfully!', detail:''});
    // // //   this.refreshParent.emit();
    // // //  // this.expanded = false;             
    // // // },
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
    this.router.navigateByUrl('layout/admin/skill');
  }

  
  // updateSkillData() {
  //   if (this.skill) {
  //     this.skill.CreatedDate = this.skill.CreatedDate ? new Date(this.skill.CreatedDate) : null;
     
  //   }
  // }

}
