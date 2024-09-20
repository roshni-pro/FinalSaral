import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PackingMaterialService } from 'app/shared/services/packing-material.service';
@Component({
  selector: 'app-add-material-po',
  templateUrl: './add-material-po.component.html',
  styleUrls: ['./add-material-po.component.scss']
})
export class AddMaterialPOComponent implements OnInit {
  @Output() isdetailsclose = new EventEmitter<boolean>();
  data : any;
  SupplierList : any;
  BagList : any;
  searchinput:any;
  constructor(private packingmaterialService : PackingMaterialService) { this.data = {}; }

  ngOnInit() {
    this.packingmaterialService.GetPackingBagDetails().subscribe(result=>{
      
      this.BagList = result;
      console.log(this.BagList);
    })
  }
  search(key){
    
    this.packingmaterialService.searchPMSupplier(key).subscribe(result=>{
      this.SupplierList = result;
      console.log(this.SupplierList);
    })
  }
  back(){
    this.isdetailsclose.emit(false);
  }
  onSave(){
    this.data.TotalPrice = this.data.Quantity * this.data.UntiPrice
    console.log(this.data);
    this.packingmaterialService.InsertPackingMaterialPO(this.data).subscribe(result=>{
      console.log(result)
      if(result){
        this.isdetailsclose.emit(false);
      }else{

      }
    },(err)=>{
      alert("error");
    })
  }
}
