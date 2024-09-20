import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Warehousevedio } from 'app/shared/interface/warehousevedio';


import { WarehouseService } from 'app/shared/services/warehouse.service';
import { WarehousevedioService } from 'app/shared/services/warehousevedio.service';

@Component({
  selector: 'app-warehouse-vedio',
  templateUrl: './warehouse-vedio.component.html',
  styleUrls: ['./warehouse-vedio.component.scss'],

  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ],
})
export class WarehouseVedioComponent implements OnInit {
  @Input() Id: any;

  group: any;
  isopen: boolean;
  //IsActive: boolean;
  searchModel: any;
  inputModel: any;
  warehouses: any[];
  isInvalid: boolean;
  isDetails: boolean;
  selectedRowDetails: any;
  loading: boolean;
  isLoading: boolean;
  totalRecords: number;
  selectedRow: any;
  Vlist: any;
  gullakdate: any;
  FromDate: any;
  ToDate: any;
  Getlist: any;
  VVLIst: any;
  TodayD: any;
  groupForm: any;
  getdate; any;
  warehousevedio: Warehousevedio;
  constructor(private warehousevedioservice: WarehousevedioService, private router: Router, private modalService: NgbModal, private wh: WarehouseService, private messageService: MessageService) { this.isopen === false; this.group = {}; this.inputModel = {}; this.searchModel = {}; }

  ngOnInit() {
    this.Vlist = [];
    this.isInvalid = false;
    this.wh.getSpecificWarehouses().subscribe(result => {
      this.warehouses = result;
    })
  }

  addvideo() {
    this.router.navigateByUrl("layout/warehousevedio/addwarehouse-vedio");
  }
  search(group, groupForm) {
    this.Vlist=[];
    if (groupForm.form.status == "VALID") {
      var WarehouseId = group.WarehouseId;
      var StartDate = group.StartDate ? moment(this.group.StartDate).format('MM/DD/YYYY') : null;
      var EndDate = group.EndDate ? moment(this.group.EndDate).format('MM/DD/YYYY') : null;
      this.warehousevedioservice.Search(WarehouseId, StartDate, EndDate).subscribe(result => {
        this.Vlist = result;
      })
    }
    else {
      this.isInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
    }
  }

  onClick(link) {
    var URL = link;
    window.open(URL, '_blank');
  }
  Active(Activeagent) {
    this.warehousevedioservice.Activideo(Activeagent.Id,Activeagent.IsActive).subscribe(result => {
      this.messageService.add({ severity: 'success', summary: 'Data Update successfully!!', detail: '' });      
    })
  }
}
