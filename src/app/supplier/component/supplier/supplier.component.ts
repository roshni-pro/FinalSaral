import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { SupplierService } from 'app/shared/services/supplier.service';
// import { ScrollableView } from 'primeng/table';
// import ResizeObserver from 'resize-observer-polyfill';
import {DialogModule} from 'primeng/dialog';
import * as moment from 'moment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { CityService } from 'app/shared/services/city.service';
import { SubCategoryService } from 'app/shared/services/sub-category.service';
import { INPUTSWITCH_VALUE_ACCESSOR } from 'primeng/inputswitch';

declare var $: any;

// ScrollableView.prototype.ngAfterViewChecked = function () {
//   if (!this.initialized && this.el.nativeElement.offsetParent) {
//     //this.alignScrollBar();
//     this.initialized = true;

//     new ResizeObserver(entries => {
//       //for (let entry of entries)
//         this.alignScrollBar();
//     }).observe(this.scrollBodyViewChild.nativeElement);
//   }
// };

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
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


export class SupplierComponent implements OnInit {
  supplierList: any[];
  selectedSupplier: any;
  cols: any[];
  cities:any;
  Brands:any;
  closeResult: string;
  isDetails : boolean;
  searchdata : any;
  constructor(private supplierService: SupplierService,private cityService: CityService,private SubCategoryService:SubCategoryService, private modalService: NgbModal, private router: Router) { this.isDetails = false ;this.searchdata = {};}
  display: boolean = false;
   selectedSupplierDetails : any;
  activeFields : any[] = [{field:'Name', label:'Supplier Name'},{field: 'SUPPLIERCODES', label:'Supplier Code'},{field:'TINNo', label:'TIN NO.'},{field:'OfficePhone', label:'Office Phone No.'},{field:'EmailId', label:'Email ID'},{field:'MobileNo', label:'Mobile No.'},{field:'UpdatedDate', label:'Last Updated Date'},{field:'CreatedDate', label:'Created Date'},{field:'Brand', label:'Brand'},{field:'Active', label:'Active Status'},{field:'BillingAddress', label:'Billing Address'},{field:'ShippingAddress', label:'Shipping Address'},{field:'Bank_AC_No', label:'Account No.'},{field:'Bank_Ifsc', label:'Bank IFSC Code'},{field:'Bank_Name', label:'Name Of Bank'}];
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.isDetails = false; 
    this.cols = [
      {field: 'Name', header: 'Supplier Name', width: '20%', bool: false  },
      { field: 'SUPPLIERCODES', header: 'Supplier Code', width: '10%', bool: false },
      { field: 'MobileNo', header: 'Mobile Phone', width: '15%', bool: false  },
      { field: 'Brand', header: 'Brand', width: '15%', bool: false  },
      { field: 'EmailId', header: 'Email', width: '25%', bool: false  },
      { field: 'CreatedDate', header: 'Created Date', width: '20%', bool: false  },
      { field: 'Actions', header: 'Actions', width: '10%', bool: true },
    ];
    
    this.supplierService.GetAll().subscribe(result=>{
      console.log(result);
      this.supplierList=result;
      for(var i in this.supplierList){
        this.supplierList[i].CreatedDate = this.supplierList[i].CreatedDate ? moment(this.supplierList[i].CreatedDate).format('DD/MM/YYYY') : null
        this.supplierList[i].DataOfJoin = this.supplierList[i].DataOfJoin ? moment(this.supplierList[i].DataOfJoin).format('DD/MM/YYYY') : null
        this.supplierList[i].DOB = this.supplierList[i].DOB ? moment(this.supplierList[i].DOB).format('DD/MM/YYYY') : null
      }  
    });
    this.cityService.GetAllCity().subscribe(results => {
      this.cities = results;
    });
    this.SubCategoryService.GetAllSubCategory().subscribe(results => {
      this.Brands = results;
    });
    // let width = $('div.position-fixed.supplier-details').parent().width();
  }

  ToggleActivation(supplier){
    if(supplier.Active){
      supplier.Active = false;
    }else{
      supplier.Active = true;
    }
    this.supplierService.PutSupplier(supplier).subscribe(result=> {
      this.isDetails = false;
      if(this.selectedSupplier.path){
        this.selectedSupplier.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
      this.modalService.dismissAll("done");
    });
   
  }

  onDelete(SupplierId: any) {
    console.log(SupplierId);
    this.supplierService.DeleteSupplier(SupplierId).subscribe(result=>{
      this.modalService.dismissAll("done");
      this.ngOnInit();
    });
    this.isDetails = false;
    if(this.selectedSupplier.path){
      this.selectedSupplier.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
  
  }

  onsearch(searchdata){
    this.supplierService.getSupplierSearchdata(searchdata).subscribe(result=> {
      this.supplierList=result;
      console.log(result);
    })
  }
  goToAddSupplier(){
    this.router.navigateByUrl('layout/supplier/supplier/form');
  }

  editSupplier(e){
    if(e.path){
      e.path[1].nextSibling.nextSibling.style.display = "table-row";
    }
  }

  nameOfActionButton(e){
    if(e.path){
      var name = e.path[0].attributes[2].value;
      e.path[1].previousSibling.innerHTML = name;
      e.path[1].previousSibling.className = e.path[0].classList[1];
    }
  }

  removeName(e){
    if(e.path){
      e.path[1].previousSibling.innerHTML = "";
    }
  }

  openDetails(d,e){
      this.selectedSupplierDetails  = d;
      if(this.selectedSupplier != undefined){
        this.selectedSupplier.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      } 
      this.selectedSupplier = e;
      if(this.selectedSupplier.path){
        this.selectedSupplier.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
      }
      console.log(this.selectedSupplier)
      this.isDetails = true;
  }

  isDetailsFalse(isDetails : boolean){
    this.isDetails = isDetails;
    if(this.selectedSupplier.path){
      this.selectedSupplier.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
  }

}


