import { Component, OnInit } from '@angular/core';
import{BatchMasterService} from 'app/batchmaster/batch-master.service'
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-batch-master-approver',
  templateUrl: './batch-master-approver.component.html',
  styleUrls: ['./batch-master-approver.component.scss']
})
export class BatchMasterApproverComponent implements OnInit {
  status:any;
  SelectedStatus:any={
    name:null,
    value:null
  };
  ItemNumber:string='';
  itemList:any;
  totalRecords:number=0;
  skip:number=0;
  take:number=10;
  popupData:any;
  openDialog:boolean=false;
  buttonEnable:boolean=false;
  blocked:boolean=false;
  constructor(
    private batchMasterService:BatchMasterService,
    private confirmationService :ConfirmationService ,
    private messageService:MessageService
  ) { }

  ngOnInit() {
  this.status=[
    {name:'Pending',value:'Pending'},
    {name:'Approved',value:'Approved'},
    {name:'Rejected',value:'Rejected'}
  ]
  this.SelectedStatus= {name:'Pending',value:'Pending'}
  }
  load(event){
    this.skip = event ? event.first : 0;
    this.take = event ? event.rows : 10;
    this.Search();
  }
  Search(){
    if(!this.SelectedStatus||!this.SelectedStatus.name){
      alert("select status!");
    }
    else{
      this.blocked=true;
      this.batchMasterService.GetBatchApproverDetails(this.SelectedStatus.name,this.ItemNumber,this.skip,this.take).subscribe((res:any)=>{
        this.itemList=res.BatchMasterTemp
        this.totalRecords=res.TotalRecords;
        this.blocked=false;
        if(this.itemList && this.itemList.length==0){
          alert("No Data Found!");
        }
      })
     
    }

  }

  confirm1(Status,i) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            // this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
            this.blocked=true;
            this.batchMasterService.ApprovedRejectedBatchDetails(i.BatchMasterDetailId,Status).subscribe(res=>{
              alert(res);
              this.blocked=false;
              this.clear();
             this.Search();
            })
        },
        reject: () => {
                    // this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
        }
    });
}

  // update(Status,i){
  //   this.batchMasterService.ApprovedRejectedBatchDetails(i.BatchMasterDetailId,Status).subscribe(res=>{
  //     alert(res);
  //     this.clear();
  //     // this.Search();
  //   })
  // }

  clear(){
    // this.SelectedStatus=[];
    this.ItemNumber='';
    this.itemList=[];
    this.totalRecords=0;
  }
}
