import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { transition, animate, state, style, trigger } from '@angular/animations';
import { SupplierCategoryService } from 'app/shared/services/suppliercategory.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AreaService } from 'app/shared/services/area.service';




@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
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
export class AreaComponent implements OnInit {
  areaList: any[];
  closeResult: string;
  isopen: boolean
  cols: any[];
  cars: any[];
  loading: boolean;
  isLoading: boolean;
  totalRecords: number;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  activeFields: any[] = [
    { field: 'AreaName', label: 'Area Name' },
    { field: 'areaId', label: 'Area Id' },
    { field: 'AreaCode', label: 'Area Code' },
    { field: 'CityName', label: 'City Name' },
    { field: 'CityId', label: 'CityId' },
    { field: 'CreatedDate', label: 'Created Date' },
    { field: 'UpdatedDate', label: 'Updated Date' },
  ];
  // pager: PagerDataV7;
  pageSize: number;
  constructor(private area: AreaService, private router: Router, private modalService: NgbModal, private messageService: MessageService,
    private confirmationService: ConfirmationService) { this.isopen === false }
  // constructor(private country : CountryService ,private router : Router ,
  //   private modalService: NgbModal,
  //   private confirmationService: ConfirmationService) { this.isLoading = true }



  //////////////////////////////////

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
      { field: 'AreaName', header: 'Area Name' },
      { field: 'CityName', header: 'City Name' },
      { field: 'Active', header: 'Active' },

    ];

    this.area.GetAllArea().subscribe(result => {
      this.areaList = result;
      console.log(this.areaList);
    });
  }

  addPeoples() {
    this.router.navigateByUrl("layout/warehouse/area-edit")
  }


  onDelete(t) {
    console.log('t', t);
    // // this.modalService.dismissAll("done");
    // // this.suppliercategory.DeleteArea(t.SupplierCaegoryId).subscribe(result => {
    // //   //alert("People Deleted");
    // //   this.modalService.dismissAll("done");
    // //   this.ngOnInit();
    // // });
    // alert(people.PeopleID);



    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.area.DeleteArea(t.areaId).subscribe(result => {
          let ldgr = this.areaList.filter(x => x.areaId == t)[0];
          let index = this.areaList.indexOf(ldgr);
          this.areaList.splice(index, 1);
          this.messageService.add({ severity: 'success', summary: 'Deleted Successfully!', detail: '' });
        });
        this.messageService.add({ severity: 'success', summary: 'Deleted Successfully!', detail: '' });
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


