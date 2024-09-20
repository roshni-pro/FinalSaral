import { Component, OnInit } from '@angular/core';
import { RequestApproveService } from 'app/shared/services/request-approve.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
//import { PermissionModalComponent } from './permission-lookup/PermissionLookupComponent';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';

@Component({
  selector: 'app-permission-lookup',
  templateUrl: './permission-lookup.component.html',
  styleUrls: ['./permission-lookup.component.scss']
   

})
export class PermissionLookupComponent implements OnInit {
  lstData:any[];
  lstpage:any[];
  dialogService: any;
  isOpenPopup: boolean;
  constructor(public requestapproveservice: RequestApproveService , private router: Router) { }

  ngOnInit() {
    this.isOpenPopup = false;
    this.requestapproveservice.GetOwnRequests().subscribe(result => {
    
      this.lstData = result;
      console.log('requestapproveservice:',  this.lstData);
    });
  }
  goToPage()
  {
    this.router.navigateByUrl('/layout/permission/RequestAdd');
  }
   
  show(id){
   
    console.log(id);
    this.requestapproveservice.showpages(id).subscribe(result=>{
    this.lstpage=result;

    this.isOpenPopup = true;
   

    });
  }
}
