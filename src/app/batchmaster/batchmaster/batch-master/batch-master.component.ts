import { Component, OnInit } from '@angular/core';
import { BatchMasterService } from 'app/batchmaster/batch-master.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-batch-master',
  templateUrl: './batch-master.component.html',
  styleUrls: ['./batch-master.component.scss']
})
export class BatchMasterComponent implements OnInit {
  ItemNumber:any;
  ItemList:any;
  isLoading:boolean=false;
  totalRecords:number=0;
  skip:number=0;
  take:number=10;
  openDialog:boolean=false;
  buttonEnable:boolean=false;
  popupData:any;
  blocked:boolean=false;
  constructor(
    private batchMasterService:BatchMasterService,
    private datePipe:DatePipe
  ) { }

  ngOnInit() {
  }

  Search(){
    if(!this.ItemNumber || this.ItemNumber==null){
      alert("Enter ItemNumber!");
    }
    else{
      this.blocked=true;
      this.batchMasterService.GetItemsByItemNumber(this.ItemNumber,this.skip,this.take).subscribe((res:any)=>{
        this.ItemList=res.BatchMaster;
        this.totalRecords=res.TotalRecords;
        this.blocked=false;
        console.log(res);
        
      })
    }
  }

  load(event){
    this.skip = event ? event.first : 0;
    this.take = event ? event.rows : 10;
    if(event){
      this.Search();
    }
  }

  Edit(i){
    this.popupData=[];
    this.popupData.push(i);
    this.popupData.ExpiryDate =i.ExpiryDate? new Date(i.ExpiryDate):null;
    this.openDialog=true;
  }

  Submit(){
    this.popupData.ExpiryDate=this.datePipe.transform(this.popupData.ExpiryDate,'yyyy-MM-dd');
    this.blocked=true;
    this.batchMasterService.EditBatchDetails(this.popupData[0].Id,this.popupData.ExpiryDate).subscribe(res=>{
      this.blocked=false;
      alert(res); 
      this.openDialog=false;
      this.Search();
    })
  }
}
