import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { MessageService, ConfirmationService } from 'primeng/api';
import { RegionService } from 'app/shared/services/region.service';
import { StateService } from 'app/shared/services/state.service';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-warehouse-creation',
  templateUrl: './warehouse-creation.component.html',
  styleUrls: ['./warehouse-creation.component.scss'],
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
  ]
})
export class WarehouseCreationComponent implements OnInit {

  warehouseList: any
  closeResult: string;
  isopen: boolean;
  searchModel: any;
  cols: any[];
  activeFields: any[] = [{ field: 'WarehouseName', label: 'Warehouse Name' }, { field: 'Address', label: 'Address' }, { field: 'GSTin', label: 'GSTin No.' },
  { field: 'Email', label: 'Email-ID' }, { field: 'Phone', label: 'Phone ' }, { field: 'StateName', label: 'State' }, { field: 'CityName', label: 'City' },
  { field: 'RegionId', label: 'Region Id ' }, { field: 'active', label: 'Active' },
  ];
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  citylist: any;
  stateList: any;
  warehouseListkpp: any;
  constructor(private modalService: NgbModal, private StateService: StateService, private warehouseService: WarehouseService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { this.searchModel = {}; }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit() {
    this.isDetails = false;
    this.cols = [
      // { header: 'Edit' },
      { field: 'WarehouseName', header: 'Name' },
      { field: 'CityName', header: 'City Name' },
      { field: 'StateName', header: 'State' },
      { field: 'TGrpName', header: 'Tax Group' },
      { field: 'CreatedDate', header: 'Created Date' },
    ];

    this.warehouseService.AllWarehouse().subscribe(result => {
      this.warehouseList = result;
      for (var i in this.warehouseList) {
        this.warehouseList[i].CreatedDate = this.warehouseList[i].CreatedDate ? moment(this.warehouseList[i].CreatedDate).format('DD/MM/YYYY') : null
      }
      console.log(this.warehouseList);
    });

    this.StateService.GetAllState().subscribe(result => {
      this.stateList = result;
    })
  }

  allDataWare(cityid) {

    this.warehouseService.GetAllCityIdKPP(cityid).subscribe(result => {

      this.warehouseList = result;
    })
  }
  onstateChange(Stateid) {

    this.StateService.StateGetByIDs(Stateid).subscribe(result => {

      this.citylist = result;
    })
  }


  addWarehouse() {
    this.router.navigateByUrl("/layout/warehouse/add");
    // this.peopleService.AddPeople().subscribe(result => {
    //   alert("People Deleted");
    // });
  }
  onDelete(t) {
    // this.warehouseService.DeleteWarehouse(t).subscribe(result=>{
    //   this.modalService.dismissAll("done");
    //   this.ngOnInit();
    // })


    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.warehouseService.DeleteWarehouse(t).subscribe(result => {
          let ldgr = this.warehouseList.filter(x => x.WarehouseId == t)[0];
          let index = this.warehouseList.indexOf(ldgr);
          this.warehouseList.splice(index, 1);
          this.messageService.add({ severity: 'success', summary: 'Deleted Successfully!', detail: '' });
        });
      }
    });



  }
  openDetails(d, e) {
    this.selectedRowDetails = d;
    if (this.selectedRow != undefined) {
      if(this.selectedRow.path){
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
    } else {
      this.selectedRow = e;
      if(this.selectedRow.path){
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
      }
    }
    console.log(this.selectedRow);
    this.isDetails = true;
  }

  isDetailsFalse(isDetails: boolean) {
    this.isDetails = isDetails;
    if (this.selectedRow.path) {
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
  }
}
