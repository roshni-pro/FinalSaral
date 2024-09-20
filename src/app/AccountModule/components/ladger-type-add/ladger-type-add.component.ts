import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CountryService } from 'app/shared/services/country.service';
import { Router } from '@angular/router';
import { LadgerTypeService } from 'app/shared/services/ladger-type.service';

@Component({
  selector: 'app-ladger-type-add',
  templateUrl: './ladger-type-add.component.html',
  styleUrls: ['./ladger-type-add.component.scss']
})
export class LadgerTypeAddComponent implements OnInit {
  @Input() ID: number;
  ladgertype: any;  
  isInvalid: boolean;
  @Output() refreshParent = new EventEmitter(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 

  constructor(private ladgertypeservice: LadgerTypeService, private router: Router) { this.ladgertype = {}; }

  ngOnInit() {
    this.isInvalid = false;
    if (this.ID) {
      console.log(this.ID)
      this.ladgertypeservice.LadgerTypeGetByID(this.ID).subscribe(result => {
        this.ladgertype = result;
        this.ladgertype.CreatedDate = this.ladgertype.CreatedDate ? new Date(this.ladgertype.CreatedDate) : null;

        console.log('GetByID: ', this.ladgertype);
      });
    }

  }

  update(ladgertypeeditForm: any) {
    console.log('ladgertypeeditForm: ', ladgertypeeditForm);
    if (ladgertypeeditForm.form.status == "VALID") {
      if (this.ID == null) {
        this.ladgertypeservice.addLadgerType(this.ladgertype).subscribe(result => {
          this.router.navigateByUrl('layout/Account/ladgertype')
          // this.expanded = false;
        },
          (err) => {
            alert("error")

          });
      } else {
        this.ladgertypeservice.UpdateLadgerType(this.ladgertype).subscribe(result => {
          console.log('this.LadgerTypeIsasasasasaad    : ',this.ID);
          this.router.navigateByUrl('layout/Account/ladgertype');
          this.refreshParent.emit(false);
          // this.expanded = false;
        },
          (err) => {
            alert("error")

          });
      }
    }else{
      this.isInvalid = true;
    }
   

  }



 

  onCancel() {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('layout/Account/ladgertype');
  
  }



}
