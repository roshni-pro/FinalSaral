import { Component, OnInit } from '@angular/core';
import { OrderAssignmentsService } from 'app/order-assignments/Services/order-assignments.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tk-onsk-appdata',
  templateUrl: './tk-onsk-appdata.component.html',
  styleUrls: ['./tk-onsk-appdata.component.scss']
})
export class TkOnskAppdataComponent implements OnInit {
  data: any;
  PageSize: number;
  TkCustomerlist: any[];
  blocked:boolean;
  totalRecords:number;

  constructor(private TkfromSkAppService: OrderAssignmentsService, private messageService: MessageService) { this.data = {}; }

  ngOnInit() {
    this.data.StartDate = null;
    this.data.EndDate = null;
    this.PageSize = 15;
    this.blocked=false;
    var datToPost =
    {
      StartDate: null,
      EndDate: null,
      Skip: 0,
      Take: this.PageSize
    }
    this.OnInitialize(datToPost);
  }

  OnInitialize(data) {
    this.blocked=true;
    this.TkfromSkAppService.getTklistlist(data).subscribe(x => {
      this.blocked=false;
      this.TkCustomerlist = x.tkdata;
      this.totalRecords=x.TotalRecords;
    })
  }

  GetTkList(list) {
    var datToPost =
    {
      StartDate: list.StartDate,
      EndDate: list.EndDate,
      Skip: 0,
      Take: this.PageSize
    }
    this.OnInitialize(datToPost);
  }

  load(event) {
    var datToPost =
    {
      StartDate: this.data.StartDate,
      EndDate: this.data.EndDate,
      Skip: event.first,
      Take: event.rows
    }
    this.OnInitialize(datToPost);
  }

}
