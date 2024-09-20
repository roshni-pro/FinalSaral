import { Component, OnInit ,Input} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Router} from '@angular/router';
import * as moment from 'moment';
import { CombodashService } from 'app/shared/services/combodash.service';
import { title } from 'process';
import { DatePipe } from '@angular/common';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-combodashboard',
  templateUrl: './combodashboard.component.html',
  styleUrls: ['./combodashboard.component.scss'],
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
  providers: [DatePipe]
})
export class CombodashboardComponent implements OnInit {
  @Input ()Id:any;
  groupList:any[];
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
    list:any[];
    IsActive:true
    selecteditem:any;
  
    @Input() ComboName : any;

    exportFilenameDatetime: any;
    myDate = new Date();
    warehouses : any;
    group  : any;
    SearchList : any;
  //   activeFields: any[] = [
  //     {field: 'Warehouse', header: 'Warehouse name'  },
  //       { field: 'comboname', header: 'Combo Name' },
  //       { field: 'ItemList', header: 'Item List' },
  //       { field: 'Qty', header: 'Quantity'  },
  //       { field: 'price', header: 'price'  },
    
  //  ];
   pageSize: number;
   constructor(private combodashService: CombodashService ,private router : Router, private modalService: NgbModal, private datePipe: DatePipe,private messageService:MessageService, private exportService : ExportServiceService ) { this.isopen === false; this.group = {};  }
    
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
    this.combodashService.WarehouseGetByID().subscribe(result => {
      
      this.warehouses = result;
    })
    this.combodashService.GetItemList().subscribe(result =>{
      
      this.list=result;
      this.exportFilenameDatetime = "Cluster :" + this.datePipe.transform(this.myDate, 'dd/MM/yyyy h:mm:ss a');
      console.log("this.list",this.list)
      //console.log('name:',this.list.ComboName)
    })
  }
  addcombo() {
    this.router.navigateByUrl("layout/combodashboard/addcombo");
  }

  Editcombo(ComboName,Id,rowData) {
    rowData.IsPublish==true;
     this.router.navigateByUrl("layout/combodashboard/editcombo/"+ ComboName +"/"+ Id );
    //this.router.navigateByUrl("layout/combodashboard/editcombo/"+ ComboName );
  }
  openDetails(d,e){
    
    this.selectedRowDetails  = d;
    if(this.selectedRow != undefined){
      if(this.selectedRow.path){
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
      this.selecteditem= d.ComboItemList;
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

  
  GetActive(Id,IsActive){  
    
    this.combodashService.getcomboActive(Id,IsActive).subscribe(result => {   
      console.log('sfdsf',result) 
    })
  }

  GetPublish(Id,IsPublish){  
    
    this.combodashService.getcomboPublish(Id,IsPublish).subscribe(result => {   
      
      this.messageService.add({severity:'success', summary: 'Publish successfully', detail:''}); 
      console.log('fgugu',result) 
    })
  }

  exportCSV(){
    
    console.log("exportCSV:",this.list);
    this.exportService.exportAsExcelFile(this.list, 'ExportComboData');
  }

  Search(WarehouseId){
    this.combodashService.GetListforSearch(WarehouseId).subscribe(result => {
      
      this.list = result;
      console.log("Searchlist:",this.list);
    })
  }

  SearchByName(ComboName)
  {
    
    this.combodashService.GetListforSearchComboName(ComboName).subscribe(result => {
      
      this.list = result;    
      console.log("ResultSearchlist:",this.list);
    })
  }
  

}
