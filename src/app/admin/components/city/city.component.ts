import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/shared/services/customer.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import * as moment from 'moment';
import { CityService } from 'app/shared/services/city.service';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
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
export class CityComponent implements OnInit {
  cityList:any[];
  closeResult: string;
  isopen : boolean
  cols: any[];
  cars: any[];
  loading: boolean;
  isLoading: boolean;
  totalRecords: number;
  selectedRow : any;
  isDetails : boolean;
  selectedRowDetails: any;
  activeFields: any[] = [
  
    { field: 'CityName', label: 'City Name' },
    { field: 'Cityid', label: 'City Id' },
    // {field:'aliasName', label:'Alias Name'},
    { field: 'active', label: 'Active Status' },
    { field: 'CompanyId', label: 'Company Id' },
    // {field:'Code', label:'Code'},
    { field: 'Stateid', label: 'State Id' },
    // { field: 'StateName', label: 'State Name' },
    { field: 'CreatedDate', label: 'Created Date' },
    { field: 'UpdatedDate', label: 'Updated Date' },
    { field: 'Deleted', label: 'Deleted' },
    // // { field: 'ZoneId', label: 'Zone Id' },
    // // // { field: 'ZoneName', label: 'Zone Name' },
    // // { field: 'CountryId', label: 'Country  Id' },
    // // // { field: 'CountryName', label: 'Country Name' },
    // // { field: 'CityManagerId', label: 'City Manager Id' },
    // { field: 'CityManagerName', label: 'City Manager Name' },
    { field: 'aliasName', label: 'Alias Name' },     
    { field: 'Code', label: 'Code' },  
  
];
 // pager: PagerDataV7;
  pageSize: number;

  constructor(private city : CityService , private confirmationService: ConfirmationService,private messageService : MessageService, private router : Router, private modalService: NgbModal) { this.isopen === false  }


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
      // { header: 'Edit' },
      { field: 'CityName', header: 'City Name'  },     
      // { field: 'CountryName', header: 'CountryName' },
      // { field: 'ZoneName', header: 'ZoneName' },    
      { field: 'StateName', header: 'StateName' },     
      // { field: 'CityManagerName', header: 'CityManagerName' }
      { field: 'active', header: 'Active Status' },
      { field: 'aliasName', header: 'Alias Name' },     
      { field: 'Code', header: 'Code' },     
    
    ];
    this.city.GetAllCitylist().subscribe(result => {
     this.cityList = result;
     console.log('clist',this.cityList);
    });
  }

  // onDelete(r){
  //   console.log(r);
  // }
  
  addCity() {
    this.router.navigateByUrl("layout/admin/city-edit");
  }

  
  onDelete(ID: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.city.DeleteCity(ID).subscribe(result => {
          let ac = this.cityList.filter(x => x.Cityid == ID)[0];
          let index = this.cityList.indexOf(ac);
          this.cityList.splice(index, 1);
        });
        this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
      }
     
    });
   
  }
  
  openDetails(d,e){
    this.selectedRowDetails  = d;
    if(this.selectedRow != undefined){
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
  
  isDetailsFalse(isDetails : boolean){
  this.isDetails = isDetails;
  if(this.selectedRow.path){
    this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
  }
  }


}



