import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DeliveryService } from 'app/shared/services/delivery.service';
import * as moment from 'moment';
import { AnyARecord } from 'dns';


@Component({
  selector: 'app-redispatchorderapproval',
  templateUrl: './redispatchorderapproval.component.html',
  styleUrls: ['./redispatchorderapproval.component.scss']
})
export class RedispatchorderapprovalComponent implements OnInit {

  constructor(private DeliverySerivce: DeliveryService, private messageService: MessageService) { }
  cols: any[];
  redispatchorderapproved: any[];
  supplierpaymentdata: any;
  showbuttan: boolean;
  check: boolean;
  peoplerole: any;
  warehouse: any;
  roleList: any;
  showbuttan2: boolean;
  ngOnInit() {

    this.redispatchorderapproved = [
      this.showbuttan2 = false
    ]
    this.peoplerole = localStorage.getItem('role');
    console.log('peoplerole',this.peoplerole);
    this.roleList = this.peoplerole.split(',');
    
    for (var i in this.roleList) {
      if (this.roleList[i] == 'WH Service lead'||this.roleList[i] == 'Hub service lead') {
        this.showbuttan = true;
      } else if (this.roleList[i] == 'Region service lead') {
        this.check = true;
      }
    }

    this.cols = [
      { field: 'Id', header: 'Id' },
      { field: 'OrderId', header: 'OrderId' },
      { field: 'CreatedDate', header: 'CreateDate' },
      { field: 'IsApproved', header: 'IsApproved' }

    ];

    this.DeliverySerivce.GetRedispatchdata().subscribe(result => {
      
      this.redispatchorderapproved = result;

      console.log("this.redispatchorderapproved", this.redispatchorderapproved)
      
      for (var i in this.redispatchorderapproved) {
        this.redispatchorderapproved[i].CreatedDate = this.redispatchorderapproved[i].CreatedDate ? moment(this.redispatchorderapproved[i].CreatedDate).format('DD/MM/YYYY') : null
        if (this.redispatchorderapproved[i].Redispatchcount <= 3 && this.showbuttan == true) {
          this.redispatchorderapproved[i].showbuttan2 = true;
        } else if (this.redispatchorderapproved[i].Redispatchcount > 3 && this.check == true) {
          this.redispatchorderapproved[i].showbuttan2 = true;
        }
      }
    });
  }

  approved(data) {
    
    this.DeliverySerivce.ApprovedRedispatchorder(data).subscribe(result => {

      if (result != null) {
        this.messageService.add({ severity: 'success', summary: 'Approved Successfully!', detail: '' });

        this.ngOnInit();
      }
    });
  }
}

