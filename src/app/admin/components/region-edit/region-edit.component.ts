import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RegionService } from 'app/shared/services/region.service';
import { ZoneService } from 'app/shared/services/zone.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-region-edit',
  templateUrl: './region-edit.component.html',
  styleUrls: ['./region-edit.component.scss']
})
export class RegionEditComponent implements OnInit {
  @Input() RegionId: number;
  region: any;
  peopleList: any;
  isInvalid: boolean;
  zoneList: any;
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();

  constructor(private messageService: MessageService, private regionservice: RegionService, private router: Router, private zoneservice: ZoneService) { this.region = {}; }

  ngOnInit() {
    this.isInvalid = false;
    if (this.RegionId) {
      console.log(this.RegionId)
    }
    this.regionservice.ManagerName().subscribe(result => {
      this.peopleList = result;

    })

    this.zoneservice.GetAllZone().subscribe(result => {
      this.zoneList = result;

    })


    if (this.RegionId) {
      this.region = this.RegionId;
    }

  }

  public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z0-9]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z0-9-]/g, "");
      // invalid character, prevent input
    }
  }

  update(regionEditForm: any) {
    console.log('regionEditForm: ', regionEditForm);
  
    if (regionEditForm.form.status == "VALID") {
      if (this.RegionId == null) {
        this.regionservice.addRegion(this.region).subscribe(result => {
          console.log(result);
          if (result != "Already Exists") {
            this.router.navigateByUrl('layout/admin/region');
            this.messageService.add({ severity: 'success', summary: 'Add Successfully!', detail: '' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Data Already Exist!', detail: '' });
          }
          // this.expanded = false;
        },

          // // //   this.router.navigateByUrl('layout/admin/region');
          // // //   this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
          // // //   // this.expanded = false;
          // // // },
          (err) => {
            //alert("error")
            this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
          });
      } else {
        this.regionservice.UpdateRegion(this.region).subscribe(result => {
          console.log('this.RegionIsasasasasaad    : ', this.RegionId);
          // this.router.navigateByUrl('layout/admin/region');
          this.messageService.add({ severity: 'success', summary: 'Update Successfully!', detail: '' });
          this.refreshParent.emit(false);
          // this.expanded = false;
        },
          (err) => {
            //alert("error")
            this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
          });
      }
    } else {
      this.isInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
    }


  }

  onCancel() {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('layout/admin/region');

  }


}
