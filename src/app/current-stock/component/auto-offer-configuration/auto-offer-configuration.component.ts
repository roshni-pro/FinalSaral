import { Component, OnInit } from '@angular/core';
import { AutoOfferConfigService } from 'app/current-stock/services/auto-offer-config.service';
@Component({
  selector: 'app-auto-offer-configuration',
  templateUrl: './auto-offer-configuration.component.html',
  styleUrls: ['./auto-offer-configuration.component.scss']
})
export class AutoOfferConfigurationComponent implements OnInit {
  storeList:any;
  SelectedStore:any;
  data:any;
  display:boolean=false;
  tableData:any;
  entity:any;
  Id:number;
  isHistory:boolean=false;
  constructor(
    private _service:AutoOfferConfigService
  ) { }

  ngOnInit() {
    this.entity='Store';
    this.getstoreList();
  }

  getstoreList(){
    this._service.getStoreList().subscribe(res=>{
       this.storeList=res;
       console.log("res",res);
       
      })
    }
    onSearch(){
      if(this.SelectedStore && this.SelectedStore.StoreId){
        this._service.getData(this.SelectedStore.StoreId).subscribe(res=>{
          this.tableData=res;
          console.log(this.tableData);
        })
      }
      else{
        alert("Select Store!");
      }
     
    // this._service.getUpdateList(this.SelectedStore.StoreId,this.Discount)
  }


  History(rowData){
    this.Id=rowData.StoreId;
    this.isHistory=true;

  }
  Edit(rowData){
    this.data=[];
    this.data=rowData;
    this.display=true;
  }
  update(){
    this._service.getUpdateList(this.data.StoreId,this.data.Discount).subscribe(res=>{
      if(res){
        alert("Requested successfully!");
        this.display=false;
        this.onSearch();
      }
      else{
        alert("Something went wrong!");
      }
    })
  }

  onRefresh(){
    this.SelectedStore=[];
    this.tableData=[];
  }
}
