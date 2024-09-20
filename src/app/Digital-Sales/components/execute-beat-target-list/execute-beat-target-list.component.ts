import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigitalSaleService } from 'app/shared/services/digital-sale.service';
import { ShoppingCartService } from 'app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-execute-beat-target-list',
  templateUrl: './execute-beat-target-list.component.html',
  styleUrls: ['./execute-beat-target-list.component.scss']
})
export class ExecuteBeatTargetListComponent implements OnInit {
  SelectedWarehouseId:number=0;
  SelectedClusterId:number=0;
  WarehouseList:any;
  ClusterList:any;
  ItemPerPage: any;
  PageNo: any;
  totalRecords: number;
  ItemList:any[];
  
  constructor(private _Service: ShoppingCartService,
    private digitalsaleService: DigitalSaleService,
    private router: Router) { }

  ngOnInit() {
    this.getWarehouse();
  }
  getWarehouse() {
    debugger
    this._Service.GetAllWarehouse().subscribe(result => {
      debugger
      this.WarehouseList = result;
    });
  }
  getCluster(WarehouseId) {
    this.digitalsaleService.GetCluster(WarehouseId).subscribe(result => {
      this.ClusterList = result;
    });
  }
  load(event){
    var Last = event.first ? event.first + event.rows : 20
    this.ItemPerPage = event.rows
    this.PageNo = Last / event.rows
    this.digitalsaleService.GetExecuteBeatTargetList(this.SelectedWarehouseId, this.SelectedClusterId, this.PageNo, this.ItemPerPage).subscribe(res => {
     debugger
      this.ItemList = res.ExecuteBeatTargets;
      this.totalRecords = res.Count;
    })
  }
  search(){
    this.digitalsaleService.GetExecuteBeatTargetList(this.SelectedWarehouseId, this.SelectedClusterId, this.PageNo, this.ItemPerPage).subscribe(res => {
    if(res.ExecuteBeatTargets.length>0){
      this.ItemList = res.ExecuteBeatTargets;
      this.totalRecords = res.Count;
    }
    else{
      alert("Record Not Found");
      this.ItemList =[];
      this.totalRecords =0;
      return;
    }
    })
  }
  AddItem(){
    this.router.navigateByUrl('layout/digitalsales/AddExecuteBeat');
  }
  OpenDetail(Id){
    this.router.navigateByUrl('layout/digitalsales/Edit-ExecuteBeat/'+Id);
  }
  ActiveInactive(d, bool) {
    this.digitalsaleService.ActiveInActiveExecutiveBeat(d.Id, bool).subscribe(res => {
    })
  }
}
