import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { AgentcollectionService } from 'app/shared/services/agentcollection.service';
import { TatService } from 'app/shared/services/tat.service';
import { Agentcollection } from 'app/shared/interface/agentcollection';
@Component({
  selector: 'app-agentcollection',
  templateUrl: './agentcollection.component.html',
  styleUrls: ['./agentcollection.component.scss']
})
export class AgentcollectionComponent implements OnInit {

  @Input() WarehouseId: any;
  DeliveryboyId : any;
  @Input()AssignmentId:any;
  Id: any;
 
  isopen: boolean;
  isInvalid: boolean;
  isDetails: boolean;
  warehouses: any[];
  dboyList: any;
  agentlist: any[];
  agentcollectionlList: Agentcollection[] = [];
  agentcollection: Agentcollection;
  ids:any;
  disable:boolean;
  Ids:any[];
  isSelectedIds:any[] = [];
  Deliveryissueid:any;
  dAssigns:number[];
  selectcount = 0;
  Deliveryissueids: number[] = [];
  isSelect : boolean;
  searchdata:any;
  showDialog = false;
  AgentDue:any;
  
  constructor(private agentcollectionService: AgentcollectionService, private router: Router, private modalService: NgbModal, private wh: WarehouseService,
     private messageService: MessageService, private tatservice: TatService,private confirmationService: ConfirmationService ) 
     { this.isopen === false;  this.dAssigns=[];   this.Deliveryissueids = [];}

  ngOnInit() {
    this.WarehouseId ="";
     

   this.searchdata={

   
    DeliveryboyId:0,
    AssignmentId: 0

   }




    this.wh.getWarehouseCommon().subscribe(result => {
      this.warehouses = result;
    })

  }

  onsearch(searchdata) {
    // this.intializevalue();
    this.tatservice.DboybasedonWarehouseId(this.WarehouseId.value).subscribe(result => {
      
      this.dboyList = result;

    })
  }

  search(searchdata) {
    
    this.agentcollectionService.getcollection(searchdata.DeliveryboyId,searchdata.AssignmentId).subscribe(result => {
      this.agentlist = result;
      console.log("this.agentlist", this.agentlist)
      if(this.agentlist==undefined){
        this.messageService.add({ severity: 'error', summary: 'Not Found!', detail: '' });
      }
      if(this.agentlist.length == 0){
        this.messageService.add({ severity: 'error', summary: 'Not Found!', detail: '' });
      }
      else{
        this.messageService.add({ severity: 'success', summary: 'data search successfully!', detail: '' });
      }
    })

    
   
  }
  onClickCustomer(row) {
    
    if (!row.IsChecked) {
      let newRow = this.agentlist.filter(x => { return x.Id == row.Id })[0];
      let index = this.agentlist.indexOf(newRow);
      this.agentlist.splice(index, 1);
    } else {
      this.agentlist.push(row);
    }
  }

  onCancel() {
    
    this.ngOnInit();
    this.Deliveryissueids=[];
    this.isSelectedIds=[];
    this.agentlist.forEach(element => {
      
      console.log("thi",element);
      element.IsSelected=false;
    });
   
  }
  // Save(Deliveryissueids) {
  //   
  //   this.isSelectedIds = [];
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to Genrate  pdf ?',
  //     accept: () => {
  //       
  //       console.log("this.Deliveryissueids",Deliveryissueids)
  //       this.agentcollectionService.saveAssignmentDeposits(Deliveryissueids).subscribe(result => {
       
  //         this.messageService.add({ severity: 'success', summary: 'Saved Successfully!', detail: '' });
  //         
          
          
  //         window.location.reload();
  //       })
    
  //             },
  //        });
   
   
  // }

  Save(Deliveryissueids) {
    
    this.isSelectedIds = [];
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Genrate  pdf ?',
      accept: () => {
        
        this.showDialog = true;
        this.Deliveryissueids = Deliveryissueids;

      },
    });


  }
 

 

  check(ir) {
   
   ir.IsSelected = !ir.IsSelected;
   console.log('ir is: ', ir);
   console.log('this.isSelectedIds.length: ', this.isSelectedIds.length);

   if (ir.IsSelected) {

     this.isSelectedIds.push(ir.IsSelected);
     if(this.Deliveryissueids.length <= 4)
   {
    if(this.Deliveryissueids.length == 4)
    {
      this.messageService.add({ severity: 'error', summary: 'You can Select Maximum 4 Assignment!', detail: '' });  
      ir.IsSelected = false;
      return false;
    }
    this.Deliveryissueids.push(ir.Deliveryissueid);
    var b = this.Deliveryissueids;
    }
   if(this.Deliveryissueids.length > 4)
   {
       this.messageService.add({ severity: 'error', summary: 'You can Select Maximum 4 Assignment!', detail: '' });  
    ir.IsSelected = false;
    this.isSelectedIds.push(ir.IsSelected);
      

   }
     console.log('dssdds', this.Deliveryissueids);
     console.log('isSelectedIds', this.isSelectedIds);
     console.log('dddd', b);
   }



   else {
     let index = this.Deliveryissueids.indexOf(ir.Deliveryissueid);
     this.Deliveryissueids.splice(index, 1);
     console.log('splice', this.Deliveryissueids);
   }
  
  }

  saveTotalDueAmt() {
    
    console.log("this.Deliveryissueids", this.Deliveryissueids)

    if(this.AgentDue!=null){
    this.agentcollectionService.saveAssignmentDeposits(this.Deliveryissueids,this.AgentDue).subscribe(result => {

      this.messageService.add({ severity: 'success', summary: 'Saved Successfully!', detail: '' });
      

      window.location.reload();
        
    })
   
  }
  else{
    this.messageService.add({ severity: 'error', summary: 'Please add due amount', detail: '' });
    
  }
  }


}
