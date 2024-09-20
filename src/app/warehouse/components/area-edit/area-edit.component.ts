
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CountryService } from 'app/shared/services/country.service';
import { StateService } from 'app/shared/services/state.service';
import {Router} from '@angular/router';
import { AreaService } from 'app/shared/services/area.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-area-edit',
  templateUrl: './area-edit.component.html',
  styleUrls: ['./area-edit.component.scss']
})
export class AreaEditComponent implements OnInit {
  @Input() areaId: number;
  isInvalid: boolean;
  cityid:any[];
  @Output() refreshParent = new EventEmitter(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 
  area : any
  areaList: any;
  cityList:any;
  constructor( private messageService : MessageService,private areaservice :AreaService , private router : Router, private pilotService: PepolePilotService) { this.area = {}; }

  ngOnInit() {
    if(this.areaId){
      this.area = this.areaId;
    console.log(this.areaId)
    // this.areaservice.GetByID(this.areaId).subscribe(result => {
    //   this.area = result;
    //   this.area.CreatedDate = this.area.CreatedDate ? new Date(this.area.CreatedDate) : null;
     
    //   console.log('GetByID: ', this.area);
    // });
  }
  this.pilotService.City().subscribe(result => {
    this.cityList = result;
  })
}

onclick(areaEditForm:any) {
  console.log('areaEditForm: ', areaEditForm);
  if (areaEditForm.form.status == "VALID") {
  if (this.areaId == null) {
    this.areaservice.addArea(this.area).subscribe(result => {
      // console.log(result);
      this.router.navigateByUrl('layout/warehouse/area');
      // this.expanded = false;
      this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
    },
      (err) => {
        //alert("error")
        this.messageService.add({severity:'error', summary: 'Error!', detail:''});
      });
  } else {
    this.areaservice.UpdateArea(this.area).subscribe(result => {
      console.log(this.areaId);
      this.refreshParent.emit();
     // this.router.navigateByUrl('layout/warehouse/area');
      this.messageService.add({severity:'success', summary: 'Update Successfully!', detail:''});
      // this.expanded = false;
    },
      (err) => {
        //alert("error")
        this.messageService.add({severity:'error', summary: 'Error!', detail:''});
      });
  }
}else{
  this.isInvalid = true;
  this.messageService.add({severity:'error', summary: 'Please Fill required Fields!', detail:''});
}


}


onCancel() {
  this.isdetailsclose.emit(false);
  this.router.navigateByUrl('layout/warehouse/area');
}
}


