import { Component, OnInit } from '@angular/core';
import { PodashboardserviceService } from 'app/Purchase-Order/Services/podashboardservice.service';

@Component({
  selector: 'app-poapproval-detail',
  templateUrl: './poapproval-detail.component.html',
  styleUrls: ['./poapproval-detail.component.scss']
})
export class POApprovalDetailComponent implements OnInit {

  constructor(private serv:PodashboardserviceService ) { }

  ngOnInit() 
  {
    this.getwarehouse()
  }

  WarehouseList:any[]=[]
  getwarehouse()
  {
    this.serv.GetWarehouse().subscribe(WareRes => { 
      this.WarehouseList = WareRes
      console.log()
    })
  }
  selectedWareHouse:any
  wid:any
  tableListData:any
  GetPOApproval()
  {
    this.wid=this.selectedWareHouse.WarehouseId
    this.serv.GetPOApproval(this.wid).subscribe(result =>{
      console.log(result)
      this.tableListData=result    
    })
  }
  editopen:boolean=false
  ap1List:any[]
  ap1:any
  Editopen(item)
  {
    debugger;
    this.editopen=true;
    this.serv.getapr1(item.Warehouseid).subscribe(result=>{
      console.log(result)
      this.ap1List=result
      this.tableListData.forEach(element => {
        this.ap1 = result.filter(x => x.ApprovalName1 == element.ApprovalName1);
        console.log("aa",this.ap1);
      });
    })
  }
  historyData:any
  historyOpen:boolean=false
  PoApprovalHistroy(item)
  {
    this.serv.PoApprovalHistroy(item.Poapprovelid).subscribe(result=>{
      console.log(result);
      this.historyData=result
      this.historyOpen=true
    })
  }
}
