import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PackingMaterialService } from 'app/shared/services/packing-material.service';
import { SupplierService } from 'app/shared/services/supplier.service';
import { ItemService } from 'app/shared/services/item.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-material-item-master',
  templateUrl: './add-material-item-master.component.html',
  styleUrls: ['./add-material-item-master.component.scss']
})
export class AddMaterialItemMasterComponent implements OnInit {
  @Input() itemnumber : any;
  @Input() bomId : any;
  OuterBagList :any;
  innerBagList :any;
  SupplierList:any;
  buyerList:any;
  groupedItemList1:any;
  selectedItem:any;
  data : any;
  isItemAdding : boolean  = false;
  finaldata : any[];
  getTableData: any;
  outerBagname : any;
  outerBagId : any;
  constructor( private messageService : MessageService,private router : Router,private packingmaterialService : PackingMaterialService , private supplierService : SupplierService , private itemService : ItemService) { this.finaldata = []; this.getTableData = []; }

  ngOnInit() { 
    console.log(this.itemnumber);
    this.data = {};
    // this.packingmaterialService.GetPackingBagDetails().subscribe(result=>{
    //   
    //   this.OuterBagList = result;
    //   console.log(this.OuterBagList);
    // })

    this.supplierService.GetAll().subscribe(result => {
      this.SupplierList = result;
    })
    this.itemService.GetBuyer().subscribe(result => {
      this.buyerList = result;
    })

    this.packingmaterialService.GetAddedBomDetails(this.bomId).subscribe(result=>{
      
      // this.outerBagname = result.OuterBagDescriptionDTO.OuterBagName
      // this.outerBagId = result.OuterBagDescriptionDTO.OuterBagId
      this.getTableData = result;
      console.log("this.data");
      console.log(result);
      // console.log(this.OuterBagList);
    })
  }

  onOuterBagCahnge(id){
    this.packingmaterialService.GetInnerBag(id).subscribe(result=>{
      console.log(result);
      this.innerBagList = result;
    })
  }


  getCentralItems(e) {
    
    this.itemService.searchCentralItem(e.query).subscribe(result=>{
      this.groupedItemList1 = result;
      console.log(this.groupedItemList1)
    })
  }
  onSelect(){
    
    console.log(this.selectedItem);
    this.data.ItemNumber = this.selectedItem.Number;
  }
  
  back(){
    this.router.navigateByUrl('layout/packing-material/item')
  }

  itemAdding(){
    this.isItemAdding = true;
    console.log(this.data);
  }
  Add(itemToAdd){
    

    console.log(itemToAdd)
    itemToAdd.ItemNumber  = this.selectedItem.Number;
    itemToAdd.BomId = this.bomId;
    // itemToAdd.MaterialItemId = this.itemnumber;
    // itemToAdd.OuterBagId = this.outerBagId;
    this.finaldata.push(itemToAdd);
    // var outer = this.OuterBagList.filter(x=> x.OuterBagId == itemToAdd.OuterBagId);
    // var inner = this.innerBagList.filter(x=> x.BagDescId == itemToAdd.BagDescId)
    // itemToAdd.OuterBagName = this.outerBagname;
    // itemToAdd.InnerBagName = inner[0].BagName;
    
    itemToAdd.ItemName = this.selectedItem.itemname;
    this.getTableData.push(itemToAdd);
    this.data = {};
    this.selectedItem = null;
    // this.data.OuterBagId = itemToAdd.OuterBagId;
    console.log(this.data);
    console.log(this.getTableData);
  }

  onSave(){
    console.log(this.finaldata);
    var addDetails = {
      MaterialItemDetails:this.finaldata,
      ItemNumber : this.itemnumber,
      BomId : this.bomId
    }
    console.log(addDetails);
    
    this.packingmaterialService.AddMaterialItemDetails(addDetails).subscribe(result=>{
      console.log(result);
      this.messageService.add({ severity: 'success', summary: "Saved Successfully", detail: '' });
     // this.getTableData = result
     this.finaldata = [];
     this.isItemAdding = false;
    })
  }

}
