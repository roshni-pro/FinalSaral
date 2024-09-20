import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DigitalSaleService } from 'app/shared/services/digital-sale.service';
import { ShoppingCartService } from 'app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-add-execute-beat-target',
  templateUrl: './add-execute-beat-target.component.html',
  styleUrls: ['./add-execute-beat-target.component.scss']
})
export class AddExecuteBeatTargetComponent implements OnInit {

  @Input() Id: any;
  WarehouseList: any;
  ClusterList: any;
  SelectedWarehouseId: number=0;
  SelectedClusterId: number=0;
  dataAdd: any;
  WarehouseName: any;
  ClusterName: any;
  CustomerCount: number;
  IshowAdd :boolean;
  IshowEdit :boolean;

  constructor(private route: ActivatedRoute, private _Service: ShoppingCartService,
    private digitalsaleService: DigitalSaleService, private router: Router) {
    this.dataAdd = {};
  }

  ngOnInit() {
    this.IshowAdd = true;
    this.IshowEdit = false;
    this.getWarehouse();
    this.Id = this.route.snapshot.paramMap.get("Id");
    if (this.Id != null) {
      this.digitalsaleService.ExecutiveBeatById(this.Id).subscribe(result => {
        this.dataAdd = result.Data;
        debugger
        this.SelectedWarehouseId = this.dataAdd.WarehouseId;
        this.ClusterName = this.dataAdd.ClusterName;
        this.WarehouseName = this.dataAdd.WarehouseName;
        this.digitalsaleService.GetCluster(this.SelectedWarehouseId).subscribe(result => {
          this.ClusterList = result;
        });
        this.SelectedClusterId = this.dataAdd.ClusterId;
      })
      this.IshowAdd = false;
      this.IshowEdit = true;
    }
  }
  getWarehouse() {
    this._Service.GetAllWarehouse().subscribe(result => {
      this.WarehouseList = result;
    });
  }
  getCluster(WarehouseId, event) {
    this.WarehouseName = event.target['options']
    [event.target['options'].selectedIndex].text;

    this.digitalsaleService.GetCluster(WarehouseId).subscribe(result => {
      this.ClusterList = result;
    });
  }
  onChangeCluster(event) {
    this.ClusterName = event.target['options']
    [event.target['options'].selectedIndex].text;
    this.digitalsaleService.CustomerCount(this.SelectedClusterId).subscribe(result => {
      this.CustomerCount = result;
    })
  }
  OnSubmit(data) {
    if (data.EndDate < data.StartDate) {
      alert("Please Select Valid Date");
      return;
    }
    if(this.SelectedWarehouseId==0){
      alert("Please Select Warehouse");
      return;
    }
    if(this.SelectedClusterId==0){
      alert("Please Select Cluster");
      return;
    }
    if(data.VisitedPercent=="" || data.VisitedPercent==undefined){
      alert("Enter Visited Percent");
      return;
    }
    if(data.ConversionPercent=="" || data.ConversionPercent==undefined){
      alert("Enter Conversion Percent");
      return;
    }
    if(data.CustomerPercent=="" || data.CustomerPercent==undefined){
      alert("Enter Customer Percent");
      return;
    }
    if(data.OrderPercent=="" || data.OrderPercent==undefined){
      alert("Enter Order Percent");
      return;
    }
    if(data.ProductPareto=="" || data.ProductPareto==undefined){
      alert("Enter Product Pareto");
      return;
    }
    if(data.CustomerPareto=="" || data.CustomerPareto==undefined){
      alert("Enter Customer Pareto");
      return;
    }
    if(data.AvgLineItem=="" || data.AvgLineItem==undefined){
      alert("Enter Avg Line Item");
      return;
    }
    if(data.AvgOrderAmount=="" || data.AvgOrderAmount==undefined){
      alert("Enter Avg Order Amount");
      return;
    }
    if(data.StartDate=="" || data.StartDate==undefined){
      alert("Enter Start Date");
      return;
    }
    if(data.EndDate=="" || data.EndDate==undefined){
      alert("Enter End Date");
      return;
    }
    if (data.EndDate < data.StartDate) {
      alert("You Cannot Select Past Date");
      return;
    }
    data.WarehouseId = this.SelectedWarehouseId;
    data.ClusterId = this.SelectedClusterId;
    data.WarehouseName = this.WarehouseName;
    data.ClusterName = this.ClusterName;
    this.digitalsaleService.SaveExecutiveBeatTarget(data).subscribe(result => {
      if (result.Result) {
        this.router.navigateByUrl('layout/digitalsales/ExecuteBeatList');
      }
      else{
        alert(result.msg);
        return;
      }
    })
  }
  Cancle() {
    this.router.navigateByUrl('layout/digitalsales/ExecuteBeatList');
  }
}
