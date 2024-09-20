import { Component, OnInit } from '@angular/core';
import { InventoryAssignSupervisiorService } from 'app/current-stock/services/inventory-assign-supervisior.service';
import * as moment from 'moment';

@Component({
  selector: 'app-inventory-cycle-assign-supervisior',
  templateUrl: './inventory-cycle-assign-supervisior.component.html',
  styleUrls: ['./inventory-cycle-assign-supervisior.component.scss']
})
export class InventoryCycleAssignSupervisiorComponent implements OnInit {
  getDate: any;
  selSupVisordId:any;
  invSupList:any[]=[];
  wareHousList:any;
  selWhId:any;
  superVisorList:any;
  arrayID:any[]=[];
  blocked:boolean=false;

  constructor(private _service:InventoryAssignSupervisiorService) { }

  ngOnInit() {
        this.getWHList();
        let today = new Date();
        this.getDate = moment(today).format('MM/DD/YYYY');
  }

  getWHList(){
    this._service.getWarehouseListNew().subscribe(
      (res)=>{
        this.wareHousList = res;
      },
      (err)=>{
        alert(err.error.ErrorMessage);
      })
  }

  wareId:number;
  getSelectedWareID(d:any){
    this.superVisorList=[];
    this.selSupVisordId=[];
    this.wareId = d.value;
    this.blocked = true;
    this._service.getSuperVisiorListbyWareId(this.wareId).subscribe(
      (res)=>{
        this.superVisorList = res;
        //console.log(this.superVisorList,"SuperViserList");
        this.blocked = false;
      },
      (err)=>{
        alert(err.error.ErrorMessage);
        this.blocked = false;
      })
  }

  getSearchDetails(){
    if(this.wareId == undefined){
      alert('Please Select Warehouse');
      return false;
    }
    let modifyDate = moment(this.getDate).format('MM/DD/YYYY');
    this.blocked = true;
    this._service.getWhSuperVisoryCycleDays(this.wareId,modifyDate).subscribe(
      (res)=>{
        if(res.length == 0){
          alert('No Record Found');
        }
        this.invSupList = res;
        this.blocked = false;
      },
      (err)=>{
        alert(err.error.ErrorMessage);
        this.blocked = false;
      })
  }

  submitDetails(d){
  
    if(this.selWhId == undefined){
      alert('Please Select Warehouse');
      return false;
    }

    if(this.selSupVisordId == undefined){
      alert('Please Select Supervisor');
      return false;
    }

    // if(this.selSupVisordId.length > 5){
    //   alert('You can not select more then 5 Supervisor');
    //   return false;
    // }

    let today = new Date();
    if((moment(d).format('MM/DD/YYYY')) != (moment(today).format('MM/DD/YYYY'))){
      alert('Please Select Current Date');
      return false;
    }else{
      var finalDate = (moment(today).format('MM/DD/YYYY'));
    }

    if (this.selSupVisordId && this.selSupVisordId.length > 0) {
      this.arrayID = this.selSupVisordId.map(function(a:any){
        return a.Id ? a.Id : a
      })
    } 
  
    this.blocked = true;
    this._service.savedSuperVisorDay(this.wareId,finalDate,this.arrayID).subscribe(
      (res)=>{
        console.log(res);
        if(res.Status == true){
          alert(res.msg);
          this.blocked = false;
          this.getSearchDetails();
        }

        if(res.Status == false){
          alert(res.msg);
          this.blocked = false;
          return false;
        }
      },
      (err)=>{
        alert(err.error.ErrorMessage);
        this.blocked = false;
      }
    )
  }

}
