import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { MembershipService } from 'app/shared/services/membership.service';

@Component({
  selector: 'app-membership-page',
  templateUrl: './membership-page.component.html',
  styleUrls: ['./membership-page.component.scss']
})
export class MembershipPageComponent implements OnInit {
  MemberShipList: any[] ;
  blocked : boolean;

  constructor(private confirmationService: ConfirmationService,private memberShipService: MembershipService,
    private messageService : MessageService, private router : Router) { }

  ngOnInit() {
    this.blocked = true;
    this.memberShipService.GetmemberShiplist().subscribe(result => {
      this.blocked = false;
      this.MemberShipList = result;
    })
  }

  addMembership(){
    this.router.navigateByUrl("layout/admin/membership-edit/0");
  }

  Edit(rowData){
    this.router.navigateByUrl("layout/admin/membership-edit/"+rowData.Id);
  }

}
