import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';
import { RegionService } from 'app/shared/services/region.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss'],
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
export class RegionComponent implements OnInit {
  regionList:any[];
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
      {field:'RegionName', label:'Region Name'},
      {field:'RegionId', label:'Region Id'},     
      // {field:'AliasName', label:'Alias Name'},
      {field:'IsActive', label:'Active Status'},
      // {field:'CompanyId', label:'Company Id'},
      {field:'CreatedDate', label:'Created Date'},
      {field:'UpdatedDate', label:'Updated Date'},
      {field:'Deleted', label:'Deleted Status'},
      // {field:'RegionManagerName', label:'Region Manager Name'},
      {field:'RegionManagerId', label:'Region Manager'},
      {field:'ZoneId', label:'Zone'},
      // {field:'ZoneName', label:'Zone Name'},
  
    
   ];
   // pager: PagerDataV7;
    pageSize: number;
    // constructor(private country : CountryService ,private router : Router, private modalService: NgbModal) { this.isopen === false  }
    constructor( private messageService : MessageService,private region : RegionService ,private router : Router, private modalService: NgbModal,private confirmationService: ConfirmationService) { this.isopen === false  }
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
        { field: 'RegionName', header: 'Region Name'  },
       
        { field: 'CreatedDate', header: 'Created Date' }
           
      ];
  
      this.region.GetAllRegion().subscribe(result => {
        this.regionList = result;
        for(var i in this.regionList){
        this.regionList[i].CreatedDate = this.regionList[i].CreatedDate ? moment(this.regionList[i].CreatedDate).format('DD/MM/YYYY') : null
        this.regionList[i].UpdatedDate = this.regionList[i].UpdatedDate ? moment(this.regionList[i].UpdatedDate).format('DD/MM/YYYY') : null
        }
        console.log(this.regionList);
       });
      }
  
     addRegion() {
     this.router.navigateByUrl("layout/admin/region-edit")
   }
  
  
   
  onDelete(region: any) {
    console.log('region', region);
    this.modalService.dismissAll("done");    
   this.confirmationService.confirm({
    message: 'Are you sure that you want to perform this action?',
    accept: () => {
      this.region.DeleteRegion(region.RegionId).subscribe(result => {
        let ac = this.regionList.filter(x => x.RegionId == region)[0];
        let index = this.regionList.indexOf(ac);
        this.regionList.splice(index, 1);
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
  
  
  



