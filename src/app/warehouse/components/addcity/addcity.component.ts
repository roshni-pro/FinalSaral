import { Component, OnInit, EventEmitter, Output, Input, ɵConsole } from '@angular/core';
import { RolepagepermissionService } from 'app/shared/services/rolepagepermission.service';
import { SelectItem, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClusterService } from 'app/shared/services/cluster.service';
import { CityService } from 'app/shared/services/city.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';


@Component({
  selector: 'app-addcity',
  templateUrl: './addcity.component.html',
  styleUrls: ['./addcity.component.scss']
})

export class AddcityComponent implements OnInit {

  @Input() ClusterId: number;
  cityList: any;
  requestData: any;
  isInvalid: boolean;
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  cityid: any;
  blocked:any;
  constructor(private messageService: MessageService, private clusterService: ClusterService, private pilotService: PepolePilotService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.cityid = '';
    this.pilotService.City().subscribe(result => {
      this.cityList = result;
    })
  }


  update(cityForm: any) {
    let senddata: any = {};
    senddata.ClusterId = this.ClusterId;
    senddata.Cityid = this.cityid;
    if (cityForm.form.status == "VALID") {
      this.blocked = true;
      this.clusterService.AddCity(senddata).subscribe(result => {
        
        this.blocked = false;
        this.router.navigateByUrl('/layout/warehouse/cluster');
        this.messageService.add({ severity: 'success', summary: 'Cluster City Updated Successfully!', detail: '' });
       // this.refreshParent.emit();
      },
        (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
        });
    }

  }





  onCancel() {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('layout/warehouse/cluster');
  }




}

