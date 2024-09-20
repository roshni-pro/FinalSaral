import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import * as moment from 'moment';
import { CountryService } from 'app/shared/services/country.service';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
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
export class CountryComponent implements OnInit {
countryList:any[];
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
    {field:'CountryName', label:'Country Name'},
    {field:'CountryId', label:'Country Id'},
    {field:'AliasName', label:'Alias Name'},
    {field:'IsActive', label:'Active Status'},
    // {field:'CompanyId', label:'Company Id'},
    {field:'CreatedDate', label:'Created Date'},
    {field:'UpdatedDate', label:'Updated Date'},
    // {field:'Deleted', label:'Deleted Status'},
    {field:'CountryManagerName', label:'Country Manager Name'},
    {field:'CountryManagerId', label:'Country Manager Id'},  
  { field: 'IsActive', label: 'Active' }
  
 ];
 // pager: PagerDataV7;
  pageSize: number;
  constructor(private country : CountryService ,private router : Router,private messageService : MessageService, private modalService: NgbModal,private confirmationService: ConfirmationService) { this.isopen === false  }
  // constructor(private country : CountryService ,private router : Router ,
  //   private modalService: NgbModal,
  //   private confirmationService: ConfirmationService) { this.isLoading = true }



  //////////////////////////////////
  
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
      { field: 'CountryName', header: 'Country Name'  },
      { field: 'AliasName', header: 'Alias Name' },
  
      // { field: 'CountryManagerName', header: 'Country Manager Name' },
     
      { field: 'CreatedDate', header: 'Created Date' },
      { field: 'IsActive', header: 'Active' }
         
    ];

    this.country.GetAllCountry().subscribe(result => {
      this.countryList = result;
      for(var i in this.countryList){
        this.countryList[i].CreatedDate = this.countryList[i].CreatedDate ? moment(this.countryList[i].CreatedDate).format('DD/MM/YYYY') : null
        this.countryList[i].UpdatedDate = this.countryList[i].UpdatedDate ? moment(this.countryList[i].UpdatedDate).format('DD/MM/YYYY') : null
        }
      console.log(this.countryList);
     });
    }

    addCountry() {
   this.router.navigateByUrl("layout/admin/country-edit");
 }


  onDelete(country: any) {
    console.log('country', country);
    this.modalService.dismissAll("done");
    // this.country.DeleteCountry(country.CountryId).subscribe(result => {
    //   //alert("People Deleted");
    //   this.modalService.dismissAll("done");
    //   this.ngOnInit();
    // });
   // alert(people.PeopleID);
   this.confirmationService.confirm({    
    message: 'Are you sure that you want to perform this action?',
    accept: () => {
      this.country.DeleteCountry(country).subscribe(result => {
        let ac = this.countryList.filter(x => x.CountryId == country)[0];
        let index = this.countryList.indexOf(ac);
        this.countryList.splice(index, 1);
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
    if(e.path){
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


