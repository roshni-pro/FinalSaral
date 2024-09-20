import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import * as moment from 'moment';
import { ZoneService } from 'app/shared/services/zone.service';


@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss'],
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
export class ZoneComponent implements OnInit {
 
  zoneList:any[];
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
    {field:'ZoneName', label:'Zone Name'},
    {field:'ZoneId', label:'Zone Id'},
    {field:'ZoneManager', label:'Zone Manager Name'},
   {field:'ZoneManagerId', label:'Zone Manager Id'},
   {field:'CountryName', label:'Country Name'},
  {field:'CountryId', label:'Country Id'},
  {field:'CreatedDate', label:'Created Date'},
  {field:'UpdatedDate', label:'Updated Date'},
  // {field:'StateName', label:'State Name'},
  // {field:'CityManagerName', label:'City Manager Name'},
  {field:'IsDeleted', label:'Deleted Status'},
  {field:'IsActive', label:'Active status'},
  {field:'ModifiedDate', label:'Modified Date'},
];
 // pager: PagerDataV7;
  pageSize: number;

  constructor( private messageService : MessageService,private zone : ZoneService , private router : Router, private modalService: NgbModal,private confirmationService: ConfirmationService) { this.isopen === false  }



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
           { field: 'ZoneName', header: ' ZoneName'  },         
          { field: 'CountryName', header: 'CountryName' },
          // { field: 'ZoneManager', header: ' ZoneManager'  },
          { field: 'CreatedDate', header: 'CreatedDate' },
      // { field: 'DataOfJoin', header: 'Status' },
      // {  header: 'Action' }
    ];
    this.zone.GetAllZone().subscribe(result => {
     this.zoneList = result;
     for(var i in this.zoneList){
      this.zoneList[i].CreatedDate = this.zoneList[i].CreatedDate ? moment(this.zoneList[i].CreatedDate).format('DD/MM/YYYY') : null
      this.zoneList[i].UpdatedDate = this.zoneList[i].UpdatedDate ? moment(this.zoneList[i].UpdatedDate).format('DD/MM/YYYY') : null
      this.zoneList[i].ModifiedDate = this.zoneList[i].ModifiedDate ? moment(this.zoneList[i].ModifiedDate).format('DD/MM/YYYY') : null
      }
     console.log(this.zoneList);
    });
    
 
  }

  // onDelete(r){
  //   console.log(r);
  // }
  addZone() {
    this.router.navigateByUrl("layout/admin/zone-list")
  }



  onDelete(zonee: any) {
    console.log('zone', zonee);
    this.modalService.dismissAll("done");
    // this.zone.DeleteZone(zonee.ZoneId).subscribe(result => {
    //   //alert("People Deleted");
    //   this.modalService.dismissAll("done");
    //   this.ngOnInit();
    // });
   // alert(people.PeopleID);
 
   this.confirmationService.confirm({
    message: 'Are you sure that you want to perform this action?',
    accept: () => {
      this.zone.DeleteZone(zonee.ZoneId).subscribe(result => {
        let ac = this.zoneList.filter(x => x.ZoneId == zonee)[0];
        let index = this.zoneList.indexOf(ac);
        this.zoneList.splice(index, 1);
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




