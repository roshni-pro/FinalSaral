import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GullakCashBackMasterService } from 'app/shared/services/gullak-cash-back-master.service';
import * as moment from 'moment';


@Component({
  selector: 'app-gullakcashbackmaster',
  templateUrl: './gullakcashbackmaster.component.html',
  styleUrls: ['./gullakcashbackmaster.component.scss']
})
export class GullakcashbackmasterComponent implements OnInit {

  WarehouseList: any;
  GullakCashBackList: any;
  isSatatus: boolean;
  isOpenPopup: boolean;
  WarehouseId: number = 0;
  CustomerTypeId: number = 0;
  dataAdd: any;
  WarehouseId2:number =0;

  constructor(private _service: GullakCashBackMasterService,private datePipe:DatePipe) { this.dataAdd = { }; }

  ngOnInit() {
    this.isOpenPopup = false;
    this.GetWarehouse();
    this.GetGullakCashBackList();
  }

  GetWarehouse() {
    this._service.GetAllWarehouse().subscribe(res => {
      this.WarehouseList = res
    })
  }
 
  search(WarehouseId, CustomerTypeId) {
    return this._service.GetGullakCashBackList(WarehouseId, CustomerTypeId).subscribe(res => {
      this.GullakCashBackList = res.GullakCashBackDcs;
    })
  }
  GetGullakCashBackList() {
    return this._service.GetGullakCashBackList(this.WarehouseId, this.CustomerTypeId).subscribe(res => {
      this.GullakCashBackList = res.GullakCashBackDcs;
    })
  }
  StatusChange(Id, Status) {
    if (Status) {
      this.isSatatus = false;
    }
    else {
      this.isSatatus = true;;
    }
    this._service.GullakCashBackStatusChange(Id, this.isSatatus).subscribe(res => {
      if (res != null) {
        alert(res.msg)
        this.GetGullakCashBackList();
      }
    })
  }
  AddItem() {
    this.dataAdd = {};
    this.isOpenPopup = true;
  }
  OnSubmit(data) {
    if (data.EndDate <= data.StartDate) {
      alert("End Date should be Greater then Start Date")
      return;
    }
    if (data.AmountTo <= data.AmountFrom) {
      alert("Amount To should be Greater then Amount From")
      return;
    }
    this._service.AddGullakCashBack(data).subscribe(res => {
      if (res != null) {
        alert(res.msg)
        this.isOpenPopup = false;
        this.GetGullakCashBackList();
      }
    })
  }
  EditGullak(obj) {
    this.dataAdd = obj
    this.dataAdd.StartDate=new Date(this.dataAdd.StartDate);
    this.dataAdd.EndDate=new Date(this.dataAdd.EndDate);
    this.isOpenPopup = true;
  }
  cancle() {
    this.isOpenPopup = false;
  }
}
