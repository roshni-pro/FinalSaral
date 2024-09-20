import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Router} from '@angular/router';
import { ZoneService } from 'app/shared/services/zone.service';
import { CountryService } from 'app/shared/services/country.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss']
})
export class ZoneListComponent implements OnInit {
  @Input() ZoneId: number;
  zone : any;
  peopleList : any;
  countryList : any;
  isInvalid: boolean;
  result : any;
  @Output() refreshParent = new EventEmitter(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 

  constructor( private messageService : MessageService,private zoneservice :ZoneService, private router : Router,private countryservice :CountryService) { this.zone = {}; }
  

  ngOnInit() {
    if(this.ZoneId){
    console.log(this.ZoneId)
    this.zoneservice.ZoneGetByID(this.ZoneId).subscribe(result => {
      this.zone = result;
      this.zone.CreatedDate = this.zone.CreatedDate ? new Date(this.zone.CreatedDate) : null;
     
      console.log('GetByID: ', this.zone);
    });
  }

  this.zoneservice.ManagerName().subscribe(result => {
      this.peopleList = result;
      
    })

    // this.zoneservice.CountryName().subscribe(result=>{
    //   this.countryList=result;
    // })
    
    this.countryservice.GetAllCountry().subscribe(result=>{
      this.countryList=result;
    })

    if(this.ZoneId)
    {
      this.zone=this.ZoneId;
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
  //   console.log(this.zone)
  //   this.zoneservice.UpdateZone(this.zone).subscribe(result => {
  //     alert("Country Updated");
  //    // this.expanded = false;
  //   },
  //   (err)=>{
  //     alert("error")
   
  //   });
  // }


  // onclick(){
    update(zoneEditForm: any) {
      console.log('zoneEditForm: ', zoneEditForm);
      if (zoneEditForm.form.status == "VALID") {
    console.log(this.zone);
    console.log(this.result);
    if(this.ZoneId == null){
      if(this.zone == this.ZoneId){
        this.messageService.add({severity:'error', summary: 'Data Already Exist!', detail:''});
      }
    this.zoneservice.addZone(this.zone).subscribe(result => {
      console.log(result);
      if(result !="Data Already Exist"){
      this.router.navigateByUrl('layout/admin/zone');
      this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
    }else{
      this.messageService.add({severity:'error', summary: 'Data Already Exist!', detail:''});
    }
     // this.expanded = false;
    },
    (err)=>{
      //alert("error")
      this.messageService.add({severity:'error', summary: 'Error!', detail:''});
    });
  }else{
    this.zoneservice.UpdateZone(this.zone).subscribe(result => {
      console.log(this.ZoneId);
      if(result !="Data Already Exist"){
        this.router.navigateByUrl('layout/admin/zone');
        this.refreshParent.emit();
        this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
      }else{
        this.messageService.add({severity:'error', summary: 'Data Already Exist!', detail:''});
      }
       // this.expanded = false;
      },
      //this.router.navigateByUrl('layout/admin/zone');
    // // // //   this.messageService.add({severity:'success', summary: 'Update Successfully!', detail:''});
    // // // //   this.refreshParent.emit();
    // // // //  // this.expanded = false;
    // // // // },
    (err)=>{
      //alert("error")
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
    this.router.navigateByUrl('layout/admin/zone');
  }

  
  // updateSkillData() {
  //   if (this.zone) {
  //     this.zone.CreatedDate = this.zone.CreatedDate ? new Date(this.zone.CreatedDate) : null;
     
  //   }
  // }

}
