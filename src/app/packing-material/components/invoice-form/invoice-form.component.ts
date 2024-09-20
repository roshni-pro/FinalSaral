import { Component, OnInit } from '@angular/core';
import { ItemService } from 'app/shared/services/item.service';
import { SupplierService } from 'app/shared/services/supplier.service';
import { PackingMaterialService } from 'app/shared/services/packing-material.service';
import { Router } from '@angular/router';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { CityService } from 'app/shared/services/city.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
  data:any;
  warehouseList:any;
  supplierList:any;
  buyerList:any;
  cityList:any;
  groupedItemList1 :any;
  itemDetails : any;
  selectedItem:any;
  finaldata:any;
  getTableData:any;
  val2 : any;
  constructor(private router : Router,
    private packingmaterialService : PackingMaterialService , 
    private supplierService : SupplierService , 
    private itemService : ItemService,
    private warehouseService : WarehouseService,
    private cityService : CityService,
    private messageService : MessageService,
    )
     { this.data = {} ; this.itemDetails = {}; this.finaldata = [] ; this.getTableData = []; }

  ngOnInit() {
    this.data.InvoiceType = 'Delievery'
    this.warehouseService.getSpecificWarehouses().subscribe(result => {
      this.warehouseList = result;
      console.log(this.warehouseList);
    });

    this.supplierService.GetAll().subscribe(result => {
      this.supplierList = result;
      console.log(this.supplierList);
    })
    this.itemService.GetBuyer().subscribe(result=>{
      this.buyerList = result;
      console.log(this.buyerList);
    })

    this.cityService.GetAllCity().subscribe(result=>{
      this.cityList = result;
      console.log(this.cityList);
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
    var ItemNumber = this.selectedItem.Number;
    this.packingmaterialService.GettemMasterDetailsActype(this.data.WarehouseId,ItemNumber).subscribe(result=>{
      if(result){
        this.itemDetails = result;
        this.itemDetails.TotalTax = this.itemDetails.Cgst + this.itemDetails.Sgst + this.itemDetails.TotalTaxPercentage
        console.log(this.itemDetails);
      }
      else{
        this.itemDetails = {};
        this.selectedItem = null;
        this.messageService.add({ severity: 'error', summary: 'Material Not Found', detail: '' });
        //this.selectedItem = null;
      }
     
    })
  }
  onQuantityChange(){
    var Rate = this.itemDetails.UnitPrice * this.itemDetails.Qty;
    this.itemDetails.Amount = Rate;
    this.itemDetails.CgstAmount = (Rate * this.itemDetails.Cgst)/100
    this.itemDetails.SgstAmount = (Rate * this.itemDetails.Sgst)/100
    this.itemDetails.IgstAmount = (Rate * this.itemDetails.TotalTaxPercentage)/100
    this.itemDetails.TaxableAmount = this.itemDetails.CgstAmount + this.itemDetails.SgstAmount + this.itemDetails.IgstAmount;
    this.itemDetails.TotalPrice = this.itemDetails.Amount + this.itemDetails.TaxableAmount;

  }
  Add(itemToAdd,info){
    
    if(itemToAdd.Qty <= itemToAdd.CurrentInventory)
    {
      console.log(itemToAdd)
      this.finaldata.push(itemToAdd);
      this.getTableData.push(itemToAdd);
      this.itemDetails = {};
      this.selectedItem = null;
      console.log(this.getTableData);
    }else{
      this.messageService.add({ severity: 'error', summary: 'Quantity Not Greater than Current Stock Quantity', detail: '' });
    }
    
  }

  onSave(infoForm){
    if (infoForm.form.status == "VALID") {
    console.log(this.data);
    var finaldata = {
      RawMaterialMaster : this.data,
      RawMaterialDetails : this.finaldata
    }
    this.packingmaterialService.InsertRawMaterialMst(finaldata).subscribe(result=>{
      console.log(result);
      this.messageService.add({ severity: 'success', summary: "Saved Successfully", detail: '' });
      this.router.navigateByUrl('layout/packing-material/invoice')
    },(err)=>{
      this.messageService.add({ severity: 'error', summary: "Error", detail: '' });
    })
  }
  else{
    this.messageService.add({ severity: 'error', summary: 'Please Fill All Mendatory Fields', detail: '' });
  }

  }

  back(){
    this.router.navigateByUrl('layout/packing-material/invoice');

  }

}
