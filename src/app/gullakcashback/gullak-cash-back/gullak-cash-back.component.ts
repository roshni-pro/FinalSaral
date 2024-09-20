import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { GullakService } from 'app/shared/services/gullak.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
@Component({
  selector: 'app-gullak-cash-back',
  templateUrl: './gullak-cash-back.component.html',
  styleUrls: ['./gullak-cash-back.component.scss'],
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
export class GullakCashBackComponent implements OnInit {
  @Input() Id: any;
  group: any;
  isopen: boolean;
  IsActive: boolean;
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
  gullakList: any;
  gullakdate: any;
  FromDate: any;
  ToDate: any;

  constructor(private gullakService: GullakService, private router: Router, private modalService: NgbModal, private wh: WarehouseService, private messageService: MessageService) { this.isopen === false; this.group = {}; this.inputModel = {}; this.searchModel = {}; }

  ngOnInit() {
    this.isInvalid = false;
    this.IsActive = false;
    this.wh.getSpecificWarehouses().subscribe(result => {
      this.warehouses = result;
    })
  }
  
  addgullak() {
    this.router.navigateByUrl("layout/gullakcashback/addgullak");
  }
  
  
  
  search(group, groupForm) {
    if (groupForm.form.status == "VALID") {
      // group.StartDate = group.StartDate ? moment(group.StartDate).format('MM/DD/YYYY HH:mm:ss') : null
      // group.EndDate = group.EndDate ? moment(group.EndDate).format('MM/DD/YYYY HH:mm:ss') : null

      var StartDate = this.group.StartDate ? moment(this.group.StartDate).format('YYYY-MM-DD') : null
      var EndDate = this.group.EndDate ? moment(this.group.EndDate).format('YYYY-MM-DD') : null
      var WarehouseId = group.WarehouseId;


      this.gullakService.Search(WarehouseId, StartDate, EndDate).subscribe(result => {

        this.gullakList = result;
        console.log("this.gullakList", this.gullakList)
        for (var i in this.gullakList) {
          for (var j in this.warehouses) {


            if (this.gullakList[i].WarehouseId == this.warehouses[j].WarehouseId) {

              this.gullakList[i].WarehouseName = this.warehouses[j].WarehouseName;

              console.log("this.gullakList[i].WarehouseName ", this.gullakList[i].WarehouseName);
            }
          }
        }
      })
    }

    else {
      this.isInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
    }
  }






  openDetails(d, e) {

    // console.log(d.StartDate);
    // console.log(d.EndDate);
    var thedate1 = new Date(Date.parse(d.StartDate));
    var thedate2 = new Date(Date.parse(d.EndDate));

    d.StartDate = thedate1;
    d.EndDate = thedate2;
    // console.log(thedate1);
    // console.log(thedate2);



    this.selectedRowDetails = d;
    console.log(this.selectedRowDetails);
    
    if (this.selectedRow != undefined) {
      if(this.selectedRow.path){
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
    }
    this.selectedRow = e;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    }
    console.log(this.selectedRow);
    this.isDetails = true;
  }







  isDetailsFalse(isDetails: boolean) {
    this.isDetails = isDetails;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
  }

  GetActivegulak(Id, IsActive) {
    console.log(Id, IsActive);
    this.gullakService.getgullakActive(Id, IsActive).subscribe(result => {
      // this.gullakList = result;
      console.log('sfdsf', result)
    })
  }

}
