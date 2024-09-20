import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/shared/services/customer.service';

@Component({
  selector: 'app-sales-target',
  templateUrl: './sales-target.component.html',
  styleUrls: ['./sales-target.component.scss']
})
export class SalesTargetComponent implements OnInit {

  selectedStoreId: number = 0;
  StoreId:number=0;
  ItemList: any;
  totalRecords: number;
  isOpenPopup: boolean;
  IsAddNewPopup:boolean;
  StoreList: any[];
  ItemMRPList:any[];
  baseQty: number;
  NewbaseQty:number
  Id: number;
  itemMrpId:number=0;
  itemNo:string;
  itembaseName:string;
  blocked:boolean;
  UnitofQuantity:any;
  MRP:any;
  UOM:any;
  constructor(private _service: CustomerService) { }

  ngOnInit() {
    this.isOpenPopup = false;
    this.IsAddNewPopup=false;
    this.getAllStore();
  }
  onSelect() {
    this.selectedStoreId = this.selectedStoreId;
  }
  getAllStore() {
    this._service.getAllStore().subscribe(result => {
      this.StoreList = result;
    });
  }
  search() {
    if(this.selectedStoreId==0){
      alert("Please Select Store")
      return
    }
    this.blocked=true;
    this._service.getSalesTargetList(this.selectedStoreId).subscribe(res => {
      this.ItemList = res
      this.blocked=false;
    })
  }
  EditBaseQty(obj) {
    this.isOpenPopup = true;
    this.baseQty = obj.BaseQty
    this.Id = obj.Id;
    this.itemNo=obj.ItemNumber
    this.itembaseName=obj.ItemName
  }
  Update(BaseQty) {
    if(BaseQty==null||BaseQty==""||BaseQty==undefined){
      alert("Base Qty is Required")
      return
    }
    if(confirm("Are you sure to Update")) {
      var datatoPost = {
        Id: this.Id,
        BaseQty: BaseQty
      }
      this._service.InsertUpdateSalesTarget(datatoPost).subscribe(res => {
        this.isOpenPopup = false;
        this.search();
      })
    }
   
  }
  AddNew(){
    this.IsAddNewPopup=true;
  }
  SearchForItem(itemNo){
    
    if(itemNo==""||itemNo==null||itemNo==undefined){
      alert("Please Enter Item No.")
      return
    }
    this._service.getMRPList(itemNo).subscribe(res => {
      this.ItemMRPList = res
    })
  }
  onSelectStore(){
    this.StoreId=this.StoreId;
  }
  onSelectMRP(){
    this.itemMrpId=this.itemMrpId;
    var dt = this.ItemMRPList.filter(x => x.ItemMultiMRPId == this.itemMrpId);
    this.MRP = dt[0]["MRP"];
    this.UnitofQuantity = dt[0]["UnitofQuantity"]
    this.UOM=dt[0]["UOM"]
  }
  Save(BaseQty,itemNo){
    if(this.StoreId==0){
      alert("Please Select Store")
      return
    }
    if(itemNo==""||itemNo==null||itemNo==undefined){
      alert("Please Enter Item No.")
      return
    }
    if(this.itemMrpId==0){
      alert("Please Select Item")
      return
    }
    if(BaseQty==""||BaseQty==null||BaseQty==undefined){
      alert("Please Enter Base Qty")
      return
    }
    var datatoPost = {
      BaseQty: BaseQty,
      ItemMultiMRPId:this.itemMrpId,
      ItemNumber:itemNo,
      StoreId:this.StoreId
    }
    this._service.InsertUpdateSalesTarget(datatoPost).subscribe(res => {
      if(res!=null){
        alert(res)
        this.IsAddNewPopup = false;
        this.ItemMRPList=null;
        this.itemNo=null;
        this.StoreId=0;
        this.NewbaseQty=null;
      }
    })
  }
}
